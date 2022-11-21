const post_id = document.querySelector('input[name="post-id"]').value;

const commentFormHandler = async (event) => {
  event.preventDefault();
  const comment_body = document.querySelector('textarea[name="comment-body"]').value;
  // console.log(comment_body);
  if (comment_body) {
      const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({
              post_id,
              comment_body
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      });
      if (response.ok) {
          document.location.reload();
      } else {
          alert(response.statusText);
      }
  };
}

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);