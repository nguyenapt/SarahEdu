import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { ClassServiceProxy } from '@shared/service-proxies/class/class.service.proxy';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';

import { ClassDto, CreateClassDto} from '@shared/service-proxies/class/dto/class-dto';

import { forEach as _forEach, map as _map } from 'lodash-es';
import { StudentDto } from '@shared/service-proxies/student/dto/student-dto';

@Component({
  templateUrl: 'create-class-dialog.component.html'
})
export class CreateClassDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  classdto: CreateClassDto = new CreateClassDto();
  students : StudentDto[] = [];
  selectedStudent: StudentDto;
  selectedStudents : StudentDto[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _classService: ClassServiceProxy,
    private _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._studentService.getStudents().subscribe((result) => {
      this.students = result.items;
    });
  }  

  addStudent(student):void{
    if(student){
      var obj = this.selectedStudents.find(e => e.id === student.id);
      if(obj == null){    
        this.selectedStudents.push(student);
      }    
    }
  }

  removeStudent(student):void{
    const index: number = this.selectedStudents.indexOf(student);
    if (index !== -1) {
        this.selectedStudents.splice(index, 1);
    } 
  }

  save(): void {
    this.saving = true;

    this._classService
      .create(this.classdto)
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
