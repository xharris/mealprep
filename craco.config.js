const CracoAlias = require("craco-alias")

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "options", // (default)
                aliases: {
                    "@backend": "backend"
                }
            }
        }
    ]
}