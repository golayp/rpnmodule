/*
 * @author Jean-Michel Luthi
*/


//On n'a plus besoin de cela puisque toutes les images sont des éléments de la bibliothèque, dessinée dasn Flash
//On doit faire ces redimensionnements après que les images soient chargées.
//On profite du chargement de l'aide consignes
aideConsignesMc._visible=false;
test_btn._visible=false;
test_btn.onRelease=function()
{
	for (i = 0; i <nbTot; i++)
	{
		//méthode qui affecte la taille de l'image à l'intérieur du conteneur(conteneur.image)
		monUnite[i].setTaille(50,50);
		//méthode qui affecte la position du conteneur
		monUnite[i].setPosition(i*620,i*120+50);
		
		//propriété qui donne un tableau contenant la taille de l'image (Largeur,Hauteur)
		trace("monUnite[i].getTaille"+monUnite[i].getTaille());
		//propriété qui donne la Largeur de l'image.
		trace("monUnite[i].imageL"+monUnite[i].imageL);
		//propriété qui donne la Hauteur de l'image.
		trace("monUnite[i].imageH"+monUnite[i].imageH);
		//propriété qui donne la position X du conteneur
		trace("monUnite[i].posX"+monUnite[i].posX);
		//propriété qui donne la position Y du conteneur
		trace("monUnite[i].posY"+monUnite[i].posY);
		//propriété qui donne la position conteneur
//		trace("monUnite[i].getPosition()"+monUnite[i].getPosition());
		//propriété qui donne l'état dragué ou non
		trace("monUnite[i].drag"+monUnite[i].drag);
		
	}
}



//On lit le fichier XML contenant les informations sur le clip unite. la fonction se trouve dans unitesLectureXML.as
lectureXML(donneeXML);

//Nombre de transformations d'unité à faire
//nbDeTransformationsAFaire = 3;

//On commence par créer les clips unité
//Rubriques necessaires pour class unite: taille, positionX, positionY, formatCommentaireTemp, formatNomTemp, clipConteneur, nomTemp, iconeTemp, logoTemp,categorieTemp,uSITemp, commentaireTemp
import unite;

//On initialise le compteur de clips unité du XML
nbTot = liste.length;
trace("liste.length"+liste.length);
//nombre maximum de fleches
nbMaxFleches=100;
//nombre maximum de carres 
nbMaxCarres=100;
//nombre maximum de cubes 
nbMaxCubes = 125;
//nombre maximum de cubes 
nbMaxMasses=10;

//On initialise la valeur à transformer. par la taille du clip//////////////////////////A DEVELOPPER///////////////////////////
longTransf=1;
aireTransf=1;
volTransf = 1;
masseTransf = 1;
//On initialise la taiile du clip unité QUI CORRESPOND à 1M OU 1 CM: Les autres unités seront proportionnelles.
tailleClipL=20;
tailleClipA=40;
//pour le cube, si la face est de 20, il est inscrit dans un rectanglede 30x25
//le proportions sont dans unite2. On adapt juste la longueur: 3/2
//tailleClipV correspond donc à la taille de la face
tailleClipV = 15;
tailleClipM = 40;

nbXMaxL = 30;
nbYMaxL = 0;
nbZMaxL = 0;

nbXMaxA = 25;
nbYMaxA = 0;
nbZMaxA = 4;

nbXMaxV = 6;
nbYMaxV = 5;
nbZMaxV = 4;


//On positionne la fleche(0;ychoisi, ici 260)
posDepFlecheXIni=5;
posDepFlecheYIni=300;
posDepFlecheX = posDepFlecheXIni;
posDepFlecheY = posDepFlecheYIni;

//On positionne le carré pour que le sommet avant inférieur gauche soit en (0;ychoisi, ici 260)
posDepCarreXIni = 5;
posDepCarreYIni = 330;
posDepCarreX = posDepCarreXIni;
posDepCarreY = posDepCarreYIni;

//On positionne le cube pour que le sommet avant inférieur gauche soit en (0;ychoisi, ici 260)
posDepCubeXIni=5;
posDepCubeYIni=330;
posDepCubeX = posDepCubeXIni;
posDepCubeY = posDepCubeYIni;

//On positionne la masse pour que le sommet avant inférieur gauche soit en (0;ychoisi, ici 260)
posDepMasseXIni=5;
posDepMasseYIni=330;
posDepMasseX = posDepCubeXIni;
posDepMasseY = posDepCubeYIni;

