/**
 * ...
 * @author Jean-Michel LUTHI
 */
 fondMc.createEmptyMovieClip("fondPhotosMc", niveauConteneurPhotos+1);
//on place un masque
fondMc.fondPhotosMc.setMask(masqueMc);
//On dimensionne le masque
//On positionne le masque
fondPhotosMc._x=50;
fondPhotosMc._y=50;
// fondMc.sacLong._visible=false;
// fondMc.sacAire._visible=false;
// fondMc.sacVol._visible=false;
// fondMc.sacAutre._visible=false;
 trace("nbClip"+nbClip);
 for(i=0;i<nbClip;i++){
	 trace("monUnite[i] "+monUnite[elementsTires[i]].getTaille[1]);
	monUnite[elementsTires[i]].setPosition(i*tailleClip,100-(monUnite[elementsTires[i]].imageH)); 
	monUnite[elementsTires[i]].visibilite(true);
 }
