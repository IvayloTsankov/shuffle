function Shuffle(pContainer) {
    var canvas = null;
    var container = null;
    var self = this;
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var i = 0;

    var getImages = function() {
        var base_dir = 'images/';
        var fileextension = '.png';

        var dir = base_dir + alphabet[i] + '/';
        console.log('directory: ' + dir);
        $.ajax({
            //This will retrieve the contents of the folder if the folder is configured as 'browsable'
            url: dir,
            success: function (data) {
                //List all .png file names in the page
                console.log(data);
                $(data).find('a:contains(' + fileextension + ')').each(function () {
                    var filename = this.href.replace(window.location.href, '').replace('http://', '');
                    $(container).append("<img src='" + dir + filename + "'>");
                });

                if (i == alphabet.length) {
                    return;
                }

                getImages(alphabet[++i]);
            }
        });
    };

    var listener = function() {

    };

    function init() {
        container = pContainer;

        canvas = document.createElement('canvas');
        container.appendChild(canvas);
        getImages();
    };

    this.resize = function(w, h) {
        canvas.width = w;
        canvas.height = h;
    };

    this.clear = function() {
        setBackground('0xFFFFFF');
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
