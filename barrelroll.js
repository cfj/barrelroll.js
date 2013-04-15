/*!
 * barrelroll.js
 * http://www.svarden.se/demo/barrelroll
 * MIT licensed
 *
 * Copyright (C) 2013 Jonathan Svärdén, http://svarden.se
 */
;(function(){
    'use strict';

        // The sequence of keypresses that create the word "barrelroll"
    var barrelroll = "66,65,82,82,69,76,82,79,76,76",

        // Vendor animation names
        animPrefixes = ['webkitAnimation', 'MozAnimation', 'OAnimation', 'MSAnimation', 'animation'],

        // The base, unprefixed keyframe rule
        cssBase = "@keyframes barrelroll {100%{transform: rotateZ(360deg);}}";


    // Returns the first supported property in the provided array
    function getSupportedProperty( propertyList ){
        var i,
            temp = document.createElement( 'div' );

        for( i = 0; i < propertyList.length; i += 1){
            if( temp.style[propertyList[i]] !== undefined ){
                return propertyList[i];
            }
        }
    }

    // Add vendor prefixes to the base CSS
    function prefixKeyframes( vendor, css ){
        var vendorCSS = '';

        if( vendor === 'webkitAnimation' ){
            vendorCSS = css.replace( '@keyframes', '@-webkit-keyframes' ).replace( 'transform', '-webkit-transform' );
        }else if( vendor === 'MozAnimation' ){
            vendorCSS = css.replace( '@keyframes', '@-moz-keyframes' ).replace( 'transform', '-moz-transform' );
        }else if( vendor === 'MSAnimation' ){
            vendorCSS = css.replace( '@keyframes', '@-ms-keyframes' ).replace( 'transform', '-ms-transform' );
        }else if( vendor === 'OAnimation' ){
            vendorCSS = css.replace( '@keyframes', '@-o-keyframes' ).replace( 'transform', '-o-transform' );
        }else{
            return css;
        }

        return vendorCSS;
    }

    // Create a style element and put the CSS in there before adding it to the head
    function injectCSS(css){
        var styleEl = document.createElement( 'style' );
        
        styleEl.type = 'text/css';
        styleEl.appendChild( document.createTextNode( css ) );
        document.getElementsByTagName( 'head' )[0].appendChild( styleEl );
    }

    function init(){
        var keys = [],
            body = document.body,
            animationPrefix = getSupportedProperty( animPrefixes ),
            animationName = animationPrefix + 'Name',
            animationEnd = ( animationPrefix + "End" ).replace(/^ms/, "MS").replace( /^Webkit/, "webkit" ).replace( /^Moz.*/, "animationend" ).replace( /^animationEnd$/, "animationend" );

        injectCSS( prefixKeyframes(getSupportedProperty( animPrefixes ), cssBase ) );

        body.style[animationPrefix + 'Duration'] = "2s";

        document.addEventListener( "keydown", function(event){
            
            keys.push(event.keyCode);

            if( keys.length > 10 ){
                keys.shift( -1 );
            }

            if( keys.toString() === barrelroll ){
                body.style[animationName] = 'barrelroll';
            }

        }, false );

        // Remove the animation name when the animation has finished so that we can barrelroll again and again!
        document.addEventListener( animationEnd, function(){
            body.style[animationName] = '';
        }, false );
    }

    init();

}());
