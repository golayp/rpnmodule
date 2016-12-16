/**
 * ...
 * @author M.Roquier
 */

//Interface avec IF de Paraschool



// INITIALISATION de l'indicateur "Bouton Solution pressé" 
solution=false;
verifierTxt._y = 200;
verifierTxt._height = 150;
// Activation de l'écoute d'action "Boutons VALIDER ou SOLUTION de Paraschool pressés"
this.onEnterFrame = function() {

	//CLIC sur bouton VALIDER et réponse JUSTE
	if (_gloabl.validation == true && _level0.rep_juste == true)
	{

		// Réinitialisation "Bouton VALIDER de l'IF non pressé"
		_level0.validation = false;

	}
	//CLIC sur bouton VALIDER et réponse FAUSSE
	else if (_gloabl.validation == true && _level0.rep_juste == false)
	{
		// Action liée à l'erreur
		actionRepFausse();
		
		// Réinitialisation "Bouton VALIDER de l'IF non pressé"
		_level0.validation = false;

	}else if (_level0.sol == true && solution == false && _level0.suiteExercice == false) {
		
		solution = true;
		_level0.repJuste = false;
		_level0.reponseJuste = false;
		//Action liée à l'Affichage de la solution
		//actionSolution ();
		fondMc.verifie_Btn._visible = false;
		verifier();
		// Désactivation de l'écoute d'action
		delete onEnterFrame;
	}
		
	//CLIC sur bouton SOLUTION
	else if (_level0.sol == true)
	{
		solution = true;
		_level0.repJuste = false;
		_level0.reponseJuste = false;
		//Action liée à l'Affichage de la solution
		actionSolution ();
		//verifier();
		// Désactivation de l'écoute d'action
		delete onEnterFrame;
	}

	// Réinitialisation "Bouton VALIDER de l'IF non pressé"
	_gloabl.validation = false;
	
};
stop();