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

import { TeacherServiceProxy } from '@shared/service-proxies/teacher/teacher.service.proxy';

import { TeacherDto } from '@shared/service-proxies/teacher/dto/teacher-dto';

import * as moment from 'moment';
import { UserServiceProxy } from '@shared/service-proxies/user/user.service.proxy';
import { UserDto } from '@shared/service-proxies/user/dto/user-dto';

@Component({
  templateUrl: 'edit-teacher-dialog.component.html'
})
export class EditTeacherDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  teacher: TeacherDto = new TeacherDto();
  id: string;
  dateOfBirth :string;
  startDate:string;
  endDate:string;
  users:UserDto[]=[];
  selecteduser:UserDto;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _teacherService: TeacherServiceProxy,
    public _userService:UserServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._userService.getUsers().subscribe((result) => {
      this.users = result.items;

      this._teacherService.get(this.id).subscribe((result: TeacherDto) => {
        this.teacher = result;
        this.dateOfBirth = this.teacher.dateOfBirth ? this.teacher.dateOfBirth.format().split("T")[0]:"";
        this.startDate = this.teacher.startDate ? this.teacher.startDate.format().split("T")[0]:"";
        this.endDate = this.teacher.endDate ? this.teacher.endDate.format().split("T")[0]:"";
        this.selecteduser = this.users.find(e => e.id === this.teacher.userId);          
      });  
    });      
  }

  changeUser($event){
    if($event != null){      
      this.selecteduser = $event.value;

      if(this.selecteduser.teacher != undefined && this.selecteduser.teacher != null){

        if(this.selecteduser.teacher.id !=this.id){
          abp.message.confirm(
            'This user is mapping with other teacher. Are you sure you want to override it?',
            undefined,
            (result: boolean) => {
              if (result) {
                this.selecteduser = $event.value;
              }
              else{
                this.selecteduser = null;
              }
            }
          );
        }
      }
    }
  }

  save(): void {
    this.saving = true;

    this.teacher.dateOfBirth = this.dateOfBirth ? moment(this.dateOfBirth).format() : <any>undefined;
    this.teacher.startDate =  this.startDate ? moment(this.startDate).format() : <any>undefined;
    this.teacher.endDate = this.endDate ? moment(this.endDate).format(): <any>undefined;
    
    if(this.selecteduser != undefined && this.selecteduser != null){
      this.teacher.userId = this.selecteduser.id;
    }
    else{
      this.teacher.userId = null;
    }

    this._teacherService
      .update(this.teacher)
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
