/**
 * ...
 * @author Jean-Michel LUTHI
 */
 
//DEFINIES DANS unitesIni:

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
//On fixe la taille du clip, la hauteur est en proportion, définit dans unite
var tailleClip:Number;
//On definit un _level0.liste d'étiquettes correspondant aux clips créés
var _level0.listeIni:Array=new Array();

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


//DEFINIES DANS unitesAction
//On crée un tableau qui contiendra les réponses, si on a mis les unitées dans le bon sac ou pas
var sacObjet:Array = new Array();
var posClip:String;
var boutonSourisHaut:Boolean=false;

//DEFINIES dans triUnitesAnalyse

var retours:Array=new Array();

//DEFINIES dans triUnitesBoutons
var nbFautes:Number=0;
var nbFautesRestantes:Number