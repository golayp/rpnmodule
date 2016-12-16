/**
 * ...
 * @author Jean-Michel Luthi
 */
 
import minotaureCase6;

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
		maCase[nbTot] = new minotaureCase6(coteCase, j, i, marge, true, fondMc["conteneurCarre" + nbTot], texteBas_fmt);

		//On a fait un tableau dans init qui attribue la couleur à chaque case.
		maCase[nbTot].setCouleurFond (maCouleur[nbTot-1], couleurFondGrilleAlpha);
		//trace("maCouleur[nbTot-1]: "+maCouleur[nbTot-1])
		//On inverse la couleur lorsqu'on est sur la case
		fondMc["conteneurCarre" + nbTot].onRollOver = function() 
		{
			switch (true)
			{
				case(Number(this._name.substring(14))== departX):
				break;
				case(Number(this._name.substring(14))== arriveeX):
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
			texteESG_fmt.color=Number(0xffffff);
			texteHaut_fmt.color=Number(0xffffff);
			texteBas_fmt.color=Number(0xffffff);
//			maCase[Number(this._name.substring(14))].changeCouleurFond=false;
//			trace("_level0.textCaseHaut"+_level0.textCaseHaut);
//			trace("_level0.textCaseBas"+_level0.textCaseBas);
			fondMc.mdGuide_Btn._visible = false;
			fondMc.mdGuideActif_Btn._visible = false;
			switch (true)
			{
				case(Number(this._name.substring(14)) == departX && fondMc["conteneurCarre" +departX].enabled == true && parcours.length == 0):	
					maCase[departX].couleurComplementaire(this);
					caesClicables(departX);
					parcours.push([departX, departY]);
				break;
				
				case(Number(this._name.substring(14))== noCase(arriveeX,arriveeY)):				
					maCase[arriveeX].couleurComplementaire(this);
				
				case (fondMc["conteneurCarre" +Number(this._name.substring(14))].enabled):
					if(Number(this._name.substring(14))== noCase(departX,departY))
					{
						maCase[noCase(departX,departY)].couleurComplementaire(this);

					}else if(Number(this._name.substring(14))!= noCase(arriveeX,arriveeY)){
				
						maCase[Number(this._name.substring(14))].couleurComplementaire(this);

					}
					maCase[Number(this._name.substring(14))].active = true;
					tableauCoordonnees = maCase[Number(this._name.substring(14))].retourCoordonneeCaseClasse(Number(this._name.substring(14)));
					selectionne(tableauCoordonnees[0] , tableauCoordonnees[1]);				
					if(retourArriere==false)
					{
						//On lance l'analyse en mode guidé ou non guidé.
						switch(_level0.mode)
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
							xyz["filDROITE" + nof]._visible=false;
							break;
							case -1:
							fleche(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "GAUCHE");
							//fil(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "GAUCHE");
							no=5000+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["flecheGAUCHE" + no]._visible=true;
							nof= 1200+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["filGAUCHE" + nof]._visible=false;
							break;
							case -nbCasesX:
							fleche(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "HAUT");
							//fil(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "HAUT");
							no=5000+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["flecheHAUT" + no]._visible=true;
							nof= 1200+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["filHAUT" + nof]._visible=false;
							break;
							case nbCasesX:
							fleche(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "BAS");
							//fil(maCase[noCase(avantDerniereCase[0], avantDerniereCase[1])], "parcours", "BAS");
							no=5000+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["flecheBAS" + no]._visible=true;
							nof= 1200+noCase(avantDerniereCase[0], avantDerniereCase[1]);
							xyz["filBAS" + nof]._visible=false;
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

/*_level0.mode= false;
fondMc.fenetre_Mc._visible = false;
fondMc["conteneurCarre" +departX].enabled = true;
maCase[departX].active = true;
flechesVisibles(true);*/

///////////////////////////////////////////////////////////////////////////////////Fin de l'activation///////////////////////////////////////////////

