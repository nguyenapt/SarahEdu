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
import { CustomTenantServiceProxy } from '@shared/service-proxies/custom-tenant/customtenant.service.proxy';
import { CustomTenantDto } from '@shared/service-proxies/custom-tenant/dto/customtenant-dto';

@Component({
  templateUrl: 'create-room-dialog.component.html'
})
export class CreateRoomDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  room: CreateRoomDto = new CreateRoomDto();
  tenants:CustomTenantDto[]=[];
  selectedTenant:CustomTenantDto;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _roomService: RoomServiceProxy,
    private _tenantService: CustomTenantServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._tenantService.getCustomTenant().subscribe((result) => {
      this.tenants = result.items;      
    }); 
  }

  save(): void {
    this.saving = true;
    this.room.customTenantId = this.selectedTenant.id;
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
