import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';
import { finalize } from 'rxjs/operators';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { KeyValueItem } from '@shared/interface/keyvalue-item';
import { TeacherSchedulerDialogComponent } from '@app/teacher/teacher-scheduler-dialog/teacher-scheduler-dialog.component';
import { SettingServiceProxy } from '@shared/service-proxies/setting/setting.service.proxy';
import { SettingListDto, SettingPagedResultDto } from '@shared/service-proxies/setting/dto/setting-dto';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends AppComponentBase {
  saving = false;
  settings:SettingListDto[]=[];
  isLoading: boolean = true;
  itemChange:any[]=[];
  constructor(
    injector: Injector,
    private _settingService: SettingServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadSetting(() => {
      this.isLoading = false;
    });
  }

  loadSetting(finishedCallback: Function){
    this._settingService
    .getAll()
    .pipe(
      finalize(() => {
        finishedCallback();
      })
    )
    .subscribe((result: SettingPagedResultDto) => {
      this.settings = result.items;
    });
  }
  Save(){
    this._settingService
    .update(this.itemChange)
    .pipe(
      finalize(() => {
        this.saving = false;
      })
    )
    .subscribe(() => {
      this.notify.info(this.l('SavedSuccessfully'));
    });
  }

  settingChange(name,$event){
    if($event != null){      
      var currentItem = this.itemChange.find(e => e.name === name);         
      if(currentItem !=null) {
        let index = this.itemChange.indexOf(currentItem);
        this.itemChange[index] = {name:name,value:$event};
      }
      else{
        let item = {name:name,value:$event};
        this.itemChange.push(item);
      }
    }
  }
}
