<template>
  <v-app id="inspire">
    <v-navigation-drawer
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="fotoUser.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Malena Junguito</v-list-item-title>

      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="page in pages"
          :key="page.title"
          @click="selectPage(page.title)"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ page.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="Primary"
      dark
      shrink-on-scroll
      prominent
      src="vinilos.jpg"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-title> {{ pages.filter(page => page.selected=true)[0].title }}</v-app-bar-title>

      <v-spacer></v-spacer>


      <v-menu v-if="items.filter(item => item.title == 'Artistas')[0].selected">
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            icon
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="option in options_artist"
            :key="option.title"
            @click="selectOpcArtistas(option.title)"
          >
            <v-list-item-title>{{ option.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu  v-if="items.filter(item => item.title == 'Discos')[0].selected">
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            icon
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="option in options_disc"
            :key="option.title"
            @click="selectOpcDiscos(option.title)"
          >
            <v-list-item-title>{{ option.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <v-tabs
        centered
        dark
        icons-and-text
        >
          <v-tab 
          v-for="item in items"
          :to="item.to"
          @click="selectItem(item.title)">
            {{ item.title }}
            <v-icon> {{ item.icon }} </v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    
    <v-main>
      <router-view></router-view>
      
    </v-main>
  </v-app>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

  export default {
    data () {
      return {

        drawer: null
      }
    },
    computed: {
      ...mapGetters([
        'items',
        'pages',
        'options_artist',
        'options_disc',
      ]),
    },
    methods: {
      ...mapActions([
        'selectOpcDiscos',
        'selectOpcArtistas',
        'selectItem',
        'selectPage'
      ])
    }
  }
</script>
