/**
 * ...
 * @author J-M Luthi
 */

_global.info_fenetre_Txt = "Choix GUIDÉ OU NON-GUIDÉ"; 

 //Mise en place de la fenêtre "Choix entre version guidée ou non"
fondMc.attachMovie("fenetre", "fenetre_Mc", 95);
fondMc.fenetre_Mc._x = 100;
fondMc.fenetre_Mc._y = 60;
fondMc.fenetre_Mc._visible = true;

//Déplacement de la fenêtre liée à la barre supérieure de la fenêtre
fondMc.fenetre_Mc.barre_fenetre_Mc.onPress = function()
{
	startDrag(fondMc.fenetre_Mc, false, 10, 10, 300, 150);
}
fondMc.fenetre_Mc.barre_fenetre_Mc.onRelease = function()
{
	stopDrag();
}

fondMc.fenetre_Mc.barre_fenetre_Mc.onReleaseOutside = function()
{
	stopDrag();
}

//Cacher le bouton Fermer
fondMc.fenetre_Mc.fermer_btn._visible = false;

//Choix 1 : Version guidée		
posChoix_1_x = 50;
posChoix_1_y = 50;
posChoix_1_L = 240;
posChoix_1_H = 55;

fondMc.fenetre_Mc.createEmptyMovieClip ("fond_Choix_1_Mc",111);
fondMc.fenetre_Mc.fond_Choix_1_Mc.moveTo(posChoix_1_x,posChoix_1_y);
fondMc.fenetre_Mc.fond_Choix_1_Mc.beginFill ("0xFF00FF", 0);
fondMc.fenetre_Mc.fond_Choix_1_Mc.lineTo(posChoix_1_x+posChoix_1_L,posChoix_1_y);
fondMc.fenetre_Mc.fond_Choix_1_Mc.lineTo(posChoix_1_x+posChoix_1_L,posChoix_1_y+posChoix_1_H);
fondMc.fenetre_Mc.fond_Choix_1_Mc.lineTo(posChoix_1_x,posChoix_1_y+posChoix_1_H);
fondMc.fenetre_Mc.fond_Choix_1_Mc.lineTo(posChoix_1_x,posChoix_1_y);
fondMc.fenetre_Mc.fond_Choix_1_Mc.endFill;

fondMc.fenetre_Mc.fond_Choix_1_Mc.createTextField("guideTxt", 110, posChoix_1_x, posChoix_1_y, posChoix_1_L, posChoix_1_H);
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt._visible = true;
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.border = false;
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.multiline=true;
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.selectable=true;
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.wordWrap=true;
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.setNewTextFormat(texteFenetre_fmt);
fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.text = " Version guidée:\n Ce mode indique s'il  y a une faute \n après chaque clic.";

fondMc.fenetre_Mc.fond_Choix_1_Mc.onRollOver = function ()
{
	fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.border = true;
}
fondMc.fenetre_Mc.fond_Choix_1_Mc.onRollOut = function ()
{
	fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.border = false;
}
fondMc.fenetre_Mc.fond_Choix_1_Mc.onRelease = function ()
{
	fondMc.fenetre_Mc._visible = false;
	_global.mode = true;
	selection(maCase[departX].posX, maCase[departX].posY);
	consigneTxt._visible=false;
}

//Bouton 1 associé au choix 1
fondMc.fenetre_Mc.attachMovie ("btnChoix","caseChoix_1",112);
fondMc.fenetre_Mc.caseChoix_1._x = posChoix_1_x - 25;
fondMc.fenetre_Mc.caseChoix_1._y = posChoix_1_y + 5;
fondMc.fenetre_Mc.caseChoix_1._width = 20;
fondMc.fenetre_Mc.caseChoix_1._height = 20;

fondMc.fenetre_Mc.caseChoix_1.onRollOver = function ()
{
	fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.border = true;
}
fondMc.fenetre_Mc.caseChoix_1.onRollOut = function ()
{
	fondMc.fenetre_Mc.fond_Choix_1_Mc.guideTxt.border = false;
}
fondMc.fenetre_Mc.caseChoix_1.onRelease = function()
{
	fondMc.fenetre_Mc._visible = false;
	_global.mode = true;
	selection(maCase[departX].posX, maCase[departX].posY);
	consigneTxt._visible=false;
}


