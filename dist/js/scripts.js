if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js')
		.then(reg => console.log('service worker registered'))
		.catch(err => console.log('service worker not registered', err));
}

const capitalize = (str)=> str.charAt(0).toUpperCase() + str.substring(1);


fetch('data/types.json')
	.then(response => response.json())
	.then(json => {
		// console.log(json);
		for(type of json) {
			let btn = document.createElement('button');
			btn.innerText = capitalize(type.name);
			btn.classList = `btn ${type.name}`;
			document.getElementById('type-btns').appendChild(btn);
			btn.onclick = ()=> {
				handleClick(btn.classList[1]);
			};
		}
	});

let currentType1, currentType2;
let recentlyChangedType;

function handleClick(type) {
	if(!currentType1) {
		currentType1 = type;
		recentlyChangedType = 1;
	} else if(!currentType2) {
		currentType2 = type;
		recentlyChangedType = 2;
	} else {
		if(recentlyChangedType==1) {
			currentType2 = type;
			recentlyChangedType = 2;
		} else {
			currentType2 = type;
			recentlyChangedType = 2;
		}
	}
}

// fetch('../data/pokedex.json')
// 	.then(response => response.json())
// 	.then(json => {
// 		console.log(json);
// 	});