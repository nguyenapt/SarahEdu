import { CustomTenantDto } from '@shared/service-proxies/custom-tenant/dto/customtenant-dto';
import * as moment from 'moment';

export class CreateRoomDto implements ICreateRoomDto {
    name: string | undefined;
    description: string | undefined;
    customTenantId:string| undefined;

    constructor(data?: ICreateRoomDto) {
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
            this.customTenantId = data["customTenantId"];
        }
    }

    static fromJS(data: any): CreateRoomDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateRoomDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["customTenantId"] = this.customTenantId;
        return data; 
    }

    clone(): CreateRoomDto {
        const json = this.toJSON();
        let result = new CreateRoomDto();
        result.init(json);
        return result;
    }
}

export interface ICreateRoomDto {
    name: string | undefined;
    description: string | undefined;
    customTenantId:string| undefined;
}

export class RoomDto implements IRoomDto {
    name: string | undefined;
    description: string | undefined;  
    customTenant:CustomTenantDto| undefined;
    id: string;

    constructor(data?: IRoomDto) {
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
            this.customTenant = data["customTenant"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): RoomDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoomDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["customTenant"] = this.customTenant;
        data["id"] = this.id;
        return data; 
    }

    clone(): RoomDto {
        const json = this.toJSON();
        let result = new RoomDto();
        result.init(json);
        return result;
    }
}

export interface IRoomDto {
    name: string | undefined;
    description: string | undefined;    
    customTenant:CustomTenantDto| undefined;
    id: string;
}

export class RoomDtoPagedResultDto implements IRoomDtoPagedResultDto {
    totalCount: number;
    items: RoomDto[] | undefined;

    constructor(data?: IRoomDtoPagedResultDto) {
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
                    this.items.push(RoomDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RoomDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoomDtoPagedResultDto();
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

    clone(): RoomDtoPagedResultDto {
        const json = this.toJSON();
        let result = new RoomDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IRoomDtoPagedResultDto {
    totalCount: number;
    items: RoomDto[] | undefined;
}

export class RoomDtoListResultDto implements IRoomDtoListResultDto {
    items: RoomDto[] | undefined;

    constructor(data?: IRoomDtoListResultDto) {
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
                    this.items.push(RoomDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RoomDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoomDtoListResultDto();
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

    clone(): RoomDtoListResultDto {
        const json = this.toJSON();
        let result = new RoomDtoListResultDto();
        result.init(json);
        return result;
    }
}

export interface IRoomDtoListResultDto {
    items: RoomDto[] | undefined;
}