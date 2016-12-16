/**
 * ...
 * @author J-M.Luthi
 */
trace("etst ini")
import angle;
//On crée un fond
this.createEmptyMovieClip("fondMc", 1);
//Sur le fond, on met un clip qui contiendra l'angle
fondMc.createEmptyMovieClip("angleMc", 1)
var posCentre:Array = new Array();
posCentre[0] = 200;
posCentre[1] = 200;



var typeAngles:Array = new Array("vide", "plein", "aigu", "droit", "obtus", "non convexe", "plat");
var anglesMelanges:Array = new Array();
//On fait une fonction qui mélange un tableau:
function tirageAleatoire(monArray):Array {
	var retour:Array = new Array();
	var temp:Number = monArray.length;
	for (te = 0; te < temp; te++) {
			var elementSupprime:Number = Math.floor(monArray.length * Math.random());
			retour[te] = monArray[elementSupprime];
			monArray.splice(elementSupprime, 1);
	}
	return retour;
}
//fonction qui va retourner les angles pas encore pris
function anglesRestants(arrayComplet:Array,arrayAExtraire:Array):Array{
	var retour:Array = new Array();
	for (i=0;i<arrayComplet.length;i++){
		var present:Boolean=false;
		for (j=0;j<arrayAExtraire.length;j++){
			if(arrayAExtraire[j]==arrayComplet[i]){
				present=true;
			}
		}
		if(present==false){
			retour.push(arrayComplet[i]);
		}
		
	}
	return retour;
}
//var test:Array=new Array("plein", "obtus", "aigu", "vide");
//trace("anglesRestants: "+anglesRestants(typeAngles, test))


//trace("typeAngles"+typeAngles)
anglesMelanges = tirageAleatoire(typeAngles);
//trace("anglesMelanges: "+anglesMelanges)
if(_global.tirage.length < anglesMelanges.length){ 
	_level0.monTypeAngle;
	var mesAnglesRestants:Array = new Array();
	mesAnglesRestants=anglesRestants(anglesMelanges,_global.tirage);
	_level0.monTypeAngle=mesAnglesRestants[Math.floor(Math.random() * mesAnglesRestants.length)];
	//On place le type d'angle dans le tableau de paraschool pour éviter les répetitions dans les modules.
	_global.tirage.push(monTypeAngle);
}else{
	_global.tirage=new Array();
	_level0.monTypeAngle=anglesMelanges[Math.floor(Math.random() * anglesMelanges.length)];
	_global.tirage.push(monTypeAngle);
}
trace("monTypeAngle=anglesMelanges[Math.floor(Math.random() * anglesMelanges.length)]"+_level0.monTypeAngle)

trace("monTypeAngle"+_level0.monTypeAngle)

trace("tirage"+_global.tirage)
var monAngle:MovieClip = new angle(posCentre[0], posCentre[1], fondMc.angleMc, texteValeurAngle_fmt, _level0.monTypeAngle, [450, 360]);

fondMc.createEmptyMovieClip("fondTextMc", 2);
fondMc.fondTextMc.createTextField("typeAngleTxt", 1, posCentre[0]+250, posCentre[1]-170, 200, 100);
fondMc.fondTextMc.typeAngleTxt.selectable = false;
fondMc.fondTextMc.typeAngleTxt.background = false;
fondMc.fondTextMc.typeAngleTxt.multiline = true;
fondMc.fondTextMc.typeAngleTxt.wordWrap = true;
fondMc.fondTextMc.typeAngleTxt.backgroundcolor = 0xff9999;
fondMc.fondTextMc.typeAngleTxt.setNewTextFormat(texteDonnee_fmt);
//monAngle.typeAngle = anglesMelanges[Math.floor(Math.random() * anglesMelanges.length)];
fondMc.fondTextMc.typeAngleTxt.text = "Un angle "+monAngle.typeAngle;

//fondMc.createEmptyMovieClip("fondTextTestMc", 3);
fondMc.fondTextTestMc.createTextField("typeAngleTxt", 1, posCentre[0] + 280, posCentre[1] - 150, 170, 35);
fondMc.fondTextTestMc.typeAngleTxt.text = _global.tirage;

this.onEnterFrame = function() {
	//CLIC sur bouton SOLUTION
	
	//ON met dans rep_juste le résultat de l'analyse'
	_level0.rep_juste = monAngle.reponse;
	_level0.retour = monAngle.message;
	//fondMc.fondTextTestMc.typeAngleTxt.text = "_ymouse"+_ymouse;
	trace("monAngle.reponse: " + _level0.rep_juste);
	trace("monAngle.message: " + _level0.retour);
	trace("This: " + this);
}

stop();