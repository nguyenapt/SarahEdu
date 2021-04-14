import * as moment from 'moment';

export class CreateCustomTenantDto implements ICreateCustomTenantDto {
    name: string | undefined;
    description: string | undefined;

    constructor(data?: ICreateCustomTenantDto) {
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
        }
    }

    static fromJS(data: any): CreateCustomTenantDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateCustomTenantDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;        
        return data; 
    }

    clone(): CreateCustomTenantDto {
        const json = this.toJSON();
        let result = new CreateCustomTenantDto();
        result.init(json);
        return result;
    }
}

export interface ICreateCustomTenantDto {
    name: string | undefined;
    description: string | undefined;
}

export class CustomTenantDto implements ICustomTenantDto {
    name: string | undefined;
    description: string | undefined;  
    id: string;

    constructor(data?: ICustomTenantDto) {
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
        }
    }

    static fromJS(data: any): CustomTenantDto {
        data = typeof data === 'object' ? data : {};
        let result = new CustomTenantDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;        
        data["id"] = this.id;
        return data; 
    }

    clone(): CustomTenantDto {
        const json = this.toJSON();
        let result = new CustomTenantDto();
        result.init(json);
        return result;
    }
}

export interface ICustomTenantDto {
    name: string | undefined;
    description: string | undefined;    
    id: string;
}

export class CustomTenantDtoPagedResultDto implements ICustomTenantDtoPagedResultDto {
    totalCount: number;
    items: CustomTenantDto[] | undefined;

    constructor(data?: ICustomTenantDtoPagedResultDto) {
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
                    this.items.push(CustomTenantDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CustomTenantDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new CustomTenantDtoPagedResultDto();
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

    clone(): CustomTenantDtoPagedResultDto {
        const json = this.toJSON();
        let result = new CustomTenantDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface ICustomTenantDtoPagedResultDto {
    totalCount: number;
    items: CustomTenantDto[] | undefined;
}

export class CustomTenantDtoListResultDto implements ICustomTenantDtoListResultDto {
    items: CustomTenantDto[] | undefined;

    constructor(data?: ICustomTenantDtoListResultDto) {
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
                    this.items.push(CustomTenantDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CustomTenantDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new CustomTenantDtoListResultDto();
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

    clone(): CustomTenantDtoListResultDto {
        const json = this.toJSON();
        let result = new CustomTenantDtoListResultDto();
        result.init(json);
        return result;
    }
}

export interface ICustomTenantDtoListResultDto {
    items: CustomTenantDto[] | undefined;
}