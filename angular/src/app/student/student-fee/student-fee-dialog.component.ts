import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { StudentDto, StudentFeeDto } from '@shared/service-proxies/student/dto/student-dto';
import * as moment from 'moment';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';

@Component({
  selector: 'app-student-fee-dialog',
  templateUrl: './student-fee-dialog.component.html',
  styleUrls: ['./student-fee-dialog.component.css']
})
export class StudentFeeDialogComponent  extends AppComponentBase
implements OnInit {
  id: string;
  studentFees: StudentFeeDto[] = [];
  total:number;
  unpaid:number;
  constructor(
    injector: Injector,
    public _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._studentService.getFees(this.id).subscribe((result) => {
        this.studentFees = result.items;
        this.calculateTotal();
    });
  };

  calculateTotal() {
      let total = 0;
      let unpaid = 0;
      for(let fee of this.studentFees) {
          total += fee.fee;
          if(!fee.isPaid){
            unpaid +=fee.fee;
          }
      }

      this.total = total;
      this.unpaid = unpaid;
  }
}
