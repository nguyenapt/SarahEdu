import * as moment from 'moment';

export class CreateSubjectDto implements ICreateSubjectDto {
    name: string | undefined;
    description: string | undefined;

    constructor(data?: ICreateSubjectDto) {
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

    static fromJS(data: any): CreateSubjectDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateSubjectDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;        
        return data; 
    }

    clone(): CreateSubjectDto {
        const json = this.toJSON();
        let result = new CreateSubjectDto();
        result.init(json);
        return result;
    }
}

export interface ICreateSubjectDto {
    name: string | undefined;
    description: string | undefined;
}

export class SubjectDto implements ISubjectDto {
    name: string | undefined;
    description: string | undefined;  
    id: string;

    constructor(data?: ISubjectDto) {
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

    static fromJS(data: any): SubjectDto {
        data = typeof data === 'object' ? data : {};
        let result = new SubjectDto();
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

    clone(): SubjectDto {
        const json = this.toJSON();
        let result = new SubjectDto();
        result.init(json);
        return result;
    }
}

export interface ISubjectDto {
    name: string | undefined;
    description: string | undefined;    
    id: string;
}

export class SubjectDtoPagedResultDto implements ISubjectDtoPagedResultDto {
    totalCount: number;
    items: SubjectDto[] | undefined;

    constructor(data?: ISubjectDtoPagedResultDto) {
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
                    this.items.push(SubjectDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SubjectDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new SubjectDtoPagedResultDto();
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

    clone(): SubjectDtoPagedResultDto {
        const json = this.toJSON();
        let result = new SubjectDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface ISubjectDtoPagedResultDto {
    totalCount: number;
    items: SubjectDto[] | undefined;
}
