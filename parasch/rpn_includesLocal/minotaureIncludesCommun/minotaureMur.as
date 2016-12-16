/**
 * ...
 * @author Michel Roquier
 */
 
/*
//Initialisation des caractéristiques des lignes utilisées pour montrer les fautes
var couleurMur = 0xff0000;//couleur de la flèche
var couleurBordMur = 0x990000;//couleur du bord de la flèche
var epaisseurBordMur = 1;//épaisseur du bord de la flèche
*/

murConstruitSurChemin=new Array();
//Fonction dessinant un mur lié à chaque case selon orientation (H, B, G ou D)
function mur(objetCase, orientation)
{
	var posX = objetCase.posX;
	var posY = objetCase.posY;
	var no =  noCase(posX, posY);

	switch (orientation)
	{
		case "HAUT" :
		this.createEmptyMovieClip("murHAUT"+no, 7000+no);
		this["murHAUT"+no].lineStyle(epaisseurBordMur, couleurBordMur);	
		this["murHAUT"+no].beginFill(couleurMur, 100);
		this["murHAUT"+no].moveTo(2, -3);
		this["murHAUT"+no].lineTo(coteCase-4, -3);
		this["murHAUT"+no].lineTo(coteCase-4, 1);
		this["murHAUT"+no].lineTo(2, 1);
		this["murHAUT"+no].lineTo(2, -3);
		this["murHAUT" + no].endFill;
		this["murHAUT"+no]._x = coteCase * (posX-1) + marge;//posX-1 pour commencer à(0;0)
		this["murHAUT" + no]._y = coteCase * (posY - 1) + marge;
		murConstruitSurChemin.push(["murHAUT" + no]);
		break;
		case "BAS" :
		this.createEmptyMovieClip("murBAS"+no, 7000+no);
		this["murBAS"+no].lineStyle(epaisseurBordMur, couleurBordMur);	
		this["murBAS"+no].beginFill(couleurMur, 100);
		this["murBAS"+no].moveTo(2, coteCase-3);
		this["murBAS"+no].lineTo(coteCase-4, coteCase-3);
		this["murBAS"+no].lineTo(coteCase-4, coteCase+1);
		this["murBAS"+no].lineTo(2, coteCase+1);
		this["murBAS"+no].lineTo(2, coteCase-3);
		this["murBAS" + no].endFill;
		this["murBAS"+no]._x = coteCase * (posX-1) + marge;//posX-1 pour commencer à(0;0)
		this["murBAS" + no]._y = coteCase * (posY - 1) + marge;
		murConstruitSurChemin.push(["murBAS" + no]);
		break;
		case "GAUCHE" :
		this.createEmptyMovieClip("murGAUCHE"+no, 7000+no);
		this["murGAUCHE"+no].lineStyle(epaisseurBordMur, couleurBordMur);	
		this["murGAUCHE"+no].beginFill(couleurMur, 100);
		this["murGAUCHE"+no].moveTo(-3, 2);
		this["murGAUCHE"+no].lineTo(-3, coteCase-4);
		this["murGAUCHE"+no].lineTo(1, coteCase-4);
		this["murGAUCHE"+no].lineTo(1, 2);
		this["murGAUCHE"+no].lineTo(-3, 2);
		this["murGAUCHE" + no].endFill;
		this["murGAUCHE"+no]._x = coteCase * (posX-1) + marge;//posX-1 pour commencer à(0;0)
		this["murGAUCHE" + no]._y = coteCase * (posY - 1) + marge;
		murConstruitSurChemin.push(["murGAUCHE" + no]);
		break;
		case "DROITE" :
		this.createEmptyMovieClip("murDROITE"+no, 7000+no);
		this["murDROITE"+no].lineStyle(epaisseurBordMur, couleurBordMur);	
		this["murDROITE"+no].beginFill(couleurMur, 100);
		this["murDROITE"+no].moveTo(coteCase-3, 2);
		this["murDROITE"+no].lineTo(coteCase-3, coteCase-4);
		this["murDROITE"+no].lineTo(coteCase+1, coteCase-4);
		this["murDROITE"+no].lineTo(coteCase+1, 2);
		this["murDROITE"+no].lineTo(coteCase-3, 2);
		this["murDROITE" + no].endFill;
		this["murDROITE"+no]._x = coteCase * (posX-1) + marge;//posX-1 pour commencer à(0;0)
		this["murDROITE" + no]._y = coteCase * (posY - 1) + marge;
		murConstruitSurChemin.push(["murDROITE" + no]);
		break;
		case "RIEN" :
		break;
	}
}

//Fonction qui rend les murs visibles ou mom
function mursVisibles(choix)
{
trace("murConstruitSurChemin"+murConstruitSurChemin);
trace("murConstruitSurChemin.length"+murConstruitSurChemin.length);
	for(i=0;i<murConstruitSurChemin.length;i++)
	{
		this[murConstruitSurChemin[i]]._visible=choix;
	}

}