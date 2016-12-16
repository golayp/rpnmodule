/**
 * ...
 * @author Luthi J-M
 */

import heureDExeIndice10;
import heureDExeIndice100;
import menuDer;

this.createEmptyMovieClip("fondMc",0);
this.createEmptyMovieClip("fondMc10",1);
this.createEmptyMovieClip("fondMc100", 2);
this.createEmptyMovieClip("fondMcPourCentF", 5);
this.createEmptyMovieClip("fondMcPourCentA",6);
this.createEmptyMovieClip("fondMcPourCent",3);
this.createEmptyMovieClip("fondMcPourDix", 4);
this.createEmptyMovieClip("fondMcPourDixA", 7);
this.createEmptyMovieClip("fondMcMenu",1000);
fondMcPourDix._visible=false;
fondMcPourCent._visible = false;
fondMcPourCentF._visible = false;
fondMcPourCentA._visible = false;

var my_fmt:TextFormat = new TextFormat();
my_fmt.bold = true;
my_fmt.size = 12;
my_fmt.color=0xcc3366;

var my_fmt2:TextFormat = new TextFormat();
my_fmt2.bold = true;
my_fmt2.color = 0xff0000;

var maListe:Array = new Array("Dixièmes", "Centièmes", "Astuce dixièmes", "Astuce centièmes", "Fonction dixièmes", "Fonction centièmes", "Toutes les informations 10e", "Toutes les informations 100e");
var case0Txt:String = "Choisir une information";

var monMenu:menuDer = new menuDer(maListe, case0Txt, fondMcMenu, my_fmt, 0xaabbcc, 0x678901);
monMenu.setPosition(405, 2);

var montre100:heureDExeIndice100=new heureDExeIndice100(90,220, fondMc100, my_fmt,my_fmt2);
montre100.visibilite(false);
montre100.setTailleMontre(220);
var montre:heureDExeIndice10=new heureDExeIndice10(115,110, fondMc10);
montre.setTailleMontre(220);
montre.visibilite(false);

fondMc.attachMovie("titreAstuce", "titreAstuceMc", 10);
fondMc.titreAstuceMc._visible = false;
fondMc.attachMovie("fonction10e", "fonction10eMc", 11);
fondMc.fonction10eMc._visible = false;
fondMc.attachMovie("fonction100e", "fonction100eMc", 12);
fondMc.fonction100eMc._visible = false;

fondMc.createEmptyMovieClip("astuce1Mc", 100);
fondMc.astuce1Mc._visible = false;
fondMc.createEmptyMovieClip("astuce2Mc", 101);
fondMc.astuce2Mc._visible = false;
fondMc.attachMovie("dixiemeMc", "dixieme_Mc", 102);
fondMc.dixieme_Mc._visible = false;
fondMc.attachMovie("centiemeMc", "centieme_Mc", 103);
fondMc.centieme_Mc._visible = false;
fondMc.attachMovie("centiemeFonctionMc", "centiemeFonction_Mc", 104);
fondMc.centiemeFonction_Mc._visible = false;
fondMc.attachMovie("centiemeAstuceMc", "centiemAstuce_Mc", 105);
fondMc.centiemAstuce_Mc._visible = false;
fondMc.attachMovie("dixiemeAstuceMc", "dixiemeAstuce_Mc", 106);
fondMc.dixiemeAstuce_Mc._visible = false;

fondMc.titreAstuceMc._x = 12;
fondMc.titreAstuceMc._y = 260;

fondMc.astuce1Mc._x=12;
fondMc.astuce1Mc._y=280;

fondMc.astuce2Mc._x=12;
fondMc.astuce2Mc._y=280;

fondMc.dixieme_Mc._x=400;
fondMc.dixieme_Mc._y = 100;

fondMc.dixiemeAstuce_Mc._x=400;
fondMc.dixiemeAstuce_Mc._y = 100;

fondMc.centiemeFonction_Mc._x = 405;
fondMc.centiemeFonction_Mc._y = 75;

fondMc.centiemAstuce_Mc._x = 410;
fondMc.centiemAstuce_Mc._y = 75;

fondMc.centieme_Mc._x=300;
fondMc.centieme_Mc._y = 75;

fondMc.fonction10eMc._x = 12;
fondMc.fonction10eMc._y = 20;
fondMc.fonction10eMc._width = 1.5 * fondMc.fonction10eMc._width;
fondMc.fonction10eMc._height = 1.5 * fondMc.fonction10eMc._height;

fondMc.fonction100eMc._x = 12;
fondMc.fonction100eMc._y = 20;
fondMc.fonction100eMc._width = 1.5 * fondMc.fonction100eMc._width;
fondMc.fonction100eMc._height = 1.5 * fondMc.fonction100eMc._height;



