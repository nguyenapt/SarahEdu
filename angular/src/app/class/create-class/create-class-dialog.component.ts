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
import { ClassServiceProxy } from '@shared/service-proxies/class/class.service.proxy';

import { ClassDto, CreateClassDto} from '@shared/service-proxies/class/dto/class-dto';

import { forEach as _forEach, map as _map } from 'lodash-es';

@Component({
  templateUrl: 'create-class-dialog.component.html'
})
export class CreateClassDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  classdto: CreateClassDto = new CreateClassDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _classService: ClassServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;

    this._classService
      .create(this.classdto)
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
