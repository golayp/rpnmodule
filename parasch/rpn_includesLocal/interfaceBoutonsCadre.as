//FONCTIONS
function importerBoutons() {
	
	cadreMc.attachMovie("continuer","continuerBtn", 102);
	cadreMc.attachMovie("exercice_suivant","exeSuivantBtn", 103);
	cadreMc.attachMovie("termine","termineBtn", 104);
	cadreMc.attachMovie("suite","suiteBtn", 105);
	cadreMc.attachMovie("valider", "validerBtn", 106);
	cadreMc.attachMovie("solution", "solutionBtn", 110);
	cadreMc.attachMovie("fin", "finBtn", 111);
	cacherBouton(cadreMc.solutionBtn);
	if (String(liste[_level0.noModuleEnCours][13])=="oui"){
		montrerBouton(cadreMc.solutionBtn);
		//trace("///////////////////////solution oui///////////////////////////////////////////");
		activerBouton(cadreMc.solutionBtn);
	}
	//cadreMc.attachMovie("aideMemoire", "aideMemoireBtn", 108);
	//cadreMc.attachMovie("informations", "infoBtn", 109);
	//cadreMc.solutionBtn.attachMovie("operation", "infoSol", 109);
	cadreMc.solutionBtn.infoSol._visible = false;
	cadreMc.continuerBtn._x = 450;
	cadreMc.continuerBtn._y = 330;
	cadreMc.exeSuivantBtn._x = 450;
	cadreMc.exeSuivantBtn._y = 330;
	cadreMc.termineBtn._x = 450;
	cadreMc.termineBtn._y = 330;
	cadreMc.suiteBtn._x = 450;
	cadreMc.suiteBtn._y = 330;
	cadreMc.validerBtn._x = 450;
	cadreMc.validerBtn._y = 330;
	cadreMc.solutionBtn._x = 540;
	cadreMc.solutionBtn._y = 330;
	cadreMc.finBtn._x = 450;
	cadreMc.finBtn._y = 330;
/*	cadreMc.aideMemoireBtn._x = 565;
	cadreMc.aideMemoireBtn._y = 425;
	cadreMc.infoBtn._x = 525;
	cadreMc.infoBtn._y = 425;
	trace("cadreMc.solutionBtn." + this)
	desactiverBouton(cadreMc.aideMemoireBtn);
	desactiverBouton(cadreMc.infoBtn);*/
};

function importerNomEleve()
{
	cadreMc.createTextField("prenom",111,400,5.5,100,21.6);
	cadreMc.prenom.setNewTextFormat(texteBulle_fmt);
	cadreMc.prenom.text = _level0.prenomEleve;
};

function activerBouton(btn)
{
	trace(btn+" activé")
	btn._visible = true;
	btn.enabled = true;
	btn._alpha = 70;
	btn.onRollOver = function()
	{
		this._alpha = 100;
	}
	btn.onRollOut = function()
	{
		this._alpha = 70;
	}
	
}

function desactiverBouton(btn)
{
	//trace(btn+" désactivé")
	btn._alpha = 20;
	btn.enabled = false;
	btn.infoSol._visible = false;
}


function cacherBouton(btn)
{
	//trace(btn+" caché")
	btn._visible = false;
}

function montrerBouton(btn)
{
	//trace(btn+" caché")
	btn._visible = true;
}

//Fonction Préparation du bouton à montrer pour suite - exeSuivant - termine
function prepareBoutonSuite(nb)
{
	suiteTemp = liste[_level0.noModuleEnCours][5].slice(0,3);
	trace("Prep Bouton noModuleEnCours "+noModuleEnCours)
	switch(suiteTemp)
	{
		case "mod":
			boutonAmontrer = cadreMc.suiteBtn;
			break;
		case "../":
		case "htt":
			boutonAmontrer = cadreMc.exeSuivantBtn;
			break;
		case "ter":
		case "fin":
		case "":
			boutonAmontrer = cadreMc.termineBtn;
			break;
	}
	//trace("boutonAmontrer "+boutonAmontrer)
}


