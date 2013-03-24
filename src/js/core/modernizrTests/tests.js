define([
    'core/util/log',
    'core/device/DeviceInfo',
    'modernizer'
], function(log, deviceInfo, modernizr){
    log('modernizrTests module loaded.');

    /**
     * Possible solution for ios5+ scroll enhancements.
     */
    modernizr.addTest('enhancedscrolling', function(){
        log('enhancedscrolling test' + deviceInfo.browser);
        if( (deviceInfo.browser == 'android' && deviceInfo.compareOSVersions('4.0') >= 0) ||
            (deviceInfo.os == 'ios' && deviceInfo.compareOSVersions('5.0') >=0) ){
            log('enhanced scrolling enabled!');
            return true;
        }
        return false;
    });

    modernizr.addTest('gridspacingissue', function(){
        log('gridspacingissue test' + deviceInfo.browser);
        if( (deviceInfo.browser == 'Safari') ||
            (deviceInfo.os == 'ios') ){
            log('grid spacing issue!');
            return true;
        }
        return false;
    });

    return modernizr;
});