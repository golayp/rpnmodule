/*
 * @author Jean-Michel Luthi
*/
 trace ("Ouverture de ini");
/*
 * 
 * 
/////////////////////////////////EN flash 10/////////////////
//classe pour créer une couleur
import flash.geom.ColorTransform;
//classe pour apliquer une couleur
import flash.geom.Transform;

var macouleur:ColorTransform = new ColorTransform();
macouleur.rgb = 0xFF0000; //Couleur rouge

var transformation:Transform = new Transform(suisseMc);
transformation.colorTransform = macouleur;
*/
///////////////////////en flash 6//////////////////////////////
//var macouleur:Color = new Color(suisseMc); // On associe macouleur à un clip
//macouleur.setRGB(0xFFFF00); // On donne une couleur héxadécimal à maCouleur

//consigneMc._visible = false;

//import heureDExe;

//On lit le fichier XML contenant les informations sur le clip unite. la fonction se trouve dans unitesLectureXML.as
lectureXML(donneeXML);

//On fixe la largeur et la Hauteur du clip pour la mettre dans l'interface(taille document dans flash)
//this._width = 623;
//this._height = 334;
largeurClip = 1250;
hauteurClip = 746;
//On fixe la taille du clip utilisé avec flash pour créer le clip. Cette taille sera utilisée dans javascript pour mettre la taille de 'lèxercice dans l'interface au max de l'écran.

//On crée un fond pour la montre
this.createEmptyMovieClip("fondMc", -101);
//Sur le fond, on met un clip qui contiendra l'angle
fondMc.createEmptyMovieClip("angleMc", 1);
tailleMontre = 50;
posCentre[0] = 625;
posCentre[1] = 620;

//Fonction qui trouve un ville de façon aleatoire
function villeAlea(maliste:Array):Array {
	var alea:Number = Math.floor(Math.random() * (maliste.length - 1));
	var alea2:Number = 2 * (Math.floor(Math.random() * 4) + 1);
	var monRetour:Array = new Array();
	//alea = 146;
	//alea2 = 2;
	switch (alea2) {
		case 10:
			trace("10")
			if (maliste[alea][10].length <= 1) {
				alea2 = 8;
			}else {
				break;
			}
		case 8:
			trace("8")
			if (maliste[alea][8].length <= 1) {
				alea2 = 6;
			}else {
				break;
			}
		case 6:
			trace("6")
			if (maliste[alea][6].length <= 1) {
				alea2 = 4;
			}else {
				break;
			}
		case 4:
			trace("4")
			if (maliste[alea][4].length <= 1) {
				alea2 = 2;
			}else {
				break;
			}
		case 2:
			trace("2")
			if (maliste[alea][2].length <= 1) {
				alea2 = 4;
				break;
			}else {
				break;
			}
		default:
			trace("default " + alea2)
	}
	trace("alea " +alea )
	trace("alea2 " + alea2)
	trace("maliste[alea][alea2]" + maliste[alea][alea2])
	monRetour[0] = maliste[alea][0];
	monRetour[1] = maliste[alea][alea2];
	monRetour[2] = maliste[alea][alea2 + 1];
	monRetour[3] = maliste[alea][26];
	monRetour[4] = alea;
	monRetour[5] = alea2 / 2;
	
	return monRetour;
}

//On place le fond consigne grand et réduis
this.attachMovie("consignes_Mc", "consigneMc", 15000);
consigneMc._x = 400;
consigneMc._y = 200;
consigneMc.attachMovie("avertissement", "avertissementMc", 10);
consigneMc.avertissementMc._visible = true;
consigneMc.avertissementMc._x = 435;
consigneMc.avertissementMc._y = -80;
this.attachMovie("consignesP_Mc", "consignePMc", 15001);
consignePMc._x = 5;
consignePMc._y = 670;
consignePMc._visible = false;

//On cree un clip pour mettre les champs de réponse, indépendnat du cadre mais qui bougent avec la réduction et l'agrandissement.
this.createEmptyMovieClip("consigneTxtMc", 15002);
consigneTxtMc.focusrect = false;
consigneTxtMc.focusEnabled = true;
consigneTxtMc._x = consigneMc._x + 20;
consigneTxtMc._y = consigneMc._y + 100;

