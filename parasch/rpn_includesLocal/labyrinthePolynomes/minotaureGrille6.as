/**
 * ...
 * @author Jean-Michel Luthi
 */
 
import minotaureCasePol6;

//On initialise le compteur de cases
var nbTot : Number = 1;

//On crée un tableau qui contiendra le nom des occurences des cases
var maCase : Array = new Array();
//Pour les fèches, on définit this ici, le fond.
xyz=this;

for (i = 1; i <= nbCasesY; i++)
{
	
	for (j = 1; j <= nbCasesX; j++)
	{

		fondMc.createEmptyMovieClip("conteneurCarre" + nbTot, nbTot);
		
		monClip = "conteneurCarre" + nbTot;
		//on crée les cases
		maCase[nbTot] = new minotaureCasePol6(coteCase, j, i, marge, true, fondMc["conteneurCarre" + nbTot],texteBaspetit_fmt);
		//taille, positionX, positionY, margeGrille, bordure, clipConteneur, formatTemp

		//On a fait un tableau dans init qui attribue la couleur à chaque case.
		maCase[nbTot].setCouleurFond (maCouleur[nbTot-1], couleurFondGrilleAlpha);
		
		//On inverse la couleur lorsqu'on est sur la case
		fondMc["conteneurCarre" + nbTot].onRollOver = function() 
		{
			texteESG_fmt.color=Number(0xffffff);
			texteHautpetit_fmt.color=Number(0xffffff);
			texteBaspetit_fmt.color=Number(0xffffff);
			_global.textCaseHaut=maCase[Number(this._name.substring(14))].conteneur.carre.val1.text;
			_global.textCaseBas=maCase[Number(this._name.substring(14))].conteneur.carre.val2.text;
			trace("_global.textCaseHaut"+_global.textCaseHaut);
			trace("_global.textCaseBas"+_global.textCaseBas);

			switch (true)
			{
				case(Number(this._name.substring(14))== departX):
					maCase[departX].setCouleurFond (Number(couleurDepartArrivee), couleurFondGrilleAlpha);
					maCase[departX].setTextH(textCaseHaut, texteESG_fmt);
					maCase[departX].setTextB(textCaseBas, texteBaspetit_fmt);

				break;
				case(Number(this._name.substring(14))== noCase(arriveeX,arriveeY)):				
					maCase[noCase(arriveeX,arriveeY)].setCouleurFond (Number(couleurDepartArrivee), couleurFondGrilleAlpha);
					maCase[noCase(arriveeX,arriveeY)].setTextH(textCaseHaut, texteHautpetit_fmt);
					maCase[noCase(arriveeX,arriveeY)].setTextB(textCaseBas, texteESG_fmt);
				break;
				case(fondMc["conteneurCarre" +Number(this._name.substring(14))].enabled==true && maCase[Number(this._name.substring(14))].active==true):				
					maCase[Number(this._name.substring(14))].setCouleurFond (Number(0xffffff)-maCouleur[Number(this._name.substring(14))-1], couleurFondGrilleAlpha);
					maCase[Number(this._name.substring(14))].setTextH(textCaseHaut, texteHautpetit_fmt);
					maCase[Number(this._name.substring(14))].setTextB(textCaseBas, texteBaspetit_fmt);
					break;
				case (fondMc["conteneurCarre" +Number(this._name.substring(14))].enabled):			
					maCase[Number(this._name.substring(14))].setCouleurFond (Number(0xffffff)-maCouleur[Number(this._name.substring(14))-1], couleurFondGrilleAlpha);
					maCase[Number(this._name.substring(14))].setTextH(textCaseHaut, texteHautpetit_fmt);
					maCase[Number(this._name.substring(14))].setTextB(textCaseBas, texteBaspetit_fmt);
				break;
				default:
				break;
			}
		}
		
		//On remet la couleur lorsqu'on sor de la case
		fondMc["conteneurCarre" + nbTot].onRollOut = function() 
		{
			texteESG_fmt.color=Number(0x000000);
			texteHautpetit_fmt.color=Number(0x000000);
			texteBaspetit_fmt.color=Number(0x000000);
			switch (true)
			{
				case(Number(this._name.substring(14))== departX):				
					maCase[departX].setCouleurFond (Number(couleurDepartArrivee), couleurFondGrilleAlpha);
					maCase[departX].setTextH(textCaseHaut, texteES_fmt);
					maCase[departX].setTextB(textCaseBas, texteBaspetit_fmt);
				break;
				case(Number(this._name.substring(14))== noCase(arriveeX,arriveeY)):				
					maCase[noCase(arriveeX,arriveeY)].setCouleurFond (Number(couleurDepartArrivee), couleurFondGrilleAlpha);
					maCase[noCase(arriveeX,arriveeY)].setTextH(textCaseHaut, texteHautpetit_fmt);
					maCase[noCase(arriveeX,arriveeY)].setTextB(textCaseBas, texteES_fmt);
				break;
				case(fondMc["conteneurCarre" +Number(this._name.substring(14))].enabled==true && maCase[Number(this._name.substring(14))].active==true):
					texteESG_fmt.color=Number(0xffffff);
					texteHautpetit_fmt.color=Number(0xffffff);
					texteBaspetit_fmt.color=Number(0xffffff);
					maCase[Number(this._name.substring(14))].setCouleurFond (Number(0xffffff)-maCouleur[Number(this._name.substring(14))-1], couleurFondGrilleAlpha);
					maCase[Number(this._name.substring(14))].setTextH(textCaseHaut, texteHautpetit_fmt);
					maCase[Number(this._name.substring(14))].setTextB(textCaseBas, texteBaspetit_fmt);

				break;
				case (fondMc["conteneurCarre" +Number(this._name.substring(14))].enabled==true):					
					maCase[Number(this._name.substring(14))].setCouleurFond (maCouleur[Number(this._name.substring(14))-1], couleurFondGrilleAlpha);
					maCase[Number(this._name.substring(14))].setTextH(textCaseHaut, texteHautpetit_fmt);
					maCase[Number(this._name.substring(14))].setTextB(textCaseBas, texteBaspetit_fmt);

				break;
				default:
				break;
			}
		}
		//on fait une fonction qui retourne les coordonnées de la case cliquée
		fondMc["conteneurCarre" + nbTot].onRelease = function()	
		{
			texteESG_fmt.color=Number(0xffffff);
			texteHautpetit_fmt.color=Number(0xffffff);
			texteBaspetit_fmt.color=Number(0xffffff);
//			trace("_global.textCaseHaut"+_global.textCaseHaut);
//			trace("_global.textCaseBas"+_global.textCaseBas);
			fondMc.mdGuide_Btn._visible = false;
			fondMc.mdGuideActif_Btn._visible = false;
			switch (true)
			{
				case(Number(this._name.substring(14))== departX && fondMc["conteneurCarre" +departX].enabled==true && parcours.length==0):					
					maCase[departX].setCouleurFond (Number(couleurDepartArrivee), couleurFondGrilleAlpha);
					maCase[departX].setTextH(textCaseHaut, texteESG_fmt);
					maCase[departX].setTextB(textCaseBas, texteBaspetit_fmt);
					caesClicables(departX);
					parcours.push([departX, departY]);
				break;
				case(Number(this._name.substring(14))== noCase(arriveeX,arriveeY)):				
					maCase[noCase(arriveeX,arriveeY)].setCouleurFond (Number(couleurDepartArrivee), couleurFondGrilleAlpha);
					maCase[noCase(arriveeX,arriveeY)].setTextH(textCaseHaut, texteHautpetit_fmt);
					maCase[noCase(arriveeX,arriveeY)].setTextB(textCaseBas, texteESG_fmt);
				
				case (fondMc["conteneurCarre" +Number(this._name.substring(14))].enabled):
					maCase[Number(this._name.substring(14))].setCouleurFond (Number(0xffffff)-maCouleur[Number(this._name.substring(14)-1)], couleurFondGrilleAlpha);
					maCase[Number(this._name.substring(14))].setTextH(textCaseHaut, texteHautpetit_fmt);
					maCase[Number(this._name.substring(14))].setTextB(textCaseBas, texteBaspetit_fmt);
					maCase[Number(this._name.substring(14))].active = true;
					tableauCoordonnees = maCase[Number(this._name.substring(14))].retourCoordonneeCaseClasse(Number(this._name.substring(14)));
					selectionne(tableauCoordonnees[0] , tableauCoordonnees[1]);				
					if(retourArriere==false)
					{
						//On lance l'analyse en mode guidé ou non guidé.
						switch(_global.mode)
						{
							case true:
							analyseGuide(avantDerniereCase, tableauCoordonnees);
							break;
							case false:
							analyse(avantDerniereCase, tableauCoordonnees);
							break;
						}
					
						switch(Number(this._name.substring(14))-noCase(avantDerniereCase[0],avantDerniereCase[1]))
						{
							
							case 1:
							fleche(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "DROITE");
							//fil(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "DROITE");
							no=5000+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["flecheDROITE" + no]._visible=true;
							nof= 1200+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["filDROITE" + no]._visible=true;
							break;
							case -1:
							fleche(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "GAUCHE");
							//fil(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "GAUCHE");
							no=5000+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["flecheGAUCHE" + no]._visible=true;
							nof= 1200+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["filGAUCHE" + no]._visible=true;
							break;
							case -nbCasesX:
							fleche(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "HAUT");
							//fil(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "HAUT");
							no=5000+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["flecheHAUT" + no]._visible=true;
							nof= 1200+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["filHAUT" + no]._visible=true;
							break;
							case nbCasesX:
							fleche(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "BAS");
							//fil(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "BAS");
							no=5000+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["flecheBAS" + no]._visible=true;
							nof= 1200+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["filBAS" + no]._visible=true;
							break;
							
							default:
							break;
							
						}
					}else
					{
						retourArriere=false;
					}
						avantDerniereCase[0] = parcours[parcours.length - 1][0];
						avantDerniereCase[1] = parcours[parcours.length - 1][1];
				break;
				default:	
				break;
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

///////////////////////////////////////////////début de l'activation de la case départ sans analyse guidée////////////////////////////////////////////////////

/*_global.mode= false;
fondMc.fenetre_Mc._visible = false;
fondMc["conteneurCarre" +departX].enabled = true;
maCase[departX].active = true;
flechesVisibles(true);*/

///////////////////////////////////////////////////////////////////////////////////Fin de l'activation///////////////////////////////////////////////

