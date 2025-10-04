export class AppError extends Error{
    constructor(message:string,public statusCode:number,public errorDetails?:Record<string,any>[]){
        super(message);
    }
}

export class ConflictException extends AppError{
    constructor(message:string,public errorDetails?:Record<string,string>[]){
        super(message,409,errorDetails);
    }
}
export class NotFoundException extends AppError{
    constructor(message:string,public errorDetails?:Record<string,string>[]){
        super(message,404,errorDetails);
    }
}
export class UnauthorizedException extends AppError{
    constructor(message:string,public errorDetails?:Record<string,string>[]){
        super(message,401,errorDetails);
    }
}
export class BadRequestException extends AppError{
    constructor(message:string,public errorDetails?:Record<string,string>[]){
        super(message,400,errorDetails);
    }
}
export class forbeddibnException extends AppError{
    constructor(message:string,public errorDetails?:Record<string,string>[]){
        super(message,403,errorDetails);
    }
}