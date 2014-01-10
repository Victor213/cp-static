/*
 * Registration, send password clear text to server.  store as salted pbkdf2, bcrypt or scrypt hash
 */

/*
 * Attempt to authenticate:
 * javascript takes user id and pwd and sends an 
 */

/*
 * All API calls should include a one time unix epoch timestamp nonce.  Server refutes any nonce within 60 seconds of server time.
 */

cfd.login = function () {
	var config = {
		srvrDownMsg : 'We\'re sorry, the server did not respond. Please try again.',
		wrongCredsMsg: 'User name or password incorrect',
		regFailMsg: 'We\'re sorry, registration failed. Please try again.'
	};
	
	
	function addBasicAuth(authHash) {
		$.ajaxSetup({
			headers: {
				Authorization: 'Basic ' + authHash
			}
		});
	}
	
	function login() {  
		var $loginMsgDiv = $('#loginMessage'), model;

		if (!cfd.assertFormOk($('#loginForm'))) {
			return;
		}	
		
		if (!cfd.assertInitOk()) {
			$loginMsgDiv.html(config.srvrDownMsg);
			cfd.init();
			return;
		}
		
		addBasicAuth(window.btoa($('#email').val() + ':' + $('#password').val()));
	
		model = new cfd.models.token({
			token: '',
			expires: ''
		});
		
        model.fetch(null, { 
			success: function(model, response, options) {
				alert('You logged in!');
			},
			error: function(model, xhr, options) { 
				var status = xhr.status;
				if (status === '401') {
					$loginMsgDiv.html(config.wrongCredsMsg);
				} else {
					$loginMsgDiv.html(config.srvrDownMsg);
				}
			}
        });    
	}	
	
	function register() {
		var $regMsgDiv = $('#registrationMessage'), model;
		
		if (!cfd.assertFormOk($('#registerForm'))) {
			return;
		}	
		
		if (!cfd.assertInitOk()) {
			$regMsgDiv.html(config.regFailMsg);
			cfd.init();
			return;
		}
		
		addBasicAuth(window.btoa($('#regEmail').val() + ':' + $('#regPassword').val()));
		
		model = new cfd.models.user({
			fName: $('#regFname').val(),
			lName: $('#regLname').val(),
			heardHow: $('#regHeardHow').val()
		});
		
		model.save(null, { 
			success: function(model, response, options) {
				alert('You registered!');
			},
			error: function(model, xhr, options) { 
				$regMsgDiv.html(config.regFailMsg);
			}
        }); 
	}
	
	return {
		login: login,
		register: register
	};
}();

$(document).ready(function () {
	
	$(document).foundation(); 
	
	cfd.init();
	cfd.logout();
	
	$('#email').keyup(function (e) {
		if (e.keyCode == 13) {
			$('#loginButton').click();
		}
	});
	
	$('#password').keyup(function (e) {
		if (e.keyCode == 13) {
			$('#loginButton').click();
		}
	});

	$('#loginButton').click(cfd.login.login);
	
	$('#registerButton').click(cfd.login.register);
	
	//$('#resetButton').click(cfd.login.resetClick);
});