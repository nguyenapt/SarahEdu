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

import { forEach as _forEach, map as _map } from 'lodash-es';
import { CreateStudyTimeDto } from '@shared/service-proxies/study-time/dto/studytime-dto';
import { StudyTimeServiceProxy } from '@shared/service-proxies/study-time/studytime.service.proxy';

@Component({
  templateUrl: 'create-room-dialog.component.html'
})
export class CreateStudyTimeDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  studyTime: CreateStudyTimeDto = new CreateStudyTimeDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _studyTimeService: StudyTimeServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;    
    this._studyTimeService
      .create(this.studyTime)
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
