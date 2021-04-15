import { Component, Injector, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { TeacherServiceProxy } from '@shared/service-proxies/teacher/teacher.service.proxy';
import { TeacherDto, TeacherProductivityListResultDto, TeacherProductivityDto, TeacherProductivityTotalDto } from '@shared/service-proxies/teacher/dto/teacher-dto';
import * as moment from 'moment';
import { getDate } from 'date-fns';
import { AppComponentBase } from '@shared/app-component-base';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-teacher-productivity-total',
  templateUrl: './teacher-productivity-total.component.html',
  styleUrls: ['./teacher-productivity-total.component.css']
})
export class TeacherProductivityTotalComponent extends AppComponentBase implements OnInit {
  @Input() period: string;

  fromDate: string;
  toDate: string;

  total:number;
  totalHour:number;
  totalRecords = 0;

  teacherProductivities: TeacherProductivityTotalDto[] = [];

  selectedReportType: any;

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
    private _teacherService: TeacherServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
      this.fromDate = moment().startOf('week').format('YYYY-MM-DD');
      this.toDate = moment().endOf('week').format('YYYY-MM-DD');          
  }

  changeReportType($event){
    if($event != null){      
      this.fromDate = $event.value.fromDate.format('YYYY-MM-DD');
      this.toDate = $event.value.toDate.format('YYYY-MM-DD');      
    }
  }

  searchData(    
    ): void {    
      this._teacherService
        .getTotalProductivities(        
          this.fromDate,
          this.toDate
        )      
        .subscribe((result) => {
          this.teacherProductivities = result.items;
          this.totalRecords = result.totalCount;
          this.total = result.totalFee;
          this.totalHour = result.totalHour;
      });
    }
}
