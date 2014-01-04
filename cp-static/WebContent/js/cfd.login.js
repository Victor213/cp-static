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
		
	function loginClick() {        
        cfd.init($('#email').val() + ':' + $('#password').val());

        var auth = new cfd.AuthModel({
        	action: 'login'
    	});

        auth.save();		    
	}		
	
	function registerClick() {
		cfd.init($('#regEmail').val() + ':' + $('#regPassword').val());
		
		var reg = new cfd.RegistrationModel({
			regFname: $('#regFname').val(),
			regLname: $('#regLname').val(),
			regHeardHow: $('#regHeardHow').val()
    	});

		reg.save();
	}
	
	function resetClick() {        
        cfd.init($('#email').val() + ':asdf');

        var auth = new cfd.AuthModel({
        	action: 'reset'
    	});

        auth.save();		    
	}
	
	return {
		loginClick: loginClick,
		registerClick: registerClick,
		resetClick: resetClick
	};
}();

$(document).ready(function () {
	
	$(document).foundation();  
	
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
   	
	$('#loginButton').click(cfd.login.loginClick);
	
	$('#registerButton').click(cfd.login.registerClick);
	
	$('#resetButton').click(cfd.login.resetClick);
});