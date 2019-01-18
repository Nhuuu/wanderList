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
			//$('.place-id-input').val(data.placeId); 
			document.querySelectorAll('.place-id-input').forEach((btn) => {
				btn.value = data.placeId;
			});
			$('#submitplace').replaceWith('<h5>This place has been added to your list!</h5>');
			$('.add-poi-btn').show();
			// $('#submitplace').toggleClass('hidden');
		})
		.fail(function(err){
			console.log(err, 'error')
		});
	});
});


$(document).ready(function(){
	$('.addPoi').submit(function(e){
		e.preventDefault();
		console.log('click')
		$.ajax({
			url: '/search/add-poi',
			method: 'POST',
			data: $(this).serialize()
		})
		.done(function(data){
			console.log(data, 'success')
			$('#submitpoi').attr('disabled', 'disabled');
		})
		.fail(function(err){
			console.log(err, 'error')
		});
	});
});

