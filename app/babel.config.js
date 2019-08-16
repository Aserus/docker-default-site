module.exports = {
  presets: [
    '@vue/app'
  ],
	plugins: [
		["module-resolver", {
			"root": ["./src"],
			"alias": {
				"@": "./src",
				'@comp': './src/components',
				'@pages': './src/pages',
				'@helpers': './src/helpers',
				'@router': './src/router',
				'@api': './src/helpers/api',
				'@actions': './src/store/actions'
			}
		}]
	]
}
