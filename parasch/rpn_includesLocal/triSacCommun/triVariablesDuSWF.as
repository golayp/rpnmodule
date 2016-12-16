/**
 * ...
 * @author Jean-Michel LUTHI
 */
 
//DEFINIES DANS unitesIni:
var ratio:Number=360/660
//Gestion des couches sur le fond:
var niveauUnite:Number;
var niveauSac:Number;
var niveauObjetsDivers:Number;
var niveauConteneurPhotos:Number;
var niveauBulles:Number;

//Donnera le nombre d'élément du XML
var nbTot:Number;
//nombre de clip à extraire (doit être plus petit ou égal au nombres total de clips)
var nbClip:Number;
//_level0.liste des élements tirés
var elementsTires:Array;
//On fixe la taille du clip, la hauteur est en proportion, définit dans unite et la taille des clips dans le sac
var tailleClip:Number;
var tailleClipPetit:Number;
//On definit un _level0.liste d'étiquettes correspondant aux clips créés
_level0.listeIni = new Array();
//On définit les catégories des clips pour le tri, avec leur nombre.
_level0.listeCategorie = new Array();
//On définit un nouveau tableau qui contient les catégories et les longueurs des mots
var categorieLong:Array = new Array();
var longueurDuPlusLong:Number=0;
var nbCategories:Number = 0;

_level0.retour = "Tu n'as encore rien trié.";
//tableau contenant le position des clips (sur quel sac ou pas encore trié
var clipSac:Array = new Array();

//On fixe la position de clip au départ:
var posClipDepX:Number;
var posClipDepY:Number;
//On crée un tableau qui contiendra les occurences des unités
var monUnite : Array = new Array();

//numéro du clip
var numero:Number;
//compte la position de numero dans la _level0.liste
var posNumero:Number;

//On crée un tableau qui contiendra les occurences des unités
var monUnite : Array = new Array();

//Position des sacs
var cX:Number;
var cY:Number;
//DEFINIES DANS unitesAction
//On crée un tableau qui contiendra les réponses, si on a mis les unités dans le bon sac ou pas
var sacObjet:Array = new Array();
var posClip:String="vide";
//var boutonSourisHaut:Boolean = false;
var correction:Boolean = false;

//On définit une variable pour savoir si le clip est dans le sac
var surSac:Boolean = false;

//DEFINIES dans triUnitesAnalyse
//Vriables pour tout ce qui est des retours dans les bulles et dans actionSolution
var retoursSol:Array = new Array();
var retours:Array = new Array();

//DEFINIES dans triUnitesBoutons
var nbFautes:Number=0;
var nbFautesRestantes:Number;

//Tableau contenant le nombre d'éléments dans chaque sac
var nbElementsSac:Array = new Array();
var sacActif:Number;

//variable qui vaut true si un clip est en train d'être corrigé. Utilisé dans triAction et analyse pour savoir quelle bulle on va rendre visible 
var correctionsEnCours:Boolean = false;
//Indicateur d'action solution si on a pressé sur le bouton solution, il ne faut pas refaire vérifier
var actionSolutionEnCours:Boolean = false;