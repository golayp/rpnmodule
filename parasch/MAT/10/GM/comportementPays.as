/**
 * ...
 * @author ...
 */

class comportementPays extends MovieClip
{
	public var largeurInfo:Number;
	public var hauteurInfo:Number;
	public var largeurInfo2:Number;
	public var hauteurInfo2:Number;
	public var largeurBase:Number;
	public var hauteurBase:Number;
	public var formatInfo_fmt:TextFormat;
	public var formatCapitale_fmt:TextFormat;
	public var formatVille_fmt:TextFormat;
	public var lePlusHaut:MovieClip;//le clip qui a la plus grande profondeur
	public var lePlusHaut1:MovieClip;//le clip n°1 cliqué qui a la plus grande profondeur
	public var lePlusHaut2:MovieClip;//le clip n°2 cliqué qui a la plus grande profondeur
	public var _xclip:Number;//position _x du clip;
	public var _yclip:Number;//position _y du clip;
	public var actif:Boolean;//défini si le clip est actif ou non
	public var over:Boolean;//défini si le clip est rollOver ou non
	public var presse:Boolean;
	
	private var clip:MovieClip;
	private var info:Array;
	private var clipChange:MovieClip;//On crée unvariable qui contiendra la profondeur du clip survolé avant qu'il soit échangé avec le clip située au dessus de tout
	private var ecouteurSouris:Object;
	private var monNiveau:Number;
	
