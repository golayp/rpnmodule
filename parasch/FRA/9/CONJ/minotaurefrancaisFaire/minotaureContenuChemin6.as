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
//trace("tabForme.length"+tabForme.length);
//Initialisation du tableau contenant les formes justes
var tabFormeJuste : Array;
tabFormeJuste = ["je fais", "tu fais", "il fait", "nous faisons", "vous faites", "elles font", "j’ai fait", "tu as fait"," on a fait", "nous avons fait",
				 "vous avez fait", "ils ont fait", "je faisais", "tu faisais", "elle faisait", "nous faisions", "vous faisiez", "ils faisaient",
				 "j’avais fait", "tu avais fait", "on avait fait", "nous avions fait", "vous aviez fait", "elles avaient fait", "je fis",
				 "tu fis", "il fit", "nous fîmes", "vous fîtes", "elles firent", "j’eus fait", "tu eus fait", "elle eut fait", "nous eûmes fait",
				 "vous eûtes fait", "ils eurent fait", "que je fasse", "que tu fasses", "qu’elle fasse", "que nous fassions", "que vous fassiez",
				 "qu’elles fassent", "que j’aie fait", "que tu aies fait", "qu’il ait fait", "que nous ayons fait", "que vous ayez fait",
				 "qu’ils aient fait", "je ferais", "tu ferais", "on ferait", "nous ferions", "vous feriez", "elles feraient", "j’aurais fait",
				 "tu aurais fait", "il aurait fait", "nous aurions fait", "vous auriez fait", "elles auraient fait", "fait", "faisant", "fais",
				 "faisons", "faites"];
//trace("tabFormeJuste.length"+tabFormeJuste.length);
//Initialisation du tableau contenant les formes fausses
var tabFormeFausse : Array;
tabFormeFausse = ["Je fait", "tu fait", "il fais", "nous fesons", "vous faîtes", "elles faisent", "j’eus fait", "tu avais fait", "on na fait", 
				  "nous avions fait", "vous aviez fait", "ils sont fait", "je fesais", "tu fesais", "elle fesait", "nous fesions", 
				  "vous fesiez", "ils faisait", "j’avait fait", "tu avez fait", "on avais fait", "nous savions fait", "vous avez fait", 
				 "elles avait fait", "je fîs", "tu fîs", "il fît", "nous fûmes", "vous fûtes", "elles furent", "j’eusse fait", 
				  "tu aurais fait", "elle ut fait", "nous sûmes fait", "vous eûte fait", "ils urent fait", "que je fais", "que tu fais", 
				  "qu’elle fait", "que nous faisons", "que vous fesiez", "elles facent", "que j’ais fait", "que tu ais fait", "qu’il aie fait", 
				  "que nous ayions fait", "que vous ayiez fait", "qu’ils ont fait", "je ferai", "tu feras", "on ferrait", "nous ferons", 
				  "vous ferez", "elles ferait", "j’aurai fait", "tu auras fait", "il aura fait", "nous aurons fait", "vous aurez fait", "elles aurait fait", "fais", 
				  "faisan", "fait", "fesons", "faisez"];
//trace("tabFormeFausse.length"+tabFormeFausse.length);
//Initialisation du tableau contenant les commentaires
var tabCommentaires : Array;
tabCommentaires = ["Cette terminaison n’est pas possible.", "Cette terminaison n’est pas possible.", "Cette terminaison n’est pas possible.", 
				   "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", "Il n’y a pas de circonflexe.", 
				   "Ce n’est pas le temps demandé.", "Ce n’est pas le temps demandé.", "Ce n’est pas le temps demandé.", 
				   "C’est l’auxiliaire avoir, pas navoir !", "Ce n’est pas le temps demandé.", "Ce n’est pas le temps demandé.", 
				   "Tu dois employer l’auxiliaire avoir, pas l’auxiliaire être.", "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", 
				   "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", 
				   "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", 
				   "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", 
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
				   "C’est un futur simple, pas un conditionnel présent.", "Attention, c’est la troisième personne du pluriel !", 
				   "C’est un futur antérieur, pas un conditionnel passé.", "C’est un futur antérieur, pas un conditionnel passé.", 
				   "C’est un futur antérieur, pas un conditionnel passé.", "C’est un futur antérieur, pas un conditionnel passé.", 
				   "C’est un futur antérieur, pas un conditionnel passé.", "Attention, c’est la troisième personne du pluriel !", 
				   "On dit faite au féminin, pas faise.", "Il manque le « t ».", "Cette terminaison n’est pas possible.", 
				   "La prononciation est correcte, mais ça ne s’écrit pas de cette manière.", 
				   "Attention, le verbe faire, comme le verbe dire, est irrégulier à l’impératif."];
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