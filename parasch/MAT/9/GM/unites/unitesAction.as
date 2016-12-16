import mx.data.encoders.Num;
/*
 * @author Jean-Michel Luthi
*/

deplacementPhotos();

function posSouris()
	{
		var o=this;
		// Création d'un objet écouteur de souris.
		var mouseListener:Object = new Object();
		trace("posSouris");
		// Lorsque le curseur de la souris se déplace dans le fichier SWF, 
		//on teste si la souris repasse sur les clips unités invisibles.
		mouseListener.onMouseMove = function() {
				o.rendreVisibleCoordonnees(_xmouse, _ymouse)
		}
		Mouse.addListener(mouseListener);
	}
function rendreVisibleCoordonneesV(monXOld, monYOld, monX,monY, nbMx)
{
	trace("volumeC[0]._x"+volumeC[0].posX);
	trace("volumeC0]._y" + volumeC[0].posY);
	trace ("monX" + monX);
	trace ("monY" + monY);
	trace ("monXOld" + monXOld);
	trace ("monYOld" + monYOld);
	for (i=0;i<nbMx;i++)
	{

		//On rend visible en X
		if(monX >= volumeC[i].posX && monX >= volumeC[i].posX + tailleClipV && monY <= volumeC[i].posY)
		{
			volumeC[i].visibilite(true);
		}
		//On rend visible en Y
		else if(monY <= volumeC[i].posY && monY >= volumeC[i].posY + tailleClipV && monX >= volumeC[i].posX)
		{
			volumeC[i].visibilite(true);
		}
		//On rend visible en Z
		else{
			volumeC[i].visibilite(false);
		}
	}
}
function rendreVisibleFleche(monXOld, monYOld, monX,monY, nbMx)
{
	//trace("monX" + monX);
	//On va créer un vecteur déplacement de souris.
	//S'il est proche de l'horizontale, on rend visible en X
	//S'il est proche de la verticale, on rend visible en Z
	//S'il est proche de la diagonale, on rend visible en Y
	//On regarde la pente:
	var pente:Number;
	var horizontal:Boolean;
	//var vertical:Boolean;
//	var diagonal:Boolean;
	var statique:Boolean;
	var cadran:Number;
	//Si la souris se déplace verticalement, division par 0 donc on traite ce cas à part.
	if (monX - monXOld == 0)
	{
		horizontal = false;
		diagonal = false;
		vertical = true;
	}else{	
		pente = (monYOld - monY) / (monX - monXOld);
		switch (true)
		{
			case (Math.abs(pente) < 0.6):
				horizontal = true;
			//	diagonal = false;
			//	vertical = false;
				statique = false;
				break;
		/*	case (Math.abs(pente) > 0.6 && Math.abs(pente) < 1.8):
				//On teste si le déplacement de la souris est direction cadran 1, 2, 3 ou 4
				switch (true)
				 {
					case ((monYOld - monY) > 0 && (monX - monXOld) > 0):
						cadran = 1;
						break;
					case ((monYOld - monY) < 0 && (monX - monXOld) > 0):
						cadran = 2;
						break;
					case ((monYOld - monY) < 0 && (monX - monXOld) < 0):
						cadran = 3;
						break;
					case ((monYOld - monY) > 0 && (monX - monXOld) < 0):
						cadran = 4;
						break;	
				 }
				
				horizontal = false;
				diagonal = true;
				vertical = false;
				statique = false;
				break;
			case (Math.abs(pente) > 1.8):
				horizontal = false;
				diagonal = false;
				vertical = true;
				statique = false;
				break;*/
			case (monX == monXOld && monY == monYOld):
				horizontal = false;
			//	diagonal = false;
			//	vertical = false;
				statique = true;
				break;
		}
	
	}
	//On rend visible en X
	switch (true)
	{
		case(horizontal==true):
			ajouterFleche(coordonneesSourisL(monX, monY, true, false, nbMx), nbMx);
			break;
		//On rend visible en Y
//		case(diagonal==true):
//			ajouterFleche(coordonneesSouris(monX, monY, false, true, cadran, false, false, nbMx), nbMx);
//			break;
		//On rend visible en Z
//		case(vertical==true):
//			ajouterFleche(coordonneesSouris(monX, monY, false, false, cadran, true, false, nbMx),nbMx);
//			break;
		case(statique == true):
			ajouterFleche(coordonneesSourisL(monX, monY, false, true, nbMx),nbMx);
			break;
	}
}
function rendreVisibleCarre(monXOld, monYOld, monX,monY, nbMx)
{
	//trace("monX" + monX);
	//On va créer un vecteur déplacement de souris.
	//S'il est proche de l'horizontale, on rend visible en X
	//S'il est proche de la verticale, on rend visible en Z
	//S'il est proche de la diagonale, on rend visible en Y
	//On regarde la pente:
	var pente:Number;
	var horizontal:Boolean;
	var vertical:Boolean;
	//var diagonal:Boolean;
	var statique:Boolean;
	var cadran:Number;
	//Si la souris se déplace verticalement, division par 0 donc on traite ce cas à part.
	if (monX - monXOld == 0)
	{
		horizontal = false;
		//diagonal = false;
		vertical = true;
	}else{	
		pente = (monYOld - monY) / (monX - monXOld);
		switch (true)
		{
			case (Math.abs(pente) < 0.6):
				horizontal = true;
			//	diagonal = false;
				vertical = false;
				statique = false;
				break;
	/*		case (Math.abs(pente) > 0.6 && Math.abs(pente) < 1.8):
				//On teste si le déplacement de la souris est direction cadran 1, 2, 3 ou 4
				switch (true)
				 {
					case ((monYOld - monY) > 0 && (monX - monXOld) > 0):
						cadran = 1;
						break;
					case ((monYOld - monY) < 0 && (monX - monXOld) > 0):
						cadran = 2;
						break;
					case ((monYOld - monY) < 0 && (monX - monXOld) < 0):
						cadran = 3;
						break;
					case ((monYOld - monY) > 0 && (monX - monXOld) < 0):
						cadran = 4;
						break;	
				 }
				
				horizontal = false;
				diagonal = true;
				vertical = false;
				statique = false;
				break;*/
			case (Math.abs(pente) > 1.8):
				horizontal = false;
			//	diagonal = false;
				vertical = true;
				statique = false;
				break;
			case (monX == monXOld && monY == monYOld):
				horizontal = false;
			//	diagonal = false;
				vertical = false;
				statique = true;
				break;
		}
	
	}
	//On rend visible en X
	switch (true)
	{
		case(horizontal==true):
			ajouterLigneCarres(coordonneesSourisA(monX, monY, true, false, false, nbMx), nbMx);
			break;
	/*	//On rend visible en Y
		case(diagonal==true):
			ajouterLigneCarres(coordonneesSouris(monX, monY, false, true, cadran, false, false, nbMx), nbMx);
			break;*/
		//On rend visible en Z
		case(vertical==true):
			ajouterLigneCarres(coordonneesSourisA(monX, monY, false, true, false, nbMx),nbMx);
			break;
		case(statique == true):
			ajouterLigneCarres(coordonneesSourisA(monX, monY, false, false, true, nbMx),nbMx);
			break;
	}
}
function rendreVisibleCouche(monXOld, monYOld, monX,monY, nbMx)
{
	//trace("monX" + monX);
	//On va créer un vecteur déplacement de souris.
	//S'il est proche de l'horizontale, on rend visible en X
	//S'il est proche de la verticale, on rend visible en Z
	//S'il est proche de la diagonale, on rend visible en Y
	//On regarde la pente:
	var pente:Number;
	var horizontal:Boolean;
	var vertical:Boolean;
	var diagonal:Boolean;
	var statique:Boolean;
	var cadran:Number;
	//Si la souris se déplace verticalement, division par 0 donc on traite ce cas à part.
	if (monX - monXOld == 0)
	{
		horizontal = false;
		diagonal = false;
		vertical = true;
	}else{	
		pente = (monYOld - monY) / (monX - monXOld);
		switch (true)
		{
			case (Math.abs(pente) < 0.6):
				horizontal = true;
				diagonal = false;
				vertical = false;
				statique = false;
				break;
			case (Math.abs(pente) > 0.6 && Math.abs(pente) < 1.8):
				//On teste si le déplacement de la souris est direction cadran 1, 2, 3 ou 4
				switch (true)
				 {
					case ((monYOld - monY) > 0 && (monX - monXOld) > 0):
						cadran = 1;
						break;
					case ((monYOld - monY) < 0 && (monX - monXOld) > 0):
						cadran = 2;
						break;
					case ((monYOld - monY) < 0 && (monX - monXOld) < 0):
						cadran = 3;
						break;
					case ((monYOld - monY) > 0 && (monX - monXOld) < 0):
						cadran = 4;
						break;	
				 }
				
				horizontal = false;
				diagonal = true;
				vertical = false;
				statique = false;
				break;
			case (Math.abs(pente) > 1.8):
				horizontal = false;
				diagonal = false;
				vertical = true;
				statique = false;
				break;
			case (monX == monXOld && monY == monYOld):
				horizontal = false;
				diagonal = false;
				vertical = false;
				statique = true;
				break;
		}
	
	}
	//On rend visible en X
	switch (true)
	{
		case(horizontal==true):
			ajouterCouche(coordonneesSourisV(monX, monY, true, false, cadran, false, false, nbMx), nbMx);
			break;
		//On rend visible en Y
		case(diagonal==true):
			ajouterCouche(coordonneesSourisV(monX, monY, false, true, cadran, false, false, nbMx), nbMx);
			break;
		//On rend visible en Z
		case(vertical==true):
			ajouterCouche(coordonneesSourisV(monX, monY, false, false, cadran, true, false, nbMx),nbMx);
			break;
		case(statique == true):
			ajouterCouche(coordonneesSourisV(monX, monY, false, false, cadran, false, true, nbMx),nbMx);
			break;
	}
}

//On repère la position du cube en haut à droite du parallélipipède visible
function reperageSommetVisibleL(nbMx):Array 
{
	//On cée un variable qui contiendra les coordonnées du cube
	var valMax:Array=new Array();

	for (i = 0; i < nbMx; i++)
	{
//		trace("i: " + i); 
//		trace("coordonnées: "+volumeC[i].getCoordonnees())
//		trace("visible: " + volumeC[i].getVisibilite());
		if (longueurC[i].getVisibilite() == true)
		{
//			trace ("dans IF: "+volumeC[i].getCoordonnees()[0]);
			if (valMax[0] < longueurC[i].getCoordonnees()[0])
			{
				
				valMax[0] = longueurC[i].getCoordonnees()[0];
//				trace("dans IF IF1: " + volumeC[i].getCoordonnees()[0]);
			}
//			if (valMax[1] < Number(volumeC[i].getCoordonnees()[1]))
	//		{
				valMax[1] = Number(longueurC[i].getCoordonnees()[1]);
		//	}
//			if (valMax[2] < Number(volumeC[i].getCoordonnees()[2]))
	//		{
				valMax[2] = Number(longueurC[i].getCoordonnees()[2]);
	//		}
		}
	}
	trace("valMaxL" + valMax);
	return valMax;
}

