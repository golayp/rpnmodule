/**
 * ...
 * @author Michel Roquier
 */

//Initialisation du tableau contenant les nombres entiers relatifs a et b
var tabContenuCase:Array =new Array();
var tabHBJuste :Array = new Array();
//var tabHBFaux : Array= new Array();
var a:Number;
var b:Number;


//On choisit l'opération
//var choixOperation:String="addition";
//var choixOperation:String="soustraction";
var choixOperation:String="multiplication";
//var choixOperation:String="division";

//On crée la limite à ne pas dépasser pour les nombres
var maBorne:Number=12;

//On initialise les type de fautes
var fauteType1:Number=0;
var fauteType2:Number=0;
var fauteType3:Number=0;
var fauteType4:Number=0;
var fauteType5:Number=0;
//On crée un element juste à afficher
function contenuJuste(nb)
{
	var affichage:String;//affichage de l'addition
		var signeDea:Number=Math.round(Math.random());
		var signeDeb:Number=Math.round(Math.random());
/*		if(signeDea==0)
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
		}*/
		signeDea=1;
		signeDeb=1;
		if(choixOperation=="division")
		{
			texteBas_fmt.size=Math.floor((coteCase*3)/17);
			texteBas_fmt.font="Arial Narrow";
			b=Math.ceil(Math.random()*maBorne*signeDeb)+1;//On ajoute 1 pour être sûr que b sera différent de 0
			a=Math.ceil(Math.random()*maBorne*signeDea)*b;
		}else
		{
			//a=Math.ceil(Math.random()*maBorne*signeDea);
			a = 7;
			b=Math.ceil(Math.random()*maBorne*signeDeb)+1;
			
		}
		

		tabContenuCase[0]=a;
		tabContenuCase[1]=b;
		tabContenuCase[2]="commentaireJuste"+nb;
		tabContenuCase[3]=variation(a,b, choixOperation);
		//tabContenuCase[4]=commentaire(a,b, choixOperation);
		
}
function resultatOperation(monOperation,m,n)
{
	switch (monOperation)
	{
		case ("addition"):
			resultat=m+n;
			return resultat;
		break;
		case ("soustraction"):
			resultat=m-n;
			return resultat;
		break;
		case ("multiplication"):
			resultat=m*n;
			return resultat;
		break;
		case ("division"):
			if (n==0)
			{
				resultat="pas de\n solution";
			}else{
				resultat=m/n;
			}
//			trace("m"+m);
//			trace("n"+n);
//			trace("a"+a);
//			trace("b"+b);
//			trace("resultat"+resultat);
			return resultat;
		break;
	}
}
function variation(m, n, monOperation)
{
	switch (monOperation)
	{
		case ("addition"):
			switch(true){
				case (m<0 && n<0):
				vari=-(m+n);
				return vari;
				break;
				case (m<0 && n>0 && m+n>0):
				vari=-(m+n);
				return vari;
				break;
				case (m>0 && n<0 && m+n>0):
				vari=-(m+n);
				return vari;
				break;
				case (m<0 && n>0 && m+n<0):
				vari=-(m+n);
				return vari;
				break;
				case (m>0 && n<0 && m+n<0):
				vari=-(m+n);
				return vari;
				break;
				case (m>0 && n>0):
				vari=m+n+1;
				return vari;
				break;
				default:
				vari=m+n-1;
				return vari;
				break;
			}
		break;
		case ("soustraction"):
			switch(true){
				case (m<0 && n<0):
				vari=-(m-n);
				return vari;
				break;
				case (m<0 && n>0 && m-n>0):
				vari=-(m-n);
				return vari;
				break;
				case (m>0 && n<0 && m-n>0):
				vari=-(m-n);
				return vari;
				break;
				case (m>0 && n>0):
				vari=-(m-n);
				return vari;
				break;
				default:
				vari=m-n-1;
				return vari;
				break;
			}
		break;
		case ("multiplication"):
			switch(true){
				case (m<0 && n<0):
				vari=-(m*n);
				return vari;
				break;
				case (m<0 && n>0):
				vari=-(m*n);
				return vari;
				break;
				case (m>0 && n<0):
				vari=-(m*n);
				return vari;
				break;
				case (m>0 && n>0):
				vari=-(m*n);
				return vari;
				break;
				default:
				vari=m+n;
				return vari;
				break;
			}
		break;
		case ("division"):
			switch(true){
				case (m<0 && n<0):
				vari=-(m/n);
				return vari;
				break;
				case (m<0 && n>0):
				vari=-(m+n);
				return vari;
				break;
				case (m>0 && n<0):
				vari=-(m/n);
				return vari;
				break;
				case (m>0 && n>0):
				vari=(m/n)-1;
				return vari;
				break;
				default:
				vari= m-n;
				return vari;
				break;
			}
		break;
	}
	
}


