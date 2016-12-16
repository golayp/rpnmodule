import MovieClip;
import TextField;

///////////////////////avec le systeme var CetteFraction:fractions=new fractions(this) on est obligé de mettre un clip conteneur dans le .fla
class fractionsDrill extends MovieClip
{
	public var codeAvirgule:Number;;
	public var numerateur:Number;
	public var denominateur:Number;
	public var nomfraction:String;
	public var pgdc:Number=1;
	public var leSigne:Number;
	public var epaisseurBarre:Number=1;
	public var couleurBarre:Number= 0x000000;
	public var numerateurTexteWidth:Number;
	public var denominateurTexteWidth:Number;
	public var ni:Number;
	public var di:Number;
	//public var codeFrac:MovieClip;
	
	private var fondFrac:MovieClip;
	private var couleur0:Number = 0x000000;
	private var couleur1:Number = 0x000099;
	private var couleur2:Number = 0xFF0000;
	private var mcFraction:MovieClip;
	private var long1:Number;
	private var long2:Number;
	private var numerateurTxt:String;
	private var denominateurTxt:String;
	private var nbPremiers:Array;
	private var pourPGDC:Array;
	private var pourPPMC:Array;
	private var tailleCaractereNum:Number;
	private var tailleCaractereDenom:Number;
	private var trouve:Number
	private var debut:String;
	private var fin:String;
	private var nombreStr:Number;
	private var epaisseurSigne:Number;
	private var couleurSigne:Number;
	private var couleurCaractere:Number;
	private var abs_a:Number =1;
	private var abs_b:Number =1;
	private var absNum:Number;
	private var absDenom:Number;
	private var numerateurActuel:Number;
	private var denominateurActuel:Number;
	
	static var compteur:Number=0;
	
	function fractionsDrill(fondTemp)
	{
		fondFrac=fondTemp;
		cree();
		pourPGDC=[1];
		nbPremiers=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,

					113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,
					
					233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,
					
					359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,
					
					487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,
					
					619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,
					
					761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,
					
					911,919,929,937,941,947,953,967,971,977,983,991,997];
		
		

	}
	
	
	function cree()
	{
		//trace("dans cree");
		///trace("fondFrac: " +fondFrac );
		//trace("");
		compteur++;
		mcFraction=fondFrac.createEmptyMovieClip("mcFraction", compteur+1);
	}
	
