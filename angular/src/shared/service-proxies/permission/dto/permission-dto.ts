//Permission
export class PermissionDto implements IPermissionDto {
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;
    id: number;

    constructor(data?: IPermissionDto) {
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
            this.id = data["id"];
        }
    }

    static fromJS(data: any): PermissionDto {
        data = typeof data === 'object' ? data : {};
        let result = new PermissionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["description"] = this.description;
        data["id"] = this.id;
        return data; 
    }

    clone(): PermissionDto {
        const json = this.toJSON();
        let result = new PermissionDto();
        result.init(json);
        return result;
    }
}

export interface IPermissionDto {
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;
    id: number;
}

export class PermissionDtoListResultDto implements IPermissionDtoListResultDto {
    items: PermissionDto[] | undefined;

    constructor(data?: IPermissionDtoListResultDto) {
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
                    this.items.push(PermissionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PermissionDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new PermissionDtoListResultDto();
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

    clone(): PermissionDtoListResultDto {
        const json = this.toJSON();
        let result = new PermissionDtoListResultDto();
        result.init(json);
        return result;
    }
}

export interface IPermissionDtoListResultDto {
    items: PermissionDto[] | undefined;
}

export class FlatPermissionDto implements IFlatPermissionDto {
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;

    constructor(data?: IFlatPermissionDto) {
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
        }
    }

    static fromJS(data: any): FlatPermissionDto {
        data = typeof data === 'object' ? data : {};
        let result = new FlatPermissionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["description"] = this.description;
        return data; 
    }

    clone(): FlatPermissionDto {
        const json = this.toJSON();
        let result = new FlatPermissionDto();
        result.init(json);
        return result;
    }
}

export interface IFlatPermissionDto {
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;
}