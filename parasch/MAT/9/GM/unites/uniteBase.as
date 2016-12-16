/**
 * ...
 * @author Jean-Michel Luthi
 */
 
import mx.data.encoders.Num;
import TextField;
import timer;
//import maSouris;


/*class contenant l'unité avec son icone (pour l'activité 1(, son logo(des lignes, des cases, "du gazon", un cube...),
son nom, sa catégorie(longueur, aire, volume, masse, temps...), son commentaire, sa conversion dans une unité de base SI.
*/

/*Ses méthodes seront: 
dessineLeClip. interne.
rollOver: comportement lorqu'on le survol, il faut que tout s'arrête pour forcer l'élève à lire le texte
clique: comportement lorsqu'on le clique
getTaille: retourne un tableau contenantla largeur et la hauteur
setTaille: réclame la largeur et la hauteur
setPosition: réclame x et y
visibilité: réclame false ou true

*/

//On crée la classe (le nom est celui du nom de fichier et aussi celui de la fonction principale)
class uniteBase extends MovieClip
{
//variables demandées lors de la création d'une occurence
public var posX:Number; //position X du clip unite
public var posY:Number; //position Y du clip unite
public var tailleX:Number; //tailleX du clip
public var tailleY:Number; //tailleY du clip
public var imageL:Number; //largeur de l'image
public var imageH:Number; //hauteur de l'image
public var possible:Boolean; //enabled de l'image
public var icone:String; //nom du fichier icone
public var coordonneeX:Number; //Coordonnées (x,y,z) des cubes. 
public var coordonneeY:Number;
public var coordonneeZ:Number;
public var categorie:String;
public var paraRecX:Number; //Dimensions (x,y,z) des parallélépipèdes. 
public var paraRecY:Number;
public var paraRecZ:Number;

//variables retournées
public var drag:Boolean=false; //indique si le clip est en train d'être dragué
public var rollUtilise:Boolean=false; //pas encore créé
public var var2:Number; //pas encore créé


//autres variables
public var conteneur:MovieClip; //clip contenant la case
private var proportionClip:Number;//donne la proportion entre la longueur et la largeur du clip
private var dragTemp:Boolean;//Pour récupérer l'état du grac dans les onPress-onRelease

static var ceClip:MovieClip;