//Choix 2 : Version non-guidée		
posChoix_2_x = 50;
posChoix_2_y = 120;
posChoix_2_L = 240;
posChoix_2_H = 55;

fondMc.fenetre_Mc.createEmptyMovieClip ("fond_Choix_2_Mc",121);
fondMc.fenetre_Mc.fond_Choix_2_Mc.moveTo(posChoix_2_x,posChoix_2_y);
fondMc.fenetre_Mc.fond_Choix_2_Mc.beginFill ("0xFF00FF", 0);
fondMc.fenetre_Mc.fond_Choix_2_Mc.lineTo(posChoix_2_x+posChoix_2_L,posChoix_2_y);
fondMc.fenetre_Mc.fond_Choix_2_Mc.lineTo(posChoix_2_x+posChoix_2_L,posChoix_2_y+posChoix_2_H);
fondMc.fenetre_Mc.fond_Choix_2_Mc.lineTo(posChoix_2_x,posChoix_2_y+posChoix_2_H);
fondMc.fenetre_Mc.fond_Choix_2_Mc.lineTo(posChoix_2_x,posChoix_2_y);
fondMc.fenetre_Mc.fond_Choix_2_Mc.endFill;

fondMc.fenetre_Mc.fond_Choix_2_Mc.createTextField("nonGuideTxt", 120, posChoix_2_x, posChoix_2_y, posChoix_2_L, posChoix_2_H);
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt._visible = true;
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.border = false;
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.multiline=true;
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.selectable=true;
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.wordWrap=true;
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.setNewTextFormat(texteFenetre_fmt);
fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.text = " Version NON guidée:\n Ce mode n'indique plus les fautes\n après chaque clic.";

fondMc.fenetre_Mc.fond_Choix_2_Mc.onRollOver = function ()
{
	fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.border = true;
}
fondMc.fenetre_Mc.fond_Choix_2_Mc.onRollOut = function ()
{
	fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.border = false;
}
fondMc.fenetre_Mc.fond_Choix_2_Mc.onRelease = function ()
{
	fondMc.fenetre_Mc._visible = false;
	_global.mode = false;
	selection(maCase[departX].posX, maCase[departX].posY);
	consigneTxt._visible=false;
}

//Bouton 2 associé au choix 2
fondMc.fenetre_Mc.attachMovie ("btnChoix","caseChoix_2",122);
fondMc.fenetre_Mc.caseChoix_2._x = posChoix_2_x - 25;
fondMc.fenetre_Mc.caseChoix_2._y = posChoix_2_y + 5;
fondMc.fenetre_Mc.caseChoix_2._width = 20;
fondMc.fenetre_Mc.caseChoix_2._height = 20;

fondMc.fenetre_Mc.caseChoix_2.onRollOver = function ()
{
	fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.border = true;
}
fondMc.fenetre_Mc.caseChoix_2.onRollOut = function ()
{
	fondMc.fenetre_Mc.fond_Choix_2_Mc.nonGuideTxt.border = false;
}
fondMc.fenetre_Mc.caseChoix_2.onRelease = function()
{
	fondMc.fenetre_Mc._visible = false;
	_global.mode = false;
	selection(maCase[departX].posX, maCase[departX].posY);
	//flechesVisibles(true);
	consigneTxt._visible=false;
}


//On place les boutons
/*
fondMc.attachMovie("Md_emploi", "mdEmploi_Btn", 96);
fondMc.mdEmploi_Btn._x = 638;
fondMc.mdEmploi_Btn._y = 4.6;
fondMc.mdEmploi_Btn._visible = true;

fondMc.attachMovie("Md_guide", "mdGuide_Btn", 97);
fondMc.mdGuide_Btn._x = 638;
fondMc.mdGuide_Btn._y = 28;
fondMc.mdGuide_Btn._visible = true;

fondMc.attachMovie("Md_guide_actif", "mdGuideActif_Btn", 98);
fondMc.mdGuideActif_Btn._x = 638;
fondMc.mdGuideActif_Btn._y = 28;
fondMc.mdGuideActif_Btn._visible = false;
*/
fondMc.attachMovie("btnVerifier", "verifie_Btn", 99);
fondMc.verifie_Btn._x = 600;
fondMc.verifie_Btn._y = 300;
fondMc.verifie_Btn._xscale = 70;
fondMc.verifie_Btn._yscale = 70;
fondMc.verifie_Btn._visible = false;

