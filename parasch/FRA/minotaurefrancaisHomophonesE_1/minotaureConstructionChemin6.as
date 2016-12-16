import mx.data.encoders.Num;
/**
 * ...
 * @author Michel Roquier et Jean-Michel Luthi
*/
//Déclaration de la variable no d'étape
var noEtape;

//Déclaration du tableau reliant la case du chemin à son erreur
var cheminErreur:Array=new Array();

//Déclaration du tableau reliant la case du chemin à son impasse
var cheminImpasse:Array=new Array();

//Déclaration du tableau reliant la case de l'erreur à son impasse
var erreurImpasse:Array=new Array();

//Déclaration du tableau reliant la case de la fin à son impasse
var finImpasse:Array=new Array();

//Déclaration du tableau reliant les trous à une case voisine
var trou:Array=new Array();
 
//Tableau contenant toutes les étapes du chemin
var chemin : Array = new Array ();

//Tableau contenant les coordonnées de toutes les étapes
for (i = 0 ; i < longCheminMax ; i++)
{
	chemin[i] = new Array ();
}
//Tableau contenant toutes les erreurs en fonction des étapes du chemin
var erreurChemin : Array = new Array (longCheminMax);

//Tableau contenant les coordonnées de toutes les étapes
for (i = 0 ; i < longCheminMax ; i++)
{
	erreurChemin[i] = new Array (2);
}

//Coordonnées du point de départ
chemin[0][0] = departX;
chemin[0][1] = departY;
trace("longCheminMax constr"+longCheminMax);
//Tableau contenant toutes les étapes de la première impasse
var impasse : Array = new Array (longCheminMax);

//Tableau contenant les coordonnées de toutes les étapes de la première impasse
for (i=0;i<longCheminMax;i++){
	impasse[i] = new Array (longCheminMax);
	for (j=0;j<longCheminMax;j++){
		impasse[i][j] = new Array (2);
		for (k=0;k<2;k++){
			impasse[i][j][k] = i +" , "+ j +" , "+k;
		}
	}
}
//Tableau contenant toutes les étapes de la première impasse depuis une erreur
var impasseE : Array = new Array (longCheminMax);

//Tableau contenant les coordonnées de toutes les étapes de la première impasse erreur
for (i=0;i<longCheminMax;i++){
	impasseE[i] = new Array (longCheminMax);
	for (j=0;j<longCheminMax;j++){
		impasseE[i][j] = new Array (2);
		for (k=0;k<2;k++){
			impasseE[i][j][k] = i +" , "+ j +" , "+k;
		}
	}
}

//Tableau contenant toutes les étapes de la première impasse depuis une erreur
var impasseF : Array = new Array (1);

//Tableau contenant les coordonnées de toutes les étapes de la première impasse erreur

impasseF[0] = new Array (longCheminMax);
for (j=0;j<longCheminMax;j++){
	impasseF[0][j] = new Array (2);
	for (k=0;k<2;k++){
		impasseF[0][j][k] = i +" , "+ j +" , "+k;
	}
}


//Etat de chaque case :
// "" : non utilisé pour chemin ou impasse
// "chemin" : utilisé pour chemin
// "impasse" : utilsé pour impasse sur chemin
// "impasseC" : utilsé pour impasse sur erreur
// "impasseS" : utilsé pour impasse sur sortie
// "autre" : utilisé pour combler vide

//Tableau contenant la première coordonnée des cases
var etatCase : Array = new Array(nbCasesX + 1);
iniEtat();
//Initialisation Etat
function iniEtat()
{
	for (i = 0; i <= nbCasesX; i++)
	{
		//Tableau contenant la deuxième coordonnée des cases
		etatCase[i] = new Array(nbCasesY+1);
		for (j = 0; j <= nbCasesY; j++) {
			//Initialisation de l'état des cases 
			etatCase[i][j] = "";
		}
	}
}

//Tableau contenant la première coordonnée de la case de départ du mouvement
var mouvement : Array = new Array (nbCasesX + 1);
iniMvt();
//Initialisation mouvements
function iniMvt()
{
	for (i = 0 ; i < nbCasesX+1 ; i++)
	{
		//Tableau contenant la deuxième coordonnée de la case de départ du mouvement
		mouvement[i] = new Array (nbCasesY + 1);
		mouvement[i][j] = "";
	}
}
//Tableau contenant la première coordonnée de la case de départ du mouvement
var erreur : Array = new Array (nbCasesX + 1);
iniErr();
//Initialisation mouvements
function iniErr()
{
	for (i = 0 ; i < nbCasesX+1 ; i++)
	{
		//Tableau contenant la deuxième coordonnée de la case de départ du mouvement
		erreur[i] = new Array (nbCasesY + 1);
		erreur[i][j] = "";
	}
}

