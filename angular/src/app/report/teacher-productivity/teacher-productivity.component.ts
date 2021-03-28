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
startDate: Date;
endDate: Date;
teacher : TeacherDto;
teacherProductivities: TeacherProductivityDto[] = [];
total:number;
totalHour:number;
rows = 5;
totalRecords = 0;
loading: boolean;

reportTypes = [] = [
  {
    name: 'This month',
    value: 0,
    fromDate: moment().startOf('month'),
    toDate: moment().endOf('month')
  },
  {
    name: 'Last month',
    value: 1,
    fromDate: moment().subtract(1,'months').startOf('month'),
    toDate: moment().subtract(1,'months').endOf('month')
  },
  {
    name: 'This year',
    value: 2,
    fromDate: moment().startOf('month'),
    toDate: moment().endOf('month')
  },
  {
    name: 'Last year',
    value: 3,
    fromDate: moment().subtract(1,'year').startOf('year'),
    toDate: moment().subtract(1,'year').endOf('year')
  },
  {
    name: 'Custom',
    value: 4,
    fromDate: moment().subtract(1,'year').startOf('year'),
    toDate: moment().subtract(1,'year').endOf('year')
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
  this._teacherService
    .getTeachers()            
    .subscribe((result) => {
      this.teachers = result.items;        
  });
}

searchData(    
): void {    
  this._teacherService
    .getProductivities(        
      this.teacher.id,
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
      this._teacherService.getProductivities(this.teacher.id, event.first ,event.rows).subscribe((result) => {
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
