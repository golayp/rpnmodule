/*
 * @author Jean-Michel Luthi
*/
//On place un écouteur sur le fond car sur le level 0, il y en a déjà un pour la remmontée paraschool
fondMc.onEnterFrame=function(){
	actionSac();
}
//Action suivant le type d'unité
actionSac=function()
{
	
	for (j = 0; j <nbTot; j++)
	{
		//trace(monUnite[j]+".drag="+monUnite[j].drag);
//		if(monUnite[j].drag==true)
//		{
			//trace(monUnite[j].categorie);
			trace(monUnite[3].posX);
			switch (monUnite[j].categorie)
			{
				case "longueur" :
				if(Math.abs(monUnite[j].posX-fondMc.sacLong._x)< 40 && Math.abs(monUnite[j].posY-fondMc.sacLong._y))
				   {
					   monUnite[j].setPosition(fondMc.sacLong._x,fondMc.sacLong._y)
				   }
				//trace ("longueur");
				break;
				case "aire" :
				trace ("aire");
				break;
				case "volume" :
				trace ("volume");
				break;
				case "masse" :
				trace ("masse");
				break;
				case "temps" :
				trace ("temps");
				break;
				case "autre" :
				trace ("autre");
				break;
				default :
				trace ("default");
				break;
			}
//		}
	}
}