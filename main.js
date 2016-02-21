window.onload = function() {
    var container = document.getElementById('container');
    if (typeof(container) === 'undefined' ||
        container === null) {
        console.error('Fail to get container from DOM');
    }

    var shuffle = new Shuffle(container);
};
