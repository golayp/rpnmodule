//fonction de lecture d'un fichier XML à trois niveaux. place les valeurs dans une liste à deux entrées
trace("lectureXML");
lectureXML=function(fichierXML){

	// On crée un nouveau tableau. Chaque élément de ce tableau est une ligne avec tous les enregistrements.
	// C'est donc un tableau à double entrée
	
	// Fonction s'exécutant si un fichier est chargé, ici, elle retourne la liste de tous les enregistrements de fichierXML
	
	//On récupère le nombre d'enregistrements, y comris le titre

	var enregistrements=fichierXML.firstChild.firstChild.childNodes;

	//On récupère le titre de la séquence avec enregistrements[0] on le met dans liste[0]
	maSequence=enregistrements[0];
	//On récupère le titre de l'exercice avec enregistrements[1] on le met dans liste[1]
	//enregistrements[n] du fichier XML correspond à chaque module si n>1 (titre) et n< nb de modules (nbEnregistrements -1)
	monTitre=enregistrements[1].firstChild.nodeValue;
	// On place chaque enregistement avec les balises dans un array
	var aNode:XMLNode = fichierXML.firstChild.firstChild.firstChild;
	i=0;

	//On passe en revue tous les 2 enregistrements (le premier:sequence et le deuxième titre avec tous les modules)jusqu'à ce que aNode soit null
	while (aNode) {

		if (i>0){//pour éviter le nom de la séquence
			// Contenu contient les noeuds enfans de aNode
			var contenu=aNode.childNodes;

			var nbRubriques=contenu.length; //Ici 7, 6 modules plus le titre

			//nbRubriques est le nombre de module plus le titre.
			_level0.nbModules = nbRubriques - 1;
			trace ("///////////////////////////////////////////////////////////////////////////////////////////////////////////nbModules"+_level0.nbModules)
			var obj:Array = new Array();
			
			//Cette boucle permet de prendre le noeud enfant , ici le contenu, de "contenu" et de mettre
			//chaque élément du tableau dans liste.
			for (var j = 0; j<nbRubriques; j++) {
				var monModule:Array = new Array();
				//contenu[j] est la balise <module> avec son contenu
				obj[j] = contenu[j].childNodes;//C'est le contenu de <module> avec les balises
				//parmi les deux options suivantes (.push ou [i][j], les deux produisent la même chose. Donc c'est égal.
				//finalement dans liste[i]on a toutes les informations concernant une situation linéaire ou affine
				for(var k=0;k< obj[j].length;k++){
					monModule[k]=obj[j][k].firstChild.nodeValue;
				}
				liste[j]=monModule;

				
			}
			//On met l'objet qui contient les modules dans liste.
		}

		i++;
		//ici on prend le noeud voisin (frère)
		aNode = aNode.nextSibling;
		
	}
	for (i = 0; i < liste.length; i++) {
		for (j = 0; j < liste[i].length;j++){
		
			if (liste[i][j] == undefined) {
				liste[i][j] = "";
			}
		}
		trace (liste[i])
		trace("")
		
	}
	
	

}

