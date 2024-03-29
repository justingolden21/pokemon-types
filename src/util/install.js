// Copied from Desktop Clock

import { writable } from 'svelte/store';

export const showInstallButton = new writable(false);

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

export function setupInstall() {
	// https://web.dev/customize-install/

	window.addEventListener('beforeinstallprompt', (e) => {
		// Prevent the mini-infobar from appearing on mobile
		e.preventDefault();

		// Stash the event so it can be triggered later.
		deferredPrompt = e;

		// Update UI notify the user they can install the PWA
		showInstallButton.set(true);

		console.log("'beforeinstallprompt' event was fired.");
	});

	window.addEventListener('appinstalled', () => {
		// Hide the app-provided install promotion
		showInstallButton.set(false);

		// Clear the deferredPrompt so it can be garbage collected
		deferredPrompt = null;

		console.log('PWA was installed');

		// Ignore if the page is hidden
		if (document.visibilityState !== 'visible') return;
	});
}

export async function installButtonClick() {
	console.log(deferredPrompt);

	// Show the install prompt
	deferredPrompt.prompt();

	// Wait for the user to respond to the prompt
	const { outcome } = await deferredPrompt.userChoice;

	console.log(`User response to the install prompt: ${outcome}`);

	// We've used the prompt, and can't use it again, throw it away
	deferredPrompt = null;
}
