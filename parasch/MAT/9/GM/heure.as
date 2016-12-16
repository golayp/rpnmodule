/**
 * ...
 * @author Jean-Michel Luthi
 */

import mx.data.encoders.Num;
import TextField;
import timer;
import Date;


//On crée la classe (le nom est celui du nom de fichier et aussi celui de la fonction principale)
class heure extends MovieClip
{
//variables demandées lors de la création d'une occurence
public var posX:Number; //position X du clip unite
public var posY:Number; //position Y du clip unite
public var angleValeur:Number; // valeur de l'angle en radians
public var angleValeurM:Number; // valeur de l'angle de la branche des minutes par rapport au nord en degrés.
public var angleValeurH:Number; // valeur de l'angle de la branche des heures par rapport au nord en degrés.
public var angleValeurRel:Number; // valeur de l'angle 2ème Branche par rapport à la première.
public var heureATrouver:Number; // valeur de l'heure à trouver
public var minuteATrouver:Number; // valeur des minutes à trouver.
public var ceClip:MovieClip;
public var posSourisArray:Array;//coordonnées de la souris
public var tailleScene:Array;//taille dans laquelle on veut voir tourner les branches de l'angle
public var reponse:Boolean; //On va y mettre le valeur de rep_juste
public var minutes:Number;//les minutes qu'indique l'aiguille des minutes
public var heures:Number;//les heures qu'indique l'aiguille des heures
//autres variables
public var conteneur:MovieClip; //clip contenant la case
public var formatValeurH:TextFormat;//format pour les heures
public var formatValeurM:TextFormat;//format pour les miutes
public var formatValeurTxt:TextFormat;//format pour le texte h:min
public var formatTxtSol:TextFormat;//format pour le texte h:min
public var typeAngle:String;//type d'angle à trouver
public var textQuestion:TextField;//Champ texte où il y a la question
public var message:String;//message transmis à l'interfaceAvecIF


private var posDep:Array=new Array(); //position de départ de l'arc de cercle
private	var posArr:Array = new Array(); //position d'arrivée de l'arc de cercle
//private var angle1Txt:Number;
//private	var angle2Txt:Number;
private	var angleVectTxt:Number;
private	var angleHeureMin:Array = new Array();
private	var heureDep:Number;
private	var minDep:Number;
private var plusPetitQue180:Boolean;
private var tailleAiguille:Number;

	function heure(XTemp,YTemp, clipConteneur, formatHTemp, formatMTemp, formatTxtTemp, formatTxtSolTemp, questionTemp, tailleSceneTemp)
	{
		//On cree un objet date qui retournera la date et l'heure pour mettre la montre à l'heure lorsqu'on la charge
		var my_date:Date = new Date();
		trace("my_date.getHours()"+my_date.getHours());
		trace("my_date.getMinutes()" + my_date.getMinutes());
		
		trace("my_date.getDate()" + my_date.getDate());
		trace("my_date.getFullYear()" + my_date.getFullYear());
		
		//On crée un tableau reliant le numéro du mois au nom du mois
		var mois:Array = new Array("janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre");
		//les mois commencent à 0 
		trace("Date: " + my_date.getDate() +" " + mois[(my_date.getMonth())] + " " + my_date.getFullYear() + " à " + my_date.getHours() + "h " + my_date.getMinutes() + "min");
		trace("Date: " + maDate());

		posX = XTemp;
		posY = YTemp;
		tailleScene = tailleSceneTemp;
		trace("dans angle"+tailleScene)
		ceClip = this;
		ceClip._x = posX;
		ceClip._y = posY;
		conteneur = clipConteneur;
		formatValeurH = formatHTemp;
		formatValeurM = formatMTemp;
		formatValeurTxt = formatTxtTemp;
		formatTxtSol = formatTxtSolTemp;
		plusPetitQue180 = true;
		//textQuestion = questionTemp;
		//On place l'heure de départ de façon aléatoire
		heureDep = Math.floor(Math.random() * 23);
		minDep = Math.floor(Math.random() * 59);
		//On place l'heure de départ à l'heure actuelle
		heureDep = my_date.getHours();
		minDep = my_date.getMinutes();
		//heureDep = 13;
		//minDep = 13;
		minutes = minDep;
		heures = heureDep;
		angleHeureMin = heureAngleDeg(heureDep, minDep);//heureAngleDeg retourne l'angle en degres depuis le nord
		trace("angle heure min: "+angleHeureMin)
		angleValeurH = angleHeureMin[0];//angle des Heures
		angleValeurM = angleHeureMin[1];//angle des minutes
		angleValeurRel = Math.random() * 90-angleValeurM;

		trace("angleDegHeure"+angleDegHeure(angleValeurH,angleValeurM))
		//on lance la création du clip
		dessineLeClip();
		//temps = Date.getHours();
		//
		//trace("temps"+temps)
	}
	function maDate():String {
		var monRetour:String;
		var myDate:Date = new Date();
		//On crée un tableau reliant le numéro du mois au nom du mois
		var mois:Array = new Array("janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre");
		monRetour = myDate.getDate() +" " + mois[(myDate.getMonth())] + " " + myDate.getFullYear() + " à " + myDate.getHours() + "h " + myDate.getMinutes() + "min";
		return monRetour;
	}
	


