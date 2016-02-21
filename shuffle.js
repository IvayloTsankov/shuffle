function Shuffle(pContainer) {
    var canvas = null;
    var container = null;
    var self = this;

    var getImages = function(url) {
        
    };

    var listener = function() {

    };

    function init() {
        container = pContainer;

        canvas = document.createElement('canvas');
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
        var img = canvas.toDataURL('image/png');
        img.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
        img.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=shuffle.png');
        window.location = img;
    };

    this.setBackground = function(color) {
        canvas.style.background = color; 
    }

    init();
};
