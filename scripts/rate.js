$(".star").click(function () {
	$(".rater .score").html("Laster...");

	$(".star").removeClass("active");
	$(this).addClass("active");
	
	//Ajax call send rating
	jQuery.ajax({                                
		url: "API/business/post/rate.php",                    
		type: "POST",
		data: {rating : $(this).data("rating"), business : curentBusinessID},
		success: function(data)
		{
			updateRating();
		},
		error: function(error)
		{
			updateRating();
		}
	});
});

function updateRating()
{
	jQuery.ajax({                                
		url: "http://finnrett.no/beta/API/business/get/rating",                    
		type: "GET",
		dataType: "json",
		data: {business : curentBusinessID},
		success: function(data)
		{
			if (data != false)
			{
				$(".rater .score").html(data.replace(/\.?0+$/, '') + " av 5");
			}
			else
			{
				$(".rater .score").html("Ingen stemmer");
			}
		}
	});
}