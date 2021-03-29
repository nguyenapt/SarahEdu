import * as moment from 'moment';

export class CreateStudentDto implements ICreateStudentDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    schoolName: string | undefined;
    className: string | undefined;
    isActive: boolean | undefined;
    description: string | undefined;
    courseSubjects: string[] | undefined;

    constructor(data?: ICreateStudentDto) {
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
            this.startDate = data["startDate"] ? moment(data["startDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? moment(data["endDate"].toString()) : <any>undefined;
            this.email = data["email"];
            this.phoneNumber = data["phoneNumber"];
            this.schoolName = data["schoolName"];
            this.className = data["className"];            
            this.isActive = data["isActive"];
            this.description = data["description"];
            if (Array.isArray(data["courseSubjects"])) {
                this.courseSubjects = [] as any;
                for (let item of data["courseSubjects"])
                    this.courseSubjects.push(item);
            }
        }
    }

    static fromJS(data: any): CreateStudentDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateStudentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fullName"] = this.fullName;        
        data["dateOfBirth"] = this.dateOfBirth ? this.dateOfBirth : <any>undefined;
        data["startDate"] = this.startDate ? this.startDate : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate : <any>undefined;
        data["email"] = this.email;
        data["phoneNumber"] = this.phoneNumber;
        data["schoolName"] = this.schoolName;
        data["className"] = this.className;
        data["description"] = this.description;            
        data["isActive"] = this.isActive;
        if (Array.isArray(this.courseSubjects)) {
            data["courseSubjects"] = [];
            for (let item of this.courseSubjects)
                data["courseSubjects"].push(item);
        }
        return data; 
    }

    clone(): CreateStudentDto {
        const json = this.toJSON();
        let result = new CreateStudentDto();
        result.init(json);
        return result;
    }
}

export interface ICreateStudentDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    schoolName: string | undefined;
    className: string | undefined;
    isActive: boolean | undefined;
    description: string | undefined;
    courseSubjects: string[] | undefined;
}

export class StudentDto implements IStudentDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    schoolName: string | undefined;
    className: string | undefined;
    isActive: boolean | undefined;
    description: string | undefined;
    courseSubjects: string[] | undefined;
    id: string;

    constructor(data?: IStudentDto) {
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
            this.startDate = data["startDate"] ? moment(data["startDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? moment(data["endDate"].toString()) : <any>undefined;
            this.email = data["email"];
            this.phoneNumber = data["phoneNumber"];
            this.schoolName = data["schoolName"];
            this.className = data["className"];
            this.description = data["description"]; 
            this.isActive = data["isActive"];
            if (Array.isArray(data["courseSubjects"])) {
                this.courseSubjects = [] as any;
                for (let item of data["courseSubjects"])
                    this.courseSubjects.push(item);
            }
            this.id = data["id"];
        }
    }

    static fromJS(data: any): StudentDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};        
        data["fullName"] = this.fullName;
        data["dateOfBirth"] = this.dateOfBirth ? this.dateOfBirth : <any>undefined;
        data["startDate"] = this.startDate ? this.startDate : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate : <any>undefined;
        data["email"] = this.email;
        data["phoneNumber"] = this.phoneNumber;
        data["schoolName"] = this.schoolName;
        data["className"] = this.className;
        data["description"] = this.description;            
        data["isActive"] = this.isActive;
        if (Array.isArray(this.courseSubjects)) {
            data["courseSubjects"] = [];
            for (let item of this.courseSubjects)
                data["courseSubjects"].push(item);
        }
        data["id"] = this.id;
        return data; 
    }

    clone(): StudentDto {
        const json = this.toJSON();
        let result = new StudentDto();
        result.init(json);
        return result;
    }
}

export interface IStudentDto {    
    fullName: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    schoolName: string | undefined;
    className: string | undefined;
    isActive: boolean | undefined;
    description: string | undefined;
    courseSubjects: string[] | undefined;
    id: string;
}

export class StudentDtoPagedResultDto implements IStudentDtoPagedResultDto {
    totalCount: number;
    items: StudentDto[] | undefined;

