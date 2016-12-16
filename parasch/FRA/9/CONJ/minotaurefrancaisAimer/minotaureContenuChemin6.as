/**
 * ...
 * @author Michel Roquier et Jean-michel Luthi
 */
//Initialisation du tableau contenant Formes à faire
var tabForme : Array;
tabForme = ["Ind. prés. je",
"Ind. prés. tu",
"ind. prés. il",
"Ind. prés. nous",
"Ind. prés. vous",
"Ind. prés. elles",
"Ind. p. comp. je",
"Ind. p. comp. tu",
"Ind. p. comp. on",
"Ind. p. comp. nous",
"Ind. p. comp. vous",
"Ind. p. comp. ils",
"Ind. imp. je",
"Ind. imp. tu",
"Ind. imp. elle",
"Ind. imp. nous",
"Ind. imp. vous",
"Ind. imp. ils",
"Ind. pqpft. je",
"Ind. pqpft. tu",
"Ind. pqpft. on",
"Ind. pqpft. nous",
"Ind. pqpft. vous",
"Ind. pqpft elles",
"Ind futur simple je",
"Ind futur simple tu",
"Ind futur simple elle",
"Ind futur simple nous",
"Ind futur simple vous",
"Ind futur simple ils",
"Ind futur ant. je",
"Ind futur ant. tu",
"Ind futur ant. il",
"Ind futur ant. nous",
"Ind futur ant. vous",
"Ind futur ant. elles",
"Ind. p. simple il",
"Ind. p. simple elles",
"Sub. prés. Je",
"Sub. prés. tu",
"Sub. prés. elle",
"Sub. prés. nous",
"Sub. prés. vous",
"Sub. prés. elles",
"Cond. prés. je",
"Cond. prés. tu",
"Cond. prés. on",
"Cond. prés. nous",
"Cond. prés. vous",
"Cond. prés. ils",
"Imp. prés. (tu)",
"Imp. prés. (nous)",
"Imp. prés. (vous)"];

//trace("tabForme.length"+tabForme.length);
//Initialisation du tableau contenant les formes justes
var tabFormeJuste : Array;
tabFormeJuste = ["j'aime",
"tu aimes",
"il aime",
"nous aimons",
"vous aimez",
"elles aiment",
"j'ai aimé",
"tu as aimé",
"on a aimé",
"nous avons aimé",
"vous avez aimé",
"ils ont aimé",
"j'aimais",
"tu aimais",
"elle aimait",
"nous aimions",
"vous aimiez",
"ils aimaient",
"j'avais aimé",
"tu avais aimé",
"on avait aimé",
"nous avions aimé",
"vous aviez aimé",
"elles avaient aimé",
"j'aimerai",
"tu aimeras",
"elle aimera",
"nous aimerons",
"vous aimerez",
"ils aimeront",
"j'aurai aimé",
"tu auras aimé",
"il aura aimé",
"nous aurons aimé",
"vous aurez aimé",
"elles auront aimé",
"il aima",
"elles aimèrent",
"que j'aime",
"que tu aimes",
"qu'elle aime",
"que nous aimions",
"que vous aimiez",
"qu'elles aiment",
"j'aimerais",
"tu aimerais",
"on aimerait",
"nous aimerions",
"vous aimeriez",
"ils aimeraient",
"aime",
"aimons",
"aimez"];
//trace("tabFormeJuste.length"+tabFormeJuste.length);

//Initialisation du tableau contenant les formes fausses
var tabFormeFausse : Array;
tabFormeFausse = ["j'aimes",
"tu aime",
"il aima",
"nous aimont",
"vous aimiez",
"elles aimes",
"g aimé",
"tu a aimé",
"on avait aimé",
"nous avions aimé",
"vous aurez aimé",
"ils sont aimés",
"j'aimai",
"tu aimait",
"elle aimais",
"nous aimons",
"vous aimez",
"ils aimait",
"j'aurai aimé",
"tu aurais aimé",
"on eut aimé",
"nous avons aimé",
"vous avez aimé",
"elles avait aimé",
"j'aimerais",
"tu aimerais",
"elle aimerait",
"nous aimerions",
"vous aimeriez",
"ils aimerons",
"j'aurais aimé",
"tu aurais aimé",
"il avait aimé",
"nous aurions aimé",
"vous auriez aimé",
"elles aurons aimé",
"il aimait",
"elles aimurent",
"que j'aimais",
"que tu aimerais",
"qu'elle aima",
"que nous aimons",
"que vous aimez",
"qu'elles aimaient",
"j'aimerai",
"tu aimeras",
"on aimera",
"nous aimerons",
"vous aimerez",
"ils aimeront",
"aimes",
"aimont",
"aimiez"];
//trace("tabFormeFausse.length"+tabFormeFausse.length);

