/**
 * ...
 * @author JM Luthi
 */

//Interface avec IF de Paraschool



// INITIALISATION de l'indicateur "Bouton Solution pressé" 
solution=false;
verifierTxt._y = 200;
verifierTxt._height = 150;
// Activation de l'écoute d'action "Boutons VALIDER ou SOLUTION de Paraschool pressés"


this.onEnterFrame = function() {

	//CLIC sur bouton VALIDER et réponse JUSTE
	if (_level0.validation == true && _level0.rep_juste == true)
	{
		trace("validation=true, rep_juste=true");
		// Réinitialisation "Bouton VALIDER de l'IF non pressé"
		_level0.validation = false;

	}
	//CLIC sur bouton VALIDER et réponse FAUSSE
	else if (_level0.validation == true && _level0.rep_juste == false)
	{
		// Action liée à l'erreur
		actionRepFausse();
		trace("validation=true, rep_juste=false");
		// Réinitialisation "Bouton VALIDER de l'IF non pressé"
		_level0.validation = false;

	}else if (_level0.sol == true && solution == false && _level0.suiteExercice == false && _level0.etatBulleRouge==false)
	{
		trace("je suis dans sol==true, solution==false et suiteExercice==false");
		trace("_level0.etatBulleRouge"+_level0.etatBulleRouge);
		
		//On cache la bulle de l'interface
		fondBulle.bulleRougeMc._visible = false;
		//On teste
		_level0.cible.fondBulle.bulleRougeMc.fond.texte.text = _level0.retourSolution+"LA bulle rouge de l'interface est visible";
		
		solution = true;
		_level0.repJuste = false;
		_level0.reponseJuste = false;
		//Action liée à l'Affichage de la solution
		//actionSolution ();
		fondMc.verifie_Btn._visible = false;
		verifier();
		// Désactivation de l'écoute d'action
		//delete onEnterFrame;
	
	} else if (_level0.sol == true &&_level0.etatBulleRouge==false) {
		solution = false;
		trace("fernier sol");
		trace("_level0.etatBulleRouge"+_level0.etatBulleRouge);
		
		//On cache la bulle de l'interface
		fondBulle.bulleRougeMc._visible = false;
		//On teste
		_level0.cible.fondBulle.bulleRougeMc.fond.texte.text = _level0.retourSolution+"LA bulle rouge de l'interface est visible";
		_level0.rep_juste = false;
		_level0.validation = false;
		_level0.sol=false;
		_level0.suiteExercice=false;


		solution = true;
		_level0.repJuste = false;
		_level0.reponseJuste = false;
		//Action liée à l'Affichage de la solution
		//actionSolution ();
		//verifier();
		// Désactivation de l'écoute d'action
		delete onEnterFrame;
	}

	// Réinitialisation "Bouton VALIDER de l'IF non pressé"
	_level0.validation = false;
	
};
stop();