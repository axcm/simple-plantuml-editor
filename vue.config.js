module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Simple PlantUML Editor",
        mac: {
          target: "dmg",
          icon: "src/assets/logo.png"
        }
      }
    }
  }
}