//fonction qui donne le commentaire pour l'analyse en fonction des cas.
//l'analyse compare la case d'avant, contenu du bas avec la case cliquée, contenu du haut.
//Elle dit juste ou faux. 
//Si c'est faux, la fonction commentaire est lancée avec les différents commentaires en fonction des fautes sont décris ci dessous 
function commentaire(m, n, monOperation,texteHaut)
{
	var monCommentaire:String="tu as fait une erreur de calcul...";
	return monCommentaire;
	var maVariation:Number=Number(texteHaut);
	
	/*switch (monOperation)
	{
		case ("addition"):
			switch(true){
				
				case (m<0 && n<0 && maVariation!=m+n && maVariation<=0):
				fauteType1++;//Erreur de calcul
				monCommentaire=m+" est négatif.\n"+n+" est aussi négatif.\nLa somme est négative\nTu as fait une erreur de calcul";
				return monCommentaire;
				break;
				case (m<0 && n<0 && maVariation!=-(m+n)):
				fauteType2++;//faute de signe
				monCommentaire=m+" est négatif.\n"+n+" est aussi négatif.\nLa règle des signes (-)(-)=(+)ne s'applique pas pour une addition.\nLa somme est négative\nTu as fait une erreur de calcul";
				return monCommentaire;
				break;
				case (m<0 && n<0 && maVariation==-(m+n)):
				fauteType2++;
				monCommentaire=m+" est négatif.\n"+n+" est aussi négatif.\nLa règle des signes (-)(-)=(+)ne s'applique pas pour une addition.\nLa somme est négative";
				return monCommentaire;
				break;
				case (m<0 && n<0 && maVariation<0 && maVariation!=m+n):
				fauteType1++;//faute de signe
				monCommentaire="Le signe est juste mais tu as fait une erreur de calcul";
				return monCommentaire;
				break;
				case (m<=0 && n>=0 && m+n>0 && maVariation>0 && maVariation!=m+n):
				fauteType1++;
				monCommentaire="|"+m+"|<|"+n+"|\nErreur de calcul.\nMais la somme est bien positive";
				return monCommentaire;
				break;
				case (m>=0 && n<=0 && m+n>0 && maVariation>0 && maVariation!=m+n):
				fauteType1++;
				monCommentaire="|"+m+"|>|"+n+"|\nErreur de calcul.\nMais la somme est bien positive";
				return monCommentaire;
				break;
				case (m<=0 && n>=0 && m+n>0 && maVariation<=0):
				fauteType3++;//faute de type "le plus grand en valeur absolue l'emporte"
				monCommentaire= "|"+m+"|<|"+n+"|\nLe nombre positif est le plus grand en valeur absolue.\nDonc résultat positif.";
				return monCommentaire;
				break;
				case (m>=0 && n<=0 && m+n>0 && maVariation<=0):
				fauteType3++;
				monCommentaire= "|"+m+"|>|"+n+"|\nLe nombre positif est le plus grand en valeur absolue.\nDonc résultat positif.";
				return monCommentaire;
				break;
				case (m<=0 && n>=0 && m+n<0 && maVariation<=0 && maVariation!=m+n):
				fauteType1++;
				monCommentaire="|"+m+"|>|"+n+"|\nErreur de calcul.\nMais la somme est bien négative";
				return monCommentaire;
				break;
				case (m>=0 && n<=0 && m+n<0 && maVariation<=0 && maVariation!=m+n):
				fauteType1++;
				monCommentaire="|"+m+"|>|"+n+"|\nErreur de calcul.\nMais la somme est bien négative";
				return monCommentaire;
				break;
				case (m<=0 && n>=0 && m+n<0 && maVariation>=0):
				fauteType3++;
				monCommentaire= "|"+m+"|<|"+n+"|\nLe nombre négatif est le plus grand en valeur absolue.\nDonc résultat négatif.";
				return monCommentaire;
				break;
				case (m>=0 && n<=0 && m+n<0 && maVariation>=0):
				fauteType3++;
				monCommentaire= "|"+m+"|>|"+n+"|\nLe nombre négatif est le plus grand en valeur absolue.\nDonc résultat négatif.";
				return monCommentaire;
				break;
				case (m>=0 && n>=0 && maVariation>=0 && maVariation!=m+n):
				fauteType1++;
				fauteType3++;
				monCommentaire=m+" est positif.\n"+n+" est aussi positif.\nErreur de calcul.\nLa somme est bien positive";
				return monCommentaire;
				break;
				case (m>=0 && n>=0 && maVariation<=0 && maVariation!=-(m+n)):
				fauteType1++;
				fauteType2++;
				monCommentaire= m+" est positif.\n"+n+" est aussi positif.\nTu as fait une erreur de calcul et le résultat devrait être positif...";
				return monCommentaire;
				break;
				case (m>=0 && n>=0 && maVariation<=0 && maVariation==-(m+n)):
				fauteType2++;
				monCommentaire= m+" est positif.\n"+n+" est aussi positif.\nLe résultat devrait être positif...";
				return monCommentaire;
				break;
				case (maVariation!=-(m+n)):
				fauteType1++;
				monCommentaire="Tu as fait une erreur de calcul.";
				return monCommentaire;
				break;
				case (maVariation==-(m+n)):
				fauteType2++;
				monCommentaire="Tu as fait une faute de signe.";
				return monCommentaire;
				break;
				default:
				fauteType1++;
				monCommentaire= "Erreur de calcul";
				return monCommentaire;
				break;
			}
		break;
		case ("soustraction"):
			switch(true){
				case (m<0 && n<0 && m-n>0 && maVariation>=0):
				fauteType1++;//faute de calcul
				monCommentaire= "|"+m+"|<|"+n+"|\nLa différence est bien positive.\nTu as fait une erreur de calcul";
				return monCommentaire;
				break;
				case (m<0 && n<0 && m-n>0 && maVariation<=0 && maVariation==-(m+n)):
				fauteType2++;//faute de signe
				monCommentaire= "|"+m+"|<|"+n+"|\nLa différence est positive.";
				return monCommentaire;
				break;
				case (m<0 && n<0 && m-n>0 && maVariation<=0 && maVariation!=-(m+n)):
				fauteType1++;
				monCommentaire= "|"+m+"|<|"+n+"|\nLorsqu'on soustrait un négatif, cela revient à aditionner.\nLe résultat est positif.\nTu as fait une faute de calcul";
				return monCommentaire;
				break;
				case (m<0 && n<0 && m-n<0 && maVariation<=0):
				fauteType1++;//faute de calcul
				monCommentaire= "|"+m+"|>|"+n+"|\nLa différence est bien négative.\nTu as fait une erreur de calcul";
				return monCommentaire;
				break;
				case (m<0 && n<0 && m-n<0 && maVariation>=0 && maVariation==-(m+n)):
				fauteType2++;//faute de signe
				monCommentaire= "|"+m+"|>|"+n+"|\nLa différence est négative.";
				return monCommentaire;
				break;
				case (m<0 && n<0 && m-n<0 && maVariation>=0 && maVariation!=-(m+n)):
				fauteType1++;
				monCommentaire= "|"+m+"|>|"+n+"|\nLorsqu'on soustrait un négatif, cela revient à aditionner.\nLe résultat est négatif.\nTu as fait une faute de calcul";
				return monCommentaire;
				break;
				case (m<0 && n>0 && maVariation==-(m+n)):
				fauteType2++;
				monCommentaire= "Le résultat devrait être négatif...";
				return monCommentaire;
				break;
				case (m<0 && n>0 && maVariation!=-(m+n)):
				fauteType1++;
				fauteType2++;
				monCommentaire= m +"est négatif, "+n+" est positif. \nLe résultat devrait être négatif...\nTu as fait une faute de calcul";
				return monCommentaire;
				break;
				case (m>0 && n<0 && m-n>0 && maVariation==-(m+n) ):
				fauteType3++;
				monCommentaire= "|"+m+"|>|"+n+"|\nLorsqu'on soustrait un négatif, cela revient à aditionner.\nLe résultat devrait être positif...";
				return monCommentaire;
				break;
				case (m>0 && n<0 && m-n>0 && maVariation!=-(m+n) ):
				fauteType1++;//faute de type "le plus grand en valeur absolue l'emporte"
				fauteType3++;
				monCommentaire= "|"+m+"|>|"+n+"|\nLorsqu'on soustrait un négatif, cela revient à aditionner.\nLe résultat devrait être positif...\nTu as fait une faute de calcul.";
				return monCommentaire;
				break;
				case (m>0 && n>0 && m-n>0 && maVariation==-(m+n)):
				fauteType3++;
				monCommentaire= "|"+m+"|>|"+n+"|\nC'est le nombre soustrait le plus petit en valeur absolue.\nLe résultat devrait être positif...";
				return monCommentaire;
				break;
				case (m>0 && n>0 && m-n<0 && maVariation==-(m+n)):
				fauteType3++;
				monCommentaire= "|"+m+"|<|"+n+"|\nC'est le nombre soustrait le plus grand en valeur absolue.\nLe résultat devrait être négatif...";
				return monCommentaire;
				break;
				case (m>0 && n>0 && m-n>0 && maVariation!=-(m+n)):
				fauteType1++;
				fauteType3++;
				monCommentaire= "|"+m+"|>|"+n+"|\nC'est le nombre soustrait le plus petit en valeur absolue.\nLe résultat devrait être positif...\nTu as fait une faute de calcul.";
				return monCommentaire;
				break;
				case (m>0 && n>0 && m-n<0 && maVariation!=-(m+n)):
				fauteType1++;
				fauteType3++;
				monCommentaire= "|"+m+"|<|"+n+"|\nC'est le nombre soustrait le plus grand en valeur absolue.\nLe résultat devrait être négatif...\nTu as fait une faute de calcul.";
				return monCommentaire;
				break;
				default:
				fauteType1++;
				monCommentaire= "Erreur de calcul";
				return monCommentaire;
				break;
			}
		break;
		case ("multiplication"):
			switch(true){
				case (m<0 && n<0 && maVariation==-(m*n)):
				fauteType2++;//Faute de signe
				monCommentaire= m+"<0 et "+n+"<0.\n(-)(-)=(+)";
				return monCommentaire;
				break;
				case (m<0 && n<0 && maVariation!=-(m*n) && maVariation<=0):
				fauteType2++;//Faute de signe
				fauteType1++;//faute de calcul
				monCommentaire=  m+"<0 et "+n+"<0.\n(-)(-)=(+)\nTu as aussi fait une faute de calcul";
				return monCommentaire;
				break;
				case (m<0 && n<0 && maVariation==-(m+n)):
				fauteType1++;//Faute de calcul
				fauteType2++;
				monCommentaire=  m+"<0 et "+n+"<0.\n(-)(-)=(+)\nTu as fait une addition au lieu d'une multiplication";
				return monCommentaire;
				break;
				case (m<0 && n<0 && maVariation==m+n):
				fauteType1++;//Faute de calcul
				monCommentaire= "Tu as fait une addition au lieu d'une multiplication";
				return monCommentaire;
				break;
				case (m<0 && n<0 && maVariation!=-(m*n) && maVariation>=0):
				fauteType1++;//Faute de calcul
				monCommentaire=  m+"<0 et "+n+"<0.\nLe signe est juste.Tu as fait une faute de calcul";
				return monCommentaire;
				break;
				case (m>0 && n>0 && maVariation==-(m*n)):
				fauteType2++;//Faute de signe
				monCommentaire=  m+">0 et "+n+">0.\n(+)(+)=(+)";
				return monCommentaire;
				break;
				case (m>0 && n>0 && maVariation!=-(m*n) && maVariation<=0):
				fauteType2++;//Faute de signe
				fauteType1++;//faute de calcul
				monCommentaire= m+">0 et "+n+">0.\n(+)(+)=(+)\nTu as aussi fait une faute de calcul";
				return monCommentaire;
				break;
				case (m>0 && n>0 && maVariation==-(m+n)):
				fauteType1++;//Faute de calcul
				fauteType2++;
				monCommentaire= m+">0 et "+n+">0.\n(+)(+)=(+)\nTu as fait une addition au lieu d'une multiplication";
				return monCommentaire;
				break;
				case (m>0 && n>0 && maVariation==m+n):
				fauteType1++;//Faute de calcul
				monCommentaire= "Tu as fait une addition au lieu d'une multiplication";
				return monCommentaire;
				break;
				case (m>0 && n>0 && maVariation!=-(m*n) && maVariation>=0):
				fauteType1++;//Faute de calcul
				monCommentaire= m+">0 et "+n+">0.\nLe signe est juste.\nTu as fait une faute de calcul";
				return monCommentaire;
				break;
				case (m>0 && n>0 && maVariation!=-(m*n) && maVariation<=0):
				fauteType1++;//Faute de calcul
				fauteType2++;
				monCommentaire= m+">0 et "+n+">0.\n(+)(+)=(+).\nTu as aussifait une faute de calcul";
				return monCommentaire;
				break;
				case (m<0 && n>0 && maVariation==-(m*n)):
				fauteType2++;
				monCommentaire= m+"<0 et "+n+">0.\n(-)(+)=(-)";
				return monCommentaire;
				break;
				case (m>0 && n<0 && maVariation==-(m*n)):
				fauteType2++;
				monCommentaire= m+">0 et "+n+"<0.\n(+)(-)=(-)";
				return monCommentaire;
				break;
				case (m<0 && n>0 && maVariation!=-(m*n) && maVariation<0):
				fauteType1++;
				monCommentaire= m+"<0 et "+n+">0.\nLe signe est juste.\nTu as fait une faute de calcul";
				return monCommentaire;
				break;
				case (m<0 && n>0 && maVariation!=-(m*n)):
				fauteType1++;
				fauteType2++;
				monCommentaire= m+"<0 et "+n+">0.\n(-)(+)=(-)\nTu as aussi fait une faute de calcul";
				return monCommentaire;
				break;
				case (m>0 && n<0 && maVariation!=-(m*n) && maVariation<0):
				fauteType1++;
				monCommentaire= m+">0 et "+n+"<0.\nLe signe est juste.\nTu as fait une faute de calcul";
				return monCommentaire;
				break;
				case (m>0 && n<0 && maVariation!=-(m*n)):
				fauteType1++;
				fauteType2++;
				monCommentaire= m+">0 et "+n+"<0.\n(+)(-)=(-)\nTu as aussi fait une faute de calcul";
				return monCommentaire;
				break;
				default:
				monCommentaire= "Erreur de calcul";
				return monCommentaire;
				break;
			}
		break;
		case ("division"):
			switch(true){
				case (m<0 && n<0 && maVariation<0 && maVariation==-m/n):
				fauteType2++;
				monCommentaire= m+"<0 et "+n+"<0.\n (-)(-)=(+)...";
				return monCommentaire;
				break;
				case (m<0 && n<0 && maVariation<0 && maVariation!=-m/n):
				fauteType2++;
				fauteType1++;
				monCommentaire= m+"<0 et "+n+"<0.\n (-)(-)=(+)...\nTu as aussi fait une faute de calcul";
				return monCommentaire;
				break;
				case (m<0 && n<0 && maVariation>0 && maVariation!=m/n):
				fauteType1++;
				monCommentaire= m+"<0 et "+n+"<0.\nLe signe est juste mais\ntu as fait une faute de calcul";
				return monCommentaire;
				break;
				case (m>0 && n>0 && maVariation<0 && maVariation==-m/n):
				fauteType2++;
				monCommentaire= m+">0 et "+n+">0.\n (+)(+)=(+)...";
				return monCommentaire;
				break;
				case (m>0 && n>0 && maVariation<0 && maVariation!=-m/n):
				fauteType2++;
				fauteType1++;
				monCommentaire= m+">0 et "+n+">0.\n (+)(+)=(+)...\nTu as aussi fait une faute de calcul";
				return monCommentaire;
				break;
				case (m>0 && n>0 && maVariation>0 && maVariation!=m/n):
				fauteType1++;
				monCommentaire= m+">0 et "+n+">0.\nLe signe est juste mais\ntu as fait une faute de calcul";
				return monCommentaire;
				break;
				case (m<0 && n>0 && maVariation>0 && maVariation==-m/n):
				fauteType2++;
				monCommentaire=  m+">0 et "+n+">0.\n(-)(+)=(-)\nTu as fait une faute de signe.";
				return monCommentaire;
				break;
				case (m<0 && n>0 && maVariation>0 && maVariation!=-m/n):
				fauteType2++;
				fauteType1++;
				monCommentaire=  m+"<0 et "+n+">0.\n(-)(+)=(-)\nTu as fait une faute de signe.\nEt...une faute de calcul";;
				return monCommentaire;
				break;
				case (m<0 && n>0 && maVariation<0 && maVariation!=-m/n):
				fauteType1++;
				monCommentaire=  m+"<0 et "+n+">0.\nLe signe est juste.\nMais... il y a une faute de calcul";;
				return monCommentaire;
				break;
				case (m>0 && n<0 && maVariation>0 && maVariation==-m/n):
				fauteType2++;
				monCommentaire=  m+">0 et "+n+"<0.\n(+)(-)=(-)\nTu as fait une faute de signe.";
				return monCommentaire;
				break;
				case (m>0 && n<0 && maVariation>0 && maVariation!=-m/n):
				fauteType2++;
				fauteType1++;
				monCommentaire=  m+">0 et "+n+"<0.\n(+)(-)=(-)\nTu as fait une faute de signe.\nEt...une faute de calcul";;
				return monCommentaire;
				break;
				case (m>0 && n<0 && maVariation<0 && maVariation!=-m/n):
				fauteType1++;
				monCommentaire=  m+">0 et "+n+"<0.\nLe signe est juste.\nMais... il y a une faute de calcul";;
				return monCommentaire;
				break;
				case (n==0):
				fauteType3++;
				monCommentaire= "On ne peut pas diviser par 0";
				return monCommentaire;
				break;
				default:
				fauteType1++;
				monCommentaire= "Erreur de calcul";
				return monCommentaire;
				break;
			}
		break;
	}*/
	
}
//remplissage du tableau
for (i=0;i<=100;i++)
{
	contenuJuste(i);
	tabHBJuste.push([tabContenuCase[0],tabContenuCase[1],tabContenuCase[2],tabContenuCase[3],tabContenuCase[4]]);
	//trace (tabHBJuste[i]);
}


