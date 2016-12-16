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
class tri extends MovieClip
{
//variables demandées lors de la création d'une occurence
public var noOccurence:Number;//numéro de l'occurence
public var posX:Number; //position X du clip unite
public var posY:Number; //position Y du clip unite
public var posXdep:Number; //position X de départ du clip unite
public var posYdep:Number; //position Y de départ du clip unite
public var tailleX:Number; //tailleX du clip
public var tailleY:Number; //tailleY du clip
public var imageL:Number; //largeur de l'image
public var imageH:Number; //hauteur de l'image
public var nom:String; //nom de l'unite
public var nom2:String;//suite du nom de l'unité
public var icone:String; //nom du fichier icone
public var logo:String; //nom du fichier logo
public var commentaireTxt:String; //commentaire associé
public var categorie:String; //Catégorie d'unité: longueur, aire, volume, capacité, masse...
public var categorieSac:String;//categorie du sac sur lequel on a placé le clip
public var uSI:Number; //conversion dans l'unité de base du SI
public var logoClip:MovieClip; //Clip pour l'affichage du logo du clip
//public var numeroElementTire:Number;
public var tailleDep:Number;//taille de départ
public var taillePetit:Number;//taille lorsqu'il est petit, dans le sac
public var monErreur:Boolean;
public var corrige:Boolean = false;
public var presse:Boolean = false;//indique si on a cliqué sur le clip
public var contenu:Boolean; //indique si on a pressé sur contenu;
public var surSacTri:Boolean; //indique si le clip est sur un sac

//variables retournées
public var drag:Boolean=false; //indique si le clip est en train d'être dragué
public var rollUtilise:Boolean=false; //pas encore créé
public var relache:Boolean = false; //pas encore créé
public var over:Boolean;//Si on est sur le clip et qu'on a pas encore pressé
public var elementTireNoMonUnite:Number;//numéro associé au nom du clip


//autres variables
public var conteneur:MovieClip; //clip contenant la case
public var conteneurLogo:MovieClip; //clip contenant le logo

public var niveau:Number;//Niveau du clip
public var testRollOver:Boolean;//Indicateur de l'état de survol du clip fondMc

private var nomDossierImage:String="unitesImages"; //Nom du dossier dans lequel se trouvent les images. **********************ATTENTION AU NOM DE CE DOSSIER SUR PARASCHOOL!!*****
private var formatCommentaire:TextFormat; //format pour le commentaire
private var formatCommentaireBold:TextFormat; //format pour le commentaire
private var formatNom:TextFormat; //format pour le nom de l'unité
private var proportionClip:Number;//donne la proportion entre la longueur et la largeur du clip
private var dragTemp:Boolean;//Pour récupérer l'état du grac dans les onPress-onRelease
private var leClip:MovieClip;
private var visibiComment:Boolean;

private static var numInstances:Number = 0; 

static function get instances():Number { 
 return numInstances; 
} 


