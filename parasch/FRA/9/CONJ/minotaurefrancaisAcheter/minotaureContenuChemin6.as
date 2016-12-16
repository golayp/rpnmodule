/**
 * ...
 * @author Michel Roquier et Jean-michel Luthi
 */

//Initialisation du tableau contenant Formes à faire
var tabForme : Array;

tabForme = ["ind. prés. je", "ind. prés. tu", "ind. prés. il", "ind. prés. nous", "ind. prés. vous", "ind. prés. elles", "ind. p. comp. je",
			"ind. p. comp. tu", "ind. p. comp. on", "ind. p. comp. nous", "ind. p. comp. vous", "ind. p. comp. ils", "ind. imp. je", "ind. imp. tu",
			"ind. imp. elle", "ind. imp. nous", "ind. imp. vous", "ind. imp. ils", "ind. pqpft. je", "ind. pqpft. tu", "ind. pqpft. on", "ind. pqpft. nous",
			"ind. pqpft. vous", "ind. pqpft elles"," ind. futur simple je", "ind. futur simple tu", "ind. futur simple il", "ind. futur simple nous", "ind. futur simple vous",
			"ind. futur simple elles", "ind. futur ant. je", "ind. futur ant. tu", "ind. futur ant. elle", "ind. futur ant. nous", "ind. futur ant. vous", "ind. futur ant. ils"," ind. p. simple je", "ind. p. simple tu", "ind. p. simple il", "ind. p. simple nous", "ind. p. simple vous",
			"ind. p. simple elles", "ind. p. ant. je", "ind. p. ant. tu", "ind. p. ant. elle", "ind. p. ant. nous", "ind. p. ant. vous", "ind. p. ant. ils",
			"sub. prés. je", "sub. prés. tu", "sub. prés. elle", "sub. prés. nous", "sub. prés. vous", "sub. prés. elles", "sub. passé je", "sub. passé tu",
			"sub. passé il", "sub. passé nous", "sub. passé vous", "sub. passé ils", "cond. prés. je", "cond. prés. tu", "cond. prés. on", "cond. prés. nous",
			"cond. prés. vous","cond. prés. ils","cond. passé je","cond. passé tu","cond. passé il","cond. passé nous","cond. passé vous","cond. passé elles","participe passé","participe prés.","imp. prés. (tu)","imp. prés. (nous)","imp. prés. (vous)"];
trace("tabForme.length"+tabForme.length);
//Initialisation du tableau contenant les formes justes
var tabFormeJuste : Array;

tabFormeJuste = ["j'achète","tu achètes","il achète","nous achetons","vous achetez","elles achètent","j'ai acheté","tu as acheté",
											"on a acheté","nous avons acheté","vous avez acheté","ils ont acheté","j'achetais","tu achetais",
											"elle achetait","nous achetions","vous achetiez","ils achetaient","j'avais acheté","tu avais acheté","on avait acheté",
											"nous avions acheté","vous aviez acheté","elles avaient acheté","j'achèterai","tu achèteras","il achètera",
											"nous achèterons","vous achèterez","elles achèteront","j'aurai acheté","tu auras acheté","elle aura acheté","nous aurons acheté",
											"vous aurez acheté","ils auront acheté","j'achetai","tu achetas","il acheta","nous achetâmes","vous achetâtes",
											"elles achetèrent","j'eus acheté","tu eus acheté","elle eut acheté","nous eûmes acheté","vous eûtes acheté","ils eurent acheté",
											"que j'achète","que tu achètes","qu'elle achète","que nous achetions","que vous achetiez","qu'elles achètent","que j'aie acheté",
											"que tu aies  acheté","qu'il ait  acheté","que nous ayons  acheté","que vous ayez  acheté","qu'ils aient acheté","j'achèterais",
											"tu achèterais","on achèterait","nous achèterions","vous achèteriez","ils achèteraient","j'aurais acheté","tu aurais acheté",
											"il aurait acheté","nous aurions acheté","vous auriez acheté","elles auraient acheté","acheté","achetant","achète","achetons",
											"achetez"];
