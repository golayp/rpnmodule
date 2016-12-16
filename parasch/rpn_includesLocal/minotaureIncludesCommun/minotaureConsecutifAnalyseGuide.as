/**
 * ...
 * @author Jean-Michel Luthi
 */


//INITIALISATIONS DES VARIABLES DE TEST

//Initialisation Réponse Juste envoyée à l'IF
_level0.repJuste = false;

//Initalisation Retour envoyé à l'IF
_level0.retour = "Tu n'as pas encore avancé dans le labyrinthe.";

//Initialisation Compteur Réponses Fausses
var compteurFaux = 0;

var reponseText = "vide";


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
	//trace("analyseGuide positionFauxR: "+positionFauxR);
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
	//trace("analyseGuide positionFauxG: "+positionFauxG);
}


function analyseGuide(ancienneCase, nouvelleCase)
{
//	delete fondRepMc9.onEnterFrame;
//	fondMc["conteneurCarre" + casesLiees[0] ].tourCaseFaux._visible=false;
//	fondMc["conteneurCarre" + casesLiees[1] ].tourCaseFaux._visible=false;
//	fondRepMc9._visible=false;
	//trace("analyse non guidée" );
	var monTexte:String;
	var numeroAncienneCase = noCase(ancienneCase[0], ancienneCase[1]);
	var numeroNouvelleCase = noCase(nouvelleCase[0], nouvelleCase[1]);
	var numeroArrivee = noCase(arriveeX, arriveeY);
	var numeroDepart = noCase(departX, departY);
	var pasPremier:Boolean = true;
	var resultatAncienneCase:Number = resultatOperation(choixOperation, maCase[numeroAncienneCase].nb1, maCase[numeroAncienneCase].nb2);

	_level0.monCompteur = 1;
	
	switch (true)
	{
		case (numeroNouvelleCase==numeroDepart):
		break;
		case (numeroNouvelleCase==numeroAncienneCase):
		break;
		case(resultatAncienneCase==Number(maCase[numeroNouvelleCase].conteneur.carre.val1.text) )://Si on a cliqué sur un nb premier plus petit,dans l'ordre décroissant c'est juste. On met juste dans le tableau des réponses
			reponseChemin.push("Juste");
			trace("Juste");
			reponseCheminGlobal.push("juste");
			if (numeroNouvelleCase == numeroArrivee)
			{
				reperageFaux(reponseChemin);
//				fondMc.verifie_Btn._visible = true;
				//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
				var nbDeCases=nbCasesX*nbCasesY;
							
				for (i = 1; i <= nbDeCases; i++)
				{
						fondMc["conteneurCarre" +i].enabled = false;
				}
				monTexte = "Bravo, tu est parvenu à la fin de ce labyrinthe!";
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
		case(resultatAncienneCase!=Number(maCase[numeroNouvelleCase].conteneur.carre.val1.text) )://Si on a cliqué sur un nb premier plus grand, c'est faux. On met faux dans le tableau des réponses
			compteurFaux++;
			trace("Faux");
			reponseChemin.push("faux");
			reponseCheminGlobal.push("faux");
			mettreMur(numeroNouvelleCase, numeroAncienneCase);
			creationBulles();
			fondRepMc9._x=200;
			fondRepMc9._y=50;
			
			//monTexte = maCase[numeroAncienneCase].commentaireCase;
			monTexte = commentaire(maCase[numeroAncienneCase].nb1, maCase[numeroAncienneCase].nb2, choixOperation,maCase[numeroNouvelleCase].conteneur.carre.val1.text);
			reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0], ancienneCase[1], monTexte]);
			reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			fondRepMc9.okRougeBulle._visible = true;
			okRougeGuideBtn._visible=true;
			fondRepMc9.okRougeBulle.repMcTxt.text = "Il y a une erreur:\n" + monTexte+".";
			casesLiees =new Array();
			casesLiees[0]=numeroAncienneCase;
			casesLiees[1]=numeroNouvelleCase;
