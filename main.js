window.onload = function() {
    // TODO:
    //      Move this buttons in shuffle object
    //      Attach click event of them to saveImage, clear methods
    //      Write function to load letter images
    //      Bind letters type events and write images to canvas
    var save = document.getElementById("save");
    var clear = document.getElementById("clear");

    if (typeof(save) === 'undefined' || save === null ||
        typeof(clear) === 'undefined'|| clear === null) {
        console.error('Fail to get control buttons');
    }

    var container = document.getElementById('container');

    if (typeof(container) === 'undefined' ||
        container === null) {
        console.error('Fail to get container from DOM');
    }

    var shuffle = new Shuffle(container);
    window.s = shuffle;
};