//On pourrait ici faire une séléction pour ne pas afficher tous les clips.
nbClip=nbTot;
trace("nbClip"+nbClip);

//Gestion des couches:
niveauUnite = -100; //Il y en a le nombre de clips, max 200
niveauBoutons = 4000; //Il y en a 3
niveauUniteChoisie = 100; //Il y en a le nombre de clips, max 200
niveauObjetsDivers = 50; //Il y en a 12
niveauConteneurPhotos = 300;// Il y en a 1
niveauFleches = 500;// Il y en a 50
niveauCarres = 600;// Il y en a 600
niveauCubes = -6000;// Il y en a 6000
niveauTextes = 2200;
niveauModifiables = 2000;
niveauBulles=4100;

//on crée un clip qui contiendra toutes les photos, sur lequelon peut mettre un masque
this.createEmptyMovieClip("conteneurPhotos", niveauConteneurPhotos);
//ATTENTION, LE CONTENEURPHOTOS DOIT ETRE CREE SUR LA SCENE
//On positionne masqueMc:
masqueMc._x=25;
masqueMc._y=-20;
conteneurPhotos.setMask(masqueMc);

//On fixe la taille du clip, la hauteur est en proportion, définit dans unite
tailleClip = 80;

//On fixe la position de clip au départ:
posClipDepX=0;
posClipDepY=masqueMc._y;

//on met les boutons gauche et droite sur la scène
fondMc.attachMovie("droite_btn","droiteBtn",niveauBoutons);
fondMc.droiteBtn._x=masqueMc._x + masqueMc._width;

fondMc.attachMovie("gauche_btn","gaucheBtn",niveauBoutons+1);
fondMc.gaucheBtn._x=masqueMc._x -fondMc.gaucheBtn._width ;
// on fait une copie de la liste originale qu'on va modifier
for (i = 0; i < liste.length; i++) {
	listeCopie[i] = liste[i];
}



trace("listeCopie.length avant" + listeCopie.length)
trace("liste.length avant" + liste.length)

function listeAleatoire(maListe):Array {
	var listeTemp:Array = new Array();
	var monCompteur:Number = 0;
	while (monCompteur <= 150 &&  maListe.length > 0) {
		var listeElement:Array = new Array();
		var monNbAleListe:Number = Math.floor(Math.random() * maListe.length);
		var nouvelleListeTemp:Array = new Array();

		for (i = 0; i < maListe[monNbAleListe].length; i++) {
			listeElement[i] = maListe[monNbAleListe].slice(i, i+1);
		}
		//trace("listeElement: "+listeElement)
		maListe.splice(monNbAleListe, 1);
		//listeElement = maListe.splice(monNbAleListe, 1);
		//trace("maliste.length" + maliste.length);
		//trace("listeElement: "+listeElement[0])
		listeTemp[monCompteur] = listeElement;
		//trace("listeTemp.length"+listeTemp.length)
		monCompteur++;
	}
	//trace("listeTemp[0]"+listeTemp[0][1])
	return listeTemp;
}
maListeAlea = listeAleatoire(listeCopie);

trace("maListeAlea.length: " + maListeAlea.length);
trace("liste aleatoire, nom: " + maListeAlea[0][0]) ;
trace("listeCopie.length après" + listeCopie.length)
trace("liste.length après"+liste.length)


//On crée les clips unite de tous le xml. On n'en séléctionne pas comme avant.
for (i = 0; i <nbClip; i++)
{
	//Tous les "maUnite" sont contenus dans un  clip  "conteneurUnite". C'est lui qu'on devra bouger. 
	//On a positionné les clips au centre de conteneur
	conteneurPhotos.createEmptyMovieClip("conteneurPhoto" + i, niveauUnite + i);
	//on crée les clip avec les unités
	monUnite[i] = new unite(tailleClip,0,0, texteCommentaire_fmt, texteNom_fmt, conteneurPhotos["conteneurPhoto" + i], maListeAlea[i][0], maListeAlea[i][1],maListeAlea[i][2],maListeAlea[i][3],maListeAlea[i][4],maListeAlea[i][5]);
	var taille:Array = monUnite[i].getTaille();
	//On reduis les clips d'un facteur de 50%
	monUnite[i].setTaille(taille[0]*0.8);
	monUnite[i].setPosition(posClipDepX+i*(tailleClip+5),-20+masqueMc._y+masqueMc._height*0.5);
}
//PAVE de test avec retour info
fondMc.createTextField("infoTxt", 10000, 400, 40, 180, 70)
fondMc.infoTxt.multiline = true;
fondMc.infoTxt.autoSize = true;
fondMc.infoTxt.wordWrap = true;
fondMc.infoTxt.setNewTextFormat(texteATT_fmt);
fondMc.infoTxt.selectable = false;
fondMc.infoTxt.text = "Retour d'une information dans paraschool:\nLongueur de la liste du XML: " + liste.length;
fondMc.infoTxt._visible = false;


