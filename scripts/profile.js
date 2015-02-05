var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var mapsBusinessPosition;
var map;
var curentBusinessID;

var profileOpen = false;

var bindings = new Bindings();

function profile(id, type)
{
	profileOpen = true;
	curentBusinessID = id;

	$(".star").removeClass("active");

	if (!searching)
	{
		$("#profile").css("display", "block");
		$("body").css("overflow", "hidden");
		$("#splash").css("box-shadow", "none");

		$('html, body').scrollTop($("#splash").height());
		
		setTimeout(function() {
			if ($('html, body').scrollTop() < 200)
			{
				$('html, body').scrollTop($("#splash").height());
			}
		}, 400); //Compability with FF fix
	}
	else
	{
		$("#backToSearch").css("position", "absolute");
		$("#filters").css("transition", "none");
		$("#filters").css({"position": "absolute" , "top" : $("#resultsWrapper").scrollTop()});
		$("#right_add").css({"position": "absolute" , "top" : $("#resultsWrapper").scrollTop() + 84, "left" : $("#right_add").position().left});
		
		$("#profile").scrollTop(0);
	
		$('html, body').animate({
			  scrollTop: $("#profile").offset().top
		}, 300);
		
		setTimeout(function() {
			$("#backToSearch").css("position", "fixed");
		}, 400);
	}
	
	if (type == "b")
	{
		jQuery.ajax({                                
			url: "API/business/get/profile.php",                    
			type: "GET",
			dataType: "json",
			data: {id : id},
			success: function(data)
			{
				$("#profileName").html(data.businessName);
				
				$(".rater").show();
				$("#profileNumber").hide();
				
				$("#profileAddress").html("");
				$("#contactForm").show();
				$("#profileLogo").show();
				
				var oldId = data.oldId;
				var input = [["Org. Nr.", data.businessCode],
							["Kontakt", phoneSeperate(data.contact)],
							["Besøksadresse", data.bizAddress], 
							["Postaddresse", data.postAddress], 
							["Websider", data.homepage, "link"],
							["Ansatte", thousandSeperate(data.employees)],
							["Fylke", data.county],
							["Kommune", data.municipality],
							["Mva Registrert", data.mvaReg, "binary"],
							["Underkategori", data.childCat],
							["Enhetstype", data.detailCat]];
							
				bindings.makeTable("profileTable", input);
				
				$("#profileLogo").attr("src", "http://finnrett.no/old/common/uploads/business/business-" + oldId + "/logo/" + data.logo);
				
				$("#profileDesc").html("");
				
				$("#profileDesc").append(data.longDesc);
				
				var construct = "";
				construct += '<div id="gallery">';
				data.gallery.forEach(function (item)
				{
					construct += '<a href="http://finnrett.no/old/common/uploads/business/business-' + oldId + '/' + item + '" data-lightbox="gallery" data-title="">';
						construct += '<div class="thumb" style="background-image: url(\'http://finnrett.no/old/common/uploads/business/business-' + oldId + '/' + item + '\');"></div>';
					construct += '</a>';
				});
				construct += '</div>';
				
				$("#profileDesc").append(construct);
				
				$("#profileDesc img").each(function() 
				{
					$(this)[0].onerror = function(e)
					{
						this.parentNode.removeChild(this);
					}
				});
				
				directionsDisplay;
				directionsService = new google.maps.DirectionsService();
				
				updateRating();
				
				try
				{
					jQuery.get("http://maps.google.no/maps/api/geocode/json?address=" + data.bizAddress + ", " + data.county + ", " + data.municipality, function (data)
					{
						var mapStyle = []; 

						var pos = new google.maps.LatLng(data["results"][0]["geometry"]["location"]["lat"], data["results"][0]["geometry"]["location"]["lng"]);
						var myOptions = {
							zoom: 15,
							center: pos,
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							styles: mapStyle,
							scrollwheel: false
						};

						map = new google.maps.Map(document.getElementById('map'), myOptions);
						directionsDisplay = new google.maps.DirectionsRenderer();
						directionsDisplay.setMap(map);

						var marker = new google.maps.Marker({
							position: pos,
							map: map,
							animation: google.maps.Animation.DROP,
							title: 'Posisjon'
						});
						
						mapsBusinessPosition = pos;
					});
				}
				catch (ex)
				{
					//Handle no map
				}
			}
		});
	}
	else if (type == "p")
	{
		jQuery.ajax({                                
			url: "http://finnrett.no/beta/API/people/get/profile.php",                    
			type: "GET",
			dataType: "json",
			data: {id : id},
			success: function(data)
			{
				$("#profileName").html(data.fullname);
				
				$(".rater").hide();
				$("#profileNumber").show();
				$("#profileNumber").html(data.num);
				$("#profileAddress").html(data.address + ", " + data.county + ", " + data.municipality + ", " + data.post);
				
				$("#contactForm").hide();
				$("#profileLogo").hide();
				
				$("#profileTable").html("");
				$("#profileDesc").html("");
				
				try 
				{
					jQuery.get("http://maps.google.no/maps/api/geocode/json?address=" + data.address + ", " + data.post, function (data)
					{
						var mapStyle = []; 

						var pos = new google.maps.LatLng(data["results"][0]["geometry"]["location"]["lat"], data["results"][0]["geometry"]["location"]["lng"]);
						var myOptions = {
							zoom: 15,
							center: pos,
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							styles: mapStyle,
							scrollwheel: false
						};

						map = new google.maps.Map(document.getElementById('map'), myOptions);
						directionsDisplay = new google.maps.DirectionsRenderer();
						directionsDisplay.setMap(map);

						var marker = new google.maps.Marker({
							position: pos,
							map: map,
							animation: google.maps.Animation.DROP,
							title: 'Posisjon'
						});
						
						mapsBusinessPosition = pos;
					});
				}
				catch (ex)
				{
					//Handle no map
				}
			}
		});
	}
	else
	{
		console.log("The stream of stars will never end in perpetual perception");
	}
}

