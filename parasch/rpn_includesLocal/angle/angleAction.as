/**
 * ...
 * @author J-M.Luthi
 */

var positionS:Array = new Array();
// Création d'un objet écouteur de souris.
var mouseListener:Object = new Object();
//trace("posSouris");
// Lorsque le curseur de la souris se déplace dans le fichier SWF, 
//on teste si la souris repasse sur les clips unités invisibles.
mouseListener.onMouseMove = function() {
	//trace("posSouris, _xmouse"+_xmouse)
		positionS[0] = _xmouse;
		positionS[1] = _ymouse;
		monAngle.comportement2(posCentre[0], posCentre[1], positionS);
		//trace("positionS"+positionS)
}

Mouse.addListener(mouseListener);

function actionSolution() {
	trace('actionSolution');
	monAngle.actionSolution(_level0.monTypeAngle);
}