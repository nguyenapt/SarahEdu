import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
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
import { RoomDto, StudyTimeDto } from '@shared/service-proxies/room/dto/room-dto';

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
  studyTimes: StudyTimeDto[]=[];
  dayInWeeks : Date[] = [];
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
    const req = new PagedTimeSheetRequestDto();
      req.fromDate = "2021-01-19";
    this._timesheetService
      .getAllTimeSheetForWeek(
        req.fromDate
      )
      .pipe(
        finalize(() => {
          this.getDayInWeek(new Date());
          this._roomService.getRoomByCurrentTenant().subscribe((result) => {
            this.rooms = result.items;
          });  

          this._roomService.getStudyTime().subscribe((result) => {
            this.studyTimes = result.items;      
          }); 
        })
      )
      .subscribe((result: TimeSheetDtoPagedResultDto) => {
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

  getDayInWeek(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1);
    var monday = new Date(d.setDate(diff));
    this.dayInWeeks.push(new Date(monday));    
    this.dayInWeeks.push(this.addDays(new Date(monday),1));
    this.dayInWeeks.push(this.addDays(new Date(monday),2));
    this.dayInWeeks.push(this.addDays(new Date(monday),3));
    this.dayInWeeks.push(this.addDays(new Date(monday),4));
    this.dayInWeeks.push(this.addDays(new Date(monday),5));
    this.dayInWeeks.push(this.addDays(new Date(monday),6));    
  }

  addDays(date: Date, days: number): Date {
    var dt = new Date(date.setDate(date.getDate() + days));
    return dt;
  }

  createScheduler(): void {
    this.showCreateOrEditTimeSheetDialog(new TimeSheetDto);
  }

  deleteEvent(eventToDelete: ITimeSheetDto) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  getTimeScheduler(day : Date,studyTime : StudyTimeDto,room : RoomDto) {
    var dateString = day.toLocaleString().split(',')[0];
    var event =  this.events.filter(p => p.start.toLocaleString().split(',')[0] == dateString && p.studyTimeId == studyTime.id && p.roomId == room.id)[0];
    return event;
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
