import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token : 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTg0MjQ0OTZ9.tfWYolTORaVRgjZu6sLBIyNr4Ll5fCeabJDMT69hJhU',
        email : null,
        displayname : null,
        photoURL : null,
        providerId : null,
        drawer : true,
        home_id : '',
        subtitle : '',
        subtext : '',
        value  : null,
        host : "localhost:3000",
        component : 1,
        color_component : '#FFF',
        x : 0,
        y : 0

    },
    mutations : {
        updateComponent(state,data){
            state.component = data;
        },
        updateUser(state,data){
            state.email = data[0];
            state.displayName = data[1];
            state.photoURL = data[2];
            state.providerId = data[3];
            state.email = data[4];
            console.log("commit data",data);
            
        },
        updateDrawer(state,data){
            state.drawer = data;
        },
        updatesubTitle(state,data){
            state.subtitle = data
        },
        updatesubText(state,data){
            state.subtext = data
        },       
        updateWatcher(state,data){
            state.home_id = data;
        },
        updateValue(state,data){
            state.value = data;
        },
        updateSize(state,data){
            state.x = data.x;
            state.y = data.y;
        },
        updateColor(state,data){
            state.color_component = data;
        }

    }
  });