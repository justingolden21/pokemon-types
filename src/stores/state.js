import localStore from '../util/localStore';

export const defaultState = {
	types: ['', ''],
	weather: 'none',
	pokemon: ''
};

export const state = localStore('state', JSON.parse(JSON.stringify(defaultState)));
