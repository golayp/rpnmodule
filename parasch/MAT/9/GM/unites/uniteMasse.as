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
class uniteMasse extends MovieClip
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

	function uniteMasse(tailleImageTemp, positionX, positionY,clipConteneur, utilisable, nomClipTemp)
	{
		
		longueurBase = tailleImageTemp;
		tailleX=tailleImageTemp;
		posX = positionX;
		posY = positionY;
		conteneur=clipConteneur;
		possible=utilisable;
		icone = nomClipTemp;
		
		
		ceClip = this;
		ceClip.enabled = false;
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

		masse(longueurBase, 1, 1, 2, 0x111111, 0x777777, 100);

		
		proportionClip=conteneur.image[icone+"Mc"]._height/conteneur.image._width
		conteneur.image[icone+"Mc"]._width=longueurBase;
		conteneur.image[icone+"Mc"]._height=longueurBase*proportionClip;
		imageL=longueurBase;
		imageH=longueurBase*proportionClip;
		conteneur._x=posX;
		conteneur._y=posY;
		conteneur.image[icone+"Mc"].enabled=possible;
	}

	//Construction d'une masse
	function masse(longueur, nbFoisX, nbFoisY, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		//trace("dans masse")
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
		conteneur.image[icone+"Mc"].createEmptyMovieClip("circle2_mc", 1);
		drawCircle(conteneur.image[icone+"Mc"].circle2_mc, nbFoisX * longueur/2, -(nbFoisY * longueur+longueur*nbFoisX/10), longueur*nbFoisX/5, epaisseurTrait, couleurTrait, couleurFond, transparence);
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
	function getTailleModif()
	{
		var tailleImage:Array=new Array();
		tailleImage[0] = coordonneeX;
		tailleImage[1] = coordonneeY;
		tailleImage[2] = coordonneeZ;
		return tailleImage;
	}
	function setTailleMasse(maLongueur, X, Y)
	{
		masse(maLongueur, X, Y, 2, 0x111111, 0x777777, 100);
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
			trace("tailleX dans onRollOVer " + ceClip.tailleX);
		}
		//Comportement lors d'un rollOut
		conteneur.onRollOut=function()
		{
			
		}
		
		//Comportement lorsqu'on clique dessus
		conteneur.onPress=function()
		{ 
			trace("tailleX dans uniteMasse-comportement-onPress " + ceClip.tailleX);
			var o=this;
			trace("onPress"+this.icone);
			var xmouseOld:Number = o._xmouse;
			var ymouseOld:Number = o._ymouse;
			//Lorsque le curseur de la souris se déplace dans le fichier SWF, 

			function modifierTailleAvecSouris(clip, taille)
			{
				var mesPositions:Array = new Array()
				mesPositions = clip.getTailleModif();
				//On teste si on est plus petit que la position d'origine du clip
				mesPositions[0] =  o._xmouse  / taille;
				mesPositions[1] = - o._ymouse / taille;
				if (o._xmouse / taille < 0.2) {
					mesPositions[0] = 0.2;
				}
				if (-o._ymouse / taille < 0.2) {
					mesPositions[1] = 0.2;
				}
				//trace("mesPositions: "+mesPositions)
				//trace("taille dans mouseMove, modifierTailleAvecSouris: " + taille);
				clip.setTailleMasse(taille, mesPositions[0],  mesPositions[1]);
				clip.valeur = mesPositions[0] * mesPositions[1];
			
			}
			mouseListener.onMouseMove = function() {
				//pente(xmouseOld, ymouseOld, o._xmouse, o._ymouse, ceClip, ceClip.longueurBase);
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