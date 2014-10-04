var page = require('webpage').create(),
    fs = require('fs'),
    system = require('system'),
    template = fs.workingDirectory + fs.separator + "ml_to_png" +
        ".html",
    input, output,
    content;

input  = system.args[1];
output = system.args[2];

page.open(template, function(status) {
    page.evaluate(function(input) {
        var el = document.getElementById('content');
        el.innerHTML = input;
    }, input);

    window.setTimeout(function() {
        clipRect = page.evaluate(function() {
            var el = document.getElementsByClassName("MathJax_SVG")[0];
            return {
                "left":   el.offsetLeft,
                "top":    el.offsetTop,
                "width":  el.offsetWidth * 2,
                "height": el.offsetHeight * 2
            }
        });

        page.clipRect = clipRect;
        page.render(output);
        phantom.exit();
    }, 1000);
});
