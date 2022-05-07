// Edit Account Modal
let editAccountModal = $('#edit-account-modal');
// Edit Profile Picture Modal
let editProfilePictureModal = $('#edit-profile-picture-modal');
// Edit Profile Picture Button
let editProfilePictureBtn = $('#profile_picture_edit_btn');
// Profile Picture Input
let profilePictureInput = $('#profile_picture_input');
// Profile Picture Form
let profilePictureForm = $('#profile_picture_form');
// Profile Picture Submit Button
let submitProfilePictureBtn = $('#submit_profile_picture');
// Temporary Profile Picture
let tempProfilePicture = $('#temp_image')[0];
// Edit Account Button
let editAccountButton = $('#edit_account_btn');
// Edit Account Toast
let editAccountToast = $('#edit_account_toast');
// Declares a variable named didFocusEditField and sets it equal to false
let didFocusEditField = false;

// Edit Account Form Data
let editAccountForm = $('#edit_account_form');
let editFirstNameInput = $('#edit_first_name');
let editLastNameInput = $('#edit_last_name');
let editEmailInput = $('#edit_email');
let editUsernameInput = $('#edit_username');
let editPhoneNumberInput = $('#edit_phone_number');
let editDateOfBirthInput = $('#edit_date_of_birth');
let editAddressInput = $('#edit_address');
let editCityInput = $('#edit_city');
let editStateInput = $('#edit_state');
let editZipInput = $('#edit_zip');
let confirmEditBtn = $('#confirm_edit_btn');
let editAccountRequestErrorDiv = $('#edit_request_error');
let originalFormData = new FormData(document.getElementById("edit_account_form"));
const data = Object.fromEntries(new FormData(document.getElementById("edit_account_form")).entries());

let editProfilePictureErrorDiv = $('#upload_error');

let originalJSON;

$(document).ready(function() {
    // Declares a variable named usersState and sets it equal to the users state in the html based on id=users_state
    let usersState = $('#users_state').text().slice(-2);
    // Loops through states array
    states.forEach(state => {
        // Checks if state equals the user's state
        if (state == usersState){
            // Add option with selected to editStateInput
            editStateInput.append(`<option selected="selected" value=${state}>${state}</option>`);
        } else {
            // Add option without select to editStateInput
            editStateInput.append(`<option value=${state}>${state}</option>`);
        }
    });
});


editProfilePictureBtn.click(function() {
    // Open edit profile picture modal
    editProfilePictureModal.modal('toggle');
    // Reset profilePictureForm
    resetProfilePictureForm();
});

editAccountButton.click(function() {
    // Open edit account modal
    editAccountModal.modal('toggle');
    // Reset edit account form
    resetEditAccountForm();
    // Gets edit account original form data
    getOriginalData();
});

function getOriginalData() {
    // Sets originalJSON equal to the edit account form original data
    originalJSON = {
        firstName: editFirstNameInput.val(),
        lastName: editLastNameInput.val(),
        email: editEmailInput.val(),
        username: editUsernameInput.val(),
        dateOfBirth: editDateOfBirthInput.val(),
        address: editAddressInput.val(),
        city: editCityInput.val(),
        state: editStateInput.val(),
        zip: editZipInput.val(),
        phoneNumber: editPhoneNumberInput.val()
    }
}

function resetProfilePictureForm() {
    // Resets profilePictureForm
    profilePictureForm.trigger('reset');
    // Sets profile picture back to placeholder image
    $('#temp_image').attr('src', '/public/images/clear_image.png');
    // Hides request error
    editProfilePictureErrorDiv.hide();

}

function resetEditAccountForm() {
    // Resets profilePictureForm
    editAccountForm.trigger('reset');
    // Resets all edit account errors
    resetEditAccountErrors();
}

function resetEditAccountErrors() {
    // Resets first_name errors
    resetFieldError("edit_first_name");
    // Resets last_name errors
    resetFieldError("edit_last_name");
    // Resets email errors
    resetFieldError("edit_email");
    // Resets sign_up_username errors
    resetFieldError("edit_username");
    // Resets phone_number errors
    resetFieldError("edit_phone_number");
    // Resets date_of_birth errors
    resetFieldError("edit_date_of_birth");
    // Resets address errors
    resetFieldError("edit_address");
    // Resets city errors
    resetFieldError("edit_city");
    // Resets state errors
    resetFieldError("edit_state");
    // Resets zip errors
    resetFieldError("edit_zip");
    // Hides request error
    editAccountRequestErrorDiv.hide();
}

profilePictureInput.change(function(event) {
    // Show Image
	tempProfilePicture.src = URL.createObjectURL(event.target.files[0]);
});

