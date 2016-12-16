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
class uniteVolume extends MovieClip
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
public var bouge:Boolean = false;//Indicateur si la souris bouge
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

	function uniteVolume(tailleImageTemp, positionX, positionY,clipConteneur, utilisable, nomClipTemp)
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

		paraRec(longueurBase, 1, 1, 1, 2, 0x111111, 0x777777, 100);
		
		proportionClip=conteneur.image[icone+"Mc"]._height/conteneur.image._width
		conteneur.image[icone+"Mc"]._width=longueurBase;
		conteneur.image[icone+"Mc"]._height=longueurBase*proportionClip;
		imageL=longueurBase;
		imageH=longueurBase*proportionClip;
		conteneur._x=posX;
		conteneur._y=posY;
		conteneur.image[icone+"Mc"].enabled=possible;
	}


	//Construction d'un parallelépipède rectangle  X: horizontal Y:profondeur Z:Hauteur
	function paraRec(longueur, nbFoisX, nbFoisY, nbFoisZ, epaisseurTrait, couleurTrait, couleurFond, transparence)
	{
		conteneur.image.createEmptyMovieClip(icone + "Mc", 1);
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

	function setTailleParaRec(maLongueur, X, Y, Z)
	{
			if (X == -1){
				X = coordonneeX;
			}
			if (Y == -1){
				Y = coordonneeY;
			}
			if (Z == -1){
				Z = coordonneeZ;
			}

		paraRec(maLongueur, X, Y, Z, 2, 0x111111, 0x777777, 100);
		//trace("coordonneeX = " + X);
		//trace("coordonneeY = " + Y);
		//trace("coordonneeZ = " + Z);
		//trace("")
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
			ceClip.relache = false;
			var o=this;
			trace("onPress uniteVolume"+this.icone);
			var xmouseOld:Number = o._xmouse;
			var ymouseOld:Number = o._ymouse;
			//Lorsque le curseur de la souris se déplace dans le fichier SWF, 
			//on teste si la souris repasse sur les clips unités invisibles.
			
			function pente(monXOld, monYOld, monX, monY, clip, taille):Array
			{
				//trace("taille dans mouseMove, pente: " + taille);
				var test:Number = monYOld - monY;
				//trace("monY"+test)
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
				if (monX - monXOld == 0 && monX >= 0 && monY <= 0)
				{
					//trace("vertical OO")
					//maPente = 0;
					horizontal = false;
					diagonal = false;
					vertical = true;
					//trace("clip.coordonneeZ"+clip.coordonneeZ)
					clip.coordonneeZ = clip.coordonneeZ  - (monY - monYOld) / taille;
					if (clip.coordonneeZ <= 0) {
										clip.coordonneeZ = 0.2;
					}
					//trace("clip.coordonneeZ"+clip.coordonneeZ)
					clip.setTailleParaRec(taille, clip.coordonneeX, clip.coordonneeY,  clip.coordonneeZ);
					clip.valeur = Math.abs(clip.coordonneeX * clip.coordonneeY * clip.coordonneeZ);
				}else{	
					maPente = (monYOld - monY) / (monX - monXOld);
					switch (true)
					{
						case (Math.abs(maPente) < 0.1 && monX >= 0 && monY <= 0):
							//trace("horizontal")
							horizontal = true;
							diagonal = false;
							vertical = false;
							statique = false;
							//trace("clip.coordonneeX"+clip.coordonneeX)
							clip.coordonneeX = clip.coordonneeX + (monX - monXOld) / taille;
							if (clip.coordonneeX <= 0) {
										clip.coordonneeX = 0.2;
							}
							clip.setTailleParaRec(taille, clip.coordonneeX, clip.coordonneeY,  clip.coordonneeZ);
							clip.valeur = Math.abs(clip.coordonneeX * clip.coordonneeY * clip.coordonneeZ);
							//trace("clip.coordonneeX"+clip.coordonneeX)
							break;
						case (Math.abs(maPente) > 0.5 && Math.abs(maPente) < 2 && monX >= 0 && monY <= 0 && clip.coordonneeY >= 0):
							//On teste si le déplacement de la souris est direction cadran 1, 2, 3 ou 4
							//trace("diagonal")
							switch (true)
							 {
								 //Math.sqrt(5=1^2+2^2): c'est la longueur unité de la diagonale
								case ((monYOld - monY) > 0 && (monX - monXOld) > 0):
									cadran = 1;
									clip.coordonneeY = clip.coordonneeY + Math.sqrt(5) * Math.sqrt(Math.pow(monYOld - monY, 2) + Math.pow(monX - monXOld, 2)) / taille;
									break;
								case ((monYOld - monY) < 0 && (monX - monXOld) > 0):
									cadran = 2;
									break;
								case ((monYOld - monY) < 0 && (monX - monXOld) < 0):
									cadran = 3;
									clip.coordonneeY = clip.coordonneeY - Math.sqrt(5) * Math.sqrt(Math.pow(monYOld - monY, 2) + Math.pow(monX - monXOld, 2)) / taille;
									if (clip.coordonneeY <= 0) {
										clip.coordonneeY = 0.2;
									}
									break;
								case ((monYOld - monY) > 0 && (monX - monXOld) < 0):
									cadran = 4;
									break;	
							 }
							clip.setTailleParaRec(taille, clip.coordonneeX, clip.coordonneeY,  clip.coordonneeZ);
							clip.valeur = Math.abs(clip.coordonneeX * clip.coordonneeY * clip.coordonneeZ);
							horizontal = false;
							diagonal = true;
							vertical = false;
							statique = false;
							break;
						case (Math.abs(maPente) > 10 && monX >= 0 && monY <= 0):
							//trace("vertical")
							horizontal = false;
							diagonal = false;
							vertical = true;
							statique = false;
							clip.coordonneeZ = clip.coordonneeZ  + (monYOld - monY) / taille;
							if (clip.coordonneeZ <= 0) {
										clip.coordonneeZ = 0.2;
							}
							clip.setTailleParaRec(taille, clip.coordonneeX, clip.coordonneeY,  clip.coordonneeZ);
							clip.valeur = Math.abs(clip.coordonneeX * clip.coordonneeY * clip.coordonneeZ);
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
				}
								vecteur[0] = maPente;
				vecteur[1] = horizontal;
				vecteur[2] = diagonal;
				vecteur[3] = vertical;
				vecteur[4] = statique;
				vecteur[5] = cadran;
				
				//clip.setTailleParaRec(taille, clip.coordonneeX, clip.coordonneeY,  clip.coordonneeZ);
				//clip.valeur = Math.abs(clip.coordonneeX * clip.coordonneeY * clip.coordonneeZ);
				return vecteur;
			}
			mouseListener.onMouseMove = function() {
				pente(xmouseOld, ymouseOld, o._xmouse, o._ymouse, ceClip, ceClip.tailleX);
				//trace("ceClip.icone" +ceClip.longueurBase);
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