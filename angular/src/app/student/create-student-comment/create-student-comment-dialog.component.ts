import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateStudentCommentDto } from '@shared/service-proxies/student/dto/student-dto';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-student-comment-dialog',
  templateUrl: './create-student-comment-dialog.component.html',
  styleUrls: ['./create-student-comment-dialog.component.css']
})
export class CreateStudentCommentDialogComponent extends AppComponentBase
implements OnInit {
  saving = false;
  comment: CreateStudentCommentDto = new CreateStudentCommentDto();
  studentId:string;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,

    private _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;
    this.comment.studentId = this.studentId;
    this._studentService
      .createComment(this.comment)
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