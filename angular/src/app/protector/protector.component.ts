import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { ProtectorServiceProxy } from '@shared/service-proxies/protector/protector.service.proxy';
import { ProtectorDto, ProtectorDtoPagedResultDto } from '@shared/service-proxies/protector/dto/protector-dto';

import { CreateProtectorDialogComponent } from './create-protector/create-protector-dialog.component';
import { EditProtectorDialogComponent } from './edit-protector/edit-protector-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './protector.component.html',
  styleUrls: ['./protector.component.css'],
  animations: [appModuleAnimation()]
})
export class ProtectorComponent extends PagedListingComponentBase<ProtectorDto> {
  protectors: ProtectorDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _protectorService: ProtectorServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createProtector(): void {
    this.showCreateOrEditProtectorDialog();
  }

  editProtector(protector: ProtectorDto): void {
    this.showCreateOrEditProtectorDialog(protector.id);
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

    this._protectorService
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
      .subscribe((result: ProtectorDtoPagedResultDto) => {
        this.protectors = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(protector: ProtectorDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', protector.fullName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._protectorService.delete(protector.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditProtectorDialog(id?: string): void {
    let createOrEditProtectorDialog: BsModalRef;
    if (!id) {
      createOrEditProtectorDialog = this._modalService.show(
        CreateProtectorDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    else {
      createOrEditProtectorDialog = this._modalService.show(
        EditProtectorDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditProtectorDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