//On repère la position du cube en haut à droite du parallélipipède visible
function reperageSommetVisibleA(nbMx):Array 
{
	//On cée un variable qui contiendra les coordonnées du cube
	var valMax:Array=new Array();

	for (i = 0; i < nbMx; i++)
	{
//		trace("i: " + i); 
//		trace("coordonnées: "+aireC[i].getCoordonnees())
//		trace("visible: " + aireC[i].getVisibilite());
		if (aireC[i].getVisibilite() == true)
		{
//			trace ("dans IF: "+volumeC[i].getCoordonnees()[0]);
			if (valMax[0] < aireC[i].getCoordonnees()[0])
			{
				
				valMax[0] = aireC[i].getCoordonnees()[0];
//				trace("dans IF IF1: " + volumeC[i].getCoordonnees()[0]);
			}
//			if (valMax[1] < Number(aireC[i].getCoordonnees()[1]))
//			{
				valMax[1] = Number(aireC[i].getCoordonnees()[1]);
//			}
			if (valMax[2] < Number(aireC[i].getCoordonnees()[2]))
			{
				valMax[2] = Number(aireC[i].getCoordonnees()[2]);
			}
		}
	}
	//trace("valMaxA" + valMax);
	return valMax;
}


//On repère la position du cube en haut à droite du parallélipipède visible
function reperageSommetVisibleV(nbMx):Array 
{
	//On cée un variable qui contiendra les coordonnées du cube
	var valMax:Array=new Array();

	for (i = 0; i < nbMx; i++)
	{
//		trace("i: " + i); 
//		trace("coordonnées: "+volumeC[i].getCoordonnees())
//		trace("visible: " + volumeC[i].getVisibilite());
		if (volumeC[i].getVisibilite() == true)
		{
//			trace ("dans IF: "+volumeC[i].getCoordonnees()[0]);
			if (valMax[0] < volumeC[i].getCoordonnees()[0])
			{
				
				valMax[0] = volumeC[i].getCoordonnees()[0];
//				trace("dans IF IF1: " + volumeC[i].getCoordonnees()[0]);
			}
			if (valMax[1] < Number(volumeC[i].getCoordonnees()[1]))
			{
				valMax[1] = Number(volumeC[i].getCoordonnees()[1]);
			}
			if (valMax[2] < Number(volumeC[i].getCoordonnees()[2]))
			{
				valMax[2] = Number(volumeC[i].getCoordonnees()[2]);
			}
		}
	}
	//trace("valMax" + valMax);
	return valMax;
}


//On rend visible le parallélépipède qui a le cube en haut à droite à la position de la souris
function flecheVisible(nbMx):Array 
{
	//On cée un variable qui contiendra les coordonnées du cube
	var valMax:Array=new Array();

	for (i = 0; i < nbMx; i++)
	{

		if (valMax[0] < longueurC[i].getCoordonnees()[0])
		{			
			valMax[0] = longueurC[i].getCoordonnees()[0];
		}
		if (valMax[1] < Number(longueurC[i].getCoordonnees()[1]))
		{
			valMax[1] = Number(longueurC[i].getCoordonnees()[1]);
		}
		if (valMax[2] < Number(longueurC[i].getCoordonnees()[2]))
		{
			valMax[2] = Number(longueurC[i].getCoordonnees()[2]);
		}
	}
	//trace("valMax" + valMax);
	return valMax;
}

//On rend visible le parallélépipède qui a le cube en haut à droite à la position de la souris
function carreVisible(nbMx):Array 
{
	//On cée un variable qui contiendra les coordonnées du cube
	var valMax:Array=new Array();

	for (i = 0; i < nbMx; i++)
	{
trace("coord Carre" + aireC[i].getCoordonnees());
		if (valMax[0] < aireC[i].getCoordonnees()[0])
		{			
			valMax[0] = aireC[i].getCoordonnees()[0];
		}
//		if (valMax[1] < Number(aireC[i].getCoordonnees()[1]))
//		{
			valMax[1] = Number(aireC[i].getCoordonnees()[1]);
//		}
		if (valMax[2] < Number(aireC[i].getCoordonnees()[2]))
		{
			valMax[2] = Number(aireC[i].getCoordonnees()[2]);
		}
	}
	trace("valMax Carre" + valMax);
	return valMax;
}


//On rend visible le parallélépipède qui a le cube en haut à droite à la position de la souris
function parallelipipedeVisible(nbMx):Array 
{
	//On cée un variable qui contiendra les coordonnées du cube
	var valMax:Array=new Array();

	for (i = 0; i < nbMx; i++)
	{

		if (valMax[0] < volumeC[i].getCoordonnees()[0])
		{			
			valMax[0] = volumeC[i].getCoordonnees()[0];
		}
		if (valMax[1] < Number(volumeC[i].getCoordonnees()[1]))
		{
			valMax[1] = Number(volumeC[i].getCoordonnees()[1]);
		}
		if (valMax[2] < Number(volumeC[i].getCoordonnees()[2]))
		{
			valMax[2] = Number(volumeC[i].getCoordonnees()[2]);
		}
	}
	//trace("valMax" + valMax);
	return valMax;
}

//On crée une fonction qui repère la position de la souris en fonction de l'enveloppe périférique
function coordonneesSourisL(xSouris, ySouris, deplacementSourisH, sourisStatique, nb):Array
{
	var monArray = new Array();
//	trace("DS SOURIS reperage Sommet Visible"+reperageSommetVisible(nb))
	switch (true) {
		case (deplacementSourisH == true):
			dsTrace = Math.floor((xSouris - posDepFlecheXIni) / tailleClipL) + 1;
			dsTrace1 = xSouris;
			dsTrace2 = (xSouris - posDepFlecheYIni);
			monArray[0] = Math.floor((xSouris - posDepFlecheXIni) / nouvelleTaille) + 1;
			monArray[1] = reperageSommetVisibleL(nb)[1];
			monArray[2] = reperageSommetVisibleL(nb)[2];
			break;
		case (sourisStatique == true):
			monArray[0] = flecheVisible(nb)[0];
			monArray[1] = flecheVisible(nb)[1];
			monArray[2] = flecheVisible(nb)[2];
			break;
	}
	trace("monArrayL: souris: " + monArray);
	return monArray;
}

//On crée une fonction qui repère la position de la souris en fonction de l'enveloppe périférique
function coordonneesSourisA(xSouris, ySouris, deplacementSourisH, deplacementSourisV, sourisStatique, nb):Array
{
	var monArray = new Array();
	switch (true) {
		case (deplacementSourisH == true):
			dsTrace = Math.floor((xSouris - posDepCarreXIni) / tailleClipA) + 1;
			dsTrace1 = xSouris;
			dsTrace2 = (xSouris - posDepCarreYIni);
			monArray[0] = Math.floor((xSouris - posDepCarreXIni) / nouvelleTaille) + 1;
			monArray[1] = reperageSommetVisibleA(nb)[1];
			monArray[2] = reperageSommetVisibleA(nb)[2];
			break;
		case (deplacementSourisV == true):
			dsTrace = Math.floor(( posDepCarreYIni- ySouris)/nouvelleTaille)+1;
			monArray[0] = reperageSommetVisibleA(nb)[0];
			monArray[1] = reperageSommetVisibleA(nb)[1];
			monArray[2] = Math.floor(( posDepCarreYIni- ySouris)/nouvelleTaille)+1;
			break;
		case (sourisStatique == true):
			monArray[0] = carreVisible(nb)[0];
			monArray[1] = carreVisible(nb)[1];
			monArray[2] = carreVisible(nb)[2];
			break;
	}
	return monArray;
}

//On crée une fonction qui repère la position de la souris en fonction de l'enveloppe périférique
function coordonneesSourisV(xSouris, ySouris, deplacementSourisH, deplacementSourisD, cadran, deplacementSourisV, sourisStatique, nb):Array
{
	var monArray = new Array();
	switch (true) {
		case (deplacementSourisH == true):
			dsTrace = Math.floor((xSouris - posDepCubeXIni) / tailleClipV) + 1;
			dsTrace1 = xSouris;
			dsTrace2 = (xSouris - posDepCubeXIni);
			monArray[0] = Math.floor((xSouris - posDepCubeXIni) / nouvelleTaille) + 1;
			monArray[1] = reperageSommetVisibleV(nb)[1];
			monArray[2] = reperageSommetVisibleV(nb)[2];
			break;
		case (deplacementSourisD == true):
			dsTrace = Math.floor(Math.sqrt(Math.pow(Math.floor((xSouris - posDepCubeXIni) / (nouvelleTaille / 2))+1, 2) + Math.pow(Math.floor((posDepCubeYIni - ySouris) / (nouvelleTaille / 4))+1, 2)))+1;
			monArray[0] = reperageSommetVisibleV(nb)[0];
			if (cadran == 3)
			{
				monArray[1] = parallelipipedeVisible(nb)[1]-Math.floor(Math.sqrt(Math.pow((xSouris - posDepCubeXIni) / (nouvelleTaille / 2), 2) + Math.pow((posDepCubeYIni - ySouris) / (nouvelleTaille / 4), 2)));
			}else{
				monArray[1] = Math.floor(Math.sqrt(Math.pow((xSouris - posDepCubeXIni) / (nouvelleTaille / 2), 2) + Math.pow((posDepCubeYIni - ySouris) / (nouvelleTaille / 4), 2)));
			}
			monArray[2] = reperageSommetVisibleV(nb)[2];
			break;
		case (deplacementSourisV == true):
			dsTrace = Math.floor(( posDepCubeYIni- ySouris)/nouvelleTaille)+1;
			monArray[0] = reperageSommetVisibleV(nb)[0];
			monArray[1] = reperageSommetVisibleV(nb)[1];
			monArray[2] = Math.floor(( posDepCubeYIni- ySouris)/nouvelleTaille)+1;
			break;
		case (sourisStatique == true):
			monArray[0] = parallelipipedeVisible(nb)[0];
			monArray[1] = parallelipipedeVisible(nb)[1];
			monArray[2] = parallelipipedeVisible(nb)[2];
			break;
	}
	return monArray;
}
//On ajoute un plan perpendiculaire à une direction
function ajouterFleche(coordSouris, nbMx)
{
	for (i=0;i<nbMx;i++)
	{
		//On repère si la souris est à l'extérieur du cube pour ne pas que le mouvement se répèrcute sur le parallélépipède 
		if (coordSouris[0]<1||coordSouris[0]>nbXmaxL)
		{
			Mouse.removeListener(mouseListener);
		}else if (longueurC[i].getCoordonnees()[0] <= coordSouris[0])
		{
			longueurC[i].visibilite(true);
		}
		
		else {
			longueurC[i].visibilite(false);
			longueurC[0].visibilite(true);
		}
	}
}
function ajouterLigneCarres(coordSouris, nbMx)
{
	for (i=0;i<nbMx;i++)
	{
		
		//On repère si la souris est à l'extérieur du cube pour ne pas que le mouvement se répèrcute sur le parallélépipède 
		if (coordSouris[0]<1||coordSouris[0]>nbXmaxA||coordSouris[2]<1||coordSouris[2]>nbZmaxA)
		{
			Mouse.removeListener(mouseListener);
		}else if (aireC[i].getCoordonnees()[0] <= coordSouris[0] && aireC[i].getCoordonnees()[2] <= coordSouris[2])
		{
			aireC[i].visibilite(true);
		}
		
		else {
			aireC[i].visibilite(false);
			aireC[0].visibilite(true);
		}
	}
}
function ajouterCouche(coordSouris, nbMx)
{
	for (i=0;i<nbMx;i++)
	{
		//On repère si la souris est à l'extérieur du cube pour ne pas que le mouvement se répèrcute sur le parallélépipède 
		if (coordSouris[0]<1||coordSouris[0]>nbXmaxV||coordSouris[1]<1||coordSouris[1]>nbYmaxV||coordSouris[2]<1||coordSouris[2]>nbZmaxV)
		{
			Mouse.removeListener(mouseListener);
		}else if (volumeC[i].getCoordonnees()[0] <= coordSouris[0] && volumeC[i].getCoordonnees()[1] <= coordSouris[1] && volumeC[i].getCoordonnees()[2] <= coordSouris[2])
		{
			volumeC[i].visibilite(true);
		}
		
		else {
			volumeC[i].visibilite(false);
			volumeC[0].visibilite(true);
		}
	}
}

