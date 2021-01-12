if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js')
		.then(reg => console.log('service worker registered'))
		.catch(err => console.log('service worker not registered', err));
}

const capitalize = (str)=> str.charAt(0).toUpperCase() + str.substring(1);

// fetch('../data/pokedex.json')
// 	.then(response => response.json())
// 	.then(json => {
// 		console.log(json);
// 	});

fetch('../data/types.json')
	.then(response => response.json())
	.then(json => {
		// console.log(json);
		for(type of json) {
			// console.log(type);
			// console.log(type.name);
			// console.log(type.color);


	// 		console.log(`
	// .btn.${type.name} {
	// 	border: 2px solid #${type.color};
	// 	color: #000;
	// }
	// .btn.${type.name}:hover {
	// 	background-color: #${type.color};
	// 	color: #FFF;
	// }
	// .btn.${type.name}:focus {
	// 	--tw-ring-shadow: 0 0 0 2px #${type.color}44;
	// }`);

			let btn = document.createElement('button');
			btn.innerText = capitalize(type.name);
			btn.classList = `btn mx-2 my-1 ${type.name}`;
			document.getElementById('type-btns').appendChild(btn);
		}
	});
