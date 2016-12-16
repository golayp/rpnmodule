/**
 * ...
 * @author Jean-Michel Luthi
 */
 
import mx.data.encoders.Num;
import TextField;
import flash.filters.BitmapFilter;
import flash.filters.ColorMatrixFilter;
import flash.display.BitmapData;

///////////////////////avec le systeme var maCase : maCase = new minotaureCase(conteneur) on est obligé de mettre un clip conteneur dans le .fla
class minotaureCase6 extends MovieClip
 
{
	public var posX:Number; //Position X en coordonnée entière par rapport au tableau (pas en pixels)
	public var posY:Number; //Position Y en coordonnée entière par rapport au tableau (pas en pixels)
	public var couleurFond:Number = 0xff33ff; //couleur du fond de la case à l'origine
	public var couleurBord:Number = 0x666666; //couleur du bord de la case
	public var couleurAlpha:Number=100; //alpha de la case
	public var epaisseurTrait:Number = 1; //epaisseur du bord de la case (trait)
	public var conteneur:MovieClip; //clip contenant la case
	public var coordonnees:Array=new Array(); //tableau qui contiendra les coordonnée des cases pressées
	public var presse:Boolean = false;//Si la case à été pressée pour la couleur et le chemin.
	public var val1:TextField; //texte Haut
	public var val2:TextField; //texte Bas
	public var nb1:Number; //1er nombre de l'opération
	public var nb2:Number; //2e nombre de l'opération
	public var commentaireCase:String="C'est juste"; //2e nombre de l'opération
	public var changeCouleurFond:Boolean=false;
	
	
	
	private var marge:Number; //ecart entre le bord de la scène et la zone occupée par les cases
	private var bord:Boolean;//si il y a un trait qui borde la case
	private var mataille:Number; //taille de la case
	private var active:Boolean = false;//Si la case peut ètre active en fonction du chemin
	private var monFormat:TextFormat;
	private var monEtat:Boolean;
	private var R:Number;
	private var V:Number;
	private var B:Number;
	private var affichage:String;
	private var operationUtilisee:String;
	
	
	
	
	static var compteurX:Number = 0;
	static var compteurY:Number = 0;
	
	//Avec clicable: si on clic sur la dernière case séléctionnée, on peut lui changer d'état. si on clique sur une case séléctionnée précédente on ne peut pas lui changer d'état
	

