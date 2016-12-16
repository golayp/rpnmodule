/**
 * ...
 * @author J-M Luthi
 */


fondMc.attachMovie("btnVerifier", "verifie_Btn", 99);
fondMc.verifie_Btn._x = 600;
fondMc.verifie_Btn._y = 300;
fondMc.verifie_Btn._xscale = 70;
fondMc.verifie_Btn._yscale = 70;
fondMc.verifie_Btn._visible = false;


/////////////////////////////////////////////////////////////////////////////////FIN DE LA FENETRE ON ACTIVE LA PREMIüRE CASE///////////////////////////////////////////////////////////
_level0.mode= false;
fondMc.fenetre_Mc._visible = false;
fondMc["conteneurCarre" +departX].enabled = true;
maCase[departX].active = true;
flechesVisibles(true);
///////////////////////////////////////////////////////////////////////////////////Fin de l'activation///////////////////////////////////////////////

fondMc.verifie_Btn.onRelease = function()
{
	fondMc.verifie_Btn._visible = false;
	verifier();
}
function selectionne(caseActuelleX,caseActuelleY)
{
	numeroCaseActuelle = noCase(caseActuelleX, caseActuelleY);
	caesClicables(numeroCaseActuelle);
	
	switch (true)
	{

		case(numeroCaseActuelle == noCase(arriveeX, arriveeY)):
			maCase[numeroCaseActuelle].couleurComplementaire(fondMc["conteneurCarre" +numeroCaseActuelle]);
			parcours.push([caseActuelleX, caseActuelleY]);

		
		break;
		case(parcours.length == 0)://On est au début si on clique pas sur la case de départ, les suivantes sont clicables et on met les coordonnées de départ dans parcours			
			parcours.push([caseActuelleX, caseActuelleY]);
			reponseChemin.push("juste");
			caesClicables(numeroCaseActuelle);
		break;
		case (parcours[parcours.length - 1].toString() == tableauCoordonnees.toString()) ://Si on clique sur la drenière case, on rend toujours les suivantes active mais on en fait rien d'autre
			caesClicables(numeroCaseActuelle);
		break;
		default ://Pour tous les autres cas, on parcours le tableau pour voir si la case a déjà été sélectionnée.
			for (p = 0; p < parcours.length-1; p++)
				{
					//Si on retrouve les coordonnées de la dernière case cliquée (tableauCoordonnees) dans parcours, on coupe parcours
					if (parcours[p].toString()==tableauCoordonnees.toString())
					{
						retourArriere=true;
						var parcoursTemp:Array; 
						//On met la fin de parcours dans parcoursTemp (ça ne coupe pas parcours)
						parcoursTemp = parcours.slice(p);
						//On coupe parcours
						parcours.splice(p);
						//On enleve toutes les valeurs juste/faux des cases ou on est revenu en arrière
						reponseChemin.splice(p);
						//On repère si il y a encore des fautes
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
						
						monCompteurFautes =0;
						//On rend les cases qui suivent la coupure non selectionnées
						for (m = 1; m <=parcoursTemp.length; m++)
						{
							var caseDesactivee = parcoursTemp[m][0] + (parcoursTemp[m][1] - 1) * nbCasesX;
							var avantCaseDesactivee = parcoursTemp[m-1][0] + (parcoursTemp[m-1][1] - 1) * nbCasesX;
							var monNo = 5000+avantCaseDesactivee;
							var monNoF = 1200+avantCaseDesactivee;
							var monNoM = avantCaseDesactivee
							
							//On repère le contenu de la case que l'on va désactiver
							leTextCaseHaut=maCase[caseDesactivee].conteneur.carre.val1.text;
							leTextCaseBas=maCase[caseDesactivee].conteneur.carre.val2.text;
							//On met le texte en noir
							texteESG_fmt.color=Number(0x000000);
							texteHaut_fmt.color=Number(0x000000);
							texteBas_fmt.color = Number(0x000000);
							maCase[caseDesactivee].couleurComplementaireB(fondMc["conteneurCarre" +caseDesactivee]);

							this["flecheHAUT" + monNo]._visible=false;
							this["flecheBAS" + monNo]._visible=false;
							this["flecheGAUCHE" + monNo]._visible=false;
							this["flecheDROITE" + monNo]._visible=false;

							this["murHAUT" + monNoM]._visible=false;
							this["murBAS" + monNoM]._visible=false;
							this["murGAUCHE" + monNoM]._visible=false;
							this["murDROITE" + monNoM]._visible=false;

						}
					}
				}
			parcours.push([caseActuelleX, caseActuelleY]);
			caesClicables(numeroCaseActuelle);
			
			
		break;
	}
}
