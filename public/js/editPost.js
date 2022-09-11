// Edit post function:
const editPost = async (e) => {
  e.preventDefault();
  const urlString = window.location.toString().split("/");
  const postId = urlString[4];

  const contents = $("#content-textarea").val();
  const title = $("#title-input").val();

  // Edit post via post id:
  const response = await fetch(`/api/post/${postId}`, {
    method: "PUT",
    body: JSON.stringify({ title, contents }),
    headers: { "Content-Type": "application/json" },
  });

  // Messages:
  if (response.ok) {
    // Success:
    alert("Post has been succesfully updated!");
    document.location.replace("/dashboard");
  } else {
    // Error:
    alert("Something went wrong please try again");
  }
};

// Click to update post:
$("#update-post").click(editPost);
