var baliseH1 = document.getElementsByTagName('h1'),
	baliseH2 = document.getElementsByTagName('h2'),
	baliseImg = document.getElementsByTagName('img'),
	baliseH3 = document.getElementsByTagName('h3'),
	baliseH4 = document.getElementsByTagName('h4'),
	baliseSection = document.getElementsByTagName('section')[0];
	baliseBody = document.getElementsByTagName('body')[0];
	baliseHeader = document.getElementsByTagName('header')[0];
	general = document.getElementById('general');
	console.log('window.innerWidth: '+window.innerWidth);
	console.log('baliseSection.style.width: '+baliseSection.style.width);
	baliseBody.style.width=0.90*window.innerWidth+'px';
	baliseHeader.style.width=0.982*window.innerWidth+'px';
	general.style.width=window.innerWidth+'px';
	baliseH1[0].style.width=window.innerWidth+'px';
	baliseH2[0].style.width=window.innerWidth+'px';
	baliseH3[0].style.width=window.innerWidth+'px';
	baliseH4[0].style.width=window.innerWidth+'px';
	baliseSection.style.width=window.innerWidth+'px';
	console.log('baliseSection.style.width: '+baliseSection.style.width);
	//document.getElementById('aideBouton').style.fontFamily = '"Century Gothic", TeXGyreAdventorRegular, "Avant Garde", Avenir, Verdana, sans-serif';
	//document.getElementById('aideConsigneBouton').style.fontFamily = '"Century Gothic", TeXGyreAdventorRegular, "Avant Garde", Avenir, Verdana, sans-serif';
	console.log('document.getElementById(aideBouton)'+document.getElementById('aideBouton'));
	//document.getElementById('aideBouton').firstChild.nodeValue='test a';
function construitDescription()
{
	//alert('construitDescription:'+description[2]);
	//baliseH1[0].innerHTML = description[1];
	baliseH2[0].innerHTML = description[1];
	afficheAideRessource(annexes[0], annexes[1], annexes[2], annexes[3]);
	baliseH3[0].innerHTML = description[2];
	baliseH4[0].innerHTML = description[3];
}

