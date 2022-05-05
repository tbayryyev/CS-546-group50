let { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;


module.exports = {
async getUser(id){
    if(arguments.length < 1){
      throw "All fields need to have valid values";
  }
  if(arguments.length > 1){
      throw "Too many Aruguments, should pass one argument";
  }
      var result = {};
    if (!id) throw 'Must Provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'Invalid object ID';
    const userCollection = await users();
    const userOne = await userCollection.findOne({ _id: ObjectId(id) });
    if (userOne === null || userOne === undefined) throw 'No user with that id';
    userOne._id = userOne._id.toString();
    return userOne;
  }
}