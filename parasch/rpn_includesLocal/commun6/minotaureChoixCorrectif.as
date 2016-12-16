/**
 * ...
 * @author Jean-Michel Luthi
 */

function choixCorrectif(parametre)
{
	trace("dans choixCorrectif");
	switch (parametre)
	{
		case "addition":
		trace("dans choixCorrectif addition");
		trace("fauteType1"+fauteType1);
		trace("fauteType2"+fauteType2);
		trace("fauteType3"+fauteType3);
		trace("fauteType4"+fauteType4);
		
		switch (true)
		{
			case (fauteType1>3):
				fondMc.loadMovie("../minotaureConsecutif/minotaureConsecutifSans6.swf");
			break;
			case (fauteType2>3):
				fondMc.loadMovie("../minotaureConsecutif/minotaureConsecutifSans6.swf");
			break;
			case (fauteType3>3):
				fondMc.loadMovie("../minotaureConsecutif/minotaureConsecutifSans6.swf");
			break;
			case (fauteType4>3):
				fondMc.loadMovie("../minotaureConsecutif/minotaureConsecutifSans6.swf");
			break;
			case (fauteType5>3):
				fondMc.loadMovie("../minotaureConsecutif/minotaureConsecutifSans6.swf");
			break;
			
		}
		break;
		case "soustraction":
		switch (true)
		{
			case (fauteType1>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType2>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType3>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType4>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType5>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			
		}
		break;
		case "multiplication":
		switch (true)
		{
			case (fauteType1>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType2>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType3>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType4>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType5>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			
		}
		break;
		case "division":
		switch (true)
		{
			case (fauteType1>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType2>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType3>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType4>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			case (fauteType5>3):
				fondMc.loadMovie("minotaureConsecutifSans6.swf");
			break;
			
		}
		break;
	}
}