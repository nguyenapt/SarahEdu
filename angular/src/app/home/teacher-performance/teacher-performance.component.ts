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
  selector: 'app-teacher-performance',
  templateUrl: './teacher-performance.component.html',
  styleUrls: ['./teacher-performance.component.css']
})
export class TeacherPerformanceComponent extends AppComponentBase implements OnInit {
  @Input() period: string;

  fromDate: string;
  toDate: string;

  total:number;
  totalHour:number;
  totalRecords = 0;

  teacherProductivities: TeacherProductivityTotalDto[] = [];

  constructor(
    injector: Injector,
    private _teacherService: TeacherServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    switch (this.period) {
      case "THISWEEK":
          this.fromDate = moment().startOf('week').format('YYYY-MM-DD');
          this.toDate = moment().endOf('week').format('YYYY-MM-DD');
          break;
      case "THISMONTH":
        this.fromDate = moment().startOf('month').format('YYYY-MM-DD');
        this.toDate = moment().endOf('month').format('YYYY-MM-DD');
          break;
      case "LASTMONTH":
        this.fromDate = moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD');
        this.toDate = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD');
          break;
      case "THISYEAR":
        this.fromDate = moment().startOf('year').format('YYYY-MM-DD');
        this.toDate = moment().endOf('year').format('YYYY-MM-DD');
          break;
      case "LASTYEAR":
        this.fromDate = moment().subtract(1,'year').startOf('year').format('YYYY-MM-DD');
        this.toDate = moment().subtract(1,'year').endOf('year').format('YYYY-MM-DD');
          break;      
      default:
          console.log("No such day exists!");
          break;
    }
    this.searchData();
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
