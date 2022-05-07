// Sign Up Data
let signUpBtn = $('#sign_up_btn');
let signUpForm = $('#sign_up_form');
let signUpModal = $('#sign-up-modal');
let firstNameInput = $('#first_name');
let lastNameInput = $('#last_name');
let emailInput = $('#email');
let signUpUsernameInput = $('#sign_up_username');
let signUpPasswordInput = $('#sign_up_password');
let confirmPasswordInput = $('#confirm_password');
let phoneNumberInput = $('#phone_number');
let dateOfBirthInput = $('#date_of_birth');
let addressInput = $('#address');
let cityInput = $('#city');
let stateInput = $('#state');
let zipInput = $('#zip');
let signUpFormBtn = $('#sign_up_form_btn');
let accountCreationToast = $('#account_creation_toast');
let alreadyHaveAccountLink = $('#already-have-account-link');
let states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

// Log in Data
let loginBtn = $('#login_btn');
let loginForm = $('#log_in_form');
let loginModal = $('#login-modal');
let loginUsernameInput = $('#log_in_username');
let loginPasswordInput = $('#log_in_password');
let loginFormBtn = $('#log_in_form_btn');
let noAccountLink = $('#no-account-link');

// Request Error
let signUpRequestErrorDiv = $('#sign_up_request_error');
let loginRequestErrorDiv = $('#login_request_error');

// Loading Spinner
let loadingSpinner = $('#loading_spinner');

//Search Data
let searchFrom = $('#search_form');
let searchTermInput = $('#search_term');
let searchBtn = $('#search_btn');

// Error Toast
let errorToast = $('#error_toast');

// Auth Btns
let authBtns = $('#auth_btns');
let userDropdown = $('#user_dropdown_div');
let usernameBtn = $('#username_btn');

// Logout Link
let logoutLink = $('#logout_link');

// Declares a variable named didFocus and sets it equal to false
let didFocus = false;

$(document).ready(function() {
    // Add states for sign up form
    addStatesToForm();
});

// Sign up button click event
signUpBtn.click(function() {
    // Resets sign up form
    resetSignUpForm()
});

// Login button click event
loginBtn.click(function() {
    // Resets login form
    resetLogInForm()
});

signUpModal.on('shown.bs.modal', function() {
    // Focuses first name input
    firstNameInput.focus();
});

loginModal.on('shown.bs.modal', function(){
    // Focuses login_username input
    loginUsernameInput.focus();
});

// alreadyHaveAccountLink click event
alreadyHaveAccountLink.click(function() {
    // Resets sign up form
    resetSignUpForm()
});

// noAccountLink click event
noAccountLink.click(function() {
    // Resets login form
    resetLogInForm()
});

function resetSignUpForm() {
    // Resets signUpForm
    signUpForm.trigger('reset');
    // Resets all signup errors
    resetSignUpErrors();
}

function resetLogInForm() {
    // Resets loginForm
    loginForm.trigger('reset');
    // Resets all login errors
    resetLogInErrors();
}

function resetSignUpErrors() {
    // Resets first_name errors
    resetFieldError("first_name");
    // Resets last_name errors
    resetFieldError("last_name");
    // Resets email errors
    resetFieldError("email");
    // Resets sign_up_username errors
    resetFieldError("sign_up_username");
    // Resets sign_up_password errors
    resetFieldError("sign_up_password");
    // Resets confirm_password errors
    resetFieldError("confirm_password");
    // Resets phone_number errors
    resetFieldError("phone_number");
    // Resets date_of_birth errors
    resetFieldError("date_of_birth");
    // Resets address errors
    resetFieldError("address");
    // Resets city errors
    resetFieldError("city");
    // Resets state errors
    resetFieldError("state");
    // Resets zip errors
    resetFieldError("zip");
    // Hides request error
    signUpRequestErrorDiv.hide();
}

function resetLogInErrors() {
    // Resets log_in_username errors
    resetFieldError("log_in_username");
    // Resets log_in_password errors
    resetFieldError("log_in_password");
    // Hides request error
    loginRequestErrorDiv.hide();
}

