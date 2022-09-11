// Add comment function:
const addComment = async (e) => {
  e.preventDefault();

  const urlString = window.location.toString().split("/");
  const postId = urlString[4];

  const contents = $("#comment").val().trim();

  //Get all comments on the post:
  if (contents) {
    const response = await fetch(`/api/comment/${postId}`, {
      method: "POST",
      body: JSON.stringify({ contents }),
      headers: { "Content-Type": "application/json" },
    });
    // Add comment messages:
    const data = await response.json();
    if (response.ok) {
      // Success:
      alert("Successfully added comment!");
      document.location.replace(`/post/${postId}`);
      // Error
    } else {
      alert("Failed to add comment please try again");
    }
  }
};

// Click to add comment:
$("#add-comment").click(addComment);