	function comportementPays(clipTemp:MovieClip, xTemp:Number, yTemp:Number, arrayTemp:Array, format1Temp:TextFormat, format2Temp:TextFormat, format3Temp:TextFormat,
	largeurBaseTemp, hauteurBaseTemp, largeurInfoTemp, hauteurInfoTemp, lePlusHautTemp, lePlusHautTemp1, lePlusHautTemp2, actifTemp) {
		initialisationVariables();
		clip = clipTemp;
		_xclip = xTemp;
		_yclip = yTemp;
		info = arrayTemp;
		formatInfo_fmt = format1Temp;
		formatCapitale_fmt = format2Temp;
		formatVille_fmt = format3Temp;
		largeurBase = largeurBaseTemp;
		hauteurBase = hauteurBaseTemp;
		largeurInfo = largeurInfoTemp;
		hauteurInfo = hauteurInfoTemp;
		largeurInfo2 = largeurInfoTemp+50;
		hauteurInfo2 = hauteurInfoTemp;
		lePlusHaut = lePlusHautTemp;
		lePlusHaut1 = lePlusHautTemp1;
		lePlusHaut2 = lePlusHautTemp2;
		actif = actifTemp;
		over = false;
		monNiveau = clip.getDepth();
		//trace (monNiveau);
		//trace("info" + clip)
		clip.capMc._visible = false;
		clip.ville1Mc._visible = false;
		clip.ville2Mc._visible = false;
		clip.ville3Mc._visible = false;
		clip.ville4Mc._visible = false;
		setActif(actif);
		presse = false;
		release();
		releaseOutside();
		rollOver();
		rollOut();
		
	}
	function initialisationVariables() {
		largeurInfo =-1;
		hauteurInfo =-1;
		largeurInfo2 =-1;
		hauteurInfo2 =-1;
		largeurBase =-1;
		hauteurBase =-1;
		formatInfo_fmt =new TextFormat();
		formatCapitale_fmt =new TextFormat();
		formatVille_fmt =new TextFormat();
		lePlusHaut = new MovieClip();
		lePlusHaut1 = new MovieClip();
		lePlusHaut2 = new MovieClip();
		_xclip = -1;
		_yclip = -1;
		actif = false;
		over = false;
		presse = false;
	}
	function setActif(etat) {
		if (etat == true) {
			clip.enabled = true;
		}else {
			clip.enabled = false;
		}
		
	}
	function rollOver() {
		var o = this;
		var paysProblemes:Array = new Array(_level0.cible.exeMc.canadaMc, _level0.cible.exeMc.israelMc, _level0.cible.exeMc.soudanMc, _level0.cible.exeMc.ukraineMc, _level0.cible.exeMc.usaMc,
		_level0.cible.exeMc.brezilMc, _level0.cible.exeMc.australieMc, _level0.cible.exeMc.afriqueDuSudMc, _level0.cible.exeMc.emiratsArabesUnisMc, _level0.cible.exeMc.guyaneFrancaiseMc, _level0.cible.exeMc.kenyaMc);
		
		var ecouteurSouris:Object = new Object();
		clip.onRollOver = function() {
			var positionne:Number=-1;
			trace("//////////////////////////////////////rollOVer/////////////////////////////"+this)
			
			if (o.presse == false) {
				//Mouse.hide();
				if (o.lePlusHaut.getDepth()==10000){
					o.clipChange = this;
					trace("niveau du clip" + this.getDepth())
					trace("niveau de lePlusHaut" + o.lePlusHaut.getDepth())
					//trace("clip.getDepth avant"+clip.getDepth())
					this.swapDepths(o.lePlusHaut);
					trace("niveau du clip après" + this.getDepth())
					trace("niveau de lePlusHaut apres" + o.lePlusHaut.getDepth())
					trace("")
				}
				//trace("longueur du mot" + o.formatInfo_fmt.size)
				o.largeurInfo = 0.7 * o.formatInfo_fmt.size * o.info[0].length;
				if (o.largeurInfo > 130) {
					o.largeurInfo = 130;
				}
				
				o.largeurInfo2 = 0.7 * o.formatVille_fmt.size * o.info[19].length;
				if (o.largeurInfo2 > 300) {
					o.largeurInfo2 = 300;
				}

				//this.createTextField("info", 1000,  o.proportionH * (_xmouse) + 5, o.proportionV * (_ymouse) + 5, o.largeurInfo, o.hauteurInfo);
				this.createTextField("info", 1000,  _xmouse + 10, _ymouse + 15, o.largeurInfo, o.hauteurInfo);
				this.info.background = true;
				this.info.backgroundColor = 0xff0000;
				this.info.alpha = 50;
				this.info.selectable = false;
				this.info.multiline = true;
				this.info.wordWrap = true;
				this.info.autoSize = true;
				this.info.setNewTextFormat(o.formatInfo_fmt);
				this.info.text = o.info[0];
				if (o.info[19].length > 0 ) {
					var monTextInfo2:String = o.info[19];
					//on fait fait une boucle qui va chercher les 7 rubriques d'information dans le XML et qui les mets avec un retour à la ligne entre chacune
					for (var k:Number = 1; k < 7; k++) {
						//o.info[] c'est la _level0.liste des info provement du xml
						if(o.info[19 + k].length > 0){
							monTextInfo2 = monTextInfo2 + "\n" + o.info[19 + k];						
						}else {
							
						}
					}
					trace("////////////////////////this.info._height "+this.info._height )
					//this.createTextField("info2", 1001, o.proportionH * ( _xmouse) + 5, o.proportionV * (this.info._height + _ymouse) + 5, o.proportionH * (o.largeurInfo2), o.proportionV * (o.hauteurInfo2));
					this.createTextField("info2", 1001,  this.info._x, this.info._height + _ymouse + 15, o.largeurInfo2, o.hauteurInfo2);
					this.info2.background = true;
					this.info2.backgroundColor = 0xffff00;
					this.info2.alpha = 50;
					this.info2.selectable = false;
					this.info2.multiline = true;
					this.info2.wordWrap = true;
					this.info2.autoSize = true;
					this.info2.setNewTextFormat(o.formatVille_fmt);
					this.info2.text = monTextInfo2;
				}

				positionne=o.testPositionSouris(o.clip, o.largeurInfo, o.largeurBase, o.largeurInfo2, o.hauteurInfo, o.hauteurBase, o.presse, positionne);
				
				this.capMc.createTextField("nom", 1, -25, -22, 100, 40);
				this.capMc.nom.background = true;
				this.capMc.nom.backgroundColor = 0xaaaaff;
				this.capMc.nom.selectable = false;
				this.capMc.nom.autoSize = true;
				this.capMc.nom.setNewTextFormat(o.formatCapitale_fmt);
				this.capMc.nom.text = o.info[2];
				
				this.ville1Mc.createTextField("nom", 1, -25, -22, 100, 40);
				this.ville1Mc.nom.background = true;
				this.ville1Mc.nom.backgroundColor = 0x66ff99;
				this.ville1Mc.nom.selectable = false;
				this.ville1Mc.nom.autoSize = true;
				this.ville1Mc.nom.setNewTextFormat(o.formatVille_fmt);
				this.ville1Mc.nom.text = o.info[4];
				
				
				this.ville2Mc.createTextField("nom", 1, -25, -22, 100, 40);
				this.ville2Mc.nom.background = true;
				this.ville2Mc.nom.backgroundColor = 0x66ff99;
				this.ville2Mc.nom.selectable = false;
				this.ville2Mc.nom.autoSize = true;
				this.ville2Mc.nom.setNewTextFormat(o.formatVille_fmt);
				this.ville2Mc.nom.text = o.info[6];
				
				
				this.ville3Mc.createTextField("nom", 1, -25, -22, 100, 40);
				this.ville3Mc.nom.background = true;
				this.ville3Mc.nom.backgroundColor = 0x66ff99;
				this.ville3Mc.nom.selectable = false;
				this.ville3Mc.nom.autoSize = true;
				this.ville3Mc.nom.setNewTextFormat(o.formatVille_fmt);
				this.ville3Mc.nom.text = o.info[8];
				
				
				this.ville4Mc.createTextField("nom", 1, -25, -22, 100, 40);
				this.ville4Mc.nom.background = true;
				this.ville4Mc.nom.backgroundColor = 0x66ff99;
				this.ville4Mc.nom.selectable = false;
				this.ville4Mc.nom.autoSize = true;
				this.ville4Mc.nom.setNewTextFormat(o.formatVille_fmt);
				this.ville4Mc.nom.text = o.info[10];
				
				//On replace la position de noms pour qu'ils ne se recouvrent pas.
				for (var i:Number = 0; i < paysProblemes.length; i++) {
					if (this==paysProblemes[i]){
						switch (true) {
							case (this == _level0.cible.exeMc.canadaMc):
								this.capMc.nom._x = -50;
								this.capMc.nom._y = -10;
								this.ville1Mc.nom._x = 5;
								this.ville1Mc.nom._y = -5;
								this.ville2Mc.nom._y = -22;
								this.ville3Mc.nom._x = -40;
								this.ville3Mc.nom._y = 5;
								break;
							case (this == _level0.cible.exeMc.israelMc):
								this.ville1Mc.nom._y = 5;
								this.ville2Mc.nom._y = -22;
								break;
							case (this == _level0.cible.exeMc.usaMc):
								this.capMc.nom._y = 5;
								this.ville1Mc.nom._x = 10;
								this.ville1Mc.nom._y = -12;
								this.ville2Mc.nom._y = 5;
								this.ville4Mc.nom._x = -10;
								break;
							case (this == _level0.cible.exeMc.soudanMc):
								this.ville1Mc.nom.setTextFormat(formatCapitale_fmt);
								//this.capMc.nom._x = 
								//this.capMc.nom._y= 
								//this.ville1Mc.nom._x= 
								//this.ville1Mc.nom._y = 
								//this.ville2Mc.nom._x = 
								//this.ville2Mc.nom._y = 
								//this.ville3Mc.nom._x=  
								//this.ville3Mc.nom._y=  
								//this.ville4Mc.nom._x= 
								//this.ville4Mc.nom._y=  
								break;
							case (this == _level0.cible.exeMc.ukraineMc):
								this.capMc.nom._y = 5;
								break;
							case (this == _level0.cible.exeMc.brezilMc):
								this.ville1Mc.nom._y = 5;
								break;
							case (this == _level0.cible.exeMc.australieMc):
								this.capMc.nom._x = 5;
								this.capMc.nom._y= -5
								this.ville2Mc.nom._y = 5;
								break;
							case (this == _level0.cible.exeMc.afriqueDuSudMc):
								this.ville1Mc.nom._x = 5;
								this.ville1Mc.nom._y = 5;
								this.ville2Mc.nom._y = 5;
								break;
							case (this == _level0.cible.exeMc.emiratsArabesUnisMc):
								this.capMc.nom._y = 5;
								break;
							case (this == _level0.cible.exeMc.guyaneFrancaiseMc):
								this.ville2Mc.nom._y = 5;
								break;
								case (this == _level0.cible.exeMc.kenyaMc):
								this.capMc.nom._x = -35;
								this.ville1Mc.nom._x = 5;
								break;
						}
					}
				}
			
			
				this.info._visible = true;
				this.info2._visible = true;
				this.capMc._visible = true;
				this.ville1Mc._visible = true;
				this.ville2Mc._visible = true;
				this.ville3Mc._visible = true;
				this.ville4Mc._visible = true;
				
				o.hauteurInfo = this.info._height;
				//trace(o.info._height);
				//testPositionSouris(o.clip, o.largeurInfo, o.largeurBase, o.largeurInfo2, o.hauteurInfo, o.hauteurBase, o.presse, -1);
				
				//trace("this rollOver: " + ecouteurSouris)
				trace ("o.clip" + o.clip)
				trace ("o.largeurInfo" +o.largeurInfo )
				trace ("o.largeurBase" +o.largeurBase )
				trace ("o.hauteurInfo" +o.hauteurInfo )
				trace ("o.hauteurBase" +o.hauteurBase )
				trace ("o.presse" +o.presse )
				
				ecouteurSouris.onMouseMove = function() {
					//trace("onMouseMove class"+o.clip)
					positionne=o.testPositionSouris(o.clip, o.largeurInfo, o.largeurBase, o.largeurInfo2, o.hauteurInfo, o.hauteurBase, o.presse, positionne);
				}
			}
			o.over = true;
		}
		Mouse.addListener(ecouteurSouris);
		
	}

