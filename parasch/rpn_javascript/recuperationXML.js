//fonction ajax pour creer une instance xhr suivant les navigateurs

function getXMLHttpRequest() {
	var xhr = null;

	if(window.XMLHttpRequest || window.ActiveXObject) {
			if(window.ActiveXObject) {
					try {
							xhr = new ActiveXObject("Msxml2.XMLHTTP");
					} catch(e) {
							xhr = new ActiveXObject("Microsoft.XMLHTTP");
					}
			} else {
					xhr = new XMLHttpRequest();
			}
	} else {
			alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
			return null;
	}

	return xhr;
}

//On fait une fonction qui va chercher le xml
function recuperationXML(monXML){
	var retour;
	// tu crÃ©e l'objet :
	var xhr = getXMLHttpRequest();
	// On trouve la fonction dans l'entÃªte
	 
	if(xhr && xhr.readyState != 0){
	   xhr.abort();
	   //document.write('xhr.abort();');
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
		monEtatDesModules=[];
			retour=xhr.responseXML;
			//alert('le XML dans recuperationXML():'+retour.getElementsByTagName('sequence')[0].firstChild.nodeValue);
			monContenuXML=retour;
			suite(retour,[null,'en-cours']);
		}
		else if(xhr.readyState == 2 || xhr.readyState == 3){ // traitement non fini
		  // tu peux mettre un message ou un gif de chargement par exemple
		  //alert('traitement non fini, xhr=2||3');
	   }
	}
	 
	xhr.open("GET", monXML, true); // true pour asynchrone
	//xhr.setRequestHeader("Content-Type","text/xml"); // seulement si t'as choisi la mÃ©thode POST !
	xhr.send(null); // Ã©ventuellement t'envois plusieurs variables sÃ©parÃ©es par un &
	//document.write('affichageformulaireSupprimer monId:',monId);
	
	
}
	