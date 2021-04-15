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

import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';

import { RoomDto } from '@shared/service-proxies/room/dto/room-dto';
import { CustomTenantServiceProxy } from '@shared/service-proxies/custom-tenant/customtenant.service.proxy';
import { CustomTenantDto } from '@shared/service-proxies/custom-tenant/dto/customtenant-dto';
import { StudyTimeDto, StudyTimeDtoPagedResultDto } from '@shared/service-proxies/study-time/dto/studytime-dto';
import { StudyTimeServiceProxy } from '@shared/service-proxies/study-time/studytime.service.proxy';
import { StudentDto } from '@shared/service-proxies/student/dto/student-dto';

@Component({
  templateUrl: 'edit-room-dialog.component.html'
})
export class EditStudyTimeDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  studyTime: StudyTimeDto = new StudyTimeDto();
  id: string;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _studyTimeService: StudyTimeServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
    this._studyTimeService.get(this.id).subscribe((result: StudyTimeDto) => {
      this.studyTime = result;
    });
  }

  save(): void {
    this.saving = true;

    this._studyTimeService
      .update(this.studyTime)
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
