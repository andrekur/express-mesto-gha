class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401
  }
}

class ConflictReqiestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409
  }
}

class ForbiddenRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403
  }
}

module.exports.UnauthorizedError = UnauthorizedError;
module.exports.ConflictReqiestError = ConflictReqiestError;
module.exports.ForbiddenRequestError = ForbiddenRequestError;
