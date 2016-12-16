/**
 * ...
 * @author J-M.Luthi
 */
trace("etst ini")
import heureDecalage;
import menuDer;
//On crée un fond
this.createEmptyMovieClip("fondMc", 1);
//Sur le fond, on met un clip qui contiendra l'angle
fondMc.createEmptyMovieClip("angleMc", 0)

//Sur le fond, on met un clip qui contiendra l'angle
fondMc.createEmptyMovieClip("angleMc2", 1)

//Sur le fond, on met un clip qui contiendra les menus des destinations
fondMc.createEmptyMovieClip("menuMc1", 2)

//Sur le fond, on met un clip qui contiendra les menus des destinations
fondMc.createEmptyMovieClip("menuMc2", 3)

var posCentre:Array = new Array();
posCentre[0] = 300;
posCentre[1] = 200;

var posCentre2:Array = new Array();
posCentre2[0] = 500;
posCentre2[1] = 200;

//création aléatoire de l'heure:
var monHeure:Number=Math.round(Math.random()*23);
var maMinute:Number = Math.round(Math.random() * 59);
//monHeure = 0;

var mesDestinationsDep:Array = new Array("Genève", "Zürich", "Basel-Mulhouse", "Delhi", "Moscow", "New-York", "Sydney", "Tokyo", "Bangkok", "Mexico", "Papeete", 
"Montréal", "Johannesburg", "Wellington", "Vienna", "Roma" );
var mesDestinationsArr:Array = new Array("Genève", "Zürich", "Basel-Mulhouse", "Delhi", "Moscow", "New-York", "Sydney", "Tokyo", "Bangkok", "Mexico", "Papeete", 
"Montréal", "Johannesburg", "Wellington", "Vienna", "Roma" );
//décalage GMT
var decalage:Array = new Array([1, 0], [1, 0], [1, 0], [5, 30], [4, 0], [ -5, 0], [10, 0], [9, 0], [7, 0], [ -6, 0], [ -10, 0],
[ -5, 0], [2, 0], [12, 0], [1, 0], [1, 0] );

//Heure d'été [true/false, date de départ, date fin]
var hEte:Array = new Array([true], [], [], [false, 0, 0], [], [], [], [], [], [], [],
[], [], [], [], []);

//var monDep:Number = Math.floor(Math.random() * mesDestinationsDep.length);
monDep = 0;
var monArr:Number = Math.floor(Math.random() * mesDestinationsArr.length);
//Pour les tests, on met départ à Dehli et arrivée à Genève
//monDep = 3;
//monArr= 0
trace("monDep" + monDep)
trace("monArr"+monArr)
var compteur:Number = 0;
while(monArr == monDep && compteur <= 100) {
	trace("dans While")
	monArr = Math.floor(Math.random() * mesDesinationsArr.length);
	compteur++;
}

//temps de vol [ heures, minutes]
var tempsVol:Array = new Array(
[[0,0], [0,45], [3,23], [10,25], [3,45], [7,40], [28,57], [18,50], [20,40], [15,35], [28,25], [11,10], [19,20], [30,35], [1,40], [1,30]],
[[0,50], [0,0], [3,18], [14,55], [3,25], [8,55], [27,55], [14,20], [13,45], [19,25], [27,35], [13,5], [17,40], [33,45], [1,10], [1,35]],
[[3,33], [3,28], [0,0], [12,10], [7,45], [14,5], [27,40], [17,45], [17,0], [20,38], [27,5], [11,0], [15,30], [33,30], [4,25], [1,30]],
[[11,55], [16,25], [19,0], [0,0], [11,55], [15,30], [15,20], [7,55], [4,5], [24,50], [34,50], [20,2], [12,30], [21,55], [12,20], [12,45]],
[[3,45], [3,25], [6,15], [11,30], [0,0], [13,50], [20,40], [16,5], [16,55], [17,55], [23,50], [18,5], [19,5], [33,55], [2,45], [4,0]],
[[6,45], [7,40], [11,23], [18,5], [12,30], [0,0], [21,52], [14,10], [23,0], [7,35], [16,10], [5,16], [14,50], [24,30], [10,10], [10,20]],
[[16,55],[31,40],[35,25],[29,25],[23,25],[19,50],[0,0],[9,50],[9,10],[23,8],[32,25],[20,19],[29,40],[3,10],[27,20],[22,45]],
[[23,0], [15,30], [23,10], [10,30], [20,5], [12,30], [9,35], [0,0], [10,30], [12,55], [23,20], [15,10], [20,20], [15,50], [1,55], [12,50]],
[[16,30], [15,30], [16,55], [4,15], [15,15], [19,50], [9,15], [8,55], [0,0], [20,40], [29,0], [24,25], [11,15], [14,40], [11,30], [15,15]],
[[13,20], [14,45], [12,58], [24,55], [17,0], [7,25], [23,31], [17,25], [23,15], [0,0], [17,30], [5,5], [22,35], [29,50], [13,15], [13,35]],
[[31,10], [33,25], [36,45], [36,20], [27,15], [16,59], [22,20], [25,15], [31,0], [16,40], [0,0], [18,20], [45,05], [37,10], [27,25], [29,10]],
[[8,55], [13,0], [9,23], [29,40], [12,10], [4,25], [20,19], [16,25], [21,10], [5,55], [18,15], [0,0], [18,25], [36,25], [10,0], [9,55]],
[[18,45], [18,5], [14,45], [15,20], [14,40], [16,20], [23,40], [18,40], [14,25], [24,25], [44,25], [20,50], [0,0], [18,25], [13,45], [14,5]],
[[38,55], [41,15], [40,55], [27,15], [32,0], [27,55], [3,40], [28,55], [14,55], [21,3], [7,50], [29,30], [19,55], [0,0], [33,10], [33,25]],
[[1,40], [1,15], [5,15], [14,50], [2,35], [11,35], [25,45], [11,15], [9,45], [14,45], [28,25], [10,50], [13,10], [28,10], [0,0], [1,25]],
[[1,34], [1,40], [1,45], [12,0], [3,55], [11,35], [21,55], [15,40], [12,50], [15,45], [28,50], [10,45], [13,25], [30,50], [1,25], [0,0]]
);

