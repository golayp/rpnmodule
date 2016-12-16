/**
 * ...
 * @author J-M Luthi
 */
 
function caesClicables (numero)
{
	//On remet toutes les cases non selectionnables pour mettre seulement les bonnes 
	var nbCases=nbCasesX*nbCasesY;
				
	for (i = 1; i <= nbCases; i++)
	{
			fondMc["conteneurCarre" +i].enabled = false;
	}
	for (j = 1; j <= parcours.length; j++)
	{
		//La prmière case doit être selectionnable et pressée
		fondMc["conteneurCarre" +departX].enabled = true;
		maCase[departX].active = true;
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






