//WE NEED API CALL THAT PULLS ALL CARDS FROM A SPECIFIC USER ID, THE API CALL NEEDS TO RETURN EACH POST ID ALSO FOR THE USER

// PostController
async function getAllPosts() {
	try {
		const response = await fetch('/api/post/getAllPost', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}

async function getPostsByUser(user_id) {
	try {
		const response = await fetch('/api/post/getPostByUser?user_id=' + user_id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}

async function getPostsByID(post_id) {
	try {
		const response = await fetch('/api/post/getPostByID?post_id=' + post_id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}

async function addPost(postTitle, imageUrl_, itemPrice_, description_, sold_, user_id) {

	para = '?' +
		"postTitle=" + postTitle +
		"&imageUrl_=" + imageUrl_ +
		"&itemPrice_=" + itemPrice_ +
		"&description_=" + description_ +
		"&sold_=" + sold_ +
		"&user_id=" + user_id;
	try {
		const response = await fetch('/api/post/addPost' + para, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await response.text();
		console.log('api.js addPost: returns the id of the added post:' + data);
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}
async function updatePost(postTitle, imageUrl_, itemPrice_, description_, sold_, user_id, post_id) {

	para = '?' +
		"postTitle=" + postTitle +
		"&imageUrl_=" + imageUrl_ +
		"&itemPrice_=" + itemPrice_ +
		"&description_=" + description_ +
		"&sold_=" + sold_ +
		"&user_id=" + user_id +
		"&post_id=" + post_id;
	try {
		const response = await fetch('/api/post/updatePost' + para, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await response.text();
		console.log('api.js addPost: returns the id of the added post:' + data);
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}
async function deletePostByID(postId) {
	try {
		const response = await fetch('/api/post/deletePost?postID=' + postId, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await response.text();
		console.log('api.js deletePost: \n returns:' + data);
	} catch (error) {
		console.error('Error:', error);
	}
}

async function test(xxx, xxx2) {
	try {
		const response = await fetch('/api/post/PostTest?test1=' + xxx + '&test2=' + xxx2, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await response.text();
		console.log(data);
	} catch (error) {
		console.error('Error:', error);
	}
}



// UserController

async function getAllUsers() {
	try {
		const response = await fetch('/api/user/getAllUsers', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		const data = await response.json();
		console.log('api.js getAllUsers: need implementation, ' +
			'data should be a json array with all posts: \n\n' + data.tostring());
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}

async function getUsers(ID) {
	try {
		const response = await fetch('/api/user/getUserByID?ID=' + ID, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}

async function addUser(username, password_, email_) {

	para = '?username=' + username + '&password=' + password_ + '&email=' + email_;

	try {
		const response = await fetch('/api/user/addUser' + para, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await response.text();
		console.log('api.js addUser: returns the id of the added user:' + data);
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}

async function validateUser(username, password_) {
	// all info about the User
	para =
		"?username=" + username +
		"&password=" + password_;
	try {
		const response = await fetch('/api/user/validateUser' + para, {
			method: 'Get',
			headers: {
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await response.text();
		console.log('api.js validateUser: returns the message of validation: ' + data);
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}

async function deleteUser(userID) {
	try {
		const response = await fetch('/api/post/deletePost?userID=' + userID, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await response.text();
		console.log('api.js deleteUser: \n returns a message:' + data);
	} catch (error) {
		console.error('Error:', error);
	}
}


// test(201, "testing"); //this work