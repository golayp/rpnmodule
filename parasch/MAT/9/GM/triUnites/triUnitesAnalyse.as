﻿//Luthi jm
//Luthi jm
var nomSacSsEspInsec:Array = new Array();

function suppEspacesInsecNomCat(chaine:String):String
{
	var chaineCoupee:Array = new Array();
	var chaineFinie:String = "";
	chaineCoupee = chaine.split("_");
	for (cc=0;cc<chaineCoupee.length;cc++)
	{
		chaineFinie = chaineFinie + " " +chaineCoupee[cc];
	}
	return (chaineFinie);
};

function test()
{
	//trace ("on fait la fonction test")

			if (monUnite[numero].categorieSac == monUnite[numero].categorie)
			{
				trace("true"+numero)
				sacObjet[numero]=[true, monUnite[numero].categorieSac, monUnite[numero].categorie, monUnite[numero].nom, monUnite[numero].nom2, numero, monUnite[numero].posX, monUnite[numero].posY];
			}else {
				sacObjet[numero]=[false, monUnite[numero].categorieSac, monUnite[numero].categorie, monUnite[numero].nom, monUnite[numero].nom2, numero, monUnite[numero].posX, monUnite[numero].posY];
				nomSacSsEspInsec[numero] = suppEspacesInsecNomCat(monUnite[numero].categorieSac);
			}

	trace("sacobjet.length dans test analyse: "+sacObjet.length);

}
function testCorrection()
{
	//trace ("on fait la fonction test")

			if (monUnite[numero].categorieSac == monUnite[numero].categorie)
			{
				trace("true"+numero)
				sacObjet[numero]=[true, monUnite[numero].categorieSac, monUnite[numero].categorie, monUnite[numero].nom, monUnite[numero].nom2, numero, monUnite[numero].posX, monUnite[numero].posY];
			}else {
				sacObjet[numero]=[false, monUnite[numero].categorieSac, monUnite[numero].categorie, monUnite[numero].nom, monUnite[numero].nom2, numero, monUnite[numero].posX, monUnite[numero].posY];
				nomSacSsEspInsec[numero] = suppEspacesInsecNomCat(monUnite[numero].categorieSac);
			}

	//trace("sacobjet dans testCorrection analyse: "+sacObjet);

}
function verifier()
{
	//On va tester si il y a un clip qui est corrige, à ce moment il ne faut pas mettre le bouton vérifier mais la suite des bulles rouges
	if (posNumero>=elementsTires.length)
	{
		nbFautes = 0;
		fondMc.verifier_btn._visible = true;
		for(i=0;i<sacObjet.length;i++){
				//trace(i)
				if(sacObjet[i][0]==false)
				{
					var contenuRetour:Array = new Array();
					var contenuRetourSol:Array = new Array();
//					contenuRetour[0] = "Cette phrase ne doit pas aller dans le sac:\n" + sacObjet[i][1];
					contenuRetour[0] = "L'unité: "+ sacObjet[i][3]+" "+sacObjet[i][4]+"\nne doit pas aller dans le sac:\n\n\" " + nomSacSsEspInsec[i]+" \"";
					contenuRetour[1] = sacObjet[i][2];//On y met sa catégorie
					contenuRetour[2] = sacObjet[i][5];//On y met son numero
					contenuRetour[3] = sacObjet[i][6];//On y met sa position x dans le sac
					contenuRetour[4] = sacObjet[i][7];//On y met sa position y dans le sac
					
					contenuRetourSol[0] = "L'unité: "+ sacObjet[i][3]+" "+sacObjet[i][4]+"\ndoit aller dans le sac:\n\n\" " + sacObjet[i][2]+" \"";
					contenuRetourSol[1] = sacObjet[i][2];//On y met sa catégorie
					contenuRetourSol[2] = sacObjet[i][5];//On y met son numero
					contenuRetourSol[3] = sacObjet[i][6];//On y met sa position x dans le sac
					contenuRetourSol[4] = sacObjet[i][7];//On y met sa position y dans le sac
					//On remplit les repturs utilisée sans les vérification et les boutons, bulles rouges et vertes
					retours[nbFautes] = contenuRetour;
					retoursSol[nbFautes] = contenuRetourSol;
					nbFautes++;
					
					_level0.retour = "Il y a des erreurs";
					_level0.rep_juste=false;
				}
		}
		if (nbFautes == 0 && fondMc.verifier_btn._visible == false) {
			_level0.rep_juste = true;
			_level0.retour = "Bravo tout est juste."
		}
		if (nbFautes == 0) {
			_level0.retour = "Bravo! Passe à l'exercice suivant.";
			_level0.rep_juste = true;
			_level0.retour = "Bravo tout est juste."
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

				if(sacObjet[i][0]==false)
				{
					var contenuRetour:Array = new Array();
					var contenuRetourSol:Array = new Array();
//					contenuRetour[0] = "Cette phrase ne doit pas aller dans le sac:\n" + sacObjet[i][1];
					contenuRetour[0] = "L'unité: "+ sacObjet[i][3]+" "+sacObjet[i][4]+"\nne doit pas aller dans le sac:\n\n\" " + nomSacSsEspInsec[i]+" \"";
					contenuRetour[1] = sacObjet[i][2];//On y met sa catégorie
					contenuRetour[2] = sacObjet[i][5];//On y met son numero
					contenuRetour[3] = sacObjet[i][6];//On y met sa position x dans le sac
					contenuRetour[4] = sacObjet[i][7];//On y met sa position y dans le sac
					
					contenuRetourSol[0] = "L'unité: "+ sacObjet[i][3]+" "+sacObjet[i][4]+"\ndoit aller dans le sac:\n\n\" " + sacObjet[i][2]+" \"";
					contenuRetourSol[1] = sacObjet[i][2];//On y met sa catégorie
					contenuRetourSol[2] = sacObjet[i][5];//On y met son numero
					contenuRetourSol[3] = sacObjet[i][6];//On y met sa position x dans le sac
					contenuRetourSol[4] = sacObjet[i][7];//On y met sa position y dans le sac
					//On remplit les repturs utilisée sans les vérification et les boutons, bulles rouges et vertes
					retours[nbFautes] = contenuRetour;
					retoursSol[nbFautes] = contenuRetourSol;
					nbFautes++;
					_level0.retour = "Il y avait des erreurs et tu n'as pas tout fait.";
					_level0.rep_juste = false;
				}
		}
	}
}

