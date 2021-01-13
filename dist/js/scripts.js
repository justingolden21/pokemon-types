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
	if(currentType1 == type) {
		currentType1 = '';
		removeActive(type);
	} else if (currentType2 == type) {
		currentType2 = '';
		removeActive(type);
	} else {
		if(!currentType1) {
			changeType(1, type);
		} else if(!currentType2) {
			changeType(2, type);
		} else {
			if(recentlyChangedType == 1) {
				removeActive(currentType2);
				changeType(2, type);
			} else {
				removeActive(currentType1);
				changeType(1, type);
			}
		}
	}
}

function changeType(num, type) {
	if(num == 1) {
		currentType1 = type;
	} else {
		currentType2 = type;
	}
	recentlyChangedType = num;

	addActive(type);
}

function addActive(type) {
	document.querySelector(`.${type}`).classList.add('active');
}
function removeActive(type) {
	document.querySelector(`.${type}`).classList.remove('active');
}

// fetch('../data/pokedex.json')
// 	.then(response => response.json())
// 	.then(json => {
// 		console.log(json);
// 	});