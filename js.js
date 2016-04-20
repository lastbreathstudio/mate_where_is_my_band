
	document.addEventListener("DOMContentLoaded", function(event) {
	    document.getElementById('submit').onclick = submit;
	  });

	function submit(){

		// Storing user input
	  tag = document.getElementById("tag").value;
	  var editedTag = tag.replace(/\s/g, "%20");
	  tagUrl = 'http://api.bandsintown.com/artists/' + editedTag + '/events.json?api_version=2.0&app_id=sizoider';
	  recomendUrl = 'http://api.bandsintown.com/artists/' + editedTag + '/events/recommended?location=use_geoip&radius=50&only_recs=true&app_id=sizoider&api_version=2.0&format=json';
	  
	  //clear result 
	  var results = document.getElementById('results');
	  results.innerHTML = '';
	  
	  //clear recommended 
	  rec = document.getElementById('recommended');
	  rec.innerHTML = '';

	  getBandsInTown ();
	  
	} // End of Submit function

	function getBandsInTown (){
		
		$.ajax({
		  dataType: "jsonp",
		  url: tagUrl, 
		  error: function() {
	      console.log('error');
	   		},
		  success: getBandsInTownComplete,
		 }); // end of Ajax

		$.ajax({
		  dataType: "jsonp",
		  url: recomendUrl, 
		  error: function() {
	      console.log('error');
	   		},
		  success: getRecommendedGigs,
		 }); // end of Ajax
	
	}// end of getBandsInTown

	function getBandsInTownComplete (data){

		var bandNameDiv = document.querySelector('.bandname-inner');
		$("body").animate({"scrollTop": window.scrollY+200}, 1000);

		// working with response object
		if(data.length > 0){
			for(var key in data){
				var obj = data[key];
				var dateFormatted = formatDate(obj);

                bandNameDiv.innerHTML = tag;
                	//forming result div content
					id = "<div class='date'>" + dateFormatted.day + "</div><div class='month'>" + dateFormatted.m_names[dateFormatted.month] + "</div><div class='place'>" + obj.venue.name + "<a class='tickets' href='" + obj.ticket_url + "'>tickets</a></div><div class='city'>" + obj.formatted_location + "</div>";
					
					var div = document.createElement('div');
					div.className = 'res';
					div.innerHTML = id;

		  		results.appendChild(div)
		  		
	  		}
		}else{
			var errorDiv = document.getElementById('error');
			bandNameDiv.innerHTML = '';
			errorDiv.innerHTML = "BUMMER!!! COULDN'T FIND ANYTHING!!!";

		}
  }
  function getRecommendedGigs (data){
  		console.log(data);
		// working with response object
		if(data.length > 0){
			setTimeout(function(){
					var p = document.createElement('p');
					var text = document.createTextNode("You may like these gigs near you");
					p.appendChild(text);
					p.className = 'rec-inner';
					rec.appendChild(p);
					for(var key in data){
						var obj = data[key];

								var deep = obj.artists;

								for(var name in deep){
									console.log(deep[name].name);
								
								
						  		dateFormatted = formatDate(obj);
						  		
								id = "<div class='date'>" + dateFormatted.day + "</div><div class='month'>" + dateFormatted.m_names[dateFormatted.month] + "</div><div class='place'>" + deep[name].name + "<a class='tickets' href='" + obj.ticket_url + "'>tickets</a></div><div class='city'>" + obj.formatted_location + "</div>";
			
								var div = document.createElement('div');
								div.className = 'res';
								div.innerHTML = id;

					  		rec.appendChild(div)
					  		}//for 2 deep end
				  		}// for 1 deep end
					},3000)//settiemout end
			
			} //if end
  }
  // format dat function
 function formatDate(obj){
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
 