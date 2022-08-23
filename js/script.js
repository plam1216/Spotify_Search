// topSearch gives all resuilts, but I only will be getting the top result artist ID
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

// albums gives all albums by the artist
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

// albumTracks gives all tracks on the album
const albumTracks = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/album_tracks/?id=%3CREQUIRED%3E&offset=0&limit=300",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "0f340b579bmsheb5c8cf361160b1p1e6216jsn8547c0d51260",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });

const $artistName = $('#artistName')
const $input = $('input[type="text"]')
const $form = $('form')
const $discography = $('#discography')

// const $body = $('body')
const $modal = $('.modal')
const $modalBody = $('modalBody')
const $modalImg = $('#modalImg')
const $modalAlbumName = $('#modalAlbumName')
const $trackList = $('#tracklist')
// const $li = $('li')
// const album = $('.album')

const $spotifyLogo = $('#spotifyLogo')
const $overlay = $('#overlay')


$form.on('submit', handleSubmit)

function handleSubmit(event){ 
	event.preventDefault()
	
	$discography.empty()
	let inputVal = $input.val()

	topSearch.url = `https://spotify23.p.rapidapi.com/search/?q=${inputVal}&type=%artist&offset=0&limit=10&numberOfTopResults=5`

	// getArtistUrl(inputVal)
	
	// console.log('handle', topSearch)
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
			console.log('handleSubmit not working')
		}
	)
}
	
function getDiscography(artistID){

	albums.url = `https://spotify23.p.rapidapi.com/artist_albums/?id=${artistID}&offset=0&limit=100`
	
	$.ajax(albums).then(
		function(data){
			console.log(data)
			// Get one album
			// Spotify always stores the album name at index 0
			console.log('Album: ', data.data.artist.discography.albums.items[0].releases.items[0].name)
			// Spotify has 3 images, 300x300, 64x64, 600x600
			console.log('Artwork: ', data.data.artist.discography.albums.items[0].releases.items[0].coverArt.sources[0].url)
			// console.log(data.data.artist.discography.albums.items)

			//  Assigns array of albums to 'albums' variable
			let albums = data.data.artist.discography.albums.items
			// console.log(albums)

			// Iterate through array using jQuery '.each' to get album name
			// Spotify always stores the album name at index 0
			$.each(albums, function(index, value) {
				let albumName = value.releases.items[0].name;				
				let coverArtID = value.releases.items[0].coverArt.sources[0].url
				let albumID = value.releases.items[0].id
				// console.log(coverArtID)
				$discography.append(`<div class="album" id=${albumID}><img src='${coverArtID}'></img><p>${albumName}</p></div>`)
				
				// console.log($discography)
			})			
			
			console.log('discography', $discography)
			let $albumArr = $('.album')
			console.log('albums arr', $albumArr)

			// $albumArr.on('click', popUpModal)
			$albumArr.on('click', function(event){
				console.log(event.target.closest('div'))
				// 'target' is not jquery, need to use getAttribute
				// id of the album clicked
				let albumID = event.target.closest('div').getAttribute('id');
				// img src of the album clicked
				let modalArtwork = event.target.closest('div').getElementsByTagName('img')[0].src;

				let modalAlbumName = ''
				// loops through array of albums, compare clicked album's ID to each of the album ids in the artist's discography
				// when there is a match assign that name to modalAlbumName
				$.each(albums, function(index, value) {
					if(value.releases.items[0].id === albumID) {
						modalAlbumName = value.releases.items[0].name
					}
				})				
				
				// event.target.closest('div').getElementsByTagName('p')[0].innerHTML = modalAlbumName;

				console.log('album id', albumID)
				console.log('modal artwork', modalArtwork);
				console.log('modal album name', modalAlbumName);

				popUpModal(albumID, modalArtwork, modalAlbumName);
			})
		},
		function(error){
			alert('getDiscography not working')
		}
	)
}

function popUpModal(albumID, modalArtwork, modalAlbumName) {
	console.log('clicking on popUpModal')
	// console.log('popupmodal albumID')

	console.log('popup album id', albumID)
	console.log('popup artwork', modalArtwork);
	console.log('popup album name', modalAlbumName);

	// $modalBody.append("<img src="+modalArtwork+">")
	// $modalBody.append("<p>"+modalAlbumName+"</p>")
	$modalAlbumName.append(modalAlbumName)
	$modalImg.attr('src', modalArtwork)

	console.log($modalAlbumName)
	console.log($modalImg)
	
	albumTracks.url = `https://spotify23.p.rapidapi.com/album_tracks/?id=${albumID}&offset=0&limit=300`
	
	// console.log('Modal Tracklist', albumTracks)
	
	$.ajax(albumTracks).then(
		function(data){
			console.log(data.data.album.tracks.items)
			let albArr = data.data.album.tracks.items
			$.each(albArr, function(index, value){
				console.log('value', value)
				console.log('name', value.track.name)
				$trackList.append(`<li>${value.track.name}</li>`)
			})
		}, 
		
		function(error){
			alert('popUpModal not working')
		}
	)
	$modal.addClass('active')
	$overlay.addClass('active')
}

// this is only for spotify logo, should be for any album
$spotifyLogo.on('click', spotifyModal)

function spotifyModal() {
	$modal.addClass('active')
	$overlay.addClass('active')
}

$overlay.on('click', closeModal)

function closeModal() {
	$modalAlbumName.empty()
	$trackList.empty()
	$modal.removeClass('active')
	$overlay.removeClass('active')
}
