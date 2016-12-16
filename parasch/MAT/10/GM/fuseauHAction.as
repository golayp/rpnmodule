/*
 * @author Jean-Michel Luthi
*/
//import comportementPays;
trace("fuseauHAction")
fuseauHorairesMc._visible=false;
carteMondeMc._visible = false;


//On fait une boucle qui va assigner un comportement des clips
/*for (i = 0; i < _level0.liste.length; i++) {
	monPays[i] = new comportementPays(this[_level0.liste[i][1]], this[_level0.liste[i][1]]._x, this[_level0.liste[i][1]]._y, _level0.liste[i],
	texteInfo_fmt, texteCapitaleSurvole_fmt, texteVilleSurvole_fmt, this._width, this._height, 200, 100, auDessus, auDessus1, auDessus2, false);
	
}*/

//On gère les fuseaux horaires
for (i = 0; i < tabFuseau.length; i++) {
	switch (tabFuseau[i][0]) {
		case "X2Mc":
			rollOverf(this["f"+tabFuseau[i][0]], this.XMc, this[tabFuseau[i][1]]);
			rollOutf(this["f"+tabFuseau[i][0]], this.XMc, this[tabFuseau[i][1]]);
			releasef(this["f"+tabFuseau[i][0]], this.XMc, this[tabFuseau[i][1]]);
			releaseOutsidef(this["f" + tabFuseau[i][0]], this.XMc, this[tabFuseau[i][1]]);
			break;
		case "X3Mc": //Correspond au +13, pour des raisons économiques, n'a rien à voire avec un fuseau. on ne met donc pas de zone pou rl'affichage d'un fuseau méridien complet.
			rollOverf(this["f"+tabFuseau[i][0]], this.X3Mc);
			rollOutf(this["f"+tabFuseau[i][0]], this.X3Mc);
			releasef(this["f"+tabFuseau[i][0]], this.X3Mc);
			releaseOutsidef(this["f" + tabFuseau[i][0]], this.X3Mc);
			break;
		case "X4Mc": //Correspond au +13, pour des raisons économiques, n'a rien à voire avec un fuseau. on ne met donc pas de zone pou rl'affichage d'un fuseau méridien complet.
			rollOverf(this["f"+tabFuseau[i][0]], this.X3Mc);
			rollOutf(this["f"+tabFuseau[i][0]], this.X3Mc);
			releasef(this["f"+tabFuseau[i][0]], this.X3Mc);
			releaseOutsidef(this["f" + tabFuseau[i][0]], this.X3Mc);
			break;	
		default:
			rollOverf(this["f"+tabFuseau[i][0]], this[tabFuseau[i][0]], this[tabFuseau[i][1]]);
			rollOutf(this["f"+tabFuseau[i][0]], this[tabFuseau[i][0]], this[tabFuseau[i][1]]);
			releasef(this["f"+tabFuseau[i][0]], this[tabFuseau[i][0]], this[tabFuseau[i][1]]);
			releaseOutsidef(this["f" + tabFuseau[i][0]], this[tabFuseau[i][0]], this[tabFuseau[i][1]]);
			break;
	}
	

	//On rend les clips fuseaux invisibles
	this[tabFuseau[i][0]]._visible = false;
	this[tabFuseau[i][1]]._visible = false;
/*	///////////////////////en flash 6//////////////////////////////
	var macouleur:Color = new Color(this[tabFuseau[i][0]]); // On associe macouleur à un clip
	macouleur.setRGB(0xFFFF00); // On donne une couleur héxadécimal à maCouleur
	var macouleur:Color = new Color(this[tabFuseau[i][1]]); // On associe macouleur à un clip
	macouleur.setRGB(0xFFFF00); // On donne une couleur héxadécimal à maCouleur
*/	
	
	/////////////////////////////////EN flash 10/////////////////
	//classe pour créer une couleur
	import flash.geom.ColorTransform;
	//classe pour apliquer une couleur
	import flash.geom.Transform;
	
	var macouleur:ColorTransform = new ColorTransform();
	macouleur.rgb = 0xFFFF00; //Couleur jaune
	var transformation:Transform = new Transform(this[tabFuseau[i][0]]);
	transformation.colorTransform = macouleur;
	
	var transformation2:Transform = new Transform(this[tabFuseau[i][1]]);
	transformation2.colorTransform = macouleur;
	trace("this[tabFuseau[i][1]]"+this[tabFuseau[i][1]])
	this[tabFuseau[i][1]]._alpha = 50;	
	
	this["f"+tabFuseau[i][0]].createTextField("infoFuseau", 0, -25, -50, 100, 40);
	this["f"+tabFuseau[i][0]].infoFuseau.background = true;
	this["f"+tabFuseau[i][0]].infoFuseau.backgroundColor = 0x00ff00;
	this["f"+tabFuseau[i][0]].infoFuseau.selectable = false;
	this["f"+tabFuseau[i][0]].infoFuseau.multiline = true;
	this["f"+tabFuseau[i][0]].infoFuseau.wordWrap = true;
	this["f" + tabFuseau[i][0]].infoFuseau.autoSize = true;
	switch (tabFuseau[i][0]) {
		case"XMc":
			this["f" + tabFuseau[i][0]].infoFuseau._x = 0;
			break;
		case "X3Mc":
			this["f" + tabFuseau[i][0]].infoFuseau._x = -50;
			break;
	}
	this["f" + tabFuseau[i][0]].infoFuseau.setNewTextFormat(texteInfo_fmt);
	
	
	//En fonction du décalage, on adapte le texte
	var decalageFuseau:String;
	switch (true) {
		case (Math.round(Number(tabFuseau[i][2])) == Number(tabFuseau[i][2]) && Number(tabFuseau[i][2]) < 0):
			//trace ("case1")
			decalageFuseau = "GMT - " + Math.abs(tabFuseau[i][2]);
			break;
		case (Math.floor(Number(tabFuseau[i][2])) != Number(tabFuseau[i][2]) && Number(tabFuseau[i][2]) < 0):
			//trace ("case2")
			decalageFuseau = "GMT - " + (Math.floor(Math.abs(tabFuseau[i][2]))) + ":30";
			break;
		case (Math.round(Number(tabFuseau[i][2])) == Number(tabFuseau[i][2]) && Number(tabFuseau[i][2]) > 0):
			//trace ("case3")
			decalageFuseau = "GMT + " + tabFuseau[i][2];
			break;
		case (Math.floor(Number(tabFuseau[i][2])) != Number(tabFuseau[i][2]) && Number(tabFuseau[i][2]) > 0):
			//trace ("case4")
			if (Math.abs(Math.floor(Number(tabFuseau[i][2])) - Number(tabFuseau[i][2]))==0.5) {
				decalageFuseau = "GMT + " + (Math.round(tabFuseau[i][2])-1)+":30";
			}else {
				decalageFuseau = "GMT + " + (Math.round(tabFuseau[i][2])-1)+":45";
			}
			
			break;
		case (Number(tabFuseau[i][2])==0):
			decalageFuseau = "Méridien référence\nde Greenwich.\nPas de décalage avec lui-même.\n(GMT+0)";
			this["f" + tabFuseau[i][0]].infoFuseau._y = -80;
			break;
	}
	this["f" + tabFuseau[i][0]].infoFuseau._width = 0.6 * decalageFuseau.length * texteInfo_fmt.size;
	if (Number(tabFuseau[i][2]) == 0) {
		this["f" + tabFuseau[i][0]].infoFuseau._width = 0.6 * 15 * texteInfo_fmt.size;
	}
	this["f" + tabFuseau[i][0]].infoFuseau.text = decalageFuseau;
	this["f" + tabFuseau[i][0]].infoFuseau._visible = false;
	//trace("zone " + tabFuseau[i][0])
	//trace("decalage " + decalage)
	//trace("tabFuseau "+tabFuseau[i])
}






