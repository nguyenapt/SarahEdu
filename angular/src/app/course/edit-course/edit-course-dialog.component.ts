import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { CourseServiceProxy } from '@shared/service-proxies/course/course.service.proxy';
import { CourseDto } from '@shared/service-proxies/course/dto/course-dto';

@Component({
  templateUrl: 'edit-course-dialog.component.html'
})
export class EditCourseDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  course: CourseDto = new CourseDto();
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
    this._courseService.get(this.id).subscribe((result: CourseDto) => {
      this.course = result;
    });
  }

  save(): void {
    this.saving = true;

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
