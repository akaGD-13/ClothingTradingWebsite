const createCardU = (user, title, imgFilePath, details, price, id) => {
	const card = document.createElement("div");
	card.dataset.id = id;
	card.classList.add("card", "p-1");
	card.style.width = "20rem";
	card.style.height = "22rem";

	//create img container and img
	const imgContainer = document.createElement("div");
	imgContainer.classList.add("img-container");

	const img = document.createElement("img");
	img.src = imgFilePath;
	img.alt = "Image of User clothing";

	imgContainer.appendChild(img);

	//create card body
	const cardBody = document.createElement("div");
	imgContainer.classList.add("card-body");

	const cardTitle = document.createElement("h5");
	cardTitle.classList.add("card-title");
	cardTitle.innerHTML = title;

	const cardDetails = document.createElement("p");
	cardDetails.classList.add("card-text");
	cardDetails.innerHTML = details;

	const cardUser = document.createElement("p");
	cardUser.classList.add("card-text", "font-weight-bold");
	cardUser.innerHTML = "Contacts: " + user;

	const cardEditContainer = document.createElement("div");
	cardEditContainer.classList.add("card-edit-container", "d-flex", "flex-row", "align-items-center", "justify-content-between");


	const priceTag = document.createElement("p");
	priceTag.classList.add("price-tag");
	priceTag.innerHTML = "$" + price;

	cardEditContainer.appendChild(priceTag);

	cardBody.appendChild(cardTitle);
	cardBody.appendChild(cardDetails);
	cardBody.appendChild(cardUser);
	cardBody.appendChild(cardEditContainer);

	card.appendChild(imgContainer);
	card.appendChild(cardBody);

	//create column for card to be in
	const column = document.createElement("div");
	column.classList.add("col-3", "d-flex", "align-items-center", "justify-content-center", "mb-4");
	column.appendChild(card);
	return column;
}
function checkLoggedIn() {
	const signedIn = localStorage.getItem('currentUser');
	console.log(typeof signedIn);
	if (signedIn != "-1") {
		document.getElementById("closet-link").style.display = "block";
		document.getElementById("logout-link").style.display = "block";
		document.getElementById("sign-up-link").style.display = "none";
	}
	else {
		document.getElementById("closet-link").style.display = "none";
		document.getElementById("logout-link").style.display = "none";
		document.getElementById("sign-up-link").style.display = "block";
	}
}

function clearLocalStorage() {
	localStorage.clear();
}
const renderAllPosts = async () => {
	console.log("Rendering all posts");
	const posts = await getAllPosts();
	if (posts) {
		posts.forEach(async post => {
			const title = post.postTitle;
			const imageURL = post.imageUrl;
			const details = post.description;
			const price = post.itemPrice;
			const postID = post.postID;
			const userID = post.user_id;
			const user = await getUsers(userID);
			const newCard = createCardU(user.email, title, imageURL, details, price, postID);
			const cardContainerRow = document.getElementById("posts-container");
			cardContainerRow.appendChild(newCard);
		});
	} else {
		console.error("No posts found or error fetching posts.");
	}
}
renderAllPosts();
