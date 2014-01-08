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
	function login() {  
		var model = new cfd.models.auth({
        	action: 'login'
		});
        
        model.save();		    
	}		
	
	return {
		login: login
	};
}();

$(document).ready(function () {
	
	$(document).foundation(); 
	
	cfd.init();
	
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
	
	//$('#registerButton').click(cfd.login.registerClick);
	
	//$('#resetButton').click(cfd.login.resetClick);
});