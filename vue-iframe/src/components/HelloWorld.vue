<template>
  <div class="hello">
    <p>{{ msg }} {{ messageApp }}</p>
      <button v-on:click="sendMessageReact">send message to React</button>

    <div v-if="messageReact !== ''">
     <p> message sent by react : {{ messageReact }}</p>
     </div>
  </div>
</template>

<script>

const bindEvent = (element, eventName, eventHandler) => {
  if (element.addEventListener) {
    element.addEventListener (eventName, eventHandler, false);
  } else if (element.attachEvent) {
    element.attachEvent ('on' + eventName, eventHandler);
  }
};
export default {
  name: 'HelloWorld',
  data () {
    return {
      messageApp: '',
      messageReact:''
    }
  },
   created() {
     this.bindListener();
  },
 methods: {
   sendMessageReact(){
        window.parent.postMessage (
           JSON.stringify ({type: 'fromVue', dest: 'react', value:Math.random ()}), '*');

   },
  bindListener() {
    bindEvent (window, 'message', e => {
      if(e.data){
       const {type, value} = JSON.parse (e.data);
      switch (type) {
        case 'app':
          this.messageApp= value;
           break;
        case 'fromReact':
          this.messageReact=value;
           break;
      }
      }
  });               
  }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
