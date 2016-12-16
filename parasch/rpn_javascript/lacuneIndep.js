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
	longPh = [];
	motsPhrases = [],
	partiesPhrases = [],
	nbPartiesPh = 0,
	consignesPh = [],
	phrasesSol = [],
	choix = [],
	noLacune = 0,
	avecNo = true,
	melange = true,
	dernierExe = false;
	typeExe = "lacune";
			
//********************* FONCTIONS CONSTRUCTIONS ******************************


function construitPhrase(no)
{
	var p = document.createElement("p");
	
	p.id = "ph";
	if (avecNo)
	{
		p.innerHTML = (no+1)+". "+phrases[no];
	}
	else
	{
		p.innerHTML = phrases[no];
	}
		
	baliseSection[0].appendChild(p);
}

function construitConsignePh(no)
{
	var h = document.createElement("h4");
	
	h.id = "ph";
	h.innerHTML = consignesPh[no];
		
	baliseSection[0].appendChild(h);
}
function suppBalises(ph)
{
	var phSsBal = ph;
	
	while (phSsBal.indexOf("<")!=-1)
	{
		var phSsBalDeb = "",
			phSsBalFin = "";
			
		phSsBalDeb = phSsBal.slice(0,phSsBal.indexOf("<"));
		phSsBalFin = phSsBal.slice(phSsBal.indexOf("<"));
		phSsBalFin = phSsBalFin.slice(phSsBalFin.indexOf(">")+1);
		phSsBal = phSsBalDeb.concat(phSsBalFin);
	}
	return(phSsBal);
}


function construitLacune(no)
{
	var p = document.createElement("p"),
		a = document.createElement("a"),
		inp = document.createElement("input"),
		span = document.createElement("span");
			
	a.setAttribute('href', '#');
	a.draggable = false;
	
	inp.className = "ph";
	inp.type = "text";
	inp.name = "lacune";
	inp.id = "lacune"+no;
	inp.value = suppBalises(phrases[no]);
			
	span.innerHTML = "Bonne réponse : <strong>"+solutions[no][0]+"</strong>";
	a.appendChild(inp);
	a.appendChild(span);
	p.appendChild(a);
	baliseSection[0].appendChild(p);
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
			aParent[i].className = "faux";
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