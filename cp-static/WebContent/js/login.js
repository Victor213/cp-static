/*global $, document */

$(document).ready(function () {
	
	$(document).foundation();  

	$("#loginForm").validate({
		rules: {
			email: { required: true, minlength: 6, maxlength: 40 },
			password: { required: true, minlength: 8, maxlength: 40 }
		},
		messages: { 
			email: { required: "Please enter an email address", minlength: "Email address must be at least 6 characters long" },
			password: { required: "Please enter a password", minlength: "Password must be at least 8 characters long" }
		}
	});
   
	$("#registerForm").validate({	
		rules: {
			username: { required: true, minlength: 6, maxlength: 40, remote: { url: "/service/checkEmail", data: { product: function () { return $("#username").val();  } } } },
			password: { required: true, minlength: 8, maxlength: 40, remote: { url: "/service/checkPassword", data: { product: function () { return $("#password").val();  } } } },
			confirmPassword: { required: true, equalTo: "#password" },
			fName: { required: true, minlength: 1, maxlength: 40, remote: { url: "/service/checkName", data: { product: function () { return $("#fName").val();  } } } },
			lName: { required: true, minlength: 1, maxlength: 40, remote: { url: "/service/checkName", data: { product: function () { return $("#lName").val();  } } } },
			heardHow: { required: true }
		}, 
		messages: { 
			username: { required: "Please enter an email address", minlength: "Email address must be at least 6 characters long", remote: "This email address is taken or invalid" },
			password: { required: "Please enter a password", minlength: "Password must be at least 8 characters long", remote: "Password should contain: <li>At least one upper case character <li>At least one lower case character <li>At least one number <li>And may not contain any of the following: \\;-\")(&*='|$" },
			confirmPassword: { required: "Please confirm your password", equalTo: "The passwords do not match" },
			fName: { required: "First name is required", remote: "Names may not contain any of the following: `\\!#$%^&*()~{[}]|\"'<>?/-" },
			lName: { required: "Last name is required", remote: "Names may not contain any of the following: `\\!#$%^&*()~{[}]|\"'<>?/-" },
			heardHow: { required: "How you heard about us is required" }
		}
	});

	$("#resetForm").validate({	
		rules: {
			email: { required: true, minlength: 6, maxlength: 40 }
		},
		messages: { 
			email: { required: "Please enter an email address", minlength: "Email address must be at least 6 characters long" }
		}
	});
	
	$('#loginButton').click(function() {
	    $("#loginForm").submit();
	});
	
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

	$('#registerButton').click(function() {
	    $("#registerForm").submit();
	});
	
	$('#resetButton').click(function() {
	    $("#resetForm").submit();
	});
	
});