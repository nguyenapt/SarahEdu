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

import { TimeSheetServiceProxy } from '@shared/service-proxies/timesheet/timesheet.service.proxy';
import { TeacherServiceProxy } from '@shared/service-proxies/teacher/teacher.service.proxy';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';

import { CreateTimeSheetDto, TimeSheetDto} from '@shared/service-proxies/timesheet/dto/timesheet-dto';


import { forEach as _forEach, map as _map } from 'lodash-es';
import { CourseSubjectDto, StudentDto } from '@shared/service-proxies/student/dto/student-dto';
import { TeacherDto } from '@shared/service-proxies/teacher/dto/teacher-dto';
import { CourseWithSubjectDto } from '@shared/service-proxies/course/dto/course-dto';

@Component({
  templateUrl: 'create-timesheet-dialog.component.html',
  styleUrls: ['./create-timesheet-dialog.component.css'],
})
export class CreateTimeSheetDialogComponent extends AppComponentBase
  implements OnInit {
  roomId:string;
  saving = false;
  timeSheet: CreateTimeSheetDto = new CreateTimeSheetDto();
  students : StudentDto[] = [];
  selectedStudent : StudentDto;
  selectedStudents : StudentDto[] = [];
  
  teachers : TeacherDto[] = [];
  selectedTeacher : TeacherDto;
  
  courses : CourseWithSubjectDto[] = [];
  selectCourse : CourseWithSubjectDto;
  
  courseSubjects : CourseSubjectDto[] = [];
  selectSubject : CourseSubjectDto;

  startHour = '00:00';
  endHour = '00:00';
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _timeSheetService: TimeSheetServiceProxy,
    private _teacherService: TeacherServiceProxy,
    private _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._teacherService.getTeachers().subscribe((result) => {
      this.teachers = result.items;
    });
    this._studentService.getStudents().subscribe((result) => {
      this.students = result.items;
    });
    this._timeSheetService.getCourses().subscribe((result) => {
      this.courses = result.items;
    });  
  }

  changeCourse($event){
    if($event == null){
      this.courseSubjects = [];
    }
    else{
      this.courseSubjects = [];
      this.courseSubjects = $event.value.courseSubjects;
    }
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
    this.timeSheet.roomId = this.roomId;
    this.timeSheet.teacherId = this.selectedTeacher.id;
    this.timeSheet.courseSubjectId = this.selectSubject.id;
    this.timeSheet.status = 0;
    this.timeSheet.start =this.timeSheet.start.toString() + "T" + this.startHour+":00";
    this.timeSheet.end = this.timeSheet.end.toString() + "T" + this.endHour+":00";
    this._timeSheetService
      .create(this.timeSheet)
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