fondMc.astuce1Mc.createTextField("astuceTxt", 1, 0, 0, 320, 40);
fondMc.astuce2Mc.createTextField("astuceTxt", 1, 0, 0, 320, 85);


fondMc.astuce1Mc.astuceTxt.multiline = true;
fondMc.astuce1Mc.astuceTxt.wordWrap = true;
fondMc.astuce1Mc.astuceTxt.selectable = false;
fondMc.astuce1Mc.astuceTxt.color = 0xcc3366;
fondMc.astuce1Mc.astuceTxt.text = "Avec les dixièmes:\n-On prend le chiffre des dixièmes et on le multiplie par 6";
fondMc.astuce1Mc.astuceTxt.setTextFormat(my_fmt);

fondMc.astuce2Mc.astuceTxt.multiline = true;
fondMc.astuce2Mc.astuceTxt.wordWrap = true;
fondMc.astuce2Mc.astuceTxt.selectable = false;
fondMc.astuce2Mc.astuceTxt.border = false;
fondMc.astuce2Mc.astuceTxt.text = "Avec les centièmes, on fait une approximation:\n-On multiplie le chiffre des centièmes par 6.\n-On le divise par 10\n(en déplaçant la virgule de 1 rang à gauche).\n-On l'arrondit.\n-On additionne le résultat au nombre de minutes données\n par les dixièmes";
fondMc.astuce2Mc.astuceTxt.setTextFormat(my_fmt);


montre100.visibilite(true);
montre.visibilite(false);
montre100.setTailleMontre(400);
montre100.setPosition(220, 150);
montre100.setPositionMasque(5, -100);
fondMc.titreAstuceMc._visible = false;
fondMc.fonction10eMc._visible = false;
fondMc.fonction100eMc._visible = false;
fondMc.centiemeFonction_Mc._visible = false;
fondMc.centiemAstuce_Mc._visible = false;
fondMc.astuce1Mc._visible = false;
fondMc.astuce2Mc._visible = false;
fondMc.dixieme_Mc._visible = false;
fondMc.centieme_Mc._visible = false;
fondMcPourDix._visible = false;
fondMcPourDixA._visible = false;
fondMcPourCent._visible = false;
fondMcPourCentF._visible = false;

var allume:Boolean=false;
var largeur:Number=19;
for (i=0;i<10;i++){
	fondMcPourDix.createEmptyMovieClip("cache"+i,i+1);
	//Pour que si on passe sur le tableau de valeurs on ait les parties sur la montre
	fondMcPourDix["cache"+i].moveTo (450, 125+i*largeur);
	fondMcPourDix["cache"+i].beginFill(0xcc3366, 0);
	fondMcPourDix["cache"+i].lineTo (530,125+i*largeur);
	fondMcPourDix["cache"+i].lineTo (530,125+(i+1)*largeur);
	fondMcPourDix["cache"+i].lineTo (450, 125+(i+1)*largeur);
	fondMcPourDix["cache"+i].lineTo (450, 125+i*largeur);
	fondMcPourDix["cache"+i].endFill;
	fondMcPourDix["cache"+i].createEmptyMovieClip("couleur", 0);
	fondMcPourDix["cache"+i].couleur.lineStyle(0, 0x000000);
	fondMcPourDix["cache"+i].couleur.moveTo (450, 125+i*largeur);
	fondMcPourDix["cache"+i].couleur.beginFill(0xcc3366, 70);
	fondMcPourDix["cache"+i].couleur.lineTo (530,125+i*largeur);
	fondMcPourDix["cache"+i].couleur.lineTo (530,125+(i+1)*largeur);
	fondMcPourDix["cache"+i].couleur.lineTo (450, 125+(i+1)*largeur);
	fondMcPourDix["cache"+i].couleur.lineTo (450, 125+i*largeur);
	fondMcPourDix["cache"+i].couleur.endFill;
	fondMcPourDix["cache"+i].couleur._visible = false;
	fondMcPourDix["cache" + i].onRollOver = function() {
		
		this.couleur._visible = true;
		allume=true;
	}
	fondMcPourDix["cache"+i].onRollOut=function(){
		this.couleur._visible = false;
		allume=false;
	}
}

