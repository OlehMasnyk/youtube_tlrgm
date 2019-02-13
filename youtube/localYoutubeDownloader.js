const horizon = require('horizon-youtube-mp3')

/**
 * Get youtube video info
 *
 * @param youtubeUrl - youtube link
 * @param callback(err, response) - on complete response
 */
function getYoutubeVideoInfo(youtubeUrl, callback) {
    horizon.getInfo(youtubeUrl, callback);
};

/**
 * Download mp3 to local machine
 *
 * @param youtubeLink
 * @param downloadDir
 * @param fileName
 * @param onCompleteCallback
 * @param onConvertCallback
 */
function downloadMP3(youtubeLink, downloadDir, fileName, onCompleteCallback, onConvertCallback) {

    horizon.downloadToLocal(
        youtubeLink,
        downloadDir,
        fileName,
        null,
        null,
        onCompleteCallback ? onCompleteCallback : defaultOnConvertVideoComplete,
        onConvertCallback ? onConvertCallback : defaultOnConvertVideoProgress
    );

    function defaultOnConvertVideoComplete(err, result) {
        console.log(err, result);
    }

    function defaultOnConvertVideoProgress(percent, timemark, targetSize) {
        console.log('Progress:', percent, 'Timemark:', timemark, 'Target Size:', targetSize);
    }
};

getYoutubeVideoInfo('https://youtube.com/watch?v=rW5P6W-Cq8c', function (err, resp) {
    console.log(resp);
});

module.exports = {
    getYoutubeVideoInfo: getYoutubeVideoInfo,
    downloadMP3: downloadMP3
}