	function testPositionSouris(monClip:MovieClip, lInfo:Number, lBase:Number, lInfo2:Number, hInfo:Number, hBase:Number, etat, switchcase) {
		//Etat nous indique si on a cliqué sur le pays auquel case les infos ne s'affichent plus
		//switchcase nous indique si on a déjà déplacé les champs. Sin on les a déjà déplacés, il faut retourner 
		//dans le même case sinon on arrive dans default etat ils se remettent comme au départ
		
		trace("")
		trace("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////")
		trace("monClip: " + monClip)
		//trace("testPositionSouris class: " + lInfo)
		trace("testPositionSouris class: " + lBase)
		//trace("testPositionSouris class: " + hInfo)
		trace("testPositionSouris class: " + hBase)
		trace("monClip._xmouse: " + monClip._xmouse)
		trace("monClip._x: " + monClip._x)
		trace("monClip.info2._width"+monClip.info2._width)
		
		//trace("testPositionSouris class: " + lBase)
		//trace("testPositionSouris class: " + hInfo)
		//trace("testPositionSouris class: " + hBase)
		
		trace("monClip.info2._x "+monClip.info2._x)
		trace("_xmouse: " + _xmouse)
		
		///trace("proportionH " + proportionH)
		//trace("positionne "+positionne)
		
		
		var retour:Number;//retourne positionne
		if (etat == false) {
			if (switchcase != -1) {
				if(monClip._x + monClip.info2._width + monClip._xmouse  < lBase 
				&& monClip._y + monClip._ymouse + monClip.info2._y + monClip.info2._height < hBase) {
					switchcase = -1;
				}
			}
			switch (true) {
				//Si les infos2 dépassent à droite on les place à gauche de info et si les infos sont trop bas
				case ((monClip._x + monClip.info2._width + monClip._xmouse  > lBase 
				&& monClip._y + monClip._ymouse + monClip.info2._y + monClip.info2._height > hBase) || switchcase==1) :
					if(retour==-1){monClip.info2._width = lInfo2 + 50};
					trace("testPositionSouris, à droite, en bas: et on a agrandit la zone"+monClip)
					//Si après avoir augmenté la largeur de l'info2, on est toujours trop bas, on le place au dessus de l'info
					if (monClip._y + monClip._ymouse + monClip.info2._y + monClip.info2._height > hBase) {
						monClip.info2._y = monClip._ymouse - monClip.info2._height;
						trace("testPositionSouris, à droite, en bas: et on a agrandi la zone et ça ne suffit pas. On la met au dessus" + monClip)
					}
					monClip.info._x = monClip._xmouse - monClip.info._width - 10;
					monClip.info._y = monClip._ymouse +15;
					monClip.info2._x = monClip._xmouse - monClip.info2._width - 10;
					monClip.info2._y = monClip._ymouse - monClip.info2._height;;
					trace("testPositionSouris, à droite et on met la zone à gauche" + this)
					retour = 1;
					return retour
					break;
				//Si les infos2 dépassent en bas on agrandis la zone
				case (monClip._y + monClip._ymouse + monClip.info2._y + monClip.info2._height > hBase || switchcase==2) :
					monClip.info2._width = lInfo2 + 50;
					trace("testPositionSouris, en bas et on agrandit la zone"+this)
					//Si après avoir augmenté la largeur de l'info2, on est toujours trop bas, on le place au dessus de l'info
					if (monClip._y + monClip._ymouse + monClip.info2._y + monClip.info2._height > hBase) {
						monClip.info2._y = monClip._ymouse - monClip.info2._height;
						trace("testPositionSouris, en bas et on a agrandi la zone et ça ne suffit pas. On la met au dessus" + this)
					}
					retour = 2;
					return retour;
					break;
				//Si les infos2 dépassent à droite on les place à gauche de info
				case (monClip._x + monClip.info2._width + monClip._xmouse   > lBase || switchcase==3) :
					monClip.info._x = monClip._xmouse - monClip.info._width - 10;
					monClip.info._y = monClip._ymouse +15;
					monClip.info2._x = monClip._xmouse - monClip.info2._width - 10;
					monClip.info2._y = monClip._ymouse+40;
					trace("testPositionSouris, à droite et on met la zone à gauche" + this)
					retour = 3;
					return retour;
					break;
				//Si on est en bas à droite pour le nom du pays
				case ((monClip._x + monClip._xmouse + lInfo + 50 > lBase && monClip._y + monClip._ymouse + hInfo + 50 > hBase) || switchcase==4):
					trace("en bas droite "+monClip._xmouse)
					monClip.info._x = -lInfo + monClip._xmouse-5;
					monClip.info._y = -hInfo + monClip._ymouse-10;
					monClip.info2._x = monClip.info._x;
					monClip.info2._y = monClip._ymouse-10;
					retour = 4;
					return retour;
					break;
				//Si on est tout à droite pour le nom du pays
				case (monClip._x + monClip._xmouse + lInfo + 50 > lBase || switchcase==5):
					trace(" a droite "+monClip._xmouse)
					monClip.info._x = -lInfo + monClip._xmouse-5;
					monClip.info._y = monClip._ymouse + 15;
					monClip.info2._x = monClip.info._x;
					monClip.info2._y = hInfo + monClip._ymouse + 15;
					retour = 5;
					return retour;
					break;
				//si on est tout en bas pour le nom du pays
				case (monClip._y + monClip._ymouse + hInfo + 50 > hBase || switchcase==6):
					trace(" en bas "+monClip._xmouse)
					monClip.info._x = monClip._xmouse + 10;
					monClip.info._y = -hInfo + monClip._ymouse-10;
					monClip.info2._x = monClip.info._x;
					monClip.info2._y = monClip._ymouse-10;
					retour = 6;
					return retour;
					break;
				default:
					monClip.info._x = monClip._xmouse + 10;
					monClip.info._y = monClip._ymouse +15;
					monClip.info2._x = monClip.info._x;
					monClip.info2._y = monClip._ymouse+40;
					trace(" default" + monClip.info._x)
					retour = -1;
					return retour;
					break;
			}
			
			
		
		}
	}

	
	function rollOut() {
		var o = this;
		clip.onRollOut = function() {
			
			//Mouse.show();
			if (o.presse == false && o.over == true) {
				o.over = false;
				//trace("clip.getDepth avant"+clip.getDepth())
				this.swapDepths(o.lePlusHaut);
				//trace("clip.getDepth après" + clip.getDepth());
				
				trace("niveau du clip" + this.getDepth())
				trace("niveau de lePlusHaut" + o.lePlusHaut.getDepth())
				this.info._visible = false;
				this.info2._visible = false;
				this.capMc._visible = false;
				this.ville1Mc._visible = false;
				this.ville2Mc._visible = false;
				this.ville3Mc._visible = false;
				this.ville4Mc._visible = false;
				//trace("clip rollOut: " + clip)
				Mouse.removeListener(ecouteurSouris);
			}
		}
	}
	