//Fonctions pour le survol des zones
//clipVisible2, C'est le fuseau horaire complet, tout le méridien
function rollOverf(clip:MovieClip, clipVisible:MovieClip, clipVisible2:MovieClip) {
	clip.onRollOver = function() {
		trace("niveau fuseau avant"+this.getDepth())
		clipVisible.swapDepths(auDessusf);
		this.swapDepths(auDessusZones);
		trace("niveau fuseau apres"+this.getDepth())
		trace("clipVisible" + clipVisible)
		trace("clipVisible2" + clipVisible2)
		trace("auDessusZones" + auDessusZones)
		this.infoFuseau._visible = true;
		clipVisible._visible = true;
		//clipVisible2._visible = true;
		trace("clipVisible"+clipVisible._visible)
		
	}
}

function rollOutf(clip:MovieClip, clipVisible:MovieClip, clipVisible2:MovieClip) {
	clip.onRollOut = function() {
		clipVisible.swapDepths(auDessusf);
		this.swapDepths(auDessusZones);
		clipVisible._visible = false;
		clipVisible2._visible = false;
		this.infoFuseau._visible = false;
	}
}
function releasef(clip:MovieClip, clipVisible:MovieClip, clipVisible2:MovieClip) {
	clip.onRelease=function(){
		trace("clip release: "+clip)
	}
}
function releaseOutsidef(clip:MovieClip, clipVisible:MovieClip, clipVisible2:MovieClip) {
	clip.onReleaseOutside = function() {
		clipVisible._visible = false;
		clipVisible2._visible = false;

	}
}
function rollOverNcap(clip:MovieClip, k:Number) {
	trace("clip dans rollOverNcap"+clip.nomCap.text)
	clip.onRollOver = function() {
		clip.nomCap.setNewTextFormat(texteCapitaleSurvole_fmt);
		trace("clip dans rollOverNcap"+clip.nomCap.text)
		trace("rollOverNcap")
	}
}

