// Sign up function:
const signUpHandler = async (e) => {
  e.preventDefault();

  // Removes all spaces from the username and password string:
  // Username for signup:
  const user_name = $("#signup-username").val().trim();

  // Password for signup:
  const password = $("#signup-password").val().trim();

  // Username;
  if (user_name == "") {
    $("#signup-username").attr("style", "border-color: red;");
    $("#signup-username").attr("placeholder", "Please enter a username");
  }

  // Password:
  if (password.length < 8) {
    $("#signup-password").attr("style", "border-color: red;");
    $("#signup-password").attr("placeholder", "Please enter a valid password");
    return;
  }

  // Wait for the user to complete the sign up:
  if (user_name && password) {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ user_name, password }),
      headers: { "Content-Type": "application/json" },
    });

    // Error with signup:
    const signData = await response.json();
    if (response.status === 400 || response.status === 404) {
      return alert(signData.message);
    }
    if (response.ok) {
      // Redirects user to homepage when successfully signed up:
      document.location.replace("/");
    } else {
      return alert("Username is taked please try another username");
    }
  }
};

// Click to signup:
$("#signup-btn").click(signUpHandler);
