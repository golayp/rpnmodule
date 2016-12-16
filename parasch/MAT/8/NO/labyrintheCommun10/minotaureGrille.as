/**
 * ...
 * @author Jean-Michel Luthi
 */
 
import minotaureCase;

//On initialise le compteur de cases
var nbTot : Number = 1;

//On crée un tableau qui contiendra le nom des occurences des cases
var maCase : Array = new Array();

for (i = 1; i <= nbCasesY; i++)
{
	
	for (j = 1; j <= nbCasesX; j++)
	{

		fondMc.createEmptyMovieClip("conteneurCarre" + nbTot, nbTot);
		//trace("nbTot" +nbTot );
		
		monClip = "conteneurCarre" + nbTot;
		//on crée les cases
		maCase[nbTot] = new minotaureCase(coteCase, j, i, marge, true, fondMc["conteneurCarre" + nbTot], fondMc.coordCaseX, fondMc.coordCaseY);
		//maCase[nbTot].setCouleurFond (couleurFondGrille, couleurFondGrilleAlpha);
		
///////////////////ON PEUT CHANGER LES COULEURS, LA BASE 16 EST TRANSFORMéE EN BASE 10 A VOIR LORSQU'ON AJOUTE DE LA BSAE 10 COMMENT VARIENT LES COULEURS//////////////// 
		//nouvelleCouleur=couleurFondGrille +(i-1)* nbCasesX *16 + j*16;
		//nouvelleCouleur=deciHexa(Number(couleurFondGrille) +nbTot*16);
		//trace("case: "+nbTot+" nonouvelleCouleur: "+deciHexa(nouvelleCouleur));
		
		maCase[nbTot].setCouleurFond (maCouleur[nbTot-1], couleurFondGrilleAlpha);
		//maCase[nbTot].setCouleurFond (couleurFondGrille, couleurFondGrilleAlpha);
		//trace("couleurFondGrille + (i + j) * 30" +couleurFondGrille + (i + j) * 30 );
	
		//On inverse la couleur lorsqu'on est sur la case
		fondMc["conteneurCarre" + nbTot].onRollOver = function() 
		{
			switch (true)
			{
				case(Number(this._name.substring(14))== departX):
				break;
				case(fondMc["conteneurCarre" +Number(this._name.substring(14))].enabled && maCase[Number(this._name.substring(14))].active):
					maCase[Number(this._name.substring(14))].couleurComplementaire(this);
					break;
				case (fondMc["conteneurCarre" +Number(this._name.substring(14))].enabled):
					maCase[Number(this._name.substring(14))].couleurComplementaire(this);
				break;
				default:
				break;
			}
		}
		
		//On remet la couleur lorsqu'on sor de la case
		fondMc["conteneurCarre" + nbTot].onRollOut = function() 
		{
			switch (true)
			{
				case(Number(this._name.substring(14))== departX):
				break;
				case(fondMc["conteneurCarre" +Number(this._name.substring(14))].enabled && maCase[Number(this._name.substring(14))].active==true):
					maCase[Number(this._name.substring(14))].couleurComplementaire(this);
					break;
				case (fondMc["conteneurCarre" +Number(this._name.substring(14))].enabled):
					maCase[Number(this._name.substring(14))].couleurComplementaireB(this);
				break;
				default:
				break;
			}
		}
		//on fait une fonction qui retourne les coordonnées de la case cliquée
		fondMc["conteneurCarre" + nbTot].onRelease = function()	
		{
			fondMc.mdGuide_Btn._visible = false;
			fondMc.mdGuideActif_Btn._visible = false;
			tableauCoordonnees = maCase[Number(this._name.substring(14))].retourCoordonneeCaseClasse(Number(this._name.substring(14)));
			switch (true)
			{
				case (maCase[Number(this._name.substring(14))].active):
					maCase[Number(this._name.substring(14))].couleurComplementaire(this);
					maCase[Number(this._name.substring(14))].active = false;
				break;
				case (fondMc["conteneurCarre" +Number(this._name.substring(14))].enabled):
					maCase[Number(this._name.substring(14))].couleurComplementaire(this);
					maCase[Number(this._name.substring(14))].active = true;
				break;
				default:	
				break;
			}
			selection(tableauCoordonnees[0] , tableauCoordonnees[1]);
			avantDerniereCase[0] = parcours[parcours.length - 2][0];
			avantDerniereCase[1] = parcours[parcours.length - 2][1];
			//On lance l'analyse en mode guidé ou non guidé.
			//trace(_global.mode);
			switch(_global.mode)
			{
				case true:
				analyseGuide(avantDerniereCase, tableauCoordonnees);
				break;
				case false:
				analyse(avantDerniereCase, tableauCoordonnees);
				break;
			}
			
			//mur(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "DROITE");//juste pour tester
			
			switch(Number(this._name.substring(14))-noCase(avantDerniereCase[0],avantDerniereCase[1]))
			{
				
				case 1:
				fleche(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "DROITE");
				fil(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "DROITE");
				flechesVisibles(true, "parcours");
				//filVisible(true, "parcours");
				//trace("flèche droite");
				break;
				case -1:
				fleche(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "GAUCHE");
				fil(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "GAUCHE");
				flechesVisibles(true, "parcours");
				//filVisible(true, "parcours");
				//trace("flèche gauche");
				break;
				case -nbCasesX:
				fleche(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "HAUT");
				fil(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "HAUT");
				flechesVisibles(true, "parcours");
				//filVisible(true, "parcours");
				//trace("flèche haut");
				break;
				case nbCasesX:
				fleche(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "BAS");
				fil(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "BAS");
				flechesVisibles(true, "parcours");
				//filVisible(true, "parcours");
				//trace("flèche bas");
				break;
				default:
				//trace("pas dans le switch flèche "+avantDerniereCase[0]);
				//trace("avantDerniereCase[1] flèche "+avantDerniereCase[1]);
				
			}
			
			 
		}
		
		nbTot++;
		
	}
}

//on effectue selection pour rendre clicables les cases autour, le code aurait pu être simplifié mais comme cela on peut partir de n'importe où
//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
	var nbCases:Number=nbCasesX*nbCasesY;
				
	for (i = 1; i <= nbCases; i++)
	{
			fondMc["conteneurCarre" +i].enabled = false;
	}

//selection(maCase[departX].posX, maCase[departX].posY);