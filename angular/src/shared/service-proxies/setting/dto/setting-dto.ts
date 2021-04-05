import * as moment from 'moment';

export class SettingDto implements ISettingDto {
    name: string | undefined;
    value: string | undefined;
    displayName: string;

    constructor(data?: ISettingDto) {
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
            this.value = data["value"];            
            this.displayName = data["displayName"];            
        }
    }

    static fromJS(data: any): SettingDto {
        data = typeof data === 'object' ? data : {};
        let result = new SettingDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["value"] = this.value;        
        data["displayName"] = this.displayName;        
        return data; 
    }

    clone(): SettingDto {
        const json = this.toJSON();
        let result = new SettingDto();
        result.init(json);
        return result;
    }
}

export interface ISettingDto {
    name: string | undefined;
    value: string | undefined;
    displayName: string;
}

export class SettingListDto implements ISettingListDto {
    name: string | undefined;
    value: SettingDto[] | undefined;

    constructor(data?: ISettingDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}

export interface ISettingListDto {
    name: string | undefined;
    value: SettingDto[] | undefined;
}

export class SettingPagedResultDto implements ISettingPagedResultDto {
    items: SettingListDto[] | undefined;

    constructor(data?: ISettingPagedResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.items = [] as any;
            data.forEach((item) => {
                var it = new SettingListDto();
                it.name = item.name;                
                if (Array.isArray(item.value)) {
                    it.value = [];                    
                    item.value.forEach(element => {
                        it.value.push(SettingDto.fromJS(element));
                    });                        
                }
                this.items.push(it);
            });            
        }
    }

    static fromJS(data: any): SettingPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new SettingPagedResultDto();
        result.init(data);
        return result;
    }
}

export interface ISettingPagedResultDto {
    items: SettingListDto[] | undefined;
}
