# Sleepr
A Magic Mirror 2 Module for sending to sleep and waking up all modules via notifications. Works with Alex Yak's voice control (https://github.com/alexyak/voicecontrol) and PtrBld's MMM-Button (https://github.com/ptrbld/MMM-Button).

## Using the module

This module adds hiding and showing functionality to exisiting control modules. Eg Alex Yak's voice control

As long as the control module (voice control, button, touchscreen menu, Project Soli) uses the function sendNotification("SLEEP", {type: "notification"}); or sendNotification("WAKEUP", {type: "notification"}); this module will hide or unhide all the modules respectively.

## Installing the module
Once you have your control module set up. Eg Alex Yak's voice control (https://github.com/alexyak/voicecontrol).

Navigate to your Magic Mirror's modules folder in a terminal (default: ~/MagicMirror/modules)
`cd ~/MagicMirror/modules`

Use git to clone the files in to your Magic Mirror's modules folder then enter that directory.
`git clone https://github.com/skarard/sleepr.git && cd sleepr`

Copy the two voice models (\*.pmdl) files into your Magic Mirror directory (default: ~/MagicMirror). Note: It is best to train your own see Voice Training below.
`cp voicemodels/*.pmdl ~/MagicMirror` -- Editor note **************Double check *****************

Edit the config.js file (Ctrl  + w to save):
`nano ~/MagicMirror/config/config.js`

Add this to the modules array in the `config/config.js`:
````javascript
		{
			module: "sleepr",
			position: "lower_third",
			config: {
				// The speed of the hide and show animation.
				animationSpeed: 1000,
				// Sleeping Message - Hint at the keyword
				sleeping: "I'm asleep, did you want me to \"Wake Up\"?",
				// Awake Message - Hint at the keyword
				awake: "I'm awake, did you want me to go to \"Sleep\"?"
			}
		},
````

Restart the program (default: pm2 restart MagicMirror)
`pm2 restart MagicMirror`

## Voice Training
In my use case, I set up Alex Yak's voice control (https://github.com/alexyak/voicecontrol) with voice models for sleeping and waking up.

I have added two trained voice models in this repository, although I suggest you train your own.
Sleep: sleep.pmdl (https://snowboy.kitt.ai/hotword/1395)
Wake-up: wakeup.pmdl (https://snowboy.kitt.ai/hotword/4531)

Here is an example of how I set up Alex Yak's voice control in `config/config.js`.

````javascript
		{
		module: 'voicecontrol',
		position: 'bottom_left',
		config: {
			models: [
					{
						keyword: "wakeup",   // keyword 
						description: "Say \"Wake up\" and the display with wake up.",
						file: "wakeup.pmdl", // trained model file name
						message: "WAKEUP"   // notification message that's broadcast in the MagicMirror app
					},
										{
						keyword: "sleep",   // keyword 
						description: "Say \"Sleep\" and the display will sleep.",
						file: "sleep.pmdl", // trained model file name
						message: "SLEEP"   // notification message that's broadcast in the MagicMirror app
					},
					]
				}
		},
````