//On met le focus sur le clip consigneTxtMc
//Selection.setFocus("consigneTxtMc");


consigneTxtMc.createTextField("heureTxt", 1, 0, 0, 40, 35);
consigneTxtMc.heureTxt.background = true;
consigneTxtMc.heureTxt.maxChars = 2;
consigneTxtMc.heureTxt.type = "input";
consigneTxtMc.heureTxt.tabIndex = 1;
consigneTxtMc.heureTxt.setNewTextFormat(texteValeurHCons_fmt);
consigneTxtMc.heureTxt.text = "00";

consigneTxtMc.createTextField("ptsPtsTxt", 2, 40, 0, 10, 35);
consigneTxtMc.ptsPtsTxt.background = true;
consigneTxtMc.ptsPtsTxt.selectable = false;
consigneTxtMc.ptsPtsTxt.setNewTextFormat(texteCons_fmt);
consigneTxtMc.ptsPtsTxt.text = ":";

consigneTxtMc.createTextField("minTxt", 3, 50, 0, 40, 35);
consigneTxtMc.minTxt.background = true;
consigneTxtMc.minTxt.setNewTextFormat(texteValeurMCons_fmt);
consigneTxtMc.minTxt.type = "input";
consigneTxtMc.minTxt.tabIndex = 2;
consigneTxtMc.minTxt.maxChars = 2;
consigneTxtMc.minTxt.text = "00";

//consigneTxtMc.attachMovie("btnValider", "validerBtn", 4);
consigneTxtMc.validerBtn._width = 35;
consigneTxtMc.validerBtn._height = 35;
consigneTxtMc.validerBtn._x = 93;
consigneTxtMc.validerBtn._y = 1;

consigneTxtMc.attachMovie("btnIndice", "indiceBtn", 5);
consigneTxtMc.indiceBtn._width = 35;
consigneTxtMc.indiceBtn._height = 35;
consigneTxtMc.indiceBtn._x = 130;
consigneTxtMc.indiceBtn._y = 1;
consigneTxtMc.indiceBtn._visible = false;


//On crée un textField pour la question
consigneMc.createTextField("txt", 4, 20, 20, 450, 200);
consigneMc.txt.selectable = false;
consigneMc.txt.multiline = true;
consigneMc.txt.wordWrap = true;
consigneMc.txt.autoSize = true;
consigneMc.txt.setNewTextFormat(texteValeurMCons_fmt);
ville = villeAlea(_level0.liste);

trace("ville"+ville)
consigneMc.txt.text = "Quelle heure est-il à " + ville[1] + "?";


//On crée un textField pour la réponse
consigneMc.createTextField("txtRep", 5, 20, 130, 450, 200);
consigneMc.txtRep.selectable = false;
consigneMc.txtRep.multiline = true;
consigneMc.txtRep.wordWrap = true;
consigneMc.txtRep.autoSize = true;
consigneMc.txtRep.setNewTextFormat(texteRepCons_fmt);
//consigneMc.txtRep.text = "rèponse";



//import comporemetnPays;

//On crée un clip au dessus de tout le reste pour y mettre le pays survolé
this.createEmptyMovieClip("auDessus", 10000);
//On crée un clip au dessus de tout le reste pour y mettre le clip cliqué en premier
this.createEmptyMovieClip("auDessus1", 9998);
//On crée un clip au dessus de tout le reste pour y mettre le clip cliqué en second
this.createEmptyMovieClip("auDessus2", 9999);
//On crée un clip au dessus de tout le reste pour y mettre les fuseaux
this.createEmptyMovieClip("auDessusf", 10001);
//On crée un clip au dessus des zones réactives en bas des fuseaux
this.createEmptyMovieClip("auDessusZones", -100);


