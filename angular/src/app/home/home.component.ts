import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';
import { TimeSheetDto, TimeSheetDtoPagedResultDto, TimeSheetStudentDto } from '@shared/service-proxies/timesheet/dto/timesheet-dto';
import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';
import { finalize } from 'rxjs/operators';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { KeyValueItem } from '@shared/interface/keyvalue-item';
import { TeacherSchedulerDialogComponent } from '@app/teacher/teacher-scheduler-dialog/teacher-scheduler-dialog.component';
import { UserServiceProxy } from '@shared/service-proxies/user/user.service.proxy';
import { UserDto } from '@shared/service-proxies/user/dto/user-dto';
import * as moment from 'moment';

@Component({
  templateUrl: './home.component.html',
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class HomeComponent extends AppComponentBase {
  roomId: string;  
  fromDate: string;
  toDate: string;
  timeSchedulers: TimeSheetDto[]=[];
  isTableLoading = true;
  expanded = true;
  constructor(
    injector: Injector,
    private _timesheetService: TimeSheetServiceProxy,
    private _roomService: RoomServiceProxy,
    private _userService: UserServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  statuses = [
    {name: '- Select -', code: 0},
    {name: 'PENDING', code: 1},
    {name: 'APPROVED', code: 2},
    {name: 'REJECTED', code: 3}
  ];


  attitudes = [
    {name: '- Select -', code: 0},
    {name: 'High important', code: 1},
    {name: 'Normal', code: 2},
    {name: 'Low important', code: 3}
  ];

  ngOnInit(): void {
    this.loadTimeScheduler(() => {
      this.isTableLoading = false;
    });
  }

  checkRoleIsAdmin(){
    return this.permission.isGranted("Pages.Tenants");    
  }

  searchData(){
    this.loadTimeScheduler(() => {
      this.isTableLoading = false;
    });
  }

  getStatus(timeScheduler:TimeSheetDto){
    let normalStatus = 3;
    for (var i=0; i < timeScheduler.timeSheetStudents.length; i++) {
      if (timeScheduler.timeSheetStudents[i].attitude != null && timeScheduler.timeSheetStudents[i].attitude <= normalStatus) {
        normalStatus = timeScheduler.timeSheetStudents[i].attitude;
      }
      if (timeScheduler.timeSheetStudents[i].receptiveAbility !=null && timeScheduler.timeSheetStudents[i].receptiveAbility <= normalStatus) {
        normalStatus = timeScheduler.timeSheetStudents[i].receptiveAbility;
      }
    }
    return this.attitudes.find(x=>x.code == normalStatus).name;
  }

  loadTimeScheduler(finishedCallback: Function)  {
    this._timesheetService
      .getAllTimeSheetFromDateToDate(
        this.roomId,
        this.fromDate,
        this.toDate
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: TimeSheetDtoPagedResultDto) => {
        var self = this;
        this.timeSchedulers = result.items; 
      });
  }

  getTextByValue(array:KeyValueItem[],value:number){
    for (var i=0; i < array.length; i++) {
      if (array[i].code === value) {
          return array[i].name;
      }
    }
  }  

  private showCreateOrEditTeacherDialog(timeSheetStudent?: TimeSheetStudentDto): void {
    let createOrEditTeacherDialog: BsModalRef;
    
    createOrEditTeacherDialog = this._modalService.show(
      TeacherSchedulerDialogComponent,
      {
        class: 'modal-lg',
        initialState: {
          timeSheetStudent: timeSheetStudent,
        },
      }
    );    

    createOrEditTeacherDialog.content.onSave.subscribe(() => {
      this.loadTimeScheduler(() => {
        this.isTableLoading = false;
      });
    });
  }
}
