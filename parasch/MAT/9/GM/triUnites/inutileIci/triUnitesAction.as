/*
 * @author Jean-Michel Luthi
*/
		

//Action suivant le type d'unité
function actionSac()
{	
	if(monUnite[numero].drag==true)
	{
		comportement();
	}
}


// Création d'un objet écouteur de souris.
var mouse_level0.listener:Object = new Object();

// Lorsque le curseur de la souris se déplace dans le fichier SWF, 
//on teste si la souris repasse sur les clips de  départ.
mouse_level0.listener.onMouseMove = function() {
	actionSac()
	if(_xmouse > posClipDepX && _xmouse < posClipDepX+monUnite[numero].imageL && _ymouse > posClipDepY && _ymouse < posClipDepY +monUnite[numero].imageH)
	   {
		  fondMc.sacLong.annulerBtn._visible=false;
		  fondMc.sacAire.annulerBtn._visible=false;
		  fondMc.sacVol.annulerBtn._visible=false;
		  fondMc.sacAutre.annulerBtn._visible=false;
		  //Mouse.remove_level0.listener(mouse_level0.listener);
	   }
}
mouse_level0.listener.onMouseUp = function() {
	boutonSourisHaut=true;
	if(posClip != "vide"){
		test();
	}
	if (posNumero>=elementsTires.length)
	{
		trace("sourisUp");
	   fondMc.verifier_btn._visible=true;
	   fondMc.verifier_btn._x=posClipDepX;
	   fondMc.verifier_btn._y=posClipDepY;
	   Mouse.remove_level0.listener(mouse_level0.listener);
	}/*else{
		posNumero++;
		numero=elementsTires[posNumero];
		monUnite[numero].visibilite(true); 
	}*/
}
mouse_level0.listener.onMouseDown = function(){
	boutonSourisHaut=false;
	posClip = "vide";
}

Mouse.add_level0.listener(mouse_level0.listener);



function comportement()
{
	//trace("monUnite[numero]._x" +monUnite[numero].posX );
	if (monUnite[numero].posX > fondMc.sacLong._x - 30 
	&& monUnite[numero].posX < fondMc.sacLong._x + fondMc.sacLong._width 
	&& monUnite[numero].posY > fondMc.sacLong._y - 40 
	&& monUnite[numero].posY < fondMc.sacLong._y + fondMc.sacLong._height)
	{
		monUnite[numero].setPosition(fondMc.sacLong._x+fondMc.sacLong._width/3,fondMc.sacLong._y+fondMc.sacLong._height/5);
		monUnite[numero].visibilite(false);
		posClip = "longueur";

		annuler(fondMc.sacLong.annulerBtn);
		//On regarde si on revient sur un clip donc à la position de départ avec la souris
		posSouris(); 
		//On rend visible le clip suivant:
		posNumero++;
		numero=elementsTires[posNumero];
		monUnite[numero].visibilite(true); 
		   
		trace ("longueur");
	}else if (monUnite[numero].posX > fondMc.sacAire._x 
	&& monUnite[numero].posX < fondMc.sacAire._x + fondMc.sacAire._width -10 
	&& monUnite[numero].posY > fondMc.sacAire._y - 40
	&& monUnite[numero].posY < fondMc.sacAire._y + fondMc.sacAire._height)
	{
		monUnite[numero].setPosition(fondMc.sacAire._x+fondMc.sacAire._width/3,fondMc.sacAire._y+fondMc.sacAire._height/5);
		monUnite[numero].visibilite(false);
		posClip = "aire";

		annuler(fondMc.sacAire.annulerBtn);
		//On regarde si on revient sur un clip donc à la position de départ avec la souris
		posSouris();
		//On rend visible le clip suivant:
		posNumero++;
		numero=elementsTires[posNumero];
		monUnite[numero].visibilite(true); 
		trace ("aire");
	}else if (monUnite[numero].posX > fondMc.sacVol._x 
	&& monUnite[numero].posX < fondMc.sacVol._x + fondMc.sacVol._width - 10
	&& monUnite[numero].posY > fondMc.sacVol._y - 40 
	&& monUnite[numero].posY < fondMc.sacVol._y + fondMc.sacVol._height)
	{
		monUnite[numero].setPosition(fondMc.sacVol._x+fondMc.sacVol._width/3,fondMc.sacVol._y+fondMc.sacVol._height/5);
		monUnite[numero].visibilite(false);
		posClip = "volume";

		annuler(fondMc.sacVol.annulerBtn);
		//On regarde si on revient sur un clip donc à la position de départ avec la souris
		posSouris();
		trace ("volume");
		posNumero++;
		numero=elementsTires[posNumero];
		monUnite[numero].visibilite(true); 
	}else if (monUnite[numero].posX > fondMc.sacAutre._x - 30 
	&& monUnite[numero].posX < fondMc.sacAutre._x + fondMc.sacAutre._width 
	&& monUnite[numero].posY > fondMc.sacAutre._y - 40 
	&& monUnite[numero].posY < fondMc.sacAutre._y+fondMc.sacAutre._height)
	{
		monUnite[numero].setPosition(fondMc.sacAutre._x+fondMc.sacAutre._width/3,fondMc.sacAutre._y+fondMc.sacAutre._height/5);
		monUnite[numero].visibilite(false);
		posClip = monUnite[numero].categorie;

		annuler(fondMc.sacAutre.annulerBtn);
		//On regarde si on revient sur un clip donc à la position de départ avec la souris
		posSouris();
		trace ("autre");
		posNumero++;
		numero=elementsTires[posNumero];
		monUnite[numero].visibilite(true); 
	}else{
		posClip = "vide";
	}

}

