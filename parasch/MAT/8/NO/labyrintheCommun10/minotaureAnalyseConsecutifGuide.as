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
function reperageFaux(tableau)
{
	positionFaux = new Array();
	for (i = 0; i < tableau.length; i++)
	{
		if (tableau[i] == "faux")
		{
			positionFaux.push(i);
		}
	}
}


//fonction qui teste l'action avec ancienneCase un tableau conteneant les coordonnées de l'avant dernière case et nouvelleCase, les coordonnées de la dernière case cliquée.
function analyseGuide(ancienneCase, nouvelleCase)
{
	
	var monTexte:String;
	var numeroAncienneCase:Number = noCase(ancienneCase[0], ancienneCase[1]);
	var numeroNouvelleCase:Number = noCase(nouvelleCase[0], nouvelleCase[1]);
	var numeroArrivee:Number = noCase(arriveeX, arriveeY);
	var premier:Boolean = false;
	var nonPremier:Boolean = false;
	var premierSuivant:Boolean = false;
	var premierTropGrand:Boolean = false;
	var premierTropPetit:Boolean = false;
	
	var fauteRestante:Boolean;
	_global.monCompteur = 1;
	
	//Test pour voir si la nouvelle case est un nombre premier
	for (i = 0; i < tabNbPremier.length; i++)
	{
		if (Number(tabNbPremier[i])==Number(maCase[numeroNouvelleCase].val2.text))
		{
			premier = true;
		}
	}
	
	//Suite de l'analyse lorsque la nouvelle case est un nombre premier
	if (premier)
	{
		//Récupération de la position de l'ancien nombre premier dans le tableau
		for (i = 0; i < tabNbPremier.length; i++)
		{
			if (Number(tabNbPremier[i])==Number(maCase[numeroAncienneCase].val2.text))
			{
				posTabAncienNbPremier = i;
			}
		}
		//Test si la nouvelle case contient bien le nombre premier suivant
		if (Number(tabNbPremier[posTabAncienNbPremier-1])==Number(maCase[numeroNouvelleCase].val2.text))
		{
			premierSuivant = true;
		}
		else
		{
			//Test si la nouvelle case contient un nombre premier supérieur au précédent
			if (Number(maCase[numeroAncienneCase].val2.text) < Number(maCase[numeroNouvelleCase].val2.text))
			{
				premierTropGrand = true;
			}
			else
			{
				premierTropPetit = true;
			}
		}
	}
	else
	{
		nonPremier = true;
		
		var diviseur: Number;
		//On teste quel est le nb non premier pour lui trouver un diviseur premier
		for (aj = 0; aj < tabNbNonPremier.length; aj++)
		{
			if (tabNbNonPremier[aj]==maCase[numeroNouvelleCase].val2.text)
			{
				diviseur = tabDiviseurNonPremier[aj];
				trace("diviseur: " + diviseur);
			}
		}
	}
	switch (true)
	{
		case(nonPremier):
		//On met un mur, on met les coordonnées de la case et la raison dans le tableau des réponses et on ajoute 1 au compteur de fautes
		compteurFaux++;
		monTexte = maCase[numeroNouvelleCase].val2.text+" n'est pas premier, un de ses diviseurs est " + diviseur;
		reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		reponseChemin.push("faux");
		mettreMur(numeroNouvelleCase, numeroAncienneCase);
		trace ("NON PREMIER")
		break;
		
		case(premierSuivant):
		//On met juste dans le tableau des réponses
		reponseChemin.push("Juste");
		//Test si on est sur la case d'arrivée
		if (numeroNouvelleCase == numeroArrivee)
		{
			reperageFaux(reponseChemin);
			//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
			var nbDeCases:Number=nbCasesX*nbCasesY;
						
			for (i = 1; i <= nbDeCases; i++)
			{
					fondMc["conteneurCarre" +i].enabled = false;
			}
			creationBulles();
			monTexte = "Bravo, tu est parvenu à la fin de ce labyrinthe!";
			reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);//On ajoute CINQ à la longueur de reponse
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
			switch (true)
			{
				case(reponse.length > 5 && fauteRestante == true):
				this.fondRepMc.fauxErreurMc._visible = true;
				this.fondRepMc.fauxErreurMc.repMcTxt.text = "Tu as laissé des fautes.\nVeux-tu les voire?";
				_global.rep_justeTemp = false;
				_global.rep_juste = false;
				break;
				case (reponse.length>5):
				this.fondRepMc.justeErreurMc._visible = true;
				this.fondRepMc.justeErreurMc.repMcTxt.text = monTexte + "\nVeux-tu voire les erreurs\nque tu avais faites?";
				_global.rep_justeTemp = true;
				_global.rep_juste = true;
				break;
				case (reponse.length<=5):
				this.fondRepMc.repJusteMc._visible = true;
				this.fondRepMc.repJusteMc.repMcTxt.text = monTexte + "\nTu as fait un parcours sans faute";
				_global.rep_justeTemp = true;
				_global.rep_juste = true;
				break;
				default:
				break;
			}
			preparation_retour();
		}
		trace ("PREMIER")
		break;
		
		case(premierTropGrand):
		//Si on a cliqué sur un nb premier plus grand, c'est faux. On met faux dans le tableau des réponses
		compteurFaux++;
		trace("compteurFaux"+compteurFaux);
		mettreMur(numeroNouvelleCase, numeroAncienneCase);
		reponseChemin.push("faux");
		monTexte = maCase[numeroNouvelleCase].val2.text+" est premier mais plus grand que le nombre précédent";
		reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		trace ("TROP GRAND")
		break;
		
		case(premierTropPetit):
		//Si on a cliqué sur un nb premier plus grand, c'est faux. On met faux dans le tableau des réponses
		compteurFaux++;
		trace("compteurFaux"+compteurFaux);
		mettreMur(numeroNouvelleCase, numeroAncienneCase);
		reponseChemin.push("faux");
		monTexte = maCase[numeroNouvelleCase].val2.text+" est premier mais trop petit.";
		reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		trace ("TROP PETIT")
		break;
		
		case(Number(maCase[numeroAncienneCase].val2.text) == Number(maCase[numeroNouvelleCase].val2.text)):
		//Si on a cliqué sur un nb premier plus grand, c'est faux. On met faux dans le tableau des réponses
		compteurFaux++;
		trace("compteurFaux"+compteurFaux);
		mettreMur(numeroNouvelleCase, numeroAncienneCase);
		reponseChemin.push("faux");
		monTexte = maCase[numeroNouvelleCase].val2.text+" est premier mais égal au nombre précédent";
		reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		trace ("EGAL")
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
	verifierTxt._visible=true;
	verifierTxt.text ="actionSolution";
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