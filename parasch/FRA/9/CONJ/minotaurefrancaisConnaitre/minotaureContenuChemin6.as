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
"Ind. p. simple je",
"Ind. p. simple tu",
"Ind. p. simple il",
"Ind. p. simple nous",
"Ind. p. simple vous",
"Ind. p. simple elles",
"Ind. p. ant. je",
"Ind. p. ant. tu",
"Ind. p. ant. elle",
"Ind. p. ant. nous",
"Ind. p. ant. vous",
"Ind. p. ant. ils",
"Sub. prés. Je",
"Sub. prés. tu",
"Sub. prés. elle",
"Sub. prés. nous",
"Sub. prés. vous",
"Sub. prés. elles",
"Sub. passé je",
"Sub. passé tu",
"Sub. passé il",
"Sub. passé nous",
"Sub. passé vous",
"Sub. passé ils",
"Cond. prés. je",
"Cond. prés. tu",
"Cond. prés. on",
"Cond. prés. nous",
"Cond. prés. vous",
"Cond. prés. ils",
"Cond. passé je",
"Cond. passé tu",
"Cond. passé il",
"Cond. passé nous",
"Cond. passé vous",
"Cond. passé elles",
"Participe passé",
"Participe prés.",
"Imp. prés. (tu)",
"Imp. prés. (nous)",
"Imp. prés. (vous)"];
trace("tabForme.length"+tabForme.length);
//Initialisation du tableau contenant les formes justes
var tabFormeJuste : Array;

