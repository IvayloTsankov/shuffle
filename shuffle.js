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

        // if we have a set border, substrack its width/height
        // from canvas area
        var wlimit = canvas.width - border;
        wlimit = wlimit > 0 ? wlimit: 0;

        var hlimit = canvas.height - border;
        hlimit = hlimit > 0 ? hlimit: 0;

        var widthStart = getRandomInt(0, wlimit);
        var heightStart = getRandomInt(0, hlimit);
        var dstWidth = 0;
        var dstHeight = 0;

        var operation = getRandomInt(0, 4);
        if (operation === 0) {
            var scaleFactor = getRandomInt(1, 2);
            dstWidth = image.width * scaleFactor;
            dstHeight = image.height * scaleFactor;
        } else {
            var scaleFactor = getRandomInt(1, 5);
            dstWidth = image.width / scaleFactor;
            dstHeight = image.height / scaleFactor;            
        }

        if (widthStart + dstWidth > canvas.width) {
            widthStart -= Math.abs((widthStart + dstWidth) - canvas.width);
        }

        if (heightStart + dstHeight > canvas.height) {
            heightStart -= Math.abs((heightStart + dstHeight) - canvas.height);
        }

        context.drawImage(image, widthStart, heightStart, dstWidth, dstHeight);
    };

    var registerListener = function() {
        $('body').keypress(function (ev) {
            var sign = String.fromCharCode(ev.which).toLowerCase();
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
        console.log('shuffle(w: %d, h: %d)', container.width(), container.height());
        self.resize(container.width(), container.height(), 100);
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
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = bgColor;
        context.fill();
    };

    this.saveImage = function(filename) {
        var data = canvas.toDataURL('image/png');
        var capture = data.replace(/^data:image\/[^;]*/, 'data:application/octet-stream;');

        var a = document.createElement('a');
        a.href = capture;
        a.download = filename + fileextension;

        a.style.display = 'none'; // hide
        document.body.appendChild(a);
        a.click();

        setTimeout(function() {
            document.body.removeChild(a);
        }, 100);
   };

    this.setBackground = function(color) {
        bgColor = color;
        self.clear();
    }

    init();
};
