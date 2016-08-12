$(document).ready(function() { // when the document is ready, the function inside the paremeter of ready will be run.
	$('#inputBox, #submitButton, .btn-group').fadeIn('slow'); //fades in the form

	$('#inputBox').on('focus', function() {
		$('#bardAnim').fadeIn('slow'); //fades in the walking bard gif
	});

	$('#submitButton').on('click', function(){
		var summonerName = $('#inputBox').val();
		alert(summonerName);
	});
	
	$(".dropdown-menu li a").on('click', function(){
  		var region = $(this).text(); //region functionality
  		$(this).parents('.btn-group').find('.dropdown-toggle').html(region);
	});

});

