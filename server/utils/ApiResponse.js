class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;


    if (data !== undefined) {
      this.data = data;
    }
  }
}

export { ApiResponse };
