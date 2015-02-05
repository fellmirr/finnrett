<nav>
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
		
		<div class="searchwrapper">
			<input id="menuSearch" placeholder="Søk blant bedrifter, privatpersoner og bransjer"/><button><img src="img/search.png"></button>
		</div>
		<div style="clear: both;"></div>
	</div>
</nav>
<script>
$("#menuSearch").keydown(function (e) {
	if (e.keyCode == 13)
	{
		location.href = "/beta/#!/q/b/" + encodeURI($(this).val());
	}
});
</script>