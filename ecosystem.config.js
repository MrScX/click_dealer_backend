module.exports = {
	apps: [
		{
			script: "./build/server.js",
			name: "click-1",
			env: {
				NAME: "click-1",
				PORT: 6060
			}
		},
		{
			script: "./build/server.js",
			name: "click-2",
			env: {
				NAME: "click-2",
				PORT: 6061
			}
		},
		{
			script: "./build/server.js",
			name: "click-3",
			env: {
				NAME: "click-3",
				PORT: 6062
			}
		},
		{
			script: "./build/server.js",
			name: "click-4",
			env: {
				NAME: "click-4",
				PORT: 6063
			}
		}
	],
};
