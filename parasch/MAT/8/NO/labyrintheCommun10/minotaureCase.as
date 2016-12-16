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
class minotaureCase extends MovieClip
 
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
	
	
	
	private var marge:Number; //ecart entre le bord de la scène et la zone occupée par les cases
	private var bord:Boolean;//si il y a un trait qui borde la case
	private var mataille:Number; //taille de la case
	private var active:Boolean = false;//Si la case peut ètre active en fonction du chemin
	private var monFormat:TextFormat;
	private var monEtat:Boolean;
	
	
	
	
	static var compteurX:Number = 0;
	static var compteurY:Number = 0;
	
	//Avec clicable: si on clic sur la dernière case séléctionnée, on peut lui changer d'état. si on clique sur une case séléctionnée précédente on ne peut pas lui changer d'état
	

	function minotaureCase(taille, positionX, positionY, margeGrille, bordure, clipConteneur, formatTemp)
	{
		monFormat = formatTemp;
		mataille = taille;
		posX = positionX;
		posY = positionY;
		marge = margeGrille;
		bord = bordure;
		conteneur = clipConteneur;
		dessine(posX, posY);
		setTextH(posX, monFormat);
		setTextB(posY, monFormat);
		
	}
	function dessine(coordX, coordY)
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
		
	}
	function setCouleurFond (couleur, cAlpha,coordX, coordY)
	{
		couleurFond = couleur;
		couleurAlpha = cAlpha;
		dessine(coordX, coordY);
		setTextH(posX, monFormat);
		setTextB(posY, monFormat);
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
		val1 = conteneur.carre.createTextField("valHaut", 10, 5 , 5, mataille-10, 20);
		val1.setNewTextFormat(leFormat);
		val1.selectable = false;
		val1.text = textH;
		
	}
	
	function setTextB (textB, leFormat)
	{

		val2 = conteneur.carre.createTextField("valBas", 11, 5 , mataille-35, mataille-10, 20);
		val2.setNewTextFormat(leFormat);
		val2.selectable = false;
		val2.text = textB;
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
		var o = this;
		conteneur.carre.onRelease = function()
		{
			o.setCouleurTrait (0xff0000, 5);
			o.setCouleurFond (0x00ff00, 40);
		}
	}
	function couleurComplementaire(imageTemp) //on change de couleur
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
	
	function retourCoordonneeCaseClasse ()
	{
		var monTableau:Array = new Array(2);
		monTableau[0] = posX;
		monTableau[1] = posY;
		return monTableau;
	}
	/*function comportementInverse(coordX, coordY)
	 * ////////////////Exemple pour o=this//////////////////////////////////////////////////////////////////////
	{
		var o = this;
		var ecouteur:Object = new Object();
		ecouteur.image = conteneur.carre;
	
			
		ecouteur.image.onRollOver = function() {
			if (o.selectionnable == true)
			{
				o.couleurComplementaire(ecouteur.image);
			}
			
		}
		
		ecouteur.image.onRollOut = function() {
			if (o.active == false)
			{
				o.couleurComplementaireB(ecouteur.image);
			}
		}
		
		ecouteur.image.onRelease = function() {
			if(o.active == true)
			{
				o.couleurComplementaireB(ecouteur.image);
				o.active = false;
				o.coordonnees[0] = 0;
				o.coordonnees[1] = 0;
				o.coordonneeX.text = coordX;
				o.coordonneeY.text = coordY;
			}else if( o.selectionnable == true)
			{
				o.couleurComplementaire(ecouteur.image);
				o.active = true;
				o.coordonnees[0] = coordX;
				o.coordonnees[1] = coordY;
				o.coordonneeX.text = coordX;
				o.coordonneeY.text = coordY;
			}
			o.retourCoordonneeCaseClasse();
		}

		
		Mouse.add_level0.listener(ecouteur);
	}*/
}