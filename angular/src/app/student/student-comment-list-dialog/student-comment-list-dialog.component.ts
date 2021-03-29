import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { StudentCommentDto, StudentDto, StudentPaymentDto } from '@shared/service-proxies/student/dto/student-dto';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateStudentCommentDialogComponent } from '../create-student-comment/create-student-comment-dialog.component';
import { EditStudentCommentDialogComponent } from '../edit-student-comment-dialog/edit-student-comment-dialog.component';


@Component({
  selector: 'app-student-comment-list-dialog',
  templateUrl: './student-comment-list-dialog.component.html',
  styleUrls: ['./student-comment-list-dialog.component.css']
})
export class StudentCommentListDialogComponent extends AppComponentBase
implements OnInit {
  studentId: string;
  total: number;
  studentComments: StudentCommentDto[] = [];

  constructor(
    injector: Injector,
    public _studentService: StudentServiceProxy,
    public _modalService: BsModalService,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(){
    this._studentService.getComments(this.studentId,undefined).subscribe((result) => {
      this.studentComments = result.items;
    });
  }

  createComment(){
    let createCommentDialog: BsModalRef;
    createCommentDialog = this._modalService.show(
      CreateStudentCommentDialogComponent,
      {
        class: 'modal-lg',
        initialState: {
          studentId: this.studentId,
        },
      }
    );
    createCommentDialog.content.onSave.subscribe(() => {
      this.loadComments();
    });
  }
  editComment(comment: StudentCommentDto){
    let editCommentDialog: BsModalRef;
    editCommentDialog = this._modalService.show(
      EditStudentCommentDialogComponent,
      {
        class: 'modal-lg',
        initialState: {
          comment: comment,
        },
      }
    );
    editCommentDialog.content.onSave.subscribe(() => {
      this.loadComments();
    });
  }
  deleteComment(comment: StudentCommentDto){
    abp.message.confirm(
      'Are you sure to delete this item?',
      undefined,
      (result: boolean) => {
        if (result) {
          this._studentService.deleteComment(comment.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.loadComments();
          });
        }
      }
    );
  }
}