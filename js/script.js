const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/search/?q=Drake&type=Artist&offset=0&limit=10&numberOfTopResults=5",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "9c7b7aea76msh939670bd686fbccp1a2909jsnf3ab8af69b4b",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

const albums = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/artist_albums/?id=3TVXtAsR1Inumwj472S9r4&offset=0&limit=100",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "9c7b7aea76msh939670bd686fbccp1a2909jsnf3ab8af69b4b",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};

$.ajax(albums).done(function (response) {
	console.log(response);
});