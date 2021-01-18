import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';
import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';

import { ITimeSheetDto, RoomTimeSheetDtoPagedResultDto, TimeSheetDto, TimeSheetDtoPagedResultDto } from '@shared/service-proxies/timesheet/dto/timesheet-dto';

import { CreateTimeSheetDialogComponent } from './create-timesheet/create-timesheet-dialog.component';
import { EditTimeSheetDialogComponent } from './edit-timesheet/edit-timesheet-dialog.component';
import * as moment from 'moment';

import {
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';

import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { RoomDto } from '@shared/service-proxies/room/dto/room-dto';

class PagedTimeSheetRequestDto extends PagedRequestDto {
  fromDate: string | null;
}

moment.updateLocale('en', {
  week: {
    dow: DAYS_OF_WEEK.MONDAY,
    doy: 0,
  },
});

@Component({
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  animations: [appModuleAnimation()]
})
export class TimeSheetComponent extends AppComponentBase
  implements OnInit {
  rooms: RoomDto[]=[];
  selectedRoom : RoomDto;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  dragToCreateActive = false;

  events: any[]=[];
  rowGroupMetadata: any;

  constructor(
    injector: Injector,
    private _timesheetService: TimeSheetServiceProxy,
    private _roomService: RoomServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._roomService.getRoomByCurrentTenant().subscribe((result) => {
      this.rooms = result.items;
      this.selectedRoom = this.rooms[0];
      const req = new PagedTimeSheetRequestDto();
      req.fromDate = "2021-01-19";
      this.list(req, 0, () => {
        this.updateRowGroupMetaData();
      });
    });  
  }


  protected list(
    request: PagedTimeSheetRequestDto, 
    pageNumber: number, 
    finishedCallback: Function): void {
      this._timesheetService
      .getAllTimeSheetForWeek(
        request.fromDate
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: RoomTimeSheetDtoPagedResultDto) => {
        var self = this;
        this.events = result.items;
        this.events.forEach(function (event) {
          event.resizable = {
            beforeStart: true,
            afterEnd: true,
          };
          event.draggable = true;
        }); 
      });
  }

  createScheduler(): void {
    this.showCreateOrEditTimeSheetDialog(new TimeSheetDto);
  }

  deleteEvent(eventToDelete: ITimeSheetDto) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
      this.rowGroupMetadata = {};

      if (this.events) {
          for (let i = 0; i < this.events.length; i++) {
              let rowData = this.events[i];
              let representativeName = rowData.roomName;
              
              if (i == 0) {
                  this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
              }
              else {
                  let previousRowData = this.events[i - 1];
                  let previousRowGroup = previousRowData.roomName;
                  if (representativeName === previousRowGroup)
                      this.rowGroupMetadata[representativeName].size++;
                  else
                      this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
              }
          }
      }
  }

  private showCreateOrEditTimeSheetDialog(timeSheet?: ITimeSheetDto): void {
    let createOrEditTimeSheetDialog: BsModalRef;
    if (timeSheet.id == null || timeSheet.id == undefined) {
      createOrEditTimeSheetDialog = this._modalService.show(
        CreateTimeSheetDialogComponent,
        {
          class: 'modal-xlg',
          initialState: {
            roomId: this.selectedRoom.id,
          },
        }
      );
    } 
    else {
      createOrEditTimeSheetDialog = this._modalService.show(
        EditTimeSheetDialogComponent,
        {
          class: 'modal-xlg',
          initialState: {
            roomId: this.selectedRoom.id,
            timeSheet: timeSheet,
          },
        }
      );
    }

    createOrEditTimeSheetDialog.content.onSave.subscribe(() => {
      this.refreshEvent();
    });
  }

  private refreshEvent() {
    this.events = [...this.events];
  }
}
