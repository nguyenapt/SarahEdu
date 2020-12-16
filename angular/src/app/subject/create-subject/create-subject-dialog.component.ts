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
import { SubjectServiceProxy } from '@shared/service-proxies/subject/subject.service.proxy';


import {
  SubjectDto,
  CreateSubjectDto,
} from '@shared/service-proxies/subject/dto/subject-dto';


import { forEach as _forEach, map as _map } from 'lodash-es';

@Component({
  templateUrl: 'create-subject-dialog.component.html'
})
export class CreateSubjectDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  subject: CreateSubjectDto = new CreateSubjectDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _subjectService: SubjectServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;

    this._subjectService
      .create(this.subject)
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