tabFormeJuste = ["je connais",
"tu connais",
"il connaît",
"nous connaissons",
"vous connaissez",
"elles connaissent",
"j'ai connu",
"tu as connu",
"on a connu",
"nous avons connu",
"vous avez connu",
"ils ont connu",
"je connaissais",
"tu connaissais",
"elle connaissait",
"nous connaissions",
"vous connaissiez",
"ils connaissaient",
"j'avais connu",
"tu avais connu",
"on avait connu",
"nous avions connu",
"vous aviez connu",
"elles avaient connu",
"je connaîtrai",
"tu connaîtras",
"elle connaîtra",
"nous connaîtrons",
"vous connaîtrez",
"ils connaîtront",
"j'aurai connu",
"tu auras connu",
"il aura connu",
"nous aurons connu",
"vous aurez connu",
"elles auront connu",
"je connus",
"tu connus",
"il connut",
"nous connûmes",
"vous connûtes",
"elles connurent",
"j'eus connu",
"tu eus connu",
"elle eut connu",
"nous eûmes connu",
"vous eûtes connu",
"ils eurent connu",
"que je connaisse",
"que tu connaisses",
"qu'elle connaisse",
"que nous connaissions",
"que vous connaissiez",
"qu'elles connaissent",
"que j'aie connu",
"que tu aies connu",
"qu'il ait connu",
"que nous ayons connu",
"que vous ayez connu",
"qu'ils aient connu",
"je connaîtrais",
"tu connaîtrais",
"on connaîtrait",
"nous connaîtrions",
"vous connaîtriez",
"ils connaîtraient",
"j'aurais connu",
"tu aurais connu",
"il aurait connu",
"nous aurions connu",
"vous auriez connu",
"elles auraient connu",
"connu",
"connaissant",
"connais",
"connaissons",
"connaissez"];
trace("tabFormeJuste.length"+tabFormeJuste.length);
//Initialisation du tableau contenant les formes fausses
var tabFormeFausse : Array;
tabFormeFausse = ["je conais",
"tu connait",
"il connais",
"nous connaisons",
"vous connaîtrez",
"elles connaisse",
"j'aie connu",
"tu as conu",
"on n'a connu",
"nous avions connu",
"vous aviez connu",
"ils sont connus",
"je connaisais",
"connais",
"elle connaissais",
"nous connaissons",
"vous connaissez",
"ils connaîtraient",
"j'aurais connu",
"tu aurais connu",
"on aurait connu",
"nous avons connu",
"vous avez connu",
"elles auraient connu",
"je connaîtrais",
"tu connaîtrais",
"elle connaîtrait",
"nous connaîtrions",
"vous connaîtriez",
"ils connaîtraient",
"j'aurais connu",
"tu aurais connu",
"il aurait connu",
"nous aurions connu",
"vous auriez connu",
"elles auraient connu",
"je connais",
"tu connis",
"il connu",
"nous connâmes",
"vous eûtes connu",
"elles conurent",
"je connus",
"tu connus",
"ielle connut",
"nous aurons connu",
"vous aurez connu",
"ils auront connu",
"que je connais",
"que tu connais",
"qu'elle connaît",
"que nous connaissons",
"que vous connaissez",
"qu'elle connaissait",
"que j'ai connu",
"que tu as connu",
"qu'il a connu",
"que nous avons connu",
"que vous avez connu",
"qu'ils ont connu",
"je connaissais",
"tu connaîtra",
"on connaîtra",
"nous connaîtrons",
"vous connaîtrez",
"ils connaissraient",
"j'aurai connu",
"tu auras connu",
"il aura connu",
"nous aurons connu",
"vous aurez connu",
"elles avaient connu",
"connaissant",
"connu",
"connait",
"connaisons",
"conaissez"];
trace("tabFormeFausse.length"+tabFormeFausse.length);
//Initialisation du tableau contenant les commentaires
var tabCommentaires : Array;
tabCommentaires = ["S'il y a deux \"n\" à l'infinitif, il y en a aussi deux dans la conjugaison.",
"Ce n'est pas la bonne terminaison.",
"Ce n'est pas la bonne terminaison.",
"Si tu l'écris de cette façon, la prononciation n'est pas correcte.",
"C'est un indicatif futur simple.",
"Ce n'est pas la bonne terminaison.",
"C'est un subjonctif passé.",
"S'il y a deux \"n\" à l'infinitif, il y en a aussi deux dans la conjugaison.",
"Ne confonds pas la liaison et la forme négative.",
"C'est un indicatif plus-que-parfait.",
"C'est un indicatif plus-que-parfait.",
"C'est un passif. Si tu peux utiliser les deux auxiliaires, tu dois employer avoir.",
"Si tu l'écris de cette façon, la prononciation n'est pas correcte.",
"C'es un impératif présent.",
"Ce n'est pas la bonne terminaison.",
"C'est un indicatif présent.",
"C'est un indicatif présent.",
"C'est un conditionnel présent.",
"C'est un conditionnel passé.",
"C'est un conditionnel passé.",
"C'est un conditionnel passé.",
"C'est un indicatif passé composé.",
"C'est un indicatif passé composé.",
"C'est un conditionnel passé.",
"C'est un conditionnel présent.",
"C'est un conditionnel présent.",
"C'est un conditionnel présent.",
"C'est un conditionnel présent.",
"C'est un conditionnel présent.",
"C'est un conditionnel présent.",
"C'est un conditionnel passé.",
"C'est un conditionnel passé.",
"C'est un conditionnel passé.",
"C'est un conditionnel passé.",
"C'est un conditionnel passé.",
"C'est un conditionnel passé.",
"C'est un indicatif présent.",
"Cette forme n'existe pas.",
"Il manque la terminaison.",
"Ce sont les verbes en -er qui font leur passé simple avec le \"a\".",
"C'est un indicatif passé antérieur.",
"S'il y a deux \"n\" à l'infinitif, il y en a aussi deux dans la conjugaison.",
"C'est un indicatif passé simple.",
"C'est un indicatif passé simple.",
"C'est un indicatif passé simple.",
"C'est un indicatif futur antérieur.",
"C'est un indicatif futur antérieur.",
"C'est un indicatif futur antérieur.",
"C'est un indicatif présent.",
"C'est un indicatif présent.",
"C'est un indicatif présent.",
"C'est un indicatif présent.",
"C'est un indicatif présent.",
"C'est un indicatif imparfait.",
"C'est un indicatif passé composé.",
"C'est un indicatif passé composé.",
"C'est un indicatif passé composé.",
"C'est un indicatif passé composé.",
"C'est un indicatif passé composé.",
"C'est un indicatif passé composé.",
"C'est un indicatif imparfait.",
"C'est un indicatif futur simple.",
"C'est un indicatif futur simple.",
"C'est un indicatif futur simple.",
"C'est un indicatif futur simple.",
"Cette forme n'existe pas.",
"C'est un indicatif futur antérieur.",
"C'est un indicatif futur antérieur.",
"C'est un indicatif futur antérieur.",
"C'est un indicatif futur antérieur.",
"C'est un indicatif futur antérieur.",
"C'est un indicatif plus-que-parfait.",
"C'est le participe présent.",
"C'est le participe passé.",
"Ce n'est pas la bonne terminaison.",
"Si tu l'écris de cette façon, la prononciation n'est pas correcte.",
"S'il y a deux \"n\" à l'infinitif, il y en a aussi deux dans la conjugaison."];

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