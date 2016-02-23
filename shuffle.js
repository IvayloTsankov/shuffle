function Shuffle(pContainer) {
    var container = null;

    var canvas = null;
    var context = null;
    var bgColor = null;

    var self = this;
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var alphaHash = {};
    var base_dir = 'images/';
    var fileextension = '.png';
    var i = 0;

    var getImages = function() {
        var letter = alphabet[i];
        if (i === alphabet.length || typeof(letter) === 'undefined') {
            return;
        }

        var dir = base_dir + letter + '/';
        alphaHash[letter] = [];

        $.ajax({
            //This will retrieve the contents of the folder
            //if the folder is configured as 'browsable'
            url: dir,
            success: function (data) {
                //List all .png file names in the page
                console.log(data);
                $(data).find('a:contains(' + fileextension + ')').each(function () {
                    var filename = this.href.replace(window.location.href, '').replace('http://', '');
                    var img = $("<img src='" + dir + filename + "'>")[0];
                    alphaHash[letter].push(img);
//                     $(container).append(img);
                });

                getImages(alphabet[++i]);
            }
        });
    };

    var registerListener = function() {
        $('body').keypress(function (ev) {
            var sign = String.fromCharCode(ev.which);
            if (alphabet.indexOf(sign) !== -1) {
                console.log(sign);
                //drawLetter(sign);
            }
        });
    };

    function init() {
        container = $(pContainer);
        canvas = $('<canvas></canvas>')[0];
        context = canvas.getContext('2d');

        // resize to full screen
        self.resize(window.innerWidth, window.innerHeight);
        container.append(canvas);
        self.setBackground('red');

        registerListener();
        getImages();
    };

    this.getHash = function() {
        return alphaHash;
    };

    this.resize = function(w, h) {
        canvas.width = w;
        canvas.height = h;
    };

    this.clear = function() {
        setBackground(bgColor);
    };

    this.saveImage = function() {
        var img = canvas.toDataURL('image/png');
        img.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
        img.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=shuffle.png');
        window.location = img;
    };

    this.setBackground = function(color) {
        bgColor = color;
        canvas.style.backgroundColor = bgColor;
    }

    init();
};
