class HttpError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string, stack: string="") {
    super(message);
    this.statusCode = statusCode;

    // Assigning the stack track
    if(stack){
        this.stack = stack;
    }else{
        Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default HttpError;