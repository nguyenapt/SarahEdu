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
    subjects: string[] | undefined;

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
            this.description = data["description"];
            if (Array.isArray(data["subjects"])) {
                this.subjects = [] as any;
                for (let item of data["subjects"])
                    this.subjects.push(item);
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
        data["description"] = this.description;
        if (Array.isArray(this.subjects)) {
            data["subjects"] = [];
            for (let item of this.subjects)
                data["subjects"].push(item);
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
    subjects: string[] | undefined;
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
    subjects: string[] | undefined;
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
            this.description = data["description"];
            if (Array.isArray(data["subjects"])) {
                this.subjects = [] as any;
                for (let item of data["subjects"])
                    this.subjects.push(item);
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
        data["description"] = this.description;
        if (Array.isArray(this.subjects)) {
            data["subjects"] = [];
            for (let item of this.subjects)
                data["subjects"].push(item);
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
    subjects: string[] | undefined;
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