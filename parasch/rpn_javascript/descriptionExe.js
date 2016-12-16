var baliseH2 = document.getElementsByTagName('h2'),
	baliseImg = document.getElementsByTagName('img'),
	baliseH3 = document.getElementsByTagName('h3'),
	baliseH4 = document.getElementsByTagName('h4');
	
function construitDescription()
{
	baliseH2[0].innerHTML = description[1];
	afficheImg_1();
	baliseH3[0].innerHTML = description[2];
	baliseH4[0].innerHTML = description[3];
}

function afficheImg_1()
{
	if (logoIntro!="")
	{
		var div1 = document.createElement("div"),
			div2 = document.createElement("div");
		
		div1.id = "intro";
		
	/*	if (introVisible)
		{
			div1.style.display = "block";
			div1.style.position = "fixed";
		}
	*/
		div2.id = "texteIntro";
		for (var n=0, nbLi = intro.length; n<nbLi; n++)
		{
			p = document.createElement("p");
			p.innerHTML = intro[n];
			div2.appendChild(p);
		}
		p = document.createElement("p");
		div2.appendChild(p);
		
		div1.appendChild(div2);
		baliseSection[0].appendChild(div1);
		
		baliseImg[1].id = "logoIntro";
		baliseImg[1].style.display = 'inline-block';
		baliseImg[1].setAttribute('src', logoIntro);
		baliseImg[1].onclick = function()
		{
			afficheIntro();
		}
		document.getElementById('intro').onclick = function()
		{
			this.style.display = 'none';
		}
	}
	
	
}

function afficheIntro()
{
	var zoneIntro = document.getElementById('intro');
	
	zoneIntro.style.display = 'block';
	zoneIntro.style.position = "fixed";
}