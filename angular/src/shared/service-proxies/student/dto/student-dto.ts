import * as moment from 'moment';

export class CreateStudentDto implements ICreateStudentDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    schoolName: string | undefined;
    className: string | undefined;
    isActive: boolean | undefined;
    description: string | undefined;
    courseSubjects: string[] | undefined;

    constructor(data?: ICreateStudentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.fullName = data["fullName"];            
            this.dateOfBirth = data["dateOfBirth"] ? moment(data["dateOfBirth"].toString()) : <any>undefined;
            this.startDate = data["startDate"] ? moment(data["startDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? moment(data["endDate"].toString()) : <any>undefined;
            this.email = data["email"];
            this.phoneNumber = data["phoneNumber"];
            this.schoolName = data["schoolName"];
            this.className = data["className"];            
            this.isActive = data["isActive"];
            this.description = data["description"];
            if (Array.isArray(data["courseSubjects"])) {
                this.courseSubjects = [] as any;
                for (let item of data["courseSubjects"])
                    this.courseSubjects.push(item);
            }
        }
    }

    static fromJS(data: any): CreateStudentDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateStudentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fullName"] = this.fullName;        
        data["dateOfBirth"] = this.dateOfBirth ? this.dateOfBirth : <any>undefined;
        data["startDate"] = this.startDate ? this.startDate : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate : <any>undefined;
        data["email"] = this.email;
        data["phoneNumber"] = this.phoneNumber;
        data["schoolName"] = this.schoolName;
        data["className"] = this.className;
        data["description"] = this.description;            
        data["isActive"] = this.isActive;
        if (Array.isArray(this.courseSubjects)) {
            data["courseSubjects"] = [];
            for (let item of this.courseSubjects)
                data["courseSubjects"].push(item);
        }
        return data; 
    }

    clone(): CreateStudentDto {
        const json = this.toJSON();
        let result = new CreateStudentDto();
        result.init(json);
        return result;
    }
}

export interface ICreateStudentDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    schoolName: string | undefined;
    className: string | undefined;
    isActive: boolean | undefined;
    description: string | undefined;
    courseSubjects: string[] | undefined;
}

export class StudentDto implements IStudentDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    schoolName: string | undefined;
    className: string | undefined;
    isActive: boolean | undefined;
    description: string | undefined;
    courseSubjects: string[] | undefined;
    id: string;

    constructor(data?: IStudentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {            
            this.fullName = data["fullName"];
            this.dateOfBirth = data["dateOfBirth"] ? moment(data["dateOfBirth"].toString()) : <any>undefined;
            this.startDate = data["startDate"] ? moment(data["startDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? moment(data["endDate"].toString()) : <any>undefined;
            this.email = data["email"];
            this.phoneNumber = data["phoneNumber"];
            this.schoolName = data["schoolName"];
            this.className = data["className"];
            this.description = data["description"]; 
            this.isActive = data["isActive"];
            if (Array.isArray(data["courseSubjects"])) {
                this.courseSubjects = [] as any;
                for (let item of data["courseSubjects"])
                    this.courseSubjects.push(item);
            }
            this.id = data["id"];
        }
    }

    static fromJS(data: any): StudentDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};        
        data["fullName"] = this.fullName;
        data["dateOfBirth"] = this.dateOfBirth ? this.dateOfBirth : <any>undefined;
        data["startDate"] = this.startDate ? this.startDate : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate : <any>undefined;
        data["email"] = this.email;
        data["phoneNumber"] = this.phoneNumber;
        data["schoolName"] = this.schoolName;
        data["className"] = this.className;
        data["description"] = this.description;            
        data["isActive"] = this.isActive;
        if (Array.isArray(this.courseSubjects)) {
            data["courseSubjects"] = [];
            for (let item of this.courseSubjects)
                data["courseSubjects"].push(item);
        }
        data["id"] = this.id;
        return data; 
    }

    clone(): StudentDto {
        const json = this.toJSON();
        let result = new StudentDto();
        result.init(json);
        return result;
    }
}

export interface IStudentDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    schoolName: string | undefined;
    className: string | undefined;
    isActive: boolean | undefined;
    description: string | undefined;
    courseSubjects: string[] | undefined;
    id: string;
}

export class StudentDtoPagedResultDto implements IStudentDtoPagedResultDto {
    totalCount: number;
    items: StudentDto[] | undefined;

    constructor(data?: IStudentDtoPagedResultDto) {
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
                    this.items.push(StudentDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): StudentDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentDtoPagedResultDto();
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

    clone(): StudentDtoPagedResultDto {
        const json = this.toJSON();
        let result = new StudentDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IStudentDtoPagedResultDto {
    totalCount: number;
    items: StudentDto[] | undefined;
}


export class StudentFeeDto implements IStudentFeeDto {    
    fee: number | undefined;
    isSingle: boolean | undefined;
    startDate: Date | undefined;
    endDate?: Date | undefined;
    roomName: string | undefined;
    courseName: string | undefined;
    subjectName: string | undefined;
    teacherName: string | undefined;

    constructor(data?: IStudentFeeDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {            
            this.fee = data["fee"];
            this.isSingle = data["isSingle"];
            this.startDate = data["startDate"];
            this.endDate = data["endDate"];
            this.roomName = data["roomName"];
            this.courseName = data["courseName"];
            this.subjectName = data["subjectName"];
            this.teacherName = data["teacherName"];
        }
    }

    static fromJS(data: any): StudentFeeDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentFeeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};        
        data["fee"] = this.fee;
        data["isSingle"] = this.isSingle;
        data["startDate"] = this.startDate;
        data["endDate"] = this.endDate;
        data["roomName"] = this.roomName;
        data["courseName"] = this.courseName;
        data["subjectName"] = this.subjectName;
        data["teacherName"] = this.teacherName;
        return data; 
    }

    clone(): StudentFeeDto {
        const json = this.toJSON();
        let result = new StudentFeeDto();
        result.init(json);
        return result;
    }
}


export interface IStudentFeeDto {    
    fee: number | undefined;
    isSingle: boolean | undefined;
    startDate: Date | undefined;
    endDate?: Date | undefined;
    roomName: string | undefined;
    courseName: string | undefined;
    subjectName: string | undefined;
    teacherName: string | undefined;
}

export class StudentFeeListResultDto implements IStudentFeeListResultDto {
    totalCount: number;
    totalFee: number | undefined;
    totalUnpaid: number | undefined;
    items: StudentFeeDto[] | undefined;

    constructor(data?: IStudentFeeListResultDto) {
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
            this.totalFee = data["totalFee"];
            this.totalUnpaid = data["totalUnpaid"];
            if (Array.isArray(data["items"])) {
                this.items = [] as any;
                for (let item of data["items"])
                    this.items.push(StudentFeeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): StudentFeeListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentFeeListResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        data["totalFee"] = this.totalFee;
        data["totalUnpaid"] = this.totalUnpaid;
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data; 
    }

    clone(): StudentFeeListResultDto {
        const json = this.toJSON();
        let result = new StudentFeeListResultDto();
        result.init(json);
        return result;
    }
}

export interface IStudentFeeListResultDto {
    totalCount: number;
    totalFee: number | undefined;
    totalUnpaid: number | undefined;
    items: StudentFeeDto[] | undefined;
}