editAccountForm.submit((event) => {
    console.log(data);
    // Stops the form from being submitted
    event.preventDefault();
    // Sets didFocus to false
    didFocusEditField = false;

    // Declares a variable named firstName and sets it equal to the value of first_name input
    let firstName = editFirstNameInput.val();
    // Declares a variable named lastName and sets it equal to the value of last_name input
    let lastName = editLastNameInput.val();
    // Declares a variable named email and sets it equal to the value of email input
    let email = editEmailInput.val();
    // Declares a variable named username and sets it equal to the value of sign_up_username input
    let username = editUsernameInput.val();
    // Declares a variable named phoneNumber and sets it equal to the value of phone_number input
    let phoneNumber = editPhoneNumberInput.val();
    // Declares a variable named dateOfBirth and sets it equal to the value of date_of_birth input
    let dateOfBirth = editDateOfBirthInput.val();
    // Declares a variable named address and sets it equal to the value of address input
    let address = editAddressInput.val();
    // Declares a variable named city and sets it equal to the value of city input
    let city = editCityInput.val();
    // Declares a variable named state and sets it equal to the value of state input
    let state = editStateInput.val();
    // Declares a variable named zip and sets it equal to the value of zip input
    let zip = editZipInput.val();

    let didEdit = false;

    console.log(originalJSON.firstName);
    // Checks if user changed firstName
    if (originalJSON.firstName !== firstName) {
        didEdit = true
    }
    // Checks if user changed lastName
    if (originalJSON.lastName !== lastName) {
        didEdit = true
    }
    // Checks if user changed email
    if (originalJSON.email !== email) {
        didEdit = true
    }
    // Checks if user changed username
    if (originalJSON.username !== username) {
        didEdit = true
    }
    // Checks if user changed phoneNumber
    if (originalJSON.phoneNumber !== phoneNumber) {
        didEdit = true
    }
    // Checks if user changed dateOfBirth
    if (originalJSON.dateOfBirth !== dateOfBirth) {
        didEdit = true
    }
    // Checks if user changed address
    if (originalJSON.address !== address) {
        didEdit = true
    }
    // Checks if user changed state
    if (originalJSON.state !== state) {
        didEdit = true
    }
    // Checks if user changed city
    if (originalJSON.city !== city) {
        didEdit = true
    }
    // Checks if user changed zip
    if (originalJSON.zip !== zip) {
        didEdit = true
    }

    // Checks if user edited information
    if (!didEdit) {
        // Adds error to html
        editAccountRequestErrorDiv.html('No data was changed.');
        // Changes font color to red
        editAccountRequestErrorDiv.css("color", "#DC3545");
        // Shows error
        editAccountRequestErrorDiv.show();
        return;
    }

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
        addFieldError("edit_first_name", firstNameError);
    } else {
        // Resets first_name errors
        resetFieldError("edit_first_name");
    }

    // Checks if lastNameError
    if (lastNameError) {
        // Adds last name error to form
        addFieldError("edit_last_name", lastNameError);
    } else {
        // Resets last_name errors
        resetFieldError("edit_last_name");
    }

    // Checks if emailError
    if (emailError) {
        // Adds email error to form
        addFieldError("edit_email", emailError);
    } else {
        // Resets email errors
        resetFieldError("edit_email");
    }

    // Checks if usernameError
    if (usernameError) {
        // Adds username error to form
        addFieldError("edit__username", usernameError);
    } else {
        // Resets sign_up_username errors
        resetFieldError("edit__username");
    }

    // Checks if phoneNumberError
    if (phoneNumberError) {
        // Adds phone number error to form
        addFieldError("edit_phone_number", phoneNumberError);
    } else {
        // Resets phone_number errors
        resetFieldError("edit_phone_number");
    }

    // Checks if dateOfBirthError
    if (dateOfBirthError) {
        // Adds date of birth error to form
        addFieldError("edit_date_of_birth", dateOfBirthError);
    } else {
        // Resets date_of_birth errors
        resetFieldError("edit_date_of_birth");
    }

    // Checks if addressError
    if (addressError) {
        // Adds address error to form
        addFieldError("edit_address", addressError);
    } else {
        // Resets address errors
        resetFieldError("edit_address");
    }

    // Checks if cityError
    if (cityError) {
        // Adds city error to form
        addFieldError("edit_city", cityError);
    } else {
        // Resets city errors
        resetFieldError("edit_city");
    }

    // Checks if stateError
    if (stateError) {
        // Adds state error to form
        addFieldError("edit_state", stateError);
    } else {
        // Resets state errors
        resetFieldError("edit_state");
    }

    // Checks if zipError
    if (zipError) {
        // Adds zip error to form
        addFieldError("edit_zip", zipError);
    } else {
        // Resets zip errors
        resetFieldError("edit_zip");
    }

    // Checks if no field errors
    if (!firstNameError && !lastNameError && !emailError && !usernameError && !phoneNumberError && !dateOfBirthError && !addressError && !cityError && !stateError && !zipError) {
        // Declares a variable called updatedUser and sets it equal to an object with the user's updated information
        let updatedUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            dateOfBirth: dateOfBirth,
            address: address,
            city: city,
            state: state,
            zip: zip,
            phoneNumber: phoneNumber
        }
        // Declares a variable called requestConfig and sets it to the request parameters
        var requestConfig = {
            method: 'POST',
            url: '/account/edit',
            data: updatedUser
        }

        // Show loading spinner
        loadingSpinner.show();

        // Disables confirm edit button on form
        confirmEditBtn.addClass('disabled');

        // Ajax call
        $.ajax(requestConfig).then(function (apiResponse) {
            // Enables confirm edit button on form
            confirmEditBtn.removeClass('disabled');
            // Hide loading spinner
            loadingSpinner.hide();
            // Parses JSON
            apiResponse = JSON.parse(apiResponse);
            // Checks if errors
            if (apiResponse.errors) {
                // Checks if requestError
                if (apiResponse.errors.requestError) {
                    // Close edit account modal
                    editAccountModal.modal('toggle');
                    // Shows error toast
                    var toast = new bootstrap.Toast(errorToast);
                    toast.show();
                }
                // Checks if firstName error
                if (apiResponse.errors.firstNameError) {
                    // Adds field error
                    addFieldError("edit_first_name", apiResponse.errors.firstNameError);
                }
                // Checks if lastName error
                if (apiResponse.errors.lastNameError) {
                    // Adds field error
                    addFieldError("edit_last_name", apiResponse.errors.lastNameError);
                }
                // Checks if email error
                if (apiResponse.errors.emailError) {
                    // Adds field error
                    addFieldError("edit_email", apiResponse.errors.emailError);
                }
                // Checks if username error
                if (apiResponse.errors.usernameError) {
                    // Adds field error
                    addFieldError("edit_username", apiResponse.errors.usernameError);
                }
                // Checks if phoneNumber error
                if (apiResponse.errors.phoneNumberError) {
                    // Adds field error
                    addFieldError("edit_phone_number", apiResponse.errors.phoneNumberError);
                }
                // Checks if dateOfBirth error
                if (apiResponse.errors.dateOfBirthError) {
                    // Adds field error
                    addFieldError("edit_date_of_birth", apiResponse.errors.dateOfBirthError);
                }
                // Checks if address error
                if (apiResponse.errors.addressError) {
                    // Adds field error
                    addFieldError("edit_address", apiResponse.errors.addressError);
                }
                // Checks if city error
                if (apiResponse.errors.cityError) {
                    // Adds field error
                    addFieldError("edit_city", apiResponse.errors.cityError);
                }
                // Checks if state error
                if (apiResponse.errors.stateError) {
                    // Adds field error
                    addFieldError("edit_state", apiResponse.errors.stateError);
                }
                // Checks if zip error
                if (apiResponse.errors.zipError) {
                    // Adds field error
                    addFieldError("edit_zip", apiResponse.errors.zipError);
                }
            } else {
                 // Close edit account modal
                 editAccountModal.modal('toggle');
                 // Reload page
                 location.reload();
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // Enables confirm edit button on form
            confirmEditBtn.removeClass('disabled');
            // Hide loading spinner
            loadingSpinner.hide();
            // Close edit account modal
            editAccountModal.modal('toggle');
            // Shows error toast
            var toast = new bootstrap.Toast(errorToast);
            toast.show();
        });
    }
});