function addFieldError(fieldId, fieldError) {
    // Adds error to html
    $(`#${fieldId}_error`).html(fieldError);
    // Changes input border color to red
    $(`#${fieldId}`).css("border-color","#DC3545");
    // Shows error
    $(`#${fieldId}_error`).show();
    // Checks if a field was focused
    if (!didFocus) {
        // Focus input field
        $(`#${fieldId}`).focus();
        // Sets didFocus to true
        didFocus = true;
    }
}

function resetFieldError(fieldId) {
    // Changes input border color to black
    $(`#${fieldId}`).css("border-color","black");
    // Hides last name error
    $(`#${fieldId}_error`).hide();
}

function addStatesToForm() {
    // Loops through states array
    states.forEach(state => {
        // Add option to select
        stateInput.append(`<option>${state}</option>`);
    });
}


searchTermInput.on('input', function()  {
    // Declares a variable named searchTerm and sets it equal to the searchTermInput value
    let searchTerm = searchTermInput.val();
    // Checks if input is not an empty string or a string with just spaces
    if (searchTerm.length !== 0 && searchTerm.trim() != '') {
        // Enable search button
        searchBtn.attr("disabled", false);
        // searchBtn.removeClass('disabled');
    } else {
        // Disables search button
        searchBtn.attr("disabled", true);
    }
});

searchFrom.submit((event) => {
    // Stops the form from being submitted
    event.preventDefault();
    // Declares a variable named searchTerm and sets it equal to the searchTermInput value
    let searchTerm = searchTermInput.val();
    // Trims searchTerm
    searchTerm = searchTerm.trim();
    // Replaces spaces with _
    searchTerm =  searchTerm.replace(' ', "_");
    // Check if searchTerm is not undefined
    if (searchTerm) {
        // Declares a variable called requestConfig and sets it to the request parameters
        var requestConfig = {
            method: 'GET',
            url: `/doctor/speciality/${searchTerm}`
        }

        // Checks if page exist
        $.ajax(requestConfig).then(function (apiResponse) {
            // Redirects to speciality that user searched
            window.location.href = `/doctor/speciality/${searchTerm}`;
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $('#error_toast_body').html(`Speciality not found. Please check available specialities on home page.`)
            // Shows error toast
            var toast = new bootstrap.Toast(errorToast);
            toast.show();
        });
    }
});

