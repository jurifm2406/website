export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11')
];

export const server_loads = [3,2];

export const dictionary = {
		"/(private)": [8,[3]],
		"/(admin)/admin": [4,[2]],
		"/(admin)/admin/graph": [~5,[2]],
		"/(private)/graph": [~9,[3]],
		"/(login)/login": [~6],
		"/(login)/login/admin": [~7],
		"/(private)/logout": [~10,[3]],
		"/(private)/rummy": [11,[3]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';