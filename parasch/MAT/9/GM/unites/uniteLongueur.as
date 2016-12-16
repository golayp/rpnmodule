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
class uniteLongueur extends MovieClip
{
//variables demandées lors de la création d'une occurence
public var posX:Number; //position X du clip unite
public var posY:Number; //position Y du clip unite
public var tailleX:Number; //tailleX du clip
//public var tailleY:Number; //tailleY du clip
public var imageL:Number; //largeur de l'image
public var imageH:Number; //hauteur de l'image
public var possible:Boolean; //enabled de l'image
public var icone:String; //nom du fichier icone
public var coordonneeX:Number; //Coordonnées (x,y,z) des objets. 
public var coordonneeY:Number;
public var coordonneeZ:Number;
public var longueurBase:Number;//valeur de la taille de base à partir de laquelle on fair les multiples Ce sera le nb de mètres (P.ex 0.01 pour le cm) NE VARIERA PAS
public var valeur:Number = 1;
public var bouge:Boolean = false;
public var relache:Boolean = false;//Indicateur si la souris est relachée
//variables retournées
public var drag:Boolean=false; //indique si le clip est en train d'être dragué
public var rollUtilise:Boolean=false; //pas encore créé
public var var2:Number; //pas encore créé


//autres variables
public var conteneur:MovieClip; //clip contenant la case
private var proportionClip:Number;//donne la proportion entre la longueur et la largeur du clip
private var dragTemp:Boolean;//Pour récupérer l'état du grac dans les onPress-onRelease

static var ceClip:MovieClip;

	function uniteLongueur(tailleImageTemp, positionX, positionY,clipConteneur, utilisable, nomClipTemp)
	{
		
		longueurBase = tailleImageTemp;
		//tailleX=tailleImageTemp;
		posX = positionX;
		posY = positionY;
		conteneur=clipConteneur;
		possible=utilisable;
		icone = nomClipTemp;
		
		
		ceClip = this;
		//on lance la création du clip
		dessineLeClip();
		comportement();
		
	}
	function dessineLeClip()
	{
		conteneur.drag=false;
		conteneur.rollUtilise = false;
		//On crée la zone image sur la base
		//sur un fond 
////////////////////////////ATTENTION ON NE PEUT PAS METTRE DE PNG DANS FLASH 6
		conteneur.createEmptyMovieClip("image", 0);

		segment(longueurBase, 1, 2, 0x111111, 0x777777, 100);

		
		proportionClip=conteneur.image[icone+"Mc"]._height/conteneur.image._width
		conteneur.image[icone+"Mc"]._width=longueurBase;
		conteneur.image[icone+"Mc"]._height=longueurBase*proportionClip;
		imageL=longueurBase;
		imageH=longueurBase*proportionClip;
		conteneur._x=posX;
		conteneur._y=posY;
		conteneur.image[icone+"Mc"].enabled=possible;
	}

	//Construction d'un segment
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
	function getTailleModif()
	{
		var tailleImage:Array=new Array();
		tailleImage[0] = coordonneeX;
		tailleImage[1] = coordonneeY;
		tailleImage[2] = coordonneeZ;
		return tailleImage;
	}

	function setTailleSegment(maLongueur, X)
	{
		segment(maLongueur, X, 2, 0x111111, 0x777777, 100);
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
			var xmouseOld:Number = o._xmouse;
			var ymouseOld:Number = o._ymouse;
			//Lorsque le curseur de la souris se déplace dans le fichier SWF, 
			//on teste si la souris repasse sur les clips unités invisibles.
			
			function modifierTailleAvecSouris(clip, taille)
			{
				var mesPositions:Array = new Array()
				mesPositions = clip.getTailleModif();
				//On teste si on est plus petit que la position d'origine du clip

				mesPositions[0] =  o._xmouse  / taille;

				if (o._xmouse / taille < 0) {
					mesPositions[0] = 0.2;
				}
				
				//trace("mesPositions: "+mesPositions)
				clip.setTailleSegment(taille, mesPositions[0]);
				clip.valeur = mesPositions[0];
				//trace("clip.valeur"+clip.valeur)
			
			}

			mouseListener.onMouseMove = function() {
				//trace("ceClip.icone" +ceClip.longueurBase);
				modifierTailleAvecSouris(ceClip, ceClip.tailleX);
				xmouseOld = o._xmouse;
				ymouseOld = o._ymouse;
				ceClip.bouge = true;
				ceClip.relache = false;
			}
			Mouse.addListener(mouseListener);
			
		}
		conteneur.onRelease=function()
		{
			trace("onRelease");
			//pour annuler la fonction onMouseMove de onPress
			Mouse.removeListener(mouseListener);
			ceClip.bouge = false;
			ceClip.relache = true;
			
		}
		conteneur.onReleaseOutside=function()
		{
			trace("onReleaseOutside");
			//pour annuler la fonction onMouseMove de onPress
			Mouse.removeListener(mouseListener);
			ceClip.bouge = false;
			ceClip.relache = true;
		}
	
	}
	function active(valeur)
	{

		conteneur.enabled = valeur;
	}
		function pointilles(clipTemp, epaisseurTemp, couleurTemp, grandeurTraitTemp, grandeurTrouTemp, xDep, xArr, yDep, yArr) 
	{

		var lineWidthX : Number = xArr-xDep; 
		var lineWidthY : Number = yArr-yDep;
		var controlWidthX: Number = 0; 
		var controlWidthY: Number = 0;
		
		//Si on est à la verticale
		if (xArr - xDep == 0) {
			trace("On est dans 0")
			var dashSizeX: Number = 0;
			var spaceSizeX: Number = 0;
			var dashSizeY: Number = grandeurTraitTemp;
			var spaceSizeY: Number = grandeurTrouTemp; 
		}else {
			var dashSizeX: Number = grandeurTraitTemp;
			var spaceSizeX: Number = grandeurTrouTemp;
			var dashSizeY: Number = dashSizeX * ((yArr - yDep) / (xArr - xDep));
			var spaceSizeY: Number = spaceSizeX * ((yArr - yDep) / (xArr - xDep)); 
		}


		clipTemp.lineStyle (epaisseurTemp, couleurTemp); 

		clipTemp.moveTo(xDep, yDep);
		
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