var allumeDix:Boolean=false;
var largeurDix:Number=19;
for (i=0;i<10;i++){
	fondMcPourDixA.createEmptyMovieClip("cache"+i,i+1);
	//Pour que si on passe sur le tableau de valeurs on ait les parties sur la montre
	fondMcPourDixA["cache"+i].moveTo (450, 125+i*largeurDix);
	fondMcPourDixA["cache"+i].beginFill(0xcc3366, 0);
	fondMcPourDixA["cache"+i].lineTo (530,125+i*largeurDix);
	fondMcPourDixA["cache"+i].lineTo (530,125+(i+1)*largeurDix);
	fondMcPourDixA["cache"+i].lineTo (450, 125+(i+1)*largeurDix);
	fondMcPourDixA["cache"+i].lineTo (450, 125+i*largeurDix);
	fondMcPourDixA["cache"+i].endFill;
	fondMcPourDixA["cache"+i].createEmptyMovieClip("couleur", 0);
	fondMcPourDixA["cache"+i].couleur.lineStyle(0, 0x000000);
	fondMcPourDixA["cache"+i].couleur.moveTo (450, 125+i*largeurDix);
	fondMcPourDixA["cache"+i].couleur.beginFill(0xcc3366, 70);
	fondMcPourDixA["cache"+i].couleur.lineTo (530,125+i*largeurDix);
	fondMcPourDixA["cache"+i].couleur.lineTo (530,125+(i+1)*largeurDix);
	fondMcPourDixA["cache"+i].couleur.lineTo (450, 125+(i+1)*largeurDix);
	fondMcPourDixA["cache"+i].couleur.lineTo (450, 125+i*largeurDix);
	fondMcPourDixA["cache"+i].couleur.endFill;
	fondMcPourDixA["cache" + i].couleur._visible = false;
	
	fondMcPourDixA["cache" + i].onRollOver = function() {
		trace('cache visible');
		this.couleur._visible = true;
		allumeDix=true;
	}
	fondMcPourDixA["cache"+i].onRollOut=function(){
		this.couleur._visible = false;
		allumeDix=false;
	}
}

var allumeCent:Boolean=false;
var largeurCent:Number=19;
for (i=0;i<10;i++){
	fondMcPourCent.createEmptyMovieClip("cacheCent"+i,i+1000);
	//Pour que si on passe sur le tableau de valeurs on ait les parties sur la montre
	fondMcPourCent["cacheCent"+i].moveTo (320, 120+i*largeurCent);
	fondMcPourCent["cacheCent"+i].beginFill(0xcc3366, 0);
	fondMcPourCent["cacheCent"+i].lineTo (600,120+i*largeurCent);
	fondMcPourCent["cacheCent"+i].lineTo (600,120+(i+1)*largeurCent);
	fondMcPourCent["cacheCent"+i].lineTo (320, 120+(i+1)*largeurCent);
	fondMcPourCent["cacheCent"+i].lineTo (320, 120+i*largeurCent);
	fondMcPourCent["cacheCent"+i].endFill;
	//Pour mettre de la couleur sur celui sur lequel on est
	fondMcPourCent["cacheCent"+i].createEmptyMovieClip("couleur", 0);
	fondMcPourCent["cacheCent"+i].couleur.lineStyle(0, 0x000000);
	fondMcPourCent["cacheCent"+i].couleur.moveTo (320, 120+i*largeurCent);
	fondMcPourCent["cacheCent"+i].couleur.beginFill(0xcc3366, 70);
	fondMcPourCent["cacheCent"+i].couleur.lineTo (600,120+i*largeurCent);
	fondMcPourCent["cacheCent"+i].couleur.lineTo (600,120+(i+1)*largeurCent);
	fondMcPourCent["cacheCent"+i].couleur.lineTo (320, 120+(i+1)*largeurCent);
	fondMcPourCent["cacheCent"+i].couleur.lineTo (320, 120+i*largeurCent);
	fondMcPourCent["cacheCent"+i].couleur.endFill;
	fondMcPourCent["cacheCent"+i].couleur._visible = false;
	
	fondMcPourCent["cacheCent"+i].onRollOver=function(){
		this.couleur._visible = true;
		allumeCent=true;
	}
	fondMcPourCent["cacheCent"+i].onRollOut=function(){
		this.couleur._visible = false;
		allumeCent=false;
	}
}

