

//Initialisation du tableau contenant les nombres entiers relatifs a et b
var tabContenuCase:Array =new Array();
var tabHBJuste :Array = new Array();
var a:Number;
var b:Number;


//On choisit l'opération
//var choixOperationH:String="factorise";
var choixOperationH:String="developpe";
//var choixOperationB:String="developpe";
var choixOperationB:String="factorise";

//On crée la limite à ne pas dépasser pour les nombres
var maBorne:Number=5;

//On initialise les type de fautes
var fauteType1:Number=0;
var fauteType2:Number=0;
var fauteType3:Number=0;
var fauteType4:Number=0;
var fauteType5:Number=0;

//on crée une variable distracteur pour les différentes variations possibles
var distracteur:Number;

//On crée un element juste à afficher
function contenuJuste(nb)
{
	var affichage:String;//affichage de l'addition
	var signeDea:Number=Math.round(Math.random());
	var signeDeb:Number=Math.round(Math.random());
	var signeDec:Number=Math.round(Math.random());
	var signeDed:Number=Math.round(Math.random());
	if(signeDea==0)
	{
		signeDea=-1;
	}else if (signeDea==1)
	{
		signeDea=1;
	}
	
	if(signeDeb==0)
	{
		signeDeb=-1;
	}else if (signeDeb==1)
	{
		signeDeb=1;
	}
	if(signeDec==0)
	{
		signeDec=-1;
	}else if (signeDec==1)
	{
		signeDec=1;
	}
	if(signeDed==0)
	{
		signeDed=-1;
	}else if (signeDed==1)
	{
		signeDed=1;
	}

	a=Math.ceil(Math.random()*maBorne+1)*signeDea;
	//a=1;
	//b=Math.ceil(Math.random()*maBorne+1)*signeDeb;
	b=0;
	c=Math.ceil(Math.random()*maBorne+1)*signeDec;
	//c=1;
	d=Math.ceil(Math.random()*maBorne+1)*signeDed;
	while (d==b){
		d=Math.ceil(Math.random()*maBorne+1)*signeDed;

	}
	

	tabContenuCase[0]=a;
	tabContenuCase[1]=b;
	tabContenuCase[2]=commentaire(a, b, c, d, choixOperationB);
	//trace("tabContenuCase[2]"+tabContenuCase[2]);
	tabContenuCase[3]="variation(a,b,c,d,choixOperation)";
	tabContenuCase[4]=c;
	tabContenuCase[5]=d;
//	trace("Conta"+tabContenuCase[0]);
//	trace("Contb"+tabContenuCase[1]);
//	trace("Contc"+tabContenuCase[4]);
//	trace("Contd"+tabContenuCase[5]);
	
}
function resultatOperation(monOperation,m,n, o, p)
{
	switch (monOperation)
	{
		case ("factorise"):
			resultat=m+n;
			return resultat;
		break;
		case ("developpe"):
			resultat=m-n;
			return resultat;
		break;
	}
}
function variation(maCase,m, n, o, p, monOperation, ceFormat)
{
	switch (monOperation)
	{
		case ("factorise"):
			switch (true)
			{
				case(m==o && n==p && n>0):
					if (m==1)
					{
						maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="(x+"+n+")";
					}else{
						maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+m+"x+"+n+")";
					}
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantFact.text="";
					distracteur=0;
				break;
				case(m==o && n==p && n<0):
				if(m==1)
				{
					maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="(x"+n+")";
				}else{
					maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+m+"x"+n+")";
				}
					
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantFact.text="";
					distracteur=0;
				break;
				case(m!=o && n!=p && n>0):
				if (m==1)
				{
					maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="(x+"+p+")";
				}else{
					maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+m+"x+"+p+")";
				}
					
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantFact.text="";
					distracteur=1;
				break;
				case(m!=o && n!=p && n<0):
				if(m==1)
				{
					maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="(x"+p+")";
				}else{
					maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+m+"x"+p+")";
				}
					
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantFact.text="";
					distracteur=1;
				break;
				case(m!=o || n!=p && p>0 && n>0):
				if(m==1)
				{
					maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="(x+"+n+")("+o+"+"+p+")";
				}else{
					maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+m+"x+"+n+")("+o+"+"+p+")";
				}
					
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantFact.text="";
					distracteur=2;
				break;
				case(m!=o || n!=p && p<0 && n<0):
				if(m==1)
				{
					maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="(x"+n+")("+o+p+")";
				}else{
					maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+m+"x"+n+")("+o+p+")";
				}
					
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantFact.text="";
					distracteur=2;
				break;
				default:
					if (n>0 && p>0)
					{
						maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+m+"+"+n+")("+o+"+"+p+")";
					}else if(n>0 && p<0)
					{
						maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+m+"+"+n+")("+o+p+")";
					}else if (n<0 && p>0)
					{
						maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+m+n+")("+o+"+"+p+")";
					} else 
					{
						maCase.conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+m+n+")("+o+p+")";
					}
					
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantFact.text="";
					distracteur=3;
				break;
			}

		break;
		case ("developpe"):
			switch (true)
			{
				case(m==o && n==p):
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre2Dev.text=m*m+"x";
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantDev.text=2;
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre1Dev.text=n*n;
					distracteur=4;
			
				break;
				case(m!=o && n!=p && n*p>0):
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre2Dev.text=m*o+"x + ";
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantDev.text=2;
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre1Dev.text=n*p;
					distracteur=3;
				break;
				case(m!=o && n!=p && n*p<0):
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre2Dev.text=m*o+"x+";
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantDev.text=2;
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre1Dev.text=n*p;
					distracteur=5;
				break;
				case(m!=o || n!=p && n*p>0):
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre2Dev.text=m*o+"x+";
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantDev.text=2;
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre1Dev.text=n*p+"x+"+o*p;
					distracteur=6;
				break;
				case(m!=o || n!=p && n*p<0):
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre2Dev.text=m*o+"x+";
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantDev.text=2;
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre1Dev.text=n*o+"x"+o*p;
					distracteur=6;
				break;
				default:
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre2Dev.text=m*o+"x+";
					maCase.conteneur.carre.monAffichageFactoriseHaut.exposantDev.text=2;
					var coefx:Number=m*p+n*o;
					var coef0:Number=n+p;
					maCase.conteneur.carre.monAffichageFactoriseHaut.degre1Dev.text=coefx+"x"+coef0;
					distracteur=7;
					trace("default"+maCase.conteneur.carre.monAffichageFactoriseHaut.degre1Dev.text);
				break;
			}		
		break;
		
	}
	
}


