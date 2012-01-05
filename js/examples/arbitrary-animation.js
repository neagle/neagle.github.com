// jQuery's animate function is closely tied to CSS properties, at the moment.
// But by using a fake CSS property, you can provide a custom setting function
// using step.

// This example shows animating the text in a paragraph using a fake css property.

(function($) {
    
    $(function() {
        
        var $select = $( 'select.easing' );
        
        for ( func in $.easing ) {
            if ( func !== 'def' ) {
                $( '<option />', {
                    text: func,
                    val: func
                }).appendTo( $select );
            }
        }
        
            
        $( 'button.animate' ).bind( 'click', function() {
    
            var $p = $( 'p.animate' ),
                // Store the entire text of the paragraph
                text = $p.text(),
                length = text.length,
                $speed = $( 'input[type="number"].speed' );

            $p 
                .stop()
                .css({ 'fake-property': 0 })
                .animate({
                    // Animate the fake property from 0 to the length of the text
                    'fake-property': length 
                }, {
                    // Make the speed directly proportional to the length of the text
                    duration: $speed.val() * length,
                    easing: $select.val(),
                    step: function( i ) {
                        var i = Math.round( i );
                        
                        $p.html( text.substr( 0, i ) + '<span class="invisible">' + text.substring( i )  + '</span>' );
                    }
                });
    
        });
        
    });

})( jQuery );
