<?php include("elements/menu.php"); ?>
<section id="contact" class="page">
	<div class="inner">
		<h1>Kontakt oss</h1>
		<p>Kontakt kundeservice hvis du har spørsmål om produkter, priser og endringer av abonnement, eller hvis du har generelle spørsmål om tjenesten.</p>
		<p>Ønsker du kontakt med vårt kundesenter kan du benytte vårt elektroniske kontaktskjema eller ringe 820 90 025 (kr 26,- pr. min.)</p>
		<p>Kundesenteret er åpent Mandag - Fredag: 09:30-16:30</p>
		<p>Postadresse: Postboks 345 Sentrum, 0101 Oslo</p>
		
		<form action="http://finnrett.no/old/contactus" method="post" accept-charset="utf-8" id="contactus" name="contactus">
			<div class="top_line"><input type="text" placeholder="Ditt navn" name="contactName" /><input type="text" placeholder="Kontaktinformasjon (epost/tlf)" name="contactEmail" /></div>
			<input type="hidden" name="contactSubject" value="Kontaktskjema" />
			<textarea placeholder="Skriv din melding her..." name="contactMessage"></textarea>
			<input type="submit" value="Send melding"></input>
		</form>
	</div>
</section>