trace("tirage"+_global.tirage)
var maMontre:MovieClip = new heureDecalage(posCentre[0], posCentre[1], fondMc.angleMc, texteValeurH_fmt, texteValeurM_fmt, texteValeurTxt_fmt, texteSolution_fmt, dateMontre_fmt, [450, 360]);

maMontre.setTailleMontre(200);
//trace("maMontre")
//maMontre.setTime(decalage[0][0], decalage[0][1]);


//var maMontre2:MovieClip = new heureDAvion(posCentre2[0], posCentre2[1], fondMc.angleMc2, texteValeurH_fmt, texteValeurM_fmt, texteValeurTxt_fmt, texteSolution_fmt, dateMontre_fmt, [450, 360]);
maMontre2.heureATrouver=monHeureReelle;
maMontre2.minuteATrouver = maMinute;
maMontre2.setTailleMontre(200);
//trace("maMOntre2")
//maMontre2.setTime(decalage[0][0], decalage[0][1]);

var textMenuDefaut1:String = "Choisir départ";
var textMenuDefaut2:String = "Choisir arrivée";



//var monMenu1:menuDer = new menuDer(mesDestinationsDep, textMenuDefaut1, fondMc.menuMc1, texteMenu_fmt, 0xaabbcc, 0x678901);
monMenu1.setPosition(posCentre[0]-(monMenu1.maLargeur+monMenu1.maHauteur)/2, 70);
var positionMenu1X:Number = posCentre[0] - (monMenu1.maLargeur + monMenu1.maHauteur) / 2;

//var monMenu2:menuDer = new menuDer(mesDestinationsArr, textMenuDefaut2, fondMc.menuMc2, texteMenu_fmt, 0xaabbcc, 0x678901);
monMenu2.setPosition(posCentre2[0] - (monMenu2.maLargeur + monMenu2.maHauteur) / 2, 70);
var positionMenu2X:Number = posCentre2[0] - (monMenu2.maLargeur + monMenu2.maHauteur) / 2;



//fondMc.createTextField("depart", 4, posCentre[0] - 25-(monMenu1.maLargeur + monMenu1.maHauteur) / 2, 50, 80, 20 );
fondMc.depart.selectable = false;
fondMc.depart.background = false;
fondMc.depart.backgroundcolor = 0xffffff;
fondMc.depart.setNewTextFormat(texteDonneeC_fmt);
fondMc.depart.text = "Départ à:";

//fondMc.createTextField("departTimeH", 5, posCentre[0], 50, 100, 20 );
fondMc.departTimeH.selectable = false;
fondMc.departTimeH.background = false;
fondMc.departTimeH.backgroundcolor = 0xffffff;
fondMc.departTimeH.setNewTextFormat(texteDonneeC_fmt);
fondMc.departTimeH.text = monHeure +"h " + maMinute +"min";
//trace("monHeure" + monHeure)
//trace("maMinute"+maMinute)

//fondMc.createTextField("departLieu", 6, posCentre[0] - 25-(monMenu1.maLargeur + monMenu1.maHauteur) / 2, 70, 25, 20 );
fondMc.departLieu.selectable = false;
fondMc.departLieu.background = false;
fondMc.departLieu.backgroundcolor = 0xffffff;
fondMc.departLieu.setNewTextFormat(texteDonneeC_fmt);
fondMc.departLieu.text = "De:";



