import { createWebHashHistory, createRouter } from 'vue-router';

import Home from './pages/Home.vue';
import Error from './pages/404.vue';

import LeftCenterRandom from './pages/left-center-random/LeftCenterRandom.vue';
import SimpleProgression from './pages/simple-progression/SimpleProgression.vue';

const routes = [
	{ path: '/', component: Home },
	{ path: '/lcr', component: LeftCenterRandom },
	{ path: '/chords', component: SimpleProgression },
	{ path: '/:pathMatch(.*)*', name: '404', component: Error }
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;