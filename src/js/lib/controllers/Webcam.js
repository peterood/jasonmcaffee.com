define([
    'core/core',
    'lib/views/WebcamView'
], function(core, WebcamView){
    core.log('webcam controller module loaded');

    var Controller = core.mvc.Controller.extend({
        action:function(controllerName, actionName){
            core.log('webcam action');

            this.view = new WebcamView({model:new core.mvc.Model({
                recentlyUploadedImages:viewModel.recentlyUploadedImagePaths //global viewModel will be populated initially by server.
            })});
            this.view.render();

            core.ui.transitionPage(this.view);
        }
    });

    return new Controller();//singleton
});