const clearErrorMsgs = () => {
	const errorMsgs = document.getElementsByTagName("small");
	for (var i = 0; i < errorMsgs.length; i++) {
		errorMsgs[i].style.visibility = "hidden";
	}
}

document.querySelector('#login-form').onsubmit = async (e) => {
	e.preventDefault();
	console.log("Attempting to submit login form");
	clearErrorMsgs();
	const username = document.getElementById("username");
	const password = document.getElementById("password");

	const userError = document.getElementById("userError");
	const passError = document.getElementById("passError");
	const authError = document.getElementById("authError");

	var isFilled = true;
	if (username.value.trim() == "") {
		userError.style.visibility = "visible";
		isFilled = false;
	}
	if (password.value.trim() == "") {
		passError.style.visibility = "visible";
		isFilled = false;
	}
	if (isFilled) {
		const temp = await autheticate(username.value, password.value)
		if (temp != -1 && temp != -2) {
			console.log("<<<<<<<true");
			localStorage.setItem("currentUser", temp);
			window.location.href = "../homepage.html";
			return true;
		}
		else {
			authError.style.visibility = "visible";
			console.log("<<<<<<<false");
			return false;
		}
	}
	else {
		return false;
	}

}

async function autheticate(username, password) {
	console.log("Autheticating username and password combination");
	//CALL API FUNCTION HERE
	const temp = await validateUser(username, password);
	// non negative means found, -2 means username not found, -1 means password incorrect
	return temp;
}

function setLocalStorage() {
	localStorage.setItem("currentUser", -1);
}