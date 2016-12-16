/**
 * ...
 * @author Michel Roquier
 */

//Format Texte de pour oneText, contenu de la case
oneText_fmt = new TextFormat();
//oneText_fmt.font = "Police_1";
oneText_fmt.font = "Arial";
oneText_fmt.size = "15";
//oneText_fmt.bold = true;
oneText_fmt.align = "center";
oneText_fmt.color = "0x000000";

 //Format Texte de base pour entree et sortie, contenu de la case
texteES_fmt = new TextFormat();
//texteES_fmt.font = "Police_1";
texteES_fmt.font = "Arial";
texteES_fmt.size = "16";
texteES_fmt.align = "center";
texteES_fmt.color = "0x000000";


//Format Texte de base pour entree et sortie, contenu de la case en gras
texteESG_fmt = new TextFormat();
//texteESG_fmt.font = "Police_1";
texteESG_fmt.font = "Arial";
texteESG_fmt.size = texteES_fmt.size;
texteESG_fmt.align = "center";
texteESG_fmt.color = "0x000000";
texteESG_fmt.bold = true;


//Format Texte de base HAUT, contenu de la case
texteHaut_fmt = new TextFormat();
//texteHaut_fmt.font = "Police_2";
texteHaut_fmt.font = "Arial Narrow";
texteHaut_fmt.size = "12";
texteHaut_fmt.align = "center";
texteHaut_fmt.color = "0x000000";


//Format Texte petit HAUT, contenu de la case
texteHautpetit_fmt = new TextFormat();
//texteHautpetit_fmt.font = "Police_1";
texteHautpetit_fmt.font = "Arial Narrow";
texteHautpetit_fmt.size = "11";
texteHautpetit_fmt.align = "left";
texteHautpetit_fmt.color = "0x000000";


//Format Texte du contenu de la fenêtre d'explication
texteFenetre_fmt = new TextFormat();
//texteFenetre_fmt.font = "Police_1";
texteFenetre_fmt.font = "Arial";
texteFenetre_fmt.size = "14";
texteFenetre_fmt.align = "left";
texteFenetre_fmt.color = "0x000000";

//Format Texte du contenu de la fenêtre d'explication en GRAS
texteFenetreGras_fmt = new TextFormat();
texteFenetreGras_fmt.font = texteFenetre_fmt.font;
texteFenetreGras_fmt.size = texteFenetre_fmt.size;
texteFenetreGras_fmt.bold = true;
texteFenetreGras_fmt.align = "left";
texteFenetreGras_fmt.color = "0x000000";

//Format Texte survol boutons
bouton_fmt = new TextFormat();
//bouton_fmt.font = "Police_1";
bouton_fmt.font = "Arial";
bouton_fmt.size = "12";
bouton_fmt.bold = true;
bouton_fmt.align = "left";
bouton_fmt.color = "0xFF00FF";

//Format Texte de base en GRAS, contenu de la case
texteHautGras_fmt = new TextFormat();
texteHautGras_fmt.font = texteHaut_fmt.font;
texteHautGras_fmt.size = texteHaut_fmt.size;
texteHautGras_fmt.bold = true;
texteHautGras_fmt.align = texteHaut_fmt.align;
texteHautGras_fmt.color = texteHaut_fmt.color;
texteHautGras_fmtsize = "12";

//Format Texte survol boutons
bouton_fmt = new TextFormat();
//bouton_fmt.font = "Police_1";
bouton_fmt.font = "Arial";
bouton_fmt.size = "12";
bouton_fmt.bold = true;
bouton_fmt.align = "left";
bouton_fmt.color = "0xFF00FF";

//Format Texte de base BAS, contenu de la case
texteBas_fmt = new TextFormat();
//texteBas_fmt.font = "Police_2";
texteBas_fmt.font = "Arial Narrow";
texteBas_fmt.size = "12";
texteBas_fmt.align = "center";
texteBas_fmt.color = "0x000000";

//Format Texte petit HAUT, contenu de la case
texteBaspetit_fmt = new TextFormat();
//texteBaspetit_fmt.font = "Police_1";
texteBaspetit_fmt.font = "Arial Narrow";
texteBaspetit_fmt.size = "11";
texteBaspetit_fmt.align = "left";
texteBaspetit_fmt.color = "0x000000";

//Format Texte de base en GRAS, contenu de la case
texteBasGras_fmt = new TextFormat();
texteBasGras_fmt.font = texteBas_fmt.font;
texteBasGras_fmt.size = texteBas_fmt.size;
texteBasGras_fmt.bold = true;
texteBasGras_fmt.align = texteBas_fmt.align;
texteBasGras_fmt.color = texteBas_fmt.color;
//texteBasGras_fmt.size = "12";

//Format Texte de base en ITALIQUE, contenu de la case
texteHautItalique_fmt = new TextFormat();
texteHautItalique_fmt.font = texteHaut_fmt.font;
texteHautItalique_fmt.size = texteHaut_fmt.size;
texteHautItalique_fmt.italic = true;
texteHautItalique_fmt.align = texteHaut_fmt.align;
texteHautItalique_fmt.color = texteHaut_fmt.color;
//texteHautGras_fmt.size = "12";

//Format des messages de réponses justes dans la bulle
justeBulle_fmt = new TextFormat();
//justeBulle_fmt.font = "Police_1";
justeBulle_fmt.font = "Arial";
justeBulle_fmt.color="0xFFFFFF";
justeBulle_fmt.size="14";
justeBulle_fmt.bold=true;
justeBulle_fmt.align="center";

//Format des messages d'erreurs dans la bulle
erreurBulle_fmt = new TextFormat();
//erreurBulle_fmt.font = "Police_1";
erreurBulle_fmt.font = "Arial";
erreurBulle_fmt.color="0xffffff";
erreurBulle_fmt.size="14";
erreurBulle_fmt.bold=true;
erreurBulle_fmt.align = "center";
