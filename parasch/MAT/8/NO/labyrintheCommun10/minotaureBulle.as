/**
 * ...
 * @author J-M Luthi
 */
//Cette fonction crée les bulles dans un clip etretourne leur nom
function creationBulle (clip,type,nomBulle,bouton, formatTexte)
{
	clip.attachMovie(type,nomBulle,clip.getNextHighestDepth());
	clip[nomBulle]._alpha=95;
	clip[nomBulle]._visible=false;
	//On peut déplacer la bulle
	clip[nomBulle].onPress=function(){
		startDrag(clip,false,0,0,480,300);
	}
	clip[nomBulle].onRelease=function(){
		stopDrag();
	}
	//On lui adjoint un champ texte
	clip[nomBulle].createTextField("repMcTxt",1,5,15,300,20);
	clip[nomBulle].repMcTxt.multiline=true;
	clip[nomBulle].repMcTxt.wordWrap=true;
	clip[nomBulle].repMcTxt.autoSize=true;
	clip[nomBulle].repMcTxt.selectable=false;
	clip[nomBulle].repMcTxt.setNewTextFormat(formatTexte);
	clip[nomBulle].repMcTxt.text="test bulle";
	
	//on lui adjoint un bouton
	switch (bouton)
	{
		case "oui/non":
		clip.attachMovie("oui_btn","ouiBtn",clip.getNextHighestDepth());
		clip.ouiBtn._x=70;
		clip.ouiBtn._y=170;
		clip.ouiBtn._visible=false;
		clip.attachMovie("non_btn","nonBtn",clip.getNextHighestDepth()+1);
		clip.nonBtn._x=230;
		clip.nonBtn._y=170;
		clip.nonBtn._visible=false;
		break;
		case "suite":
		clip.attachMovie("suite_btn","suiteBtn",clip.getNextHighestDepth());
		clip.suiteBtn._x=150;
		clip.suiteBtn._y=170;
		clip.suiteBtn._visible=false;
		break;
		case "ok":
		clip.attachMovie("ok_btn","okBtn",clip.getNextHighestDepth());
		clip.okBtn._x=150;
		clip.okBtn._y=170;
		clip.okBtn._visible=false;
		break;
		case "fin":
		clip.attachMovie("fin_btn","finBtn",clip.getNextHighestDepth());
		clip.finBtn._x=150;
		clip.finBtn._y=170;
		clip.finBtn._visible=false;
		break;
	}
	return clip[nomBulle]
}
//On fait une fonction avec toute la construction pour qu'on puisse lancer l'exécution à la fin et que les bulles soient par dessus le reste (les flèches et le mur)
function creationBulles()
{
	//Nombre de bulles de rèponse créées
	nbBulles=8;
	
	//On décide si on affiche la solution
	afficherSolution=true;
	
	//On crée les clips conteneur
	for (i=0; i<nbBulles;i++)
		 {
			 this.createEmptyMovieClip("fondRepMc"+i,995+i);
			 this["fondRepMc"+i]._x=150;
			 this["fondRepMc"+i]._y=80;
		 }
	
	//On crée les bulles et on met leur nom dans une variable.
	finVert=creationBulle(fondRepMc0, "bulleVerte","finVerteBulle","fin", justeBulle_fmt);
	suiteVert=creationBulle(fondRepMc1, "bulleVerteErreur","suiteVerteBulle","suite", justeBulle_fmt);
	suiteRouge=creationBulle(fondRepMc2, "bulleRougeErreur","suiteRougeBulle","suite", justeBulle_fmt);
	ouinonVert=creationBulle(fondRepMc3, "bulleVerteErreur","ouinonVerteBulle","oui/non", justeBulle_fmt);
	ouinonRouge=creationBulle(fondRepMc4, "bulleRougeErreur","ouinonRougeBulle","oui/non", justeBulle_fmt);
	finRouge=creationBulle(fondRepMc5, "bulleRouge","finRougeBulle","fin", justeBulle_fmt);
	finRougeErreur=creationBulle(fondRepMc6, "bulleRougeErreur","finRougeErreurBulle","fin", justeBulle_fmt);
	finVertErreur=creationBulle(fondRepMc7, "bulleVerteErreur","finVertErreurBulle","fin", justeBulle_fmt);
	//ouinonRougeSol=creationBulle(fondRepMc8, "bulleRougeErreur","ouinonRougeBulleSol","oui/non", justeBulle_fmt);
	
	finVert._visible=false;
	suiteVert._visible=false;
	suiteRouge._visible=false;
	ouinonVert._visible=false;
	ouinonRouge._visible=false;
	finRouge._visible=false;
	finRougeErreur._visible=false;
	finVertErreur._visible=false;
	//ouinonRougeSol._visible=false;
	
	//On associe le clip du bouton à une variable
	finVertBtn=fondRepMc0.finBtn;
	suiteVertBtn=fondRepMc1.suiteBtn;
	suiteRougeBtn=fondRepMc2.suiteBtn;
	ouiVertBtn=fondRepMc3.ouiBtn;
	nonVertBtn=fondRepMc3.nonBtn;
	ouiRougeBtn=fondRepMc4.ouiBtn;
	nonRougeBtn=fondRepMc4.nonBtn;
	finRougeBtn=fondRepMc5.finBtn;
	finRougeErreurBtn=fondRepMc6.finBtn;
	finVertErreurBtn=fondRepMc7.finBtn;
	
	
	finVertBtn._visible=false;
	suiteVertBtn._visible=false;
	suiteRougeBtn._visible=false;
	ouiVertBtn._visible=false;
	nonVertBtn._visible=false;
	ouiRougeBtn._visible=false;
	nonRougeBtn._visible=false;
	finRougeBtn._visible=false;
	finRougeErreurBtn._visible=false;
	finVertErreurBtn._visible=false;
	ouiRougeSolBtn._visible=false;
	nonRougeSolBtn._visible=false;
	
	//On définit le comportement des boutons:
	//Fonction bouton finVertBtn
	finVertBtn.onRelease=function(){
			fondRepMc0._visible=false;
	}
	
	//Fonction bouton suiteVertBtn
	var suiteEtat = false;
	_global.monCompteur = 1;
	suiteVertBtn.onRelease = function() {
		fondRepMc1._x=fondRepMc3._x;
		fondRepMc1._y=fondRepMc3._y;
		if (_global.monCompteur < positionFaux.length-1)
		{
			suiteVert.repMcTxt.text = "...et une erreur à la case: ("+reponseGlobal[(_global.monCompteur-1)*5] +";"+ reponseGlobal[(_global.monCompteur-1)*5 + 1]+")\n" + reponseGlobal[(_global.monCompteur-1)*5 + 4];
		
		}else if (_global.monCompteur >= positionFaux.length-1)
		{
			fondRepMc1._visible=false;
			fondRepMc7._x=fondRepMc1._x;
			fondRepMc7._y=fondRepMc1._y;
			finVertErreur.repMcTxt.text = "La dernière erreur était à la case: ("+reponseGlobal[_global.monCompteur*5] +";"+ reponseGlobal[_global.monCompteur*5 + 1]+")\n" + reponseGlobal[_global.monCompteur*5 + 4];
			finVertErreur._visible=true;
			finVertErreurBtn._visible=true;
		}else{
			fondRepMc7._visible = false;
		}
		_global.monCompteur++;
	}
	//on met fin ou veux-tu voir la solution suivant le choix de afficherSolution
	
	switch(afficherSolution)
	{
		case false:
			//Fonction bouton suiteRougeBtn
			var suiteEtat = false;
			//Fonction bouton ouiRougeBtn
			ouiRougeBtn.onRelease = function() {
				fondRepMc4._visible=false;
				fondRepMc2._x=fondRepMc4._x;
				fondRepMc2._y=fondRepMc4._y;
				verifier_btn._visible=false;
				if (positionFaux.length-1>0)
				{
					suiteRouge._visible=true;
					suiteRougeBtn._visible=true;
					suiteRouge.repMcTxt.text = "Tu as laissé une erreur à la case: ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4]+" ...";
				
				}else if (positionFaux.length-1<=0)
				{
					fondRepMc6._x=fondRepMc2._x;
					fondRepMc6._y=fondRepMc2._y;
					finRougeErreur.repMcTxt.text = "Tu as laissé une erreur à la case: ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4];
					finRougeErreur._visible=true;
					finRougeErreurBtn._visible=true;
				}else{
					fondRepMc6._visible = false;
				}
			}
			suiteRougeBtn.onRelease = function() {
				if (_global.monCompteur < positionFaux.length-1)
				{
					fondRepMc2._x=fondRepMc4._x;
					fondRepMc2._y=fondRepMc4._y;
					suiteRouge.repMcTxt.text = "...et une erreur à la case: ("+reponse[_global.monCompteur*5] +";"+ reponse[_global.monCompteur*5 + 1]+")\n" + reponse[_global.monCompteur*5 + 4];
				
				}else if (_global.monCompteur >= positionFaux.length-1)
				{
					fondRepMc2._visible=false;
					fondRepMc6._x=fondRepMc2._x;
					fondRepMc6._y=fondRepMc2._y;
					finRougeErreur.repMcTxt.text = "La dernière erreur est à la case: ("+reponse[_global.monCompteur*5] +";"+ reponse[_global.monCompteur*5 + 1]+")\n" + reponse[_global.monCompteur*5 + 4];
					finRougeErreur._visible=true;
					finRougeErreurBtn._visible=true;
				}else{
					fondRepMc6._visible = false;
				}
				_global.monCompteur++;
			}
		break;
		case true:
			//On crée la bulle
			trace("case true");
			clipSolution=this.createEmptyMovieClip("fondRepMc"+nbBulles,1000+nbBulles);
			clipSolution._x=150;
			clipSolution._y=80;
			ouinonRougeSol=creationBulle(clipSolution, "bulleRougeErreur","ouinonRougeBulleSol","oui/non", justeBulle_fmt);
			ouiRougeSolBtn=this["fondRepMc"+nbBulles].ouiBtn;
			nonRougeSolBtn=this["fondRepMc"+nbBulles].nonBtn;
			//Fonction bouton ouiRougeBtn
			ouiRougeBtn.onRelease = function() {
				fondRepMc4._visible=false;
				fondRepMc2._x=fondRepMc4._x;
				fondRepMc2._y=fondRepMc4._y;
				verifier_btn._visible=false;
				if (positionFaux.length-1>0)
				{
					suiteRouge._visible=true;
					suiteRougeBtn._visible=true;
					suiteRouge.repMcTxt.text = "Tu as laissé une erreur à la case: ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4]+" ...";
				trace ("reponse"+reponse);
				trace ("positionFaux[0]"+positionFaux[0]);
				trace("reponse[(positionFaux[0]-1)*5"+reponse[(positionFaux[0]-1)*5]);
				}else if (positionFaux.length-1<=0)
				{
					fondRepMc8._x=fondRepMc2._x;
					fondRepMc8._y=fondRepMc2._y;
					//ouinonRougeSol.repMcTxt.text = "La dernière erreur laissée est à la case: ("+reponse[_global.monCompteur*5] +";"+ reponse[_global.monCompteur*5 + 1]+")\n" + reponse[_global.monCompteur*5 + 4]+"\nVeux-tu voir une solution?";
					ouinonRougeSol.repMcTxt.text = "La dernière erreur laissée est à la case: ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4]+"\nVeux-tu voir une solution?";
					ouinonRougeSol._visible=true;
					ouiRougeSolBtn._visible=true;
					nonRougeSolBtn._visible=true;
					trace ("reponse"+reponse);
					trace ("positionFaux[0]"+positionFaux[0]);
					maPosition=(positionFaux[0]-1)*5;
					for (i=0;i<reponse.length;i++)
					{
				trace("reponse[(positionFaux[0]-1)*5 "+i +" "+reponse[i]);
					}
				}else{
					fondRepMc8._visible = false;
				}
			}
			//Fonction bouton suiteRougeBtn
			var suiteEtat = false;
			suiteRougeBtn.onRelease = function() {
	
				if (_global.monCompteur < positionFaux.length-1)
				{
					suiteRouge.repMcTxt.text = "...et une erreur à la case: ("+reponse[_global.monCompteur*5] +";"+ reponse[_global.monCompteur*5 + 1]+")\n" + reponse[_global.monCompteur*5 + 4];
				
				}else if (_global.monCompteur >= positionFaux.length-1)
				{
					fondRepMc2._visible=false;
					fondRepMc8._x=fondRepMc2._x;
					fondRepMc8._y=fondRepMc2._y;
					ouinonRougeSol.repMcTxt.text = "La dernière erreur laissée est à la case: ("+reponse[_global.monCompteur*5] +";"+ reponse[_global.monCompteur*5 + 1]+")\n" + reponse[_global.monCompteur*5 + 4]+"\nVeux-tu voir une solution?";
					ouinonRougeSol._visible=true;
					ouiRougeSolBtn._visible=true;
					nonRougeSolBtn._visible=true;
				}else{
					clipSolution._visible = false;
				}
				_global.monCompteur++;
			}
		break;
	}
	
	//Fonction bouton ouiVertBtn
	ouiVertBtn.onRelease = function() {
		fondRepMc3._visible=false;
		verifier_btn._visible=false;

		if (positionFaux.length-1>0)
		{
			fondRepMc1._x=fondRepMc3._x;
			fondRepMc1._y=fondRepMc3._y;
			fondRepMc1._visible=true;
			suiteVert._visible=true;
			suiteVertBtn._visible=true;
			suiteVert.repMcTxt.text = "Il y avait une erreur à la case: ("+reponseGlobal[0] +";"+ reponseGlobal[1]+")\n" + reponseGlobal[4]+" ...";
			var suiteBulle:String ="ok";
		
		}else if (positionFaux.length-1<=0)
		{
			if(suiteBulle=="ok"){
				fondRepMc7._x=fondRepMc1._x;
				fondRepMc7._y=fondRepMc1._y;
			}else
			{
				fondRepMc7._x=fondRepMc3._x;
				fondRepMc7._y=fondRepMc3._y;
			}
			fondRepMc1._visible=false;
			finVertErreur.repMcTxt.text = "Il y avait une erreur à la case: ("+reponseGlobal[0] +";"+ reponseGlobal[1]+")\n" + reponseGlobal[4];
			fondRepMc7._visible=true;
			finVertErreur._visible=true;
			finVertErreurBtn._visible=true;
		}else{
			fondRepMc7._visible = false;
		}
	}
	
	//Fonction bouton nonVertBtn
	nonVertBtn.onRelease=function(){
		fondRepMc3._visible=false;
		verifier_btn._visible=false;
	}
	
	
	
	//Fonction bouton nonRougeBtn
	nonRougeBtn.onRelease=function(){
		fondRepMc4._visible=false;
		verifier_btn._visible=false;
	}
	
	//Fonction bouton finRougeBtn
	finRougeBtn.onRelease=function(){
		finRougeBtn._visible=false;
		verifier_btn._visible=false;
	}
	
	//Fonction bouton finRougeErreurBtn
	finRougeErreurBtn.onRelease=function(){
		fondRepMc6._visible = false;
		verifier_btn._visible=false;
	}
	
	//Fonction bouton finVertEreurBtn
	finVertErreurBtn.onRelease=function(){
		fondRepMc7._visible=false;
		verifier_btn._visible=false;
	}
	
	
	//Fonction bouton finVertEreurBtn
	ouiRougeSolBtn.onRelease=function(){
		actionSolution ();
		clipSolution._visible=false;
		verifier_btn._visible=false;
	}
	//Fonction bouton finVertEreurBtn
	nonRougeSolBtn.onRelease=function(){
		clipSolution._visible=false;
		verifier_btn._visible=false;
	}
}	
	
