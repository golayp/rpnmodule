function affichageBoutonsModules(nombre){
	//var maLigne=document.getElementsByTagName('section')[0];
	//var elemSuivant=document.getElementsByTagName('h2')[0];
	var maCellule =document.createElement('div');
	maCellule.className='containerModules';
	for(var i=0;i<nombre;i++){
		var monBouton =document.createElement('button');
		monBouton.id='bouton'+i;
		monBouton.className='boutonModule';
		//monBouton.style.backgroundColor='#f00';
		maCellule.appendChild(monBouton);
		
	}
	//maLigne.insertBefore(maCellule, elemSuivant);
	document.body.appendChild(maCellule);
}
function affichageBoutonsRessources(obj1, obj2){
	//var maLigne=document.getElementsByTagName('section')[0];
	//var elemSuivant=document.getElementsByTagName('h2')[0];
	var maCellule =document.createElement('div');
	maCellule.className='containerBoutons';
	if(obj1!=""){
		var monBouton1=document.createElement('button');
		monBouton1.id='aideBouton';
		monBouton1.innerHTML='Rappel';
		monBouton1.className='boutonAideClass';
		maCellule.appendChild(monBouton1);
	}
	if(obj2!=""){
		var monBouton2=document.createElement('button');
		monBouton2.id='aideConsigneBouton';
		monBouton2.innerHTML='Aide consigne';
		monBouton2.className='boutonAideConsigneClass';
		maCellule.appendChild(monBouton2);
	}
	//maLigne.insertBefore(maCellule, elemSuivant);
	//elemSuivant.appendChild(maCellule);
	document.body.appendChild(maCellule);
	//afficheAideRessource(annexes[0], annexes[1], annexes[2], annexes[3]);
}