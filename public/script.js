// $(document).ready(function(){
// 	$('#addPlace').submit(function(e){
// 		e.preventDefault();
// 		console.log('click')
// 		$.ajax({
// 			url: '/search/add',
// 			method: 'POST',
// 			data: $(this).serialize()
// 		})
// 		.done(function(data){
// 			console.log(data, 'success')
// 			// document.querySelectorAll('.place-id-input').forEach((btn) => {
// 			// 	btn.value = data.placeId;
// 			// })
// 			$('#submitplace').replaceWith('<h5>Added to your list!</h5>');
// 		})
// 		.fail(function(err){
// 			console.log(err, 'error')
// 		});
// 	});
// });


// $(document).ready(function(){
// 	$('.addPoi').submit(function(e){
// 		e.preventDefault();
// 		console.log('click')
// 		$.ajax({
// 			url: '/search/add-poi',
// 			method: 'POST',
// 			data: $(this).serialize()
// 		})
// 		.done(function(data){
// 			console.log(data, 'success')
// 			$('#submitpoi').replaceWith('<h5>Added to your place!</h5>');
// 		})
// 		.fail(function(err){
// 			console.log(err, 'error')
// 		});
// 	});
// });

