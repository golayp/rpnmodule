/**
 * ...
 * @author Antoine AGTHE
 */
class Main {

    public static function main( swfRoot : MovieClip ) : Void {
        var mc_container : MovieClip = swfRoot.createEmptyMovieClip( "mc_container", 1 );
        swfRoot.createTextField( "txtf", 2, 0, 0, 300, 300 );

        var img : MovieClip = mc_container.createEmptyMovieClip( "img", 1 );
        img.loadMovie( "../images/Koala.jpg" );

        mc_container.onEnterFrame = function() {
            if ( img.getBytesTotal() != 0 ) {
                if( img.getBytesLoaded() == img.getBytesTotal() ) {
                    swfRoot[ "txtf" ].text += "[Image chargée (" + img.getBytesTotal() + ")]";
                    mc_container._width = 256;
                    mc_container._height = 256;
                    delete mc_container.onEnterFrame;
                }
            }
        };






    }

    public function Main() {
        //
    }
}