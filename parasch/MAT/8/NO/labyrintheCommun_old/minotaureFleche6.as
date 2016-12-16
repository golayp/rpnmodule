/**
 * ...
 * @author Michel Roquier */
 
/*
//Initialisation des caractéristiques des flèches utilisées pour montrer le chemin
var couleurFlecheChemin = 0xffff00;//couleur de la flèche
var couleurBordFlecheChemin = 0xff6600;//couleur du bord de la flèche
var epaisseurBordFlecheChemin = 1.5;//épaisseur du bord de la flèche

//Initialisation des caractéristiques des flèches utilisées pour baliser le parcours
var couleurFlecheParcours = 0xcc3300;//couleur de la flèche
var couleurBordFlecheParcours = 0x660000;//couleur du bord de la flèche
var epaisseurBordFlecheParcours = 1.5;//épaisseur du bord de la flèche
*/

//Fonction dessinant une flèche liée à un objet de type "chemin" ou "parcours" dans une orientation donnée (haut, bas, gauche, droite)

//On construis un tableau contenant toutes les flèches. On pourra par la site ls rendre visible ou non sans les recréer.

flecheConstruiteSurChemin=new Array();

function fleche(objetCase,type,orientation)
{
		//trace("fleche no"+no);
	var posX = objetCase.posX;
	var posY = objetCase.posY;
	
	//Initialisation des paramètres de la flèche en fonction du type Chemin ou Parcours (aspect et niveau)
	switch (type)
	{
		case "chemin" :
		var couleurFleche = couleurFlecheChemin;
		var couleurBordFleche = couleurBordFlecheChemin;
		var epaisseurBordFleche = epaisseurBordFlecheChemin;
		var no = 6000 + noCase(posX, posY);
		break;
		case "parcours" :
		var couleurFleche = couleurFlecheParcours;
		var couleurBordFleche = couleurBordFlecheParcours;
		var epaisseurBordFleche = epaisseurBordFlecheParcours;
		var no = 5000 + noCase(posX, posY);
		break;
	}
	switch (orientation)
	{
		case "HAUT" :
		this.createEmptyMovieClip("flecheHAUT"+no, no);
		this["flecheHAUT"+no].lineStyle(epaisseurBordFleche, couleurBordFleche);	
		this["flecheHAUT"+no].beginFill(couleurFleche, 100);
		this["flecheHAUT"+no].lineTo(0.25*coteCase, 0);
		this["flecheHAUT"+no].lineTo(0.25*coteCase, -0.1*coteCase);
		this["flecheHAUT"+no].lineTo(0.45*coteCase, -0.1*coteCase);
		this["flecheHAUT"+no].lineTo(0.125*coteCase, -0.2*coteCase);
		this["flecheHAUT"+no].lineTo(-0.2*coteCase, -0.1*coteCase);
		this["flecheHAUT"+no].lineTo(0, -0.1*coteCase);
		this["flecheHAUT"+no].lineTo(0, 0);
		this["flecheHAUT"+no].endFill;
		this["flecheHAUT"+no]._x = coteCase * (posX-1) + marge + 0.375*coteCase;//posX-1 pour commencer à(0;0)
		this["flecheHAUT" + no]._y = coteCase * (posY - 1) + marge + 0.1 * coteCase;
		this["flecheHAUT" + no]._visible = false;
		flecheConstruiteSurChemin.push(["flecheHAUT" + no]);
		break;
		case "BAS" :
		this.createEmptyMovieClip("flecheBAS"+no, no);
		this["flecheBAS"+no].lineStyle(epaisseurBordFleche, couleurBordFleche);	
		this["flecheBAS"+no].beginFill(couleurFleche, 100);
		this["flecheBAS"+no].lineTo(0.25*coteCase, 0);
		this["flecheBAS"+no].lineTo(0.25*coteCase, 0.1*coteCase);
		this["flecheBAS"+no].lineTo(0.45*coteCase, 0.1*coteCase);
		this["flecheBAS"+no].lineTo(0.125*coteCase, 0.2*coteCase);
		this["flecheBAS"+no].lineTo(-0.2*coteCase, 0.1*coteCase);
		this["flecheBAS"+no].lineTo(0, 0.1*coteCase);
		this["flecheBAS"+no].lineTo(0, 0);
		this["flecheBAS"+no].endFill;
		this["flecheBAS"+no]._x = coteCase * (posX-1) + marge + 0.375*coteCase;//posX-1 pour commencer à(0;0)
		this["flecheBAS" + no]._y = coteCase * (posY - 1) + marge + 0.9 * coteCase;
		this["flecheBAS" + no]._visible = false;
		flecheConstruiteSurChemin.push(["flecheBAS" + no]);
		break;
		case "GAUCHE" :
		this.createEmptyMovieClip("flecheGAUCHE"+no, no);
		this["flecheGAUCHE"+no].lineStyle(epaisseurBordFleche, couleurBordFleche);	
		this["flecheGAUCHE"+no].beginFill(couleurFleche, 100);
		this["flecheGAUCHE"+no].lineTo(0, 0.25*coteCase);
		this["flecheGAUCHE"+no].lineTo(-0.1*coteCase, 0.25*coteCase);
		this["flecheGAUCHE"+no].lineTo(-0.1*coteCase, 0.45*coteCase);
		this["flecheGAUCHE"+no].lineTo(-0.2*coteCase, 0.125*coteCase);
		this["flecheGAUCHE"+no].lineTo(-0.1*coteCase, -0.2*coteCase);
		this["flecheGAUCHE"+no].lineTo(-0.1*coteCase, 0);
		this["flecheGAUCHE"+no].lineTo(0, 0);
		this["flecheGAUCHE"+no].endFill;
		this["flecheGAUCHE"+no]._x = coteCase * (posX-1) + marge + 0.1*coteCase;//posX-1 pour commencer à(0;0)
		this["flecheGAUCHE" + no]._y = coteCase * (posY - 1) + marge + 0.375 * coteCase;
		this["flecheGAUCHE" + no]._visible = false;
		flecheConstruiteSurChemin.push(["flecheGAUCHE" + no]);
		break;
		case "DROITE" :
		this.createEmptyMovieClip("flecheDROITE"+no, no);
		this["flecheDROITE"+no].lineStyle(epaisseurBordFleche, couleurBordFleche);	
		this["flecheDROITE"+no].beginFill(couleurFleche, 100);
		this["flecheDROITE"+no].lineTo(0, 0.25*coteCase);
		this["flecheDROITE"+no].lineTo(0.1*coteCase, 0.25*coteCase);
		this["flecheDROITE"+no].lineTo(0.1*coteCase, 0.45*coteCase);
		this["flecheDROITE"+no].lineTo(0.2*coteCase, 0.125*coteCase);
		this["flecheDROITE"+no].lineTo(0.1*coteCase, -0.2*coteCase);
		this["flecheDROITE"+no].lineTo(0.1*coteCase, 0);
		this["flecheDROITE"+no].lineTo(0, 0);
		this["flecheDROITE"+no].endFill;
		this["flecheDROITE"+no]._x = coteCase * (posX-1) + marge + 0.9*coteCase-2;//posX-1 pour commencer à(0;0)
		this["flecheDROITE" + no]._y = coteCase * (posY - 1) + marge + 0.375 * coteCase;
		this["flecheDROITE" + no]._visible = false;
		flecheConstruiteSurChemin.push(["flecheDROITE" + no]);
		break;
		case "RIEN" :
		break;
	}
}

//Fonction qui rend les fleches visibles ou mom
function flechesVisibles(choix, type)
{
	switch (type)
	{
		case "chemin":
			for(i=0;i<flecheConstruiteSurChemin.length;i++)
			{
				if (Number(this[flecheConstruiteSurChemin[i]]._name.substring(this[flecheConstruiteSurChemin[i]]._name.length-4))> 6000)
				{
					this[flecheConstruiteSurChemin[i]]._visible=choix;
				}
			}
		break;
		case "parcours":
			for(i=0;i<flecheConstruiteSurChemin.length;i++)
			{
				if (Number(this[flecheConstruiteSurChemin[i]]._name.substring(this[flecheConstruiteSurChemin[i]]._name.length-4))> 5000 && Number(this[flecheConstruiteSurChemin[i]]._name.substring(this[flecheConstruiteSurChemin[i]]._name.length-4))< 6000)
				{
					this[flecheConstruiteSurChemin[i]]._visible=choix;
				}
			}
		break;
		
	}
}