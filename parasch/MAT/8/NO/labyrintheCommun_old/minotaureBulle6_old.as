﻿/**
 * ...

 * @author J-M Luthi
 */
//Cette fonction crée les bulles dans un clip etretourne leur nom

//import creationBulle;
compteurBulle=0;
function creationBulle (clip,type,nomBulle,bouton, formatTexte)
{
	compteurBulle++
	//trace("dans creationBule");
	clip.attachMovie(type,nomBulle,compteurBulle);
	clip[nomBulle]._alpha=95;
	clip[nomBulle]._visible=false;
	//On peut déplacer la bulle
	clip[nomBulle].onPress=function(){
		startDrag(clip,false,0,0,400,300);
	}
	clip[nomBulle].onRelease=function(){
		stopDrag();
	}
	//On lui adjoint un champ texte
	clip[nomBulle].createTextField("repMcTxt",1,5,15,300,20);
	clip[nomBulle].repMcTxt.multiline=true;
	clip[nomBulle].repMcTxt.wordWrap=true;
	//clip[nomBulle].repMcTxt.embedFonts=true;
	clip[nomBulle].repMcTxt.autoSize=true;
	clip[nomBulle].repMcTxt.selectable=false;
	clip[nomBulle].repMcTxt.setNewTextFormat(formatTexte);
	clip[nomBulle].repMcTxt.text="test bulle";
	//trace("clip[nomBulle]"+clip[nomBulle]);
	
	//on lui adjoint un bouton
	switch (bouton)
	{
		case "oui/non":
		clip.attachMovie("oui_btn","ouiBtn",compteurBulle+1);
		clip.ouiBtn._x=70;
		clip.ouiBtn._y=170;
		//trace("clip.ouiBtn._x"+clip.ouiBtn._x);
		clip.ouiBtn._visible=false;
		clip.attachMovie("non_btn","nonBtn",compteurBulle+2);
		clip.nonBtn._x=230;
		clip.nonBtn._y=170;
		clip.nonBtn._visible=false;
		break;
		case "suite":
		clip.attachMovie("suite_btn","suiteBtn",compteurBulle+3);
		clip.suiteBtn._x=150;
		clip.suiteBtn._y=170;
		clip.suiteBtn._visible=false;
		break;
		case "ok":
		clip.attachMovie("ok_btn","okBtn",compteurBulle+4);
		clip.okBtn._x=150;
		clip.okBtn._y=170;
		clip.okBtn._visible=false;
		break;
		case "fin":
		clip.attachMovie("fin_btn","finBtn",compteurBulle+5);
		clip.finBtn._x=150;
		clip.finBtn._y=170;
		clip.finBtn._visible=false;
		break;
	}
	//return clip[nomBulle]

}
function affichageTourCase()
{
	for(i=0;i<=nbCasesX*nbCasesY; i++)
	{
		fondMc["conteneurCarre" +i ].tourCaseFaux._visible=false;
		fondMc["conteneurCarre" +i ].tourCaseJuste._visible=false;
	}
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
			 this.createEmptyMovieClip("fondRepMc"+i,10000+i);
			 this["fondRepMc"+i]._x=150;
			 this["fondRepMc"+i]._y=80;
		 }
	/*
	//On crée les bulles et on met leur nom dans une variable.
	finVert=new creationBulle(fondRepMc0, "bulleVerte","finVerteBulle","fin", justeBulle_fmt);
	suiteVert=new creationBulle(fondRepMc1, "bulleVerteErreur","suiteVerteBulle","suite", justeBulle_fmt);
	suiteRouge=new creationBulle(fondRepMc2, "bulleRougeErreur","suiteRougeBulle","suite", justeBulle_fmt);
	ouinonVert=new creationBulle(fondRepMc3, "bulleVerteErreur","ouinonVerteBulle","oui/non", justeBulle_fmt);
	ouinonRouge=new creationBulle(fondRepMc4, "bulleRougeErreur","ouinonRougeBulle","oui/non", justeBulle_fmt);
	finRouge=new creationBulle(fondRepMc5, "bulleRouge","finRougeBulle","fin", justeBulle_fmt);
	finRougeErreur=new creationBulle(fondRepMc6, "bulleRougeErreur","finRougeErreurBulle","fin", justeBulle_fmt);
	finVertErreur=new creationBulle(fondRepMc7, "bulleVerteErreur","finVertErreurBulle","fin", justeBulle_fmt);
	//ouinonRougeSol=creationBulle(fondRepMc8, "bulleRougeErreur","ouinonRougeBulleSol","oui/non", justeBulle_fmt);
	*/
		//On crée les bulles et on met leur nom dans une variable.
	creationBulle(fondRepMc0, "bulleVerte","finVertBulle","fin", justeBulle_fmt);
	creationBulle(fondRepMc1, "bulleVerteErreur","suiteVerteBulle","suite", justeBulle_fmt);
	creationBulle(fondRepMc2, "bulleRougeErreur","suiteRougeBulle","suite", justeBulle_fmt);
	creationBulle(fondRepMc3, "bulleVerteErreur","ouinonVerteBulle","oui/non", justeBulle_fmt);
	creationBulle(fondRepMc4, "bulleRougeErreur","ouinonRougeBulle","oui/non", justeBulle_fmt);
	creationBulle(fondRepMc5, "bulleRouge","finRougeBulle","fin", justeBulle_fmt);
	creationBulle(fondRepMc6, "bulleRougeErreur","finRougeErreurBulle","fin", justeBulle_fmt);
	creationBulle(fondRepMc7, "bulleVerteErreur","finVertErreurBulle","fin", justeBulle_fmt);
	//Pour faire vite!!!
	this.createEmptyMovieClip("fondRepMc9",10100);
	this.fondRepMc9._x=150;
	this.fondRepMc9._y=80;
	creationBulle(fondRepMc9, "bulleRougeErreur","okRougeBulle","ok", justeBulle_fmt);
	
	finVertBulle._visible=false;
	suiteVertBulle._visible=false;
	suiteRougeBulle._visible=false;
	ouinonVertBulle._visible=false;
	ouinonRougeBulle._visible=false;
	finRougeBulle._visible=false;
	finRougeErreurBulle._visible=false;
	finVertErreurBulle._visible=false;
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
	okRougeGuideBtn=fondRepMc9.okBtn;
	
	
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
		trace("finVert")
			fondRepMc0._visible=false;
	}
	
	//Fonction bouton suiteVertBtn
	var suiteEtat = false;
	_level0.monCompteur = 1;
	suiteVertBtn.onRelease = function() {
		affichageTourCase();
		trace("suiteVert")
		fondRepMc1._x=fondRepMc3._x;
		fondRepMc1._y=fondRepMc3._y;
		if (_level0.monCompteur < positionFaux.length-1)
		{
			fondRepMc1.suiteVerteBulle.repMcTxt.text = "...et une erreur entre \nles cases: ("+reponseGlobal[(_level0.monCompteur)*5+2] +";"+reponseGlobal[(_level0.monCompteur)*5 + 3]+") et ("+reponseGlobal[(_level0.monCompteur)*5] +";"+reponseGlobal[(_level0.monCompteur)*5 + 1]+")\n" + reponseGlobal[_level0.monCompteur*5 + 4];
//			fondRepMc1.suiteVerteBulle.repMcTxt.text = "...et une erreur à la case: ("+reponseGlobal[_level0.monCompteur*5] +";"+ reponseGlobal[_level0.monCompteur*5 + 1]+")\n" + reponseGlobal[_level0.monCompteur*5 + 4];
			//fondMc["conteneurCarre" + nbTot].tourCaseFaux._visible=false;
			fondMc["conteneurCarre" + noCase(reponseGlobal[(_level0.monCompteur)*5+2],reponseGlobal[(_level0.monCompteur)*5 + 3])].tourCaseJuste._visible=true;			
			fondMc["conteneurCarre" + noCase(reponseGlobal[_level0.monCompteur*5],reponseGlobal[_level0.monCompteur*5 + 1])].tourCaseJuste._visible=true;
		}else if (_level0.monCompteur >= positionFaux.length-1)
		{
			test=positionFaux.length-1;
			fondRepMc1._visible=false;
			fondRepMc7._x=fondRepMc1._x;
			fondRepMc7._y=fondRepMc1._y;
			fondRepMc7.finVertErreurBulle.repMcTxt.text = "La dernière erreur était entre \nles cases: ("+reponseGlobal[_level0.monCompteur*5+2] +";"+ reponseGlobal[_level0.monCompteur*5 + 3]+") et ("+reponseGlobal[_level0.monCompteur*5] +";"+ reponseGlobal[_level0.monCompteur*5 + 1]+")\n" + reponseGlobal[_level0.monCompteur*5 + 4];
			
//			fondRepMc7.finVertErreurBulle.repMcTxt.text ="La dernière erreur était à la case: ("+reponseGlobal[_level0.monCompteur*5] +";"+ reponseGlobal[_level0.monCompteur*5 + 1]+")\n" + reponseGlobal[_level0.monCompteur*5 + 4];
			fondRepMc7.finVertErreurBulle._visible=true;
			finVertErreurBtn._visible=true;
			trace("SUITE VERT noCase(reponseGlobal[_level0.monCompteur*5],reponse[_level0.monCompteur*5 + 1])"+noCase(reponseGlobal[_level0.monCompteur*5+1],reponse[_level0.monCompteur*5]));
			fondMc["conteneurCarre" + noCase(reponseGlobal[_level0.monCompteur*5+2],reponseGlobal[_level0.monCompteur*5 + 3]) ].tourCaseJuste._visible=true;
			fondMc["conteneurCarre" + noCase(reponseGlobal[_level0.monCompteur*5],reponseGlobal[_level0.monCompteur*5 + 1]) ].tourCaseJuste._visible=true;
			
		}else{
			fondRepMc7._visible = false;
		}
		_level0.monCompteur++;
	}
	//on met fin ou veux-tu voir la solution suivant le choix de afficherSolution
	
	switch(afficherSolution)
	{
		case false:
			//Fonction bouton suiteRougeBtn
			var suiteEtat = false;
			//Fonction bouton ouiRougeBtn
			ouiRougeBtn.onRelease = function() {
				affichageTourCase();
				trace("ouiRouge  false")
				fondRepMc4._visible=false;
				fondRepMc2._x=fondRepMc4._x;
				fondRepMc2._y=fondRepMc4._y;
//				verifier_btn._visible=false;
				if (positionFaux.length-1>0)
				{
					fondRepMc2.suiteRougeBulle._visible=true;
					suiteRougeBtn._visible=true;
//					fondRepMc2.suiteRougeBulle.repMcTxt.text = "Tu as laissé une erreur à la case: ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4]+" ...";
					fondRepMc2.suiteRougeBulle.repMcTxt.text = "Tu as laissé une erreur entre \nles cases: ("+reponse[2] +";"+ reponse[3]+") et ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4]+" ...";
					fondMc["conteneurCarre" + noCase(reponse[2],reponse[3]) ].tourCaseFaux._visible=true;

					fondMc["conteneurCarre" + noCase(reponse[0],reponse[1]) ].tourCaseFaux._visible=true;
				}else if (positionFaux.length-1<=0)
				{
					fondRepMc6._x=fondRepMc2._x;
					fondRepMc6._y=fondRepMc2._y;
					fondRepMc6.finRougeErreurBulle.repMcTxt.text = "Tu as laissé une erreur entre \nles cases: ("+reponse[2] +";"+ reponse[3]+") et ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4];
//					fondRepMc6.finRougeErreurBulle.repMcTxt.text = "Tu as laissé une erreur à la case: ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4];
					fondRepMc6.finRougeErreurBulle._visible=true;
					finRougeErreurBtn._visible=true;
					fondMc["conteneurCarre" + noCase(reponse[2],reponse[3]) ].tourCaseFaux._visible=true;
					fondMc["conteneurCarre" + noCase(reponse[0],reponse[1]) ].tourCaseFaux._visible=true;
				}else{
					fondRepMc6._visible = false;
				}
			}
			suiteRougeBtn.onRelease = function() {
				affichageTourCase();
				trace("suiteRouge false")
				if (_level0.monCompteur < positionFaux.length-1)
				{
					
					fondRepMc2._x=fondRepMc4._x;
					fondRepMc2._y=fondRepMc4._y;
//					fondRepMc2.suiteRougeBulle.repMcTxt.text ="...et une erreur à la case: ("+reponse[_level0.monCompteur*5] +";"+ reponse[_level0.monCompteur*5 + 1]+")\n" + reponse[_level0.monCompteur*5 + 4];
					fondRepMc2.suiteRougeBulle.repMcTxt.text = "...et une erreur entre \nles cases: ("+reponse[_level0.monCompteur*5+2] +";"+ reponse[_level0.monCompteur*5 + 3]+") et ("+reponse[_level0.monCompteur*5] +";"+ reponse[_level0.monCompteur*5 + 1]+")\n" + reponse[_level0.monCompteur*5 + 4];					
					trace("noCase(reponseGlobal[_level0.monCompteur1*5],reponse[_level0.monCompteur*5 + 1])"+noCase(reponse[_level0.monCompteur1*5],reponse[_level0.monCompteur*5 + 1]));
					fondMc["conteneurCarre" + noCase(reponse[_level0.monCompteur*5+2],reponse[_level0.monCompteur*5+3]) ].tourCaseFaux._visible=true;
					fondMc["conteneurCarre" + noCase(reponse[_level0.monCompteur*5],reponse[_level0.monCompteur*5+1]) ].tourCaseFaux._visible=true;
				}else if (_level0.monCompteur >= positionFaux.length-1)
				{
					fondRepMc2._visible=false;
					fondRepMc6._x=fondRepMc2._x;
					fondRepMc6._y=fondRepMc2._y;
//					fondRepMc6.finRougeErreurBulle.repMcTxt.text = "\nLa dernière erreur est à la case: ("+reponse[_level0.monCompteur*5] +";"+ reponse[_level0.monCompteur*5 + 1]+")\n" + reponse[_level0.monCompteur*5 + 4];
					fondRepMc6.finRougeErreurBulle.repMcTxt.text = "La dernière erreur est entre \nles cases:("+reponse[_level0.monCompteur*5+2] +";"+ reponse[_level0.monCompteur*5 + 3]+") et ("+reponse[_level0.monCompteur*5] +";"+ reponse[_level0.monCompteur*5 + 1]+")\n" + reponse[_level0.monCompteur*5 + 4];
					
					fondRepMc6.finRougeErreurBulle._visible=true;
					finRougeErreurBtn._visible=true;
					trace("SUITE ROUGE 2 noCase(reponseGlobal[_level0.monCompteur1*5],reponse[_level0.monCompteur*5 + 1])"+noCase(reponseGlobal[_level0.monCompteur1*5+2],reponse[_level0.monCompteur*5 + 1]));
					fondMc["conteneurCarre" + noCase(reponse[_level0.monCompteur*5+2],reponse[_level0.monCompteur*5+3]) ].tourCaseFaux._visible=true;
					fondMc["conteneurCarre" + noCase(reponse[_level0.monCompteur*5],reponse[_level0.monCompteur*5+1]) ].tourCaseFaux._visible=true;
				}else{
					fondRepMc6._visible = false;
				}
				_level0.monCompteur++;
			}
		break;
		case true:
			//On crée la bulle
			//trace("case true");
			this.createEmptyMovieClip("fondRepMc"+nbBulles,10000+nbBulles);
			this["fondRepMc"+nbBulles]._x=150;
			this["fondRepMc"+nbBulles]._y=80;
			creationBulle(this["fondRepMc"+nbBulles], "bulleRougeErreur","ouinonRougeBulleSol","oui/non", justeBulle_fmt);
			ouiRougeSolBtn=this["fondRepMc"+nbBulles].ouiBtn;
			nonRougeSolBtn=this["fondRepMc"+nbBulles].nonBtn;
			//Fonction bouton ouiRougeBtn
			ouiRougeBtn.onRelease = function() {
				affichageTourCase();
				trace("ouiRouge true")
				fondRepMc4._visible=false;
				fondRepMc2._x=fondRepMc4._x;
				fondRepMc2._y=fondRepMc4._y;
				verifier_btn._visible=false;
				if (positionFaux.length-1>0)
				{
					fondRepMc2.suiteRougeBulle._visible=true;
					suiteRougeBtn._visible=true;
//					fondRepMc2.suiteRougeBulle.repMcTxt.text = "Tu as laissé une erreur à la case: ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4]+" ...";
					fondRepMc2.suiteRougeBulle.repMcTxt.text = "Tu as laissé une erreur entre \nles cases:("+reponse[2] +";"+ reponse[3]+") et ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4]+" ...";
					fondMc["conteneurCarre" + noCase(reponse[2],reponse[3]) ].tourCaseFaux._visible=true;
					fondMc["conteneurCarre" + noCase(reponse[0],reponse[1]) ].tourCaseFaux._visible=true;
				//trace ("reponse"+reponse);
//				trace ("positionFaux[0]"+positionFaux[0]);
//				trace("reponse[(positionFaux[0]-1)*5"+reponse[(positionFaux[0]-1)*5]);
				}else if (positionFaux.length-1<=0)
				{
					test=positionFaux.length-1;
					fondRepMc8._x=fondRepMc2._x;
					fondRepMc8._y=fondRepMc2._y;
					fondRepMc8._visible = true;
					//ouinonRougeSol.repMcTxt.text = "La dernière erreur laissée est à la case: ("+reponse[_level0.monCompteur*5] +";"+ reponse[_level0.monCompteur*5 + 1]+")\n" + reponse[_level0.monCompteur*5 + 4]+"\nVeux-tu voir une solution?";
//					fondRepMc8.ouinonRougeBulleSol.repMcTxt.text = "La dernière erreur laissée est à la case: ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4]+"\nVeux-tu voir une solution?";
					fondRepMc8.ouinonRougeBulleSol.repMcTxt.text = "La dernière erreur laissée est\nentre les cases:("+reponse[2] +";"+ reponse[3]+") et ("+reponse[0] +";"+ reponse[1]+")\n" + reponse[4]+"\nVeux-tu voir une solution?";					
					fondRepMc8.ouinonRougeBulleSol._visible=true;
					maVar=this["fondRepMc"+nbBulles].ouinonRougeBulleSol;
					trace("OUI ROUGEnoCase(reponseGlobal[_level0.monCompteur1*5],reponse[_level0.monCompteur*5 + 1])"+noCase(reponseGlobal[_level0.monCompteur1*5],reponse[_level0.monCompteur*5 + 1]));
					fondMc["conteneurCarre" + noCase(reponse[2],reponse[3]) ].tourCaseFaux._visible=true;
					fondMc["conteneurCarre" + noCase(reponse[0],reponse[1]) ].tourCaseFaux._visible=true;
					//trace("maVar "+maVar);
					ouiRougeSolBtn._visible=true;
					nonRougeSolBtn._visible=true;
					//trace ("reponse"+reponse);
					//trace ("positionFaux[0]"+positionFaux[0]);
					maPosition=(positionFaux[0]-1)*5;
					for (i=0;i<reponse.length;i++)
					{
						//trace("reponse[(positionFaux[0]-1)*5 "+i +" "+reponse[i]);
					}
				}else{
					fondRepMc8._visible = false;
fondRepMc8.ouinonRougeBulleSol._visible=true;
				}
			}
			//Fonction bouton suiteRougeBtn
			var suiteEtat = false;
			suiteRougeBtn.onRelease = function() {
				affichageTourCase();
				trace("suiteRouge true")
	
				if (_level0.monCompteur < positionFaux.length-1)
				{
//					fondRepMc2.suiteRougeBulle.repMcTxt.text = "...et une erreur à la case: ("+reponse[_level0.monCompteur*5] +";"+ reponse[_level0.monCompteur*5 + 1]+")\n" + reponse[_level0.monCompteur*5 + 4];
					fondRepMc2.suiteRougeBulle.repMcTxt.text = "...et une erreur entre \nles cases:("+reponse[_level0.monCompteur*5+2] +";"+ reponse[_level0.monCompteur*5 + 3]+") et ("+reponse[_level0.monCompteur*5] +";"+ reponse[_level0.monCompteur*5 + 1]+")\n" + reponse[_level0.monCompteur*5 + 4];
					fondMc["conteneurCarre" + noCase(reponse[_level0.monCompteur*5+2] ,reponse[_level0.monCompteur*5 + 3]) ].tourCaseFaux._visible=true;
					fondMc["conteneurCarre" + noCase(reponse[_level0.monCompteur*5] ,reponse[_level0.monCompteur*5 + 1]) ].tourCaseFaux._visible=true;
				}else if (_level0.monCompteur >= positionFaux.length-1)
				{
					fondRepMc2._visible=false;
					fondRepMc8._x=fondRepMc2._x;
					fondRepMc8._y=fondRepMc2._y;
					fondRepMc8._visible=true;
//					fondRepMc8.ouinonRougeBulleSol.repMcTxt.text = "La dernière erreur laissée est à la case: ("+reponse[_level0.monCompteur*5] +";"+ reponse[_level0.monCompteur*5 + 1]+")\n" + reponse[_level0.monCompteur*5 + 4]+"\nVeux-tu voir une solution?";
					fondRepMc8.ouinonRougeBulleSol.repMcTxt.text = "La dernière erreur laissée est entre \nles cases:("+reponse[_level0.monCompteur*5+2] +";"+ reponse[_level0.monCompteur*5 + 3]+") et ("+reponse[_level0.monCompteur*5] +";"+ reponse[_level0.monCompteur*5 + 1]+")\n" + reponse[_level0.monCompteur*5 + 4]+"\nVeux-tu voir une solution?";
					fondRepMc8.ouinonRougeBulleSol._visible=true;
					ouiRougeSolBtn._visible=true;
					nonRougeSolBtn._visible=true;
					//trace("SUITEROUGE noCase(reponseGlobal[_level0.monCompteur1*5],reponse[_level0.monCompteur*5 + 1])"+noCase(reponse[_level0.monCompteur*5],reponse[_level0.monCompteur*5 + 1]));
					fondMc["conteneurCarre" + noCase(reponse[_level0.monCompteur*5+2],reponse[_level0.monCompteur*5+3]) ].tourCaseFaux._visible=true;
					fondMc["conteneurCarre" + noCase(reponse[_level0.monCompteur*5],reponse[_level0.monCompteur*5+1]) ].tourCaseFaux._visible=true;
				}else{
					fondRepMc8._visible = false;
				}
				_level0.monCompteur++;
			}
		break;
	}
	
	//Fonction bouton ouiVertBtn
	ouiVertBtn.onRelease = function() {
		affichageTourCase();
		trace("ouiVert")
		fondRepMc3._visible=false;
//		verifier_btn._visible=false;

		if (positionFaux.length-1>0)
		{
			fondRepMc1._x=fondRepMc3._x;
			fondRepMc1._y=fondRepMc3._y;
			fondRepMc1._visible=true;
			fondRepMc1.suiteVerteBulle._visible=true;
			suiteVertBtn._visible=true;
//			fondRepMc1.suiteVerteBulle.repMcTxt.text = "Il y avait une erreur à la case: ("+reponseGlobal[0] +";"+ reponseGlobal[1]+")\n" + reponseGlobal[4]+" ...";
			fondRepMc1.suiteVerteBulle.repMcTxt.text = "Il y avait une erreur entre \nles cases: ("+reponseGlobal[2] +";"+ reponseGlobal[3]+") et ("+reponseGlobal[0] +";"+ reponseGlobal[1]+") \n" + reponseGlobal[4]+" ...";
			fondMc["conteneurCarre" + noCase(reponseGlobal[2],reponseGlobal[3]) ].tourCaseJuste._visible=true;
			fondMc["conteneurCarre" + noCase(reponseGlobal[0],reponseGlobal[1]) ].tourCaseJuste._visible=true;
			var suiteBulle ="ok";
		
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
//			fondRepMc7.finVertErreurBulle.repMcTxt.text = "Il y avait une erreur à la case: ("+reponseGlobal[0] +";"+ reponseGlobal[1]+")\n" + reponseGlobal[4];
			fondRepMc7.finVertErreurBulle.repMcTxt.text = "Il y avait une erreurentre \nles cases: ("+reponseGlobal[2] +";"+ reponseGlobal[3]+") et ("+reponseGlobal[0] +";"+ reponseGlobal[1]+") \n" + reponseGlobal[4];
			fondRepMc7._visible=true;
			fondRepMc7.finVertErreurBulle._visible=true;
			finVertErreurBtn._visible=true;
			fondMc["conteneurCarre" + noCase(reponseGlobal[2],reponseGlobal[3]) ].tourCaseJuste._visible=true;
			fondMc["conteneurCarre" + noCase(reponseGlobal[0],reponseGlobal[1]) ].tourCaseJuste._visible=true;
		}else{
			fondRepMc7._visible = false;
		}
	}
	
	//Fonction bouton nonVertBtn
	nonVertBtn.onRelease=function(){
		affichageTourCase();
		//trace("nonVert")
		fondRepMc3._visible=false;
//		verifier_btn._visible=false;
		
	}
	
	
	
	//Fonction bouton nonRougeBtn
	nonRougeBtn.onRelease=function(){
		affichageTourCase();
		//trace("nonRouge")
		fondRepMc4._visible=false;

		fondRepMc8._x=fondRepMc4._x;
		fondRepMc8._y=fondRepMc4._y;
		fondRepMc8._visible=true;
		fondRepMc8.ouinonRougeBulleSol.repMcTxt.text = "\nVeux-tu voir une solution?";
		fondRepMc8.ouinonRougeBulleSol._visible=true;
		ouiRougeSolBtn._visible=true;
		nonRougeSolBtn._visible=true;
		
		
//		verifier_btn._visible=false;
		if (exerciceCorrectif==true)
		{
			choixCorrectif(choixOperation);
			filVisible(false, "parcours");
			flechesVisibles(false,"parcours");
			mursVisibles(false,"parcours");
			cheminVisible(false);
		}
	}
	
	//Fonction bouton finRougeBtn
	finRougeBtn.onRelease=function(){
		affichageTourCase();
		//trace("finRouge")
		finRougeBtn._visible=false;
//		verifier_btn._visible=false;
		if (exerciceCorrectif==true)
		{
			choixCorrectif(choixOperation);
			filVisible(false, "parcours");
			flechesVisibles(false,"parcours");
			mursVisibles(false,"parcours");
			cheminVisible(false);
		}
	}
	
	//Fonction bouton finRougeErreurBtn
	finRougeErreurBtn.onRelease=function(){
		affichageTourCase();
		//trace("finRougeErreur")
		fondRepMc6._visible = false;
//		verifier_btn._visible=false;
		if (exerciceCorrectif==true)
		{
			choixCorrectif(choixOperation);
			filVisible(false, "parcours");
			flechesVisibles(false,"parcours");
			mursVisibles(false,"parcours");
			cheminVisible(false);
		}
	}
	
	//Fonction bouton finVertEreurBtn
	finVertErreurBtn.onRelease=function(){
		affichageTourCase();
		//trace("finVertErreur")
		fondRepMc7._visible=false;
//		verifier_btn._visible=false;
	}
	
	
	//Fonction bouton finRougeEreurBtn
	ouiRougeSolBtn.onRelease=function(){
		affichageTourCase();
		//trace("ouiRougeSol")
		actionSolution ();
		fondRepMc8._visible=false;
//		verifier_btn._visible=false;
		if (exerciceCorrectif==true)
		{
			fondMc.okBtn._visible=true;
		}
		
	}
	//Fonction bouton finRougeEreurBtn
	nonRougeSolBtn.onRelease=function(){
		affichageTourCase();
		//trace("nonRougeSol")
		fondRepMc8._visible=false;
//		verifier_btn._visible=false;
		choixCorrectif(choixOperation);
		if (exerciceCorrectif==true)
		{
			choixCorrectif(choixOperation);
			filVisible(false, "parcours");
			flechesVisibles(false,"parcours");
			mursVisibles(false,"parcours");
			cheminVisible(false);
		}
	}
	
	//okBtn
	fondMc.okBtn.onRelease=function()
	{
		choixCorrectif(choixOperation);
		filVisible(false, "parcours");
		flechesVisibles(false,"parcours");
		cheminVisible(false);
	}
	
	okRougeGuideBtn.onRelease=function(){
		delete fondRepMc9.onEnterFrame;
		fondMc["conteneurCarre" + casesLiees[0] ].tourCaseFaux._visible=false;
		fondMc["conteneurCarre" + casesLiees[1] ].tourCaseFaux._visible=false;
		fondRepMc9._visible=false;
	}
}	
	
