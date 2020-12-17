import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { CourseServiceProxy } from '@shared/service-proxies/course/course.service.proxy';
import { CourseDto, CourseDtoPagedResultDto } from '@shared/service-proxies/course/dto/course-dto';

import { CreateCourseDialogComponent } from './create-course/create-course-dialog.component';
import { EditCourseDialogComponent } from './edit-course/edit-course-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  animations: [appModuleAnimation()]
})
export class CourseComponent extends PagedListingComponentBase<CourseDto> {
  courses: CourseDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _courseService: CourseServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createCourse(): void {
    this.showCreateOrEditCourseDialog();
  }

  editCourse(course: CourseDto): void {
    this.showCreateOrEditCourseDialog(course.id);
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

    this._courseService
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
      .subscribe((result: CourseDtoPagedResultDto) => {
        this.courses = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(course: CourseDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', course.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._courseService.delete(course.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditCourseDialog(id?: string): void {
    let createOrEditCourseDialog: BsModalRef;
    if (!id) {
      createOrEditCourseDialog = this._modalService.show(
        CreateCourseDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    else {
      createOrEditCourseDialog = this._modalService.show(
        EditCourseDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditCourseDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
