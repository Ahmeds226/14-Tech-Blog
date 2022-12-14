// Login:
const loginHandler = async (e) => {
  e.preventDefault();

  // Removes all spaces from the username and password string:
  // Username:
  const username = $("#user-name").val().trim();

  // Password:
  const password = $("#password").val().trim();

  // Username:
  if (username == "") {
    $("#user-name").attr("style", "background-color: rgb(173,216,230);");
    $("#user-name").attr("placeholder", "Please enter a username");
  }

  // Password:
  if (password == "") {
    $("#password").attr("style", "background-color: rgb(173,216,230);");
    $("#password").attr("placeholder", "Please enter a password");
  }

  // If username and password have been entered
  // Success:
  if (username && password) {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    // Failure:
    const data = await response.json();
    if (response.status === 400 || response.status === 401) {
      return alert(data.message);
    }
    document.location.replace("/");
  }
};

// Click to login:
$("#login-btn").click(loginHandler);
