import { CourseDto, CourseWithSubjectDto } from '@shared/service-proxies/course/dto/course-dto';
import { CourseSubjectDto } from '@shared/service-proxies/course/dto/course-dto';
import { TeacherDto } from '@shared/service-proxies/teacher/dto/teacher-dto';
import { CalendarEvent } from 'angular-calendar';
import { EventColor, EventAction } from 'calendar-utils';
import * as moment from 'moment';

export class CreateTimeSheetDto implements ICreateTimeSheetDto {    
    start: string;
    end: string;    
    roomId: string | undefined;
    teacherId: string | undefined;
    courseSubjectId: string | undefined;
    status: number | undefined;
    isSingle: boolean | undefined;
    timeSheetStudents: TimeSheetStudentDto [] | undefined;

    constructor(data?: ICreateTimeSheetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {            
            this.start = data["fromDate"] ? new Date(data["fromDate"]) : <any>undefined;
            this.end = data["toDate"] ? new Date(data["toDate"]) : <any>undefined;
            this.roomId = data["roomId"];
            this.teacherId = data["teacherId"];
            this.courseSubjectId = data["courseSubjectId"];
            this.status = data["status"];
            this.isSingle =data["isSingle"];
            if (Array.isArray(data["timeSheetStudents"])) {
                this.timeSheetStudents = [] as any;
                for (let item of data["timeSheetStudents"])
                    this.timeSheetStudents.push(item);
            }
        }
    }

    static fromJS(data: any): CreateTimeSheetDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateTimeSheetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};        
        data["fromDate"] = this.start;
        data["toDate"] = this.end;
        data["roomId"] = this.roomId;
        data["teacherId"] = this.teacherId;
        data["courseSubjectId"] = this.courseSubjectId;
        data["status"] = this.status;
        data["isSingle"] = this.isSingle;        
        if (Array.isArray(this.timeSheetStudents)) {
            data["timeSheetStudents"] = [];
            for (let item of this.timeSheetStudents)
                data["timeSheetStudents"].push(item);
        }
        return data; 
    }

    clone(): CreateTimeSheetDto {
        const json = this.toJSON();
        let result = new CreateTimeSheetDto();
        result.init(json);
        return result;
    }
}


export interface ICreateTimeSheetDto {    
    start: string;
    end: string;
    roomId: string | undefined;
    teacherId: string | undefined;
    courseSubjectId: string | undefined;
    status: number | undefined;
    isSingle: boolean | undefined;
    timeSheetStudents: TimeSheetStudentDto [] | undefined;
}

export class TimeSheetDto implements ITimeSheetDto {
    id?: string | number;
    start: Date;
    end?: Date;
    title: string;
    color?: EventColor;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: { beforeStart?: boolean; afterEnd?: boolean; };
    draggable?: boolean;
    meta?: any;
    roomId: string | undefined;
    teacherId: string | undefined;
    courseSubjectId: string | undefined;
    fee:number | undefined;
    status:number | undefined;
    teacher?: TeacherDto | undefined;
    courseSubject?: CourseSubjectDto | undefined;
    timeSheetStudents?: TimeSheetStudentDto[] | undefined;

