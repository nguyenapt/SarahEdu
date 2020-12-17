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

import { TeacherServiceProxy } from '@shared/service-proxies/teacher/teacher.service.proxy';

import { TeacherDto } from '@shared/service-proxies/teacher/dto/teacher-dto';

import * as moment from 'moment';

@Component({
  templateUrl: 'edit-teacher-dialog.component.html'
})
export class EditTeacherDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  teacher: TeacherDto = new TeacherDto();
  id: string;
  dateOfBirth :string;
  startDate:string;
  endDate:string;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _teacherService: TeacherServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._teacherService.get(this.id).subscribe((result: TeacherDto) => {
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
