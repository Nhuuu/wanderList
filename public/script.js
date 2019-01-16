$(document).ready(function(){
	$('#addPlace').submit(function(e){
		e.preventDefault();
		console.log('click')
		$.ajax({
			url: '/search/add',
			method: 'POST',
			data: $(this).serialize()
		})
		.done(function(data){
			console.log(data, 'success')
			$('#submitplace').attr('disabled', 'disabled');
		})
		.fail(function(err){
			console.log(err, 'error')
		})
	})
})


