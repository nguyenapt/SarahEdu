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
import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';

import { TimeSheetDto, CreateTimeSheetDto} from '@shared/service-proxies/timesheet/dto/timesheet-dto';


import { forEach as _forEach, map as _map } from 'lodash-es';

@Component({
  templateUrl: 'create-timesheet-dialog.component.html'
})
export class CreateTimeSheetDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  teacher: CreateTimeSheetDto = new CreateTimeSheetDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _teacherService: TimeSheetServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;

    this._teacherService
      .create(this.teacher)
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