function actionSolution() {
	fondMc.attachMovie("bulle_rouge", "decalageSol", fondMc.getNextHighestDepth())
	fondMc.decalgesol.width = 1250;
	fondMc.decalgesol.height = 120;
	fondMc.decalgesol._x = 0;
	fondMc.decalgesol._y = 530;
	fondMc.decalgesol.beginfill(0xff0000);
	fondMc.decalgesol.moveTo(570, 560);
	fondMc.decalgesol.lineTo(570 + 50 * ville[2], 560);
	fondMc.decalgesol.lineTo(570 + 50 * ville[2], 590);
	fondMc.decalgesol.lineTo(570,590);
	fondMc.decalgesol.lineTo(570, 560);
	fondMc.decalgesol.endFill();
	trace ("decalageSol: " + fondMc.decalgesol);
	monPays[ville[4]].visibilite(true, ville[5]);
	clipVisible.swapDepths(auDessusf);
	for (i = 0; i < tabFuseau.length; i++) {
		if (ville[2] == tabFuseau[i][2]) {
			this["f"+tabFuseau[i][0]].swapDepths(auDessusZones);
			this["f"+tabFuseau[i][0]].infoFuseau._visible = true;
			this[tabFuseau[i][0]]._visible = true;
		}
	}
	//on corrige de 1 pour que le décalage soit par rapport à l'heure suisse
	var dH:Number = Math.floor(ville[2]) - 1;
	var dM:Number = Math.floor((ville[2]-dH - 1) * 60);
	var monRetour:Boolean;
	var my_date:Date = new Date();
	
	if (my_date.getMinutes() + dM > 60) {
		dM = my_date.getMinutes() + dM - 60;
		trace("dM "+dM)
		dH = dH + 1;
	}else {
		dM = my_date.getMinutes() + dM;
		dH = dH;
	}
	var heureVraie = (my_date.getHours() + dH) % 24;
	if (heureVraie < 0) {
		heureVraie = heureVraie + 24;
	}
	consigneTxtMc.heureTxt.text = heureVraie;
	consigneTxtMc.minTxt.text = dM;
}

