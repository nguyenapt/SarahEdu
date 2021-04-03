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
import { TeacherServiceProxy } from '@shared/service-proxies/teacher/teacher.service.proxy';

import { TeacherDto, CreateTeacherDto} from '@shared/service-proxies/teacher/dto/teacher-dto';

import { forEach as _forEach, map as _map } from 'lodash-es';
import { UserServiceProxy } from '@shared/service-proxies/user/user.service.proxy';
import { UserDto } from '@shared/service-proxies/user/dto/user-dto';

@Component({
  templateUrl: 'create-teacher-dialog.component.html'
})
export class CreateTeacherDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  teacher: CreateTeacherDto = new CreateTeacherDto();
  users:UserDto[]=[];
  selecteduser:UserDto;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _teacherService: TeacherServiceProxy,
    private _userService:UserServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._userService.getUsers().subscribe((result) => {
      this.users = result.items;
    });
  }

  changeUser($event){
    if($event != null){      
      this.selecteduser = $event.value;

      if(this.selecteduser.teacher != undefined && this.selecteduser.teacher != null){

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

  save(): void {
    this.saving = true;
    
    if(this.selecteduser != undefined && this.selecteduser != null){
      this.teacher.userId = this.selecteduser.id;
    }
    
    this._teacherService
      .create(this.teacher)
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
