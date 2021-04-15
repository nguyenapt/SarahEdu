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

import { TimeSheetDto, TimeSheetStudentDto } from '@shared/service-proxies/timesheet/dto/timesheet-dto';

import * as moment from 'moment';
import { CalendarEvent } from 'angular-calendar';
import { StudentDto } from '@shared/service-proxies/student/dto/student-dto';
import { TeacherDto } from '@shared/service-proxies/teacher/dto/teacher-dto';
import { CourseDto, CourseSubjectDto, CourseWithSubjectDto } from '@shared/service-proxies/course/dto/course-dto';
import { TeacherServiceProxy } from '@shared/service-proxies/teacher/teacher.service.proxy';
import { CourseServiceProxy } from '@shared/service-proxies/course/course.service.proxy';
import { StudyTimeServiceProxy } from '@shared/service-proxies/study-time/studytime.service.proxy';
import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import { StudyTimeDto } from '@shared/service-proxies/study-time/dto/studytime-dto';
import { RoomDto } from '@shared/service-proxies/room/dto/room-dto';
import { ClassStudentDto } from '@shared/service-proxies/class/dto/class-dto';
import { ClassServiceProxy } from '@shared/service-proxies/class/class.service.proxy';

@Component({
  templateUrl: 'edit-timesheet-dialog.component.html'
})
export class EditTimeSheetDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  timeSheetDate: string;
  timeSheet: TimeSheetDto = new TimeSheetDto();
  students : StudentDto[] = [];
  selectedStudent : StudentDto;
  selectedStudents : TimeSheetStudentDto[] = [];
  tenantId:string;
  teachers : TeacherDto[] = [];
  selectedTeacher : TeacherDto;
  
  courses : CourseWithSubjectDto[] = [];
  selectCourse : CourseWithSubjectDto;
  
  studyTimes : StudyTimeDto[] = [];
  selectedStudyTime: StudyTimeDto;
  
  courseSubjects : CourseSubjectDto[] = [];
  selectSubject : CourseSubjectDto;

  rooms:RoomDto[]=[];
  selectedRoom: RoomDto;

  classWithStudents:ClassStudentDto[]=[];
  selectedClass:ClassStudentDto;

  startHour = '00:00';
  endHour = '00:00';
  isSingle = false;
  fee = 0;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _timeSheetService: TimeSheetServiceProxy,
    private _teacherService: TeacherServiceProxy,
    private _studentService: StudentServiceProxy,
    private _courseService: CourseServiceProxy,
    private _studyTimeService: StudyTimeServiceProxy,
    private _roomService: RoomServiceProxy,
    private _classService: ClassServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._teacherService.getTeachers().subscribe((result) => {
      this.teachers = result.items;
      this.selectedTeacher = this.teachers.find(e => e.id === this.timeSheet.teacherId);
    });
    this._studentService.getStudents().subscribe((result) => {
      this.students = result.items;
    });
    this._courseService.getCourses().subscribe((result) => {
      this.courses = result.items; 
      this.selectCourse = this.courses.find(e => e.id == this.timeSheet.courseSubject.courseId);

      this.courseSubjects = [];
      this.courseSubjects = this.selectCourse.courseSubjects;
      this.selectSubject = this.courseSubjects.find(e => e.id == this.timeSheet.courseSubjectId);
      this.changeFee();
    });  
    this._studyTimeService.getStudyTimes().subscribe((result) => {
      this.studyTimes = result.items;
      this.selectedStudyTime = this.studyTimes.find(e => e.id == this.timeSheet.studyTimeId);
      this.startHour = this.selectedStudyTime.fromHour;
      this.endHour = this.selectedStudyTime.toHour;
    });  
    this._roomService.getRoomByTenant(this.tenantId).subscribe((result) => {
      this.rooms = result.items;
      this.selectedRoom = this.rooms.find(e => e.id == this.timeSheet.roomId);
    }); 
    this.timeSheetDate = moment(this.timeSheet.fromDate).format("YYYY-MM-DD");
    this.selectedStudents = this.timeSheet.timeSheetStudents;   

    this._classService.getClassWithStudents().subscribe((result) => {
      this.classWithStudents = result.items;
    }); 
  }

  changeCourse($event){
    if($event == null){
      this.courseSubjects = [];
    }
    else{
      this.courseSubjects = [];
      this.courseSubjects = $event.value.courseSubjects;
      this.changeFee();
    }
  }

  changeStudyTime($event){
    if($event != null){      
      this.startHour = $event.value.fromHour;
      this.endHour = $event.value.toHour;
    }
  }

  changeClass($event){
    if($event != null){      
      this.selectedClass = $event.value;

      if(this.selectedClass != undefined && this.selectedClass.students != undefined){
        this.selectedStudents = [];          

        this.selectedClass.students.forEach(function (student) {          
            var timeSheetStudent = new TimeSheetStudentDto();
            timeSheetStudent.studentId = student.id;
            timeSheetStudent.student = student;
            timeSheetStudent.fee = this.fee;
            this.selectedStudents.push(timeSheetStudent);             
        }.bind(this));
      }
    }
  }

  changeFee(){
    if(this.selectCourse){
      if(this.isSingle){
        this.fee = this.selectCourse.courseFees[0].fee;
      }
      else{
        this.fee = this.selectCourse.courseFees[0].feeMultiple;
      }
    }
  }

  addStudent(student:StudentDto):void{
    if(student){
      var obj = this.selectedStudents.find(e => e.studentId === student.id);
      if(obj == null){
        if(this.isSingle){
          this.selectedStudents = [];
        }
        var timeSheetStudent = new TimeSheetStudentDto();
        timeSheetStudent.studentId = student.id;
        timeSheetStudent.student = student;
        timeSheetStudent.fee = this.fee;
        this.selectedStudents.push(timeSheetStudent);
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
    this.timeSheet.roomId = this.selectedRoom.id;    
    this.timeSheet.studyTimeId = this.selectedStudyTime.id;
    this.timeSheet.teacherId = this.selectedTeacher.id;
    this.timeSheet.courseSubject = this.courseSubjects.find(x => x.id == this.selectSubject.id);
    this.timeSheet.courseSubjectId = this.selectSubject.id;
    this.timeSheet.status = 0;
    
    this.timeSheet.fromDate = new Date(this.timeSheetDate + "T" + this.startHour+":00");
    this.timeSheet.toDate = new Date(this.timeSheetDate + "T" + this.endHour+":00");
    this.timeSheet.isSingle = this.isSingle;
    if(this.isSingle && this.selectedStudent != null){
      this.selectedStudents = [];
      var timeSheetStudent = new TimeSheetStudentDto();
        timeSheetStudent.studentId = this.selectedStudent.id;
        timeSheetStudent.fee = this.fee;
      this.selectedStudents.push(timeSheetStudent);
    }
    this.timeSheet.timeSheetStudents = this.selectedStudents;   

    this._timeSheetService
      .update(this.timeSheet)
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
