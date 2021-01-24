import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';
import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';

import { ITimeSheetDto, RoomTimeSheetDtoPagedResultDto, StudyTimeWeekDto, TimeSheetDto, TimeSheetDtoPagedResultDto, TimeSheetStudentDto } from '@shared/service-proxies/timesheet/dto/timesheet-dto';

import { CreateTimeSheetDialogComponent } from './create-timesheet/create-timesheet-dialog.component';
import { EditTimeSheetDialogComponent } from './edit-timesheet/edit-timesheet-dialog.component';
import * as moment from 'moment';

import {
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';

import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { RoomDto } from '@shared/service-proxies/room/dto/room-dto';

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

  currentDate: string;
  fromDate:string;

  events: any[]=[];
  rowGroupMetadata: any;
  loading: boolean;
  students: TimeSheetStudentDto[]

  constructor(
    injector: Injector,
    private _timesheetService: TimeSheetServiceProxy,
    private _roomService: RoomServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loading = true;
    this._roomService.getRoomByCurrentTenant().subscribe((result) => {
      this.rooms = result.items;
      this.selectedRoom = this.rooms[0];
      this.currentDate = moment().format('YYYY-MM-DD');
      this.fromDate = moment().format('YYYY-MM-DD');
      this.list(this.fromDate, () => {
        this.updateRowGroupMetaData();
      });
    });      
  }


  protected list(fromDate, finishedCallback: Function): void {
    this.loading = true;
    this._timesheetService
      .getAllTimeSheetForWeek(
        fromDate
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

  editScheduler(timeSheet:TimeSheetDto): void {
    this.showCreateOrEditTimeSheetDialog(timeSheet);
  }

  setSelected(students: TimeSheetStudentDto[]){
    this.students = students;
  }


  deleteScheduler(eventToDelete: ITimeSheetDto) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  previousWeek(){
    this.fromDate = moment(this.fromDate).add(-7,"days").format('YYYY-MM-DD');
    this.list(this.fromDate, () => {
      this.updateRowGroupMetaData();
    });
  }
  currentWeek(){
    this.fromDate = this.currentDate;
    this.list(this.fromDate, () => {
      this.updateRowGroupMetaData();
    });
  }
  nextWeek(){    
    this.fromDate = moment(this.fromDate).add(7,"days").format('YYYY-MM-DD');
    this.list(this.fromDate, () => {
      this.updateRowGroupMetaData();
    });
  }

  updateRowGroupMetaData() {
      this.rowGroupMetadata = {};

      if (this.events) {
          for (let i = 0; i < this.events.length; i++) {
              let rowData = this.events[i];
              let representativeName = rowData.weekDay;
              
              if (i == 0) {
                  this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
              }
              else {
                  let previousRowData = this.events[i - 1];
                  let previousRowGroup = previousRowData.weekDay;
                  if (representativeName === previousRowGroup)
                      this.rowGroupMetadata[representativeName].size++;
                  else
                      this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
              }
          }
      }
      this.loading = false;
  }

  private showCreateOrEditTimeSheetDialog(timeSheet?: ITimeSheetDto): void {
    let createOrEditTimeSheetDialog: BsModalRef;
    if (timeSheet.id == null || timeSheet.id == undefined) {
      createOrEditTimeSheetDialog = this._modalService.show(
        CreateTimeSheetDialogComponent,
        {
          class: 'modal-xlg'          
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
    this.list(this.fromDate, () => {
      this.updateRowGroupMetaData();
    });
  }

  getTimeScheduler(day : Date,studyTimeId,room : RoomDto) {
    var dateString = day.toLocaleString().split(',')[0];
    var event =  this.events.filter(p => p.weekDay == dateString && p.id == studyTimeId)[0]
    if(event !=null && event.timeSheetEntries.length >0){
      var scheduler = event.timeSheetEntries.filter(p => p.roomId == room.id)[0]
      if(scheduler !=null) return scheduler;
    }      
    return null;
  }
}
