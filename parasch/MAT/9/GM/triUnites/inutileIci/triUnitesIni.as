/*
 * @author Jean-Michel Luthi
*/

masqueMc._visible=false;
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
import triUnite;

//On initialise le compteur de clips unité du XML
nbTot = _level0.liste.length;
trace("_level0.liste.length" + _level0.liste.length);



//On rempli le tableau _level0.listeIni avec un numéro de clip
for (i=0;i<nbTot;i++)
{
	_level0.listeIni[i]=i;
}

nbClip=20;
//On les tire aléatoirement dans la _level0.liste et on les mets dans un tableau
elementsTires=xElementsParmiNSansRepet(nbClip, _level0.listeIni)

//Fonction qui tire x elements dans un tableau de n éléments, sans répétitions n:Array
function xElementsParmiNSansRepet(nbX, n):Array
{
	var _level0.listeTire:Array=new Array();
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
niveauUniter=0; //Il y en a le nombre de clips
niveauSac=100; //il y en a 4
niveauObjetsDivers=200; //Il y en a 4
niveauConteneurPhotos=300;// Il y en a 1
niveauBulles=400;


//PAVE de test avec retour info
fondMc.createTextField("infoTxt", 10000, 10, 0, 100, 60)
fondMc.infoTxt.multiline = true;
fondMc.infoTxt.autoSize = true;
fondMc.infoTxt.wordWrap = true;
fondMc.infoTxt.setNewTextFormat(texteNom_fmt);
fondMc.infoTxt.selectable = false;
fondMc.infoTxt.text = "Retour d'une information dans paraschool:\nLongueur de la _level0.liste du XML: " + _level0.liste.length + " hauteur de champ de texte: \n" + fondMc.infoTxt._height + "\nlargeur de champ de texte: \n" + fondMc.infoTxt._width;
trace(" hauteur de champ de texte: \n" + fondMc.infoTxt._height);
fondMc.infoTxt._visible = false;

//On fixe la taille du clip, la hauteur est en proportion, définit dans unite
tailleClip= 49;

//On fixe la position de clip au départ:
posClipDepX=300;
posClipDepY=50;
 
for (i = 0; i <nbClip; i++)
{
	trace("clip"+i);
	var elementTire:Number=elementsTires[i]
	//Tous les "maCase" sont contenus dans un  clip  "conteneurUnite". C'est lui qu'on devra bouger.
		fondMc.createEmptyMovieClip("conteneurUnite" + i, niveauUnite + i);
		//on crée les clip avec les unités
		monUnite[elementTire] = new triUnite(tailleClip,i*tailleClip,0, texteCommentaire_fmt, texteCommentaireBold_fmt, texteNom_fmt, fondMc["conteneurUnite" + i], _level0.liste[elementTire][0], _level0.liste[elementTire][1],_level0.liste[elementTire][2],_level0.liste[elementTire][3],_level0.liste[elementTire][4],_level0.liste[elementTire][5],_level0.liste[elementTire][6]);
		monUnite[elementTire].setPosition(posClipDepX,posClipDepY);
		//on rend les clips invisibles et on en rendra seulement un certain nombre visible.
		monUnite[elementTire].visibilite(false);
}
//On rend Visible le premier
monUnite[elementsTires[0]].visibilite(true);

//on note le numéro du clip//On donne la position de numero dans la _level0.liste
numero=elementsTires[0];
//On donne la position de numero dans la _level0.liste
posNumero=0;



//On place les 4 sacs
fondMc.attachMovie("sac","sacLong",niveauSac + 1);
fondMc.sacLong.nomTxt.text="Longueur";
fondMc.sacLong._width=100;
fondMc.sacLong._height=100;
fondMc.sacLong._x=560;
fondMc.sacLong._y = 100;
fondMc.sacLong.annulerBtn._visible=false;

fondMc.attachMovie("sac","sacAire",niveauSac + 2);
fondMc.sacAire.nomTxt.text="Aire";
fondMc.sacAire._width=100;
fondMc.sacAire._height=100;
fondMc.sacAire._x=0;
fondMc.sacAire._y = 100;
fondMc.sacAire.annulerBtn._visible=false;

fondMc.attachMovie("sac","sacVol",niveauSac + 3);
fondMc.sacVol.nomTxt.text="Volume";
fondMc.sacVol._width=100;
fondMc.sacVol._height=100;
fondMc.sacVol._x=0;
fondMc.sacVol._y = 250;
fondMc.sacVol.annulerBtn._visible=false;

fondMc.attachMovie("sac","sacAutre",niveauSac + 4);
fondMc.sacAutre.nomTxt.multiline=true;
fondMc.sacAutre.nomTxt.wordWrap=true;
fondMc.sacAutre.nomTxt.text="Autres unités";
fondMc.sacAutre._width=100;
fondMc.sacAutre._height=100;
fondMc.sacAutre._x=560;
fondMc.sacAutre._y = 250;
fondMc.sacAutre.annulerBtn._visible=false;

//on place le clip vérifier
fondMc.attachMovie("btnVerifier","verifier_btn",niveauObjetsDivers + 2);
fondMc.verifier_btn._x=posClipDepX;
fondMc.verifier_btn._y=posClipDepY;
fondMc.verifier_btn._visible=false;
/*
//on place le clip de fin
fondMc.attachMovie("fin_btn","finBtn",niveauObjetsDivers + 1);
fondMc.finBtn._x=posClipDepX;
fondMc.finBtn._y=posClipDepY;
fondMc.finBtn._visible=false;*/


