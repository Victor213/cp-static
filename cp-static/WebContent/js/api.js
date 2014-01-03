var AuthModel = Backbone.Model.extend({
	urlRoot: '/auth',
	defaults: {
		email: '',
	}
});

var UserModel = Backbone.Model.extend({
	urlRoot: '/user',
	defaults: {
		email: '',
		password: ''
	}
});

