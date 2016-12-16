/**
 * ...
 * @author Jean-Michel Luthi
 */
 
import mx.data.encoders.Num;
import TextField;
import timer;


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
class unite extends MovieClip
{
//variables demandées lors de la création d'une occurence
public var posX:Number; //position X du clip unite
public var posY:Number; //position Y du clip unite
public var tailleX:Number; //tailleX du clip
public var tailleY:Number; //tailleY du clip
public var imageL:Number; //largeur de l'image
public var imageH:Number; //hauteur de l'image
public var nom:String; //nom de l'unite
public var nom2:String; //suite du nom de l'unite
public var icone:String; //nom du fichier icone
public var logo:String; //nom du fichier logo
public var commentaire:String; //commentaire associé
public var categorie:String; //Catégorie d'unité: longueur, aire, volume, capacité, masse...
public var uSI:Number; //conversion dans l'unité de base du SI
public var logoClip:MovieClip; //Clip pour l'affichage du logo du clip
public var exposant:Number;//Exposant pour l'unité
public var symbole:String;//symbole de l'unité p.ex: mm, cm, ft


//variables retournées
public var drag:Boolean=false; //indique si le clip est en train d'être dragué
public var rollUtilise:Boolean=false; //pas encore créé
public var var2:Number; //pas encore créé


//autres variables
public var conteneur:MovieClip; //clip contenant la case
public var conteneurLogo:MovieClip; //clip contenant le logo

private var nomDossierImage:String="unitesImages"; //Nom du dossier dans lequel se trouvent les images. **********************ATTENTION AU NOM DE CE DOSSIER SUR PARASCHOOL!!*****
private var formatCommentaire:TextFormat; //format pour le commentaire
private var formatNom:TextFormat; //format pour le nom de l'unité
private var proportionClip:Number;//donne la proportion entre la longueur et la largeur du clip
private var dragTemp:Boolean;//Pour récupérer l'état du grac dans les onPress-onRelease

