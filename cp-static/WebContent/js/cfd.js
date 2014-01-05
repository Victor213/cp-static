var cfd = function () {	
	var config = {
		serverURL: 'http://localhost:8080'
	};
	
	function init(authString) {
		var authHash = window.btoa(authString);
		
		$.ajaxSetup({
			headers: {
				Authorization: 'Basic ' + authHash
			}
		});
	}
	
	var RegistrationModel = Backbone.Model.extend({
		url: config.serverURL,
		defaults: {
			regFname: '',
			regLname: '',
			regHeardHow: 0
		}
	});
	
	var AuthModel = Backbone.Model.extend({
		url: config.serverURL,
		defaults: {
			action: ''
		}
	});
	
	return {
		AuthModel: AuthModel,
		RegistrationModel: RegistrationModel,
		config: config,
		init: init
	};
}();

