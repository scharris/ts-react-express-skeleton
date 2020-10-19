export class HttpException extends Error
{
   constructor(public statusCode: number, message: string, public error?: string)
   {
      super(message);
   }
}
