
const typeNames = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

// defending type on top, attacking type on side
// 5 means 0.5, or not very effective
const typeData = [
[1,1,1,1,1,1,1,1,1,1,1,1,5,0,1,1,5,1], // normal
[1,5,5,1,2,2,1,1,1,1,1,2,5,1,5,1,2,1], // fire
[1,2,5,1,5,1,1,1,2,1,1,1,2,1,5,1,1,1], // water
[1,1,2,5,5,1,1,1,0,2,1,1,1,1,5,1,1,1], // electric
[1,5,2,1,5,1,1,5,2,5,1,5,2,1,5,1,5,1], // grass
[1,5,5,1,2,5,1,1,2,2,1,1,1,1,2,1,5,1], // ice
[2,1,1,1,1,2,1,5,1,5,5,5,2,0,1,2,2,5], // fighting
[1,1,1,1,2,1,1,5,5,1,1,1,5,5,1,1,0,2], // poison
[1,2,1,2,5,1,1,2,1,0,1,5,2,1,1,1,2,1], // ground
[1,1,1,5,2,1,2,1,1,1,1,2,5,1,1,1,5,1], // flying
[1,1,1,1,1,1,2,2,1,1,5,1,1,1,1,0,5,1], // psychic
[1,5,1,1,2,1,5,5,1,5,2,1,1,5,1,2,5,5], // bug
[1,2,1,1,1,2,5,1,5,2,1,2,1,1,1,1,5,1], // rock
[0,1,1,1,1,1,1,1,1,1,2,1,1,2,1,5,1,1], // ghost
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,5,0], // dragon
[1,1,1,1,1,1,5,1,1,1,2,1,1,2,1,5,1,5], // dark
[1,5,5,5,1,2,1,1,1,1,1,1,2,1,1,1,5,2], // steel
[1,5,1,1,1,1,2,5,1,1,1,1,1,1,2,2,5,1], // fairy
];

// input string output float
function getSingleMatchup(attackType, defendType) {
	const atk = typeNames.indexOf(attackType);
	const def = typeNames.indexOf(defendType);

	const matchup = typeData[atk][def];
	if(matchup==0) return 0.390625; // 25/64
	if(matchup==5) return 0.625; // 5/8
	if(matchup==2) return 1.6; // 8/5
	return 1;
}

function getDoubleMatchup(attackType, defendType1, defendType2) {
	return getSingleMatchup(attackType, defendType1) * getSingleMatchup(attackType, defendType2);
}

function getMatchup(attackType, defendType1, defendType2) {
	if(defendType1 == '') return round(getSingleMatchup(attackType, defendType2) );
	if (defendType2 == '') return round(getSingleMatchup(attackType, defendType1) );
	return  round(getDoubleMatchup(attackType, defendType1, defendType2)  );
}

// round to 3 places
function round(n) {
	return Math.round(n * 1000) / 1000;
}