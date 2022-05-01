const {ObjectId} = require('mongodb');

module.exports = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, varName) {
    // we will make sure all tags are strings and atleast one string
    let arrayInvalidFlag = false;
    let emptyArray = true;
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (i in arr) {
      emptyArray = false;
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        arrayInvalidFlag = true;
        break;
      }
      arr[i] = arr[i].trim();
    }
    if (arrayInvalidFlag)
      throw `One or more elements in ${varName} array is not a string or is an empty string`;
    if (emptyArray) throw 'Empty array';
    return arr;
  },
  checkStringArraywithLength(arr,varName,length){
    let arrayInvalidFlag = 0;
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
      for (i in arr) {
        if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
          throw `One or more elements in ${varName} array is not a string or is an empty string`;
          break;
        }
        arrayInvalidFlag++;
        arr[i] = arr[i].trim();
      }
    if(arrayInvalidFlag<length){
      throw 'Not enough elements in ${varName}'
    }
    return arr;
  },
  errorCheckingFunc(name,value,type){
    if (typeof value == 'undefined') throw `${name} is undefined`
    if (typeof value != type) throw `${name} is not a ${type}`
    return value;
  }

};
