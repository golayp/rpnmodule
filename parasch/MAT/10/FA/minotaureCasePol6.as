/**
 * ...
 * @author Jean-Michel Luthi
 */
 
import mx.data.encoders.Num;
import TextField;


///////////////////////avec le systeme var maCase : maCase = new minotaureCase(conteneur) on est obligé de mettre un clip conteneur dans le .fla
class minotaureCasePol6 extends MovieClip
 
{
	public var posX:Number; //Position X en coordonnée entière par rapport au tableau (pas en pixels)
	public var posY:Number; //Position Y en coordonnée entière par rapport au tableau (pas en pixels)
	public var couleurFond:Number = 0xff33ff; //couleur du fond de la case à l'origine
	public var couleurBord:Number = 0x666666; //couleur du bord de la case
	public var couleurAlpha:Number=100; //alpha de la case
	public var epaisseurTrait:Number = 1; //epaisseur du bord de la case (trait)
	public var conteneur:MovieClip; //clip contenant la case
	public var coordonnees:Array=new Array(); //tableau qui contiendra les coordonnée des cases pressées
	public var presse:Boolean = false;//Si la case à été pressée pour la couleur et le chemin.
	public var val1:TextField; //texte Haut
	public var val2:TextField; //texte Bas
	public var nb1B:Number; //1er nombre de l'opérationB
	public var nb2B:Number; //2e nombre de l'opérationB
	public var nb3B:Number; //3e nombre de l'opérationB
	public var nb4B:Number; //4e nombre de l'opérationB
	public var nb1H:Number; //1er nombre de l'opérationH
	public var nb2H:Number; //2e nombre de l'opérationH
	public var nb3H:Number; //3e nombre de l'opérationH
	public var nb4H:Number; //4e nombre de l'opérationH
	public var commentaireCase:String="C'est juste"; //2e nombre de l'opération
	//public var affichageH:MovieClip;
//	public var affichageB:MovieClip;
	public var factorise:TextField;
	public var degre1Dev:TextField;
	public var degre2Dev:TextField;
	public var exposantDev:TextField;
	public var exposantFact:TextField;
	
	
	private var marge:Number; //ecart entre le bord de la scène et la zone occupée par les cases
	private var bord:Boolean;//si il y a un trait qui borde la case
	private var mataille:Number; //taille de la case
	private var active:Boolean = false;//Si la case peut ètre active en fonction du chemin
	private var monFormat:TextFormat;
	private var monEtat:Boolean;
	private var R:Number;
	private var V:Number;
	private var B:Number;
	private var affichage:String;
	private var operationUtiliseeH:String;
	private var operationUtiliseeB:String;
	private var developpeH:Boolean=true;
	private var factoriseH:Boolean=true;
	
	
	
	
	
	static var compteurX:Number = 0;
	static var compteurY:Number = 0;
	
	//Avec clicable: si on clic sur la dernière case séléctionnée, on peut lui changer d'état. si on clique sur une case séléctionnée précédente on ne peut pas lui changer d'état
	

