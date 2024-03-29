import * as moment from 'moment';

export class CreateStudentDto implements ICreateStudentDto {
    firstName: string | undefined;
    middleName: string | undefined;
    lastName: string | undefined;
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
            this.firstName = data["firstName"];
            this.middleName = data["middleName"];
            this.lastName = data["lastName"];
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
        data["firstName"] = this.firstName;
        data["middleName"] = this.middleName;
        data["lastName"] = this.lastName;
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
    firstName: string | undefined;
    middleName: string | undefined;
    lastName: string | undefined;
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
    firstName: string | undefined;
    middleName: string | undefined;
    lastName: string | undefined;
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
            this.firstName = data["firstName"];
            this.middleName = data["middleName"];
            this.lastName = data["lastName"];
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
        data["firstName"] = this.firstName;
        data["middleName"] = this.middleName;
        data["lastName"] = this.lastName;
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
    firstName: string | undefined;
    middleName: string | undefined;
    lastName: string | undefined;
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

export class CourseSubjectDtoListResultDto implements ICourseSubjectDtoListResultDto {
    items: CourseSubjectDto[] | undefined;

    constructor(data?: ICourseSubjectDtoListResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data["items"])) {
                this.items = [] as any;
                for (let item of data["items"])
                    this.items.push(CourseSubjectDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CourseSubjectDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new CourseSubjectDtoListResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data; 
    }

    clone(): CourseSubjectDtoListResultDto {
        const json = this.toJSON();
        let result = new CourseSubjectDtoListResultDto();
        result.init(json);
        return result;
    }
}

export interface ICourseSubjectDtoListResultDto {
    items: CourseSubjectDto[] | undefined;
}


export class CourseSubjectDto implements ICourseSubjectDto {
    courseName: string | undefined;
    subjectName: string | undefined;    
    id: string;

    constructor(data?: ICourseSubjectDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.courseName = data["courseName"];
            this.subjectName = data["subjectName"];            
            this.id = data["id"];
        }
    }

    static fromJS(data: any): CourseSubjectDto {
        data = typeof data === 'object' ? data : {};
        let result = new CourseSubjectDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["courseName"] = this.courseName;
        data["subjectName"] = this.subjectName;        
        data["id"] = this.id;
        return data; 
    }

    clone(): CourseSubjectDto {
        const json = this.toJSON();
        let result = new CourseSubjectDto();
        result.init(json);
        return result;
    }
}

export interface ICourseSubjectDto {
    courseName: string | undefined;
    subjectName: string | undefined;    
    id: string;
}