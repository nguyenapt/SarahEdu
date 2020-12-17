import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { SubjectServiceProxy } from '@shared/service-proxies/subject/subject.service.proxy';
import { SubjectDto, SubjectDtoPagedResultDto } from '@shared/service-proxies/subject/dto/subject-dto';

import { CreateSubjectDialogComponent } from './create-subject/create-subject-dialog.component';
import { EditSubjectDialogComponent } from './edit-subject/edit-subject-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  animations: [appModuleAnimation()]
})
export class SubjectComponent extends PagedListingComponentBase<SubjectDto> {
  subjects: SubjectDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _subjectService: SubjectServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createSubject(): void {
    this.showCreateOrEditSubjectDialog();
  }

  editSubject(subject: SubjectDto): void {
    this.showCreateOrEditSubjectDialog(subject.id);
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

    this._subjectService
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
      .subscribe((result: SubjectDtoPagedResultDto) => {
        this.subjects = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(subject: SubjectDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', subject.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._subjectService.delete(subject.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditSubjectDialog(id?: string): void {
    let createOrEditSubjectDialog: BsModalRef;
    if (!id) {
      createOrEditSubjectDialog = this._modalService.show(
        CreateSubjectDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    else {
      createOrEditSubjectDialog = this._modalService.show(
        EditSubjectDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditSubjectDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
