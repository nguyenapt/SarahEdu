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
import { ProtectorServiceProxy } from '@shared/service-proxies/protector/protector.service.proxy';

import { ProtectorDto, CreateProtectorDto} from '@shared/service-proxies/protector/dto/protector-dto';


import { forEach as _forEach, map as _map } from 'lodash-es';

@Component({
  templateUrl: 'create-protector-dialog.component.html'
})
export class CreateProtectorDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  protector: CreateProtectorDto = new CreateProtectorDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _protectorService: ProtectorServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;

    this._protectorService
      .create(this.protector)
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
