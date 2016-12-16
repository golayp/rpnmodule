//********************* INITIALISATION VARIABLES SPECIFIQUES ******************************
			
var inputs = [],
	inputsLength = 0,
	liParent = [],
	nbColonnes = 0,
	solAdaptes =[],
	description = [],
	reference = "",
	entete = [],
	phrases = [],
	phrasesSol = [],
	choix = [],
	avecNo = true,
	melange = true,
	dernierExe = false;
	typeExe = "radio";
			
//********************* FONCTIONS CONSTRUCTIONS ******************************
			
function construitPhrase(no)
{
	var p = document.createElement("p");
					
	if (avecNo)
	{
		p.innerHTML = "<strong>"+(no+1)+".</strong> "+phrases[no];
	}
	else
	{
		p.innerHTML = phrases[no];
	}
		
	baliseSection[0].appendChild(p);
}
	
function construitChoix(no)
{
	var ul = document.createElement("ul"),
		liI = [],
		liL = [],
		inp =  [],
		lab = [];
		
	ul.id = "sep";
			
	for (var noC = 0; noC<nbColonnes; noC++)
	{
		liI[noC] = document.createElement("li");
		inp[noC] = document.createElement("input");
		inp[noC].type="radio";
		inp[noC].name=("rad"+no);
		inp[noC].id=("r"+no+"_"+noC);
		inp[noC].value=(noC+1);
		liI[noC].appendChild(inp[noC]);
		ul.appendChild(liI[noC]);
		liL[noC] = document.createElement("li");
		lab[noC] = document.createElement("label");
		lab[noC].setAttribute("for","r"+no+"_"+noC);
		lab[noC].innerHTML = choix[no][noC];
		liL[noC].appendChild(lab[noC]);
		ul.appendChild(liL[noC]);
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
	inputs = document.getElementsByName('rad'+no);
	var compteCheck = 0;
	inputsLength = inputs.length;
	
	for (var i = 0; i < inputsLength; i++)
	{
		liParent.push(inputs[i].parentNode);
		if (inputs[i].type == 'radio' && inputs[i].checked)
		{
			compteCheck++;
			reponses.push(inputs[i].value);
		}
		else
		{
			reponses.push(0);
		}
	}
	for (var i = 0; i < inputsLength; i++)
	{
		liParent[(nbColonnes)*no+i].className = "vide";//Initialisation pour faire disparaître la zone rouge
		
		if (nbEssais>1 && compteCheck==0)
		{
			liParent[(nbColonnes)*no+i].className = "faux";
		}
		else
		{
			if (nbEssais>1 && reponses[(nbColonnes)*no+i]!=solAdaptes[(nbColonnes)*no+i] && reponses[(nbColonnes)*no+i]!=0)
			{
				liParent[(nbColonnes)*no+i].className = "faux";
			}
		}	
		if (nbEssais>1 && reponses[(nbColonnes)*no+i]==solAdaptes[(nbColonnes)*no+i] && reponses[(nbColonnes)*no+i]!=0)
		{
			liParent[(nbColonnes)*no+i].className = "juste";
		}
	}
}

function compteJustes()
{
	for (var ns=0, nMax=solAdaptes.length; ns<nMax; ns++)
	{
		if (reponses[ns]!=0 && reponses[ns]==solAdaptes[ns])
		{
			nbJustes++;
		}
	}
}
			
//********************* FONCTIONS DIVERS ******************************
			
function montrerSolutions()
{
	for (var no=0, nbMax=solutions.length; no < nbMax; no++)
	{
		inputs = document.getElementsByName('rad'+no);
		for (var i = 0; i < inputsLength; i++)
		{
			if (solAdaptes[(nbColonnes)*no+i]!=0)
			{
				liParent[(nbColonnes)*no+i].className = "juste";
				inputs[i].checked = true;
			}
		}
	}
}

function iniReponses()//Fonction utilisée lorsque l'on clique sur le BOUTON VALIDER
{
	reponses.splice(0);
	liParent.splice(0);
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