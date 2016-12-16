/**
 * ...
 * @author J-M.Luthi
 */
import TextField;

class menuDer 
{
	public var liste:Array;//Contient les éléments de la liste déroulante
	public var conteneur:MovieClip;//clip conteneur
	public var format:TextFormat;//Format du texte dans le menu
	public var monRetour:String;//valeur renvoyée par la case cliquée du menu (texte)
	public var posDansMenu:Number;//valeur renvoyée par la case cliquée du menu Numéro de la case
	public var maLargeur:Number;//Largeur du menu
	public var maHauteur:Number;//Hauteur du menu
	public var maCase0:String;//contenu de la case0 
	public var couleurFd:Color;//Donne la couleur du fond
	public var couleurBrd:Color;//Donne la couleur du bord
	public var selectionne:Boolean;//Indique si on selectionné quelque chose
	
	function menuDer(listeTemp, case0Temp, clipTemp, fmtTemp, couleurFdTemp, couleurBrdTemp) {
		liste = new Array();
		liste = listeTemp;
		
		format = fmtTemp;
		conteneur = clipTemp;
		maLargeur = 0.7 * format.size * largeurMenu(liste);
		maHauteur = format.size * 1.4;
		couleurFd = couleurFdTemp;
		couleurBrd = couleurBrdTemp;
		selectionne = false;
		maCase0 = case0Temp;
		monRetour = maCase0;
		dessineLeClip(couleurFd, couleurBrd, 1, maLargeur, maHauteur );
		trace(conteneur.derouler._width)
	}
	
