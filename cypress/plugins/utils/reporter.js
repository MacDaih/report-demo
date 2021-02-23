const files = require('fs');
const sa = require('./sanitizer');

const FILTERS = {
    video: 'video',
    shouldUploadVideo: 'shouldUploadVideo',
    hooks: 'hooks',
    reporter: 'reporter',
    stats: 'stats',
    error: 'error',
    screenshots: 'screenshots'
}
/**
 * Format report and write to file
 * @param {Array} arr 
 */
const reportWriter = (arr) => {
    let json = JSON.stringify(arr);
    files.writeFile(
        `report.json`,
        json,
        (err) => {
            if (err) {
                console.err(err);
            }
    })
}

/**
 * Build whole report
 * @param {Object} res 
 */
function reportSanitizer(res) {
    const project = {
        name: res.config.projectName,
        start_at: res.startedTestsAt,
        end_at: res.endedTestsAt,
        duration: res.totalDuration,
        suites: res.totalSuites,
        total_tests: res.totalTests,
        failed: res.totalFailed,
        passed: res.totalPassed,
        runs: sa.sanitizeObject(res.runs, FILTERS)
    };
    reportWriter(project);
}

const reporter = {
    reportSanitizer
}

module.exports = reporter;