	function minotaureCasePol6(taille, positionX, positionY, margeGrille, bordure, clipConteneur, formatTemp)
	{
		monFormat = formatTemp;
		mataille = taille;
		posX = positionX;
		posY = positionY;
		marge = margeGrille;
		bord = bordure;
		conteneur = clipConteneur;
		dessine();
		monFormat.color=Number(0x000000);
		setTextH(posX, monFormat);
		setTextB(posY, monFormat);
		
		
	}
	function dessine()
	{
		conteneur.createEmptyMovieClip("carre", 1);
		if (bord == true)
		{
			conteneur.carre.lineStyle(epaisseurTrait, couleurBord);	
		}else
		{
			conteneur.carre.lineStyle(0, couleurFond);		
		}
		conteneur.carre.beginFill(couleurFond, couleurAlpha);
		conteneur.carre.lineTo(mataille-2, 0);
		conteneur.carre.lineTo(mataille-2, mataille-2);
		conteneur.carre.lineTo(0, mataille-2);
		conteneur.carre.lineTo(0, 0);
		conteneur.carre.endFill;
		conteneur.carre._x = mataille * (posX-1) + marge;//posX-1 pour commencer à(0;0)
		conteneur.carre._y = mataille * (posY - 1) + marge;
		conteneur.createEmptyMovieClip("tourCaseJuste", 11111);
		conteneur.tourCaseJuste.lineStyle(6, 0x777700);
		conteneur.tourCaseJuste.lineTo(mataille-2, 0);
		conteneur.tourCaseJuste.lineTo(mataille-2, mataille-2);
		conteneur.tourCaseJuste.lineTo(0, mataille-2);
		conteneur.tourCaseJuste.lineTo(0, 0);
		conteneur.tourCaseJuste._x = mataille * (posX-1) + marge;//posX-1 pour commencer à(0;0)
		conteneur.tourCaseJuste._y = mataille * (posY - 1) + marge;
		conteneur.tourCaseJuste._visible=false;
		conteneur.createEmptyMovieClip("tourCaseFaux", 11112);
		conteneur.tourCaseFaux.lineStyle(6, 0xcc0000);
		conteneur.tourCaseFaux.lineTo(mataille-2, 0);
		conteneur.tourCaseFaux.lineTo(mataille-2, mataille-2);
		conteneur.tourCaseFaux.lineTo(0, mataille-2);
		conteneur.tourCaseFaux.lineTo(0, 0);
		conteneur.tourCaseFaux._x = mataille * (posX-1) + marge;//posX-1 pour commencer à(0;0)
		conteneur.tourCaseFaux._y = mataille * (posY - 1) + marge;
		conteneur.tourCaseFaux._visible=false;
		
	}
	function setCouleurFond (couleur, cAlpha)
	{
		couleurFond = couleur;
		R=composante(couleurFond)[0];
		V=composante(couleurFond)[1];
		B=composante(couleurFond)[2];
		couleurAlpha = cAlpha;
		dessine();
	}
	function setCouleurTrait (couleur, epaisseur, coordX, coordY)
	{
		couleurBord = couleur;
		epaisseurTrait = epaisseur;
		dessine();
	}
	function setTextH (textH, leFormat)
	{
		////On agit sur les composantes des couleurs R( composante(couleurFond)[0]) V ( composante(couleurFond)[1]) B ( composante(couleurFond)[2])
//		if(Math.abs(R-V)<50)
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x000044);
//			//leFormat.color=Number(0xFFFFFF);
//		}else if (Math.abs(R-B)<75)
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x004400);
//		}else if (Math.abs(B-V)<50)
//		{
//			//leFormat.color=Number(0x000000);
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x440000);
//		}else if(Math.abs(R-B)<80 && (V<110 && V>90))
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x666666);
//		}else if(V>130)
//		{
//			//leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x999999);
//			leFormat.color=Number(0xffbbff);
//		}else
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond);
//		}
		//leFormat.color=Number(0xFFFFFF)-Number(couleurFond);
		conteneur.carre.createTextField("val1", 10, 5 , 5, mataille-10, mataille/4+4);
		//conteneur.carre.val1.embedFonts=true;
		conteneur.carre.val1.setNewTextFormat(leFormat);
		conteneur.carre.val1.selectable = false;
		conteneur.carre.val1.text = textH;
		switch (operationUtiliseeH)
			{
				case ("developpe"):
					switch (true)
					{
						case (textH=="ENTREE"):
						//trace("ENTREE");
							conteneur.carre.monAffichageDeveloppeHaut._visible=false;
							conteneur.carre.val1.text ="ENTREE"
						break;
						default:
						//trace("operationUtilisee H Dev"+operationUtiliseeH);
							operationChoisie (operationUtiliseeH, nb1H,nb2H,nb3H,nb4H, "HAUT", leFormat)
							//On lui met la même couleur que les caractères
							var mcColor:Color = new Color(conteneur.carre.monAffichageDeveloppeHaut);
							mcColor.setRGB(leFormat.color);
							conteneur.carre.val1.text ="";
						break;
					}
					
				break;
				case ("factorise"):
				//trace("factorise en HAUT");
					switch (true)
					{
						case (textH=="ENTREE"):
							conteneur.carre.monAffichageFactoriseHaut._visible=false;
							conteneur.carre.val1.text ="ENTREE"
						break;
						default:
						//trace("operationUtilisee H fact"+operationUtiliseeH);
							operationChoisie (operationUtiliseeH, nb1H,nb2H,nb3H,nb4H,"HAUT", leFormat)
							//On lui met la même couleur que les caractères
							var mcColor:Color = new Color(conteneur.carre.monAffichageFactoriseHaut);
							mcColor.setRGB(leFormat.color);
							conteneur.carre.val1.text ="";
						break;
					}
					
				break;
			}
		
	}
	function setTextB (textB, leFormat)
	{
		////On agit sur les composantes des couleurs R( composante(couleurFond)[0]) V ( composante(couleurFond)[1]) B ( composante(couleurFond)[2])
//		if(Math.abs(R-V)<50)
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x000044);
//			//leFormat.color=Number(0xFFFFFF);
//		}else if (Math.abs(R-B)<75)
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x004400);
//		}else if (Math.abs(B-V)<50)
//		{
//			//leFormat.color=Number(0x000000);
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x440000);
//		}else if(Math.abs(R-B)<50 && (V<110 && V>90))
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x666666);
//		}else if(V>130)
//		{
//			//leFormat.color=Number(0xFFFFFF)-Number(couleurFond)+Number(0x999999);
//			leFormat.color=Number(0xffbbff);
//		}else
//		{
//			leFormat.color=Number(0xFFFFFF)-Number(couleurFond);
//		}
		
		conteneur.carre.createTextField("val2", 11, 5 , mataille*39/64, mataille-10, mataille*3/16+4);
		//conteneur.carre.val2.embedFonts=true;
		conteneur.carre.val2.setNewTextFormat(leFormat);
		conteneur.carre.val2.selectable = false;
		conteneur.carre.val2.text = textB;
			switch (operationUtiliseeB)
			{
				case ("developpe"):
					switch (true)
					{
						case (textB=="SORTIE"):
						//trace("SORTIE");
							conteneur.carre.monAffichageDeveloppeBas._visible=false;
							conteneur.carre.val2.text ="SORTIE"
						break;
						default:
							operationChoisie (operationUtiliseeB, nb1B,nb2B,nb3B,nb4B, "BAS", leFormat)
							//On lui met la même couleur que les caractères
							var mcColor:Color = new Color(conteneur.carre.monAffichageDeveloppeBas);
							mcColor.setRGB(leFormat.color);
							conteneur.carre.val2.text ="";
						break;
					}
					
				break;
				case ("factorise"):
				//trace("factorise en BAS");
					switch (true)
					{
						case (textB=="SORTIE"):
							conteneur.carre.monAffichageFactoriseBas._visible=false;
							conteneur.carre.val2.text ="SORTIE"
						break;
						default:
							operationChoisie (operationUtiliseeB, nb1B,nb2B,nb3B,nb4B,"BAS", leFormat)
							//On lui met la même couleur que les caractères
							var mcColor:Color = new Color(conteneur.carre.monAffichageFactoriseBas);
							mcColor.setRGB(leFormat.color);
							conteneur.carre.val2.text ="";
						break;
					}
					
				break;
			}
	
	}
	
	function couleurMultiplicationDivision(uneCouleur, clip)
	{
		var mcColor:Color = new Color(clip);
		mcColor.setRGB(uneCouleur);
	}
	
	public function get textH():String
	{
		return val1.text;
	}
	public function get textB():String
	{
		return val2.text;
	}
	
	//C'est une façon de changer la couleur où on redessine le clip (pour l'instant pas utilisé : 16.09.2010)
	function comportement()
	{
		var o = this;
		conteneur.carre.onRelease = function()
		{
			o.setCouleurTrait (0xff0000, 5);
			o.setCouleurFond (0x00ff00, 40);
		}
	}
	
	function couleurComplementaire(imageTemp) //on change de couleur
	{
		setTextH(posX, monFormat);
		setTextB(posY, monFormat);
		
	}

	
	function retourCoordonneeCaseClasse ()
	{
		var monTableau:Array = new Array(2);
		monTableau[0] = posX;
		monTableau[1] = posY;
		return monTableau;
	}
	//fonction qui convertit un hexdécimal en décimal, utilisé pour les couleurs, en composantes RVB
	function ecritureDeci (nbHexa)
	{
	
	
		var maVal:Number;
		switch(nbHexa)
		{
			case "0":
			maVal=0;
			break;
			case "1":
			maVal=1;
			break;
			case "2":
			maVal=2;
			break;
			case "3":
			maVal=3;
			break;
			case "4":
			maVal=4;
			break;
			case "5":
			maVal=5;
			break;
			case "6":
			maVal=6;
			break;
			case "7":
			maVal=7;
			break;
			case "8":
			maVal=8;
			break;
			case "9":
			maVal=9;
			break;
			case "A":
			maVal=10;
			break;
			case "B":
			maVal=11;
			break;
			case "C":
			maVal=12;
			break;
			case "D":
			maVal=13;
			break;
			case "E":
			maVal=14;
			break;
			case "F":
			maVal=15;
			break;
		}
	
		return maVal;
	}
	
	function composante(couleurHexa)
	{
		var RVB:Array=new Array(3)
		couleurHexa=couleurHexa.toUpperCase();
		RVB[2]=ecritureDeci(couleurHexa.substr(7,1))+ecritureDeci(couleurHexa.substr(6,1))*16;
		RVB[1]=ecritureDeci(couleurHexa.substr(5,1))+ecritureDeci(couleurHexa.substr(4,1))*16;
		RVB[0]=ecritureDeci(couleurHexa.substr(3,1))+ecritureDeci(couleurHexa.substr(2,1))*16;
		return RVB;
	}
	function operationChoisie (monOperation, a,b,c,d, position, ceFormat)
	{
		
		
		switch (position)
		{
			case ("HAUT"):

			operationUtiliseeH=monOperation;
			nb1H=a;
			nb2H=b;
			nb3H=c;
			nb4H=d;
			switch (operationUtiliseeH)
			{
			

				case ("developpe"):
				
					conteneur.carre.createEmptyMovieClip("monAffichageDeveloppeHaut", 96);
					conteneur.carre.monAffichageDeveloppeHaut._x=0;
					conteneur.carre.monAffichageDeveloppeHaut._y=10;
					developpeH=true;
					conteneur.carre.monAffichageDeveloppeHaut.createTextField("degre2Dev", 1, 4, 0, 0, 20);
					ceFormat.align="right";
					conteneur.carre.monAffichageDeveloppeHaut.degre2Dev.autoSize=true;
					//conteneur.carre.monAffichageDeveloppeHaut.degre2Dev.embedFonts=true;
					conteneur.carre.monAffichageDeveloppeHaut.degre2Dev.setNewTextFormat(ceFormat);
					conteneur.carre.monAffichageDeveloppeHaut.createTextField("exposantDev",2, 0, -1, 15, 15);
					var tailleCaractere:Number=ceFormat.size;
					ceFormat.align="left";
					ceFormat.size=tailleCaractere*2/3;
					//conteneur.carre.monAffichageDeveloppeHaut.exposantDev.embedFonts=true;
					conteneur.carre.monAffichageDeveloppeHaut.exposantDev.setNewTextFormat(ceFormat);
					conteneur.carre.monAffichageDeveloppeHaut.createTextField("degre1Dev", 3, 16, 0, 50, 20);
					ceFormat.size=tailleCaractere;
					//ceFormat.align="center";
					//conteneur.carre.monAffichageDeveloppeHaut.degre1Dev.embedFonts=true;
					conteneur.carre.monAffichageDeveloppeHaut.degre1Dev.setNewTextFormat(ceFormat);
					//ceFormat.align="right";
					var coef1dH:Number=a*d+b*c;
					var coef2dH:Number=a*c;
					var coef0dH:Number=b*d;
					conteneur.carre.monAffichageDeveloppeHaut.exposantDev.text=2;
					
					if(coef2dH==1){
						conteneur.carre.monAffichageDeveloppeHaut.degre2Dev.text="x";
					}else{
						conteneur.carre.monAffichageDeveloppeHaut.degre2Dev.text=coef2dH+"x";
					}
					if(coef1dH>0 && Math.abs(coef1dH)!=1) 
					{
						conteneur.carre.monAffichageDeveloppeHaut.degre1Dev.text="+"+coef1dH+"x";
					}else if(coef1dH<0 && Math.abs(coef1dH)!=1)
					{
						conteneur.carre.monAffichageDeveloppeHaut.degre1Dev.text=coef1dH+"x";
					}
					if(coef1dH==1)
					{
						conteneur.carre.monAffichageDeveloppeHaut.degre1Dev.text="+x";
					}
					if(coef1dH==-1)
					{
						conteneur.carre.monAffichageDeveloppeHaut.degre1Dev.text="-x";
					}
					if(coef0dH>0) 
					{
						conteneur.carre.monAffichageDeveloppeHaut.degre1Dev.text=conteneur.carre.monAffichageDeveloppeHaut.degre1Dev.text+"+"+coef0dH;
					}else if(coef0dH<0)
					{
						conteneur.carre.monAffichageDeveloppeHaut.degre1Dev.text=conteneur.carre.monAffichageDeveloppeHaut.degre1Dev.text+coef0dH;
					}
					conteneur.carre.monAffichageDeveloppeHaut.exposantDev._x = conteneur.carre.monAffichageDeveloppeHaut.degre2Dev._width-1;
					conteneur.carre.monAffichageDeveloppeHaut.degre1Dev._x = conteneur.carre.monAffichageDeveloppeHaut.degre2Dev._width+3;
				break;
				case ("factorise"):
					var tailleCaractere:Number=ceFormat.size;
					conteneur.carre.createEmptyMovieClip("monAffichageFactoriseHaut", 97);
					conteneur.carre.monAffichageFactoriseHaut._x=0;
					conteneur.carre.monAffichageFactoriseHaut._y=10;
					factoriseH=true;
					//conteneur.carre.monAffichageFactoriseHaut.createTextField("factorise", 1, 0, 0, mataille-10, mataille*3/16+4);
					conteneur.carre.monAffichageFactoriseHaut.createTextField("factorise", 1,0, 0,  mataille-10, mataille*3/16+4);
					//conteneur.carre.monAffichageFactoriseHaut.factorise.embedFonts=true;
					conteneur.carre.monAffichageFactoriseHaut.factorise.autoSize=true;
					ceFormat.align = "center";
					//ceFormat.size=tailleCaractere*9/10;
					conteneur.carre.monAffichageFactoriseHaut.factorise.setNewTextFormat(ceFormat);
					
					conteneur.carre.monAffichageFactoriseHaut.createTextField("exposantFact",2, (mataille-10)*7/10, -5, 15, 15);
					
					ceFormat.size=tailleCaractere*2/3;
					ceFormat.align = "left";
					conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=3+conteneur.carre.monAffichageFactoriseHaut.factorise._width;
					//conteneur.carre.monAffichageFactoriseHaut.exposantFact.embedFonts=true;
					conteneur.carre.monAffichageFactoriseHaut.exposantFact.setNewTextFormat(ceFormat);
					ceFormat.size=tailleCaractere;
					ceFormat.align = "center";

					switch (true)
					{

						case (a==c && b==d):
							trace("ici a=c et b=d"+conteneur.carre.monAffichageFactoriseHaut.factorise._width);
							conteneur.carre.monAffichageFactoriseHaut.exposantFact.text = 2;

							var dx:Number=(mataille)/2;
							switch (true)
							{
								//case(b>10 && a>10):
//									conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x+"+b+")";
//									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
//								break;
//								case((b>10 && a>0)||(b>0 && a>10)):
//									conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x+"+b+")";
//									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
//								break;
								case(b>0 && a==1):
									conteneur.carre.monAffichageFactoriseHaut.factorise.text="(x+"+b+")";
									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
								break;
								case(b>0):
									conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x+"+b+")";
									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
								break;
								//case((b>10 && a==1):
//									conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x+"+b+")";
//									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
//								break;
								//
//								case(b<-10 && a<-10):
//									conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x+"+b+")";
//									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
//								break;
//								case((b<-10 && a<0)||(b<0 && a<-10)):
//									conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x"+b+")";
//									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
//								break;
								case(b<0 && a==1):
									conteneur.carre.monAffichageFactoriseHaut.factorise.text="(x"+b+")";
									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
								break;
								case(b<0):
									conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x"+b+")";
									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
								break;
								//case(b<0 && a>10):
//									conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x"+b+")";
//									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
//								break;
								//case(b>0 && a<-10):
//									conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x+"+b+")";
//									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
//								break;
//								case(b<0 && a>0):
//									conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x"+b+")";
//									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
//								break;
//								case(b>0 && a<0):
//									conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x+"+b+")";
//									conteneur.carre.monAffichageFactoriseHaut.exposantFact._x=dx+0.5*conteneur.carre.monAffichageFactoriseHaut.factorise._width;
//								break;
								
							}
						ceFormat.align = "center";
						ceFormat.size = 13;
						conteneur.carre.monAffichageFactoriseHaut.factorise._x = 18;
						conteneur.carre.monAffichageFactoriseHaut.exposantFact._x = 15 + conteneur.carre.monAffichageFactoriseHaut.factorise._width;
						conteneur.carre.monAffichageFactoriseHaut.factorise.setNewTextFormat(ceFormat);
						break;
						case (a==1 && c==1 && b!=d):
							if(b==0)
							{
								trace("b=0?" + b);
								if (a == 1) {
									conteneur.carre.monAffichageFactoriseBas.factorise.text="x";
								} else {
									conteneur.carre.monAffichageFactoriseBas.factorise.text=a+"x";
								}
								
							}else if (b<0)
							{
								conteneur.carre.monAffichageFactoriseHaut.factorise.text="(x"+b+")";
							}
							if(d>0)
							{
								conteneur.carre.monAffichageFactoriseHaut.factorise.text=conteneur.carre.monAffichageFactoriseHaut.factorise.text+"(x+"+d+")";
							}else if (d<0)
							{
								conteneur.carre.monAffichageFactoriseHaut.factorise.text=conteneur.carre.monAffichageFactoriseHaut.factorise.text+"(x"+d+")";
							}
						break;
					case (a != c || b != d):
							if(b==0)
							{
								conteneur.carre.monAffichageFactoriseHaut.factorise.text=a+"x";
							}else if(b>0)
							{
								conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x+"+b+")";
							}else if (b<0)
							{
								conteneur.carre.monAffichageFactoriseHaut.factorise.text="("+a+"x"+b+")";
							}
							if(d>0)
							{
								conteneur.carre.monAffichageFactoriseHaut.factorise.text=conteneur.carre.monAffichageFactoriseHaut.factorise.text+"("+c+"x+"+d+")";
							}else if (d<0)
							{
								conteneur.carre.monAffichageFactoriseHaut.factorise.text=conteneur.carre.monAffichageFactoriseHaut.factorise.text+"("+c+"x"+d+")";
							}
						break;
						
						
					}
					
				break;
				default:
					trace("Cette opération n'existe pas");
				break;
				
			}
		break;
		case("BAS"):

			operationUtiliseeB=monOperation;
			nb1B=a;
			nb2B=b;
			nb3B=c;
			nb4B=d;
			switch(operationUtiliseeB)
			{	
				case ("developpe"):
					var tailleCaractere:Number=ceFormat.size;
					conteneur.carre.createEmptyMovieClip("monAffichageDeveloppeBas", 98);
					conteneur.carre.monAffichageDeveloppeBas._x=0;
					conteneur.carre.monAffichageDeveloppeBas._y=mataille*39/64;
					developpeH=false;
					conteneur.carre.monAffichageDeveloppeBas.createTextField("degre2Dev", 1, 4, 0, 0, 20);
					conteneur.carre.monAffichageDeveloppeBas.degre2Dev.autoSize=true;
					//conteneur.carre.monAffichageDeveloppeBas.degre2Dev.embedFonts=true;
					ceFormat.align="right";
					conteneur.carre.monAffichageDeveloppeBas.degre2Dev.setNewTextFormat(ceFormat);
					conteneur.carre.monAffichageDeveloppeBas.createTextField("exposantDev",2, 0, -1, 15, 15);
					//conteneur.carre.monAffichageDeveloppeBas.exposantDev.embedFonts=true;
					ceFormat.align="left";
					ceFormat.size=tailleCaractere*2/3;
					conteneur.carre.monAffichageDeveloppeBas.exposantDev.setNewTextFormat(ceFormat);
					conteneur.carre.monAffichageDeveloppeBas.createTextField("degre1Dev", 3, 16, 0, 50, 20);
					//conteneur.carre.monAffichageDeveloppeBas.degre1Dev.embedFonts=true;
					ceFormat.size=tailleCaractere;
					ceFormat.align="left";
					conteneur.carre.monAffichageDeveloppeBas.degre1Dev.setNewTextFormat(ceFormat);
					
					var coef1dB:Number=a*d+b*c;
					var coef2dB:Number=a*c;
					var coef0dB:Number=b*d;
					conteneur.carre.monAffichageDeveloppeBas.exposantDev.text=2;
					
					if(coef2dB==1){
						conteneur.carre.monAffichageDeveloppeBas.degre2Dev.text="x";
					}else{
						conteneur.carre.monAffichageDeveloppeBas.degre2Dev.text=coef2dB+"x";
					}
					if(coef1dB>0 && Math.abs(coef1dB)!=1) 
					{
						conteneur.carre.monAffichageDeveloppeBas.degre1Dev.text="+"+coef1dB+"x";
					}else if(coef1dB && Math.abs(coef1dB)!=1)
					{
						conteneur.carre.monAffichageDeveloppeBas.degre1Dev.text=coef1dB+"x";
					}
					if(coef1dB==1)
					{
						conteneur.carre.monAffichageDeveloppeBas.degre1Dev.text="+x";
					}
					if(coef1dB==-1)
					{
						conteneur.carre.monAffichageDeveloppeBas.degre1Dev.text="-x";
					}
					if(coef0dB>0) 
					{
						conteneur.carre.monAffichageDeveloppeBas.degre1Dev.text=conteneur.carre.monAffichageDeveloppeBas.degre1Dev.text+"+"+coef0dB;
					}else if(coef0dB<0)
					{
						conteneur.carre.monAffichageDeveloppeBas.degre1Dev.text=conteneur.carre.monAffichageDeveloppeBas.degre1Dev.text+coef0dB;
					}
					conteneur.carre.monAffichageDeveloppeBas.exposantDev._x = conteneur.carre.monAffichageDeveloppeBas.degre2Dev._width-1;
					conteneur.carre.monAffichageDeveloppeBas.degre1Dev._x = conteneur.carre.monAffichageDeveloppeBas.degre2Dev._width+3;
				break;
				case ("factorise"):
					var tailleCaractere:Number=ceFormat.size;
					conteneur.carre.createEmptyMovieClip("monAffichageFactoriseBas", 99);
					conteneur.carre.monAffichageFactoriseBas._x=0;
					conteneur.carre.monAffichageFactoriseBas._y=mataille*39/64;
					factoriseH=false;
					conteneur.carre.monAffichageFactoriseBas.createTextField("factorise", 1, 0, 0, mataille-10, mataille*3/16+4);
					//conteneur.carre.monAffichageFactoriseBas.factorise.embedFonts=true;
					ceFormat.size=tailleCaractere*9/10;
					ceFormat.align = "center";
					conteneur.carre.monAffichageFactoriseBas.factorise.setNewTextFormat(ceFormat);
					
					conteneur.carre.monAffichageFactoriseBas.createTextField("exposantFact",2, (mataille-10)*3/4, -5, 15, 15);
					//conteneur.carre.monAffichageFactoriseBas.exposantFact.embedFonts=true;
					
					ceFormat.size=tailleCaractere*2/3;
					ceFormat.align = "left";
					conteneur.carre.monAffichageFactoriseBas.exposantFact.setNewTextFormat(ceFormat);
					ceFormat.size=tailleCaractere;
					ceFormat.align = "center";
					
					switch (true)
					{
						case (a == c && b == d):
							trace("//////////////////////////////////////////////////////////////////////////////IR///////////////////////////////");
							conteneur.carre.monAffichageFactoriseBas.exposantFact.text = 2;
							if(b>0)
							{
								conteneur.carre.monAffichageFactoriseBas.factorise.text="("+a+"x+"+b+")";
							}else if (b<0)
							{
								conteneur.carre.monAffichageFactoriseBas.factorise.text="("+a+"x"+b+")";
							}
						break;
						case (a==1 && c==1 && b!=d):

							if(b>0)
							{
								conteneur.carre.monAffichageFactoriseBas.factorise.text="(x+"+b+")";
							}else if (b<0)
							{
								conteneur.carre.monAffichageFactoriseBas.factorise.text="(x"+b+")";
							}
							if(d>0)
							{
								conteneur.carre.monAffichageFactoriseBas.factorise.text=conteneur.carre.monAffichageFactoriseBas.factorise.text+"(x+"+d+")";
							}else if (d<0)
							{
								conteneur.carre.monAffichageFactoriseBas.factorise.text=conteneur.carre.monAffichageFactoriseBas.factorise.text+"(x"+d+")";
							}
						break;
						case (a!=c || b!=d):
							conteneur.carre.monAffichageFactoriseBas.exposantFact.text = "";
							if(b==0)
							{
								trace("b=0?" + b);
								if (a == 1) {
									conteneur.carre.monAffichageFactoriseBas.factorise.text="x";
								} else {
									conteneur.carre.monAffichageFactoriseBas.factorise.text=a+"x";
								}
								
							}else if(b>0)
							{
								conteneur.carre.monAffichageFactoriseBas.factorise.text="("+a+"x+"+b+")";
							}else if (b<0)
							{
								conteneur.carre.monAffichageFactoriseBas.factorise.text="("+a+"x"+b+")";
							}
							if(d>0)
							{
								conteneur.carre.monAffichageFactoriseBas.factorise.text=conteneur.carre.monAffichageFactoriseBas.factorise.text+"("+c+"x+"+d+")";
							}else if (d<0)
							{
								conteneur.carre.monAffichageFactoriseBas.factorise.text=conteneur.carre.monAffichageFactoriseBas.factorise.text+"("+c+"x"+d+")";
							}
						break;
						case (b == 0):
							conteneur.carre.monAffichageFactoriseBas.factorise.text=a+"x";
						break;
						
					}
					ceFormat.align = "center";
					ceFormat.size=13;
					conteneur.carre.monAffichageFactoriseHaut.factorise._x = 18;
					conteneur.carre.monAffichageFactoriseHaut.exposantFact._x = 15 + conteneur.carre.monAffichageFactoriseHaut.factorise._width;
					conteneur.carre.monAffichageFactoriseHaut.factorise.setNewTextFormat(ceFormat);
				break;
				default:
					trace("Cette opération n'existe pas");
				break;
				
			}
		break;
		}
		
	}
}