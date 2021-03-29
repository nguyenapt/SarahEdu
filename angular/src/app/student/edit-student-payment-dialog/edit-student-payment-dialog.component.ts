import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { StudentPaymentDto } from '@shared/service-proxies/student/dto/student-dto';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-student-payment-dialog',
  templateUrl: './edit-student-payment-dialog.component.html',
  styleUrls: ['./edit-student-payment-dialog.component.css']
})
export class EditStudentPaymentDialogComponent extends AppComponentBase
implements OnInit {
  saving = false;
  payment: StudentPaymentDto;
  dateOfPayment: string;
  paidForMonth: string;
  id: string;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,

    private _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.dateOfPayment = this.payment.dateOfPayment ? this.payment.dateOfPayment.format().split("T")[0]:"";
    this.paidForMonth = this.payment.paidForMonth ? this.payment.paidForMonth.format().split("T")[0].substring(0,7):"";
  }
  save(): void {
    this.saving = true;

    this.payment.dateOfPayment = this.dateOfPayment ? moment(this.dateOfPayment).format() : <any>undefined;
    this.payment.paidForMonth =  this.paidForMonth ? moment(this.paidForMonth).format() : <any>undefined;

    this._studentService
      .updatePayment(this.payment)
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
