var cfd = function () {	
	var config = {
		serverURL: 'http://localhost/app/',
		authToken: ''
	}, 
	models = {
		token: '', 
		reg: ''
	},
	isInitOk = false;

	function init() {
		var storedToken;
		
		storedToken = readCookie('cfdToken');
		
		// If the client has an existing cookie
		if (storedToken !== null) {			
			// Read the cookie and populate the token model
			// Test that this token model is still good by POSTing it to the server and seeing if it gets a 200
			// If fail, blank the token model
		}
		
		/*
		 * Must be last statement of init because it's async and initializing=false 
		 * is in the success callback
		 */
		$.get(config.serverURL, discoverSuccess, 'json');		
	}
		
	function discoverSuccess(rsp) { 
		for (var i = 0; i<rsp.links.length; i++) {
			var link = rsp.links[i];

			if (link.rel === 'token') {
				models.token = Backbone.Model.extend({ urlRoot: link.href });
			}
			
			if (link.rel === 'user') {			
				models.user = Backbone.Model.extend({ urlRoot: link.href });
			}
			
		}
		
		isInitOk = true;
	}
	
	function logout() {
		// assert init is done
		// DELETE token model
		// if OK, delete cookie
	}
	
	function createCookie(name,value,hours) {
		var date, expires = '';
		if (hours) {
			date = new Date();
			date.setTime(date.getTime()+(hours*60*60*1000));
			expires = "; expires="+date.toGMTString();
		}
		document.cookie = name+"="+value+expires+"; path=/";
	}
	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	function assertInitOk() {
		return isInitOk;
	}
	
	function assertFormOk($form) {
		validForm = false;
		
		$form
		.on('valid', function () {
			validForm = true; 
		})
		.on('invalid', function () {
			validForm = false;
		});
		
		$form.submit();
		
		return validForm;
	}
	
	return {
		init: init,
		models: models,
		assertInitOk: assertInitOk,
		assertFormOk: assertFormOk,
		logout: logout
	};
}();