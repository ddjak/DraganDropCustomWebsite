var token = sessionStorage.getItem("token");

var data = {
	token: token
}

if (token === null) {
	window.location = "/";
}

else {

	var addfile = [];

	Dropzone.options.myDropzone = {
		paramName: "file", //Name that will be used to transfer the file
		maxFilesize: 2, //MB
		//maxFiles: 1,
		dictDefaultMessage: "Drag files here to upload, or click to select one",
		dictFallbackMessage: "Drag files here to upload, or click to select one",
		addRemoveLinks: true,
		dictRemoveFile: "Remove File",
		//hiddenInputContainer: true,
		acceptedFiles: "image/*, .csv, .xlsx, .xls, .pdf",
		capture: "camera",
		useAjax: true,
		/*renameFile: function(file) {
			console.log(file.name);//try to rename file
			//console.log(file.upload.filename);
		},*/
		accept: function(file, done)
        {
        	var qadNumber = $("#qad-number").val().trim();
        	file.name = qadNumber;
            file.postData = {};
            $.ajax({
                url: '/submitpart',
                data: {name: file.name, type: file.type},
                type: 'POST',
                success: function(response)
                {
                	response.name = qadNumber;
                	file.type = file.type;
                	console.log(response)
                	
                    //file.album_id = response.album_id;
                    done();
                },
                error: function(response)
                {
                    done('error preparing the file');
                }
            });
        },
		init: function() { //change addedfile to drop or vice versa?
			console.log("Try later")
			/*this.on("addedfile", function(file) {
				event.preventDefault();



				console.log("BEFORE PUSH: " + addfile.length);
				console.log("adding " + file.name);
				addfile.push(file);
				console.log("AFTER PUSH: " + addfile.length);

				for (var i=0; i<addfile.length; i++) {
					console.log(addfile[i]);
					console.log(addfile[i].upload)
				};
					
					console.log("In TradeJS")
					console.log(file.name)
					//console.log(myDropzone.files)
					//var data = event.target.result;
					//console.log(data)
					$.ajax({
					url:"/partSubmit",
					method:"post",
					data: file.name
					}).then(function(result) {
						console.log("Here")
						console.log(result)
						console.log("HEYHEYHEYYYYYY")
						//console.log(event.target.result);
					})

				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(event) {
					//TODO: code here to upload blob to server then to db
					//Prints out image data url - blob
					

				
				};
				
 
				
			});
			
		}
		/*accept: function(file, done) {
			if (file.name === "justinbieber.jpg") {
				done("Naha, you don't");
			}
			else { done(); }
		}*/
	}	
};
			$("#part-error").hide();
			$(".text-center").hide();
			$(".confirm-audit").hide();
			$(".misclassified").hide();
			$("#part-success").hide();
			$("#part-failure").hide();
			$(".next-part").hide();
		
		$(".submit").on("click", function(){	
						event.preventDefault();
						
						var qad_number = $("#qad-number").val().trim();
						var customer_part_number = $("#excelDrop").val().trim();

						var data = {
							qad_number: qad_number,
							customer_part_number: customer_part_number, 
							token: token
						}
						
						console.log(data)

						if (qad_number === 0 || qad_number === "0" || qad_number === "" || qad_number === null || qad_number === undefined || qad_number.length !== 7) {
							$("#part-error").show()
							$("#part-error").text("Part does not match requirements")
						}

						else {
							$.ajax({
								url: "/submitpart",
								method: "post",
								data: data
							}).then(function(part) {
								console.log(part) 
							})
						}
					});

		$(".get-part").on("click", function(){	
						
						event.preventDefault();

						var qad_number = $("#qad-number").val().trim();

						//placeholder for future data inputs if needed
						var data = {
							qad_number: qad_number
						}

							if (qad_number === null || qad_number === "" || qad_number === undefined) {
								console.log("QAD doesn't exist in database.")
								$("#part-error").show();
								
								$("#part-error").text("Part does not exist in database.");
							}

							else {
								$("#part-error").hide()
								$(".text-center").show()
								$.ajax({
									url: "/getpart",
									method: "post",
									data: data
								}).then(function(part) {
									console.log(part) 

									if (part === undefined) {
										$("#part-error").show();
										$("#part-error").text("Part does not exist in database");
									}

									else {
										//TODO: Once data is displayed, parts that are undefined should be able to allow user input to change it.
										//Query for 10 parts. Then display all parts in table. No input required. Request most recent parts
										//Can delete rows to get rid of on display and add new parts automatically. x on side of row.

										if (window.location.pathname === "/classifications") {
										
										$(".table").append("<tr>");
										$(".table").append("<td contenteditable='true'>"+ part.qad_number +"</td>");
										$(".table").append("<td contenteditable='true'>"+ part.customer_part_number +"</td>");
										$(".table").append("<td>"+ part.entered_by +"</td>");
										$(".table").append("<td>"+ part.date_entered.toString().substring(0,10) +"</td>"); 
										$(".table").append("<td contenteditable='true'>"+ part.art +"</td>");
										$(".table").append("<td contenteditable='true'>"+ part.bom +"</td>");
										$(".table").append("<td contenteditable='true'>"+ part.schedule_b +"</td>");
										$(".table").append("<td contenteditable='true'>"+ part.hts +"</td>");
										$(".table").append("<td contenteditable='true'>"+ part.eccn +"</td>");
										$(".table").append("<td contenteditable='true'>"+ part.nafta_qualified +"</td>");
										$(".table").append("<td contenteditable='true'>"+ part.nafta_rvc +"</td>");
										$(".table").append("</tr>");
										}

										else {

										$(".table").append("<tr>");
										$(".table").append("<td contenteditable='false'>"+ part.qad_number +"</td>");
										$(".table").append("<td contenteditable='false'>"+ part.customer_part_number +"</td>");
										$(".table").append("<td>"+ part.entered_by +"</td>");
										$(".table").append("<td>"+ part.date_entered.toString().substring(0,10) +"</td>"); 
										$(".table").append("<td contenteditable='false'>"+ part.art +"</td>");
										$(".table").append("<td contenteditable='false'>"+ part.bom +"</td>");
										$(".table").append("<td contenteditable='false'>"+ part.schedule_b +"</td>");
										$(".table").append("<td contenteditable='false'>"+ part.hts +"</td>");
										$(".table").append("<td contenteditable='false'>"+ part.eccn +"</td>");
										$(".table").append("<td contenteditable='false'>"+ part.nafta_qualified +"</td>");
										$(".table").append("<td contenteditable='false'>"+ part.nafta_rvc +"</td>");
										$(".table").append("<td contenteditable='false'> X </td>");
										$(".table").append("</tr>");

										$(".confirm-audit").show();
										$(".misclassified").show();
										}
									}
								})
	
								
							}
		});

		$(".confirm-audit").on("click", function() {
			$("#part-success").show();
			$("#part-success").text("Part successfully audited");
			//TODO: send to miguel to confirm audit
		});

		$(".misclassified").on("click", function() {
			$("#part-failure").show();
			$("#part-failure").text("Part is misclassified");
			//TODO: send to person that classified part to redo
		});

		$(".end-button").on("click", function() {
			$(".next-part").show();
			$(".next-part").on("click", function() {
					window.location.reload();	
			})
		})

//TODO: Add name for classified_by, reviewed_by
	$.ajax({
		url:"/getinfo",
		method:"post",
		data:data
	}).then(function(user) {
		console.log(user)

		//if there is no user
		if (user === "nouser")
		{
			window.location="/"
		}

		//in case there are no tasks
//		else if (result.riddle === "noriddles")
//		{
			//$('#riddle').html("Oh no!  We're out of riddles for you!")
//			$('.name').html(result.name)
			//$('#coins').html(result.coins)
			//$('#level').html(result.level)
			//$('#answer').hide()
//		}

		//if there is a user and tasks
		else
		{
			console.log(user.name)
			$(".username").append(user.name)
			/*$('#percent-container').html("<h5>You're the first to try this riddle!</h5>")
			*/
		}

	});

	if (window.location.pathname === "/classifications") {

								/*$.ajax({
									url: "/classifications/populate",
									method: "get"																	//TODO: make a get request and put data into table automatically
								}).then(function(part) {
									console.log(part) 

									if (part === undefined) {
										$("#part-error").show();
										$("#part-error").text("Part does not exist in database");
									}

									else {
										
										$(".table").append("<tr>");
										$(".table").append("<th contenteditable='true'>"+ part.qad_number +"</th>");
										$(".table").append("<th contenteditable='true'>"+ part.customer_part_number +"</th>");
										$(".table").append("<th>"+ part.entered_by +"</th>");
										$(".table").append("<th>"+ part.date_entered.toString().substring(0,10) +"</th>"); 
										$(".table").append("<th contenteditable='true'>"+ part.art +"</th>");
										$(".table").append("<th contenteditable='true'>"+ part.bom +"</th>");
										$(".table").append("<th contenteditable='true'>"+ part.schedule_b +"</th>");
										$(".table").append("<th contenteditable='true'>"+ part.hts +"</th>");
										$(".table").append("<th contenteditable='true'>"+ part.eccn +"</th>");
										$(".table").append("<th contenteditable='true'>"+ part.nafta_qualified +"</th>");
										$(".table").append("<th contenteditable='true'>"+ part.nafta_rvc +"</th>");
										$(".table").append("</tr>");

										$(".confirm-audit").show();
										}
				})*/
							
	$.ajax(
	{
		url: "/classifications/populate",
		type: "get",
	}).then(function(part)
	{
		console.log(part)
		console.log(part.length)

		for (var i=0; i<part.length; i++) {

			if (true)
			{

				var tr = $('<tr class="you">');
				var td1 = $("<td contenteditable='true'>"+part[i].qad_number+"</td>")
				var td2 = $("<td contenteditable='true'>"+part[i].customer_part_number+"</td>")
				var td3 = $("<td>"+part[i].entered_by+"</td>")
				var td4 = $("<td>"+part[i].date_entered.toString().substring(0,10)+"</td>")			
				var td5 = $("<td contenteditable='true'>"+ part.art +"</td>");
				var td6 = $("<td contenteditable='true'>"+ part.bom +"</td>");
				var td7 = $("<td contenteditable='true'>"+ part.schedule_b +"</td>");
				var td8 = $("<td contenteditable='true'>"+ part.hts +"</td>");
				var td9 = $("<td contenteditable='true'>"+ part.eccn +"</td>");
				var td10 = $("<td contenteditable='true'>"+ part.nafta_qualified +"</td>");
				var td11 = $("<td contenteditable='true'>"+ part.nafta_rvc +"</td>");

			}

			else
			{

				console.log("else")
				
				/*var tr = $('<tr>');
				var td1 = $('<td>'+result[i].rank+'</td>')
				var td2 = $('<td>'+result[i].name+'</td>')
				var td3 = $('<td>'+result[i].level+'</td>')
				var td4 = $('<td><i class="fa fa-usd" aria-hidden="true"></i> '+result[i].coins+'</td>')	
				*/		
			}
			
			tr.append(td1)
			tr.append(td2)
			tr.append(td3)
			tr.append(td4)
			tr.append(td5)
			tr.append(td6)
			tr.append(td7)
			tr.append(td8)
			tr.append(td9)
			tr.append(td10)
			tr.append(td11)

			$('tbody').append(tr)
			
		}
	})
	}
	//TODO: notifications won't go to trade when clicked
	$(".fa-bell").on("click", function() {
		window.location = "/trade";
	});
	$(".fa-paper-plane").on("click", function() {
		window.location = "/trade";
	});
	
	$(".classifications").on("click", function() {
		window.location = "/classifications";
	});
	$(".audits").on("click", function() {
		window.location = "/audits";
	});
	$(".addNewParts").on("click", function() {
		window.location = "/addingnewparts";
	});
	$(".shipments").on("click", function() {
		window.location = "/shipments";
	});
	$(".nafta").on("click", function() {
		window.location = "/nafta";
	});
	$(".quiz").on("click", function() {
		window.location = "/quiz";
	});

	$(".logout").on("click", function() {
		token = sessionStorage.setItem("token", null);
		window.location = "/";

	})
}