import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';

import { RoleServiceProxy } from './role/role.service.proxy'
import { UserServiceProxy } from './user/user.service.proxy'
import { RoomServiceProxy } from './room/room.service.proxy'
import { SubjectServiceProxy } from './subject/subject.service.proxy'
import { ClassServiceProxy } from './class/class.service.proxy'
import { TeacherServiceProxy } from './teacher/teacher.service.proxy'
import { CourseServiceProxy } from './course/course.service.proxy'
import { StudentServiceProxy } from './student/student.service.proxy'
import { ProtectorServiceProxy } from './protector/protector.service.proxy'
import { TimeSheetServiceProxy } from './timesheet/timesheet.service.proxy'
import { StudyTimeServiceProxy } from './study-time/studytime.service.proxy'
import { CustomTenantServiceProxy } from './custom-tenant/customtenant.service.proxy'
import { SettingServiceProxy } from './setting/setting.service.proxy'

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
        TeacherServiceProxy,
        CourseServiceProxy,
        StudentServiceProxy,
        ProtectorServiceProxy,
        TimeSheetServiceProxy,
        StudyTimeServiceProxy,
        CustomTenantServiceProxy,
        SettingServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