	function release() {
		var o = this;
		clip.onRelease = function() {
			switch(true){
				case(o.lePlusHaut1.getDepth() != 9998 && o.lePlusHaut2.getDepth() != 9999):
					if (o.presse == true){
						o.presse = false;
						this.info._visible = false;
						this.info2._visible = false;
						this.capMc._visible = false;
						this.ville1Mc._visible = false;
						this.ville2Mc._visible = false;
						this.ville3Mc._visible = false;
						this.ville4Mc._visible = false;
						if (o.lePlusHaut1.getDepth() == o.monNiveau) {
							this.swapDepths(o.lePlusHaut1);
						}else if(o.lePlusHaut2.getDepth() == o.monNiveau){
							this.swapDepths(o.lePlusHaut2);
						}
						this.swapDepths(o.lePlusHaut);
					}
					break;
				case (o.presse == false):
						//On remet le niveau de lePlusHaut à 10000
						this.swapDepths(o.lePlusHaut);
						o.presse = true;
						this.info._visible = true;
						this.info2._visible =  false;
						this.capMc._visible = true;
						this.ville1Mc._visible = true;
						this.ville2Mc._visible = true;
						this.ville3Mc._visible = true;
						this.ville4Mc._visible = true;
						if (o.lePlusHaut1.getDepth() == 9998) {
							this.swapDepths(o.lePlusHaut1);
						}else if(o.lePlusHaut2.getDepth() == 9999){
							this.swapDepths(o.lePlusHaut2);
						}
						break;
				
				case(o.presse == true):
					o.presse = false;
					this.info._visible = false;
					this.info2._visible = false;
					this.capMc._visible = false;
					this.ville1Mc._visible = false;
					this.ville2Mc._visible = false;
					this.ville3Mc._visible = false;
					this.ville4Mc._visible = false;
					if (o.lePlusHaut1.getDepth() == o.monNiveau) {
						this.swapDepths(o.lePlusHaut1);
					}else if(o.lePlusHaut2.getDepth() == o.monNiveau){
						this.swapDepths(o.lePlusHaut2);
					}
					this.swapDepths(o.lePlusHaut);
					break;
			}
		}
		_level0.monTexte.text = "released" + o.presse;
	}
	function releaseOutside() {
		var o = this;
		clip.onReleaseOutside = function() {
			o.presse = false;
			this.info._visible = false;
			this.info2._visible = false;
			this.capMc._visible = false;
			this.ville1Mc._visible = false;
			this.ville2Mc._visible = false;
			this.ville3Mc._visible = false;
			this.ville4Mc._visible = false;
			trace("clip releaseOutside: " + this)
			//Mouse.remove_level0.listener(ecouteurSouris);
			if (o.lePlusHaut1.getDepth() == o.monNiveau) {
				this.swapDepths(o.lePlusHaut1);
			}else if(o.lePlusHaut2.getDepth() == o.monNiveau){
				this.swapDepths(o.lePlusHaut2);
			}
			this.swapDepths(o.lePlusHaut);
		}
	}
	function enleverEcouteurSouris() {
		//trace("enlever")
		presse = false;
		//trace("info."+this.info.text)
		clip.info._visible = false;
		clip.info2._visible = false;
		clip.capMc._visible = false;
		clip.ville1Mc._visible = false;
		clip.ville2Mc._visible = false;
		clip.ville3Mc._visible = false;
		clip.ville4Mc._visible = false;
		//clip.trace("clip releaseOutside: " + this)
		//Mouse.remove_level0.listener(ecouteurSouris);
		if (lePlusHaut1.getDepth() == monNiveau) {
			clip.swapDepths(lePlusHaut1);
		}else if(lePlusHaut2.getDepth() == monNiveau){
			clip.swapDepths(lePlusHaut2);
		}
		clip.swapDepths(lePlusHaut);
		
		Mouse.removeListener(ecouteurSouris);
	}
	
