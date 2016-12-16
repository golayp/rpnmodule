/**
 * ...
 * @author J-M Luthi
 */
 
function caesClicables (numero)
{
	//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
	var nbCases:Number=nbCasesX*nbCasesY;
				
	for (i = 1; i <= nbCases; i++)
	{
			fondMc["conteneurCarre" +i].enabled = false;
	}
	for (j = 1; j <= parcours.length; j++)
	{
		//La prmière case doit être selectionnable et pressée
		fondMc["conteneurCarre" +departX].enabled = true;
		numero_j = noCase(parcours[j][0], parcours[j][1]);
		fondMc["conteneurCarre" +numero_j].enabled = true;
		maCase[numero_j].active = true;
	}
	
	switch (false)
	{
		
		case (numero != noCaseArrivee)://Si la case est la case d'arrivée, la dernière solution est de rebrousser chemin
		fondMc["conteneurCarre" +numero].enabled = false;
		break;
		case(maCase[numero - nbCasesX].presse)://En dessus
			fondMc["conteneurCarre" +(numero - nbCasesX)].enabled = true;
		case(maCase[numero - 1].presse)://A gauche
			fondMc["conteneurCarre" +(numero - 1)].enabled = true;
		case(maCase[numero + 1].presse)://A droite
			fondMc["conteneurCarre" +(numero + 1)].enabled = true;
		case(maCase[numero + nbCasesX].presse)://En dessous
			fondMc["conteneurCarre" +(numero + nbCasesX)].enabled = true;
		default:
		break;
	}

}
function selection(caseActuelleX,caseActuelleY)
{
	numeroCaseActuelle = noCase(caseActuelleX, caseActuelleY);
	caesClicables(numeroCaseActuelle);
	switch (true)
	{
		case(parcours.length == 0)://On est au début si on clique pas sur la case de départ, les suivantes sont clicables et on met les coordonnées de départ dans parcours
			parcours.push([caseActuelleX, caseActuelleY]);
			reponseChemin.push("juste");
			maCase[numeroCaseActuelle].couleurComplementaire(fondMc["conteneurCarre" + numeroCaseActuelle]);
			//trace ("parcours"+parcours);
			caesClicables(numeroCaseActuelle);
		break;
		case (parcours[parcours.length - 1].toString() == tableauCoordonnees.toString()) ://Si on clique sur la drenière case, on rend toujours les suivantes active mais on en fait rien d'autre
			caesClicables(numeroCaseActuelle);
			//trace ("fin tableau = dernière case" + parcours);
		break;
		default ://Pour tous les autres cas, on parcours le tableau pour voir si la case a déjà été sélectionnée.
			for (p = 0; p < parcours.length-1; p++)
				{
					//Si on retrouve les coordonnées de la dernière case cliquée (tableauCoordonnees) dans parcours, on coupe parcours
					if (parcours[p].toString()==tableauCoordonnees.toString())
					{
						var parcoursTemp:Array; 
						//On met la fin de parcours dans parcoursTemp (ça ne coupe pas parcours)
						parcoursTemp = parcours.slice(p);
						//On coupe parcours
						parcours.splice(p);
						//On enleve toutes les valeurs juste/faux des cases ou on est revenu en arrière
						reponseChemin.splice(p);
						//On repère si il y a encore des fautes
						var monCompteurFautes:Number =0;
						for(i=0;i<reponseChemin.length;i++)
						{
							if (reponseChemin[i]=="faux")
							{
								monCompteurFautes++;
							}
						}
						
						
						//On eélimine toute les fautes faites jusqu'à la coupure
						fautes=monCompteurFautes*5;
						reponse.splice(fautes);
						trace("reponseChemin clicable"+reponseChemin);
						trace("reponse clicable"+reponse);
						trace("reponseGlobal clicable"+reponseGlobal);
						
						//trace(reponseChemin);
						//On rend les cases qui suivent la coupure non selectionnées
						for (m = 1; m <=parcoursTemp.length; m++)
						{
							var caseDesactivee:Number = parcoursTemp[m][0] + (parcoursTemp[m][1] - 1) * nbCasesX;
							var avantCaseDesactivee:Number = parcoursTemp[m-1][0] + (parcoursTemp[m-1][1] - 1) * nbCasesX;
							var monNo:Number = 5000+avantCaseDesactivee;
							var monNoF:Number = 1200+avantCaseDesactivee;
							maCase[caseDesactivee].couleurComplementaireB(fondMc["conteneurCarre" + caseDesactivee]);
							maCase[caseDesactivee].active = false;
							//On rend les flèches invisibles
							//trace ("this pour clicable"+this["flecheDROITE"+monNo]);
							/*this["flecheHAUT"+monNo]._visible = false;
							this["flecheBAS"+monNo]._visible = false;
							this["flecheGAUCHE"+monNo]._visible = false;
							this["flecheDROITE"+monNo]._visible = false;*/
							//trace("AVANT this[flecheDROITE + monNo]"+this["flecheDROITE" + monNo]);
							removeMovieClip(this["filHAUT" + monNoF]);
							removeMovieClip(this["filBAS" + monNoF]);
							removeMovieClip(this["filGAUCHE" + monNoF]);
							removeMovieClip(this["filDROITE" + monNoF]);
							removeMovieClip(this["flecheHAUT" + monNo]);
							removeMovieClip(this["flecheBAS" + monNo]);
							removeMovieClip(this["flecheGAUCHE" + monNo]);
							removeMovieClip(this["flecheDROITE" + monNo]);
							//trace("APRES this[flecheDROITE + monNo]"+this["flecheDROITE" + monNo]);
							fondMc["conteneurCarre" +caseDesactivee];
						}
					}
				}
			parcours.push([caseActuelleX, caseActuelleY]);
			caesClicables(numeroCaseActuelle);
			
			
		break;
	}
}





