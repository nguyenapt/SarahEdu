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
import { TeacherServiceProxy } from '@shared/service-proxies/teacher/teacher.service.proxy';

import { TeacherDto, CreateTeacherDto} from '@shared/service-proxies/teacher/dto/teacher-dto';

import { forEach as _forEach, map as _map } from 'lodash-es';

@Component({
  templateUrl: 'create-teacher-dialog.component.html'
})
export class CreateTeacherDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  teacher: CreateTeacherDto = new CreateTeacherDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _teacherService: TeacherServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;

    this._teacherService
      .create(this.teacher)
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
