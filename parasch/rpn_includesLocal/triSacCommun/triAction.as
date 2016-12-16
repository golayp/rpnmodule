/*
 * @author Jean-Michel Luthi
*/
		

//Action suivant le type d'unité

var changementNiveauAFaire:Boolean = true;
var noClipSurvole:Number = 0;
function actionRepJusteExe() {
	trace("///////////////////////////////////////////////////////RETOUR" + _level0.retour);
	_level0.retour = _level0.retour;
}
function action() {
	trace("action")
	//On crée une variable pour voir si on change de clip
	var clipAyantEtePresse:Number=-1;
	//On regarde en permanence ce qu'on fait ave les clips
	fondMc.clipOEF.onEnterFrame = function()
	{

		numero = elementsTires[clipActif()];
		trace("numero"+numero)
		trace ("clipAyantEtePresse"+clipAyantEtePresse)
		//On regarde en permanence combien il y a de clip dans chaque sac
		nbElementsSac = nbDansSac(nbCategories);
		if (monUnite[numero].corrige == true) {
			fondRS._visible = false;
			fondRON._visible = false;
			fondRF._visible = false;
		}
		//Si on a cliqué sur un clip mal trié et Qu'il na pas encore été corrigé
		if (monUnite[numero].monErreur == true ){//&& monUnite[numero].corrige == false) {
			delete fondMc.clipOEF.onEnterFrame;
			delete fondMc.clipTimer.onEnterFrame;
			var categSac:String = monUnite[numero].categorieSac;
			var monClipActif:Number = clipActif();

			trace("monClipActif"+ monClipActif)
			if (monClipActif!=-1){
				delete fondMc.clipTimer.onEnterFrame;
				
				//On trouve le numéro du clip cliqué
				numero = elementsTires[monClipActif];
				trace("ACTIONifif")
				//trace("nbDansSac(nbCategories avant)" + nbDansSac(nbCategories))
				//trace("monUnite[numero].monErreur"+monUnite[numero].monErreur)
				//trace("monUnite[numero].categorieSac" + monUnite[numero].categorieSac)
				//trace("posClipDepX: "+posClipDepX)
				trace("")
				//trace("numero"+numero)
				//trace("monUnite[numero].nom]" + monUnite[numero].nom)

				//monUnite[numero].setPosition(monUnite[numero].posXdep, monUnite[numero].posYdep);
				//monUnite[numero].setPosition(posClipDepX, posClipDepY);
				monUnite[numero].setPosition(posClipDepX, posClipDepY);
				monUnite[numero].visibilite(true);
				monUnite[numero].setTaille(monUnite[numero].tailleDep);
				monUnite[numero].setAlpha(100);
				monUnite[numero].setCommentaireVisible(true);
				monUnite[numero].contenu=false;
				trace("clipSac avant: " + clipSac)
				
				//On rend invisible le clip suivant et on lui met la mention "pas trie" le clip erreur est rendu visible lorsqu'on clique dessus (ligne60)
				for (i = 0; i < tri.instances; i++)
				{
					trace("i: " + i)
					
					trace("cliSac[i]" + clipSac[i])
					trace("")
					if (clipSac[i] == "visible" && monUnite[numero].corrige == false) {
					
						trace("on est dans le tri avec visible")
						clipSac[i] = "pas trie";
						trace("clipSacapres avoir mis pas trie" + clipSac)
						//On  rend invisible le clip qui a été remplacé.
						monUnite[elementsTires[i]].visibilite(false);
						trace("i"+i)
						trace("elementsTires" + elementsTires)
						trace("elementsTires[i]" + elementsTires[i])
						trace("")
						//On rend visible celui qu'on a sorti et on lui met la catéégorie de sac "départ"
						clipSac[monUnite[numero].noOccurence] = "visible";
						monUnite[numero].categorieSac = "depart";
						posNumero--;
						break;
					//Si plus rien n'est visible
					}
				/*	else {
						trace("on est dans else ou rien n'est visible")
						//On teste si il y a un clip visible
						var clipsVisibles:Boolean = false;
						for (k = 0; k < tri.instances; k++) {
							if (clipSac[k] == "visible") {
								clipsVisibles = true;
							}
						}
						if (clipsVisibles == false) {
							posNumero--;
						}
						clipSac[monUnite[numero].noOccurence] = "visible";
						monUnite[numero].categorieSac = "depart";
						
					}
				*/
					//Si le bouton verifier est visible
					if (fondMc.verifier_btn._visible == true) {
						fondMc.verifier_btn._visible = false;
						posNumero--;
						clipSac[monUnite[numero].noOccurence] = "visible";
						monUnite[numero].categorieSac = "depart";
						break;
					}
					//trace("j'enlève 1 à posNumero")
					//posNumero--;
					//clipSac[monUnite[numero].noOccurence] = "visible";
					//monUnite[numero].categorieSac = "depart";
					//On teste si il y a un clip visible
					var clipsVisibles:Boolean = false;
					for (k = 0; k < tri.instances; k++) {
						if (clipSac[k] == "visible") {
							clipsVisibles = true;
						}
					}
					if (clipsVisibles == false) {
						posNumero--;
						clipSac[monUnite[numero].noOccurence] = "visible";
						monUnite[numero].categorieSac = "depart";
						break;
					}
					
				}
				trace("clipSac après"+clipSac)
				//trace("break du if")
				//On rend visible tous les clips du sac
				for (m = 0; m < tri.instances; m++) {
					if (monUnite[elementsTires[m]].categorieSac == categSac) {
						
						monUnite[elementsTires[m]].visibilite(true);
						monUnite[elementsTires[m]].contenu = true;
					}
				}
				
				nbElementsSac = nbDansSac(nbCategories);
				monUnite[numero].surSac = false;
				fondMc.info.text = "Nb de tris effectués: " + posNumero + "/" + nbClip;
			}
			//On teste la postion avec ue certaine tolérance +-10
			if ((monUnite[numero].posX >= posClipDepX - 10 || monUnite[numero].posX <= posClipDepX + 10) && (monUnite[numero].posY >= posClipDepY - 10 || monUnite[numero].posY <= posClipDepY + 10)) {
				monUnite[numero].monErreur = false;
				//monUnite[numero].corrige = true;
				//trace("Si on remet au départ, on annule monErreur")
				//trace("")
			}
			posClip = "vide";
			//delete fondMc.clipOEF.onEnterFrame;
		}else if (numero != clipAyantEtePresse && monUnite[numero].monErreur != true ) {
			
			//trace("else" +numero)
			//Si le clip est sur le sac mais qu'on n'a pas cliqué dessus (clip.monErreur==false)
			for (i = 0; i < nbCategories; i++) {
				//trace("i" + i)
				//trace("nbCategories"+nbCategories)
				if (monUnite[numero].posX > fondMc["sac" + _level0.listeCategorie[i]]._x - 0.5 * fondMc["sac" + _level0.listeCategorie[i]]._width
					&& monUnite[numero].posX < fondMc["sac" + _level0.listeCategorie[i]]._x + 0.5 * fondMc["sac" + _level0.listeCategorie[i]]._width
					&& monUnite[numero].posY > fondMc["sac" + _level0.listeCategorie[i]]._y - 0.5 * fondMc["sac" + _level0.listeCategorie[i]]._height
					&& monUnite[numero].posY < fondMc["sac" + _level0.listeCategorie[i]]._y + 0.5 * fondMc["sac" + _level0.listeCategorie[i]]._height)
				{
					clipAyantEtePresse = numero;
					//trace("else for if")
					sacActif = i;
					
					monUnite[numero].categorieSac = _level0.listeCategorie[i];
					monUnite[numero].visibilite(false);
					monUnite[numero].setTaille(tailleClipPetit);
					monUnite[numero].setAlpha(80);
					monUnite[numero].setCommentaireVisible(false);
					//monUnite[numero].corrige = false;
					nbElementsSac = nbDansSac(nbCategories);
					monUnite[numero].setPosition(fondMc["sac" + _level0.listeCategorie[i]]._x,fondMc["sac" + _level0.listeCategorie[i]]._y);
					//On met sur quel sac le clip se trouve
					clipSac[monUnite[numero].noOccurence] = _level0.listeCategorie[i];
					monUnite[numero].surSacTri = true;
					surSac = true;
					posClip = _level0.listeCategorie[i];
					//On fait le contenu pour afficher les boutons (dans triBouton)
					contenu(fondMc["sacPlein" + _level0.listeCategorie[i]].contenuOuiBtn, fondMc["sacPlein" + _level0.listeCategorie[i]].contenuNonBtn, fondMc["sac" + _level0.listeCategorie[i]].contenuOuiBtn, fondMc["sac" + _level0.listeCategorie[i]].contenuNonBtn);
					//On fait la fonction test qui se trouve dans le fichier triUniteAnalyse.as
					if (monUnite[numero].corrige == false) {
						//test();
						posNumero++;
					}
					test();
					verifier();
					fondMc.verifier_btn._visible = false;
					//On rend visible l'element suivant après un certain laps de temps (timer)
					
					fondMc.info.text = "Nb de tris effectués: " + posNumero + "/" + nbClip;
					nbElementsSac = nbDansSac(nbCategories);
					var monTimer:timer = new timer(300);
					var temps:Boolean = false;
					var timerActif:Boolean = true;
					for (p = 0; p < tri.instances; p++)
					{
						if (clipSac[monUnite[p].noOccurence] == "visible")
						{
							timerActif = false;
						}
					}
					if (timerActif==true){
					fondMc.clipTimer.onEnterFrame = function()
						{
							if (monTimer.fin() == false) {
								temps = false;
							}else {
								delete fondMc.clipTimer.onEnterFrame;
								temps = true;
							}

							if (temps == true) {
								//on affiche le suivant qui n'est pas trie
								for (j = 0; j < tri.instances; j++) {
									if (clipSac[j] == "pas trie"){
										monUnite[elementsTires[j]].visibilite(true);
										clipSac[j] = "visible";
										monUnite[elementsTires[j]].surSacTri = false;
										break;
									}
								}
								var reste:Boolean = false;
								
								for (j = 0; j < tri.instances; j++) {
									if (clipSac[j] == "pas trie") {
										reste = true;
									}
									
									if (monUnite[elementsTires[j]].corrige == true) {
										correctionsEnCours = true;
									}
									//trace("monUnite[elementsTires[j]].corrige"+monUnite[elementsTires[j]].corrige)
								}
								if (reste == false && correctionsEnCours == false) {
									trace("On va exécuter verifier()")
									verifier();
								}else if (reste == false && correctionsEnCours == true) {
									contenuSacVisibleCorrection()
									
									//trace("On va exécuter verifierCorrection() eet presse: "+monUnite[numero].presse)
									if (monUnite[numero].presse == false) {
										verifierCorrection();
										afficherSuite();
										correctionsEnCours = false;
										
									}else {
										fondRS._visible=false;
										fondRON._visible=false;
										fondRF._visible = false;
									}
								}
								break;
							}
						}
					}
					delete fondMc.clipOEF.onEnterFrame;
				}
			}
		}
	}
}
// Création d'un objet écouteur de souris.
var mouseListener:Object = new Object();

