module.exports = {
    antiAfk: function (page) {
        function clickCanvasContinuously() {
            const date = new Date()
            console.log('Anti afk active at ' + date);
            page.evaluate(() => {
                const canvasElement = document.getElementById('canvas');
                if (canvasElement) {
                    canvasElement.click();
                }
            });
            console.log('Interval success. Continue anti afk.');
        }
        setInterval(clickCanvasContinuously, 20000);
    },
}