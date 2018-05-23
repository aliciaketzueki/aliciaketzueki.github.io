var link = document.querySelector(".button-search");
var popup = document.querySelector(".form");

link.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup.classList.toggle("form-show");
});