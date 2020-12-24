import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Subject,fromEvent  } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { WeekViewHourSegment } from 'calendar-utils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';
import { ITimeSheetDto, TimeSheetDto } from '@shared/service-proxies/timesheet/dto/timesheet-dto';

import { CreateTimeSheetDialogComponent } from './create-timesheet/create-timesheet-dialog.component';
import { EditTimeSheetDialogComponent } from './edit-timesheet/edit-timesheet-dialog.component';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMinutes,
  endOfWeek
} from 'date-fns';

import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

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
export class TimeSheetComponent extends AppComponentBase {
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  dragToCreateActive = false;

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

  refresh: Subject<any> = new Subject();

  events: ITimeSheetDto[] = [
    {
      id: 'aaaa',
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      id: 'bbbb',
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      id: 'cccc',
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      id: 'dddd',
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(
    injector: Injector,
    private _timesheetService: TimeSheetServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  dayClicked({ date, events }: { date: Date; events: ITimeSheetDto[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
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

  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: ITimeSheetDto = {
      id: this.events.length,
      title: 'New event',
      color: colors.red,
      start: segment.date,
      actions: this.actions,
      meta: {
        teacherName: "Hoang Nguyen",
      },
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.teacherName;
          this.dragToCreateActive = false;
          this.refreshEvent();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refreshEvent();
      });
  }
  private refreshEvent() {
    this.events = [...this.events];
  }
}
