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
	couleurChoisie = "";
	typeExe = "surligneur";

function construitBtnCouleur(tabCouleurs)
{
	var div1 = document.createElement('div'),
		boutons = [],
		span = [];

	div1.className = "boutonsCouleurs";
	
	for (var i=0, nbBtn = tabCouleurs.length; i<nbBtn; i++)
	{
		span[i] = document.createElement('span');
		boutons[i] = document.createElement('button');
		
		switch(tabCouleurs[i][0])
		{
			case "rouge":
			boutons[i].id="rouge";
			boutons[i].className="btn btn-danger";
			boutons[i].setAttribute("onclick", "selectionne('rouge')");
			break;
			case "orange":
			boutons[i].id="orange";
			boutons[i].className="btn btn-warning";
			boutons[i].setAttribute("onclick", "selectionne('orange')");
			break;
			case "vert":
			boutons[i].id="vert";
			boutons[i].className="btn btn-success";
			boutons[i].setAttribute("onclick", "selectionne('vert')");
			break;
			case "bleu":
			boutons[i].id="bleu";
			boutons[i].className="btn btn-info";
			boutons[i].setAttribute("onclick", "selectionne('bleu')");
			break;
			case "noir":
			boutons[i].id="noir";
			boutons[i].className="btn btn-inverse";
			boutons[i].setAttribute("onclick", "selectionne('noir')");
			break;
		}
		boutons[i].type="button";
		boutons[i].innerHTML = tabCouleurs[i][1];
		span[i].appendChild(boutons[i]);
		div1.appendChild(span[i]);
	}
	baliseSection[0].appendChild(div1);
}

function set_opacity(id, opacity)
{
        el = document.getElementById(id);
        el.style["filter"] = "alpha(opacity="+opacity+")";
        el.style["-moz-opacity"] = opacity/100;
        el.style["-khtml-opacity"] = opacity/100;
        el.style["opacity"] = opacity/100;
        return true;
}

function selectionne(couleur)
{
	couleurChoisie = couleur;
	iniOpacite();
	set_opacity(couleur, 100);
}

function surligne(btn, couleur)
{
	switch(couleur)
	{
		case "rouge":
		btn.style.background = "#da4f49";
		break;
		case "orange":
		btn.style.background = "#faa732";
		break;
		case "vert":
		btn.style.background = "#5bb75b";
		break;
		case "bleu":
		btn.style.background = "#49afcd";
		break;
		case "noir":
		btn.style.background = "#000000";
		break;
	}
	btn.style.color = "#ffffff";
	/*btn.style.height = "20px"; 
	btn.style.padding = "0";
	btn.style.margin = "0";*/
}

function iniOpacite()
{
	set_opacity('rouge', 40);
	set_opacity('orange', 40);
	set_opacity('vert', 40);
	set_opacity('bleu', 40);
	set_opacity('noir', 40);
}
function construitTexte(texteTab)
{
	var p = document.createElement("p"),
		styleGras = false;
	p.className = "phLacune";
	
	for (var i=0, l = texteTab.length;i<l;i++)
	{
		/*if (texteTab[i].indexOf("]")!=-1)
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
		else */if (texteTab[i].indexOf("|")==0 && texteTab[i].lastIndexOf("|")!=(texteTab[i].length-1))
		{
			styleGras = true;
			var span = document.createElement("span");
			span.className="phg";
			var spanText = document.createTextNode(texteTab[i].substring(1));
			span.appendChild(spanText);
			p.appendChild(span);
		}
		else if (texteTab[i].lastIndexOf("|")==(texteTab[i].length-1))
		{
			styleGras = false;
			
			var a = document.createElement("a"),
				btn = document.createElement("button"),
				span = document.createElement("span"),
				idBouton = "";
			
			btn.type="button";
			btn.className="aSurligner";
			btn.innerHTML = texteTab[i].substring(0,texteTab[i].length-1);
			btn.id = 'aSurligner'+noLacune;
			btn.setAttribute("onclick", "surligne(this, couleurChoisie);");
			if(texteTab[i].indexOf("|")==0)
			{
				btn.innerHTML = texteTab[i].substring(1,texteTab[i].length-1);
			}

			span.appendChild(btn);
			p.appendChild(span);
			noLacune++;
		}
		else
		{
			var span = document.createElement("span");
			if (styleGras)
			{
				span.className="phg";
			}
			else
			{
				span.className="ph";
			}
			var spanText = document.createTextNode(texteTab[i]);
			span.appendChild(spanText);
			p.appendChild(span);
		}
	}
	baliseSection[0].appendChild(p);
}

/*
function construitTexte(texteTab)
{
	var p = document.createElement("p"),
		styleGras = false;
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
			
			span.innerHTML = "Bonne réponse : <strong>"+solutions[noLacune]+"</strong>";
			noLacune++;
			a.appendChild(inp);
			a.appendChild(span);
			p.appendChild(a);
		}
		else if (texteTab[i].indexOf("(")!=-1 && texteTab[i].indexOf(")")==-1)
		{
			styleGras = true;
			var span = document.createElement("span");
			span.className="phg";
			var spanText = document.createTextNode(texteTab[i]);
			span.appendChild(spanText);
			p.appendChild(span);
		}
		else if (texteTab[i].indexOf(")")!=-1)
		{
			styleGras = false;
			var span = document.createElement("span");
			span.className="phg";
			var spanText = document.createTextNode(texteTab[i]);
			span.appendChild(spanText);
			p.appendChild(span);
		}
		else
		{
			var span = document.createElement("span");
			if (styleGras)
			{
				span.className="phg";
			}
			else
			{
				span.className="ph";
			}
			var spanText = document.createTextNode(texteTab[i]);
			span.appendChild(spanText);
			p.appendChild(span);
		}
	}
	baliseSection[0].appendChild(p);
}
*/

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