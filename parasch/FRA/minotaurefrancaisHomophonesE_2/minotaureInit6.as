/**
 * ...
 * @author Michel Roquier
 */

//Initialisation du bouton fondMc.verifier_btn
fondMc.verifier_Btn._visible=false;

//On crée le bouton okBtn
fondMc.attachMovie("btnOK","okBtn",-1);
fondMc.okBtn._x=590;
fondMc.okBtn._y=300;
fondMc.okBtn._visible=false;

//On décide si on veut mettre un exercice correctif, à mettre dans choixCorrectif.as
var exerciceCorrectif:Boolean=false;
//On choisit si on veut voire la consigne
consigneTxt._visible=false;
//Initialisation des dimensions de la zone écran utilisée
var largeurEcran = 660;
var hauteurEcran = 360;
var marge = 20;

//Initialisation des dimensions de la grille 
var nbCasesX  =5;
var nbCasesY = 4;
var monNb=0;
var rapportLongLarg=1.55;

//Calcul de la mesure du coté de la Case
var coteCase;
coteCase = Math.min(Math.floor((largeurEcran-40) / nbCasesX),Math.floor((hauteurEcran-40) / nbCasesY));
texteHaut_fmt.size=Math.floor(coteCase/5.8);
texteBas_fmt.size=Math.floor(coteCase/5.8);
texteES_fmt.size=Math.floor(coteCase/5.5);
texteESG_fmt.size=Math.floor(coteCase/5);
//Initialisation des coordonnées du point de départ
var departX = Math.ceil(Math.random() * nbCasesX);
var departY = 1;

//Déclaration des coordonnées du point d'arrivée
var arriveeX;
var arriveeY;

//On fait un tableau avec un dégradé de couleur
var maCouleur:Array=new Array();

////////////////////////////////////////////////ICI ON INITIALISE LA COULEUR DE DéPART DU DéGRADé//////////////////////////////////////
////////////////on définit alea1, alea2, alea3 qui sont les couleurs sur lequel agit le dégradé///////////////////
////////////////////////////On enlève 531 et 351 qui donnent du trop foncé et mauvais contraste On obtient les vert brun kaki////////////////////////
var tableauAleatoire:Array=new Array([5,1,3],[1,5,3],[1,3,5],[3,1,5]);
var alea:Array=new Array;
alea=tableauAleatoire[Math.floor(Math.random()*4)];
//trace(alea);
////////////////Ici on agit avec les codes entre 0-255 pour RVB en tenant compte du nombre de cases///////////////////////////
//couleurNombre=deciHexa(Math.floor(Math.pow(16,1+Math.random()))*Math.pow(16,4)+Math.floor(Math.pow(16,1+Math.random()))*Math.pow(16,2)+Math.floor(Math.pow(16,1+Math.random())));

////////////////Ici on agit sur chaque caractère de la couleur, on les veut pastelles/////////////////
if (alea[2]=="5")
{
	var aleaY:Number=Math.random()*3+12;
	var aleaX:Number=Math.random()*1.5+13.5;
}else{
	var aleaY:Number=Math.random()*(15-nbCasesY)+nbCasesY;
	var aleaX:Number=Math.random()*(15-nbCasesX)+nbCasesX;
}
/*trace("alea"+alea[2]);
trace("aleaY"+aleaY);
trace("aleaX"+aleaX);*/
couleurNombre=Math.ceil(Math.ceil((aleaY))*Math.pow(16,alea[0])+Math.ceil((Math.random()*5+10))*Math.pow(16,4)+Math.ceil((aleaX))*Math.pow(16,alea[1])+Math.ceil((Math.random()*5+10))*Math.pow(16,2)+Math.ceil((Math.random()*5+10))*Math.pow(16,alea[3])+Math.ceil((Math.random()*5+10)));
//////////////Ici on change le code deécimal en code hexdécinmal de la couleur. On aurait pas besoin car d toute façon après on la retransforme en décimal avec Number//////////////////////////////////
var couleurDegrade=deciHexa(couleurNombre);

for(i=1;i<=nbCasesY;i++)
{
	for(j=1;j<=nbCasesX;j++)
	{
		
////////////////////////////////////////////////ICI ON REALISE LE DEGRADE LE 5 ET LE 3 DONNE L'ENDROIT OÙ ON MODIFIE LA COULEUR//////////////////////////////////////
		maCouleur[monNb]=Number(couleurDegrade)-Math.pow(16,alea[0])*i-Math.pow(16,alea[1])*j-Math.pow(16, alea[2]);
		monNb++
	}
}

//Initialisation des couleurs
var couleurFondGrille = 0xff33ff;
var couleurFondGrilleAlpha = 100;
var couleurEvidenceCase;
couleurEvidenceCase=Number(0xffffff)-couleurFondGrille;
var couleurDepartArrivee = 0xC6CBE8;
var couleurDepartArriveeAlpha = 30;
var couleurDepartArriveeEvidence;
couleurDepartArriveeEvidence=Number(0xffffff)-couleurDepartArrivee;
var couleurChemin = 0x0033ff;
var couleurCheminAlpha = 30;

//Initialisation des caractéristiques des flèches utilisées pour montrer le chemin
var couleurFlecheChemin = 0xffff00;//couleur de la flèche
var couleurBordFlecheChemin = 0xff6600;//couleur du bord de la flèche
var epaisseurBordFlecheChemin = 1.5;//épaisseur du bord de la flèche

//Couleur et epaisseur du fil
var couleurFilChemin=0xFF0000;
var epaisseurFilChemin = 2;
var couleurFilParcours = 0x00FF00 ;
var epaisseurFilParcours = 2;

