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

//On commence par créer les clips unité
//Rubriques necessaires pour class unite: taille, positionX, positionY, formatCommentaireTemp, formatNomTemp, clipConteneur, nomTemp, iconeTemp, logoTemp,categorieTemp,uSITemp, commentaireTemp
import unite;

//On initialise le compteur de clips unité du XML
nbTot = liste.length;
//trace("liste.length"+liste.length);
//nombre maximum de fleches
nbMaxFleches=30;
//nombre maximum de carres 
nbMaxCarres=100;
//nombre maximum de cubes 
nbMaxCubes=120;

//On initialise la valeur à transformer. par la taille du clip//////////////////////////A DEVELOPPER///////////////////////////
longTransf=400;
aireTransf=150;
volTransf=250;
//On initialise la taiile du clip unité QUI CORRESPOND à 1M OU 1 CM: Les autres unités seront proportionnelles.
tailleClipL=20;
tailleClipA=10;
//pour le cube, si la face est de 20, il est inscrit dans un rectanglede 30x25
//le proportions sont dans unite2. On adapt juste la longueur: 3/2
//tailleClipV correspond donc à la taille de la face
tailleClipV = 15;

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
posDepFlecheXIni=0;
posDepFlecheYIni=260;
posDepFlecheX = posDepFlecheXIni;
posDepFlecheY = posDepFlecheYIni;

//On positionne le carré pour que le sommet avant inférieur gauche soit en (0;ychoisi, ici 260)
posDepCarreXIni = 0;
posDepCarreYIni = 260;
posDepCarreX = posDepCarreXIni;
posDepCarreY = posDepCarreYIni;

//On positionne le cube pour que le sommet avant inférieur gauche soit en (0;ychoisi, ici 260)
posDepCubeXIni=0;
posDepCubeYIni=260;
posDepCubeX = posDepCubeXIni;
posDepCubeY = posDepCubeYIni;

nbClip=nbTot;


//Gestion des couches:
niveauUniter=0; //Il y en a le nombre de clips
niveauBoutons=400;
niveauUniteChoisie=100; //il y en a 4
niveauObjetsDivers=200; //Il y en a 4
niveauConteneurPhotos=300;// Il y en a 1
niveauFleches=500;// Il y en a 50
niveauCarres=600;// Il y en a 600
niveauCubes = -6000;// Il y en a 6000
niveauTextes = 2000;

//on crée un clip qui contiendra toutes les photos, sur lequelon peut mettre un masque
//this.createEmptyMovieClip("conteneurPhotos", niveauConteneurPhotos);
//ATTENTION, LE CONTENEURPHOTOS DOIT ETRE CREE SUR LA SCENE
//On positionne masqueMc:
masqueMc._x=150;
masqueMc._y=0;
conteneurPhotos.setMask(masqueMc);

//On fixe la taille du clip, la hauteur est en proportion, définit dans unite
tailleClip= 49;

//On fixe la position de clip au départ:
posClipDepX=0;
posClipDepY=masqueMc._y;

//on met les boutons gauche et droite sur la scène
fondMc.attachMovie("droite_btn","droiteBtn",niveauBoutons);
fondMc.droiteBtn._x=masqueMc._x + masqueMc._width;
fondMc.droiteBtn._y=masqueMc._y;
fondMc.droiteBtn._height=masqueMc._height;
fondMc.attachMovie("gauche_btn","gaucheBtn",niveauBoutons+1);
fondMc.gaucheBtn._x=masqueMc._x -fondMc.gaucheBtn._width ;
fondMc.gaucheBtn._y=masqueMc._y;
fondMc.gaucheBtn._height=masqueMc._height;

//On crée les clips unite de tous le xml. On n'en séléctionne pas comme avant.
for (i = 0; i <nbClip; i++)
{
	//Tous les "maUnite" sont contenus dans un  clip  "conteneurUnite". C'est lui qu'on devra bouger. 
	//On a positionné les clips au centre de conteneur
	conteneurPhotos.createEmptyMovieClip("conteneurPhoto" + i, niveauUnite + i);
	//on crée les clip avec les unités
	monUnite[i] = new unite(tailleClip,0,0, texteCommentaire_fmt, texteNom_fmt, conteneurPhotos["conteneurPhoto" + i], liste[i][0], liste[i][1],liste[i][2],liste[i][3],liste[i][4],liste[i][5]);
	var taille:Array=monUnite[i].getTaille();

	//On reduis les clips d'un facteur de 50%
	monUnite[i].setTaille(taille[0]*0.5,taille[1]*0.5);
	monUnite[i].setPosition(posClipDepX+i*tailleClip,masqueMc._y+masqueMc._height*0.5);
}

