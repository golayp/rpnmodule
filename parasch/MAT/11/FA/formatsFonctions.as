/**
 * ...
 * @author Luthi J-M
 */

//################################################### DEBUT ZONE FORMATS ##########################################
//Format des explications survol
_level0.survol_fmt = new TextFormat();
_level0.survol_fmt.font = "Arial";
_level0.survol_fmt.size = "12";
_level0.survol_fmt.bold = true;
_level0.survol_fmt.align = "left";
_level0.survol_fmt.color = "0xff0000";

//Format des nombres sur graduation
_level0.formatTxtGrad = new TextFormat();
_level0.formatTxtGrad.font = "Arial";
_level0.formatTxtGrad.size = "10";
_level0.formatTxtGrad.align = "center";
_level0.formatTxtGrad.color = 0x666666;

//Format de l'expression fonctionnelle
_level0.express_fmt= new TextFormat();
_level0.express_fmt.font = "Arial";
_level0.express_fmt.color="0x000000";
_level0.express_fmt.size="14";
_level0.express_fmt.bold=true;
_level0.express_fmt.align="right";

//Format des entêtes du tableau de valeurs
_level0.entete_fmt = new TextFormat();
_level0.entete_fmt.font = "Arial";
_level0.entete_fmt.color="0x000000";
_level0.entete_fmt.size="12";
_level0.entete_fmt.bold=true;
_level0.entete_fmt.align="center";

//Format des machines
_level0.machine_fmt = new TextFormat();
_level0.machine_fmt.font = "Arial";
_level0.machine_fmt.color="0x111111";
_level0.machine_fmt.size="12";
_level0.machine_fmt.bold=true;
_level0.machine_fmt.align="center";

//Format des constantes
_level0.constant_fmt = new TextFormat();
_level0.constant_fmt.font = "Arial";
_level0.constant_fmt.color="0xff0000";
_level0.constant_fmt.size="12";
_level0.constant_fmt.bold=true;
_level0.constant_fmt.align="center";

//Format des messages d'erreurs
_level0.erreur_fmt = new TextFormat();
_level0.erreur_fmt.font = "Arial";
_level0.erreur_fmt.color="0xff0000";
_level0.erreur_fmt.size="12";
_level0.erreur_fmt.bold=true;

//Format des messages de réponses justes
_level0.juste_fmt = new TextFormat();
_level0.juste_fmt.font = "Arial";
_level0.juste_fmt.color="0x00CC00";
_level0.juste_fmt.size="12";
_level0.juste_fmt.bold=true;

//Format du texte absc
_level0.absc_fmt=new TextFormat();
_level0.absc_fmt.font = "Arial";
_level0.absc_fmt.size = "12";
_level0.absc_fmt.color = "0x821453";
_level0.absc_fmt.align="center";
_level0.absc_fmt.bold=true;

//Format du texte absc_petit
_level0.absc_p_fmt=new TextFormat();
_level0.absc_p_fmt.font = "Arial";
_level0.absc_p_fmt.size = "10";
_level0.absc_p_fmt.color = "0x821453";
_level0.absc_p_fmt.align="left";
_level0.absc_p_fmt.bold=true;

//Format du texte absc_petit_axe
_level0.absc_pa_fmt=new TextFormat();
_level0.absc_pa_fmt.font = "Arial";
_level0.absc_pa_fmt.size = "10";
_level0.absc_pa_fmt.color = "0x821453";
_level0.absc_pa_fmt.align="right";
_level0.absc_pa_fmt.bold=true;

//Format du texte ord
_level0.ordo_fmt=new TextFormat();
_level0.ordo_fmt.font = "Arial";
_level0.ordo_fmt.size = "12";
_level0.ordo_fmt.color = "0x095228";
_level0.ordo_fmt.align="left";
_level0.ordo_fmt.bold = true;

