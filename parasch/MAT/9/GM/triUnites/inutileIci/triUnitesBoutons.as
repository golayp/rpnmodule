// LuthiJM
fondMc.finBtn._visible=false;
function annuler(bouton)
{
	trace("bouton._visible" +bouton);
	bouton._visible = true;
	//var poubelle:Array=new Array();
	bouton.onRelease=function()
	{
		bouton._visible=false;
		fondMc.finBtn._visible=false;
		//On rend invisible le clip suivant
		monUnite[numero].visibilite(false)
		//On rend le clip précedent à nouveau visible
		posNumero--;
		numero=elementsTires[posNumero];
		monUnite[numero].visibilite(true);
		monUnite[numero].setPosition(posClipDepX,posClipDepY);
		//On enlève le dernier résultat de sacObjet

		poubelle=sacObjet.pop();
		trace("sacObjet: "+sacObjet);
	}
}
fondMc.verifier_btn.onRelease=function(){
	fondMc.verifier_btn._visible=false;
	fondMc.sacLong.annulerBtn._visible=false;
  	fondMc.sacAire.annulerBtn._visible=false;
 	fondMc.sacVol.annulerBtn._visible=false;
  	fondMc.sacAutre.annulerBtn._visible=false;
	verifier(sacObjet);
}
for(i=0;i<4;i++){
	fondMc.createEmptyMovieClip("foncBulle"+i, niveauBulles+i);
	fondMc["foncBulle"+i]._x=250;
	fondMc["foncBulle"+i]._y=150;
}
compteurBulle=0;
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
	//clip[nomBulle].repMcTxt.embedFonts=true;
	clip[nomBulle].repMcTxt.wordWrap=true;
	clip[nomBulle].repMcTxt.autoSize=true;
	clip[nomBulle].repMcTxt.selectable=false;
	clip[nomBulle].repMcTxt.setNewTextFormat(formatTexte);
	clip[nomBulle].repMcTxt.text="test bulle"+nomBulle;
	//trace("clip[nomBulle]"+clip[nomBulle]);
	
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
	//return clip[nomBulle]

}
//(clip,type,nomBulle,bouton, formatTexte)
creationBulle(fondMc.foncBulle0, "bulleRouge","finRougeBulle","fin", justeBulle_fmt);
creationBulle(fondMc.foncBulle1, "bulleRouge","suiteRougeBulle","suite", justeBulle_fmt);
creationBulle(fondMc.foncBulle2, "bulleRouge","ouiNonRougeBulle","oui/non", justeBulle_fmt);
creationBulle(fondMc.foncBulle3, "bulleVerte","finVerteBulle","fin", justeBulle_fmt);

//On associe le clip du bouton à une variable
finVert=fondMc.foncBulle3.finBtn;
finRouge=fondMc.foncBulle0.finBtn;
suite=fondMc.foncBulle1.suiteBtn;
oui=fondMc.foncBulle2.ouiBtn;
non=fondMc.foncBulle2.nonBtn;

vertTxt=fondMc.foncBulle3.finVerteBulle.repMcTxt;
rougeSuiteTxt=fondMc.foncBulle1.suiteRougeBulle.repMcTxt;
rougeOuiNonTxt=fondMc.foncBulle2.ouiNonRougeBulle.repMcTxt;
rougeFinTxt=fondMc.foncBulle0.finRougeBulle.repMcTxt;

vert=fondMc.foncBulle3.finVerteBulle;
rougeSuite=fondMc.foncBulle1.suiteRougeBulle;
rougeOuiNon=fondMc.foncBulle2.ouiNonRougeBulle;
rougeFin=fondMc.foncBulle0.finRougeBulle;

fondV=fondMc.foncBulle3;
fondRS=fondMc.foncBulle1;
fondRON=fondMc.foncBulle2;
fondRF=fondMc.foncBulle0;



/*finVert._visible=true;
finRouge._visible=true;
suite._visible=true;
oui._visible=true;
non._visible=true;

vert._visible=true;
rougeSuite._visible=true;
rougeOuiNon._visible=true;
rougeFin._visible=true;*/
	
finVert.onRelease=function()
{
	fondV._visible=false;
	fondRS._visible=false;
	fondRON._visible=false;
	fondRF._visible=false;
	_level0.rep_juste=true;
}

finRouge.onRelease=function()
{
	fondV._visible=false;
	fondRS._visible=false;
	fondRON._visible=false;
	fondRF._visible=false;
	_level0.rep_juste=false;
}

suite.onRelease=function()
{
	
	trace("nbFautes "+nbFautes);
	trace("nbFautesRestantes "+nbFautesRestantes);
	rougeSuite._visible=false;
	suite._visible=false;
	if (nbFautesRestantes==1){
		rougeFinTxt.text=retours[nbFautes-nbFautesRestantes];
		rougeSuite._visible=false;
		suite._visible=false;
		rougeFin._visible=true;
		finRouge._visible=true;
		
	}else{
		rougeSuiteTxt.text=retours[nbFautes-nbFautesRestantes];
		rougeSuite._visible=true;
		suite._visible=true
		nbFautesRestantes--;
	}
}

oui.onRelease=function()
{
	nbFautesRestantes=nbFautes;
	fondRON._visible=false;
	if (nbFautes==1){
		rougeFinTxt.text=retours[0];
		rougeFin._visible=true;
		finRouge._visible=true;
	}else{
		rougeSuiteTxt.text=retours[0];
		rougeSuite._visible=true;
		suite._visible=true;
		nbFautesRestantes--;
	}
}

non.onRelease=function()
{
	fondRON._visible=false;
	rougeFin._visible=true;
	finRouge._visible=true;
	rougeFinTxt.text="Tu dois encore valider.";
}