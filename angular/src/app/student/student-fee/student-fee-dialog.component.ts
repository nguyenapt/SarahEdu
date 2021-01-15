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
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { LazyLoadEvent } from 'primeng/api';

class PagedStudentFeeRequestDto extends PagedRequestDto {
  studentId: string;
  fromDate: Date | null;
  toDate: Date | null;
}

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
  rows = 5;
  totalRecords = 0;
  loading: boolean;
  constructor(
    injector: Injector,
    public _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loading = true;
    this._studentService.getFees(this.id,0,5).subscribe((result) => {
        this.studentFees = result.items;
        this.totalRecords = result.totalCount;
        this.loading = false;
    });
  };

  protected list(
    request: PagedStudentFeeRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.studentId = this.id;

    this._studentService
      .getFees(
        request.studentId,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result) => {
        this.studentFees = result.items;
        this.totalRecords = result.totalCount;
        this.total = result.totalFee;
        this.unpaid = result.totalUnpaid;
    });
  }

  loadFees(event: LazyLoadEvent) {  
    this.loading = true;
    setTimeout(() => {
      this._studentService.getFees(this.id, event.first ,event.rows).subscribe((result) => {
        this.studentFees = result.items;
        this.totalRecords = result.totalCount;
        this.total = result.totalFee;
        this.unpaid = result.totalUnpaid;
        this.loading = false;
      })
    }, 1000);
  }
}
