function Shuffle(container) {
    var canvas = null;
    var container = null;
    var self = this;

    var getImages = function(url) {
        
    };

    var listener = function() {

    };

    function init() {
        canvas = document.createElement("canvas");
        container.appendChild(canvas);
    };

    this.resize = function(w, h) {
        canvas.width = w;
        canvas.height = h;
    };

    this.clear = function() {
        setBackground("0xFFFFFF");
    };

    this.saveImage = function() {
        var img = canvas.toDataURL("image/png");
        window.location = img;
    };

    this.setBackground = function(color) {
        canvas.style.background = color; 
    }

    init();
};
