/**
 * ...
 * @author J-M.Luthi
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
class uniteTemps extends MovieClip
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

		paraRec(longueurBase, 1, 1, 1, 2, 0x777777, 0x111111, 100);
		
		proportionClip=conteneur.image[icone+"Mc"]._height/conteneur.image._width
		conteneur.image[icone+"Mc"]._width=longueurBase;
		conteneur.image[icone+"Mc"]._height=longueurBase*proportionClip;
		imageL=longueurBase;
		imageH=longueurBase*proportionClip;
		conteneur._x=posX;
		conteneur._y=posY;
		conteneur.image[icone+"Mc"].enabled=possible;
	}
}
