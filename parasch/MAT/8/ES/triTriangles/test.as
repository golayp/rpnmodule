/**
 * ...
 * @author Luthi J-M
 */
import MovieClip;

class test extends MovieClip 
{
	public var conteneur:MovieClip;
	
	function test(fondTemp:MovieClip) {
		conteneur = fondTemp;
		trace ("test"+conteneur)
		conteneur.attachMovie("btnSuite", "suite", 1);
		conteneur.suite.onRelease = function() {
			trace("onRelease")
			this._x = this._x + 100;
		}
	}
}