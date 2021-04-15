import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';

import { CreateStudyTimeDialogComponent } from './create-study-time/create-study-time-dialog.component';
import { EditStudyTimeDialogComponent } from './edit-study-time/edit-study-time-dialog.component';
import { StudyTimeDto, StudyTimeDtoPagedResultDto } from '@shared/service-proxies/study-time/dto/studytime-dto';
import { StudyTimeServiceProxy } from '@shared/service-proxies/study-time/studytime.service.proxy';
import { StudentDto } from '@shared/service-proxies/student/dto/student-dto';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  animations: [appModuleAnimation()]
})
export class StudyTimeComponent extends PagedListingComponentBase<StudyTimeDto> {
  studytimes: StudyTimeDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _studyTimeService: StudyTimeServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createStudyTime(): void {
    this.showCreateOrEditStudyTimeDialog();
  }

  editStudyTime(studyTime: StudentDto): void {
    this.showCreateOrEditStudyTimeDialog(studyTime.id);
  }

  clearFilters(): void {
    this.keyword = '';
    this.getDataPage(1);
  }

  protected list(
    request: PagedUsersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._studyTimeService
      .getAll(
        request.keyword,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: StudyTimeDtoPagedResultDto) => {
        this.studytimes = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(studyTime: StudyTimeDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', studyTime.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._studyTimeService.delete(studyTime.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditStudyTimeDialog(id?: string): void {
    let createOrEditDialog: BsModalRef;
    if (!id) {
      createOrEditDialog = this._modalService.show(
        CreateStudyTimeDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    else {
      createOrEditDialog = this._modalService.show(
        EditStudyTimeDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
