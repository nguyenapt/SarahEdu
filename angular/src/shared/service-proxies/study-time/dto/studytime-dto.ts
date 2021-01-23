import * as moment from 'moment';

export class CreateStudyTimeDto implements ICreateStudyTimeDto {
    name: string | undefined;
    fromHour: string | undefined;    
    toHour: string | undefined;    
    sortOrder: number | undefined;

    constructor(data?: ICreateStudyTimeDto) {
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
            this.fromHour = data["fromHour"];
            this.toHour = data["toHour"];
            this.sortOrder = data["sortOrder"];
        }
    }

    static fromJS(data: any): CreateStudyTimeDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateStudyTimeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["fromHour"] = this.fromHour;        
        data["toHour"] = this.toHour;        
        data["sortOrder"] = this.sortOrder;        
        return data; 
    }

    clone(): CreateStudyTimeDto {
        const json = this.toJSON();
        let result = new CreateStudyTimeDto();
        result.init(json);
        return result;
    }
}

export interface ICreateStudyTimeDto {
    name: string | undefined;
    fromHour: string | undefined;    
    toHour: string | undefined;    
    sortOrder: number | undefined;
}

export class StudyTimeDto implements IStudyTimeDto {
    name: string | undefined;
    fromHour: string | undefined;    
    toHour: string | undefined;    
    sortOrder: number | undefined;
    id: string;

    constructor(data?: IStudyTimeDto) {
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
            this.fromHour = data["fromHour"];            
            this.toHour = data["toHour"];            
            this.sortOrder = data["sortOrder"];            
            this.id = data["id"];
        }
    }

    static fromJS(data: any): StudyTimeDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudyTimeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["fromHour"] = this.fromHour;        
        data["toHour"] = this.toHour;        
        data["sortOrder"] = this.sortOrder;        
        data["id"] = this.id;
        return data; 
    }

    clone(): StudyTimeDto {
        const json = this.toJSON();
        let result = new StudyTimeDto();
        result.init(json);
        return result;
    }
}

export interface IStudyTimeDto {
    name: string | undefined;
    fromHour: string | undefined;    
    toHour: string | undefined;    
    sortOrder: number | undefined;
    id: string;
}

export class StudyTimeDtoPagedResultDto implements IStudyTimeDtoPagedResultDto {
    totalCount: number;
    items: StudyTimeDto[] | undefined;

    constructor(data?: IStudyTimeDtoPagedResultDto) {
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
                    this.items.push(StudyTimeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): StudyTimeDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudyTimeDtoPagedResultDto();
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

    clone(): StudyTimeDtoPagedResultDto {
        const json = this.toJSON();
        let result = new StudyTimeDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IStudyTimeDtoPagedResultDto {
    totalCount: number;
    items: StudyTimeDto[] | undefined;
}
