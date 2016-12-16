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
class triUnite extends MovieClip
{
//variables demandées lors de la création d'une occurence
public var posX:Number; //position X du clip unite
public var posY:Number; //position Y du clip unite
public var tailleX:Number; //tailleX du clip
public var tailleY:Number; //tailleY du clip
public var imageL:Number; //largeur de l'image
public var imageH:Number; //hauteur de l'image
public var nom:String; //nom de l'unite
public var nom2:String;//suite du nom de l'unité
public var icone:String; //nom du fichier icone
public var logo:String; //nom du fichier logo
public var commentaire:String; //commentaire associé
public var categorie:String; //Catégorie d'unité: longueur, aire, volume, capacité, masse...
public var uSI:Number; //conversion dans l'unité de base du SI
public var logoClip:MovieClip; //Clip pour l'affichage du logo du clip


//variables retournées
public var drag:Boolean=false; //indique si le clip est en train d'être dragué
public var rollUtilise:Boolean=false; //pas encore créé
public var relache:Boolean=false; //pas encore créé


//autres variables
public var conteneur:MovieClip; //clip contenant la case
public var conteneurLogo:MovieClip; //clip contenant le logo

private var nomDossierImage:String="unitesImages"; //Nom du dossier dans lequel se trouvent les images. **********************ATTENTION AU NOM DE CE DOSSIER SUR PARASCHOOL!!*****
private var formatCommentaire:TextFormat; //format pour le commentaire
private var formatCommentaireBold:TextFormat; //format pour le commentaire
private var formatNom:TextFormat; //format pour le nom de l'unité
private var proportionClip:Number;//donne la proportion entre la longueur et la largeur du clip
private var dragTemp:Boolean;//Pour récupérer l'état du grac dans les onPress-onRelease

