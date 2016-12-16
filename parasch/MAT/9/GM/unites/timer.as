/**
 * ...
 * @author J-M.Luthi
 */

class timer {
	 public var etat:Boolean = false;//Si le compteur est terminé, on met sur true
	 private var intervalId:Number;
	 private var count:Number = 0;
	 private var maxCount:Number = 10;
	 private var duration:Number //En millisecondes
 
 public function timer(tempTemp){
	duration = tempTemp;
	beginInterval();
	
 }
 
 private function beginInterval():Void {
	 if(intervalId != null) {
		 trace("clearInterval");
		 clearInterval(intervalId);
		 etat = true;
	 }
	 intervalId = setInterval(this, "executeCallback", duration);
 }
 
 public function executeCallback():Void {
	 trace("executeCallback intervalId: " + intervalId + " count: " + count);
	 if(count >= maxCount) {
		clearInterval(intervalId);
		etat=true;
	 }else {
		etat=false; 
	 }
	 count++;
	 trace("etat" +etat );
 }
 public function fin()
 {
	 return etat;
	 trace("etat" +etat );
 }
}