//********************* INITIALISATION VARIABLES SPECIFIQUES ******************************
			
var inputs = [],
	inputsLength = 0,
	aParent = [],
	nbColonnes = 0,
	solAdaptes =[],
	description = [],
	reference = "",
	entete = [],
	phrases = [],
	motsPhrases = [],
	partiesPhrases = [],
	nbPartiesPh = 0,
	ligne = [],
	consignesPh = [],
	phrasesSol = [],
	choix = [],
	noLacune = 0,
	avecNo = true,
	melange = true,
	dernierExe = false;
	typeExe = "lacune";
			
//********************* FONCTIONS CONSTRUCTIONS ******************************

/*function construitTexte(texteTab)
{
	var p = document.createElement("p");
	p.className = "phLacune";
	
	for (var i=0, l = texteTab.length;i<l;i++)
	{
		if (texteTab[i].indexOf("]")!=-1)
		{
			var a = document.createElement("a"),
				inp = document.createElement("input"),
				span = document.createElement("span");
			
			a.setAttribute('href', '#');
			a.draggable = false;
			
			inp.className="ph";
			inp.type="text";
			inp.name="lacune";
			inp.id="lacune"+noLacune;
			
			span.innerHTML = "Bonne réponse : <strong>"+solutions[noLacune][0]+"</strong>";
			noLacune++;
			a.appendChild(inp);
			a.appendChild(span);
			p.appendChild(a);
		}
		else if (texteTab[i].indexOf(")")!=-1)
		{
			var span = document.createElement("span");
			span.className="phg";
			var spanText = document.createTextNode(texteTab[i]);
			span.appendChild(spanText);
			p.appendChild(span);
		}
		else
		{
			var span = document.createElement("span");
			span.className="ph";
			var spanText = document.createTextNode(texteTab[i]);
			span.appendChild(spanText);
			p.appendChild(span);
		}
	}
	baliseSection[0].appendChild(p);
}*/

function construitEnteteTab()
{
	nbColonnes = entete.length;
	var ul = document.createElement("ul"),
		li = [];
	
	ul.id = "tab";

	for (var noC = 0; noC<nbColonnes; noC++)
	{
		li[noC] = document.createElement("li");
		li[noC].className = "entete";
		li[noC].innerHTML = entete[noC];
		
		if (noC==0)
		{
			li[noC].id = "enteteTabG";
		}
		if (noC==(nbColonnes-1))
		{
			li[noC].id = "enteteTabD";
		}
		ul.appendChild(li[noC]);
	}
	baliseSection[0].appendChild(ul);
}
	
function construitLigneLacune(no)
{
	nbColonnes = entete.length;
	var ul = document.createElement("ul"),
		li = [],
		inp =  [],
		span = [],
		a = [];
		
	ul.id = "tab";
			
	for (var noC = 0; noC<nbColonnes; noC++)
	{
		li[noC] = document.createElement("li");
		if (no==(phrases.length-1) && noC==0)
		{
			li[noC].id = "piedTabG";
		}
		if (no==(phrases.length-1) && noC==(nbColonnes-1))
		{
			li[noC].id = "piedTabD";
		}
		
		if (ligne[no][noC]=="")
		{
			a[noC] = document.createElement("a");
			inp[noC] = document.createElement("input");
			span[noC] = document.createElement("span");
			
			a[noC].setAttribute('href', '#');
			a[noC].draggable = false;
			
			inp[noC].className="ph";
			inp[noC].type="text";
			inp[noC].name="lacune";
			inp[noC].id="lacune"+noLacune;
			
			span[noC].innerHTML = "Bonne réponse : <strong>"+solutions[noLacune][0]+"</strong>";
			noLacune++;
			a[noC].appendChild(inp[noC]);
			a[noC].appendChild(span[noC]);
			li[noC].appendChild(a[noC]);			
		}
		else
		{
			li[noC].innerHTML = ligne[no][noC];
		}
		ul.appendChild(li[noC]);
	}
	baliseSection[0].appendChild(ul);
}
	
function construitReference(ref)
{
	var div = document.createElement("div");
	div.className = "reference";
	div.innerHTML = ref;
	baliseSection[0].appendChild(div);
}
			
			
//********************* FONCTIONS ANALYSE ******************************
			
function analyseCheck(no)
{
	var rep = document.getElementsByName('lacune');
	inputsLength = rep.length;
	
	for (var i = 0; i < inputsLength; i++)
	{
		aParent[i] = rep[i].parentNode;
		inputs[i] = rep[i].value.toLowerCase().trim();
	}
	for (var i = 0; i < inputsLength; i++)
	{
		var nbSol = solutions[i].length,
			repJ = false;
			
		for (var s=0; s<nbSol; s++)
		{
			if (inputs[i]==solutions[i][s].toLowerCase() && nbEssais>1 && repJ==false)
			{
				repJ = true;
			}
		}
		if (repJ)
		{
			rep[i].className = "phcorrect";
		}
		else if (nbEssais>1)
		{
			rep[i].className = "phincorrect";
		}
	}
}

function compteJustes()
{
	var rep = document.getElementsByName('lacune');
	inputsLength = rep.length;
	
	for (var ns=0; ns<inputsLength; ns++)
	{
		var nbSol = solutions[ns].length;
		
		for (var s=0; s<nbSol; s++)
		{
			if (inputs[ns]==solutions[ns][s].toLowerCase())
			{
				nbJustes++;
			}
		}
	}
}
			
//********************* FONCTIONS DIVERS ******************************
			
function montrerSolutions()
{
	for (var i = 0; i < inputsLength; i++)
	{
		var nbSol = solutions[i].length,
			repJ = false;
		
		for (var s=0; s<nbSol; s++)
		{
			if (inputs[i]==solutions[i][s].toLowerCase() && repJ==false)
			{
				repJ = true;
			}
		}
		if (repJ==false)
		{
			aParent[i].className = "erreur";
		}
	}
}

function iniReponses()//Fonction utilisée lorsque l'on clique sur le BOUTON VALIDER
{
	reponses.splice(0);
	nbJustes = 0;
}

function adapteSol(tab)
{
	for (var s=0, nbSol = tab.length; s<nbSol; s++)
	{
		for (var nc=1; nc<=nbColonnes; nc++)
		{
			if(tab[s]==nc)
			{
				solAdaptes.push(nc);
			}
			else
			{
				solAdaptes.push(0);
			}
		}
	}
}