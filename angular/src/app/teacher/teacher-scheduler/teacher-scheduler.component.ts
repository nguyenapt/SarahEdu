import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';
import { TimeSheetDto, TimeSheetDtoPagedResultDto } from '@shared/service-proxies/timesheet/dto/timesheet-dto';
import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { trigger,state,style,transition,animate } from '@angular/animations';

@Component({
  selector: 'app-teacher-scheduler',
  templateUrl: './teacher-scheduler.component.html',
  styleUrls: ['./teacher-scheduler.component.css'],
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
export class TeacherSchedulerComponent extends AppComponentBase {
  roomId: string;  
  fromDate: string;
  toDate: string;
  timeSchedulers: TimeSheetDto[]=[];
  isTableLoading = true;
  constructor(
    injector: Injector,
    private _timesheetService: TimeSheetServiceProxy,
    private _roomService: RoomServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadTimeScheduler(() => {
      this.isTableLoading = false;
    });
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
        this.timeSchedulers.forEach(function (event) {          
          event.resizable = {
            beforeStart: true,
            afterEnd: true,
          };
          event.draggable = true;
        }); 
      });
  }

  getStatus(status){

  }  
  editTimeScheduler(timeScheduler : TimeSheetDto){

  }

}