signUpForm.submit((event) => {
    // Sets didFocus to false
    didFocus = false;
    // Stops the form from being submitted
    event.preventDefault();
    // Declares a variable named firstName and sets it equal to the value of first_name input
    let firstName = firstNameInput.val();
    // Declares a variable named lastName and sets it equal to the value of last_name input
    let lastName = lastNameInput.val();
    // Declares a variable named email and sets it equal to the value of email input
    let email = emailInput.val();
    // Declares a variable named username and sets it equal to the value of sign_up_username input
    let username = signUpUsernameInput.val();
    // Declares a variable named password and sets it equal to the value of sign_up_password input
    let password = signUpPasswordInput.val();
    // Declares a variable named confirmPassword and sets it equal to the value of confirm_password input
    let confirmPassword = confirmPasswordInput.val();
    // Declares a variable named phoneNumber and sets it equal to the value of phone_number input
    let phoneNumber = phoneNumberInput.val();
    // Declares a variable named dateOfBirth and sets it equal to the value of date_of_birth input
    let dateOfBirth = dateOfBirthInput.val();
    // Declares a variable named address and sets it equal to the value of address input
    let address = addressInput.val();
    // Declares a variable named city and sets it equal to the value of city input
    let city = cityInput.val();
    // Declares a variable named state and sets it equal to the value of state input
    let state = stateInput.val();
    // Declares a variable named zip and sets it equal to the value of zip input
    let zip = zipInput.val();

    // Converts date to mm/dd/yyyy format
    let dateComponents = dateOfBirth.split("-");
    let year = dateComponents[0];
    let month= dateComponents[1];
    let day = dateComponents[2]
    dateOfBirth = `${month}/${day}/${year}`;

    // Removes phone number format
    phoneNumber = phoneNumber.replace(/[() -]/g,'');

    // Declares a variable named firstNameError
    let firstNameError;
    // Declares a variable named lastNameError
    let lastNameError;
    // Declares a variable named emailError
    let emailError;
    // Declares a variable named usernameError
    let usernameError;
    // Declares a variable named passwordError
    let passwordError;
    // Declares a variable named confirmPasswordError
    let confirmPasswordError;
    // Declares a variable named phoneNumberError
    let phoneNumberError;
    // Declares a variable named dateOfBirthError
    let dateOfBirthError;
    // Declares a variable named addressError
    let addressError;
    // Declares a variable named cityError
    let cityError;
    // Declares a variable named stateError
    let stateError;
    // Declares a variable named zipError
    let zipError;

    // Checks firstName
    if (firstName.length === 0) {
        // Sets firstNameError
        firstNameError = 'A first name must be provided.'
    } else if (firstName.trim().length === 0) {
        // Sets firstNameError
        firstNameError = 'A first name must be provided.'
    } else {
        try {
            // Trims firstName
            firstName = firstName.trim();
            // Validates firstName
            validateName(firstName);
        } catch (e) {
            // Sets firstNameError
            firstNameError = e;
        }
    }

     // Checks lastName
    if (lastName.length === 0) {
        // Sets lastNameError
        lastNameError = 'A last name must be provided.'
    } else if (lastName.trim().length === 0) {
        // Sets lastNameError
        lastNameError = 'A last name must be provided.'
    } else {
        try {
            // Trims lastName
            lastName = lastName.trim();
            // Validates lastName
            validateName(lastName);
        } catch (e) {
            // Sets lastNameError
            lastNameError = e;
        }
    }

    // Checks email
    if (email.length === 0) {
        // Sets emailError
        emailError = 'An email must be provided.'
    } else if (email.trim().length === 0) {
        // Sets emailError
        emailError = 'An email must be provided.'
    } else {
        try {
            // Trims email
            email = email.trim();
            // Validates email
            validateEmail(email);
        } catch (e) {
            // Sets emailError
            emailError = e;
        }
    }

    // Checks username
    if (username.length === 0) {
        // Sets usernameError
        usernameError = 'A username must be provided.'
    } else if (username.trim().length === 0) {
        // Sets usernameError
        usernameError = 'A username must be provided.'
    } else {
        try {
            // Trims username
            username = username.trim();
            // Validates username
            validateUsername(username);
        } catch (e) {
            // Sets usernameError
            usernameError = e;
        }
    }

    // Checks password
    if (password.length === 0) {
        // Sets passwordError
        passwordError = 'A password must be provided.'
    } else if (password.trim().length === 0) {
        // Sets passwordError
        passwordError = 'A password must be provided.'
    } else {
        try {
            // Validates password
            validatePassword(password);
        } catch (e) {
            // Sets passwordError
            passwordError = e;
        }
    }

    // Checks confirmPassword
    if (confirmPassword.length === 0) {
        // Sets confirmPasswordError
        confirmPasswordError = 'A confirm password must be provided.'
    } else if (confirmPassword.trim().length === 0) {
        // Sets confirmPasswordError
        confirmPasswordError = 'A confirm password must be provided.'
    } else {
        try {
            // Validates confirmPassword
            validateConfirmPassword(password, confirmPassword);
        } catch (e) {
            // Sets confirmPasswordError
            confirmPasswordError = e;
        }
    }

    // Checks phoneNumber
    if (phoneNumber.length === 0) {
        // Sets phoneNumberError
        phoneNumberError = 'A phone number must be provided.'
    } else if (phoneNumber.trim().length === 0) {
        // Sets phoneNumberError
        phoneNumberError = 'A phone number must be provided.'
    } else {
        try {
            // Validates phoneNumber
            validatePhoneNumber(phoneNumber);
        } catch (e) {
            // Sets phoneNumberError
            phoneNumberError = e;
        }
    }

    // Checks dateOfBirth
    if (dateOfBirth.length === 0) {
        // Sets dateOfBirthError
        dateOfBirthError = 'A date of birth must be provided.'
    } else if (dateOfBirth.trim().length === 0) {
        // Sets dateOfBirthError
        dateOfBirthError = 'A date of birth must be provided.'
    } else {
        try {
            // Validates dateOfBirth
            validateDateOfBirth(dateOfBirth);
        } catch (e) {
            // Sets dateOfBirthError
            dateOfBirthError = e;
        }
    }

    // Checks address
    if (address.length === 0) {
        // Sets addressError
        addressError = 'An address must be provided.'
    } else if (address.trim().length === 0) {
        // Sets addressError
        addressError = 'An address must be provided.'
    } else {
        try {
            // Trims address
            address = address.trim();
            // Validates address is a string
            validateString(address);
        } catch (e) {
            // Sets addressError
            addressError = e;
        }
    }

    // Checks city
    if (city.length === 0) {
        // Sets cityError
        cityError = 'A city must be provided.'
    } else if (city.trim().length === 0) {
        // Sets cityError
        cityError = 'A city must be provided.'
    } else {
        try {
            // Trims city
            city = city.trim();
            // Validates city
            validateCity(city);
        } catch (e) {
            // Sets cityError
            cityError = e;
        }
    }

    // Checks state
    if (!state) {
        // Sets stateError
        stateError = 'A state must be selected.'
    } else {
        try {
            // Validates state
            validateState(state);
        } catch (e) {
            // Sets stateError
            stateError = e;
        }
    }

    // Checks zip
    if (zip.length === 0) {
        // Sets zipError
        zipError = 'A zip code must be provided.'
    } else if (zip.trim().length === 0) {
        // Sets zipError
        zipError = 'A zip code must be provided.'
    } else {
        try {
            // Validates zip
            validateZip(zip);
        } catch (e) {
            // Sets zipError
            zipError = e;
        }
    }

    // Checks if firstNameError
    if (firstNameError) {
        // Adds first name error to form
        addFieldError("first_name", firstNameError);
    } else {
        // Resets first_name errors
        resetFieldError("first_name");
    }

    // Checks if lastNameError
    if (lastNameError) {
        // Adds last name error to form
        addFieldError("last_name", lastNameError);
    } else {
        // Resets last_name errors
        resetFieldError("last_name");
    }

    // Checks if emailError
    if (emailError) {
        // Adds email error to form
        addFieldError("email", emailError);
    } else {
        // Resets email errors
        resetFieldError("email");
    }

    // Checks if usernameError
    if (usernameError) {
        // Adds username error to form
        addFieldError("sign_up_username", usernameError);
    } else {
        // Resets sign_up_username errors
        resetFieldError("sign_up_username");
    }

    // Checks if passwordError
    if (passwordError) {
        // Adds password error to form
        addFieldError("sign_up_password", passwordError);
    } else {
        // Resets sign_up_password errors
        resetFieldError("sign_up_password");
    }

    // Checks if confirmPasswordError
    if (confirmPasswordError) {
        // Adds password error to form
        addFieldError("confirm_password", confirmPasswordError);
    } else {
        // Resets confirm_password errors
        resetFieldError("confirm_password");
    }

    // Checks if phoneNumberError
    if (phoneNumberError) {
        // Adds phone number error to form
        addFieldError("phone_number", phoneNumberError);
    } else {
        // Resets phone_number errors
        resetFieldError("phone_number");
    }

    // Checks if dateOfBirthError
    if (dateOfBirthError) {
        // Adds date of birth error to form
        addFieldError("date_of_birth", dateOfBirthError);
    } else {
        // Resets date_of_birth errors
        resetFieldError("date_of_birth");
    }

    // Checks if addressError
    if (addressError) {
        // Adds address error to form
        addFieldError("address", addressError);
    } else {
        // Resets address errors
        resetFieldError("address");
    }

    // Checks if cityError
    if (cityError) {
        // Adds city error to form
        addFieldError("city", cityError);
    } else {
        // Resets city errors
        resetFieldError("city");
    }

    // Checks if stateError
    if (stateError) {
        // Adds state error to form
        addFieldError("state", stateError);
    } else {
        // Resets state errors
        resetFieldError("state");
    }

    // Checks if zipError
    if (zipError) {
        // Adds zip error to form
        addFieldError("zip", zipError);
    } else {
        // Resets zip errors
        resetFieldError("zip");
    }

    // Checks if no field errors
    if (!firstNameError && !lastNameError && !emailError && !usernameError && !passwordError && !confirmPasswordError && !phoneNumberError && !dateOfBirthError && !addressError && !cityError && !stateError && !zipError) {
        // Declares a variable called newUser and sets it equal to an object with the user's information
        let newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            dateOfBirth: dateOfBirth,
            address: address,
            city: city,
            state: state,
            zip: zip,
            phoneNumber: phoneNumber,
            password: password
        }
    
        // Declares a variable called requestConfig and sets it to the request parameters
        var requestConfig = {
            method: 'POST',
            url: '/account/signup',
            data: newUser
        }

        // Show loading spinner
        loadingSpinner.show();

        // Disables sign up button on form
        signUpFormBtn.addClass('disabled');
        
        // Ajax call
        $.ajax(requestConfig).then(function (apiResponse) {
            // Enables sign up button on form
            signUpFormBtn.removeClass('disabled');
            // Hide loading spinner
            loadingSpinner.hide();
            // Parses JSON
            apiResponse = JSON.parse(apiResponse);
            // Checks if errors
            if (apiResponse.errors) {
                // Checks if requestError
                if (apiResponse.errors.requestError) {
                    // Adds error to html
                    signUpRequestErrorDiv.html(apiResponse.errors.requestError);
                    // Changes font color to red
                    signUpRequestErrorDiv.css("color", "#DC3545");
                    // Shows error
                    signUpRequestErrorDiv.show();
                }
                // Checks if firstName error
                if (apiResponse.errors.firstNameError) {
                    // Adds field error
                    addFieldError("first_name", apiResponse.errors.firstNameError);
                }
                // Checks if lastName error
                if (apiResponse.errors.lastNameError) {
                    // Adds field error
                    addFieldError("last_name", apiResponse.errors.lastNameError);
                }
                // Checks if email error
                if (apiResponse.errors.emailError) {
                    // Adds field error
                    addFieldError("email", apiResponse.errors.emailError);
                }
                // Checks if username error
                if (apiResponse.errors.usernameError) {
                    // Adds field error
                    addFieldError("sign_up_username", apiResponse.errors.usernameError);
                }
                // Checks if password error
                if (apiResponse.errors.passwordError) {
                    // Adds field error
                    addFieldError("sign_up_password", apiResponse.errors.passwordError);
                }
                // Checks if phoneNumber error
                if (apiResponse.errors.phoneNumberError) {
                    // Adds field error
                    addFieldError("phone_number", apiResponse.errors.phoneNumberError);
                }
                // Checks if dateOfBirth error
                if (apiResponse.errors.dateOfBirthError) {
                    // Adds field error
                    addFieldError("date_of_birth", apiResponse.errors.dateOfBirthError);
                }
                // Checks if address error
                if (apiResponse.errors.addressError) {
                    // Adds field error
                    addFieldError("address", apiResponse.errors.addressError);
                }
                // Checks if city error
                if (apiResponse.errors.cityError) {
                    // Adds field error
                    addFieldError("city", apiResponse.errors.cityError);
                }
                // Checks if state error
                if (apiResponse.errors.stateError) {
                    // Adds field error
                    addFieldError("state", apiResponse.errors.stateError);
                }
                // Checks if zip error
                if (apiResponse.errors.zipError) {
                    // Adds field error
                    addFieldError("zip", apiResponse.errors.zipError);
                }
            } else {
                // Close sign up modal
                signUpModal.modal('toggle');
                // Show toast                
                var toast = new bootstrap.Toast(accountCreationToast);
                toast.show();
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // Enables sign up button on form
            signUpFormBtn.removeClass('disabled');
            // Hide loading spinner
            loadingSpinner.hide();
            // Close sign up modal
            signUpModal.modal('toggle');
            // Shows error toast
            var toast = new bootstrap.Toast(errorToast);
            toast.show();
        });
    }
});

