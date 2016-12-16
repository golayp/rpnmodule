function resetfield()
{
	window.onbeforeunload = null;
	return "resetField()activée";
}

//window.onbeforeunload = confirmExit;

function confirmExit()
{
	return "Attention! \n\nEn quittant cette page, tous les résultats de l'épreuve seront perdus.\n\nCliquez sur 'Annuler' pour reprendre l'exercice s'il n'est pas terminé.";
}

function back()
	{
		history.go(-1);
	}



