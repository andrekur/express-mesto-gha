const { ObjNotFoundError } = require('../errors/APIError')

module.exports.getObjOrError = (model, _id) => {
  return new Promise(function(resolve, reject) {
    model.findById(_id)
      .then(obj => {
        if (!obj) {
          reject(new ObjNotFoundError(`Object with _id ${_id} not found`))
        }


      resolve(obj);
    })
    .catch(reject)
  })
};