//Initialisation du tableau contenant les commentaires
var tabCommentaires : Array;
tabCommentaires = ["La terminaison n'est pas correcte.",
"La terminaison n'est pas correcte.",
"C'est de l'indicatif passé simple, pas de l'indicatif présent.",
"La terminaison n'est pas correcte.",
"C'est de l'indicatif imparfait, pas de l'indicatif présent.",
"La terminaison d'un verbe à la troisième personne du pluriel ne peut jamais être s.",
"Ce n'est pas un SMS!",
"Attention, c'est la deuxième personne du singulier.",
"Cette forme est à l'indicatif plus-que-parfait, pas à l'indicatif passé composé.",
"Cette forme est à l'indicatif plus-que-parfait, pas à l'indicatif passé composé.",
"Cette forme est à l'indicatif futur antérieur, pas à l'indicatif passé composé.",
"Ce verbe  se conjugue avec l'auxiliaire avoir.",
"Cette forme est à l'indicatif passé simple, pas à l'indicatif imparfait.",
"Cette terminaison n'existe pas avec tu.",
"Cette terminaison n'existe pas avec elle.",
"Cette forme est à l'indicatif présent, pas à l'indicatif imparfait.",
"Cette forme est à l'indicatif présent, pas à l'indicatif imparfait.",
"Attention, c'est un pluriel.",
"Cette forme est à l'indicatif futur antérieur, pas à l'indicatif plus-que-parfait.",
"Cette forme est au conditionnel passé, pas à l'indicatif plus-que-parfait.",
"Cette forme est à l'indicatif passé antérieur, pas à l'indicatif plus-que-parfait.",
"Cette forme est à l'indicatif passé composé, pas à l'indicatif plus-que-parfait.",
"Cette forme est à l'indicatif passé composé, pas à l'indicatif plus-que-parfait.",
"Attention, c'est un pluriel.",
"Cette forme est au conditionnel présent, pas à l'indicatif futur simple.",
"Cette forme est au conditionnel présent, pas à l'indicatif futur simple.",
"Cette forme est au conditionnel présent, pas à l'indicatif futur simple.",
"Cette forme est au conditionnel présent, pas à l'indicatif futur simple.",
"Cette forme est au conditionnel présent, pas à l'indicatif futur simple.",
"Cette terminaison n'existe pas avec ils.",
"Cette forme est au conditionnel passé, pas à l'indicatif futur antérieur.",
"Cette forme est au conditionnel passé, pas à l'indicatif futur antérieur.",
"Cette forme est à l'indicatif plus-que-parfait, pas à l'indicatif futur antérieur.",
"Cette forme est au conditionnel passé, pas à l'indicatif futur antérieur.",
"Cette forme est au conditionnel passé, pas à l'indicatif futur antérieur.",
"Cette terminaison n'existe pas avec elles.",
"Cette forme est à l'indicatif imparfait, pas à l'indicatif passé simple.",
"Tous les verbes en -er ont pour terminaison -èrent à la troisième personne du pluriel.",
"A part pour nous et vous, le subjonctif présent se fait à partir de l'indicatif présent pour les verbes en -er.",
"A part pour nous et vous, le subjonctif présent se fait à partir de l'indicatif présent pour les verbes en -er.",
"A part pour nous et vous, le subjonctif présent se fait à partir de l'indicatif présent pour les verbes en -er.",
"La première personne du pluriel du subjonctif présent s'écrit comme la première personne du pluriel de l'indicatif imparfait.",
"La première personne du pluriel du subjonctif présent s'écrit comme la première personne du pluriel de l'indicatif imparfait.",
"A part pour nous et vous, le subjonctif présent se fait à partir de l'indicatif présent pour les verbes en -er.",
"Cette forme est à l'indicatif futur simple, pas au conditionnel présent.",
"Cette forme est à l'indicatif futur simple, pas au conditionnel présent.",
"Cette forme est à l'indicatif futur simple, pas au conditionnel présent.",
"Cette forme est à l'indicatif futur simple, pas au conditionnel présent.",
"Cette forme est à l'indicatif futur simple, pas au conditionnel présent.",
"Cette forme est à l'indicatif futur simple, pas au conditionnel présent.",
"Bien que ce soit la deuxième personne du singulier, on ne met pas le s à l'impératif des verbes en -er.",
"Ce n'est pas la bonne terminaison.",
"L'impératif se fait à partir du présent, pas de l'imparfait."];
//trace("tabCommentaires.length"+tabCommentaires.length);

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