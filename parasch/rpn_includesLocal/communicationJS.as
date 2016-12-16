/**
 * ...
 * @author Luthi J-M
 */
trace ("communication chargé")
//Fonction pour remplacer un caractère par un autre (pour manipulations)
function str_replace( search, replace, string ):String
{
	var array = string.split(search);
	return array.join(replace);
}

//*************************************CHRONO***************************
var tempsSecondes:Number = 0;
this.createEmptyMovieClip("monChrono", 37);
function chronoStart() {
	Temps = getTimer();
	monChrono.onEnterFrame = deroulement;
}
 
function deroulement() {
	var TotalMilli = getTimer()-Temps;
	//var MS = TotalMilli%1000;
	//var S = Math.floor(TotalMilli/1000)%60;
	//var M = Math.floor(TotalMilli/60000)%60;
	//_level0.Texte.text = M+":"+S+":"+MS;
	tempsSecondes = Math.floor(TotalMilli/1000);
}
 
function chronoStop():Number
{
	delete monChrono.onEnterFrame;
	var TotalMilli = getTimer()-Temps;
	var TempsEcoule = getTimer()-Temps;
	tempsSecondes = Math.floor(TotalMilli/1000);
	//return TempsEcoule;
	return (tempsSecondes);
}

chronoStart();
//************************************* FIN CHRONO ***************************
//On initialise la hauteur et la largeur du clip qui sera appelé par l'interface. les valeurs sont sonnées dans le fichier qui appelle communication.as 
_level0.largeurClipDansInterface = 0;
_level0.hauteurClipDansInterface = 0;
//Variables pour le retour d'informations é l'objet javascript

_level0.tableauManipulations =new Array();
_level0.tableauManipulations.push("Module 1");
var nbModulesReussis:Number = 0;


////////////////////////////////////////////////////////////
import flash.external.ExternalInterface;

var idEleve = _level0.id_eleve;
var niveauEleve = _level0.level_eleve;
var nomEleve = _level0.nom_eleve;

var nom:Array = new Array();
nom = nomEleve.split(" ");

_level0.prenomEleve = nom[0];

var total_time:Number = 0;

