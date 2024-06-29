const constants = {
    passWordQualityCountMap: {
        0: "Weak Password",
        1: "Weak Password",
        2: "Good Password",
        3: "Strong Password",
    },
    passwordTypeClassMap: {
        0: "pure-red",
        1: "pure-red",
        2: "normal-red",
        3: "violet",
    },
    passwordQualityStateMap: [
        {
            state: "upperLower",
            msg: "Atleast one letter in capital and one in small.",
        },
        {
            state: "specialCharacter",
            msg: "Atleast one special character (~ ! @ *).",
        },
        {
            state: "number",
            msg: "Atleast one number.",
        },
    ],
    confirmPasswordData: [
        {
            label: "Old Password",
            stateName: "oldPassword",
            eyeIcon: "showOldPassword",
            showError: "showOldPasswordError",
            errorMsg: "showOldPasswordErrorMsg",
        },
        {
            label: "New Password",
            stateName: "newPassword",
            eyeIcon: "showNewPassword",
            showError: "showNewPasswordError",
            errorMsg: "showNewPasswordErrorMsg",
        },
    ],
};
export default constants;
