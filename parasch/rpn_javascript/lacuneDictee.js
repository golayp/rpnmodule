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
	phrasesSol = [],
	choix = [],
	noLacune = 0,
	avecNo = true,
	melange = true,
	dernierExe = false;
	typeExe = "lacune";
			
//********************* FONCTIONS CONSTRUCTIONS ******************************

function construitTexte(texteTab)
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
			
			a.setAttribute('href', '');
			a.draggable = false;
			
			inp.className="ph";
			inp.type="text";
			inp.name="lacune";
			inp.id="lacune"+noLacune;
			a.onclick = function() 
			{
				return false; // On bloque la redirection
			}
			span.innerHTML = "Bonne réponse : <strong>"+solutions[noLacune]+"</strong>";
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
}

function construitAudio(son)
{
	var audio = document.createElement("audio"),
		source = document.createElement("source");
	
	audio.id = "audioPlayer";
	audio.controls = "controls";
	source.src = "../audio/"+son+".mp3";
	
	audio.appendChild(source);
	baliseSection[0].appendChild(audio);
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
		if (inputs[i]==solutions[i].toLowerCase() && nbEssais>1)
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
		if (inputs[ns]==solutions[ns].toLowerCase())
		{
			nbJustes++;
		}
	}
}
			
//********************* FONCTIONS DIVERS ******************************
			
function montrerSolutions()
{
	for (var i = 0; i < inputsLength; i++)
	{
		if (inputs[i]!=solutions[i].toLowerCase())
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