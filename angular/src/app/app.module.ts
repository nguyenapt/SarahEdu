import { NgModule } from '@angular/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
//timeSheet
import { TimeSheetComponent } from '@app/timesheet/timesheet.component';
import { CreateTimeSheetDialogComponent } from './timesheet/create-timesheet/create-timesheet-dialog.component';
import { EditTimeSheetDialogComponent } from './timesheet/edit-timesheet/edit-timesheet-dialog.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
//room
import { RoomComponent } from './room/room.component';
import { CreateRoomDialogComponent } from './room/create-room/create-room-dialog.component';
import { EditRoomDialogComponent } from './room/edit-room/edit-room-dialog.component';
//teacher
import { TeacherComponent } from './teacher/teacher.component';
import { CreateTeacherDialogComponent } from './teacher/create-teacher/create-teacher-dialog.component';
import { EditTeacherDialogComponent } from './teacher/edit-teacher/edit-teacher-dialog.component';
//class
import { ClassComponent } from './class/class.component';
import { CreateClassDialogComponent } from './class/create-class/create-class-dialog.component';
import { EditClassDialogComponent } from './class/edit-class/edit-class-dialog.component';
//course
import { CourseComponent } from './course/course.component';
import { CreateCourseDialogComponent } from './course/create-course/create-course-dialog.component';
import { EditCourseDialogComponent } from './course/edit-course/edit-course-dialog.component';
//subject
import { SubjectComponent } from './subject/subject.component';
import { CreateSubjectDialogComponent } from './subject/create-subject/create-subject-dialog.component';
import { EditSubjectDialogComponent } from './subject/edit-subject/edit-subject-dialog.component';
//student
import { StudentComponent } from './student/student.component';
import { CreateStudentDialogComponent } from './student/create-student/create-student-dialog.component';
import { EditStudentDialogComponent } from './student/edit-student/edit-student-dialog.component';
//protector
import { ProtectorComponent } from './protector/protector.component';
import { CreateProtectorDialogComponent } from './protector/create-protector/create-protector-dialog.component'
import { EditProtectorDialogComponent } from './protector/edit-protector/edit-protector-dialog.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //timesheet
    TimeSheetComponent,
    CreateTimeSheetDialogComponent,
    EditTimeSheetDialogComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent,
    //Room
    RoomComponent,
    CreateRoomDialogComponent,
    EditRoomDialogComponent,
    //Teacher
    TeacherComponent,
    CreateTeacherDialogComponent,
    EditTeacherDialogComponent,    
    //Class
    ClassComponent,
    CreateClassDialogComponent,
    EditClassDialogComponent,
    //course
    CourseComponent,
    CreateCourseDialogComponent,
    EditCourseDialogComponent,
    //subject
    SubjectComponent,
    CreateSubjectDialogComponent,
    EditSubjectDialogComponent,
    //student
    StudentComponent,
    CreateStudentDialogComponent,
    EditStudentDialogComponent,
    //protector
    ProtectorComponent,
    CreateProtectorDialogComponent,
    EditProtectorDialogComponent
  ],
  imports: [
    CommonModule,
    NgxMaterialTimepickerModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
    //rooms
    CreateRoomDialogComponent,
    EditRoomDialogComponent,
    //subject
    CreateSubjectDialogComponent,
    EditSubjectDialogComponent,
    //class
    CreateClassDialogComponent,
    EditClassDialogComponent,
    //teacher
    CreateTeacherDialogComponent,
    EditTeacherDialogComponent,
    //course
    CreateCourseDialogComponent,
    EditCourseDialogComponent,
    //student
    CreateStudentDialogComponent,
    EditStudentDialogComponent,
    //protector
    CreateProtectorDialogComponent,
    EditProtectorDialogComponent,
    //timesheet
    CreateTimeSheetDialogComponent,
    EditTimeSheetDialogComponent
  ],
})
export class AppModule {}
