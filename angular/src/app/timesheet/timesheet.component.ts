import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Subject,fromEvent  } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';
import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';

import { ITimeSheetDto, TimeSheetDto, TimeSheetDtoPagedResultDto } from '@shared/service-proxies/timesheet/dto/timesheet-dto';

import { CreateTimeSheetDialogComponent } from './create-timesheet/create-timesheet-dialog.component';
import { EditTimeSheetDialogComponent } from './edit-timesheet/edit-timesheet-dialog.component';
import * as moment from 'moment';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { RoomDto } from '@shared/service-proxies/room/dto/room-dto';

class PagedTimeSheetRequestDto extends PagedRequestDto {
  roomId: string | undefined;
  fromDate: string | null;
  toDate: string | null;
}

moment.updateLocale('en', {
  week: {
    dow: DAYS_OF_WEEK.MONDAY,
    doy: 0,
  },
});

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Component({
  templateUrl: './timesheet.component.html',
  animations: [appModuleAnimation()]
})
export class TimeSheetComponent extends PagedListingComponentBase<TimeSheetDto> 
  implements OnInit {
  rooms: RoomDto[]=[];
  selectedRoom : RoomDto;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  dragToCreateActive = false;

  events: any[]=[];

  weekStartsOn: 1 = 1;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: ITimeSheetDto }): void => {
        this.showCreateOrEditTimeSheetDialog();
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: ITimeSheetDto }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.showCreateOrEditTimeSheetDialog(event);
      },
    },
  ];

  activeDayIsOpen: boolean = true;

  refreshEvents: Subject<any> = new Subject();

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
    });  
  }

  onChangeRoom(event) {    
    const req = new PagedTimeSheetRequestDto();
        req.roomId = event.value.id;
        req.fromDate = new Date("2020-12-20").toISOString();
        req.toDate = new Date("2020-12-30").toISOString();
        this.isTableLoading = true;
        this.list(req, 0, () => {
            this.isTableLoading = false;
        });
  }

  protected list(
    request: PagedTimeSheetRequestDto, 
    pageNumber: number, 
    finishedCallback: Function): void {
      request.roomId = this.selectedRoom.id;
      this._timesheetService
      .getAllTimeSheetFromDateToDate(
        request.roomId,
        request.fromDate,
        request.toDate
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: TimeSheetDtoPagedResultDto) => {
        var self = this;
        this.events = result.items;
        this.events.forEach(function (event) {
          event.actions = self.actions;     
          event.color = colors.yellow;
          event.resizable = {
            beforeStart: true,
            afterEnd: true,
          };
          event.draggable = true;
        }); 
      });
  }
  protected delete(entity: TimeSheetDto): void {
    throw new Error('Method not implemented.');
  }

  dayClicked({ date, events }: { date: Date; events: ITimeSheetDto[] }): void {
    if (date.getMonth == this.viewDate.getMonth) {
      if (
        (this.viewDate.getDay ==  date.getDay && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  createScheduler(): void {
    this.showCreateOrEditTimeSheetDialog(new TimeSheetDto);
  }

  deleteEvent(eventToDelete: ITimeSheetDto) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  private showCreateOrEditTimeSheetDialog(timeSheet?: ITimeSheetDto): void {
    let createOrEditTimeSheetDialog: BsModalRef;
    if (timeSheet.id == null || timeSheet.id == undefined) {
      createOrEditTimeSheetDialog = this._modalService.show(
        CreateTimeSheetDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    else {
      createOrEditTimeSheetDialog = this._modalService.show(
        EditTimeSheetDialogComponent,
        {
          class: 'modal-lg',
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

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  private refreshEvent() {
    this.events = [...this.events];
  }
}
