import mx.data.encoders.Num;
// LuthiJM
fondMc.finBtn._visible=false;
function annuler(bouton1, bouton2)
{
	trace("bouton._visible" +bouton);
	bouton1._visible = true;
	bouton2._visible = true;
	var btnAnnulerPresse:Boolean = false;
	//var poubelle:Array=new Array();
	bouton1.onRelease=function()
	{
		var btnAnnulerPresse:Boolean = true;
		bouton1._visible=false;
		//fondMc.finBtn._visible = false;
		fondMc.verifier_btn._visible = false;
		//On rend invisible le clip suivant
		//monUnite[numero].visibilite(false);
		//monUnite[numero].setTaille(tailleCLip);
		//monUnite[numero].setAlpha(100);
		//On rend le clip précedent à nouveau visible
		//posNumero--;
		//numero=elementsTires[posNumero];
		//monUnite[numero].visibilite(true);
		//monUnite[numero].setCommentaireVisible(true);
		//surSac = false;
		//monUnite[numero].setTaille(tailleCLip);
		//monUnite[numero].setAlpha(100);
		//monUnite[numero].setPosition(posClipDepX, posClipDepY);
		//delete fondMc.onEnterFrame;
		//On enlève le dernier résultat de sacObjet

		poubelle=sacObjet.pop();
		trace("sacObjet dans annuler bouton: "+sacObjet);
	}
	bouton2.onRelease=function()
	{
		var btnAnnulerPresse:Boolean = true;
		bouton2._visible=false;
		//fondMc.finBtn._visible = false;
		fondMc.verifier_btn._visible = false;
		//On rend invisible le clip suivant
		//monUnite[numero].visibilite(false);
		//monUnite[numero].setTaille(tailleCLip);
		//monUnite[numero].setAlpha(100);
		//On rend le clip précedent à nouveau visible
		//posNumero--;
		numero=elementsTires[posNumero];
		monUnite[numero].visibilite(true);
		monUnite[numero].setCommentaireVisible(true);
		//surSac = false;
		monUnite[numero].setTaille(tailleCLip);
		monUnite[numero].setAlpha(100);
		monUnite[numero].setPosition(posClipDepX, posClipDepY);
		delete fondMc.onEnterFrame;
		//On enlève le dernier résultat de sacObjet

		poubelle=sacObjet.pop();
		trace("sacObjet dans annuler bouton: "+sacObjet);
	}
}
//Boutons d'affichage du contenu. 
//Pour sacPlein: Bouton1o contenu visible , bouton1n, contenu invisible. 
//Pour sacVide Bouton2o contenu visible (vu vert) bouton2n contenu invisible.
function contenu(bouton1o, bouton1n, bouton2o, bouton2n) {
	var nb:Array = new Array();
	var monSacActif:Number = i;
	
	var dansMonSac:Number = nbElementsSac[i];
	var sacVide:MovieClip = fondMc["sac" + _level0.listeCategorie[monSacActif]];
	var sacPlein:MovieClip = fondMc["sacPlein" + _level0.listeCategorie[monSacActif]];
	var categorieDuSac:String = _level0.listeCategorie[monSacActif];
	//trace("categorieDuSac"+categorieDuSac)
/*	for (m = 0; m < tri.instances; m++) {
			if (monUnite[elementsTires[m]].categorieSac == categorieDuSac) {
				nb++;
				//i: Numéro du sac (commence par 0)i est défini dans triaction.as, function contenu on est dans une boucle for
				nbElementsSac[monSacActif] = nb;
				trace ("nbElementsSac["+monSacActif+"]"+nbElementsSac[monSacActif])
			}
		}	*/
	//Si aucin bouton contenu n'est visible, on affiche le bouton avec le contenu non visible
//if (bouton1o._visible == false && bouton1n._visible == false){// && bouton2o._visible == false && bouton2n._visible == false) {
		//trace("invisible")
		bouton1n._visible = true;
		sacVide._visible = false;
		sacPlein._visible = true;
		fondMc.aideContenuBtn._visible = false;
		//On rend invisible les clips s'il y en a
		for (m = 0; m < tri.instances; m++) {
			if(monUnite[elementsTires[m]].categorieSac==categorieDuSac){
				monUnite[elementsTires[m]].visibilite(false);
				monUnite[elementsTires[m]].contenu = false;
			}
		}
		
	//}
	bouton1o.onRelease=function()
	{
		
	}
	bouton1n.onRelease=function()
		{
			/*for (m = 0; m < tri.instances; m++) {
				if (monUnite[elementsTires[m]].categorieSac == categorieDuSac) {
					nb++;
					//i: Numéro du sac (commence par 0)i est défini dans triaction.as, function contenu on est dans une boucle for
					nbElementsSac[monSacActif] = nb;
					trace ("nbElementsSac["+monSacActif+"]"+nbElementsSac[monSacActif])
				}
			}*/
			nb = nbDansSac(nbCategories);
			trace("btn1n nb:"+nb)
			if(nb[monSacActif]==0){
				sacPlein._visible = false;
				sacVide._visible = true;
				bouton2o._visible = true;
				bouton1n._visible = false;
			}else {
				bouton1n._visible = false;
				bouton2o._visible = true;
				sacPlein._visible = false;
				sacVide._visible = true;
			}
		
			fondMc.aideContenuBtn._visible = true;
			for (m = 0; m < tri.instances; m++) {
				//trace("")
				//trace ("bouton1n")
				//trace("monUnite[elementsTires[m]].categorieSac" + monUnite[elementsTires[m]].categorieSac)
				//trace("categorieDuSac" + categorieDuSac)
				//trace("monUnite[elementsTires[m]].nom" + monUnite[elementsTires[m]].nom)
				
				if(monUnite[elementsTires[m]].categorieSac==categorieDuSac){
					monUnite[elementsTires[m]].visibilite(true);
					monUnite[elementsTires[m]].contenu = true;
				}
			}
			
		}
	
		
	bouton2o.onRelease=function()
		{
		/*	for (m = 0; m < tri.instances; m++) {
				if (monUnite[elementsTires[m]].categorieSac == categorieDuSac) {
					nb++;
					//i: Numéro du sac (commence par 0)i est défini dans triaction.as, function contenu on est dans une boucle for
					nbElementsSac[monSacActif] = nb;
					trace ("nbElementsSac["+monSacActif+"]"+nbElementsSac[monSacActif])
				}
			}*/
			//trace("bouton2o")
			//trace("nbElementsSac: "+nbElementsSac[monSacActif])
			bouton1n._visible = true;
			bouton2o._visible = false;
			nb = nbDansSac(nbCategories);
			//trace("btn2n nb:"+nb)
			if(nb[monSacActif]==0){
				sacPlein._visible = false;
				sacVide._visible = true;
				bouton2n._visible = true;
			}else {
				sacPlein._visible = true;
				sacVide._visible = false;	
			}
			fondMc.aideContenuBtn._visible = false;
			for (m = 0; m < tri.instances; m++) {
				//trace("")
				//trace ("bouton2o")
				//trace("monUnite[elementsTires[m]].categorieSac" + monUnite[elementsTires[m]].categorieSac)
				//trace("categorieDuSac" + categorieDuSac)
				if(monUnite[elementsTires[m]].categorieSac==categorieDuSac){
					monUnite[elementsTires[m]].visibilite(false);
					monUnite[elementsTires[m]].contenu = false;
				}
			}
		}
	bouton2n.onRelease=function()
		{
			/*for (m = 0; m < tri.instances; m++) {
				if (monUnite[elementsTires[m]].categorieSac == categorieDuSac) {
					nb++;
					//i: Numéro du sac (commence par 0)i est défini dans triaction.as, function contenu on est dans une boucle for
					nbElementsSac[monSacActif] = nb;
					trace ("nbElementsSac["+monSacActif+"]: "+nbElementsSac[monSacActif])
				}
			}*/
			nb = nbDansSac(nbCategories);
			//trace("btn2o nb:"+nb)
			if(nb[monSacActif]==0){
				sacPlein._visible = false;
				sacVide._visible = true;
				bouton2o._visible = true;
				bouton2n._visible = false;
			}else {
				bouton2n._visible = false;
				bouton2o._visible = true;
				sacPlein._visible = false;
				sacVide._visible = true;
			}
		
			fondMc.aideContenuBtn._visible = true;
			for (m = 0; m < tri.instances; m++) {
				//trace("")
				//trace ("bouton2n")
				//trace("monUnite[elementsTires[m]].categorieSac" + monUnite[elementsTires[m]].categorieSac)
				//trace("categorieDuSac" + categorieDuSac)
				
				if(monUnite[elementsTires[m]].categorieSac==categorieDuSac){
					monUnite[elementsTires[m]].visibilite(true);
					monUnite[elementsTires[m]].contenu = true;
				}
			}
		}
}