    constructor(data?: IStudentDtoPagedResultDto) {
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
                    this.items.push(StudentDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): StudentDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentDtoPagedResultDto();
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

    clone(): StudentDtoPagedResultDto {
        const json = this.toJSON();
        let result = new StudentDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IStudentDtoPagedResultDto {
    totalCount: number;
    items: StudentDto[] | undefined;
}


export class StudentFeeDto implements IStudentFeeDto {    
    fee: number | undefined;
    isSingle: boolean | undefined;
    startDate: Date | undefined;
    endDate?: Date | undefined;
    roomName: string | undefined;
    courseName: string | undefined;
    subjectName: string | undefined;
    teacherName: string | undefined;

    constructor(data?: IStudentFeeDto) {
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
            this.isSingle = data["isSingle"];
            this.startDate = data["startDate"];
            this.endDate = data["endDate"];
            this.roomName = data["roomName"];
            this.courseName = data["courseName"];
            this.subjectName = data["subjectName"];
            this.teacherName = data["teacherName"];
        }
    }

    static fromJS(data: any): StudentFeeDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentFeeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};        
        data["fee"] = this.fee;
        data["isSingle"] = this.isSingle;
        data["startDate"] = this.startDate;
        data["endDate"] = this.endDate;
        data["roomName"] = this.roomName;
        data["courseName"] = this.courseName;
        data["subjectName"] = this.subjectName;
        data["teacherName"] = this.teacherName;
        return data; 
    }

    clone(): StudentFeeDto {
        const json = this.toJSON();
        let result = new StudentFeeDto();
        result.init(json);
        return result;
    }
}


export interface IStudentFeeDto {    
    fee: number | undefined;
    isSingle: boolean | undefined;
    startDate: Date | undefined;
    endDate?: Date | undefined;
    roomName: string | undefined;
    courseName: string | undefined;
    subjectName: string | undefined;
    teacherName: string | undefined;
}

export class StudentFeeListResultDto implements IStudentFeeListResultDto {
    totalCount: number;
    totalFee: number | undefined;
    totalPayment: number | undefined;
    items: StudentFeeDto[] | undefined;

    constructor(data?: IStudentFeeListResultDto) {
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
            this.totalPayment = data["totalPayment"];
            if (Array.isArray(data["items"])) {
                this.items = [] as any;
                for (let item of data["items"])
                    this.items.push(StudentFeeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): StudentFeeListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentFeeListResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        data["totalFee"] = this.totalFee;
        data["totalPayment"] = this.totalPayment;
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data; 
    }

    clone(): StudentFeeListResultDto {
        const json = this.toJSON();
        let result = new StudentFeeListResultDto();
        result.init(json);
        return result;
    }
}

export interface IStudentFeeListResultDto {
    totalCount: number;
    totalFee: number | undefined;
    totalPayment: number | undefined;
    items: StudentFeeDto[] | undefined;
}

//Student Payment

export class CreateStudentPaymentDto implements ICreateStudentPaymentDto {
    studentId: string | undefined;
    paymentAmount: string | undefined;
    dateOfPayment: string | undefined;
    paidForMonth: string | undefined;

    constructor(data?: ICreateStudentPaymentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.studentId = data["studentId"];
            this.paymentAmount = data["paymentAmount"];
            this.dateOfPayment = data["dateOfPayment"];
            this.paidForMonth = data["paidForMonth"];
        }
    }

    static fromJS(data: any): CreateStudentPaymentDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateStudentPaymentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["studentId"] = this.studentId;
        data["paymentAmount"] = this.paymentAmount;
        data["dateOfPayment"] = this.dateOfPayment;
        data["paidForMonth"] = this.paidForMonth;
        return data; 
    }

    clone(): CreateStudentPaymentDto {
        const json = this.toJSON();
        let result = new CreateStudentPaymentDto();
        result.init(json);
        return result;
    }
}

export interface ICreateStudentPaymentDto {
    studentId: string | undefined;
    paymentAmount: string | undefined;
    dateOfPayment: string | undefined;
    paidForMonth: string | undefined;
}

export class StudentPaymentDto implements IStudentPaymentDto {
    studentId: string | undefined;
    paymentAmount: number;
    dateOfPayment: moment.Moment | undefined;
    paidForMonth: moment.Moment | undefined;
    id: string;

