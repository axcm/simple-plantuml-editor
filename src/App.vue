<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <Editor/>
      <Previewer/>
    </div>
    </div>
  </div>
</template>

<script>
import Previewer from './components/Previewer.vue'
import Editor from './components/Editor.vue'

export default {
  name: 'app',
  components: {
    Previewer,
    Editor
  }
}
</script>

<style>
html, body, #app, #app .row { height: 100%; }
body { background-color: #232323;}

.header {
  height: 33px;
}
.header .btn{
  margin-right: 10px;
}
</style>