var allumeCentF:Boolean=false;
var largeurCentF:Number=19;
for (i=0;i<10;i++){
	fondMcPourCentF.createEmptyMovieClip("cacheCentF"+i,i+1100);
	//Pour que si on passe sur le tableau de valeurs on ait les parties sur la montre
	fondMcPourCentF["cacheCentF"+i].moveTo (450, 120+i*largeurCent);
	fondMcPourCentF["cacheCentF"+i].beginFill(0xcc3366, 0);
	fondMcPourCentF["cacheCentF"+i].lineTo (530,120+i*largeurCent);
	fondMcPourCentF["cacheCentF"+i].lineTo (653000,120+(i+1)*largeurCent);
	fondMcPourCentF["cacheCentF"+i].lineTo (450, 120+(i+1)*largeurCent);
	fondMcPourCentF["cacheCentF"+i].lineTo (450, 120+i*largeurCent);
	fondMcPourCentF["cacheCentF"+i].endFill;
	//Pour mettre de la couleur sur celui sur lequel on est
	fondMcPourCentF["cacheCentF"+i].createEmptyMovieClip("couleur", 0);
	fondMcPourCentF["cacheCentF"+i].couleur.lineStyle(0, 0x000000);
	fondMcPourCentF["cacheCentF"+i].couleur.moveTo (450, 120+i*largeurCent);
	fondMcPourCentF["cacheCentF"+i].couleur.beginFill(0xcc3366, 70);
	fondMcPourCentF["cacheCentF"+i].couleur.lineTo (530,120+i*largeurCent);
	fondMcPourCentF["cacheCentF"+i].couleur.lineTo (530,120+(i+1)*largeurCent);
	fondMcPourCentF["cacheCentF"+i].couleur.lineTo (450, 120+(i+1)*largeurCent);
	fondMcPourCentF["cacheCentF"+i].couleur.lineTo (450, 120+i*largeurCent);
	fondMcPourCentF["cacheCentF"+i].couleur.endFill;
	fondMcPourCentF["cacheCentF"+i].couleur._visible = false;
	
	fondMcPourCentF["cacheCentF"+i].onRollOver=function(){
		this.couleur._visible = true;
		allumeCentF=true;
	}
	fondMcPourCentF["cacheCentF"+i].onRollOut=function(){
		this.couleur._visible = false;
		allumeCentF=false;
	}
}

var allumeCentA:Boolean=false;
var largeurCentA:Number=19;
for (i=0;i<10;i++){
	fondMcPourCentA.createEmptyMovieClip("cacheCentA"+i,i+1100);
	//Pour que si on passe sur le tableau de valeurs on ait les parties sur la montre
	fondMcPourCentA["cacheCentA"+i].moveTo (450, 120+i*largeurCent);
	fondMcPourCentA["cacheCentA"+i].beginFill(0xcc3366, 0);
	fondMcPourCentA["cacheCentA"+i].lineTo (590,120+i*largeurCent);
	fondMcPourCentA["cacheCentA"+i].lineTo (590,120+(i+1)*largeurCent);
	fondMcPourCentA["cacheCentA"+i].lineTo (450, 120+(i+1)*largeurCent);
	fondMcPourCentA["cacheCentA"+i].lineTo (450, 120+i*largeurCent);
	fondMcPourCentA["cacheCentA"+i].endFill;
	//Pour mettre de la couleur sur celui sur lequel on est
	fondMcPourCentA["cacheCentA"+i].createEmptyMovieClip("couleur", 0);
	fondMcPourCentA["cacheCentA"+i].couleur.lineStyle(0, 0x000000);
	fondMcPourCentA["cacheCentA"+i].couleur.moveTo (450, 120+i*largeurCent);
	fondMcPourCentA["cacheCentA"+i].couleur.beginFill(0xcc3366, 70);
	fondMcPourCentA["cacheCentA"+i].couleur.lineTo (590,120+i*largeurCent);
	fondMcPourCentA["cacheCentA"+i].couleur.lineTo (590,120+(i+1)*largeurCent);
	fondMcPourCentA["cacheCentA"+i].couleur.lineTo (450, 120+(i+1)*largeurCent);
	fondMcPourCentA["cacheCentA"+i].couleur.lineTo (450, 120+i*largeurCent);
	fondMcPourCentA["cacheCentA"+i].couleur.endFill;
	fondMcPourCentA["cacheCentA"+i].couleur._visible = false;
	
	fondMcPourCentA["cacheCentA"+i].onRollOver=function(){
		this.couleur._visible = true;
		allumeCentA=true;
	}
	fondMcPourCentA["cacheCentA"+i].onRollOut=function(){
		this.couleur._visible = false;
		allumeCentA=false;
	}
}

OEFPourCentF();
//On crée une variable pour comparer si on a choisi autre chose dans les menu déroulant
var monChoix:String = "";
fondMcMenu.onEnterFrame = function() {
	if (monChoix != monMenu.monRetour) {
		//trace("" + )
		//trace(""+)
		choix(monMenu.monRetour, maListe);
		monChoix = monMenu.monRetour;
	}
}