//On fait une boucle qui va assigner un comportement des clips
for (var i:Number = 0; i < _level0.liste.length; i++) {
	monPays[i] = new comportementPays(this[_level0.liste[i][1]], this[_level0.liste[i][1]]._x, this[_level0.liste[i][1]]._y, _level0.liste[i],
	texteInfo_fmt, texteCapitaleSurvole_fmt, texteVilleSurvole_fmt, largeurClip, hauteurClip, 200, 100, auDessus, auDessus1, auDessus2, false);
}

_level0.retour = "Regarde bien le fuseau horaire, pour l'instant, tu n'as pas situé le pays.\nUtilise les indices!";
////////////////////////////////////////////////PAVE de test avec retour info Utilise pour passer des infos JS
//fondMc.createTextField("infoTxt", 10000, 10, 0, 100, 200)
fondMc.infoTxt.multiline = true;
fondMc.infoTxt.autoSize = true;
fondMc.infoTxt.wordWrap = true;
fondMc.infoTxt.setNewTextFormat(texteNom_fmt);
fondMc.infoTxt.selectable = false;
fondMc.infoTxt.text = _level0.username;
_level0.monTexte = fondMc.infoTxt.text;
//fondMc.infoTxt.text = "Retour d'une information dans paraschool:\nLongueur de la _level0.liste du XML: " + _level0.liste.length + " hauteur de champ de texte: \n" + fondMc.infoTxt._height + "\nlargeur de champ de texte: \n" + fondMc.infoTxt._width;
//trace(" hauteur de champ de texte: \n" + fondMc.infoTxt._height);
fondMc.infoTxt._visible = true;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


masqueMc._visible=false;
//On n'a plus besoin de cela puisque toutes les images sont des éléments de la bibliothèque, dessinées dans Flash
//On doit faire ces redimensionnements après que les images soient chargées.
//On profite du chargement de l'aide consignes
aideConsignesMc._visible=false;
test_btn._visible=false;

//On fixe un tableau dans lequel on met le mon de tous les clips fuseaux horaires
var tabFuseau:Array = new Array(["AMc", "zone1", 1], ["BMc", "zone2", 2], ["CMc", "zone3", 3], ["C1Mc", "", 3.5], [ "DMc", "zone4", 4], [ "D1Mc", "", 4.5],
[ "EMc", "zone5", 5], [ "E1Mc", "", 5.5], [ "E2Mc", "", 5.75], [ "FMc", "zone6", 6], [ "F1Mc", "", 6.5], [ "GMc", "zone7", 7], [ "HMc", "zone8", 8], [ "IMc", "zone9", 9],
[ "I1Mc", "", 9.5], [ "KMc", "zone10", 10], [ "LMc", "zone11", 11], [ "MMc", "zone12", 12], [ "NMc", "zoneM1", -1], [ "OMc", "zoneM2", -2], [ "PMc", "zoneM3", -3], [ "P1Mc", "zoneM3", -3.5],
[ "QMc", "zoneM4", -4], [ "Q1Mc", "", -4.5], [ "RMc", "zoneM5", -5], [ "SMc", "zoneM6", -6], [ "TMc", "zoneM7", -7], [ "UMc", "zoneM8", -8], [ "VMc", "zoneM9", -9],
[ "WMc", "zoneM10", -10], [ "XMc", "zoneM11", -11], [ "X2Mc", "zoneM11", -11], [ "X3Mc", "zoneM11", +13], [ "X4Mc", "zoneM11", +13],[ "YMc", "zoneM12", -12], [ "M2Mc", "zoneM12", -12], [ "ZMc", "zone0", 0]);
//On place des rectangle sur les zones de fuseau pour les mettre en couleurs en même temps que les zone pays
for(i = -12; i < 13; i++) {
	//this.attachMovie("zoneFuseau", "zone"+i, 10+i)
}

var maMontre:MovieClip = new heureDExe(posCentre[0], posCentre[1], fondMc.angleMc, texteValeurH_fmt, texteValeurM_fmt, texteValeurTxt_fmt,
texteSolution_fmt, dateMontre_fmt, [300, 300], tailleMontre);
maMontre.setTailleMontre(tailleMontre);

