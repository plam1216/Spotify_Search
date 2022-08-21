// CURRENTLY TESTING WITH A RANDOM ARTIST ID
// WILL IMPLEMENT USER INPUT FOR AN ARTIST

// this is made so it only searches Spotify for music artists
// podcasts, albums, playlists, etc. are not searched because url is set to search only 'artist'

// topSearch is displaying all resuilts, but I only will be getting the top result artist ID
const topSearch = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/search/?q=DRAKE&type=artist&offset=0&limit=10&numberOfTopResults=5",
	// "url": "https://spotify23.p.rapidapi.com/search/?q='artistName'&type=artist&offset=0&limit=10&numberOfTopResults=5",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "9c7b7aea76msh939670bd686fbccp1a2909jsnf3ab8af69b4b",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};


const albums = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/artist_albums/?id=3TVXtAsR1Inumwj472S9r4&offset=0&limit=100",
	// "url": "https://spotify23.p.rapidapi.com/artist_albums/?id=artistID&offset=0&limit=100",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "9c7b7aea76msh939670bd686fbccp1a2909jsnf3ab8af69b4b",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};

// $.ajax(albums).done(function (response) {
// 	console.log(response);
// });



//			GET DISCOGRAPHY OVERVIEW
// const overview = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://spotify23.p.rapidapi.com/artist_discography_overview/?id=3TVXtAsR1Inumwj472S9r4",
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Key": "9c7b7aea76msh939670bd686fbccp1a2909jsnf3ab8af69b4b",
// 		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
// 	}
// };

// $.ajax(overview).done(function (response) {
// 	console.log(response);
// });


const $artistName = $('#artistName')
const $input = $('input[type="text"]')
const $form = $('form')
const $discography = $('#discography')

$form.on('submit', handleSubmit)


// .then() has a fail case
// .done() would be called when object resolves, wouldn't show the error if there is one


function handleSubmit(event){ 
	event.preventDefault()
	
	$.ajax(topSearch).then(
		function(data){
			console.log(data.artists.items[0].data.uri)
			// returns something like this spotify:artist:3TVXtAsR1Inumwj472S9r4
			// split by :
			// index 2 to get ONLY artist ID
			let artistID = data.artists.items[0].data.uri.split(':')[2]
			console.log(artistID)
		},
		function(error){
			console.log('something went wrong...')
		}
	)
}