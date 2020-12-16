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

import { SubjectServiceProxy } from '@shared/service-proxies/subject/subject.service.proxy';

import { SubjectDto } from '@shared/service-proxies/subject/dto/subject-dto';

@Component({
  templateUrl: 'edit-subject-dialog.component.html'
})
export class EditSubjectDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  subject: SubjectDto = new SubjectDto();
  id: string;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _subjectService: SubjectServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._subjectService.get(this.id).subscribe((result: SubjectDto) => {
      this.subject = result;
    });
  }

  save(): void {
    this.saving = true;

    this._subjectService
      .update(this.subject)
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
