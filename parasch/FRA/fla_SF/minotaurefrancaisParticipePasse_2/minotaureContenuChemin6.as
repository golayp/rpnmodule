/**
 * ...
 * @author Michel Roquier et Jean-michel Luthi
 */

//Initialisation du tableau contenant Formes à faire
var tabForme : Array;

tabForme = ["courir", "finir", "rajeunir", "accueillir", "entreprendre", "craindre", "recevoir", "acquérir", "permettre", "remettre", 
			"prendre", "suivre", "cuire", "voir", "faire", "sortir", "lire", "attendre", "boire", "convaincre", "connaître", "coudre", 
			"croire", "élire", "perdre", "résoudre", "vivre", "savoir", "vouloir", "partir", "servir", "apprendre", "comprendre", 
			"mettre", "promettre", "asseoir", "conduire", "dire", "écrire", "joindre", "peindre", "produire", "couvrir", "ouvrir", 
			"conquérir", "être", "avoir", "perdre", "maudire", "offrir", "devoir", "mourir", "naître", "paraître", "pouvoir", 
			"descendre", "vendre", "mordre", "venir", "découvrir", "entendre", "conclure", "disparaître", "soumettre", "vaincre"];
trace("tabForme.length"+tabForme.length);
//Initialisation du tableau contenant les formes justes
var tabFormeJuste : Array;

tabFormeJuste = ["couru", "fini", "rajeuni", "accueilli", "entrepris", "craint", "reçu", "acquis", "permis", "remis", 
				 "pris", "suivi", "cuit", "vu", "fait", "sorti", "lu", "attendu", "bu", "convaincu", "connu", "cousu", 
				 "cru", "élu", "perdu", "résolu", "vécu", "su", "voulu", "parti", "servi", "appris", "compris", 
				 "mis", "promis", "assis", "conduit", "dit", "écrit", "joint", "peint", "produit", "couvert", "ouvert", 
				 "conquis", "été", "eu", "perdu", "maudit", "offert", "dû", "mort", "né", "paru", "pu", 
				 "descendu", "vendu", "mordu", "venu", "découvert", "entendu", "conclu", "disparu", "soumis", "vaincu"];
trace("tabFormeJuste.length"+tabFormeJuste.length);
//Initialisation du tableau contenant les formes fausses
var tabFormeFausse : Array;
tabFormeFausse = ["courut", "finit", "rajeunit", "accueillit", "entreprendu", "crains", "reçut", "acquérit", "permit", "remit", 
				  "prit", "suivit", "cuis", "vut", "fais", "sortit", "lut", "attendut", "but", "convaincut", "connut", "cousut", 
				  "crut", "électionné", "perdut", "résoudu", "vécut", "sut", "voulut", "partit", "servit", "apprit", "comprendu", 
				  "mit", "promit", "asseyé", "conduis", "dis", "écris", "joigné", "peindu", "produi", "couvris", "ouvris", 
				  "conquérit", "êté", "u", "perdut", "maudis", "offris", "du", "mouru", "naquis", "parut", "put", 
				  "descendut", "vendut", "mordus", "viendu", "découvrit", "entendut", "conclut", "disparut", "soumit", "vaincut"];
trace("tabFormeFausse.length"+tabFormeFausse.length);
//Initialisation du tableau contenant les commentaires
var tabCommentaires : Array;
tabCommentaires = ["Les participes passés en -ut n'existent pas !", "On dit \"la vaisselle est finite\" ?", 
				   "On dit \"une peau rajeunite\" ?", "On dit \"des invitées accueillites\" ?", "Pense au verbe \"prendre\" !", 
				   "On dit \"une prof crainse\" ?", "On dit \"une bonne note reçute\" ?", "\"Acquérit\" n'existe pas !", 
				   "On dit \"elle s'est permite de me mettre à la porte\" ?", "On dit \"une coupe remite au vainqueur\" ?", 
				   "On dit \"une décision prite\" ?", "Une fille dirait \"j'ai été suivite\" ?", 
				   "On dit \"les carottes sont cuises\" ?", "On dit \"elle a été vute en ville\" ?", 
				   "On dit \"une rédaction faise avec plaisir\" ?", "On dit \"elle est sortite en ville\" ?", 
				   "On dit \"une bonne nouvelle lute dans le journal\" ?", "On dit \"une copine attendute avec impatience\" ?", 
				   "On dit \"une tasse de café bute en vitesse\" ?", "Une fille dirait \"je suis absolument convaincute\" ?", 
				   "On dit \"une chanteuse connute\" ?", "On dit \"une robe cousute à la machine\" ?", 
				   "On dit \"une plaignante crute sur parole\" ?", "Le verbe électionner n'existe pas.", 
				   "On dit \"une bataille perdute\" ?", "\"Résoudu\" n'existe pas !", "On dit \"une aventure vécute\" ?", 
				   "On dit \"les règles de grammaires sont sutes\" ?", "On dit \"une récompense voulute absolument\" ?", 
				   "On dit \"elle est partite\" ?", "On dit \"la soupe est servite\" ?", "On dit \"une règle apprite par cœur\" ?", 
				   "\"Comprendu\" n'existe pas !", "On dit \"la table est mite\" ?", "Pense au verbe \"mettre\" !", 
				   "Il n'y a que les verbes en -er qui se terminent par -é !", 
				   "On dit \"cette voiture est conduise par un chauffard\" ?", "On dit \"la réponse que tu m'as dise\" ?", 
				   "On dit \"la lettre que j'ai écrise\" ?", "Il n'y a que les verbes en -er qui se terminent par -é !", 
				   "Cette forme n'existe pas !", "On dit \"une voiture produie en série limitée\" ?", 
				   "On dit \"une table couvrise d'une nappe\" ?", "On dit \"une porte ouvrise\" ?", "Cette forme n'existe pas !", 
				   "Cette forme n'existe pas !", "Cette forme n'existe pas !", "On dit \"Une de perdute, dix de retrouvées\" ?", 
				   "On dit \"une forêt maudise\" ?", "On dit \"une récompense offrise\" ?", 
				   "On met un circonflexe pour le différencier d'avec le déterminant \"du\".", "On dit \"des feuilles mourues\" ?", 
				   "On dit \"je suis naquis à Neuchâtel\" ?", "Les participes passés en -ut n'existent pas !", 
				   "Les participes passés en -ut n'existent pas !", "Les participes passés en -ut n'existent pas !", 
				   "Les participes passés en -ut n'existent pas !", "Une fille dirait \"j'ai été morduse par un chien\"?", 
				   "Ce n'est pas le verbe \"viendre\" !", "On dit \"Une découvrite extraordinaire\" ?", 
				   "Les participes passés en -ut n'existent pas !", "On dit \"affaire conclute!\" ?", 
				   "Les participes passés en -ut n'existent pas !", "On dit \"une femme soumite\" ?", 
				   "Les participes passés en -ut n'existent pas !"];

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