function afficheAideRessource(obj1, vrai1, obj2, vrai2)
{	
	document.getElementById('aideBouton').style.fontFamily = '"Century Gothic", TeXGyreAdventorRegular, "Avant Garde", Avenir, Verdana, sans-serif';
	document.getElementById('aideConsigneBouton').style.fontFamily = '"Century Gothic", TeXGyreAdventorRegular, "Avant Garde", Avenir, Verdana, sans-serif';
	//console.log('document.getElementById(aideBouton)'+document.getElementById('aideBouton'));
	//document.getElementById('aideBouton').firstChild.nodeValue='test a';
	if (obj1!="")
	{
		var divContenu=document.getElementsByTagName('section')[0];
		var container1 = document.createElement("div");
		container1.id = "containerDiv1";
		container1.style.height=(window.innerHeight).toString()+'px';
		
		var div1 = document.createElement("div");
		div1.id = "divAide";

		container1.appendChild(div1);
		divContenu.appendChild(container1);

		
		var Nom = navigator.appName;
		var Nom2 = navigator.appVersion;
		if(Nom2.indexOf('Chrome')>-1){
			//alert ('navigateur Chrome: '+ Nom);
			container1.style.backgroundColor='rgba(255, 255, 255, 0.6)';
		}else{
		//alert('pasChrome');
			container1.style.backgroundColor='rgb(255, 255, 255)';
		}
	
		if (Nom == 'Microsoft Internet Explorer') {
			swfobject.embedSWF(obj1, "divAide", "100%", "100%", "10.0.0", "../javascript/expressinstall.swf");
		}
		else
		{
			var largAide = (window.innerWidth)-200;
			var hautAide = largAide*350/640;
			swfobject.embedSWF(obj1, "divAide", largAide, hautAide, "10.0.0", "../javascript/expressinstall.swf");
		}
		var hautCont1 = (window.innerHeight)*0.8;
		container1.style.top=-hautCont1+'px'
		
	/*	var baliseAide=document.createElement('embed');
		baliseAide.id='divAide';
		$('section')[0].appendChild(baliseAide);
		var larg = (window.innerWidth);
		var haut = (window.innerHeight)*0.8;
		$('#divAide').attr({'src':obj1, 'height':haut, 'width':larg});
	*/	
		if (vrai1=="oui"){
			afficheIntro("containerDiv1");
			cacherIntro("containerDiv2");
		}else{
			cacherIntro("containerDiv1");
		}
		document.getElementById('aideBouton').onclick = function()
		{
			afficheIntro('containerDiv1');
			cacherIntro('containerDiv2');
		}
	}else{
		document.getElementById('aideBouton').disabled='true';
		document.getElementById('aideBouton').style.backgroundColor='rgba(250,79,73,0.5)';
		
	}

	if(obj2!="") {
		var divContenu=document.getElementsByTagName('section')[0];
		var container2 = document.createElement("div");
		container2.id = "containerDiv2";
		container2.style.height=(window.innerHeight).toString()+'px';
		
		var div2 = document.createElement("div");
		div2.id = "divAideConsigne";

		container2.appendChild(div2);
		divContenu.appendChild(container2);

		var Nom = navigator.appName;
		var Nom2 = navigator.appVersion;
		if(Nom2.indexOf('Chrome')>-1){
			//alert ('navigateur Chrome: '+ Nom);
			container2.style.backgroundColor='rgba(255, 255, 255, 0.6)';
		}else{
		//alert('pasChrome');
			container2.style.backgroundColor='rgb(255, 255, 255)';
		}
		var hautCont2 = (window.innerHeight)*0.8;
		container2.style.top=-hautCont2+'px'
		if (Nom == 'Microsoft Internet Explorer') {
			swfobject.embedSWF(obj2, "divAideConsigne", "100%", "100%", "10.0.0", "../javascript/expressinstall.swf");
		}
		else
		{
			var largCons = 0.7*(window.innerWidth);
			var hautCons = largCons*340/620;
			//var largCons = 497;
			//var hautCons = 350;

			swfobject.embedSWF(obj2, "divAideConsigne", largCons, hautCons, "10.0.0","../javascript/expressinstall.swf");
		}
/*		var baliseAideConsigne=document.createElement('embed');
		baliseAideConsigne.id='divAideConsigne';
		$('section')[0].appendChild(baliseAideConsigne);
		var larg2 = (window.innerWidth);
		var haut2 = (window.innerHeight)*0.5;
		//$('#divAideConsigne').attr({'src':obj2, 'height':haut2, 'width':larg2});
		$('#divAideConsigne').attr('src',obj2);
		console.log('obj2'+obj2);*/
				
		if (vrai2=="oui"){
		//alert ('oui');
			afficheIntro("containerDiv2");
			cacherIntro("containerDiv1");
		}else{
			cacherIntro("containerDiv2");
		}
		document.getElementById('aideConsigneBouton').onclick = function(){
			afficheIntro('containerDiv2');
			cacherIntro('containerDiv1');
		}
	}else{
		document.getElementById('aideConsigneBouton').disabled='true';
		document.getElementById('aideConsigneBouton').style.backgroundColor='rgba(250,79,73,0.5)';

	}

	document.getElementById('general').onclick = function()
	{
		if(document.getElementById('containerDiv2')){
			if (document.getElementById('containerDiv2').style.display=='block'){
				afficheIntro('containerDiv2');
			}
		}
		if(document.getElementById('containerDiv1')){
			if(document.getElementById('containerDiv1').style.display=='block'){
				afficheIntro('containerDiv1');
			}
		}
	}
}

function afficheIntro(nom)
{
	var zoneIntro = document.getElementById(nom);

	if(zoneIntro.style.display == 'block'){
		zoneIntro.style.display = 'none';
	}else{
		zoneIntro.style.display = 'block';
	}
	
}
function cacherIntro(nom)
{
	var zoneIntro = document.getElementById(nom);
	if(zoneIntro){
		zoneIntro.style.display = 'none';
	}
	
}