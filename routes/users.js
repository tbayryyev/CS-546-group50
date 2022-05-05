const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validation = require('../validation');

router.post('/signup', async (req, res) => {
    // Declares a variable named userInfo and sets it equal to the request body
    let userInfo = req.body;

    // Declares a variable named errors and sets it equal to an empty dictionary
    let errors = {};
    // Checks if extra fields were passed in the body
    if (Object.keys(userInfo).length != 11) {
        // Add error to errors
        errors["requestError"] = 'An extra field was passed.';
    }

    // Checks if userInfo is undefined
    if (!userInfo) {
        // Add error to errors
        errors["requestError"] = 'You must provide data to create a user.';
    }

    // Declares a variable named firstName and sets it equal to the userInfo.firstName
    let firstName = userInfo.firstName;
    // Declares a variable named lastName and sets it equal to the userInfo.lastName
    let lastName = userInfo.lastName;
    // Declares a variable named email and sets it equal to the userInfo.email
    let email = userInfo.email;
    // Declares a variable named username and sets it equal to the userInfo.username
    let username = userInfo.username;
    // Declares a variable named dateOfBirth and sets it equal to the userInfo.dateOfBirth
    let dateOfBirth = userInfo.dateOfBirth;
    // Declares a variable named address and sets it equal to the userInfo.address
    let address = userInfo.address;
    // Declares a variable named city and sets it equal to the userInfo.city
    let city = userInfo.city;
    // Declares a variable named state and sets it equal to the userInfo.state
    let state = userInfo.state;
    // Declares a variable named zip and sets it equal to the userInfo.zip
    let zip = userInfo.zip;
    // Declares a variable named phoneNumber and sets it equal to the userInfo.phoneNumber
    let phoneNumber = userInfo.phoneNumber;
    // Declares a variable named password and sets it equal to the userInfo.password
    let password = userInfo.password;

    // Checks if firstName is undefined
    if (!firstName) {
        // Add error to errors
        errors["firstNameError"] = 'You must provide a first name.';
    }

    // Checks if lastName is undefined
    if (!lastName) {
        // Add error to errors
        errors["lastNameError"] = 'You must provide a last name.';
    }
    // Checks if email is undefined
    if (!email) {
        // Add error to errors
        errors["emailError"] = 'You must provide a email.';
    }
    // Checks if username is undefined
    if (!username) {
        // Add error to errors
        errors["usernameError"] = 'You must provide a username.';
    }
    // Checks if dateOfBirth is undefined
    if (!dateOfBirth) {
        // Add error to errors
        errors["dateOfBirthError"] = 'You must provide a date of birth.';
    }
    // Checks if address is undefined
    if (!address) {
        // Add error to errors
        errors["addressError"] = 'You must provide an address.';
    }
    // Checks if city is undefined
    if (!city) {
        // Add error to errors
        errors["cityError"] = 'You must provide a city.';
    }
    // Checks if state is undefined
    if (!state) {
        // Add error to errors
        errors["stateError"] = 'You must provide a state.';
    }
    // Checks if zip is undefined
    if (!zip) {
        // Add error to errors
        errors["zipError"] = 'You must provide a zip code.';
    }
    // Checks if phoneNumber is undefined
    if (!phoneNumber) {
        // Add error to errors
        errors["phoneNumberError"] = 'You must provide a phone number.';
    }
    // Checks if password is undefined
    if (!password) {
        // Add error to errors
        errors["passwordError"] = 'You must provide a password.';
    }

    // Checks if errors dictionary is empty
    if (Object.keys(errors).length !== 0) {
        // Declares a variable named errorResponse and sets to the a response object
        let errorResponse = {
            errors: errors
        }
        // Returns errors as json object
        return res.json(JSON.stringify(errorResponse));
    }

    // Trims fields
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    username = username.trim();
    city = city.trim();
    state = state.trim();
    zip = zip.trim();
    phoneNumber = phoneNumber.trim();

    // Error checking
    // Checks if firstName is valid
    try {
        validation.validateName(firstName);
    } catch (e) {
        // Add error to errors
        errors["firstNameError"] = `${e}`;
    }
    // Checks if lastName is valid
    try {
        validation.validateName(lastName);
    } catch (e) {
        // Add error to errors
        errors["lastNameError"] = `${e}`;
    }
    // Checks if email is valid
    try {
        validation.validateEmail(email);
    } catch (e) {
        // Add error to errors
        errors["emailError"] = `${e}`;
    }
    // Checks if username is valid
    try {
        validation.validateUsername(username);
    } catch (e) {
        // Add error to errors
        errors["usernameError"] = `${e}`;
    }
    // Checks if dateOfBirth is valid
    try {
        validation.validateDateOfBirth(dateOfBirth);
    } catch (e) {
        // Add error to errors
        errors["dateOfBirthError"] = `${e}`;
    }
    // Checks if address is valid
    try {
        validation.validateString(address);
    } catch (e) {
        // Add error to errors
        errors["addressError"] = `${e}`;
    }
    // Checks if state is valid
    try {
        validation.validateState(state);
    } catch (e) {
        // Add error to errors
        errors["stateError"] = `${e}`;
    }
    // Checks if zip is valid
    try {
        validation.validateZip(zip);
    } catch (e) {
        // Add error to errors
        errors["zipError"] = `${e}`;
    }
    // Checks if phoneNumber is valid
    try {
        validation.validatePhoneNumber(phoneNumber);
    } catch (e) {
        // Add error to errors
        errors["phoneNumberError"] = `${e}`;
    }
    // Checks if password is valid
    try {
        validation.validatePassword(password);
    } catch (e) {
        // Add error to errors
        errors["passwordError"] = `${e}`;
    }

    // Checks if errors dictionary is empty
    if (Object.keys(errors).length !== 0) {
        // Declares a variable named errorResponse and sets to the a response object
        let errorResponse = {
            errors: errors
        }
        // Returns errors as json object
        return res.json(JSON.stringify(errorResponse));
    }

    try {
        // Creates a new user in the database
        const response = await userData.createUser(
            firstName,
            lastName,
            email,
            username,
            dateOfBirth,
            address,
            city,
            state,
            zip,
            phoneNumber,
            password
        );

        // Checks if new user was created
        if (response.newUserCreated === true) {
            // Return json {"newUserCreated": true} telling the front-end that the user was created
            return res.json(response.newUserCreated);
        }
    } catch (e) {
        // Checks if e is a string meaning a throw message threw in the createUser()
        if (typeof e === 'string') {
            // Declares a variable named error
            let error;

            // Checks if e is username already taken and email already in use error
            if (e === 'Username is already taken and Email already in use.') {
                // Sets error to an object containing the error
                error = {
                    usernameError: 'Username is already taken.',
                    emailError: 'Email already in use.'
                }
            } else if (e === 'Username is already taken.') { // Checks if e is username already taken error
                // Sets error to an object containing the error
                error = {
                    usernameError: e
                }
            } else if (e === 'Email already in use.') {  // Checks if e is email already in use error
                // Sets error to an object containing the error
                error = {
                    emailError: e
                }
            } else {
                // Sets error to an object containing the error
                error = {
                    requestError: e
                }
            }
            // Declares a variable named errorResponse and sets to the a response object
            let errorResponse = {
                errors: error
            }
            // Returns errors as json object
            return res.json(JSON.stringify(errorResponse));
        } else {
            // Declares a variable named errorResponse and sets to the a response object
            let errorResponse = {
                errors: {
                    requestError: 'Internal Server Error.'
                }
            }
            // Returns errors as json object
            return res.json(JSON.stringify(errorResponse));
        }
    }
});

