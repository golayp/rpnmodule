/**
 * ...
 * @author J-M.Luthi
 */
trace("etst ini")
import heureD;
//On crée un fond
this.createEmptyMovieClip("fondMc", 1);
//Sur le fond, on met un clip qui contiendra l'angle
fondMc.createEmptyMovieClip("angleMc", 1)
var posCentre:Array = new Array();
posCentre[0] = 200;
posCentre[1] = 200;
//création aléatoire de l'heure:
var monHeure:Number = Math.round(Math.random() * 24);
//monHeure = 1;
var maMinute:Number = Math.round(Math.random() * 60);
//maMinute = 51;
//trace("typeAngles"+typeAngles)
anglesMelanges = tirageAleatoire(typeAngles);
//trace("anglesMelanges: "+anglesMelanges)
if(_global.tirage.length < anglesMelanges.length){ 
	var monTypeAngle:String;
	var mesAnglesRestants:Array = new Array();
	mesAnglesRestants=anglesRestants(anglesMelanges,_global.tirage);
	monTypeAngle=mesAnglesRestants[Math.floor(Math.random() * mesAnglesRestants.length)];
	//On place le type d'angle dans le tableau de paraschool pour éviter les répetitions dans les modules.
	_global.tirage.push(monTypeAngle);
}else{
	_global.tirage=new Array();
	monTypeAngle=anglesMelanges[Math.floor(Math.random() * anglesMelanges.length)];
	_global.tirage.push(monTypeAngle);
}

var nombreTexte:Array=new Array("pile", "une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quart", "seize", "dix-sept", "dix-huit", "dix-neuf", 
								"vingt", "vingt et un", "vingt-deux", "vingt-trois", "vingt-quatre", "vingt-cinq", "vingt-six", "vingt-sept", "vingt-huit", "vingt-neuf", "et demi", "trente et un",
								"trente-deux", "trente-trois", "trente-quatre", "trente-cinq", "trente-six", "trente-sept", "trente-huit", "trente-neuf",
								"quarante", "quarante et un", "quarante-deux", "quarante-trois", "quarante-quatre", "quarante-cinq", "quarante-six", "quarante-sept",
								"quarante-huit", "quarante-neuf", "cinquante", "cinquante et un", "cinquante-deux", "cinquante-trois", "cinquante-quatre", "cinquante-cinq", "cinquante-six",
								"cinquante-sept", "cinquante-huit", "cinquante-neuf");
								
								
var nombreTexte:Array=new Array("pile", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "viertel", "sechzehn", "siebzehn", "achtzehn", "neunzehn", 
								"zwanzig", "einundzwandzig", "zweiundzwanzig", "dreiundzwanzig", "vierundzwanzig", "fünfundzwanzig", "sechsundsechzig", "siebenundzwandzig", "achtundzwandzig", "neunundzwanzig", "halb", "einunddreissig",
								"zweiunddreissig", "dreiunddreissig", "vierunddreissig", "fünfunddreissig", "sechsunddreissig", "siebenunddreissig", "achtunddreissig", "neununddreissig",
								"vierzig", "einundvierzig", "zweiundvierzig", "dreiundvierzig", "vierundvierzig", "fünfundvierzig", "sechsundvierzig", "siebenundvierzig",
								"achtundvierzig", "neunundvierzig", "fünfzig", "einundfünfzig", "zweiundfünfzig", "dreiundfünfzig", "vierundfünfzig", "fünfundfünfzig", "sechsundfünfzig",
								"siebenundfünfzig", "achtundfünfzig", "neunundfènfzig");
								
trace("nombTexte"+nombreTexte.length)
var heureTexte:String = nombreTexte[monHeure];
switch (monHeure)
{
	case 0:
		if(maMinute==0){
			heureTexte = "Mitternacht";
		}else {
			heureTexte = "zwölf";
		}
		break;
	case 12:
		if(maMinute==0){
			heureTexte = "Mittag";
		}else {
			heureTexte = "zwölf";
		}
		break;
	case 24:
		if(maMinute==0){
			heureTexte = "Mitternacht";
		}else {
			heureTexte = "zwölf";
		}
		break;
	case 15:
		heureTexte = "fünfzehn";
	break;
}

var signe:String;
var minuteTexte:String;
var monHeureReelle:Number;
if (monHeure<13){
	if (maMinute>30){
		signe="vor";
		monHeureReelle = monHeure-1;
		if (maMinute==30){
			minuteTexte =  nombreTexte[maMinute];
			heureTexte = nombreTexte[monHeure+1];
		}else if(maMinute>30 && maMinute<36){
			minuteTexte = nombreTexte[maMinute-30] + " nach halb";
			heureTexte = nombreTexte[monHeure + 1];
			monHeureReelle = monHeure;
			
		}else{
			minuteTexte = nombreTexte[60-maMinute] + " vor ";
		}
	}else {
		monHeureReelle = monHeure;
		signe ="nach";
		if (maMinute>26 && maMinute<30){
			minuteTexte = nombreTexte[30 - maMinute] + " vor halb";
			heureTexte = nombreTexte[monHeure + 1];
		}else{
			minuteTexte = nombreTexte[maMinute]+ " nach ";
		}
	}
}else {
	var monHeureReelle:Number=monHeure;
	switch (maMinute) {
		case 15:
			minuteTexte = "fünfzehn";
			break;
		case 30:
			minuteTexte = "dreizig";
			break; 
		default:
			minuteTexte = nombreTexte[maMinute];
	}
	
}
 
