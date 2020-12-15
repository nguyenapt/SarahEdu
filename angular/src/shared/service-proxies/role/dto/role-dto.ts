import * as moment from 'moment';

export class CreateRoleDto implements ICreateRoleDto {
    name: string | undefined;
    displayName: string | undefined;
    normalizedName: string | undefined;
    description: string | undefined;
    grantedPermissions: string[] | undefined;

    constructor(data?: ICreateRoleDto) {
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
            this.displayName = data["displayName"];
            this.normalizedName = data["normalizedName"];
            this.description = data["description"];
            if (Array.isArray(data["grantedPermissions"])) {
                this.grantedPermissions = [] as any;
                for (let item of data["grantedPermissions"])
                    this.grantedPermissions.push(item);
            }
        }
    }

    static fromJS(data: any): CreateRoleDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateRoleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["normalizedName"] = this.normalizedName;
        data["description"] = this.description;
        if (Array.isArray(this.grantedPermissions)) {
            data["grantedPermissions"] = [];
            for (let item of this.grantedPermissions)
                data["grantedPermissions"].push(item);
        }
        return data; 
    }

    clone(): CreateRoleDto {
        const json = this.toJSON();
        let result = new CreateRoleDto();
        result.init(json);
        return result;
    }
}

export interface ICreateRoleDto {
    name: string | undefined;
    displayName: string | undefined;
    normalizedName: string | undefined;
    description: string | undefined;
    grantedPermissions: string[] | undefined;
}

export class RoleDto implements IRoleDto {
    name: string | undefined;
    displayName: string | undefined;
    normalizedName: string | undefined;
    description: string | undefined;
    grantedPermissions: string[] | undefined;
    id: number;

    constructor(data?: IRoleDto) {
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
            this.displayName = data["displayName"];
            this.normalizedName = data["normalizedName"];
            this.description = data["description"];
            if (Array.isArray(data["grantedPermissions"])) {
                this.grantedPermissions = [] as any;
                for (let item of data["grantedPermissions"])
                    this.grantedPermissions.push(item);
            }
            this.id = data["id"];
        }
    }

    static fromJS(data: any): RoleDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["normalizedName"] = this.normalizedName;
        data["description"] = this.description;
        if (Array.isArray(this.grantedPermissions)) {
            data["grantedPermissions"] = [];
            for (let item of this.grantedPermissions)
                data["grantedPermissions"].push(item);
        }
        data["id"] = this.id;
        return data; 
    }

    clone(): RoleDto {
        const json = this.toJSON();
        let result = new RoleDto();
        result.init(json);
        return result;
    }
}

export interface IRoleDto {
    name: string | undefined;
    displayName: string | undefined;
    normalizedName: string | undefined;
    description: string | undefined;
    grantedPermissions: string[] | undefined;
    id: number;
}

export class RoleListDto implements IRoleListDto {
    name: string | undefined;
    displayName: string | undefined;
    isStatic: boolean;
    isDefault: boolean;
    creationTime: moment.Moment;
    id: number;

    constructor(data?: IRoleListDto) {
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
            this.displayName = data["displayName"];
            this.isStatic = data["isStatic"];
            this.isDefault = data["isDefault"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"].toString()) : <any>undefined;
            this.id = data["id"];
        }
    }

    static fromJS(data: any): RoleListDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleListDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["isStatic"] = this.isStatic;
        data["isDefault"] = this.isDefault;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        data["id"] = this.id;
        return data; 
    }

    clone(): RoleListDto {
        const json = this.toJSON();
        let result = new RoleListDto();
        result.init(json);
        return result;
    }
}

export interface IRoleListDto {
    name: string | undefined;
    displayName: string | undefined;
    isStatic: boolean;
    isDefault: boolean;
    creationTime: moment.Moment;
    id: number;
}

export class RoleListDtoListResultDto implements IRoleListDtoListResultDto {
    items: RoleListDto[] | undefined;

    constructor(data?: IRoleListDtoListResultDto) {
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
                    this.items.push(RoleListDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RoleListDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleListDtoListResultDto();
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

    clone(): RoleListDtoListResultDto {
        const json = this.toJSON();
        let result = new RoleListDtoListResultDto();
        result.init(json);
        return result;
    }
}

export interface IRoleListDtoListResultDto {
    items: RoleListDto[] | undefined;
}

export class RoleDtoListResultDto implements IRoleDtoListResultDto {
    items: RoleDto[] | undefined;

    constructor(data?: IRoleDtoListResultDto) {
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
                    this.items.push(RoleDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RoleDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleDtoListResultDto();
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

    clone(): RoleDtoListResultDto {
        const json = this.toJSON();
        let result = new RoleDtoListResultDto();
        result.init(json);
        return result;
    }
}

export interface IRoleDtoListResultDto {
    items: RoleDto[] | undefined;
}

export class RoleEditDto implements IRoleEditDto {
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;
    isStatic: boolean;
    id: number;

    constructor(data?: IRoleEditDto) {
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
            this.displayName = data["displayName"];
            this.description = data["description"];
            this.isStatic = data["isStatic"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): RoleEditDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleEditDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["description"] = this.description;
        data["isStatic"] = this.isStatic;
        data["id"] = this.id;
        return data; 
    }

    clone(): RoleEditDto {
        const json = this.toJSON();
        let result = new RoleEditDto();
        result.init(json);
        return result;
    }
}

export interface IRoleEditDto {
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;
    isStatic: boolean;
    id: number;
}

export class RoleDtoPagedResultDto implements IRoleDtoPagedResultDto {
    totalCount: number;
    items: RoleDto[] | undefined;

    constructor(data?: IRoleDtoPagedResultDto) {
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
                    this.items.push(RoleDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RoleDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleDtoPagedResultDto();
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

    clone(): RoleDtoPagedResultDto {
        const json = this.toJSON();
        let result = new RoleDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IRoleDtoPagedResultDto {
    totalCount: number;
    items: RoleDto[] | undefined;
}