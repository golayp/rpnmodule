var baliseH2 = document.getElementsByTagName('h2'),
	baliseH3 = document.getElementsByTagName('h3'),
	baliseH4 = document.getElementsByTagName('h4');
	
function construitDescription()
{
alert('construitDescription.js');
	baliseH2[0].innerHTML = description[1];
	baliseH3[0].innerHTML = description[2];
	baliseH4[0].innerHTML = description[3];
}