//fonction qui donne le commentaire pour l'analyse en fonction des cas.
//l'analyse compare la case d'avant, contenu du bas avec la case cliquée, contenu du haut.
//Elle dit juste ou faux. 
//Si c'est faux, la fonction commentaire est lancée et les différents commentaires en fonction des fautes sont décris ci dessous 
function commentaire(m, n, o, p, monOperation)
{
	var monCommentaire:String;
	var maVariation:Number=Number(texteHaut);
	//trace("monOperation"+monOperation);
	switch (monOperation)
	{
		case ("factorise"):
			switch(true){
				
				case (distracteur==0):
				fauteType1++;
				monCommentaire=" La factorisation est bonne mais il manque le carré.";
				return monCommentaire;
				break;
				case (distracteur==1):
				fauteType2++;
				monCommentaire="Tu n'obtiens pas un produis du 2e degré.\nIl faut encore une autre parenthèse.";
				return monCommentaire;
				break;
				case (distracteur==2):
				fauteType3++;
				monCommentaire="Il manque le x dans la deuxième parenthèse.";
				return monCommentaire;
				break;
				case (distracteur==3):
				fauteType4++;
				monCommentaire="Les coefficients sont juste mais il n'y a pas de partie littérale.";
				return monCommentaire;
				break;
				default:
				monCommentaire="";
				return monCommentaire;
				fauteType5++;//faute de calcul
				break;
				
			}
		break;
		case ("developpe"):
			switch(true){
				case (distracteur==4):
				fauteType1++;
				monCommentaire= "Il faut faire une double distributivité,\nou utiliser une identité remarquable.\nIlmanque le double produit.";
				return monCommentaire;
				break;
				case (distracteur==5):
				fauteType2++;
				monCommentaire= "Il faut faire une double distributivité,";
				return monCommentaire;
				break;
				case (distracteur==6):
				fauteType3++;
				monCommentaire= "Le coefficient de x est faux.";
				return monCommentaire;
				break;
				case (distracteur==7):
				fauteType4++;
				monCommentaire= "Le terme de degré 0 est faux.";
				return monCommentaire;
				break;
				default:
				monCommentaire="";
				return monCommentaire;
				fauteType5++;//faute de calcul
				break;
				
			}
		break;
		
		}
	break;
	
	
}
//remplissage du tableau
for (i=0;i<=100;i++)
{
	contenuJuste(i);
	tabHBJuste.push([tabContenuCase[0],tabContenuCase[1],tabContenuCase[2],tabContenuCase[3],tabContenuCase[4],tabContenuCase[5]]);
}