    constructor(data?: ITimeSheetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.start = data["fromDate"] ? new Date(data["fromDate"]) : <any>undefined;
            this.end = data["toDate"] ? new Date(data["toDate"]) : <any>undefined;
            this.roomId = data["roomId"];
            this.teacherId = data["teacherId"];
            this.courseSubjectId = data["courseSubjectId"];
            this.fee = data["fee"];
            this.status = data["status"];
            this.teacher = data["teacher"];
            this.courseSubject = data["courseSubject"];
            var title = data["teacher"].fullName  + " - " + data["courseSubject"].courseName + " - " + data["courseSubject"].subjectName+ "<br />";
            if (Array.isArray(data["timeSheetEntryStudents"])) {
                this.timeSheetStudents = [] as any;
                for (let item of data["timeSheetEntryStudents"]){
                    this.timeSheetStudents.push(item);
                    title += item.student.fullName + "<br />";
                }
            }
            
            this.title = title;
        }
    }

    static fromJS(data: any): TimeSheetDto {
        data = typeof data === 'object' ? data : {};
        let result = new TimeSheetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["fromDate"] = this.start ? new Date(this.start) : <any>undefined;
        data["toDate"] = this.start ? new Date(this.start) : <any>undefined;
        data["roomId"] = this.roomId;
        data["teacherId"] = this.teacherId;
        data["courseSubjectId"] = this.courseSubjectId;
        data["fee"] = this.fee;
        data["status"] = this.status;     
        data["teacher"] = this.teacher;
        data["courseSubject"] = this.courseSubject;
        if (Array.isArray(this.timeSheetStudents)) {
            data["timeSheetEntryStudents"] = [];
            for (let item of this.timeSheetStudents)
                data["timeSheetEntryStudents"].push(item);
        }
        return data; 
    }

    clone(): TimeSheetDto {
        const json = this.toJSON();
        let result = new TimeSheetDto();
        result.init(json);
        return result;
    }
}

export interface ITimeSheetDto extends CalendarEvent {
    roomId?: string | undefined;
    teacherId?: string | undefined;
    courseSubjectId?: string | undefined;
    fee?:number | undefined;
    status?:number | undefined;
    teacher?: TeacherDto | undefined;
    courseSubject?: CourseSubjectDto | undefined;
    timeSheetStudents?: TimeSheetStudentDto[] | undefined;
}


export class TimeSheetDtoPagedResultDto implements ITimeSheetDtoPagedResultDto {
    totalCount: number;
    items: TimeSheetDto[] | undefined;

    constructor(data?: ITimeSheetDtoPagedResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.totalCount = data["totalCount"];
            if (Array.isArray(data["items"])) {
                this.items = [] as any;
                for (let item of data["items"])
                    this.items.push(TimeSheetDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TimeSheetDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new TimeSheetDtoPagedResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data; 
    }

    clone(): TimeSheetDtoPagedResultDto {
        const json = this.toJSON();
        let result = new TimeSheetDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface ITimeSheetDtoPagedResultDto {
    totalCount: number;
    items: TimeSheetDto[] | undefined;
}


export class TimeSheetStudentDto implements ITimeSheetStudentDto {    
    id: string | undefined;
    studentId: string | undefined;
    timeSheetEntryId: string | undefined;
    attitude: string | undefined;
    receptiveAbility: string | undefined;
    description: string | undefined;
    fee: number | undefined;
    isPaid: boolean | undefined;

    constructor(data?: ICreateTimeSheetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {            
            this.id = data["id"];
            this.studentId = data["studentId"];
            this.timeSheetEntryId = data["timeSheetEntryId"];
            this.attitude = data["attitude"];
            this.receptiveAbility = data["receptiveAbility"];
            this.description = data["description"];
            this.fee = data["fee"];
            this.isPaid = data["isPaid"];
        }
    }

    static fromJS(data: any): CreateTimeSheetDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateTimeSheetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};        
        data["id"] = this.id;
        data["studentId"] = this.studentId;
        data["timeSheetEntryId"] = this.timeSheetEntryId;
        data["attitude"] = this.attitude;
        data["receptiveAbility"] = this.receptiveAbility;
        data["description"] = this.description;
        data["fee"] = this.fee;        
        data["isPaid"] = this.isPaid;        
        return data; 
    }

    clone(): CreateTimeSheetDto {
        const json = this.toJSON();
        let result = new CreateTimeSheetDto();
        result.init(json);
        return result;
    }
}


export interface ITimeSheetStudentDto {    
    id: string | undefined;
    studentId: string | undefined;
    timeSheetEntryId: string | undefined;
    attitude: string | undefined;
    receptiveAbility: string | undefined;
    description: string | undefined;
    fee: number | undefined;
    isPaid: boolean | undefined;
}