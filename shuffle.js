function Shuffle(pContainer) {
    var container = null;

    var canvas = null;
    var border = 0;
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
                    $(container).append(img);
                });

                getImages(alphabet[++i]);
            }
        });
    };

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var getRandomImage = function(letter) {
        if (!alphaHash || !alphaHash[letter] ||
            alphaHash[letter].length === 0)
        {
            console.err('Fail to get images for letter: ', letter);
            return;
        }

        if (!context) {
            console.err('No context for canvas');
            return;
        }

        // pick random image from available
        var letterImages = alphaHash[letter];
        var index = getRandomInt(0, letterImages.length - 1)
        var img = letterImages[index];

        if (!img) {
            console.err('Images array overflow');
        }

        return img;
    };

    var drawLetter = function(letter) {
        var image = getRandomImage(letter);

        var width = getRandomInt(0, canvas.width - border);
        var height = getRandomInt(0, canvas.height - border);
        var scaleFactor = getRandomInt(5, 20);

        context.drawImage(image, width, height, image.width/scaleFactor, image.height/scaleFactor);
    };

    var registerListener = function() {
        $('body').keypress(function (ev) {
            var sign = String.fromCharCode(ev.which);
            if (alphabet.indexOf(sign) !== -1) {
                console.log(sign);
                drawLetter(sign);
            }
        });
    };

    function init() {
        container = $(pContainer);
        canvas = $('<canvas></canvas>')[0];
        context = canvas.getContext('2d');

        // resize to full screen
        self.resize(window.innerWidth, window.innerHeight, 100);
        container.append(canvas);
        self.setBackground('white');

        registerListener();
        getImages();
    };

    this.getHash = function() {
        return alphaHash;
    };

    this.resize = function(w, h, borderSize) {
        console.log('canvas (w: %d, h: %d)', w, h);
        canvas.width = w;
        canvas.height = h;
        if (borderSize) {
            border = borderSize;
        }
    };

    this.clear = function() {
        self.setBackground(bgColor);
    };

    this.saveImage = function() {
        var capture = canvas.toDataURL('image/png');
        var href = capture.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        return href;
    };

    this.setBackground = function(color) {
        bgColor = color;
        canvas.style.backgroundColor = bgColor;
    }

    init();
};