	function unite(tailleImageTemp, positionX, positionY, formatCommentaireTemp, formatNomTemp, clipConteneur, nomTemp, nomTemp2, iconeTemp, logoTemp,categorieTemp,uSITemp, commentaireTemp, symboleTemp, exposantTemp)
	{
		tailleX=tailleImageTemp;
		//tailleY=tailleImageTempY;
		posX = positionX;
		posY = positionY;
		formatCommentaire=formatCommentaireTemp;
		formatNom=formatNomTemp;
		conteneur = clipConteneur;
		symbole = symboleTemp;
		exposant = exposantTemp;
		
		//Ces variables proviennent du fichier xml
		nom = nomTemp;
		nom2 = nomTemp2;
		icone=iconeTemp;
		logo=logoTemp;
		categorie=categorieTemp;
		uSI=uSITemp;
		commentaire=commentaireTemp;
		
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
		conteneur.createEmptyMovieClip("image",0);
		conteneur.image.attachMovie(icone, icone + "Mc", 1);
		//trace("Nom: " + nom + nom2);
		//trace("Hauteur: " + conteneur.image[icone + "Mc"]._height);
		//trace("largeur: " + conteneur.image[icone + "Mc"]._width);
		proportionClip=conteneur.image[icone+"Mc"]._height/conteneur.image[icone+"Mc"]._width
		conteneur.image[icone+"Mc"]._width=tailleX;
		conteneur.image[icone+"Mc"]._height=tailleX*proportionClip;
		imageL=tailleX;
		imageH = tailleX * proportionClip;
		
		//trace("Hauteur Après: " + conteneur.image[icone + "Mc"]._height);
		//trace("largeur Après: " + conteneur.image[icone + "Mc"]._width);
		////////////////On centre les images par rapport au clip
		conteneur.image[icone+"Mc"]._x=-imageL/2;
		conteneur.image[icone+"Mc"]._y=-imageH/2;

		//On attache le clip pour les commentaires(Taille bibliothèque: L_192.95, H_100)
		conteneur.attachMovie("bulleTextMc_hd", "bulleMc_hd", 1);
		conteneur.attachMovie("bulleTextMc_hd_tour", "bulleMc_hd_tour", 11);
		conteneur.bulleMc_hd._x=imageL*3/4;
		conteneur.bulleMc_hd._y=0;
		conteneur.bulleMc_hd._visible=false;
		conteneur.bulleMc_hd_tour._visible=false;
		conteneur.bulleMc_hd_tour._x=conteneur.bulleMc_hd._x;
		conteneur.bulleMc_hd_tour._y=conteneur.bulleMc_hd._y;
		//On lui ajoute 1 zone texte pour le commentaire (On affiche la bonne suivant la position)
		conteneur.bulleMc_hd.createTextField("commentaire", 1, 0 ,-80 , 100, 100);
		conteneur.bulleMc_hd.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_hd.commentaire.selectable = false;
		conteneur.bulleMc_hd.commentaire.multiline=true;
		conteneur.bulleMc_hd.commentaire._visible=true;
		conteneur.bulleMc_hd.commentaire.text = commentaire;
		//On attache le clip pour les commentaires(Taille bibliothèque: L_192.95, H_100)
		conteneur.attachMovie("bulleTextMc_hg", "bulleMc_hg", 2);
		conteneur.attachMovie("bulleTextMc_hg_tour", "bulleMc_hg_tour", 21);
		conteneur.bulleMc_hg._x=imageL/4;
		conteneur.bulleMc_hg._y=0;
		conteneur.bulleMc_hg._visible=false;
		conteneur.bulleMc_hg_tour._visible=false;
		conteneur.bulleMc_hg_tour._x=conteneur.bulleMc_hg._x;
		conteneur.bulleMc_hg_tour._y=conteneur.bulleMc_hg._y;
		//On lui ajoute 1 zone texte pour le commentaire (On affiche la bonne suivant la position)
		conteneur.bulleMc_hg.createTextField("commentaire", 1, -100 ,-80 , 100, 100);
		conteneur.bulleMc_hg.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_hg.commentaire.selectable = false;
		conteneur.bulleMc_hg.commentaire.multiline=true;
		conteneur.bulleMc_hg.commentaire._visible=true;
		conteneur.bulleMc_hg.commentaire.text = commentaire;		
		//On attache le clip pour les commentaires(Taille bibliothèque: L_192.95, H_100)
		conteneur.attachMovie("bulleTextMc_bd", "bulleMc_bd", 3);
		conteneur.attachMovie("bulleTextMc_bd_tour", "bulleMc_bd_tour", 31);
		conteneur.bulleMc_bd._x=imageL*3/4;
		conteneur.bulleMc_bd._y=imageH;
		conteneur.bulleMc_bd._visible=false;
		conteneur.bulleMc_bd_tour._visible=false;
		conteneur.bulleMc_bd_tour._x=conteneur.bulleMc_bd._x;
		conteneur.bulleMc_bd_tour._y=conteneur.bulleMc_bd._y;
		//On lui ajoute 4 zones texte pour le commentaire (On affiche la bonne suivant la position)
		conteneur.bulleMc_bd.createTextField("commentaire", 1, 0 ,80 , 100, 100);
		conteneur.bulleMc_bd.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_bd.commentaire.selectable = false;
		conteneur.bulleMc_bd.commentaire.multiline=true;
		conteneur.bulleMc_bd.commentaire._visible=true;
		conteneur.bulleMc_bd.commentaire.text = commentaire;
		//On attache le clip pour les commentaires(Taille bibliothèque: L_192.95, H_100)
		conteneur.attachMovie("bulleTextMc_bg", "bulleMc_bg", 4);
		conteneur.attachMovie("bulleTextMc_bg_tour", "bulleMc_bg_tour", 41);
		conteneur.bulleMc_bg._x=imageL/4;
		conteneur.bulleMc_bg._y=imageH;
		conteneur.bulleMc_bg._visible=false;
		conteneur.bulleMc_bg_tour._visible=false;
		conteneur.bulleMc_bg_tour._x=conteneur.bulleMc_bg._x;
		conteneur.bulleMc_bg_tour._y=conteneur.bulleMc_bg._y;
		//On lui ajoute 4 zones texte pour le commentaire (On affiche la bonne suivant la position)
		conteneur.bulleMc_bg.createTextField("commentaire", 1, -100 ,80 , 100, 100);
		conteneur.bulleMc_bg.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_bg.commentaire.selectable = false;
		conteneur.bulleMc_bg.commentaire.multiline=true;
		conteneur.bulleMc_bg.commentaire._visible=true;
		conteneur.bulleMc_bg.commentaire.text = commentaire;
		
		//On crée la zone texte pour le nom
		conteneur.image.createTextField("nomUnite", 2, -imageL/2 ,imageH/2, imageL, 20);
		conteneur.image.nomUnite.setNewTextFormat(formatNom);
		conteneur.image.nomUnite.selectable = false;
		//conteneur.image.nomUnite.autoSize=true;
		conteneur.image.nomUnite.text = nom;
		
		//On crée la zone texte pour la suite du nom
		conteneur.image.createTextField("nomUnite2", 3, -imageL/2 ,15+imageH/2, imageL, 20);
		conteneur.image.nomUnite2.setNewTextFormat(formatNom);
		conteneur.image.nomUnite2.selectable = false;
		//conteneur.image.nomUnite2.autoSize=true;
		conteneur.image.nomUnite2.text = nom2;
	}
	//Gère La Taille de l'image à l'intérieur du clip conteneur avec le nom mais sans le clip image
	function setTaille(maTailleX)
	{
		var maProportion:Number = conteneur.image._height / conteneur.image._width;
		//On enregistre l'ancien format 
		var formatOld:Number = formatNom.size;
		var maTailleY:Number = maTailleX * maProportion;
		//On redimensionne l'image
		conteneur.image._width=maTailleX;
		conteneur.image._height = maTailleY;
		imageL=conteneur.image._width;
		imageH=conteneur.image._height;
		conteneur.nomUnite._x=maTailleX/2
		conteneur.nomUnite._y=maTailleY
		//on applique le nouveau et on rétablit l'ancien pour les autres unites
		formatNom.size=(maTailleX/tailleX)*formatNom.size;
		if (formatNom.size<6)
		{
			formatNom.size=6;
		}
		conteneur.nomUnite.setNewTextFormat(formatNom);
		conteneur.nomUnite.text = nom;
		conteneur.nomUnite2.setNewTextFormat(formatNom);
		conteneur.nomUnite2.text = nom2;
		formatNom.size=formatOld;
		conteneur.nomUnite.setNewTextFormat(formatNom);
		//trace("Hauteur setTaille: " + conteneur.image[icone + "Mc"]._height);
		//trace("largeur setTaille: " + conteneur.image[icone + "Mc"]._width);
	}
	
