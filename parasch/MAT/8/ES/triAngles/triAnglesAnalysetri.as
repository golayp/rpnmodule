//Luthi jm
//Luthi jm

function test()
{
	trace ("on fait la fonction test")
	trace("elementsTires[posNumero-1]"+elementsTires[posNumero-1])
	trace("")
	for (i = 0; i < nbCategories; i++) {
		if (monUnite[elementsTires[posNumero - 1]].categorie == _level0.listeCategorie[i]) {
			if (posClip == monUnite[elementsTires[posNumero - 1]].categorie)
			{
					sacObjet.push([true,_level0.listeCategorie[i],monUnite[elementsTires[posNumero-1]].nom,monUnite[elementsTires[posNumero-1]].nom2, elementsTires[posNumero-1]]);
			}else {
					sacObjet.push([false,_level0.listeCategorie[i],monUnite[elementsTires[posNumero-1]].nom,monUnite[elementsTires[posNumero-1]].nom2, elementsTires[posNumero-1]]);
			}
			trace("sacobjet dans analyse: "+sacObjet);
		}
	}

		posClip = "vide";
		boutonSourisHaut=false;
}
function verifier()
{
	if (posNumero>=elementsTires.length)
	{
		nbFautes = 0;
		trace("verifier");
		fondMc.verifier_btn._visible = true;
		for(i=0;i<sacObjet.length;i++){
				trace(i)
				if(sacObjet[i][0]==false)
				{
					var contenuRetour:Array = new Array();
					trace("dans Fautes");
					trace("(monArray)" +sacObjet );
					contenuRetour[0] = "Cet angle doit aller dans le sac: " + sacObjet[i][1];
					trace("Dans verifier"+sacObjet[i][4])
					contenuRetour[1] = sacObjet[i][4];
					retours[nbFautes] = contenuRetour;
					nbFautes++;
					trace("nbFautes"+nbFautes)
					_level0.retour = "Il faut recommencer tant qu'il y a des erreurs";
					_level0.rep_juste=false;
				}
		}
		if (nbFautes == 0 && fondMc.verifier_btn._visible == false) {
			_level0.rep_juste=true;
		}
		if (nbFautes == 0) {
			_level0.retour = "Bravo! Passe à l'exercice suivant.";
			_level0.rep_juste=true;
		}	   
		fondMc.verifier_btn._x=posClipDepX;
	    fondMc.verifier_btn._y=posClipDepY;

	}else if (posNumero < elementsTires.length) {
		_level0.retour = "Ce que tu as fait était juste. Mais tu n'as pas tout trié";
		if (sacObjet.length == 0)
		{
			_level0.retour="Tu n'avais encore rien fait!"
		}
		nbFautes = 0;
		
		for(i=0;i<sacObjet.length;i++){
			/*rougeOuiNon._visible=true;
			oui._visible=true;
			non._visible=true;
			rougeOuiNonTxt.text = "tu n'as pas tout fait";*/
				if(sacObjet[i][0]==false)
				{
					var contenuRetour:Array = new Array();
					trace("dans Fautes");
					trace("(monArray)" +sacObjet );
					contenuRetour[0] = "Cet angle est\n " + monArray[i][1];
					contenuRetour[1] = sacObjet[i][4];
					retours[nbFautes] = contenuRetour;
					nbFautes++;
					_level0.retour = "Il y avait des erreurs et tu n'as pas tout fait. Recommence!";
					_level0.rep_juste = false;
					//rougeOuiNonTxt.text = "tu n'as pas tout fait, en plus il y avait "+nbFautes+" fautes";
				}/*else {
					_level0.retour = "Ce que tu as fait était juste. Mais tu n'as pas tout trié"+sacObjet;
					//rougeOuiNonTxt.text = "tu n'as pas tout fait, mais c'était juste";
					_level0.rep_juste=false;
				}*/
		}
	}
}
function verifierBouton(monArray)
{
	for(i=0;i<monArray.length;i++){
		trace(i)
		if(monArray[i][0]==false)
		{
			rougeOuiNon._visible=true;
			oui._visible=true;
			non._visible=true;
			rougeOuiNonTxt.text = "Veux-tu voir tes fautes?";
			_level0.rep_juste=false;
		}
	}
	if (nbFautes == 0 && fondMc.verifier_btn._visible == false) {
		//_level0.retour = "Bravo!\nPasse à l'exercice suivant.";
		vertTxt.text="Bravo tout est juste.\nTu peux valider.";
		vert._visible=true;
		finVert._visible = true;
		//_level0.rep_juste=true;
	}
	if (nbFautes == 0) {
		//_level0.retour = "Bravo!\nPasse à l'exercice suivant.";
		//_level0.rep_juste=true;

	}
}
