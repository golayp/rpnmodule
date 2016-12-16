//fonction de lecture d'un fichier XML à trois niveaux. place les valeurs dans une _level0.liste à deux entrées
//fichierXML est défini dans la première image de unites.fla. C'EST DEJA LE CONTENU XML
//trace("lectureXML");
var _level0.liste:Array=new Array();
lectureXML=function(fichierXML){
//trace("lectureXML dans: "+fichierXML);
	// On crée un nouveau tableau. Chaque élément de ce tableau est une ligne avec tous les enregistrements.
	// C'est donc un tableau à double entrée
	
	// Fonction s'exécutant si un fichier est chargé, ici, elle retourne la _level0.liste de tous les enregistrements de fichierXML
	
	//On récupère le nombre d'enregistrements

	// On place chaque enregistement avec les balises dans un array
	var aNode:XMLNode = fichierXML.firstChild.firstChild;
	var i:Number=0;
	//On passe en revue tous les 2 enregistrements (le premier:sequence et le deuxième titre avec tous les modules)jusqu'à ce que aNode soit null
	while (aNode) {
//trace("aNode"+aNode);
		_level0.liste[i]=new Array();
		// Contenu contient les noeuds enfans de aNode
		var contenu=aNode.childNodes;
//trace("contenu"+contenu);
		var nbRubriques=contenu.length; //Ici,6 modules
//trace("nbRubriques"+nbRubriques);
//trace("contenu[0]"+contenu[0].firstChild.nodeValue);
		//nbRubriques est le nombre de mrubriques dans <unite>.
		//Cette boucle permet de prendre le noeud enfant , ici le contenu, de "contenu" et de mettre
		//chaque élément du tableau dans _level0.liste.
		for (var j = 0; j<nbRubriques; j++) {
			//parmi les deux options suivantes (.push ou [i][j], les deux produisent la même chose. Donc c'est égal.
			//finalement dans _level0.liste[i]on a toutes les informations concernant une situation linéaire ou affine
			//On met l'objet qui contient les modules dans _level0.liste.
			_level0.liste[i][j]=contenu[j].firstChild.nodeValue;
		}
//trace("_level0.liste[i]"+_level0.liste[i]);
		//ici on prend le noeud voisin (frère)
		aNode = aNode.nextSibling;
		i++
	}

}

