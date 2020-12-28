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

import { CreateTimeSheetDto, TimeSheetDto} from '@shared/service-proxies/timesheet/dto/timesheet-dto';


import { forEach as _forEach, map as _map } from 'lodash-es';
import { CourseSubjectDto, StudentDto } from '@shared/service-proxies/student/dto/student-dto';
import { TeacherDto } from '@shared/service-proxies/teacher/dto/teacher-dto';
import { CourseWithSubjectDto } from '@shared/service-proxies/course/dto/course-dto';

@Component({
  templateUrl: 'create-timesheet-dialog.component.html',
  styleUrls: ['./create-timesheet-dialog.component.css'],
})
export class CreateTimeSheetDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  timeSheet: CreateTimeSheetDto = new CreateTimeSheetDto();
  
  students : StudentDto[] = [];
  selectedStudents : StudentDto[] = [];
  
  teachers : TeacherDto[] = [];
  selectedTeacher : TeacherDto;
  
  courses : CourseWithSubjectDto[] = [];
  selectCourse : CourseWithSubjectDto;
  
  courseSubjects : CourseSubjectDto[] = [];
  selectSubject : CourseSubjectDto;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _timeSheetService: TimeSheetServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._timeSheetService.getCourses().subscribe((result) => {
      this.courses = result.items;
    });  
  }

  changeCourse($event){
    if($event == null){
      this.courseSubjects = [];
    }
    else{
      this.courseSubjects = [];
      this.courseSubjects = $event.value.courseSubjects;
    }
  }

  save(): void {
    this.saving = true;

    this._timeSheetService
      .create(this.timeSheet)
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