//Tableau contenant les mouvements impossibles 
var mvtImpossibles : Array = new Array;

//Construire le chemin
construireChemin(departX, departY);

//trace ("longueurChemin"+longueurChemin);
construireErreurChemin();

//Tableau contenant les longueurs des différentes impasses
var longImpasse : Array = new Array (longueurChemin);

//On compte le nombre de fois que cheminVisible est exécuté pour savoir si les féèches sont créées ou pas
var nbChemin=0;
//Choix chemin visible
cheminVisible(false);

//Changement de couleur de la case de départ
maCase[departX].setCouleurFond (couleurDepartArrivee, couleurDepartArriveeAlpha);
maCouleur[departX-1]=couleurDepartArrivee;
//Calcul du no de la dernière case
var noCaseArrivee = noCase (arriveeX,arriveeY);

//Changement de couleur de la case d'arrivée
maCouleur[noCaseArrivee-1]=couleurDepartArrivee;
maCase[noCaseArrivee].setCouleurFond (couleurDepartArrivee, couleurDepartArriveeAlpha);


//Construire les différentes impasses issues de chaque case du chemin
construireImpasseChemin();
construireImpasseErreur();
construireImpasseDepuisFin();
trouDependant();




//******************************************** FONCTIONS **********************************

//Construction du chemin
function construireChemin(depX, depY) {
	noEtape = 0;
	var etapeX  = depX;
	var etapeY = depY;
	etatCase[etapeX][etapeY] = "chemin";
	var noMvt;
	var testSuite : Boolean = testMvtPossibles(etapeX, etapeY);
	while ((etapeY != nbCasesY || noEtape < longCheminMin) && testSuite) {
		noEtape++;
		noMvt = Math.floor(Math.random() * 4);
		//trace("noEtape"+noEtape);
		while (mvtImpossibles[noMvt])
		{
			//trace("noMvt"+noMvt);
			noMvt = Math.floor(Math.random() * 4);
		}

		switch (noMvt) 
		{
			case 0 :
			var orientation = "HAUT";
			chemin[noEtape][0] = chemin[noEtape - 1][0];
			chemin[noEtape][1] = chemin[noEtape - 1][1] - 1;
			break;
			case 1 :
			var orientation = "BAS";
			chemin[noEtape][0] = chemin[noEtape - 1][0];
			chemin[noEtape][1] = chemin[noEtape - 1][1] + 1;
			break;
			case 2 :
			var orientation = "GAUCHE";
			chemin[noEtape][0] = chemin[noEtape - 1][0] - 1;
			chemin[noEtape][1] = chemin[noEtape - 1][1];
			break;
			case 3 :
			var orientation = "DROITE";
			chemin[noEtape][0] = chemin[noEtape - 1][0] + 1;
			chemin[noEtape][1] = chemin[noEtape - 1][1];
			break;
		}
		etapeX = chemin[noEtape][0];
		etapeY = chemin[noEtape][1];
		mouvement[chemin[noEtape - 1][0]][chemin[noEtape - 1][1]] = orientation;
		etatCase[etapeX][etapeY] = "chemin";
//		trace("chemin"+chemin);
		testSuite = testMvtPossibles(etapeX, etapeY);
	}
	arriveeX = etapeX;
	arriveeY = etapeY;
	longueurChemin = noEtape;
	//On place le bouton vérifier verifie_btn su la case d'arrivée
	fondMc.verifie_Btn._x = (etapeX-1)*coteCase*rapportLongLarg+marge+20;
	fondMc.verifie_Btn._y = 300;
	trace("longueurChemin"+longueurChemin);
	trace("Chemin"+chemin);
	testChemin(longueurChemin);
	
}

