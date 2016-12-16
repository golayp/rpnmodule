/**
 * ...
 * @author J-M.Luthi
 */
function deplacementPhotos()
{
	fondMc.droiteBtn.onRollOver=function()
	{
		conteneurPhotos.onEnterFrame=function(){
			for (i = 0; i <nbClip; i++)
			{
				if(monUnite[nbClip-1].posX>=masqueMc._x+masqueMc._width - monUnite[nbClip-1].imageL){
					monUnite[i].setPosition(monUnite[i].posX-5,monUnite[i].posY);
					
				}else{
					delete conteneurPhotos.onEnterFrame;
				}
			}
		}
	}
	fondMc.droiteBtn.onRollOut=function()
	{
		delete conteneurPhotos.onEnterFrame;
	}
	fondMc.droiteBtn.onPress=function()
	{
		conteneurPhotos.onEnterFrame=function(){
			for (i = 0; i <nbClip; i++)
			{
				if(monUnite[nbClip-1].posX>=masqueMc._x+masqueMc._width - monUnite[nbClip-1].imageL){
					monUnite[i].setPosition(monUnite[i].posX-25,monUnite[i].posY);
					
				}else{
					delete conteneurPhotos.onEnterFrame;
				}
			}
		}
	}
	fondMc.droiteBtn.onRelease=function()
	{
		delete conteneurPhotos.onEnterFrame;
		conteneurPhotos.onEnterFrame=function(){
			for (i = 0; i <nbClip; i++)
			{
				if(monUnite[nbClip-1].posX>=masqueMc._x+masqueMc._width - monUnite[nbClip-1].imageL){
					monUnite[i].setPosition(monUnite[i].posX-5,monUnite[i].posY);
					
				}else{
					delete conteneurPhotos.onEnterFrame;
				}
			}
		}
	}
	fondMc.droiteBtn.onReleaseOutside=function()
	{
		delete conteneurPhotos.onEnterFrame;
	}
	
	fondMc.gaucheBtn.onRollOver=function()
	{
		conteneurPhotos.onEnterFrame=function(){
			for (i = nbClip-1; i >=0; i--)
			{
				if(monUnite[0].posX<=masqueMc._x+ monUnite[0].imageL){
					monUnite[i].setPosition(monUnite[i].posX+5,monUnite[i].posY);
				}else{				
					delete conteneurPhotos.onEnterFrame;
				}
			}
		}
	}
	fondMc.gaucheBtn.onRollOut=function()
	{
		delete conteneurPhotos.onEnterFrame;
	}
	fondMc.gaucheBtn.onPress=function()
	{
		conteneurPhotos.onEnterFrame=function(){
			for (i = nbClip-1; i >=0; i--)
			{
				if(monUnite[0].posX<=masqueMc._x+ monUnite[0].imageL){
					monUnite[i].setPosition(monUnite[i].posX+25,monUnite[i].posY);
				}else{				
					delete conteneurPhotos.onEnterFrame;
				}
			}
		}
	}
	fondMc.gaucheBtn.onRelease=function()
	{
		delete conteneurPhotos.onEnterFrame;
		conteneurPhotos.onEnterFrame=function(){
			for (i = nbClip-1; i >=0; i--)
			{
				if(monUnite[0].posX<=masqueMc._x+ monUnite[0].imageL){
					monUnite[i].setPosition(monUnite[i].posX+5,monUnite[i].posY);
				}else{				
					delete conteneurPhotos.onEnterFrame;
				}
			}
		}
	}
	fondMc.gaucheBtn.onReleaseOutside=function()
	{
		delete conteneurPhotos.onEnterFrame;
	}
}
fondMc.attachMovie("btnSuite", "suite_btn", niveauBoutons + 3);
fondMc.suite_btn._x = 300;
fondMc.suite_btn._y = 200;
fondMc.suite_btn._visible = false;