loginForm.submit((event) => {
    // Sets didFocus to false
    didFocus = false;
    // Stops the form from being submitted
    event.preventDefault();
    // Declares a variable named username and sets it equal to the value of log_in_username input
    let username = loginUsernameInput.val();
    // Declares a variable named password and sets it equal to the value of log_in_password input
    let password = loginPasswordInput.val();

    // Declares a variable named usernameError
    let usernameError;
    // Declares a variable named passwordError
    let passwordError;

    // Checks username
    if (username.length === 0) {
        // Sets usernameError
        usernameError = 'A username must be provided.'
    } else if (username.trim().length === 0) {
        // Sets usernameError
        usernameError = 'A username must be provided.'
    } else {
        try {
            // Trims username
            username = username.trim();
            // Validates username
            validateUsername(username);
        } catch (e) {
            // Sets usernameError
            usernameError = e;
        }
    }

    // Checks password
    if (password.length === 0) {
        // Sets passwordError
        passwordError = 'A password must be provided.'
    } else if (password.trim().length === 0) {
        // Sets passwordError
        passwordError = 'A password must be provided.'
    } else {
        try {
            // Validates password
            validatePassword(password);
        } catch (e) {
            // Sets passwordError
            passwordError = e;
        }
    }

    // Checks if usernameError
    if (usernameError) {
        // Adds username error to form
        addFieldError("log_in_username", usernameError);
    } else {
        // Resets log_in_username errors
        resetFieldError("log_in_username");
    }

    // Checks if passwordError
    if (passwordError) {
        // Adds password error to form
        addFieldError("log_in_password", passwordError);
    } else {
        // Resets sign_up_password errors
        resetFieldError("log_in_password");
    }

    // Checks if no field errors
    if (!usernameError && !passwordError) {
        let userCredentials = {
            username: username,
            password: password
        }

        // Declares a variable called requestConfig and sets it to the request parameters
        var requestConfig = {
            method: 'POST',
            url:'/account/login',
            data: userCredentials
        }

        // Show loading spinner
        loadingSpinner.show();

        // Disables login button on form
        loginFormBtn.addClass('disabled');

        // Ajax call
        $.ajax(requestConfig).then(function (apiResponse) {
            // Enables login button on form
            loginFormBtn.removeClass('disabled');
            // Hide loading spinner
            loadingSpinner.hide();
            // Parses JSON
            apiResponse = JSON.parse(apiResponse);
            // Check if errors
            if (apiResponse.errors) {
                // Checks if requestError
                if (apiResponse.errors.requestError) {
                    // Adds error to username
                    addFieldError("log_in_username", '');
                    // Adds error to password
                    addFieldError("log_in_password", '');
                    // Adds error to html
                    loginRequestErrorDiv.html(apiResponse.errors.requestError);
                    // Changes font color to red
                    loginRequestErrorDiv.css("color", "#DC3545");
                    // Shows error
                    loginRequestErrorDiv.show();
                }
            } else {
                // Checks if user was authenticated
                if (apiResponse.authenticated === true) {
                    // Close login modal
                    loginModal.modal('toggle');
                    // Hides login and sign up buttons
                    authBtns.attr('hidden', true);
                    // Shows user dropdown
                    userDropdown.attr('hidden', false);
                    // Adds username to usernameBtn
                    usernameBtn.html(apiResponse.username);
                    // Adds url to patient item in dropdown
                    $('#patient_page_link').attr("href", `/appointments/userappointmentlist/${apiResponse.userId}`);
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // Enables login button on form
            loginFormBtn.removeClass('disabled');
            // Hide loading spinner
            loadingSpinner.hide();
            // Close login modal
            loginModal.modal('toggle');
            // Shows error toast
            var toast = new bootstrap.Toast(errorToast);
            toast.show();
        });
    }
});

logoutLink.click(function(e) {
    // Stops default action
    e.preventDefault();

    // Declares a variable called requestConfig and sets it to the request parameters
    var requestConfig = {
        method: 'GET',
        url: '/account/logout'
    }
    
    // Ajax call
    $.ajax(requestConfig).then(function (apiResponse) {
        // Parses JSON
        apiResponse = JSON.parse(apiResponse);
        // Check if logout was successful
        if (apiResponse.success) {
            // Hide user dropdown
            userDropdown.attr('hidden', true);
            // Show auth buttons
            authBtns.attr('hidden', false);
            // Checks if user is on edit account page
            let pathname = window.location.pathname;
            // Splits the path based on /
            let pathArr = pathname.split('/');
            // Reconfigures the path
            let basePath = `/${pathArr[1]}/${pathArr[2]}/`;
            // Checks if user is on edit account page or patient page
            if (pathname == '/account/edit' || basePath == '/appointments/userappointmentlist/') {
                // Redirects to home page
                window.location.replace("/");
            }
        } else {
            // Show error toast
            var toast = new bootstrap.Toast(errorToast);
            toast.show();
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // Shows error toast
        var toast = new bootstrap.Toast(errorToast);
        toast.show();
    });
});

function validateString(string) {
    // Checks that two argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Check if string is a string
    if (typeof string !== 'string') throw `${string} is not a string.`;
    // Checks if name, website, or recordLabel only contains spaces
    if (string.trim().length === 0) throw 'A string with just spaces is not valid.';
}

function validateName(name) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if name is a valid string
    validateString(name);
    // Checks if name contains only letters
    if (/[^a-z]/i.test(name)) throw 'Name must contain only letters.';
    // Checks if name is at least 2 characters
    if (name.length < 2) throw 'Name must be at least 2 characters.';
}

function validateEmail(email) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if email is a valid string
    validateString(email);
    // Checks if email contains a '.'
    if (!email.includes('.')) throw `Invalid email.`;
    // Checks if email contains a '@'
    if (!email.includes('@')) throw `Invalid email.`;
    // Checks if email only contains valid characters
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) throw 'Invalid email.';
}