profilePictureForm.submit((event) => {
    // Stops the form from being submitted
    event.preventDefault();
    // Declares a variable named profilePicture and sets it equal to the value of profilePictureInput input
    let profilePicture = profilePictureInput.val();
    // Checks image was chosen
    if (!profilePicture) {
        // Adds upload error to form
        editProfilePictureErrorDiv.html('Must choose an image.');
        // Shows error
        editProfilePictureErrorDiv.show();
    } else {
        // Resets upload_error errors
        editProfilePictureErrorDiv.hide();

        // Declares a variable named formData and sets it equal to the profile_picture_form form data
        let formData = new FormData(document.getElementById("profile_picture_form"));

        // Disables submit profile picture button on form
        submitProfilePictureBtn.addClass('disabled');

        // Show loading spinner
        loadingSpinner.show();

        // Ajax call
        $.ajax({
            type:'POST',
            url: '/account/upload-profile-picture',
            data: formData,
            cache:false,
            contentType: false,
            processData: false,
            success: function(data) {
                // Enables submit profile picture button on form
                submitProfilePictureBtn.removeClass('disabled');
                // Hide loading spinner
                loadingSpinner.hide();
                // Reload page
                location.reload();
            },
            error: function(data) {
                // Enables submit profile picture button on form
                submitProfilePictureBtn.removeClass('disabled');
                // Hide loading spinner
                loadingSpinner.hide();
                // Hides profile picture modal
                editProfilePictureModal.modal('toggle');
                // Shows error toast
                var toast = new bootstrap.Toast(errorToast);
                toast.show();
            }
        });
    }
});

editPhoneNumberInput.on('input', function()  {
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
    editPhoneNumberInput.attr({ maxLength: 10});
});
