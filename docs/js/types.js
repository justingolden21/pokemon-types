const TYPE_DATA = [
	{name: "normal", eff: "111115105111111111", color: "A8A878"},
	{name: "fighting", eff: "215512502111152125", color: "C03028"},
	{name: "flying", eff: "121115215112511111", color: "A890F0"},
	{name: "poison", eff: "111555150112111112", color: "A040A0"},
	{name: "ground", eff: "110212512215211111", color: "E0C068"},
	{name: "rock", eff: "152151215211112111", color: "B8A038"},
	{name: "bug", eff: "155511155512121125", color: "A8B820"},
	{name: "ghost", eff: "011111121111121151", color: "705898"},
	{name: "steel", eff: "111112115551512112", color: "B8B8D0"},
	{name: "fire", eff: "111115212552112511", color: "F08030"},
	{name: "water", eff: "111122111255111511", color: "6890F0"},
	{name: "grass", eff: "115522515525111511", color: "78C850"},
	{name: "electric", eff: "112101111125511511", color: "F8D030"},
	{name: "psychic", eff: "121211115111151101", color: "F85888"},
	{name: "ice", eff: "112121115552115211", color: "98D8D8"},
	{name: "dragon", eff: "111111115111111210", color: "7038F8"},
	{name: "dark", eff: "151111121111121155", color: "705848"},
	{name: "fairy", eff: "121511115511111221", color: "EE99AC"}
];

const TYPE_NAMES = 'normal fighting flying poison ground rock bug ghost steel fire water grass electric psychic ice dragon dark fairy'.split(' ');

const getColor = typeName => TYPE_DATA.find(t => t.name==typeName).color;

// input string, output float
function getSingleMatchup(attackType, defendType) {
	const atk = TYPE_DATA.find(t => t.name==attackType);
	const defIdx = TYPE_DATA.findIndex(t => t.name==defendType);
	const matchup = atk.eff[defIdx];

	if(matchup==0) return 0.390625; // 25/64
	if(matchup==5) return 0.625; // 5/8
	if(matchup==2) return 1.6; // 8/5
	return 1;
}

function getDoubleMatchup(attackType, defendType1, defendType2) {
	return getSingleMatchup(attackType, defendType1) * getSingleMatchup(attackType, defendType2);
}

function getMatchup(attackType, defendType1, defendType2) {
	if(defendType1 == '') return round(getSingleMatchup(attackType, defendType2));
	if(defendType2 == '') return round(getSingleMatchup(attackType, defendType1));
	return  round(getDoubleMatchup(attackType, defendType1, defendType2)  );
}

// round to 3 places
function round(n) {
	return Math.round(n * 1000) / 1000;
}