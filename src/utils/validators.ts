export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
};

export const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 3,
    message: "Name must be at least 3 characters",
  },
};

export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters",
  },
  validate: {
    hasLetter: (val: string) =>
      /[A-Za-z]/.test(val) ? true : "Must include at least one letter",
    hasNumber: (val: string) =>
      /\d/.test(val) ? true : "Must include at least one number",
    hasSpecial: (val: string) =>
      /[^A-Za-z0-9]/.test(val)
        ? true
        : "Must include at least one special character",
  },
};
