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
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import { CreateStudentPaymentDto } from '@shared/service-proxies/student/dto/student-dto';

@Component({
  selector: 'create-student-payment-dialog',
  templateUrl: './create-student-payment-dialog.component.html',
  styleUrls: ['./create-student-payment-dialog.component.css']
})
export class CreateStudentPaymentDialogComponent extends AppComponentBase
implements OnInit {
  saving = false;
  payment: CreateStudentPaymentDto = new CreateStudentPaymentDto();
  studentId:string;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,

    private _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;
    this.payment.studentId = this.studentId;
    this._studentService
      .createPayment(this.payment)
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
