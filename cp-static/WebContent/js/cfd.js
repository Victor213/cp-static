var cfd = function () {	
	var config = {
		serverURL: 'http://localhost/app/',
		authHref: ''
	}, 
	models = {
		auth: ''
	};
	

	function init() {
		var token, authHash;
		
		token = readCookie('cfdToken');
		
		// Client is not authenticated
		if (token === null) {
			
		} else {
			
		}
		
		authHash = window.btoa();
		
		$.ajaxSetup({
			headers: {
				Authorization: 'Basic ' + authHash
			}
		});
		
		$.get(config.serverURL, discoverSuccess, 'json');		
	}
	
	function discoverSuccess(rsp) { 
		for (var i = 0; i<rsp.links.length; i++) {
			var link = rsp.links[i];
			if (link.rel === 'authentication') {
				config.authHref = link.href;				
				models.auth = Backbone.Model.extend({
					urlRoot: config.authHref,
					defaults: {
						action: ''
					}
				});
			}
		}
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
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	return {
		models: models,
		init: init
	};
}();