//Détermination de la position de départ dans le tableau
var posDepTab = longueurChemin + Math.round(Math.random() * 5 + 5);
noDep = noCase(departX, departY);
//Affichage du contenu dans les cases du chemin
for (i = 0; i < longueurChemin+1; i++)
{

	no = noCase(chemin[i][0], chemin[i][1]);
	maCase[no].operationChoisie(choixOperationH,tabHBJuste[posDepTab - i][0], tabHBJuste[posDepTab - i][1], tabHBJuste[posDepTab - i][4], tabHBJuste[posDepTab - i][5], "HAUT", texteHaut_fmt);
	maCase[no].operationChoisie(choixOperationB,tabHBJuste[posDepTab - i-1][0], tabHBJuste[posDepTab - i-1][1], tabHBJuste[posDepTab - i-1][4], tabHBJuste[posDepTab - i-1][5], "BAS", texteBas_fmt);
	maCase[no].commentaireCase=tabHBJuste[posDepTab - i - 1][2];
}

//Affichage des étiquettes Départ et Arrivée
maCase[noDep].setTextH("ENTREE", texteES_fmt);
noArr = noCase(arriveeX, arriveeY);
maCase[noArr].setTextB("SORTIE", texteES_fmt);

//Affichage du contenu des impasses construites depuis les cases du chemin
for (c = 0 ; c < longueurChemin ; c++)
{
	//Affichage contenu première case première impasse
	no = noCase(impasse[c][1][0], impasse[c][1][1]);
	//Cete ligne sert uniquement à créer les clips et les champs textes. C'estla ligne variation que met les choses dedans.
	maCase[no].operationChoisie(choixOperationH,tabHBJuste[posDepTab - c][0], tabHBJuste[posDepTab - c][1], tabHBJuste[posDepTab - c][4], tabHBJuste[posDepTab - c][5], "HAUT", texteHaut_fmt);
	//variation(maCase[no],1, 2, 3, 4, choixOperationH, texteHaut_fmt);
	maCase[no].operationChoisie(choixOperationB,tabHBJuste[posDepTab - c][0], tabHBJuste[posDepTab - c][1], tabHBJuste[posDepTab - c][4], tabHBJuste[posDepTab - c][5], "BAS", texteBas_fmt);
	maCase[no].commentaireCase=tabHBJuste[posDepTab - c][2];
	//Affichage suite contenu première impasse
	for (i = 2; i < longImpasse[c]+1 ; i++)
	{
		no = noCase(impasse[c][i][0], impasse[c][i][1]);
		maCase[no].operationChoisie(choixOperationH,tabHBJuste[posDepTab - c - i][0], tabHBJuste[posDepTab - c - i][1], tabHBJuste[posDepTab - c - i][4], tabHBJuste[posDepTab - c - i][5], "HAUT", texteHaut_fmt);
		maCase[no].operationChoisie(choixOperationB,tabHBJuste[posDepTab - c - i-1][0], tabHBJuste[posDepTab - c - i-1][1], tabHBJuste[posDepTab - c - i-1][4], tabHBJuste[posDepTab - c - i-1][5], "BAS", texteHaut_fmt);
		maCase[no].commentaireCase=tabHBJuste[posDepTab - c-i-1][2];
	}
}

//Affichage du contenu de l'impasse construites depuis la sortie

//Affichage contenu première case première impasse
no = noCase(impasse[longueurChemin][1][0], impasse[longueurChemin][1][1]);
maCase[no].operationChoisie(choixOperationH,tabHBJuste[posDepTab+ 1 - longueurChemin][0], tabHBJuste[posDepTab+ 1 - longueurChemin][1], tabHBJuste[posDepTab+ 1 - longueurChemin][4], tabHBJuste[posDepTab+ 1 - longueurChemin][5], "HAUT", texteHaut_fmt);
variation(maCase[no],tabHBJuste[posDepTab+ 1 - longueurChemin][0], tabHBJuste[posDepTab+ 1 - longueurChemin][1], tabHBJuste[posDepTab+ 1 - longueurChemin][4], tabHBJuste[posDepTab+ 1 - longueurChemin][5], choixOperationH, texteHaut_fmt);
maCase[no].operationChoisie(choixOperationB,tabHBJuste[posDepTab+ 1 - longueurChemin][0], tabHBJuste[posDepTab+ 1 - longueurChemin][1], tabHBJuste[posDepTab+ 1 - longueurChemin][4], tabHBJuste[posDepTab+ 1 - longueurChemin][5], "BAS", texteBas_fmt);
maCase[no].commentaireCase=tabHBJuste[posDepTab+ 1 - longueurChemin][2];

