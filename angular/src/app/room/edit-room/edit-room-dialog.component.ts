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

@Component({
  templateUrl: 'edit-room-dialog.component.html'
})
export class EditRoomDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  room: RoomDto = new RoomDto();
  id: string;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _roomService: RoomServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._roomService.get(this.id).subscribe((result: RoomDto) => {
      this.room = result;
    });
  }

  save(): void {
    this.saving = true;

    this._roomService
      .update(this.room)
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
