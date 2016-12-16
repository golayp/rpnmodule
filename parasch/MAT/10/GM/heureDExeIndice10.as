//C:\Users\luthi\Documents\JeanMichel\Paraschool\flash\heure\heureDExeIndice10.as

/**
 * ...
 * @author Jean-Michel Luthi
 */

import mx.data.encoders.Num;
import TextField;
import timer;
import Date;


//On crée la classe (le nom est celui du nom de fichier et aussi celui de la fonction principale)
class heureDExeIndice10 extends MovieClip
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
	public var formatDateMontre:TextFormat; //format pourl'affichage de l'heure dans la montre
	public var formatTxtSol:TextFormat;//format pour le texte h:min
	//public var typeAngle:String;//type d'angle à trouver
	public var textQuestion:TextField;//Champ texte où il y a la question
	public var message:String;//message transmis à l'interfaceAvecIF
	public var nbDeDixiemes:Number;


	private var posDep:Array=new Array(); //position de départ de l'arc de cercle
	private	var posArr:Array = new Array(); //position d'arrivée de l'arc de cercle
	//private var angle1Txt:Number;
	//private	var angle2Txt:Number;
	private	var angleVectTxt:Number;
	private	var angleHeureMin:Array = new Array();
	private	var heureDep:Number;
	private	var minDep:Number;
	private var moisDep:Number;
	private var moisTxtDep:String;
	private var dateDep:Number;
	private var plusPetitQue180:Boolean;
	private var mois:Array;
	private var tailleAiguille:Number;
	private var tailleGraduation:Number;
	private var R:Number;
	private var V:Number;
	private var B:Number;
	private var couleurFond:String;
	private var maProportion:Number;
	private var proportionClip:Number;

	function heureDExeIndice10(XTemp,YTemp, clipConteneur, formatHTemp, formatDateMontreTemp, formatTxtTemp, formatTxtSolTemp,formatMTemp, tailleSceneTemp)
	{
		//On cree un objet date qui retournera la date et l'heure pour mettre la montre à l'heure lorsqu'on la charge
		var my_date:Date = new Date();
		trace("my_date.getHours()"+my_date.getHours());
		trace("my_date.getMinutes()" + my_date.getMinutes());
		
		trace("my_date.getDate()" + my_date.getDate());
		trace("my_date.getFullYear()" + my_date.getFullYear());
		
		//On crée un tableau reliant le numéro du mois au nom du mois
		mois = new Array(["janvier",31], ["février",28], ["mars",31], ["avril",30], ["mai",31], ["juin",30], ["juillet",31], ["août",31], ["septembre",30], ["octobre",31], ["novembre",30], ["décembre",31]);
		
		//On met 29 jours à février si onest une année bissextile:
		if (bissextile(my_date.getFullYear()) == true) {
			mois[1][1] = 29;
		}
		//trace("fevrier:"+mois[1][1])
		//trace(1980%4)
		//trace ("bissextile"+bissextile(2100))
		//les mois commencent à 0
		trace("Date: " + my_date.getDate() +" " + mois[(my_date.getMonth())][0] + " " + my_date.getFullYear() + " à " + my_date.getHours() + "h " + my_date.getMinutes() + "min");
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
		formatDateMontre = formatDateMontreTemp;
		plusPetitQue180 = true;
		//textQuestion = questionTemp;
		//On place l'angle de départ de façon aléatoire
		heureDep = Math.floor(Math.random() * 23);
		minDep = Math.floor(Math.random() * 59);
		//On place l'heure de départ à l'heure actuelle
		heureDep = my_date.getHours();
		minDep = my_date.getMinutes();
		moisDep = my_date.getMonth();
		//moisDep = 0;
		moisTxtDep = mois[moisDep][0];
		trace("moisTxtDep"+moisTxtDep)
		dateDep = my_date.getDate();
		trace("dateDep"+dateDep)
		//heureDep = 13;
		//minDep = 13;
		minutes = minDep;
		heures = heureDep;
		angleHeureMin = heureAngleDeg(heureDep, minDep);//heureAngleDeg retourne l'angle en degres depuis le nord
		trace("angle heure min: "+angleHeureMin)
		angleValeurH = angleHeureMin[0];//angle des Heures
		angleValeurM = angleHeureMin[1];//angle des minutes
		angleValeurRel = Math.random() * 90-angleValeurM;

		trace("angleDegHeure" + angleDegHeure(angleValeurH, angleValeurM))
		tailleAiguille = 100;
		tailleGraduation = 10;
		//on lance la création du clip
		dessineLeClip();
		//temps = Date.getHours();
		//
		//trace("temps"+temps)
		nbDeDixiemes = -1;
		maProportion = 100;
	}
	
	function dessineLeClip()
	{
		
		//On crée un support pour le clip de chaque branche et un support pour le remplissage pour pouvoir mettre le onPress et le onRelease
		//On ne peut pas mettre onRelease sur le clip branche car il est recréé tout le temps.

		conteneur.attachMovie("heureBaseMc2", "angleMc0",0);
		conteneur.angleMc0._x = posX;
		conteneur.angleMc0._y = posY;
		trace("////////////////////////////////////////////")
		trace("width " + conteneur.angleMc0._width)
		trace("heigh "+conteneur.angleMc0._height)
		proportionClip = conteneur.angleMc0._width / conteneur.angleMc0._height;
		trace("maProportion du début"+proportionClip)
		//conteneur.angleMc0._width = 100;
		
		conteneur.angleMc0._height = proportionClip * conteneur.angleMc0._width;
		trace("width " + conteneur.angleMc0._width)
		trace("heigh "+conteneur.angleMc0._height)
		conteneur.angleMc0.createTextField("moisTxt", 8, 20, -10, 75, 20);
		conteneur.angleMc0.moisTxt.selectable = false;
		conteneur.angleMc0.moisTxt.background = true;
		conteneur.angleMc0.moisTxt.backgroundcolor = 0xffffff;
		conteneur.angleMc0.moisTxt.setNewTextFormat(formatDateMontre);
		conteneur.angleMc0.moisTxt.text = moisTxtDep;
		
		
		conteneur.angleMc0.createTextField("jourTxt", 9, 97, -10, 20, 20);
		conteneur.angleMc0.jourTxt.selectable = false;
		conteneur.angleMc0.jourTxt.background = true;
		conteneur.angleMc0.jourTxt.backgroundcolor = 0xffffff;
		conteneur.angleMc0.jourTxt.setNewTextFormat(formatDateMontre);
		conteneur.angleMc0.jourTxt.text = dateDep;
		
		trace("conteneur.angleMc0.heuresDate.moisTxt."+conteneur.angleMc0.heuresDate)
		conteneur.angleMc0.heuresDate.jourTxt.text = dateDep;
		conteneur.createEmptyMovieClip("angleMcM", 3);
		conteneur.createEmptyMovieClip("angleMcH", 2);
		conteneur.createEmptyMovieClip("angleMc3", 1);
		conteneur.createEmptyMovieClip("angleMcGraduation", 4);
		conteneur.createEmptyMovieClip("angleMcGradMin", 5);
		
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

		graduation(10, 0x000000, 4, tailleAiguille );
		
		posDep = premiereBranche(tailleAiguille, posX, posY, angleValeurM, 5, 0x00000);//Aiguille des minutes
		posArr = deuxiemeBranche(tailleAiguille, posX, posY, angleValeurH, 5, 0x0ffff);//aiguille des heures
		
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
	//On réalise une fonction qui va mettre une couleur dégradée à chaque nb-ième
	function setCouleurFond (couleur, cAlpha)
	{
		trace("" + composante(couleurFond));
		couleurFond = couleur;
		R=composante(couleurFond)[0];
		V=composante(couleurFond)[1];
		B=composante(couleurFond)[2];
	}
	function composante(couleurHexa:String):Array
	{
		var RVB:Array=new Array(3)
		couleurHexa=couleurHexa.toUpperCase();
		RVB[2]=ecritureDeci(couleurHexa.substr(7,1))+ecritureDeci(couleurHexa.substr(6,1))*16;
		RVB[1]=ecritureDeci(couleurHexa.substr(5,1))+ecritureDeci(couleurHexa.substr(4,1))*16;
		RVB[0]=ecritureDeci(couleurHexa.substr(3,1))+ecritureDeci(couleurHexa.substr(2,1))*16;
		return RVB;
	}
	//fonction qui convertit un hexdécimal en décimal, utilisé pour les couleurs, en composantes RVB
	function ecritureDeci (nbHexa:String):Number
	{
	
	
		var maVal:Number;
		switch(nbHexa)
		{
			case "0":
			maVal=0;
			break;
			case "1":
			maVal=1;
			break;
			case "2":
			maVal=2;
			break;
			case "3":
			maVal=3;
			break;
			case "4":
			maVal=4;
			break;
			case "5":
			maVal=5;
			break;
			case "6":
			maVal=6;
			break;
			case "7":
			maVal=7;
			break;
			case "8":
			maVal=8;
			break;
			case "9":
			maVal=9;
			break;
			case "A":
			maVal=10;
			break;
			case "B":
			maVal=11;
			break;
			case "C":
			maVal=12;
			break;
			case "D":
			maVal=13;
			break;
			case "E":
			maVal=14;
			break;
			case "F":
			maVal=15;
			break;
		}
	
		return maVal;
	}
	function gradMinutes(taille, couleur, epaisseur) {
		taille = taille / 2 - taille/12;
		trace("tailleGradMin" + taille)
		var tailleTrait:Number = taille / 10;
		for (var i:Number = 0; i < 60; i++) {
			//trace(["graduationMin"+i])
			conteneur.angleMcGradMin.createEmptyMovieClip("gradMinutes"+i, 100+i);
			conteneur.angleMcGradMin["gradMinutes"+i].lineStyle(epaisseur, couleur);
			conteneur.angleMcGradMin["gradMinutes"+i].moveTo (posX+taille * Math.cos(2*Math.PI*i/60-Math.PI/2), posY+taille * Math.sin(2*Math.PI*i/60-Math.PI/2));
			conteneur.angleMcGradMin["gradMinutes"+i].lineTo (posX+(taille + tailleTrait) * Math.cos(2*Math.PI*i/60-Math.PI/2), posY+(taille + tailleTrait) * Math.sin(2*Math.PI*i/60-Math.PI/2));
		}
	}
	function graduation(nb, couleur, epaisseur, taille) {
		var o:MovieClip = this;
		taille = taille / 2 ;
		trace("tailleGraduation"+taille)
		//On échantillonne sur nb couleurs
		var maCouleur:Array = new Array();
		var couleurNombre:Number=Math.ceil(nb*Math.pow(16,3)+Math.ceil((Math.random()*5+10))*Math.pow(16,5)+nb*Math.pow(16,4)+Math.ceil((Math.random()*5+10))*Math.pow(16,2)+Math.ceil((Math.random()*5+10))*Math.pow(16,1)+Math.ceil((Math.random()*5+10)));
		for (var i:Number = 0; i < nb; i++) {
			//trace(["graduation" + i])
			////////////////////////////////////////////////ICI ON REALISE LE DEGRADE LE 5 ET LE 3 DONNE L'ENDROIT OÙ ON MODIFIE LA COULEUR//////////////////////////////////////
			maCouleur[i]=couleurNombre-Math.pow(16,5)*i-Math.pow(16,1)*i-Math.pow(16, 3);

			//On a fait un tableau dans init qui attribue la couleur à chaque case.
			//setCouleurFond (maCouleur[i], 50);

			conteneur.angleMcGraduation.createEmptyMovieClip("graduation" + i, 200 + i);
			conteneur.angleMcGraduation["graduation" + i].lineStyle();
			conteneur.angleMcGraduation["graduation" + i].moveTo (posX,posY);
			//conteneur.angleMcGraduation["graduation"+i].moveTo (tailleAiguille*0.8 * Math.cos(2*Math.PI*i/nb-Math.PI/2), tailleAiguille*0.8 * Math.sin(2*Math.PI*i/nb-Math.PI/2));
			conteneur.angleMcGraduation["graduation"+i].beginFill(maCouleur[i], 0);
			conteneur.angleMcGraduation["graduation" + i].lineTo (posX+(taille + tailleGraduation) * Math.cos(2 * Math.PI * i / nb - Math.PI / 2),posY+ (taille + tailleGraduation) * Math.sin(2 * Math.PI * i / nb - Math.PI / 2));
			conteneur.angleMcGraduation["graduation" + i].lineTo (posX+(taille + tailleGraduation) * Math.cos(2 * Math.PI * (i + 1) / nb - Math.PI / 2),posY+ (taille + tailleGraduation) * Math.sin(2 * Math.PI * (i + 1) / nb - Math.PI / 2));
			conteneur.angleMcGraduation["graduation" + i].lineTo (posX, posY);
			conteneur.angleMcGraduation["graduation" + i].endFill;
			//conteneur.angleMcGraduation["graduation" + i]._alpha = 60;
			
			conteneur.angleMcGraduation["graduation" + i].createEmptyMovieClip("remplissage",1);
			conteneur.angleMcGraduation["graduation" + i].createTextField("nbDixieme", 0, -15+posX+(taille + tailleGraduation) * 1.1 * Math.cos(2 * Math.PI * (i + 0.5) / nb - Math.PI / 2),posY -10+(taille + tailleGraduation) * 1.1 * Math.sin(2 * Math.PI * (i + 0.5) / nb - Math.PI / 2), 35, 20);
			conteneur.angleMcGraduation["graduation" + i].nbDixieme.setNewTextFormat(formatValeurH);
			if (i + 1 < 10) {
				conteneur.angleMcGraduation["graduation" + i].nbDixieme.text = "0," + (i + 1) + "h";
			}else {
				conteneur.angleMcGraduation["graduation" + i].nbDixieme.text =  "1h";
			}
			
			conteneur.angleMcGraduation["graduation" + i].remplissage.lineStyle(epaisseur, maCouleur[i]);
			conteneur.angleMcGraduation["graduation" + i].remplissage.moveTo (posX, posY);
			//conteneur.angleMcGraduation["graduation"+i].moveTo (tailleAiguille*0.8 * Math.cos(2*Math.PI*i/nb-Math.PI/2), tailleAiguille*0.8 * Math.sin(2*Math.PI*i/nb-Math.PI/2));
			conteneur.angleMcGraduation["graduation" + i].remplissage.beginFill(maCouleur[i], 100);
			for (var k = 1; k <= 60; k++) {
				conteneur.angleMcGraduation["graduation" + i].remplissage.lineTo (posX+(taille + tailleGraduation) * Math.cos(2 * Math.PI * i / nb - Math.PI / 2 +2 * Math.PI * k / 600),posY+ (taille + tailleGraduation) * Math.sin(2 * Math.PI * i / nb - Math.PI / 2 +2 * Math.PI * k / 600));
				conteneur.angleMcGraduation["graduation" + i].remplissage.lineTo (posX, posY);
			}/*
			conteneur.angleMcGraduation["graduation" + i].remplissage.lineTo ((tailleAiguille * 0.8 + tailleGraduation) * Math.cos(2 * Math.PI * i / nb - Math.PI / 2), (tailleAiguille * 0.8 + tailleGraduation) * Math.sin(2 * Math.PI * i / nb - Math.PI / 2));
			conteneur.angleMcGraduation["graduation" + i].remplissage.lineTo ((tailleAiguille * 0.8 + tailleGraduation) * Math.cos(2 * Math.PI * (i + 1) / nb - Math.PI / 2), (tailleAiguille * 0.8 + tailleGraduation) * Math.sin(2 * Math.PI * (i + 1) / nb - Math.PI / 2));
			conteneur.angleMcGraduation["graduation" + i].remplissage.lineTo (0, 0);*/
			conteneur.angleMcGraduation["graduation" + i].remplissage.endFill;
			conteneur.angleMcGraduation["graduation" + i].remplissage._alpha = 40;
			conteneur.angleMcGraduation["graduation" + i].remplissage._visible = false;
			conteneur.angleMcGraduation["graduation" + i].nbDixieme._visible = false;
			
			conteneur.angleMcGraduation["graduation" + i].onRollOver = function() {
				//trace("onRollOver" + this)
				//trace("onRollOver" + conteneur.angleMc0["graduation" + k])
				//On teste où on est
				for (var k = 0; k <= nb; k++) {
					if (this == o.conteneur.angleMcGraduation["graduation" + k]) {
						//trace("On est sur le "+o.conteneur.angleMc0["graduation" + k])
						o.nbDeDixiemes = k;
						for (var j:Number = 0; j <= o.nbDeDixiemes; j++) {
					
							o.conteneur.angleMcGraduation["graduation" + j].remplissage._visible = true;
							o.conteneur.angleMcGraduation["graduation" + j].nbDixieme._visible = true;
						}
					}
					
				}
				
				
			}
			conteneur.angleMcGraduation["graduation" + i].onRollOut = function() {
				//trace("onRollOut"+this)
				for (var j:Number = 0; j <nb; j++) {
					o.conteneur.angleMcGraduation["graduation" + j].remplissage._visible = false;
					o.conteneur.angleMcGraduation["graduation" + j].nbDixieme._visible = false;
				}
				o.nbDeDixiemes = -1;
			}
		}
	}
	function setDixiemes(nbTot, nb) {
		for (var j:Number = 0; j < nbTot; j++) {
			if(j<nb){
				conteneur.angleMcGraduation["graduation" + j].remplissage._visible = true;
				conteneur.angleMcGraduation["graduation" + j].nbDixieme._visible = true;
			}else {
				conteneur.angleMcGraduation["graduation" + j].remplissage._visible = false;
				conteneur.angleMcGraduation["graduation" + j].nbDixieme._visible = false;
			}
		}
	}
	function visibilite(etat) {
		conteneur.angleMc0._visible = etat;
		conteneur.angleMcM._visible = etat;
		conteneur.angleMcH._visible = etat;
		conteneur.angleMcGraduation._visible = etat;
		conteneur.angleMcGradMin._visible = etat;
		//trace("visibilite 10");
	}
	
	function premiereBranche(maTaille:Number, depX:Number, depY:Number, angleParRapportHorizontal:Number, epaisseur:Number, couleur):Array {//Dessine la branche puis retourne les coordonnées du départ du cercle
		//On adapte la taille à la taille de l'aiguille (moitié du diamètre)
		maTaille = maTaille / 2;
		var coordPt:Array = new Array();
		var angleParRapportHorizontalRad:Number = degRad(angleParRapportHorizontal);
		//On détermine la longueur des branchespar rapport à la taille de la scène tailleScene[0]xtailleScene[1]
		//Par rapport au sommet de l'angle, on détermine les angles jusqu'au coins de la scène
trace ("première branche"+ maTaille)
		//trace("longueur"+longueur)
		conteneur.angleMcM.createEmptyMovieClip("branche1", 1);
		conteneur.angleMcM.branche1.lineStyle(epaisseur, couleur);
		conteneur.angleMcM.branche1.moveTo (depX - maTaille*1/15 * Math.cos(angleParRapportHorizontalRad), depY + maTaille*1/15 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcM.branche1.beginFill(couleur, 100);
		conteneur.angleMcM.branche1.lineTo (depX + maTaille*1/15 * Math.sin(angleParRapportHorizontalRad), depY + maTaille*1/15 * Math.cos(angleParRapportHorizontalRad));
		conteneur.angleMcM.branche1.lineTo (depX + maTaille*14/15 * Math.cos(angleParRapportHorizontalRad), depY - maTaille*14/15 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcM.branche1.lineTo (depX - maTaille* 1/15 * Math.sin(angleParRapportHorizontalRad), depY - maTaille*1/15 * Math.cos(angleParRapportHorizontalRad));
		conteneur.angleMcM.branche1.lineTo (depX -maTaille* 1/15 * Math.cos(angleParRapportHorizontalRad), depY + maTaille*1/15 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcM.branche1.endFill;
		coordPt[0] = posX + maTaille*14/15 * Math.cos(angleParRapportHorizontalRad);
		coordPt[1] = posY + maTaille*14/15 * Math.sin(angleParRapportHorizontalRad);
		//coordPt[2] = longueur;
		coordPt[3] = Math.cos(angleParRapportHorizontalRad);
		coordPt[4] = -Math.sin(angleParRapportHorizontalRad);
		return coordPt;
	}
	
	function deuxiemeBranche(maTaille:Number, depX:Number, depY:Number, angleParRapportHorizontal:Number, epaisseur:Number, couleur):Array {//Dessine la branche puis retourne les coordonnées de l'arrivée du cercle
		//On adapte la taille à la taille de l'aiguille (moitié du diamètre)
		maTaille = maTaille / 2;
		var coordPt:Array = new Array();
		//var longueur:Number;
		var angleParRapportHorizontalRad:Number = degRad(angleParRapportHorizontal);
		//On détermine la longueur des branchespar rapport à la taille de la scène tailleScene[0]xtailleScene[1]
		//Par rapport au sommet de l'angle, on détermine les angles jusqu'au coins de la scène
trace("deuxieme branche"+ maTaille)
		conteneur.angleMcH.createEmptyMovieClip("branche2", 2);
		conteneur.angleMcH.branche2.lineStyle(epaisseur, couleur);
		conteneur.angleMcH.branche2.moveTo (depX - maTaille*1/10 * Math.cos(angleParRapportHorizontalRad), depY + maTaille*1/10 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.beginFill(couleur, 100);
		conteneur.angleMcH.branche2.lineTo (depX + maTaille*1/10 * Math.sin(angleParRapportHorizontalRad), depY + maTaille*1/10 * Math.cos(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.lineTo (depX + maTaille*2/3 * Math.cos(angleParRapportHorizontalRad), depY - maTaille*2/3 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.lineTo (depX - maTaille*1/10 * Math.sin(angleParRapportHorizontalRad), depY - maTaille*1/10 * Math.cos(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.lineTo (depX - maTaille*1/10 * Math.cos(angleParRapportHorizontalRad), depY + maTaille*1/10 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.endFill;
		
		//conteneur.angleMcH.branche2._xscale = maProportion;
		//conteneur.angleMcH.branche2._yscale = maProportion;
		
		coordPt[0] = posX + maTaille*2/3 * Math.cos(angleParRapportHorizontalRad);
		coordPt[1] = posY + maTaille*2/3 * Math.sin(angleParRapportHorizontalRad);
		//coordPt[2] = longueur;
		coordPt[3] = Math.cos(angleParRapportHorizontalRad);
		coordPt[4] = -Math.sin(angleParRapportHorizontalRad);
		return coordPt;
	}
	
	function setTailleMontre(maTaille) {
		//if (Math.round(maTaille)!=Math.round(tailleAiguille)){
		//	maProportion = (maTaille / tailleAiguille);
		//}
		trace("width " + conteneur.angleMc0._width)
		trace("height "+conteneur.angleMc0._height)
		tailleAiguille = maTaille;
		tailleGraduation = maTaille / 10;
		trace("maTaille" + maTaille);
		conteneur.angleMc0.moisTxt._x = posX-conteneur.angleMc0.jourTxt._width;
		conteneur.angleMc0.jourTxt._x = posX+conteneur.angleMc0.moisTxt._width-conteneur.angleMc0.jourTxt._width;
		conteneur.angleMc0._width = maTaille;
		conteneur.angleMc0._height = maTaille * proportionClip;
		posDep = premiereBranche(maTaille, posX, posY, angleValeurM, 5, 0x00000);//Aiguille des minutes
		posArr = deuxiemeBranche(maTaille, posX, posY, angleValeurH, 5, 0x0ffff);//aiguille des heures
		gradMinutes(maTaille, 0x660000, 2);
		graduation(10, 0x660000, 4, maTaille);
	}
	
	
	function setPosition(monX, monY) {
		trace ("setPosition")
		conteneur._x = monX;
		conteneur._y = monY;
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
	
	function continu() {
		var my_date:Date = new Date();
		trace("my_date.getHours()"+my_date.getHours());
		trace("my_date.getMinutes()" + my_date.getMinutes());
		
		trace("my_date.getDate()" + my_date.getDate());
		trace("my_date.getFullYear()" + my_date.getFullYear());
		
		//On crée un tableau reliant le numéro du mois au nom du mois
		mois = new Array(["janvier",31], ["février",28], ["mars",31], ["avril",30], ["mai",31], ["juin",30], ["juillet",31], ["août",31], ["septembre",30], ["octobre",31], ["novembre",30], ["décembre",31]);
		
		//On met 29 jours à février si onest une année bissextile:
		if (bissextile(my_date.getFullYear()) == true) {
			mois[1][1] = 29;
		}
		heureDep = my_date.getHours();
		minDep = my_date.getMinutes();
		moisDep = my_date.getMonth();
		//moisDep = 0;
		moisTxtDep = mois[moisDep][0];
		trace("moisTxtDep"+moisTxtDep)
		dateDep = my_date.getDate();
		trace("dateDep"+dateDep)
		//heureDep = 13;
		//minDep = 13;
		minutes = minDep;
		heures = heureDep;
		angleHeureMin = heureAngleDeg(heureDep, minDep);//heureAngleDeg retourne l'angle en degres depuis le nord
		trace("angle heure min: "+angleHeureMin)
		angleValeurH = angleHeureMin[0];//angle des Heures
		angleValeurM = angleHeureMin[1];//angle des minutes
		
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
			var etatTemp:String = "";
			var cadran:Number;
			trace("onPress"+this)
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
							trace("o.mois[o.moisDep][1]" + o.mois[o.moisDep][1])
							trace("o.mois" + o.mois)
							trace("")
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
							o.conteneur.angleMc0.jourTxt.text = o.dateDep;
							o.conteneur.angleMc0.moisTxt.text = o.mois[o.moisDep][0];
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
						trace("")
						trace("nb de tours"+nbTours)
						trace("cadran" + cadran)
						trace("dateDep" + o.dateDep)
						trace("moisDep" + o.moisDep)
						trace("")
						if (cadran == 1 && nbTours == 1) {
							nbTours = 2;
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
							o.conteneur.angleMc0.jourTxt.text = o.dateDep;
							o.conteneur.angleMc0.moisTxt.text = o.mois[o.moisDep][0];
							
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
	
	function analyse(h, hAT, min, minAT):Boolean {
		//trace("dans analyse hAT: " + hAT)
		//trace("dans analyse h: " + h)
		//trace("dans analyse minAT: " + minAT)
		//trace("dans analyse min: " + min)
		
		 var rep:Boolean = false;
		if (h == hAT && min == minAT) {
			rep = true;
		}else {
			rep = false;
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
	function maDate():String {
		var monRetour:String;
		var myDate:Date = new Date();
		//On crée un tableau reliant le numéro du mois au nom du mois
		var mois:Array = new Array("janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre");
		monRetour = myDate.getDate() +" " + mois[(myDate.getMonth())] + " " + myDate.getFullYear() + " à " + myDate.getHours() + "h " + myDate.getMinutes() + "min";
		return monRetour;
	}
	
	function bissextile(annee):Boolean {
		var retour:Boolean = false;
		trace("annee: " + annee)
		trace("annee%4: " + annee % 4)
		trace("annee%400: " + annee % 400)
		trace("annee%100: " + annee % 100)
		
		switch (true) {
			case ((annee % 100 == 0) && (annee % 400 != 0)):
				trace("bissextile re-false")
				retour = false;
				break;
			case (annee % 4 == 0):
				trace ("bissextile true(%4=0)")
				retour = true;
				break;
			
			default:
				retour = false;
				break
		}
		return retour;
	}
	
}