/*fondMc.astuce1Mc.onRollOver=function(){
	delete fondMcPourCent.onEnterFrame;
	montre.visibilite(true);
	montre100.visibilite(false);
	fondMc.astuce1Mc._alpha=100;
	fondMc.astuce2Mc._alpha=50;
	fondMc.dixieme_Mc._visible=true;
	fondMcPourDix._visible=true;
	fondMc.centieme_Mc._visible=false;
	fondMcPourCent._visible=false;
	montre.visibilite(true);
	OFEPourDix();
}
fondMc.astuce1Mc.onRollOut=function(){
	//fondMc.astuce1Mc._alpha=50;
	//fondMc.dixieme_Mc._visible=false;
	//fondMc.astuce2Mc._alpha=100;
	//fondMc.centieme_Mc._visible=true;
}
fondMc.astuce2Mc.onRollOver=function(){
	delete fondMcPourDix.onEnterFrame;
	montre100.visibilite(true);
	montre.visibilite(false);
	for (i=0;i<10;i++){
		fondMc["cache"+i]._visible = false;
	}
	fondMc.astuce1Mc._alpha=50;
	fondMc.astuce2Mc._alpha=100;
	fondMc.centieme_Mc._visible=true;
	fondMcPourCent._visible=true;
	fondMc.dixieme_Mc._visible=false;
	fondMcPourDix._visible=false;
	OEFPourCent();
}
fondMc.astuce2Mc.onRollOut=function(){
	//fondMc.astuce2Mc._alpha=50;
	
}*/

//Cette fonction fait que lorsqu'on survol le tableau des dixièmes d'heures, la montre interagit et vice-et versa
function OEFPourDix(){
	fondMcPourDix.onEnterFrame=function(){
		if(montre.nbDeDixiemes!=-1){
			for (var i=0;i<10;i++){
				if(i==montre.nbDeDixiemes){
					fondMcPourDix["cache"+i].couleur._visible=true;
					
				}else{
					fondMcPourDix["cache"+i].couleur._visible=false;
					
				}
			}
		}else {
	
			if (allume==true){
				for (var i=0;i<10;i++){
					//montre.setDixiemes(i, false);
					if(fondMcPourDix["cache"+i].couleur._visible==true){
						trace("visible")
						if (i==0){
							montre.setDixiemes(10,10);
						}else{
							montre.setDixiemes(10,i);
						}
					}
				}
			}else {
				for (var i=0;i<10;i++){
					if(fondMcPourDix["cache"+i].couleur._visible==true){
						trace(i+" est visible")
						fondMcPourDix["cache"+i].couleur._visible=false;
					}
				}
				montre.setDixiemes(10,0);
			}
		}
	
	}
}
//Cette fonction fait que lorsqu'on survol le tableau des dixièmes d'heures, la montre interagit et vice-et versa
function OEFPourDixA(){
	fondMcPourDixA.onEnterFrame=function(){
		if(montre.nbDeDixiemes!=-1){
			for (var i=0;i<10;i++){
				if(i==montre.nbDeDixiemes){
					fondMcPourDixA["cache"+i].couleur._visible=true;
					
				}else{
					fondMcPourDixA["cache"+i].couleur._visible=false;
					
				}
			}
		}else {
	
			if (allumeDix==true){
				for (var i=0;i<10;i++){
					//montre.setDixiemes(i, false);
					if(fondMcPourDixA["cache"+i].couleur._visible==true){
						trace("visible")
						if (i==0){
							montre.setDixiemes(10,10);
						}else{
							montre.setDixiemes(10,i);
						}
					}
				}
			}else {
				for (var i=0;i<10;i++){
					if(fondMcPourDixA["cache"+i].couleur._visible==true){
						trace(i+" est visible")
						fondMcPourDixA["cache"+i].couleur._visible=false;
					}
				}
				montre.setDixiemes(10,0);
			}
		}
	
	}
}
//Cette fonction fait que lorsqu'on survol le tableau des centièmes d'heures, la montre interagit et vice-et versa
function OEFPourCent(){
	fondMcPourCent.onEnterFrame=function(){
		if(montre100.nbDeCentiemes!=-1){
			//trace("montre100.nbDeCentiemes différents de -1"+montre100.nbDeCentiemes)
			for (var i=0;i<10;i++){
				if(i==montre100.nbDeCentiemes){
					fondMcPourCent["cacheCent"+i].couleur._visible=true;
					
				}else{
					fondMcPourCent["cacheCent"+i].couleur._visible=false;
					
				}
			}
		}else {
			
			//trace("montre100.nbDeCentiemes"+montre100.nbDeCentiemes)
			
			if (allumeCent == true) {
				trace ("OFEPourCent, allume=true")
				for (var i=0;i<10;i++){
					if(fondMcPourCent["cacheCent"+i].couleur._visible==true){
							montre100.setCentiemes(10,i+1);
					}
				}
			}else {
				for (var i=0;i<10;i++){
					if(fondMcPourCent["cacheCent"+i].couleur._visible==true){
						trace(i+" est visible")
						fondMcPourCent["cacheCent"+i].couleur._visible=false;
					}
				}
				montre100.setCentiemes(10,0);
				
			}
		}
	
	}
}
//Cette fonction fait que lorsqu'on survol le tableau des centièmes d'heures (2 colonnes), la montre interagit et vice-et versa
function OEFPourCentF(){
	fondMcPourCentF.onEnterFrame=function(){
		if(montre100.nbDeCentiemes!=-1){
			//trace("montre100.nbDeCentiemes différents de -1"+montre100.nbDeCentiemes)
			for (var i=0;i<10;i++){
				if(i==montre100.nbDeCentiemes){
					fondMcPourCentF["cacheCentF"+i].couleur._visible=true;
					
				}else{
					fondMcPourCentF["cacheCentF"+i].couleur._visible=false;
					
				}
			}
		}else {
			
			//trace("montre100.nbDeCentiemes"+montre100.nbDeCentiemes)
			
			if (allumeCentF==true){
				for (var i=0;i<10;i++){
					if(fondMcPourCentF["cacheCentF"+i].couleur._visible==true){
							montre100.setCentiemes(10,i+1);
					}
				}
			}else {
				for (var i=0;i<10;i++){
					if(fondMcPourCentF["cacheCentF"+i].couleur._visible==true){
						trace(i+" est visible")
						fondMcPourCentF["cacheCentF"+i].couleur._visible=false;
					}
				}
				montre100.setCentiemes(10,0);
				
			}
		}
	
	}
}