router.post('/login', async (req, res) => {
    // Declares a variable named userInfo and sets it equal to the request body
    let userInfo = req.body;

    // Declares a variable named errors and sets it equal to an empty dictionary
    let errors = {};

     // Checks if extra fields were passed in the body
     if (Object.keys(userInfo).length != 2) {
        // Add error to errors
        errors["requestError"] = 'An extra field was passed.';
    }

    // Checks if userInfo is undefined
    if (!userInfo) {
        // Add error to errors
        errors["requestError"] = 'You must provide data to login.';
    }

    // Declares a variable named username and sets it equal to the userInfo.username
    let username = userInfo.username;
    // Declares a variable named password and sets it equal to the userInfo.password
    let password = userInfo.password;

    // Checks if username is undefined
    if (!username) {
        // Add error to errors
        errors["usernameError"] = 'You must provide a username.';
    }

    // Checks if password is undefined
    if (!password) {
        // Add error to errors
        errors["passwordError"] = 'You must provide a password.';
    }

    // Checks if errors dictionary is empty
    if (Object.keys(errors).length !== 0) {
        // Declares a variable named errorResponse and sets to the a response object
        let errorResponse = {
            errors: errors
        }
        // Returns errors as json object
        return res.json(JSON.stringify(errorResponse));
    }

    // Trim username
    username = username.trim();

    // Error checking
    // Checks if username is valid
    try {
        validation.validateUsername(username);
    } catch (e) {
        // Add error to errors
        errors["usernameError"] = `${e}`;
    }

    // Checks if password is valid
    try {
        validation.validatePassword(password);
    } catch (e) {
        // Add error to errors
        errors["passwordError"] = `${e}`;
    }

    // Checks if errors
    if (Object.keys(errors).length !== 0) {
        // Declares a variable named errorResponse and sets to the a response object
        let errorResponse = {
            errors: errors
        }
        // Returns errors as json object
        return res.json(JSON.stringify(errorResponse));
    }

    try {
        // Checks user's credentials
        const response = await userData.authenticateUser(
            username,
            password
        );

        // Checks if the user was authenticated
        if (response.authenticated === true) {
            // Declares a variable called user and sets it to response.user
            let user = response.user
            // Saves the username
            req.session.username = user.username;

            // Declares a variable called returnJSON and sets it equal to the object that will be returned
            let returnJSON = {
                username: user.username,
                authenticated: true
            }
            // Return json {"username": username"authenticated": true} telling the front-end that the user was authenticated
            return res.json(JSON.stringify(returnJSON));
        } else {
            // Declares a variable named error and sets it to an object describing the error
            let error = {
                requestError: 'Invalid username and/or password.'
            }
            // Declares a variable named errorResponse and sets to the a response object
            let errorResponse = {
                errors: error
            }
            // Returns errors as json object
            return res.json(JSON.stringify(errorResponse));
        }
    } catch (e) {
        // Checks if e is a string meaning a throw message threw in the authenticateUser()
        if (typeof e === 'string') {
            // Declares a variable named error
            let error = {
                requestError: 'Invalid username and/or password.'
            }
            // Declares a variable named errorResponse and sets to the a response object
            let errorResponse = {
                errors: error
            }
            // Returns errors as json object
            return res.json(JSON.stringify(errorResponse));
        } else {
            // Declares a variable named errorResponse and sets to the a response object
            let errorResponse = {
                errors: {
                    requestError: 'Internal Server Error.'
                }
            }
            // Returns errors as json object
            return res.json(JSON.stringify(errorResponse));
        }
    }
});

router.get('/logout', async (req, res) => {
    // Checks if user is authenticated
    if (req.session.username) {
        // Deletes the AuthCookie
        req.session.destroy();
        // Declares a variable called returnJSON and sets it equal to the object that will be returned
        let returnJSON = {
            success: true
        }
        // Return json {"success": true} telling the front-end that the user successfully logged out
        return res.json(JSON.stringify(returnJSON));
    } else {
        // Redirect to home page
        return res.redirect('/');
    }
});

router.get('/edit', async (req, res) => {
    // Checks if user is authenticated
    if (req.session.username) {
        try {
            // Get user from database
            const user = await userData.getUserByUsername(req.session.username);
            // Returns the edit_account handlebar with the users information
            return res.render('pages/edit_account', {authenticated: true, username: user.username, user: user });
        } catch (e) {
            // Handle error

        }
    } else {
        // Redirect to home page
        return res.redirect('/');
    }
});

module.exports = router;