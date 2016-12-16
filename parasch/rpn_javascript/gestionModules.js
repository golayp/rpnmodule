var monContenuXML;
var monEtatDesModules=[];
affichageEx();
var noModuleEnCours=0;
function suite(contenuXML, etatDesModules){
	//alert('suite');
	//alert('monXML'+monContenuXML.getElementsByTagName('module').length);
	var nbModules=contenuXML.getElementsByTagName('module').length;
	var consigne=contenuXML.getElementsByTagName('indice');
	var rappel=contenuXML.getElementsByTagName('aide');
	if (!document.getElementById('bouton0')){
	//alert('dans if');
		
		//affichageBoutonsRessources(rappel, consigne);
		affichageBoutonsModules(nbModules);
		affichageBoutonsRessources(rappel, consigne);
	};

	var longueurEtat=etatDesModules.length;
	//alert('longueurEtat '+longueurEtat);
	//On commence à 1 car etatDesModules commence par "null"
	for(var i=1;i<longueurEtat;i++){
		//soucis avec le é. on essaie de convertir en sous chaine avec les 5 premiers caractères
		//alert('modules '+etatDesModules.toString());
		var maString=etatDesModules[i];
		if(maString){
			var maSubString=maString.substr(0,5);
		};
		//alert('i: '+i);
		switch (maSubString){
		//switch (etatDesModules[i]){
			case 'en-co':
				
				document.getElementById('bouton'+(i-1)).className='boutonModuleEnCours';
				noModuleEnCours++;
				//alert('en-cours'+i);
				if (contenuXML.getElementsByTagName('donnee2')[noModuleEnCours-1].firstChild != null){
					description = [contenuXML.getElementsByTagName('titre')[0].firstChild.nodeValue,"Module "+noModuleEnCours,contenuXML.getElementsByTagName('donnee1')[noModuleEnCours-1].firstChild.nodeValue,contenuXML.getElementsByTagName('donnee2')[noModuleEnCours-1].firstChild.nodeValue];
				}else{
					description = [contenuXML.getElementsByTagName('titre')[0].firstChild.nodeValue,"Module "+noModuleEnCours,contenuXML.getElementsByTagName('donnee1')[noModuleEnCours-1].firstChild.nodeValue,''];
				}
				reference = "", annexes=[];
				//alert('description: '+description[1]);
				//alert('annexes '+contenuXML.getElementsByTagName('indice')[noModuleEnCours-1].hasChildNodes());
				
				//On remplit les annexes à la main car il se peut qu'elles ne contiennent rien donc firstChild donne une erreur.
				if(contenuXML.getElementsByTagName('aide')[noModuleEnCours-1].hasChildNodes()){
					//alert('if aide =true');
					annexes[0]=contenuXML.getElementsByTagName('aide')[noModuleEnCours-1].firstChild.nodeValue;
					annexes[1]=contenuXML.getElementsByTagName('aideDemarrage')[noModuleEnCours-1].firstChild.nodeValue;
				}else{
					//alert('if aide =false');
					annexes[0]='';
					annexes[1]='';
				}
				if(contenuXML.getElementsByTagName('indice')[noModuleEnCours-1].hasChildNodes()){
					//alert('if indice =true');
					annexes[2]=contenuXML.getElementsByTagName('indice')[noModuleEnCours-1].firstChild.nodeValue;
					annexes[3]=contenuXML.getElementsByTagName('indiceDemarrage')[noModuleEnCours-1].firstChild.nodeValue;
				}else{
					//alert('if indice =false');
					annexes[2]='';
					annexes[3]='';
				}

				logoIntro = "";

				avecNo = true;
				melange = false;
				dernierExe=false;
				
				//********************* CONSTRUCTIONS CONTENU HTML *****************************
							
				construitEnteteMAT();
				construitPiedDePage();
				construitDescription();
			break;
			case 'valid':
				//alert('validé '+i);
				document.getElementById('bouton'+(i-1)).className='boutonModuleValide';
			break;
			case 'non-v':i-1
				//alert('non-validé '+i);
				document.getElementById('bouton'+(i-1)).className='boutonModuleNonValide';
			break;
			default:
			//alert(etatDesModules[i]+' default '+(i));
				document.getElementById('bouton'+i).className='boutonModule';
			break;
		}
		
	}

}