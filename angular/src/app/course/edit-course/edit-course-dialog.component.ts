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
import { CourseServiceProxy } from '@shared/service-proxies/course/course.service.proxy';
import { CourseDto } from '@shared/service-proxies/course/dto/course-dto';
import { SubjectDto } from '@shared/service-proxies/subject/dto/subject-dto';

@Component({
  templateUrl: './edit-course-dialog.component.html'
})
export class EditCourseDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  course = new CourseDto();
  subjects: SubjectDto[] = [];
  checkedSubjectsMap: { [key: string]: boolean } = {};
  id: string;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _courseService: CourseServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._courseService.get(this.id).subscribe((result) => {
      this.course = result;

      this._courseService.getSubjects().subscribe((result2) => {
        this.subjects = result2.items;
        this.setInitialSubjectsStatus();
      });
    });
  }

  setInitialSubjectsStatus(): void {
    _map(this.subjects, (item) => {
      this.checkedSubjectsMap[item.name] = this.isSubjectChecked(
        item.name
      );
    });
  }

  isSubjectChecked(name: string): boolean {
    return _includes(this.course.subjects, name);
  }

  onSubjectChange(subject: SubjectDto, $event) {
    this.checkedSubjectsMap[subject.name] = $event.target.checked;
  }

  getCheckedSubjects(): string[] {
    const subjects: string[] = [];
    _forEach(this.checkedSubjectsMap, function (value, key) {
      if (value) {
        subjects.push(key);
      }
    });
    return subjects;
  }

  save(): void {
    this.saving = true;

    this.course.subjects = this.getCheckedSubjects();

    this._courseService
      .update(this.course)
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
