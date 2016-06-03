window.onload = function() {
    var save = $('#save');
    var clear = $('#clear');
    if (typeof(save) === 'undefined' || save === null ||
        typeof(clear) === 'undefined'|| clear === null) {
        console.error('Fail to get control buttons');
    }

    var container = ('body');
    if (typeof(container) === 'undefined' ||
        container === null) {
        console.error('Fail to get container from DOM');
    }


    var shuffle = new Shuffle(container);
    window.s = shuffle;

    save.on('click', function() {
        console.log('click save');
        shuffle.saveImage('shuffle');
    });

    clear.on('click', function() {
        shuffle.clear();
    });
};
