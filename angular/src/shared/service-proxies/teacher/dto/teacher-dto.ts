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
    color: string | undefined;
    userId: number | undefined;
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
            this.color = data["color"];
            this.userId = data["userId"];
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
        data["color"] = this.color;
        data["userId"] = this.userId;
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
    color: string | undefined;
    userId: number | undefined;
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
    color: string | undefined;
    id: string;
    userId: number | undefined;

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
            this.color = data["color"];
            this.id = data["id"];
            this.userId = data["userId"];
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
        data["color"] = this.color;
        data["id"] = this.id;
        data["userId"] = this.userId;
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
    color: string | undefined;
    id: string;
    userId: number | undefined;
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


export class TeacherProductivityDto implements ITeacherProductivityDto {    
    fee: number | undefined;
    paid: number | undefined;
    hour: number | undefined;
    startDate: Date | undefined;
    endDate?: Date | undefined;
    roomName: string | undefined;
    courseName: string | undefined;
    subjectName: string | undefined;

    constructor(data?: ITeacherProductivityDto) {
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
            this.paid = data["paid"];
            this.hour = data["hour"];
            this.startDate = data["startDate"];
            this.endDate = data["endDate"];
            this.roomName = data["roomName"];
            this.courseName = data["courseName"];
            this.subjectName = data["subjectName"];
        }
    }

    static fromJS(data: any): TeacherProductivityDto {
        data = typeof data === 'object' ? data : {};
        let result = new TeacherProductivityDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};        
        data["fee"] = this.fee;
        data["paid"] = this.paid;
        data["hour"] = this.hour;
        data["startDate"] = this.startDate;
        data["endDate"] = this.endDate;
        data["roomName"] = this.roomName;
        data["courseName"] = this.courseName;
        data["subjectName"] = this.subjectName;
        return data; 
    }

    clone(): TeacherProductivityDto {
        const json = this.toJSON();
        let result = new TeacherProductivityDto();
        result.init(json);
        return result;
    }
}


export interface ITeacherProductivityDto {    
    fee: number | undefined;
    paid: number | undefined;
    hour: number | undefined;
    startDate: Date | undefined;
    endDate?: Date | undefined;
    roomName: string | undefined;
    courseName: string | undefined;
    subjectName: string | undefined;
}

export class TeacherProductivityListResultDto implements ITeacherProductivityListResultDto {
    totalCount: number;
    totalFee: number | undefined;
    totalUnpaid: number | undefined;
    totalHour: number | undefined;
    items: TeacherProductivityDto[] | undefined;

    constructor(data?: ITeacherProductivityListResultDto) {
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
            this.totalHour = data["totalHour"];
            if (Array.isArray(data["items"])) {
                this.items = [] as any;
                for (let item of data["items"])
                    this.items.push(TeacherProductivityDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TeacherProductivityListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new TeacherProductivityListResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        data["totalFee"] = this.totalFee;
        data["totalUnpaid"] = this.totalUnpaid;
        data["totalHour"] = this.totalHour;
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data; 
    }

    clone(): TeacherProductivityListResultDto {
        const json = this.toJSON();
        let result = new TeacherProductivityListResultDto();
        result.init(json);
        return result;
    }
}

export interface ITeacherProductivityListResultDto {
    totalCount: number;
    totalFee: number | undefined;
    totalUnpaid: number | undefined;
    totalHour: number | undefined;
    items: TeacherProductivityDto[] | undefined;
}


//Productivity Total
export class TeacherProductivityTotalDto implements ITeacherProductivityTotalDto {    
    teacher: TeacherDto | undefined;
    fee: number | undefined;    
    hour: number | undefined;

    constructor(data?: ITeacherProductivityTotalDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {            
            this.teacher = data["teacher"];
            this.fee = data["fee"];
            this.hour = data["hour"];            
        }
    }

    static fromJS(data: any): TeacherProductivityTotalDto {
        data = typeof data === 'object' ? data : {};
        let result = new TeacherProductivityTotalDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};        
        data["teacher"] = this.teacher;
        data["fee"] = this.fee;        
        data["hour"] = this.hour;        
        return data; 
    }

    clone(): TeacherProductivityTotalDto {
        const json = this.toJSON();
        let result = new TeacherProductivityTotalDto();
        result.init(json);
        return result;
    }
}


export interface ITeacherProductivityTotalDto {    
    teacher: TeacherDto | undefined;
    fee: number | undefined;    
    hour: number | undefined;    
}

export class TeacherProductivitytotalListResultDto implements ITeacherProductivitytotalListResultDto {
    totalCount: number;
    totalFee: number | undefined;
    totalHour: number | undefined;
    items: TeacherProductivityTotalDto[] | undefined;

    constructor(data?: TeacherProductivitytotalListResultDto) {
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
            this.totalHour = data["totalHour"];
            if (Array.isArray(data["items"])) {
                this.items = [] as any;
                for (let item of data["items"])
                    this.items.push(TeacherProductivityTotalDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TeacherProductivitytotalListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new TeacherProductivitytotalListResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        data["totalFee"] = this.totalFee;
        data["totalHour"] = this.totalHour;
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data; 
    }

    clone(): TeacherProductivitytotalListResultDto {
        const json = this.toJSON();
        let result = new TeacherProductivitytotalListResultDto();
        result.init(json);
        return result;
    }
}

export interface ITeacherProductivitytotalListResultDto {
    totalCount: number;
    totalFee: number | undefined;
    totalHour: number | undefined;
    items: TeacherProductivityTotalDto[] | undefined;
}