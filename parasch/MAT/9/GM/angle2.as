/**
 * ...
 * @author Jean-Michel Luthi
 */

import mx.data.encoders.Num;
import TextField;
import timer;


//On crée la classe (le nom est celui du nom de fichier et aussi celui de la fonction principale)
class angle2 extends MovieClip
{
//variables demandées lors de la création d'une occurence
public var posX:Number; //position X du clip unite
public var posY:Number; //position Y du clip unite
public var angleValeur:Number; // valeur de l'angle en radians
public var angleValeur1:Number; // valeur de l'angle 1ère Branche par rapport à l'horizontale en radians.
public var angleValeur2:Number; // valeur de l'angle 2ème Branche par rapport à l'horizontale en radians.
public var angleValeurRel:Number; // valeur de l'angle 2ème Branche par rapport à la première.
public var ceClip:MovieClip;
public var posSourisArray:Array;//coordonnées de la souris
public var tailleScene:Array;//taille dans laquelle on veut voir tourner les branches de l'angle
public var reponse:Boolean; //On va y mettre le valeur de rep_juste
//autres variables
public var conteneur:MovieClip; //clip contenant la case
public var formatValeurAngle:TextFormat;//format pour la valeur de l'angle
public var typeAngle:String;//type d'angle à trouver
public var message:String;//message transmis à l'interfaceAvecIF

private var posDep:Array=new Array(); //position de départ de l'arc de cercle
private	var posArr:Array = new Array(); //position d'arrivée de l'arc de cercle
private var angle1Txt:Number;
private	var angle2Txt:Number;
private	var angleVectTxt:Number;

private var plusPetitQue180:Boolean;

	function angle2(XTemp,YTemp, clipConteneur, formatTemp, typeAngleTemp, tailleSceneTemp)
	{
		posX = XTemp;
		posY = YTemp;
		tailleScene = tailleSceneTemp;
		trace("dans angle"+tailleScene)
		ceClip = this;
		ceClip._x = posX;
		ceClip._y = posY;
		conteneur = clipConteneur;
		formatValeurAngle = formatTemp;
		plusPetitQue180 = true;
		typeAngle = typeAngleTemp;
		//On place l'angle de départ de façon aléatoire
		angleValeur1 = Math.random() * 90;
		angleValeur2 = Math.random() * 90;
		angleValeurRel = Math.random() * 90-angleValeur1;
		angle1Txt = angleValeur1;
		angle2Txt = angleValeur2;
		//on lance la création du clip
		dessineLeClip();
	}
	function dessineLeClip()
	{
		
		//On crée un support pour le clip de chaque branche et un support pour le remplissage pour pouvoir mettre le onPress et le onRelease
		//On ne peut pas mettre onRelease sur le clip branche car il est recréé tout le temps.

		conteneur.attachMovie("disqueMc", "angleMc0", 0);
		conteneur.angleMc0._x = posX;
		conteneur.angleMc0._y = posY;
		conteneur.createEmptyMovieClip("angleMc1", 3);
		conteneur.createEmptyMovieClip("angleMc2", 2);
		conteneur.createEmptyMovieClip("angleMc3", 1);
		
		//conteneur.createTextField("conteneurTxt", 4, 0, 0, 40, 20);
		conteneur.conteneurTxt.selectable = false;
		conteneur.conteneurTxt.background = false;
		conteneur.conteneurTxt.backgroundcolor = 0xff0000;
		conteneur.conteneurTxt.setNewTextFormat(formatValeurAngle);
		
		//conteneur.createTextField("conteneurTxtInfo", 5, 0, 0, 160, 30);
		conteneur.conteneurTxtInfo.selectable = false;
		conteneur.conteneurTxtInfo.background = false;
		conteneur.conteneurTxtInfo.backgroundcolor = 0xff0000;
		conteneur.conteneurTxtInfo.setNewTextFormat(formatValeurAngle);
		conteneur.conteneurTxtInfo.text = "Mon angle mesure ";


		posDep = premiereBranche(posX, posY, angleValeur1, 5, 0x00000);
		posArr = deuxiemeBranche(posX, posY, angleValeur2, 5, 0x0ffff);
		angleValeur = angleValeur2 - angleValeur1;
		if (angleValeur <= 0) {
			angleVectTxt = Math.round(angleValeur);
			conteneur.conteneurTxt.text =-angleVectTxt + "°";
			//dessineRemplissage(1, posX, posY, 150, angleVectTxt, posDep, posArr, 2, 0xeaeaff, 0xeaeaff, 100);
			dessineRemplissage(1, posX, posY, 150, angleVectTxt, posDep, posArr, 2, 0xffffff, 0xffffff, 100);
		}else {
			angleValeur = 360 - angleValeur;
			angleVectTxt = Math.round(angleValeur);
			conteneur.conteneurTxt.text =angleVectTxt + "°";
			//dessineRemplissage(1, posX, posY, 150, angleVectTxt, posDep, posArr, 2, 0xeaeaff, 0xeaeaff, 100);
			dessineRemplissage(1, posX, posY, 150, angleVectTxt, posDep, posArr, 2, 0xffffff, 0xffffff, 100);
		}
		
		reponse = analyse(typeAngle, Math.abs(angleVectTxt));
		trace("typeAngle" + typeAngle)
		trace("angleVectTxt"+Math.abs(angleVectTxt))
		trace("reponse"+reponse)

		conteneur.conteneurTxt._x = posX + 250;
		conteneur.conteneurTxt._y = posY - 80;
		conteneur.conteneurTxtInfo._x = posX + 250;
		conteneur.conteneurTxtInfo._y = posY - 100;

	}
	
