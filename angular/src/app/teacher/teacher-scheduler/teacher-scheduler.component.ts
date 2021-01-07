import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';
import { TimeSheetDto, TimeSheetDtoPagedResultDto } from '@shared/service-proxies/timesheet/dto/timesheet-dto';
import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-scheduler',
  templateUrl: './teacher-scheduler.component.html',
  styleUrls: ['./teacher-scheduler.component.css']
})
export class TeacherSchedulerComponent extends AppComponentBase {
  roomId: string;  
  fromDate: string;
  toDate: string;
  timeSchedulers: TimeSheetDto[]=[];
  constructor(
    injector: Injector,
    private _timesheetService: TimeSheetServiceProxy,
    private _roomService: RoomServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
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
}
