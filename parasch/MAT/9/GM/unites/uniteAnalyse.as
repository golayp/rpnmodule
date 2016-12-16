/**
 * ...
 * @author J-M.Luthi
 */

function analyse(valeur1, valeur2):Boolean
{
	var resultat:Boolean;

	if (valeur1 == valeur2) {
		resultat = true;
		delete fondMc.onEnterFrame;
	}else {
		_level0.retour = "Il faut recommencer tant qu'il y a des erreurs";
		resultat = false;
	}
	return resultat;
}

function arrondi(nb,nbDeDecimales):Number {
	var nombre:Number;
	nombre = Math.round(nb * Math.pow(10, nbDeDecimales)) / Math.pow(10, nbDeDecimales);
	return nombre;
}

function troncage(nb,nbDeDecimales):Number {
	var nombre:Number;
	nombre = Math.floor(nb * Math.pow(10, nbDeDecimales)) / Math.pow(10, nbDeDecimales);
	return nombre;
}
function transformerEnUniteBase(nb:Number, coef:Number, dim:Number):Number {
	var resultat:Number;

	resultat = nb * Math.pow(coef, dim);

	return resultat;
}
