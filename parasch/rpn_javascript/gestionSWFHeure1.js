//Cette fonction ne sert à  rien ici, juste à communiquer avec flash
function resetfield(){
	window.onbeforeunload = null;
	return "resetField()activé";
}

// fonction activÃ©e depuis flash, qui affiche les rÃ©sultats dans un popup rÃ©sultats et qui renvois Ã  flash des informations (avec return)
function recuperationSWF(resultats){
	monEtatDesModules=[];
	//window.alert(JSON.stringify(resultats));
	//alert('resultats'+resultats);
	//window.alert("username: "+resultats["total_time"]+"\nresultat: "+resultats["resultat_total"]+"\nmodule: "+resultats["etatModules"]);
	monEtatDesModules=resultats["etatModules"];
	suite(monContenuXML, monEtatDesModules);
	return "username: "+resultats["username"]+"\nresultat: "+resultats["rep_juste"];
}

//Fonction qui demande un confirmation de fermeture de fenÃªtre
//window.onbeforeunload = confirmExit;

function confirmExit()
{
	return "Attention! En quittant cette page, tous les rÃ©sultats seront perdus.\n\nCliquez sur 'Ne pas actualiser' pour reprendre l'exercice s'il n'est pas terminÃ©.";
	 
}
//var monContenuXML;
//var monEtatDesModules=[];
function affichageEx(){
	//variables qui sont passÃ©es au flash: FlashVars, params et attributes qui ne contiennent rien pour l'instant
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
		var haut = (window.innerHeight);
		swfobject.embedSWF(nomSWF, "contenuFlash", larg, haut, "10.0.0", "../javascript/expressinstall.swf", flashVars, attributes, params);
	}
}