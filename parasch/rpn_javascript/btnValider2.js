var reponses = [],
	solutions = [],
	nbEssais = 0,
	nbJustes = 0,
	fin = false,
	baliseSection = document.getElementsByTagName('section'),//VARIABLES UTILISEES DANS TOUS LES EXERCICES
	pageCourante = document.location.href,
	noPageSuivante = parseInt(pageCourante.substring(pageCourante.length-6,pageCourante.length-5))+1,
	pageSuivante = pageCourante.substring(0,pageCourante.length-6)+noPageSuivante+".html";

function construitBtnValider()
{
	var div0 = document.createElement('div'),
		button0 = document.createElement('button');

	div0.className = "valider";
	button0.id="bouton";
	button0.className="btn btn-primary";
	button0.type="submit";
	button0.setAttribute("onclick", "check()");
	button0.innerHTML = "Valider    <i class=\"icon-white icon-ok-sign\"></i>";
	
	div0.appendChild(button0);
	baliseSection[0].appendChild(div0);
}

function check()
{
	nbEssais++;
	iniReponses();//Réinitialise les réponses (La FONCTION est dans un autre script et dépend du type d'exercice)

	var btn = document.getElementById("bouton"),
		message ='';
	
	switch (nbEssais)
	{
		case 1:
		message = "1er essai sur 3 :\n\n";
		break;
		case 2:
		message = "2ème essai sur 3 :\n\n";
		break;
		case 3:
		message = "3ème essai sur 3 :\n\n";
		break;
	}
	
	if (fin)
	{
		if (dernierExe)
		{
		if(fra){
			window.location.href = ("http://portail.rpn.ch/eleves/langues/Pages/l1-h8-11.aspx");
			}else if (math){
			window.location.href = ("http://portail.rpn.ch/eleves/msn/Pages/msn-ma.aspx");
			}
		}
		else
		{
			window.location.href = (pageSuivante);
		}
	}
	else
	{
		for (var n=0, nbMax=nbRep; n < nbMax; n++)
		{
			analyseCheck(n);
		}
		
		compteJustes();
		
		var nbErreurs = (nbRep-nbJustes);
		
		if (nbJustes==nbRep || (nbEssais==3 && nbErreurs>0))
		{
			montrerSolutions();
			if(dernierExe)
			{
				btn.innerHTML = "FIN    <i class=\"icon-white icon-remove-sign\"></i>";
				resetfield();
				fin = true;
			}
			else
			{
				btn.innerHTML = "SUIVANT    <i class=\"icon-white icon-circle-arrow-right\"></i>";
				resetfield();
				fin = true;
			}
			if (nbErreurs==1)
			{
				if(typeExe=="lacune")
				{
					message = message+'Il subsiste une erreur. \nSurvole les mots faux avec la souris pour voir les solutions.';
				}
				else
				{
					message = message+'Il subsiste une erreur. \nLes bonnes réponses sont présentées en vert';
				}
								
			}
			else if (nbErreurs>1)
			{
				if(typeExe=="lacune")
				{
					message = message+'Il subsiste '+nbErreurs+' erreurs. \nSurvole les mots faux avec la souris pour voir les solutions';
				}
				else
				{
					message = message+'Il subsiste '+nbErreurs+' erreurs. \nLes bonnes réponses sont présentées en vert.';		
				}
			}
			else
			{
				message = message+'Bravo ! \n Tu as trouvé les bonnes réponses.';
			}
		}
		else
		{
			if (nbJustes==0)
			{
				message = message+'Aucune réponse n\'est correcte.';
			}
			else if (nbJustes==1)
			{
				message = message+'Tu as répondu correctement à une question sur '+nbRep+'.';
			}
			else
			{
				message = message+'Tu as répondu correctement à '+nbJustes+' questions sur '+nbRep+'.';
			}
		}
		confirmationFct(message);
		//alert(message);
	}
}


var sConfirm=document.createElement('span');
		sConfirm.id='spanConfirm';
		sConfirm.className='confirmationSty';
		var textsConfirm = document.createTextNode(' span sConfirm');
		
		var okBtn=document.createElement('button');
		//var okText=document.createTextNode('Ok');
		okBtn.id='btnOk';
		okBtn.className='btn btn-primary';
		//okBtn.value="OK    <i class=\"icon-white icon-ok-sign\"></i>";
		okBtn.innerHTML="OK";
		
		var annulerBtn=document.createElement('button');
		var annulerText=document.createTextNode('Annuler');
		annulerBtn.id='btnAnnuler';
		annulerBtn.className='boutonConfirmAnnuler';
		annulerBtn.value='Annuler';
		
		
		var sbr=document.createElement('br');
		var sp=document.createElement('p');
		sp.id='pSpan';
		//var texteTest=document.createTextNode('ceci juste pour voire');
		//okBtn.appendChild(okText);
		annulerBtn.appendChild(annulerText);
		
		//sp.appendChild(okBtn);
		sp.appendChild(textsConfirm);
		//sp.appendChild(annulerBtn);
		
		sConfirm.appendChild(sp);
		//sConfirm.appendChild(textsConfirm);
		sConfirm.appendChild(sbr);
		sConfirm.appendChild(okBtn);
		//sConfirm.appendChild(annulerBtn);
		document.body.appendChild(sConfirm);
		
		//confirmationFct('Supprimer '+monPrenom+' '+monNom+'?');
		var monOk=document.getElementById('btnOk');
		//var monAnnuler=document.getElementById('btnAnnuler');
		//document.write('supprimerRameur monId: ',monId);
		monOk.addEventListener('click', function() {
			//affichageFormulaireSupprimer(monId);
			//var idTransfert=document.getElementById('id');
			var monAlert=document.getElementById('spanConfirm');
			monAlert.style.display='none';
		}, false);
		/*monAnnuler.addEventListener('click', function(){
			var monAlert=document.getElementById('spanConfirm');
			monAlert.style.display='none';
		}, false);*/
		
		
function confirmationFct(texte){
		var monAlert=document.getElementById('spanConfirm');
		var monSpanText=document.getElementById('pSpan');
		monSpanText.innerHTML=texte;
		monAlert.style.display='block';
		//recuperationXML.style.display = 'block';
		//btnAnnuler.style.display = 'block';
		
	}