//On crée des copies des clips unite sur le fond
for (i = 0; i <nbClip; i++)
{
	//Tous les "maUnite" sont contenus dans un  clip  "conteneurUnite". C'est lui qu'on devra bouger. 
	//On a positionné les clips au centre de conteneur
	fondMc.createEmptyMovieClip("conteneurPhoto" + i, niveauUniteChoisie + i);
	//on crée les clip avec les unités
	monUniteFond[i] = new unite(tailleClip,0,0, texteCommentaire_fmt, texteNom_fmt, fondMc["conteneurPhoto" + i], maListeAlea[i][0], maListeAlea[i][1],maListeAlea[i][2],maListeAlea[i][3],maListeAlea[i][4],maListeAlea[i][5], maListeAlea[i][6], maListeAlea[i][7], maListeAlea[i][8]);
	var taille:Array=monUniteFond[i].getTaille();

	//On augmente la taille des clips d'un facteur 2
	monUniteFond[i].setTaille(taille[0]*0.8);
	monUniteFond[i].setPosition(550,65);
	monUniteFond[i].visibilite(false);
}

//on met le comportement sur chaque clip créé
for (i = 0; i <nbClip; i++)
{
	comportementSurClip(conteneurPhotos["conteneurPhoto" + i],conteneurPhotos["conteneurPhoto" + (i-1)] ,conteneurPhotos["conteneurPhoto" + (i+1)] );
}

//On prend la taille du premier élément pour définir la hauteur des boutons
var taillePremierIni:Array=monUnite[0].getTaille();
//On ajuste la taille des boutons aux clips
fondMc.gaucheBtn._height=taillePremierIni[1]*1.2;
fondMc.gaucheBtn._y = masqueMc._y + (masqueMc._height - taillePremierIni[1]) * 0.4;
fondMc.droiteBtn._height=taillePremierIni[1]*1.2;
fondMc.droiteBtn._y=masqueMc._y+(masqueMc._height-taillePremierIni[1])*0.4;

//on note le numéro du clip//On donne la position de numero dans la liste
numero=elementsTires[0];
//On donne la position de numero dans la liste
posNumero=0;

//La hauteur de la scène est de 360px, On va placer les clips presque tout en bas et alignés sur le bas
//Le cube de base fait 30/25. Le volTransf agit sur le 30. on adapte donc le y
for (i = 0; i <= 1; i++)
{
	//On crée la fleche de longueur à transformer sur le fond à partir du niveau 2 de niveauObjetsDivers:
	fondMc.createEmptyMovieClip("conteneurTransformation" + i + 2, niveauObjetsDivers + i + 2);
	longueurBase[i] = new uniteBase(longTransf,5,posDepFlecheYIni+20, fondMc["conteneurTransformation"+i+2], false, "flecheLongueur");
	longueurBase[i].visibilite(false);

	//On crée le carre d'aire à transformer sur le fond à partir du niveau 4 de niveauObjetsDivers:
	fondMc.createEmptyMovieClip("conteneurTransformation" + i + 4, niveauObjetsDivers + i + 4);
	aireBase[i] = new uniteBase(aireTransf,350,posDepCarreYIni, fondMc["conteneurTransformation"+i+4], false, "rectangle");
	aireBase[i].visibilite(false);

	//On crée le cube de volume à transformer sur le fond à partir du niveau 6 de niveauObjetsDivers:
	fondMc.createEmptyMovieClip("conteneurTransformation" + i + 6, niveauObjetsDivers + i + 6);
	volumeBase[i] = new uniteBase(volTransf,350,posDepCubeYIni, fondMc["conteneurTransformation"+i+6], false, "paraRec");
	volumeBase[i].visibilite(false);

	//On crée la masse à transformer sur le fond à partir du niveau 8 de niveauObjetsDivers:

	fondMc.createEmptyMovieClip("conteneurTransformation" + i + 8, niveauObjetsDivers + i + 8);
	masseBase[i] = new uniteBase(masseTransf,350,posDepMasseYIni, fondMc["conteneurTransformation"+i+8], false, "masse");
	masseBase[i].visibilite(false);
}