	function minotaureCase6(taille, positionX, positionY, margeGrille, bordure, clipConteneur, formatTemp)
	{
		monFormat = formatTemp;
		mataille = taille;
		posX = positionX;
		posY = positionY;
		marge = margeGrille;
		bord = bordure;
		conteneur = clipConteneur;
		dessine();
		monFormat.color=Number(0x000000);
		setTextH(posX, monFormat);
		setTextB(posY, monFormat);
		
		
	}
	function dessine()
	{
		
		conteneur.createEmptyMovieClip("carre", 1);
		if (bord == true)
		{
			conteneur.carre.lineStyle(epaisseurTrait, couleurBord);	
		}else
		{
			conteneur.carre.lineStyle(0, couleurFond);		
		}
		conteneur.carre.beginFill(couleurFond, couleurAlpha);
		conteneur.carre.lineTo(mataille-2, 0);
		conteneur.carre.lineTo(mataille-2, mataille-2);
		conteneur.carre.lineTo(0, mataille-2);
		conteneur.carre.lineTo(0, 0);
		conteneur.carre.endFill;
		conteneur.carre._x = mataille * (posX-1) + marge;//posX-1 pour commencer à(0;0)
		conteneur.carre._y = mataille * (posY - 1) + marge;
		conteneur.createEmptyMovieClip("tourCaseJuste", 11111);
		conteneur.tourCaseJuste.lineStyle(6, 0x777700);
		conteneur.tourCaseJuste.lineTo(mataille-2, 0);
		conteneur.tourCaseJuste.lineTo(mataille-2, mataille-2);
		conteneur.tourCaseJuste.lineTo(0, mataille-2);
		conteneur.tourCaseJuste.lineTo(0, 0);
		conteneur.tourCaseJuste._x = mataille * (posX-1) + marge;//posX-1 pour commencer à(0;0)
		conteneur.tourCaseJuste._y = mataille * (posY - 1) + marge;
		conteneur.tourCaseJuste._visible=false;
		conteneur.createEmptyMovieClip("tourCaseFaux", 11112);
		conteneur.tourCaseFaux.lineStyle(6, 0xcc0000);
		conteneur.tourCaseFaux.lineTo(mataille-2, 0);
		conteneur.tourCaseFaux.lineTo(mataille-2, mataille-2);
		conteneur.tourCaseFaux.lineTo(0, mataille-2);
		conteneur.tourCaseFaux.lineTo(0, 0);
		conteneur.tourCaseFaux._x = mataille * (posX-1) + marge;//posX-1 pour commencer à(0;0)
		conteneur.tourCaseFaux._y = mataille * (posY - 1) + marge;
		conteneur.tourCaseFaux._visible=false;
		
	}
	function setCouleurFond_old (couleur, cAlpha)
	{
		couleurFond = couleur;
		R=composante(couleurFond)[0];
		V=composante(couleurFond)[1];
		B=composante(couleurFond)[2];
		couleurAlpha = cAlpha;
		dessine();
	}
	function setCouleurTrait_old (couleur, epaisseur, coordX, coordY)
	{
		couleurBord = couleur;
		epaisseurTrait = epaisseur;
		dessine();
	}
	
	
	function setCouleurFond (couleur, cAlpha,coordX, coordY)
	{
		
		couleurFond = couleur;
		couleurAlpha = cAlpha;
		dessine(coordX, coordY);
		setTextH(posX, monFormat);
		setTextB(posY, monFormat);
		//trace ("couleurFond dans minotaureCase6: " + couleurFond)
		trace(active)
	}
	function setCouleurTrait (couleur, epaisseur, coordX, coordY)
	{
		couleurBord = couleur;
		epaisseurTrait = epaisseur;
		dessine(coordX, coordY);
		setTextH(posX, monFormat);
		setTextB(posY, monFormat);
	}
	
	
	
	function setTextH (textH, leFormat)
	{
		//if(changeCouleurFond==true){
//			trace("DANS");
//			if(leFormat.color==Number(0xFFFFFF))
//			{
//				leFormat.color=Number(0x000000);
//			}else if(leFormat.color==Number(0x000000))
//			{
//				leFormat.color=Number(0xFFFFFF);
//			}
//		}
		////On agit sur les composantes des couleurs R( composante(couleurFond)[0]) V ( composante(couleurFond)[1]) B ( composante(couleurFond)[2])
//		if(Math.abs(R-V)<50)
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x000044);
//			//leFormat.color=Number(0xFFFFFF);
//		}else if (Math.abs(R-B)<75)
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x004400);
//		}else if (Math.abs(B-V)<50)
//		{
//			//leFormat.color=Number(0x000000);
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x440000);
//		}else if(Math.abs(R-B)<80 && (V<110 && V>90))
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x666666);
//		}else if(V>130)
//		{
//			//leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x999999);
//			leFormat.color=Number(0xffbbff);
//		}else
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond);
//		}
		//leFormat.color=Number(0xFFFFFF)-Number(couleurFond);
		conteneur.carre.createTextField("val1", 10, 5 , 5, mataille-10, mataille/4+6);
		//conteneur.carre.val1.embedFonts=true;
		conteneur.carre.val1.setNewTextFormat(leFormat);
		conteneur.carre.val1.selectable = false;
		conteneur.carre.val1.text = textH;
	}
	function setTextB (textB, leFormat)
	{
		//trace ("setTextB"+textB);
		//Pour être sur, puisqu'on utilise des tons pastels, on met le texte en noir et si il est survolé en blanc.
		//On agit sur les composantes des couleurs R( composante(couleurFond)[0]) V ( composante(couleurFond)[1]) B ( composante(couleurFond)[2])
//		if(Math.abs(R-V)<50)
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x000044);
//			//leFormat.color=Number(0xFFFFFF);
//		}else if (Math.abs(R-B)<75)
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x004400);
//		}else if (Math.abs(B-V)<50)
//		{
//			//leFormat.color=Number(0x000000);
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x440000);
//		}else if(Math.abs(R-B)<50 && (V<110 && V>90))
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x666666);
//		}else if(V>110)
//		{
//			//leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x999999);
//			leFormat.color=Number(0xffbbff);
//		}else
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond);
//		}
		
		conteneur.carre.createTextField("val2", 11, 5 , mataille*39/64, mataille-10, mataille*3/16+6);
		//conteneur.carre.val2.embedFonts=true;
		conteneur.carre.val2.setNewTextFormat(leFormat);
		conteneur.carre.val2.selectable = false;
		conteneur.carre.val2.text = textB;
		//trace("textB: " +textB );
		if(textB==""||textB=="SORTIE")
		{
			switch (operationUtilisee)
			{
				case ("multiplication"):
					switch (true)
					{
						case (textB=="SORTIE"):
							conteneur.carre.monAffichage._visible=false;
							conteneur.carre.val2.text ="SORTIE"
						break;
						default:
							operationChoisie (operationUtilisee, nb1,nb2, leFormat)
							//On lui met la même couleur que les caractères
							//var mcColor:Color = new Color(conteneur.carre.monAffichage);
							//mcColor.setRGB(leFormat.color);
							conteneur.carre.val2.text = "";
							//trace("conteneur.carre.val2.text" +conteneur.carre.val2.text );
						break;
					}
					//trace("multiplication" +conteneur.carre.val2.text );
				break;
			}
		}
		
	}
	
	function couleurMultiplicationDivision(uneCouleur, clip)
	{
		var mcColor:Color = new Color(clip);
		mcColor.setRGB(uneCouleur);
	}
	
	public function get textH():String
	{
		return val1.text;
	}
	public function get textB():String
	{
		return val2.text;
	}
	
	//C'est une façon de changer la couleur où on redessine le clip (pour l'instant pas utilisé : 16.09.2010)
	function comportement()
	{
		trace("Comportement")
		var o = this;
		conteneur.carre.onRelease = function()
		{
			o.setCouleurTrait (0xff0000, 5);
			o.setCouleurFond (0x00ff00, 40);
		}
	}
	
	function couleurComplementaire_old(imageTemp) //on change de couleur
	{
		setTextH(posX, monFormat);
		setTextB(posY, monFormat);
		
	}
