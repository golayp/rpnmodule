/**
 * ...
 * @author Michel Roquier et Jean-michel Luthi
 */

//Initialisation du tableau contenant Formes à faire
var tabForme : Array;

tabForme = ["dire (vous)", "fureter (il)", "envoyer (je)", "prendre (ils)", "geler (vous)", "manger (nous)", "pleuvoir (il)", "résoudre (je)",
		"lever (tu)", "sortir (je)", "agacer (nous)", "déranger (nous)", "élever (ils)", "rejoindre (elle)", "épeler (elle)", "essuyer (tu)", "conquérir (tu)", 
		"recevoir (il)", "comprendre (je)", "exclure (je)", "faire (vous)", "soupeser (il)", "atteindre (je)", "prédire (vous)", "placer (nous)", 
		"jeter (nous)", "apercevoir (elle)", "soulever (vous)", "nettoyer (il)", "entendre (tu)", "conclure (ils)", "dissoudre (il)", "plaindre (tu)", "refaire (vous)", 
		"peser (je)", "lancer (nous)", "finir (nous)", "acheter (tu)", "absoudre (vous)"];
trace("tabForme.length"+tabForme.length);
//Initialisation du tableau contenant les formes justes
var tabFormeJuste : Array;

tabFormeJuste = ["dites", "furète", "envoie", "prennent", "gelez", "mangeons", "pleut", "résous", "lèves", "sors", "agaçons", "dérangeons", "élèvent", 
				 "rejoint", "épelle", "essuies", "conquiers", "reçoit", "comprends", "exclus", "faites", "soupèse", "atteins", "prédisez", "plaçons", 
				 "jetons", "aperçoit", "soulevez", "nettoie", "entends", "concluent", "dissout", "plains", "refaites", "pèse", "lançons", "finissons", "achètes", 
				 "absolvez", "choisit", "conquièrent", "rageons", "peux", "pèles", "aboie", "empesons"];
trace("tabFormeJuste.length"+tabFormeJuste.length);
//Initialisation du tableau contenant les formes fausses
var tabFormeFausse : Array;
tabFormeFausse = ["dîtes", "furette", "envoye", "prendent", "gèlez", "mangons", "pleu", "résouds", "leves", "sort", "agacons", "dérangons", "élevent", 
				  "rejoind", "épèle", "essuyes", "conquières", "recoit", "comprens", "exclue", "faisez", "soupese", "atteinds", "prédites", "placons", 
				  "jettons", "apercoit", "soulèvez", "nettoye", "entens", "conclusent", "dissoud", "plainds", "refaisez", "pese", "lancons", "finisons", "achettes", 
				  "absoudez", "choisie", "conquérissent", "ragons", "peus", "pelles", "aboye", "empèsons"];
trace("tabFormeFausse.length"+tabFormeFausse.length);
//Initialisation du tableau contenant les commentaires
var tabCommentaires : Array;
tabCommentaires = ["Les accents circonflexes sont en \nprincipe réservés au passé simple !", "", "Verbes en -yer: le Y devient I \ndevant un E muet.", "", 
				   "NOUS et VOUS se forment \nsur le radical de l'infinitif !", "Le G doit se prononcer 'j' !", "", "Les verbes en -indre et -soudre \nperdent le D !", 
				   "", "Accorde avec le pronom !", "Le C doit se prononcer 'ss' !", "Le G doit se prononcer 'j' !", 
				   "", "Les verbes en -indre et -soudre \nperdent le D !", "", "Verbes en -yer: le Y devient I \ndevant un E muet", "Ce n'est pas un verbe en -er !", 
				   "Le C doit se prononcer 'ss' !", "Seuls les verbes en -indre \nperdent le D !", "Ce n'est pas un verbe en -er !", "", "", 
				   "Les verbes en -indre et -soudre \nperdent le D !", "Seuls dire et redire se \nconjuguent en -ites.", "Le C doit se prononcer 'ss' !", 
				   "La lettre E prononcée 'eu' n'est \nsuivie que d'une consonne !", "Le C doit se prononcer 'ss' !", "NOUS et VOUS se forment sur \nle radical de l'infinitif!", 
				   "Verbes en -yer: le Y devient I \ndevant un E muet", "Seuls les verbes en -indre \nperdent le D !", "", "Les verbes en -indre et -soudre \nperdent le D !", 
				   "Les verbes en -indre et -soudre \nperdent le D !", "", "", "Le C doit se prononcer 'ss' !", "", "", "", "Ce n'est pas un verbe en -er !", "", 
				   "Le G doit se prononcer 'j' !", "Ce n'est pas un verbe en -er !", "Peler une carotte et \npas peller la neige !", 
				   "Verbes en -yer: le Y devient I \ndevant un E muet.", "NOUS et VOUS se forment sur \nle radical de l'infinitif !"];

