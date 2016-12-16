/*
 * @author Jean-Michel Luthi
*/




////////////////////////////////////////////////PAVE de test avec retour info Utilise pour passer des infos sur la longueur du XML avec paraschool
fondMc.createTextField("infoTxt", 10000, 10, 0, 100, 60)
fondMc.infoTxt.multiline = true;
fondMc.infoTxt.autoSize = true;
fondMc.infoTxt.wordWrap = true;
fondMc.infoTxt.setNewTextFormat(texteNom_fmt);
fondMc.infoTxt.selectable = false;
fondMc.infoTxt.text = "Retour d'une information dans paraschool:\nLongueur de la _level0.liste du XML: " + _level0.liste.length + " hauteur de champ de texte: \n" + fondMc.infoTxt._height + "\nlargeur de champ de texte: \n" + fondMc.infoTxt._width;
//trace(" hauteur de champ de texte: \n" + fondMc.infoTxt._height);
fondMc.infoTxt._visible = false;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



masqueMc._visible=false;
//On n'a plus besoin de cela puisque toutes les images sont des éléments de la bibliothèque, dessinée dasn Flash
//On doit faire ces redimensionnements après que les images soient chargées.
//On profite du chargement de l'aide consignes
aideConsignesMc._visible=false;
test_btn._visible=false;


//On lit le fichier XML contenant les informations sur le clip unite. la fonction se trouve dans unitesLectureXML.as
lectureXML(donneeXML);
//On commence par créer les clips unité
//Rubriques necessaires pour class unite: taille, positionX, positionY, formatCommentaireTemp, formatNomTemp, clipConteneur, nomTemp, iconeTemp, logoTemp,categorieTemp,uSITemp, commentaireTemp
import tri;

//On initialise le compteur de clips du XML
nbTot = _level0.liste.length;
//trace("_level0.liste.length" + _level0.liste.length);

//On fait une fonction qui mets toutes les catégories des clips dans un tableau
function mesCategories(){
	for (i=0;i<nbTot;i++)
	{
		var present:Boolean = false;
		if (i==0 && _level0.liste[0][4] != "") {
			//On met la première catégorie dans le tableau
			_level0.listeCategorie[0] = _level0.liste[0][4];
		}
		else {
			for (j = 0; j < _level0.listeCategorie.length;j++){
				if (_level0.liste[i][4] == _level0.listeCategorie[j]) {
					present = true;
				}
			}
			if (present == false) {
				_level0.listeCategorie[_level0.listeCategorie.length] = _level0.liste[i][4];
				nbCategories++;
				//trace("nbCategories" +nbCategories);
				//trace("_level0.liste[i][4]" +_level0.liste[i][4]);
				//trace("_level0.listeCategorie: " +_level0.listeCategorie);
				//trace("");
			}
		}	
	}
	
	
}
/*function mesCategories(){
	for (i=0;i<nbTot;i++)
	{
		if (i==0 && _level0.liste[0][4] != "") {
			//On met la première catégorie dans le tableau
			_level0.listeCategorie[nbCategories] = _level0.liste[i][4];
		}
		else if (_level0.liste[i][4] != _level0.listeCategorie[nbCategories]) {
			_level0.listeCategorie[nbCategories+1] = _level0.liste[i][4];
			nbCategories++;
		}	
	}
}*/
mesCategories();