function validateUsername(username) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if username is a valid string
    validateString(username);
    // Checks if username only contains alphanumeric characters
    if (!/^[A-Za-z0-9]*$/.test(username)) throw 'Username must contain only letters and numbers.';
    // Checks if username is at least 2 characters
    if (username.length < 2) throw 'Username must be at least 2 characters.';
    // Checks if username is less than 30 characters
    if (username.length > 30) throw 'Username must be no more than 30 characters.';
}

function validateDateOfBirth(dateOfBirth) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if dateOfBirth is a valid string
    this.validateString(dateOfBirth);
    // Checks if dateOfBirth is in format mm/dd/yyyy
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateOfBirth)) throw 'Invalid date of birth.';
    // Check if dateOfBirth is valid
    validateDate(dateOfBirth);
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
}

function validateDate(date) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if date is a valid date
    if (!moment(date, 'MM/DD/YYYY', true).isValid()) throw 'Invalid date.';
}

function validateCity(city) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if city contains only letters
    if (/[^a-z ]/i.test(city)) throw 'Invalid city.';
    // Checks if city is at least 2 characters
    if (city.length < 2) throw 'Invalid city.';
}

function validateState(state) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Declares a variable named states and sets it equal to an array containing the abbreviations of the 50 states
    let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
    // Converts state to uppercase
    state = state.toUpperCase();
    // Checks that state is in states array
    if (!states.includes(state)) throw 'Invalid state.';
}

