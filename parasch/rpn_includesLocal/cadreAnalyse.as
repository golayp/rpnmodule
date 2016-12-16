//INITIALISATION de l'état des boutons
activerBouton(cadreMc.validerBtn);

//bouton gris avec le ?
//activerBouton(cadreMc.infoBtn);

//bouton vert avec le R
//activerBouton(cadreMc.aideMemoireBtn);

desactiverBouton(cadreMc.solutionBtn);
cacherBouton(cadreMc.suiteBtn);
cacherBouton(cadreMc.termineBtn);
cacherBouton(cadreMc.exeSuivantBtn);
cacherBouton(cadreMc.continuerBtn);
cacherBouton(cadreMc.finBtn);

//ANALYSE
solution=false;
_level0.suiteExercice = false;

function actionRepJuste()
{
	trace("dans actionRepJuste, _level0.retour:"+_level0.retour)
	fondBulle.bulleVerteMc.texte.text = _level0.retour;
	fondBulle.bulleVerteMc._visible = true;
	_level0.finChrono = true;

	_level0.noModuleEnCours++;
	_level0.suivant=liste[_level0.noModuleEnCours][3];
	trace("actionRepJuste suivant"+liste);
	
	_level0.etatModules[_level0.noModuleEnCours-1] = "validé";
	_level0.etatModules[_level0.noModuleEnCours] = "en-cours";
}

function actionRepFausse(validMax)
{
	trace("actRepF noModuleEnCours " + _level0.noModuleEnCours);
	switch (validMax){
		case true:
			if (_level0.finChrono == true) {
				fondBulle.bulleRougeMc.texte.text = _level0.retour+"\nTu as atteint le nombre maximal d'essais.\net\nTu as fait trop long.";
			}else {
				trace("actRepF validmax true.  repfaux:" + liste[_level0.noModuleEnCours][6].slice(0, 3)+" numero: "+Number(liste[_level0.noModuleEnCours][6].slice(6)));
				fondBulle.bulleRougeMc.texte.text = _level0.retour + "\nTu as atteint le nombre maximal d'essais.";
				_level0.finChrono = true;
			}
			
			fondBulle.bulleRougeMc._visible = true;
			if (liste[_level0.noModuleEnCours][6].slice(0, 3) == "mod" && Number(liste[_level0.noModuleEnCours][6].slice(6))==_level0.noModuleEnCours) {
				_level0.etatModules[_level0.noModuleEnCours] = "en-cours";
				_level0.suivant = liste[_level0.noModuleEnCours][3];
				validMax = false;
			}else{
				_level0.etatModules[_level0.noModuleEnCours] = "non-validé";
				_level0.etatModules[_level0.noModuleEnCours+1] = "en-cours";
				_level0.noModuleEnCours++;	
				_level0.suivant = liste[_level0.noModuleEnCours][3];
			}
			
		break;
		case false:
			trace("suivant non")
			if (_level0.finChrono == true && _level0.rep_juste==true) {
				fondBulle.bulleRougeMc.texte.text = _level0.retour+"\nMais tu as fait trop long.";
			}else if (_level0.finChrono == true) {
				fondBulle.bulleRougeMc.texte.text = _level0.retour+"\net tu as fait trop long.";
			}	else {
				fondBulle.bulleRougeMc.texte.text = _level0.retour;
			}
			fondBulle.bulleRougeMc._visible = true;
			_level0.etatModules[_level0.noModuleEnCours] = "en-cours";
//	
			//_level0.etatModules[_level0.noModuleEnCours] = "non-validé";
			//_level0.etatModules[_level0.noModuleEnCours+1] = "en-cours";
			//_level0.suivant=_level0.liste[_level0.noModuleEnCours+1][3];
			_level0.suivant="non";
		break;
	}
}


