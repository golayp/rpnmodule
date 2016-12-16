/**
 * ...
 * @author J-M Luthi
 */
//////////////////////////////////////////////////////////////////////////POUR LE MODE NON-GUIDE, ON CACHE LA FENETRE///////////////////////////////////////
/*info_fenetre_Txt = "Choix GUIDÉ OU NON-GUIDÉ"; 

 //Mise en place de la fenêtre "Choix entre version guidée ou non"
fondMc.attachMovie("fenetre", "fenetre_Mc", 95);
fondMc.fenetre_Mc._x = 100;
fondMc.fenetre_Mc._y = 60;
fondMc.fenetre_Mc.info_fenetre.text = info_fenetre_Txt;

//Déplacement de la fenêtre liée à la barre supérieure de la fenêtre
fondMc.fenetre_Mc.barre_fenetre_Mc.onPress = function()
{
	startDrag(fondMc.fenetre_Mc, false, 10, 10, 300, 150);
}
fondMc.fenetre_Mc.barre_fenetre_Mc.onRelease = function()
{
	stopDrag();
}

fondMc.fenetre_Mc.barre_fenetre_Mc.onReleaseOutside = function()
{
	stopDrag();
}

//Cacher le bouton Fermer
fondMc.fenetre_Mc.fermer_btn._visible = false;

//Choix 1 : Version guidée		
posChoix_1_x = 50;
posChoix_1_y = 50;
posChoix_1_L = 240;
posChoix_1_H = 55;

fondMc.fenetre_Mc.createEmptyMovieClip ("fond_Choix_1_Mc",111);
fondMc.fenetre_Mc.fond_Choix_1_Mc.moveTo(posChoix_1_x,posChoix_1_y);
fondMc.fenetre_Mc.fond_Choix_1_Mc.beginFill ("0xFF00FF", 0);
fondMc.fenetre_Mc.fond_Choix_1_Mc.lineTo(posChoix_1_x+posChoix_1_L,posChoix_1_y);
fondMc.fenetre_Mc.fond_Choix_1_Mc.lineTo(posChoix_1_x+posChoix_1_L,posChoix_1_y+posChoix_1_H);
fondMc.fenetre_Mc.fond_Choix_1_Mc.lineTo(posChoix_1_x,posChoix_1_y+posChoix_1_H);
fondMc.fenetre_Mc.fond_Choix_1_Mc.lineTo(posChoix_1_x,posChoix_1_y);
fondMc.fenetre_Mc.fond_Choix_1_Mc.endFill;

fondMc.fenetre_Mc.fond_Choix_1_Mc.createTextField("guideTxt", 110, posChoix_1_x, posChoix_1_y, posChoix_1_L, posChoix_1_H);
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt._visible = true;
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.border = false;
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.multiline=true;
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.selectable=true;
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.wordWrap=true;
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.setNewTextFormat(texteFenetre_fmt);
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.text = " Version guidée:\n Ce mode indique s'il  y a une faute \n après chaque clic.";

fondMc.fenetre_Mc.fond_Choix_1_Mc.onRollOver = function ()
{
	fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.border = true;
}
fondMc.fenetre_Mc.fond_Choix_1_Mc.onRollOut = function ()
{
	fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.border = false;
}
fondMc.fenetre_Mc.fond_Choix_1_Mc.onRelease = function ()
{
	fondMc.fenetre_Mc._visible = false;
	_level0.mode = true;
	fondMc["conteneurCarre" +departX].enabled = true;
	maCase[departX].active = true;
	consigneTxt._visible=false;
}

//Bouton 1 associé au choix 1
fondMc.fenetre_Mc.attachMovie ("btnChoix","caseChoix_1",112);
fondMc.fenetre_Mc.caseChoix_1._x = posChoix_1_x - 25;
fondMc.fenetre_Mc.caseChoix_1._y = posChoix_1_y + 5;
fondMc.fenetre_Mc.caseChoix_1._width = 20;
fondMc.fenetre_Mc.caseChoix_1._height = 20;

fondMc.fenetre_Mc.caseChoix_1.onRollOver = function ()
{
	fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.border = true;
}
fondMc.fenetre_Mc.caseChoix_1.onRollOut = function ()
{
	fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.border = false;
}
fondMc.fenetre_Mc.caseChoix_1.onRelease = function()
{
	fondMc.fenetre_Mc._visible = false;
	_level0.mode = true;
	fondMc["conteneurCarre" +departX].enabled = true;
	maCase[departX].active = true;
	consigneTxt._visible=false;
}


//Choix 2 : Version non-guidée		
posChoix_2_x = 50;
posChoix_2_y = 120;
posChoix_2_L = 240;
posChoix_2_H = 55;

fondMc.fenetre_Mc.createEmptyMovieClip ("fond_Choix_2_Mc",121);
fondMc.fenetre_Mc.fond_Choix_2_Mc.moveTo(posChoix_2_x,posChoix_2_y);
fondMc.fenetre_Mc.fond_Choix_2_Mc.beginFill ("0xFF00FF", 0);
fondMc.fenetre_Mc.fond_Choix_2_Mc.lineTo(posChoix_2_x+posChoix_2_L,posChoix_2_y);
fondMc.fenetre_Mc.fond_Choix_2_Mc.lineTo(posChoix_2_x+posChoix_2_L,posChoix_2_y+posChoix_2_H);
fondMc.fenetre_Mc.fond_Choix_2_Mc.lineTo(posChoix_2_x,posChoix_2_y+posChoix_2_H);
fondMc.fenetre_Mc.fond_Choix_2_Mc.lineTo(posChoix_2_x,posChoix_2_y);
fondMc.fenetre_Mc.fond_Choix_2_Mc.endFill;

fondMc.fenetre_Mc.fond_Choix_2_Mc.createTextField("nonGuideTxt", 120, posChoix_2_x, posChoix_2_y, posChoix_2_L, posChoix_2_H);
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt._visible = true;
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.border = false;
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.multiline=true;
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.selectable=true;
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.wordWrap=true;
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.setNewTextFormat(texteFenetre_fmt);
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.text = " Version NON guidée:\n Ce mode n'indique plus les fautes\n après chaque clic.";

fondMc.fenetre_Mc.fond_Choix_2_Mc.onRollOver = function ()
{
	fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.border = true;
}
fondMc.fenetre_Mc.fond_Choix_2_Mc.onRollOut = function ()
{
	fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.border = false;
}
fondMc.fenetre_Mc.fond_Choix_2_Mc.onRelease = function ()
{
	fondMc.fenetre_Mc._visible = false;
	_level0.mode = false;
	fondMc["conteneurCarre" +departX].enabled = true;
	maCase[departX].active = true;
	consigneTxt._visible=false;
}

//Bouton 2 associé au choix 2
fondMc.fenetre_Mc.attachMovie ("btnChoix","caseChoix_2",122);
fondMc.fenetre_Mc.caseChoix_2._x = posChoix_2_x - 25;
fondMc.fenetre_Mc.caseChoix_2._y = posChoix_2_y + 5;
fondMc.fenetre_Mc.caseChoix_2._width = 20;
fondMc.fenetre_Mc.caseChoix_2._height = 20;

fondMc.fenetre_Mc.caseChoix_2.onRollOver = function ()
{
	fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.border = true;
}
fondMc.fenetre_Mc.caseChoix_2.onRollOut = function ()
{
	fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.border = false;
}
fondMc.fenetre_Mc.caseChoix_2.onRelease = function()
{
	fondMc.fenetre_Mc._visible = false;
	_level0.mode = false;
	fondMc["conteneurCarre" +departX].enabled = true;
	maCase[departX].active = true;
	flechesVisibles(true);
	consigneTxt._visible=false;
}
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
			//maCase[numeroCaseActuelle].setCouleurFond (maCouleur[numeroCaseActuelle-1], couleurFondGrilleAlpha);
			//maCase[numeroCaseActuelle].setTextH(textCaseHaut, texteHaut_fmt);
			//maCase[numeroCaseActuelle].setTextB(textCaseBas, texteESG_fmt);
		
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
							//maCase[caseDesactivee].setCouleurFond (maCouleur[caseDesactivee-1], couleurFondGrilleAlpha);
							//maCase[caseDesactivee].setTextH(leTextCaseHaut, texteHaut_fmt);
							//maCase[caseDesactivee].setTextB(leTextCaseBas, texteBas_fmt);
							//maCase[caseDesactivee].active = false;

							//On rend les fils invisibles l'action removeMovie clip détruit
							/*removeMovieClip(this["filHAUT" + monNoF]);
							removeMovieClip(this["filBAS" + monNoF]);
							removeMovieClip(this["filGAUCHE" + monNoF]);
							removeMovieClip(this["filDROITE" + monNoF]);*/
							//this["filHAUT" + monNoF]._visible=false;
//							this["filBAS" + monNoF]._visible=false;
//							this["filGAUCHE" + monNoF]._visible=false;
//							this["filDROITE" + monNoF]._visible=false;
														
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
					}
				}
			parcours.push([caseActuelleX, caseActuelleY]);
			caesClicables(numeroCaseActuelle);
			
			
		break;
	}
}
