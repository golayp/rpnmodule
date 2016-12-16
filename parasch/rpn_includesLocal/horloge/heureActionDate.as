/**
 * ...
 * @author J-M.Luthi
 */

var positionS:Array = new Array();
// Création d'un objet écouteur de souris.
var mouseListener:Object = new Object();
var maDestination1:String = monMenu1.monRetour;
var maDestination2:String = monMenu1.monRetour;
// Lorsque le curseur de la souris se déplace dans le fichier SWF, 
//on teste si la souris repasse sur les clips unités invisibles.
mouseListener.onMouseMove = function() {
	//trace("posSouris, _xmouse"+_xmouse)
		positionS[0] = _xmouse;
		positionS[1] = _ymouse;
		maMontre.comportement(posCentre[0], posCentre[1], positionS);
		_level0.retour = maMontre.message;

}

Mouse.addListener(mouseListener);

