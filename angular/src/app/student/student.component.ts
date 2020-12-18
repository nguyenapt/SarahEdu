import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import { StudentDto, StudentDtoPagedResultDto } from '@shared/service-proxies/student/dto/student-dto';

import { CreateStudentDialogComponent } from './create-student/create-student-dialog.component';
import { EditStudentDialogComponent } from './edit-student/edit-student-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [appModuleAnimation()]
})
export class StudentComponent extends PagedListingComponentBase<StudentDto> {
  students: StudentDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _studentService: StudentServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createStudent(): void {
    this.showCreateOrEditStudentDialog();
  }

  editStudent(student: StudentDto): void {
    this.showCreateOrEditStudentDialog(student.id);
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

    this._studentService
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
      .subscribe((result: StudentDtoPagedResultDto) => {
        this.students = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(student: StudentDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', student.firstName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._studentService.delete(student.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditStudentDialog(id?: string): void {
    let createOrEditStudentDialog: BsModalRef;
    if (!id) {
      createOrEditStudentDialog = this._modalService.show(
        CreateStudentDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    else {
      createOrEditStudentDialog = this._modalService.show(
        EditStudentDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditStudentDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
