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

tabFormeJuste = ["je vais",
"tu vas",
"il va",
"nous allons",
"vous allez",
"elles vont",
"je suis allé (e)",
"tu es allé (e) ",
"on est allé",
"nous sommes allé(e)s",
"vous êtes allé(e) (s)",
"ils sont allés",
"j'allais",
"tu allais",
"elle allait",
"nous allions",
"vous alliez",
"ils allaient",
"j'étais  allé ( e)",
"tu étais allé (e)",
"on était allé",
"nous étions allé (e)s",
"vous étiez allé (e) (s)",
"elles étaient allées",
"j'irai",
"tu iras",
"elle ira",
"nous irons",
"vous irez",
"ils iront",
"je serai allé (e) ",
"tu seras allé (e)",
"il sera allé",
"nous serons allé (e)s",
"vous serez allé (e)(s)",
"elles seront allées",
"j'allai",
"tu allas",
"il alla",
"nous allâmes",
"vous allâtes",
"elles allèrent",
"je fus allé (e)",
"tu fus allé (e)",
"elle fut allée",
"nous fûmes allé (e)s",
"vous fûtes allé (e)(s)",
"ils furent allés",
"que j'aille",
"que tu ailles",
"qu'elle aille",
"que nous allions",
"que vous alliez",
"qu'elles aillent",
"que je sois allé (e)",
"que tu sois allé (e)",
"qu'il soit allé",
"que nous soyons allé (e)s",
"que vous soyez allé (e)(s)",
"qu'ils soient allés",
"j'irais",
"tu irais",
"on irait",
"nous irions",
"vous iriez",
"ils iraient",
"je serais allé (e)",
"tu serais allé (e)",
"il serait allé",
"nous serions allé (e)s",
"vous seriez allé (e)(s)",
"elles seraient allées",
"allé",
"allant",
"va",
"allons",
"allez"];
trace("tabFormeJuste.length"+tabFormeJuste.length);
//Initialisation du tableau contenant les formes fausses
var tabFormeFausse : Array;
tabFormeFausse = ["j'alle",
"tu va",
"il vat",
"nous allions",
"vous aillez",
"elles vons",
"j'ai allé",
"tu est allé",
"on ait allé",
"nous avons été",
"vous serez allés",
"ils ont été",
"j'allai",
"tu allai",
"elle allais",
"nous aillons",
"vous aillez",
"ils allait",
"j'avais allé",
"tu fus allé",
"on est allé",
"nous sommes allés",
"vous êtes allé",
"elles seraient allées",
"j'irais",
"tu irais",
"elle irait",
"nous allerons",
"vous irer",
"ils irons",
"je serais allé",
"tu serais allé",
"il serait allé",
"nous serions allées",
"vous seriez allé",
"elles seraient allées",
"j'allais",
"tu allais",
"il allat",
"nous allûmes",
"vous allîtes",
"elles allaient",
"je serai allé",
"tu eus allé",
"elle eut été",
"nous seront allés",
"vous eûtes été",
"ils allèrent",
"que je vais",
"que tu vailles",
"qu'elle va",
"que nous aillons",
"que vous aillez",
"qu'elles vaillent",
"que j'aie été",
"que tu aies été",
"qu'il ait été",
"que nous ayons été",
"que vous ayez été",
"qu'ils aient été",
"j'irai",
"tu iras",
"on ira",
"nous irons",
"vous irez",
"ils iront",
"j'aurais été",
"tu aurais été",
"il aurait été",
"nous aurions été",
"vus auriez été",
"elles auraient été",
"allant",
"allé",
"vas",
"aillons",
"aillez"];
trace("tabFormeFausse.length"+tabFormeFausse.length);
//Initialisation du tableau contenant les commentaires
var tabCommentaires : Array;
tabCommentaires = ["Ce verbe estirrégulier.",
"Il manque la terminaison.",
"Ce n'est pas la bonne termnaison.",
"C'est de l'indicatif imparfait.",
"C'est le verbe ailler (mettre de l'ail)!",
"Ce n'est pas la bonne termnaison.",
"Ce n'est pas le bon auxiliaire.",
"Attention, c'est la deuxième personne du singulier, pas la troisième.",
"Attention, ta conjugaison du verbe être laisse à désirer.",
"C'est le verbe être, pas aller!",
"C'est de l'indicatif futur antérieur.",
"C'est le verbe être, pas aller!",
"C'est un indicatif passé simple.",
"Cette forme n'existe pas.",
"Ce n'est pas la bonne termnaison.",
"C'est le verbe ailler (mettre de l'ail)!",
"C'est le verbe ailler (mettre de l'ail)!",
"La forme demandée n'est pas au singulier.",
"Ce n'est pas le bon auxiliaire.",
"C'est de l'indicatif passé antérieur.",
"C'est de l'indicatif passé composé.",
"C'est de l'indicatif passé composé.",
"C'est de l'indicatif passé composé.",
"C'est du conditionnel passé.",
"C'est du conditionnel présent.",
"C'est du conditionnel présent.",
"C'est du conditionnel présent.",
"Aller est un verbe irrégulier.",
"Ce n'est pas la bonne termnaison.",
"Ce n'est pas la bonne termnaison.",
"C'est du conditionnel passé.",
"C'est du conditionnel passé.",
"C'est du conditionnel passé.",
"C'est du conditionnel passé.",
"C'est du conditionnel passé.",
"C'est du conditionnel passé.",
"C'est de l'indicatif imparfait.",
"C'est de l'indicatif imparfait.",
"Ce n'est pas la bonne terminaison.",
"Cette forme n'existe pas.",
"Cette forme n'existe pas.",
"C'est de l'indicatif imparfait.",
"C'est de l'indicatif futur antérieur.",
"Ce n'est pas le bon auxiliaire.",
"C'est le verbe être, pas aller!",
"C'est de l'indicatif futur antérieur.",
"C'est le verbe être, pas aller!",
"C'est un indicatif passé simple.",
"C'est un indicatif présent.",
"C'est le verbe valoir.",
"C'est un indicatif présent.",
"Le \"i\" n'est pas au bon endroit.",
"Le \"i\" n'est pas au bon endroit.",
"C'es le verbe valoir.",
"C'est le verbe être.",
"C'est le verbe être.",
"C'est le verbe être.",
"C'est le verbe être.",
"C'est le verbe être.",
"C'est le verbe être.",
"C'est un indicatif futur simple.",
"C'est un indicatif futur simple.",
"C'est un indicatif futur simple.",
"C'est un indicatif futur simple.",
"C'est un indicatif futur simple.",
"C'est un indicatif futur simple.",
"C'est le verbe être.",
"C'est le verbe être.",
"C'est le verbe être.",
"C'est le verbe être.",
"C'est le verbe être.",
"C'est le verbe être.",
"C'est le participe présent.",
"C'est le participe passé.",
"Ce verbe est particulier. Il ne garde le \"s\" que s'il est suivi de \"y\" (vas-y).",
"C'est le verbe ailler (mettre de l'ail)!",
"C'est le verbe ailler (mettre de l'ail)!"];

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