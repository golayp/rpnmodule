//import mx.data.encoders.Num;
/**
 * ...
 * @author Michel Roquier
 */

//Initialisation du tableau contenant les nombres premiers
var tabNbPremier : Array;
tabNbPremier = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269];

//Initialisation du tableau contenant les nombres non premiers
var tabNbNonPremier : Array;
tabNbNonPremier = [1, 4, 6, 9, 12, 15, 18, 21, 26, 27, 33, 35, 39, 45, 49, 51, 57, 63, 69, 72, 75, 81, 85, 87, 91, 99, 105, 108, 111, 115,
129, 133, 136, 141, 147, 153, 155, 161, 169, 171, 177, 183, 189, 195, 196, 201, 213, 219, 225, 231, 237, 238, 243, 249, 255, 261, 267];

//Initialisation du tableau contenant les nombres non premiers
var tabDiviseurNonPremier : Array;
tabDiviseurNonPremier = [1, 2, 2, 3, 2, 3, 3, 3, 2, 3, 3, 5, 3, 3, 7, 3, 3, 3, 3, 3, 3, 3, 5, 3, 7, 3, 3, 3, 3, 5,
3, 7, 2, 3, 7, 3, 5, 7, 13, 3, 3, 3, 3, 5, 2, 3, 3, 3, 5, 3, 3, 2, 3, 3, 5, 3, 3];

//Détermination de la position de départ dans le tableau
var posDepTab : Number = longueurChemin + Math.round(Math.random() * 5 + 5);
//trace("Position Départ dans Tableau : " + posDepTab)

//Affichage du contenu dans les case du chemin
for (i = 0; i < longueurChemin+1; i++)
{
	no = noCase(chemin[i][0], chemin[i][1]);
	maCase[no].setTextH("", texteHaut_fmt);
	maCase[no].setTextB(tabNbPremier[posDepTab - i], texteBas_fmt);
}
//Affichage des étiquettes Départ et Arrivée
noDep = noCase(departX, departY);
maCase[noDep].setTextH("ENTREE", texteHautGras_fmt);
noArr = noCase(arriveeX, arriveeY);
maCase[noArr].setTextH("SORTIE", texteHautGras_fmt);

//Affichage du contenu des impasses construites depuis les cases du chemin
for (c = 0 ; c < longueurChemin ; c++)
{
	//Affichage contenu première case première impasse
	no = noCase(impasse[c][1][0], impasse[c][1][1]);
	maCase[no].setTextH("", texteHaut_fmt);
	maCase[no].setTextB(tabNbNonPremier[posDepTab - 1 - c], texteBas_fmt);
	//Affichage suite contenu première impasse
	for (i = 2; i < longImpasse[c]+1 ; i++)
	{
		no = noCase(impasse[c][i][0], impasse[c][i][1]);
		maCase[no].setTextH("", texteHaut_fmt);
		maCase[no].setTextB(tabNbPremier[posDepTab - c - i], texteBas_fmt);
	}
}

//Affichage du contenu de l'impasse construites depuis la sortie

//Affichage contenu première case première impasse
no = noCase(impasse[longueurChemin][1][0], impasse[longueurChemin][1][1]);
maCase[no].setTextH("", texteHaut_fmt);
maCase[no].setTextB(tabNbNonPremier[posDepTab + 1 - longueurChemin], texteBas_fmt);
//Affichage suite contenu première impasse
for (i = 2; i < longImpasse[longueurChemin]+1 ; i++)
{
	no = noCase(impasse[longueurChemin][i][0], impasse[longueurChemin][i][1]);
	maCase[no].setTextH("", texteHaut_fmt);
	maCase[no].setTextB(tabNbPremier[posDepTab - longueurChemin + i], texteBas_fmt);
}

testEtatCase();

//trace(Number(maCase[3].textB)+100)

testDoubleSorties();

//////////////////////   FONCTIONS ///////////

//Fonction Test de l'état de toutes les cases pour REMPLIR de manière aléatoire les cases vides
function testEtatCase ()
{
	for (i = 1 ; i < nbCasesX+1 ; i++)
	{
		for (j = 1 ; j < nbCasesY+1 ; j++)
		{
			if (etatCase[i][j]=="")
			{
				noAlea = Math.round(Math.random() * (posDepTab - 5)) + 5;
				no = noCase(i, j);
				maCase[no].setTextH("", texteHaut_fmt);
				maCase[no].setTextB(tabNbPremier[noAlea], texteBas_fmt);
			}
		}
	}
}

//Fonction test pour voir s'il existe des chemins multiples et les supprimer
function testDoubleSorties()
{
	for (i = 0 ; i < longueurChemin ; i++)
	{
		no = noCase (chemin[i][0], chemin[i][1]);
		var nbSuivant : Number = tabNbPremier[posDepTab - i - 1];
		var nbVoisinH = maCase[no - nbCasesX].textB;
		if (nbSuivant == nbVoisinH && etatCase[chemin[i][0]][chemin[i][1] - 1] != "chemin")
		{
			//trace("HAUT A CHANGER")
			//trace(maCase[no - nbCasesX].textB)
			maCase[no - nbCasesX].setTextB(tabNbNonPremier[posDepTab - i - 1], texteBas_fmt);
			//trace(maCase[no - nbCasesX].textB)
		}
		var nbVoisinB : Number = Number(maCase[no + nbCasesX].textB);
		if (nbSuivant == nbVoisinB && etatCase[chemin[i][0]][chemin[i][1] + 1] != "chemin")
		{
			//trace("BAS A CHANGER")
			//trace(maCase[no + nbCasesX].textB)
			maCase[no + nbCasesX].setTextB(tabNbNonPremier[posDepTab - i - 1], texteBas_fmt);
			//trace(maCase[no + nbCasesX].textB)
		}
		var nbVoisinG : Number = Number(maCase[no - 1].textB);
		if (nbSuivant == nbVoisinG && etatCase[chemin[i][0] - 1][chemin[i][1]] != "chemin")
		{
			//trace("GAUCHE A CHANGER")
			//trace(maCase[no - 1].textB)
			maCase[no - 1].setTextB(tabNbNonPremier[posDepTab - i - 1], texteBas_fmt);
			//trace(maCase[no - 1].textB)
		}
		var nbVoisinD : Number = Number(maCase[no + 1].textB);
		if (nbSuivant == nbVoisinD && etatCase[chemin[i][0] + 1][chemin[i][1]] != "chemin")
		{
			//trace("DROITE A CHANGER")
			//trace(maCase[no + 1].textB)
			maCase[no + 1].setTextB(tabNbNonPremier[posDepTab - i - 1], texteBas_fmt);
			//trace(maCase[no + 1].textB)
		}
	}
}