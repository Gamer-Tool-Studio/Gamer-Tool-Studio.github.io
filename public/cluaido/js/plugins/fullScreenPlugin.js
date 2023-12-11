(function() {
    'use strict';

    Graphics._stretchHeight = function() {
        if (Utils.isMobileDevice()) {
            // Adjust for any additional elements or margins
            const additionalHeight =0; // Change this value as needed
            return window.innerHeight - additionalHeight;
        } else {
            return window.innerHeight;
        }
    };
})();