//			fondRepMc9.onEnterFrame=function(){
//				fondMc["conteneurCarre" + numeroAncienneCase ].tourCaseFaux._visible=true;
//				fondMc["conteneurCarre" + numeroNouvelleCase ].tourCaseFaux._visible=true;
//			}
			if (numeroNouvelleCase == numeroArrivee)
			{
				reperageFaux(reponseChemin);
//				fondMc.verifie_Btn._visible = true;
				//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
				var nbDeCases=nbCasesX*nbCasesY;
							
				for (i = 1; i <= nbDeCases; i++)
				{
						fondMc["conteneurCarre" +i].enabled = false;
				}
				monTexte = "Bravo, tu est parvenu à la fin de ce labyrinthe!";
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

	}
	preparation_retour()
}


///////////////Fonctions utilisées par l'InterfaceAvecIF
function actionRepJuste ()
{
	//Pour cet exercice, on ne fait rien, tout c'est fait avant
}

function actionRepFausse ()
{
	//Pour cet exercice, on ne fait rien, tout c'est fait avant
}

function actionSolution ()
{
	fondBulle.bulleRougeMc._visible = true;
	//On teste
	_level0.cible.fondBulle.bulleRougeMc.fond.texte.text = _level0.retourSolution+"La bulle rouge de l'interface est visible";
	
	_global.solution = true;
	_level0.repJuste = false;
	_level0.reponseJuste = false;
	//Action liée à l'Affichage de la solution
	//actionSolution ();
	trace("_global.passageVerifier" +_global.passageVerifier );
	fondMc.verifie_Btn._visible = false;
	if (_global.passageVerifier == false) {
		verifier();
	}else{
	
		//On affiche le chemin
		//Choix chemin visible
		for(i=0;i<parcours.length;i++)
		
		{
			switch(noCase(parcours[i+1][0],parcours[i+1][1])-noCase(parcours[i][0],parcours[i][1]))
			{
				
				case 1:
				fil(maCase[noCase(parcours[i][0],parcours[i][1])], "parcours", "DROITE");
				break;
				case -1:
				fil(maCase[noCase(parcours[i][0],parcours[i][1])], "parcours", "GAUCHE");
				break;
				case -nbCasesX:
				fil(maCase[noCase(parcours[i][0],parcours[i][1])], "parcours", "HAUT");
				break;
				case nbCasesX:
				fil(maCase[noCase(parcours[i][0],parcours[i][1])], "parcours", "BAS");
				break;
				
				default:
				break;
				
			}
		}
		filVisible(true, "parcours");
		flechesVisibles(false,"parcours");
		mursVisibles(false);
		//On rend invisible leparcours suivi
		for (p = 0; p < parcours.length-1; p++)
		{
			var caseDesactivee = parcours[p][0] + (parcours[p][1] - 1) * nbCasesX;
			var avantCaseDesactivee = parcoursTemp[p-1][0] + (parcours[p-1][1] - 1) * nbCasesX;
			var monNo = 5000+avantCaseDesactivee;
			var monNoF = 1200+avantCaseDesactivee;
			var monNoM = 7000+avantCaseDesactivee
			
			//On repère le contenu de la case que l'on va désactiver
			if (choixOperation = "multiplication") {
				trace(maCase[caseDesactivee].conteneur.carre.monAffichage+"operation dans actionSolution: " +choixOperation );
				maCase[caseDesactivee].conteneur.carre.monAffichage.visible = true;
				
			}else{
				leTextCaseHaut=maCase[caseDesactivee].conteneur.carre.val1.text;
				leTextCaseBas = maCase[caseDesactivee].conteneur.carre.val2.text;
				
				texteESG_fmt.color=Number(0x000000);
				texteHaut_fmt.color=Number(0x000000);
				texteBas_fmt.color=Number(0x000000);
				maCase[caseDesactivee].setCouleurFond (maCouleur[caseDesactivee-1], couleurFondGrilleAlpha); 
				maCase[caseDesactivee].setTextH(leTextCaseHaut, texteHaut_fmt);
				maCase[caseDesactivee].setTextB(leTextCaseBas, texteBas_fmt); 
			}
			maCase[caseDesactivee].active = false;		
		}
		
		cheminVisible(true);
		
	}		
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
		_level0.rep_juste = false;
		_level0.retour = "Tu n'avais pas encore avancé dans le labyrinthe.";
	}else if (_level0.rep_juste == true ){
		_level0.retour = "Bravo !\nTu as réussi à parcourir le labyrinthe correctement.";
	}else if ( _level0.rep_juste == false)
	{
		_level0.retour = "Il y avait encore des erreurs ... ";
	}
}