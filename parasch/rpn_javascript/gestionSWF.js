//Cette fonction ne sert à  rien ici, juste à communiquer avec flash
function resetfield(){
	window.onbeforeunload = null;
	return "resetField()activé";
}

// fonction activÃ©e depuis flash, qui affiche les rÃ©sultats dans un popup rÃ©sultats et qui renvois Ã  flash des informations (avec return)
function recuperationSWF(resultats){
	monEtatDesModules=[];
	var buttonClicked=resultats["toucheCliquee"];
	//window.alert(JSON.stringify(resultats));
	//alert('resultats["toucheCliquee"]'+buttonClicked);
	//window.alert("username: "+resultats["total_time"]+"\nresultat: "+resultats["resultat_total"]+"\nmodule: "+resultats["etatModules"]);
	monEtatDesModules=resultats["etatModules"];
	if(buttonClicked=='suite'){
		//alert('suite if');
		suite(monContenuXML, monEtatDesModules);
	}
	//suite(monContenuXML, monEtatDesModules);
	return "username: "+resultats["username"]+"\nresultat: "+resultats["rep_juste"];
}

//Fonction qui demande un confirmation de fermeture de fenÃªtre
//window.onbeforeunload = confirmExit;

function confirmExit()
{
	return "Attention! En quittant cette page, tous les résultats seront perdus.\n\nCliquez sur 'Ne pas actualiser' pour reprendre l'exercice s'il n'est pas terminÃ©.";
	 
}
//var monContenuXML;
//var monEtatDesModules=[];
function insertAfter(newElement, afterElement) {
	var parent = afterElement.parentNode;
	if (parent.lastChild === afterElement) { 
		parent.appendChild(newElement);
	} else { 
		parent.insertBefore(newElement, afterElement.nextSibling);
	}
}
function affichageEx(){
/*	//variables qui sont passÃ©es au flash: FlashVars, params et attributes qui ne contiennent rien pour l'instant
	var flashVars = {};
		flashVars.id_eleve = '1ba800d7-9d21-4ce4-aff2-33bc73a52434';
		flashVars.level_eleve = '10';
		flashVars.nom_eleve= "Jean-Michel Luthi";
		flashVars.exSuivant='';

	var params = {};
		params.quality = "high";
		params.bgcolor = "#ffffff"; 
		params.play = "true";
		params.loop = "true";
		params.wmode = "window";
		//params.scale = "showall";
		params.menu = "true";
		params.devicefont = "false";
		params.align = "left";
		params.allowscriptaccess = "sameDomain";
		params.scroll = "true";
		params.allowfullscreen = "true";
		
	var attributes = {};
		attributes.id = nomEx;
		attributes.name = nomEx;
		attributes.align = "middle";
		attributes.width = "100%";
	
	
	//On charge de swf dans la page html et on lui passe des variables
	//swfobject.createCSS("html", "height:100%; background-color: #ffffff;");
	//swfobject.createCSS("body", "margin:0; padding:0; height:100%; width:100%");
	//swfobject.embedSWF("Sequ_11_Fonction_1.swf", "flashContent", 2000, 1500, "10.0.0", false, flashVars, attributes, params);
	//var largIE = (document.body.clientWidth);
	//var hautIE = (document.body.clientHeight);
	Nom = navigator.appName;
	//alert('nom du navigateur: '+Nom);
	if (Nom == 'Microsoft Internet Explorer') {
		swfobject.embedSWF(nomSWF, "contenuFlash", "100%", "100%", "10.0.0", "../javascript/expressinstall.swf", flashVars, attributes, params);
	}
	else
	{

		var larg = (window.innerWidth);
		var haut = 0.8*(window.innerHeight);
		swfobject.embedSWF(nomSWF, "contenuFlash", larg, haut, "10.0.0", "../javascript/expressinstall.swf", flashVars, attributes, params);
	}
	
	//On insert javascript
	var monJquery=document.createElement('script');
	monJquery.type="text/javascript";
	monJquery.src="http://code.jquery.com/jquery.min.js";
	document.head.appendChild(monJquery);
	document.head.insertBefore(monJquery, document.head.firstChild);*/
	
	
	$(document).ready(function(){
		console.log('On est dans ready');
		$('#contenuFlash').remove();
		
		var baliseEmbed=document.createElement('embed');
		baliseEmbed.id='testEmbed';
		$('section')[0].appendChild(baliseEmbed);
		//insertAfter(baliseEmbed, $('h4')[0]);
		//$('section')[0].removeChild($('#contenuFlash'));
		/*if (document.body)
			{
				console.log ('BODY');
			var larg = (document.body.clientWidth);
			var haut = (document.body.clientHeight);
			console.log(larg);
			console.log(haut);
			}
		else
			{
			var larg = (window.innerWidth);
			var haut = (window.innerHeight);
			}
		var larg = document.activeElement.clientWidth; 
		var haut = document.activeElement.clientHeight;
		console.log(larg);
		console.log(haut);*/
		//Semble fonctionner sur tous les navigateurs, yc IE
		var larg = (window.innerWidth);
		var haut = (window.innerHeight)*0.8;
		console.log(larg);
		console.log(haut);
		//$('#testEmbed').attr({'src':nomSWF, 'height':'900px', 'width':'1100px'});
		$('#testEmbed').attr({'src':nomSWF, 'height':haut, 'width':larg});
		
	});/**/
}
	