    constructor(data?: IStudentPaymentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.studentId = data["studentId"];
            this.paymentAmount = data["paymentAmount"];
            this.dateOfPayment = data["dateOfPayment"] ? moment(data["dateOfPayment"].toString()) : <any>undefined;            
            this.paidForMonth = data["paidForMonth"] ? moment(data["paidForMonth"].toString()) : <any>undefined;
            this.id = data["id"];
        }
    }

    static fromJS(data: any): StudentPaymentDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentPaymentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["studentId"] = this.studentId;
        data["paymentAmount"] = this.paymentAmount;
        data["dateOfPayment"] = this.dateOfPayment ? this.dateOfPayment : <any>undefined;
        data["paidForMonth"] = this.paidForMonth ? this.paidForMonth : <any>undefined;
        data["id"] = this.id;
        return data; 
    }

    clone(): StudentPaymentDto {
        const json = this.toJSON();
        let result = new StudentPaymentDto();
        result.init(json);
        return result;
    }
}

export interface IStudentPaymentDto {
    studentId: string | undefined;
    paymentAmount: number;
    dateOfPayment: moment.Moment | undefined;
    paidForMonth: moment.Moment | undefined;
    id: string;
}

export class StudentPaymentPagedResultDto implements IStudentPaymentPagedResultDto {
    totalCount: number;    
    items: StudentPaymentDto[] | undefined;

    constructor(data?: IStudentPaymentPagedResultDto) {
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
                    this.items.push(StudentPaymentDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): StudentPaymentPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentPaymentPagedResultDto();
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

    clone(): StudentPaymentPagedResultDto {
        const json = this.toJSON();
        let result = new StudentPaymentPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IStudentPaymentPagedResultDto {
    totalCount: number;
    items: StudentPaymentDto[] | undefined;
}

//Student comment


export class CreateStudentCommentDto implements ICreateStudentCommentDto {
    studentId: string | undefined;
    protectorId: number;
    commentDate: string | undefined;
    comment: string | undefined;

    constructor(data?: ICreateStudentCommentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.studentId = data["studentId"];
            this.protectorId = data["protectorId"];
            this.commentDate = data["commentDate"];
            this.comment = data["comment"];
        }
    }

    static fromJS(data: any): CreateStudentCommentDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateStudentCommentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["studentId"] = this.studentId;
        data["protectorId"] = this.protectorId;
        data["commentDate"] = this.commentDate;
        data["comment"] = this.comment;
        return data; 
    }

    clone(): CreateStudentCommentDto {
        const json = this.toJSON();
        let result = new CreateStudentCommentDto();
        result.init(json);
        return result;
    }
}

export interface ICreateStudentCommentDto {
    studentId: string | undefined;
    protectorId: number;
    commentDate: string | undefined;
    comment: string | undefined;
}

export class StudentCommentDto implements IStudentCommentDto {
    studentId: string | undefined;
    protectorId: number;
    commentDate: moment.Moment | undefined;
    comment: string | undefined;
    id: string;

    constructor(data?: IStudentCommentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.studentId = data["studentId"];
            this.protectorId = data["protectorId"];
            this.commentDate = data["commentDate"] ? moment(data["commentDate"].toString()) : <any>undefined;      
            this.comment = data["comment"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): StudentCommentDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentCommentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["studentId"] = this.studentId;
        data["protectorId"] = this.protectorId;
        data["commentDate"] = this.commentDate ? this.commentDate : <any>undefined;
        data["comment"] = this.comment;
        data["id"] = this.id;
        return data; 
    }

    clone(): StudentCommentDto {
        const json = this.toJSON();
        let result = new StudentCommentDto();
        result.init(json);
        return result;
    }
}

export interface IStudentCommentDto {
    studentId: string | undefined;
    protectorId: number;
    commentDate: moment.Moment | undefined;
    comment: string | undefined;
    id: string;
}

export class StudentCommentPagedResultDto implements IStudentCommentPagedResultDto {
    totalCount: number;    
    items: StudentCommentDto[] | undefined;

    constructor(data?: IStudentCommentPagedResultDto) {
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
                    this.items.push(StudentCommentDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): StudentCommentPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new StudentCommentPagedResultDto();
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

    clone(): StudentCommentPagedResultDto {
        const json = this.toJSON();
        let result = new StudentCommentPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IStudentCommentPagedResultDto {
    totalCount: number;
    items: StudentCommentDto[] | undefined;
}