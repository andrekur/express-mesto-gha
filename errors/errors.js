class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400
  }
}

module.exports.UnauthorizedError = UnauthorizedError;
module.exports.BadRequestError = BadRequestError;