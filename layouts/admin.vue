<template>
  <v-app light>    
    <v-main >
      <v-app-bar
        color="dark"
        class="d-flex justify-space-between"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title> 
          Manage IP address                      
        </v-toolbar-title>

        <v-spacer></v-spacer>        
      </v-app-bar>          
      <NuxtChild />
    </v-main>    
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({
    drawer: false,
    group: null,
  }),
}
</script>
