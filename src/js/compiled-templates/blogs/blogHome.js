define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("blogHome precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['blogHome'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"blogHome-page\">\n    <a href=\"#resume\">RESUME</a>\n    <ul>\n        <li>\n             Hi there. DO YOU KNOW THE BLOG\n        </li>\n        <li>\n             I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n        <li>\n            I am a blog entry\n        </li>\n\n    </ul>\n</div>";}); 
Handlebars.registerPartial("blogHome", templates["blogHome"]); 
return templates["blogHome"]; 
});