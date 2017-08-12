/* global Module */

/* Magic Mirror
 * Module: Hide All
 *
 * MIT Licensed.
 */

Module.register("sleepr",{

	defaults: {
        // Allow the module to force modules to be shown (if hidden and locked by another module ex. profile-switcher).
        //allowForce: false,
		// The speed of the hide and show animation.
		animationSpeed: 1000,
		// Sleeping Message
		sleeping: "I'm asleep, did you want me to \"Wake Up\"?",
		// Awake Message
		awake: "I'm awake, did you want me to go to \"Sleep\"?"
    },

    start: function(){
    	this.asleep = false;
    },

	toggleSleep: function(action){
		var modules = MM.getModules();

		if  (this.asleep) {
			if (action === "sleep"){
				document.getElementById(this.identifier).innerHTML = this.config.sleeping;				
				if (!timeout) {
					this.show(this.config.animationSpeed);
					var timeout = setTimeout(function () {this.hide(this.config.animationSpeed);}.bind(this), this.config.animationSpeed+1000);
				}
				return;
			} else {
				for (var i = 0; i < modules.length; i++) {
					if  (modules[i].name !== "sleepr") {
							modules[i].show(this.config.animationSpeed);
					}
				}
				this.asleep = false;
			}
		} else {
			if (action === "wake"){
				if (timeout) {
					clearTimeout(timeout);
				}
				document.getElementById(this.identifier).innerHTML = this.config.awake;
				if (!timeout) {
					this.show(this.config.animationSpeed);
					var timeout = setTimeout(function () {this.hide(this.config.animationSpeed);}.bind(this), this.config.animationSpeed+1000);
				}
				return;
			} else {
				for (var i = 0; i < modules.length; i++) {
					if  (modules[i].name !== "sleepr") {
							modules[i].hide(this.config.animationSpeed);
					}
				}
				this.asleep = true;
			}
		}
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = "&nbsp;";
		return wrapper;
	},

	notificationReceived: function(notification) {
		if (notification === "DOM_OBJECTS_CREATED") {
			this.hide();
		}
		if (notification === "SLEEP") {
			this.toggleSleep("sleep");
		}
		if (notification === "WAKEUP") {
			this.toggleSleep("wake");
		}
	},
});