//Affichage suite contenu première impasse
for (i = 2; i < longImpasse[longueurChemin]+1 ; i++)
{
	no = noCase(impasse[longueurChemin][i][0], impasse[longueurChemin][i][1]);
	maCase[no].operationChoisie(choixOperationH,tabHBJuste[posDepTab - i][0], tabHBJuste[posDepTab - i][1], tabHBJuste[posDepTab - i][4], tabHBJuste[posDepTab - i][5], "HAUT", texteHaut_fmt);
	maCase[no].operationChoisie(choixOperationB,tabHBJuste[posDepTab - longueurChemin + i][0], tabHBJuste[posDepTab - longueurChemin + i][1], tabHBJuste[posDepTab - longueurChemin + i][4], tabHBJuste[posDepTab - longueurChemin + i][5], "BAS", texteHaut_fmt);
	maCase[no].commentaireCase=tabHBJuste[posDepTab - longueurChemin + i][2];
}

testEtatCase();



//testDoubleSorties();

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
				maCase[no].operationChoisie(choixOperationH,tabHBJuste[noAlea][0], tabHBJuste[noAlea][1], tabHBJuste[noAlea][4], tabHBJuste[noAlea][5], "HAUT", texteHaut_fmt);
				variation(maCase[no],tabHBJuste[noAlea][0], tabHBJuste[noAlea][1], tabHBJuste[noAlea][4], tabHBJuste[noAlea][5], choixOperationH, texteHaut_fmt);
				maCase[no].operationChoisie(choixOperationB,tabHBJuste[noAlea-1][0], tabHBJuste[noAlea-1][1], tabHBJuste[noAlea-1][4], tabHBJuste[noAlea-1][5], "BAS", texteBas_fmt);
				maCase[no].commentaireCase=tabHBJuste[noAlea-1][2];
			}
		}
	}
}
/*
//Fonction test pour voir s'il existe des chemins multiples et les supprimer
function testDoubleSorties()
{
	for (i = 0 ; i < longueurChemin ; i++)
	{
		no = noCase (chemin[i][0], chemin[i][1]);
		var nbSuivant = tabHBJuste[posDepTab - i - 1][0];
		var nbVoisinH = maCase[no - nbCasesX].textB;
		if (nbSuivant == nbVoisinH && etatCase[chemin[i][0]][chemin[i][1] - 1] != "chemin")
		{
			maCase[no - nbCasesX].setTextH(tabHBJuste[posDepTab - i - 1][3], texteHaut_fmt);
			//maCase[no].commentaireCase=tabHBJuste[posDepTab - i - 1][4];
			maCase[no].operationChoisie(choixOperation,tabHBJuste[posDepTab - i - 1][0], tabHBJuste[posDepTab - i - 1][1], texteBas_fmt);
		}
		var nbVoisinB = Number(maCase[no + nbCasesX].textB);
		if (nbSuivant == nbVoisinB && etatCase[chemin[i][0]][chemin[i][1] + 1] != "chemin")
		{
			maCase[no + nbCasesX].setTextH(tabHBJuste[posDepTab - i - 1][3], texteHaut_fmt);
			//maCase[no].commentaireCase=tabHBJuste[posDepTab - i - 1][4];
			maCase[no].operationChoisie(choixOperation,tabHBJuste[posDepTab - i - 1][0], tabHBJuste[posDepTab - i - 1][1], texteBas_fmt);
		}
		var nbVoisinG = Number(maCase[no - 1].textB);
		if (nbSuivant == nbVoisinG && etatCase[chemin[i][0] - 1][chemin[i][1]] != "chemin")
		{
			maCase[no - 1].setTextH(tabHBJuste[posDepTab - i - 1][3], texteHaut_fmt);
			//maCase[no].commentaireCase=tabHBJuste[posDepTab - i - 1][4];
			maCase[no].operationChoisie(choixOperation,tabHBJuste[posDepTab - i - 1][0], tabHBJuste[posDepTab - i - 1][1], texteBas_fmt);
		}
		var nbVoisinD = Number(maCase[no + 1].textB);
		if (nbSuivant == nbVoisinD && etatCase[chemin[i][0] + 1][chemin[i][1]] != "chemin")
		{
			maCase[no + 1].setTextH(tabHBJuste[posDepTab - i - 1][3], texteHaut_fmt);
			//maCase[no].commentaireCase=tabHBJuste[posDepTab - i-1][4];
			maCase[no].operationChoisie(choixOperation,tabHBJuste[posDepTab - i - 1][0], tabHBJuste[posDepTab - i - 1][1], texteBas_fmt);
		}
	}
}*/