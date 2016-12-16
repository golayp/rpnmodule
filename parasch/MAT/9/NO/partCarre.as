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
class partCarre extends MovieClip
 
{
	public var posX:Number; //Position X en coordonnée entière par rapport au tableau (pas en pixels)
	public var posY:Number; //Position Y en coordonnée entière par rapport au tableau (pas en pixels)
	public var couleurFond:Number=0xff0000; //couleur du fond de la case à l'origine
	public var couleurBord:Number=0x00ff00; //couleur du bord de la case
	public var couleurAlpha:Number=10; //alpha de la case
	public var epaisseurTrait:Number = 1; //epaisseur du bord de la case (trait)
	public var conteneur:MovieClip; //clip contenant la case
	public var coordonnees:Array=new Array(); //tableau qui contiendra les coordonnée des cases pressées
	public var valG:TextField; //texte Gauche
	public var valD:TextField; //texte Droite
	public var changeCouleurFond:Boolean=false;
	public var monFormatG:TextFormat;
	public var monFormatD:TextFormat;
	
	
	private var marge:Number; //ecart entre le bord de la scène et la zone occupée par les cases
	private var bord:Boolean=false;//si il y a un trait qui borde la case
	private var maLargeur:Number; //largeur de la case
	private var maHauteur:Number; //hauteur de la case
	private var R:Number;
	private var V:Number;
	private var B:Number;
	
	
	
	
	static var compteurX:Number = 0;
	static var compteurY:Number = 0;
	
	//Avec clicable: si on clic sur la dernière case séléctionnée, on peut lui changer d'état. si on clique sur une case séléctionnée précédente on ne peut pas lui changer d'état
	

	function partCarre(largeurTemp, hauteurTemp, positionX, positionY, clipConteneur, formatGTemp, formatDTemp)
	{
		monFormatG = formatGTemp;
		monFormatD = formatDTemp;
		maLargeur = largeurTemp;
		maHauteur = hauteurTemp;
		posX = positionX;
		posY = positionY;
		conteneur = clipConteneur;
		
		dessine();
		
		
	}
	function dessine()
	{
		conteneur.createEmptyMovieClip("carre", 1);
		if (bord == true)
		{
			conteneur.carre.lineStyle(epaisseurTrait, couleurBord);	
		}else
		{
			conteneur.carre.lineStyle(0, 0x000000);		
		}
		conteneur.carre.beginFill(couleurFond, couleurAlpha);
		conteneur.carre.lineTo(maLargeur, 0);
		conteneur.carre.lineTo(maLargeur, maHauteur);
		conteneur.carre.lineTo(0, maHauteur);
		conteneur.carre.lineTo(0, 0);
		conteneur.carre.endFill;
		conteneur.carre._x = maLargeur * (posX-1);//posX-1 pour commencer à(0;0)
		conteneur.carre._y = maHauteur * (posY);
	}
	function setCouleurFond (couleur, cAlpha,coordX, coordY)
	{
		couleurFond = couleur;
		couleurAlpha = cAlpha;
		dessine(coordX, coordY);
		setTextG(posX, monFormatG);
		setTextD(posY, monFormatD);
	}
	function setCouleurTrait (couleur, epaisseur, coordX, coordY)
	{
		couleurBord = couleur;
		epaisseurTrait = epaisseur;
		dessine(coordX, coordY);
		setTextG(posX, monFormatG);
		setTextD(posY, monFormatD);
	}
	
	function visibilite(visi) {
		if (visi == true) {
			conteneur.carre._visible = true;
		}else if (visi == false) {
			conteneur.carre._visible = false;
		}
	}
	
	function setTextG (textG, leFormat)
	{
		conteneur.carre.createTextField("valG", 10, 5 , maHauteur-20, 15, 15);
		conteneur.carre.valG.setNewTextFormat(leFormat);
		conteneur.carre.valG.selectable = false;
		conteneur.carre.valG.text = textG;
	}
	function setTextD (textD, leFormat)
	{
		trace("setTextD")
		conteneur.carre.createTextField("valD", 11, maLargeur-20 , maHauteur-20, 15, 15);
		conteneur.carre.valD.setNewTextFormat(leFormat);
		conteneur.carre.valD.selectable = false;
		conteneur.carre.valD.text = textD;
	}
	function getTextG():String
	{
		return valG.text;
	}
	function getTextD():String
	{
		return valD.text;
	}

/*function couleurComplementaire(imageTemp) //on change de couleur
	{
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
		var b = new Array();
		
		b = b.concat([1, 0, 0, 0, 0]);
		b = b.concat([0, 1, 0, 0, 0]);
		b = b.concat([0, 0, 1, 0, 0]);
		b = b.concat([0, 0, 0, 1, 0]);
		 
		var filtre:BitmapFilter = new ColorMatrixFilter(b);
		monImageB.filters = [filtre];
		
	}
*/	
	function retourCoordonneeCaseClasse ()
	{
		var monTableau:Array = new Array(2);
		monTableau[0] = posX;
		monTableau[1] = posY;
		return monTableau;
	}
}