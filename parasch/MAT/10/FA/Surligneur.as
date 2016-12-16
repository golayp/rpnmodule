import Selection;

//ATTENTION, ligne 121: on a corrigé la position du surligneur en fonctione de la position de la souris. Cette correction correspond à la position du clip conteneur (mcFondTemp)

class Surligneur
{
	public var mcFond:MovieClip;
	public var mcSurligneur:MovieClip;
	public var couleur:Number;
	public var nomSurligneur:String;
	public var nomSurligneurText:String;
	public var texteAnalyse:String;
	public var clipSurligneur:String;
	public var posX:Number;
	public var posY:Number;
	public var cibleDonnee:TextField;
	public var cibleSortie:TextField;
	public var marquage:Boolean;
	public var mcSurligneurNom:MovieClip;
	public var clipSurligneurNom:String;



	function Surligneur(mcFondTemp, couleurTemp, nomSurligneurTemp, xTemp, yTemp, cibleDonneeTemp, cibleSortieTemp, marquageTemp)
	{
		marquage = marquageTemp;
		mcFond = mcFondTemp;
		couleur = couleurTemp;
		nomSurligneurText = nomSurligneurTemp;
		nomSurligneur = "surligneur_" + nomSurligneurTemp;
		clipSurligneur = "mcSurligneur" + nomSurligneurTemp;
		clipSurligneurNom="surligneur"+couleurTemp;
		posX = xTemp;
		posY = yTemp;
		cibleSortie = cibleSortieTemp;
		cibleDonnee = cibleDonneeTemp;
		mcSurligneur = mcFond.createEmptyMovieClip(clipSurligneur, 10);
		//trace(mcSurligneur);
		mcSurligneurNom=mcSurligneur.createEmptyMovieClip(clipSurligneurNom, 3);
		trace("surligneur nom"+nomSurligneur);

		init();

		comportement();
	}
	public function init()
	{

		mcSurligneur.attachMovie("surligneurMc",nomSurligneur,2);

		mcSurligneur._x = posX;
		mcSurligneur[nomSurligneur]._x=0;
		mcSurligneur[nomSurligneur]._y=4;
		mcSurligneur._y = posY;
		mcSurligneurNom._x = 0;
		mcSurligneurNom._y = 1;

		var mcColor:Color = new Color(mcSurligneur[nomSurligneur]);
		mcColor.setRGB(couleur);
		//var myColorTransform:Object = {ra:50, rb:244, ga:112, ba:12, bb:90, aa:40, ab:70};
		//mcSurligneur["graphSurligneur"+nomSurligneur].setTransform(myColorTransform);


		//mcSurligneur[nomSurligneur].createTextField(nomSurligneur + "Txt",10,25,-15,70,20);
		mcSurligneurNom.createTextField(nomSurligneur + "Txt",10,10,0,50,20);
		
		var my_fmt:TextFormat = new TextFormat();
		my_fmt.color = 0xFFFFFF;
		my_fmt.font = "Arial";
		my_fmt.size = 10;
		my_fmt.align="center";
		/*mcSurligneur[nomSurligneur][nomSurligneur + "Txt"].text = nomSurligneurText;
		mcSurligneur[nomSurligneur][nomSurligneur + "Txt"].setTextFormat(my_fmt);
		mcSurligneur[nomSurligneur][nomSurligneur + "Txt"].selectable = false;*/
		mcSurligneurNom[nomSurligneur + "Txt"].text = nomSurligneurText;
		mcSurligneurNom[nomSurligneur + "Txt"].setTextFormat(my_fmt);
		mcSurligneurNom[nomSurligneur + "Txt"].selectable = false;
	}
	public function comportement()
	{
		var o = this;
		var f = o.mcFond;
		var etat = 0;
		var monEcouteur;
		var test:Number = 0;
		var mousEcouteur;
		var posix = posX;
		var posiy = posY;


		cibleDonnee.selectable = false;
		cibleSortie.selectable = false;
		
		mcSurligneur.onRollOver = function(){
			//trace("mcSurligneur"+this);
			this._xscale=120;
			this._yscale=120;
		}
		mcSurligneur.onRollOut = function(){
			this._xscale=100;
			this._yscale=100;
		}



		mcSurligneur.onRelease = function()
		{
			
			delete this.onEnterFrame;
			test = 0;
			etat = 0;
			monEcouteur = new Object();
			if (etat == 0)
			{

				o.cibleDonnee.selectable = true;
				Mouse.hide();
				this.onMouseMove = function()
				{
					this._x = _xmouse-13;
					this._y = _ymouse-25;
					updateAfterEvent();
				};

				monEcouteur.onMouseDown = function()
				{
					test++;

					f.onEnterFrame = function()
					{

						o.cibleSortie.text = o.cibleDonnee.text.substring(Selection.getBeginIndex(), Selection.getEndIndex());

					};
				};
			}
			monEcouteur.onMouseUp = function()
			{
				if (test >= 1)
				{
					delete f.onEnterFrame;
					Mouse.removeListener(monEcouteur);
					cibleDonnee.selectable = false;
					etat = 1;
					test = 0;
				} 
			};
			Mouse.addListener(monEcouteur);


			this.onEnterFrame = function()
			{

				if (etat == 1)
				{

					this.onMouseMove = function()
					{

						_xmouse = this._x;
						_ymouse = this._y;
						updateAfterEvent();
						Mouse.show();
					};
					this._x = posix;
					this._y = posiy;
					delete this.onEnterFrame;

				}
			};
		};
	}
}