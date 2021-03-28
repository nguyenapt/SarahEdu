import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { StudentDto, StudentPaymentDto } from '@shared/service-proxies/student/dto/student-dto';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateStudentPaymentDialogComponent } from '../create-student-payment/create-student-payment-dialog.component';

@Component({
  selector: 'app-student-payment-list-dialog',
  templateUrl: './student-payment-list-dialog.component.html',
  styleUrls: ['./student-payment-list-dialog.component.css']
})
export class StudentPaymentListDialogComponent extends AppComponentBase
implements OnInit {
  studentId: string;
  total: number;
  studentPayments: StudentPaymentDto[] = [];

  constructor(
    injector: Injector,
    public _studentService: StudentServiceProxy,
    public _modalService: BsModalService,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._studentService.getPayments(this.studentId,undefined,undefined).subscribe((result) => {
      this.studentPayments = result.items;
      this.calculateTotal();
    });
  }
  calculateTotal() {
    let total = 0;
    for(let payment of this.studentPayments) {
        total += payment.paymentAmount;
    }

    this.total = total;
  }

  createPayment(){
    this._modalService.show(
      CreateStudentPaymentDialogComponent,
      {
        class: 'modal-lg',
        initialState: {
          studentId: this.studentId,
        },
      }
    );
  }
  editPayment(payment: StudentPaymentDto){

  }
  deletePayment(payment: StudentPaymentDto){
    
  }
}
