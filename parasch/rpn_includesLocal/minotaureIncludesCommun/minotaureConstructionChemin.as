import mx.data.encoders.Num;
/**
 * ...
 * @author Michel Roquier
 */

//Déclaration de la variable no d'étape
var noEtape;
 
//Tableau contenant toutes les étapes du chemin
var chemin : Array = new Array (longCheminMax);

//Tableau contenant les coordonnées de toutes les étapes
for (i = 0 ; i < longCheminMax ; i++)
{
	chemin[i] = new Array (2);
}

//Coordonnées du point de départ
chemin[0][0] = departX;
chemin[0][1] = departY;

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

//Etat de chaque case :
// "" : non utilisé pour chemin ou impasse
// "chemin" : utilisé pour chemin
// "impasse" : utilsé pour impasse
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


//Tableau contenant les mouvements impossibles 
var mvtImpossibles : Array = new Array;

//Construire le chemin
construireChemin(departX, departY);

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
construireImpasse();
construireImpasseDepuisFin();

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
		while (mvtImpossibles[noMvt])
		{
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
		testSuite = testMvtPossibles(etapeX, etapeY);
	}
	arriveeX = etapeX;
	arriveeY = etapeY;
	longueurChemin = noEtape;
	testChemin(longueurChemin);
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
	if (testPosY == 1 || testPosX == 1 || testPosX == nbCasesX || etatCase[testPosX][testPosY-1]!="")
	{
		//Mouvement vers le haut impossible
		mvtImpossibles[0] = true;
	}
	
	//Si position en bas ou case inférieure utilisée
	if (testPosY == nbCasesY || etatCase[testPosX][testPosY+1]!="")
	{
		//Mouvement vers le bas impossible
		mvtImpossibles[1] = true;
	}
	
	//Si position tout à gauche, à droite du départ sur première ligne ou case située à gauche utilisée
	if (testPosX == 1 || (testPosY == 1 && testPosX > departX) || etatCase[testPosX-1][testPosY]!="")
	{
		//Mouvement vers la gauche impossible
		mvtImpossibles[2] = true;
	}
	
	//Si position tout à droite, à gauche du départ sur première ligne ou case située à droite utilisée
	if (testPosX == nbCasesX || (testPosY == 1 && testPosX < departX)|| etatCase[testPosX+1][testPosY]!="")
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