function construireErreurChemin()
{
	var debX:Number=chemin[0][0];
	var debY:Number=chemin[0][1];
	var etape=0;
	var caseImpossible:Array=new Array();
	for(i=0 ; i<=longueurChemin ; i++)
	{
		//On met false dans caseImpossible
		for(j=0;j<4;j++)
		{
			caseImpossible[j]=false;
		}
		//Si position en haut, tout à gauche, tout à droite ou case supérieure utilisée
		if (debY == 1 || etatCase[debX][debY-1].length>0)
		{
			//Mouvement vers le haut impossible
			caseImpossible[0] = true;
		}
		
		//Si position en bas ou case inférieure utilisée
		if (debY == nbCasesY || etatCase[debX][debY+1].length>0)
		{
			//Mouvement vers le bas impossible
			caseImpossible[1] = true;
		}
		
		//Si position tout à gauche, à droite du départ sur première ligne ou case située à gauche utilisée
		if (debX == 1  || etatCase[debX-1][debY].length>0)
		{
			//Mouvement vers la gauche impossible
			caseImpossible[2] = true;
		}
		
		//Si position tout à droite, à gauche du départ sur première ligne ou case située à droite utilisée
		if (debX == nbCasesX || etatCase[debX+1][debY].length>0)
		{
			//Mouvement vers la droite impossible
			caseImpossible[3] = true;
		}
		if(debX ==arriveeX && debY==arriveeY )
		{
			caseImpossible[0]=true;
			caseImpossible[1]=true;
			caseImpossible[2]=true;
			caseImpossible[3]=true;
		}
		if (caseImpossible[0]==true && caseImpossible[1]==true && caseImpossible[2]==true && caseImpossible[3]==true)
		{
//			trace("pas de fautes possibles");
		}else
		{
			var erreurEtapeX;
			var erreurEtapeY;
			var noErreur:Number;
				
			noErreur=Math.floor(Math.random() * 4);
			while (caseImpossible[noErreur])
			{
				noErreur = Math.floor(Math.random() * 4);
			}
			switch (noErreur) 
			{
				case 0 :
				//var positionErreur = "HAUT";
				erreurChemin[i][0] = chemin[i][0];
				erreurChemin[i][1] = chemin[i][1] - 1;
				break;
				case 1 :
				//var positionErreur = "BAS";
				erreurChemin[i][0] = chemin[i][0];
				erreurChemin[i][1] = chemin[i][1] + 1;
				break;
				case 2 :
				//var positionErreur = "GAUCHE";
				erreurChemin[i][0] = chemin[i][0] - 1;
				erreurChemin[i][1] = chemin[i][1];
				break;
				case 3 :
				//var positionErreur = "DROITE";
				erreurChemin[i][0] = chemin[i][0] + 1;
				erreurChemin[i][1] = chemin[i][1];
				break;
				default:
//				trace("noErreur switch: "+noErreur);
				break;
			}

			erreurEtapeX = erreurChemin[i][0];
			erreurEtapeY = erreurChemin[i][1];
			if(etatCase[erreurEtapeX][erreurEtapeY].length <=2){
				etatCase[erreurEtapeX][erreurEtapeY] = "erreur";
			}
			cheminErreur.push([noCase(chemin[i][0],chemin[i][1]),noCase(erreurEtapeX,erreurEtapeY)])
		}
		maCase[noCase(erreurEtapeX,erreurEtapeY)].setTextH("Erreur", texteES_fmt);
		debX=chemin[i+1][0];
		debY=chemin[i+1][1];

	}
	trace("n° case chemin, n° case erreur associée");
	trace("cheminErreur"+cheminErreur);
}

//Test si chemin suffisamment long et arrivée située en bas
function testChemin(longueur)
{
	if (arriveeY < nbCasesY || longueur < longCheminMin || longueur > longCheminMax/2)
	{
		//Coordonnées du point de départ
		chemin[0][0] = departX;
		chemin[0][1] = departY;
		
		iniMvt();
		iniEtat();
		
		construireChemin(departX, departY);
	}
}

//Initialisation de tous les mouvements impossibles
function initMvtImpossibles()
{
	//Ordre des mouvements dans le tableau (Haut, Bas, Gauche, Droite)
	for (i = 0 ; i < 4 ; i++)
	{
		mvtImpossibles[i] = false;
	}
}

