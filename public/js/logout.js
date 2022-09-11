// Logout function:

// Success:
const logout = async (event) => {
  event.preventDefault();
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // Error:
  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert("Something went wrong please try again");
  }
};

// Click to logout:
$("#logout").click(logout);
