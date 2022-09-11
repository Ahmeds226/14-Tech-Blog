// Add post function:
const addPost = async (e) => {
  e.preventDefault();

  // Dialogs:
  const contents = $("#modal-content-textarea").val();
  const title = $("#modal-title-input").val().trim();
  if (contents && title) {
    // Post the users post:
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({ title, contents }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      document.location.replace("/dashboard");
    } else {
      alert("Unable to create your post right now please try again");
    }
  }
};

// Click to add post:
$("#add-post").click(addPost);
