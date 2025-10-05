export const fieldLengthStrings = {
    length256: "a".repeat(256),
    length255: "a".repeat(255),
    length101: "a".repeat(101),
    length100: "a".repeat(100),
    length51: "a".repeat(51),
    length50: "a".repeat(50)
};

export const invalidCharacterStrings = {
    // would include special characters considered invalid
    specialChars: "@#$%^*()_+{}|:\"<>?-[]\\;/`~"
};

export const invalidPasswordsAndErrors = [
    { password: "short1A!", error: "Password must be at least 10 characters" },
    { password: "alllowercase1!", error: "The user password field must contain at least one uppercase and one lowercase letter." },
    { password: "ALLUPPERCASE1!", error: "The user password field must contain at least one uppercase and one lowercase letter." },
    { password: "NoNumbers!", error: "The user password field must contain at least one number." },
    { password: "NoSpecialChar1", error: "The user password field must contain at least one symbol." },
];

