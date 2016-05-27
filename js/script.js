$(document).ready(function() { // when the document is ready, the function inside the paremeter of ready will be run.
	$('#inputBox, #submitButton').fadeIn('slow'); //fades in the form
});

$('#inputBox').on('focus', function() {
	$('#bardAnim').fadeIn('slow'); //fades in the walking bard gif
});

$('#submitButton').on('click', function(){
	var summonerName = $('#inputBox').val();
	alert(summonerName);
});

function checkSummonerIngame(){
	
}