trace("tabFormeJuste.length"+tabFormeJuste.length);
//Initialisation du tableau contenant les formes fausses
var tabFormeFausse : Array;
tabFormeFausse = ["j'achette","tu achette","il achette","nous achètons","vous achètez","elles achetent","j'aie acheté","tu a acheté","on avait acheté","nous avions acheté",
				  "vous aurez acheté","ils sont acheté","j'achetai","tu achetait","elle achetais","nous achetons","vous achetez","ils achetait","j'aurai acheté","tu aurais acheté",
				  "on eut acheté","nous avons acheté","vous avez acheté","elles avait acheté","j'achetterai","tu achetteras","elle achettera","nous achèterions","vous achèteriez",
				  "ils achèterons","j'aurais acheté","tu aurais acheté","il avait acheté","nous aurions acheté","vous auriez acheté","elles aurons acheté","j'achetais",
				  "tu acheta","il achetait","nous achetions","vous achetates","elles achetirent","jus acheté","tu us acheté","elle aura acheté","nous achetâmes",
				  "vous achetâtes","ils achetèrent","que j'achette","que tu achettes","qu'elle achette","que nous achetons","que vous achetez","qu'elles achettent",
				  "que j'ai acheté","que tu as acheté","qu'il a acheté","que nous avons acheté","que vous avez acheté","qu'ils ont acheté","j'achèterai","tu achèteras",
				  "on achètera","nous achèterons","vous achèterez","ils achèteront","j'aurai acheté","tu auras acheté","il aura acheté","nous aurons acheté","vous aurez acheté",
				  "elles auront acheté","achetant","acheté","achette","acheton","achetiez"];
