import * as moment from 'moment';

export class CreateTimeSheetDto implements ICreateTimeSheetDto {
    firstName: string | undefined;
    middleName: string | undefined;
    lastName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    salary: number | undefined;
    description: string | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    isActive: boolean | undefined;

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
            this.firstName = data["firstName"];
            this.middleName = data["middleName"];
            this.lastName = data["lastName"];
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

    static fromJS(data: any): CreateTimeSheetDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateTimeSheetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["firstName"] = this.firstName;
        data["middleName"] = this.middleName;
        data["lastName"] = this.lastName;
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

    clone(): CreateTimeSheetDto {
        const json = this.toJSON();
        let result = new CreateTimeSheetDto();
        result.init(json);
        return result;
    }
}

export interface ICreateTimeSheetDto {
    firstName: string | undefined;
    middleName: string | undefined;
    lastName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    salary: number | undefined;
    description: string | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    isActive: boolean | undefined;
}

export class TimeSheetDto implements ITimeSheetDto {
    firstName: string | undefined;
    middleName: string | undefined;
    lastName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    salary: number | undefined;
    description: string | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    isActive: boolean | undefined;
    id: string;

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
            this.firstName = data["firstName"];
            this.middleName = data["middleName"];
            this.lastName = data["lastName"];
            this.dateOfBirth = data["dateOfBirth"] ? moment(data["dateOfBirth"].toString()) : <any>undefined;
            this.email = data["email"];
            this.phoneNumber = data["phoneNumber"];
            this.salary = data["salary"];
            this.description = data["description"];
            this.startDate = data["startDate"] ? moment(data["startDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? moment(data["endDate"].toString()) : <any>undefined;
            this.isActive = data["isActive"];
            this.id = data["id"];
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
        data["firstName"] = this.firstName;
        data["middleName"] = this.middleName;
        data["lastName"] = this.lastName;
        data["dateOfBirth"] = this.dateOfBirth ? this.dateOfBirth : <any>undefined;
        data["email"] = this.email;
        data["phoneNumber"] = this.phoneNumber;
        data["salary"] = this.salary;
        data["description"] = this.description;
        data["startDate"] = this.startDate ? this.startDate : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate : <any>undefined;
        data["isActive"] = this.isActive;
        data["id"] = this.id;
        return data; 
    }

    clone(): TimeSheetDto {
        const json = this.toJSON();
        let result = new TimeSheetDto();
        result.init(json);
        return result;
    }
}

export interface ITimeSheetDto {
    firstName: string | undefined;
    middleName: string | undefined;
    lastName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    salary: number | undefined;
    description: string | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    isActive: boolean | undefined;
    id: string;
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