	function dessineLeClip(couleurFond, couleurBord, epaisseurBord:Number, largeur:Number, hauteur:Number) {
		var o = this;
		trace("dessine" + liste.length)
		//On dessine le bouton pour dérouler
		conteneur.createEmptyMovieClip("derouler", 100);
		conteneur.derouler.lineStyle(epaisseurBord, couleurBord);
		conteneur.derouler.moveTo (largeur, 0);
		conteneur.derouler.beginFill(couleurFond);
		conteneur.derouler.lineTo(largeur + hauteur, 0);
		conteneur.derouler.lineTo(largeur + hauteur, hauteur);
		conteneur.derouler.lineTo(largeur , hauteur);
		conteneur.derouler.lineTo(largeur, 0);
		conteneur.derouler.endFill;
		//On fait le triangle
		conteneur.derouler.moveTo(largeur + hauteur / 3, hauteur / 3);
		conteneur.derouler.beginFill(couleurBord);
		conteneur.derouler.lineTo (largeur + 2 * hauteur / 3, hauteur / 3);
		conteneur.derouler.lineTo (largeur + hauteur / 2, 3 * hauteur / 4);
		conteneur.derouler.lineTo (largeur + hauteur / 3, hauteur / 3);
		conteneur.derouler.endFill;
		conteneur.derouler._visible = true;
		
		//On dessine le bouton pour enrouler
		conteneur.createEmptyMovieClip("enrouler", 101);
		conteneur.enrouler.lineStyle(epaisseurBord, couleurBord);
		conteneur.enrouler.moveTo (largeur, 0);
		conteneur.enrouler.beginFill(couleurFond);
		conteneur.enrouler.lineTo(largeur + hauteur, 0);
		conteneur.enrouler.lineTo(largeur + hauteur, hauteur);
		conteneur.enrouler.lineTo(largeur , hauteur);
		conteneur.enrouler.lineTo(largeur, 0);
		conteneur.enrouler.endFill;
		//On fait le triangle
		conteneur.enrouler.moveTo(largeur + hauteur / 3, 2 * hauteur / 3);
		conteneur.enrouler.beginFill(couleurBord);
		conteneur.enrouler.lineTo (largeur + hauteur / 2, hauteur / 4);
		conteneur.enrouler.lineTo (largeur + 2*hauteur / 3, 2*hauteur / 3);
		conteneur.enrouler.lineTo (largeur + hauteur / 3, 2*hauteur / 3);
		conteneur.enrouler.endFill;
		conteneur.enrouler._visible = false;
		
		conteneur.createEmptyMovieClip("case0" ,0);
		conteneur.case0._x=0
		conteneur.case0._y = i * hauteur;
		conteneur.case0._visible = true;
		conteneur.case0.createTextField("valeurTxt", 0, 0, 0, largeur, hauteur);
		conteneur.case0.valeurTxt.selectable = false;
		conteneur.case0.valeurTxt.border=true;
		conteneur.case0.valeurTxt.borderColor = couleurBord;
		conteneur.case0.valeurTxt.background = true;
		conteneur.case0.valeurTxt.backgroundColor = couleurFond;
		conteneur.case0.valeurTxt.setNewTextFormat(format);
		conteneur.case0.valeurTxt.text = maCase0;
		trace("maCase0 debut"+maCase0)

		
		for (var i:Number = 1; i <= liste.length; i++ ) {
			trace("i: " + i)
			var numero:Number = i;
			conteneur.createEmptyMovieClip("case" + i, i);
			conteneur["case" + i]._x=0
			conteneur["case" + i]._y = (i-1) * hauteur;
			conteneur["case" + i]._visible = false;
			conteneur["case" + i].createTextField("valeurTxt", 0, 0, 0, largeur, hauteur);
			conteneur["case" + i].valeurTxt.selectable = false;
			conteneur["case" + i].valeurTxt.border=true;
			conteneur["case" + i].valeurTxt.borderColor = couleurBord;
			conteneur["case" + i].valeurTxt.background = true;
			conteneur["case" + i].valeurTxt.backgroundColor = couleurFond;
			conteneur["case" + i].valeurTxt.setNewTextFormat(format);
			conteneur["case" + i].valeurTxt.text = liste[i - 1];
			
			conteneur["case" + i].onRollOver = function() {
				this.valeurTxt.backgroundColor = 0x0000ff;
			}
			conteneur["case" + i].onRollOut = function() {
				this.valeurTxt.backgroundColor = couleurFond;
			}
			conteneur["case" + i].onRelease = function() {
				o.monRetour = this.valeurTxt.text;
				for (var k = 0; k <= o.liste.length; k++) {
					if (o.liste[k] == o.monRetour) {
						o.posDansMenu = k+1;
					}
					
				}
				o.conteneur.case0._visible = true;
				o.conteneur.case0.valeurTxt.text = o.monRetour;
				o.selectionne = true;
				//on enroule le menu
				for (var j:Number = 1; j <= o.liste.length; j++ ) {
					o.conteneur["case" + j]._visible = false;
					o.conteneur.derouler._visible = true;
					o.conteneur.enrouler._visible = false;
				}
			}
		}
		
		
			
		conteneur.derouler.onRelease = function() {
			o.selectionne = false;
			//on enroule le menu
			for (var j:Number = 1; j <= o.liste.length; j++ ) {
				o.conteneur["case" + j]._visible = true;
				o.conteneur["case" + j].enabled = true;
			}
			o.conteneur.derouler._visible = false;
			o.conteneur.enrouler._visible = true;
		}
		conteneur.enrouler.onRelease = function() {
			//on enroule le menu
			for (var j:Number = 1; j <= o.liste.length; j++ ) {
				o.conteneur["case" + j]._visible = false;
				o.conteneur["case" + j].enabled = false;
			}
			o.conteneur.derouler._visible = true;
			o.conteneur.enrouler._visible = false;
		}
	}
	function largeurMenu(monArray:Array):Number {
		var retour:Number=0;
		for (var i:Number = 0; i < monArray.length; i++) {
			var maString:String = monArray[i].toString();
			trace("retour: "+maString)
			if (retour < maString.length) {
				retour = maString.length;
			}
			
		}
		trace("retour final"+retour)
		return retour;
	}
	function setPosition(x, y) {
		conteneur._x = x;
		conteneur._y = y;
	}
	function setValeur(valeur:String):Void {
		conteneur.case0.valeurTxt.text = valeur;
		monRetour = valeur;
	}
	
}