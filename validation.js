const {ObjectId} = require('mongodb');
const moment = require('moment');

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
  },

  validateString(string) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Check if string is a string
    if (typeof string !== 'string') throw `${string} is not a string.`;
    // Checks if name, website, or recordLabel only contains spaces
    if (string.trim().length === 0) throw 'A string with just spaces is not valid.';
},

validateName(name) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if name is a valid string
    this.validateString(name);
    // Checks if name contains only letters
    if (/[^a-z]/i.test(name)) throw 'Name must contain only letters.';
    // Checks if name is at least 2 characters
    if (name.length < 2) throw 'Name must be at least 2 characters.';
},

validateEmail(email) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if email is a valid string
    this.validateString(email);
    // Checks if email contains a '.'
    if (!email.includes('.')) throw `Invalid email.`;
    // Checks if email contains a '@'
    if (!email.includes('@')) throw `Invalid email.`;
    // Checks if email only contains valid characters
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) throw 'Invalid email.';
},

validateUsername(username) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if username is a valid string
    this.validateString(username);
    // Checks if username only contains alphanumeric characters
    if (!/^[A-Za-z0-9]*$/.test(username)) throw 'Username must contain only letters and numbers.';
    // Checks if username is at least 2 characters
    if (username.length < 2) throw 'Username must be at least 2 characters.';
    // Checks if username is less than 30 characters
    if (username.length > 30) throw 'Username must be no more than 30 characters.';
},

validateDateOfBirth(dateOfBirth) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if dateOfBirth is a valid string
    this.validateString(dateOfBirth);
    // Checks if dateOfBirth is in format mm/dd/yyyy
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateOfBirth)) throw 'Invalid dateOfBirth.';
    // Check if dateOfBirth is valid
    this.validateDate(dateOfBirth);
    // Checks dateOfBirth is at least 13 years old
    // Declares a variable named today and sets it equal to todays dates
    let today = new Date();
    // Declares a variable named birthday and sets it equal to dateOfBirth as a Date type
    let birthday = new Date(dateOfBirth);
    // Declares a variable named age and sets it equal to today's year - birthday's year
    let age = today.getFullYear() - birthday.getFullYear();
    // Declares a variable named month and sets it equal to today's month - birthday's month
    let month = today.getMonth() - birthday.getMonth();
    if (month < 0 || (month === 0  &&  today.getDate() < birthday.getDate())) {
        //  Subtracts age by 1
        age--;
    }
    // Checks if age is less than or equal to 13
    if (age < 13) throw 'You must be 13 years or older to create an account.'
},

validateDate(date) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if date is a valid date
    if (!moment(date, 'MM/DD/YYYY', true).isValid()) throw 'Invalid date.';
},

validateCity(city) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if city contains only letters
    if (/[^a-z ]/i.test(city)) throw 'Invalid city';
    // Checks if city is at least 2 characters
    if (city.length < 2) throw 'Invalid city.';
},

validateState(state) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
    // Converts state to uppercase
    state = state.toUpperCase();
    // Checks that state is in states array
    if (!states.includes(state)) throw 'Invalid state.';
},

validateZip(zip) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if zip is 5 digits
    if (zip.length !== 5) throw 'Invalid zip.';
    // Checks if zip only contains numbers
    if (!/^\d+$/.test(zip)) throw 'Invalid zip.';
},

validatePhoneNumber(phoneNumber){
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if phoneNumber is 10 digits
    if (phoneNumber.length !== 10) throw 'Invalid phoneNumber.';
    // Checks if phoneNumber only contains numbers
    if (!/^\d+$/.test(phoneNumber)) throw 'Invalid phoneNumber.';
},

validatePassword(password) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if password is a valid string
    this.validateString(password);
    // Checks if password contains spaces
    if (/\s/g.test(password)) throw 'Password must not contain spaces.';
    // Checks if password is at least 8 characters
    if (password.length < 8) throw 'Password must be at least 8 characters.';
}

};