	function uniteBase(tailleImageTemp, positionX, positionY,clipConteneur, utilisable, nomClipTemp)
	{
		tailleX=tailleImageTemp;
		posX = positionX;
		posY = positionY;
		conteneur=clipConteneur;
		possible=utilisable;
		icone = nomClipTemp;
		
		
		ceClip = this;
		//on lance la création du clip
		dessineLeClip();
		//comportement();
		
		
	}
	function dessineLeClip()
	{
		
		
		conteneur.drag=false;
		conteneur.rollUtilise = false;
		//On crée la zone image sur la base
		//sur un fond 
////////////////////////////ATTENTION ON NE PEUT PAS METTRE DE PNG DANS FLASH 6
		conteneur.createEmptyMovieClip("image", 0);
		switch (icone)
		{
			case "flecheLongueur":
				fleche(1, tailleX, 2, 0x111111, 0x777777, 100);
				categorie = "longueur";
				break;
			case "carre":
				carre(tailleX, 2, 0x111111, 0x777777, 100);
				categorie = "aire";
				break;
			case "cube":
				cube(tailleX, 2, 0x111111, 0x777777, 100);
				categorie = "volume";
				break;
			case "cube2":
				cube(tailleX, 2, 0x111111, 0x777777, 100);
				categorie = "volume";
				break;
			case "cube3":
				cube(tailleX, 2, 0x111111, 0x777777, 100);
				categorie = "volume";
				break;
			case "paraRec":
				//paraRec(tailleX, 1, tailleX, 2, 0x777777, 0xFFAACC, 100);
				paraRec(tailleX, 10, 10, 10, 2, 0x111111, 0x777777, 100);
				categorie = "volume";
				break;
			case "rectangle":
				rectangle(tailleX, 10, 10, 2, 0x111111, 0x777777, 100);
				categorie = "aire";
				break;	
			case "capacite":
				//paraRec(tailleX, 1, tailleX, 2, 0x777777, 0x4444CC, 100);
				paraRec(tailleX, 10, 10, 10, 2, 0x111111, 0x777777, 100);
				categorie = "volume";
				break;	
			case "masse":
				masse(tailleX, 10, 10, 2, 0x111111, 0x777777, 100);
				categorie = "masse";
				break;
			case "autre":
				conteneur.image.attachMovie(icone, icone + "Mc", 1);
				break;
		}
		proportionClip=conteneur.image[icone+"Mc"]._height/conteneur.image._width
		conteneur.image[icone+"Mc"]._width=tailleX;
		conteneur.image[icone+"Mc"]._height=tailleX*proportionClip;
		imageL=tailleX;
		imageH=tailleX*proportionClip;
		conteneur._x=posX;
		conteneur._y=posY;
		conteneur.image[icone+"Mc"].enabled=possible;
		
		////////////////On centre les images par rapport au clip
		//conteneur.image.flecheLongueurMc._x=-imageL/2;
		//conteneur.image.flecheLongueurMc._y=-imageH/2;
	}
	//Construction d'une fleche
	function fleche(longueur,nbFoisX, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		conteneur.image.createEmptyMovieClip(icone + "Mc", 1);
		conteneur.image[icone+"Mc"].lineStyle(epaisseurTrait, couleurTrait);		
		conteneur.image[icone+"Mc"].beginFill(couleurFond, transparence);
		conteneur.image[icone+"Mc"].lineTo(nbFoisX * longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(nbFoisX * longueur - 10, -5);
		conteneur.image[icone+"Mc"].lineTo(nbFoisX * longueur-10, 5);
		conteneur.image[icone+"Mc"].lineTo(nbFoisX * longueur,0 );
		conteneur.image[icone + "Mc"].endFill;	
		coordonneeX = nbFoisX;
		coordonneeY = 0;
		coordonneeZ = 0;
		tailleX = longueur;
	}
		function segment(longueur, nbFois, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		conteneur.image.createEmptyMovieClip(icone + "Mc", 1);
		conteneur.image[icone+"Mc"].lineStyle(epaisseurTrait, couleurTrait);		
		conteneur.image[icone + "Mc"].beginFill(couleurFond, transparence);
		conteneur.image[icone + "Mc"].lineTo(0, 5);
		conteneur.image[icone + "Mc"].lineTo(0, -5);
		conteneur.image[icone+"Mc"].lineTo(0, 0);
		conteneur.image[icone+"Mc"].lineTo(nbFois * longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(nbFois * longueur , -5);
		conteneur.image[icone+"Mc"].lineTo(nbFois * longueur, 5);
		conteneur.image[icone+"Mc"].lineTo(nbFois * longueur,0 );
		conteneur.image[icone + "Mc"].endFill;	
		coordonneeX = nbFois;
		coordonneeY = 0;
		coordonneeZ = 0;
		tailleX = longueur;
	}
	//Construction d'un carre
	function carre(longueur, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		conteneur.image.createEmptyMovieClip(icone + "Mc", 1);
		conteneur.image[icone+"Mc"].lineStyle(epaisseurTrait, couleurTrait);		
		conteneur.image[icone+"Mc"].beginFill(couleurFond, transparence);
		conteneur.image[icone+"Mc"].lineTo(longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(longueur ,-longueur );
		conteneur.image[icone+"Mc"].lineTo(0, -longueur );
		conteneur.image[icone+"Mc"].lineTo(0,0 );
		conteneur.image[icone + "Mc"].endFill;
	}
	//Construction d'un Rectangle
	function rectangle(longueur, nbFoisX, nbFoisY, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		conteneur.image.createEmptyMovieClip(icone + "Mc", 1);
		conteneur.image[icone+"Mc"].lineStyle(epaisseurTrait, couleurTrait);		
		conteneur.image[icone+"Mc"].beginFill(couleurFond, transparence);
		conteneur.image[icone+"Mc"].lineTo(nbFoisX * longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(nbFoisX * longueur ,-nbFoisY * longueur );
		conteneur.image[icone+"Mc"].lineTo(0, -nbFoisY * longueur );
		conteneur.image[icone+"Mc"].lineTo(0,0 );
		conteneur.image[icone + "Mc"].endFill;
		coordonneeX = nbFoisX;
		coordonneeY = nbFoisY;
		coordonneeZ = 0;
		tailleX = longueur;
	}
	/*function rectangle(longueur, largeur, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		conteneur.image.createEmptyMovieClip(icone + "Mc", 1);
		conteneur.image[icone+"Mc"].lineStyle(epaisseurTrait, couleurTrait);		
		conteneur.image[icone+"Mc"].beginFill(couleurFond, transparence);
		conteneur.image[icone+"Mc"].lineTo(longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(longueur ,-largeur );
		conteneur.image[icone+"Mc"].lineTo(0, -largeur );
		conteneur.image[icone+"Mc"].lineTo(0,0 );
		conteneur.image[icone + "Mc"].endFill;
	}*/
	//Construction d'un cube
	function cube(longueur, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		conteneur.image.createEmptyMovieClip(icone + "Mc", 1);
		conteneur.image[icone+"Mc"].lineStyle(epaisseurTrait, couleurTrait);		
		conteneur.image[icone+"Mc"].beginFill(couleurFond, 100);
		conteneur.image[icone+"Mc"].lineTo(longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(longueur ,-longueur );
		conteneur.image[icone+"Mc"].lineTo(0, -longueur );
		conteneur.image[icone + "Mc"].lineTo(0, 0 );
		conteneur.image[icone + "Mc"].endFill;
		conteneur.image[icone + "Mc"].moveTo(0, -longueur );
		conteneur.image[icone+"Mc"].beginFill(couleurFond, 100);
		conteneur.image[icone + "Mc"].lineTo(longueur / 2, -longueur - longueur / 4);
		conteneur.image[icone + "Mc"].lineTo(longueur *3/2, -longueur - longueur / 4);
		conteneur.image[icone + "Mc"].lineTo(longueur , - longueur);
		conteneur.image[icone + "Mc"].lineTo(0, - longueur);
		conteneur.image[icone + "Mc"].endFill;
		conteneur.image[icone + "Mc"].moveTo(longueur, -longueur );
		conteneur.image[icone+"Mc"].beginFill(couleurFond, 100);
		conteneur.image[icone + "Mc"].lineTo(longueur *3/2, -longueur - longueur / 4);
		conteneur.image[icone + "Mc"].lineTo(longueur *3/2,  - longueur / 4);
		conteneur.image[icone + "Mc"].lineTo(longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(longueur, -longueur);
		conteneur.image[icone + "Mc"].endFill;
	}
	
	//Construction d'un parallelépipède rectangle
	//Construction d'un parallelépipède rectangle  X: horizontal Y:profondeur Z:Hauteur
	function paraRec(longueur, nbFoisX, nbFoisY, nbFoisZ, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		conteneur.image.createEmptyMovieClip(icone + "Mc", 1);
		
		conteneur.image[icone + "Mc"].moveTo(0, 0);
		conteneur.image[icone + "Mc"].lineStyle(epaisseurTrait, couleurTrait);		
		conteneur.image[icone + "Mc"].beginFill(couleurFond, 100);
		conteneur.image[icone + "Mc"].lineTo(nbFoisX * longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(nbFoisX * longueur ,-nbFoisZ * longueur );
		conteneur.image[icone + "Mc"].lineTo(0, -nbFoisZ * longueur );
		conteneur.image[icone + "Mc"].lineTo(0, 0 );
		conteneur.image[icone + "Mc"].endFill;
		conteneur.image[icone + "Mc"].moveTo(0, -nbFoisZ * longueur );
		conteneur.image[icone + "Mc"].beginFill(couleurFond, 100);
		conteneur.image[icone + "Mc"].lineTo(nbFoisY * (longueur / 2), -nbFoisZ * longueur - nbFoisY * (longueur / 4));
		conteneur.image[icone + "Mc"].lineTo((2 * nbFoisX + nbFoisY) * (longueur/ 2), -nbFoisZ * longueur - nbFoisY * (longueur / 4));
		conteneur.image[icone + "Mc"].lineTo(nbFoisX * longueur , - nbFoisZ * longueur);
		conteneur.image[icone + "Mc"].lineTo(0, -nbFoisZ * longueur);
		conteneur.image[icone + "Mc"].endFill;
		conteneur.image[icone + "Mc"].moveTo(nbFoisX * longueur, -nbFoisZ * longueur );
		conteneur.image[icone + "Mc"].beginFill(couleurFond, 100);
		conteneur.image[icone + "Mc"].lineTo((2 * nbFoisX + nbFoisY) * (longueur/ 2), -nbFoisZ * longueur - nbFoisY * (longueur / 4));
		conteneur.image[icone + "Mc"].lineTo((2 * nbFoisX + nbFoisY) * (longueur/ 2),  - nbFoisY * (longueur / 4));
		conteneur.image[icone + "Mc"].lineTo(nbFoisX * longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(nbFoisX * longueur, -nbFoisZ * longueur);
		conteneur.image[icone + "Mc"].endFill;
		pointilles(conteneur.image[icone + "Mc"], epaisseurTrait, couleurTrait, 2, 6, 0, nbFoisY * (longueur / 2), 0, - nbFoisY * (longueur / 4));
		pointilles(conteneur.image[icone + "Mc"], epaisseurTrait, couleurTrait, 2, 6, nbFoisY * (longueur / 2), nbFoisY * (longueur / 2) + nbFoisX * longueur , - nbFoisY * (longueur / 4), - nbFoisY * (longueur / 4));
		pointilles(conteneur.image[icone + "Mc"], epaisseurTrait, couleurTrait, 2, 6, nbFoisY * (longueur / 2), nbFoisY * (longueur / 2), - nbFoisY * (longueur / 4), - nbFoisY * (longueur / 4)-nbFoisZ * longueur );
		coordonneeX = nbFoisX;
		coordonneeY = nbFoisY;
		coordonneeZ = nbFoisZ;
		paraRecX = nbFoisX;
		paraRecY = nbFoisY;
		paraRecZ = nbFoisZ;
		tailleX = longueur;
	}
/*	function paraRec(longueur, profondeur, hauteur, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		conteneur.image.createEmptyMovieClip(icone + "Mc", 1);
		conteneur.image[icone + "Mc"].lineStyle(epaisseurTrait, couleurTrait);		
		conteneur.image[icone + "Mc"].beginFill(couleurFond, 100);
		conteneur.image[icone + "Mc"].lineTo(longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(longueur ,-hauteur );
		conteneur.image[icone + "Mc"].lineTo(0, -hauteur );
		conteneur.image[icone + "Mc"].lineTo(0, 0 );
		conteneur.image[icone + "Mc"].endFill;
		conteneur.image[icone + "Mc"].moveTo(0, -hauteur );
		conteneur.image[icone + "Mc"].beginFill(couleurFond, 100);
		conteneur.image[icone + "Mc"].lineTo(profondeur * (longueur / 2), -longueur - profondeur * (longueur / 4));
		conteneur.image[icone + "Mc"].lineTo(profondeur * (longueur * 3 / 2), -longueur - profondeur * (longueur / 4));
		conteneur.image[icone + "Mc"].lineTo(longueur , - hauteur);
		conteneur.image[icone + "Mc"].lineTo(0, - longueur);
		conteneur.image[icone + "Mc"].endFill;
		conteneur.image[icone + "Mc"].moveTo(longueur, -hauteur );
		conteneur.image[icone + "Mc"].beginFill(couleurFond, 100);
		conteneur.image[icone + "Mc"].lineTo(profondeur * (longueur * 3 / 2), -longueur - profondeur * (longueur / 4));
		conteneur.image[icone + "Mc"].lineTo(profondeur * (longueur * 3 / 2),  - profondeur * (longueur / 4));
		conteneur.image[icone + "Mc"].lineTo(longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(longueur, -hauteur);
		conteneur.image[icone + "Mc"].endFill; 

		paraRecX = longueur;
		paraRecY = profondeur;
		paraRecZ = hauteur;
	}*/
		//Construction d'une masse
	/*function masse(longueur, largeur, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		trace("dans masse")
		conteneur.image.createEmptyMovieClip(icone + "Mc", 1);
		conteneur.image[icone+"Mc"].lineStyle(epaisseurTrait, couleurTrait);		
		conteneur.image[icone+"Mc"].beginFill(couleurFond, transparence);
		conteneur.image[icone+"Mc"].lineTo(longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(longueur ,-largeur );
		conteneur.image[icone+"Mc"].lineTo(0, -largeur );
		conteneur.image[icone+"Mc"].lineTo(0,0 );
		conteneur.image[icone + "Mc"].endFill;
		conteneur.image[icone+"Mc"].createEmptyMovieClip("circle2_mc", 1);
		drawCircle(conteneur.image[icone+"Mc"].circle2_mc, longueur/2, -(largeur+largeur/10), longueur/5, epaisseurTrait, couleurTrait, couleurFond, transparence);
	}*/
	function masse(longueur, nbFoisX, nbFoisY, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		conteneur.image.createEmptyMovieClip(icone + "Mc", 1);
		conteneur.image[icone+"Mc"].lineStyle(epaisseurTrait, couleurTrait);		
		conteneur.image[icone+"Mc"].beginFill(couleurFond, transparence);
		conteneur.image[icone+"Mc"].lineTo(nbFoisX * longueur, 0);
		conteneur.image[icone + "Mc"].lineTo(nbFoisX * longueur ,-nbFoisY * longueur );
		conteneur.image[icone+"Mc"].lineTo(0, -nbFoisY * longueur );
		conteneur.image[icone+"Mc"].lineTo(0,0 );
		conteneur.image[icone + "Mc"].endFill;
		conteneur.image[icone+"Mc"].createEmptyMovieClip("circle2_mc", 1);
		drawCircle(conteneur.image[icone+"Mc"].circle2_mc, nbFoisX * longueur/2, -(nbFoisY * longueur+nbFoisY * longueur/10), nbFoisX * longueur/5, epaisseurTrait, couleurTrait, couleurFond, transparence);
		coordonneeX = nbFoisX;
		coordonneeY = nbFoisY;
		coordonneeZ = 0;
		tailleX = longueur;
	}

	function drawCircle(mc:MovieClip, x:Number, y:Number, r:Number, eTrait, cTrait, cFond, transp):Void {
		//trace("dans cercle")
		mc.lineStyle(eTrait, cTrait);
		mc.moveTo(x + r, y);
		//mc.beginGradientFill("radial", [0xFF0000, 0x0000FF], [transp, transp], [0, 255]);
		mc.beginFill(cFond, transp);
		mc.curveTo(r+x, Math.tan(Math.PI/8)*r+y, Math.sin(Math.PI/4)*r+x, Math.sin(Math.PI/4)*r+y);
		mc.curveTo(Math.tan(Math.PI/8)*r+x, r+y, x, r+y);
		mc.curveTo(-Math.tan(Math.PI/8)*r+x, r+y, -Math.sin(Math.PI/4)*r+x, Math.sin(Math.PI/4)*r+y);
		mc.curveTo(-r+x, Math.tan(Math.PI/8)*r+y, -r+x, y);
		mc.curveTo(-r+x, -Math.tan(Math.PI/8)*r+y, -Math.sin(Math.PI/4)*r+x, -Math.sin(Math.PI/4)*r+y);
		mc.curveTo(-Math.tan(Math.PI/8)*r+x, -r+y, x, -r+y);
		mc.curveTo(Math.tan(Math.PI/8)*r+x, -r+y, Math.sin(Math.PI/4)*r+x, -Math.sin(Math.PI/4)*r+y);
		mc.curveTo(r + x, -Math.tan(Math.PI / 8) * r + y, r + x, y);
		mc.endFill;
	}

	//Gère La Taille de l'image à l'intérieur du clip conteneur avec le nom
	function setTaille(maTailleX,maTailleY)
	{
		//On redimensionne l'image
		conteneur.image._width=maTailleX;
		conteneur.image._height=maTailleY;

		imageL=conteneur.image._width;
		imageH=conteneur.image._height;
	}
	//Renvoie La Taille de l'image à l'intérieur du clip conteneur
	function getTaille()
	{
		var tailleImage:Array=new Array();
		tailleImage[0]=conteneur.image._width;
		tailleImage[1]=conteneur.image._height;
		return tailleImage;
	}
	//Renvoie La Taille de l'image à l'intérieur du clip conteneur
	function getTailleParaRec()
	{
		var tailleImage:Array=new Array();
		tailleImage[0] = paraRecX;
		tailleImage[1] = paraRecY;
		tailleImage[2] = paraRecZ;
		return tailleImage;
	}
	function setTailleFleche(maTaille, maLongueur)
	{
		fleche(maTaille, maLongueur, 2, 0x111111, 0x777777, 100);
	}
	function setTailleCarre(maTaille)
	{
		carre(maTaille, 2, 0x111111, 0x777777, 100);
	}
	function setTailleRectangle(maTaille, maLongueur, maLargeur)
	{
		rectangle(maTaille, maLongueur, maLargeur, 2, 0x111111, 0x777777, 100);
	}
	function setTailleCube(maTaille)
	{
		cube(maTaille, 2, 0x111111, 0x777777, 100);
	}
	function setTailleParaRec(maTaille,X,Y,Z)
	{
		paraRec(maTaille, X, Y, Z, 2, 0x111111, 0x777777, 100);
		//trace("paraRecX = X");
//		paraRecY = Y;
//		paraRecZ = Z;
	}
	function setTailleMasse(maTaille,maLargeur, maLongueur)
	{
		masse(maTaille, maLargeur, maLongueur, 2, 0x111111, 0x777777, 100);
	}
	//Gère la position du conteneur complet
	function setPosition(maPositionX,maPositionY)
	{
		conteneur._x=maPositionX;
		conteneur._y=maPositionY;
		posX=conteneur._x;
		posY=conteneur._y;
		
	}
	

	
	//On gère la visiblité
	function visibilite(etat)
	{
		if (etat==true){
			conteneur._visible=true;
		}else if(etat==false){
			conteneur._visible=false;
		}
	}
	function getVisibilite()
	{
		var etat:Boolean;
		etat = conteneur._visible;
		return etat;
	}
	
	function rendrePossible(valeurBoolean)
	{
		conteneur.image[icone+"Mc"].enabled=valeurBoolean;
		possible=valeurBoolean;
		//comportement();
	}
	
	function setCoordonnees(X, Y, Z)
	{
		coordonneeX = X;
		coordonneeY = Y;
		coordonneeZ = Z;
	}
	function getCoordonnees()
	{
		var monArray:Array = new Array();
		monArray[0] = coordonneeX;
		monArray[1] = coordonneeY;
		monArray[2] = coordonneeZ;
		return monArray;
	}
	
	function comportement()
	{
		
		// Création d'un objet écouteur de souris.
		var mouseListener:Object = new Object();
		//Comportement lors d'un rollOver
		conteneur.onRollOver=function()
		{
			
		}
		//Comportement lors d'un rollOut
		conteneur.onRollOut=function()
		{
			
		}
		
		//Comportement lorsqu'on clique dessus
		conteneur.onPress=function()
		{ 
			var o=this;
			trace("onPress");
			var xmouseOld:Number = o._xmouse;
			var ymouseOld:Number = o._ymouse;
			//Lorsque le curseur de la souris se déplace dans le fichier SWF, 
			//on teste si la souris repasse sur les clips unités invisibles.
			function pente(monXOld, monYOld, monX, monY):Array
			{
				//On va créer un vecteur déplacement de souris.
				//S'il est proche de l'horizontale, on rend visible en X
				//S'il est proche de la verticale, on rend visible en Z
				//S'il est proche de la diagonale, on rend visible en Y
				//On regarde la pente:
				var maPente:Number;
				var horizontal:Boolean;
				var diagonal:Boolean;
				var vertical:Boolean;
				var cadran:Number;
				var statique:Boolean;
				var vecteur:Array=new Array();
				//Si la souris se déplace verticalement, division par 0 donc on traite ce cas à part.
				if (monX - monXOld == 0)
				{
					horizontal = false;
					diagonal = false;
					vertical = true;
				}else{	
					maPente = (monYOld - monY) / (monX - monXOld);
					switch (true)
					{
						case (Math.abs(maPente) < 0.6):
							horizontal = true;
							diagonal = false;
							vertical = false;
							statique = false;
							break;
						case (Math.abs(maPente) > 0.6 && Math.abs(maPente) < 1.8):
							//On teste si le déplacement de la souris est direction cadran 1, 2, 3 ou 4
							switch (true)
							 {
								case ((monYOld - monY) > 0 && (monX - monXOld) > 0):
									cadran = 1;
									break;
								case ((monYOld - monY) < 0 && (monX - monXOld) > 0):
									cadran = 2;
									break;
								case ((monYOld - monY) < 0 && (monX - monXOld) < 0):
									cadran = 3;
									break;
								case ((monYOld - monY) > 0 && (monX - monXOld) < 0):
									cadran = 4;
									break;	
							 }
							
							horizontal = false;
							diagonal = true;
							vertical = false;
							statique = false;
							break;
						case (Math.abs(maPente) > 1.8):
							horizontal = false;
							diagonal = false;
							vertical = true;
							statique = false;
							break;
						case (monX == monXOld && monY == monYOld):
							horizontal = false;
							diagonal = false;
							vertical = false;
							statique = true;
							break;
						default:
							horizontal = true;
							diagonal = true;
							vertical = true;
							statique = true;
							break;
					}
				vecteur[0] = maPente;
				vecteur[1] = horizontal;
				vecteur[2] = diagonal;
				vecteur[3] = vertical;
				vecteur[4] = cadran;
				vecteur[5] = statique;
				return vecteur;
				}
			}
			function modifierTailleAvecSouris(mesValeurs, clip)
			{
				//trace("pente modif" +mesValeurs);
				switch (true)
				{
					case(mesValeurs[1] == true):
						trace("horizontal")
						clip.setTailleParaRec(o._xmouse, o.getTailleParaRec()[1],  o.getTailleParaRec()[2]);
						break;
					//On rend visible en Y
					case(mesValeurs[2] == true):
						trace("diagonal")
						clip.setTailleParaRec(o._xmouse, o.getTailleParaRec()[1],  o.getTailleParaRec()[2]);
						break;
					//On rend visible en Z
					case(mesValeurs[3] == true):
						trace("vertical")
						clip.setTailleParaRec( o.getTailleParaRec()[0], o.getTailleParaRec()[1],  o._ymouse);
						break;
					case(mesValeurs[5] == true):
						trace("statique")
						clip.setTailleParaRec(o.getTailleParaRec()[0], o.getTailleParaRec()[1],  o.getTailleParaRec()[2]);
						break;
				}
			}
			mouseListener.onMouseMove = function() {
				//trace("pente" +pente(xmouseOld, ymouseOld, _xmouse, _ymouse));
				modifierTailleAvecSouris(pente(xmouseOld, ymouseOld, _xmouse, _ymouse), ceClip)
				xmouseOld = o._xmouse;
				ymouseOld = o._ymouse;

			}
			Mouse.addListener(mouseListener);
			
		}
		conteneur.onRelease=function()
		{
			trace("onRelease");
			//pour annuler la fonction onMouseMove de onPress
			Mouse.removeListener(mouseListener);
			
		}
		conteneur.onReleaseOutside=function()
		{
			trace("onReleaseOutside");
			//trace("pente onR"+_parent.pente(0, 0, _xmouse, _ymouse));
			//pour annuler la fonction onMouseMove de onPress
			Mouse.removeListener(mouseListener);
		}
	
	}
	function choixUnite():Array 
	{
		var tableau1:Array = new Array(["mm", 0.001]);
		var tableau2:Array = new Array(["ml", 0.001]);
		var tableau3:Array = new Array(["mg", 0.000001]);
		var tableauRenvoye:Array = new Array();
		
		tableau1.push(["cm", 0.01]);
		tableau1.push(["dm", 0.1]);
		tableau1.push(["m", 1]);
		//tableau1.push(["dam", 10]);
		//tableau1.push(["hm", 100]);
		tableau1.push(["km", 1000]);
		
		tableau2.push(["cl", 0.01]);
		tableau2.push(["dl", 0.1]);
		tableau2.push(["l", 1]);
		tableau2.push(["hl", 100]);
		
		//tableau3.push(["cg", 0.01]);
		//tableau3.push(["dg", 0.1]);
		tableau3.push(["g", 0.001]);
		tableau3.push(["kg", 1]);
		tableau3.push(["t", 1000]);
		
		var alea:Number = Math.round(Math.random() * (tableau1.length - 1));
		var alea2:Number = Math.round(Math.random() * (tableau2.length - 1));
		var alea3:Number = Math.round(Math.random() * (tableau3.length - 1));
		var aleaV:Number = Math.round(Math.random());
		var aleaV:Number = 0;
		trace("valeur aléatoire: "+alea)
//		trace("tableau1: " + tableau1)
//		trace("tableau1.length: "+tableau1.length)
//		trace("tableau1[nb]: " + tableau1[Math.round(Math.random() * tableau1.length)][0])
//		trace("")
		var dimension:Number;
		switch (icone) {
			case "flecheLongueur":
				dimension = 1;
				
				tableauRenvoye[0] = tableau1[alea][0];
				tableauRenvoye[1] = tableau1[alea][1];
				tableauRenvoye[2] = dimension;
				break;
			case "carre":
				dimension = 2;
				tableauRenvoye[0] = tableau1[alea][0];
				tableauRenvoye[1] = tableau1[alea][1];
				tableauRenvoye[2] = dimension;
				break;
			case "cube":
				dimension = 3;
				tableauRenvoye[0] = tableau1[alea][0];
				tableauRenvoye[1] = tableau1[alea][1];
				tableauRenvoye[2] = dimension;
				break;
			case "cube2":
				dimension = 3;
				tableauRenvoye[0] = tableau1[alea][0];
				tableauRenvoye[1] = tableau1[alea][1];
				tableauRenvoye[2] = dimension;
				break;
			case "cube3":
				dimension = 3;
				tableauRenvoye[0] = tableau1[alea][0];
				tableauRenvoye[1] = tableau1[alea][1];
				tableauRenvoye[2] = dimension;
				break;
			case "paraRec":
				if (aleaV == 0) {
					while (alea == 4)
					{
						alea = Math.round(Math.random() * (tableau1.length - 1));
					}
					dimension = 3;
					tableauRenvoye[0] = tableau1[alea][0];
					tableauRenvoye[1] = tableau1[alea][1];
					tableauRenvoye[2] = dimension;
				}else if (aleaV == 1) {
					dimension = 1;
					tableauRenvoye[0] = tableau2[alea2][0];
					tableauRenvoye[1] = tableau2[alea2][1];
					tableauRenvoye[2] = dimension;
				}
				
				break;
			case "rectangle":
				dimension = 2;
				tableauRenvoye[0] = tableau1[alea][0];
				tableauRenvoye[1] = tableau1[alea][1];
				tableauRenvoye[2] = dimension;
				break;
			case "capacite":
				dimension = 1;
				tableauRenvoye[0] = tableau2[alea2][0];
				tableauRenvoye[1] = tableau2[alea2][1];
				tableauRenvoye[2] = dimension;
				
				break; 
			case "masse":
				dimension = 1;
				tableauRenvoye[0] = tableau3[alea3][0];
				tableauRenvoye[1] = tableau3[alea3][1];
				tableauRenvoye[2] = dimension;
				
				break;
			case "temps":
				
				break;
			case "autre":
				
				break; 
		}
//		trace ("tableauRenvoye: " + tableauRenvoye);
		return tableauRenvoye;
	}
	function active(valeur)
	{

		conteneur.enabled = valeur;
	}
	function pointilles(clipTemp, epaisseurTemp, couleurTemp, grandeurTraitTemp, grandeurTrouTemp, xDep, xArr, yDep, yArr) 
	{

		var lineWidthX : Number = xArr - xDep; 
		var lineWidthY : Number = Math.abs(yArr - yDep);
		var controlWidthX: Number = 0; 
		var controlWidthY: Number = 0;
		
		//Si on est à la verticale
		if (xArr - xDep == 0) {
			trace("On est dans 0")
			var dashSizeX: Number = 0;
			var spaceSizeX: Number = 0;
			var dashSizeY: Number = grandeurTraitTemp;
			var spaceSizeY: Number = grandeurTrouTemp;
			lineWidthY = lineWidthY - grandeurTraitTemp;
			clipTemp.moveTo(xDep, yDep);
		}else {
			var dashSizeX: Number = grandeurTraitTemp;
			var spaceSizeX: Number = grandeurTrouTemp;
			var dashSizeY: Number = dashSizeX * ((yArr - yDep) / (xArr - xDep));
			var spaceSizeY: Number = spaceSizeX * ((yArr - yDep) / (xArr - xDep)); 
			clipTemp.moveTo(xDep, yDep);
		}


		clipTemp.lineStyle (epaisseurTemp, couleurTemp); 

		//clipTemp.moveTo(xDep, yDep);
		
		while (controlWidthX <= Math.abs(lineWidthX - dashSizeX) && controlWidthY <= Math.abs(lineWidthY - dashSizeY)) { 
			if (xArr - xDep == 0) {
				clipTemp.lineTo (xDep, yDep -(controlWidthY + dashSizeY));
			}else {
				clipTemp.lineTo (xDep + controlWidthX + dashSizeX, yDep + controlWidthY + dashSizeY);
			}
			 
			controlWidthX = controlWidthX + dashSizeX; 
			controlWidthY = controlWidthY + dashSizeY;
			
			if (xArr - xDep == 0) {
				clipTemp.moveTo (xDep, yDep -(controlWidthY + spaceSizeY));
			}else {
				clipTemp.moveTo (xDep + controlWidthX + spaceSizeX, yDep + controlWidthY + spaceSizeY); 
			}
			
			controlWidthX = controlWidthX + spaceSizeX; 
			controlWidthY = controlWidthY + spaceSizeY;
		
		} 

	}

}