function tirageObjetATransformer():Number 
{
	//trace("tirageDeBase.length"+tirageDeBase.length)
	if (tirageDeBase.length == 0)
	{
		tirageDeBase = new Array(1, 2, 3, 4 );
		//trace("tirageDeBase"+tirageDeBase)
	}
	var valeur:Number;
	var elementATirer:Number = Math.floor(Math.random() * tirageDeBase.length);
	//trace("elementATirer" + elementATirer)
	//trace("")
	valeur = Number(tirageDeBase[elementATirer]);
	//trace("valeur"+valeur)
	for (n = 0; n < tirageDeBase.length; n++)
	{
		//trace("Number(tirageDeBase[n])"+Number(tirageDeBase[n]))
		if (Number(tirageDeBase[n]) == valeur)
		{
			tirageDeBase.splice(n, 1)
			//trace("tirageDeBase"+tirageDeBase)
		}
	}
	//valeur = 1;
	return valeur;
}
function reperageNumero(nomClip):Number
{
	var monNumero:Number;
	var monClipStr=String(nomClip);
	var monClipLong:String = nomClip.length;
	//Le nom du clip est "conteneurPhoto" +le numéro avec 1 ou deux chiffres donc 15 ou 16 caractères
	if (monClipLong==16)
	{
		monNumero=Number(monClipStr.substr(14,2));
	}else if(monClipLong==15)
	{
		monNumero=Number(monClipStr.substr(14,1));
	}

	return monNumero;
}

//fonction utilisée dans ini.
function comportementSurClip(clip, clipAvant, clipApres)
{
	//On cree un etat pour le clip (Presse ou non)
	var etatPresse:Boolean=false;

		//Comportement lors d'un rollOver
		clip.onRollOver=function()
		{
			clip._xscale=150;
			clip._yscale=150;
			clipAvant._alpha=50;

			clipApres._alpha=50;

		}
		//Comportement lors d'un rollOut
		clip.onRollOut=function()
		{
			clip._xscale=100;
			clip._yscale=100;
			clipAvant._alpha=100;
			clipAvant._xscale=100;
			clipAvant._yscale=100;
			clipApres._alpha=100;
			clipApres._xscale=100;
			clipApres._yscale=100;
		}
		
		//Comportement lorsqu'on clique dessus
		clip.onPress=function()
		{ 
			for (i = 0; i <nbClip; i++)
			{
				monUniteFond[i].visibilite(false);
			}
			noClip=reperageNumero(clip._name);
			//On repère le numéro du clipsur lequel on a cliqué et on le rend visible si ce n'est pas la même unité que celui proposé.

			monUniteFond[noClip].symbole = monUniteFond[noClip].symbole.toString();
			trace("monUniteFond[noClip].exposant" + monUniteFond[noClip].exposant)
			if(typeof(monUniteFond[noClip].exposant)!="number")
			monUniteFond[noClip].exposant = monUniteFond[noClip].exposant.toString();
			trace("monUniteFond[noClip].exposant.toString()" + monUniteFond[noClip].exposant)
			monUniteFond[noClip].exposant = Number(monUniteFond[noClip].exposant);
			trace("typeof(monUniteFond[noClip].exposant"+typeof(monUniteFond[noClip].exposant))
			if (typeof(monUniteFond[noClip].exposant) != "number") {
				monUniteFond[noClip].exposant = 1;
			}
			trace("Number(monUniteFond[noClip].exposant);" + Number(monUniteFond[noClip].exposant));
			trace("uniteATransformer[2]"+uniteATransformer[2])
			if (monUniteFond[noClip].symbole == uniteATransformer[0] && monUniteFond[noClip].exposant == uniteATransformer[2])
			{
				longueurModif[0].visibilite(false);
				aireModif[0].visibilite(false);
				volumeModif[0].visibilite(false);
				masseModif[0].visibilite(false);
				fondMc.monMicroscope._visible = false;
				fondMc.maLoupe._visible = false;
				longueurBase[1].visibilite(false);
				aireBase[1].visibilite(false);
				volumeBase[1].visibilite(false);
				masseBase[1].visibilite(false);
				fondMc.valeurTrouvee.text ="";
				fondMc.uniteChoisie.text = "";
				fondMc.uniteChoisieExposant.text = "";
				fondMc.infoTxt.text = "Avec la même unité, c'est trop facile!";
				fondMc.infoTxt._visible = true;
			}
			else{
				monUniteFond[noClip].visibilite(true);
				fondMc.infoTxt._visible = false;
				//On repère le type d'unité sur lequel on a cliqué'
				typeUnite = test(monUniteFond[noClip]);
	
			}
		}
}

function actionSolution (monArray)
{
	fondMc.verifier_btn._visible = false;
	fondRON._visible = false;
	rougeOuiNon._visible=false;
	oui._visible=false;
	non._visible = false;
	rougeOuiNonTxt.text =nbFautes+" Veux-tu voir nbClip? "+nbClip+" monArray.length "+monArray.length;

	for (i = 0; i < monArray.length; i++) {
		trace(i)
		if(monArray[i][0]==false)
		{
			nbFautesRestantes=nbFautes;
			fondRON._visible=true;
			if (nbFautesRestantes == 1) {
				rougeFinTxt.text = retours[0][0];
				monUnite[retours[0][1]].visibilite(true);
				monUnite[retours[0][1]].active(false);
				monUnite[retours[0][1]].setPosition(posClipDepX, posClipDepY);
				fondRF._visible = true;
				rougeFin._visible=true;
				finRouge._visible=true;
			}else{
				rougeSuiteTxt.text = retours[0][0];
				monUnite[retours[0][1]].visibilite(true);
				monUnite[retours[0][1]].active(false);
				monUnite[retours[0][1]].setPosition(posClipDepX, posClipDepY);
				fondRS._visible = true;
				rougeSuite._visible=true;
				suite._visible=true;
				nbFautesRestantes--;
			}
		}
	}
	switch (true)
	{
		case (nbFautes == 0 && monArray.length == nbClip):
			vertTxt.text="Bravo tout est juste.";
			vert._visible = true;
			fondV._visible = true;
			finVert._visible = true;
			break;
		case (nbFautes == 0 && monArray.length == 0):
			rougeFinTxt.text="Tu n'as encore rien fait";
			rougeFin._visible=true;
			finRouge._visible = true;
			break;
		case(nbFautes == 0 && monArray.length != nbClip):
			rougeFinTxt.text="Ce que tu as fait était juste. Mais tu n'as pas tout trié.";
			rougeFin._visible=true;
			finRouge._visible = true;
			break;
	}
	/*
	if (nbFautes==0 && monArray.length == nbClip){
		vertTxt.text="Bravo tout est juste.";
		vert._visible = true;
		fondV._visible = true;
		finVert._visible = true;
		
	}
	if (nbFautes == 0 && monArray.length == 0)
	{
		rougeFinTxt.text="Tu n'as encore rien fait";
		rougeFin._visible=true;
		finRouge._visible = true;
	}else if (nbFautes==0 && monArray.length != nbClip){
		rougeFinTxt.text="Ce que tu as fait était juste. Mais tu n'as pas tout trié.";
		rougeFin._visible=true;
		finRouge._visible = true;
		
	}*/
}
//Fonction qui teste sur quelle catégorie d'icone on a pressé et qui rend visible les unités en conséquence

