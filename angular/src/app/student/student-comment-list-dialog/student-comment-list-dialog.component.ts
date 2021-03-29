import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { StudentCommentDto, StudentDto, StudentPaymentDto } from '@shared/service-proxies/student/dto/student-dto';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateStudentCommentDialogComponent } from '../create-student-comment/create-student-comment-dialog.component';


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
    this._studentService.getComments(this.studentId,undefined).subscribe((result) => {
      this.studentComments = result.items;
    });
  }

  createComment(){
    this._modalService.show(
      CreateStudentCommentDialogComponent,
      {
        class: 'modal-lg',
        initialState: {
          studentId: this.studentId,
        },
      }
    );
  }
  editComment(comment: StudentCommentDto){

  }
  deleteComment(comment: StudentCommentDto){
    
  }
}