<script src="lib/spin.js"></script>
<script>
//Filter variables
var parentCats = [];
var childCats = [];

var counties = [];
var munics = [];

var smsBusinessCode;
</script>

<script src="scripts/filters.js"></script>

<section id="sms" class="supercenter">
	<div class="closer" onclick="$('#sms').removeClass('active');"></div>
	<div class="form">
		<h2>Send info på SMS</h2>
		<input type="text" id="txtNumber" placeholder="Ditt nr"/>
		<p>Vi lagrer nummeret for denne økten, slik at du slipper å skrive det inn neste gang du trykker på send sms. Tjenesten koster 5kr.</p>
		<div class="btn" onclick="sendSms();">Send</div>
	</div>
	
	<script src="scripts/sms.js"></script>
</section>

<section id="splash" class="supercenter bgcover">
	<div class="header" style="z-index: 2;">
		<div class="inner">
			<div class="logo_wrapper">
				<img src="http://finnrett.no/old/common/media/logo_inner.png" style="vertical-align: middle; height: 48px;"/>
				<h1 style="vertical-align: middle;">Finnrett.no</h1>
			</div>
			
			<div class="right_menu">
				<ul id="menuList">
					<li><a href=""><div class="btn">Hjem</div></a></li>
					<li><a href="page/work"><div class="btn">Ledige stillinger</div></a></li>
					<li><a href="page/login"><div class="btn">Logg inn</div></a></li>
				</ul>
			</div>
		</div>
	</div>
	
	<div id="middleContainer">
		<input type="text" id="mainSearchTxt" placeholder="Søk blant bedrifter, privatpersoner og bransjer"/><button id="mainSearchBtn"><img src="img/search.png" /></button>
		<ul id="quickresults">
			<div id="resultsLoading"></div>
		</ul>
	</div>
	
	<div id="resultsWrapper">
		<div id="filters">
			<div class="inner">
				<h3>Type</h3>
					<ul class="type_selector" id="type_selector">
						<li onclick="changeType('p', this);" id="selPrivate">Person<div class="marker"></div></li><li onclick="changeType('b', this);" id="selBusiness" class="active">Bedrift<div class="marker"></div></li>
					</ul>
				
				<div id="filterLocations" class="filterInnerContainer" style="max-height: 36vh;">
					<script>
						loadLocations("filterLocations");
					</script>
				</div>
				
				<div id="filterCategories" class="filterInnerContainer" style="max-height: 36vh;">
					<script>
						loadCategories("filterCategories");
					</script>
				</div>
			</div>
		</div>
	
		<ul id="resultsList">
		</ul>
		
		<div id="right_add">
		</div>
		
		<img id="closeSearch" src="img/cross.png" />
	</div>
	
	
	
	<div class="darken"></div>
</section>

<section id="profile">
	<a href="javascript: void(0);" onclick="closeProfile(false);" id="backToSearch">
		<div class="goback">Tilbake til søk</div>
	</a>

	<section id="map_wrapper">
		<div style="width: 100%; height: 100%" id="map">
		
		</div>
	</section>

	<section id="info">
		<div class="header">
			<div class="bigger" onclick="toggleMap()">
				<div class="left_slant"></div>
				<span id="mapLbl">Større kart</span>
				<div class="right_slant"></div>
			</div>
			
			<div class="directions">
				<img src="img/transit.png" onclick="getDirections(google.maps.TravelMode.TRANSIT);"/>
				<img src="img/car.png" onclick="getDirections(google.maps.TravelMode.DRIVING);"/>
				<img src="img/walking.png" onclick="getDirections(google.maps.TravelMode.WALKING);"/>
				
				<span id="tripDuration"></span>
			</div>
			
			<h3 id="profileName">Laster...</h3>
			
			<h4 id="profileNumber"></h4>
			<div id="profileAddress"></div>
			
			
			<div class="rater">
				<div class="info">Si din mening</div>
				
				<div class="star" data-rating="5">
					<img src="img/star_dead.png" class="dead"/>
					<img src="img/star_alive.png" class="alive"/>
				</div>
				
				<div class="star" data-rating="4">
					<img src="img/star_dead.png" class="dead"/>
					<img src="img/star_alive.png" class="alive"/>
				</div>
				
				<div class="star" data-rating="3">
					<img src="img/star_dead.png" class="dead"/>
					<img src="img/star_alive.png" class="alive"/>
				</div>
				
				<div class="star" data-rating="2">
					<img src="img/star_dead.png" class="dead"/>
					<img src="img/star_alive.png" class="alive"/>
				</div>
				
				<div class="star" data-rating="1">
					<img src="img/star_dead.png" class="dead"/>
					<img src="img/star_alive.png" class="alive"/>
				</div>
				
				<div style="clear:both;"></div>
				<div class="score">Laster...</div>
			</div>
		</div>
		
		<div class="divider">
			<div class="desc" id="profileDesc"></div>
			
			<div class="right">
				<img id="profileLogo" src="" class="logo" id="profileLogo" onerror="$(this).hide();" onload="$(this).show();"/>
			
				<table id="profileTable">

				</table>
				
				<form id="contactForm">
					<h4>Kontakt</h4>
				
					<input type="text" placeholder="navn"/>
					<input type="text" placeholder="mail/tlf"/>
					<textarea placeholder="melding"></textarea>
					
					<button>Send henvendelse</button>
				</form>
			</div>
			
			<div style="clear: both;"></div>
		</div>
	</section>

	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBC2rCjm0C098NPVjNs_InqBSOuMNuqKfQ&language=no"></script>
</section>

<script src="lib/bindings.js"></script>

<script src="scripts/search.js"></script>
<script src="scripts/profile.js"></script>
<script src="scripts/history.js"></script>
<script src="scripts/rate.js"></script>
<script src="scripts/helpers.js"></script>

<script>
window.onload=function()
{
	/*
    setTimeout(function()
	{
        scrollTo(0,-1);
    },1000);
	*/

	handlePage(true);
}

window.addEventListener("resize", resized);
function resized()
{
	if (profileOpen)
	{
		$('body').scrollTop($("#splash").height());
		google.maps.event.trigger(map, 'resize');
	}
}
</script>
<style></style>