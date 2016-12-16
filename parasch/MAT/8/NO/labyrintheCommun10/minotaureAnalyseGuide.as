/**
 * ...
 * @author Jean-Michel Luthi
 */


//INITIALISATIONS DES VARIABLES DE TEST

//Initialisation Réponse Juste envoyée à l'IF
_global.repJuste = false;

//Initalisation Retour envoyé à l'IF
_level0.retour = "Tu n'as pas encore avancé dans le labyrinthe.";

//Initialisation Compteur Réponses Fausses
var compteurFaux : Number = 0;

var reponseText : String = "vide";


//Initialisation du tableau de réponses
iniTabReponses();

//Initialisation Préparation des retours
preparation_retour();

////////////////////////////// FONCTIONS //////////////////
function mettreMur(no1,no2)
{
	switch(Number(no1-no2))
		{
			case 1:
			mur(maCase[no2], "DROITE");
			break;
			case -1:
			mur(maCase[no2], "GAUCHE");
			break;
			case -nbCasesX:
			mur(maCase[no2], "HAUT");
			break;
			case nbCasesX:
			mur(maCase[no2], "BAS");
			break;
			default:
			break;
			
		}
}
//On repere les positions dans le reste
function reperageFauxR(tableau)
{
	positionFaux = new Array();
	positionFauxR = new Array();
	for (i = 0; i < tableau.length; i++)
	{
		if (tableau[i] == "faux")
		{
			positionFauxR.push(i);
		}
	}
	trace("analyseGuide positionFauxR: "+positionFauxR);
}
//On repere les positions dans le global
function reperageFauxG(tableau)
{
	positionFauxG = new Array();
	for (i = 0; i < tableau.length; i++)
	{
		if (tableau[i] == "faux")
		{
			positionFauxG.push(i);
		}
	}
	trace("analyseGuide positionFauxG: "+positionFauxG);
}


//fonction qui teste l'action avec ancienneCase un tableau conteneant les coordonnées de l'avant dernière case et nouvelleCase, les coordonnées de la dernière case cliquée.
function analyseGuide(ancienneCase, nouvelleCase)
{
	
	var monTexte:String;
	var numeroAncienneCase:Number = noCase(ancienneCase[0], ancienneCase[1]);
	var numeroNouvelleCase:Number = noCase(nouvelleCase[0], nouvelleCase[1]);
	var numeroArrivee:Number = noCase(arriveeX, arriveeY);
	var pasPremier:Boolean = true;
	var fauteRestante:Boolean;
	_global.monCompteur = 1;
	//trace("numeroAncienneCase: "+numeroAncienneCase +" numeroNouvelleCase: "+numeroNouvelleCase+" numeroArrivee: "+numeroArrivee);
	//On teste si le contenu de la nouvelle case est premier
	for (ai = 0; ai < tabNbPremier.length; ai++)
	{

		if (Number(tabNbPremier[ai])==Number(maCase[numeroNouvelleCase].val2.text))
		{
			pasPremier = false;
			//trace("Premier");
			break;
		}
	}
	var diviseur:Number
	//On teste quel est le nb non premier pour lui trouver un diviseur premier
	for (aj = 0; aj < tabNbNonPremier.length; aj++)
	{
		if (tabNbNonPremier[aj]==maCase[numeroNouvelleCase].val2.text)
		{
			diviseur = tabDiviseurNonPremier[aj];
			//trace("diviseur: " + diviseur);
			break;
		}
	}
	switch (true)
	{
		case(pasPremier)://On met un mur, on met les coordonnées de la case et la raison dans le tableau des réponses et on ajoute 1 au compteur de fautes
		compteurFaux++;
		monTexte = maCase[numeroNouvelleCase].val2.text+" n'est pas premier, un de ses diviseur est: " + diviseur;
		reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		reponseChemin.push("faux");
		reponseCheminGlobal.push("faux");
		mettreMur(numeroNouvelleCase, numeroAncienneCase);
		break;
		case(Number(maCase[numeroAncienneCase].val2.text) > Number(maCase[numeroNouvelleCase].val2.text))://Si on a cliqué sur un nb premier plus petit, c'est juste. On met juste dans le tableau des réponses
		reponseChemin.push("Juste");
		reponseCheminGlobal.push("juste");
		if (numeroNouvelleCase == numeroArrivee)
		{
			//On repère la position des fautes dans le tableau positionFaux
			reperageFauxR(reponseChemin);
			reperageFauxG(reponseCheminGlobal);
			//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
			var nbDeCases:Number=nbCasesX*nbCasesY;
						
			for (i = 1; i <= nbDeCases; i++)
			{
					fondMc["conteneurCarre" +i].enabled = false;
			}
			creationBulles();
			monTexte = "Bravo, tu est parvenu à la fin de ce labyrinthe!";
			reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);//On ajoute CINQ à la longueur de reponse
			reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			if (reponse.length>3)
			{
				for (i = 0; i < reponseChemin.length; i ++)
				{
					//trace(i+"reponseChemin"+reponseChemin.length)
					if (reponseChemin[i] == "faux")
					{
						fauteRestante= true;
						
					}
					
				}
				if (fauteRestante== true){
					for(i=0;i<positionFaux.length;i++){
						positionFaux[i]="";
					}
					reperageFaux(reponseChemin);
				}
			}
			switch (true)
			{
				case(reponseGlobal.length > 5 && fauteRestante == true):
					ouinonRouge._visible = true;
					ouiRougeBtn._visible = true;
					nonRougeBtn._visible = true;
					
					positionFaux=positionFauxR;
					trace("positionFaux dans AG >5, fautes restantes"+positionFaux);
					ouinonRouge.repMcTxt.text = "Tu as laissé des fautes.\nVeux-tu les voir?";
					_global.rep_justeTemp = false;
					_global.rep_juste = false;
				break;
				case (reponseGlobal.length>5):
					ouinonVert._visible = true;
					ouiVertBtn._visible = true;
					nonVertBtn._visible = true;
					
					positionFaux=positionFauxG;
					trace("positionFaux dans reponse.length>5"+positionFaux);
					//trace("reponseCheminGlobal dans reponse.length>5"+reponseCheminGlobal);
					ouinonVert.repMcTxt.text = monTexte + "\nVeux-tu voir les erreurs\nque tu avais faites?";
					_global.rep_justeTemp = true;
					_global.rep_juste = true;
				break;
				case (reponse.length<=5):
					finVert._visible = true;
					finVertBtn._visible = true;
					finVert.repMcTxt.text = monTexte + "\nTu as fait un parcours sans fautes";
					_global.rep_justeTemp = true;
					_global.rep_juste = true;
				break;
				default:
				break;
			}
			preparation_retour();
		}
		break;
		case(Number(maCase[numeroAncienneCase].val2.text) < Number(maCase[numeroNouvelleCase].val2.text))://Si on a cliqué sur un nb premier plus grand, c'est faux. On met faux dans le tableau des réponses
		compteurFaux++;
		trace("compteurFaux"+compteurFaux);
		mettreMur(numeroNouvelleCase, numeroAncienneCase);
		reponseChemin.push("faux");
		reponseCheminGlobal.push("faux");
		monTexte = maCase[numeroNouvelleCase].val2.text+" est premier mais plus grand que le nombre précedent";
		reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		if (numeroNouvelleCase == numeroArrivee)
		{
			//On repère la position des fautes dans le tableau positionFaux
			reperageFaux(reponseCheminGlobal);
			//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
			var nbDeCases:Number=nbCasesX*nbCasesY;
						
			for (i = 1; i <= nbDeCases; i++)
			{
					fondMc["conteneurCarre" +i].enabled = false;
			}
			creationBulles();
			monTexte = "Bravo, tu est parvenu à la fin de ce labyrinthe!";
			reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);//On ajoute CINQ à la longueur de reponse
			reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			if (reponse.length>3)
			{
				for (i = 0; i < reponseChemin.length; i ++)
				{
					//trace(i+"reponseChemin"+reponseChemin.length)
					if (reponseChemin[i] == "faux")
					{
						fauteRestante= true;
					}
					
				}
			}
			
			case(reponse.length > 5 && fauteRestante == true):
			ouinonRouge._visible = true;
			ouiRougeBtn._visible = true;
			nonRougeBtn._visible = true;
			trace("positionFaux"+positionFaux);
			ouinonRouge.repMcTxt.text = "Tu as laissé des fautes.\nVeux-tu les voir?";
			_global.rep_justeTemp = false;
			_global.rep_juste = false;
		}

		
		break;
		case(Number(maCase[numeroAncienneCase].val2.text) == Number(maCase[numeroNouvelleCase].val2.text))://Si on a cliqué sur un nb premier égal, c'est faux. On met faux dans le tableau des réponses
		compteurFaux++;
		trace("compteurFaux"+compteurFaux);
		mettreMur(numeroNouvelleCase, numeroAncienneCase);
		reponseChemin.push("faux");
		reponseCheminGlobal.push("faux");
		monTexte = maCase[numeroNouvelleCase].val2.text+" est premier mais égal au nombre précedent";
		reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		break;
		default:
		break;
	}
}


