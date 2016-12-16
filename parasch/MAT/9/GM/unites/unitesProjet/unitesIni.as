/*
 * @author Jean-Michel Luthi
*/
//On n'a plus besoin de cela puisque toutes les images sont des éléments de la bibliothèque, dessinée dasn Flash
//On doit faire ces redimensionnements après que les images soient chargées.
//On profite du chargement de l'aide consignes
aideConsignesMc._visible=false;

//aideConsignesMc.fermerBtn.onRelease=function()
//{
//	aideConsignesMc._visible=false;
//	for (i = 0; i <nbTot; i++)
//	{
//		//méthode qui affecte la taille de l'image à l'intérieur du conteneur(conteneur.image)
//		monUnite[i].setTaille(50,50);
//		//méthode qui affecte la position du conteneur
//		monUnite[i].setPosition(i*620,i*120+50);
//		
//		//propriété qui donne un tableau contenant la taille de l'image (Largeur,Hauteur)
//		trace("monUnite[i].getTaille"+monUnite[i].getTaille());
//		//propriété qui donne la Largeur de l'image.
//		trace("monUnite[i].imageL"+monUnite[i].imageL);
//		//propriété qui donne la Hauteur de l'image.
//		trace("monUnite[i].imageL"+monUnite[i].imageH);
//		//propriété qui donne la position X du conteneur
//		trace("monUnite[i].posX"+monUnite[i].posX);
//		//propriété qui donne la position Y du conteneur
//		trace("monUnite[i].posX"+monUnite[i].posY);
//	}
//}


//On lit le fichier XML contenant les informations sur le clip unite. la fonction se trouve dans unitesLectureXML.as
lectureXML(donneeXML);
//On commence par créer les clips unité
//Rubriques necessaires pour class unite: taille, positionX, positionY, formatCommentaireTemp, formatNomTemp, clipConteneur, nomTemp, iconeTemp, logoTemp,categorieTemp,uSITemp, commentaireTemp
import unite;

//On initialise le compteur de cases
var nbTot : Number = liste.length;
trace("liste.length"+liste.length);

//On fixe la taille du clip, la hauteur est en proportion, définit dans unite
var tailleClip:Number = 49;
//On crée un tableau qui contiendra les occurences des unités
var monUnite : Array = new Array();
//Les cases ont des niveaux à partir de 1 
for (i = 0; i <nbTot; i++)
{
	trace("clip"+i);
	//Tous les "maCase" sont contenus dans un  clip  "conteneurUnite". C'est lui qu'on devra bouger.
		fondMc.createEmptyMovieClip("conteneurUnite" + i, i);
		//on crée les clip avec les unités
		monUnite[i] = new unite(tailleClip,i*tailleClip,0, texteCommentaire_fmt, texteNom_fmt, fondMc["conteneurUnite" + i], liste[i][0], liste[i][1],liste[i][2],liste[i][3],liste[i][4],liste[i][5]);
		monUnite[i].setPosition(300,50);
}

//On place les 4 sacs
fondMc.attachMovie("sac","sacLong",201);
fondMc.sacLong.nomTxt.text="Longueur";
fondMc.sacLong._width=100;
fondMc.sacLong._height=100;
fondMc.sacLong._x=560;
fondMc.sacLong._y=100;

fondMc.attachMovie("sac","sacAire",202);
fondMc.sacAire.nomTxt.text="Aire";
fondMc.sacAire._width=100;
fondMc.sacAire._height=100;
fondMc.sacAire._x=0;
fondMc.sacAire._y=100;

fondMc.attachMovie("sac","sacVol",203);
fondMc.sacVol.nomTxt.text="Volume";
fondMc.sacVol._width=100;
fondMc.sacVol._height=100;
fondMc.sacVol._x=0;
fondMc.sacVol._y=250;

fondMc.attachMovie("sac","sacAutre",204);
fondMc.sacAutre.nomTxt.text="Autres unités";
fondMc.sacAutre._width=100;
fondMc.sacAutre._height=100;
fondMc.sacAutre._x=560;
fondMc.sacAutre._y=250;