fondMc.createTextField("arrivee", 7, 300, 50, 100, 20 );
fondMc.arrivee.selectable = false;
fondMc.arrivee.background = false;
fondMc.arrivee.backgroundcolor = 0xffffff;
fondMc.arrivee.setNewTextFormat(texteDonneeC_fmt);
fondMc.arrivee.text = "Il est :";

fondMc.createTextField("arriveeLieu", 8, 300, 70, 200, 20 );
fondMc.arriveeLieu.selectable = false;
fondMc.arriveeLieu.background = false;
fondMc.arriveeLieu.backgroundcolor = 0xffffff;
fondMc.arriveeLieu.setNewTextFormat(texteDonneeC_fmt);
fondMc.arriveeLieu.text = "A: " + mesDestinationsArr[monArr];

fondMc.createTextField("reponseH", 9, 355, 50, 30, 20 );
fondMc.reponseH.selectable = true;
fondMc.reponseH.background = true;
fondMc.reponseH.backgroundcolor = 0xffffff;
fondMc.reponseH.border = true;
fondMc.reponseH.type = "input";
fondMc.reponseH.maxChars = 2;
fondMc.reponseH.borderColor = 0x660000;
fondMc.reponseH.setNewTextFormat(textereponse_fmt);

fondMc.createTextField("repH", 10, 385, 50, 15, 20 );
fondMc.repH.selectable = false;
fondMc.repH.background = false;
fondMc.repH.backgroundcolor = 0xffffff;
fondMc.repH.setNewTextFormat(texteDonneeC_fmt);
fondMc.repH.text = "h";

fondMc.createTextField("reponseM", 11, 400, 50, 35, 20 );
fondMc.reponseM.selectable = true;
fondMc.reponseM.background = true;
fondMc.reponseM.backgroundcolor = 0xffffff;
fondMc.reponseM.border = true;
fondMc.reponseM.type = "input";
fondMc.reponseM.maxChars = 2;
fondMc.reponseM.borderColor = 0x660000;
fondMc.reponseM.setNewTextFormat(textereponse_fmt);

fondMc.createTextField("repM", 12, 435, 50, 100, 20 );
fondMc.repM.selectable = false;
fondMc.repM.background = false;
fondMc.repM.backgroundcolor = 0xffffff;
fondMc.repM.setNewTextFormat(texteDonneeC_fmt);
fondMc.repM.text = "min";

fondMc.createTextField("decalageHoraire", 13, 300, 15, 200, 20 );
fondMc.decalageHoraire.selectable = false;
fondMc.decalageHoraire.background = false;
fondMc.decalageHoraire.backgroundcolor = 0xffffff;
fondMc.decalageHoraire.setNewTextFormat(texteDonneeC_fmt);

//fondMc.createTextField("tempsDeVol", 14, 60+(posCentre2[0]-posCentre[0])/2, 115, 200, 20 );
fondMc.tempsDeVol.selectable = false;
fondMc.tempsDeVol.background = false;
fondMc.tempsDeVol.backgroundcolor = 0xffffff;
fondMc.tempsDeVol.setNewTextFormat(texteDonneeC_fmt);

//fondMc.createTextField("donnee1", 15, 0, 0, 500, 20 );
fondMc.donnee1.selectable = false;
fondMc.donnee1.background = false;
fondMc.donnee1.backgroundcolor = 0xffffff;
fondMc.donnee1.setNewTextFormat(texteDonneeC_fmt);
fondMc.donnee1.text = "Le vol part de " + mesDestinationsDep[monDep] + " pour aller à " + mesDestinationsArr[monArr];

fondMc.createTextField("donnee2", 16, 10, 15, 500, 20 );
fondMc.donnee2.selectable = false;
fondMc.donnee2.background = false;
fondMc.donnee2.backgroundcolor = 0xffffff;
fondMc.donnee2.setNewTextFormat(texteDonneeC_fmt);
fondMc.donnee2.text = "Quelle heure est-il à " +mesDestinationsArr[monArr] + "  ?";

fondMc.createTextField("donnee3", 18, 10, 35, 500, 20 );
fondMc.donnee3.selectable = false;
fondMc.donnee3.background = false;
fondMc.donnee3.backgroundcolor = 0xffffff;
fondMc.donnee3.setNewTextFormat(texteDonneeC_fmt);
fondMc.donnee3.text = "Ici, il est "+maMontre.heures +"h "+maMontre.minutes+"min.";

fondMc.createTextField("felicitation", 17, 100, 150, 400, 60 );
fondMc.felicitation.selectable = false;
fondMc.felicitation.background = false;
fondMc.felicitation.backgroundcolor = 0xffffff;
fondMc.felicitation.setNewTextFormat(felicitations_fmt);
fondMc.felicitation.text = "BRAVO!";
fondMc.felicitation._visible = false;


this.onEnterFrame = function() {
	//ON met dans rep_juste le résultat de l'analyse'
	_level0.rep_juste = maMontre.reponse;
	_level0.retour = maMontre.message;

}

stop();