//INTERFACE avec les boutons cadre_base.swf

//Fonction pour charger l'aide mémoire
function chargeAideMemoire(nb){

	if (String(liste[nb][7])!="" && String(liste[nb][9])=="oui"){
		//trace("On charge AideMémoire");
		//loadMovie(liste[nb][7], "_level0.cible.aideMemoireMc");
		
		var loadListener:Object = new Object();

		loadListener.onLoadInit = function(target_mc:MovieClip):Void {
			//////////////////////////////////////////L'aide-mémoire ne doit pas dépasser 621x350 ////////////////////////////////////////////////////////////////
			//target_mc._width=621;
			//target_mc._height = 350;
			target_mc._x=10;
			target_mc._y=90;
		}

		var mcLoader:MovieClipLoader = new MovieClipLoader();
		mcLoader.addListener(loadListener);

		//var mc:MovieClip = this.createEmptyMovieClip("mc", this.getNextHighestDepth());
		mcLoader.loadClip(liste[nb][7], _level0.cible.aideMemoireMc);

		//_level0.cible.aideMemoireMc._x=10;
		//_level0.cible.aideMemoireMc._y=90;
		//_level0.cible.aideMemoireMc._xscale=96.7;
		//_level0.cible.aideMemoireMc._yscale=95;
		_level0.cible.aideMemoireMc._visible=true;
		activerBouton(cadreMc.aideMemoireBtn);
		_level0.clicAMBtn=1;
		
	}else if(String(liste[nb][7])!="" && String(liste[nb][9])=="non"){
		//trace("On active le bouton AideMémoire sans charger l'AideMémoire");
		
		activerBouton(cadreMc.aideMemoireBtn);
		_level0.cible.aideMemoireMc._visible=false;
		
		//test 1er clic sur bouton aideMemoireBtn pour chrger l'AM s'il ne l'était pas au démarrage
		_level0.clicAMBtn=0

	}else{
		//trace("on ne charge pas AideMémoire");

		desactiverBouton(cadreMc.aideMemoireBtn);
		_level0.cible.aideMemoireMc._visible=false;
	}
}



//Fonction pour charger l'aide des consignes
function chargeAideConsignes(nb){
	
	if (String(liste[nb][8])!="" && String(liste[nb][10])=="oui"){
		//trace("On charge AideConsignes"+cadreMc.infoBtn);
		//_level0.cible.exeMc.attachMovie("rectangleExe","aideConsignesMc",_level0.cible.exeMc.getNextHighestDepth);
		//loadMovie(liste[nb][8], "_level0.cible.aideConsignesMc");
		
		
		var loadListener:Object = new Object();

		loadListener.onLoadInit = function(target_mc:MovieClip):Void {
			//////////////////////////////////////////L'aide consigne ne doit pas dépasser 621x350 ////////////////////////////////////////////////////////////////
			//target_mc._width=621;
			//target_mc._height = 350;
			target_mc._x=10;
			target_mc._y=90;
		}

		var mcLoader:MovieClipLoader = new MovieClipLoader();
		mcLoader.addListener(loadListener);

		//var mc:MovieClip = this.createEmptyMovieClip("mc", this.getNextHighestDepth());
		mcLoader.loadClip(liste[nb][8], "_level0.cible.aideConsignesMc");
		
		
		//_level0.cible.aideConsignesMc._x=20;
		//_level0.cible.aideConsignesMc._y=100;
		_level0.cible.aideConsignesMc._visible=true;
		_level0.clicACBtn=1;
		activerBouton(cadreMc.infoBtn);
		
	}else if(String(liste[nb][8])!="" && String(liste[nb][10])=="non"){
		//trace("On active le bouton AideConsignes sans charger l'AideConsignes");
		activerBouton(cadreMc.infoBtn);
		_level0.cible.aideConsignesMc._visible=false;
		
		//test 1er clic sur bouton aideConsignesBtn pour chrger l'AC s'il ne l'était pas au démarrage
		_level0.clicACBtn=0;
	}else{
		//trace("on ne charge pas AideGonsigne");
		desactiverBouton(cadreMc.infoBtn);
		_level0.cible.aideConsignesMc._visible=false;
		
	}
}


