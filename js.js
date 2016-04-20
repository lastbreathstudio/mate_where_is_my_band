
	var app = {};
	document.addEventListener("DOMContentLoaded", function(event) {
	    document.getElementById('submit').onclick = app.submit;
	  });

	 app.submit = function (){

		// Storing user input
	  app.tag = document.getElementById("tag").value;
	  var editedTag = app.tag.replace(/\s/g, "%20");
	  
	  app.tagUrl = 'http://api.bandsintown.com/artists/' + editedTag + '/events.json?api_version=2.0&app_id=sizoider';
	  app.recomendUrl = 'http://api.bandsintown.com/artists/' + editedTag + '/events/recommended?location=use_geoip&radius=50&only_recs=true&app_id=sizoider&api_version=2.0&format=json';
	  
	  //clear result 
	  app.results = document.getElementById('results');
	  app.results.innerHTML = '';
	  
	  //clear recommended 
	  app.rec = document.getElementById('recommended');
	  app.rec.innerHTML = '';

	  app.getBandsInTown ();
	  
	} // End of Submit function

	 app.getBandsInTown = function(){
		
		$.ajax({
		  dataType: "jsonp",
		  url: app.tagUrl, 
		  error: function() {
	      console.log('error');
	   		},
		  success: app.getBandsInTownComplete,
		 }); // end of Ajax

		$.ajax({
		  dataType: "jsonp",
		  url: app.recomendUrl, 
		  error: function() {
	      console.log('error');
	   		},
		  success: app.getRecommendedGigs,
		 }); // end of Ajax
	
	}// end of getBandsInTown

	 app.getBandsInTownComplete = function (data){

		var bandNameDiv = document.querySelector('.bandname-inner');
		$("body").animate({"scrollTop": window.scrollY+200}, 1000);

		// working with response object
		if(data.length > 0){
			for(var key in data){
				var obj = data[key];
				var dateFormatted = app.formatDate(obj);

                bandNameDiv.innerHTML = app.tag;
                	//forming result div content
					id = "<div class='date'>" + dateFormatted.day + "</div><div class='month'>" + dateFormatted.m_names[dateFormatted.month] + "</div><div class='place'>" + obj.venue.name + "<a class='tickets' href='" + obj.ticket_url + "'>tickets</a></div><div class='city'>" + obj.formatted_location + "</div>";
					
					var div = document.createElement('div');
					div.className = 'res';
					div.innerHTML = id;

		  		app.results.appendChild(div)
		  		
	  		}
		}else{
			var errorDiv = document.getElementById('error');
			bandNameDiv.innerHTML = '';
			errorDiv.innerHTML = "BUMMER!!! COULDN'T FIND ANYTHING!!!";

		}
  }
  app.getRecommendedGigs = function (data){
  		console.log(data);
		// working with response object
		if(data.length > 0){
			setTimeout(function(){
					var p = document.createElement('p');
					var text = document.createTextNode("You may like these gigs near you");
					p.appendChild(text);
					p.className = 'rec-inner';
					app.rec.appendChild(p);
					for(var key in data){
						var obj = data[key];

								var deep = obj.artists;

								for(var name in deep){
									console.log(deep[name].name);
								
								
						  		dateFormatted = app.formatDate(obj);
						  		
								id = "<div class='date'>" + dateFormatted.day + "</div><div class='month'>" + dateFormatted.m_names[dateFormatted.month] + "</div><div class='place'>" + deep[name].name + "<a class='tickets' href='" + obj.ticket_url + "'>tickets</a></div><div class='city'>" + obj.formatted_location + "</div>";
			
								var div = document.createElement('div');
								div.className = 'res';
								div.innerHTML = id;

					  		app.rec.appendChild(div)
					  		}//for 2 deep end
				  		}// for 1 deep end
					},3000)//settiemout end
			
			} //if end
  }
  // format dat function
 app.formatDate = function(obj){
		var date = new Date(obj.datetime);
		var day = date.getDate();
		var month = date.getMonth()+1;
		var m_names = ["Jan", "Feb", "Mar", "Apr", "May", "June", 
						       "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
				 return {
						    day: day,
							month: month,
							m_names :m_names
						       };
 }
 