	function premiereBranche(depX:Number, depY:Number, angleParRapportHorizontal:Number, epaisseur:Number, couleur):Array {//Dessine la branche puis retourne les coordonnées du départ du cercle
		var coordPt:Array = new Array();
		var longueur:Number;
		var angleParRapportHorizontalRad:Number = degRad(angleParRapportHorizontal);
		//On détermine la longueur des branchespar rapport à la taille de la scène tailleScene[0]xtailleScene[1]
		//Par rapport au sommet de l'angle, on détermine les angles jusqu'au coins de la scène
		switch (true) {
		case ( angleParRapportHorizontal >= 0 && angleParRapportHorizontal < 90):
		//	trace("Lcadran1")
				if (angleParRapportHorizontalRad < (Math.atan(depY / (tailleScene[0] - depX)))) {
					longueur = (tailleScene[0] - depX) / Math.cos(angleParRapportHorizontalRad);
				}else {
					longueur = depY  / Math.sin(angleParRapportHorizontalRad);
				}
				
			break;
		case ( angleParRapportHorizontal == 90) :
		//	trace("L90")
					longueur = depY;
			break;
		case ( angleParRapportHorizontal > 90 && angleParRapportHorizontal <= 180) :
		//	trace("Lcadran2")
			if (angleParRapportHorizontalRad > (Math.PI-Math.atan(depY / depX))) {
					longueur = Math.abs(depX / Math.cos(angleParRapportHorizontalRad));
		//			trace("dans if C2")
				}else {
					longueur = depY / Math.sin(angleParRapportHorizontalRad);
		//			trace("dans else C2")
				}
			break;
		case ( angleParRapportHorizontal > 180 && angleParRapportHorizontal < 270) :
		//	trace("Lcadran3")
			if (angleParRapportHorizontalRad < Math.PI+(Math.atan((tailleScene[1] - depY) / depX))) {
					longueur = Math.abs(depX/ Math.cos(2*Math.PI-angleParRapportHorizontalRad));
				}else {
		//			trace("Lcadran3, dans else")
					longueur = Math.abs((tailleScene[1] - depY) / Math.sin(angleParRapportHorizontalRad));
				}
			break;
		case ( angleParRapportHorizontal == 270) :
		//	trace("L270")
			longueur = tailleScene[1] - depY;
			break;
		case ( angleParRapportHorizontal > 270 && angleParRapportHorizontal < 360) :
		//	trace("Lcadran4")
			if (angleParRapportHorizontalRad > (2*Math.PI-Math.atan((tailleScene[1] - depY) / (tailleScene[0] - depX)))) {
					longueur = (tailleScene[0] - depX) / Math.cos(angleParRapportHorizontalRad);
				}else {
					longueur = Math.abs((tailleScene[1] - depY) / Math.sin(angleParRapportHorizontalRad));
				}
			break;
		default:
		//	trace("Ldefault")
			break;
		}
		//trace("longueur"+longueur)
		conteneur.angleMc1.createEmptyMovieClip("branche1", 1);
		conteneur.angleMc1.branche1.lineStyle(epaisseur, couleur);
		conteneur.angleMc1.branche1.moveTo (depX, depY);
		conteneur.angleMc1.branche1.lineTo (depX + longueur * Math.cos(angleParRapportHorizontalRad), depY - longueur * Math.sin(angleParRapportHorizontalRad));
		coordPt[0] = posX + 150 * Math.cos(angleParRapportHorizontalRad);
		coordPt[1] = posY + 150 * Math.sin(angleParRapportHorizontalRad);
		coordPt[2] = longueur;
		coordPt[3] = Math.cos(angleParRapportHorizontalRad);
		coordPt[4] = -Math.sin(angleParRapportHorizontalRad);
		return coordPt;
	}
	