//Détermination de la position de départ dans le tableau
var posDepTab = longueurChemin + Math.round(Math.random() * 5 + 5);
//trace("Position Départ dans Tableau : " + posDepTab)
noDep = noCase(departX, departY)
//Affichage du contenu dans les cases du chemin
for (i = 0; i < longueurChemin+1; i++)
{
	no = noCase(chemin[i][0], chemin[i][1]);
	maCase[no].setTextH(resultatOperation(choixOperation,tabHBJuste[posDepTab - i][0],tabHBJuste[posDepTab - i][1]), texteHaut_fmt);
	//maCase[no].commentaireCase=tabHBJuste[posDepTab - i-1][4];
	//trace("chemin, m"+tabHBJuste[posDepTab- i][0]+"chemin, n"+tabHBJuste[posDepTab- i][1]);
	maCase[no].operationChoisie(choixOperation,tabHBJuste[posDepTab - i-1][0], tabHBJuste[posDepTab - i-1][1], texteBas_fmt);

}

//Affichage des étiquettes Départ et Arrivée
noDep = noCase(departX, departY);
maCase[noDep].setTextH("ENTREE", texteES_fmt);
noArr = noCase(arriveeX, arriveeY);
maCase[noArr].setTextB("SORTIE", texteES_fmt);

