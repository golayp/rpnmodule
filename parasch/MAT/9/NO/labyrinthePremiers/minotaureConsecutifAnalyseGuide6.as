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


//fonction qui teste l'action avec ancienneCase un tableau conteneant les coordonnées de l'avant dernière case et nouvelleCase, les coordonnées de la dernière case cliquée.
function analyseGuide(ancienneCase, nouvelleCase)
{
	
	var monTexte;
	var numeroAncienneCase = noCase(ancienneCase[0], ancienneCase[1]);
	var numeroNouvelleCase = noCase(nouvelleCase[0], nouvelleCase[1]);
	var numeroArrivee = noCase(arriveeX, arriveeY);
	var pasPremier:Boolean = true;
	var fauteRestante:Boolean;
	var posDansTabNouvelle:Number;
	var posDansTabAncienne:Number;
	_global.monCompteur = 1;
	//trace("numeroAncienneCase: "+numeroAncienneCase +" numeroNouvelleCase: "+numeroNouvelleCase+" numeroArrivee: "+numeroArrivee);
	//On teste si le contenu de la nouvelle case est premier
	for (ai = 0; ai < tabNbPremier.length; ai++)
	{
		
		if (Number(tabNbPremier[ai])==Number(maCase[numeroNouvelleCase].conteneur.carre.val2.text))
		{
			pasPremier = false;
			posDansTabNouvelle=ai;
			
		}
		if (Number(tabNbPremier[ai])==Number(maCase[numeroAncienneCase].conteneur.carre.val2.text))
		{
			posDansTabAncienne=ai;
			
		}

	}
	var diviseur;
	//On teste quel est le nb non premier pour lui trouver un diviseur premier
	for (aj = 0; aj < tabNbNonPremier.length; aj++)
	{
		if (tabNbNonPremier[aj]==maCase[numeroNouvelleCase].conteneur.carre.val2.text)
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
			monTexte = maCase[numeroNouvelleCase].conteneur.carre.val2.text+" n'est pas premier, un de ses diviseur est: " + diviseur;
			reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			reponseChemin.push("faux");
			reponseCheminGlobal.push("faux");
			mettreMur(numeroNouvelleCase, numeroAncienneCase);
		break;
		case(Number(maCase[numeroAncienneCase].conteneur.carre.val2.text) > Number(maCase[numeroNouvelleCase].conteneur.carre.val2.text)&&(posDansTabAncienne-posDansTabNouvelle==1) )://Si on a cliqué sur un nb premier plus petit,dans l'ordre décroissant c'est juste. On met juste dans le tableau des réponses
			reponseChemin.push("Juste");
			reponseCheminGlobal.push("juste");
			if (numeroNouvelleCase == numeroArrivee)
			{
				//On repère la position des fautes dans le tableau positionFaux
				reperageFauxR(reponseChemin);
				reperageFauxG(reponseCheminGlobal);
				//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
				var nbDeCases=nbCasesX*nbCasesY;
							
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
						for(i=0;i<positionFauxG.length;i++){
							positionFauxG[i]="";
						}
						reperageFaux(reponseChemin);
					}
				}
				switch (true)
				{
					case(reponseGlobal.length > 5 && fauteRestante == true):
						fondRepMc4.ouinonRougeBulle._visible = true;
						ouiRougeBtn._visible = true;
						nonRougeBtn._visible = true;
						
						positionFaux=positionFauxR;
						//trace("positionFaux dans AG >5, fautes restantes"+positionFaux);
						fondRepMc4.ouinonRougeBulle.repMcTxt.text = "Tu as laissé des fautes.\nVeux-tu les voir?";
						_level0.rep_justeTemp = false;
						_level0.rep_juste = false;
					break;
					case (reponseGlobal.length>5):
						fondRepMc3.ouinonVerteBulle._visible = true;
						ouiVertBtn._visible = true;
						nonVertBtn._visible = true;
						
						positionFaux=positionFauxG;
						//trace("positionFaux dans reponse.length>5"+positionFaux);
						//trace("reponseCheminGlobal dans reponse.length>5"+reponseCheminGlobal);
						fondRepMc3.ouinonVerteBulle.repMcTxt.text = monTexte + "\nVeux-tu voir les erreurs\nque tu avais faites?";
						_level0.rep_justeTemp = true;
						_level0.rep_juste = true;
					break;
					case (reponse.length<=5):
						fondRepMc0.finVertBulle._visible = true;
						finVertBtn._visible = true;
						fondRepMc0.finVertBulle.repMcTxt.text = monTexte + "\nTu as fait un parcours sans fautes";
						_level0.rep_justeTemp = true;
						_level0.rep_juste = true;
					break;
					default:
					break;
				}
				preparation_retour();
			}
		break;
		case(Number(maCase[numeroAncienneCase].conteneur.carre.val2.text) > Number(maCase[numeroNouvelleCase].conteneur.carre.val2.text))://Si on n'a pas pris le nombre premier consécutif
		compteurFaux++;
			//trace("compteurFaux"+compteurFaux);
			mettreMur(numeroNouvelleCase, numeroAncienneCase);
			reponseChemin.push("faux");
			reponseCheminGlobal.push("faux");
			monTexte = maCase[numeroNouvelleCase].conteneur.carre.val2.text+" est premier mais ce n'est pas celui qui est juste plus petit";
			reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			if (numeroNouvelleCase == numeroArrivee)
			{
				//On repère la position des fautes dans le tableau positionFaux
				reperageFaux(reponseCheminGlobal);
				//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
				var nbDeCases=nbCasesX*nbCasesY;
							
				for (i = 1; i <= nbDeCases; i++)
				{
						fondMc["conteneurCarre" +i].enabled = false;
				}
				creationBulles();
				monTexte = "Bravo, tu est parvenu à la fin de ce labyrinthe!";
				reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);//On ajoute CINQ à la longueur de reponse
				reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
				if (reponse.length>5)
				{
					for (i = 0; i < reponseChemin.length; i ++)
					{
						if (reponseChemin[i] == "faux")
						{
							fauteRestante= true;
						}
						
					}
				}
			}
			
			if(reponse.length > 5 && fauteRestante == true){
				fondRepMc4.ouinonRougeBulle._visible = true;
				ouiRougeBtn._visible = true;
				nonRougeBtn._visible = true;
				fondRepMc4.ouinonRougeBulle.repMcTxt.text = "Tu as laissé des fautes.\nVeux-tu les voir?";
				_level0.rep_justeTemp = false;
				_level0.rep_juste = false;
			}
		break;
		break;
		case(Number(maCase[numeroAncienneCase].conteneur.carre.val2.text) < Number(maCase[numeroNouvelleCase].conteneur.carre.val2.text))://Si on a cliqué sur un nb premier plus grand, c'est faux. On met faux dans le tableau des réponses
			compteurFaux++;
			//trace("compteurFaux"+compteurFaux);
			mettreMur(numeroNouvelleCase, numeroAncienneCase);
			reponseChemin.push("faux");
			reponseCheminGlobal.push("faux");
			monTexte = maCase[numeroNouvelleCase].conteneur.carre.val2.text+" est premier mais plus grand que le nombre précedent";
			reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			if (numeroNouvelleCase == numeroArrivee)
			{
				//On repère la position des fautes dans le tableau positionFaux
				reperageFaux(reponseCheminGlobal);
				//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
				var nbDeCases=nbCasesX*nbCasesY;
							
				for (i = 1; i <= nbDeCases; i++)
				{
						fondMc["conteneurCarre" +i].enabled = false;
				}
				creationBulles();
				monTexte = "Bravo, tu est parvenu à la fin de ce labyrinthe!";
				reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);//On ajoute CINQ à la longueur de reponse
				reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
				if (reponse.length>5)
				{
					for (i = 0; i < reponseChemin.length; i ++)
					{
						if (reponseChemin[i] == "faux")
						{
							fauteRestante= true;
						}
						
					}
				}
			}
			
			if(reponse.length > 5 && fauteRestante == true){
				fondRepMc4.ouinonRougeBulle._visible = true;
				ouiRougeBtn._visible = true;
				nonRougeBtn._visible = true;
				fondRepMc4.ouinonRougeBulle.repMcTxt.text = "Tu as laissé des fautes.\nVeux-tu les voir?";
				_level0.rep_justeTemp = false;
				_level0.rep_juste = false;
			}
		break;
		case(Number(maCase[numeroAncienneCase].conteneur.carre.val2.text) == Number(maCase[numeroNouvelleCase].conteneur.carre.val2.text))://Si on a cliqué sur un nb premier égal, c'est faux. On met faux dans le tableau des réponses
			compteurFaux++;
			//trace("compteurFaux"+compteurFaux);
			mettreMur(numeroNouvelleCase, numeroAncienneCase);
			reponseChemin.push("faux");
			reponseCheminGlobal.push("faux");
			monTexte = maCase[numeroNouvelleCase].conteneur.carre.val2.text+" est premier mais égal au nombre précedent";
			reponse = reponse.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
			reponseGlobal = reponseGlobal.concat([nouvelleCase[0], nouvelleCase[1], ancienneCase[0],ancienneCase[1],monTexte]);
		break;
		default:
		break;
	}
	preparation_retour();
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
			var monNoM = avantCaseDesactivee
			
			oneText_fmt.color=Number(0x000000);
			
			//On repère le contenu de la case que l'on va désactiver
			//leTextCaseHaut=maCase[caseDesactivee].conteneur.carre.val1.text;
			leTextCaseBas=maCase[caseDesactivee].conteneur.carre.val2.text;
			maCase[caseDesactivee].setCouleurFond (maCouleur[caseDesactivee-1], couleurFondGrilleAlpha);
			//maCase[caseDesactivee].setTextH(leTextCaseHaut, texteHaut_fmt);
			//trace("texteHautG_fmt analyse"+texteHaut_fmt.size);
			maCase[caseDesactivee].oneText(leTextCaseBas, oneText_fmt);
			maCase[caseDesactivee].active = false;

			//On rend les fils invisibles l'action removeMovie clip détruit
			/*removeMovieClip(this["filHAUT" + monNoF]);
			removeMovieClip(this["filBAS" + monNoF]);
			removeMovieClip(this["filGAUCHE" + monNoF]);
			removeMovieClip(this["filDROITE" + monNoF]);*/
			/*this["filHAUT" + monNoF]._visible=false;
			this["filBAS" + monNoF]._visible=false;
			this["filGAUCHE" + monNoF]._visible=false;
			this["filDROITE" + monNoF]._visible=false;*/
										
			//On rend les flèches invisibles
			/*removeMovieClip(this["flecheHAUT" + monNo]);
			removeMovieClip(this["flecheBAS" + monNo]);
			removeMovieClip(this["flecheGAUCHE" + monNo]);
			removeMovieClip(this["flecheDROITE" + monNo]);*/
			this["flecheHAUT" + monNo]._visible=false;
			this["flecheBAS" + monNo]._visible=false;
			this["flecheGAUCHE" + monNo]._visible=false;
			this["flecheDROITE" + monNo]._visible=false;
										
			//On rend les murs invisibles
			/*removeMovieClip(this["murHAUT" + monNoM]);
			removeMovieClip(this["murBAS" + monNoM]);
			removeMovieClip(this["murGAUCHE" + monNoM]);
			removeMovieClip(this["murDROITE" + monNoM]);*/
			this["murHAUT" + monNoM]._visible=false;
			this["murBAS" + monNoM]._visible=false;
			this["murGAUCHE" + monNoM]._visible=false;
			this["murDROITE" + monNoM]._visible=false;

				
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