//Cette fonction fait que lorsqu'on survol le tableau des centièmes d'heures, les approximations (2 colonnes), la montre interagit et vice-et versa
function OEFPourCentA(){
	fondMcPourCentA.onEnterFrame=function(){
		if(montre100.nbDeCentiemes!=-1){
			//trace("montre100.nbDeCentiemes différents de -1"+montre100.nbDeCentiemes)
			for (var i=0;i<10;i++){
				if(i==montre100.nbDeCentiemes){
					fondMcPourCentA["cacheCentA"+i].couleur._visible=true;
					
				}else{
					fondMcPourCentA["cacheCentA"+i].couleur._visible=false;
					
				}
			}
		}else {
			
			//trace("montre100.nbDeCentiemes"+montre100.nbDeCentiemes)
			
			if (allumeCentA==true){
				for (var i=0;i<10;i++){
					if(fondMcPourCentA["cacheCentA"+i].couleur._visible==true){
							montre100.setCentiemes(10,i+1);
					}
				}
			}else {
				for (var i=0;i<10;i++){
					if(fondMcPourCentA["cacheCentA"+i].couleur._visible==true){
						trace(i+" est visible")
						fondMcPourCentA["cacheCentA"+i].couleur._visible=false;
					}
				}
				montre100.setCentiemes(10,0);
				
			}
		}
	
	}
}
//Fonction permettant de choisir ce qui va apparître à l'écran
function choix(monChoix:String, listeChoix:Array) {
	
	switch (monChoix) {//"Dixièmes"
		case listeChoix[0]:
			delete fondMcPourDix.onEnterFrame;
			delete fondMcPourDixA.onEnterFrame;
			delete fondMcPourCent.onEnterFrame;
			delete fondMcPourCentF.onEnterFrame;
			delete fondMcPourCentA.onEnterFrame;
			montre100.visibilite(false);
			montre.visibilite(true);
			montre.setTailleMontre(280);
			montre.setPosition(130, 80);
			fondMc.titreAstuceMc._visible = false;
			fondMc.fonction10eMc._visible = false;
			fondMc.fonction100eMc._visible = false;
			fondMc.centiemeFonction_Mc._visible = false;
			fondMc.centiemAstuce_Mc._visible = false;
			fondMc.astuce1Mc._visible = false;
			fondMc.astuce2Mc._visible = false;
			fondMc.dixieme_Mc._visible = false;
			fondMc.dixiemeAstuce_Mc._visible = false;
			fondMc.centieme_Mc._visible = false;
			fondMcPourCent._visible=true;
			fondMc.dixieme_Mc._visible=false;
			fondMcPourDix._visible = false;
			fondMcPourDixA._visible = false;
			fondMcPourCent._visible = false;
			fondMcPourCentF._visible = false;
			fondMcPourCentA._visible = false;
			
			break;
		case listeChoix[1]://"Centièmes"
			delete fondMcPourDix.onEnterFrame;
			delete fondMcPourDixA.onEnterFrame;
			delete fondMcPourCent.onEnterFrame;
			delete fondMcPourCentF.onEnterFrame;
			delete fondMcPourCentA.onEnterFrame;
			montre100.visibilite(true);
			montre.visibilite(false);
			montre.setTailleMontre(170);
			montre.setPosition(10, 25);
			montre100.setTailleMontre(400);
			montre100.setPosition(220, 150);
			montre100.setPositionMasque(5, -100);
			fondMc.titreAstuceMc._visible = false;
			fondMc.fonction10eMc._visible = false;
			fondMc.fonction100eMc._visible = false;
			fondMc.centiemeFonction_Mc._visible = false;
			fondMc.centiemAstuce_Mc._visible = false;
			fondMc.astuce1Mc._visible = false;
			fondMc.astuce2Mc._visible = false;
			fondMc.dixieme_Mc._visible = false;
			fondMc.dixiemeAstuce_Mc._visible = false;
			fondMc.centieme_Mc._visible = false;
			fondMcPourDix._visible = false;
			fondMcPourDixA._visible = false;
			fondMcPourCent._visible = false;
			fondMcPourCentF._visible = false;
			fondMcPourCentA._visible = false;
			break;
		case listeChoix[2]://"Astuce dixièmes"
			delete fondMcPourDix.onEnterFrame;
			delete fondMcPourDixA.onEnterFrame;
			delete fondMcPourCent.onEnterFrame;
			delete fondMcPourCentF.onEnterFrame;
			delete fondMcPourCentA.onEnterFrame;
			montre100.visibilite(false);
			montre.visibilite(true);
			montre.setTailleMontre(170);
			montre.setPosition(10, 35);
			fondMc.titreAstuceMc._visible = true;
			fondMc.fonction10eMc._visible = false;
			fondMc.fonction100eMc._visible = false;
			fondMc.centiemeFonction_Mc._visible = false;
			fondMc.centiemAstuce_Mc._visible = false;
			fondMc.astuce1Mc._visible = true;
			fondMc.astuce2Mc._visible = false;
			fondMc.dixieme_Mc._visible = false;
			fondMc.dixiemeAstuce_Mc._visible = true;
			fondMc.centieme_Mc._visible = false;
			fondMcPourDix._visible = false;
			fondMcPourDixA._visible=true;
			fondMcPourCent._visible = false;
			fondMcPourCentF._visible = false;
			fondMcPourCentA._visible = false;
			OEFPourDixA();
			break;
		case listeChoix[3]://"Astuce centièmes"
			delete fondMcPourDix.onEnterFrame;
			delete fondMcPourDixA.onEnterFrame;
			delete fondMcPourCent.onEnterFrame;
			delete fondMcPourCentF.onEnterFrame;
			delete fondMcPourCentA.onEnterFrame;
			montre100.visibilite(true);
			montre.visibilite(false);
			montre.setTailleMontre(170);
			montre.setPosition(10, 25);
			montre100.setTailleMontre(220);
			montre100.setPosition(90, -30);
			montre100.setPositionMasque(50, 70);
			fondMc.titreAstuceMc._visible = true;
			fondMc.fonction10eMc._visible = false;
			fondMc.fonction100eMc._visible = false;
			fondMc.centiemeFonction_Mc._visible = false;
			fondMc.centiemAstuce_Mc._visible = true;
			fondMc.astuce1Mc._visible = false;
			fondMc.astuce2Mc._visible = true;
			fondMc.dixieme_Mc._visible = false;
			fondMc.dixiemeAstuce_Mc._visible = false;
			fondMc.centieme_Mc._visible = false;
			fondMcPourDix._visible = false;
			fondMcPourDixA._visible = false;
			fondMcPourCent._visible = false;
			fondMcPourCentF._visible = false;
			fondMcPourCentA._visible = true;
			OEFPourCentA();
			break;
		case listeChoix[4]://"Fonction dixièmes"
			delete fondMcPourDix.onEnterFrame;
			delete fondMcPourDixA.onEnterFrame;
			delete fondMcPourCent.onEnterFrame;
			delete fondMcPourCentF.onEnterFrame;
			delete fondMcPourCentA.onEnterFrame;
			montre100.visibilite(false);
			montre.visibilite(true);
			montre.setTailleMontre(170);
			montre.setPosition(10, 60);
			fondMc.titreAstuceMc._visible = false;
			fondMc.fonction10eMc._visible = true;
			fondMc.fonction100eMc._visible = false;
			fondMc.centiemeFonction_Mc._visible = false;
			fondMc.centiemAstuce_Mc._visible = false;
			fondMc.astuce1Mc._visible = false;
			fondMc.astuce2Mc._visible = false;
			fondMc.dixieme_Mc._visible = true;
			fondMc.dixiemeAstuce_Mc._visible = false;
			fondMc.centieme_Mc._visible = false;
			fondMcPourDix._visible = true;
			fondMcPourDixA._visible = false;
			fondMcPourCent._visible = false;
			fondMcPourCentF._visible = false;
			fondMcPourCentA._visible = false;
			fondMc.fonction10eMc._y = 20;
			fondMc.fonction100eMc._y = 20;
			OEFPourDix();
			break;
		case listeChoix[5]://"Fonction centièmes"
			delete fondMcPourDix.onEnterFrame;
			delete fondMcPourDixA.onEnterFrame;
			delete fondMcPourCent.onEnterFrame;
			delete fondMcPourCentF.onEnterFrame;
			delete fondMcPourCentA.onEnterFrame;
			montre100.visibilite(true);
			montre.visibilite(false);
			montre.setTailleMontre(170);
			montre.setPosition(10, 25);
			montre100.setTailleMontre(220);
			montre100.setPosition(110, 70);
			montre100.setPositionMasque(50, 70);
			fondMc.titreAstuceMc._visible = false;
			fondMc.fonction10eMc._visible = false;
			fondMc.fonction100eMc._visible = true;
			fondMc.centiemeFonction_Mc._visible = true;
			fondMc.centiemAstuce_Mc._visible = false;
			fondMc.astuce1Mc._visible = false;
			fondMc.astuce2Mc._visible = false;
			fondMc.dixieme_Mc._visible = false;
			fondMc.dixiemeAstuce_Mc._visible = false;
			fondMc.centieme_Mc._visible = false;
			fondMcPourDix._visible = false;
			fondMcPourDixA._visible = false;
			fondMcPourCent._visible = false;
			fondMcPourCentF._visible = true;
			fondMcPourCentA._visible = false;
			fondMc.fonction10eMc._y = 15;
			fondMc.fonction100eMc._y = 20;
			OEFPourCentF();
			break;
		case listeChoix[6]://"toutes les informations 10e"
			delete fondMcPourDix.onEnterFrame;
			delete fondMcPourDixA.onEnterFrame;
			delete fondMcPourCent.onEnterFrame;
			delete fondMcPourCentF.onEnterFrame;
			delete fondMcPourCentA.onEnterFrame;
			montre100.visibilite(false);
			montre.visibilite(true);
			montre.setTailleMontre(170);
			montre.setPosition(10, 55);
			fondMc.titreAstuceMc._visible = true;
			fondMc.fonction10eMc._visible = true;
			fondMc.fonction100eMc._visible = false;
			fondMc.centiemeFonction_Mc._visible = false;
			fondMc.centiemAstuce_Mc._visible = false;
			fondMc.astuce1Mc._visible = true;
			fondMc.astuce2Mc._visible = false;
			fondMc.dixieme_Mc._visible = false;
			fondMc.dixiemeAstuce_Mc._visible = true;
			fondMc.centieme_Mc._visible = false;
			fondMcPourDix._visible = false;
			fondMcPourDixA._visible = true;
			fondMcPourCent._visible = false;
			fondMcPourCentF._visible = false;
			fondMcPourCentA._visible = false;
			fondMc.fonction10eMc._y = 15;
			fondMc.fonction100eMc._y = 20;
			OEFPourDixA();
			break;
		case listeChoix[7]://"toutes les informations 100e" setPositionMasque
			delete fondMcPourDix.onEnterFrame;
			delete fondMcPourDixA.onEnterFrame;
			delete fondMcPourCent.onEnterFrame;
			delete fondMcPourCentF.onEnterFrame;
			delete fondMcPourCentA.onEnterFrame;
			montre100.visibilite(true);
			montre.visibilite(false);
			montre.setTailleMontre(170);
			montre.setPosition(10, 25);
			montre100.setTailleMontre(170);
			montre100.setPosition(20, 0);
			fondMc.titreAstuceMc._visible = true;
			fondMc.fonction10eMc._visible = false;
			fondMc.fonction100eMc._visible = true;
			fondMc.centiemeFonction_Mc._visible = false;
			fondMc.centiemAstuce_Mc._visible = false;
			fondMc.astuce1Mc._visible = false;
			fondMc.astuce2Mc._visible = true;
			fondMc.dixieme_Mc._visible = false;
			fondMc.dixiemeAstuce_Mc._visible = false;
			fondMc.centieme_Mc._visible = true;
			fondMcPourDix._visible = false;
			fondMcPourDixA._visible = false;
			fondMcPourCent._visible = true;
			fondMcPourCentF._visible = false;
			fondMcPourCentA._visible = false;
			fondMc.fonction10eMc._y = 15;
			fondMc.fonction100eMc._y = 15;
			OEFPourCent();
			break;
		default:
			trace("default");
			break;
	}
	
}