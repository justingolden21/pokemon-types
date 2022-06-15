// Copied from Desktop Clock

import localStore from '../util/localStore';

export const defaultSettings = {
	darkMode: false
};

// deep copy to preserve original defaultSettings
export const settings = localStore('settings', JSON.parse(JSON.stringify(defaultSettings)));
