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
import * as moment from 'moment';

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
  dateOfBirth :string;
  startDate:string;
  endDate:string;

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
        this.dateOfBirth = this.student.dateOfBirth ? this.student.dateOfBirth.format().split("T")[0]:"";
        this.startDate = this.student.startDate ? this.student.startDate.format().split("T")[0]:"";
        this.endDate = this.student.endDate ? this.student.endDate.format().split("T")[0]:"";
        this._studentService.getCourseSubjects().subscribe((result2) => {
        this.courseSubjects = result2.items;
        this.setInitialCourseSubjectsStatus();
      });
    });
  }

  setInitialCourseSubjectsStatus(): void {
    _map(this.courseSubjects, (item) => {
      this.checkedCourseSubjectsMap[item.id] = this.isCourseSubjectChecked(
        item.id
      );
    });
  }

  isCourseSubjectChecked(name: string): boolean {
    return _includes(this.student.courseSubjects, name);
  }

  onCourseSubjectChange(courseSubject: CourseSubjectDto, $event) {
    this.checkedCourseSubjectsMap[courseSubject.id] = $event.target.checked;
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

    this.student.dateOfBirth = this.dateOfBirth ? moment(this.dateOfBirth).format() : <any>undefined;
    this.student.startDate =  this.startDate ? moment(this.startDate).format() : <any>undefined;
    this.student.endDate = this.endDate ? moment(this.endDate).format(): <any>undefined;

    this.student.courseSubjects = this.getCheckedCourseSubjects();

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