	function triUnite(tailleImageTemp, positionX, positionY, formatCommentaireTemp, formatCommentaireTemp2, formatNomTemp, clipConteneur, nomTemp, nomTemp2, iconeTemp, logoTemp,categorieTemp,uSITemp, commentaireTemp)
	{
		tailleX=tailleImageTemp;
		//tailleY=tailleImageTempY;
		posX = positionX;
		posY = positionY;
		formatCommentaire = formatCommentaireTemp;
		formatCommentaireBold=formatCommentaireTemp2;
		formatNom=formatNomTemp;
		conteneur=clipConteneur;
		
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
		comportement(commentaire);
		
		
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
		imageH = tailleX * proportionClip;
/*
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
		//conteneur.bulleMc_hd.createTextField("commentaire", 1, 0 ,-80 , 100, 100);
		conteneur.bulleMc_hd.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_hd.commentaire.selectable = false;
		conteneur.bulleMc_hd.commentaire.multiline = true;
		conteneur.bulleMc_hd.commentaire.autoSize = true;
		conteneur.bulleMc_hd.commentaire.wordWrap = true;
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
		//conteneur.bulleMc_hg.createTextField("commentaire", 1, -100 ,-80 , 100, 100);
		conteneur.bulleMc_hg.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_hg.commentaire.selectable = false;
		conteneur.bulleMc_hg.commentaire.multiline = true;
		conteneur.bulleMc_hg.commentaire.autoSize = true;
		conteneur.bulleMc_hg.commentaire.wordWrap = true;
		conteneur.bulleMc_hg.commentaire._visible=true;
		conteneur.bulleMc_hg.commentaire.text = commentaire;
		
		//On attache le clip pour les commentaires(Taille bibliothèque: L_192.95, H_100)
		//conteneur.attachMovie("bulleTextMc_bd", "bulleMc_bd", 3);
		//conteneur.attachMovie("bulleTextMc_bd_tour", "bulleMc_bd_tour", 31);
		//conteneur.attachMovie("pointe_bd", "pointe_bd", 32);
		//conteneur.attachMovie("pointe_bd_tour", "pointe_bd_tour", 33);
		conteneur.bulleMc_bd._x=imageL*3/4;
		conteneur.bulleMc_bd._y = imageH+13;
		conteneur.bulleMc_bd._visible = false;
		
		conteneur.pointe_bd._x=imageL*3/4;
		conteneur.pointe_bd._y = imageH;
		conteneur.pointe_bd._visible = false;
		
		conteneur.pointe_bd_tour._x=-6+imageL*3/4;
		conteneur.pointe_bd_tour._y = imageH-4;
		conteneur.pointe_bd_tour._visible = false;
		
		conteneur.bulleMc_bd_tour._visible=false;
		conteneur.bulleMc_bd_tour._x=conteneur.bulleMc_bd._x;
		conteneur.bulleMc_bd_tour._y=conteneur.bulleMc_bd._y;
		//On lui ajoute 4 zones texte pour le commentaire (On affiche la bonne suivant la position)
		conteneur.bulleMc_bd.createTextField("commentaire", 1, -30 ,20 , 200, 100);
		conteneur.bulleMc_bd.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_bd.commentaire.selectable = false;
		conteneur.bulleMc_bd.commentaire.multiline = true;
		conteneur.bulleMc_bd.commentaire.autoSize = true;
		conteneur.bulleMc_bd.commentaire.wordWrap = true;
		conteneur.bulleMc_bd.commentaire._visible=true;
		conteneur.bulleMc_bd.commentaire.text = commentaire;
		
		//On attache le clip pour les commentaires(Taille bibliothèque: L_192.95, H_100)
		conteneur.attachMovie("bulleTextMc_bg", "bulleMc_bg", 4);
		conteneur.attachMovie("bulleTextMc_bg_tour", "bulleMc_bg_tour", 41);
		conteneur.bulleMc_bg._x=imageL/4;
		conteneur.bulleMc_bg._y=imageH;
		conteneur.bulleMc_bg._visible=false;
		conteneur.bulleMc_bg_tour._visible=false;
		
		//On lui ajoute 4 zones texte pour le commentaire (On affiche la bonne suivant la position)
		//conteneur.bulleMc_bg.createTextField("commentaire", 1, -100 ,80 , 100, 100);
		conteneur.bulleMc_bg.commentaire.setNewTextFormat(formatCommentaire);
		conteneur.bulleMc_bg.commentaire.selectable = false;
		conteneur.bulleMc_bg.commentaire.multiline = true;
		conteneur.bulleMc_bg.commentaire.autoSize = true;
		conteneur.bulleMc_bg.commentaire.wordWrap = true;
		conteneur.bulleMc_bg.commentaire._visible=true;
		conteneur.bulleMc_bg.commentaire.text = commentaire;*/
		
		
		//On attache un champ teste et on lui mettra un fond
		conteneur.createTextField("commentaire", 5, -imageL ,20+imageH , 190, 100);
		conteneur.commentaire.setNewTextFormat(formatCommentaireBold);
		conteneur.commentaire.selectable = false;
		conteneur.commentaire.multiline = true;
		conteneur.commentaire.autoSize = true;
		conteneur.commentaire.wordWrap = true;
		conteneur.commentaire.background = true;
		conteneur.commentaire.backgroundColor = 0xffcc99;
		conteneur.commentaire.border = true;
		conteneur.commentaire.borderColor = 0x0000ff;
		conteneur.commentaire._visible=false;
		conteneur.commentaire.text = commentaire;
		
		//On dimensionne les champs texte en fonction de son contenu
		/*conteneur.bulleMc_bd._height = conteneur.commentaire._height + 15;
		conteneur.bulleMc_bd._width = conteneur.commentaire._width + 15;
		conteneur.bulleMc_bd_tour._height = conteneur.commentaire._height + 18;
		conteneur.bulleMc_bd_tour._width = conteneur.commentaire._width + 15;
		
		conteneur.bulleMc_bg._height = conteneur.commentaire._height + 5;
		conteneur.bulleMc_bg_tour._height = conteneur.commentaire._height + 5;
		
		conteneur.bulleMc_hg._height = conteneur.commentaire._height + 5;
		conteneur.bulleMc_hg_tour._height = conteneur.commentaire._height + 5;
		
		conteneur.bulleMc_hd._height = conteneur.commentaire._height + 5;
		conteneur.bulleMc_hd_tour._height=conteneur.commentaire._height + 5;*/
		
		//On crée la zone texte pour le nom
		conteneur.image.createTextField("nomUnite", 2, 0 , imageH, imageL, 30);
		conteneur.image.nomUnite.setNewTextFormat(formatNom);
		conteneur.image.nomUnite.selectable = false;
		conteneur.image.nomUnite.autoSize=true;
		conteneur.image.nomUnite.text = nom;
		
		//On crée la zone texte pour la suite du nom
		conteneur.image.createTextField("nomUnite2", 3, 0 ,15+imageH, imageL, 30);
		conteneur.image.nomUnite2.setNewTextFormat(formatNom);
		conteneur.image.nomUnite2.selectable = false;
		conteneur.image.nomUnite2.autoSize=true;
		conteneur.image.nomUnite2.text = nom2;
		
		
		

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
	function comportement(monCommentaire)
	{
		
		var o=this;
		//Comportement lors d'un rollOver
		
		conteneur.onRollOver=function()
		{
			this.commentaire._visible=true;
			trace("conteneur.bulleMc_bd._width"+this.bulleMc_bd._width)
			switch (true)
			{
				//case (this._x <= 660-this.bulleMc_hd._width && this._y >= this.bulleMc_hd._height):
			case (this._x >= 660-this.commentaire._width && this._y >= 360-(this.commentaire._height + imageH)):
				trace("en bas, à droite")
				this.commentaire._x = -140;
				this.commentaire._y = -imageH-this.commentaire._height;
				//this.bulleMc_hd._visible = true;
				//this.pointe_hd._visible = true;
				
				break;

				//case (this._x <= 660-this.bulleMc_hd._width && this._y < this.bulleMc_hd._height):
			case (this._x <= 0.5*this.commentaire._width && this._y >= 360-(this.commentaire._height + imageH)):
				trace("en bas ,à gauche")
				this.commentaire._x = 0;
				this.commentaire._y = -imageH-this.commentaire._height;
				//this.bulleMc_bd._visible = true;
				//this.pointe_bd._visible = true;
				break;
				//case (this._x > 660-this.bulleMc_hd._width && this._y < this.bulleMc_hd._height):
			case (this._x >= 0.5 * this.commentaire._width && this._y >= 360-(this.commentaire._height + imageH)):
				trace("en bas milieu")
				this.commentaire._x = -60-imageL;
				this.commentaire._y = -imageH-this.commentaire._height;
				//this.bulleMc_bg._visible = true;
				//this.pointe_bg._visible = true;
				break;
				//case (this._x > 660- this.bulleMc_hd._width && this._y >=this.bulleMc_hd._height):
			case (this._x > 660 - this.commentaire._width && this._y >= 10):
				trace("haut à droite")
				this.commentaire._x = -140;
				this.commentaire._y = 60 + imageH;
				//this.bulleMc_hg._visible = true;
				//this.pointe_hg._visible = true;
				break;
			case (this._x <= 0.5*this.commentaire._width && this._y >= 10):
				trace("haut à gauche")
				this.commentaire._x = 0;
				this.commentaire._y = 60 + imageH;
				//this.bulleMc_hg._visible = true;
				//this.pointe_hg._visible = true;
				break;
			case (this._x >= 0.5 * this.commentaire._width && this._y >= 10):
				var test:Number = 360 - (this.commentaire._height + imageH);
				trace("haut  milieu" + test)
				trace("haut  milieu"+this._y)
				this.commentaire._x = -60-imageL;
				this.commentaire._y = 60 + imageH;
				//this.bulleMc_hg._visible = true;
				//this.pointe_hg._visible = true;
				break;
			default:
				trace("au milieu")
				this.commentaire._x = -imageL;
				this.commentaire._y = 20 + imageH;
				//this.bulleMc_hd._visible = false;
				//this.pointe_hd._visible = true;
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
						Mouse.hide();
						/*switch (true)
						{
							case (this.bulleMc_hd._visible==true):
							this.bulleMc_hd_tour._visible = true;
							this.pointe_hd_tour._visible = true;
							break;
							case (this.bulleMc_bd._visible==true):
							this.bulleMc_bd_tour._visible = true;
							this.pointe_bd_tour._visible = true;
							break;
							case (this.bulleMc_bg._visible==true):
							this.bulleMc_bg_tour._visible = true;
							this.pointe_bg_tour._visible = true;
							break;
							case (this.bulleMc_hg._visible==true):
							this.bulleMc_hg_tour._visible = true;
							this.pointe_hg_tour._visible = true;
							break;
							
							
							
							
						}*/
						this.commentaire._visible = true;
						this.commentaire.borderColor = 0xff00ff;
						this.commentaire.backgroundColor = 0xffb18a;
					}else {
						delete this.onEnterFrame;
						Mouse.show();
						this.enabled = true;
						rollUtilise = true;
						/*this.bulleMc_hg_tour._visible = false;
						this.pointe_hg_tour._visible = false;
						this.bulleMc_hd_tour._visible = false;
						this.pointe_hd_tour._visible = false;
						this.bulleMc_bg_tour._visible = false;
						this.pointe_bg_tour._visible = false;
						this.bulleMc_bd_tour._visible = false;
						this.pointe_bd_tour._visible = false;*/
						this.commentaire._visible = true;
						this.commentaire.borderColor = 0x0000ff;
						this.commentaire.backgroundColor = 0xffcc99;
					}
				}
			}
		}
		//Comportement lors d'un rollOut
		conteneur.onRollOut=function()
		{
			/*this.bulleMc_hg._visible = false;
			this.pointe_hg._visible = false;
			this.bulleMc_hd._visible = false;
			this.pointe_hd._visible = false;
			this.bulleMc_bg._visible = false;
			this.pointe_bg._visible = false;
			this.bulleMc_bd._visible = false;
			this.pointe_bd._visible = false;*/
			this.commentaire._visible=false;
			
		}
		
		//Comportement lorsqu'on clique dessus
		conteneur.onPress=function()
		{ 
			
			startDrag(this.image[icone+"Mc"], true, 20, 20, 600, 300);
			/*this.bulleMc_hg._visible = false;
			this.pointe_hg._visible = false;
			this.bulleMc_hd._visible = false;
			this.pointe_hd._visible = false;
			this.bulleMc_bg._visible = false;
			this.pointe_bg._visible = false;
			this.bulleMc_bd._visible = false;
			this.pointe_bd._visible = false;*/
			this.commentaire._visible=false;
			o.drag=true;
			o.relache=false;
		}
		conteneur.onRelease=function()
		{
			stopDrag();
			o.drag=false;
			o.relache=true;

		}
		conteneur.onReleaseOutside=function()
		{
			stopDrag();
			o.drag=false;
			o.relache=true;

		}
		conteneur.onMouseMove = function()
		{
			o.posX=this._x;
			o.posY=this._y;

		}
	}

}