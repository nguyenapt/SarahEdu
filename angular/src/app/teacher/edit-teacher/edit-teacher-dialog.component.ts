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

@Component({
  templateUrl: 'edit-teacher-dialog.component.html'
})
export class EditTeacherDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  teacher: TeacherDto = new TeacherDto();
  id: string;

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
    });
  }

  save(): void {
    this.saving = true;

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