fondMc.suite_btn.onRelease = function()
{
	rendreVisibleObjet();
	longueurModif[0].relache = false;
	longueurModif[0].visibilite(false);
	aireModif[0].relache = false;
	aireModif[0].visibilite(false);
	volumeModif[0].relache = false;
	volumeModif[0].visibilite(false);
	masseModif[0].relache = false;
	masseModif[0].visibilite(false);
	fondMc.suite_btn._visible = false;
	monUniteFond[noClip].visibilite(false);
	fondMc.uniteChoisie.text = "";
	fondMc.valeurTrouvee.text = "";
	fondMc.uniteChoisieExposant.text = "";
	fondMc.monMicroscope._visible = false;
	fondMc.maLoupe._visible = false;
	fondMc.monMicroscopeD._visible = false;
	fondMc.maLoupeD._visible = false;
	longueurBase[1].visibilite(false);
	aireBase[1].visibilite(false);
	volumeBase[1].visibilite(false);
	masseBase[1].visibilite(false);
}
fondMc.attachMovie("btnFin", "fin_btn", niveauBoutons + 4);
fondMc.fin_btn._x = 300;
fondMc.fin_btn._y = 200;
fondMc.fin_btn._visible = false;

function creationBulle (clip,type,nomBulle,bouton, formatTexte)
{
	compteurBulle++
	//trace("dans creationBule");
	clip.attachMovie(type,nomBulle,compteurBulle);
	clip[nomBulle]._alpha=95;
	clip[nomBulle]._visible=false;
	//On peut déplacer la bulle
	clip[nomBulle].onPress=function(){
		startDrag(clip,false,0,0,480,300);
	}
	clip[nomBulle].onRelease=function(){
		stopDrag();
	}
	//On lui adjoint un champ texte
	clip[nomBulle].createTextField("repMcTxt",1,5,15,300,20);
	clip[nomBulle].repMcTxt.multiline=true;
	clip[nomBulle].repMcTxt.wordWrap=true;
	clip[nomBulle].repMcTxt.autoSize=true;
	clip[nomBulle].repMcTxt.selectable=false;
	clip[nomBulle].repMcTxt.setNewTextFormat(formatTexte);
	clip[nomBulle].repMcTxt.text="test bulle"+nomBulle;
	
	//on lui adjoint un bouton
	switch (bouton)
	{
		case "oui/non":
		clip.attachMovie("oui_btn","ouiBtn",compteurBulle+1);
		clip.ouiBtn._x=70;
		clip.ouiBtn._y=170;
		//trace("clip.ouiBtn._x"+clip.ouiBtn._x);
		clip.ouiBtn._visible=false;
		clip.attachMovie("non_btn","nonBtn",compteurBulle+2);
		clip.nonBtn._x=230;
		clip.nonBtn._y=170;
		clip.nonBtn._visible=false;
		break;
		case "suite":
		clip.attachMovie("suite_btn","suiteBtn",compteurBulle+3);
		clip.suiteBtn._x=150;
		clip.suiteBtn._y=170;
		clip.suiteBtn._visible=false;
		break;
		case "ok":
		clip.attachMovie("ok_btn","okBtn",compteurBulle+4);
		clip.okBtn._x=150;
		clip.okBtn._y=170;
		clip.okBtn._visible=false;
		break;
		case "fin":
		clip.attachMovie("fin_btn","finBtn",compteurBulle+5);
		clip.finBtn._x=150;
		clip.finBtn._y=170;
		clip.finBtn._visible=false;
		break;
	}

}
for(i=0;i<2;i++){
	fondMc.createEmptyMovieClip("foncBulle"+i, niveauBulles+i);
	fondMc["foncBulle"+i]._x=250;
	fondMc["foncBulle"+i]._y=150;
}
creationBulle(fondMc.foncBulle1, "bulleVerte", "finVerteBulle", "fin", justeBulle_fmt);
creationBulle(fondMc.foncBulle0, "bulleRouge", "finRougeBulle", "fin", justeBulle_fmt);

//On associe le clip du bouton à une variable
finVert = fondMc.foncBulle1.finBtn;
vertTxt = fondMc.foncBulle1.finVerteBulle.repMcTxt;
vert = fondMc.foncBulle1.finVerteBulle;
fondV = fondMc.foncBulle1;

finRouge=fondMc.foncBulle0.finBtn;
rougeFinTxt=fondMc.foncBulle0.finRougeBulle.repMcTxt;
rougeFin=fondMc.foncBulle0.finRougeBulle;
fondRF=fondMc.foncBulle0;

finVert.onRelease=function()
{
	fondV._visible=false;
	fondRF._visible=false;
	_level0.rep_juste = true;
}
finRouge.onRelease=function()
{
	fondV._visible=false;
	fondRF._visible = false;
	_level0.rep_juste = false;
}