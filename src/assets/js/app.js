if (!window.Promise) {
    window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('../../sw.js')
        .then(function () {
            console.log('Service Worker har registrerats.')
        }).catch(function (error) {
            console.log(error);
        })
}