import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';

import { RoleServiceProxy } from './role/role.service.proxy'
import { UserServiceProxy } from './user/user.service.proxy'
import { RoomServiceProxy } from './room/room.service.proxy'
import { SubjectServiceProxy } from './subject/subject.service.proxy'
import { ClassServiceProxy } from './class/class.service.proxy'

@NgModule({
    providers: [
        RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        SubjectServiceProxy,
        RoomServiceProxy,
        ClassServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
