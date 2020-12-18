import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import { CreateStudentDto, CourseSubjectDto } from '@shared/service-proxies/student/dto/student-dto';

import {  } from '@shared/service-proxies/student/dto/student-dto';

import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  templateUrl: './create-student-dialog.component.html'
})
export class CreateStudentDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  student = new CreateStudentDto();
  courseSubjects: CourseSubjectDto[] = [];
  checkedCourseSubjectsMap: { [key: string]: boolean } = {};
  defaultCourseSubjectCheckedStatus = false;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._studentService.getCourseSubjects().subscribe((result) => {
      this.courseSubjects = result.items;
      this.setInitialSubjectsStatus();
    });
  }

  setInitialSubjectsStatus(): void {
    _map(this.courseSubjects, (item) => {
      this.checkedCourseSubjectsMap[item.courseName + item.subjectName] = this.isCourseSubjectChecked(
        item.courseName+item.subjectName
      );
    });
  }

  isCourseSubjectChecked(name: string): boolean {
    // just return default role checked status
    // it's better to use a setting
    return this.defaultCourseSubjectCheckedStatus;
  }

  onCourseSubjectChange(courseSubject: CourseSubjectDto, $event) {
    this.checkedCourseSubjectsMap[courseSubject.courseName+courseSubject.subjectName] = $event.target.checked;
  }

  getCheckedCourseSubjects(): string[] {
    const subjects: string[] = [];
    _forEach(this.checkedCourseSubjectsMap, function (value, key) {
      if (value) {
        subjects.push(key);
      }
    });
    return subjects;
  }

  save(): void {
    this.saving = true;

    this.student.subjects = this.getCheckedCourseSubjects();

    this._studentService
      .create(this.student)
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
