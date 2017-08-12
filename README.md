# Sleepr
A Magic Mirror 2 Module for sending to sleep and waking up all modules via notifications. Works with Alex Yak's voice control (https://github.com/alexyak/voicecontrol) and PtrBld's MMM-Button (https://github.com/ptrbld/MMM-Button)

## Using the module

This module adds hiding and showing functionality to exisiting control modules. For example Alex Yak's voice control and PtrBld's MMM-Button. 

As long as the control module (voice control, button, touchscreen menu, Project Soli) uses the function sendNotification("SLEEP", {type: "notification"}); or sendNotification("WAKEUP", {type: "notification"}); this module will hide or unhide all the modules respectively.

## Installing the module

Navigate to your Magic Mirror's folder (default: ~/MagicMirror)

To use this module, add it to the modules array in the `config/config.js` file with the following settings:
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
