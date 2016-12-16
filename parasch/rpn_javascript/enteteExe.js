var baliseTitle = document.getElementsByTagName('title'),
	baliseSpan = document.getElementsByTagName('span'),
	baliseH1 = document.getElementsByTagName('h1');
	
function construitEnteteFRA()
{
	baliseTitle[0].innerHTML = description[0];
	baliseSpan[0].innerHTML = "<a href=\"http://portail.rpn.ch/eleves/langues/Pages/l1.aspx\" target=\"_blank\" alt=\"RPN Français\" title=\"RPN Français\"><img id=\"icone\" src=\"../images/langues.png\" /></a> ";
	baliseH1[0].innerHTML = description[0];
}