fondMc.aideContenuBtn.onRollOver = function() {
		//trace("aideContenu pressé")
		aideConsignesMc._visible = true;
	}
fondMc.aideContenuBtn.onRollOut = function() {
		//trace("aideContenu pressé")
		aideConsignesMc._visible = false;
	}
	
fondMc.verifier_btn.onRollOver = function() {
	for (i = 0; i < nbCategories; i++) {
	   fondMc["sac" + _level0.listeCategorie[i]].annulerBtn._visible = false;
	   //Mouse.remove_level0.listener(mouse_level0.listener);
	}	
}
fondMc.verifier_btn.onRelease = function() {
	//trace("sacObjet, verifier_btn"+sacObjet)
	fondMc.verifier_btn._visible = false;
	for (i = 0; i < nbCategories; i++) {
			   fondMc["sac" + _level0.listeCategorie[i]].annulerBtn._visible=false;
	}

	verifierBouton(sacObjet);
}
fondMc.aideConsignesMc.fermerBtn.onRelease = function() {
	fondMc.aideConsignesMc._visible = false;
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

	
finVert.onRelease=function()
{
	fondV._visible=false;
	fondRS._visible=false;
	fondRON._visible=false;
	fondRF._visible=false;
	_level0.rep_juste = true;
	fondMc.verifier_btn._visible = false;
}

finRouge.onRelease=function()
{
	fondV._visible=false;
	fondRS._visible=false;
	fondRON._visible=false;
	fondRF._visible = false;
	//monUnite[retours[nbFautes-1][1]].visibilite(false);
	_level0.rep_juste = false;
	fondMc.verifier_btn._visible = false;
}

suite.onRelease=function()
{
	fondMc.verifier_btn._visible = false;
	//trace("nbFautes "+nbFautes);
	//trace("nbFautesRestantes "+nbFautesRestantes);
	rougeSuite._visible=false;
	suite._visible=false;
	if (nbFautesRestantes==1){
		rougeFinTxt.text = retours[nbFautes - nbFautesRestantes][0]+"\n\n\nCorrige maitenant.";
		//monUnite[retours[nbFautes - nbFautesRestantes-1][1]].visibilite(false);
		//monUnite[retours[nbFautes - nbFautesRestantes][1]].visibilite(true);
		//monUnite[retours[nbFautes - nbFautesRestantes][1]].active(false);
		//monUnite[retours[nbFautes - nbFautesRestantes][1]].setPosition(posClipDepX, posClipDepY);
		rougeSuite._visible=false;
		suite._visible = false;
		fondRF._visible = true;
		rougeFin._visible=true;
		finRouge._visible=true;
		
	}else{
		rougeSuiteTxt.text = retours[nbFautes - nbFautesRestantes][0];
		//monUnite[retours[nbFautes - nbFautesRestantes-1][1]].visibilite(false);
		//monUnite[retours[nbFautes - nbFautesRestantes][1]].visibilite(true);
		//monUnite[retours[nbFautes - nbFautesRestantes][1]].active(false);
		//monUnite[retours[nbFautes - nbFautesRestantes][1]].setPosition(posClipDepX, posClipDepY);
		rougeSuite._visible=true;
		suite._visible=true
		nbFautesRestantes--;
	}
}

oui.onRelease=function()
{
	fondMc.verifier_btn._visible = false;
	nbFautesRestantes=nbFautes;
	fondRON._visible=false;
	if (nbFautesRestantes == 1) {
		rougeFinTxt.text = retours[0][0]+"\n\n\nCorrige maitenant.";
		//monUnite[retours[0][1]].visibilite(true);
		//monUnite[retours[0][1]].active(false);
		//monUnite[retours[0][1]].setPosition(posClipDepX, posClipDepY);
		fondRF._visible = true;
		rougeFin._visible=true;
		finRouge._visible=true;
	}else{
		rougeSuiteTxt.text = retours[0][0];
		//monUnite[retours[0][1]].visibilite(true);
		//monUnite[retours[0][1]].active(false);
		//monUnite[retours[0][1]].setPosition(posClipDepX, posClipDepY);
		fondRS._visible = true;
		rougeSuite._visible=true;
		suite._visible=true;
		nbFautesRestantes--;
	}
}

non.onRelease=function()
{
	fondMc.verifier_btn._visible = false;
	fondRON._visible=false;
	rougeFin._visible=true;
	finRouge._visible=true;
	rougeFinTxt.text="Tu dois encore valider,\nou corriger.";
}