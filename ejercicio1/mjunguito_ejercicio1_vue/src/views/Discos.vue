<template>
    <div>
      <div v-if="options_disc.filter(opcSelected => opcSelected.title == 'Agregar' )[0].selected">
        <v-text-field label="Titulo" v-model="titulo"></v-text-field>
        <v-combobox
          v-model="artista"
          :items="nom_artistas"
          label="Artista"
          outlined
          dense
        ></v-combobox>
        <v-text-field label="Año" v-model="ano"></v-text-field>
        <v-btn @click.stop="añadir()">Agregar</v-btn>
      </div>
      <div v-if="old_disc != ''">
        <h5>Editando: {{ old_disc }}</h5>
        <v-text-field label="Titulo" v-model="edit_titulo"></v-text-field>
        <v-combobox
          v-model="edit_artista"
          :items="nom_artistas"
          label="Artista"
          outlined
          dense
        ></v-combobox>
        <v-text-field label="Año" v-model="edit_ano"></v-text-field>
        <v-btn @click.stop="editar()">Editar</v-btn>
      </div>
      <div>
          <v-list-item 
          v-for = "disco in discos" 
          :key="disco.titulo"
          >
            <v-list-item-content>
              <v-list-item-title >{{ disco.titulo }}</v-list-item-title>
              <v-list-item-subtitle>Artista: {{ disco.artista }} </v-list-item-subtitle>
              <v-list-item-subtitle>Año: {{ disco.ano }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="options_disc.filter(opcSelected => opcSelected.title == 'Editar')[0].selected">
              <v-btn 
                icon
                @click="selecEditar(disco.ano, disco.titulo, disco.artista)"
                >
                <v-icon>{{ options_disc.filter(opcSelected => opcSelected.selected == true )[0].icono }}</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action v-if="options_disc.filter(opcSelected => opcSelected.title == 'Borrar')[0].selected">
              <v-btn 
                icon
                @click="deleteDisco(disco.titulo)"
                >
                <v-icon>{{ options_disc.filter(opcSelected => opcSelected.selected == true )[0].icono }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
      </div>
    </div>
    
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

  export default {
    data(){
      return{
        titulo: '',
        ano: '',
        artista: '',
        edit_titulo: '',
        edit_ano: '',
        edit_artista: ''
      }
    },
    computed: {
      ...mapGetters([
        'discos',
        'nom_artistas',
        'options_disc',
        'old_disc'
      ]),
      
    },
    methods:{
      ...mapActions([
        'addDisco',
        'setDiscoEditing',
        'editDisco',
        'deleteDisco'
      ]),
      añadir(){
        let disco={
          "titulo": this.titulo, 
          "ano": this.ano,
          "artista": this.artista
        };
        this.titulo= '';
        this.ano= '';
        this.artista= '';
        this.addDisco(disco);
      },
      selecEditar(ano, titulo, artista){
        this.edit_ano= ano;
        this.edit_titulo= titulo;
        this.edit_artista= artista;
        this.setDiscoEditing(titulo);
      },
      editar(){
        let disco={
          "titulo": this.edit_titulo, 
          "ano": this.edit_ano,
          "artista": this.edit_artista
        };
        this.editDisco(disco);
        this.edit_ano= '';
        this.edit_titulo= '';
        this.edit_artista= '';
      }
    }
  }
</script>