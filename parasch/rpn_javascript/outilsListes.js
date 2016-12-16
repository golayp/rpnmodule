//**************************************************** Mélange le contenu d'un tableau ******************************

function melangerElemListe(listeDepart)
{
	var listeFinale = [];
	
	while (listeDepart.length>0)
	{
		var nbAleatoire = Math.floor(Math.random()*listeDepart.length);
		listeFinale.push(listeDepart.splice(nbAleatoire,1));
	}
	//alert("liste mélangée : "+listeFinale);
	return(listeFinale);
}

function melangerElemListeDouble(listeDepart)
{
	var listeFinale = [],
		listeDep0 = [],
		listeDep1 = [];
		
	for (var n=0, nb = listeDepart.length; n<nb; n++)
	{
		listeDep0.push(listeDepart[n][0]);
		listeDep1.push(listeDepart[n][1]);
	}
	
	while (listeDep0.length>0)
	{
		var nbAleatoire = Math.floor(Math.random()*listeDep0.length),
			listeF = [];
		
		listeF.push(listeDep0.splice(nbAleatoire,1));
		listeF.push(listeDep1.splice(nbAleatoire,1));
		listeFinale.push(listeF);
	}
	//alert("liste mélangée : "+listeFinale);
	return(listeFinale);
}
/*
function melangerListeChoix(sol, chx)
{
	var nbSol = sol.length,
		nbCol = chx[0].length,
		table = [],
		listeMel = [],
		choixMel = [],
		solMel = [];
	
	for (var n=0; n<nbCol; n++)
	{
		table[n] = (n+1);
	}
	listeMel = melangerElemListe(table);
	
	for (var nS = 0; nS< nbSol; nS++)
	{
		solMel[nS] = listeMel[(sol[nS]-1)];
	}
}*/

//**************************************************** Création d'une liste à partir d'un tableau d'éléments et d'un tableau contenant le nb de chaque élément ******************************

//Crée un tableau contenant les éléments de "listeElem" , chaque élément apparaissant le nombre de fois indiqué dans le tableau "listeNb"
function creerListe(listeElem,listeNb)
{
	var listeCree = new Array();
	for (var nElem=0;nElem<listeElem.length;nElem++)
	{
		//alert(nElem+ " : "+listeElem[nElem]);
		for (nb=0;nb<listeNb[nElem];nb++)
		{
			listeCree.push(listeElem[nElem])
		}
	}
	//alert("listeCree : "+listeCree);
	return(listeCree);
}

//**************************************************** Arrangements sans répétition ******************************         >>>>>>>>>>>>>>A VERIFIER<<<<<<<<<<<<<<<<<<


function arrangements(listeL, listeF, k)
{
	var tab = new Array();
	/*alert("+++++++++++++++++++++++++++++");
	alert("listeL : "+listeL);
	alert("listeF : "+listeF);
	alert("k : "+k);
	alert("---------------------------");*/

	if (k==0)
	{
		tab.push(listeL)
	}
	else
	{
		for (var p in listeF)
		{
			var elemP = listeF[Number(p)];
			//alert("> elemP "+Number(p)+" de listeF "+listeF+" = "+elemP);
			
			var listeL2 = listeL.concat(elemP);
			//alert("> listeL2 : "+listeL2);
			
			var listeG = listeF.slice(0,Number(p)).concat(listeF.slice(Number(p)+1));
			//alert("> listeG : "+listeG);
			arrangements(listeL2, listeG, k-1);
		}
	}
	return(tab);
}

//**************************************************** Produit cartésien de tableaux contenu dans le tableau ts ******************************

function produitCartesien(ts)
{
	var r = [];
	r = tr (ts[0], ts[1])
	for (var n=2; n<ts.length; n++)
	{
		r = tr (r, ts[n])
	}
	return(r);
}

function tr(t1, t2)
{
	var t3 = [];
	for (var i=0;i<t1.length;i++)
	{
		for (var j=0; j<t2.length; j++)
		{
			var a = [t1[i],t2[j]];
			t3.push(a);
		}
	}
	return(t3);
}

//**************************************************** Retourne la position d'un élément dans une liste ******************************


function chercheNoElemListe(elem, liste)
{
	var no = 0;
	while (elem != liste[no] && no<liste.length)
	{
		no++;
	}
	if (elem != liste[no])
	{
		no = -1;
	}
	return(no);
}