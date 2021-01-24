import { SubjectDto } from '@shared/service-proxies/subject/dto/subject-dto';
import * as moment from 'moment';

export class CreateCourseDto implements ICreateCourseDto {
    name: string | undefined;
    description: string | undefined;
    subjects: string[] | undefined;
    courseFees: CourseFeeDto[] | undefined;

    constructor(data?: ICreateCourseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
            this.description = data["description"];
            if (Array.isArray(data["subjects"])) {
                this.subjects = [] as any;
                for (let item of data["subjects"])
                    this.subjects.push(item);
            }
            if (Array.isArray(data["courseFees"])) {
                this.courseFees = [] as any;
                for (let item of data["courseFees"])
                    this.courseFees.push(item);
            }
        }
    }

    static fromJS(data: any): CreateCourseDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateCourseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        if (Array.isArray(this.subjects)) {
            data["subjects"] = [];
            for (let item of this.subjects)
                data["subjects"].push(item);
        }
        if (Array.isArray(this.courseFees)) {
            data["courseFees"] = [];
            for (let item of this.courseFees)
                data["courseFees"].push(item);
        }
        return data; 
    }

    clone(): CreateCourseDto {
        const json = this.toJSON();
        let result = new CreateCourseDto();
        result.init(json);
        return result;
    }
}

export interface ICreateCourseDto {
    name: string | undefined;
    description: string | undefined;
    subjects: string[] | undefined;
    courseFees: CourseFeeDto[] | undefined;
}

export class CourseDto implements ICourseDto {
    name: string | undefined;
    description: string | undefined;
    subjects: string[] | undefined;
    courseFees: CourseFeeDto[] | undefined;
    id: string;

    constructor(data?: ICourseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
            this.description = data["description"];
            if (Array.isArray(data["subjects"])) {
                this.subjects = [] as any;
                for (let item of data["subjects"])
                    this.subjects.push(item);
            }
            if (Array.isArray(data["courseFees"])) {
                this.courseFees = [] as any;
                for (let item of data["courseFees"])
                    this.courseFees.push(item);
            }
            this.id = data["id"];
        }
    }

    static fromJS(data: any): CourseDto {
        data = typeof data === 'object' ? data : {};
        let result = new CourseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        if (Array.isArray(this.subjects)) {
            data["subjects"] = [];
            for (let item of this.subjects)
                data["subjects"].push(item);
        }
        if (Array.isArray(this.courseFees)) {
            data["courseFees"] = [];
            for (let item of this.courseFees)
                data["courseFees"].push(item);
        }
        data["id"] = this.id;
        return data; 
    }

    clone(): CourseDto {
        const json = this.toJSON();
        let result = new CourseDto();
        result.init(json);
        return result;
    }
}

export interface ICourseDto {
    name: string | undefined;
    description: string | undefined;
    subjects: string[] | undefined;
    courseFees: CourseFeeDto[] | undefined;
    id: string;
}

//course with subject

export class CourseWithSubjectDto implements ICourseWithSubjectDto {
    name: string | undefined;
    description: string | undefined;
    courseSubjects: CourseSubjectDto[] | undefined;
    courseFees: CourseFeeDto[] | undefined;
    id: string;

    constructor(data?: ICourseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
            this.description = data["description"];
            if (Array.isArray(data["courseSubjects"])) {
                this.courseSubjects = [] as any;
                for (let item of data["courseSubjects"])
                    this.courseSubjects.push(item);
            }
            if (Array.isArray(data["courseFees"])) {
                this.courseFees = [] as any;
                for (let item of data["courseFees"])
                    this.courseFees.push(item);
            }
            this.id = data["id"];
        }
    }

    static fromJS(data: any): CourseWithSubjectDto {
        data = typeof data === 'object' ? data : {};
        let result = new CourseWithSubjectDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        if (Array.isArray(this.courseSubjects)) {
            data["courseSubjects"] = [];
            for (let item of this.courseSubjects)
                data["courseSubjects"].push(item);
        }
        if (Array.isArray(this.courseFees)) {
            data["courseFees"] = [];
            for (let item of this.courseFees)
                data["courseFees"].push(item);
        }
        data["id"] = this.id;
        return data; 
    }

    clone(): CourseWithSubjectDto {
        const json = this.toJSON();
        let result = new CourseWithSubjectDto();
        result.init(json);
        return result;
    }
}

export interface ICourseWithSubjectDto {
    name: string | undefined;
    description: string | undefined;
    courseSubjects: CourseSubjectDto[] | undefined;
    courseFees: CourseFeeDto[] | undefined;
    id: string;
}
//end course with subject

export class CourseDtoPagedResultDto implements ICourseDtoPagedResultDto {
    totalCount: number;
    items: CourseDto[] | undefined;

    constructor(data?: ICourseDtoPagedResultDto) {
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
                    this.items.push(CourseDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CourseDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new CourseDtoPagedResultDto();
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

    clone(): CourseDtoPagedResultDto {
        const json = this.toJSON();
        let result = new CourseDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface ICourseDtoPagedResultDto {
    totalCount: number;
    items: CourseDto[] | undefined;
}

export class SubjectDtoListResultDto implements ISubjectDtoListResultDto {
    items: SubjectDto[] | undefined;

    constructor(data?: ISubjectDtoListResultDto) {
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
                    this.items.push(SubjectDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SubjectDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new SubjectDtoListResultDto();
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

    clone(): SubjectDtoListResultDto {
        const json = this.toJSON();
        let result = new SubjectDtoListResultDto();
        result.init(json);
        return result;
    }
}

export interface ISubjectDtoListResultDto {
    items: SubjectDto[] | undefined;
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
    courseId : string | undefined;  
    subjectId : string | undefined;    
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
            this.courseId = data["courseId"];    
            this.subjectId = data["subjectId"];    
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
        data["courseId"] = this.courseId;
        data["subjectId"] = this.subjectId;       
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
    courseId : string | undefined;  
    subjectId : string | undefined;  
    id: string;
}


export class CourseFeeDto implements ICourseFeeDto {
    fee: number | undefined;
    feeMultiple: number | undefined;
    year: number | undefined;
    isActive: boolean | undefined;
    activeFrom: string | undefined;
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
            this.fee = data["fee"];
            this.year = data["year"];
            this.isActive = data["isActive"];
            this.feeMultiple = data["feeMultiple"];
            this.activeFrom = data["activeFrom"];
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
        data["fee"] = this.fee;
        data["year"] = this.year;
        data["isActive"] = this.isActive;
        data["feeMultiple"] = this.feeMultiple;
        data["activeFrom"] = this.activeFrom;
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

export interface ICourseFeeDto {
    fee: number | undefined;
    feeMultiple: number | undefined;
    year: number | undefined;
    isActive: boolean | undefined;    
    activeFrom: string | undefined;
    id: string;
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