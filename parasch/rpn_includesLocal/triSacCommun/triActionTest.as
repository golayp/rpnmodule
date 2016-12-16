/*
 * @author Jean-Michel Luthi
*/
		

//Action suivant le type d'unité
function actionSac()
{	
	//trace("surSac"+surSac)
	if(monUnite[numero].drag==true && surSac==false)
	{
		
		comportement();
	}else if (surSac == true) {
		surSac = false;
		var monTimer:timer = new timer(400);
		var temps:Boolean=false;
		fondMc.onEnterFrame = function()
		{
			
			//trace("onEnterFrame: "+this)
			//trace("")
			if (monTimer.fin() == false) {
				temps = false;
			}else {
				delete fondMc.onEnterFrame;
				temps = true;
			}
			if (temps == true) {
				
				posNumero++;
				numero = elementsTires[posNumero];
				//trace("")
				//trace("numero: " + numero)
				//trace("elementsTires.length"+elementsTires.length)
				monUnite[numero].visibilite(true);
				for (j = 0; j < nbCategories; j++) {
					_level0.fondMc["sac" + _level0.listeCategorie[j]].annulerBtn._visible=false;
				}
				fondMc.info.text = "Nb de tris effectués: " + posNumero + "/" + nbClip;
				
			}
		}
	}
}


// Création d'un objet écouteur de souris.
var mouse_level0.listener:Object = new Object();

// Lorsque le curseur de la souris se déplace dans le fichier SWF, 
//on teste si la souris repasse sur les clips de  départ.
mouse_level0.listener.onMouseMove = function() {
	actionSac()
	//if (surSac==true)
	
	//if(_xmouse > posClipDepX && _xmouse < posClipDepX+monUnite[numero].imageL && _ymouse > posClipDepY && _ymouse < posClipDepY +monUnite[numero].imageH)
/*	if(monUnite[numero].over==true)
	   {
		   for (i = 0; i < nbCategories; i++) {
			   fondMc["sac" + _level0.listeCategorie[i]].annulerBtn._visible=false;
		   }
	   }*/
}

mouse_level0.listener.onMouseUp = function() {
	trace("Up et posClip: "+posClip);
	boutonSourisHaut=true;
	if (posClip != "vide") {
		trace("up, posClip pas vide, = "+posClip);
		test();
	}
	verifier();
	trace("sacObjet" + sacObjet);
}
mouse_level0.listener.onMouseDown = function(){
	boutonSourisHaut=false;
	posClip = "vide";
}

Mouse.add_level0.listener(mouse_level0.listener);



function comportement()
{
	for (i = 0; i < nbCategories; i++) {
		if (monUnite[numero].posX > fondMc["sac" + _level0.listeCategorie[i]]._x - 0.5 * fondMc["sac" + _level0.listeCategorie[i]]._width  
		&& monUnite[numero].posX < fondMc["sac" + _level0.listeCategorie[i]]._x + 0.5 * fondMc["sac" + _level0.listeCategorie[i]]._width 
		&& monUnite[numero].posY > fondMc["sac" + _level0.listeCategorie[i]]._y - 0.5 * fondMc["sac" + _level0.listeCategorie[i]]._height 
		&& monUnite[numero].posY < fondMc["sac" + _level0.listeCategorie[i]]._y + 0.5 * fondMc["sac" + _level0.listeCategorie[i]]._height)
		{
			monUnite[numero].setPosition(fondMc["sac" + _level0.listeCategorie[i]]._x ,
			fondMc["sac" + _level0.listeCategorie[i]]._y);
			monUnite[numero].categorieSac = _level0.listeCategorie[i];
			trace ("monUnite[numero].categorieSac: " + monUnite[numero].categorieSac);
			trace ("monUnite[numero].noOccurence: " + monUnite[numero].noOccurence);
			trace ("monUnite[numero].categorie: " + monUnite[numero].categorie);
			trace ("");
			monUnite[numero].visibilite(false);
			monUnite[numero].setTaille(40, 40);
			monUnite[numero].setAlpha(60);
			monUnite[numero].setCommentaireVisible(false);
			surSac = true;
			//monUnite[numero].visibilite(false);
			posClip = _level0.listeCategorie[i];
			for (j = 0; j < nbCategories; j++) {
					_level0.fondMc["sac" + _level0.listeCategorie[j]].annulerBtn._visible=false;
				}
			annuler(fondMc["sacPlein" + _level0.listeCategorie[i]].annulerBtn, fondMc["sac" + _level0.listeCategorie[i]].annulerBtn);
			contenu(fondMc["sacPlein" + _level0.listeCategorie[i]].contenuNonBtn, fondMc["sac" + _level0.listeCategorie[i]].contenuOuiBtn);
	/*		var monTimer:timer = new timer(400);
			this.onEnterFrame = function()
			{
				trace("onEnterFrame")
				trace("")
				if (monTimer.fin() == false) {
					if (btnAnnulerPresse == true) {
						delete this.onEnterFrame;
						monUnite[numero].drag=false;
					}
				}else{
					if (btnAnnulerPresse == false) {
						trace("this timer"+this)
						
						stopDrag();
						monUnite[numero].drag = false;
						monUnite[numero].visibilite(false);
						for (j = 0; j < nbCategories; j++) {
							_level0.fondMc["sac" + _level0.listeCategorie[j]].annulerBtn._visible=false;
						}
						posNumero++;
						numero = elementsTires[posNumero];
						monUnite[numero].visibilite(true);
						fondMc.info.text = "Nb de tris effectués: " + posNumero + "/" + nbClip;
					}
					delete this.onEnterFrame;
				}
			}
			*/
			//On regarde si on revient sur un clip donc à la position de départ avec la souris
	/*		posSouris(); 
			//On rend visible le clip suivant:
			trace("posNumero: "+posNumero)
			posNumero++;
			numero = elementsTires[posNumero];
			trace("")
			trace("numero: " + numero)
			trace("elementsTires.length"+elementsTires.length)
			monUnite[numero].visibilite(true);
			for (s = 0; s < elementsTires.length; s++ )
			{
				trace("monUnite[numero]._visible" + monUnite[elementsTires[s]].getVisibilite());
			}
			fondMc.info.text = "Nb de tris effectués: " + posNumero + "/" + nbClip;
		*/
		}
	}

}
function radDegre(valeur):Number {
	return valeur * (360 / (2 * Math.PI));
}

//trace("pi= "+radDegre(Math.PI));
function degreRad(valeur):Number {
	return valeur * ((2 * Math.PI)/360) ;
}
//trace("360= "+degreRad(360));
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