function test(clip):String
{
	trace ("clip.categorie" + clip.categorie);

	uniteSIStr = String(clip.uSI);
	uniteSI=Number(uniteSIStr)
	switch (clip.categorie.toString())
		{
			case "longueur" :
				trace("dans test longueur")
				delete fondMc.onEnterFrame();
				for (i = 0; i <nbMaxFleches; i++)
				{
					//On rend les clips enabled=true

					fondMc.valeurTrouvee.text = 1;
					fondMc.uniteChoisie.text = clip.symbole;
					fondMc.uniteChoisieExposant.text = clip.exposant;
					if (clip.exposant != 2 && clip.exposant != 3) {
						fondMc.uniteChoisieExposant.text = "";
					}
					
				}

				longueur[0].visibilite(false);
				longueurModif[0].visibilite(true);
				aireModif[0].visibilite(false);
				volumeModif[0].visibilite(false);
				masseModif[0].visibilite(false);
				
				comparaisonTaillesUnites(clip, 1);
				
				fondMc.onEnterFrame = function()
				{

					if (longueurModif[0].bouge == true) {
						fondMc.monMicroscope._visible = false;
						fondMc.maLoupe._visible = false;
						fondMc.monMicroscopeD._visible = false;
						fondMc.maLoupeD._visible = false;
						longueurBase[1].visibilite(false);
						aireBase[1].visibilite(false);
						volumeBase[1].visibilite(false);
						masseBase[1].visibilite(false);
						var maValM1:Number = transformerEnUniteBase(uniteATransformer[3], uniteATransformer[1], uniteATransformer[2]);
						var maValM2:Number = transformerEnUniteBase(correctionValeur * longueurModif[0].valeur , uniteSI, 1);
						fondMc.valeurTrouvee.text = affichage(correctionValeur * longueurModif[0].valeur, uniteSI, uniteATransformer[1],1);
						//fondMc.valeurTrouvee.text = maValM2;
						fondMc.uniteChoisie.text = accord(clip.symbole, longueurModif[0].valeur * Math.pow(1 / uniteSI, 1) );
						//trace("longueurModif[0].valeur" + longueurModif[0].valeur);
						//trace("correctionValeur: " + correctionValeur);
					}else if (longueurModif[0].relache == true) {
						
						
						trace("typeof(uniteSI)" + typeof(uniteSI))
						trace("uniteSI"+uniteSI)
						var maValM1:Number = transformerEnUniteBase(uniteATransformer[3], uniteATransformer[1], uniteATransformer[2]);
						var maValM2:Number = transformerEnUniteBase(correctionValeur * longueurModif[0].valeur , uniteSI, 1);
						trace("maValM2: " + maValM2);
						trace("longueur maValM1: " + arrondi(maValM1,1));
						trace("longueur maValM2: " + arrondi(maValM2, 1));
						trace("longueur maValM1 tronque: " + troncage(maValM1,2));
						trace("longueur maValM2 tronque: " + troncage(maValM2,2));
						//var monTest:Boolean=analyse(arrondi(maValM1,1),arrondi(maValM2,1));
						var monTest:Boolean=analyse(arrondi(maValM1,1),arrondi(maValM2,1));
						if (monTest == true) {
							fondMc.suite_btn._visible = true;
						}else {
							fondMc.suite_btn._visible = false;
						}
						
					}else {
						fondMc.suite_btn._visible = false;
					}
					 
				}
			break;
		case "aire" :
			delete fondMc.onEnterFrame();
				for (i = 0; i <nbMaxFleches; i++)
				{
					longueurC[i].visibilite(false);
					longueurC[i].rendrePossible(false);
				}
				posDepCarreX = posDepCarreXini;
				posDepCarreY = posDepCarreYini;
				for (i = 0; i <nbMaxCarres; i++)
				{
					//On rend les clips enabled=true
					aireC[i].rendrePossible(true);
					
					nouvelleTaille = 100*tailleClipA * uniteSI;
					aireC[i].setTailleCarre(1,nouvelleTaille);
					//On calcule la positiondu clip pour qu'on obtienne le carré
					var positionX:Number;
					var positionY:Number;
					positionX=posDepCarreX + nouvelleTaille*(i % nbXMaxA);
					positionY=posDepCarreY-(nouvelleTaille*Math.floor(i/nbXMaxA))%(nbZMaxA*nouvelleTaille);
					aireC[i].setPosition(positionX, positionY);
					fondMc.valeurTrouvee.text = 1;
					fondMc.uniteChoisie.text = clip.symbole;
					//fondMc.uniteChoisie.text = clip.symbole;
					
					fondMc.uniteChoisieExposant.text = clip.exposant;
					if (clip.exposant != 2 && clip.exposant != 3) {
						fondMc.uniteChoisieExposant.text = "";
					}
				}
				for (i = 0; i <nbMaxCubes; i++)
				{
					volumeC[i].visibilite(false);
					volumeC[i].rendrePossible(false);
				}
				for (i = 0; i <nbMaxMasses; i++)
				{
					masseC[i].visibilite(false);
					masseC[i].rendrePossible(false);
				}
				aireC[0].visibilite(false);
				longueurModif[0].visibilite(false);
				aireModif[0].visibilite(true);
				volumeModif[0].visibilite(false);
				masseModif[0].visibilite(false);
				
				comparaisonTaillesUnites(clip, 2);
				
				fondMc.onEnterFrame = function()
				{
					if (aireModif[0].bouge == true) {
						fondMc.monMicroscope._visible = false;
						fondMc.maLoupe._visible = false;
						fondMc.monMicroscopeD._visible = false;
						fondMc.maLoupeD._visible = false;
						longueurBase[1].visibilite(false);
						aireBase[1].visibilite(false);
						volumeBase[1].visibilite(false);
						masseBase[1].visibilite(false);
						fondMc.valeurTrouvee.text = affichage(correctionValeur * aireModif[0].valeur,uniteSI, uniteATransformer[1],2);
						fondMc.uniteChoisie.text = accord(clip.symbole, aireModif[0].valeur * Math.pow(1 / uniteSI, 2) );
					}else if (aireModif[0].relache == true) {
						//trace("correctionValeur * longueurModif[0].valeur " + correctionValeur * aireModif[0].valeur );
						//trace("clip.uSI: " +clip.uSI );
						//trace("" + );
						var maValM1:Number = transformerEnUniteBase(uniteATransformer[3], uniteATransformer[1], uniteATransformer[2]);
						var maValM2:Number = transformerEnUniteBase(correctionValeur * aireModif[0].valeur , uniteSI, 2);
						trace("aire maValM1: " + arrondi(maValM1,1));
						trace("aire maValM2: " + arrondi(maValM2,1));
						var monTest:Boolean=analyse(arrondi(maValM1,1),arrondi(maValM2,1));
						if (monTest == true) {
							fondMc.suite_btn._visible = true;
						}else {
							fondMc.suite_btn._visible = false;
						}
						
					}else {
						fondMc.suite_btn._visible = false;
					}
				}
				
			break;
		case "volume" :
			trace("volume dans test")
				delete fondMc.onEnterFrame();
				for (i = 0; i <nbMaxFleches; i++)
				{
					longueurC[i].visibilite(false);
					longueurC[i].rendrePossible(false);
				}
				for (i = 0; i <nbMaxCarres; i++)
				{
					aireC[i].visibilite(false);
					aireC[i].rendrePossible(false);
				}
				for (i = 0; i <nbMaxMasses; i++)
				{
					masseC[i].visibilite(false);
					masseC[i].rendrePossible(false);
				}
				posDepCubeX = posDepCubeXini;
				posDepCubeY = posDepCubeYini;
				for (i = 0; i <nbMaxCubes; i++)
				{
					//On rend les clips enabled=true
					volumeC[i].rendrePossible(true);
					nouvelleTaille = 100 * tailleClipV * uniteSI;
					volumeC[i].setTailleCube(nouvelleTaille);
					var positionX:Number;
					var positionY:Number;
					
					//Pour le décalage d'une ligne
					if ((nouvelleTaille * Math.floor(i / nbXMaxV)) % (nbZMaxV * nouvelleTaille) == 0 && (nouvelleTaille * Math.floor(i / nbXMaxV)) % (nbZMaxV * nouvelleTaille) != k)
					{
						posDepCubeX += nouvelleTaille / 2;
						posDepCubeY -= nouvelleTaille / 4;
					}
					positionX = posDepCubeX + nouvelleTaille*(i % nbXMaxV);
					positionY = posDepCubeY - (nouvelleTaille * Math.floor(i/nbXMaxV)) % (nbZMaxV*nouvelleTaille);
					k = nouvelleTaille * (Math.floor(i / nbXMaxV) % nbZMaxV);
					volumeC[i].setPosition(positionX, positionY);
					fondMc.valeurTrouvee.text = 1;
					fondMc.uniteChoisie.text = clip.symbole;
					fondMc.uniteChoisieExposant.text = clip.exposant;
					if (clip.exposant != 2 && clip.exposant != 3) {
						fondMc.uniteChoisie.text = "";
					}
				}
				//On rend le premier cube visible
				volumeC[0].visibilite(false);
				longueurModif[0].visibilite(false);
				aireModif[0].visibilite(false);
				volumeModif[0].visibilite(true);
				masseModif[0].visibilite(false); 
				
				comparaisonTaillesUnites(clip, 3);
				
				fondMc.onEnterFrame = function()
				{
					if (volumeModif[0].bouge == true) {
						fondMc.monMicroscope._visible = false;
						fondMc.maLoupe._visible = false;
						fondMc.monMicroscopeD._visible = false;
						fondMc.maLoupeD._visible = false;
						longueurBase[1].visibilite(false);
						aireBase[1].visibilite(false);
						volumeBase[1].visibilite(false);
						masseBase[1].visibilite(false);
						//fondMc.valeurTrouvee.text = correctionValeur * volumeModif[0].valeur * Math.pow(1 / clip.uSI, 3);
						fondMc.valeurTrouvee.text = affichage(correctionValeur * volumeModif[0].valeur,uniteSI, uniteATransformer[1],3);
						fondMc.uniteChoisie.text = accord(clip.symbole, volumeModif[0].valeur * Math.pow(1 / uniteSI, 3) );
					}else if (volumeModif[0].relache == true) {
						//trace("correctionValeur * longueurModif[0].valeur " + correctionValeur * longueurModif[0].valeur );
						//trace("clip.uSI: " +clip.uSI );
						var maValM1:Number = transformerEnUniteBase(uniteATransformer[3], uniteATransformer[1], uniteATransformer[2]);
						var maValM2:Number = transformerEnUniteBase(correctionValeur * volumeModif[0].valeur , uniteSI, 3);
						trace("volume maValM1: " + arrondi(maValM1,1));
						trace("volume maValM2: " + arrondi(maValM2,1));
						var monTest:Boolean=analyse(arrondi(maValM1,1),arrondi(maValM2,1));
						if (monTest == true) {
							fondMc.suite_btn._visible = true;
						}else {
							fondMc.suite_btn._visible = false;
						}
						
					}else {
						fondMc.suite_btn._visible = false;
					}
				}
				
			break;
			case "masse" :
				trace("masse dans test");
				delete fondMc.onEnterFrame();
				for (i = 0; i <nbMaxFleches; i++)
				{
					longueurC[i].visibilite(false);
					longueurC[i].rendrePossible(false);
				}
				posDepMasseX = posDepMasseXini;
				posDepMasseY = posDepMasseYini;
				for (i = 0; i <nbMaxMasses; i++)
				{
					//On rend les clips enabled=true
					masseC[i].rendrePossible(true);
					
					nouvelleTaille = 100*tailleClipA * uniteSI;
					masseC[i].setTailleMasse(1,Math.pow(nouvelleTaille, 1/2), Math.pow(nouvelleTaille, 1/2));
					//On calcule la positiondu clip pour qu'on obtienne le carré
					var positionX:Number;
					var positionY:Number;
					positionX=posDepMasseX + nouvelleTaille*(i % nbXMaxA);
					positionY=posDepMasseY-(nouvelleTaille*Math.floor(i/nbXMaxA))%(nbZMaxA*nouvelleTaille);
					masseC[i].setPosition(positionX, positionY);
					fondMc.valeurTrouvee.text = 1;
					fondMc.uniteChoisie.text = clip.symbole;
					fondMc.uniteChoisieExposant.text = ""; 
				}
				for (i = 0; i <nbMaxCubes; i++)
				{
					volumeC[i].visibilite(false);
					volumeC[i].rendrePossible(false);
				}
				aireC[0].visibilite(false);
				longueurModif[0].visibilite(false);
				aireModif[0].visibilite(false);
				volumeModif[0].visibilite(false);
				masseModif[0].visibilite(true);
				
				comparaisonTaillesUnites(clip, 4);
				
				fondMc.onEnterFrame = function()
				{
					if (masseModif[0].bouge == true) {
						fondMc.monMicroscope._visible = false;
						fondMc.maLoupe._visible = false;
						fondMc.monMicroscopeD._visible = false;
						fondMc.maLoupeD._visible = false;
						longueurBase[1].visibilite(false);
						aireBase[1].visibilite(false);
						volumeBase[1].visibilite(false);
						masseBase[1].visibilite(false);
						//fondMc.valeurTrouvee.text = correctionValeur * masseModif[0].valeur * Math.pow(1 / clip.uSI, 2);
						fondMc.valeurTrouvee.text = affichage(correctionValeur * masseModif[0].valeur,uniteSI, uniteATransformer[1],1);
						fondMc.uniteChoisie.text = accord(clip.symbole, masseModif[0].valeur * Math.pow(1 / uniteSI, 2) );
						//trace("correctionValeur: test" + correctionValeur);
					}else if (masseModif[0].relache == true) {
						//trace("correctionValeur * longueurModif[0].valeur " + correctionValeur * longueurModif[0].valeur );
						//trace("clip.uSI: " +clip.uSI );
						var maValM1:Number = transformerEnUniteBase(uniteATransformer[3], uniteATransformer[1], uniteATransformer[2]);
						var maValM2:Number = transformerEnUniteBase(correctionValeur * masseModif[0].valeur , uniteSI, 1);
						trace("masse maValM1: " + arrondi(maValM1,1));
						trace("masse maValM2: " + arrondi(maValM2,1));
						var monTest:Boolean=analyse(arrondi(maValM1,1),arrondi(maValM2,1));
						if (monTest == true) {
							fondMc.suite_btn._visible = true;
						}else {
							fondMc.suite_btn._visible = false;
						}
						
					}else {
						fondMc.suite_btn._visible = false;
					}
					
				}
			break;
			case "temps" :
				trace("temps");
			break;
			case "capacite" :
				trace("capacité");
				delete fondMc.onEnterFrame();
				for (i = 0; i <nbMaxFleches; i++)
				{
					longueurC[i].visibilite(false);
					longueurC[i].rendrePossible(false);
				}
				for (i = 0; i <nbMaxCarres; i++)
				{
					aireC[i].visibilite(false);
					aireC[i].rendrePossible(false);
				}
				for (i = 0; i <nbMaxMasses; i++)
				{
					masseC[i].visibilite(false);
					masseC[i].rendrePossible(false);
				}
				posDepCubeX = posDepCubeXini;
				posDepCubeY = posDepCubeYini;
				for (i = 0; i <nbMaxCubes; i++)
				{
					//On rend les clips enabled=true
					volumeC[i].rendrePossible(true);
					nouvelleTaille = 100 * tailleClipV * uniteSI;
					volumeC[i].setTailleCube(nouvelleTaille);
					var positionX:Number;
					var positionY:Number;
					
					//Pour le décalage d'une ligne
					if ((nouvelleTaille * Math.floor(i / nbXMaxV)) % (nbZMaxV * nouvelleTaille) == 0 && (nouvelleTaille * Math.floor(i / nbXMaxV)) % (nbZMaxV * nouvelleTaille) != k)
					{
						posDepCubeX += nouvelleTaille / 2;
						posDepCubeY -= nouvelleTaille / 4;
					}
					positionX = posDepCubeX + nouvelleTaille*(i % nbXMaxV);
					positionY = posDepCubeY - (nouvelleTaille * Math.floor(i/nbXMaxV)) % (nbZMaxV*nouvelleTaille);
					k = nouvelleTaille * (Math.floor(i / nbXMaxV) % nbZMaxV);
					volumeC[i].setPosition(positionX, positionY);
					fondMc.valeurTrouvee.text = 1;
					fondMc.uniteChoisie.text = clip.symbole;
					fondMc.uniteChoisieExposant.text = "";
				}
				//On rend le premier cube visible
				volumeC[0].visibilite(false);
				longueurModif[0].visibilite(false);
				aireModif[0].visibilite(false);
				volumeModif[0].visibilite(true);
				masseModif[0].visibilite(false); 
				
				comparaisonTaillesUnites(clip, 3);
				
				fondMc.onEnterFrame = function()
				{
					if (volumeModif[0].bouge == true) {
						fondMc.monMicroscope._visible = false;
						fondMc.maLoupe._visible = false;
						fondMc.monMicroscopeD._visible = false;
						fondMc.maLoupeD._visible = false;
						longueurBase[1].visibilite(false);
						aireBase[1].visibilite(false);
						volumeBase[1].visibilite(false);
						masseBase[1].visibilite(false);
						//fondMc.valeurTrouvee.text = correctionValeur * volumeModif[0].valeur * Math.pow(1 / clip.uSI, 3);
						fondMc.valeurTrouvee.text = affichage(correctionValeur * volumeModif[0].valeur,uniteSI,uniteATransformer[1] ,3);
						fondMc.uniteChoisie.text = accord(clip.symbole, volumeModif[0].valeur * Math.pow(1 / uniteSI, 3) );
					}else if (volumeModif[0].relache == true) {
						//trace("correctionValeur * longueurModif[0].valeur " + correctionValeur * volumeModif[0].valeur );
						//trace("clip.uSI: " +clip.uSI );
						var maValM1:Number = transformerEnUniteBase(uniteATransformer[3], uniteATransformer[1], uniteATransformer[2]);
						var maValM2:Number = transformerEnUniteBase(0.001*correctionValeur * volumeModif[0].valeur , uniteSI, 1);
						//trace("Capacite maValM1: " + arrondi(maValM1,1));
						//trace("Capacite maValM2: " + arrondi(maValM2,1));
						var monTest:Boolean=analyse(arrondi(maValM1,1),arrondi(maValM2,1));
						if (monTest == true) {
							fondMc.suite_btn._visible = true;
						}else {
							fondMc.suite_btn._visible = false;
						}
						
					}else {
						fondMc.suite_btn._visible = false;
					}
				}
				
			break;
			default :
				trace ("default test: "+clip.categorie);
			break;
		}
	return clip.categorie;	
}
function rendreVisibleObjet()
{
	fondMc.info.text = "Nb de transformations faites: " + nbDeTransformationsFaites + "/" + nbDeTransformationsAFaire;
	fondMc.suite_btn._visible = false;
	//On incrémente le nombre de transformation faitesou on affiche le bouton fin
	if (nbDeTransformationsFaites == nbDeTransformationsAFaire) {
		fondMc.fin_btn._visible = true;
		_level0.rep_juste = true;
		_level0.retour = "Bravo!\nPasse à l'exercice suivant.";
	}else {
		_level0.rep_juste = false;
		_level0.retour = "Tu n'as pas tout fait.\nTu dois recommencer.";
		nbDeTransformationsFaites = nbDeTransformationsFaites + 1;
		switch (tirageObjetATransformer())
					{
						case 1:
							longueurBase[0].visibilite(true);
							aireBase[0].visibilite(false);
							volumeBase[0].visibilite(false);
							masseBase[0].visibilite(false);
							uniteATransformer = longueurBase[0].choixUnite();
							//En position[0] l'unité
							//En position[1] le coefficient par rapport à l'unité de base (m, l, g)
							//En position[2] la dimension (1, 2 ou 3)
							//En position [3]
							trace("uniteATransformer[0] depuis choixUnite: "+uniteATransformer[0])
							uniteATransformer.push(valeurATransformer(Math.pow(Number(uniteATransformer[1]), Number(uniteATransformer[2])), 1));
							fondMc.valeurATransf.text = uniteATransformer[3];
							//En position [4]
							uniteAtransformer.push(typeUniteATransformer);
							fondMc.uniteATransf.text = accord(uniteATransformer[0], uniteATransformer[3]);
							fondMc.uniteATransfExposant.text = "";
							break;
						case 2:
							longueurBase[0].visibilite(false);
							aireBase[0].visibilite(true);
							volumeBase[0].visibilite(false);
							masseBase[0].visibilite(false);
							uniteATransformer = aireBase[0].choixUnite();
							//En position [3]
							uniteATransformer.push(valeurATransformer(Math.pow(Number(uniteATransformer[1]), Number(uniteATransformer[2])), 2));
							//uniteATransformer.push(fondMc.valeurATransf.text );
							fondMc.valeurATransf.text = uniteATransformer[3];
							//En position [4]
							uniteAtransformer.push(typeUniteATransformer);
							fondMc.uniteATransf.text = accord(uniteATransformer[0], uniteATransformer[3]);
							fondMc.uniteATransfExposant.text = 2;
							break;
						case 3:
							//trace("cas 3 rendre visible")
							longueurBase[0].visibilite(false);
							aireBase[0].visibilite(false);
							volumeBase[0].visibilite(true);
							masseBase[0].visibilite(false);
							uniteATransformer = volumeBase[0].choixUnite();
							//En position [3]
							uniteATransformer.push(valeurATransformer(Math.pow(Number(uniteATransformer[1]), Number(uniteATransformer[2])), 3));
							fondMc.valeurATransf.text = uniteATransformer[3];
							//En position [4]
							uniteAtransformer.push(typeUniteATransformer);
							fondMc.uniteATransf.text = accord(uniteATransformer[0], uniteATransformer[3]);
							fondMc.uniteATransfExposant.text = 3;
							break;
						case 4:
							longueurBase[0].visibilite(false);
							aireBase[0].visibilite(false);
							volumeBase[0].visibilite(false);
							masseBase[0].visibilite(true);
							uniteATransformer = masseBase[0].choixUnite();
							//En position [3]
							uniteATransformer.push(valeurATransformer(Math.pow(Number(uniteATransformer[1]), Number(uniteATransformer[2])), 4));
							fondMc.valeurATransf.text = uniteATransformer[3];
							//En position [4]
							uniteAtransformer.push(typeUniteATransformer);
							fondMc.uniteATransf.text = accord(uniteATransformer[0], uniteATransformer[3]);
							fondMc.uniteATransfExposant.text = "";

							break;
						case 5:
							trace("cas 5 rendre visible")
							longueurBase[0].visibilite(false);
							aireBase[0].visibilite(false);
							volumeBase[0].visibilite(true);
							masseBase[0].visibilite(false);
							uniteATransformer = volumeBase[0].choixUnite();
							//En position [3]
							uniteATransformer.push(valeurATransformer(Math.pow(Number(uniteATransformer[1]), Number(uniteATransformer[2])), 3));
							//uniteATransformer.push(fondMc.valeurATransf.text );
							fondMc.valeurATransf.text = uniteATransformer[3];
							//En position [4]
							uniteAtransformer.push(typeUniteATransformer);
							fondMc.uniteATransf.text = accord(uniteATransformer[0], uniteATransformer[3]);

							fondMc.uniteATransfExposant.text = "";
							break;
					}

	}
}
function comparaisonTaillesUnites(monUniteChoisie, cas)
{
	var coefficient:Number;
	var taillePetit:Number = 2; // La taille du petit est de 10px, Elle correspond 0.1 unité de base
	var taillePetitBase:Number = 0.01;
	var tailleGrand:Number = 10;
	var tailleDansMicro:Number = 25;
	var tailleDansLoupe:Number = 25;
	
	longueurModif[0].active(true);
	aireModif[0].active(true);
	volumeModif[0].active(true);
	masseModif[0].active(true);
	var maCategorie:String = monUniteChoisie.categorie.toString();
	var monUSiStr:String = monUniteChoisie.uSI.toString();
	var monUSi:Number = Number(monUSiStr);
	if (monUSi == 0) {
		maCategorie="USI=0"
	}
	//trace ("typeof monUSi" + typeof(monUSi))
	//trace("monUSi"+monUSi)
	//trace("maCategorie" + typeof(maCategorie))
	//trace("uniteAtransformer[4]" +typeof(uniteAtransformer[4]) )
	//trace("maCategorie" + maCategorie)
	//trace("uniteAtransformer[4]"+uniteAtransformer[4])
		if (uniteAtransformer[4] == maCategorie)
		{
			trace("unite OK");
			trace("  ");
			trace ("Valeur a transformer"+uniteAtransformer[3])
			//coef par rapport au m
			trace("uniteAtransformer[1]: " + uniteAtransformer[1]);
			//coef par rapport au m
			trace("monUniteChoisie.uSI: " + monUSi);
			//Puissance
			trace("uniteAtransformer[2]: " + uniteAtransformer[2]);
			//rapport entre les 2 coefficients
			trace("uniteAtransformer[1]/monUniteChoisie.uSI: " + uniteAtransformer[1] / monUSi)
			//valeur du test dans switch:
			trace("valeur du test dans switch: : "+(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], uniteAtransformer[2])) / Math.pow(monUSi, uniteAtransformer[2]))
			switch(true)
			{
				//case si la valeur à transformer en m, m2, m3 ou kg/l'unité choisie donne un nombre
				case ((uniteAtransformer[3] * Math.pow(uniteAtransformer[1], uniteAtransformer[2])) / Math.pow(monUSi, uniteAtransformer[2]) > 6500):
					//case (uniteAtransformer[3] * uniteAtransformer[1] / monUniteChoisie.uSI >  500):
					fondMc.monMicroscope._visible = true;
					fondMc.maLoupe._visible = false;
					//trace("uniteAtransformer[3] * Math.pow(uniteAtransformer[1], cas)) / Math.pow(monUniteChoisie.uSI, cas) > 6500")
					//trace("(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], cas)) "+(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], uniteAtransformer[2])))
					//trace("monUniteChoisie.uSI "+monUSi)
						fondMc.monMicroscope._visible = true;
						fondMc.maLoupe._visible = false;
						fondMc.monMicroscopeD._visible = false;
						fondMc.maLoupeD._visible = false;
						
						fondMc.monMicroscope._x = 100;
						longueurBase[1].setPosition(55, 165);
						aireBase[1].setPosition(55, 185);
						volumeBase[1].setPosition(55, 185);
						masseBase[1].setPosition(55, 185);
						
						coefficient = monUSi;
						//On fait grand la partie droite
						longueurBase[0].setTailleFleche(1,100 * uniteAtransformer[3]  * uniteAtransformer[1] );
						aireBase[0].setTailleRectangle(1, 100 * Math.sqrt(uniteAtransformer[3]  * Math.pow(uniteAtransformer[1], 2) ), 100 * Math.sqrt(uniteAtransformer[3]  * Math.pow(uniteAtransformer[1], 2) ));
						volumeBase[0].setTailleParaRec(1, 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3));
						masseBase[0].setTailleMasse(1, 100 * Math.sqrt(uniteAtransformer[3] * uniteAtransformer[1]), 100 * Math.sqrt(uniteAtransformer[3] * uniteAtransformer[1]));
						
						fondMc.valeurTrouvee.text = "~1";
						
						//On fait tout petit la partie gauche qui est sous le microscope
						longueurModif[0].setTailleSegment(coefficient, taillePetit/coefficient);
						aireModif[0].setTailleRectangle(coefficient, taillePetit/coefficient,taillePetit/coefficient);
						volumeModif[0].setTailleParaRec(coefficient, taillePetit/coefficient,taillePetit/coefficient,2/coefficient);
						masseModif[0].setTailleMasse(coefficient, taillePetit/coefficient, taillePetit/coefficient);
						
						//correctionValeur= uniteAtransformer[1] / monUSi;
					
						//trace("correctionValeur: " + correctionValeur);
						//trace("affichageATransformer: " +affichageATransformer );
						//trace("")
						
						switch (cas)
						{
						case 1:
							//longueurBase[1].setPosition(55,);
							longueurBase[1].visibilite(true);
							aireBase[1].visibilite(false);
							volumeBase[1].visibilite(false);
							masseBase[1].visibilite(false);
							if (coefficient == 0.000001) {
								trace("MICRON")
								correctionValeur = 10000*monUSi;
							}else {
								correctionValeur = monUSi/100;
							}
							
							break;
						case 2:
							longueurBase[1].visibilite(false);
							aireBase[1].visibilite(true);
							volumeBase[1].visibilite(false);
							masseBase[1].visibilite(false);
							
							correctionValeur = 1/10000;
							break;
						case 3:
							longueurBase[1].visibilite(false);
							aireBase[1].visibilite(false);
							volumeBase[1].visibilite(true);
							masseBase[1].visibilite(false);
							
							correctionValeur = 1/1000000;
							break;
						case 4:
							longueurBase[1].visibilite(false);
							aireBase[1].visibilite(false);
							volumeBase[1].visibilite(false);
							masseBase[1].visibilite(true);
							
							correctionValeur = monUSi/10000;
							break;
						case 5:
							longueurBase[1].visibilite(false);
							aireBase[1].visibilite(false);
							volumeBase[1].visibilite(true);
							masseBase[1].visibilite(false);
							
							correctionValeur = monUSi/100;
							break;
						}

					fondMc.monMicroscope._y = 170;
					//fondMc.monMicroscopeD._y = 170;
					
					longueurBase[1].setTailleFleche(tailleDansMicro,1);
					aireBase[1].setTailleRectangle(tailleDansMicro,1,1);
					volumeBase[1].setTailleParaRec(tailleDansMicro,1,1,1);
					masseBase[1].setTailleMasse(tailleDansMicro,1,1);
					
					
					
					
					break;
				//case (uniteAtransformer[3] * uniteAtransformer[1] / monUSi >  5):
				case ((uniteAtransformer[3] * Math.pow(uniteAtransformer[1], uniteAtransformer[2])) / Math.pow(monUSi, uniteAtransformer[2]) > 65):	
					trace("uniteAtransformer[3] * uniteAtransformer[1] / monUSi >= 100")
					trace("uniteAtransformer[3]: "+uniteAtransformer[3])
					trace("uniteAtransformer[3] * uniteAtransformer[1] "+uniteAtransformer[3] * uniteAtransformer[1])
					trace("monUSi "+monUSi)
					
						fondMc.monMicroscope._visible = false;
						fondMc.maLoupe._visible = true;
						fondMc.monMicroscopeD._visible = false;
						fondMc.maLoupeD._visible = false;
						
						fondMc.maLoupe._x = 93;
						fondMc.maLoupe._y = 200;
						longueurBase[1].setPosition(77, 185);
						aireBase[1].setPosition(77, 215);
						volumeBase[1].setPosition(77, 215);
						masseBase[1].setPosition(77, 215);
						
						affichageATransformer = uniteAtransformer[1];
						coefficient = monUSi;
						//On fait grand la partie droite
						longueurBase[0].setTailleFleche(1,100 * uniteAtransformer[3]  * uniteAtransformer[1] );
						aireBase[0].setTailleRectangle(1, 100 * Math.sqrt(uniteAtransformer[3]  * Math.pow(uniteAtransformer[1], 2) ), 100 * Math.sqrt(uniteAtransformer[3]  * Math.pow(uniteAtransformer[1], 2) ));
						volumeBase[0].setTailleParaRec(1, 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3));
						masseBase[0].setTailleMasse(1, 100 * Math.sqrt(uniteAtransformer[3] * uniteAtransformer[1]), 100 * Math.sqrt(uniteAtransformer[3] * uniteAtransformer[1]));
						
						//On fait tout petit la partie gauche qui est sous la loupe
						longueurModif[0].setTailleSegment(coefficient, 10/coefficient);
						aireModif[0].setTailleRectangle(coefficient, 10/coefficient,10/coefficient);
						volumeModif[0].setTailleParaRec(coefficient, 10/coefficient,10/coefficient,10/coefficient);
						masseModif[0].setTailleMasse(coefficient, 10/coefficient,10/coefficient);
						
						fondMc.valeurTrouvee.text = "1";
						
						correctionValeur = 100*monUSi/taillePetit;
						trace("correctionValeur: " + correctionValeur);
						trace("affichageATransformer: " +affichageATransformer );
						trace("")
						switch (cas)
						{
						case 1:
							fondMc.maLoupe._y = 190;
							
							longueurBase[1].visibilite(true);
							aireBase[1].visibilite(false);
							volumeBase[1].visibilite(false);
							masseBase[1].visibilite(false);
							
							correctionValeur = 1/100;
							break;
						case 2:
							longueurBase[1].visibilite(false);
							aireBase[1].visibilite(true);
							volumeBase[1].visibilite(false);
							masseBase[1].visibilite(false);
							
							correctionValeur = 1/10000;
							break;
						case 3:
							longueurBase[1].visibilite(false);
							aireBase[1].visibilite(false);
							volumeBase[1].visibilite(true);
							masseBase[1].visibilite(false);
							
							correctionValeur = 1/1000000;
							break;
						case 4:
							longueurBase[1].visibilite(false);
							aireBase[1].visibilite(false);
							volumeBase[1].visibilite(false);
							masseBase[1].visibilite(true);
							
							correctionValeur = monUSi/10000;
							break;
						case 5:
							longueurBase[1].visibilite(false);
							aireBase[1].visibilite(false);
							volumeBase[1].visibilite(true);
							masseBase[1].visibilite(false);
							
							correctionValeur = 1/100;
							break;
					}
					
					fondMc.maLoupeD._y = 200;
					
					longueurBase[1].setTailleFleche(tailleDansLoupe,1);
					aireBase[1].setTailleRectangle(tailleDansLoupe, 1,1);
					volumeBase[1].setTailleParaRec(tailleDansLoupe, 1,1,1);
					masseBase[1].setTailleMasse(tailleDansLoupe,1,1);	
					
					
					

					break;

				default:
					trace("default de comparaison")
					var valeurAffichee:Number;
					longueurBase[0].setTailleFleche(1,100 * uniteAtransformer[3]  * uniteAtransformer[1] );
					aireBase[0].setTailleRectangle(1, 100 * Math.sqrt(uniteAtransformer[3]  * Math.pow(uniteAtransformer[1], 2) ), 100 * Math.sqrt(uniteAtransformer[3]  * Math.pow(uniteAtransformer[1], 2) ));
					volumeBase[0].setTailleParaRec(1, 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3));
					masseBase[0].setTailleMasse(1, 100 * Math.sqrt(uniteAtransformer[3] * uniteAtransformer[1]), 100 * Math.sqrt(uniteAtransformer[3] * uniteAtransformer[1]));
					longueurBase[1].visibilite(false);
					aireBase[1].visibilite(false);
					volumeBase[1].visibilite(false);
					masseBase[1].visibilite(false);
					fondMc.monMicroscope._visible = false;
					fondMc.maLoupe._visible = false;
					switch (cas)
					{
						case 1:
							trace ("cas 1")
							coefficient = monUSi;
							correctionValeur = 1 / 100;
							if (coefficient == 0.1) {
								valeurAffichee = 1;
								longueurModif[0].setTailleSegment(coefficient, 10/coefficient);
							}else{
								valeurAffichee = 1 / coefficient;
								longueurModif[0].setTailleSegment(coefficient, 100 / coefficient);
							}
							break;
						case 2:
							trace("cas 2")
							coefficient = monUSi;
							if (coefficient >=10) {
								coefficient = 10;
								correctionValeur = 1 / (Math.pow(monUSi, 2) * 100);
								valeurAffichee = 100 * correctionValeur;
								aireModif[0].setTailleRectangle(coefficient, 100 / coefficient, 100 / coefficient);
							}else if (coefficient > 0.1 && coefficient < 1) {
								aireModif[0].setTailleRectangle(coefficient, 100, 100);
								correctionValeur = 1/ (Math.pow(monUSi, 2) *100000);
								valeurAffichee = 1;
							}else{
								correctionValeur = monUSi / 10000;
								valeurAffichee = 1;
								aireModif[0].setTailleRectangle(coefficient, 100/coefficient,100/coefficient);
							}
							break;
						case 3:
							trace("cas 3 de default")
							coefficient = monUSi;
							correctionValeur = 1 / 1000000;
							valeurAffichee = 1;
							break;
						case 4:
							trace("cas 4")
							coefficient = monUSi;
							trace("Coefficient"+Coefficient)
							if (coefficient > 10) {
								coefficient = 10;
								correctionValeur = monUSi / (100000000);
								valeurAffichee = 100 * correctionValeur;
							}else{
								correctionValeur = monUSi / 10000;
								valeurAffichee = 1;
							}
							//trace("default, cas 4, monUSi: " + monUSi);
							//trace("default, cas 4, uniteAtransformer[1]: " + uniteAtransformer[1]);
							//trace("default, cas 4, 100 *  uniteAtransformer[1] / monUSi: " + 100 *  uniteAtransformer[1] / monUSi);
							break;
						case 5:
							trace("cas 5")
							coefficient = monUSi;
							correctionValeur = 1 / 100;
							valeurAffichee = correctionValeur;
							break;
							
					}
					
					//trace("default correctionValeur: " + correctionValeur);
					//trace("affichageATransformer: " +affichageATransformer );
					//trace("monUSi: " +monUSi );
					//fondMc.valeurTrouvee.text = "?";
					fondMc.uniteChoisie.text = monUniteChoisie.symbole;
					//On met une valeur de 100px et on adaptela valeur affichée
					//longueurModif[0].setTailleSegment(coefficient, 100/coefficient);
					//aireModif[0].setTailleRectangle(coefficient, 100/coefficient,100/coefficient);
					volumeModif[0].setTailleParaRec(coefficient, 100/coefficient,100/coefficient,100/coefficient);
					masseModif[0].setTailleMasse(coefficient, 100 / coefficient, 100 / coefficient);
					
					fondMc.valeurTrouvee.text = valeurAffichee;
					trace("")
					break;
			}
		}else if (uniteAtransformer[4] == "volume" && maCategorie== "capacite") {
			trace ("on est dans les capacités");
			trace("valeur dans capacité: "+(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], uniteAtransformer[2])) / (monUSi*0.001))
			switch(true)
			{
				//case si la valeur à transformer en m, m2, m3 ou kg/l'unité choisie donne un nombre
				case ((uniteAtransformer[3] * Math.pow(uniteAtransformer[1], uniteAtransformer[2])) / (monUSi*0.001) > 6500):
					//case (uniteAtransformer[3] * uniteAtransformer[1] / monUSi >  500):
					fondMc.monMicroscope._visible = true;
					fondMc.maLoupe._visible = false;
					trace("uniteAtransformer[3] * Math.pow(uniteAtransformer[1], cas)) / Math.pow(monUSi, cas) > 6500")
					trace("(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], cas)) "+(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], uniteAtransformer[2])))
					trace("monUSi "+monUSi)
					fondMc.monMicroscope._visible = true;
					fondMc.maLoupe._visible = false;
					fondMc.monMicroscopeD._visible = false;
					fondMc.maLoupeD._visible = false;
					
					fondMc.monMicroscope._x = 100;

					volumeBase[1].setPosition(55, 185);
					
					coefficient = monUSi;
					//On fait grand la partie droite

					volumeBase[0].setTailleParaRec(1, 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3));
					
					fondMc.valeurTrouvee.text = "~1";
					
					//On fait tout petit la partie gauche qui est sous le microscope
					volumeModif[0].setTailleParaRec(coefficient, taillePetit / coefficient, taillePetit / coefficient, 2 / coefficient);
					//Si c'est des décilitres, fait un peu plus gros
					if (coefficient==0.1) {
						volumeModif[0].setTailleParaRec(coefficient, 10 / coefficient, 10 / coefficient, 1 / coefficient);
					}
					if (coefficient==0.01) {
						volumeModif[0].setTailleParaRec(coefficient, 10 / coefficient, 1 / coefficient, 1 / coefficient);
					}

					volumeBase[1].visibilite(true);
					correctionValeur = Math.pow(10 * monUSi, 2) / 100000;
					trace("correctionValeur: " + correctionValeur);
					trace("affichageATransformer: " +affichageATransformer );
					trace("")

					fondMc.monMicroscope._y = 170;

					volumeBase[1].setTailleParaRec(tailleDansMicro,1,1,1);

					break;

				case ((uniteAtransformer[3] * Math.pow(uniteAtransformer[1], uniteAtransformer[2])) / (monUSi*0.001) > 65):	
					trace("uniteAtransformer[3] * uniteAtransformer[1] / monUSi >= 100")
					trace("uniteAtransformer[3]: "+uniteAtransformer[3])
					trace("uniteAtransformer[3] * uniteAtransformer[1] "+uniteAtransformer[3] * uniteAtransformer[1])
					trace("monUSi "+monUSi)
					
						fondMc.monMicroscope._visible = false;
						fondMc.maLoupe._visible = true;
						fondMc.monMicroscopeD._visible = false;
						fondMc.maLoupeD._visible = false;
						
						fondMc.maLoupe._x = 93;
						fondMc.maLoupe._y = 200;

						volumeBase[1].setPosition(77, 215);
						
						affichageATransformer = uniteAtransformer[1];
						coefficient = monUSi;
						//On fait grand la partie droite
						volumeBase[0].setTailleParaRec(1, 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3));
						
						//On fait tout petit la partie gauche qui est sous la loupe

						volumeModif[0].setTailleParaRec(coefficient, 10/coefficient,10/coefficient,10/coefficient);
						
						fondMc.valeurTrouvee.text = "1";
						
						correctionValeur = 100*monUSi/taillePetit;
						trace("correctionValeur: " + correctionValeur);
						trace("affichageATransformer: " +affichageATransformer );
						trace("")

						volumeBase[1].visibilite(true);
						masseBase[1].visibilite(false);
						
						correctionValeur = 1/1000;
							
					//fondMc.maLoupe._y = 200;
					fondMc.maLoupeD._y = 200;

					volumeBase[1].setTailleParaRec(tailleDansLoupe, 1,1,1);
					break;

				default:
					trace("default capacité")

					volumeBase[0].setTailleParaRec(1, 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3), 100 * Math.pow(uniteAtransformer[3] * Math.pow(uniteAtransformer[1], 3), 1 / 3));
					longueurBase[1].visibilite(false);
					aireBase[1].visibilite(false);
					volumeBase[1].visibilite(false);
					masseBase[1].visibilite(false);
					
					fondMc.monMicroscope._visible = false;
					fondMc.maLoupe._visible = false;

					coefficient = monUSi;
					correctionValeur =10;

					fondMc.valeurTrouvee.text = 1;
					fondMc.uniteChoisie.text = monUniteChoisie.symbole;

					volumeModif[0].setTailleParaRec(coefficient, 100/coefficient,100/coefficient,10/coefficient);

					trace("")
					break;
			}
		}else {
			trace("mauvaise unite");
			fondMc.monMicroscope._visible = false;
			fondMc.maLoupe._visible = false;
			longueurBase[1].visibilite(false);
			aireBase[1].visibilite(false);
			volumeBase[1].visibilite(false);
			masseBase[1].visibilite(false);
		}
			
	
}
//Le coefficient est la valeur par rapport à l'unité de base: m, m2, m3, l, kg. monUnite correspond à la transformation 1 pour les longueurs, capapcités, masses
//2 pour les aires et 3 pour les volumes
function valeurATransformer(coefficient, monUnite):Number
{
	var maValeur:Number;
	switch(monUnite) {
		
		case 1:
			typeUniteATransformer = "longueur";
			trace("Pour les longueurs");
			switch (true)
			{
				case (coefficient <= 0.001):
					maValeur = 500 + Math.round(Math.random() * 6000);
					break;
				case (coefficient <= 0.01):
					maValeur = 50 + Math.round(Math.random() * 600);
					break;
				case (coefficient <= 0.1):
					maValeur = 5 + Math.round(Math.random() * 60);
					break;
				case (coefficient <= 1):
					maValeur = 0.5 + Math.round(Math.random() * 6*10)/10;
					break;
				case (coefficient <= 10):
					maValeur = 0.05 + Math.round(Math.random() * 6)/10;
					break;
				case (coefficient <= 100):
					maValeur = 0.005 + Math.round(Math.random() * 6)/100;
					break;
				default:
					maValeur = 0.0005 + Math.round(Math.random() * 6)/1000;
					break;
			}

			//On aimerait que 1km corresponde à 100 pixels d'où le /100 hm et dam ont été retirés de la liste
			longueurBase[0].setTailleFleche(1,100 * maValeur * coefficient);
			break;
		case 2:
			typeUniteATransformer = "aire";
			trace("Pour les aires");
			switch (true)
			{
				case (coefficient <= 0.000001):
					maValeur = 500000 + Math.round(Math.random() * 4000000);
					trace("mm2")
					break;
				case (coefficient <= 0.0001):
					trace("cm2")
					maValeur = 5000 + Math.round(Math.random() * 40000);
					break;
				//J'ai du mettre 0.01001 car il doit y avoir un probélème d'arrondi avec 0.01 qui passait à 1
				case (coefficient <= 0.01001):
					trace("dm2")
					maValeur = 50 + Math.round(Math.random() * 400);
					break;
				case (coefficient <= 1):
					trace("coefficient: "+coefficient)
					trace("m2")
					maValeur = 0.5 + Math.round(Math.random() * 4 * 10) / 10;
					break;
				case (coefficient <= 100):
					trace("dam2")
					maValeur = 0.005 + Math.round(Math.random() * 4)/100;
					break;
				case (coefficient <= 100000):
					trace("hm2")
					maValeur = 0.00005 + Math.round(Math.random() * 4)/10000;
					break;
				default:
					trace("km2")
					maValeur = 0.0000005 + Math.round(Math.random() * 4) / 1000000;
					break;
			}
			trace("Math.sqrt(maValeur* coefficient); " + Math.sqrt(maValeur * coefficient));

			aireBase[0].setTailleRectangle(1, 100 * Math.sqrt(maValeur * coefficient), 100 * Math.sqrt(maValeur * coefficient));
			break;
		case 3:
			typeUniteATransformer = "volume";
			trace("Pour les volumes");
			trace("coefficient: " + coefficient)
			//On essaie d'enlever les problèmes à la xième décimale
			coefficient = Math.pow(Math.round(Math.pow(coefficient, 1/3)*1000)/1000, 3);
			trace("coefficient: "+coefficient)
			switch (true)
			{
				case (coefficient <= Math.round(Math.pow(10, -9)*1000000000)/1000000000):
					trace("mm3")
					maValeur = 500000000 + Math.round(Math.random() * 4000000000);
					break;
				case (coefficient <= (0.000001001*1000000)/1000000):
					trace("cm3")
					maValeur = 500000 + Math.round(Math.random() * 4000000);
					break;
				case (coefficient <= (0.00100001*1000)/1000):
					trace("dm3")
					maValeur = 500 + Math.round(Math.random() * 4000);
					break;
				case (coefficient <= 1):
					trace("m3")
					maValeur = 0.5 + Math.round(Math.random() * 4 * 10) / 10;
					break;
				//Aura-t-on besoin d'unités pareilles? NON
				case (coefficient <= Math.pow(10, 3)):
					trace("dam3")
					maValeur = 0.0005 + Math.round(Math.random() * 4)/1000;
					break;
				case (coefficient <= Math.pow(10, 6)):
					trace("hm3")
					maValeur = 0.0000005 + Math.round(Math.random() * 4)/1000000;
					break;
				default:
					trace("km3")
					maValeur = 0.0000000005 + Math.round(Math.random() *4) / 1000000000;
					break;
			}
			trace("Math.pow(maValeur * coefficient, 1 / 3); " + Math.pow(maValeur * coefficient, 1 / 3));

			volumeBase[0].setTailleParaRec(1, 100 * Math.pow(maValeur * coefficient, 1 / 3), 100 * Math.pow(maValeur * coefficient, 1 / 3), 100 * Math.pow(maValeur * coefficient, 1 / 3));
			break;
		case 4:
			typeUniteATransformer = "masse";
			trace("Pour les masses");
			switch (true)
			{
				case (coefficient <= 0.000001):
					trace("mg");
					maValeur = 500000 + Math.round(Math.random() * 4000000);
					break;
				case (coefficient <= 0.00001):
					trace("cg");
					maValeur = 50000 + Math.round(Math.random() * 400000);
					break;
				case (coefficient <= 0.0001):
					trace("dg");
					maValeur = 5000 + Math.round(Math.random() * 40000);
					break;
				case (coefficient <= 0.001):
					trace("g");
					maValeur = 500 + Math.round(Math.random() * 4000);
					break;
				case (coefficient <= 0.01):
					trace("dag");
					maValeur = 50 + Math.round(Math.random() * 400);
					break;
				case (coefficient <= 0.1):
					trace("hg");
					maValeur = 5 + Math.round(Math.random() * 40);
					break;
				case (coefficient <= 1):
					trace("kg");
					maValeur = 0.5 + Math.round(Math.random() * 4);
					break;
				default:
					trace("tonne");
					maValeur = 0.0005 + Math.round(Math.random() * 4)/1000;
					break;
			}

			//On aimerait que 1kg corresponde à enivron sqrt(500) pixels d'où le 500*
			masseBase[0].setTailleMasse(1, 100 * Math.sqrt(maValeur * coefficient), 100 * Math.sqrt(maValeur * coefficient));
			
			break;
	}
	trace("maValeur"+maValeur)
	return maValeur;
}
function coefficientDepart(maValeurATransformer, monCoefficientBase, dimension):Number
{
	var coefDep:Number;
	var	monNombre:Number = maValeurATransformer * Math.pow(monCoefficientBase, dimension);
	
	trace("maValeurATransformer dans coefficientDepart: " + maValeurATransformer);
	trace("monCoefficientBase dans coefficientDepart: " + monCoefficientBase);
	trace("dimension dans coefficientDepart: " + dimension);
	trace("monNombre dans coefficientDepart: " + monNombre);
	switch (dimension)
	{
		case 1:
			switch (true)
			{
				case (monNombre <= 0.001):
					coefDep = 100;
					break;
				case (monNombre > 0.001 && monNombre <= 0.01):
					coefDep = 100;
					break;
				case(monNombre > 0.01 && monNombre <= 0.1):
					coefDep = 50;
					break;
				case(monNombre > 0.1 && monNombre <= 1):
					coefDep = 20;
					break;
				case(monNombre > 1 && monNombre <= 10):
					coefDep = 10;
					break;
				case (monNombre > 10 && monNombre <= 100):
					coefDep = 2;
					break;
				case (monNombre > 100 && monNombre <= 1000):
					coefDep = 1;
					break;
				case (monNombre > 1000):
					coefDep = 0.5;
					break;
				default:
					coefDep = 1;
					break;
			}
			break;
		case 2:
			switch (true)
			{
				case (monNombre <= 0.000001):
					coefDep = 100;
					break;
				case (monNombre > 0.000001 && monNombre <= 0.0001):
					coefDep = 100;
					break;
				case(monNombre > 0.0001 && monNombre <= 0.01):
					coefDep = 50;
					break;
				case(monNombre > 0.01 && monNombre <= 1):
					coefDep = 20;
					break;
				case(monNombre > 1 && monNombre <= 100):
					coefDep = 10;
					break;
				case (monNombre > 100 && monNombre <= 10000):
					coefDep = 2;
					break;
				case (monNombre > 1000 && monNombre <= 1000000):
					coefDep = 1;
					break;
				case (monNombre > 1000000):
					coefDep = 0.5;
					break;
				default:
					coefDep = 1;
					break;
			}
			break;
		case 3:
			switch (true)
			{
				case (monNombre <= 0.000000001):
					coefDep = 100;
					break;
				case (monNombre > 0.000000001 && monNombre <= 0.000001):
					coefDep = 100;
					break;
				case(monNombre > 0.000001 && monNombre <= 0.001):
					coefDep = 50;
					break;
				case(monNombre > 0.001 && monNombre <= 1):
					coefDep = 20;
					break;
				case(monNombre > 1 && monNombre <= 1000):
					coefDep = 10;
					break;
				case (monNombre > 1000 && monNombre <= 1000000):
					coefDep = 2;
					break;
				case (monNombre > 1000000 && monNombre <= 1000000000):
					coefDep = 1;
					break;
				case (monNombre > 1000000000):
					coefDep = 0.5;
					break;
				default:
					coefDep = 1;
					break;
			}
			break;
	}
	
	trace("coefDep dans coefficientDepart: " + coefDep);
	return coefDep;
}
function accord(mot, nombre):String
{
	mot = mot.toString();
	var monRetour:String=mot.toString();
	listeMot = listeMot.concat("doigt", "pied", "coudée", "pouce", "micron");
	
	for (i = 0; i < listeMot.length; i++)
	{
		if (nombre > 1 && mot==listeMot[i])
		{
				
				monRetour = listeMot[i] + "s";
		}
	}

	return monRetour;
	
	/*switch (mot)
		{
			case "doigt":
				if (Number(nombre > 1))
				{
					fondMc.uniteATransf.text = mot+"s";
				}else{
					fondMc.uniteATransf.text = mot;
				}
				break;
			case "pied":
				if (Number(nombre > 1))
				{
					fondMc.uniteATransf.text = mot+"s";
				}else{
					fondMc.uniteATransf.text = mot;
				}
				break;
			case "coudée":
				if (Number(nombre > 1))
				{
					fondMc.uniteATransf.text = mot+"s";
				}else{
					fondMc.uniteATransf.text = mot;
				}
				break;
			case "pouce":
				if (Number(nombre > 1))
				{
					fondMc.uniteATransf.text = mot+"s";
				}else{
					fondMc.uniteATransf.text = mot;
				}
				break;
			case "tonne":
				if (Number(uniteATransformer[3] > 1))
				{
					fondMc.uniteATransf.text = uniteATransformer[0]+"s";
				}else{
					fondMc.uniteATransf.text = uniteATransformer[0];
				}
				break;
			default:
				fondMc.uniteATransf.text = umot;
				break;
		}*/
}
function affichage(nb, coefChoisi, coefATransformer, dim):String
{
	var affichage:String;
	var monArrondi:Number;
	if (coefChoisi >= 1)
	{
		monArrondi = Math.round(nb * 10 * Math.pow(coefChoisi, dim)) / (10 * Math.pow(coefChoisi, dim));
		affichage = monArrondi.toString();
	}else if(10*coefChoisi < coefATransformer){
		monArrondi = Math.round(nb);
		affichage = monArrondi.toString();
	}else {
		switch(true) {
			case (coefChoisi / coefATransformer <= 10):
				monArrondi = Math.round(nb*Math.pow(10, dim))/Math.pow(10, dim);
				affichage = monArrondi.toString();
				trace ("affichage <10"+ monArrondi)
				break;
			case (coefChoisi / coefATransformer <= 100):
				
				//Si il y a un rapport de 100, on met 4 décimales quelle que soit la catégorie
				monArrondi = Math.round(nb*Math.pow(10, 4))/Math.pow(10, 4);
				affichage = monArrondi.toString();
				trace ("affichage <100"+ monArrondi)
				break;
			case (coefChoisi / coefATransformer <= 1000):
				
				//Si il y a un rapport de 100, on met 5 décimales quelle que soit la catégorie
				monArrondi = Math.round(nb*Math.pow(10, 5))/Math.pow(10, 4);
				affichage = monArrondi.toString();
				trace ("affichage <1000"+ monArrondi)
				break;
			default:
				trace ("default affichage")
				monArrondi = Math.round(nb);
				affichage = monArrondi.toString();
				break;
			
		}
		
	}
	return affichage;
}
trace ("affichage(123.456789,0.01,2)" + affichage(0.1023456789, 1000, 3));

function actionSolution ()
{
	if(_level0.rep_juste==true){
		vertTxt.text="Bravo tout est juste.";
		vert._visible=true;
		finVert._visible = true;
		fondV._visible = true;
	}else {	
		_level0.retour="Tu n'as pas tout transformé.";
		rougeFinTxt.text="Tu n'as pas tout transformé.";
		rougeFin._visible=true;
		finRouge._visible = true;
		fondRF._visible = true;
	}
}