	function tri(tailleImageTemp,taillePetitTemp, positionX, positionY, formatCommentaireTemp, formatCommentaireTemp2, formatNomTemp, clipConteneur, nomTemp, nomTemp2, iconeTemp, logoTemp,categorieTemp,uSITemp, commentaireTemp)
	{
		numInstances++;
		noOccurence = numInstances-1;
		//trace("noOccurence" + noOccurence);
		tailleX = tailleImageTemp;
		tailleDep = tailleImageTemp;
		taillePetit = taillePetitTemp;
		//trace("taillePetit initialisation"+tailleDep)
		posX = positionX;
		posY = positionY;
		posXdep = positionX;
		posYdep = positionY;
		formatCommentaire = formatCommentaireTemp;
		formatCommentaireBold=formatCommentaireTemp2;
		formatNom=formatNomTemp;
		conteneur=clipConteneur;
		categorieSac = "depart";
		contenu = false;
		corrige = false;
		//Ces variables proviennent du fichier xml
		nom = nomTemp;
		nom2 = nomTemp2;
		icone = iconeTemp;

		trace("icone"+icone)
		logo=logoTemp;
		categorie=categorieTemp;
		uSI=uSITemp;
		commentaireTxt = commentaireTemp;
		leClip = this;
		visibiComment = true;
		
		//on lance la création du clip
		dessineLeClip();
		comportement(commentaireTxt);
		
		
	}
	function dessineLeClip()
	{
		//trace("icone: " + icone)
		//trace("")
		//trace("taillePetit "+taillePetit)
		conteneur.drag=false;
		conteneur.rollUtilise = false;
		//On crée la zone image sur la base
		//sur un fond 
////////////////////////////ATTENTION ON NE PEUT PAS METTRE DE PNG DANS FLASH 6
		conteneur.createEmptyMovieClip("image",0);
		conteneur.image.attachMovie(icone,icone+"Mc",1);
		proportionClip=conteneur.image[icone+"Mc"]._height/conteneur.image[icone+"Mc"]._width
		conteneur.image[icone+"Mc"]._width=tailleX;
		conteneur.image[icone+"Mc"]._height=tailleX*proportionClip;
		imageL = tailleX;
		imageH = tailleX * proportionClip;

		//On attache un champ teste et on lui mettra un fond, si le commentaire n'est pas vide
		if (commentaireTxt != "vide") {
			//conteneur.image.enabled = true;
			trace("commentaireTxt"+commentaireTxt)
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
			conteneur.commentaire._visible = false;
			//conteneur.commentaire.html = true;
			//conteneur.commentaire.htmlText = commentaireTxt;
			conteneur.commentaire.text = commentaireTxt;
		}
		

		//trace("nom.llength"+nom);
		//On crée la zone texte pour le nom, si le nom n'est pas vide
		if (nom != "vide") {
			//si nom2 est vide
			if (nom2=="vide"){
				conteneur.image.createTextField("nomUnite", 2, -tailleX/2, -imageH/2-5, tailleX, 30);
				conteneur.image.nomUnite.setNewTextFormat(formatNom);
				conteneur.image.nomUnite.selectable = false;
				//conteneur.image.nomUnite.autoSize = true;
				//conteneur.image.nomUnite.border=true;
				conteneur.image.nomUnite.text = nom;
			}else {
				conteneur.image.createTextField("nomUnite", 2, -tailleX/2, -imageH/2-20, tailleX, 30);
				conteneur.image.nomUnite.setNewTextFormat(formatNom);
				conteneur.image.nomUnite.selectable = false;
				//conteneur.image.nomUnite.autoSize = true;
				//conteneur.image.nomUnite.border=true;
				conteneur.image.nomUnite.text = nom;
			}
		}
		
		//On crée la zone texte pour la suite du nom, si le nom2 n'est pas vide
		if (nom2!="vide"){
			conteneur.image.createTextField("nomUnite2", 3, -tailleX/2 ,-imageH/2-5, tailleX, 30);
			conteneur.image.nomUnite2.setNewTextFormat(formatNom);
			conteneur.image.nomUnite2.selectable = false;
			//conteneur.image.nomUnite2.autoSize=true;
			conteneur.image.nomUnite2.text = nom2;
		}
		
		

	}
	//Gère La Taille de l'image à l'intérieur du clip conteneur avec le nom
	function setTaille(maTailleX)
	{
		//On enregistre l'ancien format 
		var formatOld:Number=formatNom.size;
		//On redimensionne l'image
		conteneur.image._width=maTailleX;
		conteneur.image._height = maTailleX * proportionClip;
		//trace ("proportion dans setTaille: "+proportionClip)

		imageL=conteneur.image._width;
		imageH=conteneur.image._height;
		conteneur.nomUnite._x=maTailleX/2
		conteneur.nomUnite._y=maTailleX * proportionClip
		//on applique le nouveau et on rétablit l'ancien pour les autres unites
		formatNom.size=(maTailleX/tailleX)*formatNom.size;
		if (formatNom.size<7)
		{
			formatNom.size=7;
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
		//trace("tri.as, setPosition, X" + maPositionX)
		//trace("tri.as, setPosition, Y" + maPositionY)
		//trace("nom: "+nom)
		conteneur._x=maPositionX;
		conteneur._y=maPositionY;
		posX = conteneur._x;
		posY = conteneur._y;
		//trace("leClip"+leClip)
		//trace("conteneur"+conteneur)
		//trace("this"+this)
		//trace("conteneur._x"+conteneur._x)
	}
	function setAlpha(nb)
	{
		conteneur._alpha = nb;
	}
	
	function setCommentaireVisible(etat:Boolean)
	{
		if (etat==true){
			visibiComment = true;
	
		}else if(etat==false){
			visibiComment = false;
		}
	}
	//On gère la visiblité
	function visibilite(etat)
	{
		//trace("tri.as etat visibilite" + etat);
		//trace("nom: "+nom)
		if (etat==true){
			conteneur._visible=true;
	
		}else if(etat==false){
			conteneur._visible=false;
	
		}
	}
	//On gère la propriété enabled
	function active(etat)
	{
		//trace("tri.as etat active(enabled)" + etat);
		//trace("nom: "+nom)
		if (etat==true){
			conteneur.enabled=true;
	
		}else if(etat==false){
			conteneur.enabled=false;
	
		}
	}

	function comportement(monCommentaire)
	{
		
		var o=this;
		//Comportement lors d'un rollOver
		
		conteneur.onRollOver=function()
		{
			//trace("???????????????  RollOver "+o.niveau)
			o.testRollOver = true;
			//trace("tailleDep: " + o.tailleDep)
			if(o.contenu==true){
				o.setTaille(o.tailleDep * 1);
				o.setAlpha(100);
			}
			if(o.visibiComment==true){
				o.over = true;
				this.commentaire._visible=true;
				//trace("conteneur.bulleMc_bd._width"+this.bulleMc_bd._width)
				switch (true)
				{
				case (this._x >= 660-this.commentaire._width && this._y >= 360-(this.commentaire._height + imageH)):
					//trace("en bas, à droite")
					this.commentaire._x = -140;
					this.commentaire._y = -imageH-this.commentaire._height;	
					break;
				case (this._x <= 0.5*this.commentaire._width && this._y >= 360-(this.commentaire._height + imageH)):
					//trace("en bas ,à gauche")
					this.commentaire._x = 0;
					this.commentaire._y = -imageH-this.commentaire._height;
					break;
				case (this._x >= 0.5 * this.commentaire._width && this._y >= 360-(this.commentaire._height + imageH)):
					//trace("en bas milieu")
					this.commentaire._x = -60-imageL;
					this.commentaire._y = -imageH-this.commentaire._height;
					break;
				case (this._x > 660 - this.commentaire._width && this._y >= 10):
					//trace("haut à droite")
					this.commentaire._x = -140;
					this.commentaire._y = 60 + imageH;
					break;
				case (this._x <= 0.5*this.commentaire._width && this._y >= 10):
					//trace("haut à gauche")
					this.commentaire._x = 0;
					this.commentaire._y = 60 + imageH;
					break;
				case (this._x >= 0.5 * this.commentaire._width && this._y >= 10):
					var test:Number = 360 - (this.commentaire._height + imageH);
					//trace("haut  milieu" + test)
					//trace("haut  milieu"+this._y)
					this.commentaire._x = -60-imageL;
					this.commentaire._y = 60 + imageH;
					break;
				default:
					//trace("au milieu")
					this.commentaire._x = -imageL;
					this.commentaire._y = 20 + imageH;
					break;
					
				}
				if (rollUtilise == false)
				{
					//trace("rollUtililse"+monCommentaire)
					if (monCommentaire != "vide") {
						var custom:timer = new timer(500);
						this.onEnterFrame = function()
						{
							if (custom.fin() == false)
							{
								this.enabled = false;
								//Mouse.hide();
								this.commentaire._visible = true;
								this.commentaire.borderColor = 0xff00ff;
								this.commentaire.backgroundColor = 0xffb18a;
							}else {
								delete this.onEnterFrame;
								//Mouse.show();
								this.enabled = true;
								rollUtilise = true;
								this.commentaire._visible = true;
								this.commentaire.borderColor = 0x0000ff;
								this.commentaire.backgroundColor = 0xffcc99;
							}
						}
					}
					
				}

			}
			
		}
		//Comportement lors d'un rollOut
		conteneur.onRollOut=function()
		{
			//trace("???????????????  RollOut "+o.niveau)
			o.testRollOver = false;
			//trace("o.testRollOver "+o.testRollOver)
			//trace("taillePetit"+o.taillePetit)
			//Si il est sur le sac
			if(o.contenu==true){
				o.setTaille(o.taillePetit);
				o.setAlpha(80);
			}
			this.commentaire._visible=false;
			o.over = false;
		}
		
		//Comportement lorsqu'on clique dessus
		conteneur.onPress=function()
		{ 
			//trace ("o.categorieSac"+o.categorieSac)
			if (o.categorieSac != "depart"&& o.contenu==true) {
				o.monErreur = true;
			}else{
				
				o.over = false;
			//if(o.monErreur!=true){
				this.startDrag( true, 20, 20, 600, 300);
				this.commentaire._visible=false;
				o.drag=true;
				
			}
			o.relache = false;
			o.presse = true;
		}
		conteneur.onRelease=function()
		{
/*			if (o.categorieSac != "depart")
			{
				o.monErreur = true;	
			}*/
			this.stopDrag();
			o.drag = false;
			o.relache = true;
			o.presse = false;
			o.testRollOver = false;
		}
		conteneur.onReleaseOutside=function()
		{
			this.stopDrag();
			o.drag=false;
			o.relache = true;
			o.presse = false;
			o.testRollOver = false;
		}
		conteneur.onMouseMove = function()
		{
			o.posX=this._x;
			o.posY=this._y;

		}
	}
	function getVisibilite():Boolean
	{
		return conteneur._visible;
	}

}