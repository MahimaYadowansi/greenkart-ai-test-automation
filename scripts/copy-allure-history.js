// Copies the previous report's history/ folder back into allure-results/
// before regenerating, so the Allure report keeps its trend graphs
// (History Trend, Retries, Duration) across runs instead of resetting every time.
const fs = require('node:fs');
const path = require('node:path');

const previousHistoryDir = path.join(__dirname, '..', 'allure-report', 'history');
const targetHistoryDir = path.join(__dirname, '..', 'allure-results', 'history');

if (fs.existsSync(previousHistoryDir)) {
  fs.mkdirSync(targetHistoryDir, { recursive: true });
  fs.cpSync(previousHistoryDir, targetHistoryDir, { recursive: true });
  console.log('Copied previous Allure history into allure-results/history for trend graphs.');
} else {
  console.log('No previous Allure report history found; trend graphs will start fresh.');
}
