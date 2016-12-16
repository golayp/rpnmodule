/**
 * ...
 * @author J-M.Luthi
 */

var positionS:Array = new Array();
// Création d'un objet écouteur de souris.
//var mouseListener:Object = new Object();
//trace("posSouris");
// Lorsque le curseur de la souris se déplace dans le fichier SWF, 
//on teste si la souris repasse sur les clips unités invisibles.
//mouseListener.onMouseMove = function() {
fondMc.onEnterFrame=function(){
	//trace("posSouris, _xmouse"+_xmouse)
		positionS[0] = _xmouse;
		positionS[1] = _ymouse;
		maMontre.continu();
		//trace("positionS"+positionS)
}

//Mouse.addListener(mouseListener);
//var maMontre:MovieClip = new heureDate(posCentre[0], posCentre[1], fondMc.angleMc, texteValeurH_fmt, texteValeurM_fmt, texteValeurTxt_fmt, texteSolution_fmt, dateMontre_fmt, [450, 360]);