//Test pour voir s'il est possible de se déplacer dans chacune des directions
function testMvtPossibles (testPosX, testPosY)
{
	initMvtImpossibles();

	//Si position en haut, tout à gauche, tout à droite ou case supérieure utilisée
	if (testPosY == 1 || testPosX == 1 || testPosX == nbCasesX || etatCase[testPosX][testPosY-1].length>0)
	{
	
		//Mouvement vers le haut impossible
		mvtImpossibles[0] = true;
		//trace("etatCase[testPosX][testPosY-1].length haut"+etatCase[testPosX][testPosY-1].length);
	}
	
	//Si position en bas ou case inférieure utilisée
	if (testPosY == nbCasesY || etatCase[testPosX][testPosY+1].length>0)
	{
		//Mouvement vers le bas impossible
		mvtImpossibles[1] = true;
		//trace("etatCase[testPosX][testPosY-1].length bas"+etatCase[testPosX][testPosY+1].length);
	}
	
	//Si position tout à gauche, à droite du départ sur première ligne ou case située à gauche utilisée
	if (testPosX == 1 || (testPosY == 1 && testPosX > departX) || etatCase[testPosX-1][testPosY].length>0)
	{
		//Mouvement vers la gauche impossible
		mvtImpossibles[2] = true;
	}
	
	//Si position tout à droite, à gauche du départ sur première ligne ou case située à droite utilisée
	if (testPosX == nbCasesX || (testPosY == 1 && testPosX < departX)|| etatCase[testPosX+1][testPosY].length>0)
	{
		//Mouvement vers la droite impossible
		mvtImpossibles[3] = true;
		//trace("etatCase[testPosX][testPosY-1].length droite"+etatCase[testPosX+1][testPosY].length);
	}
	if (mvtImpossibles[0] && mvtImpossibles[1] && mvtImpossibles[2] && mvtImpossibles[3])
	{
		return (false);
	}
	else {
		return (true);
	}
}

//Test pour voir s'il est possible de se déplacer dans chacune des directions depuis la FIN
function testMvtPossiblesDepuisFin (testPosX, testPosY)
{
	initMvtImpossibles();
	
	//Si position en haut ou case supérieure utilisée
	if (testPosY == 1 || etatCase[testPosX][testPosY-1].length>0)
	{
		//Mouvement vers le haut impossible
		mvtImpossibles[0] = true;
	}
	
	//Si position en bas ou case inférieure utilisée
	if (testPosY == nbCasesY || etatCase[testPosX][testPosY+1].length>0)
	{
		//Mouvement vers le bas impossible
		mvtImpossibles[1] = true;
	}
	
	//Si position tout à gauche ou case située à gauche utilisée
	if (testPosX == 1 || etatCase[testPosX-1][testPosY].length>0)
	{
		//Mouvement vers la gauche impossible
		mvtImpossibles[2] = true;
	}
	
	//Si position tout à droite ou case située à droite utilisée
	if (testPosX == nbCasesX || etatCase[testPosX+1][testPosY].length>0)
	{
		//Mouvement vers la droite impossible
		mvtImpossibles[3] = true;
	}
	if (mvtImpossibles[0] && mvtImpossibles[1] && mvtImpossibles[2] && mvtImpossibles[3])
	{
		return (false);
	}
	else {
		return (true);
	}
}

