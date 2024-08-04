function validate() {
    const password = document.getElementById('password').value;
    const retypePassword = document.getElementById('retype_password').value;
    const verificationStatus = document.getElementById('verification_status');

    // Regular expressions to check password conditions.
    const lengthRegex = /^.{8,20}$/;
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*]/;
    const noSpaceRegex = /^\S*$/;

    // Check if passwords match.
    if (password !== retypePassword) {
        verificationStatus.textContent = "Passwords do not match.";
        verificationStatus.className = "failed";
        return;
    }

    // Check if password meets all criteria.
    if (!lengthRegex.test(password)) {
        verificationStatus.textContent = "Password must be between 08 and 20 characters.";
        verificationStatus.className = "failed";
        return;
    }
    if (!lowerCaseRegex.test(password)) {
        verificationStatus.textContent = "Password must contain at least one lowercase letter.";
        verificationStatus.className = "failed";
        return;
    }
    if (!upperCaseRegex.test(password)) {
        verificationStatus.textContent = "Password must contain at least one uppercase letter.";
        verificationStatus.className = "failed";
        return;
    }
    if (!digitRegex.test(password)) {
        verificationStatus.textContent = "Password must contain at least one digit.";
        verificationStatus.className = "failed";
        return;
    }
    if (!specialCharRegex.test(password)) {
        verificationStatus.textContent = "Password must contain at least one special symbol (!@#$%^&*).";
        verificationStatus.className = "failed";
        return;
    }
    if (!noSpaceRegex.test(password)) {
        verificationStatus.textContent = "Password must not contain spaces.";
        verificationStatus.className = "failed";
        return;
    }

    // If all checks pass.
    verificationStatus.textContent = "Password is valid!";
    verificationStatus.className = "success";
}