	function dessineLeClip()
	{
		
		//On crée un support pour le clip de chaque branche et un support pour le remplissage pour pouvoir mettre le onPress et le onRelease
		//On ne peut pas mettre onRelease sur le clip branche car il est recréé tout le temps.

		conteneur.attachMovie("heureBaseMc", "angleMc0", 0);
		conteneur.angleMc0._x = posX;
		conteneur.angleMc0._y = posY;
		conteneur.createEmptyMovieClip("angleMcM", 3);
		conteneur.createEmptyMovieClip("angleMcH", 2);
		conteneur.createEmptyMovieClip("angleMc3", 1);
		
		//conteneur.createTextField("conteneurTxtH", 5, 0, 0, 25, 20);
		conteneur.conteneurTxtH.selectable = false;
		conteneur.conteneurTxtH.background = false;
		conteneur.conteneurTxtH.backgroundcolor = 0xff0000;
		conteneur.conteneurTxtH.setNewTextFormat(formatValeurH);
		
		//conteneur.createTextField("conteneurTxtM", 4, 0, 0, 50, 20);
		conteneur.conteneurTxtM.selectable = false;
		conteneur.conteneurTxtM.background = false;
		conteneur.conteneurTxtM.backgroundcolor = 0xff0000;
		conteneur.conteneurTxtM.setNewTextFormat(formatValeurM);
		
		//conteneur.createTextField("conteneurTxtInfo", 6, 0, 0, 160, 30);
		conteneur.conteneurTxtInfo.selectable = false;
		conteneur.conteneurTxtInfo.background = false;
		conteneur.conteneurTxtInfo.backgroundcolor = 0xff0000;
		conteneur.conteneurTxtInfo.setNewTextFormat(formatValeurTxt);
		conteneur.conteneurTxtInfo.text = "Ma montre indique: ";
		
		//conteneur.createTextField("conteneurTxtReponse", 7, 0, 0, 160, 30);
		conteneur.conteneurTxtReponse.selectable = false;
		conteneur.conteneurTxtReponse.background = false;
		conteneur.conteneurTxtReponse.backgroundcolor = 0xff0000;
		conteneur.conteneurTxtReponse.setNewTextFormat(formatTxtSol);
		conteneur.conteneurTxtReponse.text = "BRAVO";


		posDep = premiereBranche(posX, posY, angleValeurM, 5, 0x00000);//Aiguille des minutes
		posArr = deuxiemeBranche(posX, posY, angleValeurH, 5, 0x0ffff);//aiguille des heures
		
		//angleValeur = angleValeur2 - angleValeur1;
		
		if (heureDep < 10) {
			conteneur.conteneurTxtH.text = "0"+heureDep;
		}else {
			conteneur.conteneurTxtH.text = heureDep;
		}
		
		if (minDep < 10) {
			conteneur.conteneurTxtM.text = ":0"+minDep;
		}else {
			conteneur.conteneurTxtM.text = ":"+minDep;
		}
		reponse = analyse(heures, heureATrouver, minutes, minuteATrouver);

		//trace("typeAngle" + typeAngle)
		//trace("angleVectTxt"+Math.abs(angleVectTxt))
		trace("reponse"+reponse)

		conteneur.conteneurTxtH._x = posX + 250;
		conteneur.conteneurTxtH._y = posY - 80;
		conteneur.conteneurTxtM._x = posX + 270;
		conteneur.conteneurTxtM._y = posY - 80;
		conteneur.conteneurTxtInfo._x = posX + 250;
		conteneur.conteneurTxtInfo._y = posY - 100;
		conteneur.conteneurTxtReponse._x = posX + 250;
		conteneur.conteneurTxtReponse._y = posY - 50;
		conteneur.conteneurTxtReponse._visible = false;

	}
	
