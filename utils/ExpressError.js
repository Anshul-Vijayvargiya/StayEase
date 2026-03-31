class ExpressError extends Error {
    constructor(statusCode,message){
        super();
        this.stausCode = this.stausCode;
        this.message = message;
    }
}

module.exports = ExpressError;