var nbFois:Number=0;

this.cadreMc.nbEssais.text = nbFois;

function release(btn) {
	//trace("btn.enabled" + btn)

	switch (btn) {
		case cadreMc.continuerBtn:
			btn.onRelease = function() {
				trace ("onRelease continuer")
				_level0.continuerPresse = true;
				_level0.suiteExercice = true;
				//trace("continuerBTn presse dans interfaceBoutonCadre: "+ _level0.suiteExercice);
				cacherBouton(cadreMc.continuerBtn);
				activerBouton(cadreMc.validerBtn);
				exeMc.actionDernierEssai();
			}
			break;
			case cadreMc.exeSuivantBtn:
			btn.onRelease = function() {
				//trace ("onRelease exSuivant")
				_level0.exSuivantPresse = true;
				trace("SUIVANT, interfaceBoutonCadre/////////////////String(liste[_level0.noModuleEnCours-1][5])" +String(liste[_level0.noModuleEnCours-1][5]) );
				if (String(liste[_level0.noModuleEnCours-1][5])!="") {
					getURL(liste[_level0.noModuleEnCours-1][5]);
				}else {
					cacherBouton(cadreMc.validerBtn);		
					cacherBouton(cadreMc.suiteBtn);
					montrerBouton(cadreMc.termineBtn);
					cacherBouton(cadreMc.exeSuivantBtn);
					cacherBouton(cadreMc.continuerBtn);
					desactiverBouton(cadreMc.validerBtn);		
					desactiverBouton(cadreMc.suiteBtn);
					desactiverBouton(cadreMc.termineBtn);
					desactiverBouton(cadreMc.exeSuivantBtn);
					desactiverBouton(cadreMc.continuerBtn);
					desactiverBouton(cadreMc.solutionBtn);
				}
				
				//clic sur bouton aideMemoireBtn pour le réinitialiser
				_level0.clicAMBtn=0;
				stop();
			}
			break;
			//Sera remplacé par un bouton fin
			case cadreMc.termineBtn:
			btn.onRelease = function() {
				trace ("onRelease termineBtn")
				tableauManipulations.push("fin");
				//getURL("http://blogs.rpn.ch/iclassemath");
				getURL("javascript:back()");
				stop();
			}
			break;
			case cadreMc.suiteBtn:
			btn.onRelease = function() {
				//trace ("onRelease suiteBtn")
				
				_level0.suitePresse = true;
				fondBulle.bulleVerteMc._visible = false;
				_level0.etatBulleRouge=false;
				fondBulle.bulleRougeMc._visible = false;
				_level0.etatBulleRougefalse;
				actionSuite();
				activerBouton(cadreMc.validerBtn);
				cacherBouton(cadreMc.suiteBtn);
				cacherBouton(cadreMc.termineBtn);
				//cacherBouton(cadreMc.solutionBtn);
				maj_noModules();
				
				if (String(liste[_level0.noModuleEnCours][13]) == "oui") {
					montrerBouton(cadreMc.solutionBtn);
					//activerBouton(cadreMc.solutionBtn);
					//trace("///////////////////////solution oui après///////////////////////////////////////////");
				}else {
					//trace("///////////////////////solution non après///////////////////////////////////////////");
					cacherBouton(cadreMc.solutionBtn);
				}
				desactiverBouton(cadreMc.solutionBtn);	
			}
			break;
			case cadreMc.finBtn:
				btn.onRelease = function() {
					trace ("////////////////////////////////////////////////////////////////////////onRelease FIN")
					getURL("javascript:back()");
					_level0.finPresse = true;
					_level0.suiteExercice = true;
					
				}
				break;
			case cadreMc.validerBtn:
				btn.onRelease = function() {
					_level0.validationPresse=true;
					nbFois++;
					
					//Fonction ajoutée le 10.09.2013 pour pouvoir déclencher des actions particulières dans l'exercice après 1, 2, 3 ou 4 essais
					switch(nbFois.toString())
					{
						case "1":
						exeMc.actionApres1Essai();// Fonction dans le swf intérieur
						break;
						case "2":
						exeMc.actionApres2Essais();// Fonction dans le swf intérieur
						break;
						case "3":
						exeMc.actionApres3Essais();// Fonction dans le swf intérieur
						break;
						case "4":
						exeMc.actionApres4Essais();// Fonction dans le swf intérieur
						break;
					}
					
					//trace("_level0.rep_juste depuis cadre " + _level0.rep_juste)
					trace("_level0.retour depuis cadre "+_level0.retour)
					//trace("On a pressé VALIDER, _level0.validation vaut:"+ _level0.validationPresse)
					cadreMc.nbEssais.text = nbFois;
					prepareBoutonSuite(nbFois);
					
					//Complète le tableau  contenant les manipulations
					_level0.tableauManipulations.push("essai "+nbFois);
					
					//réponse JUSTE
					if(_level0.rep_juste == true && _level0.finChrono==false)
					{
						trace("rep_juste == true");
						_level0.finChrono == true;
						_level0.tableauManipulations.push(true);
						
						// Action liée à la réussite
						nbFois=0;
						
						cacherBouton(cadreMc.validerBtn);		
						cacherBouton(cadreMc.suiteBtn);
						cacherBouton(cadreMc.termineBtn);
						cacherBouton(cadreMc.exeSuivantBtn);
						cacherBouton(cadreMc.continuerBtn);
						
						montrerBouton(boutonAmontrer);
						activerBouton(boutonAmontrer);
						
						exeMc.actionRepJusteExe();
						actionRepJuste();
					}
					
					//else if (nbFois==liste[_level0.noModuleEnCours][4]){
					else if (nbFois==liste[_level0.noModuleEnCours][4]){
						trace("rep_juste == false");
						trace("validationTRUE" + nbFois);
						_level0.finChrono == true;
						//trace("liste[_level0.noModuleEnCours][4]"+liste[_level0.noModuleEnCours][4]);
						
						_level0.tableauManipulations.push(false);
						
						nbFois=0;
						
						cacherBouton(cadreMc.validerBtn);		
						cacherBouton(cadreMc.suiteBtn);
						cacherBouton(cadreMc.termineBtn);
						cacherBouton(cadreMc.exeSuivantBtn);
						cacherBouton(cadreMc.continuerBtn);
						
						montrerBouton(boutonAmontrer);
						desactiverBouton(boutonAmontrer);
						
						cadreMc.solutionBtn.infoSol._visible = true;
						actionRepFausse(true);
					}else{
						trace("rep_juste == false");
						trace("validationFALSE"+nbFois);
						trace(liste[_level0.noModuleEnCours][4])
						_level0.finChrono == true;
						_level0.tableauManipulations.push(false);
						
						if (nbFois>=(liste[_level0.noModuleEnCours][4])-1)
						{
							activerBouton(cadreMc.solutionBtn);
							
						}

						desactiverBouton(cadreMc.validerBtn);
						actionRepFausse(false);

						
					}
				}
			break;
		case cadreMc.solutionBtn:
			/*btn.onRollOver = function() {
				cadreMc.solutionBtn.infoSol._visible = true;
			}
			btn.onRollOut = function() {
				cadreMc.solutionBtn.infoSol._visible = false;
			}*/
			btn.onRelease = function() {
				//trace ("onRelease solutionBtn")
				//trace("solution nbFois "+nbFois)
				//trace("_level0.retourSolution" + _level0.retourSolution)
				//trace("_level0.sol"+_level0.sol)
				//pour les versions moderne des swf
				_level0.sol = true;
				exeMc.actionSolution();
				exeMc.onEnterFrame = function() {
					if (_level0.actionSfini == false) {
						//trace("actionSfini!=true")
						desactiverBouton(cadreMc.solutionBtn);
						desactiverBouton(cadreMc.validerBtn);
						desactiverBouton(cadreMc.continuerBtn);
					}else {
						delete exeMc.onEnterFrame;
						trace("liste: " + liste);
						trace("ELSE: " + Number(liste[_level0.noModuleEnCours-1][4]));
						//activerBouton(cadreMc.solutionBtn);
						//activerBouton(cadreMc.validerBtn);
						if (Number(liste[_level0.noModuleEnCours-1][4]) == 1) {
							trace("");
							activerBouton(cadreMc.termineBtn);
						}else{
							activerBouton(cadreMc.continuerBtn);
						}
					}
				}
				//pour les versions anciennes
				
				fondBulle.bulleRougeMc._visible = false;
				_level0.etatBulleRouge = false;
				//trace("_level0.sol" + _level0.sol)
				//trace("_level0.suivant"+_level0.suivant)
				if(nbFois==0)
				{
					fondBulle.bulleRougeMc._visible = false;
					//trace("nbFois" + nbFois)
					//trace("boutonAmontrer"+boutonAmontrer)
					activerBouton(boutonAmontrer);
				}else if (_level0.sol==true && _level0.suivant=="non")
				{
					trace("on est dans sol true et suivant non/////////////////////////////////")
					fondBulle.bulleRougeMc._visible = false;
					activerBouton(cadreMc.continuerBtn);
				}else if (_level0.sol == true) {
					//trace("on est dans sol true/////////////////////////////////")
					fondBulle.bulleRougeMc._visible = false;
					activerBouton(boutonAmontrer);
				}else
				{
					//trace("on est dans else/////////////////////////////////")
					fondBulle.bulleRougeMc._visible = true;
					activerBouton(cadreMc.validerBtn);
				}
				
				
				_level0.solPresse = true;
				_level0.repJuste = false;
				
				
				//prepareBoutonSuite(nbFois);
				//Action liée à l'Affichage de la solution
				if (_level0.suivant == "non")
				{
					//trace("dans _level0.suivant == \"non\"")
					fondBulle.bulleRougeMc.texte.text = _level0.retourSolution;
					cacherBouton(cadreMc.validerBtn);		
					cacherBouton(cadreMc.suiteBtn);
					cacherBouton(cadreMc.termineBtn);
					cacherBouton(cadreMc.exeSuivantBtn);
					
					montrerBouton(cadreMc.continuerBtn);
					if ( _level0.sol == false) {
						desactiverBouton(cadreMc.continuerBtn);
					}
					
				}else {
					//trace("dans _level0.suivant == else")
					fondBulle.bulleRougeMc.texte.text = _level0.retourSolution+"\nTu as atteint le nombre maximal d'essais.";
					nbFois=0;
					
					cacherBouton(cadreMc.validerBtn);		
					cacherBouton(cadreMc.suiteBtn);
					cacherBouton(cadreMc.termineBtn);
					cacherBouton(cadreMc.exeSuivantBtn);
					cacherBouton(cadreMc.continuerBtn);
						
					montrerBouton(boutonAmontrer);
					//desactiverBouton(boutonAmontrer);
					desactiverBouton(cadreMc.solutionBtn);
				}
				
				//fondBulle.bulleRougeMc._visible = true;
				_level0.etatBulleRouge=true;
				_level0.cible.aideConsignesMc._visible=false;
				_level0.cible.exeMc._visible=true;
				_level0.cible.aideMemoireMc._visible=false;
				desactiverBouton(cadreMc.solutionBtn);
			}
			break;
			case cadreMc.aideMemoireBtn:
			btn.onRelease = function() {
				//trace ("onRelease aideMemoire")
				_level0.aideMemoirePresse = true;
				
				if(_level0.clicAMBtn==0){
					//loadMovie(liste[_level0.noModuleEnCours][7], "_level0.cible.aideMemoireMc");
					
					var loadListener:Object = new Object();

					loadListener.onLoadInit = function(target_mc:MovieClip):Void {
						//////////////////////////////////////////L'aide-mémoire ne doit pas dépasser 621x350////////////////////////////////////////////////////////////////
						target_mc._width=621;
						target_mc._height = 350;
						target_mc._x=10;
						target_mc._y=90;
					}

					var mcLoader:MovieClipLoader = new MovieClipLoader();
					mcLoader.addListener(loadListener);

					//var mc:MovieClip = this.createEmptyMovieClip("mc", this.getNextHighestDepth());
					mcLoader.loadClip(liste[_level0.noModuleEnCours][7], _level0.cible.aideMemoireMc);
					
					//_level0.cible.aideMemoireMc._x=10;
					//_level0.cible.aideMemoireMc._y=90;
					//_level0.cible.aideMemoireMc._xscale=96.7;
					//_level0.cible.aideMemoireMc._yscale=95;
					_level0.clicAMBtn=1;
				}
				
				switch (_level0.cible.aideMemoireMc._visible){
					case true:
					//trace("trueAM");

						_level0.cible.aideMemoireMc._visible=false;
					break;
					case false:
					//trace("falseAM");
						//_level0.cible.exeMc._visible=false;
						_level0.cible.aideMemoireMc._visible=true;
						desactiverBouton(cadreMc.solutionBtn);
						//desactiverBouton(cadreMc.validerBtn);
					break;
					
				}
			}
			break;
			case cadreMc.infoBtn:
			btn.onRelease = function() {
				//trace ("onRelease infoBtn")
				_level0.infoPresse = true;
				
				if(_level0.clicACBtn==0){
				//loadMovie(liste[_level0.noModuleEnCours][8], "_level0.cible.aideConsignesMc");
				
				var loadListener:Object = new Object();

				loadListener.onLoadInit = function(target_mc:MovieClip):Void {
					//////////////////////////////////////////L'aide consigne ne doit pas dépasser 621x350////////////////////////////////////////////////////////////////
					target_mc._width=621;
					target_mc._height = 350;
					target_mc._x=10;
					target_mc._y=90;
				}

				var mcLoader:MovieClipLoader = new MovieClipLoader();
				mcLoader.addListener(loadListener);

				//var mc:MovieClip = this.createEmptyMovieClip("mc", this.getNextHighestDepth());
				mcLoader.loadClip(liste[_level0.noModuleEnCours][8], _level0.cible.aideConsignesMc);
				
				_level0.clicACBtn=1;
	}

				switch (_level0.cible.aideConsignesMc._visible){
					case true:
						_level0.cible.aideConsignesMc._visible=false;
						
					break;
					case false:
						_level0.cible.aideConsignesMc._visible=true;
						
					break;
				}
			}
			break;
			default:
			//trace("pas de bouton");
	}
	
}

importerBoutons();
//chargeAideMemoire(_level0.noModuleEnCours);
//chargeAideConsignes(_level0.noModuleEnCours);
release(cadreMc.continuerBtn);
release(cadreMc.exeSuivantBtn);
release(cadreMc.termineBtn);
release(cadreMc.suiteBtn);
release(cadreMc.validerBtn);
release(cadreMc.solutionBtn);
release(cadreMc.aideMemoireBtn);
release(cadreMc.infoBtn);

//importerNomEleve();

stop();