rpnsequence.log fait planter la console lorsque'elle est beaucoup utilisée. Préférer console.log et l'enlever après.

/*Il semble que pour les module 2 et 3 il y ait un probplème avec topRel et leftRel. C'est peut-être p.cont qui n'est pas le bon.
    "C'était ça. Problème résolu."*/
    
//Fait un _shuffle sur le datas.Problème résolu.

//Faire l'analyse des réponses avec les contenus au lieu des id des targets.Pour l'instantjen'arrive pas à récupérer le contenu des div (line 76) Résolu

/*Faire l'analyse dans score: on ne retrouve pas toujours les bon éléments avec l'id diContenuL ou R ne donne pas le bonne réponse.
IL faut encore repérer les beziers du bon module*/


/*Dans validate: module1 4 bezier, ok module 2 5bezier, 1 de trop et module 3 5 bezier, un de trop.
En mettant une condition if(exist), ça passe. Je ne sais pas trop ce que ça donne.Problème résolu.*/

Les formules mathjax ne fonctionnent pas toujours, en particulier à l'école et sur chrome/liux. Sur firefox/linux pas de problème.

//Finir state.

//Positionnement de nextmodule et end

//enlever les remarques

Dans opera, mycanvas est en dessous des listes on ne peut pas arriver avec les bezier sur les boutons radio.

//Faire l'analyse en tesant le contenu des div et en comparant avec les datas de sequ.json et non avec les contenu du DOM

//Dans validate, on va essayer de tout faitre en fonction de state.response

//Faire un state qui soit souvé avec les réponses choisies et que lorsqu'on recharge on puisse prendre le state qui avait été fait. et que les beziers reprennent la position antérieur basée sur le offset des boutons radio


//Prevoir la position des bezier lors des redimensionnement de la fenêtre avec un fonction .il faut voir ce que deviennent les positions des div apres un resize. les beziers de la page active sont ok, les beziers des modules cachés disparaissent

//resize, il faut utiliser chaque conteneurs pour les canvas et add. Chaque rpnmodule a son propre bezier. les points lors du resize ont un bug
ligne 255 il faut mettre au max 0.63 pour voir le bouton next module. on pourrait changer cette valeur si on a une petite fenêtre où de toute façon on doit utiliser 

l'ascenceur et la remetttre lorsqu'on agrandit la fenêtre. Chercher une fonction js qui indique si on est en mode pleine fenêtre. 


sta lorsque une poignée manque top of undefinded
jsplumb