//On crée des copies des clips unite sur le fond
for (i = 0; i <nbClip; i++)
{
	//Tous les "maUnite" sont contenus dans un  clip  "conteneurUnite". C'est lui qu'on devra bouger. 
	//On a positionné les clips au centre de conteneur
	fondMc.createEmptyMovieClip("conteneurPhoto" + i, niveauUniteChoisie + i);
	//on crée les clip avec les unités
	monUniteFond[i] = new unite(tailleClip,0,0, texteCommentaire_fmt, texteNom_fmt, fondMc["conteneurPhoto" + i], liste[i][0], liste[i][1],liste[i][2],liste[i][3],liste[i][4],liste[i][5]);
	var taille:Array=monUniteFond[i].getTaille();

	//On augmente la taille des clips d'un facteur 2
	monUniteFond[i].setTaille(taille[0]*1.5,taille[1]*1,5);
	monUniteFond[i].setPosition(550,masqueMc._y+masqueMc._height*0.5);
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
fondMc.gaucheBtn._height=taillePremierIni[1];
fondMc.gaucheBtn._y=masqueMc._y+(masqueMc._height-taillePremierIni[1])*0.5;
fondMc.droiteBtn._height=taillePremierIni[1];
fondMc.droiteBtn._y=masqueMc._y+(masqueMc._height-taillePremierIni[1])*0.5;

//on note le numéro du clip//On donne la position de numero dans la liste
numero=elementsTires[0];
//On donne la position de numero dans la liste
posNumero=0;

//La hauteur de la scène est de 360px, On va placer les clips presque tout en bas et alignés sur le bas
//Le cube de base fait 30/25. Le volTransf agit sur le 30. on adapte donc le y

//On crée la fleche de longueur à transformer sur le fond à partir du niveau 2 de niveauObjetsDivers:
fondMc.createEmptyMovieClip("conteneurTransformation" + 2, niveauObjetsDivers + 2);
longueurBase[0] = new unite2(longTransf,0,350, fondMc.conteneurTransformation2, false, "flecheLongueur");
longueurBase[0].visibilite(false);

//On crée le carre d'aire à transformer sur le fond à partir du niveau 3 de niveauObjetsDivers:
fondMc.createEmptyMovieClip("conteneurTransformation" + 3, niveauObjetsDivers + 3);
aireBase[0] = new unite2(aireTransf,400,350, fondMc.conteneurTransformation3, false, "carre");
aireBase[0].visibilite(false);

//On crée le cube de volume à transformer sur le fond à partir du niveau 4 de niveauObjetsDivers:
fondMc.createEmptyMovieClip("conteneurTransformation" + 4, niveauObjetsDivers + 4);
volumeBase[0] = new unite2(volTransf,400,350, fondMc.conteneurTransformation4, false, "cube");
volumeBase[0].visibilite(false);

var coordXL:Number=1;

//On met tous les clips de base sur la scène
for (i=0;i<nbMaxFleches;i++)
{
	coordXL = (i % nbXMaxL) + 1;
	positionX = posDepFlecheX + i * tailleClipL;
	positionY = posDepFlecheY;
	fondMc.createEmptyMovieClip("conteneurFleches" + i, niveauFleches + i);
	longueurC[i] = new unite2(tailleClipL,positionX,positionY, fondMc["conteneurFleches"+i], false, "flecheLongueur");
	longueurC[i].visibilite(false);
	longueurC[i].setCoordonnees(coordXL,0,0);
	comportement(fondMc["conteneurFleches" + i], nbMaxFleches, nbMaxCarres, nbMaxCubes);
}

var coordXA:Number=1;;
var coordZA:Number=1;
//On crée le carre d'aire à transformer sur le fond à partir du niveau 3 de niveauObjetsDivers:
for (i=0;i<nbMaxCarres;i++)
{
	//On calcule la positiondu clip pour qu'on obtienne le carré
	var positionX:Number;
	var positionY:Number;
	coordXA = (i % nbXMaxA) + 1;
	coordZA = 1 + (Math.floor(i / nbXMaxA) % nbZMaxA);
	
	positionX=posDepCarreX + tailleClipA*(i % nbXMaxA);
	positionY=posDepCarreY-(tailleClipA*Math.floor(i/nbXMaxA))%(nbZMaxA*tailleClipA);

	fondMc.createEmptyMovieClip("conteneurCarres" + i, niveauCarres + i);
	aireC[i] = new unite2(tailleClipA, positionX, positionY, fondMc["conteneurCarres" + i], false, "carre");
	aireC[i].visibilite(false);
	aireC[i].setCoordonnees(coordXA,0, coordZA);
	comportement(fondMc["conteneurCarres" + i], nbMaxFleches, nbMaxCarres, nbMaxCubes);
}
//On crée le cube de volume à transformer sur le fond à partir du niveau 4 de niveauObjetsDivers:
//On met le O derrière à droite
//Devant en bas à gauche c'est le nbMaxCubes-1

var ni:Number = niveauCubes;
//On va associer des coordonnées à chaque cube
//le (0;0;0) se situe devant en bas à gauche, oX horizontal vers la droite, oZ vertical contre le haut, oY en biais vers l'arrière
var coordX:Number=1;
var coordY:Number=0;
var coordZ:Number=1;
for (i=0;i<nbMaxCubes;i++)
{
	//On calcule la positiondu clip pour qu'on obtienne le cube
	var positionX:Number;
	var positionY:Number;

	//Pour le décalage d'une ligne
	if ((tailleClipV*Math.floor(i/nbXMaxV))%(nbZMaxV*tailleClipV)==0 && (tailleClipV*Math.floor(i/nbXMaxV))%(nbZMaxV*tailleClipV)!=k)
	{
		posDepCubeX += tailleClipV / 2;
		posDepCubeY -= tailleClipV / 4;
		coordY ++; 
	}
	positionX = posDepCubeX + tailleClipV*(i % nbXMaxV);
	coordX = (i % nbXMaxV)+1;
	positionY = posDepCubeY - (tailleClipV * Math.floor(i / nbXMaxV)) % (nbZMaxV * tailleClipV);
	k = tailleClipV *(Math.floor(i / nbXMaxV) % nbZMaxV);
	//k = (tailleClipV * Math.floor(i / nbXMaxV)) % (nbZMaxV * tailleClipV);
	coordZ = 1+ (Math.floor(i / nbXMaxV) % nbZMaxV);

	
	if(i%(nbZMaxV*nbXMaxV)==0)
	{
		ni-=nbZMaxV*nbXMaxV;
		niveauCubes=ni;
	}
	fondMc.createEmptyMovieClip("conteneurCubes" + i, ni+i%(nbZMaxV*nbXMaxV));
	if(i==0)
	{
		volumeC[i] = new unite2(tailleClipV * 3 / 2, positionX, positionY, fondMc["conteneurCubes" + i], false, "cube2");
	}else if(i==nbMaxCubes-1)
	{
		volumeC[i] = new unite2(tailleClipV * 3 / 2, positionX, positionY, fondMc["conteneurCubes" + i], false, "cube3");
	}else{
		volumeC[i] = new unite2(tailleClipV*3/2, positionX, positionY, fondMc["conteneurCubes" + i], false, "cube");
	}
	volumeC[i].visibilite(false);
	volumeC[i].setCoordonnees(coordX, coordY, coordZ);
	comportement(fondMc["conteneurCubes" + i], nbMaxFleches, nbMaxCarres, nbMaxCubes);
	
}


//On crée 4 zones pour le texte: Valeur à transformer et unité aléatoire + valeur trouvée à la souris  et unité choisie
fondMc.createTextField("valeurTrouvee", niveauTextes, 30, 150,70, 20);
fondMc.valeurTrouvee.setNewTextFormat(texteValUnite_fmt);
fondMc.createTextField("uniteChoisie", niveauTextes + 1, 105, 150, 20, 20);
fondMc.uniteChoisie.setNewTextFormat(texteNomUnite_fmt);
fondMc.createTextField("uniteChoisieExposant", niveauTextes + 2, 125, 145, 20, 20);
fondMc.uniteChoisieExposant.setNewTextFormat(texteExposantUnite_fmt);
fondMc.createTextField("valeurATransf", niveauTextes + 3, 330, 150, 70, 20);
fondMc.valeurATransf.setNewTextFormat(texteValUnite_fmt);
fondMc.createTextField("uniteATransf", niveauTextes + 4, 405, 150, 20, 20);
fondMc.uniteATransf.setNewTextFormat(texteNomUnite_fmt);
fondMc.createTextField("uniteATransfExposant", niveauTextes + 5, 425, 146, 10, 20);
fondMc.uniteATransfExposant.setNewTextFormat(texteExposantUnite_fmt);

fondMc.valeurATransf.text = "bonjour";
fondMc.uniteATransf.text = "bonjour";
fondMc.uniteATransfExposant.text = "bonjour";

rendreVisibleObjet();