import { StudentDto } from '@shared/service-proxies/student/dto/student-dto';
import * as moment from 'moment';

export class CreateProtectorDto implements ICreateProtectorDto {    
    fullName: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    protectorType: string | undefined;
    isActive: boolean | undefined;

    constructor(data?: ICreateProtectorDto) {
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
            this.email = data["email"];
            this.phoneNumber = data["phoneNumber"];
            this.isActive = data["isActive"];
        }
    }

    static fromJS(data: any): CreateProtectorDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateProtectorDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fullName"] = this.fullName;        
        data["email"] = this.email;
        data["phoneNumber"] = this.phoneNumber;
        data["isActive"] = this.isActive;
        return data; 
    }

    clone(): CreateProtectorDto {
        const json = this.toJSON();
        let result = new CreateProtectorDto();
        result.init(json);
        return result;
    }
}

export interface ICreateProtectorDto {    
    fullName: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    protectorType: string | undefined;
    isActive: boolean | undefined;
}

export class ProtectorDto implements IProtectorDto {    
    fullName: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    protectorType: string | undefined;
    isActive: boolean | undefined;
    students: StudentDto[] | undefined;
    id: string;

    constructor(data?: IProtectorDto) {
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
            this.email = data["email"];
            this.phoneNumber = data["phoneNumber"];
            this.isActive = data["isActive"];
            if (Array.isArray(data["students"])) {
                this.students = [] as any;
                for (let item of data["students"])
                    this.students.push(item);
            }
            this.id = data["id"];
        }
    }

    static fromJS(data: any): ProtectorDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProtectorDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fullName"] = this.fullName;        
        data["email"] = this.email;
        data["phoneNumber"] = this.phoneNumber;
        data["isActive"] = this.isActive;
        data["id"] = this.id;
        if (Array.isArray(this.students)) {
            data["students"] = [];
            for (let item of this.students)
                data["students"].push(item);
        }
        return data; 
    }

    clone(): ProtectorDto {
        const json = this.toJSON();
        let result = new ProtectorDto();
        result.init(json);
        return result;
    }
}

export interface IProtectorDto {    
    fullName: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    protectorType: string | undefined;
    isActive: boolean | undefined;
    students: StudentDto[] | undefined;
    id: string;
}

export class ProtectorDtoPagedResultDto implements IProtectorDtoPagedResultDto {
    totalCount: number;
    items: ProtectorDto[] | undefined;

    constructor(data?: IProtectorDtoPagedResultDto) {
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
                    this.items.push(ProtectorDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProtectorDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProtectorDtoPagedResultDto();
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

    clone(): ProtectorDtoPagedResultDto {
        const json = this.toJSON();
        let result = new ProtectorDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IProtectorDtoPagedResultDto {
    totalCount: number;
    items: ProtectorDto[] | undefined;
}
