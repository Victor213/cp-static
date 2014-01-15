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
		regFailMsg: 'We\'re sorry, registration failed. Please try again.',
		resetOkMsg: 'Your password is in your inbox',
		resetFailMsg: 'We\'re sorry, the password reset failed.  Please try again.'
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
				// TODO Complete login token exchange and redirect
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
			$regMsgDiv.html(config.srvrDownMsg);
			cfd.init();
			return;
		}
		
		addBasicAuth(window.btoa($('#regEmail').val() + ':' + $('#regPassword').val()));
		
		model = new cfd.models.user({
			email: $('#regEmail').val(),
			fName: $('#regFname').val(),
			lName: $('#regLname').val(),
			heardHow: $('#regHeardHow').val()
		});
		
		model.save(null, { 
			success: function(model, response, options) {
				$('#regThankYouModal').foundation('reveal', 'open');
			},
			error: function(model, xhr, options) { 
				$regMsgDiv.html(config.regFailMsg);
			}
        }); 
	}
	
	function reset() {
		var $resetMsgDiv = $('#loginMessage'), model;
		
		if (!cfd.assertFormOk($('#loginForm'))) {
			return;
		}	
		
		if (!cfd.assertInitOk()) {
			$resetMsgDiv.html(config.srvrDownMsg);
			cfd.init();
			return;
		}
		
		model = new cfd.models.reset({
			email: $('#email').val()
		});
		
		model.save(null, { 
			success: function(model, response, options) {
				$resetMsgDiv.html(config.resetOkMsg);
			},
			error: function(model, xhr, options) { 
				$resetMsgDiv.html(config.resetFailMsg);
			}
        }); 
	}
	
	return {
		login: login,
		register: register,
		reset: reset
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
	
	$('#resetButton').click(cfd.login.reset);
});