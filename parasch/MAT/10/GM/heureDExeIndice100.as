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
class heureDExeIndice100 extends MovieClip
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
	public var nbDeCentiemes:Number;


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
	private var proportion:Number;
	private var taille:Number;
	private var proportionClip:Number;
	private var proportionMasque:Number;

	function heureDExeIndice100(XTemp,YTemp, clipConteneur, formatHTemp, formatMTemp, formatDateMontreTemp, formatTxtTemp, formatTxtSolTemp, tailleSceneTemp)
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
		heureDep = 10;
		minDep = 12;
		minutes = minDep;
		heures = heureDep;
		angleHeureMin = heureAngleDeg(heureDep, minDep);//heureAngleDeg retourne l'angle en degres depuis le nord
		trace("angle heure min: "+angleHeureMin)
		angleValeurH = angleHeureMin[0];//angle des Heures
		angleValeurM = angleHeureMin[1];//angle des minutes
		angleValeurRel = Math.random() * 90-angleValeurM;

		trace("angleDegHeure" + angleDegHeure(angleValeurH, angleValeurM))
		taille = 300;
		tailleGraduation = 10;
		//on lance la création du clip
		dessineLeClip();
		//temps = Date.getHours();
		//
		//trace("temps"+temps)
		nbDeDixiemes = -1;
		nbDeCentiemes = -1;
	}
	
	function dessineLeClip()
	{
		
		//On crée un support pour le clip de chaque branche et un support pour le remplissage pour pouvoir mettre le onPress et le onRelease
		//On ne peut pas mettre onRelease sur le clip branche car il est recréé tout le temps.

		//conteneur.attachMovie("heureBaseMc2Quartier", "angleMc0", 0);
		conteneur.attachMovie("montre10e", "angleMc0", 0);
		conteneur.attachMovie("masqueMc", "masque", -1);
		
		proportionMasque = conteneur.masque._height / conteneur.masque._width;
		trace("proportionMasque"+proportionMasque)
		conteneur.masque._width = 290;
		conteneur.masque._heigth = 290*proportionMasque;
		conteneur.masque._x = posX+60;
		conteneur.masque._y = posY-90;
		conteneur.setMask(conteneur.masque);
		conteneur.angleMc0._x = posX;
		conteneur.angleMc0._y = posY;
		proportion = conteneur._height / conteneur._width;
		conteneur._height = taille;
		proportionClip = conteneur.angleMc0._width / conteneur.angleMc0._height;
		conteneur._width = taille / proportion;
		trace ("proportion" + proportion);
		
		
		conteneur.createEmptyMovieClip("angleMcM", 3);
		conteneur.createEmptyMovieClip("angleMcH", 2);
		conteneur.createEmptyMovieClip("angleMcGraduation", 4);
		conteneur.createEmptyMovieClip("angleMcGradMin", 5);
		conteneur.createEmptyMovieClip("angleMcGraduation100", 6);

		graduation(10, 0x000000, 4, 100);
		graduationCentiemes(100, 0x000000, 4, 100);
		gradMinutes(0.95*taille, 0x660000, 2);
		//gradMinutesCent(0.8*taille, 0x660000, 2)
		posDep = premiereBranche(300, posX, posY, angleValeurM, 5, 0x00000);//Aiguille des minutes
		posArr = deuxiemeBranche(300, posX, posY, angleValeurH, 5, 0x0ffff);//aiguille des heures
		

		reponse = analyse(heures, heureATrouver, minutes, minuteATrouver);
		//trace("typeAngle" + typeAngle)
		//trace("angleVectTxt"+Math.abs(angleVectTxt))
		trace("reponse"+reponse)

		
	}
	
	function setPosition(monX, monY) {
		trace ("setPosition")
		conteneur._x = monX;
		conteneur._y = monY;
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
/*	function gradMinutes(tailleGrad, couleur, epaisseur) {
		for (var i:Number = 0; i < 60; i++) {
			//trace(["graduationMin"+i])
			conteneur.createEmptyMovieClip("gradMinutes"+i, 100+i);
			conteneur["gradMinutes"+i].lineStyle(epaisseur, couleur);
			conteneur["gradMinutes"+i].moveTo (posX+tailleGrad*0.46* Math.cos(2*Math.PI*i/60-Math.PI/2), posY+tailleGrad*0.46  * Math.sin(2*Math.PI*i/60-Math.PI/2));
			conteneur["gradMinutes"+i].lineTo (posX+(tailleGrad  + tailleGraduation)*0.46*Math.cos(2*Math.PI*i/60-Math.PI/2), posY+(tailleGrad  + tailleGraduation)*0.46 * Math.sin(2*Math.PI*i/60-Math.PI/2));
		}
	}*/
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
	
/*	function graduation(nb, couleur, epaisseur) {
		var o:MovieClip = this;
		//On échantillonne sur nb couleurs
		var maCouleur:Array = new Array();
		var couleurNombre:Number=Math.ceil(nb*Math.pow(16,3)+Math.ceil((Math.random()*5+10))*Math.pow(16,5)+nb*Math.pow(16,4)+Math.ceil((Math.random()*5+10))*Math.pow(16,2)+Math.ceil((Math.random()*5+10))*Math.pow(16,1)+Math.ceil((Math.random()*5+10)));
		for (var i:Number = 0; i < nb; i++) {
			//trace(["graduation" + i])
			////////////////////////////////////////////////ICI ON REALISE LE DEGRADE LE 5 ET LE 3 DONNE L'ENDROIT OÙ ON MODIFIE LA COULEUR//////////////////////////////////////
			maCouleur[i]=couleurNombre-Math.pow(16,5)*i-Math.pow(16,1)*i-Math.pow(16, 3);

			//On a fait un tableau dans init qui attribue la couleur à chaque case.
			//setCouleurFond (maCouleur[i], 50);

			conteneur.angleMc0.createEmptyMovieClip("graduation" + i, 200 + i);
			conteneur.angleMc0["graduation" + i].lineStyle();
			conteneur.angleMc0["graduation" + i].moveTo (0, 0);
			//conteneur.angleMc0["graduation"+i].moveTo (tailleAiguille*0.8 * Math.cos(2*Math.PI*i/nb-Math.PI/2), tailleAiguille*0.8 * Math.sin(2*Math.PI*i/nb-Math.PI/2));
			conteneur.angleMc0["graduation"+i].beginFill(maCouleur[i], 0);
			conteneur.angleMc0["graduation" + i].lineTo ((taille * 0.46 + tailleGraduation) * Math.cos(2 * Math.PI * i / nb - Math.PI / 2), (taille * 0.46 + tailleGraduation) * Math.sin(2 * Math.PI * i / nb - Math.PI / 2));
			conteneur.angleMc0["graduation" + i].lineTo ((taille * 0.46 + tailleGraduation) * Math.cos(2 * Math.PI * (i + 1) / nb - Math.PI / 2), (taille * 0.46 + tailleGraduation) * Math.sin(2 * Math.PI * (i + 1) / nb - Math.PI / 2));
			conteneur.angleMc0["graduation" + i].lineTo (0, 0);
			conteneur.angleMc0["graduation" + i].endFill;
			//conteneur.angleMc0["graduation" + i]._alpha = 60;
			
			conteneur.angleMc0["graduation" + i].createEmptyMovieClip("remplissage",1);
			conteneur.angleMc0["graduation" + i].createTextField("nbDixieme", 0, -15+(taille * 0.55 + tailleGraduation) * 1.1 * Math.cos(2 * Math.PI * (i + 0.5) / nb - Math.PI / 2), -10+(taille * 0.55 + tailleGraduation) * 1.1 * Math.sin(2 * Math.PI * (i + 0.5) / nb - Math.PI / 2), 35, 20);
			conteneur.angleMc0["graduation" + i].nbDixieme.setNewTextFormat(formatValeurM);
			if (i + 1 < 10) {
				conteneur.angleMc0["graduation" + i].nbDixieme.text = "0," + (i + 1) + "h";
			}else {
				conteneur.angleMc0["graduation" + i].nbDixieme.text =  "1h";
			}
			
			conteneur.angleMc0["graduation" + i].remplissage.lineStyle(epaisseur, maCouleur[i]);
			conteneur.angleMc0["graduation" + i].remplissage.moveTo (0, 0);
			//conteneur.angleMc0["graduation"+i].moveTo (tailleAiguille*0.8 * Math.cos(2*Math.PI*i/nb-Math.PI/2), tailleAiguille*0.8 * Math.sin(2*Math.PI*i/nb-Math.PI/2));
			conteneur.angleMc0["graduation" + i].remplissage.beginFill(maCouleur[i], 100);
			for (var k = 1; k <= 60; k++) {
				conteneur.angleMc0["graduation" + i].remplissage.lineTo ((taille * 0.46 + tailleGraduation) * Math.cos(2 * Math.PI * i / nb - Math.PI / 2 +2 * Math.PI * k / 600), (taille * 0.46 + tailleGraduation) * Math.sin(2 * Math.PI * i / nb - Math.PI / 2 +2 * Math.PI * k / 600));
				conteneur.angleMc0["graduation" + i].remplissage.lineTo (0, 0);
			}/*
			conteneur.angleMc0["graduation" + i].remplissage.lineTo ((tailleAiguille * 0.8 + tailleGraduation) * Math.cos(2 * Math.PI * i / nb - Math.PI / 2), (tailleAiguille * 0.8 + tailleGraduation) * Math.sin(2 * Math.PI * i / nb - Math.PI / 2));
			conteneur.angleMc0["graduation" + i].remplissage.lineTo ((tailleAiguille * 0.8 + tailleGraduation) * Math.cos(2 * Math.PI * (i + 1) / nb - Math.PI / 2), (tailleAiguille * 0.8 + tailleGraduation) * Math.sin(2 * Math.PI * (i + 1) / nb - Math.PI / 2));
			conteneur.angleMc0["graduation" + i].remplissage.lineTo (0, 0);*/
			/*
			conteneur.angleMc0["graduation" + i].remplissage.endFill;
			conteneur.angleMc0["graduation" + i].remplissage._alpha = 40;
			conteneur.angleMc0["graduation" + i].remplissage._visible = true;
			conteneur.angleMc0["graduation" + i].nbDixieme._visible = true;
			*/
		/*	
			conteneur.angleMc0["graduation" + i].onRollOver = function() {
				//trace("onRollOver" + this)
				//trace("onRollOver" + conteneur.angleMc0["graduation" + k])
				//On teste où on est
				for (var k = 0; k <= nb; k++) {
					if (this == o.conteneur.angleMc0["graduation" + k]) {
						//trace("On est sur le "+o.conteneur.angleMc0["graduation" + k])
						o.nbDeDixiemes = k;
						for (var j:Number = 0; j <= o.nbDeDixiemes; j++) {
					
							o.conteneur.angleMc0["graduation" + j].remplissage._visible = true;
							o.conteneur.angleMc0["graduation" + j].nbDixieme._visible = true;
						}
					}
					
				}
				
				
			}
			conteneur.angleMc0["graduation" + i].onRollOut = function() {
				//trace("onRollOut"+this)
				for (var j:Number = 0; j <nb; j++) {
					o.conteneur.angleMc0["graduation" + j].remplissage._visible = false;
					o.conteneur.angleMc0["graduation" + j].nbDixieme._visible = false;
				}
				o.nbDeDixiemes = -1;
			}
		
		}
	}*/
	
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
			conteneur.angleMcGraduation["graduation" + i].createTextField("nbDixieme", 0, -15+posX+(taille + tailleGraduation) * 1.25 * Math.cos(2 * Math.PI * (i + 0.5) / nb - Math.PI / 2),posY -10+(taille + tailleGraduation) * 1.25 * Math.sin(2 * Math.PI * (i + 0.5) / nb - Math.PI / 2), 35, 20);
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
			conteneur.angleMcGraduation["graduation" + i].remplissage._visible = true;
			conteneur.angleMcGraduation["graduation" + i].nbDixieme._visible = true;
		/*	
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
			}*/
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
	function graduationCentiemes(nb, couleur, epaisseur, taille) {
		var o:MovieClip = this;
		taille = 5+taille / 2 ;
		//On échantillonne sur nb couleurs
		var maCouleur:Array = new Array();
		var couleurNombre:Number=Math.ceil(nb*Math.pow(16,3)+Math.ceil((Math.random()*5+10))*Math.pow(16,5)+nb*Math.pow(16,4)+Math.ceil((Math.random()*5+10))*Math.pow(16,2)+Math.ceil((Math.random()*5+10))*Math.pow(16,1)+Math.ceil((Math.random()*5+10)));
		for (var i:Number = 0; i < 10; i++) {
			trace(["graduation Cent" + i])
			trace(tailleGraduation)
			////////////////////////////////////////////////ICI ON REALISE LE DEGRADE LE 5 ET LE 3 DONNE L'ENDROIT OÙ ON MODIFIE LA COULEUR//////////////////////////////////////
			maCouleur[i]=couleurNombre-Math.pow(16,5)*i-Math.pow(16,1)*i-Math.pow(16, 3);

			//On a fait un tableau dans init qui attribue la couleur à chaque case.
			//setCouleurFond (maCouleur[i], 50);
			
			//On crée un clip sur lequel on peut passer mais qui sert juste pour le onRollOver mais présent en permanence
			conteneur.angleMcGraduation100.createEmptyMovieClip("graduationCent" + i, 300 + i);
			conteneur.angleMcGraduation100["graduationCent" + i].moveTo (posX, posY);
			conteneur.angleMcGraduation100["graduationCent" + i].beginFill(maCouleur[i], 0);
			conteneur.angleMcGraduation100["graduationCent"+i].beginFill(0x000000, 0);
			conteneur.angleMcGraduation100["graduationCent" + i].lineTo (posX+(taille * 1+ tailleGraduation) * Math.cos(2 * Math.PI * i / nb - Math.PI / 2), posY+(taille * 1+ tailleGraduation) * Math.sin(2 * Math.PI * i / nb - Math.PI / 2));
			conteneur.angleMcGraduation100["graduationCent" + i].lineTo (posX+(taille * 1+ tailleGraduation) * Math.cos(2 * Math.PI * (i + 1) / nb - Math.PI / 2),posY+ (taille * 1 + tailleGraduation) * Math.sin(2 * Math.PI * (i + 1) / nb - Math.PI / 2));
			conteneur.angleMcGraduation100["graduationCent" + i].lineTo (posX, posY);
			conteneur.angleMcGraduation100["graduationCent" + i].endFill;
			
			conteneur.angleMcGraduation100["graduationCent" + i].createTextField("nbCentieme", 0, posX-15+taille* 1.3* Math.cos(2 * Math.PI * (i + 0.5) / nb - Math.PI / 2), posY-10+taille * 1.3  * Math.sin(2 * Math.PI * (i + 0.5) / nb - Math.PI / 2), 35, 20);
			conteneur.angleMcGraduation100["graduationCent" + i].nbCentieme.setNewTextFormat(formatValeurH);
			if (i + 1 < 10) {
				conteneur.angleMcGraduation100["graduationCent" + i].nbCentieme.text = "0,0" + (i + 1) + "h";
			}else {
				conteneur.angleMcGraduation100["graduationCent" + i].nbCentieme.text =  "0,1h";
			}
			//On crée un clip "remplissage" de couleur qui s'affiche porsqu'on passe du le clip "graduationCent".
			conteneur.angleMcGraduation100["graduationCent" + i].createEmptyMovieClip("remplissage",1);
			conteneur.angleMcGraduation100["graduationCent" + i].remplissage.lineStyle(epaisseur, maCouleur[i]);
			conteneur.angleMcGraduation100["graduationCent" + i].remplissage.moveTo (posX, posY);
			//conteneur.angleMc0["graduationCent" + i].remplissage.beginFill(maCouleur[i], 100);
			//on fair un remplissage par traits successifs pour éviter un polygone
			for (var k = 1; k <= 6; k++) {
				conteneur.angleMcGraduation100["graduationCent" + i].remplissage.lineTo (posX+(taille * 1 + tailleGraduation) * Math.cos(2 * Math.PI * i / nb - Math.PI / 2 +2 * Math.PI * k / 600), posY+(taille * 1 + tailleGraduation) * Math.sin(2 * Math.PI * i / nb - Math.PI / 2 +2 * Math.PI * k / 600));
				conteneur.angleMcGraduation100["graduationCent" + i].remplissage.lineTo (posX, posY);
			}
			
			conteneur.angleMcGraduation100["graduationCent" + i].remplissage._alpha = 40;
			conteneur.angleMcGraduation100["graduationCent" + i].remplissage._visible = false;
			conteneur.angleMcGraduation100["graduationCent" + i].nbCentieme._visible = false;
			
			conteneur.angleMcGraduation100["graduationCent" + i].onRollOver = function() {
				//trace("onRollOver 100" + this)
				//trace("onRollOver" + conteneur.angleMc0["graduation" + k])
				//On teste où on est
				for (var k = 0; k <= nb; k++) {
					if (this == o.conteneur.angleMcGraduation100["graduationCent" + k]) {
						//trace("On est sur le "+o.conteneur.angleMc0["graduation" + k])
						o.nbDeCentiemes = k;
						//o.conteneur.angleMc0["graduationCent" + k].remplissage._visible = true;
						o.conteneur.angleMcGraduation100["graduationCent" + k].nbCentieme._visible = true;
						for (var j:Number = 0; j <= o.nbDeCentiemes; j++) {
					
							o.conteneur.angleMcGraduation100["graduationCent" + j].remplissage._visible = true;
							//o.conteneur.angleMc0["graduationCent" + j].nbCentieme._visible = true;
						}
					}
					
				}
				
				
			}
			conteneur.angleMcGraduation100["graduationCent" + i].onRollOut = function() {
				//trace("onRollOut"+this)
				for (var j:Number = 0; j <nb; j++) {
					o.conteneur.angleMcGraduation100["graduationCent" + j].remplissage._visible = false;
					o.conteneur.angleMcGraduation100["graduationCent" + j].nbCentieme._visible = false;
				}
				o.nbDeCentiemes = -1;
			}
		}
	}
	function setCentiemes(nbTot, nb) {
		
		for (var j:Number = 0; j < nbTot; j++) {
			
			if(j<nb){
				conteneur.angleMcGraduation100["graduationCent" + j].remplissage._visible = true;
				conteneur.angleMcGraduation100["graduationCent" + j].nbCentieme._visible = false;
			}else {
				conteneur.angleMcGraduation100["graduationCent" + j].remplissage._visible = false;
				conteneur.angleMcGraduation100["graduationCent" + j].nbCentieme._visible = false;
			}
			if(j==nb-1){
				conteneur.angleMcGraduation100["graduationCent" + j].nbCentieme._visible = true;
			}
		}
		
	}
	function visibilite(etat) {
		conteneur._visible = etat;
		conteneur._visible = etat;
		conteneur._visible = etat;
		//trace("visibilite 100");
	}
	function deplacementMontre(monX, monY, taille) {
		setTailleMontre(taille);
		/*
		conteneur.angleMc0._x = monX;
		conteneur.angleMcM._x = monX;
		conteneur.angleMcH._x = monX;
		conteneur.angleMc0._y = monY;
		conteneur.angleMcM._y = monY;
		conteneur.angleMcH._y = monY;
		*/
		conteneur._x = monX;
		conteneur._y = monY;
	}
	function premiereBranche(maTaille:Number, depX:Number, depY:Number, angleParRapportHorizontal:Number, epaisseur:Number, couleur):Array {//Dessine la branche puis retourne les coordonnées du départ du cercle
		//On adapte la taille à la taille de l'aiguille (moitié du diamètre)
		maTaille = maTaille / 2;
		var coordPt:Array = new Array();
		var angleParRapportHorizontalRad:Number = degRad(angleParRapportHorizontal);
		//On détermine la longueur des branchespar rapport à la taille de la scène tailleScene[0]xtailleScene[1]
		//Par rapport au sommet de l'angle, on détermine les angles jusqu'au coins de la scène

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
//trace("deuxieme branche")
		conteneur.angleMcH.createEmptyMovieClip("branche2", 2);
		conteneur.angleMcH.branche2.lineStyle(epaisseur, couleur);
		conteneur.angleMcH.branche2.moveTo (depX - maTaille*1/10 * Math.cos(angleParRapportHorizontalRad), depY + maTaille*1/10 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.beginFill(couleur, 100);
		conteneur.angleMcH.branche2.lineTo (depX + maTaille*1/10 * Math.sin(angleParRapportHorizontalRad), depY + maTaille*1/10 * Math.cos(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.lineTo (depX + maTaille*2/3 * Math.cos(angleParRapportHorizontalRad), depY - maTaille*2/3 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.lineTo (depX - maTaille*1/10 * Math.sin(angleParRapportHorizontalRad), depY - maTaille*1/10 * Math.cos(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.lineTo (depX - maTaille*1/10 * Math.cos(angleParRapportHorizontalRad), depY + maTaille*1/10 * Math.sin(angleParRapportHorizontalRad));
		conteneur.angleMcH.branche2.endFill;
		coordPt[0] = posX + maTaille*2/3 * Math.cos(angleParRapportHorizontalRad);
		coordPt[1] = posY + maTaille*2/3 * Math.sin(angleParRapportHorizontalRad);
		//coordPt[2] = longueur;
		coordPt[3] = Math.cos(angleParRapportHorizontalRad);
		coordPt[4] = -Math.sin(angleParRapportHorizontalRad);
		return coordPt;
	}
	
/*	function setTailleMontre(maTaille) {
		trace("set<taille")
		//tailleAiguille = maTaille;
		conteneur._height = maTaille;
		conteneur._width = maTaille / proportion;
		posDep = premiereBranche(maTaille, posX, posY, angleValeurM, 5, 0x00000);//Aiguille des minutes
		posArr = deuxiemeBranche(maTaille, posX, posY, angleValeurH, 5, 0x0ffff);//aiguille des heures
		gradMinutes(maTaille, 0x660000, 2);
		graduationCentiemes(10, 0x660000, 4);
	}*/
	function setPositionMasque(monX, monY) {
		conteneur.masque._x = monX;
		conteneur.masque._y = monY;
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
		conteneur.masque._width = 2 * maTaille;
		trace("proportionMasque"+proportionMasque)
		conteneur.masque._height = 2 * maTaille * proportionMasque;
		posDep = premiereBranche(maTaille, posX, posY, angleValeurM, 5, 0x00000);//Aiguille des minutes
		posArr = deuxiemeBranche(maTaille, posX, posY, angleValeurH, 5, 0x0ffff);//aiguille des heures
		gradMinutes(maTaille, 0x660000, 2);
		graduation(10, 0x660000, 4, maTaille);
		graduationCentiemes(100, 0x000000, 4, maTaille);
	}
	/*function setTailleMontre(maTaille) {
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
	}*/

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