//Affichage du contenu des impasses construites depuis les cases du chemin
for (c = 0 ; c < longueurChemin ; c++)
{
	//Affichage contenu première case première impasse
	no = noCase(impasse[c][1][0], impasse[c][1][1]);
	maCase[no].setTextH(tabHBJuste[posDepTab - 1 - c][3], texteHaut_fmt);
	//maCase[no].commentaireCase=tabHBJuste[posDepTab - 1 - c-1][4];
	maCase[no].operationChoisie(choixOperation,tabHBJuste[posDepTab - 1 - c-1][0], tabHBJuste[posDepTab - 1 - c-1][1], texteBas_fmt);

	//Affichage suite contenu première impasse
	for (i = 2; i < longImpasse[c]+1 ; i++)
	{
		no = noCase(impasse[c][i][0], impasse[c][i][1]);
		maCase[no].setTextH(resultatOperation(choixOperation,tabHBJuste[posDepTab - c - i][0],tabHBJuste[posDepTab - c - i][1]), texteHaut_fmt);
		//trace("impasse1, m"+tabHBJuste[posDepTab - c - i][0]+"impasse1, m"+tabHBJuste[posDepTab - c - i][1]);
		//maCase[no].commentaireCase=tabHBJuste[posDepTab - c - i-1][4];
		//maCase[no].commentaireCase=commentaire(tabHBJuste[posDepTab - c - i][0], tabHBJuste[posDepTab - c - i][1], choixOperation,resultatOperation(choixOperation,tabHBJuste[posDepTab - c - i][0],tabHBJuste[posDepTab - c - i][1]));
		maCase[no].operationChoisie(choixOperation,tabHBJuste[posDepTab - c - i-1][0], tabHBJuste[posDepTab - c - i-1][1], texteBas_fmt);
		//trace("a: "+tabHBJuste[posDepTab - c - i-1][0]+"b: "+tabHBJuste[posDepTab - c - i-1][1]);
//		trace("maCase[no].commentaireCase"+maCase[no].commentaireCase);
//	trace("maCase[no].textH: "+maCase[no].nb1);
//	trace("maCase[no].nb2, b: "+maCase[no].nb2);
	}
}

