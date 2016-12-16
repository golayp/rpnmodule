/**
 * ...
 * @author Jean-Michel Luthi
 */
 
import mx.data.encoders.Num;
import TextField;


/*class contenant des images à faire défiler avec un zoom sur l'image centrale.
*/

/*Ses méthodes seront: 
dessineLeClip. interne.
rollOver: comportement lorqu'on le survol, il faut que tout s'arrête pour forcer l'lélève à lire le texte
clique: comportement lorsqu'on le clique

*/

//On crée la classe (le nom est celui du nom de fichier et aussi celui de la fonction principale)
class defilementPhotos extends MovieClip
{
//variables demandées lors de la création d'une occurence
public var posX:Number; //position X du clip unite
public var posY:Number; //position Y du clip unite
public var tailleX:Number; //tailleX du clip
public var tailleY:Number; //tailleY du clip
public var imageL:Number; //largeur de l'image
public var imageH:Number; //hauteur de l'image
public var nom:String; //nom de l'unite
public var icone:String; //nom du fichier icone
public var logo:String; //nom du fichier logo
public var commentaire:String; //commentaire associé
public var categorie:String; //Catégorie d'unité: longueur, aire, volume, capacité, masse...
public var uSI:Number; //conversion dans l'unité de base du SI
public var logoClip:MovieClip; //Clip pour l'affichage du logo du clip


//variables retournées
public var var1:Number; //pas encore créé
public var var2:Number; //pas encore créé

//autres variables
public var conteneur:MovieClip; //clip contenant la case
public var conteneurLogo:MovieClip; //clip contenant le logo

private var nomDossierImage:String="unitesImages"; //Nom du dossier dans lequel se trouvent les images. **********************ATTENTION AU NOM DE CE DOSSIER SUR PARASCHOOL!!*****
private var formatCommentaire:TextFormat; //format pour le commentaire
private var formatNom:TextFormat; //format pour le nom de l'unité
private var proportionClip:Number;//donne la proportion entre la longueur et la largeur du clip
private var dragTemp:Boolean;//Pour récupérer l'état du grac dans les onPress-onRelease

	function defilementPhotos(tailleImageTemp, positionX, positionY, formatCommentaireTemp, formatNomTemp, clipConteneur, nomTemp, iconeTemp, logoTemp,categorieTemp,uSITemp, commentaireTemp)
	{
		
		
		
	}
}