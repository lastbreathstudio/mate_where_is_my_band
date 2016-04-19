$(document).ready(function() {
  $('#submit').on('click', function(){
        submit();
      });
    });


function submit(){

// Storing user input

  tag = document.getElementById("tag").value;
  var editedTag = tag.replace(/\s/g, "%20");
  tagUrl = 'http://api.bandsintown.com/artists/' + editedTag + '/events.json?api_version=2.0&app_id=sizoider';

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
	} // end of getBandsInTown

	function getBandsInTownComplete (data){

		$('#images').empty();
		$("body").animate({"scrollTop": window.scrollY+200}, 1000);
		
		if(data.length > 0){
			for(var key in data){
				var obj = data[key];


				var date = new Date(obj.datetime);
				var day = date.getDate();
				var month = date.getMonth()+1;
				var m_names = new Array("Jan", "Feb", "Mar", 
									"Apr", "May", "June", "July", "Aug", "Sep", 
										"Oct", "Nov", "Dec");
				//for(var deep in obj){
					//var f = obj.venue.name;
					//console.log( obj[deep]);
					$('.bandname').html(tag); 
					
					id = "<div class='res'><div class='date'>" + day + "</div><div class='month'>" + m_names[month] + "</div><div class='place'>" + obj.venue.name + "</div><div class='city'>" + obj.formatted_location + "</div></div>";

		  		$('#results').append(id);
				//}
	  		}
		}else{
			$('#error').html("BUMMER!!! COULDN'T FIND ANYTHING!!!");
		}
  }
