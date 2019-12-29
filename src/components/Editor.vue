<template>
  <div id="editor" class="col-sm-6">
    <div class="header">
      <button type="button" class="btn btn-sm btn-primary" @click="openFile">Open</button>
      <button type="button" class="btn btn-sm btn-primary" @click="saveFile">Save</button>

      <span id="path">{{currentPath}}</span>
      <span id="isNotSave" v-if="currentPath && isNotSave">*</span>
    </div>
    <div id="edit-area"></div>
  </div>
</template>

<script>
import fs from 'fs'
import { remote } from "electron"
const {
  BrowserWindow,
  dialog
} = remote

export default {
  name: 'Editor',
  data: function (){
    return {
      editor: undefined,
      currentPath: undefined,
      readFileContent: undefined
    }
  },
  methods: {
    initAceEditor: function(){
      this.editor = ace.edit("edit-area")
      const editor = this.editor

      editor.setTheme("ace/theme/twilight")
      editor.setValue(this.content, 1)

      const vm = this
      editor.on('change', function(e){
        vm.changeContent(editor.getValue())
      })
    },
    changeContent: function(content){
      this.$store.dispatch("changeContent", content)
    },
    openFile: function(){
      const win = BrowserWindow.getFocusedWindow()
      const vm = this

      dialog.showOpenDialog(
        win,
        {
          title: "Open File",
          properties: ["openFile"],
          filters: [
            { name: 'All Files', extensions: ['*'] }
          ]
        },
        function (fileNames) {
          if (fileNames[0]) {
            vm.readFile(fileNames[0]);
          }
        }
      )
    },
    readFile: function(path){
      this.currentPath = path

      const text = fs.readFileSync(path)
      const content = text.toString()

      this.changeContent(content)
      this.readFileContent = content
    },
    saveFile: function(){
      if(this.currentPath){
        this.writeFile(this.currentPath);
      }
      else{
        this.saveFileAs()
      }
    },
    saveFileAs: function(){
      const win = BrowserWindow.getFocusedWindow()
      const vm = this

      dialog.showSaveDialog(
        win,
        {
          title: "Save as",
          filters: [
            { name: "Documents", extensions: ["txt", "text"] },
            { name: 'All Files', extensions: ['*'] }
          ]
        },
        function (fileName) {
          if (fileName) {
            vm.writeFile(fileName);
          }
        }
      )
    },
    writeFile: function(path){
      this.currentPath = path

      fs.writeFileSync(path, this.content)
      this.readFileContent = this.content
    }
  },
  mounted: function (){
    this.initAceEditor()
  },
  computed: {
    content: function(){
      return this.$store.getters.content
    },
    isNotSave: function (){
      return this.content != this.readFileContent
    }
  },
  watch: {
    content: function(new_content) {
      if (new_content != this.editor.getValue()) {
        this.editor.setValue(new_content, 1)
      }
    }
  }
}
</script>

<style scoped>
#editor {
  height: 100%;
}
#edit-area {
  box-sizing: border-box;
  height: 100%;
  padding-top: 33px;
}
#path{
  color: white;
}
#isNotSave{
  color: white;
}
</style>
