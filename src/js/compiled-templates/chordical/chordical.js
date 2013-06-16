define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("chordical precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['chordical'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", foundHelper, self=this;


  buffer += "<div id=\"chordical-page\">\n    <h1>Chordical </h1>\n\n    <div class=\"menu\">\n        <div class=\"link\"><a href=\"#chordical/edit\">edit</a></div><!--\n        --><div class=\"link\"><a href=\"#chordical/instrument\">instrument</a></div>\n    </div>\n\n\n    ";
  buffer += "\n    <div id=\"keyboardContainer\">\n    </div>\n\n\n</div>";
  return buffer;}); 
Handlebars.registerPartial("chordical", templates["chordical"]); 
return templates["chordical"]; 
});