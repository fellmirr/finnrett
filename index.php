<?php
$page = $_GET["page"];

require_once("API/db.php");
mysql_query('INSERT INTO finnrett_visitors (IP, hits) VALUES (INET_ATON(\'' . $_SERVER['REMOTE_ADDR'] . '\'), 1) ON DUPLICATE KEY UPDATE hits = hits+1');
?>

<!DOCTYPE html>
<html>
	<head>
		<title>FinnRett.no</title>
		<base href="http://finnrett.no/">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<link rel="stylesheet" type="text/css" href="style/base.css">
		<?php
		if (empty($page)) 
		{
			echo '<link rel="stylesheet" type="text/css" href="pages/home.css">';
		}
		else 
		{
			echo '<link rel="stylesheet" type="text/css" href="pages/' . $page . '.css">';
		}
		?>
		<meta charset="UTF-8">
		
		<link rel="icon" type="image/png" href="http://finnrett.no/old/common/media/favIcon.png">
		<meta name="keywords" content=", Arbeids- og Næringsliv, Bil, Båt og Transport, Bolig og Interiør, Butikker og Handel, Bygg og Anlegg, Data, It og Tele, Eiendom og Økonomi, Helse og Leger, Industri og Produksjon, Kommunal og Offentlig Etat, Kultur og Fritid, Kropp og Velvære, Markedsføring, Mat og Drikke, Netthandel, Grensehandel, Organisasjoner, Service og Tjenester, Skole og Utdanning, Sport og Friluftsliv, Reiseliv">
		
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script src="lib/lightbox.js"></script>
		
		<link rel="stylesheet" type="text/css" href="style/lightbox.css">
	</head>
	<body>
		<script>
		if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 1000)
		{
			location.href = "/m/";
		}
		console.log("ʕ·͡ᴥ·ʔ Keep calm, Polar Bear is here"); 
		</script>
	
		<?php
		if (empty($page)) 
		{
			include 'pages/home.php';
		}
		else 
		{
			include 'pages/' . $page . '.php';
		}
		?>
		
		<footer>
			<div class="inner">
				<div class="section">
					<h3>Om oss</h3>
					<ul>
						<li><a href="page/about">Om finnrett.no</a></li>
						<li><a href="page/work">Ledige stillinger</a></li>
						<li><a href="page/terms">Betingelser</a></li>
						<li><a href="page/contact">Kontakt oss</a></li>
					</ul>
				</div>
				
				<div class="section">
					<h3>For bedrifter</h3>
					<ul>
						<!--<li><a href="page/about">Legg inn bedrift</a></li>-->
						<li><a href="page/ads">Annonsere</a></li>
						<li><a href="page/login">Logg inn</a></li>
					</ul>
				</div>
				<div class="legal">© Copyright <?php echo date("Y"); ?> Finnrett.no&#0153;</div>
			</div>
		</footer>
	</body>
</html>