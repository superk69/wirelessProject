<template>
  <v-app>
    <v-toolbar app class="elevation-0" :clipped-left="true" sticky style="z-index:99;" :color="color" dark >
      <v-toolbar-title v-if="$store.state.subtitle==''" v-text="title"></v-toolbar-title>
      <h1 v-if="$store.state.subtitle!=''">&nbsp;@{{$store.state.subtitle}}</h1>
      <v-spacer></v-spacer>
      <span class="hidden-sm-and-down" v-text="$store.state.subtext"></span>
        <v-menu bottom left class="hidden-md-and-up">

            <v-btn icon slot="activator" dark>
              <v-badge left color="red">
              <span slot="badge" v-if="len_noti>0">{{len_noti}}</span>
              <v-icon>more</v-icon>
              </v-badge>
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-avatar size="32px"><img :src="photoURL" alt="profile_picture"></v-avatar>
                <v-list-tile-title>&nbsp;&nbsp;{{displayName}}</v-list-tile-title>
              </v-list-tile>
               <v-divider></v-divider>
              <v-list-tile
                 v-for="notis in noti"
                :key="notis.device_id"
                text-xs-center
                @click="gotoConsole(notis.home_id)"
              >
              <v-list-tile-title>
                อุปกรณ์ {{notis.device_id}} ขาดการเชื่อมต่อ
              </v-list-tile-title>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile @click="Logout">
                <v-list-tile-title><span class="gray pink--text right">ออกจากระบบ</span></v-list-tile-title>
              </v-list-tile>
            </v-list>
        </v-menu>
        <v-menu bottom left class="hidden-sm-and-down">
          
            <v-btn slot="activator" :color="color">
              <v-badge left color="red">
              <span slot="badge" v-if="len_noti>0">{{len_noti}}</span>
              <span>{{displayName}}&nbsp;&nbsp;</span>
              <v-avatar size="32px"><img :src="photoURL" alt="profile_picture"></v-avatar>
              </v-badge>
            </v-btn>
            
            <v-list>
              <v-list-tile>
                
                <v-list-tile-title>&nbsp;&nbsp;{{displayName}}</v-list-tile-title>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile
                 v-for="notis in noti"
                :key="notis.device_id"
                text-xs-center
                @click="gotoConsole(notis.home_id)"
              >
              <v-list-tile-title>
                อุปกรณ์ {{notis.device_id}} ขาดการเชื่อมต่อ
              </v-list-tile-title>
              </v-list-tile>
              <v-divider></v-divider>

              <v-list-tile @click="Logout">
                <v-list-tile-title><span class="gray pink--text right">ออกจากระบบ</span></v-list-tile-title>
              </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>


    <v-content>
      {{changedComponent}}
      <router-view class="py-1 px-1"></router-view>
      <v-layout row justify-center>
        <v-dialog v-model="login_dialog" fullscreen transition="dialog-bottom-transition" :overlay="false" >
          <v-card  transition="slide-y-transition">
          <v-card-media :height="this.$store.state.y*0.33" src="/static/top.jpg" >
            </v-card-media >
            <v-card-media :height="this.$store.state.y*0.34" class="text-xs-center">
                  <v-flex class="text-xs-center" >
                  <h1 class="hidden-md-and-up">SMARTGRID UBU</h1><br>
                  <h1 class="hidden-sm-and-down">SMARTGRID POWER MANAGEMENT : UBU</h1><br>
                  <v-btn  @click="Fsign()" dark large color="facebook" class="elevation-0"><v-icon>fa-facebook</v-icon> &nbsp;&nbsp; Login With Facebook</v-btn><br>
                  <v-btn  @click="Gsign()"  large color="google" class="elevation-0"><v-icon>fa-google</v-icon> &nbsp;&nbsp; Login With Google &nbsp;</v-btn>
                  </v-flex>
            </v-card-media>
          <v-card-media :height="this.$store.state.y*0.33" bottom src="/static/btm.png" ></v-card-media>
          </v-card>
        </v-dialog>
    </v-layout>

      
    
  </v-content>
  <v-bottom-nav fixed shift :value="true" :active.sync="e2" :color="color" >
        <v-btn dark>
          <span>GLOBAL</span>
          <v-icon>language</v-icon>
        </v-btn>
        <v-btn dark>
          <span>MY DASHBOARD</span>
          <v-icon>dashboard</v-icon>
        </v-btn>
        <v-btn dark >
          <span>CONSOLE</span>
          <v-icon>assessment</v-icon>
        </v-btn>
        <v-btn dark >
          <span>CHARTS</span>
          <v-icon>account_box</v-icon>
        </v-btn>
      </v-bottom-nav>

    



  </v-app>
