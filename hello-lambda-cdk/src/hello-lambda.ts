import {Context} from "aws-lambda";

export function handler(event: any, context: Context, callback: any): void {
    console.log(event);
    callback(null, {
        message: 'hello from TypeScript'
    });
}

