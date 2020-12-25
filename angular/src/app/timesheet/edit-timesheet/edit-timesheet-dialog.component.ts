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

import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';

import { TimeSheetDto } from '@shared/service-proxies/timesheet/dto/timesheet-dto';

import * as moment from 'moment';
import { CalendarEvent } from 'angular-calendar';
import { StudentDto } from '@shared/service-proxies/student/dto/student-dto';
import { TeacherDto } from '@shared/service-proxies/teacher/dto/teacher-dto';
import { CourseDto } from '@shared/service-proxies/course/dto/course-dto';

@Component({
  templateUrl: 'edit-timesheet-dialog.component.html'
})
export class EditTimeSheetDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  timeSheet: TimeSheetDto = new TimeSheetDto();
  students : StudentDto[] = [];
  selectedStudents : StudentDto[] = [];
  
  teachers : TeacherDto[] = [];
  selectedTeacher : TeacherDto;
  
  courses : CourseDto[] = [];
  selectCourse : CourseDto;
  
  courseSubjects : any[] = [];
  selectSubject : any;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _timesheetService: TimeSheetServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // this._timesheetService.get(this.event.id.toString()).subscribe((result: TimeSheetDto) => {
    //   this.timeSheet = result;
    //   this.startDate = this.timeSheet.start ? this.timeSheet.start.toString():"";
    //   this.endDate = this.timeSheet.start ? this.timeSheet.start.toString():"";
    // });
  }

  save(): void {
    this.saving = true;

    // this.timeSheet.start =  this.startDate ? moment(this.startDate).format() : <any>undefined;
    // this.timeSheet.start = this.endDate ? moment(this.endDate).format(): <any>undefined;

    this._timesheetService
      .update(this.timeSheet)
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
