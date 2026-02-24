const { defineConfig } = require("cypress");
const { createHtmlReport } = require("axe-html-reporter");
const path = require("path");
const fs = require("fs");

let a11yResults = []; // guarda resultados de todos os testes

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://bugbank.netlify.app",
    video: false,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      on("task", {
        a11yAdd({ testName, url, violations }) {
          a11yResults.push({ testName, url, violations });
          return null;
        },

        // html report
        a11yReport() {
          const reportDir = path.join(__dirname, "reports");
          if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir);

          const html = createHtmlReport({
            results: {
              violations: a11yResults.flatMap(r =>
                r.violations.map(v => ({
                  ...v,
                  help: `${v.help} (Teste: ${r.testName})`,
                  description: `${v.description} | URL: ${r.url}`,
                }))
              ),
            },
            options: {
              projectKey: "BugBank A11y POC",
              outputDir: "reports",
              reportFileName: "a11y-report.html",
            },
          });

          return html || null;
        },

        log(message) {
          console.log(message);
          return null;
        },
      });
      // antes de runner
      on("before:run", () => {
        a11yResults = [];
      });
      // depois de runner
      on("after:run", () => {
      });

      return config;
    },
  },
  allowCypressEnv: false,
});