//Affichage du contenu de l'impasse construites depuis la sortie

//Affichage contenu première case première impasse
no = noCase(impasse[longueurChemin][1][0], impasse[longueurChemin][1][1]);
maCase[no].setTextH(tabHBJuste[posDepTab - 1 ][3], texteHaut_fmt);
//maCase[no].commentaireCase=tabHBJuste[posDepTab+ 1 - longueurChemin][4];
maCase[no].operationChoisie(choixOperation,tabHBJuste[posDepTab+ 1 - longueurChemin][0], tabHBJuste[posDepTab+ 1 - longueurChemin][1], texteBas_fmt);

//Affichage suite contenu première impasse
for (i = 2; i < longImpasse[longueurChemin]+1 ; i++)
{
	no = noCase(impasse[longueurChemin][i][0], impasse[longueurChemin][i][1]);
	maCase[no].setTextH(resultatOperation(choixOperation,tabHBJuste[posDepTab - i][0],tabHBJuste[posDepTab - i][1]), texteHaut_fmt);
	//trace("impasse2, m: "+tabHBJuste[posDepTab- i][0]+"impasse2, n: "+tabHBJuste[posDepTab - i][1]);
	//trace("tabHBJuste[posDepTab - c - i]"+tabHBJuste[posDepTab- i]);
	//trace("posDepTab: "+posDepTab+" c: "+c+" i: "+i);
	//maCase[no].commentaireCase=tabHBJuste[posDepTab - longueurChemin + i][4];
	maCase[no].operationChoisie(choixOperation,tabHBJuste[posDepTab - longueurChemin + i][0], tabHBJuste[posDepTab - longueurChemin + i][1], texteBas_fmt);
}

testEtatCase();


testDoubleSorties();

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
				maCase[no].setTextH(tabHBJuste[noAlea][3], texteHaut_fmt);
				//maCase[no].commentaireCase=tabHBJuste[noAlea-1][4];
				maCase[no].operationChoisie(choixOperation,tabHBJuste[noAlea-1][0], tabHBJuste[noAlea-1][1], texteBas_fmt);
			}
		}
	}
}

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
}