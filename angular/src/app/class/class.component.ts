import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { ClassServiceProxy } from '@shared/service-proxies/class/class.service.proxy';
import { ClassDto,ClassDtoPagedResultDto } from '@shared/service-proxies/class/dto/class-dto';

import { CreateClassDialogComponent } from './create-class/create-class-dialog.component';
import { EditClassDialogComponent } from './edit-class/edit-class-dialog.component';


class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './class.component.html',
  animations: [appModuleAnimation()]
})
export class ClassComponent extends PagedListingComponentBase<ClassDto> {
  classes: ClassDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _classService: ClassServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createClass(): void {
    this.showCreateOrEditClassDialog();
  }

  editClass(classdto: ClassDto): void {
    this.showCreateOrEditClassDialog(classdto.id);
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

    this._classService
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
      .subscribe((result: ClassDtoPagedResultDto) => {
        this.classes = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(classdto: ClassDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', classdto.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._classService.delete(classdto.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditClassDialog(id?: string): void {
    let createOrEditClassDialog: BsModalRef;
    if (!id) {
      createOrEditClassDialog = this._modalService.show(
        CreateClassDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    else {
      createOrEditClassDialog = this._modalService.show(
        EditClassDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditClassDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