	function premiereBranche(depX:Number, depY:Number, angleParRapportHorizontal:Number, epaisseur:Number, couleur):Array {//Dessine la branche puis retourne les coordonnées du départ du cercle
		var coordPt:Array = new Array();
		var angleParRapportHorizontalRad:Number = degRad(angleParRapportHorizontal);
		//On détermine la longueur des branchespar rapport à la taille de la scène tailleScene[0]xtailleScene[1]
		//Par rapport au sommet de l'angle, on détermine les angles jusqu'au coins de la scène

		//trace("longueur"+longueur)
		conteneur.angleMcM.createEmptyMovieClip("branche1", 1);
		conteneur.angleMcM.branche1.lineStyle(epaisseur, couleur);
		conteneur.angleMcM.branche1.moveTo (depX - 10 * Math.cos(angleParRapportHorizontalRad), depY + 10 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcM.branche1.beginFill(couleur, 100);
		conteneur.angleMcM.branche1.lineTo (depX + 10 * Math.sin(angleParRapportHorizontalRad), depY + 10 * Math.cos(angleParRapportHorizontalRad));
		conteneur.angleMcM.branche1.lineTo (depX + 140 * Math.cos(angleParRapportHorizontalRad), depY - 140 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcM.branche1.lineTo (depX - 10 * Math.sin(angleParRapportHorizontalRad), depY - 10 * Math.cos(angleParRapportHorizontalRad));
		conteneur.angleMcM.branche1.lineTo (depX - 10 * Math.cos(angleParRapportHorizontalRad), depY + 10 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcM.branche1.endFill;
		coordPt[0] = posX + 150 * Math.cos(angleParRapportHorizontalRad);
		coordPt[1] = posY + 150 * Math.sin(angleParRapportHorizontalRad);
		//coordPt[2] = longueur;
		coordPt[3] = Math.cos(angleParRapportHorizontalRad);
		coordPt[4] = -Math.sin(angleParRapportHorizontalRad);
		return coordPt;
	}
	
	function deuxiemeBranche(depX:Number, depY:Number, angleParRapportHorizontal:Number, epaisseur:Number, couleur):Array {//Dessine la branche puis retourne les coordonnées de l'arrivée du cercle
		var coordPt:Array = new Array();
		//var longueur:Number;
		var angleParRapportHorizontalRad:Number = degRad(angleParRapportHorizontal);
		//On détermine la longueur des branchespar rapport à la taille de la scène tailleScene[0]xtailleScene[1]
		//Par rapport au sommet de l'angle, on détermine les angles jusqu'au coins de la scène

		conteneur.angleMcH.createEmptyMovieClip("branche2", 2);
		conteneur.angleMcH.branche2.lineStyle(epaisseur, couleur);
		conteneur.angleMcH.branche2.moveTo (depX - 15 * Math.cos(angleParRapportHorizontalRad), depY + 15 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.beginFill(couleur, 100);
		conteneur.angleMcH.branche2.lineTo (depX + 15 * Math.sin(angleParRapportHorizontalRad), depY + 15 * Math.cos(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.lineTo (depX + 100 * Math.cos(angleParRapportHorizontalRad), depY - 100 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.lineTo (depX - 15 * Math.sin(angleParRapportHorizontalRad), depY - 15 * Math.cos(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.lineTo (depX - 15 * Math.cos(angleParRapportHorizontalRad), depY + 15 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.endFill;
		coordPt[0] = posX + 150 * Math.cos(angleParRapportHorizontalRad);
		coordPt[1] = posY + 150 * Math.sin(angleParRapportHorizontalRad);
		//coordPt[2] = longueur;
		coordPt[3] = Math.cos(angleParRapportHorizontalRad);
		coordPt[4] = -Math.sin(angleParRapportHorizontalRad);
		return coordPt;
	}
	function dessineRemplissage(noBranche:Number, x:Number, y:Number, r:Number,posRel:Number, positionB1:Array, positionB2:Array, eTrait, cTrait, cFond, transp):Void //On place un disque de r=150, (0;0) pour le centre
	{
		/*
		 * On va cacher une partie d'un disque de rayon r
		 * x: x du centre
		 * y: y du centre
		 */
		trace("")
		trace("remplissage")
		if (noBranche == 2) {
			posRel = 360 - posRel;
			angleVectTxt = 360 - angleVectTxt;
			conteneur.conteneurTxt.text = angleVectTxt + "°";
			
		}

		
		conteneur.angleMc3.createEmptyMovieClip("cacheMc", 6);
		conteneur.angleMc3.cacheMc.lineStyle(eTrait, cTrait);//On ne rend pas visible les traits Donc on mettra eTrait=0 et cTrait=0xffffff
		conteneur.angleMc3.cacheMc.moveTo(x, y);//On va au centre
		conteneur.angleMc3.cacheMc.beginFill(cFond, transp);//cFonf aura la couleur du fond du clip, transparance=100 (opaque)
		//On va jusque sur l'intersection de la première branche et du cadre
		conteneur.angleMc3.cacheMc.lineTo(x+positionB1[2]*positionB1[3], y+positionB1[2]*positionB1[4]);
		switch (true) {
			//deux branches même côté, gauche
			case (x+positionB1[2] * positionB1[3] <= 1 && x+positionB2[2] * positionB2[3] <= 1):
				if (posRel <= 180 ) {
					trace("2xgauche <180")
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
				}else {
					trace("2xgauche >180")
				}
				break;
			//deux branches même côté, droite
			case (x+positionB1[2] * positionB1[3] >= tailleScene[0]-1 && x+positionB2[2] * positionB2[3] >= tailleScene[0]-1):
				if (posRel <= 180) {
					trace("2x droite <180")
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
				}else {
					trace("2x droite > 180")
				}
				break;
			//deux branches même côté, haut
			case (y+positionB1[2] * positionB1[4] <= 1 && y+positionB2[2] * positionB2[4] <= 1):
				if (posRel <= 180) {
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				}
				break;
			//deux branches même côté, bas
			case (y+positionB1[2] * positionB1[4] >= tailleScene[1]-1 && y+positionB2[2] * positionB2[4] >= tailleScene[1]-1):
				if (posRel <= 180) {
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				}
				break;
			//branche 1 gauche, branche 2 haut
			case (x+positionB1[2] * positionB1[3] <= 1 && y+positionB2[2] * positionB2[4] <= 1):
				conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
				break;
			//branche 1 gauche, branche 2 droite
			case (x+positionB1[2] * positionB1[3] <= 1 && x+positionB2[2] * positionB2[3] >= tailleScene[0]-1):
				if (noBranche== 2) {//on teste si la branche 2 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en haut à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en haut à droite de la scène
				}else if (noBranche== 1) {//on teste si la branche 1 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				}
				break;
			//branche 1 gauche, branche 2 bas
			case (x+positionB1[2] * positionB1[3] <= 1 && y+positionB2[2] * positionB2[4] >= tailleScene[1]-1):
				conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
				break;
			//branche1 haut, branche 2 droite
			case (y+positionB1[2] * positionB1[4] <= 1 && x+positionB2[2] * positionB2[3] >= tailleScene[0]-1):
				conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				break;
			//branche1 haut, branche 2 bas
			case (y+positionB1[2] * positionB1[4] <= 1 && y+positionB2[2] * positionB2[4] >= tailleScene[1]-1):
				if (noBranche == 2) {//on teste si la branche 2 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
				}else if (noBranche== 1){//on teste si la branche 1 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusqu'au coin en haut à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				}
				break;
			//branche1 haut, branche 2 gauche
			case (y+positionB1[2] * positionB1[4] <= 1 && x+positionB2[2] * positionB2[3] <= 1):
				conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				break;
			//branche 1 droite, branche 2 bas
			case (x+positionB1[2] * positionB1[3] >= tailleScene[0]-1 && y+positionB2[2] * positionB2[4] >= tailleScene[1]-1):
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
				conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
				break;
			//branche 1 droite, branche 2 gauche
			case (x+positionB1[2] * positionB1[3] >= tailleScene[0]-1 && x+positionB2[2] * positionB2[3] <= 1):
				if (noBranche == 2) {//on teste si la branche 2 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en bas à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en bas à gauche de la scène
				}else if (noBranche== 1){//on teste si la branche 1 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				}
				break;
			//branche 1 droite, branche 2 haut
			case (x+positionB1[2] * positionB1[3] >= tailleScene[0]-1 && y+positionB2[2] * positionB2[4] <= 1):
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
				break;
			//branche 1 bas, branche 2 gauche
			case (y+positionB1[2] * positionB1[4] >= tailleScene[1]-1 && x+positionB2[2] * positionB2[3] <= 1):
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
				conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				break;
			//branche 1 bas, branche 2 haut
			case (y+positionB1[2] * positionB1[4] >= tailleScene[1]-1 && y+positionB2[2] * positionB2[4] <= 1):
				if (noBranche == 2) {//on teste si la branche 2 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
				}else if (noBranche == 1) {//on teste si la branche 1 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusque au coin en haut à gauche de la scène
				}
				break;
			//branche 1 bas, branche 2 droite
			case (y+positionB1[2] * positionB1[4] >= tailleScene[1]-1 && x+positionB2[2] * positionB2[3] >= tailleScene[0]-1):
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				break;
			default:
				trace("default dans remplissage")
				break;
		
		}
		conteneur.angleMc3.cacheMc.lineTo(x+positionB2[2]*positionB2[3], y+positionB2[2]*positionB2[4]);//On va jusque au bout de la 2e branche
		conteneur.angleMc3.cacheMc.lineTo(x, y);//On retourne au centre
		conteneur.angleMc3.cacheMc.endFill;
	}

	function degRad(nb:Number):Number
	{
		return nb * (2 * Math.PI / 360);
		
	}
	
	function radDeg(nb:Number):Number
	{
		return nb * (360 / (2 * Math.PI));
	}
	function ecouteurSouris():Array {
		var retour:Array = new Array();
		retour[0] = _xmouse;
		retour[1] = _ymouse;
		trace("retour: "+retour)
		return retour;
	}
	
	function comportement( posx:Number, posy:Number, positionSouris:Array)//aiguille des minutes avec angleValeur2, aiguille des heures avec angleValeur1
	{
		var o = this;
		var positionS:Array = new Array();
		var presse:Boolean = false;
		var nbTours:Number = 1;


		//Comportement sur la première branche
		conteneur.angleMcM.onPress = function()
		{
			o.conteneur.conteneurTxtReponse._visible = false;
			var saut:Boolean = false;
			var valHMinTemp:Array = new Array();
			var minutesValeurMTemp:Number;
			var cadran:Number;
			var etatTemp:String = "";
			trace("onPress" + this)
			this.onEnterFrame = function() {

				//trace("saut"+saut)
				minutesValeurMTemp = o.minutes;
				//Calcul de l'angle en degrés entre 0 yc et 360
					switch (true) {
						//cadran 1 + 0°
						case(positionSouris[0] - posx >= 0 && positionSouris[1] - posy <= 0):
							//trace("cadran1")
							o.minutes = o.angleDegM(o.radDeg(Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx)))));
							if (cadran == 2) {
								if(o.heures==23){
									o.heures = 0;
									if (o.dateDep<o.mois[o.moisDep][1]){
										o.dateDep = o.dateDep + 1;
									}else {
										o.dateDep = 1;
										if (o.moisDep == 11) {
											o.moisDep = 0;
										}else{
											o.moisDep = o.moisDep + 1;
										}
									}
								}else {
									o.heures = o.heures + 1;
								}
							}
							o.conteneur.angleMc0.jourTxt.text = o.dateDep;
							o.conteneur.angleMc0.moisTxt.text = o.mois[o.moisDep][0];
							
							cadran = 1;
							break;
						//90°
						case(positionSouris[0] - posx == 0 && positionSouris[1] - posy < 0):
							//trace("90")
							o.minutes = o.angleDegM(o.radDeg( -Math.PI / 2));
							break;
						//cadran 2 + 180°
						case(positionSouris[0] - posx <= 0 && positionSouris[1] - posy <= 0):
							//trace("cadran2")
							o.minutes = 60 + o.angleDegM(o.radDeg(Math.PI - Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx)))));
							if (cadran == 1) {
								if (o.heures == 0) {
									o.heures = 23;
								
									if (o.dateDep == 1) {
										trace ("On recule d'un mois")
										if (o.moisDep == 0) {
											o.moisDep = 11;
										}else{
											o.moisDep = o.moisDep - 1;
										}
										o.dateDep = o.mois[o.moisDep][1];
										trace("nbjours du mois: "+o.mois[o.moisDep][0]+" "+o.mois[o.moisDep][1])
									}else {
										trace("On recule de 1 jour")
										o.dateDep = o.dateDep-1;
									}
								}else {
									o.heures = o.heures - 1;
								}
								o.conteneur.angleMc0.jourTxt.text = o.dateDep;
								o.conteneur.angleMc0.moisTxt.text = o.mois[o.moisDep][0];
							}

							cadran = 2;
							break;
						//cadran 3
						case(positionSouris[0] - posx < 0 && positionSouris[1] - posy > 0):
							//trace("cadran3")
							o.minutes = 60 + o.angleDegM(o.radDeg(Math.PI + Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx)))));
							cadran = 3;
							break;
						//270°
						case(positionSouris[0] - posx == 0 && positionSouris[1] - posy > 0):
							//trace("270")
							o.minutes = o.angleDegM(o.radDeg(3 * Math.PI / 2));
							break;
						//cadran 4
						case(positionSouris[0] - posx > 0 && positionSouris[1] - posy > 0):
							//trace("cadran4")
							o.minutes = o.angleDegM(o.radDeg( -Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx)))));
							cadran = 4;
							break;
						default:
							trace("hors cadran")
							trace("positionS[0] - posx" + (positionSouris[0] - posx))
							trace("positionS[1] - posy" + (positionSouris[1] - posy))
							break;
					}

				valHMinTemp = o.heureAngleDeg(o.heures, o.minutes);
				o.posDep = o.premiereBranche(posx, posy, valHMinTemp[1] , 5, 0x000000);
				o.posArr = o.deuxiemeBranche(posx, posy, valHMinTemp[0] , 5, 0x00FFFF);
	
				if (o.heures < 10) {
					o.conteneur.conteneurTxtH.text = "0"+o.heures;
				}else {
					o.conteneur.conteneurTxtH.text = o.heures;
				}
				
				if (o.minutes < 10) {
					o.conteneur.conteneurTxtM.text = ":0"+o.minutes;
				}else {
					o.conteneur.conteneurTxtM.text = ":"+o.minutes;
				}

				o.reponse = o.analyse(o.heures, o.heureATrouver, o.minutes, o.minuteATrouver);
				trace("o.reponse"+o.reponse)

			}
		

		}
		conteneur.angleMcM.onRelease = function()
		{
			
			delete this.onEnterFrame;
			if (o.reponse == true) {
					o.conteneur.conteneurTxtReponse._visible = true;
				}
		}
		conteneur.angleMcM.onReleaseOutside = function()
		{
			delete this.onEnterFrame;
			if (o.reponse == true) {
					o.conteneur.conteneurTxtReponse._visible = true;
				}
		}
		
		//Comportement sur la deuxième branche
		conteneur.angleMcH.onPress = function()
		{
			o.conteneur.conteneurTxtReponse._visible = false;
			var valTemp:Array=new Array();
			var saut:Boolean = false;
			var valHMinTemp:Array = new Array();
			var heuresValeurMTemp:Number;
			var etatTemp:String = "";
			var cadran:Number;
			if (o.conteneur.conteneurTxtH.text < 12) {
				nbTours = 1;
			}else {
				nbTours = 2;
			}
			trace("onPress"+nbTours)
			this.onEnterFrame = function() {


				//Calcul de l'angle en degrés entre 0 yc et 360
				switch (true) {
					//cadran 1 + 0°
					case(positionSouris[0] - posx >= 0 && positionSouris[1] - posy <= 0):
						if (cadran == 2 && nbTours == 1) {
							nbTours = 2;
						}else if (cadran == 2 && nbTours == 2) {
							nbTours = 1;
						}
						cadran = 1;
						o.angleValeurH = o.radDeg(Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						
						break;
					//90°
					case(positionSouris[0] - posx == 0 && positionSouris[1] - posy < 0):
						o.angleValeurH = o.radDeg( -Math.PI / 2 );
						break;
					//cadran 2 + 180°
					case(positionSouris[0] - posx <= 0 && positionSouris[1] - posy <= 0):
						if (cadran == 1 && nbTours == 1) {
							nbTours = 2;
						}else if (cadran == 1 && nbTours == 2) {
							nbTours = 1;
						}
						cadran = 2;
						o.angleValeurH = o.radDeg(Math.PI - Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						break;
					//cadran 3
					case(positionSouris[0] - posx < 0 && positionSouris[1] - posy > 0):
						cadran = 3;
						o.angleValeurH = o.radDeg(Math.PI + Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						break;
					//270°
					case(positionSouris[0] - posx == 0 && positionSouris[1] - posy > 0):
						o.angleValeurH = o.radDeg(3 * Math.PI / 2);
						break;
					//cadran 4
					case(positionSouris[0] - posx > 0 && positionSouris[1] - posy > 0):
						cadran = 4;
						o.angleValeurH = o.radDeg(2 * Math.PI - Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						break;
					default:
						trace("hors cadran")
						trace("positionS[0] - posx" + (positionSouris[0] - posx))
						trace("positionS[1] - posy"+(positionSouris[1] - posy))
				}

				o.angleValeurM = 12 * o.angleValeurH + 90;
				var maMin:Number = 60+o.angleDegM(o.angleValeurM)%60;
				var monHeure:Number ;
				if (nbTours == 1) {
					trace("nbTours=1")
					monHeure = o.angleDegH(o.angleValeurH);
				}else if (nbTours == 2) {
					trace("nbTours=2")
					monHeure = o.angleDegH(o.angleValeurH)+12;
				}
				
				trace("monHeure"+monHeure)
				
				o.minutes = 60 + o.angleDegM(o.angleValeurM) % 60;
				if (o.minutes == 60) {
					o.minutes = 0;
				}
				
				o.posDep = o.premiereBranche(posx, posy, o.angleValeurM , 5, 0x000000);
				o.posArr = o.deuxiemeBranche(posx, posy, o.angleValeurH , 5, 0x00ffff);
				
				if (monHeure>0 && monHeure < 10) {
					o.conteneur.conteneurTxtH.text = "0"+monHeure;
				}else {
					o.conteneur.conteneurTxtH.text = monHeure;
				}
				
				if (o.minutes < 10) {
					o.conteneur.conteneurTxtM.text = ":0"+o.minutes;
				}else {
					o.conteneur.conteneurTxtM.text = ":"+o.minutes;
				}
				o.heures = monHeure;
				o.angleVectTxt = Math.round(Math.abs(360-o.angleValeur));
	
				o.reponse = o.analyse(o.heures, o.heureATrouver, o.minutes, o.minuteATrouver);
			}
			

		}
		conteneur.angleMcH.onRelease = function()
		{
			//o.actionSolution();
			if (o.reponse == true) {
					o.conteneur.conteneurTxtReponse._visible = true;
				}
			delete this.onEnterFrame;
		}
		conteneur.angleMcH.onReleaseOutside = function()
		{
			if (o.reponse == true) {
					o.conteneur.conteneurTxtReponse._visible = true;
				}
			delete this.onEnterFrame;
		}
	}
	
	function angleEntreDeuxVecteurs(a1:Number, a2:Number, b1:Number, b2:Number):Number
	{

		return Math.acos((a1 * b1 + a2 * b2 )/ (Math.sqrt(Math.pow(a1, 2) + Math.pow(a2, 2)) * Math.sqrt(Math.pow(b1, 2) + Math.pow(b2, 2))));
	}
	
	function setTailleMontre(maTaille) {
		//trace("set<taille")
		tailleAiguille = maTaille;
		conteneur.angleMc0._height = maTaille;
		conteneur.angleMc0._width = maTaille;
		conteneur.nuitMc._height = maTaille-10;
		conteneur.nuitMc._width = maTaille-10;
		conteneur.lampePocheMc._height = maTaille/3;
		conteneur.lampePocheMc._width = maTaille/3;
		conteneur.lampePocheMc._x = posX-maTaille/2;
		conteneur.lampePocheMc._y = tailleAiguille*1.5;
		posDep = premiereBranche(maTaille, posX, posY, angleValeurM, 5, 0x00000);//Aiguille des minutes
		posArr = deuxiemeBranche(maTaille, posX, posY, angleValeurH, 5, 0x0ffff);//aiguille des heures
	}
	
	function analyse(h:Number, hAT, min, minAT):Boolean {
		trace("dans analyse hAT: " + hAT)
		trace("dans analyse h: " + h%12)
		trace("dans analyse minAT: " + minAT)
		trace("dans analyse min: " + min)
		
		 var rep:Boolean = false;
		if (h%12 == hAT%12 && min == minAT) {
			rep = true;
			message = "Bravo, les aiguilles sont bien positionnées.";
		}else {
			rep = false;
			message = "Les aiguilles sont mal positionnées.";
		}
		return rep;
	}
	
	function actionSolution(h, min) {
		trace ("actionSolution, h: " + h)
		trace ("actionSolution, min: " + min)
		trace ("actionSolution, posX: " + posX)
		trace ("actionSolution, posY: " + posY)
		trace ("actionSolution, textQuestion: " + textQuestion.text)
		
		angleHeureMin = heureAngleDeg(heureATrouver, minuteATrouver);//heureAngleDeg retourne l'angle en degres depuis le nord
		angleValeurH = angleHeureMin[0];//angle des Heures
		angleValeurM = angleHeureMin[1];//angle des minutes
		posDep = premiereBranche(posX, posY, angleValeurM, 5, 0x00000);//Aiguille des minutes
		posArr = deuxiemeBranche(posX, posY, angleValeurH, 5, 0x0ffff);//aiguille des heures
		if (heureATrouver>0 && heureATrouver < 10) {
			conteneur.conteneurTxtH.text = "0"+heureATrouver;
		}else {
			conteneur.conteneurTxtH.text = heureATrouver;
		}
		
		if (minuteATrouver < 10) {
			conteneur.conteneurTxtM.text = ":0"+minuteATrouver;
		}else {
			conteneur.conteneurTxtM.text = ":"+minuteATrouver;
		}
		textQuestion.text = "Heure à trouver:";
	}
	function heureAngleDeg(h:Number, min:Number):Array {//retourne l'angle en degres depuis le nord
		var retour:Array=new Array();
		retour [0] = 90 - h * 30 - min * 0.5;//angle de l'aiguille des heures
		retour [1] = 90 - min * 6;//angle de l'aiguille des minutes
		return retour;
	}
	function angleDegHeure(aiguilleH:Number, aiguilleMin:Number):Array {
		var retour:Array=new Array();
		retour [0] = (-Math.ceil(aiguilleH/30)+3)%24;//temps pour l'aiguille des heures
		retour [1] = (-Math.ceil((aiguilleMin)/6)+15)%60;//temps pour l'aiguille des minutes
		return retour;
	}
	function angleDegM (aiguilleM:Number):Number {//temps pour l'aiguille des minutes
		var retour:Number = -Math.ceil((aiguilleM) / 6) + 15;//temps pour l'aiguille des minutes
		return retour;
	}
	function angleDegH (aiguilleH:Number):Number {//temps pour l'aiguille des heures
		var retour:Number = ( -Math.ceil(aiguilleH / 30) + 3) % 24;//temps pour l'aiguille des heures
		if (retour < 0) {
			retour = 12+ retour;
		}
		return retour;
	}
	
}
