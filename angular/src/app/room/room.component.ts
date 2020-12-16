import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';
import { RoomDto, RoomDtoPagedResultDto } from '@shared/service-proxies/room/dto/room-dto';

import { CreateRoomDialogComponent } from './create-room/create-room-dialog.component';
//import { EditUserDialogComponent } from './edit-user/edit-user-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './room.component.html',
  animations: [appModuleAnimation()]
})
export class RoomComponent extends PagedListingComponentBase<RoomDto> {
  rooms: RoomDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _roomService: RoomServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createRoom(): void {
    this.showCreateOrEditUserDialog();
  }

  // editUser(user: RoomDto): void {
  //   this.showCreateOrEditUserDialog(user.id);
  // }

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

    this._roomService
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
      .subscribe((result: RoomDtoPagedResultDto) => {
        this.rooms = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(room: RoomDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', room.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._roomService.delete(room.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditUserDialog(id?: number): void {
    let createOrEditUserDialog: BsModalRef;
    if (!id) {
      createOrEditUserDialog = this._modalService.show(
        CreateRoomDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    // else {
    //   createOrEditUserDialog = this._modalService.show(
    //     EditUserDialogComponent,
    //     {
    //       class: 'modal-lg',
    //       initialState: {
    //         id: id,
    //       },
    //     }
    //   );
    // }

    createOrEditUserDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
