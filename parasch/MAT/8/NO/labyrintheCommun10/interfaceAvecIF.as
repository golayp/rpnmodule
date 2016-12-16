/**
 * ...
 * @author M.Roquier
 */

//Interface avec IF de Paraschool
/*//on Réalise un tableau avec des valeurs
//var tableauPassageVariables:Array =new Array (15, true, "test Shared Object true");
var reponseJustePassage:Boolean=true;
var monRetourPassage:String="test SharedObject initialisation true";
//On fabrique un objet SharedObject
var passage:SharedObject = SharedObject.getLocal("monPassage", "/");
//Si il existait déjà on le vide
passage.clear();
//On introduit le tableau dans l'objet partagé passage
//passage.data.valeursPassage=tableauPassageVariables;
passage.data.reponsePassage=reponseJustePassage;
passage.data.retourPassage=monRetourPassage;

//on crée un champ text juste pour voir si le Shared est créé
this.createTextField("passage1Txt",10000,10,0,300,30);
passage1Txt.multiline=true;
passage1Txt.text="essai";

//On sauvegarde en local
passage.flush();


//on lit ce qu'on a écrit
for(var prop in passage.data)
{
passage1Txt.text=passage1Txt.text+prop+" interfaceIF: "+passage.data[prop];
}
*/

// INITIALISATION de l'indicateur "Bouton Solution pressé" 
solution=false;
verifierTxt._y = 200;
verifierTxt._height = 150;
// Activation de l'écoute d'action "Boutons VALIDER ou SOLUTION de Paraschool pressés"
this.onEnterFrame = function() {
	
	//CLIC sur bouton SOLUTION
	if (_level0.scriptvar.sol == true)
	{
		solution = true;
		_global.repJuste = false;
		_level0.scriptvar.reponseJuste = false;
		//Action liée à l'Affichage de la solution
		actionSolution ();
		verifierTxt._visible=true;
		verifierTxt.text = "Voici le contenu de validation: " + _level0.scriptvar.validation + "\nEt de monRetour: " + _level0.scriptvar.monRetour;;
		// Désactivation de l'écoute d'action
		delete onEnterFrame;
	}
	//CLIC sur bouton VALIDER et réponse JUSTE
	else if (_level0.scriptvar.validation == true && _global.rep_juste == true)
	{
		_level0.scriptvar.reponseJuste=_global.rep_juste;
		_level0.scriptvar.monRetour=_level0.retour;
		// Action liée à la réponse juste
		actionRepJuste();
		
		// Réinitialisation "Bouton VALIDER de l'IF non pressé"
		_level0.scriptvar.validation = false;
		_level0.scriptvar.sol = true;
		verifierTxt.text = "Voici le contenu de validation: " + _level0.scriptvar.validation + "\nEt de monRetour: " + _level0.scriptvar.monRetour+ "\nEt de sol: " + _level0.scriptvar.sol;
	}
	//CLIC sur bouton VALIDER et réponse FAUSSE
	else if (_level0.scriptvar.validation == true && _global.rep_juste == false)
	{
		// Action liée à l'erreur
		actionRepFausse();
		
		// Réinitialisation "Bouton VALIDER de l'IF non pressé"
		//_global.scriptvar.validation = false;
		_level0.scriptvar.validation = true;
		_level0.scriptvar.sol = true;
		verifierTxt.text = "Voici le contenu de validation: " + _level0.scriptvar.validation + "\nEt de monRetour: " + _level0.scriptvar.monRetour+ "\nEt de sol: " + _level0.scriptvar.sol;
	}
else if (_level0.scriptvar.validation == true){
		verifierTxt._visible=true;
		verifierTxt.text ="On a juste pressé le bouton valider";
	}
	// Réinitialisation "Bouton VALIDER de l'IF non pressé"
	//_global.scriptvar.validation = false;
	_level0.scriptvar.validation = false;
	verifierTxt.text = "Voici le contenu de validation: " + _level0.scriptvar.validation + "\nEt de monRetour: " + _level0.scriptvar.monRetour+ "\nEt de sol: " + _level0.scriptvar.sol;
};
stop();