// Delete post function:
const deletePost = async (e) => {
  e.preventDefault();
  const urlString = window.location.toString().split("/");
  const postId = urlString[4];

  // Delete post via post id:
  const response = await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });

  // Message when post is deleted:
  const data = await response.json();
  if (response.ok) {
    // Success:
    alert("Post has been successfully deleted!");
    document.location.replace("/dashboard");
  } else {
    // Error:
    alert("Something went wrong please try again");
  }
};

// Click to delete post:
$("#delete-post").click(deletePost);