function getDirections(mode)
{
	$("#tripDuration").html("Laster...");
	var userLocation;
	if(navigator.geolocation) 
	{
		navigator.geolocation.getCurrentPosition(function(position)
		{
			userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			
			var request = {
				origin: userLocation,
				destination: mapsBusinessPosition,
				travelMode: mode
				};
				
			directionsService.route(request, function(result, status) 
			{
				if (status == google.maps.DirectionsStatus.OK) 
				{
					directionsDisplay.setDirections(result); 
					$("#tripDuration").html(result.routes[0].legs[0].duration.text);
				}
				else
				{
					$("#tripDuration").html("Fant ingen rute");
				}
			});
		}, 
		function() 
		{
			alert("Argh!");
		});
	} 
	else 
	{
		alert("Argh!");
	}
}

bigMap = false;
function toggleMap()
{
	if (!bigMap)
	{
		$("#map_wrapper").addClass("big");
		setTimeout(function() {
			google.maps.event.trigger(map, 'resize');
			$("#mapLbl").html("Mindre kart");
		}, 320);
		bigMap = true;
		
	}
	else
	{
		$("#map_wrapper").removeClass("big");
		setTimeout(function() {
			google.maps.event.trigger(map, 'resize');
			$("#mapLbl").html("Større kart");
		}, 320);
		bigMap = false;
	}
}

function closeProfile(overridePageChange)
{
	profileOpen = false;

	if (!overridePageChange)
	{
		overrideHash = true;
		setPage("q/" + searchType, [globalQuery]);
	}

	$("#backToSearch").css("position", "absolute");
	$("#backToSearch").css("top", $("#profile").scrollTop());
	$("#tripDuration").html("");
	
	if (searching)
	{
		$('html, body').animate({
			  scrollTop: 0
		}, 300);
	
		setTimeout(function() {
			
			$("#filters").css({"position": "fixed" , "top" : 0});
			$("#right_add").css({"position": "fixed" , "top" : 84});
			$("#backToSearch").css("top", 0);
			
			setTimeout(function() {
				$("#filters").css("transition", "");
			}, 300);
		}, 400);
	}
	
	if (!searching)
	{
		$("body").css("overflow", "");
		window.location.hash = "";
	}
}

var mapScrollTop;
$("#profile").scroll(function () 
{
	scrolltop = $("#profile").scrollTop();
	$("#map_wrapper").css("top", scrolltop*0.8);
});