//Test pour voir s'il est possible de se déplacer dans chacune des directions depuis la FIN
function testMvtPossiblesDepuisFin (testPosX, testPosY)
{
	initMvtImpossibles();
	
	//Si position en haut ou case supérieure utilisée
	if (testPosY == 1 || etatCase[testPosX][testPosY-1]!="")
	{
		//Mouvement vers le haut impossible
		mvtImpossibles[0] = true;
	}
	
	//Si position en bas ou case inférieure utilisée
	if (testPosY == nbCasesY || etatCase[testPosX][testPosY+1]!="")
	{
		//Mouvement vers le bas impossible
		mvtImpossibles[1] = true;
	}
	
	//Si position tout à gauche ou case située à gauche utilisée
	if (testPosX == 1 || etatCase[testPosX-1][testPosY]!="")
	{
		//Mouvement vers la gauche impossible
		mvtImpossibles[2] = true;
	}
	
	//Si position tout à droite ou case située à droite utilisée
	if (testPosX == nbCasesX || etatCase[testPosX+1][testPosY]!="")
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
					
					//Si les cases sont couleur inversée, on doit les ré-inverser
					if(maCase[no].active == true)
					{
						maCase[no].couleurComplementaireB(fondMc["conteneurCarre" + no]);
					}
					maCase[no].couleurComplementaire(fondMc["conteneurCarre" + no]);
					//maCase[no].setCouleurFond (couleurChemin, couleurCheminAlpha);
					//maCase[no].setTextH(monTextH, texteHaut_fmt);
					//maCase[no].setTextB(monTextB, texteBas_fmt);
					
					//On teste si les flèches sont déjà dessinées
					if(nbChemin==1)
					{
						fleche (maCase[no], "chemin", mouvement[i][j]);
						fil (maCase[no], "chemin", mouvement[i][j]);
					}
					if(no==noDepart)
					{
						maCase[no].couleurComplementaireB(fondMc["conteneurCarre" + no]);
						//maCase[no].setCouleurFond (couleurDepartArrivee, couleurFondGrilleAlpha);
						//maCase[no].setTextH(monTextH, texteESG_fmt);
						//maCase[no].setTextB(monTextB, texteBas_fmt);
					}
					if(no==noArrivee)
					{
						maCase[no].couleurComplementaireB(fondMc["conteneurCarre" + no]);
						//maCase[no].setCouleurFond (couleurDepartArrivee, couleurFondGrilleAlpha);
						//maCase[no].setTextH(monTextH, texteHaut_fmt);
						//maCase[no].setTextB(monTextB, texteESG_fmt);
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


function construireImpasse()
{
	for (c = 0 ; c < longueurChemin ; c++)
	{
		impasse[c][0][0] = chemin[c][0];
		impasse[c][0][1] = chemin[c][1];
		var no = 0;
		var etapeX = chemin[c][0];
		var etapeY = chemin[c][1];
		
		var noMvt;
		var testSuite : Boolean = testMvtPossibles(etapeX, etapeY);
		while (no < 5 && testSuite) {
			no++;
			noMvt = Math.floor(Math.random() * 4);
			while (mvtImpossibles[noMvt])
			{
				noMvt = Math.floor(Math.random() * 4);
			}
			switch (noMvt) 
			{
				case 0 :
				var orientation = "HAUT";
				impasse[c][no][0] = impasse[c][no - 1][0];
				impasse[c][no][1] = impasse[c][no - 1][1] - 1;
				break;
				case 1 :
				var orientation = "BAS";
				impasse[c][no][0] = impasse[c][no - 1][0];
				impasse[c][no][1] = impasse[c][no - 1][1] + 1;
				break;
				case 2 :
				var orientation = "GAUCHE";
				impasse[c][no][0] = impasse[c][no - 1][0] - 1;
				impasse[c][no][1] = impasse[c][no - 1][1];
				break;
				case 3 :
				var orientation = "DROITE";
				impasse[c][no][0] = impasse[c][no - 1][0] + 1;
				impasse[c][no][1] = impasse[c][no - 1][1];
				break;
			}
			etapeX = impasse[c][no][0];
			etapeY = impasse[c][no][1];
			mouvement[impasse[c][no - 1][0]][impasse[c][no - 1][1]] = orientation;
			etatCase[etapeX][etapeY] = "impasse";
			testSuite = testMvtPossibles(etapeX, etapeY);
			longImpasse[c] = no;
		}
	}
}

function construireImpasseDepuisFin()
{
	impasse[longueurChemin][0][0] = arriveeX;
	impasse[longueurChemin][0][1] = arriveeY;
	var no = 0;
	var etapeX = arriveeX;
	var etapeY = arriveeY;
	
	var noMvt;
	var testSuite : Boolean = testMvtPossiblesDepuisFin(etapeX, etapeY);
	while (no < 10 && testSuite) {
		no++;
		noMvt = Math.floor(Math.random() * 4);
		while (mvtImpossibles[noMvt])
		{
			noMvt = Math.floor(Math.random() * 4);
		}
		switch (noMvt) 
		{
			case 0 :
			var orientation = "HAUT";
			impasse[longueurChemin][no][0] = impasse[longueurChemin][no - 1][0];
			impasse[longueurChemin][no][1] = impasse[longueurChemin][no - 1][1] - 1;
			break;
			case 1 :
			var orientation = "BAS";
			impasse[longueurChemin][no][0] = impasse[longueurChemin][no - 1][0];
			impasse[longueurChemin][no][1] = impasse[longueurChemin][no - 1][1] + 1;
			break;
			case 2 :
			var orientation = "GAUCHE";
			impasse[longueurChemin][no][0] = impasse[longueurChemin][no - 1][0] - 1;
			impasse[longueurChemin][no][1] = impasse[longueurChemin][no - 1][1];
			break;
			case 3 :
			var orientation = "DROITE";
			impasse[longueurChemin][no][0] = impasse[longueurChemin][no - 1][0] + 1;
			impasse[longueurChemin][no][1] = impasse[longueurChemin][no - 1][1];
			break;
		}
		etapeX = impasse[longueurChemin][no][0];
		etapeY = impasse[longueurChemin][no][1];
		mouvement[impasse[longueurChemin][no - 1][0]][impasse[longueurChemin][no - 1][1]] = orientation;
		etatCase[etapeX][etapeY] = "impasse";
		testSuite = testMvtPossiblesDepuisFin(etapeX, etapeY);
		longImpasse[longueurChemin] = no;
	}
}