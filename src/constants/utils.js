const validateField = (name, value) => {
  let error = "";
  switch (name) {
    case "name":
      if (
        !value ||
        value.length < 7 ||
        !/^[\u0600-\u06FFa-zA-Z\s]+$/.test(value)
      ) {
        error =
          "Name must be at least 7 letters long and contain only letters.";
      }
      break;
    case "email":
      if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email address.";
      }
      break;
    case "phone":
      if (!value || !/^(\+98|0)?9\d{9}$/.test(value)) {
        error = "Please enter a valid Iranian mobile phone number.";
      }
      break;
    default:
      break;
  }
  return error;
};


export { validateField };