	function changerNiveau(monClip) {
		trace("lePlusHaut avant " + lePlusHaut.getDepth())
		trace("clip avant "+clip.getDepth())
		clip.swapDepths(lePlusHaut);
		trace("lePlusHaut après " + lePlusHaut.getDepth())
		trace("clip après "+clip.getDepth())
	}
	function connaitreNiveau():Number {
		//trace("connaitreNiveau this.getDepth() "+clip.getDepth())
		return clip.getDepth();
	}
	function visibilite(etat, num) {
		clip._visible = etat;
		clip.capMc._visible = etat;
		clip.capMc.createTextField("nom", 1, -25, -22, 100, 40);
		clip.capMc.nom.background = true;
		clip.capMc.nom.backgroundColor = 0xaaaaff;
		clip.capMc.nom.selectable = false;
		clip.capMc.nom.autoSize = true;
		clip.capMc.nom.setNewTextFormat(formatCapitale_fmt);
		clip.capMc.nom.text = info[2];
		clip.capMc.nom._visible = etat;
		clip.ville[num+"Mc"]._visible = etat;
		clip.ville[num+"Mc"].createTextField("nom", 1, -25, -22, 100, 40);
		clip.ville[num+"Mc"].nom.background = true;
		clip.ville[num+"Mc"].nom.backgroundColor = 0x66ff99;
		clip.ville[num+"Mc"].nom.selectable = false;
		clip.ville[num+"Mc"].nom.autoSize = true;
		clip.ville[num+"Mc"].nom.setNewTextFormat(formatVille_fmt);
		clip.ville[num+"Mc"].nom.text = info[num];
		clip.ville[num+"Mc"].nom._visible = etat;
	}

}
