$(document).ready(function() {

	console.log("Document ready");
	//check for token if created
	console.log(sessionStorage.getItem("token"));
	sessionStorage.setItem("token", null);
	console.log(sessionStorage.getItem("token"));
	
	$(".registerBlock").hide();
	$("#login-error").hide();
	$("#register-error").hide();

	//LOG IN/SIGN IN BUTTON
    //when login "sign in" is clicked, take user's email and password
    $(".login").on("click", function(){    	
    	//prevent form from submitting automatically
    	event.preventDefault();

    	//store email and password in data to be posted to db
    	var email = $("#login-email").val().toLowerCase().trim();
    	var password = $("#login-password").val().trim();
    	console.log(email + " " + password);

    	var data = {
    		email: email,
    		password: password
    	};

    	if (data.name !== "" && data.email !== "" && data.password !== "") {

	    	$.ajax({
	    		url:"/login",
	    		type:"post",
	    		data: data
	    	}).then(function(result) {
	    		if (result === "THERE WAS A HUGE ERROR!") {
					$("#login-error").show()
					$("#login-error").html("Email and password do not match.")
				}

				//if no error in login, create a token and go to trade page
				else {
					sessionStorage.setItem("token", result);
					window.location = "/trade";
				}
		    })

    	}

    	else {
    		$("#login-error").show();
    		$("#login-error").html("Please fill in the missing fields.");
    	}
	});

    //NEW USER BUTTON
	$(".newUser").on("click", function(){    	
    	event.preventDefault();

    	$("#register-error").hide();
    	$("#login-error").hide();
    	$(".registerBlock").show();
    	$(".signInBlock").hide();
	});

    //REGISTER BUTTON
    //when "register" is clicked, take user's name, email, and password
	$(".registerButton").on("click", function(){
		
		console.log("You clicked register.");
		event.preventDefault();

		var name = $("#register-name").val().trim();
		var email = $("#register-email").val().toLowerCase().trim();
		var password = $("#register-password").val().trim();

		var data = {
			name: name,
			email: email,
			password: password
		};

		//DATA VALIDATION / MISSING FIELDS
		if (data.name !== "" && data.email !== "" && data.password !== "") {
			
			$.ajax({
				url: "/register", 
				method: "post",
				data: data
			}).then(function(result) {

				console.log(result);

			//EMAIL VALIDATION
			//if email already exists, error message says it already exists
			if (result === "emailError") {
				$('#register-error').show();
				$('#register-error').html("We already have this email in our system.");
			}

			//general error
			else if (result === "error") {
				$('#register-error').show();
				$('#register-error').html("There was an error. Try again!");
			}

			//input isn't in email format
			else if (result === "invalidEmail") {
				$('#register-error').show();
				$('#register-error').html("We don't recognize this as an email.");
			}

			//create token and go to trade page
			else {
				sessionStorage.setItem("token", result.token);
				window.location = "/trade";
			}
			})
		}

		else {
			$("#register-error").show();
			$("#register-error").html("Please fill in the missing fields.");
		}
	});

	//X BUTTON
	$(".exitRegister").on("click", function(){
		
		event.preventDefault();

		$("login-error").hide();
		$("#register-error").hide();
		$(".registerBlock").hide();
		$(".signInBlock").show();
	});
});
