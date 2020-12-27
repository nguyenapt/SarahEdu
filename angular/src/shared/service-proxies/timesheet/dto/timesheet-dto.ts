import { CourseDto, CourseWithSubjectDto } from '@shared/service-proxies/course/dto/course-dto';
import { CourseSubjectDto } from '@shared/service-proxies/student/dto/student-dto';
import { TeacherDto } from '@shared/service-proxies/teacher/dto/teacher-dto';
import { CalendarEvent } from 'angular-calendar';
import { EventColor, EventAction } from 'calendar-utils';
import * as moment from 'moment';

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
            this.title = data["teacher"].fullName  + " - " + data["courseSubject"].course.name;
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

export class CourseDtoListResultDto implements ICourseDtoListResultDto {
    items: CourseWithSubjectDto[] | undefined;

    constructor(data?: ICourseDtoListResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data)) {
                this.items = [] as any;
                for (let item of data)
                    this.items.push(CourseWithSubjectDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CourseDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new CourseDtoListResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data = [];
            for (let item of this.items)
                data.push(item.toJSON());
        }
        return data; 
    }

    clone(): CourseDtoListResultDto {
        const json = this.toJSON();
        let result = new CourseDtoListResultDto();
        result.init(json);
        return result;
    }
}

export interface ICourseDtoListResultDto {
    items: CourseWithSubjectDto[] | undefined;
}