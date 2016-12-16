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

filSurChemin=new Array();

function fil(objetCase,type,orientation)
{
	
	var posX = objetCase.posX;
	var posY = objetCase.posY;
	
	//Initialisation des paramètres de la flèche en fonction du type Chemin ou Parcours (aspect et niveau)
	switch (type)
	{
		case "chemin" :
		var couleurFil = couleurFilChemin;
		var epaisseurFil = epaisseurFilChemin;
		var no = 2200 + noCase(posX, posY);
		var decalage=0;
		break;
		case "parcours" :
		var epaisseurFil = epaisseurFilParcours;
		var no = 1200 + noCase(posX, posY);
		//var couleurFil = Number(0xffffff)-maCouleur[no-1200-1];
		var couleurFil = 0x0000ff;
		var decalage=5;
		break;
	}

	switch (orientation)
	{
		case "HAUT" :
		this.createEmptyMovieClip("filHAUT"+no, no);
		this["filHAUT"+no].lineStyle(epaisseurFil, couleurFil);	
		this["filHAUT"+no].lineTo(0, -coteCase);
		this["filHAUT"+no]._x = decalage+coteCase * (posX-1) + marge + 0.5 * coteCase;//posX-1 pour commencer à(0;0)
		this["filHAUT" + no]._y = decalage+coteCase * (posY - 1) + marge + 0.5 * coteCase;
		this["filHAUT" + no]._visible = false;
		filSurChemin.push(["filHAUT" + no]);
		break;
		case "BAS" :
		this.createEmptyMovieClip("filBAS"+no, no);
		this["filBAS"+no].lineStyle(epaisseurFil, couleurFil);	
		this["filBAS"+no].lineTo(0, coteCase);
		this["filBAS"+no]._x = decalage+coteCase * (posX-1) + marge + 0.5*coteCase;//posX-1 pour commencer à(0;0)
		this["filBAS" + no]._y = decalage+coteCase * (posY - 1) + marge + 0.5 * coteCase;
		this["filBAS" + no]._visible = false;
		filSurChemin.push(["filBAS" + no]);
		break;
		case "GAUCHE" :
		this.createEmptyMovieClip("filGAUCHE"+no, no);
		this["filGAUCHE"+no].lineStyle(epaisseurFil, couleurFil);	
		this["filGAUCHE"+no].lineTo(-coteCase, 0);
		this["filGAUCHE"+no]._x = decalage+coteCase * (posX-1) + marge + 0.5 * coteCase;//posX-1 pour commencer à(0;0)
		this["filGAUCHE" + no]._y = decalage+coteCase * (posY - 1) + marge+ 0.5 * coteCase;
		this["filGAUCHE" + no]._visible = false;
		filSurChemin.push(["filGAUCHE" + no]);
		break;
		case "DROITE" :
		this.createEmptyMovieClip("filDROITE"+no, no);
		this["filDROITE"+no].lineStyle(epaisseurFil, couleurFil);	
		this["filDROITE"+no].lineTo(coteCase, 0);
		this["filDROITE"+no]._x = decalage+coteCase * (posX-1) + marge + 0.5 * coteCase;//posX-1 pour commencer à(0;0)
		this["filDROITE" + no]._y = decalage+coteCase * (posY - 1) + marge + 0.5 * coteCase;
		this["filDROITE" + no]._visible = false;
		filSurChemin.push(["filDROITE" + no]);
		break;
		case "RIEN" :
		break;
	}
}
//Fonction qui rend les fils visibles ou mom

function filVisible(choix, type)
{
	switch (type)
	{
		case "chemin":
		//trace("chemin");
			for(i=0;i<filSurChemin.length;i++)
			{
				if (Number(this[filSurChemin[i]]._name.substring(this[filSurChemin[i]]._name.length-4))> 2200)
				{
					this[filSurChemin[i]]._visible=choix;
				}
			}
		break;
		case "parcours":
			for(i=0;i<filSurChemin.length;i++)
			{
				if (Number(this[filSurChemin[i]]._name.substring(this[filSurChemin[i]]._name.length-4))> 1200 && Number(this[filSurChemin[i]]._name.substring(this[filSurChemin[i]]._name.length-4))< 2200)
				{
					this[filSurChemin[i]]._visible=choix;
				}
			}
		break;
		
	}
}