//Fonction chemin visible ou non
function cheminVisible(etat)
{

	nbChemin++;
	if (etat) {
		for (i = 0; i < nbCasesX+1 ; i++)
		{
			for (j = 0; j < nbCasesY+1 ; j++)
			{
				if (etatCase[i][j]=="chemin")
				{
					no = noCase(i, j);
					noDepart = noCase(departX, departY);
					noArrivee = noCase(arriveeX, arriveeY);

					var monTextH = maCase[no].conteneur.carre.val1.text;
					var monTextB = maCase[no].conteneur.carre.val2.text;
					
					maCase[no].conteneur.carre.val1.multiline=true;
					maCase[no].conteneur.carre.val2.multiline=true;
					
					//Si les cases sont couleur inversée, on doit les ré-inverser
					if(maCase[no].active == true)
					{
						maCase[no].couleurComplementaireB(fondMc["conteneurCarre" + no]);
					}
					maCase[no].setCouleurFond (couleurChemin, couleurCheminAlpha);
					maCase[no].setTextH(monTextH, texteHaut_fmt);
					maCase[no].setTextB(monTextB, texteBas_fmt);
					
					//On teste si les flèches sont déjà dessinées
					if(nbChemin==1)
					{
						fleche (maCase[no], "chemin", mouvement[i][j]);
						fil (maCase[no], "chemin", mouvement[i][j]);
					}
					if(no==noDepart)
					{
						maCase[no].setCouleurFond (couleurDepartArrivee, couleurFondGrilleAlpha);
						maCase[no].setTextH(monTextH, texteESG_fmt);
						maCase[no].setTextB(monTextB, texteBas_fmt);
					}
					if(no==noArrivee)
					{
						
						maCase[no].setCouleurFond (couleurDepartArrivee, couleurFondGrilleAlpha);
						maCase[no].setTextH(monTextH, texteHaut_fmt);
						maCase[no].setTextB(monTextB, texteESG_fmt);
					}

				}
			}
		}
		flechesVisibles(true, "chemin");
		filVisible(true, "chemin");
	}else {
		for (i = 0; i < nbCasesX+1 ; i++)
		{
			for (j = 0; j < nbCasesY+1 ; j++)
			{
				if (etatCase[i][j]=="chemin")
				{
					no = noCase (i, j);
					noDepart = noCase(departX, departY);
					noArrivee = noCase(arriveeX, arriveeY);
					if(no!=noDepart || no!=noArrivee){
						
	//////////////////////////////////////////////////////////////////////////LIGNE ENLEVéE POUR LE DéGRADé/////////////////////////////////////////////////////////
	
						//maCase[no].setCouleurFond (couleurFondGrille, couleurFondGrilleAlpha);
						
						
						var monTextH = maCase[no].val1.text;
						var monTextB = maCase[no].val2.text;
						maCase[no].setTextH(monTextH, texteHaut_fmt);
						maCase[no].setTextB(monTextB, texteBas_fmt);
						//On teste si les flèches sont déjà dessinées
						if(nbChemin==1)
						{
							fleche (maCase[no], "chemin", mouvement[i][j]);
							fil (maCase[no], "chemin", mouvement[i][j]);
						}
						
						
					}
				}
			}
		}
		flechesVisibles(false, "chemin");
		filVisible(false, "chemin");
	}
}


function construireImpasseChemin()
{
	var numeroImpasseChemin=-1;
	for (c = 0 ; c < longueurChemin ; c++)
	{
		var no = 0;
		var etapeX = chemin[c][0];
		var etapeY = chemin[c][1];
		var noMvt;
		var testSuite : Boolean = testMvtPossibles(etapeX, etapeY);
		
		
		if (testSuite)
		{
			impasse[c][0][0] = chemin[c][0];
			impasse[c][0][1] = chemin[c][1];
			numeroImpasseChemin++;
			cheminImpasse[numeroImpasseChemin] = new Array ();
			//cheminImpasse[0](noCase(chemin[c][0],chemin[c][1]),noCase(,));
			//trace("cheminImpasse"+cheminImpasse);
		}else{
			impasse[c][0][0] = "imp";
			impasse[c][0][1] = "imp";
		}

		while (testSuite) {
			no++;
			noMvt = Math.floor(Math.random() * 4);
			while (mvtImpossibles[noMvt])
			{
				noMvt = Math.floor(Math.random() * 4);
			}
			switch (noMvt) 
			{
				case 0 :
				//var orientation = "HAUT";
				impasse[c][no][0] = impasse[c][no - 1][0];
				impasse[c][no][1] = impasse[c][no - 1][1] - 1;
				break;
				case 1 :
				//var orientation = "BAS";
				impasse[c][no][0] = impasse[c][no - 1][0];
				impasse[c][no][1] = impasse[c][no - 1][1] + 1;
				break;
				case 2 :
				//var orientation = "GAUCHE";
				impasse[c][no][0] = impasse[c][no - 1][0] - 1;
				impasse[c][no][1] = impasse[c][no - 1][1];
				break;
				case 3 :
				//var orientation = "DROITE";
				impasse[c][no][0] = impasse[c][no - 1][0] + 1;
				impasse[c][no][1] = impasse[c][no - 1][1];
				break;
			}
			etapeX = impasse[c][no][0];
			etapeY = impasse[c][no][1];
			cheminImpasse[numeroImpasseChemin].push([noCase(impasse[c][no - 1][0],impasse[c][no - 1][1]),noCase(etapeX,etapeY)]);

			if(etatCase[erreurEtapeX][erreurEtapeY].length <=2){
				etatCase[etapeX][etapeY] = "impasseC";
			}
			testSuite = testMvtPossibles(etapeX, etapeY);
			longImpasseC[c] = no;
			maCase[noCase(etapeX,etapeY)].setTextH(etatCase[etapeX][etapeY]+no, texteES_fmt);
			maCase[noCase(etapeX,etapeY)].setTextB(cheminImpasse[numeroImpasseChemin][no+1][0], texteES_fmt);
		}
	}
	trace("cheminImpasse[n° de l'impasse][n° case avant, n° case impasse] ");
	trace("cheminImpasse: "+cheminImpasse);
}