// Lorsque le curseur de la souris se déplace dans le fichier SWF,
//on teste si la souris repasse sur les clips de  départ.
mouseListener.onMouseMove = function() {
	clipSurvole();
	sortieClipSurvole(noClipSurvole);

	//comportement();
	//actionSac();
	//On teste la position de la Souris et si elle est sur le clip de départ on stoppe le onEnterframe
		//if (_xmouse > posClipDepX - 50 && _xmouse < posClipDepX + 50 && _ymouse > posClipDepY - 50 && _ymouse < posClipDepY + 50) {
			//trace("cible dep")
			//delete fondMc.clipOEF.onEnterFrame;
		//}
}
//var compteur:Number = 0;
mouseListener.onMouseUp = function() {
	//boutonSourisHaut = true;
	//compteur++;
	//trace("//////////////////////////////////////////////////////"+compteur+"///////////////////////////////////////////")
	//actionSac();
	//if (posClip != "vide") {
		//test();
	//}
	
	//verifier();
	
}
mouseListener.onMouseDown = function(){
	//boutonSourisHaut=false;
	//posClip = "vide";
	//trace("posClip:"+posClip);
	//trace("surSac: "+surSac);
	//if ((posClip == "vide" && surSac == false) || (posClip != "vide" && surSac == true) || (posClip == "vide" && surSac == true)) {
		//trace("action")
		action();
	//}
}

