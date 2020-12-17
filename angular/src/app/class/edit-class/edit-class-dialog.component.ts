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

import { ClassServiceProxy } from '@shared/service-proxies/class/class.service.proxy';

import { ClassDto } from '@shared/service-proxies/class/dto/class-dto';

@Component({
  templateUrl: 'edit-class-dialog.component.html'
})
export class EditClassDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  classdto: ClassDto = new ClassDto();
  id: string;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _classService: ClassServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._classService.get(this.id).subscribe((result: ClassDto) => {
      this.classdto = result;
    });
  }

  save(): void {
    this.saving = true;

    this._classService
      .update(this.classdto)
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