function construireImpasseErreur()
{
	var numeroImpasseErreur=-1;
	for (e = 0 ; e < cheminErreur.length ; e++)
	{
		var no = 0;
		var erreurNumero:Number=retourCoordonneeCase(cheminErreur[e][1]);
		var etapeX = erreurNumero[0];
		var etapeY = erreurNumero[1];
		var noMvt;
		var testSuiteE : Boolean = testMvtPossibles(etapeX, etapeY);

		if (testSuiteE)
		{
			impasseE[e][0][0] = erreurNumero[0];
			impasseE[e][0][1] = erreurNumero[1];
		}else{
			impasseE[e][0][0] = "imp";
			impasseE[e][0][1] = "imp";
		}
		if(cheminErreur[e][1]==noCase(erreurNumero[0],erreurNumero[1])){
			if (testSuiteE)
			{
				numeroImpasseErreur++;
				erreurImpasse[numeroImpasseErreur] = new Array ();
			}

			while (testSuiteE && no<50) {
				no++;
				noMvt = Math.floor(Math.random() * 4);
				while (mvtImpossibles[noMvt])
				{
					noMvt = Math.floor(Math.random() * 4);
				}
			
				switch (noMvt) 
				{
					case 0 :
					//var orientation = "HAUT";
					impasseE[e][no][0] = impasseE[e][no - 1][0];
					impasseE[e][no][1] = impasseE[e][no - 1][1] - 1;
					break;
					case 1 :
					//var orientation = "BAS";
					impasseE[e][no][0] = impasseE[e][no - 1][0];
					impasseE[e][no][1] = impasseE[e][no - 1][1] + 1;
					break;
					case 2 :
					//var orientation = "GAUCHE";
					impasseE[e][no][0] = impasseE[e][no - 1][0] - 1;
					impasseE[e][no][1] = impasseE[e][no - 1][1];
					break;
					case 3 :
					//var orientation = "DROITE";
					impasseE[e][no][0] = impasseE[e][no - 1][0] + 1;
					impasseE[e][no][1] = impasseE[e][no - 1][1];
					break;
				}
				etapeX = impasseE[e][no][0];
				etapeY = impasseE[e][no][1];
				erreurImpasse[numeroImpasseErreur].push([noCase(impasseE[e][no - 1][0],impasseE[e][no - 1][1]),noCase(etapeX,etapeY)]);
				if(etatCase[erreurEtapeX][erreurEtapeY].length <=2){
					etatCase[etapeX][etapeY] = "impasseE";
				}
				testSuiteE = testMvtPossibles(etapeX, etapeY);
				longImpasseE[e] = no;
				maCase[noCase(etapeX,etapeY)].setTextH(etatCase[etapeX][etapeY]+no, texteES_fmt);
				maCase[noCase(etapeX,etapeY)].setTextB(erreurImpasse[no-1], texteES_fmt);
				maCase[noCase(etapeX,etapeY)].setTextB(erreurImpasse[numeroImpasseErreur][no-1][0], texteES_fmt);
				
			}
			
		}
	}
	trace("ErreurImpasse[numéro de l'impasse][n° case avant, n° case impasse] ");
	trace("ErreurImpasse: "+erreurImpasse);
}

