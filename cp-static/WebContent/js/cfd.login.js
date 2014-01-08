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
			authResource: ''
		};
	
	function discoverSuccess() {
		
	}
	
	function discoverAPI() {
		$.post(	cfd.config.serverURL, discoverSuccess, 'json' )
			.fail(function() {
				alert( "error" );
			});
	}
	
	function loginClick() {  
		var model;
        cfd.init($('#email').val() + ':' + $('#password').val());
        
        model = new cfd.AuthModel({
        	action: 'login'
		});
        
        model.save();		    
	}		
	
	function registerClick() {
		var model;
		cfd.init($('#regEmail').val() + ':' + $('#regPassword').val());
		
		model = new cfd.RegistrationModel({
			regFname: $('#regFname').val(),
			regLname: $('#regLname').val(),
			regHeardHow: $('#regHeardHow').val()
		});

		model.save();
	}
	
	function resetClick() {  
		var model;
		cfd.init($('#email').val() + ':');
		
		model = new cfd.AuthModel({
        	action: 'reset'
		});

        model.save();	
	}
	
	function testREST() {
		var model;
		cfd.init($('#email').val() + ':');
		
		/*
		 * POST, create

		model = new cfd.UserModel({
			email: 'test@example.com',
			fName: 'Test',
			lName: 'Dude',
			heardHow: 21,
			isDeleted: 0
		});

		model.save();
		*/
		model = new cfd.UserModel({ id: 1 });
		model.fetch();
		console.log(model.email);
	}
	
	return {
		discoverAPI: discoverAPI,
		loginClick: loginClick,
		testREST: testREST,
		registerClick: registerClick,
		resetClick: resetClick
	};
}();

$(document).ready(function () {
	
	$(document).foundation(); 
	
	cfd.login.discoverAPI();
	
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
	
	//$('#resetButton').click(cfd.login.resetClick);
	$('#resetButton').click(cfd.login.testREST);
});