_level0.continuerPresse = false;
_level0.exSuivantPresse = false
_level0.suitePresse = false;
_level0.finPresse = false;
_level0.validationPresse = false;
_level0.solPresse = false;
_level0.aideMemoirePresse = false;
_level0.infoPresse = false;
//Variables pour le retour d'informations é l'objet javascript
this.createEmptyMovieClip("supportJS", -5000);
var boutonClique="";
supportJS.onEnterFrame = function() {
//trace("supportJS.onEnterFrame "+_level0.validationPresse)
	switch (true) {
		case _level0.continuerPresse:
			boutonClique = "continuer";
			_level0.continuerPresse = false;
		//Complète le tableau des manipulations
		_level0.tableauManipulations.push("Continuer exercice");
		break;
	case _level0.exSuivantPresse:
		boutonClique = "exSuivant";
		_level0.exSuivantPresse = false;
		
		//Complète le tableau des manipulations
		_level0.tableauManipulations.push("Exercice suivant");
		_level0.exSuivantPresse = false;
		
		/*manipulations = _level0.tableauManipulations.toString();
		manipulations = str_replace(",", "-", manipulations);
					
		resultat_total = nbModulesReussis;
					
		total_time = chronoStop();
		tempIntermed.push(total_time);
					
		trace("temps : "+total_time);
		trace("manipulations : "+manipulations);
		trace("résultats : "+resultat_total)
		
		//On envois des infos sur le javascript
			//var newUsername:String = "Monsieur " + _level0.username;
			//var the_resultats:Object = {id_eleve:id_eleve, rep_juste:_level0.rep_juste, username:newUsername};
			//var the_resultats:Object = {total_time:total_time, manipulations:manipulations, resultat_total:resultat_total, id_eleve:id_eleve}
			var the_resultats:Object = { total_time:total_time, manipulations:manipulations, resultat_total:resultat_total, id_eleve:id_eleve, etatModules:_level0.etatModules};
			//On met la reponse de javascript dans une string pour savoir si c'est exécuté
			//var reponseJS2:String = String(ExternalInterface.call("resetfield"));
			//var reponseJS1:String = String(ExternalInterface.call("recuperationSWF", the_resultats));
			var reponseJS2:String = String(ExternalInterface.call("resetfield"));
			var reponseJS1:String = String(ExternalInterface.call("recuperationSWF", the_resultats));
			//_level0.monTexte =  reponseJS1 +"\n" + the_resultats["repJuste"] +"\n" + reponseJS2;
			//_level0.monTexte = fondMc.infoTxt.text = reponseJS1 +"\n" + the_resultats["rep_juste"] +"\n" + reponseJS2;;
			
			//delete supportJS.onEnterFrame;*/
		break;
	case _level0.suitePresse:
		boutonClique = "suite";
		_level0.suitePresse = false;
		_level0.tableauManipulations.push("Module "+_level0.noModuleEnCours);
		//var the_resultats:Object = { total_time:total_time, manipulations:manipulations, resultat_total:resultat_total, id_eleve:id_eleve, etatModules:_level0.etatModules };
		var the_resultats:Object = { toucheCliquee:boutonClique, total_time:total_time, manipulations:manipulations, resultat_total:resultat_total, nbModules:nbModules, id_eleve:id_eleve, etatModules:_level0.etatModules};
		//On met la reponse de javascript dans une string pour savoir si c'est exécuté
		//var reponseJS2:String = String(ExternalInterface.call("resetfield"));
		var reponseJS1:String = String(ExternalInterface.call("recuperationSWF", the_resultats));
		_level0.monTexte =  reponseJS1 +"\n" + the_resultats["repJuste"] +"\n" + reponseJS2;
		break;
	case _level0.finPresse:
		boutonClique = "fin";
		//Complète le tableau des manipulations
		_level0.tableauManipulations.push("fin");
		break;
	case _level0.validationPresse:
		boutonClique = "valider";
		//_level0.tableauManipulations.push("Valider pressé");
			_level0.validationPresse = false;
			
			if (_level0.rep_juste)
			{
				nbModulesReussis++;
			}
			resultat_total = nbModulesReussis;
						
			total_time = chronoStop();
			_level0.tableauManipulations.push("Chrono "+total_time);
			
			manipulations = _level0.tableauManipulations.toString();
			manipulations = str_replace(",", "-", manipulations);
			
			//trace("temps : "+total_time);
			//trace("manipulations : "+manipulations);
			//trace("résultats : "+resultat_total)
			//On envois des infos sur le javascript
			var newUsername:String = "Monsieur " + _level0.username;
			//var the_resultats:Object = { id_eleve:id_eleve, rep_juste:_level0.rep_juste, username:newUsername }; 
			var the_resultats:Object = { toucheCliquee:boutonClique, total_time:total_time, manipulations:manipulations, resultat_total:resultat_total, nbModules:nbModules, id_eleve:id_eleve, etatModules:_level0.etatModules};
		//On met la reponse de javascript dans une string pour savoir si c'est exécuté
			//var the_resultats:Object = { total_time:total_time, manipulations:manipulations, resultat_total:resultat_total, id_eleve:id_eleve, etatModules:_level0.etatModules};
			//On met la reponse de javascript dans une string pour savoir si c'est exécuté
			var reponseJS2:String = String(ExternalInterface.call("resetfield"));
			//var reponseJS1:String = String(ExternalInterface.call("actionValider", the_resultats));
			var reponseJS1:String = String(ExternalInterface.call("recuperationSWF", the_resultats));
			//_level0.monTexte =  reponseJS1 +"\n" + the_resultats["repJuste"] +"\n" + reponseJS2;
			//delete supportJS.onEnterFrame;
		break;
	case _level0.solPresse:
		boutonClique = "solution";
		_level0.tableauManipulations.push("Solution pressé");
		//0n enlève la bulle pendant l'exécution de la solution
	/*	trace("_level0.solution"+_level0.solution)
				if (_level0.solution == true) {
					trace("solution dasn base"+solution)
					fondBulle._visible = false;
				}else{
					
					fondBulle._visible = true;
				}*/
				_level0.solPresse = false;
		break;
	case _level0.aideMemoirePresse:
		_level0.tableauManipulations.push("Aide-mémoire pressé");
		_level0.aideMemoirePresse = false;
		break;
	case _level0.infoPresse:
		_level0.tableauManipulations.push("Info pressé");
		_level0.infoPresse = false;
		break;
	}
	
}


