import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { StudentCommentDto } from '@shared/service-proxies/student/dto/student-dto';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-student-comment-dialog',
  templateUrl: './edit-student-comment-dialog.component.html',
  styleUrls: ['./edit-student-comment-dialog.component.css']
})
export class EditStudentCommentDialogComponent extends AppComponentBase
implements OnInit {
  saving = false;
  comment: StudentCommentDto;
  commentDate: string;
  id: string;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,

    private _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.commentDate = this.comment.commentDate ? this.comment.commentDate.format().split("T")[0]:"";
  }
  save(): void {
    this.saving = true;

    this.comment.commentDate = this.commentDate ? moment(this.commentDate).format() : <any>undefined;

    this._studentService
      .updateComment(this.comment)
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