///////////////Fonctions utilisées par l'InterfaceAvecIF
function actionRepJuste ()
{
	//Pour cet exercice, on ne fait rien, tout c'est fait avant
	verifierTxt._visible=true;
	verifierTxt.text ="actionRepJuste";
}

function actionRepFausse ()
{
	//Pour cet exercice, on ne fait rien, tout c'est fait avant
	verifierTxt._visible=true;
	verifierTxt.text ="actionRepFausse";
}

function actionSolution ()
{
	//On affiche le chemin
	//Choix chemin visible
	//verifierTxt._visible=true;
	verifierTxt.text ="actionSolution";
	filVisible(true, "parcours");
	cheminVisible(true);
}


//Fonction Initialisation Tableau contenant "juste" ou "Détail de l'erreur" à chaque étape./////////////////////PAS EU BESOIN///////////////
//  !!  ATTENTION !!  Le NUMERO de réponse "i" correspond au NUMERO des cases du CHEMIN CORRECT
function iniTabReponses ()
{
	for (i = 0 ; i < longueurChemin ; i++)
	{
		reponse [i] = "";
	}
}

//Fonction test de chaque étape/////////////////////PAS EU BESOIN/////////////////////////////////////////
function testParcours ()
{
	for (i = 0 ; i < longueurChemin ; i++)
	{
		while (reponse [i] != "juste")
		{
			compteurFaux++;
		}
	}
}


//Fonction Préparation retours
function preparation_retour()
{
	if (parcours[0]==""){
		_global.repJuste = false;
		_level0.retour = "Tu n'as pas encore avancé dans le labyrinthe.";
	}else if (_global.repJuste == true ){
		_level0.retour = "Bravo !\nTu as réussi à parcourir le labyrinthe correctement.";
	}else if ( _global.repJuste == false)
	{
		_level0.retour = "Il y avait encore des erreurs ... ";
	}
	trace("_level0.retour"+_level0.retour);
}