	function deuxiemeBranche(depX:Number, depY:Number, angleParRapportHorizontal:Number, epaisseur:Number, couleur):Array {//Dessine la branche puis retourne les coordonnées de l'arrivée du cercle
		var coordPt:Array = new Array();
		var longueur:Number;
		var angleParRapportHorizontalRad:Number = degRad(angleParRapportHorizontal);
		//On détermine la longueur des branchespar rapport à la taille de la scène tailleScene[0]xtailleScene[1]
		//Par rapport au sommet de l'angle, on détermine les angles jusqu'au coins de la scène
		switch (true) {
		case ( angleParRapportHorizontal >= 0 && angleParRapportHorizontal < 90):
			//trace("Lcadran1")
				if (angleParRapportHorizontalRad < (Math.atan(depY / (tailleScene[0] - depX)))) {
					longueur = (tailleScene[0] - depX) / Math.cos(angleParRapportHorizontalRad);
				}else {
					longueur = depY  / Math.sin(angleParRapportHorizontalRad);
				}
				
			break;
		case ( angleParRapportHorizontal == 90) :
			//trace("L90")
					longueur = depY;
			break;
		case ( angleParRapportHorizontal > 90 && angleParRapportHorizontal <= 180) :
		//	trace("Lcadran2")
			if (angleParRapportHorizontalRad > (Math.PI-Math.atan(depY / depX))) {
					longueur = Math.abs(depX / Math.cos(angleParRapportHorizontalRad));
			//		trace("dans if C2")
				}else {
					longueur = depY / Math.sin(angleParRapportHorizontalRad);
			//		trace("dans else C2")
				}
			break;
		case ( angleParRapportHorizontal > 180 && angleParRapportHorizontal < 270) :
		//	trace("Lcadran3")
			if (angleParRapportHorizontalRad < Math.PI+(Math.atan((tailleScene[1] - depY) / depX))) {
					longueur = Math.abs(depX/ Math.cos(2*Math.PI-angleParRapportHorizontalRad));
				}else {
		//			trace("Lcadran3, dans else")
					longueur = Math.abs((tailleScene[1] - depY) / Math.sin(angleParRapportHorizontalRad));
				}
			break;
		case ( angleParRapportHorizontal == 270) :
		//	trace("L270")
			longueur = tailleScene[1] - depY;
			break;
		case ( angleParRapportHorizontal > 270 && angleParRapportHorizontal < 360) :
		//	trace("Lcadran4")
			if (angleParRapportHorizontalRad > (2*Math.PI-Math.atan((tailleScene[1] - depY) / (tailleScene[0] - depX)))) {
					longueur = (tailleScene[0] - depX) / Math.cos(angleParRapportHorizontalRad);
				}else {
					longueur = Math.abs((tailleScene[1] - depY) / Math.sin(angleParRapportHorizontalRad));
				}
			break;
		default:
		//	trace("Ldefault")
			longueur = 120;
			break;
		}

		conteneur.angleMc2.createEmptyMovieClip("branche2", 2);
		conteneur.angleMc2.branche2.lineStyle(epaisseur, couleur);
		conteneur.angleMc2.branche2.moveTo (depX, depY);
		conteneur.angleMc2.branche2.lineTo (depX + longueur * Math.cos(angleParRapportHorizontalRad), depY - longueur * Math.sin(angleParRapportHorizontalRad));
		coordPt[0] = posX + 150 * Math.cos(angleParRapportHorizontalRad);
		coordPt[1] = posY + 150 * Math.sin(angleParRapportHorizontalRad);
		coordPt[2] = longueur;
		coordPt[3] = Math.cos(angleParRapportHorizontalRad);
		coordPt[4] = -Math.sin(angleParRapportHorizontalRad);
		return coordPt;
	}
	function dessineRemplissage(noBranche:Number, monX:Number, monY:Number, r:Number,posRel:Number, positionB1:Array, positionB2:Array, eTrait, cTrait, cFond, transp):Void //On place un disque de r=150, (0;0) pour le centre
	{
		/*
		 * On va cacher une partie d'un disque de rayon r
		 * monX: x du centre
		 * monY: y du centre
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
		conteneur.angleMc3.cacheMc.moveTo(monX, monY);//On va au centre
		conteneur.angleMc3.cacheMc.beginFill(cFond, transp);//cFonf aura la couleur du fond du clip, transparance=100 (opaque)
		//On va jusque sur l'intersection de la première branche et du cadre
		conteneur.angleMc3.cacheMc.lineTo(monX+positionB1[2]*positionB1[3], monY+positionB1[2]*positionB1[4]);
		switch (true) {
			//deux branches même côté, gauche
			case (monX+positionB1[2] * positionB1[3] <= 1 && monX+positionB2[2] * positionB2[3] <= 1):
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
			case (monX+positionB1[2] * positionB1[3] >= tailleScene[0]-1 && monX+positionB2[2] * positionB2[3] >= tailleScene[0]-1):
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
			case (monY+positionB1[2] * positionB1[4] <= 1 && monY+positionB2[2] * positionB2[4] <= 1):
				if (posRel <= 180) {
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				}
				break;
			//deux branches même côté, bas
			case (monY+positionB1[2] * positionB1[4] >= tailleScene[1]-1 && monY+positionB2[2] * positionB2[4] >= tailleScene[1]-1):
				if (posRel <= 180) {
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				}
				break;
			//branche 1 gauche, branche 2 haut
			case (monX+positionB1[2] * positionB1[3] <= 1 && monY+positionB2[2] * positionB2[4] <= 1):
				conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
				break;
			//branche 1 gauche, branche 2 droite
			case (monX+positionB1[2] * positionB1[3] <= 1 && monX+positionB2[2] * positionB2[3] >= tailleScene[0]-1):
				if (noBranche== 2) {//on teste si la branche 2 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en haut à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en haut à droite de la scène
				}else if (noBranche== 1) {//on teste si la branche 1 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				}
				break;
			//branche 1 gauche, branche 2 bas
			case (monX+positionB1[2] * positionB1[3] <= 1 && monY+positionB2[2] * positionB2[4] >= tailleScene[1]-1):
				conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
				break;
			//branche1 haut, branche 2 droite
			case (monY+positionB1[2] * positionB1[4] <= 1 && monX+positionB2[2] * positionB2[3] >= tailleScene[0]-1):
				conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				break;
			//branche1 haut, branche 2 bas
			case (monY+positionB1[2] * positionB1[4] <= 1 && monY+positionB2[2] * positionB2[4] >= tailleScene[1]-1):
				if (noBranche == 2) {//on teste si la branche 2 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
				}else if (noBranche== 1){//on teste si la branche 1 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusqu'au coin en haut à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				}
				break;
			//branche1 haut, branche 2 gauche
			case (monY+positionB1[2] * positionB1[4] <= 1 && monX+positionB2[2] * positionB2[3] <= 1):
				conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				break;
			//branche 1 droite, branche 2 bas
			case (monX+positionB1[2] * positionB1[3] >= tailleScene[0]-1 && monY+positionB2[2] * positionB2[4] >= tailleScene[1]-1):
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
				conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				conteneur.angleMc3.cacheMc.lineTo(0, tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
				break;
			//branche 1 droite, branche 2 gauche
			case (monX+positionB1[2] * positionB1[3] >= tailleScene[0]-1 && monX+positionB2[2] * positionB2[3] <= 1):
				if (noBranche == 2) {//on teste si la branche 2 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en bas à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en bas à gauche de la scène
				}else if (noBranche== 1){//on teste si la branche 1 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				}
				break;
			//branche 1 droite, branche 2 haut
			case (monX+positionB1[2] * positionB1[3] >= tailleScene[0]-1 && monY+positionB2[2] * positionB2[4] <= 1):
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
				break;
			//branche 1 bas, branche 2 gauche
			case (monY+positionB1[2] * positionB1[4] >= tailleScene[1]-1 && monX+positionB2[2] * positionB2[3] <= 1):
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
				conteneur.angleMc3.cacheMc.lineTo(0, 0);//On va jusque au coin en haut à gauche de la scène
				break;
			//branche 1 bas, branche 2 haut
			case (monY+positionB1[2] * positionB1[4] >= tailleScene[1]-1 && monY+positionB2[2] * positionB2[4] <= 1):
				if (noBranche == 2) {//on teste si la branche 2 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusqu'au coin en haut à droite de la scène
				}else if (noBranche == 1) {//on teste si la branche 1 qui est déplacée
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusque au coin en bas à gauche de la scène
					conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], 0);//On va jusque au coin en haut à gauche de la scène
				}
				break;
			//branche 1 bas, branche 2 droite
			case (monY+positionB1[2] * positionB1[4] >= tailleScene[1]-1 && monX+positionB2[2] * positionB2[3] >= tailleScene[0]-1):
				conteneur.angleMc3.cacheMc.lineTo(tailleScene[0], tailleScene[1]);//On va jusqu'au coin en bas à droite de la scène
				break;
			default:
				trace("default dans remplissage")
				break;
		
		}
		conteneur.angleMc3.cacheMc.lineTo(monX+positionB2[2]*positionB2[3], monY+positionB2[2]*positionB2[4]);//On va jusque au bout de la 2e branche
		conteneur.angleMc3.cacheMc.lineTo(monX, monY);//On retourne au centre
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
	
	function comportement( posx:Number, posy:Number, positionSouris:Array)
	{
		var o = this;
		var positionS:Array = new Array();
		var presse:Boolean = false;

		//Comportement sur la première branche
		conteneur.angleMc1.onPress = function()
		{
			var valTemp:Array=new Array();
			trace("onPress"+this)
			this.onEnterFrame = function() {

				//Calcul de l'angle en degrés entre 0 yc et 360
				switch (true) {
					//cadran 1 + 0°
					case(positionSouris[0] - posx >= 0 && positionSouris[1] - posy <= 0):
					//	trace("cadran1")
						o.angleValeur1 = o.radDeg(Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						break;
					//90°
					case(positionSouris[0] - posx == 0 && positionSouris[1] - posy < 0):
					//	trace("90")
						o.angleValeur1 = o.radDeg(-Math.PI / 2);
						break;
					//cadran 2 + 180°
					case(positionSouris[0] - posx <= 0 && positionSouris[1] - posy <= 0):
					//	trace("cadran2")
						o.angleValeur1 = o.radDeg(Math.PI - Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						break;
					//cadran 3
					case(positionSouris[0] - posx < 0 && positionSouris[1] - posy > 0):
				//		trace("cadran3")
						o.angleValeur1 = o.radDeg(Math.PI + Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						break;
					//270°
					case(positionSouris[0] - posx == 0 && positionSouris[1] - posy > 0):
					//	trace("270")
						o.angleValeur1 = o.radDeg(3*Math.PI / 2);
						break;
					//cadran 4
					case(positionSouris[0] - posx > 0 && positionSouris[1] - posy > 0):
				//		trace("branche 1 onPress cadran4")
						o.angleValeur1 = o.radDeg(2*Math.PI-Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						break;
					default:
						trace("hors cadran")
						trace("positionS[0] - posx" + (positionSouris[0] - posx))
						trace("positionS[1] - posy"+(positionSouris[1] - posy))
				}

				if (o.angleValeur1 < o.angleValeur2) {
				//	trace("comportement 1ere branche if")
					o.angleValeur = o.angleValeur1 + 360-o.angleValeur2;
				}else {
				//	trace("comportement 1ere branche else")
					o.angleValeur = o.angleValeur2 - o.angleValeur1;
				}
				//trace("o.angleValeur" + o.radDeg(o.angleValeur))
				o.posDep = o.premiereBranche(posx, posy, o.angleValeur1 , 5, 0x000000);
				o.posArr = o.deuxiemeBranche(posx, posy, o.angleValeur2 , 5, 0x00FFFF)

				
				o.angleVectTxt = Math.round(Math.abs(o.angleValeur));
				o.conteneur.conteneurTxt.text = o.angleVectTxt + "°";
				o.dessineRemplissage(1, o.posX, o.posY, 150, o.angleVectTxt, o.posDep, o.posArr, 2, 0xeaeaff, 0xeaeaff, 100);
				o.reponse=o.analyse(o.typeAngle, o.angleVectTxt);

			}

		}
		conteneur.angleMc1.onRelease = function()
		{
			delete this.onEnterFrame;
		}
		conteneur.angleMc1.onReleaseOutside = function()
		{
			delete this.onEnterFrame;
		}
		
		//Comportement sur la deuxième branche
		conteneur.angleMc2.onPress = function()
		{
			var valTemp:Array=new Array();

			this.onEnterFrame = function() {

				//Calcul de l'angle en degrés entre 0 yc et 360
				switch (true) {
					//cadran 1 + 0°
					case(positionSouris[0] - posx >= 0 && positionSouris[1] - posy <= 0):
					//	trace("cadran1")
						o.angleValeur2 = o.radDeg(Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						break;
					//90°
					case(positionSouris[0] - posx == 0 && positionSouris[1] - posy < 0):
					//	trace("90")
						o.angleValeur2 = o.radDeg(-Math.PI / 2 );
						break;
					//cadran 2 + 180°
					case(positionSouris[0] - posx <= 0 && positionSouris[1] - posy <= 0):
					//	trace("cadran2")
						o.angleValeur2 = o.radDeg(Math.PI - Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						break;
					//cadran 3
					case(positionSouris[0] - posx < 0 && positionSouris[1] - posy > 0):
					//	trace("cadran3")
						o.angleValeur2 = o.radDeg(Math.PI + Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						break;
					//270°
					case(positionSouris[0] - posx == 0 && positionSouris[1] - posy > 0):
					//	trace("270")
						o.angleValeur2 = o.radDeg(3*Math.PI / 2);
						break;
					//cadran 4
					case(positionSouris[0] - posx > 0 && positionSouris[1] - posy > 0):
					//	trace("branche 2 cadran4")
						o.angleValeur2 = o.radDeg(2 * Math.PI - Math.abs(Math.atan((positionSouris[1] - posy) / (positionSouris[0] - posx))));
						break;
					default:
						trace("hors cadran")
						trace("positionS[0] - posx" + (positionSouris[0] - posx))
						trace("positionS[1] - posy"+(positionSouris[1] - posy))
				}
			
				if (o.angleValeur2 > o.angleValeur1) {
				//	trace("comportement 2e branche if")
					o.angleValeur = o.angleValeur2 + 360-o.angleValeur1;
				}else {
				//	trace("comportement 2e branche else")
					o.angleValeur = o.angleValeur1 - o.angleValeur2;
				}
				o.posDep = o.premiereBranche(posx, posy, o.angleValeur1 , 5, 0x000000);
				o.posArr = o.deuxiemeBranche(posx, posy, o.angleValeur2 , 5, 0x00ffff);
				o.angleVectTxt = Math.round(Math.abs(360-o.angleValeur));
				o.conteneur.conteneurTxt.text = o.angleVectTxt + "°";
				o.dessineRemplissage(2, o.posX, o.posY, 150, o.angleVectTxt, o.posDep, o.posArr, 2, 0xeaeaff, 0xeaeaff, 100);
				o.reponse=o.analyse(o.typeAngle, o.angleVectTxt);
			}
			

		}
		conteneur.angleMc2.onRelease = function()
		{
			delete this.onEnterFrame;
		}
		conteneur.angleMc2.onReleaseOutside = function()
		{
			delete this.onEnterFrame;
		}
	}
	
	function angleEntreDeuxVecteurs(a1:Number, a2:Number, b1:Number, b2:Number):Number
	{

		return Math.acos((a1 * b1 + a2 * b2 )/ (Math.sqrt(Math.pow(a1, 2) + Math.pow(a2, 2)) * Math.sqrt(Math.pow(b1, 2) + Math.pow(b2, 2))));
	}
	
	function analyse(type, valeur):Boolean {
		//trace("dans analyse"+type)
		 var rep:Boolean = false;
		 switch(type){
			 case "vide":
				 if (valeur >= 0 && valeur <= 1){
					rep = true;
					message = "L'angle vide vaut bien 0°";
				 }else {
					 message = "L'angle vide vaut 0°";
				 }
				 break;
			 case "aigu":
				 if (valeur > 0 && valeur< 87){
					rep = true;
					message = "L'angle aigu se situe bien entre 0° et 90°";
				 }else {
					 message = "L'angle aigu se situe entre 0° et 90°";
				 }
				 break;
			 case "droit":
				 if (valeur >= 87 && valeur <= 93){
					rep = true;
					message = "L'angle droit vaut bien 90°";
				 }else {
					 message = "L'angle droit vaut 90°";
				 }
				 break;
			 case "obtus":
				 if (valeur > 93 && valeur< 178){
					rep = true;
					message = "L'angle obtus se situe bien entre 90° et 180°";
				 }else {
					 message = "L'angle obtus se situe entre 90° et 180°";
				 }
				 break;
			 case "plat":
				 if (valeur >= 178 && valeur <= 182){
					rep = true;
					message = "L'angle plat vaut bien 180°";
				 }else {
					 message = "L'angle plat vaut 180°";
				 }
				 break;
			 case "non convexe":
				 if (valeur > 182 && valeur< 359){
					rep = true;
					message = "L'angle non convexe se situe bien entre 180° et 360°";
				 }else {
					 message = "L'angle non convexe se situe entre 180° et 360°";
				 }
				 break;
			 case "plein":
				 if (valeur >= 359 && valeur <= 360){
					rep = true;
					message = "L'angle plein vaut bien 360°";
				 }else {
					 message = "L'angle plein vaut 360°";
				 }
				 break;
			 default:
				 rep = false;
				 trace("pas dans les types")
				 break;
		 }
		 return rep;
	}
	
	function actionSolution(type) {
		switch(type){
			 case "vide":
				posDep = premiereBranche(posX, posY, 0, 5, 0x00000);
				posArr = deuxiemeBranche(posX, posY, 0, 5, 0x0ffff);
				dessineRemplissage(1, posX, posY, 150, 0, posDep, posArr, 2, 0xeaeaff, 0xeaeaff, 100);
				conteneur.conteneurTxt.text = "0°";
				 break;
			 case "aigu":
				posDep = premiereBranche(posX, posY, 60, 5, 0x00000);
				posArr = deuxiemeBranche(posX, posY, 10, 5, 0x0ffff);
				dessineRemplissage(1, posX, posY, 150, 50, posDep, posArr, 2, 0xeaeaff, 0xeaeaff, 100);
				conteneur.conteneurTxt.text = "50°";
				 break;
			 case "droit":
				posDep = premiereBranche(posX, posY, 100, 5, 0x00000);
				posArr = deuxiemeBranche(posX, posY, 10, 5, 0x0ffff);
				dessineRemplissage(1, posX, posY, 150, 90, posDep, posArr, 2, 0xeaeaff, 0xeaeaff, 100);
				conteneur.conteneurTxt.text = "90°";
				 break;
			 case "obtus":
				posDep = premiereBranche(posX, posY, 150, 5, 0x00000);
				posArr = deuxiemeBranche(posX, posY, 10, 5, 0x0ffff);
				dessineRemplissage(1, posX, posY, 150, 140, posDep, posArr, 2, 0xeaeaff, 0xeaeaff, 100);
				conteneur.conteneurTxt.text = "140°";
				 break;
			 case "plat":
				posDep = premiereBranche(posX, posY, 180, 5, 0x00000);
				posArr = deuxiemeBranche(posX, posY, 0, 5, 0x0ffff);
				dessineRemplissage(1, posX, posY, 150, 180, posDep, posArr, 2, 0xeaeaff, 0xeaeaff, 100);
				conteneur.conteneurTxt.text = "180°";
				 break;
			 case "non convexe":
				posDep = premiereBranche(posX, posY, 245, 5, 0x00000);
				posArr = deuxiemeBranche(posX, posY, 10, 5, 0x0ffff);
				dessineRemplissage(1, posX, posY, 150, 235, posDep, posArr, 2, 0xeaeaff, 0xeaeaff, 100);
				conteneur.conteneurTxt.text = "235°";
				 break;
			 case "plein":
				posDep = premiereBranche(posX, posY, 5, 5, 0x00000);
				posArr = deuxiemeBranche(posX, posY, 5, 5, 0x0ffff);
				dessineRemplissage(1, posX, posY, 150, 360, posDep, posArr, 2, 0xeaeaff, 0xeaeaff, 100);
				conteneur.conteneurTxt.text = "360°";
				 break;
			 default:
				 trace("pas dans les types")
				 break;
		 }
		 
 }


}
