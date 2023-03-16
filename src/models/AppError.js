export class AppError {
    errorMessage;
    callback;

    constructor(_errorMessage = "Something went wrong", _callback= () => {}) {
        this.errorMessage = _errorMessage;
        this.callback = _callback;
    }
}