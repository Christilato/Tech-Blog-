const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async (event) => {
    event.preventDefault();

    const post_title = document.querySelector('input[name="post-title"]').value;
    const post_body = document.querySelector('textarea[name="post-body"]').value;


    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_title,
            post_body,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // console.log(response);
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Unable to update post');
    }
    document.location.replace('/dashboard');
};

const deleteButtonHandler = async () => {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });
    document.location.replace('/dashboard');
};

document
    .querySelector('#edit-post-form')
    .addEventListener('submit', editFormHandler);
document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteButtonHandler);