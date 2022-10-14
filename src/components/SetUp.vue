<template>
  <v-container fluid>
    <v-row>
      <v-col> 
        <h1>holis</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  name: "pageSetup",
  data () {
    return { 
      consecutivos:[]
    }
  },
  methods: {
    traerConsecutivos(){
      axios.get('https://labficat.herokuapp.com/api')
    }
  },
  created(){

  },
};
</script>