trace("tabCommentaires.length"+tabCommentaires.length);

//Détermination de la position de départ dans le tableau
var posDepTab = longueurChemin + Math.round(Math.random() * 5 + 5);

//Création du tableau qui contiendra les formes déjà prises. On lui met une valeur dans la première case
var formesUtilisees:Array=new Array();

//On crée un tableau dans lequel on va mettre la correspondance ente la position dans le tableau et le numéro de la case.
var tabNoCasePositionTabForme:Array=new Array();

//on remplit!
affichageChemin();
depArr();
affichageErreur();
affichageImpasseChemin();
affichageImpasseErreurs();
affichageImpasseSortie();
derniersTrous();

//////////////////////////////////////////////////////////////////////////Fonctions////////////////////////////////////////////////////////////
//Affichage du contenu dans les cases du chemin et dans les erreurs associées aux cases.
function affichageChemin()
{
	for (i = 0; i < longueurChemin+1; i++)
	{
		//On met le numéro de la case
		no = noCase(chemin[i][0], chemin[i][1]);
		//case d'avant:
		noAvant = noCase(chemin[i-1][0], chemin[i-1][1]);
		//On prend une forme aléatoire dans le tableau des formes pour le chemin et une autre pour la case de l'erreur
		var forme:Number=Math.floor(Math.random()*tabForme.length);
		
		//On repère si les formes ont déjà été utilisée. Si c'est le cas, on en prend une autre sinon on l'ajoute à formesUtilisees
		while(testFormeUtilisee(forme))
		{
			forme=Math.floor(Math.random()*tabForme.length);
		}
		formesUtilisees.push(forme);
		//On met la forme dans la case de l'erreur correspondante
		maCase[no].setTextH(tabFormeJuste[formesUtilisees[i-1]], texteHaut_fmt);
		maCase[no].setTextB(tabForme[forme], texteBas_fmt);
		//On écrit la correspondance entre le numéro de la case et la position de la donnée dans le tableau de départ. 
		tabNoCasePositionTabForme.push([no,forme]);
	}
}
function affichageErreur()
{
		for (i = 0; i < cheminErreur.length+1; i++)
		{
			//On prend une forme aléatoire dans le tableau des formes pour la case de l'erreur
			var forme:Number=Math.floor(Math.random()*tabForme.length);
			
			//On repère si les formes ont déjà été utilisée. Si c'est le cas, on en prend une autre sinon on l'ajoute à formesUtilisees
			while(testFormeUtilisee(forme))
			{
				forme=Math.floor(Math.random()*tabForme.length);
			}
			formesUtilisees.push(forme);

			//On met la forme dans la case de l'erreur correspondante
			maCase[cheminErreur[i][1]].setTextH(tabFormeFausse[rechercheFormeDansCase(cheminErreur[i][0])], texteHaut_fmt);
			maCase[cheminErreur[i][1]].setTextB(tabForme[forme], texteBas_fmt);
			//On écrit la correspondance entre le numéro de la case et la position de la donnée dans le tableau de départ.
			tabNoCasePositionTabForme.push([cheminErreur[i][1],forme]);
			
		}
}
//Cette fonction renvoie le numéro de la forme dans la case choisie
function rechercheFormeDansCase(maCase)
{
	var rfdc:Number=-1;
	for (r=0;r<tabNoCasePositionTabForme.length;r++)
	{
		if(maCase==tabNoCasePositionTabForme[r][0])
		{
			rfdc=tabNoCasePositionTabForme[r][1];
		}
	}
	return rfdc;
}
function depArr()
{
	//Affichage des étiquettes Départ et Arrivée
	noDep = noCase(departX, departY);
	maCase[noDep].setTextH("ENTREE", texteES_fmt);
	noArr = noCase(arriveeX, arriveeY);
	maCase[noArr].setTextB("SORTIE", texteES_fmt);
}
function affichageImpasseChemin()
{
	//Affichage du contenu des impasses construites depuis les cases erreur
	for (i = 0 ; i < cheminImpasse.length ; i++)
	{
		for (j=0;j<cheminImpasse[i].length;j++)
		{
			var forme:Number=Math.floor(Math.random()*tabForme.length);
			var no:Number=cheminImpasse[i][j][1];
			//On repère si le forme a déjà été utilisée. Si c'est le cas, on en prend une autre
			while(testFormeUtilisee(forme))
			{
				forme=Math.floor(Math.random()*tabForme.length);
			}
			formesUtilisees.push(forme);
			
			maCase[no].setTextH(tabFormeJuste[rechercheFormeDansCase(cheminImpasse[i][j][0])], texteHaut_fmt);
			maCase[no].setTextB(tabForme[forme], texteBas_fmt);
			tabNoCasePositionTabForme.push([no,forme]);
		}
	}
}
function affichageImpasseErreurs()
{
	//Affichage du contenu des impasses construites depuis les cases erreur
	for (i = 0 ; i < erreurImpasse.length ; i++)
	{
		for (j=0;j<erreurImpasse[i].length;j++)
		{
			var forme:Number=Math.floor(Math.random()*tabForme.length);
			var no:Number=erreurImpasse[i][j][1];
			//On repère si le forme a déjà été utilisée. Si c'est le cas, on en prend une autre
			while(testFormeUtilisee(forme))
			{
				forme=Math.floor(Math.random()*tabForme.length);
			}
			formesUtilisees.push(forme);
			
			maCase[no].setTextH(tabFormeJuste[rechercheFormeDansCase(erreurImpasse[i][j][0])], texteHaut_fmt);
			maCase[no].setTextB(tabForme[forme], texteBas_fmt);
			tabNoCasePositionTabForme.push([no,forme]);
		}
	}
}
		

