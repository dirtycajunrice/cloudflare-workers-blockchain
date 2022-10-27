import { update } from './update';

addEventListener('fetch', event => {
	return event.respondWith(update())
});

addEventListener('scheduled', event => {
	event.waitUntil(update());
});