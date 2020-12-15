import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  RoomServiceProxy,
  RoomDto,
  RoomDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
//import { CreateRoleDialogComponent } from './create-role/create-role-dialog.component';
//import { EditRoleDialogComponent } from './edit-role/edit-role-dialog.component';

class PagedRoomsRequestDto extends PagedRequestDto {
  keyword: string;
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

  list(
    request: PagedRoomsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._roomService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
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

  delete(room: RoomDto): void {
    abp.message.confirm(
      this.l('RoomDeleteWarningMessage', room.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._roomService
            .delete(room.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }

  createRoom(): void {
    this.showCreateOrEditRoomDialog();
  }

  editRoom(room: RoomDto): void {
    this.showCreateOrEditRoomDialog(room.id);
  }

  showCreateOrEditRoomDialog(id?: string): void {
    let createOrEditRoleDialog: BsModalRef;
    /*if (!id) {
      createOrEditRoleDialog = this._modalService.show(
        CreateRoleDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditRoleDialog = this._modalService.show(
        EditRoleDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditRoleDialog.content.onSave.subscribe(() => {
      this.refresh();
    });*/
  }
}
