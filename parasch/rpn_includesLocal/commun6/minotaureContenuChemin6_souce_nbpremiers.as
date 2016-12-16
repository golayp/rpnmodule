/**
 * ...
 * @author Michel Roquier et Jean-michel Luthi
 */

//Initialisation du tableau contenant Formes à faire
var tabForme : Array;
tabForme = ["ind. prés. je", "ind. prés. tu", "ind. prés. il", "ind. prés. nous", "ind. prés. vous", "ind. prés. elles", "ind. p. comp. je",
			"ind. p. comp. tu", "ind. p. comp. on", "ind. p. comp. nous", "ind. p. comp. vous", "ind. p. comp. ils", "ind. imp. je", "ind. imp. tu",
			"ind. imp. elle", "ind. imp. nous", "ind. imp. vous", "ind. imp. ils", "ind. pqpft. je", "ind. pqpft. tu", "ind. pqpft. on", "ind. pqpft. nous",
			"ind. pqpft. vous", "ind. pqpft elles"," ind. p. simple je", "ind. p. simple tu", "ind. p. simple il", "ind. p. simple nous", "ind. p. simple vous",
			"ind. p. simple elles", "ind. p. ant. je", "ind. p. ant. tu", "ind. p. ant. elle", "ind. p. ant. nous", "ind. p. ant. vous", "ind. p. ant. ils",
			"sub. prés. je", "sub. prés. tu", "sub. prés. elle", "sub. prés. nous", "sub. prés. vous", "sub. prés. elles", "sub. passé je", "sub. passé tu",
			"sub. passé il", "sub. passé nous", "sub. passé vous", "sub. passé ils", "cond. prés. je", "cond. prés. tu", "cond. prés. on", "cond. prés. nous",
			"cond. prés. vous","cond. prés. ils","cond. passé je","cond. passé tu","cond. passé il","cond. passé nous","cond. passé vous",
			"cond. passé elles","participe passé","participe prés.","imp. prés. (tu)","imp. prés. (nous)","imp. prés. (vous)"];

//Initialisation du tableau contenant les formes justes
var tabFormeJuste : Array;
tabFormeJuste = ["Je fais, tu fais", "il fait, nous faisons", "vous faites", "elles font", "j’ai fait", "tu as fait"," on a fait", "nous avons fait",
				 "vous avez fait", "ils ont fait", "je faisais", "tu faisais", "elle faisait", "nous faisions", "vous faisiez", "ils faisaient",
				 "j’avais fait", "tu avais fait", "on avait fait", "nous avions fait", "vous aviez fait", "elles avaient fait", "je fis",
				 "tu fis, il fit", "nous fîmes", "vous fîtes", "elles firent", "j’eus fait", "tu eus fait", "elle eut fait", "nous eûmes fait",
				 "vous eûtes fait", "ils eurent fait", "que je fasse", "que tu fasses", "qu’elle fasse", "que nous fassions", "que vous fassiez",
				 "qu’elles fassent", "que j’aie fait", "que tu aies fait", "qu’il ait fait", "que nous ayons fait", "que vous ayez fait",
				 "qu’ils aient fait", "je ferais", "tu ferais", "on ferait", "nous ferions", "vous feriez", "elles feraient", "j’aurais fait",
				 "tu aurais fait", "on aurait fait", "nous aurions fait", "vous auriez fait", "elles auraient fait", "fait", "faisant", "fais",
				 "faisons", "faites"];