function actionSuite()
{
	_level0.retour="";
	_level0.rep_juste=false;
	_level0.sol = false;
	_level0.finChrono = false;
	fondBulle.bulleRougeMc.texte.text ="";
	fondBulle.bulleVerteMc.texte.text ="";
	maj_noModules();
	
	//trace("actionSuite, _level0.noModuleEnCours-1" +(_level0.noModuleEnCours-1) )
	//trace("_level0.nbModules" + _level0.nbModules)
	//trace("_level0.liste[_level0.nbModules][5]"+_level0.liste[_level0.nbModules][5])
	_level0.tempsMax=liste[_level0.noModuleEnCours][14];
		trace("interface départ: " + _level0.tempsMax);
		_level0.finChrono = false;
	if(_level0.noModuleEnCours-1==_level0.nbModules){
		
		_level0.suivant=liste[_level0.noModuleEnCours-1][5];
		//trace("ACTION FINaction suite "+_level0.suivant);

		//getURL(liste[_level0.noModuleEnCours - 1][5]);
		trace("ACTION SUITE, CADREANALYSE/////////////////String(liste[_level0.noModuleEnCours-1][5])" +String(liste[_level0.noModuleEnCours-1][5]) );
		if (String(liste[_level0.noModuleEnCours-1][5])!="") {
			getURL(liste[_level0.noModuleEnCours-1][5], _parent);
		}else {
			cacherBouton(cadreMc.validerBtn);		
			cacherBouton(cadreMc.suiteBtn);
			montrerBouton(cadreMc.termineBtn);
			cacherBouton(cadreMc.exeSuivantBtn);
			cacherBouton(cadreMc.continuerBtn);
			cacherBouton(cadreMc.solutionBtn);
			desactiverBouton(cadreMc.validerBtn);		
			desactiverBouton(cadreMc.suiteBtn);
			desactiverBouton(cadreMc.termineBtn);
			desactiverBouton(cadreMc.exeSuivantBtn);
			desactiverBouton(cadreMc.continuerBtn);
			desactiverBouton(cadreMc.solutionBtn);
		}

	}else if(_level0.suivant=="non"){
		//trace ("je ne fais rien");
	}else if(_level0.suivant!="non"){

		trace("ACTION action suite"+_level0.suivant)
		nbFois=0;
		cadreMc.nbEssais.text = nbFois;
		cadreMc.nbValideMax.text =liste[_level0.noModuleEnCours][4];
		
		this.cadreMc.donnee1Txt.text = liste[_level0.noModuleEnCours][1];
		this.cadreMc.donnee2Txt.text = liste[_level0.noModuleEnCours][2];

		chargeAideConsignes(_level0.noModuleEnCours);
		
		loadMovie(_level0.suivant, _level0.cible.exeMc);
		//loadMovie(_level0.liste[1][3], "exeMc");
		_level0.largeurClipDansInterface = liste[_level0.noModuleEnCours][11];
		_level0.hauteurClipDansInterface = liste[_level0.noModuleEnCours][12];
		
		
		var loadlistener:Object = new Object();
		//Cette fonction n'est pas utile ici.Elle sert à envoyer des informations lorsque tout est chargé.
		loadlistener.onLoadComplete = function(target_mc:MovieClip, httpStatus:Number):Void {
			trace(">> load_level0.listener.onLoadComplete()");
			trace(">> =============================");
			trace(">> target_mc._width: " + target_mc._width); // 0
			trace(">> httpStatus: " + httpStatus);
			
			
		}

		loadlistener.onLoadInit = function(target_mc:MovieClip):Void {
			trace(">> load_level0.listener.onLoadInit()");
			trace(">> =============================");
			trace(">> target_mc._width: " + target_mc._width); // 315
			//Si on a défini une valeur pour largeurClipDansInterface et hauteurClipDansInterface
			if (_level0.largeurClipDansInterface > 0 && _level0.hauteurClipDansInterface > 0) {
				trace("_level0.hauteurClipDansInterface" + _level0.hauteurClipDansInterface)
				trace("_level0.largeurClipDansInterface" + _level0.largeurClipDansInterface)
				trace("")
				target_mc._width=_level0.largeurClipDansInterface;
				target_mc._height=_level0.hauteurClipDansInterface;
			}else {
				target_mc._width=623;
				target_mc._height=333;
			}
			
			
		}

		var mcLoader:MovieClipLoader = new MovieClipLoader();
		mcLoader.addListener(load_level0.listener);
		trace("mcLoader gestionModules "+_level0.suivant)
		//var mc:MovieClip = this.createEmptyMovieClip("mc", this.getNextHighestDepth());
		mcLoader.loadClip(liste[_level0.noModuleEnCours][3], _level0.cible.exeMc);
		
		//clic sur bouton aideMemoireBtn pour le réinitialiser
		_level0.clicAMBtn=0;
		chargeAideMemoire(_level0.noModuleEnCours);
	
	}
}