'use strict';


// Imports
const path = require('path'),
    fs = require('fs'),
    readline = require('readline')


exports.getLogs = function (req, res) {

    // Acquire parameters
    let filename = req.params['filename'],
        lines = req.params['lines'],
        keyword = req.params['keyword'],
        lineCount = 0

    // Validate params
    if (!filename) res.send('ERROR: Missing filename parameter.')
    if (!lines) res.send('ERROR: Missing lines parameter.')

    // Validate filepath
    let fPath = path.resolve('./var/log/' + filename + '.log')
    if (!fs.existsSync(fPath)) res.send('ERROR: File not found.')

    // Init data stream
    let readStream = fs.createReadStream(fPath)
    let lineInterface = readline.createInterface(readStream)

    // Parse entire file to determine line count
    let getLineCount = new Promise((resolve, reject) => {
        console.log('parsing....')

        lineInterface
            .on('line', function () {
                lineCount++
            })
            .on('close', function () {
                resolve()
            })
            .on('error', function (err) {
                reject('ERROR: ' + err)
            });
    });

    getLineCount.then(() => {
        console.log('parse complete')
        console.log('total lines parsed: ' + lineCount)
        return getData()
    }) 

    // Extract data from file
    function getData() {
        console.log('getting data....')

        // Data to return
        let data = []

        let startIndex = 0

        // Limit returned data to 50000 lines to avoid js memory limit and json response limit
        if (lineCount > 50000) startIndex = lineCount - 50000
        lineCount = 0

        // Re-initialize readStream
        readStream = fs.createReadStream(fPath)
        lineInterface = readline.createInterface(readStream)

        lineInterface
            .on('line', function (line) {
                lineCount++
                if (lineCount >= startIndex) {
                    // Include lines that contain keyword, if specified
                    if (keyword) {
                        if (line.includes(keyword)) data.push(line)
                    } else {
                        data.push(line)
                    }
                }
            })
            .on('close', function () {
                console.log('done')

                // Include line limit, if specified
                if (lines == 0) lines = lineCount
                data = data.slice(-Math.abs(lines))

                let responseData = {}
                responseData.total = data.length
                responseData.lines = data.reverse() // Present newest lines first

                // Return data
                res
                    .status(200)
                    .json(responseData)
                    .end()
            })
            .on('error', function (err) {
                res
                .send('ERROR: ' + err)
                .end()
            });
    };
};