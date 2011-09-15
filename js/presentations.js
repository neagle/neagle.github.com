(function( $ ) {

    $(function() {
        var $body = $( 'body' ),
            $presentation = $( '#presentation' ),
            $slides = $presentation.children( 'section' ),
            move = function( direction ) {
                var direction = direction || 'forward';

                if ( direction === 'forward' ) {
                    var $active = $( '.active' );            
                        $unrevealed = $active.find( '.step:not(".revealed")' );

                    if ( $unrevealed.length ) {
                        $unrevealed.first().addClass( 'revealed' );
                    } else {
                        if ( $active.next( 'section' ).length ) {
                            $active.removeClass( 'active' ).addClass( 'remove' ).next( 'section' ).addClass( 'active' );
                        }
                    }
                }

                if ( direction === 'backward' ) {
                    var $active = $( '.active' );            
                        $revealed = $active.find( '.step.revealed' );

                    if ( $revealed.length ) {
                        $revealed.last().removeClass( 'revealed' );
                    } else {
                        if ( $active.prev( 'section' ).length ) {
                            $active.removeClass( 'active' ).prev( 'section' ).removeClass( 'remove' ).addClass( 'active' );
                        }
                    }
                }
            };

        $slides.first().addClass( 'active' );

        $body.bind( 'keyup', function( event ) {
            var key = event.keyCode;

            if ( key === 37 ) {
                move( 'backward' );
            } else if ( key === 39 ) {
                move( 'forward' );
            }
        });

    });

})( jQuery );
