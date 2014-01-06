var cfd = function () {	
	var config = {
		serverURL: 'http://localhost/app'
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
		url: config.serverURL + '/reg',
		defaults: {
			regFname: '',
			regLname: '',
			regHeardHow: 0
		}
	});
	
	var AuthModel = Backbone.Model.extend({
		url: config.serverURL + '/auth',
		defaults: {
			action: ''
		}
	});
	
	var UserModel = Backbone.Model.extend({
		url: config.serverURL + '/user',
		defaults: {
			email: '',
			fName: '',
			lName: '',
			heardHow: 0,
			isDeleted: 0
		}
	});
	
	return {
		AuthModel: AuthModel,
		RegistrationModel: RegistrationModel,
		UserModel: UserModel,
		config: config,
		init: init
	};
}();