function validateZip(zip) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if zip is 5 digits
    if (zip.length !== 5) throw 'Invalid zip.';
    // Checks if zip only contains numbers
    if (!/^\d+$/.test(zip)) throw 'Invalid zip.';
}

function validatePhoneNumber(phoneNumber){
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if phoneNumber is 10 digits
    if (phoneNumber.length !== 10) throw 'Invalid phone number.';
    // Checks if phoneNumber only contains numbers
    if (!/^\d+$/.test(phoneNumber)) throw 'Invalid phone number.';
}

function validatePassword(password) {
    // Checks that one argument was passed
    if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
    // Checks if password is a valid string
    validateString(password);
    // Checks if password contains spaces
    if (/\s/g.test(password)) throw 'Password must not contain spaces.';
    // Checks if password is at least 8 characters
    if (password.length < 8) throw 'Password must be at least 8 characters.';
}

function validateConfirmPassword(password, confirmPassword) {
    // Checks that two arguments were passed
    if (arguments.length !== 2) throw `This function takes 2 arguments but ${arguments.length} were given.`;
    // Checks if password is a valid password
    validatePassword(password);
    // Checks if confirmPassword is a valid string
    validateString(confirmPassword);
    // Checks if password equals confirmPassword
    if (password !== confirmPassword) throw 'Confirm password must match password.'
}


phoneNumberInput.on('input', function()  {
    // Formats phone number
    var number = $(this).val().replace(/[^\d]/g, '')
    if (number.length == 7) {
        number = number.replace(/(\d{3})(\d{4})/, "$1-$2");
    } else if (number.length == 10) {
        number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    // Sets phoneNumberInput to number
    $(this).val(number)
    // Sets the max length to 10
    phoneNumberInput.attr({ maxLength: 10});
});
