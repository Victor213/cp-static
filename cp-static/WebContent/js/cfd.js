var cfd = function () {	
	var config = {
		serverURL: 'http://localhost:8080'
	};
	
	function init(authString) {
		var authHash = window.btoa(authString),
			oldBackboneSync = Backbone.sync;
		
		sendAuthentication = function (xhr) {
			xhr.setRequestHeader('Authorization', ("Basic " + authHash));
		};

		Backbone.sync = function( method, model, options ) {
		    options.beforeSend = sendAuthentication;
		    return oldBackboneSync.apply(this, [method, model, options]);
		};
	}
	
	var RegistrationModel = Backbone.Model.extend({
		urlRoot: config.serverURL,
		defaults: {
			regFname: '',
			regLname: '',
			regHeardHow: 0
		}
	});
	
	var AuthModel = Backbone.Model.extend({
		urlRoot: config.serverURL,
		defaults: {
			email: ''
		}
	});
	
	return {
		AuthModel: AuthModel,
		RegistrationModel: RegistrationModel,
		config: config,
		init: init
	};
}();

