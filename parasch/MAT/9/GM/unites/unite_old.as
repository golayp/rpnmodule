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
public var icone:String; //nom du fichier icone
public var logo:String; //nom du fichier logo
public var commentaire:String; //commentaire associé
public var categorie:String; //Catégorie d'unité: longueur, aire, volume, capacité, masse...
public var uSI:Number; //conversion dans l'unité de base du SI
public var logoClip:MovieClip; //Clip pour l'affichage du logo du clip


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

	function unite(tailleImageTemp, positionX, positionY, formatCommentaireTemp, formatNomTemp, clipConteneur, nomTemp, iconeTemp, logoTemp,categorieTemp,uSITemp, commentaireTemp)
	{
		tailleX=tailleImageTemp;
		//tailleY=tailleImageTempY;
		posX = positionX;
		posY = positionY;
		formatCommentaire=formatCommentaireTemp;
		formatNom=formatNomTemp;
		conteneur=clipConteneur;
		
		//Ces variables proviennent du fichier xml
		nom=nomTemp;
		icone=iconeTemp;
		logo=logoTemp;
		categorie=categorieTemp;
		uSI=uSITemp;
		commentaire=commentaireTemp;
		
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
		conteneur.createEmptyMovieClip("image",0);
		conteneur.image.attachMovie(icone,icone+"Mc",1);
		proportionClip=conteneur.image[icone+"Mc"]._height/conteneur.image._width
		conteneur.image[icone+"Mc"]._width=tailleX;
		conteneur.image[icone+"Mc"]._height=tailleX*proportionClip;
		imageL=tailleX;
		imageH=tailleX*proportionClip;

		//On attache le clip pour les commentaires(Taille bibliothèque: L_192.95, H_100)
		conteneur.attachMovie("bulleTextMc_hd", "bulleMc_hd", 1);
		conteneur.bulleMc_hd._x=imageL*3/4;
		conteneur.bulleMc_hd._y=0;
		conteneur.bulleMc_hd._visible=false;
		//On lui ajoute 1 zone texte pour le commentaire (On affiche la bonne suivant la position)
		conteneur.bulleMc_hd.createTextField("commentaire", 1, 0 ,-80 , 100, 100);
		conteneur.bulleMc_hd.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_hd.commentaire.selectable = false;
		conteneur.bulleMc_hd.commentaire.multiline=true;
		conteneur.bulleMc_hd.commentaire._visible=true;
		conteneur.bulleMc_hd.commentaire.text = commentaire;
		//On attache le clip pour les commentaires(Taille bibliothèque: L_192.95, H_100)
		conteneur.attachMovie("bulleTextMc_hg", "bulleMc_hg", 2);
		conteneur.bulleMc_hg._x=imageL/4;
		conteneur.bulleMc_hg._y=0;
		conteneur.bulleMc_hg._visible=false;
		//On lui ajoute 1 zone texte pour le commentaire (On affiche la bonne suivant la position)
		conteneur.bulleMc_hg.createTextField("commentaire", 1, -100 ,-80 , 100, 100);
		conteneur.bulleMc_hg.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_hg.commentaire.selectable = false;
		conteneur.bulleMc_hg.commentaire.multiline=true;
		conteneur.bulleMc_hg.commentaire._visible=true;
		conteneur.bulleMc_hg.commentaire.text = commentaire;		
		//On attache le clip pour les commentaires(Taille bibliothèque: L_192.95, H_100)
		conteneur.attachMovie("bulleTextMc_bd", "bulleMc_bd", 3);
		conteneur.bulleMc_bd._x=imageL*3/4;
		conteneur.bulleMc_bd._y=imageH;
		conteneur.bulleMc_bd._visible=false;
		//On lui ajoute 4 zones texte pour le commentaire (On affiche la bonne suivant la position)
		conteneur.bulleMc_bd.createTextField("commentaire", 1, 0 ,80 , 100, 100);
		conteneur.bulleMc_bd.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_bd.commentaire.selectable = false;
		conteneur.bulleMc_bd.commentaire.multiline=true;
		conteneur.bulleMc_bd.commentaire._visible=true;
		conteneur.bulleMc_bd.commentaire.text = commentaire;
		//On attache le clip pour les commentaires(Taille bibliothèque: L_192.95, H_100)
		conteneur.attachMovie("bulleTextMc_bg", "bulleMc_bg", 4);
		conteneur.bulleMc_bg._x=imageL/4;
		conteneur.bulleMc_bg._y=imageH;
		conteneur.bulleMc_bg._visible=false;
		//On lui ajoute 4 zones texte pour le commentaire (On affiche la bonne suivant la position)
		conteneur.bulleMc_bg.createTextField("commentaire", 1, -100 ,80 , 100, 100);
		conteneur.bulleMc_bg.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_bg.commentaire.selectable = false;
		conteneur.bulleMc_bg.commentaire.multiline=true;
		conteneur.bulleMc_bg.commentaire._visible=true;
		conteneur.bulleMc_bg.commentaire.text = commentaire;
		
		//On crée la zone texte pour le nom
		conteneur.image.createTextField("nomUnite", 2, 0 ,imageH, imageL, 30);
		conteneur.image.nomUnite.setNewTextFormat(formatNom);
		conteneur.image.nomUnite.selectable = false;
		conteneur.image.nomUnite.autoSize=true;
		conteneur.image.nomUnite.text = nom;
		
		
		

	}
	//Gère La Taille de l'image à l'intérieur du clip conteneur avec le nom
	function setTaille(maTailleX,maTailleY)
	{
		//On enregistre l'ancien format 
		var formatOld:Number=formatNom.size;
		//On redimensionne l'image
		conteneur.image._width=maTailleX;
		conteneur.image._height=maTailleY;

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
		formatNom.size=formatOld;
		conteneur.nomUnite.setNewTextFormat(formatNom);
		
	}
	//Renvoie La Taille de l'image à l'intérieur du clip conteneur
	function getTaille()
	{
		var tailleImage:Array=new Array();
		tailleImage[0]=conteneur.image._width;
		tailleImage[1]=conteneur.image._height;
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
	function comportement()
	{
		
		var o=this;
		//Comportement lors d'un rollOver
		conteneur.onRollOver=function()
		{
			
			switch (true)
			{
				case (this._x <= 660-this.bulleMc_hd._width && this._y >= this.bulleMc_hd._height):
				this.bulleMc_hd._visible=true;
				break;
				case (this._x <= 660-this.bulleMc_hd._width && this._y < this.bulleMc_hd._height):
				this.bulleMc_bd._visible=true;
				break;
				case (this._x > 660-this.bulleMc_hd._width && this._y < this.bulleMc_hd._height):
				this.bulleMc_bg._visible=true;
				break;
				case (this._x > 660- this.bulleMc_hd._width && this._y >=this.bulleMc_hd._height):
				this.bulleMc_hg._visible=true;
				break;
				default:
				this.bulleMc_hd._visible=true;
				break;
				
			}
			if (rollUtilise == false)
			{
				trace("rollUtililse")
				var custom:timer = new timer(500);
				this.onEnterFrame = function()
				{
					if (custom.fin() == false)
					{
						this.enabled = false;
					}else {
						delete this.onEnterFrame;
						this.enabled = true;
						rollUtilise = true;
					}
				}
			}
		}
		//Comportement lors d'un rollOut
		conteneur.onRollOut=function()
		{
			this.bulleMc_hg._visible=false;
			this.bulleMc_hd._visible=false;
			this.bulleMc_bg._visible=false;
			this.bulleMc_bd._visible=false;
		}
		
		//Comportement lorsqu'on clique dessus
		conteneur.onPress=function()
		{ 
			
			startDrag(this.image[icone+"Mc"]);
			this.bulleMc_hg._visible=false;
			this.bulleMc_hd._visible=false;
			this.bulleMc_bg._visible=false;
			this.bulleMc_bd._visible=false;
			o.drag=true;
		}
		conteneur.onRelease=function()
		{
			stopDrag();
			o.drag=false;

		}
		conteneur.onReleaseOutside=function()
		{
			stopDrag();
			o.drag=false;

		}
		conteneur.onMouseMove = function()
		{
			o.posX=this._x;
			o.posY=this._y;
			
		}
	}

}