trace("tirage"+_global.tirage)
var maMontre:MovieClip = new heureD(posCentre[0], posCentre[1], fondMc.angleMc, texteValeurH_fmt, texteValeurM_fmt, texteValeurTxt_fmt, texteSolution_fmt, dateMontre_fmt, [450, 360]);
maMontre.heureATrouver=monHeureReelle;
maMontre.minuteATrouver = maMinute;
trace("maMontre.minuteATrouver"+maMontre.minuteATrouver)
fondMc.createEmptyMovieClip("fondTextMc", 2);
//Position si l'heure est en chiffres
fondMc.fondTextMc.createTextField("typeAngleTxt", 1, posCentre[0]+250, posCentre[1]-170, 200, 30);
//Position si l'heure est en lettres
fondMc.fondTextMc.createTextField("typeAngleTxt", 1, posCentre[0]+150, posCentre[1]-170, 250, 30);
fondMc.fondTextMc.typeAngleTxt.selectable = false;
fondMc.fondTextMc.typeAngleTxt.background = false;
fondMc.fondTextMc.typeAngleTxt.multiline = false;
fondMc.fondTextMc.typeAngleTxt.wordWrap = false;
fondMc.fondTextMc.typeAngleTxt.backgroundcolor = 0xff9999;
fondMc.fondTextMc.typeAngleTxt.setNewTextFormat(texteDonnee_fmt);
fondMc.fondTextMc.typeAngleTxt.text = "Wie spät ist es?";
maMontre.textQuestion = fondMc.fondTextMc.typeAngleTxt;

fondMc.createEmptyMovieClip("fondTextHMc", 3);
//Position si l'heure est en chiffres
fondMc.fondTextHMc.createTextField("typeHeureTxt", 2, posCentre[0]+250, posCentre[1]-140, 100, 50);
//Position si l'heure est en lettres
fondMc.fondTextHMc.createTextField("typeHeureTxt", 2, posCentre[0]+150, posCentre[1]-140, 250, 50);
fondMc.fondTextHMc.typeHeureTxt.selectable = false;
fondMc.fondTextHMc.typeHeureTxt.background = false;
fondMc.fondTextHMc.typeHeureTxt.multiline = true;
fondMc.fondTextHMc.typeHeureTxt.wordWrap = true;
fondMc.fondTextHMc.typeHeureTxt.backgroundcolor = 0xff9999;
//Format si l'heure est en chiffres
fondMc.fondTextHMc.typeHeureTxt.setNewTextFormat(texteDonneeC_fmt);
//Format si l'heure est en lettres
fondMc.fondTextHMc.typeHeureTxt.setNewTextFormat(texteDonneeL_fmt);

//si on demande des heures en chiffres
switch (true){
	case (monHeure<10 && maMinute<10):
		fondMc.fondTextHMc.typeHeureTxt.text = "0"+monHeure+":0"+maMinute;
	break;
	case (monHeure<10 && maMinute>=10):
		fondMc.fondTextHMc.typeHeureTxt.text = "0"+monHeure+":"+maMinute;
	break;
	case (monHeure>=10 && maMinute<10):
		fondMc.fondTextHMc.typeHeureTxt.text = monHeure+":0"+maMinute;
	break;
	case (monHeure>=10 && maMinute>=10):
		fondMc.fondTextHMc.typeHeureTxt.text = monHeure+":"+maMinute;
	break;
}

//Si on demande des heures en lettres
if(monHeure>=13){
	switch (monHeure){
		case 1:
		fondMc.fondTextHMc.typeHeureTxt.text = heureTexte+" uhr "+minuteTexte;
		break;
		case 0:
		fondMc.fondTextHMc.typeHeureTxt.text = heureTexte+" "+minuteTexte;
		break;
		case 12:
		fondMc.fondTextHMc.typeHeureTxt.text = heureTexte+" "+minuteTexte;
		break;
		case 24:
		fondMc.fondTextHMc.typeHeureTxt.text = heureTexte+" "+minuteTexte;
		break;
		default:
		fondMc.fondTextHMc.typeHeureTxt.text = heureTexte+" uhr "+minuteTexte;
		break;
	}
	
}else {
	fondMc.fondTextHMc.typeHeureTxt.text = minuteTexte+" "+heureTexte;
}
//fondMc.createEmptyMovieClip("fondTextTestMc", 4);
fondMc.fondTextTestMc.createTextField("typeAngleTxt", 1, posCentre[0] + 280, posCentre[1] - 150, 170, 35);
fondMc.fondTextTestMc.typeAngleTxt.text = _global.tirage;

this.onEnterFrame = function() {
	//ON met dans rep_juste le résultat de l'analyse'
	_level0.rep_juste = maMontre.reponse;
	_level0.retour = maMontre.message;

}

stop();