/////////////////////////////////////////Lorsqu'on applique le formattage, il faut le faire dans l'ordre: setNum. setDenom et setBarre
	public function setBarre(couleur, epaisseur, longueur) {
		epaisseurBarre=epaisseur;
		couleurBarre=couleur;
		mcFraction.createEmptyMovieClip("barreMc",4)
		mcFraction.barreMc.lineStyle(epaisseurBarre, couleurBarre, 100);
		if (longueur!=undefined||longueur!=0){
			mcFraction.barreMc.moveTo(3-(longueur/2),30);
			mcFraction.barreMc.lineTo(6+(longueur/2),30);
		}else{
			mcFraction.barreMc._visible=false;
		}
		
		if(denominateur==1){
			mcFraction.numerateurTexte._y=30-(tailleCaractereNum+5)/2
			mcFraction.denominateurTexte.text="";
			mcFraction.denominateurTexte.selectable=false;
			mcFraction.denominateurTexte.border=false;
			mcFraction.barreMc._visible=false;
		}
	}
	
	public function setNum(couleur, taille, italique, gras, alignement, tour,selectabilite){
		couleurCaractere=couleur;
		tailleCaractereNum=taille;
		numerateurTxt=numerateur.toString();
		denominateurTxt=denominateur.toString();
		
		//on crée le format pour le texte.
		var my_fmt:TextFormat = new TextFormat();
		my_fmt.color = couleurCaractere;
		////////////////////////Attention, myFont fait partie de la bibliothèque du clip appelant, il est lié et exporté dans la première inage\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		my_fmt.font = "myFont";
		my_fmt.size = taille;
		my_fmt.bold=gras;
		my_fmt.italic=italique;
		my_fmt.align=alignement;
		
		mcFraction.createTextField("numerateurTexte",2,0,28-(tailleCaractereNum+5),10,10);
		mcFraction.numerateurTexte.autoSize="center";
		mcFraction.numerateurTexte.setNewTextFormat(my_fmt);
		mcFraction.numerateurTexte.text=numerateurTxt;
		mcFraction.numerateurTexte.selectable=selectabilite;
		mcFraction.numerateurTexte.border=tour;
		
		mcFraction.createTextField("denominateurTexte",3,0, 32,10,10);
		mcFraction.denominateurTexte.autoSize="center";
		mcFraction.denominateurTexte.setNewTextFormat(my_fmt);
		mcFraction.denominateurTexte.text=denominateurTxt;
		mcFraction.denominateurTexte.selectable=selectabilite;
		mcFraction.denominateurTexte.border=tour;
		numerateurTexteWidth=mcFraction.numerateurTexte._width;
		denominateurTexteWidth=mcFraction.denominateurTexte._width;
		long1=mcFraction.numerateurTexte._width;
		long2=mcFraction.denominateurTexte._width;
		if (long1<long2){
			setBarre(couleurBarre,epaisseurBarre,long2);
		}else if (long2<long1||long2==long1){
			setBarre(couleurBarre,epaisseurBarre,long1);
		}
	}
	
	public function setDenom(couleur, taille, italique, gras, alignement, tour, selectabilite){
		tailleCaractereDenom=taille;
		numerateurTxt=numerateur.toString();
		denominateurTxt=denominateur.toString();

		var my_fmt:TextFormat = new TextFormat();
		my_fmt.color = couleur;
		//my_fmt.font = "Arial";
		/////////////////////////////////Attention, myFont fait partie de la bibliothèque du clip appelant, il est lié et exporté dans la première inage\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		my_fmt.font = "myFont";
		my_fmt.size = taille;
		my_fmt.bold=gras;
		my_fmt.italic=italique;
		my_fmt.align=alignement;
		
		long1=numerateurTxt.length*(tailleCaractereDenom-4);
		long2=denominateurTxt.length*(tailleCaractereDenom-4);
		
		mcFraction.createTextField("denominateurTexte",3,0, 32,10,10);
		mcFraction.denominateurTexte.autoSize="center";
		mcFraction.denominateurTexte.setNewTextFormat(my_fmt);
		mcFraction.denominateurTexte.text=denominateurTxt;
		mcFraction.denominateurTexte.selectable=selectabilite;
		mcFraction.denominateurTexte.border=tour;
		setEntier(denominateur);
		//parentheses(2*taille);
	}
	
	private function setEntier(denomValeur){
		if(denomValeur==1){
			mcFraction.numerateurTexte._y=30-(tailleCaractereNum+5)/2
			mcFraction.denominateurTexte.text="";
			mcFraction.denominateurTexte.selectable=false;
			mcFraction.denominateurTexte.border=false;
			setBarre(0xffffff,0,0);
		}
			
	}
	
	public function setSigne(couleur, epaisseur){
		couleurSigne=couleur;
		epaisseurSigne=epaisseur;
		numerateurActuel=Number(mcFraction.numerateurTexte.text);
		denominateurActuel=Number(mcFraction.denominateurTexte.text);
		absNum=Math.abs(numerateurActuel);
		absDenom=Math.abs(denominateurActuel);
		numerateurTxt=absNum.toString();
		denominateurTxt=absDenom.toString();
		
		/*trace(compteur+"numerateurTxt"+numerateurTxt);
		trace(compteur+"denominateurTxt"+denominateurTxt);*/
		mcFraction.numerateurTexte.text=numerateurTxt;
		mcFraction.denominateurTexte.text=denominateurTxt;
		
		mcFraction.createEmptyMovieClip("signe",5)
		mcFraction.signe.lineStyle(epaisseurSigne, couleurSigne, 100);
		
		if((numerateur<0 && denominateur<0)||(numerateur>0 && denominateur>0)){
			leSigne=1;
		}else if((numerateur<0 && denominateur>0)||(numerateur>0 && denominateur<0)){
			mcFraction.signe.moveTo(-Math.sqrt(numerateurTexteWidth)*2-(mcFraction.numerateurTexte._width)/2,30);
			mcFraction.signe.lineTo(-2-(mcFraction.numerateurTexte._width)/2,30);
			leSigne=-1;
		}
		//trace(compteur+" dans setSignele signe"+leSigne);
	}
	
	public function parentheses(taille, couleur) {
		trace("function parentheses")
		mcFraction.attachMovie("parentheseG","parentheseGMc",6)
		mcFraction.parentheseGMc._x=-20;
		mcFraction.parentheseGMc._y=30;
		mcFraction.parentheseGMc._height=taille;
		mcFraction.parentheseGMc._width=taille/6;
		mcFraction.attachMovie("parentheseD","parentheseDMc",7)
		mcFraction.parentheseDMc._x=20;
		mcFraction.parentheseDMc._y=30;
		mcFraction.parentheseDMc._height=taille;
		mcFraction.parentheseDMc._width=taille/6;
		var mcColor1:Color = new Color(mcFraction.parentheseGMc);
		mcColor1.setRGB(couleur);
		var mcColor2:Color = new Color(mcFraction.parentheseDMc);
		mcColor2.setRGB(couleur);
	}
	public function fracVirg(){
		codeAvirgule=numerateur/denominateur;
		return codeAvirgule;
	}
	
	public function creeNiEtDi(num, denom) {
		if(num%denom==0){
			mcFraction.numerateurTexte.text=num/denom;
			mcFraction.denominateurTexte.text=1;
			setEntier(1);
		}else{
			
			var niTxt:String;
			var diTxt:String;
			
			myPGDC(num,denom);
			ni=abs_a*Math.abs(num/pgdc);
			//trace("ni "+ni);
			di=abs_b*Math.abs(denom/pgdc);
			//trace("di "+di);
		}	
	}
	
	public function irreductible(){
		
		if(numerateur%denominateur==0){
			mcFraction.numerateurTexte.text=numerateur/denominateur;;
			mcFraction.denominateurTexte.text=1;
			setEntier(1);
		/*}else if(denominateur%numerateur==0){
			mcFraction.numerateurTexte.text=1;
			mcFraction.denominateurTexte.text=Math.abs(denominateur/numerateur);*/
		}else{
			
			var niTxt:String;
			var diTxt:String;
			
			myPGDC(numerateur,denominateur);
			ni=abs_a*Math.abs(numerateur/pgdc);
			//trace("ni "+ni);
			di=abs_b*Math.abs(denominateur/pgdc);
			//trace("di "+di);
			niTxt=ni.toString();
			diTxt=di.toString();
			mcFraction.numerateurTexte.text=niTxt;
			//trace("mcFraction.numerateurTexte.text"+mcFraction.numerateurTexte.text);
			mcFraction.denominateurTexte.text=diTxt;
			/*trace("niTxt.length"+niTxt.length);
				trace("diTxt.length"+diTxt.length);*/
			//mcFraction.numerateurTexte._width=niTxt.length*(tailleCaractereNum-4);
			//mcFraction.denominateurTexte._width=diTxt.length*(tailleCaractereNum-4);
			if (niTxt.length<diTxt.length){
				/*trace("niTxt.length"+niTxt.length);
				trace("diTxt.length"+diTxt.length);*/
				setBarre(couleurBarre,epaisseurBarre,mcFraction.denominateurTexte._width);
				/*mcFraction.numerateurTexte._x=(diTxt.length*(tailleCaractereNum-4)-niTxt.length*(tailleCaractereNum-4))/2
				mcFraction.denominateurTexte._x=0*/
			}else{
				setBarre(couleurBarre,epaisseurBarre,mcFraction.numerateurTexte._width);
				/*mcFraction.numerateurTexte._x=0
				mcFraction.denominateurTexte._x=(niTxt.length*(tailleCaractereNum-4)-diTxt.length*(tailleCaractereNum-4))/2*/
			}
			
			
			setEntier(di);
			trace("numerateur"+numerateur);
			trace("denominateur"+denominateur);
			trace("ni"+ni);
			trace("di"+di);
			return ni;
			return di;
		}
	}
	public function myPGDC(a,b){
		var j=0;
		var i=0;
		var k=0;
		pgdc=1;
		
		if (a<0){
			a=-a;
			abs_a=-1;
		}
		if (b<0){
			b=-b;
			abs_b=-1;
		}
		if(abs_a==-1 && abs_b==-1){
			abs_a=1;
			abs_b=1;
		}
		
		for(i=0;i<=nbPremiers.length-1;i++){
			if(a==1||b==1){
				i=nbPremiers.length;
			}
			while(a%nbPremiers[i]==0 && b%nbPremiers[i]==0){
				pourPGDC[j]=nbPremiers[i];
				a=a/nbPremiers[i];
				b=b/nbPremiers[i];
				j++;
			}
		
		}
		for(k=0;k<=pourPGDC.length-1;k++){
			pgdc=Math.abs(pgdc*pourPGDC[k]);
			
		}
		trace("pgdc" + pgdc);
		return pgdc;
		
	}
	public function amplifier(k){
		var na:Number;
		var da:Number;
		var naTxt:String;
		var daTxt:String;
		na=numerateur*k;
		da=denominateur*k;
		naTxt=na.toString();
		daTxt=da.toString();
		mcFraction.numerateurTexte.text=naTxt;
		mcFraction.denominateurTexte.text=daTxt;
		/*mcFraction.numerateurTexte._width=naTxt.length*(tailleCaractereNum-4);
		mcFraction.denominateurTexte._width=daTxt.length*(tailleCaractereNum-4);*/
		if (naTxt.length<daTxt.length){
			setBarre(couleurBarre,epaisseurBarre,mcFraction.denominateurTexte._width);
			/*mcFraction.numerateurTexte._x=(daTxt.length*(tailleCaractereNum-4)-naTxt.length*(tailleCaractereNum-4))/2
			mcFraction.denominateurTexte._x=0*/
		}else{
			setBarre(couleurBarre,epaisseurBarre,mcFraction.denominateurTexte._width);
			/*mcFraction.numerateurTexte._x=0
			mcFraction.denominateurTexte._x=(naTxt.length*(tailleCaractereNum-4)-daTxt.length*(tailleCaractereNum-4))/2*/
		}
		
		
	}
	public function simplifier(k){
		if(numerateur%k==0 && denominateur%k==0){
			var ns:Number;
			var ds:Number;
			var nsTxt:String;
			var dsTxt:String;
			ns=numerateur/k;
			ds=denominateur/k;
			nsTxt=ns.toString();
			dsTxt=ds.toString();
			
			/*mcFraction.numerateurTexte._x=0;
			mcFraction.denominateurTexte._x=0;*/
			mcFraction.numerateurTexte.text=nsTxt;
			mcFraction.denominateurTexte.text=dsTxt;
			/*mcFraction.numerateurTexte._width=nsTxt.length*(tailleCaractereNum-4);
			mcFraction.denominateurTexte._width=dsTxt.length*(tailleCaractereNum-4);*/
			
			if (nsTxt.length<dsTxt.length){
				setBarre(couleurBarre,epaisseurBarre,dsTxt.length*(tailleCaractereNum-4));
				
			}else{
				setBarre(couleurBarre,epaisseurBarre,nsTxt.length*(tailleCaractereNum-4));
			}
			
		}
	}
	public function virgFrac(chaine){
		
		var periode:Number;
		var trouvep:Number;
		var milieu:String;
		var nombrePeriode:Number;
		var nombreAvantPeriode:Number;
		
		if (chaine.indexOf("p")!=-1){
			trouvep=chaine.indexOf("p");
			periode=1;
		}else{
			periode=0;
		}
		trouve=chaine.indexOf(",");

		if (trouve==-1){
			trouve=chaine.indexOf(".");
		}
		if (trouve==-1){
			
			numerateurTxt=chaine;
			numerateur=Number(numerateurTxt);
			denominateur=1;
		}else{
			if(periode==1){
				debut=chaine.substring(0, trouve);
				milieu=chaine.substring(trouve+1,trouvep);
				fin=chaine.substr(trouvep+1);
				nombrePeriode=fin.length;
				nombreAvantPeriode=milieu.length;
				numerateurTxt=debut+milieu+fin;
				numerateur=Number(numerateurTxt)-Number(debut+milieu);
				denominateur=Math.pow(10,nombrePeriode+nombreAvantPeriode)-Math.pow(10,nombreAvantPeriode) ;
				//irreductible();
			}else if(periode==0){
				debut=chaine.substring(0, trouve);
				fin=chaine.substr(trouve+1);
				nombreStr=fin.length;
				numerateurTxt=debut+fin;
				numerateur=Number(numerateurTxt);
				denominateur=Math.pow(10,nombreStr);
				//irreductible();
			}
		}
	}
	
}