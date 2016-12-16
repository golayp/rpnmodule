﻿/**
 * ...
 * @author Michel Roquier, Jean-Michel luthi
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
	trace(positionFaux);
}

//fonction qui teste l'action avec ancienneCase un tableau conteneant les coordonnées de l'avant dernière case et nouvelleCase, les coordonnées de la dernière case cliquée.
function analyse(ancienneCase, nouvelleCase)
{
	
	trace("analyse non guidée" );
	var monTexte:String;
	var numeroAncienneCase:Number = noCase(ancienneCase[0], ancienneCase[1]);
	var numeroNouvelleCase:Number = noCase(nouvelleCase[0], nouvelleCase[1]);
	var numeroArrivee:Number = noCase(arriveeX, arriveeY);
	var pasPremier:Boolean = true;
	
	_global.monCompteur = 1;
	//trace("numeroAncienneCase: "+numeroAncienneCase +" numeroNouvelleCase: "+numeroNouvelleCase+" numeroArrivee: "+numeroArrivee);
	//On teste si le contenu de la nouvelle case est premier
	for (i = 0; i < tabNbPremier.length; i++)
	{

		if (Number(tabNbPremier[i])==Number(maCase[numeroNouvelleCase].val2.text))
		{
			pasPremier = false;
			//trace("Premier");
			break;
		}
	}
	var diviseur:Number;
	//On teste quel est le nb non premier pour lui trouver un diviseur premier
	for (j = 0; j < tabNbNonPremier.length; j++)
	{
		if (Number(tabNbNonPremier[j])==Number(maCase[numeroNouvelleCase].val2.text))
		{
			diviseur = tabDiviseurNonPremier[j];
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
		//mettreMur(numeroNouvelleCase, numeroAncienneCase);
		break;
		case(Number(maCase[numeroAncienneCase].val2.text) > Number(maCase[numeroNouvelleCase].val2.text))://Si on a cliqué sur un nb premier plus petit, c'est juste. On met juste dans le tableau des réponses
		reponseChemin.push("Juste");
		reponseCheminGlobal.push("juste");
		if (numeroNouvelleCase == numeroArrivee)
		{
			reperageFaux(reponseChemin);
			fondMc.verifie_Btn._visible = true;
			//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
			var nbDeCases:Number=nbCasesX*nbCasesY;
						
			for (i = 1; i <= nbDeCases; i++)
			{
					fondMc["conteneurCarre" +i].enabled = false;
			}
			//creationBulles();
			monTexte = "Bravo, tu est parvenu à la fin de ce labyrinthe!";
			reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);//On ajoute CINQ à la longueur de reponse
			reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			if (reponse.length>5)
			{
				for (i = 0; i < reponseChemin.length; i ++)
				{
					//trace(i+"reponseChemin"+reponseChemin.length)
					if (reponseChemin[i] == "faux")
					{
						fauteRestante = true;
						reperageFaux(reponseChemin);
					}
					
				}
			}
			
		}
		break;
		case(Number(maCase[numeroAncienneCase].val2.text) < Number(maCase[numeroNouvelleCase].val2.text))://Si on a cliqué sur un nb premier plus grand, c'est faux. On met faux dans le tableau des réponses
		compteurFaux++;
		//trace("compteurFaux"+compteurFaux);
		//mettreMur(numeroNouvelleCase, numeroAncienneCase);
		reponseChemin.push("faux");
		reponseCheminGlobal.push("faux");
		monTexte = maCase[numeroNouvelleCase].val2.text+" est premier mais plus grand que le nombre précedent";
		reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0], ancienneCase[1], monTexte]);
		reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		break;
		case(Number(maCase[numeroAncienneCase].val2.text) == Number(maCase[numeroNouvelleCase].val2.text))://Si on a cliqué sur un nb premier plus grand, c'est faux. On met faux dans le tableau des réponses
		compteurFaux++;
		//trace("compteurFaux"+compteurFaux);
		//mettreMur(numeroNouvelleCase, numeroAncienneCase);
		reponseChemin.push("faux");
		reponseCheminGlobal.push("faux");
		monTexte = maCase[numeroNouvelleCase].val2.text+" est premier mais égal au nombre précédant";
		reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0], ancienneCase[1], monTexte]);
		reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		break;
		default:
		break;
		trace(reponse);
	}
}





//Fonction Initialisation Tableau contenant "juste" ou "Détail de l'erreur" à chaque étape.
//  !!  ATTENTION !!  Le NUMERO de réponse "i" correspond au NUMERO des cases du CHEMIN CORRECT
function iniTabReponses ()
{
	for (i = 0 ; i < longueurChemin ; i++)
	{
		reponse [i] = "";
	}
}

//Fonction test de chaque étape
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


