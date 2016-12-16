/**
 * ...
 * @author Michel Roquier, Jean-Michel luthi
 */

//INITIALISATIONS DES VARIABLES DE TEST

//Initialisation Réponse Juste envoyée à l'IF
_global.repJuste = false;

//Initalisation Retour envoyé à l'IF
_level0.retour = "Tu n'as pas encore avancé dans le labyrinthe.";
_level0.retour = "Tu n'as pas encore avancé dans le labyrinthe. _level0";
_level0.rep_juste = false;
//Initialisation Compteur Réponses Fausses
var compteurFaux  = 0;

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
}

//fonction qui teste l'action avec ancienneCase un tableau conteneant les coordonnées de l'avant dernière case et nouvelleCase, les coordonnées de la dernière case cliquée.
function analyse(ancienneCase, nouvelleCase)
{
	
	trace("analyse non guidée" );
	var monTexte:String;
	var numeroAncienneCase = noCase(ancienneCase[0], ancienneCase[1]);
	var numeroNouvelleCase = noCase(nouvelleCase[0], nouvelleCase[1]);
	var numeroArrivee = noCase(arriveeX, arriveeY);
	var pasPremier:Boolean = true;
	trace("positionForme(numeroAncienneCase)"+positionForme(numeroAncienneCase));
	_global.monCompteur = 1;
	
	switch (true)
	{
		case (numeroNouvelleCase == numeroDepart):
			trace("départ");
		break;
		case (numeroNouvelleCase == numeroAncienneCase):
			trace("même case");
		break;
		case(tabFormeJuste[positionForme(numeroAncienneCase)]==maCase[numeroNouvelleCase].conteneur.carre.val1.text )://Si on a cliqué sur la forme juste correspondant à la forme c'est juste. On met juste dans le tableau des réponses
			trace("juste");
			reponseChemin.push("Juste");
			reponseCheminGlobal.push("juste");
			if (numeroNouvelleCase == numeroArrivee)
			{
				reperageFaux(reponseChemin);
				fondMc.verifie_Btn._visible = true;
				//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
				var nbDeCases=nbCasesX*nbCasesY;
							
				for (i = 1; i <= nbDeCases; i++)
				{
						fondMc["conteneurCarre" +i].enabled = false;
				}
				monTexte = "Bravo, tu est parvenu à la fin de ce labyrinthe!";
				_level0.retour = "Bravo, tu est parvenu à la fin de ce labyrinthe!";
				_level0.rep_juste=true;
				reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);//On ajoute CINQ à la longueur de reponse
				reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
				if (reponse.length>5)
				{
					for (i = 0; i < reponseChemin.length; i ++)
					{
						if (reponseChemin[i] == "faux")
						{
							fauteRestante = true;
							reperageFaux(reponseChemin);
							_level0.rep_juste=false;
						}
						
					}
				}
				
			}
		break;
		case(tabFormeJuste[positionForme(numeroAncienneCase)]!=maCase[numeroNouvelleCase].conteneur.carre.val1.text )://Si on fait une faute
			trace("on est dans faux");
			compteurFaux++;
			reponseChemin.push("faux");
			reponseCheminGlobal.push("faux");
			if(tabFormeFausse[positionForme(numeroAncienneCase)]==maCase[numeroNouvelleCase].conteneur.carre.val1.text)
			{
				monTexte=tabCommentaires[positionForme(numeroAncienneCase)]
			}else{
				monTexte = "Ce n'est pas la bonne forme verbale";
				_level0.retour = "";
			}
			reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0], ancienneCase[1], monTexte]);
			reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			if(tabFormeFausse[positionForme(numeroAncienneCase)]==maCase[numeroNouvelleCase].conteneur.carre.val1.text)
			{
				monTexte=tabCommentaires[positionForme(numeroAncienneCase)]
			}else{
				monTexte = "Ce n'est pas la bonne forme verbale";
				_level0.retour = "";
			}
			if (numeroNouvelleCase == numeroArrivee)
			{
				reperageFaux(reponseChemin);
				fondMc.verifie_Btn._visible = true;
				//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
				var nbDeCases=nbCasesX*nbCasesY;
							
				for (i = 1; i <= nbDeCases; i++)
				{
						fondMc["conteneurCarre" +i].enabled = false;
				}
				monTexte = "Bravo, tu est parvenu à la fin de ce labyrinthe!";
				_level0.retour="Bravo, tu est parvenu à la fin de ce labyrinthe!";
				_level0.rep_juste=true;
				reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);//On ajoute CINQ à la longueur de reponse
				reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
				if (reponse.length>5)
				{
					for (i = 0; i < reponseChemin.length; i ++)
					{
						if (reponseChemin[i] == "faux")
						{
							fauteRestante = true;
							reperageFaux(reponseChemin);
							_level0.rep_juste=false;
						}
						
					}
				}
				
			}
		break;
		default:
		break;
	}
	preparation_retour()
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


