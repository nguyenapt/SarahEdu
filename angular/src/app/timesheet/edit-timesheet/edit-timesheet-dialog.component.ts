import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';

import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';

import { TimeSheetDto } from '@shared/service-proxies/timesheet/dto/timesheet-dto';

import * as moment from 'moment';

@Component({
  templateUrl: 'edit-timesheet-dialog.component.html'
})
export class EditTimeSheetDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  teacher: TimeSheetDto = new TimeSheetDto();
  id: string;
  dateOfBirth :string;
  startDate:string;
  endDate:string;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _teacherService: TimeSheetServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._teacherService.get(this.id).subscribe((result: TimeSheetDto) => {
      this.teacher = result;
      this.dateOfBirth = this.teacher.dateOfBirth ? this.teacher.dateOfBirth.format().split("T")[0]:"";
      this.startDate = this.teacher.startDate ? this.teacher.startDate.format().split("T")[0]:"";
      this.endDate = this.teacher.endDate ? this.teacher.endDate.format().split("T")[0]:"";
    });
  }

  save(): void {
    this.saving = true;

    this.teacher.dateOfBirth = this.dateOfBirth ? moment(this.dateOfBirth).format() : <any>undefined;
    this.teacher.startDate =  this.startDate ? moment(this.startDate).format() : <any>undefined;
    this.teacher.endDate = this.endDate ? moment(this.endDate).format(): <any>undefined;

    this._teacherService
      .update(this.teacher)
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
