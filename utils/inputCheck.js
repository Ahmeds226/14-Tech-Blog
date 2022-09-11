// Username and password input validation:
const checkInputs = (username, password) => {
  // Username must equal to one of the ones in the db:
  // if not the user will get this message:
  if (username == "") {
    alert("Please enter a valid username");
  }

  // Password must equal to one of the ones in the db:
  // if not the user will get this message:
  if (password == "") {
    alert("Please enter a valid password");
  }
};

// Export:
module.exports = checkInputs;
