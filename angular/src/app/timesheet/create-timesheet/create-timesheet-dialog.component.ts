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

import { TimeSheetDto} from '@shared/service-proxies/timesheet/dto/timesheet-dto';


import { forEach as _forEach, map as _map } from 'lodash-es';
import { StudentDto } from '@shared/service-proxies/student/dto/student-dto';
import { TeacherDto } from '@shared/service-proxies/teacher/dto/teacher-dto';
import { CourseDto } from '@shared/service-proxies/course/dto/course-dto';

@Component({
  templateUrl: 'create-timesheet-dialog.component.html',
  styleUrls: ['./create-timesheet-dialog.component.css'],
})
export class CreateTimeSheetDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  timeSheet: TimeSheetDto = new TimeSheetDto();
  students : StudentDto[] = [];
  selectedStudents : StudentDto[] = [];
  
  teachers : TeacherDto[] = [];
  selectedTeacher : TeacherDto;
  
  courses : CourseDto[] = [];
  selectedCourse : CourseDto;
  
  courseSubjects : any[] = [];
  selectSubject : any;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _teacherService: TimeSheetServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;

    this._teacherService
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