function verifierCorrection()
{
	//On va tester si il y a un clip qui est corrige, à ce moment il ne faut pas mettre le bouton vérifier mais la suite des bulles rouges
	if (posNumero>=elementsTires.length)
	{
		trace("dans verifierCorrection")
		nbFautes = 0;
		for(i=0;i<monArray.length;i++){
		//trace(i)
		if(monArray[i][0]==false)
		{
			//fondRS._visible = true;
			
			_level0.rep_juste=false;
		}
	}

		for(i=0;i<sacObjet.length;i++){
				//trace(i)
				if(sacObjet[i][0]==false)
				{
					var contenuRetour:Array = new Array();
					//contenuRetour[0] = "Cette phrase ne doit pas aller dans le sac:\n" + sacObjet[i][1];
					contenuRetour[0] = "L'unité: "+ sacObjet[i][3]+" "+sacObjet[i][4]+"\nne doit pas aller dans le sac:\n\n\" " + nomSacSsEspInsec[i]+" \"";
					contenuRetour[1] = sacObjet[i][2];//On y met sa catégorie
					contenuRetour[2] = sacObjet[i][5];//On y met son numero
					contenuRetour[3] = sacObjet[i][6];//On y met sa position x dans le sac
					contenuRetour[4] = sacObjet[i][7];//On y met sa position y dans le sac
					//On remplit les repturs utilisée sans les vérification et les boutons, bulles rouges et vertes
					retours[nbFautes] = contenuRetour;
					nbFautes++;
					_level0.retour = "Il y a des erreurs";
					_level0.rep_juste=false;
				}
		}
		trace(nbFautes);
		if (nbFautes == 0 && fondMc.verifier_btn._visible == false) {
			_level0.rep_juste = true;
		}
		if (nbFautes == 0) {
			_level0.retour = "Bravo! Passe à l'exercice suivant.";
			_level0.rep_juste = true;
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

				if(sacObjet[i][0]==false)
				{
					var contenuRetour:Array = new Array();
					contenuRetour[0] = "L'unité: "+ sacObjet[i][3]+" "+sacObjet[i][4]+"\ndoit aller dans le sac\n\"" + monArray[i][2]+"\"";
					contenuRetour[1] = sacObjet[i][2];//On y met sa catégorie
					contenuRetour[2] = sacObjet[i][5];//On y met son numero
					contenuRetour[3] = sacObjet[i][6];//On y met sa position x dans le sac
					contenuRetour[4] = sacObjet[i][7];//On y met sa position y dans le sac
					//On remplit les repturs utilisée sans les vérification et les boutons, bulles rouges et vertes
					retours[nbFautes] = contenuRetour;
					nbFautes++;
					_level0.retour = "Il y avait des erreurs et tu n'as pas tout fait.";
					_level0.rep_juste = false;
				}
		}
	}
}


function verifierBouton(monArray)
{
	for(i=0;i<monArray.length;i++){
		//trace(i)
		if(monArray[i][0]==false)
		{
			fondRON._visible=true;
			rougeOuiNon._visible=true;
			oui._visible=true;
			non._visible=true;
			rougeOuiNonTxt.text = "Veux-tu voir et corriger tes fautes?";
			_level0.rep_juste=false;
		}
	}
	if (nbFautes == 0 && fondMc.verifier_btn._visible == false) {
		fondV._visible=true;
		vertTxt.text="Bravo tout est juste.\nTu peux valider.";
		vert._visible=true;
		finVert._visible = true;
		_level0.rep_juste = true;
	}
	if (nbFautes == 0) {
		fondV._visible = true;
		_level0.rep_juste = true;


	}
}
