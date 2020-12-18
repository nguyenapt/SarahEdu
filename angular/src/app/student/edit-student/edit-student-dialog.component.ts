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
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import { StudentDto,CourseSubjectDto } from '@shared/service-proxies/student/dto/student-dto';

@Component({
  templateUrl: './edit-student-dialog.component.html'
})
export class EditStudentDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  student = new StudentDto();
  courseSubjects: CourseSubjectDto[] = [];
  checkedCourseSubjectsMap: { [key: string]: boolean } = {};
  id: string;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._studentService.get(this.id).subscribe((result) => {
      this.student = result;

      this._studentService.getCourseSubjects().subscribe((result2) => {
        this.courseSubjects = result2.items;
        this.setInitialCourseSubjectsStatus();
      });
    });
  }

  setInitialCourseSubjectsStatus(): void {
    _map(this.courseSubjects, (item) => {
      this.checkedCourseSubjectsMap[item.courseName+item.subjectName] = this.isCourseSubjectChecked(
        item.courseName+item.subjectName
      );
    });
  }

  isCourseSubjectChecked(name: string): boolean {
    return _includes(this.student.subjects, name);
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
      .update(this.student)
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
