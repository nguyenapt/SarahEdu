import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { TimeSheetComponent } from './timesheet/timesheet.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { RoomComponent } from './room/room.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassComponent } from './class/class.component';
import { CourseComponent } from './course/course.component';
import { SubjectComponent } from './subject/subject.component';
import { StudentComponent } from './student/student.component';
import { ProtectorComponent } from './protector/protector.component';
import { TeacherProductivityComponent } from './report/teacher-productivity/teacher-productivity.component';
import { StudentFeeComponent } from './report/student-fee/student-fee.component';
import { TeacherSchedulerComponent } from './teacher/teacher-scheduler/teacher-scheduler.component';
import { SettingsComponent } from './settings/settings.component';
import { TeacherProductivityTotalComponent } from './report/teacher-productivity-total/teacher-productivity-total.component';
import { StudyTimeComponent } from './study-time/study-time.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'timesheet', component: TimeSheetComponent },
                    { path: 'room', component: RoomComponent },
                    { path: 'teacher', component: TeacherComponent },
                    { path: 'class', component: ClassComponent },
                    { path: 'course', component: CourseComponent },
                    { path: 'subject', component: SubjectComponent },
                    { path: 'student', component: StudentComponent },
                    { path: 'protector', component: ProtectorComponent },
                    { path: 'study-time', component: StudyTimeComponent },
                    { path: 'update-password', component: ChangePasswordComponent },
                    { path: 'report/teacher-productivity', component: TeacherProductivityComponent },
                    { path: 'report/teacher-productivity-total', component: TeacherProductivityTotalComponent },
                    { path: 'report/student-fee', component: StudentFeeComponent },
                    { path: 'teacher/teacher-scheduler', component: TeacherSchedulerComponent },
                    { path: 'settings', component: SettingsComponent, data: { permission: 'Pages.SiteSettings' }, canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
