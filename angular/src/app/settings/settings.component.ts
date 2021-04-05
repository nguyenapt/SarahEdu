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

  settings:SettingListDto[]=[];
  isLoading: boolean = true;
  constructor(
    injector: Injector,
    private _settingService: SettingServiceProxy,
    private _roomService: RoomServiceProxy,
    private _modalService: BsModalService
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
    
  }
}
