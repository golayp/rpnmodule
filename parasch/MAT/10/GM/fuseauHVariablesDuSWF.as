/**
 * ...
 * @author Jean-Michel LUTHI
 */
 trace ("Ouverture de variables");
//On enregiste la base du clip
var o:MovieClip = this;
//On règle la largeur de la bulle info lorsqu'on survole un pays
var largeurInfo:Number = 200;
//On règle la largeur de la bulle info lorsqu'on survole un pays
var hauteurInfo:Number = 100;
//On repère la largeur du clip de base
var largeurBase:Number = this._width;
trace("largeurBase"+largeurBase)
//On repère la hauteur du clip de base
var hauteurBase:Number = this._height;
trace("hauteurBase" + hauteurBase)
//On crée unvariable qui contiendra la profondeur du clip survolé avant qu'il soit échangé avec le clip située au dessus de tout
//
var clipChange:MovieClip=new MovieClip;
//On crée le champtexte de la donnée
//
var consigne:String="";
//On règle la taille de la montre
//
var tailleMontre:Number=-1;
//position de la montre
var posCentre:Array = new Array();
//noMath de la ville à trouver avec son décalage
var ville:Array=new Array();
//_level0.liste de tous les clips de pays
var monPays:Array = new Array();
//le message en fonction du résultat
//var _level0.message:String;
//valeur qui indique quel indice a été utilisé
var indiceUtilise:Number = 0;
//nombres d'indices utilisés
var nbIndices:Number = 0;
//Variable qui donnent la largeur du clip
//
var largeurClip:Number=0;
//Variable qui donnent la hauteur du clip
//
var hauteurClip:Number = 0;
//on initialise rep_juste
_level0.rep_juste = false;