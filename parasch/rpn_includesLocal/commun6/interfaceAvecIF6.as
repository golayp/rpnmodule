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
	_level0.sol = _level0.sol;
	_level0.rep_juste = _level0.rep_juste;
	_level0.retour = _level0.retour;
	//CLIC sur bouton SOLUTION
	if (_level0.scriptvar.sol == true)
	{
		solution = true;
		_level0.repJuste = false;
		_level0.scriptvar.reponseJuste = false;
		//Action liée à l'Affichage de la solution
		actionSolution ();
		// Désactivation de l'écoute d'action
		delete onEnterFrame;
	}
	//CLIC sur bouton VALIDER et réponse JUSTE
	else if (_level0.validation == true && _level0.rep_juste == true)
	{

		// Réinitialisation "Bouton VALIDER de l'IF non pressé"
		_level0.validation = false;

	}
	//CLIC sur bouton VALIDER et réponse FAUSSE
	else if (_levl0.validation == true && _level0.rep_juste == false)
	{
		// Action liée à l'erreur
		actionRepFausse();
		
		// Réinitialisation "Bouton VALIDER de l'IF non pressé"
		_level0.validation = false;

	}

	// Réinitialisation "Bouton VALIDER de l'IF non pressé"
	_level0.validation = false;
	
};
stop();