import * as moment from 'moment';

export class CreateUserDto implements ICreateUserDto {
    userName: string | undefined;
    name: string | undefined;
    surname: string | undefined;
    emailAddress: string | undefined;
    isActive: boolean;
    roleNames: string[] | undefined;
    password: string | undefined;

    constructor(data?: ICreateUserDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.userName = data["userName"];
            this.name = data["name"];
            this.surname = data["surname"];
            this.emailAddress = data["emailAddress"];
            this.isActive = data["isActive"];
            if (Array.isArray(data["roleNames"])) {
                this.roleNames = [] as any;
                for (let item of data["roleNames"])
                    this.roleNames.push(item);
            }
            this.password = data["password"];
        }
    }

    static fromJS(data: any): CreateUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userName"] = this.userName;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["emailAddress"] = this.emailAddress;
        data["isActive"] = this.isActive;
        if (Array.isArray(this.roleNames)) {
            data["roleNames"] = [];
            for (let item of this.roleNames)
                data["roleNames"].push(item);
        }
        data["password"] = this.password;
        return data; 
    }

    clone(): CreateUserDto {
        const json = this.toJSON();
        let result = new CreateUserDto();
        result.init(json);
        return result;
    }
}

export interface ICreateUserDto {
    userName: string | undefined;
    name: string | undefined;
    surname: string | undefined;
    emailAddress: string | undefined;
    isActive: boolean;
    roleNames: string[] | undefined;
    password: string | undefined;
}

export class UserDto implements IUserDto {
    userName: string | undefined;
    name: string | undefined;
    surname: string | undefined;
    emailAddress: string | undefined;
    isActive: boolean;
    fullName: string | undefined;
    lastLoginTime: moment.Moment | undefined;
    creationTime: moment.Moment;
    roleNames: string[] | undefined;
    id: number;

    constructor(data?: IUserDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.userName = data["userName"];
            this.name = data["name"];
            this.surname = data["surname"];
            this.emailAddress = data["emailAddress"];
            this.isActive = data["isActive"];
            this.fullName = data["fullName"];
            this.lastLoginTime = data["lastLoginTime"] ? moment(data["lastLoginTime"].toString()) : <any>undefined;
            this.creationTime = data["creationTime"] ? moment(data["creationTime"].toString()) : <any>undefined;
            if (Array.isArray(data["roleNames"])) {
                this.roleNames = [] as any;
                for (let item of data["roleNames"])
                    this.roleNames.push(item);
            }
            this.id = data["id"];
        }
    }

    static fromJS(data: any): UserDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userName"] = this.userName;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["emailAddress"] = this.emailAddress;
        data["isActive"] = this.isActive;
        data["fullName"] = this.fullName;
        data["lastLoginTime"] = this.lastLoginTime ? this.lastLoginTime.toISOString() : <any>undefined;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        if (Array.isArray(this.roleNames)) {
            data["roleNames"] = [];
            for (let item of this.roleNames)
                data["roleNames"].push(item);
        }
        data["id"] = this.id;
        return data; 
    }

    clone(): UserDto {
        const json = this.toJSON();
        let result = new UserDto();
        result.init(json);
        return result;
    }
}

export interface IUserDto {
    userName: string | undefined;
    name: string | undefined;
    surname: string | undefined;
    emailAddress: string | undefined;
    isActive: boolean;
    fullName: string | undefined;
    lastLoginTime: moment.Moment | undefined;
    creationTime: moment.Moment;
    roleNames: string[] | undefined;
    id: number;
}

export class ChangeUserLanguageDto implements IChangeUserLanguageDto {
    languageName: string | undefined;

    constructor(data?: IChangeUserLanguageDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.languageName = data["languageName"];
        }
    }

    static fromJS(data: any): ChangeUserLanguageDto {
        data = typeof data === 'object' ? data : {};
        let result = new ChangeUserLanguageDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["languageName"] = this.languageName;
        return data; 
    }

    clone(): ChangeUserLanguageDto {
        const json = this.toJSON();
        let result = new ChangeUserLanguageDto();
        result.init(json);
        return result;
    }
}

export interface IChangeUserLanguageDto {
    languageName: string | undefined;
}

export class ChangePasswordDto implements IChangePasswordDto {
    currentPassword: string | undefined;
    newPassword: string | undefined;

    constructor(data?: IChangePasswordDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.currentPassword = data["currentPassword"];
            this.newPassword = data["newPassword"];
        }
    }

    static fromJS(data: any): ChangePasswordDto {
        data = typeof data === 'object' ? data : {};
        let result = new ChangePasswordDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["currentPassword"] = this.currentPassword;
        data["newPassword"] = this.newPassword;
        return data; 
    }

    clone(): ChangePasswordDto {
        const json = this.toJSON();
        let result = new ChangePasswordDto();
        result.init(json);
        return result;
    }
}

export interface IChangePasswordDto {
    currentPassword: string | undefined;
    newPassword: string | undefined;
}

export class ResetPasswordDto implements IResetPasswordDto {
    adminPassword: string | undefined;
    userId: number;
    newPassword: string | undefined;

    constructor(data?: IResetPasswordDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.adminPassword = data["adminPassword"];
            this.userId = data["userId"];
            this.newPassword = data["newPassword"];
        }
    }

    static fromJS(data: any): ResetPasswordDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResetPasswordDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["adminPassword"] = this.adminPassword;
        data["userId"] = this.userId;
        data["newPassword"] = this.newPassword;
        return data; 
    }

    clone(): ResetPasswordDto {
        const json = this.toJSON();
        let result = new ResetPasswordDto();
        result.init(json);
        return result;
    }
}

export interface IResetPasswordDto {
    adminPassword: string | undefined;
    userId: number;
    newPassword: string | undefined;
}

export class UserDtoPagedResultDto implements IUserDtoPagedResultDto {
    totalCount: number;
    items: UserDto[] | undefined;

    constructor(data?: IUserDtoPagedResultDto) {
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
                    this.items.push(UserDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UserDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserDtoPagedResultDto();
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

    clone(): UserDtoPagedResultDto {
        const json = this.toJSON();
        let result = new UserDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IUserDtoPagedResultDto {
    totalCount: number;
    items: UserDto[] | undefined;
}
