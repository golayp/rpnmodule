/**
 * ...
 * @author Michel Roquier et Jean-michel Luthi
 */

//Initialisation du tableau contenant Formes à faire
var tabForme : Array;

tabForme = ["finir","acquérir","écrire","transmettre","satisfaire","maudire","sourire","asseoir","dire","faire","admettre","sortir",
			"mettre","refaire","surprendre","promettre","conquérir","éclaircir","prendre","suivre","suffire","entreprendre",
			"construire","interdire","prendre","partir","extraire","fleurir","sentir","conduire","rire","cuire","comprendre",
			"traduire","prédire","poursuivre","enduire","choisir","attendrir","défaire","démolir","émettre","rafraîchir","atterrir",
			"produire","apprendre","maigrir","déduire","mûrir","nourrir","cueillir","instruire","réfléchir","meurtrir","séduire",
			"décrire","remplir","agrandir","détruire","franchir","guérir","répartir","reproduire","reprendre"];
trace("tabForme.length"+tabForme.length);
//Initialisation du tableau contenant les formes justes
var tabFormeJuste : Array;

tabFormeJuste = ["fini","acquis","écrit","transmis","satisfait","maudit","souri","assis","dit","fait","admis","sorti",
				 "mis","refait","surpris","promis","conquis","éclairci","pris","suivi","suffi","entrepris",
				 "construit","interdit","pris","parti","extrait","fleuri","senti","conduit","ri","cuit","compris",
				 "traduit","prédit","poursuivi","enduit","choisi","attendri","défait","démoli","émis","rafraîchi","atterri",
				 "produit","appris","maigri","déduit","mûri","nourri","cueilli","instruit","réfléchi","meurtri","séduit",
				 "décrit","rempli","agrandi","détruit","franchi","guéri","réparti","reproduit","repris"];
trace("tabFormeJuste.length"+tabFormeJuste.length);
//Initialisation du tableau contenant les formes fausses
var tabFormeFausse : Array;
tabFormeFausse = ["finit","acquit","écris","transmit","satisfais","maudis","souris","assit","dis","fais","admit","sortit",
				  "mit","refais","surprit","promit","conquit","éclaircit","prit","suivit","suffit","entreprit",
				  "construis","interdis","prit","partis","extracté","fleurit","sentit","conduis","rit","cuis","comprit",
				  "traduis","prédis","poursuivit","enduis","choisis","attendrit","défais","démolit","émit","rafraîchit","atterrit",
				  "produis","apprit","maigrit","déduis","mûrit","nourrit","cueillis","instruis","réfléchit","meurtris","séduis",
				  "décris","remplis","agrandit","détruis","franchit","guérit","répartit","reproduis","reprit"];
trace("tabFormeFausse.length"+tabFormeFausse.length);
//Initialisation du tableau contenant les commentaires
var tabCommentaires : Array;
tabCommentaires = ["On dit \"la fête est finite\" ?","On dit \"une chose acquite\" ?","On dit \"la réponse est écrise\" ?",
				   "On dit \"une information transmite\" ?","On dit \"elle est satisfaise\"?","On dit \"une journée maudise\" ?",
				   "La souris, c'est un animal !","On dit \"elle s'est assite\" ?","O dit \"la vérité est dise\" ?",
				   "On dit \"une armoire faise à la main\" ?","On dit \"elle a été admite\" ?","On dit \"elle est sortite\" ?",
				   "On dit \"une bouteille mise à la cave\" ?","On dit \"une maison refaise\" ?","On dit \"elle est surprite\" ?",
				   "On dit \"une récompense promite\" ?","On dit \"une femme conquite\" ?",
				   "On dit \"une couleur de cheveux éclaircite\" ?","On dit \"une décision prite\" ?","On dit \"une route suivite\" ?",
				   "\"Suffit\" est la forme de l'indicatif présent 3e personne du singulier.",
				   "On dit \"une entreprite de construction\" ?",
				   "On dit \"Une maison construise en bois\" ?","On dit \"une entrée interdise\" ?","On dit \"une décision prite\" ?",
				   "On dit \"elle est partise\" ?","Ce n'est pas un verbe en -er.","On dit \"une allée fleurite\" ?",
				   "\"Sentit\" est la forme de l'indicatif présent 3e personne du singulier.",
				   "On dit \"une voiture conduise par un chauffard\" ?",
				   "\"Rit\" est la forme de l'indicatif présent 3e personne du singulier.","On dit \"les carottes sont cuises\" ?",
				   "On dit \"elle se sent comprite\" ?","On dit \"une chanson traduise en français\" ?","Pense au verbe dire !",
				   "On dit \"une victime poursuivite\" ?","On dit \"une feuille enduise de colle\" ?",
				   "On dit \"une réponse choisise\" ?","On dit \"une maman attendrite\" ?","On dit \"une mine défaise\" ?",
				   "On dit \"une maison démolite\" ?","On dit \"une opinion émite\" ?","On dit \"elle s'est rafraîchite à la fontaine\" ?","\"Atterrit\" est la forme de l'indicatif présent 3e personne du singulier.","On dit \"une chose terrible s'est produise\" ?","On dit \"une bonne nouvelle apprite\" ?","\"Maigrit\" est la forme de l'ndicatif présent 3e personne du singulier","On dit \"une somme déduise du total\" ?","\"Mûrit\" est la forme de l'indicatif présent 3e personne du singulier.","On dit \"elle s'est nourrite de frites\" ?","On dit \"une fleur cueillise\" ?","On dit \"une fille instruise\" ?","\"Réfléchit\" est la forme de l'indicatif présent 3e personne du singulier.","On dit \"une cheville meurtrise\" ?","On dit \"une femme séduise\" ?","On dit \"une beauté décrise\" ?","On dit \"une tasse remplise\" ?","On dit \"une photo agrandite\" ?","On dit \"une ville détruise\" ?","On dit \"une limite franchite\" ?","On dit \"une patiente guérite\" ?",
				   "On dit \"une somme répartite entre tous\" ?","On dit \"une imitation reproduise à la chaîne\" ?",
				   "On dit \"une reprite de cette chanson\" ?"];

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