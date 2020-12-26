import { StudentDto } from '@shared/service-proxies/student/dto/student-dto';
import * as moment from 'moment';

export class CreateClassDto implements ICreateClassDto {
    name: string | undefined;
    description: string | undefined;
    students: StudentDto[] | undefined;

    constructor(data?: ICreateClassDto) {
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
            if (Array.isArray(data["students"])) {
                this.students = [] as any;
                for (let item of data["students"])
                    this.students.push(item);
            }
        }
    }

    static fromJS(data: any): CreateClassDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateClassDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;     
        if (Array.isArray(this.students)) {
            data["students"] = [];
            for (let item of this.students)
                data["students"].push(item);
        }   
        return data; 
    }

    clone(): CreateClassDto {
        const json = this.toJSON();
        let result = new CreateClassDto();
        result.init(json);
        return result;
    }
}

export interface ICreateClassDto {
    name: string | undefined;
    description: string | undefined;
    students: StudentDto[] | undefined;
}

export class ClassDto implements IClassDto {
    name: string | undefined;
    description: string | undefined;  
    students: StudentDto[] | undefined;
    id: string;

    constructor(data?: IClassDto) {
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
            this.id = data["id"];
            if (Array.isArray(data["students"])) {
                this.students = [] as any;
                for (let item of data["students"])
                    this.students.push(item);
            }
        }
    }

    static fromJS(data: any): ClassDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClassDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;        
        data["id"] = this.id;
        if (Array.isArray(this.students)) {
            data["students"] = [];
            for (let item of this.students)
                data["students"].push(item);
        }
        return data; 
    }

    clone(): ClassDto {
        const json = this.toJSON();
        let result = new ClassDto();
        result.init(json);
        return result;
    }
}

export interface IClassDto {
    name: string | undefined;
    description: string | undefined;    
    students: StudentDto[] | undefined;
    id: string;
}

export class ClassDtoPagedResultDto implements IClassDtoPagedResultDto {
    totalCount: number;
    items: ClassDto[] | undefined;

    constructor(data?: IClassDtoPagedResultDto) {
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
                    this.items.push(ClassDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ClassDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClassDtoPagedResultDto();
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

    clone(): ClassDtoPagedResultDto {
        const json = this.toJSON();
        let result = new ClassDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IClassDtoPagedResultDto {
    totalCount: number;
    items: ClassDto[] | undefined;
}
