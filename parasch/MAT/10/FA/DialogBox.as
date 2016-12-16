
import MovieClip;
import TextField;
import ChampEvidence;

class DialogBox extends MovieClip{
	
	public var mcFondBox:MovieClip;
	public var nbChamps:Number;
	public var champsValeur:Array;
	public var longueur:Number;
	public var couleurFond:Color;
	public var titre:String;
	public var grandeurText:Number;
	public var couleurText:Color;
	public var champTextTitre:String;
	public var contenuChampTitre:TextField;
	public var retourMenu:String;
	public var posx:Number;
	public var posy:Number;
	var f_call:Function;

	
	public function DialogBox(mcFondBoxTemp, nbChampsTemp, longueurTemp, grandeurTextTemp, champsValeurTemp, couleurFondTemp, couleurTextTemp, titreTemp,posxTemp, posyTemp,f_return ){
	
		mcFondBox=mcFondBoxTemp;
		nbChamps=nbChampsTemp;
		champsValeur=champsValeurTemp;
		couleurFond=couleurFondTemp;
		couleurText=couleurTextTemp;
		titre=titreTemp;
		longueur=longueurTemp;
		grandeurText=grandeurTextTemp;
		retourMenu=titreTemp;
		posx=(mcFondBox._width-longueurTemp)/2
		posy=posyTemp;
		f_call=f_return;
		
		
		//Format du texte de la boite
		var boite_fmt= new TextFormat();
		boite_fmt.font = "Arial";
		boite_fmt.color=couleurText;
		boite_fmt.size=grandeurText;
		boite_fmt.bold=true;
		boite_fmt.align="center";
		
		//On crée un fond pour la partie déroulante
		var mcFondDeroulant:MovieClip=mcFondBox.createEmptyMovieClip("mcFondDeroulant",10);
		mcFondBox.mcFondDeroulant._x=posx;
		mcFondBox.mcFondDeroulant._y=posy;
		mcFondBox.mcFondDeroulant._visible=false;
		mcFondBox.mcFondDeroulant.lineStyle(0, couleurText);
		mcFondBox.mcFondDeroulant.moveTo(0,grandeurText+4.5);
		mcFondBox.mcFondDeroulant.beginFill(couleurFond);
		mcFondBox.mcFondDeroulant.lineTo(0,(nbChamps+1)*(grandeurText+10));
		mcFondBox.mcFondDeroulant.lineTo(longueur, (nbChamps+1)*(grandeurText+10));
		mcFondBox.mcFondDeroulant.lineTo(longueur,grandeurText+4);
		mcFondBox.mcFondDeroulant.lineTo(0,grandeurText+4);
		mcFondBox.mcFondDeroulant.endFill(); 
				
		//On crée un bouton pour dérouler la partie déroulante
		var btnFondDeroulant:MovieClip=mcFondBox.createEmptyMovieClip("btnFondDeroulant",1);
		mcFondBox.btnFondDeroulant.lineStyle(0, couleurText);
		mcFondBox.btnFondDeroulant.moveTo(posx+longueur,posy);
		mcFondBox.btnFondDeroulant.beginFill(couleurFond);
		mcFondBox.btnFondDeroulant.lineTo(posx+longueur,posy+grandeurText+4);
		mcFondBox.btnFondDeroulant.lineTo(posx+longueur+grandeurText+4,posy+grandeurText+4);
		mcFondBox.btnFondDeroulant.lineTo(posx+longueur+grandeurText+4,posy);
		mcFondBox.btnFondDeroulant.lineTo(posx+longueur,posy);
		mcFondBox.btnFondDeroulant.endFill();
		
		//la flèche:
		var flecheFondDeroulant:MovieClip=mcFondBox.btnFondDeroulant.createEmptyMovieClip("flecheFondDeroulant",0);
		mcFondBox.btnFondDeroulant.flecheFondDeroulant._x=posx+longueur+(grandeurText+4)/2;
		mcFondBox.btnFondDeroulant.flecheFondDeroulant._y=posy+(grandeurText+4)/2;
		mcFondBox.btnFondDeroulant.flecheFondDeroulant.lineStyle(0, couleurText);
		mcFondBox.btnFondDeroulant.flecheFondDeroulant.moveTo(-(grandeurText+4)/4,-(grandeurText+4)/4);
		mcFondBox.btnFondDeroulant.flecheFondDeroulant.beginFill(couleurText);
		mcFondBox.btnFondDeroulant.flecheFondDeroulant.lineTo((grandeurText+4)/4,-(grandeurText+4)/4);
		mcFondBox.btnFondDeroulant.flecheFondDeroulant.lineTo(0,(grandeurText+4)/4);
		mcFondBox.btnFondDeroulant.flecheFondDeroulant.lineTo(-(grandeurText+4)/4,-(grandeurText+4)/4);
		mcFondBox.btnFondDeroulant.flecheFondDeroulant.endFill(); 
	
		
		
		mcFondBox.createTextField("champTitre",50,posx,posy,longueur,grandeurText+4);
		mcFondBox.champTitre.border=true;
		mcFondBox.champTitre.type="dynamic";
		mcFondBox.champTitre.borderColor=couleurText;
		mcFondBox.champTitre.background=true;
		mcFondBox.champTitre.backgroundColor=couleurFond;
		mcFondBox.champTitre.setNewTextFormat(boite_fmt);
		mcFondBox.champTitre.selectable=false;
		mcFondBox.champTitre.text=titre;
		mcFondBox.champTitre._visible=true;
		champTextTitre=mcFondBox.champTitre.text;
		contenuChampTitre=mcFondBox.champTitre;
		
			
		//On crée les champs de texte de la boite de dialogue
		for (var i=0;i<nbChamps;i++){

			//on crée i objets ChampEvidence
			var nomChamp:String="champ"+i;
			
			var nomChamp:ChampEvidence=new ChampEvidence(mcFondBox.champTitre,mcFondBox.btnFondDeroulant.flecheFondDeroulant, mcFondBox.mcFondDeroulant, i,champsValeur[i],couleurFond, couleurText, longueur, grandeurText, (i+1)*(grandeurText+10),f_call);

		}
		comportement();
		
	}


		
	
	private function comportement(){
		var o=this;
		var t=o.mcFondBox;
		var f=o.mcFondBox.btnFondDeroulant;
		var g=o.mcFondBox.mcFondDeroulant;
		var h=mcFondBox.btnFondDeroulant.flecheFondDeroulant;
		
		//Si on clique sur le bouton, le menu déroulant s'affiche
		f.onRelease = function(){
			if (g._visible==false){
				g._visible=true;
				h._rotation=180;
			}else if (g._visible==true){
				g._visible=false;
				h._rotation=0;

			}
		}
		
	}
	public function retour(){
		var m=this;
		var r=m.mcFondBox;
		retourMenu=r.champTitre.text;
		//trace("retourMenu boite: "+retourMenu);
		return retourMenu;
	}
	
}