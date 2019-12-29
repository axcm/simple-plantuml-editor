<template>
  <div id="previewer" class="col-sm-6">
    <div class="header">
      <button type="button" class="btn btn-sm btn-primary" @click="saveImage">Save Image</button>
    </div>
    <div>
      <img id="preview-url" class="d-block mx-auto" :src='previewURL'>
    </div>
  </div>
</template>

<script>
import encoder from 'plantuml-encoder'
import axios from 'axios'
import fs from 'fs'
const {
  BrowserWindow,
  dialog
} = require("electron").remote

export default {
  name: 'Previewer',
  computed: {
    compiledPlantUMLToBase64: function(){
      let uml_code = "scale 3\n" + this.$store.getters.content

      return encoder.encode(uml_code)
    },
    previewURL: function () {
      let extention = process.env.VUE_APP_PLANTUML_RENDERER_EXTENTION
      let url = process.env.VUE_APP_PLANTUML_RENDERER_URL

      return `${url}/${extention}/${this.compiledPlantUMLToBase64}.${extention}`
    }
  },
  methods: {
    downloadImage: async function(){
      const res = await axios.get(this.previewURL, {responseType: 'arraybuffer'})

      return new Buffer.from(res.data)
    },
    saveImage: async function(){
      const imageData = await this.downloadImage()

      this.saveFileAs(imageData)
    },
    saveFileAs: function(imageData){
      const win = BrowserWindow.getFocusedWindow()
      const vm = this

      dialog.showSaveDialog(
        win,
        {
          title: "Save image as",
          filters: [
            { name: 'Image', extensions: ['png'] }
          ]
        },
        function (fileName) {
          if (fileName) {
            vm.writeFile(fileName, imageData);
          }
        }
      )
    },
    writeFile: function(path, imageData){
      fs.writeFileSync(path, imageData, 'binary')
    }
  }
}
</script>

<style scoped>
#previewer {
  height: 100%;
}
</style>
