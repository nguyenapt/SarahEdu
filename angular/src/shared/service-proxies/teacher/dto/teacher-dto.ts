import * as moment from 'moment';

export class CreateTeacherDto implements ICreateTeacherDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    salary: number | undefined;
    description: string | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    isActive: boolean | undefined;

    constructor(data?: ICreateTeacherDto) {
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
            this.email = data["email"];
            this.phoneNumber = data["phoneNumber"];
            this.salary = data["salary"];
            this.description = data["description"];
            this.startDate =data["startDate"] ? moment(data["startDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? moment(data["endDate"].toString()) : <any>undefined;
            this.isActive = data["isActive"];
        }
    }

    static fromJS(data: any): CreateTeacherDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateTeacherDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};        
        data["fullName"] = this.fullName;
        data["dateOfBirth"] = this.dateOfBirth ? moment.utc(this.dateOfBirth).format() : <any>undefined;
        data["email"] = this.email;
        data["phoneNumber"] = this.phoneNumber;
        data["salary"] = this.salary;
        data["description"] = this.description;
        data["startDate"] = this.startDate ? moment.utc(this.dateOfBirth).format() : <any>undefined;
        data["endDate"] = this.endDate ? moment.utc(this.dateOfBirth).format(): <any>undefined;
        data["isActive"] = this.isActive;
        return data; 
    }

    clone(): CreateTeacherDto {
        const json = this.toJSON();
        let result = new CreateTeacherDto();
        result.init(json);
        return result;
    }
}

export interface ICreateTeacherDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    salary: number | undefined;
    description: string | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    isActive: boolean | undefined;
}

export class TeacherDto implements ITeacherDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    salary: number | undefined;
    description: string | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    isActive: boolean | undefined;
    salaries: TeacherSalaryDto[] | undefined;
    id: string;

    constructor(data?: ITeacherDto) {
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
            this.email = data["email"];
            this.phoneNumber = data["phoneNumber"];
            this.salary = data["salary"];
            this.description = data["description"];
            this.startDate = data["startDate"] ? moment(data["startDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? moment(data["endDate"].toString()) : <any>undefined;
            this.isActive = data["isActive"];
            this.id = data["id"];
            if (Array.isArray(data["salaries"])) {
                this.salaries = [] as any;
                for (let item of data["salaries"])
                    this.salaries.push(item);
            }
        }
    }

    static fromJS(data: any): TeacherDto {
        data = typeof data === 'object' ? data : {};
        let result = new TeacherDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};        
        data["fullName"] = this.fullName;
        data["dateOfBirth"] = this.dateOfBirth ? this.dateOfBirth : <any>undefined;
        data["email"] = this.email;
        data["phoneNumber"] = this.phoneNumber;
        data["salary"] = this.salary;
        data["description"] = this.description;
        data["startDate"] = this.startDate ? this.startDate : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate : <any>undefined;
        data["isActive"] = this.isActive;
        data["id"] = this.id;
        if (Array.isArray(this.salaries)) {
            data["salaries"] = [];
            for (let item of this.salaries)
                data["salaries"].push(item);
        }
        return data; 
    }

    clone(): TeacherDto {
        const json = this.toJSON();
        let result = new TeacherDto();
        result.init(json);
        return result;
    }
}

export interface ITeacherDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    salary: number | undefined;
    description: string | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    isActive: boolean | undefined;
    salaries :TeacherSalaryDto[] | undefined;
    id: string;
}

//salary
export class TeacherSalaryDto implements ITeacherSalaryDto {        
    salary: number | undefined;
    activeFrom: moment.Moment | undefined;
    isActive: boolean | undefined;
    id: string;

    constructor(data?: ITeacherDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {                        
            this.salary = data["salary"];
            this.activeFrom = data["activeFrom"] ? moment(data["activeFrom"].toString()) : <any>undefined;            
            this.isActive = data["isActive"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): TeacherDto {
        data = typeof data === 'object' ? data : {};
        let result = new TeacherDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};                
        data["salary"] = this.salary;
        data["activeFrom"] = this.activeFrom ? this.activeFrom : <any>undefined;        
        data["isActive"] = this.isActive;
        data["id"] = this.id;
        return data; 
    }

    clone(): TeacherDto {
        const json = this.toJSON();
        let result = new TeacherDto();
        result.init(json);
        return result;
    }
}

export interface ITeacherSalaryDto {
    salary: number | undefined;    
    activeFrom: moment.Moment | undefined;    
    isActive: boolean | undefined;
    id: string;
}
//end salary

export class TeacherDtoPagedResultDto implements ITeacherDtoPagedResultDto {
    totalCount: number;
    items: TeacherDto[] | undefined;

    constructor(data?: ITeacherDtoPagedResultDto) {
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
                    this.items.push(TeacherDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TeacherDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new TeacherDtoPagedResultDto();
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

    clone(): TeacherDtoPagedResultDto {
        const json = this.toJSON();
        let result = new TeacherDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface ITeacherDtoPagedResultDto {
    totalCount: number;
    items: TeacherDto[] | undefined;
}
