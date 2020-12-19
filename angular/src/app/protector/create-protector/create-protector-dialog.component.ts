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
import { ProtectorServiceProxy } from '@shared/service-proxies/protector/protector.service.proxy';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';

import { ProtectorDto, CreateProtectorDto} from '@shared/service-proxies/protector/dto/protector-dto';
import { StudentDto} from '@shared/service-proxies/student/dto/student-dto';

import { forEach as _forEach, map as _map } from 'lodash-es';

@Component({
  templateUrl: 'create-protector-dialog.component.html'
})
export class CreateProtectorDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  protector: CreateProtectorDto = new CreateProtectorDto();
  students : StudentDto[] = [];
  selectedStudents : StudentDto[] = [];
  selectStudent :StudentDto;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _protectorService: ProtectorServiceProxy,
    private _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._studentService.getStudents().subscribe((result) => {
      this.students = result.items;
    });
  }

  save(): void {
    this.saving = true;

    this._protectorService
      .create(this.protector)
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
