/**
 * ...
 * @author Jean-Michel LUTHI
 */
 _level0.rep_juste = false;
 
//DEFINIES DANS unitesIni:

//Gestion des couches sur le fond:
var niveauUnite:Number;
var niveauUniteChoisie:Number;
var niveauBoutons:Number;
var niveauObjetsDivers:Number;
var niveauConteneurPhotos:Number;
var niveauFleches:Number;
var niveauCarres:Number;
var niveauCubes:Number;
var niveauMasses:Number;
var niveauTextes:Number;
var niveauModifiables:Number;
var niveauBulles:Number;

//Donnera le nombre d'élément du XML
var nbTot:Number;
//nombre de clip à extraire (doit être plus petit ou égal au nombres total de clips)
var nbClip:Number;
//nombre maximum de fleches 
var nbMaxFleches:Number;
//nombre maximum de carres 
var nbMaxCarres:Number;
//nombre maximum de cubes 
var nbMaxCubes:Number;
//nombre maximum de masses 
var nbMaxMasses:Number;

//Liste des élements tirés
var elementsTires:Array;
//On fixe la taille du clip, la hauteur, en proportion, est définie dans unite
var tailleClipL:Number;
var tailleClipA:Number;
var tailleClipV:Number;
var tailleClipM:Number;

//nb de flèches Max 
var nbXMaxL:Number;
var nbYMaxL:Number;
var nbZMaxL:Number;

//nb de carres Max dans chaque direction
var nbXMaxA:Number;
var nbYMaxA:Number;
var nbZMaxA:Number;

//nb de cube Max dans chaque direction
var nbXMaxV:Number;
var nbYMaxV:Number;
var nbZMaxV:Number;

//nb de cube Max dans chaque direction
var nbXMaxM:Number;
var nbYMaxM:Number;
var nbZMaxM:Number;

//Position du cube de départ
var posDepFlecheXIni:Number;
var posDepFlecheYIni:Number;
var posDepFlecheX:Number;
var posDepFlecheY:Number;

//Position du cube de départ
var posDepCarreXIni:Number;
var posDepCarreYIni:Number;
var posDepCarreX:Number;
var posDepCarreY:Number;

//Position du cube de départ
var posDepCubeXIni:Number;
var posDepCubeYIni:Number;
var posDepCubeX:Number;
var posDepCubeY:Number;

//Position de la masse de départ
var posDepMasseXIni:Number;
var posDepMasseYIni:Number;
var posDepMasseX:Number;
var posDepMasseY:Number;

//variable pour qui va donner le changement de couche dans le dessin du cube
var k:Number;
//On definit un liste d'étiquettes correspondant aux clips créés
var listeIni:Array = new Array();
//On défini un position aléatoire des clips
var maListeAlea:Array = new Array();
//On fait une copie des la liste originale
var listeCopie:Array = new Array();
//Tableau qui indique les chois d'unites à transformer possibles
var tirageDeBase:Array = new Array(1, 2, 3, 4 );

//On fixe la position de clip au départ:
var posClipDepX:Number;
var posClipDepY:Number;
//On crée un tableau qui contiendra les occurences des unités
var monUnite : Array = new Array();

//On crée un tableau qui contiendra les occurences des unités
var monUniteFond : Array = new Array();

//numéro du clip
var numero:Number;
//compte la position de numero dans la liste
var posNumero:Number;

//On crée un tableau qui contiendra les occurences des unités
var monUnite : Array = new Array();

//Longueur à transformer
var longTransf:Number;
//Aire à transformer
var aireTransf:Number;
//Volume à transformer
var volTransf:Number;
//Masse à transformer
var masseTransf:Number;

//variables qui contiendront la clip de base à transformer
var longueurBase:Array=new Array();
var aireBase:Array=new Array();
var volumeBase:Array = new Array();
var masseBase:Array=new Array();

//Puis celles qui contiendront tous les clips
var longueurC:Array=new Array();
var aireC:Array=new Array();
var volumeC:Array = new Array();
var masseC:Array = new Array();

//Puis celles qui seront modifiables
var longueurModif:Array=new Array();
var aireModif:Array=new Array();
var volumeModif:Array = new Array();
var masseModif:Array = new Array();

//Variable qui donne le nombre detransformations d'unités à faire
var nbDeTransformationsAFaire:Number;
var nbDeTransformationsFaites:Number = 0;

//DEFINIES DANS unitesAction
//On crée un tableau qui contiendra les réponses, si on a mis les unitées dans le bon sac ou pas
var nouvelleTaille:Number;
var sacObjet:Array = new Array();
var posClip:String;
var typeUnite:String;
var typeUniteATransformer:String;
var uniteATransformer:Array = new Array();
var listeMot:Array = new Array(); //défini dans la fonction accord()

var noClip:Number; //variable qui donne le numéro du clip sur lequel on a pressé et qui affiche le clip que l'on va modifier.
//variables pour unifier l'affichage de lobjet à trasformer et de l'objet modifiable
var affichageATransformer:Number = 1;
var correctionValeur:Number = 1;
var tirage:Array = new Array();
