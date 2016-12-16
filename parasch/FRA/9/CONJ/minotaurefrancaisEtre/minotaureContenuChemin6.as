/**
 * ...
 * @author Michel Roquier et Jean-michel Luthi
 */

//Initialisation du tableau contenant Formes à faire
var tabForme : Array;
tabForme = ["Ind. prés. je"
,"Ind. prés. tu"
,"ind. prés. il"
,"Ind. prés. nous"
,"Ind. prés. vous"
,"Ind. prés. elles"
,"Ind. p. comp. je"
,"Ind. p. comp. tu"
,"Ind. p. comp. on"
,"Ind. p. comp. nous"
,"Ind. p. comp. vous"
,"Ind. p. comp. ils"
,"Ind. imp. je"
,"Ind. imp. tu"
,"Ind. imp. elle"
,"Ind. imp. nous"
,"Ind. imp. vous"
,"Ind. imp. ils"
,"Ind. pqpft. je"
,"Ind. pqpft. tu"
,"Ind. pqpft. on"
,"Ind. pqpft. nous"
,"Ind. pqpft. vous"
,"Ind. pqpft elles"
,"Ind futur simple je"
,"Ind futur simple tu"
,"Ind futur simple elle"
,"Ind futur simple nous"
,"Ind futur simple vous"
,"Ind futur simple ils"
,"Ind futur ant. je"
,"Ind futur ant. tu"
,"Ind futur ant. il"
,"Ind futur ant. nous"
,"Ind futur ant. vous"
,"Ind futur ant. elles"
,"Ind. p. simple il"
,"Ind. p. simple elles"
,"Sub. prés. Je"
,"Sub. prés. tu"
,"Sub. prés. elle"
,"Sub. prés. nous"
,"Sub. prés. vous"
,"Sub. prés. elles"
,"Cond. prés. je"
,"Cond. prés. tu"
,"Cond. prés. on"
,"Cond. prés. nous"
,"Cond. prés. vous"
,"Cond. prés. ils"
,"Imp. prés. (tu)"
,"Imp. prés. (nous)"
,"Imp. prés. (vous)"
];
//trace("tabForme.length"+tabForme.length);
//Initialisation du tableau contenant les formes justes
var tabFormeJuste : Array;
tabFormeJuste = ["je suis"
				 ,"tu es"
,"il est"
,"nous sommes"
,"vous êtes"
,"elles sont"
,"j'ai été"
,"tu as été"
,"on a été"
,"nous avons été"
,"vous avez été"
,"ils ont été"
,"j'étais"
,"tu étais"
,"elle était"
,"nous étions"
,"vous étiez"
,"ils étaient"
,"j'avais été"
,"tu avais été"
,"on avait été"
,"nous avions été"
,"vous aviez été"
,"elles avaient été"
,"je serai"
,"tu seras"
,"elle sera"
,"nous serons"
,"vous serez"
,"ils seront"
,"j'aurai été"
,"tu auras été"
,"il aura été"
,"nous aurons été"
,"vous aurez été"
,"elles auront été"
,"il fut"
,"elles furent"
,"que je sois"
,"que tu sois"
,"qu'elle soit"
,"que nous soyons"
,"que vous soyez"
,"qu'elles soient"
,"je serais"
,"tu serais"
,"on serait"
,"nous serions"
,"vous seriez"
,"ils seraient"
,"sois"
,"soyons"
,"soyez"];
//trace("tabFormeJuste.length"+tabFormeJuste.length);
//Initialisation du tableau contenant les formes fausses
var tabFormeFausse : Array;
tabFormeFausse = ["j'essuie"
				  ,"tu ai"
,"il hait"
,"nous somme"
,"vous etes"
,"elles ont"
,"j'étais"
,"tu es été"
,"on était"
,"nous sommes été"
,"vous savez été"
,"ils sont été"
,"j'étai"
,"tu était"
,"elle étais"
,"nous étons"
,"vous étez"
,"ils était"
,"j'aurais été"
,"tu as été "
,"on a été"
,"nous savions été"
,"vous saviez été"
,"elles savaient été"
,"je serais"
,"tu serais"
,"elle serait"
,"nous serions"
,"vous seriez"
,"ils seraient"
,"j'aurais été"
,"tu aurais été"
,"il aurait été"
,"nous aurions été"
,"vous auriez été"
,"elles auraient été"
,"il eut"
,"elles eurent"
,"que je suis"
,"que tu es"
,"qu'elle est"
,"que nous sommes"
,"que vous êtes"
,"qu'elles sont"
,"je serai"
,"tu seras"
,"on sera"
,"nous serons"
,"vous serez"
,"ils seront"
,"es"
,"sommes"
,"êtes"];
//trace("tabFormeFausse.length"+tabFormeFausse.length);
//Initialisation du tableau contenant les commentaires
var tabCommentaires : Array;
tabCommentaires = ["C'est le verbe essuyer.",
				   "C'est le verbe avoir à la première personne du singulier."
,"C'est le verbe haïr"
,"Il manque la terminaison."
,"Il manque un circonflexe."
,"C'est le verbe avoir."
,"C'est l'indicatif imparfait."
,"Ce n'est pas le bon auxiliaire."
,"C'est l'indicatif imparfait."
,"Ce n'est pas le bon auxiliaire."
,"Savoir n'est pas un auxiliaire."
,"Ce n'est pas le bon auxiliaire."
,"Il manque la terminaison."
,"Ce n'est pas la bonne terminaison."
,"Ce n'est pas la bonne terminaison."
,"Il manque une lettre."
,"Il manque une lettre."
,"Attention, la forme demandée est au pluriel."
,"C'est un conditionnel passé."
,"C'est un indicatif passé composé."
,"C'est un indicatif passé composé."
,"Le verbe savoir n'est pas un auxiliaire."
,"Le verbe savoir n'est pas un auxiliaire."
,"Le verbe savoir n'est pas un auxiliaire."
,"C'est un conditionnel présent."
,"C'est un conditionnel présent."
,"C'est un conditionnel présent."
,"C'est un conditionnel présent."
,"C'est un conditionnel présent."
,"C'est un conditionnel présent."
,"C'est un conditionnel passé."
,"C'est un conditionnel passé."
,"C'est un conditionnel passé."
,"C'est un conditionnel passé."
,"C'est un conditionnel passé."
,"C'est un conditionnel passé."
,"C'est le verbe avoir."
,"C'est le verbe avoir."
,"C'est un indicatif présent."
,"C'est un indicatif présent."
,"C'est un indicatif présent."
,"C'est un indicatif présent."
,"C'est un indicatif présent."
,"C'est un indicatif présent."
,"C'est un indicatif futur simple."
,"C'est un indicatif futur simple."
,"C'est un indicatif futur simple."
,"C'est un indicatif futur simple."
,"C'est un indicatif futur simple."
,"C'est un indicatif futur simple."
,"Non, le verbe être est une exception."
,"Non, le verbe être est une exception."
,"Non, le verbe être est une exception."];
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