//les espaces insécables sont mis avec un _
function analyseEspacesRetourLigne(maString):Array {
	var monArray:Array = new Array();
	var maNvelleString:String;
	var arrayTemp:Array = new Array();
	var maLongueur:Number = 0;
	arrayTemp = maString.split(" ");
	//trace("arrayTemp: "+arrayTemp)
	for(i = 0; i < arrayTemp.length; i++) {
		if (arrayTemp[i].length > maLongueur) {
			maLongueur = arrayTemp[i].length ;
		}
	}
	//On recrée la string avec des espaces au lieu des _
	maNvelleString = espacesInsecables(arrayTemp[0]);
	for (i = 1; i < arrayTemp.length; i++) {
		maNvelleString = maNvelleString + "\n" + espacesInsecables(arrayTemp[i]);
		//trace("i: "+i)
	}
	//On remplace les _ par un espace.
	monArray[0] = maNvelleString;
	//trace("nvelleString: "+monArray[0])
	monArray[1] = maLongueur;
	return monArray;
}
function espacesInsecables(maString:String):String
{
	var chaineCoupee:Array = new Array();
	var chaineFinie:String;
	chaineCoupee = maString.split("_");
	chaineFinie = chaineCoupee[0];
	for (k = 1; k < chaineCoupee.length; k++ )
	{
		chaineFinie=chaineFinie+" "+chaineCoupee[k]
	}
	return chaineFinie;
}
//On met les tableaux avec la longueur et la nvellePhrase dans un nouveau tableau.
for (j = 0; j < _level0.listeCategorie.length; j++) {
	//trace(i);
	//trace("_level0.listeCategorie[j]" + _level0.listeCategorie[j]);
	categorieLong[j] = analyseEspacesRetourLigne(_level0.listeCategorie[j]);
	//longueurDuPlusLong = 0;
	//trace("longueurDuPlusLong: " +longueurDuPlusLong );
	//trace("Number(categorieLong[j][1])" + Number(categorieLong[j][1]));
	if (Number(categorieLong[j][1]) > longueurDuPlusLong) {
		//trace("dans if");
		longueurDuPlusLong = Number(categorieLong[j][1]);
		//trace("longueurDuPlusLong: " +longueurDuPlusLong );
	}

}
ArrayTest = new Array();
//categorieLong[0] = analyseEspacesRetourLigne(_level0.listeCategorie[_level0.listeCategorie.length-3]);
//trace("analyseEspacesRetourLigne" + ArrayTest );
//categorieLong[1] = analyseEspacesRetourLigne(_level0.listeCategorie[_level0.listeCategorie.length-2]);
//trace("analyseEspacesRetourLigne" + ArrayTest );
//categorieLong[2] = analyseEspacesRetourLigne(_level0.listeCategorie[_level0.listeCategorie.length-1]);
//trace("analyseEspacesRetourLigne" + ArrayTest );
//trace("le plus long mot: " + longueurDuPlusLong);
//trace("categorieLong: " + categorieLong);
//trace("")
//trace("")
//On remets le nombre de catégories à jour car on a mis 0 pour le premier élément du tableau.
nbCategories = nbCategories + 1;
//trace("Nombre de catégories: " + nbCategories);
//trace("Les catégories: " + _level0.listeCategorie);
//On rempli le tableau _level0.listeIni avec un numéro de clip
for (i=0;i<nbTot;i++)
{
	_level0.listeIni[i]=i;
}
//On définit le nombre de clips que l'on veut tirer dans la _level0.liste est défini dans le .fla, ça ne peut pas être dans commun
//nbClip=3;


//On les tire aléatoirement dans la _level0.liste et on les mets dans un tableau
elementsTires = xElementsParmiNSansRepet(nbClip, _level0.listeIni)
trace("elementsTires: " + elementsTires)

 //trace("elementsTires.length: " + elementsTires.length)
 //trace("elementsTires: " + elementsTires)

//Fonction qui tire x elements dans un tableau de n éléments, sans répétitions n:Array
function xElementsParmiNSansRepet(nbX, n):Array
{
	_level0.listeTire=new Array();
	for (i=0;i<nbX;i++)
	{
		
		var tabDebut:Array=new Array();
		var tabFin:Array=new Array();
		var posElement=Math.floor(Math.random()*(nbTot-i));
		//On met les élements tirés dans la _level0.liste
		_level0.listeTire[i]=n[posElement];
		//On enlève l'élément tiré de la _level0.liste
		tabDebut=n.slice(0,posElement);
		tabFin=n.slice(posElement+1);
		n=tabDebut.concat(tabFin);
	}
	return _level0.listeTire;
}

//Gestion des couches:
niveauUnite=12; //Il y en a le nombre de clips
niveauSac=-100; //il y en a jusqu^à 10
niveauObjetsDivers=200; //Il y en a 4
niveauConteneurPhotos=300;// Il y en a 1
niveauBulles=400;

