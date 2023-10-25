<template>
  <div class="about">
    <h1>Personajes Star Wars </h1>
    <v-btn
      v-show="previous != ''"
      elevation="2"
      icon
      @click="getPreviousPeople()" 
    >
      <v-icon dark>
        mdi-page-previous-outline
      </v-icon>
    </v-btn>
    
    <v-btn
      v-show="next != ''"
      elevation="2"
      icon
      @click="getNextPeople()" 
    >
      <v-icon dark>
        mdi-page-next-outline
      </v-icon>
    </v-btn>
    
    <div v-show="people.length != 0">
      <div class="row">
        <div class="col-12  col-md-6 col-lg-4 py-3" v-for="(person, key) in people" 
        :key="key">
          <v-card>
            <v-card-title>{{ person.name  }}</v-card-title>
            <v-card-text>
                <div>Altura: {{ person.height }}</div>
                <div>Peso: {{ person.mass }}</div>
                <div>Color de pelo: {{ person.hair_color }}</div>
                <div>Color de piel: {{ person.skin_color }}</div>
                <div>Año de nacimiento: {{ person.birth_year }}</div>
                <div>Género: {{ person.gender }}</div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import axios from "axios";

 const BASEURL = 'https://swapi.dev/api/people/'
 export default {
    data () {
      return {
        people: [],
        previous: '',
        next: BASEURL+'?page=1'
      }
    },
    methods: {
      getNextPeople(){
        const URL = `${this.next}`
        axios.get(`${URL}`).then((response) => {
          this.people = response.data.results;
          this.previous = response.data.previous;
          this.next = response.data.next;
        });


      },
      getPreviousPeople(){
        const URL = `${this.previous}`
        axios.get(`${URL}`).then((response) => {
          this.people = response.data.results;
          this.previous = response.data.previous;
          this.next = response.data.next;
        });
        
      }
    },
  }
  
</script>