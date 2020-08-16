Vue.component('chirp', {
	props: ['chirpobj'],
	template: "<div class=\"card\" style=\"width: 18rem;\"><div class=\"card-body\"><h5 class=\"card-title\">{{ chirpobj.user }}</h5><p class=\"card-text\">{{ chirpobj.message }}</p></div></div>"
})

var idCount = 0;

var chirpFeed = new Vue({
	el: '#feed',
	data: {
		chirps: [
			
		]
	}
})

function updateFeed() {
	const Http = new XMLHttpRequest();
	const url = 'http://localhost:3000/getChirps';
	Http.open("GET", url);
	Http.send();

	Http.onreadystatechange = (e) => {
		chirpFeed.chirps = [];
		idCount = 0;
		for  (let thisChirp of JSON.parse(Http.responseText)) {
			chirpFeed.chirps.push({id: idCount, user: thisChirp.user, message: thisChirp.body});
			idCount++;
		}
	}
}

updateFeed();