//On crée des champs texte pour l'explication lors du survol du bouton
/*
this.createTextField("mdEmploiTxt", 100, 400, 0, 200, 40);
mdEmploiTxt._visible = false;
mdEmploiTxt.border = true;
mdEmploiTxt.borderColor = "0x333333";
mdEmploiTxt.background = true;
mdEmploiTxt.backgroundColor = "0xFFFF99";
mdEmploiTxt.multiline=true;
mdEmploiTxt.selectable=false;
mdEmploiTxt.wordWrap=true;
mdEmploiTxt.setNewTextFormat(bouton_fmt);
mdEmploiTxt.text = "Clique ici pour avoir le mode d'emploi";


this.createTextField("mdGuideTxt", 101, 400, 50, 230, 50);
mdGuideTxt._visible = false;
mdGuideTxt.border = true;
mdGuideTxt.borderColor = "0x333333";
mdGuideTxt.background = true;
mdGuideTxt.backgroundColor = "0xFFFF99";
mdGuideTxt.multiline=true;
mdGuideTxt.selectable=false;
mdGuideTxt.wordWrap=true;
mdGuideTxt.setNewTextFormat(bouton_fmt);
mdGuideTxt.text = "Clique ici pour avoir le mode guidé:\nCe mode indique s'il  y a une faute \naprès chaque clic.";
*/

this.createTextField("verifierTxt", 102, 370, 300, 230, 50);
verifierTxt._visible = false;
verifierTxt.border = true;
verifierTxt.borderColor = "0x333333";
verifierTxt.background = true;
verifierTxt.backgroundColor = "0xFFFF99";
verifierTxt.multiline=true;
verifierTxt.selectable=false;
verifierTxt.wordWrap=true;
verifierTxt.setNewTextFormat(bouton_fmt);
verifierTxt.text = "Clique ici pour vérifier avant validation";

_global.mode= true;
/*
fondMc.mdEmploi_Btn.onRollOver = function()
{
	mdEmploiTxt._visible = true;
}

fondMc.mdEmploi_Btn.onRollOut = function()
{
	mdEmploiTxt._visible = false;
}

fondMc.mdEmploi_Btn.onRelease = function()
{
	fondMc.explicationsMc._visible = true;
}

fondMc.mdGuide_Btn.onRollOver = function()
{
	mdGuideTxt._visible = true;
}

fondMc.mdGuide_Btn.onRollOut = function()
{
	mdGuideTxt._visible = false;
}

fondMc.mdGuide_Btn.onRelease = function()
{
	fondMc.mdGuideActif_Btn._visible = true;
	fondMc.mdGuide_Btn._visible = false;
	_global.mode = false;
	trace("je met mode non guide");
}

fondMc.mdGuideActif_Btn.onRollOver = function()
{
	mdGuideTxt.text = "Clique ici pour avoir le mode non guidé:\nCe mode n'indique plus les fautes\naprès chaque clic.";
	mdGuideTxt._visible = true;
}

fondMc.mdGuideActif_Btn.onRollOut = function()
{
	mdGuideTxt._visible = false;
}

fondMc.mdGuideActif_Btn.onRelease = function()
{
	fondMc.mdGuideActif_Btn._visible = false;
	fondMc.mdGuide_Btn._visible = true;
	_global.mode = true;
	trace("je mets mode guide");
	
}
*/
/*fondMc.verifie_Btn.onRollOver = function()
{
	verifierTxt._visible = true;
}

fondMc.verifie_Btn.onRollOut = function()
{
	verifierTxt._visible = false;
}*/

fondMc.verifie_Btn.onRelease = function()
{
	fondMc.verifie_Btn._visible = false;
	verifier();
}