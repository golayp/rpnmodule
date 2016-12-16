/*
	author Luthi J-M
*/

//Format Texte pour contenu du commentaire
texteCommentaire_fmt = new TextFormat();
texteCommentaire_fmt.font = "Arial";
texteCommentaire_fmt.size = "12";
texteCommentaire_fmt.align = "center";
texteCommentaire_fmt.color = "0x000000";

//Format Texte pour contenu du nom
texteNom_fmt = new TextFormat();
texteNom_fmt.font = "Arial";
texteNom_fmt.size = "16";
texteNom_fmt.align = "center";
texteNom_fmt.color = "0x000000";

//Format Texte pour la valeur de l'unité
texteValUnite_fmt = new TextFormat();
texteValUnite_fmt.font = "Arial";
texteValUnite_fmt.size = "16";
texteValUnite_fmt.align = "right";
texteValUnite_fmt.color = "0x555555";
texteValUnite_fmt.bold = true;
texteValUnite_fmt.italic = true;


//Format Texte pour le nom de l'unité
texteNomUnite_fmt = new TextFormat();
texteNomUnite_fmt.font = "Arial";
texteNomUnite_fmt.size = "16";
texteNomUnite_fmt.align = "right";
texteNomUnite_fmt.color = "0x000000";

//Format Texte pour l'exposant l'unité
texteExposantUnite_fmt = new TextFormat();
texteExposantUnite_fmt.font = "Arial";
texteExposantUnite_fmt.size = texteNomUnite_fmt.size*2/3;
texteExposantUnite_fmt.align = "left";
texteExposantUnite_fmt.color = "0x000000";

//Format Texte pour l'info
texteInfo_fmt = new TextFormat();
texteInfo_fmt.font = "Arial";
texteInfo_fmt.size = "12";
texteInfo_fmt.align = "left";
texteInfo_fmt.color = "0x0000ff";

//Format Texte pour l'avertissement
texteATT_fmt = new TextFormat();
texteATT_fmt.font = "Arial";
texteATT_fmt.size = "14";
texteATT_fmt.align = "left";
texteATT_fmt.bold = true;
texteATT_fmt.color = "0xff0000";

//Format des messages de réponses justes dans la bulle
justeBulle_fmt = new TextFormat();
//justeBulle_fmt.font = "Police_1";
justeBulle_fmt.font = "Arial";
justeBulle_fmt.color="0xFFFFFF";
justeBulle_fmt.size="14";
justeBulle_fmt.bold=true;
justeBulle_fmt.align = "center";