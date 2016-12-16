var baliseTitle = document.getElementsByTagName('title'),
	baliseSpan = document.getElementsByTagName('span'),
	baliseH1 = document.getElementsByTagName('h1');
	var math=false,fra=false;

function construitEnteteFRA()
{
	fra=true;
	baliseTitle[0].innerHTML = description[0];
	baliseSpan[0].innerHTML = "<a href=\"http://portail.rpn.ch/eleves/langues/Pages/l1.aspx\" target=\"_blank\" alt=\"RPN Français\" title=\"RPN Français\"><img id=\"icone\" src=\"../../../rpn_images/langues.png\" /></a> ";
	baliseH1[0].innerHTML = description[0];
}

function construitEnteteMAT()
{
//alert('entete math.js');	
	math=true;
	baliseTitle[0].innerHTML = description[0];
	baliseSpan[0].innerHTML = "<a href=\"http://portail.rpn.ch/eleves/msn/Pages/msn-ma.aspx\" target=\"_blank\" alt=\"RPN Mathématiques\" title=\"RPN Mathématiques\"><img id=\"icone\" src=\"../../../rpn_images/msn.png\" /></a> ";
	baliseH1[0].innerHTML = description[0];
}

function construitPiedDePage()
{
	baliseSpan[1].innerHTML = "<a rel='license' href='http://creativecommons.org/licenses/by-nc-sa/2.0/fr/' target='_blank'><img src='http://i.creativecommons.org/l/by-nc-sa/2.0/fr/88x31.png' alt='Creative Commons License' width='57' height='20' style='border-width: 0'></a>";
}