//Initialisation des caractéristiques des flèches utilisées pour baliser le parcours
var couleurFlecheParcours = 0x000000;//couleur de la flèche
var couleurBordFlecheParcours = 0xffffff;//couleur du bord de la flèche
var epaisseurBordFlecheParcours = 2;//épaisseur du bord de la flèche

//Initialisation des caractéristiques des lignes utilisées pour montrer les fautes
var couleurMur = 0xff0000;//couleur de la ligne
var couleurBordMur = 0x990000;//couleur du bord de la ligne
var epaisseurBordMur = 1;//épaisseur du bord de la ligne

//Calcul Longueur minimale du chemin
var longCheminMin = nbCasesX + nbCasesY;

//Calcul Longueur maximale du chemin
var longCheminMax = (nbCasesX * nbCasesY);


//Tableaux contenant les reponses: reponse est le tableau global et reponseChemin celui pour savoir si le chemin suivi est juste.
var reponse : Array = new Array();
var reponseGlobal:Array= new Array ();
var reponseChemin:Array = new Array();//juste,faux, faux, juste.... remis en arrière si une erreur est réparée.
var reponseCheminGlobal:Array = new Array();//juste,faux, faux, juste.... PAS remis en arrière si une erreur est réparée. On peut donc revoir TOUTES les erreurs

//Déclaration variable longueur chemin
var longueurCheminParcouru;

//On crée un tableau qui contiendra les coordonnées descases pressées.
var caseChemin:Array = new Array();

//on met les valeurs du départ dans caseChemin
caseChemin[0][0] = departX;
caseChemin[0][1] = departY;
longueurCheminParcouru = 1;


//on crée une vaiable qui compte le npmbre de clics sur une case
_global.compteurClic = 0;


var parcours : Array = new Array ();
parcours[0][0]=departX;
parcours[0][1]=departY;
var tableauCoordonnees:Array = new Array();
var avantDerniereCase:Array = new Array();
//On met les coordonnées de la case de départ dans avantDerniereCase
avantDerniereCase[0] = departX;
avantDerniereCase[1] = departY;
var retourArriere:Boolean;
retourArriere=false;
var fauteRestante:Boolean;

//Attention, les case sont repérées par leur numéro, pas par leur coordonnées (exemple: maCase45)

//Fonction Convertir les coordonnées x, y en no de case
function noCase (coordX, coordY)
{
	var no = (coordY - 1) * nbCasesX + coordX;
	return(no);
}

//fonction qui convertit le numéro de la case en coordonnées.
function retourCoordonneeCase (numero)
{
	var monTableau:Array = new Array(2);
	if ((numero % nbCasesX ) == 0)
	{
		monTableau[0] = 9;
	}else
	{
		monTableau[0] = numero % nbCasesX ;
	}
	monTableau[1] = Math.ceil(numero / nbCasesX);
	return monTableau;
}

//fonction qui convertit un décimal en hexdécimal, utilisé pour les couleurs
function deciHexa (nbDeci)
{
	var res;
	var nbInt;
	var b10;
	res="";
	for(i=0;i<6;i++)
	{
		b10=(nbDeci%(Math.pow(16,i+1))/Math.pow(16,i));
		res=ecritureHexa(b10)+res;
		nbDeci=nbDeci-nbDeci%(Math.pow(16,i+1));
	}
	res="0x"+res;
	return res;
}

function ecritureHexa(deci)
{
	var val=deci.toString();
	var maVal;
	switch(val)
	{
		case "0":
		maVal="0";
		break;
		case "1":
		maVal="1";
		break;
		case "2":
		maVal="2";
		break;
		case "3":
		maVal="3";
		break;
		case "4":
		maVal="4";
		break;
		case "5":
		maVal="5";
		break;
		case "6":
		maVal="6";
		break;
		case "7":
		maVal="7";
		break;
		case "8":
		maVal="8";
		break;
		case "9":
		maVal="9";
		break;
		case "10":
		maVal="A";
		break;
		case "11":
		maVal="B";
		break;
		case "12":
		maVal="C";
		break;
		case "13":
		maVal="D";
		break;
		case "14":
		maVal="E";
		break;
		case "15":
		maVal="F";
		break;
	}
	//trace("deci"+deci);
	return maVal;
}
//fonction qui convertit un hexdécimal en décimal, utilisé pour les couleurs, en composantes RVB
function ecritureDeci (nbHexa)
{


	var maVal:Number;
	switch(nbHexa)
	{
		case "0":
		maVal=0;
		break;
		case "1":
		maVal=1;
		break;
		case "2":
		maVal=2;
		break;
		case "3":
		maVal=3;
		break;
		case "4":
		maVal=4;
		break;
		case "5":
		maVal=5;
		break;
		case "6":
		maVal=6;
		break;
		case "7":
		maVal=7;
		break;
		case "8":
		maVal=8;
		break;
		case "9":
		maVal=9;
		break;
		case "A":
		maVal=10;
		break;
		case "B":
		maVal=11;
		break;
		case "C":
		maVal=12;
		break;
		case "D":
		maVal=13;
		break;
		case "E":
		maVal=14;
		break;
		case "F":
		maVal=15;
		break;
	}

	return maVal;
}

function composante(couleurHexa)
{
	var RVB:Array=new Array(3)
	couleurHexa=couleurHexa.toUpperCase();
	RVB[2]=ecritureDeci(couleurHexa.substr(7,1))+ecritureDeci(couleurHexa.substr(6,1))*16;
	RVB[1]=ecritureDeci(couleurHexa.substr(5,1))+ecritureDeci(couleurHexa.substr(4,1))*16;
	RVB[0]=ecritureDeci(couleurHexa.substr(3,1))+ecritureDeci(couleurHexa.substr(2,1))*16;
	return RVB;
}

verifier_Btn._visible = false;
mdGuide_Btn._visible = true;
mdEmploi_Btn._visible = true;
