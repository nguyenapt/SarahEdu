import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { UserServiceProxy } from '@shared/service-proxies/user/user.service.proxy';
import { ResetPasswordDto } from '@shared/service-proxies/user/dto/user-dto';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordDialogComponent extends AppComponentBase
  implements OnInit {
  public isLoading = false;
  public resetPasswordDto: ResetPasswordDto;
  id: number;

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
    this.isLoading = true;
    this.resetPasswordDto = new ResetPasswordDto();
    this.resetPasswordDto.userId = this.id;
    this.resetPasswordDto.newPassword = Math.random()
      .toString(36)
      .substr(2, 10);
    this.isLoading = false;
  }

  public resetPassword(): void {
    this.isLoading = true;
    this._userService
      .resetPassword(this.resetPasswordDto)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.notify.info('Password Reset');
        this.bsModalRef.hide();
      });
  }
}
