jQuery(function($) {

	//Preloader
	var preloader = $('.preloader');
	$(window).load(function(){
		preloader.remove();
	});

	// Menu	
	$('#header .nav-button').on('click',function(){
		$('#navigation').fadeIn();
	});

	$('#hidemenu').on('click', function(){
		$('#navigation').fadeOut();
	});

	$('.main-nav ul li a').on('click', function(){
		$('#navigation').fadeOut();
	});

	var slider = $('#page-slider .carousel-inner').find('.item');
	$('#page-slider').on('slid.bs.carousel', function () {
		var curIndex 	= slider.filter('.active').index();
		var menuItems 	= $('.main-nav ul').find('li');
		menuItems.removeClass('active').eq(curIndex).addClass('active');
	});

	/**
	//Contact Form
	var form = $('#contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('.form-status');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form_status.find('.form-status-content').html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn();
			}
		}).done(function(data){
			form_status.find('.form-status-content').html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});**/

});
/*
 * e-mail
 * */
$(document).ready(function () {
	$('form.form-email').submit(function (e) {
		if (e.preventDefault) e.preventDefault();
		else e.returnValue = false;

		var thisForm = $(this).closest('form.form-email');
		var submitButton = thisForm.find('button');
		submitButton.prop("disabled", true);
		var emailField = thisForm.find('.form-input-email');
		var nameField = thisForm.find('.form-input-name');
		var messageField = thisForm.find('.form-input-message');
		var subbjectField = thisForm.find('.form-input-subject');

		if (thisForm.attr('data-form-type').indexOf("nob") > -1) {
			// Nob form

			// document.getElements
			var sendFrom = emailField.val(),
				sendTo = "michael511.mp@gmail.com",
				subject = "Message from: " + nameField.val() + " ,Subject: " + subbjectField.val(),
				msg = messageField.val(),
				msgHTML = "<em>" + messageField.val()+ "<em>",
				fromName = "WithUFM Web Contact Us: " + nameField.val(),
				toName = "WithUFM Web";

			var sendData = JSON.stringify({
				'sendFrom': sendFrom,
				'fromName': fromName,
				'sendTo': sendTo,
				'toName': toName,
				'subject': subject,
				'msg': msg,
				'msgHTML': msgHTML
			});

			$.ajax({
				url: 'email/email.php',
				crossDomain: false,
				data: sendData,
				method: "POST",
				cache: false,
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				
				success: function (data) {
					// Deal with JSON
					console.log(data);
					var returnData = JSON.parse(data);
					submitButton.removeClass("btn-primary");
					if (returnData.success) {
						// Throw success msg
						emailField.val("");
						nameField.val("");
						messageField.val("");
						submitButton.html("Received");
						submitButton.addClass("btn-success");
					} else {
						// Throw error message
						submitButton.html("Sorry an error occured1");
						submitButton.addClass("btn-danger");
					}
					submitButton.prop("disabled", false);
				},
				error: function (error) {
					console.log(error);
					// Throw error message
					submitButton.html("Sorry an error occured2");
					submitButton.removeClass("btn-primary");
					submitButton.addClass("btn-danger");
					submitButton.prop("disabled", false);
				}
			});
		}
	});
});