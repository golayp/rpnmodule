/**
 * ...
 * @author J-M Luthi
 */

//Fonction bouton vérifier
function mettreMurV(no1,no2)
{

	switch(Number(no1-no2))
		{
			case 1:
			mur(maCase[no2], "DROITE");
			break;
			case -1:
			mur(maCase[no2], "GAUCHE");
			break;
			case -nbCasesX:
			mur(maCase[no2], "HAUT");
			break;
			case nbCasesX:
			mur(maCase[no2], "BAS");
			break;
			default:
			break;
			
		}
}
function verifier()
{
	var maPosition;
	var caseActu:Array = new Array();
	var caseAns:Array = new Array();
	//On parcourt le tableau du parcour pour voir s'il y a des fautes
	for (i = 0; i < positionFaux.length; i++)
	{
		caseActu[0] = Number(reponse[i * 5]);
		caseActu[1] = Number(reponse[i * 5 + 1]);
		caseAns[0] = Number(reponse[i * 5 + 2]);
		caseAns[1] = Number(reponse[i * 5 + 3]);
		mettreMur(noCase(caseActu[0],caseActu[1]),noCase(caseAns[0],caseAns[1]));

	}
	
	creationBulles();
	switch (true)
			{
				case(reponse.length > 5 && fauteRestante == true):
				fondRepMc4.ouinonRougeBulle._visible = true;
				ouiRougeBtn._visible = true;
				nonRougeBtn._visible = true;
				fondRepMc4.ouinonRougeBulle.repMcTxt.text = "Tu as laissé des fautes.\nVeux-tu les voir?";
				_global.rep_justeTemp = false;
				_global.rep_juste = false;
				break;
				case (reponseGlobal.length>5):
				fondRepMc3.ouinonVerteBulle._visible = true;
				ouiVertBtn._visible = true;
				nonVertBtn._visible = true;
				fondRepMc3.ouinonVerteBulle.repMcTxt.text = reponse.pop() + "\nVeux-tu voir les erreurs\nque tu avais faites?";
				_global.rep_justeTemp = true;
				_global.rep_juste = true;
				break;
				case (reponse.length<=5):
				fondRepMc0.finVertBulle._visible = true;
				finVertBtn._visible = true;
				fondRepMc0.finVertBulle.repMcTxt.text = reponse.pop() + "\nTu as fait un parcours sans fautes";
				fondRepMc0.finVertBulle._visible=true;
				_global.rep_justeTemp = true;
				_global.rep_juste = true;
				break;
				default:
				break;
			}
	preparation_retour();
}