//On fixe la taille du clip, la hauteur est en proportion, définit dans unite
tailleClip= 100;
tailleClipPetit = 40;
//On fixe la position de clip au départ:
posClipDepX = 330;
posClipDepY = 80;
//On cree un clip pour le timer
fondMc.createEmptyMovieClip("clipTimer", niveauObjetsDivers + 12);
//on cree un clip pour onEterFrame pour que ca ne soit pas le clip de base
fondMc.createEmptyMovieClip("clipOEF", niveauObjetsDivers + 13);
//On crée la fonction qui met le nombre de clips
fondMc.createEmptyMovieClip("clipOscillations", niveauObjetsDivers + 14);
//On crée la fonction qui met le nombre de clips
function creationClips(nb)
{
	for (i = 0; i <nb+1; i++)
	{
		//trace("clip"+i);
		var elementTire:Number=elementsTires[i]
		//Tous les "tri" sont contenus dans un  clip  "conteneurUnite". C'est lui qu'on devra bouger.
			fondMc.createEmptyMovieClip("conteneurUnite" + i, niveauUnite + i);
			//S'il n'y a pas de nom, on les fait plus grand
			if (_level0.liste[elementTire][6]=="vide") {
				tailleClip = 140;
				tailleClipPetit = 40;
			}
			//on crée les clip avec les unités
			monUnite[elementTire] = new tri(tailleClip, tailleClipPetit, i * tailleClip, 0, texteCommentaire_fmt, texteCommentaireBold_fmt,
			texteNom_fmt, fondMc["conteneurUnite" + i], _level0.liste[elementTire][0], _level0.liste[elementTire][1], _level0.liste[elementTire][2],
			_level0.liste[elementTire][3], _level0.liste[elementTire][4], _level0.liste[elementTire][5], _level0.liste[elementTire][6]);
			monUnite[elementTire].setTaille(tailleClip);
			monUnite[elementTire].setPosition(posClipDepX,posClipDepY);
			//on rend les clips invisibles et on en rendra seulement un certain nombre visible.
			monUnite[elementTire].visibilite(false);
			monUnite[elementTire].niveau = niveauUnite + i;
			monUnite[elementTire].elementTireNoMonUnite = elementTire;
			monUnite.testRollOver = false;
			if (i == nb) {
				monUnite[elementTire].active(false);
				fondMc["conteneurUnite" + i].enabled = false;
			}
			//trace("monUnite[elementTire].active"+monUnite[elementTire].enabled)
	}
}


creationClips(nbClip);

//On met dans le tableau la position des clips (pas encore triée
for (i = 0; i < tri.instances; i++ ) {
	clipSac[i] = "pas trie";
}

//On rend Visible le premier
monUnite[elementsTires[0]].visibilite(true);
clipSac[0] = "visible";

//on note le numéro du clip//On donne la position de numero dans la _level0.liste
numero = elementsTires[0];
//monUnite[numero].numeroElementTire = numero;
//On donne la position de numero dans la _level0.liste
posNumero=0;

