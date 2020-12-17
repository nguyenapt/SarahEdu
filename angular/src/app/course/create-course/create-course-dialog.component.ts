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
import { CourseServiceProxy } from '@shared/service-proxies/course/course.service.proxy';
import { CreateCourseDto } from '@shared/service-proxies/course/dto/course-dto';

import { SubjectDto } from '@shared/service-proxies/subject/dto/subject-dto';

import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  templateUrl: './create-course-dialog.component.html'
})
export class CreateCourseDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  course = new CreateCourseDto();
  subjects: SubjectDto[] = [];
  checkedSubjectsMap: { [key: string]: boolean } = {};
  defaultSubjectCheckedStatus = false;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _courseService: CourseServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._courseService.getSubjects().subscribe((result) => {
      this.subjects = result.items;
      this.setInitialSubjectsStatus();
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
    // just return default role checked status
    // it's better to use a setting
    return this.defaultSubjectCheckedStatus;
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
      .create(this.course)
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
