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

import { ProtectorServiceProxy } from '@shared/service-proxies/protector/protector.service.proxy';

import { ProtectorDto } from '@shared/service-proxies/protector/dto/protector-dto';

import * as moment from 'moment';

@Component({
  templateUrl: 'edit-protector-dialog.component.html'
})
export class EditProtectorDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  protector: ProtectorDto = new ProtectorDto();
  id: string;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _protectorService: ProtectorServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._protectorService.get(this.id).subscribe((result: ProtectorDto) => {
      this.protector = result;      
    });
  }

  save(): void {
    this.saving = true;
    this._protectorService
      .update(this.protector)
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
