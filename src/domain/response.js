export default class Response {
  constructor(statusCode, status, message, version) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.version = version;
  }
}