Mouse.addListener(mouseListener);




function radDegre(valeur):Number {
	return valeur * (360 / (2 * Math.PI));
}

function degreRad(valeur):Number {
	return valeur * ((2 * Math.PI)/360) ;
}

function clipActif():Number
{
	var monRetour:Number=-1;
	for (ca = 0; ca < tri.instances; ca++) {

		if (monUnite[elementsTires[ca]].presse == true) {
			trace(elementsTires[ca]+" a été pressé")
			monRetour = ca;
		}
	}
	return monRetour;
}

function clipSurvole():Void
{
	for (ca = 0; ca < tri.instances; ca++) {
		/*trace("changementNiveauAFaire devrait être true: "+changementNiveauAFaire)
		trace("monUnite[elementsTires[ca]].testRollOver devrait être true: "+monUnite[elementsTires[ca]].testRollOver)
		trace("monUnite[elementsTires[ca]].presse devrait être false: "+monUnite[elementsTires[ca]].presse)
		trace("monUnite[elementsTires[ca]].getVisibilite() devrait être true: "+monUnite[elementsTires[ca]].getVisibilite())
		trace("+")*/
		if (changementNiveauAFaire && monUnite[elementsTires[ca]].testRollOver == true && monUnite[elementsTires[ca]].presse == false){//  && monUnite[elementsTires[ca]].getVisibilite()&& monUnite[elementsTires[ca]].corrige==false) {
			
			noClipSurvole = ca;
			//trace("AVANT ******************* changementNiveauAFaire > "+changementNiveauAFaire)
			//trace(noClipSurvole+" : "+fondMc["conteneurUnite" +noClipSurvole].getDepth())
			//trace((nbClip)+" : "+fondMc["conteneurUnite" +(nbClip)].getDepth())
		
			fondMc["conteneurUnite" + noClipSurvole].swapDepths(fondMc["conteneurUnite" + (nbClip)]);
			
			//trace("APRES ******************* changementNiveauAFaire > "+changementNiveauAFaire)
			//trace(noClipSurvole+" : "+fondMc["conteneurUnite" +noClipSurvole].getDepth())
			//trace((nbClip)+" : "+fondMc["conteneurUnite" +(nbClip-1)].getDepth())
			
			fondMc["conteneurUnite" + noClipSurvole].niveau=fondMc["conteneurUnite" + noClipSurvole].getDepth();
			changementNiveauAFaire = false;
		}
	}
	
}

