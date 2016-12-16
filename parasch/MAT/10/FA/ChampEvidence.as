
import MovieClip;
import TextField;
import TextField.StyleSheet;
import flash.filters.BitmapFilter;
import flash.filters.ColorMatrixFilter;
import flash.display.BitmapData;

class ChampEvidence {
	public var couleurRollOver:Color;
	public var mcFondBox2:MovieClip;
	public var champValeur:String;
	public var longueur:Number;
	public var couleurFond:Color;
	public var grandeurText:Number;
	public var couleurText:Color;
	public var choix:String;
	public var posy:Number;
	public var image:MovieClip;
	public var no:Number;
	public var champT:TextField;
	 var bouton:MovieClip;
	 var f_call:Function;
	
	function ChampEvidence(champTitreTemp,boutonTemp,mcFondBoxTemp,noTemp,champValeurTemp,couleurFondTemp, couleurTextTemp, longueurTemp, grandeurTextTemp, posyTemp,fx:Function){
		mcFondBox2=mcFondBoxTemp;
		champValeur=champValeurTemp;
		couleurFond=couleurFondTemp;
		couleurText=couleurTextTemp;
		longueur=longueurTemp;
		grandeurText=grandeurTextTemp;
		posy=posyTemp;
		no=noTemp;
		champT=champTitreTemp;
		bouton=boutonTemp;
		f_call=fx;
		
		
		//Format du texte de la boite
		var boite_fmt= new TextFormat();
		boite_fmt.font = "Arial";
		boite_fmt.color=couleurText;
		boite_fmt.size=grandeurText;
		boite_fmt.bold=true;
		boite_fmt.align="center";
		
		function couleurComplementaire(imageTemp) {
			var monImage=imageTemp;
	
			var a = new Array();
			
			a = a.concat([-1, 0, 0, 0, 255]);
			a = a.concat([0, -1, 0, 0, 255]);
			a = a.concat([0, 0, -1, 0, 255]);
			a = a.concat([0, 0, 0, 1, 0]);
			 
			var filtre:BitmapFilter = new ColorMatrixFilter(a);
			monImage.filters = [filtre];
			
		}
		
		function couleurComplementaireB(imageTempB) {
			var o=this;
			var monImageB=imageTempB;
	
			var b = new Array();
			
			b = b.concat([1, 0, 0, 0, 0]);
			b = b.concat([0, 1, 0, 0, 0]);
			b = b.concat([0, 0, 1, 0, 0]);
			b = b.concat([0, 0, 0, 1, 0]);
			 
			var filtre:BitmapFilter = new ColorMatrixFilter(b);
			monImageB.filters = [filtre];
			
		}
		
		//On crée le champs de texte de la boite de dialogue
		
		mcFondBox2.createEmptyMovieClip("mcFondChoix"+no,mcFondBox2.getNextHighestDepth());
		mcFondBox2["mcFondChoix"+no]._y=posy;
		mcFondBox2["mcFondChoix"+no].createTextField("champ"+no,1,1,0,longueur-2,grandeurText+4);
		mcFondBox2["mcFondChoix"+no]["champ"+no].selectable=false;
		mcFondBox2["mcFondChoix"+no]["champ"+no].background=true;
		mcFondBox2["mcFondChoix"+no]["champ"+no].backgroundColor=couleurFond;
		//mcFondBox2["mcFondChoix"+no]["champ"+no]._alpha=100;
		mcFondBox2["mcFondChoix"+no]["champ"+no].setNewTextFormat(boite_fmt);
		mcFondBox2["mcFondChoix"+no]["champ"+no].text=champValeur;
		//Si on passe la souris sur un champs, son fond change de couleur.
		
		var ecouteur:Object = new Object();
		ecouteur.image = mcFondBox2["mcFondChoix"+no];
		ecouteur.leTexte=mcFondBox2["mcFondChoix"+no]["champ"+no].text;
		ecouteur.fond=mcFondBox2;
		ecouteur.titre=champT;
		ecouteur.btn=bouton;
		ecouteur.f_back=f_call;
		
		ecouteur.image.onRollOver = function() {
			couleurComplementaire(this)
		}
		
		ecouteur.image.onRollOut = function() {
			couleurComplementaireB(this)
		}
		ecouteur.image.onRelease=function(){
			ecouteur.titre.text=ecouteur.leTexte;
			ecouteur.fond._visible=false;
			ecouteur.btn._rotation=0;
			ecouteur.f_back.call(null,ecouteur.leTexte);
			
			

			}
		
		Mouse.addListener(ecouteur);
	}
}