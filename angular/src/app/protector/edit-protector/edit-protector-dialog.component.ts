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

import { ProtectorServiceProxy } from '@shared/service-proxies/protector/protector.service.proxy';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';

import { ProtectorDto } from '@shared/service-proxies/protector/dto/protector-dto';
import { StudentDto} from '@shared/service-proxies/student/dto/student-dto';

import * as moment from 'moment';

@Component({
  templateUrl: 'edit-protector-dialog.component.html'
})
export class EditProtectorDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  protector: ProtectorDto = new ProtectorDto();
  id: string;
  students : StudentDto[] = [];
  selectedStudents :StudentDto[];
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _protectorService: ProtectorServiceProxy,
    public _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._protectorService.get(this.id).subscribe((result: ProtectorDto) => {
      this.protector = result;
      this.selectedStudents = this.protector.students;
    });

    this._studentService.getStudents().subscribe((result) => {
      this.students = result.items;
    });
  }

  save(): void {
    this.saving = true;
    this.protector.students = this.selectedStudents;
    this._protectorService
      .update(this.protector)
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