function sortieClipSurvole(num:Number):Void
{
	//trace("noClipSurvole : "+num)
	if (changementNiveauAFaire==false && monUnite[elementsTires[num]].testRollOver == false && monUnite[elementsTires[num]].presse == false){// && monUnite[elementsTires[num]].getVisibilite()) {
		//trace("******************* changementNiveauAFaire > "+changementNiveauAFaire)
		//trace(num+" : "+fondMc["conteneurUnite" +num].getDepth())
		//trace((nbClip)+" : "+fondMc["conteneurUnite" +(nbClip)].getDepth())
	
		fondMc["conteneurUnite" + num].swapDepths(fondMc["conteneurUnite" + (nbClip)]);
		changementNiveauAFaire = true;
	}
}


function nbDansSac(nbSac):Array
{
	var monRetour:Array = new Array();
	for (var z = 0; z < nbSac; z++ ) {
		monRetour[z]=0;
	}
	for (var z = 0; z < nbSac; z++ ) {
		for (var v = 0; v < elementsTires.length; v++ )
		{
			if (monUnite[elementsTires[v]].categorieSac == _level0.listeCategorie[z])
			{
				monRetour[z]++;
			}
		}
		
	}
	return monRetour;
}


function actionSolution ()
{
	trace("sacObjet actionSolution: " + sacObjet);
	actionSolutionEnCours = true;
	verifier();
	fondMc.verifier_btn._visible = false;
	fondRON._visible = false;
	rougeOuiNon._visible=false;
	oui._visible=false;
	non._visible = false;
	rougeOuiNonTxt.text = nbFautes + " Veux-tu voir nbClip? " + nbClip + " monArray.length " + sacObjet.length;
	trace(nbFautes + " Veux-tu voir nbClip? " + nbClip + " monArray.length " + sacObjet.length)
	
	delete fondMc.clipOEF.onEnterFrame;
	delete fondMc.clipTimer.onEnterFrame;

	

	switch (true)
	{
		case (nbFautes == 0 && posNumero == nbClip):
			trace("Bravo tout est juste.")
			vertTxt.text="Bravo tout est juste.";
			vert._visible = true;
			fondV._visible = true;
			finVert._visible = true;
			_level0.rep_juste = true;
			break;
		case (nbFautes == 0 && posNumero == 0):
			trace("Tu n'as encore rien fait")
			rougeFinTxt.text = "Tu n'as encore rien fait";
			fondRF._visible = true;
			rougeFin._visible=true;
			finRouge._visible = true;
			break;
		case(nbFautes == 0 && posNumero < nbClip):
			trace("Ce que tu as fait était juste. Mais tu n'as pas tout trié.")
			rougeFinTxt.text = "Ce que tu as fait était juste. Mais tu n'as pas tout trié.";
			fondRF._visible = true;
			rougeFin._visible=true;
			finRouge._visible = true;
			break;
		case(nbFautes != 0 && posNumero < nbClip):
			trace("Il y a des fautes et tu n'as pas tout trié.")
			rougeSuiteTxt.text = "Il y a des fautes et tu n'as pas tout trié.";
			for (i = 0; i < sacObjet.length; i++) {
				//trace(i)
				if(sacObjet[i][0]==false)
				{
					nbFautesRestantes=nbFautes;
					
					if (nbFautesRestantes == 1) {
						trace("actionSoultion Il y a UNE faute dans fautes pas tout trié" + retoursSol[0][0])
						//on rend tout invisible puis on affiche le clip faux
						for (var monClip:Number = 0; monClip < nbClip; monClip++) {
							monUnite[elementsTires[monClip]].visibilite(false);
							//trace("monUnite[monClip]"+monUnite[monClip])
							//trace("monClip"+monClip)
							//trace("monUnite[monClip].niveau"+monUnite[monClip].niveau)
							//trace("monUnite[elementsTires[monClip]].getVisibilite();"+monUnite[elementsTires[monClip]].getVisibilite());
						}
						rougeFinTxt.text = "Il y a une faute et tu n'as pas tout trié.\n" + retoursSol[0][0];
						monUnite[retours[0][2]].visibilite(true);
						trace(monUnite[retours[0][2]].getVisibilite());
						monUnite[retoursSol[0][2]].active(false);
						monUnite[retoursSol[0][2]].setPosition(posClipDepX, posClipDepY);
						monUnite[retoursSol[0][2]].setTaille(tailleClip);
						fondRF._visible = true;
						rougeFin._visible=true;
						finRouge._visible=true;
					}else {
						trace("actionSoultion Il y a DES fautes dans fautes pas tout trié" + retoursSol[0][1])
						for (var monClip:Number = 0; monClip < nbClip; monClip++) {
							//trace("monUnite[monClip]"+monUnite[monClip])
							monUnite[elementsTires[monClip]].visibilite(false);
							//trace("monClip"+monClip)
							//trace("monUnite[monClip].niveau"+monUnite[monClip].niveau)
							//trace("monUnite[elementsTires[monClip]].getVisibilite();"+monUnite[elementsTires[monClip]].getVisibilite());
						}
						rougeSuiteTxt.text = "Il y a des fautes et tu n'as pas tout trié.\n" + retoursSol[0][0];
						monUnite[retoursSol[0][2]].visibilite(true);
						trace("monUnite[elementeTires[retours[nbClip-1][2]]].getVisibilite()"+monUnite[retours[0][2]].getVisibilite());
						monUnite[retoursSol[0][2]].active(false);
						monUnite[retoursSol[0][2]].setPosition(posClipDepX, posClipDepY);
						monUnite[retoursSol[0][2]].setTaille(tailleClip);
						fondRS._visible = true;
						rougeSuite._visible=true;
						suite._visible=true;
						nbFautesRestantes--;
					}
				}
			}
			break;
		default:
			for (i = 0; i < sacObjet.length; i++) {
				trace(i)
				if(sacObjet[i][0]==false)
				{
					nbFautesRestantes=nbFautes;
					
					if (nbFautesRestantes == 1) {
						trace("actionSoultion Il y a UNE faute dans tout trié" + retoursSol[0][1])
						//on rend tout invisible puis on affiche le clip faux
						for (var monClip:Number = 0; monClip < nbClip; monClip++) {
							monUnite[elementsTires[monClip]].visibilite(false);
							trace("monUnite[elementsTires[monClip]].getVisibilite();"+monUnite[elementsTires[monClip]].getVisibilite());
						}
						rougeFinTxt.text = retoursSol[0][0];
						monUnite[retoursSol[0][2]].visibilite(true);
						monUnite[retoursSol[0][2]].active(false);
						monUnite[retoursSol[0][2]].setPosition(posClipDepX, posClipDepY);
						monUnite[retoursSol[0][2]].setTaille(tailleClip);
						fondRF._visible = true;
						rougeFin._visible=true;
						finRouge._visible=true;
					}else {
						trace("actionSoultion Il y a DES fautes dans tout trié" + retours[0][1])
						for (var monClip:Number = 0; monClip < nbClip; monClip++) {
							monUnite[elementsTires[monClip]].visibilite(false);
							trace("monUnite[elementsTires[monClip]].getVisibilite();"+monUnite[elementsTires[monClip]].getVisibilite());
						}
						rougeSuiteTxt.text = retoursSol[0][0];
						monUnite[retoursSol[0][2]].visibilite(true);
						monUnite[retoursSol[0][2]].active(false);
						monUnite[retoursSol[0][2]].setPosition(posClipDepX, posClipDepY);
						monUnite[retoursSol[0][2]].setTaille(tailleClip);
						fondRS._visible = true;
						rougeSuite._visible=true;
						suite._visible=true;
						nbFautesRestantes--;
					}
				}
			}
			break;
	}
	/*
	if (nbFautes==0 && sacObjet.length == nbClip){
		vertTxt.text="Bravo tout est juste.";
		vert._visible = true;
		fondV._visible = true;
		finVert._visible = true;
		
	}
	if (nbFautes == 0 && sacObjet.length == 0)
	{
		rougeFinTxt.text="Tu n'as encore rien fait";
		rougeFin._visible=true;
		finRouge._visible = true;
	}else if (nbFautes==0 && sacObjet.length != nbClip){
		rougeFinTxt.text="Ce que tu as fait était juste. Mais tu n'as pas tout trié.";
		rougeFin._visible=true;
		finRouge._visible = true;
		
	}*/
}

function contenuSacVisibleCorrection() {
	//On met les sacs ouverts, les clips visibles sans possibilité de les refermer pendant la correction
	for (c = 0; c < tri.instances; c++) {
		fondMc["sacPlein" + _level0.listeCategorie[c]].contenuOuiBtn._visible = false;
		fondMc["sacPlein" + _level0.listeCategorie[c]].contenuNonBtn._visible = false;
		fondMc["sac" + _level0.listeCategorie[c]].contenuOuiBtn._visible = false;
		fondMc["sac" + _level0.listeCategorie[c]].contenuNonBtn._visible = false;
		fondMc["sacPlein" + _level0.listeCategorie[c]]._visible = false;
		fondMc["sac" + _level0.listeCategorie[c]]._visible = true;
		for (m = 0; m < tri.instances; m++) {
			if (monUnite[elementsTires[m]].categorieSac == _level0.listeCategorie[c]) {
				monUnite[elementsTires[m]].visibilite(true);
				//monUnite[elementsTires[m]].contenu = true;
			}
		}
	}
}