//On cree les clips qui s'agrandiront  ou se rétrécirons en fonction des mouvements de la souris
//On crée un segment
fondMc.createEmptyMovieClip("conteneurModifiable" + 0, niveauModifiables);
longueurModif[0] = new uniteLongueur(tailleClipL, posDepFlecheXIni, posDepFlecheYIni+28, fondMc["conteneurModifiable" + 0], false, "segment");
longueurModif[0].visibilite(false);
//On cree un carre
fondMc.createEmptyMovieClip("conteneurModifiable" + 1, niveauModifiables + 1);
aireModif[0] = new uniteAire(tailleClipA, posDepCarreXIni, posDepCarreYIni, fondMc["conteneurModifiable" + 1], false, "rectangle");
aireModif[0].visibilite(false);
//On cree un parallélièipède rectangle
fondMc.createEmptyMovieClip("conteneurModifiable" + 2, niveauModifiables + 2);
volumeModif[0] = new uniteVolume(tailleClipV, posDepCubeXIni, posDepCubeYIni, fondMc["conteneurModifiable" + 2], false, "paraRec");
volumeModif[0].visibilite(false);
//On cree une masse
fondMc.createEmptyMovieClip("conteneurModifiable" + 3, niveauModifiables + 3);
masseModif[0] = new uniteMasse(tailleClipM, posDepMasseXIni, posDepMasseYIni, fondMc["conteneurModifiable" + 3], false, "masse");
masseModif[0].visibilite(false);

//On crée 4 zones pour le texte: Valeur à transformer et unité aléatoire + valeur trouvée à la souris  et unité choisie
fondMc.createTextField("valeurTrouvee", niveauTextes, 5, 330,120, 30);
fondMc.valeurTrouvee.setNewTextFormat(texteValUnite_fmt);
fondMc.valeurTrouvee.selectable = false;
fondMc.createTextField("uniteChoisie", niveauTextes + 1, 123, 330, 60, 30);
fondMc.uniteChoisie.setNewTextFormat(texteNomUnite_fmt);
fondMc.uniteChoisie.selectable = false;
fondMc.createTextField("uniteChoisieExposant", niveauTextes + 2, 183, 326, 20, 30);
fondMc.uniteChoisieExposant.setNewTextFormat(texteExposantUnite_fmt);
fondMc.uniteChoisieExposant.selectable = false;
fondMc.createTextField("valeurATransf", niveauTextes + 3, 300, 330, 100, 30);
fondMc.valeurATransf.setNewTextFormat(texteValUnite_fmt);
fondMc.valeurATransf.selectable = false;
fondMc.createTextField("uniteATransf", niveauTextes + 4, 405, 330, 50, 30);
fondMc.uniteATransf.setNewTextFormat(texteNomUnite_fmt);
fondMc.uniteATransf.selectable = false;
fondMc.createTextField("uniteATransfExposant", niveauTextes + 5, 455, 326, 10, 30);
fondMc.uniteATransfExposant.setNewTextFormat(texteExposantUnite_fmt);
fondMc.uniteATransfExposant.selectable = false;

fondMc.valeurATransf.text = "bonjour";
fondMc.uniteATransf.text = "bonjour";
fondMc.uniteATransfExposant.text = "bonjour";

fondMc.attachMovie("micro", "monMicroscope", niveauObjetsDivers + 11);
fondMc.attachMovie("loupe", "maLoupe", niveauObjetsDivers + 12);
fondMc.attachMovie("microD", "monMicroscopeD", niveauObjetsDivers + 13);
fondMc.attachMovie("loupeD", "maLoupeD", niveauObjetsDivers + 14);
fondMc.monMicroscope._xscale = 40;
fondMc.monMicroscope._yscale = 40;
fondMc.monMicroscope._visible = false;
fondMc.monMicroscopeD._xscale = 40;
fondMc.monMicroscopeD._yscale = 40;
fondMc.monMicroscopeD._visible = false;
fondMc.maLoupe._xscale = 40;
fondMc.maLoupe._yscale = 40;
fondMc.maLoupe._visible = false;
fondMc.maLoupeD._xscale = 40;
fondMc.maLoupeD._yscale = 40;
fondMc.maLoupeD._visible = false;

//on crée un chap texte qui indique les transformations restantes et à faire
fondMc.createTextField("info", niveauTextes + 6, 477, 3, 270, 30);
fondMc.info.setNewTextFormat(texteInfo_fmt);
fondMc.info.selectable = false;

rendreVisibleObjet();

_level0.rep_juste=false;