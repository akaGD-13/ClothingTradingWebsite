const createCard = (title, imgFilePath, details, price, id) => {
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

	const cardEditContainer = document.createElement("div");
	cardEditContainer.classList.add("card-edit-container", "d-flex", "flex-row", "align-items-center", "justify-content-between");

	//create button and add event listener
	const editButton = document.createElement("button");
	editButton.classList.add("btn", "btn-primary");
	editButton.innerHTML = "Edit";

	editButton.addEventListener("click", (e) => handleEditButtonClick(e));

	const priceTag = document.createElement("p");
	priceTag.classList.add("price-tag");
	priceTag.innerHTML = "$" + price;

	cardEditContainer.appendChild(editButton);
	cardEditContainer.appendChild(priceTag);

	cardBody.appendChild(cardTitle);
	cardBody.appendChild(cardDetails);
	cardBody.appendChild(cardEditContainer);

	card.appendChild(imgContainer);
	card.appendChild(cardBody);

	//create column for card to be in
	const column = document.createElement("div");
	column.classList.add("col-3", "d-flex", "align-items-center", "justify-content-center", "mb-4");
	column.appendChild(card);
	return column;
}

//EDIT FORM LOGIC START
const handleEditButtonClick = (e) => {
	const overlay = document.getElementById("overlay");

	const cardElements = e.target.parentNode.parentNode;
	const title = cardElements.getElementsByClassName("card-title")[0].innerHTML;
	const details = cardElements.getElementsByClassName("card-text")[0].innerHTML;
	const price = cardElements.getElementsByClassName("price-tag")[0].innerHTML;

	const titleInput = document.getElementById("title");
	const detailsInput = document.getElementById("details");
	const priceInput = document.getElementById("price");

	titleInput.value = title;
	detailsInput.value = details;
	priceInput.value = parseFloat(price.replace('$', ''));
	localStorage.setItem("currentCardID", e.target.parentNode.parentNode.parentNode.dataset.id);
	showForm();
}
const showForm = () => {
	const overlay = document.getElementById("overlay");
	overlay.classList.add('overlay-visible');
	overlay.classList.remove('overlay-hidden');
}

const hideForm = () => {
	const overlay = document.getElementById("overlay");
	overlay.classList.add('overlay-hidden');
	overlay.classList.remove('overlay-visible');
}

const handleFormEdits = async (e) => {
	e.preventDefault();
	const title = document.getElementById("title").value;
	const details = document.getElementById("details").value;
	const price = document.getElementById("price").value;


	if (title.trim() == "" || details.trim() == "" || price.trim() == "") {
		const errorMsg = document.getElementById("edit-error-msg");
		errorMsg.style.visibility = "visible";
	}
	else {
		//CALL post update API HERE
		const cardElements = document.querySelector(`[data-id="${localStorage.getItem("currentCardID")}"]`);
		await updatePost(title, cardElements.getElementsByTagName('img')[0].src, price, details, true, localStorage.getItem("currentUser"), localStorage.getItem("currentCardID"))
		cardElements.getElementsByClassName("card-title")[0].innerHTML = title;
		cardElements.getElementsByClassName("card-text")[0].innerHTML = details;
		cardElements.getElementsByClassName("price-tag")[0].innerHTML = "$" + price;
		hideForm();
	}
}
//EDIT FORM LOGIC END 

//CREATE POST FORM LOGIC START
const handleAddPostClick = async (e) => {
	e.preventDefault();
	const titleInput = document.getElementById("titleC").value;
	const detailsInput = document.getElementById("detailsC").value;
	const priceInput = document.getElementById("priceC").value;
	const imgURL = document.getElementById("imgURLC").value;
	const errorMsg = document.getElementById("create-error-msg");
	if (titleInput.trim() == "" || detailsInput.trim() == "" || priceInput.trim() == "" || imgURL.trim() == "") {
		errorMsg.style.visibility = "visible";
	}
	else {
		//post card api
		const newPostID = await addPost(titleInput, imgURL, priceInput, detailsInput, true, localStorage.getItem("currentUser"));
		console.log("Created postID: " + newPostID);
		const newCard = createCard(titleInput, imgURL, detailsInput, priceInput, newPostID);
		const cardContainerRow = document.getElementById("posts-container");
		cardContainerRow.appendChild(newCard);

		//clear form

		document.getElementById("titleC").value = "";
		document.getElementById("detailsC").value = "";
		document.getElementById("priceC").value = "";
		document.getElementById("imgURLC").value = "";
		errorMsg.style.visibility = "hidden";
		hideFormC();
	}
}
const showFormC = () => {
	const overlay = document.getElementById("overlay2");
	overlay.classList.add('overlay-visible');
	overlay.classList.remove('overlay-hidden');
}

const hideFormC = () => {
	const overlay = document.getElementById("overlay2");
	overlay.classList.add('overlay-hidden');
	overlay.classList.remove('overlay-visible');
}
//CREATE POST FORM LOGIC END

const deletePost = () => {
	const cardElements = document.querySelector(`[data-id="${localStorage.getItem("currentCardID")}"]`);
	deletePostByID(localStorage.getItem("currentCardID"));
	cardElements.parentElement.remove();
	hideForm();
}
//renders a bunch of cards with these paramaters for seeing if it looks ok
const testCreation = () => {
	const newCard = createCard("testing1", "https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340", "some details some details some details some details some details some details some details some details", 10.99, 1);
	const cardContainerRow = document.getElementById("posts-container");
	cardContainerRow.appendChild(newCard);
}

const renderUserPosts = async () => {
	console.log("Rendering user posts");
	const posts = await getPostsByUser(parseInt(localStorage.getItem("currentUser")));
	if (posts) {
		posts.forEach(post => {
			const title = post.postTitle;
			const imageURL = post.imageUrl;
			const details = post.description;
			const price = post.itemPrice;
			const postID = post.postID;
			const newCard = createCard(title, imageURL, details, price, postID);
			const cardContainerRow = document.getElementById("posts-container");
			cardContainerRow.appendChild(newCard);
		});
	} else {
		console.error("No posts found or error fetching posts.");
	}
}
renderUserPosts();