</template>

<script>
import firebase from 'firebase'
import { firebaseApp,Fprovider,Gprovider } from './FirebaseApp';
import axios from 'axios'
 import len from 'object-length';
export default {
  data () {
    return {
      e2: 1,
      clipped: false,
      login_dialog : false,
      title: 'SMARTGRID UBU',
      photoURL : "/static/avatar.png",
      uid : null,
      displayName : null,
      email : null,
      providerId : null,
      windowSize: {
        x: 0,
        y: 0
      },
      noti : null,
      len_noti : 0
    }
  },
  name: 'App',
  computed : {
     color () {
        switch (this.e2) {
          case 0: this.elColor = '#607D8B'; return 'amber darken-2'
          case 1: this.elColor = '#009688'; return 'teal'
          case 2: this.elColor = '#795548'; return 'indigo darken-2'
          case 3: this.elColor = '#3F51B5'; return 'deep-orange darken-4'
        }
      },
      changedComponent(){
        if(this.$store.state.component != this.e2){
          this.e2 = this.$store.state.component
        }
      }
 
  },
  watch: {
    color: function() {
      this.swapComponent();
    }
  },
  methods : {
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        this.$store.commit('updateSize',this.windowSize);
      },
      gotoConsole(home_id){
         axios({ method: "POST", "url": "http://"+this.$store.state.host+"/notification/"+ this.email, "data":{}, "headers": { "content-type": "application/json", "Authorization" : this.$store.state.token } }).then(result => {
            this.$store.commit('updateWatcher',home_id);
            this.$router.push('/console');
            this.getNotifications(this.email)
            }, error => {
                        console.error(error);
            });
      
    },
      swapComponent () {
        this.$store.commit('updateColor',this.elColor);
        this.$store.commit('updateComponent',this.e2);
        switch (this.e2) {
          case 0: this.$router.replace('/global'); break;
          case 1: this.$router.replace('/') ; break;
          case 2: this.$router.replace('/console') ; break;
          case 3: this.$router.replace('/Charts') ; break;
        }
      },
     
      Fsign () {
        firebase.auth().signInWithPopup(Fprovider).then((result) => {
          this.login_dialog = false; 
        });      
      },

      Gsign () {
        firebase.auth().signInWithPopup(Gprovider).then((result) => {
          this.login_dialog = false; 
          var tmpurltoedit = "http://"+this.$store.state.host+"/user";
          axios({ method: "GET", "url": tmpurltoedit,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                  
          })
        });      
      },

      Logout(){
            
            firebaseApp.auth().signOut();
            var data =[null,null,"/static/avatar.png",null,null];
            this.$store.commit('updateUser',data);
            this.photoURL = this.$store.state.photoURL
            this.uid = this.$store.state.uid
            this.displayName = this.$store.state.displayName
            this.email = this.$store.state.email
            this.providerId = this.$store.state.providerId
            this.$router.replace("/"); 
            
        },
        getNotifications(email){
           var tmpurltoedit = "http://"+this.$store.state.host+"/notification/"+email;
           console.log(tmpurltoedit);
           
          axios({ method: "GET", "url": tmpurltoedit,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                  this.noti = result.data;
                  this.len_noti = len(result.data)
          })
        }

  },
  mounted () {
      this.onResize()
      let authListenerUnsuscribe = firebase.auth().onAuthStateChanged(user => { 
        if (user) {
          var data =[user.email,user.displayName,user.photoURL,user.providerData[0].providerId,user.uid];
          console.log("user",data)
          this.$store.commit('updateUser',data);
          this.login_dialog = false;
          this.photoURL = this.$store.state.photoURL
          this.uid = this.$store.state.uid
          this.displayName = this.$store.state.displayName
          this.email = user.email;
          this.providerId = this.$store.state.providerId 
          var tmpurltoedit = "http://"+this.$store.state.host+"/user";
         
           axios({ method: "POST", "url": tmpurltoedit,data : {'displayname' : this.displayName , 'email' : this.email},"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
             
          })
          this.getNotifications(user.email);
          this.interval = setInterval(this.getNotifications(user.email), 60000);      
          }else{
          this.$router.replace("/");
          this.login_dialog = true; 
          }
        });
  },
  created () {
    
  },
  beforeDestroy () {
      clearInterval(this.interval)
    },

}
</script>
