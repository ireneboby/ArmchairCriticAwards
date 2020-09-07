const SEARCH_FORM = document.querySelector("#form");
const RESULTS = document.querySelector("#result");
const NOMINATIONS = document.querySelector("#nomination");
const SEARCH = document.querySelector("input[type='search']");

var inputSearch;
var OMDB_API_URL;
var request = new XMLHttpRequest();
var nomineeCount = 0;

request.addEventListener("load", function() {		//to manipulate date from OMDb API
      if (this.responseText === '{"Response":"False","Error":"Movie not found!"}')
      {
        alert("Movie Not Found");
      } else {

        var result = JSON.parse(this.response);
        var arr = result.Search;

        arr.forEach((movie)=>{
        	var newResult = document.createElement ("div");

        	var title = document.createElement("p");
        		title.textContent = movie.Title + ", " + movie.Year;

        	var addButton = document.createElement("button");
        		addButton.textContent="Nominate";
        		addButton.setAttribute ("name", movie.Title + ", " + movie.Year);
        		addButton.setAttribute ("id", movie.imdbID);

        	RESULTS.appendChild(newResult);
        	newResult.appendChild(title);
        	newResult.appendChild(addButton);

        	addButton.addEventListener("click", addNominee);
        })    

      }
    });

function addNominee (event){

	if (nomineeCount >= 5){
		alert ("Only 5 nominations!");

	} else if (document.querySelector("#nomination #" + this.id) != null){  /* Checking if Movie with the same IMDb ID exists in nominee list already*/
		alert ("You already nominated " + this.name);

	} else {

		event.preventDefault();
		var nominee = document.createElement("div");
			nominee.setAttribute("id", this.id);

		var name = document.createElement("p");
			name.textContent = this.name;

		var removeButton = document.createElement("button");
			removeButton.setAttribute ("name", this.name);
			removeButton.setAttribute("id", this.id);
	        removeButton.textContent="Remove";


		NOMINATIONS.appendChild(nominee);
		nominee.appendChild(name);
		nominee.appendChild(removeButton);
		nomineeCount++;  //incrementing number of nominees

		removeButton.addEventListener("click", removeNominee); //event handling for when remove button is pressed
		}
}

function removeNominee (event){
	event.preventDefault();
	NOMINATIONS.removeChild(document.querySelector("#nomination #" + this.id));
	nomineeCount--;
}


function search (event){
	event.preventDefault();
	inputSearch = SEARCH.value;
	if (inputSearch==""){
		alert ("Please Enter a Movie Title");
	} 
		var OMDB_API_URL = "https://www.omdbapi.com/?apikey=2879f02f&type=movie&s=" + inputSearch;
		request.open('GET', OMDB_API_URL, true);
		request.send();
		
}

function showResults (event) {
	event.preventDefault();
	RESULTS.textContent = "";
	RESULTS.style.display = "";
	RESULTS.style.height= "300px";
	search (event);
}

function clearResults (event){
	event.preventDefault();
	RESULTS.textContent = "";
	RESULTS.style.display = "none";
}


SEARCH_FORM.addEventListener("submit", showResults);
SEARCH_FORM.addEventListener("reset", clearResults);
