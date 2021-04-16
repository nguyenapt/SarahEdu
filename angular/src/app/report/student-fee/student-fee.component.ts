import { Component, Injector, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import { StudentDto, StudentDtoPagedResultDto, StudentFeeDto } from '@shared/service-proxies/student/dto/student-dto';
import * as moment from 'moment';
import { getDate } from 'date-fns';
import { AppComponentBase } from '@shared/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
class PagedUsersRequestDto extends PagedRequestDto {
  startDate: Date;
  endDate: Date;
  student: StudentDto;
}

@Component({
  selector: 'app-student-fee',
  templateUrl: './student-fee.component.html',
  styleUrls: ['./student-fee.component.css']
})
export class StudentFeeComponent extends AppComponentBase
  implements OnInit {  
  students: StudentDto[] = [];
  keyword = '';
  curentDate = new Date();
  selectedReportType: any;

  fromDate: string;
  toDate: string;

  student : StudentDto;
  studentFees: StudentFeeDto[] = [];
  total:number;
  totalPayment:number;
  unpaid:number;
  rows = 5;
  totalRecords = 0;
  loading: boolean;
  
  reportTypes = [] = [
  {
    name: 'This week',
    value: 0,
    fromDate: moment().startOf('week'),
    toDate: moment().endOf('week')
  },
  {
    name: 'This month',
    value: 1,
    fromDate: moment().startOf('month'),
    toDate: moment().endOf('month')
  },
  {
    name: 'Last month',
    value: 2,
    fromDate: moment().subtract(1,'months').startOf('month'),
    toDate: moment().subtract(1,'months').endOf('month')
  },
  {
    name: 'This year',
    value: 3,
    fromDate: moment().startOf('year'),
    toDate: moment().endOf('year')
  },
  {
    name: 'Last year',
    value: 4,
    fromDate: moment().subtract(1,'year').startOf('year'),
    toDate: moment().subtract(1,'year').endOf('year')
  },
  {
    name: 'Custom',
    value: 5,
    fromDate: moment(),
    toDate: moment()
  },
];


  constructor(
    injector: Injector,
    private _studentService: StudentServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.fromDate = moment().startOf('week').format('YYYY-MM-DD');
    this.toDate = moment().endOf('week').format('YYYY-MM-DD');       
    this._studentService
      .getStudents()            
      .subscribe((result) => {
        this.students = result.items;        
    });
  }

  changeReportType($event){
    if($event != null){      
      this.fromDate = $event.value.fromDate.format('YYYY-MM-DD');
      this.toDate = $event.value.toDate.format('YYYY-MM-DD');      
    }
  }
  
  searchData(    
  ): void {    
    this._studentService
      .getFees(        
        this.student?.id,
        this.fromDate,
        this.toDate,
        0,
        this.rows
      )      
      .subscribe((result) => {
        this.studentFees = result.items;
        this.totalRecords = result.totalCount;
        this.total = result.totalFee;
        this.totalPayment = result.totalPayment;
        this.unpaid = result.totalFee - result.totalPayment;
    });
  }
  loadFees(event: LazyLoadEvent) {  
    if(this.student != null){
      this.loading = true;
      setTimeout(() => {
        this._studentService.getFees(this.student?.id,this.fromDate,this.toDate, event.first ,event.rows).subscribe((result) => {
          this.studentFees = result.items;
          this.totalRecords = result.totalCount;
          this.total = result.totalFee;
          this.totalPayment = result.totalPayment;
          this.unpaid = result.totalFee - result.totalPayment;
          this.loading = false;
        })
      }, 1000);
    }
  }
}