//On fait une fonction qui crée, place sur un arc de cercle de 170° centré sur le clip (330;70) et de rayon 230 et met l'étiquette 
function creationSacs(maliste, nb, nbCaracteres, etiquette) {
	//trace("nbCaracteres" + nbCaracteres)

//dessus en fonction des catàgories.
//On part du principe qu'il n'y a pas plus de 5 catégories
	for (i = 0; i <= nb; i++) {
		fondMc.attachMovie("sac", "sac" + maliste[i], niveauSac + i);
		fondMc.attachMovie("sacPlein", "sacPlein" + maliste[i], niveauSac + i + 20);
		fondMc["sacPlein" + maliste[i]]._visible=false;
		fondMc["sac" + maliste[i]]._width=100;
		fondMc["sac" + maliste[i]]._height = 100;
		fondMc["sacPlein" +maliste[i]]._width=105;
		fondMc["sacPlein" + maliste[i]]._height = 105;
		cX = 330 + 255 * Math.cos(degreRad( 160 + i * (220 / (nb))));
		fondMc["sac" +maliste[i]]._x = cX; 
		fondMc["sacPlein" + maliste[i]]._x = cX;
		cY = 150 -ratio * ( 255 * Math.sin(degreRad( 160 + i * (220 / (nb)))));
		fondMc["sac" + maliste[i]]._y = cY;
		fondMc["sacPlein" + maliste[i]]._y = cY;
		fondMc["sac" + maliste[i]].annulerBtn._visible = false;
		fondMc["sac" + maliste[i]].contenuNonBtn._visible = false;
		fondMc["sac" + maliste[i]].contenuOuiBtn._visible = false;
		fondMc["sacPlein" + maliste[i]].annulerBtn._visible = false;
		fondMc["sacPlein" + maliste[i]].contenuNonBtn._visible = false;
		fondMc["sacPlein" + maliste[i]].contenuOuiBtn._visible = false;
		//On lui met un  champ text
		fondMc["sac" + maliste[i]].createTextField("nomTxt", 0, -70, -20, 140, 100);
		fondMc["sac" + maliste[i]].nomTxt.selectable = false;
		fondMc["sac" + maliste[i]].nomTxt.multiline = true;
		fondMc["sac" + maliste[i]].nomTxt.wordWrap = true;
		fondMc["sac" + maliste[i]].nomTxt.autoSize = true;
		fondMc["sacPlein" + maliste[i]].createTextField("nomTxt", 0, -70, -20, 140, 100);
		fondMc["sacPlein" + maliste[i]].nomTxt.selectable = false;
		fondMc["sacPlein" + maliste[i]].nomTxt.multiline = true;
		fondMc["sacPlein" + maliste[i]].nomTxt.wordWrap = true;
		fondMc["sacPlein" + maliste[i]].nomTxt.autoSize = true;
		//trace("fondMc[ + maliste[i]].nomTxt" + fondMc["sac" + _level0.liste[i]].nomTxt._width);
		//On se dit qu'il faut environ 5px par caractères en moyenne
		texteSac_fmt.size = 2 * fondMc["sac" + maliste[i]].nomTxt._width / (1.2*nbCaracteres);
		texteSac_fmt.leading = 0;
		fondMc["sac" + maliste[i]].nomTxt.setNewTextFormat(texteSac_fmt);
		fondMc["sac" + maliste[i]].nomTxt.text = etiquette[i][0];
		fondMc["sacPlein" + maliste[i]].nomTxt.setNewTextFormat(texteSac_fmt);
		fondMc["sacPlein" + maliste[i]].nomTxt.text = etiquette[i][0];
		trace("etiquette"+etiquette)
	}
}
//_level0.retour = "Tu n'as encore rien trié.";
_level0.rep_juste=false;
//trace ("categorieLong"+categorieLong)
creationSacs(_level0.listeCategorie, nbCategories - 1, longueurDuPlusLong, categorieLong); 

//on place le clip vérifier
fondMc.attachMovie("btnVerifier","verifier_btn",niveauObjetsDivers + 2);
fondMc.verifier_btn._x=posClipDepX;
fondMc.verifier_btn._y=posClipDepY;
fondMc.verifier_btn._visible = false;
//On place le bouton aideContenu
fondMc.attachMovie("Md_emploi","aideContenuBtn",niveauObjetsDivers + 3);
fondMc.aideContenuBtn._x=570;
fondMc.aideContenuBtn._y=30;
fondMc.aideContenuBtn._visible = false;
//on crée un chap texte qui indique les transformations restantes et à faire
fondMc.createTextField("info", niveauTextes + 6, 513, 3, 270, 30);
fondMc.info.setNewTextFormat(texteInfo_fmt);
fondMc.info.selectable = false;
fondMc.info.text = "Nb de tris effectués: " + posNumero + "/" + nbClip;

//on crée un chap texte qui donne des informations sur l'état des variables dans paraschool
//fondMc.createTextField("infoParaschool", niveauTextes + 10, 100, 10, 270, 100);
fondMc.infoParaschool.setNewTextFormat(texteInfo_fmt);
fondMc.infoParaschool.selectable = false;
fondMc.infoParaschool.text = "Infos iclasse\n";

_level0.rep_juste = false;
_level0.retour="Tu n'avais encore rien fait!"
solutionBtn._visible = false;