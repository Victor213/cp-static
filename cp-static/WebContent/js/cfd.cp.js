cfd.cp = function () {	
	var config = {
			application: {
				serverURL: 'http://localhost:8080'
			},
			DIVs: {
				aNetMessage: 'aMsg',
				ticketMessage: 'tMsg',
				pwdMessage: 'pMsg',
				messageAlertBox: 'messageAlertBox',
				messageTextBox: 'messageText',
				messageModal: 'messageModal',
				helpDisplay: 'helpDisplay',	
				siteDisplay: 'siteDisplay'
			}		
		},
		globalIntervals = 0;
	
	function stopLink (e) {
		// IE
		if (e.cancelBubble) {
			e.cancelBubble = true;
		}
		
		// Firefox
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		
		// Others
		if (e.defaultPrevented) {
			e.defaultPrevented();
		}
	}
	
	function ajaxErrorHandler (jqXHR, textStatus) {
		"use strict";
		
		if (textStatus === 'error') {
			window.setTimeout(function () {
				window.location = '/do/login';
			}, 7000);
		}
	}
	
	function heartbeat () {
		$.ajax({
			type: "GET",
			url: "/service/heartbeat",
			error: ajaxErrorHandler
		});	
	}
	
	function notifyUser (alertType, text) {
		"use strict";
		
		var $msgBox = $('#' + config.DIVs.messageAlertBox);
		
		if (alertType === 'Success') {
			$msgBox.addClass('success');
		} else if (alertType === 'Error' || alertType === 'Alert') {
			$msgBox.addClass('alert');
		}
		
		$msgBox.html(alertType);
		$('#' + config.DIVs.messageTextBox).html(text);
		$('#' + config.DIVs.messageModal).foundation('reveal', 'open');
	}
	
	function globalRefresh () {
		"use strict";
		
		// Every three seconds
		if (globalIntervals % 3 === 0) {
			// Display the cart contents
		}
		
		if (globalIntervals % 7 === 0) {
			// Reload the team select box
		}
		
		if (globalIntervals % 60 === 0) {
			// Stay'n alive
			heartbeat();
			
			// Restart the counting
			globalIntervals = 0;
		}
	
		globalIntervals ++;
	}
	
	function checkMsgs () {
		"use strict";
		var aMsg = $('#' + config.DIVs.aNetMessage).html(),
			tMsg = $('#' + config.DIVs.ticketMessage).html(),
			pMsg = $('#' + config.DIVs.pwdMessage).html();
		
		// First priority
		if (aMsg === '1') {
			notifyUser('Alert', 'We\'re sorry, the credit card was declined');
		} else if (aMsg === '2') {
			if (document.getElementById(config.DIVs.siteDisplay).children.length === 1) {
				$(document).foundation('joyride', 'start');
			} else {
				notifyUser('Success', 'Payment processed, your site is building now');
			}			
		}
		
		// Second priority
		if (aMsg === '0' && tMsg === '1') {
			notifyUser('Success', 'Ticket received.  We will email you ASAP regarding your issue.');
		}
		
		// Third priority
		if (aMsg === '0' && tMsg === '0' && pMsg === '1') {
			$('#passwordResetModal').foundation('reveal', 'open');
			$('#password').focus();
		}
	}
	
	function clearFields () {
		$('#x_card_num').val('');
		$('#x_exp_date').val('');
	}
	
	function init () {
		"use strict";
		setInterval(globalRefresh, 500);
		checkMsgs();
		clearFields();		
	}
	
	return {
		config: config,
		init: init,
		resetPassword: resetPassword,
		stopLink: stopLink
	};
}();

$(document).ready(function () {
	"use strict";
	
	$(document).foundation();

	/**
	 * The following pattern was added to foundation.min.js ... it could not be added here
	 * expdate:/(0[1-9]|1[012])-(19|20)\d\d/
	 */

	cfdCp.init();
	
	$('.modalLink').click(function (e) {
		cfdCp.stopLink(e);
		$('#modal_' + e.target.id.slice(10)).foundation('reveal', 'open');
	});
	
	$('.helpLink').click(function (e) {
		cfdCp.stopLink(e);
		$('#' + cfdCp.config.DIVs.helpDisplay).html('<br />' + $('#helpContents_' + e.target.id.slice(9)).html());
	});
});