function affichageImpasseSortie()
{
	//Affichage du contenu de l'impasse construite depuis la sortie
	for (i = finImpasse.length-1 ; i >=0  ; i--)
	{
			var forme:Number=Math.floor(Math.random()*tabForme.length);
			var no:Number=finImpasse[i][1];
			//On repère si le forme a déjà été utilisée. Si c'est le cas, on en prend une autre
			while(testFormeUtilisee(forme))
			{
				forme=Math.floor(Math.random()*tabForme.length);
			}
			formesUtilisees.push(forme);
			maCase[no].setTextH(tabFormeJuste[no], texteHaut_fmt);
			//On recerche la formeJuste utilisée dans la case d'arrivéePour cela on utilise la forme utilisée dans l'avant dernière case
			if (no==finImpasse[0][1]){
				maCase[no].setTextB(tabForme[tabNoCasePositionTabForme[longueurChemin-1][1]], texteBas_fmt);
			}else{
				//Sinon on rempli depuis la fin
				maCase[no].setTextB(tabForme[finImpasse[i][0]], texteBas_fmt);
				tabNoCasePositionTabForme.push([no,forme]);
			}	
	}
}


function testFormeUtilisee(nb)
{
	var tfu:Boolean=false;
	for (h=0 ; h < formesUtilisees.length ; h++)
	{
		if(nb==Number(formesUtilisees[h]))
		{
		   tfu=true;
		}   
	}
	return tfu;
}

//Fonction qui recherche le contenu de la case d'avant par exemple pour l'analyse ou le début de l'impasse
function positionDansTableau(maCase)
{
	for (i=0;i<tabNoCasePositionTabForme.length;i++)
		 {
			 if(tabNoCasePositionTabForme[i][0]==maCase)
			 {
				 return tabNoCasePositionTabForme[i][1];
			 }
		 }
}

function derniersTrous()
{
	for (i = 0 ; i < trou.length  ; i++)
	{
		
			var forme:Number=Math.floor(Math.random()*tabForme.length);
			var no:Number=trou[i][0];
			//On repère si le forme a déjà été utilisée. Si c'est le cas, on en prend une autre
			while(testFormeUtilisee(forme))
			{
				forme=Math.floor(Math.random()*tabForme.length);
			}
			formesUtilisees.push(forme);
			
			maCase[no].setTextH(tabFormeJuste[rechercheFormeDansCase(trou[i][1])], texteHaut_fmt);
			maCase[no].setTextB(tabForme[forme], texteBas_fmt);
			tabNoCasePositionTabForme.push([no,forme]);
			
		
	}
}