//Initialisation du tableau contenant les formes fausses
var tabFormeFausse : Array;
tabFormeFausse = ["Je fait", "tu fait", "il fais", "nous fesons", "vous faîtes", "elles faisent", "j’eus fait", "tu avais fait", "on na fait", 
				  "nous avions fait", "vous aviez fait", "ils sont fait", "je fesais", "tu fesais", "elle fesait", "nous fesions", 
				  "vous fesiez", "ils faisait", "j’avait fait", "tu avez fait", "on avais fait, nous savions fait", "vous avez fait", 
				 "elles avait fait", "je fîs", "tu fîs", "il fît", "nous fûmes", "vous fûtes", "elles furent", "j’eusse fait", 
				  "tu aurais fait", "elle ut fait", "nous sûmes fait", "vous eûte fait", "ils urent fait", "que je fais", "que tu fais", 
				  "qu’elle fait", "que nous faisons", "que vous fesiez", "elles facent", "que j’ais fait", "que tu ais fait", "qu’il aie fait", 
				  "que nous ayions fait", "que vous ayiez fait", "qu’ils ont fait", "je ferai", "tu feras", "on ferrait", "nous ferons", 
				  "vous ferez", "elles ferait", "j’aurai fait", "tu auras fait", "on aura fait", "nous aurons fait", "vous aurez fait", "elles aurait fait", "fais", 
				  "faisan", "fait", "fesons", "faisez"];

//Initialisation du tableau contenant les commentaires
var tabCommentaires : Array;
tabCommentaires = ["Cette terminaison n’est pas possible.", "Cette terminaison n’est pas possible.", "Cette terminaison n’est pas possible.", 
				   "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", "Il n’y a pas de circonflexe.", 
				   "Ce n’est pas le temps demandé.", "Ce n’est pas le temps demandé.", "Ce n’est pas le temps demandé.", 
				   "C’est l’auxiliaire avoir, pas navoir !", "Ce n’est pas le temps demandé.", "Ce n’est pas le temps demandé.", 
				   "Tu dois employer l’auxiliaire avoir, pas l’auxiliaire être.", "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", 
				   "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", 
				   "Attention, c’est la troisième personne du pluriel !", "Cette terminaison n’est pas possible.", 
				   "Cette terminaison n’est pas possible.", "Cette terminaison n’est pas possible.", "Le verbe savoir n’est pas un auxiliaire.", 
				   "Ce verbe est au passé composé, pas au plus-que-parfait.", "Attention, c’est la troisième personne du pluriel !",
				   "C’est seulement à la première et à la deuxième personne du pluriel qu’il y a un circonflexe au passé simple.", 
				   "C’est seulement à la première et à la deuxième personne du pluriel qu’il y a un circonflexe au passé simple.", 
				   "C’est seulement à la première et à la deuxième personne du pluriel qu’il y a un circonflexe au passé simple.",
				   "Ce n’est pas le verbe demandé.", "Ce n’est pas le verbe demandé.", "Ce n’est pas le verbe demandé.", 
				   "Ce n’est pas le temps demandé.", "Ce n’est pas le temps demandé.", "Cette forme n’existe pas.", 
				   "Le verbe savoir n’est pas un auxiliaire.", "Ce n’est pas la bonne terminaison.", "Cette forme n’existe pas.", 
				   "Ce n’est pas un subjonctif.", "Ce n’est pas un subjonctif.", "Ce n’est pas un subjonctif.", "Ce n’est pas un subjonctif.", 
				   "Cette forme n’existe pas.", "Cette forme n’existe pas.", "Cette forme n’existe pas.", "Cette forme n’existe pas.", 
				   "Cette forme n’existe pas.", "Cette forme n’existe pas.", "Cette forme n’existe pas.", "Ce n’est pas un subjonctif.", 
				   "C’est un futur simple, pas un conditionnel présent.", "C’est un futur simple, pas un conditionnel présent.", 
				   "Cette forme n’existe pas.", "C’est un futur simple, pas un conditionnel présent.", 
				   "C’est un futur simple, pas un conditionnel présent., Attention, c’est la troisième personne du pluriel !", 
				   "C’est un futur antérieur, pas un conditionnel passé.", "C’est un futur antérieur, pas un conditionnel passé.", 
				   "C’est un futur antérieur, pas un conditionnel passé.", "C’est un futur antérieur, pas un conditionnel passé.", 
				   "C’est un futur antérieur, pas un conditionnel passé.", "Attention, c’est la troisième personne du pluriel !", 
				   "On dit faite au féminin, pas faise.", "Il manque le « t ».", "Cette terminaison n’est pas possible.", 
				   "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", 
				   "Attention, le verbe faire, comme le verbe dire, est irrégulier à l’impératif."];

