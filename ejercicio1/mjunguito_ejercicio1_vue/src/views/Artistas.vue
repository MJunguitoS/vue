<template>
    <div>
        <div v-if="options_artist.filter(opcSelected => opcSelected.title == 'Agregar' )[0].selected">
            <v-text-field
                label="Nombre artístico"
                v-model= 'nombreArtistico'
            ></v-text-field>
            <v-text-field label="Nombre" v-model="nombre"></v-text-field>
            <v-text-field label="Apellidos" v-model="apellido"></v-text-field>
            <v-text-field label="Genero musical" v-model="generoMusical"></v-text-field>
            <v-btn @click.stop="añadir()">Agregar</v-btn>

        </div>
        <div v-if="old_artist != ''">
          <h5>Editando: {{ old_artist }}</h5>
            <v-text-field
                label="Nombre artístico"
                v-model= 'edit_nombreArtistico'
            ></v-text-field>
            <v-text-field label="Nombre" v-model="edit_nombre"></v-text-field>
            <v-text-field label="Apellidos" v-model="edit_apellido"></v-text-field>
            <v-text-field label="Genero musical" v-model="edit_generoMusical"></v-text-field>
            <v-btn @click.stop="editar()">Editar</v-btn>
        </div>
        <div v-for = "artist in artists" :key="artists.nombreArtistico">
          <v-list-item >
            <v-list-item-content>
              <v-list-item-title >{{ artist.nombreArtistico }}</v-list-item-title>
              <v-list-item-subtitle>Nombre: {{ artist.nombre }} </v-list-item-subtitle>
              <v-list-item-subtitle>Apellidos: {{ artist.apellido }} </v-list-item-subtitle>
              <v-list-item-subtitle>Género musical: {{ artist.estilo }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="options_artist.filter(opcSelected => opcSelected.title == 'Editar')[0].selected">
              <v-btn 
                icon
                @click="selecEditar(artist.nombre, artist.apellido, artist.nombreArtistico, artist.estilo)"
                >
                <v-icon>{{ options_artist.filter(opcSelected => opcSelected.selected == true )[0].icono }}</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action v-if="options_artist.filter(opcSelected => opcSelected.title == 'Borrar')[0].selected">
              <v-btn 
                icon
                @click="deleteArtista(artist.nombreArtistico)"
                >
                <v-icon>{{ options_artist.filter(opcSelected => opcSelected.selected == true )[0].icono }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          
        </div>
    </div>
</template>
<script>

import { mapGetters, mapActions} from 'vuex';

  export default {
    data(){
      return{
        nombreArtistico: '',
        nombre: '',
        apellido: '',
        generoMusical: '',
        edit_nombreArtistico: '',
        edit_nombre: '',
        edit_apellido: '',
        edit_generoMusical: '',
      }
    },
    computed: {
      ...mapGetters([
        'artists',
        'options_artist',
        'old_artist',
      ])
    },
    methods: {
      ...mapActions([
        'addArtista',
        'setArtistaEditing',
        'deleteArtista',
        'editArtista'
      ]),
      añadir(){
        let artista={
          "nombre": this.nombre, 
          "apellido": this.apellido,
          "nombreArtistico": this.nombreArtistico, 
          "estilo": this.generoMusical
        };
        this.nombreArtistico= '';
        this.nombre= '';
        this.apellido= '';
        this.generoMusical= '';
        this.addArtista(artista);
      },
      selecEditar(nombre, apellido, nombreArtistico, estilo){
        this.edit_nombreArtistico= nombreArtistico;
        this.edit_nombre= nombre;
        this.edit_apellido= apellido;
        this.edit_generoMusical= estilo;
        this.setArtistaEditing(nombreArtistico);
      },
      editar(){
        let artista={
          "nombre": this.edit_nombre, 
          "apellido": this.edit_apellido,
          "nombreArtistico": this.edit_nombreArtistico, 
          "estilo": this.edit_generoMusical
        };
        this.editArtista(artista);
        this.edit_nombreArtistico= '';
        this.edit_nombre= '';
        this.edit_apellido= '';
        this.edit_generoMusical= '';
      }
    },
  }
</script>