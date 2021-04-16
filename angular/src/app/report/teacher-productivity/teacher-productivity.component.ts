import { Component, Injector, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { TeacherServiceProxy } from '@shared/service-proxies/teacher/teacher.service.proxy';
import { TeacherDto, TeacherProductivityListResultDto, TeacherProductivityDto } from '@shared/service-proxies/teacher/dto/teacher-dto';
import * as moment from 'moment';
import { getDate } from 'date-fns';
import { AppComponentBase } from '@shared/app-component-base';
import { LazyLoadEvent } from 'primeng/api';

class PagedTeacherRequestDto extends PagedRequestDto {
  startDate: Date;
  endDate: Date;
  teacher: TeacherDto;
}

@Component({
  selector: 'app-teacher-productivity',
  templateUrl: './teacher-productivity.component.html',
  styleUrls: ['./teacher-productivity.component.css']
})
export class TeacherProductivityComponent extends AppComponentBase
implements OnInit {  
teachers: TeacherDto[] = [];
keyword = '';
curentDate = new Date();
selectedReportType: any;

fromDate: string;
toDate: string;

teacher : TeacherDto;
teacherProductivities: TeacherProductivityDto[] = [];
total:number;
totalHour:number;
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
    private _teacherService: TeacherServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.fromDate = moment().startOf('week').format('YYYY-MM-DD');
    this.toDate = moment().endOf('week').format('YYYY-MM-DD');       
    this._teacherService
      .getTeachers()            
      .subscribe((result) => {
        this.teachers = result.items;        
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
    this._teacherService
      .getProductivities(        
        this.teacher?.id,
        this.fromDate,
        this.toDate,
        0,
        this.rows
      )      
      .subscribe((result) => {
        this.teacherProductivities = result.items;
        this.totalRecords = result.totalCount;
        this.total = result.totalFee;
        this.totalHour = result.totalHour;
    });
  }

  loadProductivities(event: LazyLoadEvent) {  
    if(this.teacher != null){
      this.loading = true;
      setTimeout(() => {
        this._teacherService.getProductivities(this.teacher?.id,this.fromDate,this.toDate, event.first ,event.rows).subscribe((result) => {
          this.teacherProductivities = result.items;
          this.totalRecords = result.totalCount;
          this.total = result.totalFee;
          this.totalHour = result.totalHour;
          this.loading = false;
        })
      }, 1000);
    }
  }
}
