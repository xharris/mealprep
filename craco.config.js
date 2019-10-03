/* craco.config.js */
const CracoAlias = require("craco-alias")

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "options", // (default)
                aliases: {
                    "@backend": "back",
                    "@frontend": "front/src"
                }
            }
        }
    ],
    webpack: {
        conigure: {
            externals: { 
                'sqlite3': 'sqlite3',
                'mariasql': 'mariasql',
                'mssql': 'mssql',
                'mysql': 'mysql',
                'oracle': 'oracle',
                'strong-oracle': 'strong-oracle',
                'oracledb': 'oracledb',
                'pg': 'pg',
                'pg-query-stream': 'pg-query-stream' }
            }
        }
}