function construireImpasseDepuisFin()
{
		var no = 0;
		var etapeX = arriveeX;
		var etapeY = arriveeY;
		var noMvt;
		var testSuiteF : Boolean = testMvtPossiblesDepuisFin(etapeX, etapeY);
		
		if (testSuiteF)
		{
			impasseF[0][0][0] = arriveeX;
			impasseF[0][0][1] = arriveeY;
	//		finImpasse[0] = new Array ();
		}else{
			impasseF[0][0][0] = "imp";
			impasseF[0][0][1] = "imp";
		}

		while (testSuiteF && no<50) {
			no++;
			noMvt = Math.floor(Math.random() * 4);
			while (mvtImpossibles[noMvt])
			{
				noMvt = Math.floor(Math.random() * 4);
			}

			switch (noMvt) 
			{
				case 0 :
				//var orientation = "HAUT";
				impasseF[0][no][0] = impasseF[0][no - 1][0];
				impasseF[0][no][1] = impasseF[0][no - 1][1] - 1;
				
				
				break;
				case 1 :
				//var orientation = "BAS";
				impasseF[0][no][0] = impasseF[0][no - 1][0];
				impasseF[0][no][1] = impasseF[0][no - 1][1] + 1;
				break;
				case 2 :
				//var orientation = "GAUCHE";
				impasseF[0][no][0] = impasseF[0][no - 1][0] - 1;
				impasseF[0][no][1] = impasseF[0][no - 1][1];
				break;
				case 3 :
				//var orientation = "DROITE";
				impasseF[0][no][0] = impasseF[0][no - 1][0] + 1;
				impasseF[0][no][1] = impasseF[0][no - 1][1];
				break;
			}
			etapeX = impasseF[0][no][0];
			etapeY = impasseF[0][no][1];		
			finImpasse.push([noCase(impasseF[0][no - 1][0],impasseF[0][no - 1][1]),noCase(etapeX,etapeY)]);
			
			if(etatCase[etapeX][etapeY].length <=2){
				etatCase[etapeX][etapeY] = "impasseF";
			}
			testSuiteF = testMvtPossiblesDepuisFin(etapeX, etapeY);
			longImpasseF[0] = no;
			maCase[noCase(etapeX,etapeY)].setTextH(etatCase[etapeX][etapeY]+no, texteES_fmt);
			maCase[noCase(etapeX,etapeY)].setTextB(finImpasse[no][0], texteES_fmt);
		}
		trace("finImpasse[n° case avant, n° case impasse] ");
		trace("finImpasse: "+finImpasse);

}

function trouDependant()
{
	for (col = 1 ; col < nbCasesY+1 ; col++)
	{
		for (li = 1 ;li < nbCasesx+1 ; li++)
		{
			if (etatCase[li][col].length<1)
			{
				
				var caseDependanteX:Number;
				var caseDependanteY:Number;
				var noMvt;
				var caseDep : Boolean = casePossibleTrou(li, col);
				if (caseDep)
					{
					noMvt = Math.floor(Math.random() * 4);
					while (uneCasePossible[noMvt]==false)
					{
						noMvt = Math.floor(Math.random() * 4);
					}
					switch (noMvt) 
					{
						case 0 :
						//var orientation = "HAUT";
						caseDependanteX = li;
						caseDependanteY = col - 1;
						break;
						case 1 :
						//var orientation = "BAS";
						caseDependanteX = li;
						caseDependanteY = col + 1;
						break;
						case 2 :
						//var orientation = "GAUCHE";
						caseDependanteX = li - 1;
						caseDependanteY = col;
						break;
						case 3 :
						//var orientation = "DROITE";
						caseDependanteX = li + 1;
						caseDependanteY = col;
						break;
					}
					trou.push([noCase(li,col),noCase(caseDependanteX,caseDependanteY)]);
					maCase[noCase(li,col)].setTextH(noCase(li,col), texteES_fmt);
					maCase[noCase(li,col)].setTextB(noCase(caseDependanteX,caseDependanteY), texteES_fmt);
				}
			}
		}
	}
	trace("trou[n° trou , n° case dépendante] ");
	trace("trou: "+trou);
}

function casePossibleTrou(trouX,trouY)
{
	_global.uneCasePossible=new Array();
	for (p = 0 ; p < 4 ; p++)
	{
		uneCasePossible[p] = true;
	}
	//Si position en haut, ou case supérieure vide
	if (trouY == 1 || etatCase[trouX][trouY-1].length<1)
	{
		//Case Haut impossible
		uneCasePossible[0] = false;
	}
	
	//Si position en bas ou case inférieure vide
	if (trouY == nbCasesY || etatCase[trouX][trouY+1].length<1)
	{
		//Case Bas impossible
		uneCasePossible[1] = false;
	}
	
	//Si position tout à gauche ou case située à gauche vide
	if (trouX == 1 || etatCase[trouX-1][trouY].length<1)
	{
		//Case gauche impossible
		uneCasePossible[2] = false;
	}
	
	//Si position tout à droite ou case située à droite vide
	if (trouX == nbCasesX ||  etatCase[trouX+1][trouY].length<1)
	{
		//Mouvement vers la droite impossible
		uneCasePossible[3] = false;

	}
	if (uneCasePossible[0] || uneCasePossible[1] || uneCasePossible[2] || uneCasePossible[3])
	{
		return (true);
	}
	else {
		return (false);
	}
}


