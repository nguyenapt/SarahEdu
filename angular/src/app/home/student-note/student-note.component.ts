import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RoomServiceProxy } from '@shared/service-proxies/room/room.service.proxy';
import { finalize } from 'rxjs/operators';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { KeyValueItem } from '@shared/interface/keyvalue-item';
import { StudentServiceProxy } from '@shared/service-proxies/student/student.service.proxy';
import { StudentDto, StudentStatusDto, StudentStatusPagedResultDto } from '@shared/service-proxies/student/dto/student-dto';

@Component({
  selector: 'app-student-note',
  templateUrl: './student-note.component.html',
  styleUrls: ['./student-note.component.css']
})
export class StudentNoteComponent extends AppComponentBase implements OnInit {

  attitude: number = 1;  
  fromDate: string;
  toDate: string;
  studentStatuses: StudentStatusDto[]=[];
  isTableLoading = true;
  expanded = true;

  rowGroupMetadata: any;
  student:StudentDto;
  display = false;
  position="right";
  constructor(
    injector: Injector,
    private _studentService: StudentServiceProxy,    
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  statuses = [
    {name: '- Select -', code: 0},
    {name: 'PENDING', code: 1},
    {name: 'APPROVED', code: 2},
    {name: 'REJECTED', code: 3}
  ];


  attitudes = [
    {name: '- Select -', code: 0},
    {name: 'High impotant', code: 1},
    {name: 'Normal', code: 2},
    {name: 'Low impotant', code: 3}
  ];

  ngOnInit(): void {
    this.loadTimeScheduler(() => {
      this.isTableLoading = false;
      this.updateRowGroupMetaData();
    });
  }

  loadTimeScheduler(finishedCallback: Function)  {
    this._studentService
      .getGetStudentStatusFromDateToDate(
        this.attitude,
        this.fromDate,
        this.toDate
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: StudentStatusPagedResultDto) => {
        var self = this;
        this.studentStatuses = result.items; 
      });
  }

  setSelected(student: StudentDto){
    this.student = student;
    this.display = true;
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.studentStatuses) {
        for (let i = 0; i < this.studentStatuses.length; i++) {
            let rowData = this.studentStatuses[i];
            let representativeName = rowData.student.fullName;
            
            if (i == 0) {
                this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.studentStatuses[i - 1];
                let previousRowGroup = previousRowData.student.fullName;
                if (representativeName === previousRowGroup)
                    this.rowGroupMetadata[representativeName].size++;
                else
                    this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
            }
        }
    }
  }
  getTextByValue(array:KeyValueItem[],value:number){
    for (var i=0; i < array.length; i++) {
      if (array[i].code === value) {
          return array[i].name;
      }
    }
  }  
}
