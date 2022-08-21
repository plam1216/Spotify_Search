// CURRENTLY TESTING WITH A RANDOM ARTIST ID
// WILL IMPLEMENT USER INPUT FOR AN ARTIST

// this is made so it only searches Spotify for music artists
// podcasts, albums, playlists, etc. are not searched because url is set to search only 'artist'

// topSearch is displaying all resuilts, but I only will be getting the top result artist ID

// drake 3TVXtAsR1Inumwj472S9r4
let topSearch = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=%3CREQUIRED%3E&offset=0&limit=10&numberOfTopResults=5",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "0f340b579bmsheb5c8cf361160b1p1e6216jsn8547c0d51260",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};

let albums = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/artist_albums/?id=%3CREQUIRED%3E&offset=0&limit=100",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "0f340b579bmsheb5c8cf361160b1p1e6216jsn8547c0d51260",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};

			// GET DISCOGRAPHY OVERVIEW
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

// function getArtistUrl(inputVal) {
	// topSearch.url = `url": "https://spotify23.p.rapidapi.com/search/?q=${inputVal}&type=%artist&offset=0&limit=10&numberOfTopResults=5`
	
// 	console.log('getartist', topSearch)
// }


function handleSubmit(event){ 
	event.preventDefault()
	
	$discography.empty()
	let inputVal = $input.val()

	topSearch.url = `https://spotify23.p.rapidapi.com/search/?q=${inputVal}&type=%artist&offset=0&limit=10&numberOfTopResults=5`

	// getArtistUrl(inputVal)
	
	console.log('handle', topSearch)
	$.ajax(topSearch).then(
		function(data){
			// console.log(data)
			console.log('Artist URI', data.artists.items[0].data.uri)
			// returns something like this spotify:artist:3TVXtAsR1Inumwj472S9r4
			// split by :
			// index 2 to get ONLY artist ID 
			let artistID = data.artists.items[0].data.uri.split(':')[2]
			console.log('Artist ID: ',artistID)

			getDiscography(artistID)
		},
		function(error){
			console.log('something went wrong...')
		}
	)
}
	
function getDiscography(artistID){

	albums.url = `https://spotify23.p.rapidapi.com/artist_albums/?id=${artistID}&offset=0&limit=100`
	
	$.ajax(albums).then(
		function(data){
			console.log(data)
			// gets one album
			// Spotify always stores the album name at index 0
			console.log('Album: ', data.data.artist.discography.albums.items[0].releases.items[0].name)
			// theres 3 images, 300x300, 64x64, 600x600
			console.log('Artwork: ', data.data.artist.discography.albums.items[0].releases.items[0].coverArt.sources[0].url)
			// console.log(data.data.artist.discography.albums.items)

			//  assigns array of albums to albums variable
			let albums = data.data.artist.discography.albums.items
			// console.log(albums)

			// iterate through array using jQuery to get each album name
			// Spotify always stores the album name at index 0
			$.each(albums, function(index, value) {
				let albumName = value.releases.items[0].name;				
				let coverArt = value.releases.items[0].coverArt.sources[0].url

				$discography.append(`<p><img src='${coverArt}'></img>${albumName}</p>`)
			})

			// data.data.artist.discography.albums.items.each(item, function(){
			// 	let albumName = album.releases.items[0].name
			// })


		},
		function(error){
			console.log('something went wrong...')
		}
	)
}