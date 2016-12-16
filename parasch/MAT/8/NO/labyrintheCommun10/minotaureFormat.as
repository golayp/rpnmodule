/**
 * ...
 * @author Michel Roquier
 */

//Format Texte de base HAUT, contenu de la case
texteHaut_fmt = new TextFormat();
texteHaut_fmt.font = "Arial";
texteHaut_fmt.size = "12";
texteHaut_fmt.align = "center";
texteHaut_fmt.color = "0x000000";

//Format Texte du contenu de la fenêtre d'explication
texteFenetre_fmt = new TextFormat();
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

//Format Texte de base en ITALIQUE, contenu de la case
texteHautItalique_fmt = new TextFormat();
texteHautItalique_fmt.font = texteHaut_fmt.font;
texteHautItalique_fmt.size = texteHaut_fmt.size;
texteHautItalique_fmt.italic = true;
texteHautItalique_fmt.align = texteHaut_fmt.align;
texteHautItalique_fmt.color = texteHaut_fmt.color;



//Format Texte de base BAS, contenu de la case
texteBas_fmt = new TextFormat();
texteBas_fmt.font = "Arial";
texteBas_fmt.size = "16";
texteBas_fmt.align = "center";
texteBas_fmt.color = "0x000000";

//Format Texte de base en GRAS, contenu de la case
texteBasGras_fmt = new TextFormat();
texteBasGras_fmt.font = texteBas_fmt.font;
texteBasGras_fmt.size = texteBas_fmt.size;
texteBasGras_fmt.bold = true;
texteBasGras_fmt.align = texteBas_fmt.align;
texteBasGras_fmt.color = texteBas_fmt.color;

//Format Texte de base en ITALIQUE, contenu de la case
texteBasItalique_fmt = new TextFormat();
texteBasItalique_fmt.font = texteBas_fmt.font;
texteBasItalique_fmt.size = texteBas_fmt.size;
texteBasItalique_fmt.italic = true;
texteBasItalique_fmt.align = texteBas_fmt.align;
texteBasItalique_fmt.color = texteBas_fmt.color;

//Format des messages de réponses justes dans la bulle
justeBulle_fmt = new TextFormat();
justeBulle_fmt.font = "Arial";
justeBulle_fmt.color="0xFFFFFF";
justeBulle_fmt.size="14";
justeBulle_fmt.bold=true;
justeBulle_fmt.align="center";

//Format des messages d'erreurs dans la bulle
erreurBulle_fmt = new TextFormat();
erreurBulle_fmt.font = "Arial";
erreurBulle_fmt.color="0xffffff";
erreurBulle_fmt.size="14";
erreurBulle_fmt.bold=true;
erreurBulle_fmt.align = "center";