function analyse(h:Number, m:Number, decalage):Boolean {
	//on corrige de 1 pour que le décalage soit par rapport à l'heure suisse
	var dH:Number = Math.floor(decalage) - 1;
	var dM:Number = Math.floor((decalage-dH - 1) * 60);
	var monRetour:Boolean;
	var my_date:Date = new Date();
	trace("décalage: " +dH + "h " + dM + "min" )
	trace ("somme minutes"+(my_date.getMinutes() + dM))
	if (my_date.getMinutes() + dM > 60) {
		dM = my_date.getMinutes() + dM - 60;
		trace("dM "+dM)
		dH = dH + 1;
	}else {
		dM = my_date.getMinutes() + dM;
		dH = dH;
	}
	trace ("décalage corrigé" +dH+"h "+dM+"min")
	trace("m: " + m)
	var heureVraie = (my_date.getHours() + dH) % 24;
	if (heureVraie < 0) {
		heureVraie = heureVraie + 24;
	}
	switch(true) {
			
		case (heureVraie == h &&  dM == m):
			monRetour = true;
			_level0.retour = "Bravo, il est bien "+h+":"+m+".";
			break;
		case(heureVraie == h &&  dM != m):
			monRetour = false;
			_level0.retour = "Le décalage des minutes est faux.";
			break;
		case(heureVraie != h && heureVraie - 12 == h &&  dM == m):
			monRetour = false;
			_level0.retour = "Le décalage des heures est faux car l'heure est sur 24h";
			break;
		case(heureVraie != h && heureVraie - 12 == h &&  dM != m):
			monRetour = false;
			_level0.retour = "Le décalage des heures est faux car l'heure est sur 24h\n les minutes sont fausses.";
			break;
		case(heureVraie != h &&  dM == m):
			monRetour = false;
			_level0.retour = "Le décalage des heures est faux.";
			break;
		default:
			monRetour = false;
			_level0.retour = "Regarde bien le fuseau horaire, pour l'instant, tu n'as pas situé le pays.\nUtilise les indices!";
			break;
		
	}
	trace("_level0.retour: "+_level0.retour)
	return monRetour;
	
}
//comportement si on redis ou on agrandis
consigneMc.retrecirBtn.onRelease = function() {
	consigneMc.avertissementMc._visible = false;
	consigneMc._visible = false;
	consignePMc._visible = true;
	consigneTxtMc._x = consignePMc._x + 3;
	consigneTxtMc._y = consignePMc._y + 2;
	consigneTxtMc._height = consignePMc._height - 3;
	consigneTxtMc.validerBtn._width = consigneTxtMc._height;
	consigneTxtMc.validerBtn._x = 93;
	consigneTxtMc.indiceBtn._width = consigneTxtMc._height;
	consigneTxtMc.indiceBtn._x = 113;
	consigneTxtMc.indiceBtn._visible = true;
	for (var i:Number = 0; i < _level0.liste.length; i++) {
		//trace("monPays[i].setActif(true)"+monPays[i])
		monPays[i].setActif(true);
	}
	//On met le focus sur le clip consigneTxtMc
	//Selection.setFocus("consigneTxtMc");
	//consigneTxtMc.focusrect = false;
}
consignePMc.agrandirBtn.onRelease = function() {
	consignePMc._visible = false;
	consigneMc._visible = true;
	consigneTxtMc._x = consigneMc._x + 20;
	consigneTxtMc._y = consigneMc._y + 100;
	consigneTxtMc.validerBtn._width = 35;
	consigneTxtMc.validerBtn._height = 35;
	consigneTxtMc.validerBtn._x = 93;
	consigneTxtMc.indiceBtn._width = 35;
	consigneTxtMc.indiceBtn._height = 35;
	consigneTxtMc.indiceBtn._x = 130;
	consigneTxtMc.indiceBtn._visible = true;
	consigneTxtMc._height = texteValeurHCons_fmt.size ;
	for (var i:Number = 0; i < _level0.liste.length; i++) {
		monPays[i].setActif(false);
	}
	//On met le focus sur le clip consigneTxtMc
	//Selection.setFocus("consigneTxtMc");
}
consigneTxtMc.heureTxt.onChanged = function() {
	_level0.rep_juste = analyse(consigneTxtMc.heureTxt.text, consigneTxtMc.minTxt.text, ville[2] );
	consigneMc.txtRep.text = _level0.retour;
	if (_level0.rep_juste == true) {
		consigneMc.txtRep.setNewTextFormat(texteRepJCons_fmt);
		consigneMc.txtRep.text = _level0.retour;
	}else {
		consigneMc.txtRep.setNewTextFormat(texteRepFCons_fmt);
		consigneMc.txtRep.text = _level0.retour;
		consigneTxtMc.indiceBtn._visible = true;
	}
}
consigneTxtMc.minTxt.onChanged = function() {
	_level0.rep_juste = analyse(consigneTxtMc.heureTxt.text, consigneTxtMc.minTxt.text, ville[2] );
	consigneMc.txtRep.text = _level0.retour;
	if (_level0.rep_juste == true) {
		consigneMc.txtRep.setNewTextFormat(texteRepJCons_fmt);
		consigneMc.txtRep.text = _level0.retour;
	}else {
		consigneMc.txtRep.setNewTextFormat(texteRepFCons_fmt);
		consigneMc.txtRep.text = _level0.retour;
		consigneTxtMc.indiceBtn._visible = true;
	}
}
consigneTxtMc.validerBtn.onRelease = function() {
	_level0.rep_juste = analyse(consigneTxtMc.heureTxt.text, consigneTxtMc.minTxt.text, ville[2] );
/*	
	//On envois des infos sur le javascript
	var newUsername:String = "Monsieur " + _level0.username;
	var the_resultats:Object = {id_eleve:id_eleve, rep_juste:_level0.rep_juste, username:newUsername}; 
	//On met la reponse de javascript dans une string pour savoir si c'est exécuté
	var reponseJS2:String = String(ExternalInterface.call("resetfield"));
	var reponseJS1:String = String(ExternalInterface.call("recuperationSWF", the_resultats));
	//fondMc.infoTxt.text =reponseJS1 + the_resultats["username"];
	fondMc.infoTxt.text =reponseJS1 +"\n"+ the_resultats["username"] +"\n" + reponseJS2;
*/	
	

	consignePMc._visible = false;
	consigneMc._visible = true;
	consigneTxtMc._x = consigneMc._x + 20;
	consigneTxtMc._y = consigneMc._y + 100;
	consigneTxtMc.validerBtn._width = 35;
	consigneTxtMc.validerBtn._height = 35;
	consigneTxtMc.validerBtn._x = 93;
	consigneTxtMc.indiceBtn._width = 35;
	consigneTxtMc.indiceBtn._height = 35;
	consigneTxtMc.indiceBtn._x = 130;
	consigneTxtMc._height = texteValeurHCons_fmt.size ;
	for (var i:Number = 0; i < _level0.liste.length; i++) {
		monPays[i].setActif(false);
	}
	//On met le focus sur le clip consigneTxtMc
	//Selection.setFocus("consigneTxtMc");
	if (_level0.rep_juste == true) {
		consigneMc.txtRep.setNewTextFormat(texteRepJCons_fmt);
		consigneMc.txtRep.text = _level0.retour;
	}else {
		consigneMc.txtRep.setNewTextFormat(texteRepFCons_fmt);
		consigneMc.txtRep.text = _level0.retour;
		consigneTxtMc.indiceBtn._visible = true;
	}
	
}
consigneTxtMc.indiceBtn.onRollOver = function() {
	trace("indice on roll over" + this)
	consigneTxtMc.createTextField("indice", 6, this._x, this._y+40, 200, 300);
	consigneTxtMc.indice.background = true;
	consigneTxtMc.indice.backgroundColor = 0xffff00;
	consigneTxtMc.indice.alpha = 50;
	consigneTxtMc.indice.selectable = false;
	consigneTxtMc.indice.multiline = true;
	consigneTxtMc.indice.wordWrap = true;
	consigneTxtMc.indice.autoSize = true;
	consigneTxtMc.indice.setNewTextFormat(texteRepJCons_fmt);
	//trace ("ville" +ville );
	switch (indiceUtilise){
	case 0:
		consigneTxtMc.indice.text = "Pays: " + ville[0];
		indiceUtilise++;
		nbIndices++;
		break;
	case 1:
		if (ville[2]-1>0){
			consigneTxtMc.indice.text = "Cette ville est à l'est de la Suisse.";
		}else {
			consigneTxtMc.indice.text = "Cette ville est à l'ouest de la Suisse.";
		}
		indiceUtilise++;
		nbIndices++;
		break;
	case 2:
		//trace("case 2")
		if (ville[3].length > 0) {
			consigneTxtMc.indice.text = ville[3];
			indiceUtilise++;
			nbIndices++;
			//trace("case 2 ville3"+ville[3])
		}else{
			//consigneTxtMc.indice.text = "Tu as vu tous les indices disponibles.";
			consigneTxtMc.indice.text = ville[3];
			indiceUtilise = 0;
			//trace ("indiceUtilise++ case 2;" + ville[3])
		}
		break;
	case 3:
		//consigneTxtMc.indice.text = "Tu as vu tous les indices.";
		consigneTxtMc.indice.text = ville[3];
		indiceUtilise = 0;
		//trace ("indiceUtilise++ case 3;" + indiceUtilise)
		break;	
	}
}
consigneTxtMc.indiceBtn.onRollOut = function() {
	trace("indice on roll out"+this)
	consigneTxtMc.createTextField("indice", 6, 0, 0, 0, 0);
}
//Si on presse enter, on valide
var keylistener:Object = new Object();
keylistener.onKeyDown = function() {
    switch (Key.getCode()) {
		case Key.UP :
			consignePMc._visible = false;
			consigneMc._visible = true;
			consigneTxtMc._x = consigneMc._x + 20;
			consigneTxtMc._y = consigneMc._y + 100;
			consigneTxtMc.validerBtn._width = 35;
			consigneTxtMc.validerBtn._height = 35;
			consigneTxtMc.validerBtn._x = 93;
			consigneTxtMc.indiceBtn._width = 35;
			consigneTxtMc.indiceBtn._height = 35;
			consigneTxtMc.indiceBtn._x = 130;
			consigneTxtMc._height = texteValeurHCons_fmt.size ;
			for (var i:Number = 0; i < _level0.liste.length; i++) {
				if (monPays[i].over == true) {
					trace("i"+i+"over "+monPays[i].over)
					trace("monPays[i] avant "+monPays[i].connaitreNiveau())
					monPays[i].changerNiveau(lePlusHaut);
					trace("monPays[i] après "+monPays[i].connaitreNiveau())
					monPays[i].over = false;
				}
				
				monPays[i].setActif(false);
				monPays[i].enleverEcouteurSouris();
			}
			//On met le focus sur le clip consigneTxtMc
			Selection.setFocus("consigneTxtMc");
			
			break;
		case Key.DOWN :
			consigneMc.avertissementMc._visible = false;
			consigneMc._visible = false;
			consignePMc._visible = true;
			consigneTxtMc._x = consignePMc._x + 3;
			consigneTxtMc._y = consignePMc._y + 2;
			consigneTxtMc._height = consignePMc._height - 3;
			consigneTxtMc.validerBtn._width = consigneTxtMc._height;
			consigneTxtMc.validerBtn._x = 93;
			consigneTxtMc.indiceBtn._width = consigneTxtMc._height;
			consigneTxtMc.indiceBtn._x = 113;
			for (var i:Number = 0; i < _level0.liste.length; i++) {
				//trace("monPays[i].setActif(true)"+monPays[i])
				monPays[i].setActif(true);
			}
			//On met le focus sur le clip consigneTxtMc
			consigneTxtMc.focusrect = false;
			//Selection.setFocus("consigneTxtMc");
			
			break;
		
		case Key.DELETEKEY :
			consigneTxtMc.heureTxt.text = "";
			consigneTxtMc.minTxt.text = "";
			break;
		case Key.ENTER:
			_level0.rep_juste = analyse(consigneTxtMc.heureTxt.text, consigneTxtMc.minTxt.text, ville[2] );
			consignePMc._visible = false;
			consigneMc._visible = true;
			consigneTxtMc._x = consigneMc._x + 20;
			consigneTxtMc._y = consigneMc._y + 100;
			consigneTxtMc.validerBtn._width = 35;
			consigneTxtMc.validerBtn._height = 35;
			consigneTxtMc.validerBtn._x = 93;
			consigneTxtMc.indiceBtn._width = 35;
			consigneTxtMc.indiceBtn._height = 35;
			consigneTxtMc.indiceBtn._x = 130;
			consigneTxtMc._height = texteValeurHCons_fmt.size ;
			for (var i:Number = 0; i < _level0.liste.length; i++) {
				monPays[i].setActif(false);
			}
			//On met le focus sur le clip consigneTxtMc
			//Selection.setFocus("consigneTxtMc");
			if (_level0.rep_juste == true) {
				consigneMc.txtRep.setNewTextFormat(texteRepJCons_fmt);
				consigneMc.txtRep.text = _level0.retour;
			}else {
				consigneMc.txtRep.setNewTextFormat(texteRepFCons_fmt);
				consigneMc.txtRep.text = _level0.retour;
				consigneTxtMc.indiceBtn._visible = true;
			}
			break;
		case Key.BACKSPACE:
			consigneTxtMc.heureTxt.text = "";
			consigneTxtMc.minTxt.text = "";
			break;
		case 73:
			if(_level0.rep_juste==false){
				consigneTxtMc.createTextField("indice", 6, this._x, this._y+40, 200, 300);
				consigneTxtMc.indice.background = true;
				consigneTxtMc.indice.backgroundColor = 0xffff00;
				consigneTxtMc.indice.alpha = 50;
				consigneTxtMc.indice.selectable = false;
				consigneTxtMc.indice.multiline = true;
				consigneTxtMc.indice.wordWrap = true;
				consigneTxtMc.indice.autoSize = true;
				consigneTxtMc.indice.setNewTextFormat(texteRepJCons_fmt);
				switch (indiceUtilise){
				case 0:
					consigneTxtMc.indice.text = "Pays: " + ville[0];
					indiceUtilise++;
					nbIndices++;
					break;
				case 1:
					if (ville[2]-1>0){
						consigneTxtMc.indice.text = "Cette ville est à l'est de la Suisse.";
					}else {
						consigneTxtMc.indice.text = "Cette ville est à l'ouest de la Suisse.";
					}
					indiceUtilise++;
					nbIndices++;
					break;
				case 2:
					consigneTxtMc.indice.text = "Tu as vu tous les indices.";
					indiceUtilise = 0;
					trace ("indiceUtilise++;"+indiceUtilise)
					break;
				}
			}
			break;
    }
}
keylistener.onKeyUp = function() {
	switch (Key.getCode()) {
		case 73:
			consigneTxtMc.createTextField("indice1", 6, 0, 0, 0, 0);
			break;
	}
}
Key.addListener(keylistener);


_level0.sol = false;
this.createEmptyMovieClip("support",-4000);
support.onEnterFrame = function() {
	fondMc.infoTxt.text = _level0.monTexte;
	var my_date:Date = new Date();
	var dH:Number = Math.floor(ville[2]) - 1;
	var dM:Number = Math.floor((ville[2]-dH) * 36 / 60);
	var monHeureSol = (my_date.getHours()+ dH)%24;
	var maMinuteSol = my_date.getMinutes() + dM;
	_level0.retourSolution = "A " + ville[1] + "\nil est:\n" + monHeureSol + "h " + maMinuteSol  + "min";
	switch (true) {
		case _level0.sol:
			actionSolution();
			delete support.onEnterFrame;
		break;
		
	}
	
}
			

