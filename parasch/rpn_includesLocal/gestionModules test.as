

//var _level0.liste:Array=new Array();
//_level0.nbModules;
//lectureXML(donneeXML);
//_level0.noModuleEnCours++;
_level0.noModuleEnCours++;
//On charge le cadre et les exercices en arrière plan

this.attachMovie("rectangleExe","exeMc",-1);
this.attachMovie("rectangleExe","aideMemoireMc",3);
this.attachMovie("rectangleExe","aideConsignesMc",2);
this.attachMovie("cadre","cadreMc",1);

//loadMovie(_level0.liste[1][3], "exeMc");
_level0.largeurClipDansInterface = _level0.liste[1][11];
_level0.hauteurClipDansInterface = _level0.liste[1][12];
var loadlistener:Object = new Object();
//Cette fonction n'est pas utile ici.Elle sert à envoyer des informations lorsque tout est chargé.
loadListener.onLoadComplete = function(target_mc:MovieClip, httpStatus:Number):Void {
    trace(">> loadlistener.onLoadComplete()gestionMOdules");
    trace(">> =============================");
    trace(">> target_mc._width: " + target_mc._width); // 0
    trace(">> httpStatus: " + httpStatus);
	
	
}

loadListener.onLoadInit = function(target_mc:MovieClip):Void {
	trace("")
    trace(">> loadlistener.onLoadInit()gestionMOdules");
    trace(">> =============================");
    trace(">> target_mc._width: " + target_mc._width); // 315
	//Si on a défini une valeur pour largeurClipDansInterface et hauteurClipDansInterface
	if (_level0.largeurClipDansInterface > 0 && _level0.hauteurClipDansInterface > 0) {
		target_mc._width=_level0.largeurClipDansInterface;
		target_mc._height=_level0.hauteurClipDansInterface;
	}else {
		target_mc._width=623;
		target_mc._height=333;
	}
	//Sinon
	
}

var mcLoader:MovieClipLoader = new MovieClipLoader();
mcLoader.addListener(loadListener);
trace("mcLoader gestionModules "+mcLoader)
//var mc:MovieClip = this.createEmptyMovieClip("mc", this.getNextHighestDepth());
mcLoader.loadClip("../importsLocal/conteneur.swf", exeMc);

trace("_level0.liste[1][3]dans interface"+_level0.liste[1][3])

exeMc._x=10;
exeMc._y=90;
//exeMc._xscale=97;
//exeMc._yscale = 96;

//Déclaration du NOM DE L'EXERCICE et de la donnée
this.cadreMc.nomSequence.text = maSequence;
this.cadreMc.nomExercice.text = monTitre;
this.cadreMc.nbValideMax.text = _level0.liste[_level0.noModuleEnCours][4];


this.cadreMc.donnee1Txt.text = _level0.liste[_level0.noModuleEnCours][1];
this.cadreMc.donnee2Txt.text = _level0.liste[_level0.noModuleEnCours][2];

trace("_level0.noModuleEnCours" + _level0.noModuleEnCours)
trace("_level0.liste[_level0.noModuleEnCours][1]" +_level0.liste[_level0.noModuleEnCours][1] )
//trace("" + )
//trace("" + )


//Déclaration du nombre de modules
//nb_modules = 3;

//Tableau Etat du module (non-fait, en-cours, validé, non-validé)
var etatModules:Array = new Array();


//Placement des no de modules et initialisation de l'état des modules
for(i=0;i<_level0.nbModules;i++)
{
	etatModules[i+1] = "non-fait";
	this.cadreMc.attachMovie("noModule","noMod"+i,i);
	this.cadreMc["noMod"+i]._x = 630+4-(_level0.nbModules-i)*22;
	this.cadreMc["noMod"+i]._y = 6;
	this.cadreMc["noMod"+i].createTextField("texteNoMod",10,0,0,18,18);
	this.cadreMc["noMod"+i].texteNoMod.background = true;
	this.cadreMc["noMod"+i].texteNoMod.setNewTextFormat(formatNoModule);
	this.cadreMc["noMod"+i].texteNoMod.backgroundColor=0x41487D;
	this.cadreMc["noMod"+i].texteNoMod.text = (i+1);
}
etatModules[1] = "en-cours";

maj_noModules = function()
{
	trace("MAJ modules")
	for(i=0;i<_level0.nbModules;i++)
	{
		trace("Nb de modules : "+this.cadreMc["noMod"+i].texteNoMod.text)
		switch (etatModules[i+1])
		{
			case "non-fait":
			this.cadreMc["noMod"+i].texteNoMod.backgroundColor=0x41487D;
			this.cadreMc["noMod"+i].texteNoMod.textColor=0xFFFFFF;
			break;
			
			case "en-cours":
			this.cadreMc["noMod"+i].texteNoMod.backgroundColor=0xFFFFFF;
			this.cadreMc["noMod"+i].texteNoMod.textColor=0x000066;
			break;
			
			case "validé":
			this.cadreMc["noMod"+i].texteNoMod.backgroundColor=0x66CC00;
			this.cadreMc["noMod"+i].texteNoMod.textColor=0xFFFFFF;
			break;
			
			case "non-validé":
			this.cadreMc["noMod"+i].texteNoMod.backgroundColor=0xFF3300;
			this.cadreMc["noMod"+i].texteNoMod.textColor=0xFFFFFF;
			break;
		}
	}
}
//c'est trop vit pour tracer une variable d'un swf chargé. Il faut lui laisser le temps de le faire!!
//trace("monNombre"+_level0.b);
//trace("retour"+_level0.retour);
maj_noModules();

stop();