this.attachMovie("aideConsignes_Mc","texteIntrMc",1234);
trace("aideConsignesMc"+aideConsignesMc._visible)
texteIntrMc._x = 50;
texteIntrMc._y = 25;

texteIntrMc.attachMovie("zoneSurvol","zoneSurvolMc",10);
texteIntrMc.zoneSurvolMc._x = 15;
texteIntrMc.zoneSurvolMc._y = 15;
texteIntrMc.zoneSurvolMc._width = 500;
texteIntrMc.zoneSurvolMc._height = 290;
texteIntrMc.zoneSurvolMc._alpha = 0;

this.attachMovie("carreChocolat","introBtnMc",9);
introBtnMc._x = 15;
introBtnMc._y = 15;
introBtnMc._width = 25;
introBtnMc._height = 17;
introBtnMc._alpha = 70;
introBtnMc._visible = false;
introBtnMc.onRelease = function()
{
	this._visible = false;
	texteIntrMc._visible = true;
};

texteIntrMc.zoneSurvolMc.onPress = function()
{
	texteIntrMc.startDrag(false,5,5,100,50);
}
texteIntrMc.zoneSurvolMc.onRelease = function()
{
	texteIntrMc.stopDrag();
}

texteIntrMc.fermerBtn.onRelease = function()
{
	trace("FERMER")
	texteIntrMc._visible = false;
	introBtnMc._visible = true;
}

texteIntrMc.createTextField("titre",1,20,10,510,30);
texteIntrMc.titre.setNewTextFormat(texteTitre_fmt);
texteIntrMc.titre.text = "LE CHOCOLAT";

texteIntrMc.createTextField("presentation",2,20,35,510,270);
texteIntrMc.presentation.wordWrap = true;
texteIntrMc.presentation.setNewTextFormat(texteIntro_fmt);
texteIntrMc.presentation.text = "Le chocolat est produit à partir de la fève de cacao dont on extrait la matière grasse qui s’appelle le beurre de cacao. On mélange ce beurre de cacao avec du sucre et parfois des épices (comme la vanille) et de la matière grasse végétale.\n\nAu départ, le chocolat est consommé sous forme de boisson, au Mexique et en Amérique centrale, appelée xocolatl (ou xocoatl).  Ce mot a été inventé en Amérique centrale, entre autre par les Aztèques, dans une des langues locales, le nahuatl. Le mot xocolatl, dans cette langue, veut dire « eau amère », en référence au goût très amer du chocolat noir.\n\nLes Mayas croyaient que c’étaient leurs dieux qui avaient inventé le chocolat.\n\nC’est l’Espagnol Cortes qui a ramené la boisson à son roi au XVIe siècle (avec, par exemple, la pomme de terre, le maïs , les piments, le tabac), et c’est grâce à lui que nous connaissons le chocolat !";

texteIntrMc.createTextField("sourceInfo",3,250,270,300,30);
texteIntrMc.sourceInfo.setNewTextFormat(texteSource_fmt);
texteIntrMc.sourceInfo.text = "Sources : Wikipédia et www.futura-sciences.com";