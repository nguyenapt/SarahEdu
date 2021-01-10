import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';
import { KeyValueItem } from '@shared/interface/keyvalue-item';

import { forEach as _forEach, map as _map } from 'lodash-es';

import * as moment from 'moment';
import { TimeSheetStudentDto } from '@shared/service-proxies/timesheet/dto/timesheet-dto';

@Component({
  selector: 'app-teacher-scheduler-dialog',
  templateUrl: './teacher-scheduler-dialog.component.html',
  styleUrls: ['./teacher-scheduler-dialog.component.css']
})
export class TeacherSchedulerDialogComponent  extends AppComponentBase
  implements OnInit {
  saving = false;
  timeSheetStudent: TimeSheetStudentDto = new TimeSheetStudentDto();
  id: string;
  dateOfBirth :string;
  startDate:string;
  endDate:string;
  attitudes: KeyValueItem[];

  receptiveAbilities: KeyValueItem[];
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _timesheetService: TimeSheetServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.attitudes = [
      {name: '- Select -', code: 0},
      {name: 'High impotant', code: 1},
      {name: 'Normal', code: 2},
      {name: 'Low impotant', code: 3}      
    ];
    this.receptiveAbilities = [
      {name: '- Select -', code: 0},
      {name: 'High impotant', code: 1},
      {name: 'Normal', code: 2},
      {name: 'Low impotant', code: 3}
    ];
  }

  save(): void {
    this.saving = true;
    this._timesheetService
      .createOrUpdateTimeSheetStudent(this.timeSheetStudent)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}