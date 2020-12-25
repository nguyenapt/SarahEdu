import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { TeacherServiceProxy } from '@shared/service-proxies/teacher/teacher.service.proxy';
import { TeacherDto, TeacherDtoPagedResultDto } from '@shared/service-proxies/teacher/dto/teacher-dto';

import { CreateTeacherDialogComponent } from './create-teacher/create-teacher-dialog.component';
import { EditTeacherDialogComponent } from './edit-teacher/edit-teacher-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  animations: [appModuleAnimation()]
})
export class TeacherComponent extends PagedListingComponentBase<TeacherDto> {
  teachers: TeacherDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _teacherService: TeacherServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createTeacher(): void {
    this.showCreateOrEditTeacherDialog();
  }

  editTeacher(teacher: TeacherDto): void {
    this.showCreateOrEditTeacherDialog(teacher.id);
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

    this._teacherService
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
      .subscribe((result: TeacherDtoPagedResultDto) => {
        this.teachers = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(teacher: TeacherDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', teacher.fullName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._teacherService.delete(teacher.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditTeacherDialog(id?: string): void {
    let createOrEditTeacherDialog: BsModalRef;
    if (!id) {
      createOrEditTeacherDialog = this._modalService.show(
        CreateTeacherDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    else {
      createOrEditTeacherDialog = this._modalService.show(
        EditTeacherDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditTeacherDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