//Détermination de la position de départ dans le tableau
var posDepTab = longueurChemin + Math.round(Math.random() * 5 + 5);
//trace("Position Départ dans Tableau : " + posDepTab)

//Affichage du contenu dans les case du chemin
for (i = 0; i < longueurChemin+1; i++)
{
	no = noCase(chemin[i][0], chemin[i][1]);
	maCase[no].setTextH(tabFormeJuste[posDepTab - i], texteHaut_fmt);
	maCase[no].setTextB(tabForme[posDepTab - i], texteBas_fmt);
}
//Affichage des étiquettes Départ et Arrivée
noDep = noCase(departX, departY);
maCase[noDep].setTextH("ENTREE", texteES_fmt);
noArr = noCase(arriveeX, arriveeY);
maCase[noArr].setTextB("SORTIE", texteES_fmt);

//Affichage du contenu des impasses construites depuis les cases du chemin
for (c = 0 ; c < longueurChemin ; c++)
{
	//Affichage contenu première case première impasse
	no = noCase(impasse[c][1][0], impasse[c][1][1]);
	maCase[no].setTextH(tabFormeFausse[posDepTab - 1 - c], texteHaut_fmt);
	maCase[no].setTextB(tabForme[posDepTab - 1 - c], texteBas_fmt);
	//Affichage suite contenu première impasse
	for (i = 2; i < longImpasse[c]+1 ; i++)
	{
		no = noCase(impasse[c][i][0], impasse[c][i][1]);
		maCase[no].setTextH(tabFormeJuste[posDepTab - c - i], texteHaut_fmt);
		maCase[no].setTextB(tabforme[posDepTab - c - i], texteBas_fmt);
	}
}

//Affichage du contenu de l'impasse construites depuis la sortie

//Affichage contenu première case première impasse
no = noCase(impasse[longueurChemin][1][0], impasse[longueurChemin][1][1]);
maCase[no].setTextH(tabFormeFausse[posDepTab + 1 - longueurChemin], texteHaut_fmt);
maCase[no].setTextB(tabForme[posDepTab + 1 - longueurChemin], texteBas_fmt);
//Affichage suite contenu première impasse
for (i = 2; i < longImpasse[longueurChemin]+1 ; i++)
{
	no = noCase(impasse[longueurChemin][i][0], impasse[longueurChemin][i][1]);
	maCase[no].setTextH(tabFormeJuste[posDepTab - longueurChemin + i], texteHaut_fmt);
	maCase[no].setTextB(tabForme[posDepTab - longueurChemin + i], texteBas_fmt);
}

testEtatCase();


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
				maCase[no].setTextH(tabFormeFausse[noAlea], texteHaut_fmt);
				maCase[no].setTextB(tabForme[noAlea], texteBas_fmt);
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
		var nbSuivant = tabForme[posDepTab - i - 1];
		var nbVoisinH = maCase[no - nbCasesX].textB;
		if (nbSuivant == nbVoisinH && etatCase[chemin[i][0]][chemin[i][1] - 1] != "chemin")
		{

			maCase[no - nbCasesX].setTextB(tabFormeFausse[posDepTab - i - 1], texteBas_fmt);
		}
		var nbVoisinB = Number(maCase[no + nbCasesX].textB);
		if (nbSuivant == nbVoisinB && etatCase[chemin[i][0]][chemin[i][1] + 1] != "chemin")
		{
			maCase[no + nbCasesX].setTextB(tabFormeFausse[posDepTab - i - 1], texteBas_fmt);
		}
		var nbVoisinG = Number(maCase[no - 1].textB);
		if (nbSuivant == nbVoisinG && etatCase[chemin[i][0] - 1][chemin[i][1]] != "chemin")
		{
			maCase[no - 1].setTextB(tabFormeFausse[posDepTab - i - 1], texteBas_fmt);
		}
		var nbVoisinD = Number(maCase[no + 1].textB);
		if (nbSuivant == nbVoisinD && etatCase[chemin[i][0] + 1][chemin[i][1]] != "chemin")
		{
			maCase[no + 1].setTextB(tabFormeFausse[posDepTab - i - 1], texteBas_fmt);
		}
	}
}