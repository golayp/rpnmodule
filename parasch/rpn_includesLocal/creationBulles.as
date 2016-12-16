//Création des bulles verte et rouge
createEmptyMovieClip("fondBulle",10000);
fondBulle.attachMovie("bulle_verte", "bulleVerteMc", 1);
fondBulle.bulleVerteMc.createTextField("texte", 0, 35, 30, 230, 110);
fondBulle.bulleVerteMc.texte.multiline = true;
fondBulle.bulleVerteMc.texte.wordWrap = true;
fondBulle.bulleVerteMc.texte.setNewTextFormat(texteBulle_fmt);

fondBulle.attachMovie("bulle_rouge", "bulleRougeMc", 2);
fondBulle.bulleRougeMc.createTextField("texte", 0, 35, 30, 230, 110);
fondBulle.bulleRougeMc.texte.multiline = true;
fondBulle.bulleRougeMc.texte.wordWrap = true;
fondBulle.bulleRougeMc.texte.setNewTextFormat(texteBulle_fmt);


fondBulle.bulleVerteMc._visible = false;
fondBulle.bulleRougeMc._visible = false;
fondBulle.bulleVerteMc._x = 200;
fondBulle.bulleVerteMc._y = 100;
fondBulle.bulleRougeMc._x = 200;
fondBulle.bulleRougeMc._y = 100;


//Action sur bouton OK des bulles
fondBulle.bulleVerteMc.OK_Btn.onRelease = function()
{
	fondBulle.bulleVerteMc._visible = false;
	_level0.etatBulleVerte=false;
	
}
fondBulle.bulleRougeMc.OK_Btn.onRelease = function()
{
	fondBulle.bulleRougeMc._visible = false;
	_level0.etatBulleRouge=false;
	if(nbFois==0)
	{
		trace("nbFois"+nbFois)
		activerBouton(boutonAmontrer);
		activerBouton(cadreMc.solutionBtn);
	}else if (_level0.sol==true && _level0.suivant=="non")
	{
		activerBouton(cadreMc.continuerBtn);
	}else
	{
		activerBouton(cadreMc.validerBtn);
	}
}


