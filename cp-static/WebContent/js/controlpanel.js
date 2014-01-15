var CFD = function () {        
        var config = {
                        application: {
                                movieWidth:400,
                                movieHeight:300
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
                if (e.preventDefault) {
                        e.preventDefault();
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
                        //heartbeat();
                        
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
                        notifyUser('Success', 'Ticket received. We will email you ASAP regarding your issue.');
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
        
        function resetPassword () {
                var passwordResetValidator, userObject;
                passwordResetValidator = $("#passwordResetForm").validate({        
                        rules: {
                                password: { required: true, minlength: 8, maxlength: 40, remote: { url: "/ajax/isPasswordOK", data: { product: function () {
                                        return $("#password").val();
                                } } } },
                                confirmPassword: { required: true, equalTo: "#password" }
                        },
                        messages: {
                                password: { required: "Please enter a password", minlength: "Password must be at least 8 characters long", remote: "Password should contain: <li>At least one upper case character <li>At least one lower case character <li>At least one number <li>And may not contain any of the following: \\;-\")(&*='|$" },
                                confirmPassword: { required: "Please confirm your password", equalTo: "The passwords do not match" }
                        },
                        onkeyup: false
                });
        
                if (passwordResetValidator.form()) {
                        userObject = new User();
                        userObject.password = $("#password").val();
        
                        $.ajax({
                                type: "POST",
                                url: "/ajax/rest/user/reset/password/",
                                dataType: "json",
                                data: JSON.stringify(userObject),
                                success: function (response) {
                                        if (response !== null) {
                                                notifyUser('Success', 'Password changed');
                                        } else {
                                                notifyUser('Error', 'Password change failed');
                                        }
                                },
                                error: ajaxErrorHandler
                        });
                }
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

        //CFD.init();
        
        $('.modalLink').click(function (e) {
                CFD.stopLink(e);
                $('#modal_' + e.target.id.slice(10)).foundation('reveal', 'open');
        });
        
        $('.helpLink').click(function (e) {
                CFD.stopLink(e);
                $('#' + CFD.config.DIVs.helpDisplay).html('<br />' + $('#helpContents_' + e.target.id.slice(9)).html());
        });
});