	//Gère La Taille de l'image à l'intérieur d'image sans le nom
	function setTailleI(maTailleX,maTailleY)
	{
		//On redimensionne l'image
		conteneur.image[icone + "Mc"]._width = maTailleX;
		conteneur.image[icone + "Mc"]._height=maTailleY;
		
		imageL=conteneur.image[icone + "Mc"]._width;
		imageH=conteneur.image[icone + "Mc"]._height;
		conteneur.nomUnite._x=maTailleX/2
		conteneur.nomUnite._y=maTailleY
		//trace("Hauteur setTaille: " + conteneur.image[icone + "Mc"]._height);
		//trace("largeur setTaille: " + conteneur.image[icone + "Mc"]._width);
	}
	
	//Renvoie La Taille de l'image à l'intérieur du clip conteneur, yc le texte du nom
	function getTaille()
	{
		var tailleImage:Array=new Array();
		tailleImage[0]=conteneur.image._width;
		tailleImage[1]=conteneur.image._height;
		return tailleImage;
	}
	//Renvoie La Taille de l'image à l'intérieur du clip conteneur.image, sans le texte du nom
	function getTailleI()
	{
		var tailleImage:Array=new Array();
		tailleImage[0]=conteneur.image[icone+"Mc"]._width;
		tailleImage[1]=conteneur.image[icone+"Mc"]._height;
		return tailleImage;
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


}