trace("tabFormeFausse.length"+tabFormeFausse.length);
//Initialisation du tableau contenant les commentaires
var tabCommentaires : Array;
tabCommentaires = ["Le son [ai] ne se fait pas en doublant la consonne pour ce verbe.","Le son [ai] ne se fait pas en doublant la consonne pour ce verbe.",
				   "Le son [ai] ne se fait pas en doublant la consonne pour ce verbe.","Le \"e\" ne se prononce pas [ai] dans cette forme.",
				   "Le \"e\" ne se prononce pas [ai] dans cette forme.","Attention, le \"e\" chante [ai] dans cette forme","Cette forme est au subjonctif passé, pas à l'indicatif passé composé.",
				   "Attention, c'est la deuxième personne du singulier.","Cette forme est à l'indicatif plus-que-parfait, pas à l'indicatif passé composé.",
				   "Cette forme est à l'indicatif plus-que-parfait, pas à l'indicatif passé composé.","Cette forme est à l'indicatif futur antérieur, pas à l'indicatif passé composé.",
				   "Ce verbe  se conjugue avec l'auxiliaire avoir.","Cette forme est à l'indicatif passé simple, pas à l'indicatif imparfait.",
				   "Cette terminaison n'existe pas avec \"tu\".","Cette terminaison n'existe pas avec \"elle\".","Cette forme est à l'indicatif présent, pas à l'indicatif imparfait.",
				   "Cette forme est à l'indicatif présent, pas à l'indicatif imparfait.","Attention, c'est un pluriel.",
				   "Cette forme est à l'indicatif futur antérieur, pas à l'indicatif plus-que-parfait.","Cette forme est au conditionnel passé, pas à l'indicatif plus-que-parfait.",
				   "Cette forme est à l'indicatif passé antérieur, pas à l'indicatif plus-que-parfait.","Cette forme est à l'indicatif passé composé, pas à l'indicatif plus-que-parfait.",
				   "Cette forme est à l'indicatif passé composé, pas à l'indicatif plus-que-parfait.","Attention, c'est un pluriel.",
				   "Le son [ai] ne se fait pas en doublant la consonne pour ce verbe.","Le son [ai] ne se fait pas en doublant la consonne pour ce verbe.",
				   "Le son [ai] ne se fait pas en doublant la consonne pour ce verbe.","Cette forme est au conditionnel présent, pas à l'indicatif futur simple.",
				   "Cette forme est au conditionnel présent, pas à l'indicatif futur simple.","Cette terminaison n'existe pas avec \"ils\".",
				   "Cette forme est au conditionnel passé, pas à l'indicatif futur antérieur.","Cette forme est au conditionnel passé, pas à l'indicatif futur antérieur.",
				   "Cette forme est à l'indicatif plus-que-parfait, pas à l'indicatif futur antérieur.","Cette forme est au conditionnel passé, pas à l'indicatif futur antérieur.",
				   "Cette forme est au conditionnel passé, pas à l'indicatif futur antérieur.","Cette terminaison n'existe pas avec \"elles\".",
				   "Cette forme est à l'indicatif imparfait, pas à l'indicatif passé simple.","Il manque la terminaison.",
				   "Cette forme est à l'indicatif imparfait, pas à l'indicatif passé simple.","Cette forme est à l'indicatif imparfait, pas à l'indicatif passé simple.",
				   "Il manque un accent circonflexe.","Tous les verbes en -er ont pour terminaison -èrent à la troisième personne du pluriel.",
				   "Attention, ce n'est pas de la phonétique!","L'auxiliaire avoir ne s'écrit pas comme ça!","Cette forme est à l'indicatif futur antérieur, pas à l'indicatif passé antérieur.",
				   "Cette forme est à l'indicatif passé simple, pas à l'indicatif passé antérieur.","Cette forme est à l'indicatif passé simple, pas à l'indicatif passé antérieur.",
				   "Cette forme est à l'indicatif passé simple, pas à l'indicatif passé antérieur.","Le son [ai] ne se fait pas en doublant la consonne pour ce verbe.",
				   "Le son [ai] ne se fait pas en doublant la consonne pour ce verbe.","Le son [ai] ne se fait pas en doublant la consonne pour ce verbe.",
				   "La première personne du pluriel du subjonctif présent s'écrit comme la première personne du pluriel de l'indicatif imparfait.",
				   "La première personne du pluriel du subjonctif présent s'écrit comme la première personne du pluriel de l'indicatif imparfait.",
				   "Le son [ai] ne se fait pas en doublant la consonne pour ce verbe.","Cette forme est à l'indicatif passé composé, pas au subjonctif passé.",
				   "Cette forme est à l'indicatif passé composé, pas au subjonctif passé.","Cette forme est à l'indicatif passé composé, pas au subjonctif passé.",
				   "Cette forme est à l'indicatif passé composé, pas au subjonctif passé.",
"Cette forme est à l'indicatif passé composé, pas au subjonctif passé.","Cette forme est à l'indicatif passé composé, pas au subjonctif passé.",
"Cette forme est à l'indicatif futur simple, pas au conditionnel présent.","Cette forme est à l'indicatif futur simple, pas au conditionnel présent.",
"Cette forme est à l'indicatif futur simple, pas au conditionnel présent.","Cette forme est à l'indicatif futur simple, pas au conditionnel présent.",
"Cette forme est à l'indicatif futur simple, pas au conditionnel présent.","Cette forme est à l'indicatif futur simple, pas au conditionnel présent.",
"Cette forme est à l'indicatif futur antérieur, pas au conditionnel passé.","Cette forme est à l'indicatif futur antérieur, pas au conditionnel passé.",
"Cette forme est à l'indicatif futur antérieur, pas au conditionnel passé.","Cette forme est à l'indicatif futur antérieur, pas au conditionnel passé.",
"Cette forme est à l'indicatif futur antérieur, pas au conditionnel passé.","Cette forme est à l'indicatif futur antérieur, pas au conditionnel passé.",
"Cette forme est au participe présent, pas au participe passé.","Cette forme est au participe passé, pas au participe présent.",
"Le son [ai] ne se fait pas en doublant la consonne pour ce verbe.","Il manque la terminaison.","L'impératif se fait à partir du présent, pas de l'imparfait."];

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