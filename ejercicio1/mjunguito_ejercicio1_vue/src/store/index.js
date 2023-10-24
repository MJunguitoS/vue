import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    options_disc:[
      {title:'Listar', icono: '', selected: true},
      {title:'Editar', icono: 'mdi-pencil-outline', selected: false},
      {title:'Borrar', icono: 'mdi-delete', selected: false},
      {title:'Agregar', icono: '', selected: false}
    ],
    old_disc: '',
    options_artist:[
      {title:'Listar', icono: '', selected: true},
      {title:'Editar', icono: 'mdi-pencil-outline', selected: false},
      {title:'Borrar', icono: 'mdi-delete', selected: false},
      {title:'Agregar', icono: '', selected: false}
    ],
    old_artist: '',
    pages:[
      { title: 'Artistas y discos', icon: 'mdi-bookmark-music', selected: true},
      { title: 'API Axios', icon: 'mdi-card-account-details', selected: false},
    ],
    items: [
      { title: 'Artistas', icon: 'mdi-account-music', selected: true, to: '/'},
      { title: 'Discos', icon: 'mdi-disc', selected: false, to:'/discos'},
    ],
    artists: [
      { nombre: 'Jennifer Lynn', apellido: 'Lopez', nombreArtistico: 'JLo', estilo: 'Pop / Dance / Hip Hop / R&B / Pop latino / Reguetón' },
      { nombre: 'Gloria María Milagrosa', apellido: 'Fajardo García', nombreArtistico: 'Britney Spears', estilo: '	pop, dance pop' },
      { nombre: 'Madonna Louise', apellido: 'Ciccone', nombreArtistico: 'Madonna', estilo:'Pop / dance / música electrónica'  },
      { nombre: 'Robyn Rihanna', apellido: 'Fenty ', nombreArtistico: 'Rihanna', estilo:'R&B, dance, pop, hip hop'  },
      { nombre: 'Mariah', apellido: 'Carey', nombreArtistico: 'Mariah Carey', estilo:'R&B / pop / dance pop / adult contemporary'  },
      { nombre: 'Whitney Elizabeth', apellido: 'Houston ', nombreArtistico: 'Whitney Houston', estilo:'R&B / pop rock / dance pop / pop soul / adult contemporary'  },
      { nombre: 'Céline Marie Claudette', apellido: 'Dion', nombreArtistico: 'Céline Dion', estilo:'Pop / pop rock / dance pop / adult contemporary / chanson'  },
      { nombre: 'Taylor Alison', apellido: 'Swift', nombreArtistico: 'Taylor Swift', estilo:'Country, country pop, pop, pop rock'  },
      { nombre: 'Stefani Joanne Angelina', apellido: 'Germanotta', nombreArtistico: 'Lady Gaga', estilo:'Pop, dance, electrónica, Jazz, Folk, Synth Pop'  },
      { nombre: 'Beyoncé Giselle', apellido: 'Knowles-Carter', nombreArtistico: 'Beyoncé', estilo:'R&B / teen pop / pop / dance pop / dancehall / adult contemporary / funk'  },

    ],
    discos:[

      {ano: '2023', titulo:'This is Me... Now', artista: 'JLo'},
      {ano: '2014', titulo:'A.K.A', artista: 'JLo'},
      {ano: '2016', titulo:'Glory', artista: 'Britney Spears'},
      {ano: '2013', titulo:'Britney Jean', artista: 'Britney Spears'},
      {ano: '2019', titulo:'Madame X', artista: 'Madonna'},
      {ano: '2015', titulo:'Rebel Heart', artista: 'Madonna'},
      {ano: '2016', titulo:'Anti', artista: 'Rihanna'},
      {ano: '2012', titulo:'Unapologetic', artista: 'Rihanna'},
      {ano: '2018', titulo:'Caution', artista: 'Mariah Carey'},
      {ano: '2014', titulo:'Me. I Am Mariah… The Elusive Chanteuse', artista: 'Mariah Carey'},
      {ano: '2009', titulo:'I Look to You', artista: 'Whitney Houston'},
      {ano: '2003', titulo:'One Wish: The Holiday Album', artista: 'Whitney Houston'},
      {ano: '2016', titulo:'Encore un soir', artista: 'Céline Dion'},
      {ano: '2012', titulo:'Sans attendre', artista: 'Céline Dion'},
      {ano: '2022', titulo:'Midnights', artista: 'Taylor Swift'},
      {ano: '2020', titulo:'Evermore', artista: 'Taylor Swift'},
      {ano: '2020', titulo:'Chromatica', artista: 'Lady Gaga'},
      {ano: '2016', titulo:'Joanne', artista: 'Lady Gaga'},
      {ano: '2016', titulo:'Lemonade', artista: 'Beyoncé'},
      {ano: '2022', titulo:'Renaissance', artista: 'Beyoncé'},
    ]
  },
  getters: {
    options_disc: state => state.options_disc,
    options_artist: state => state.options_artist,
    pages: state => state.pages,
    items: state => state.items,
    artists: state => state.artists,
    discos: state => state.discos,
    nom_artistas(state) {
      return state.artists.map((artista) => artista.nombreArtistico);
    },
    old_artist: state => state.old_artist,
    old_disc: state => state.old_disc,
  },
  mutations: {
    deleteArtista(state, nombreArtistico){
      state.artists = state.artists.filter(artist => artist.nombreArtistico != nombreArtistico)
      state.options_artist.forEach(opc =>{
        opc.selected= opc.title === 'Listar';
      })
    },
    deleteDisco(state, nombreDisco){
      state.discos = state.discos.filter(disco => disco.titulo != nombreDisco)
      state.options_disc.forEach(opc =>{
        opc.selected= opc.title === 'Listar';
      })
    },
    setDiscoEditing(state, titulo){
      state.old_disc = titulo;
    },
    setArtistaEditing(state, nombreArtistico){
      state.old_artist = nombreArtistico
    },
    editDisco(state, disco){
      let index = state.discos.findIndex(disco => disco.titulo == state.old_disc);
      console.log( index+''+ disco.titulo+' '+disco.ano+' '+disco.artista)

      state.discos[index].ano = disco.ano;
      state.discos[index].artista = disco.artista;
      state.discos[index].titulo = disco.titulo;

      state.old_disc = '';
      state.options_disc.forEach(opc =>{
        opc.selected= opc.title === 'Listar';
      })  
    },
    editArtista(state, artista){
      const index = state.artists.findIndex(art => art.nombreArtistico == state.old_artist);
      state.artists[index].nombre = artista.nombre;
      state.artists[index].apellido = artista.apellido;
      state.artists[index].estilo = artista.estilo;
      state.artists[index].nombreArtistico = artista.nombreArtistico;
      
      state.old_artist = '';
      state.options_artist.forEach(opc =>{
        opc.selected= opc.title === 'Listar';
      })  
    },
    addArtista(state, artista){
      state.artists.push(artista);

      state.options_artist.forEach(opc =>{
        opc.selected= opc.title === 'Listar';
      })  
    },
    addDisco(state, disco){
      state.discos.push(disco);
      state.options_disc.forEach(opc =>{
        opc.selected= opc.title === 'Listar';
      })
    },
    selectOpcArtistas(state, opcion){
      state.options_artist.forEach(opc =>{
        opc.selected= opc.title === opcion;
      })
    },
    selectOpcDiscos(state, opcion){
      state.options_disc.forEach(opc =>{
        opc.selected= opc.title === opcion;
      })
    },
    selectItem(state, itemSel){
      state.items.forEach(item =>{
        item.selected= item.title === itemSel;
      })
    }
    ,
    selectPage(state, page){
      state.pages.forEach(p =>{
        p.selected= p.title === page;
      })
    }
  },
  actions: {
    deleteArtista(context, nombreArtistico){
      context.commit("deleteArtista", nombreArtistico)
    },
    deleteDisco(context, nombreDisco){
      context.commit("deleteDisco", nombreDisco)
    },
    setDiscoEditing(context, titulo){
      context.commit("setDiscoEditing", titulo)
    },
    setArtistaEditing(context, nomArtistico){
      context.commit("setArtistaEditing", nomArtistico)
    },
    editDisco(context, disco){
      context.commit("editDisco", disco)
    },
    editArtista(context, artista){
      context.commit("editArtista", artista)
    },
    addDisco(context, disco){
      context.commit("addDisco", disco)
    },
    addArtista(context, artista){
      context.commit("addArtista", artista)
    },
    selectOpcArtistas(context, opcion){
      context.commit("selectOpcArtistas", opcion)
    },
    selectOpcDiscos(context, opcion){
      context.commit("selectOpcDiscos", opcion)
    },
    selectItem(context, itemSel){
      context.commit("selectItem", itemSel)
    }
    ,
    selectPage(context, page){
      context.commit("selectPage", page)
    }
  },
  modules: {
  }
})