//Format du texte ord text
_level0.ordoT_fmt=new TextFormat();
_level0.ordoT_fmt.font = "Arial";
_level0.ordoT_fmt.size = "12";
_level0.ordoT_fmt.color = "0x095228";
_level0.ordoT_fmt.align="center";
_level0.ordoT_fmt.bold=true;

//Format du texte ord_petit
_level0.ordo_p_fmt=new TextFormat();
_level0.ordo_p_fmt.font = "Arial";
_level0.ordo_p_fmt.size = "10";
_level0.ordo_p_fmt.color = "0x095228";
_level0.ordo_p_fmt.align="left";
_level0.ordo_p_fmt.bold=true;

//Format du texte ord_petit_axes
_level0.ordo_pa_fmt=new TextFormat();
_level0.ordo_pa_fmt.font = "Arial";
_level0.ordo_pa_fmt.size = "10";
_level0.ordo_pa_fmt.color = "0x095228";
_level0.ordo_pa_fmt.align="left";
_level0.ordo_pa_fmt.bold=true;

//Format de b
_level0.b_fmt = new TextFormat();
_level0.b_fmt.font = "Arial";
_level0.b_fmt.size = "10";
_level0.b_fmt.bold = true;
_level0.b_fmt.align = "left";
_level0.b_fmt.color = "0x00ff";

//Format du texte ligne horizontale
_level0.absc_l_fmt=new TextFormat();
_level0.absc_l_fmt.font = "Arial";
_level0.absc_l_fmt.size = "10";
_level0.absc_l_fmt.color = "0x821453";
_level0.absc_l_fmt.align="left";
_level0.absc_l_fmt.bold=true;

//Format du texte ligne verticale droite
_level0.ordo_l_fmt=new TextFormat();
_level0.ordo_l_fmt.font = "Arial";
_level0.ordo_l_fmt.size = "10";
_level0.ordo_l_fmt.color = "0x095228";
_level0.ordo_l_fmt.align="left";
_level0.ordo_l_fmt.bold=true;

//Format du texte ligne verticale gauche
_level0.ordo_r_fmt=new TextFormat();
_level0.ordo_r_fmt.font = "Arial";
_level0.ordo_r_fmt.size = "10";
_level0.ordo_r_fmt.color = "0x095228";
_level0.ordo_r_fmt.align="right";
_level0.ordo_r_fmt.bold = true;

//Format de l'expression fonctionnelle
_level0.expr_fmt = new TextFormat();
_level0.expr_fmt.font = "Arial";
_level0.expr_fmt.color="0x111111";
_level0.expr_fmt.size="16";
_level0.expr_fmt.bold=true;
_level0.expr_fmt.align="center";

//Format des coefficients de l'expression fonctionnelle
_level0.expr_ab_fmt = new TextFormat();
_level0.expr_ab_fmt.font = "Arial";
_level0.expr_ab_fmt.color="0x111111";
_level0.expr_ab_fmt.size="14";
_level0.expr_ab_fmt.bold=true;
_level0.expr_ab_fmt.align="center";

//Format des coefficients de l'expression fonctionnelle erreur
_level0.expr_ab_err_fmt = new TextFormat();
_level0.expr_ab_err_fmt.font = "Arial";
_level0.expr_ab_err_fmt.color="0xff0000";
_level0.expr_ab_err_fmt.size="14";
_level0.expr_ab_err_fmt.bold=true;
_level0.expr_ab_err_fmt.align="center";

//Format de l'expression fonctionnelle erreur
_level0.expr_err_fmt = new TextFormat();
_level0.expr_err_fmt.font = "Arial";
_level0.expr_err_fmt.color="0xff0000";
_level0.expr_err_fmt.size="16";
_level0.expr_err_fmt.bold=true;
_level0.expr_err_fmt.align="center";


//Format de l'expression fonctionnelle y
_level0.expry_fmt = new TextFormat();
_level0.expry_fmt.font = "Arial";
_level0.expry_fmt.color="0x095228";
_level0.expry_fmt.size="16";
_level0.expry_fmt.bold=true;
_level0.expry_fmt.align="center";