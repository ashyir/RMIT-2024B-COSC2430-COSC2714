function validate() {
    const password = document.getElementById('password').value;
    const retypePassword = document.getElementById('retype_password').value;
    const verificationStatus = document.getElementById('verification_status');

    verificationStatus.classList.remove("failed");
    verificationStatus.classList.remove("success");


    // Check if passwords match.
    if (password != retypePassword) {
        verificationStatus.innerText = 'Passwords do not match.';
        verificationStatus.classList.add("failed");
        return;
    }

    // Check if password meets all criteria.
    if (password.length < 8) {
        verificationStatus.innerText = 'Password must be between 08 and 20 characters.';
        verificationStatus.classList.add("failed");
        return;
    }

    if (password.length > 20) {
        verificationStatus.innerText = 'Password must be between 08 and 20 characters.';
        verificationStatus.classList.add("failed");
        return;
    }

    if (!contains(password, 'abcdefghijklmnopqrstuvwxyz')) {
        verificationStatus.innerText = 'Password must contain at least one lowercase letter.';
        verificationStatus.classList.add("failed");
        return;
    }

    if (!contains(password, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')) {
        verificationStatus.innerText = 'Password must contain at least one uppercase letter.';
        verificationStatus.classList.add("failed");
        return;
    }

    if (!contains(password, '0123456789')) {
        verificationStatus.innerText = 'Password must contain at least one digit.';
        verificationStatus.classList.add("failed");
        return;
    }

    if (!contains(password, '!@#$%^&*')) {
        verificationStatus.innerText = 'Password must contain at least one special symbol (!@#$%^&*).';
        verificationStatus.classList.add("failed");
        return;
    }

    // Contain no space.
    if (password.indexOf(" ") >= 0) {
        verificationStatus.innerText = 'Password must not contain spaces.';
        verificationStatus.classList.add("failed");
        return;
    }

    verificationStatus.classList.add("success");
    verificationStatus.classList.remove("failed");
    verificationStatus.innerText = 'Password is valid';
}

// Check if the string contains at least one letter in the provided collection.
function contains(text, collection) {
    for (let i = 0; i < collection.length; i++) {
        let letter = collection.charAt(i);

        if (text.indexOf(letter) >= 0)
            return true;
    }

    return false;
}