function couleurComplementaire(imageTemp) //on change de couleur
	{
trace("couleurComplementaire" + imageTemp)
trace("active: "+active)
		var monImage=imageTemp;
		var a = new Array();
			
		a = a.concat([-1, 0, 0, 0, 255]);
		a = a.concat([0, -1, 0, 0, 255]);
		a = a.concat([0, 0, -1, 0, 255]);
		a = a.concat([0, 0, 0, 1, 0]);
		 
		var filtre:BitmapFilter = new ColorMatrixFilter(a);
		monImage.filters = [filtre];
	}
	
	function couleurComplementaireB(imageTempB) //On revient à la couleur initiale
	{
		var monImageB = imageTempB;
trace("couleurComplementaireB" + imageTempB)
trace("active: "+active)
		var b = new Array();
		
		b = b.concat([1, 0, 0, 0, 0]);
		b = b.concat([0, 1, 0, 0, 0]);
		b = b.concat([0, 0, 1, 0, 0]);
		b = b.concat([0, 0, 0, 1, 0]);
		 
		var filtre:BitmapFilter = new ColorMatrixFilter(b);
		monImageB.filters = [filtre];
		
	}
	
	function retourCoordonneeCaseClasse ()
	{
		var monTableau:Array = new Array(2);
		monTableau[0] = posX;
		monTableau[1] = posY;
		return monTableau;
	}
	//fonction qui convertit un hexdécimal en décimal, utilisé pour les couleurs, en composantes RVB
	function ecritureDeci (nbHexa)
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
	
	function composante(couleurHexa)
	{
		var RVB:Array=new Array(3)
		couleurHexa=couleurHexa.toUpperCase();
		RVB[2]=ecritureDeci(couleurHexa.substr(7,1))+ecritureDeci(couleurHexa.substr(6,1))*16;
		RVB[1]=ecritureDeci(couleurHexa.substr(5,1))+ecritureDeci(couleurHexa.substr(4,1))*16;
		RVB[0]=ecritureDeci(couleurHexa.substr(3,1))+ecritureDeci(couleurHexa.substr(2,1))*16;
		return RVB;
	}
	function oneText(myText, myTextFmt) {
		trace("myText dans oneText" + myText);
		if(conteneur.carre.val1.text!="ENTREE" || conteneur.carre.val1.text!="SORTIE" ){
			conteneur.carre.val1._visible = false;
			conteneur.carre.val2.setNewTextFormat(myTextFmt)
			conteneur.carre.val2._y = 20;
			conteneur.carre.val2.height = mataille-25;
			conteneur.carre.val2.text = myText;
			trace("val2.text" + conteneur.carre.val2.text);
		}
	}
	function operationChoisie (monOperation, a,b, ceFormat)
	{
		operationUtilisee=monOperation;
		switch (operationUtilisee)
		{
			case ("addition"):
			switch (true)
			{
				case (b<0):
				affichage=a+"+("+b+")";
				break;
				case (b>=0):
				affichage=a+"+"+b;
				break;
			}
			break;
			case ("soustraction"):
			switch (true)
			{
				case (b<0):
				affichage=a+"-("+b+")";
				break;
				case (b>=0):
				affichage=a+"-"+b;
				break;
			}
			break;
			case ("multiplication"):
				conteneur.carre.createEmptyMovieClip("monAffichage", 99);
				conteneur.carre.monAffichage._x=0;
				conteneur.carre.monAffichage._y=35;
				conteneur.carre.monAffichage.createTextField("nbGauche", 1, 0, 0, 25, 20);
				//conteneur.carre.monAffichage.nbGauche.embedFonts=true;
				conteneur.carre.monAffichage.nbGauche.setNewTextFormat(ceFormat);
				conteneur.carre.monAffichage.attachMovie("fois","foisMc",2);
				conteneur.carre.monAffichage.foisMc._xscale=35;
				conteneur.carre.monAffichage.foisMc._yscale=35;
				conteneur.carre.monAffichage.foisMc._x=27;
				conteneur.carre.monAffichage.foisMc._y=8;
				conteneur.carre.monAffichage.createTextField("nbDroite", 3, 28, 0, 30, 20);
				//conteneur.carre.monAffichage.nbDroite.embedFonts=true;
				conteneur.carre.monAffichage.nbDroite.setNewTextFormat(ceFormat);
				
				switch (true)
				{
					case (b<0):
					conteneur.carre.monAffichage.nbGauche.text=a;
					conteneur.carre.monAffichage.nbDroite.text="("+b+")";
					break;
					case (b>=0):
					conteneur.carre.monAffichage.nbGauche.text=a;
					conteneur.carre.monAffichage.nbDroite.text=b;
					break;
				}
			break;
			case ("division"):
				/*conteneur.carre.createEmptyMovieClip("monAffichage", 100);
				conteneur.carre.monAffichage._x=0;
				conteneur.carre.monAffichage._y=25;
				conteneur.carre.monAffichage.createTextField("nbGauche", 4, 0, 0, 35, 20);
				conteneur.carre.monAffichage.nbGauche.setNewTextFormat(ceFormat);
				conteneur.carre.monAffichage.attachMovie("division","divisionMc",5);
				conteneur.carre.monAffichage.divisionMc._xscale=35;
				conteneur.carre.monAffichage.divisionMc._yscale=35;
				conteneur.carre.monAffichage.divisionMc._x=36;
				conteneur.carre.monAffichage.divisionMc._y=8;
				conteneur.carre.monAffichage.createTextField("nbDroite", 6, 37, 0, 35, 20);
				conteneur.carre.monAffichage.nbDroite.setNewTextFormat(ceFormat);
				*/

				
				switch (true)
				{
					case (b<0):
					//conteneur.carre.monAffichage.nbGauche.text=a;
//					conteneur.carre.monAffichage.nbDroite.text="("+b+")";
					affichage=a+" : ("+b+")";
					break;
					case (b>=0):
					//conteneur.carre.monAffichage.nbGauche.text=a;
//					conteneur.carre.monAffichage.nbDroite.text=b;
					affichage=a+" : "+b;
					break;
				}
			break;
			default:
				trace("Cette opération n'existe pas");
			break;
			
		}
		nb1=a;
		nb2 = b;
		trace("affichage: " +affichage );
		if(operationUtilisee!="multiplication"){
			setTextB(affichage, ceFormat);
		}else {
			setTextB("     ", ceFormat);
		}

	}
}