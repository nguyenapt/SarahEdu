import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';

import {
  RoomDto,
  CreateRoomDto,
} from '@shared/service-proxies/room/dto/room-dto';


import { forEach as _forEach, map as _map } from 'lodash-es';

@Component({
  templateUrl: 'create-room-dialog.component.html'
})
export class CreateRoomDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  room: CreateRoomDto = new CreateRoomDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _roomService: RoomServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;

    this._roomService
      .create(this.room)
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
