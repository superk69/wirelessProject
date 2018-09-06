<template>
<v-flex>
  <v-flex>
    <!-- container realtime zone -->
  <v-container fill-height fluid grid-list-md class="lighten-4 innerstyle h-100">       
        <v-layout row wrap>
         
          <v-flex
            lg3 md3 xs6 sm6
            v-for="card in orderedDevice_id "
            :key="card.index"
            
            
          >
            <v-card text-xs-center dark :color="oncolor(card.device_type)" >
                <div class="headline offline--text pt-2">&nbsp;&nbsp;&nbsp;{{card.home_name}}</div>
              
              <v-card-media
                :height="onresize"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 text-xs-center flexbox>
                        <div v-if="card.device_type=='อุปกรณ์ไฟฟ้า'" >
                          <v-flex xs12>
                                <v-icon class="headline" >fas fa-lightbulb</v-icon><br>
                                  <span class="headline hidden-sm-and-down" v-text="card.device_name"></span><br>
                                  <span class="caption hidden-md-and-up" v-text="card.device_name"></span><br>
                            <v-divider></v-divider>
                            <h1><span  v-if="card.device_status" class="display-1 hidden-sm-and-down">{{ card.value }}</span></h1>
                            <h1><span  v-if="card.device_status" class="headline hidden-md-and-up">{{ card.value }}</span></h1>
                            <span v-if="card.device_status" class="caption offline--text">{{card.device_unitname}}</span>
                          <span v-if="!card.device_status" class="caption offline--text">connection lost</span>
                          </v-flex>
                        
                      </div>

                       <div v-if="card.device_type=='แบตเตอรี่'" >
                          <v-flex xs12>
                                <v-icon class="headline" >fas fa-battery-three-quarters</v-icon><br>
                                  <span class="headline hidden-sm-and-down" v-text="card.device_name"></span><br>
                                  <span class="caption hidden-md-and-up" v-text="card.device_name"></span><br>
                            <v-divider></v-divider>
                            <h1><span  v-if="card.device_status" class="display-1 hidden-sm-and-down">{{ card.value }}</span></h1>
                            <h1><span  v-if="card.device_status" class="headline hidden-md-and-up">{{ card.value }}</span></h1>
                            <span v-if="card.device_status" class="caption offline--text">{{card.device_unitname}}</span>
                          <span v-if="!card.device_status" class="caption offline--text">connection lost</span>
                          </v-flex>
                        
                      </div>

                      <div v-if="card.device_type=='แผงโซล่าเซลล์'" >
                          <v-flex xs12>
                                <v-icon class="headline" >far fa-sun</v-icon><br>
                                  <span class="headline hidden-sm-and-down" v-text="card.device_name"></span><br>
                                  <span class="caption hidden-md-and-up" v-text="card.device_name"></span><br>
                            <v-divider></v-divider>
                            <h1><span  v-if="card.device_status" class="display-2 hidden-sm-and-down">{{ card.value }}</span></h1>
                            <h1><span  v-if="card.device_status" class="display-1 hidden-md-and-up">{{ card.value }}</span></h1>
                            <span v-if="card.device_status" class="caption offline--text">{{card.device_unitname}}</span>
                          <span v-if="!card.device_status" class="caption offline--text">connection lost</span>
                          </v-flex>
                        
                      </div>

                      <div v-if="card.device_type=='อุณภูมิ'" >
                          <v-flex xs12>
                                <v-icon class="headline" >fas fa-thermometer-empty</v-icon><br>
                                  <span class="headline hidden-sm-and-down" v-text="card.device_name"></span><br>
                                  <span class="caption hidden-md-and-up" v-text="card.device_name"></span><br>
                            <v-divider></v-divider>
                            <h1><span  v-if="card.device_status" class="display-2 hidden-sm-and-down">{{ card.value }}</span></h1>
                            <h1><span  v-if="card.device_status" class="display-1 hidden-md-and-up">{{ card.value }}</span></h1>
                            <span v-if="card.device_status" class="caption offline--text">{{card.device_unitname}}</span>
                          <span v-if="!card.device_status" class="caption offline--text">connection lost</span>
                          </v-flex>
                        
                      </div>

                       <div v-if="card.device_type=='เซ็นเซอร์วัดแสง'" >
                          <v-flex xs12>
                                <v-icon class="headline" >fas fa-sun</v-icon><br>
                                  <span class="headline hidden-sm-and-down" v-text="card.device_name"></span><br>
                                  <span class="caption hidden-md-and-up" v-text="card.device_name"></span><br>
                            <v-divider></v-divider>
                            <h1><span  v-if="card.device_status" class="display-2 hidden-sm-and-down">{{ card.value }}</span></h1>
                            <h1><span  v-if="card.device_status" class="display-1 hidden-md-and-up">{{ card.value }}</span></h1>
                            <span v-if="card.device_status" class="caption offline--text">{{card.device_unitname}}</span>
                          <span v-if="!card.device_status" class="caption offline--text">connection lost</span>
                          </v-flex>
                        
                      </div>

                       <div v-if="card.device_type=='ความชื้น'" >
                          <v-flex xs12>
                                <v-icon class="headline" >fas fa-thermometer-empty</v-icon><br>
                                  <span class="headline hidden-sm-and-down" v-text="card.device_name"></span><br>
                                  <span class="caption hidden-md-and-up" v-text="card.device_name"></span><br>
                            <v-divider></v-divider>
                            <h1><span  v-if="card.device_status" class="display-2 hidden-sm-and-down">{{ card.value }}</span></h1>
                            <h1><span  v-if="card.device_status" class="display-1 hidden-md-and-up">{{ card.value }}</span></h1>
                            <span v-if="card.device_status" class="caption offline--text">{{card.device_unitname}}</span>
                          <span v-if="!card.device_status" class="caption offline--text">connection lost</span>
                          </v-flex>
                        
                      </div>

                      <div v-if="card.device_type=='สวิตซ์'">
                          <span :color="colorSwitch(card.value,card.device_status)">{{ card.device_name }}</span><br>
                          <v-divider></v-divider> <br><br>
                          <v-btn 
                          v-if="card.device_status"
                          large 
                          class="elevation-0" 
                          dark
                          :color="colorSwitch(card.value,card.device_status)"
                        
                           >
                        
                            <h1 v-if="card.value">เปิด</h1>
                            <h1 v-if="!card.value">ปิด</h1>
                        
                        
                          </v-btn>
                          <br>
                       
                          <span v-if="!card.device_status" class="caption offline--text">connection lost</span>

                        
                      </div>

                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>

        </v-layout>
  </v-container>
    <!-- container control zone -->
  <br><br><br>
  </v-flex>
</v-flex>
</template>

<script>
  import {firebaseApp} from '../FirebaseApp'
  import axios from 'axios';
  import uniqid from 'uniqid';
  import len from 'object-length';
  import moment from 'moment';
  import _ from 'lodash';
  var socket;
export default {
  name : "Global",
  data () {
           return {
        index : 0,
        dialog : false,
        edit_dialog: false,
        detail_dialog : false,
        displayname: '',
        photoURL: '',
        home_id : 'jdcekavg',
        home_data : [],
        io : null,
        createdevice : [{
          home_id : null,
          device_id : null,
          device_name : null,
          device_type : null,
          device_unitname : null,
          device_added : null,
          device_public : null
        }],
        windowSize: {
          x: 0,
          y: 0
        }
        ,
        device_type_list:  ['แสดงข้อมูล','แผงควบคุม'],
        device_public_list:  ['สาธารณะ','ส่วนตัว'],
        interval : [],
        value : [],
        control_value : 100,
        cards: [],
        topcards : [],
        now: moment().format('HH:mm'),
        PA : ''
      }
  },
  mounted () {
     let authListenerUnsuscribe = firebaseApp.auth().onAuthStateChanged(user => { 
        if (user) {
          var data =[user.email,user.displayName,user.photoURL,user.providerData[0].providerId,user.uid];
          console.log("user",data)
          this.$store.commit('updateUser',data);    
          }else{
          this.$router.replace("/");
          this.login_dialog = true; 
          }
        });
       
          this.windowSize = { x: window.innerWidth, y: window.innerHeight }
          this.add()
          var vm =this
      socket.on('publiclog', function (data) {
          
          vm.io = data
          console.log(vm.io);
          
      });
      
  },
  methods : {
    colorMonitor(el,st) {
        let res;
            if(el>75){
              res =  'red'
            }else if(el>50){
              res =  'orange'
            }else if(el>25){
              res =  'yellow'
            }else if(el>0){
              res =  'green'
            }
            if(!st){
              res = 'offline'
            }

            return res
      },
      oncolor(Cardtype){
        //['แบตเตอรี่','สวิตซ์','อุปกรณ์ไฟฟ้า','อุณภูมิ','ความชื้น','เซ็นเซอร์วัดแสง','แผงโซล่าเซลล์'],
          if(Cardtype=="แบตเตอรี่"){
            return 'pink darken-3'
          }else if(Cardtype=="แผงโซล่าเซลล์"){
            return 'purple darken-2'
          }else if(Cardtype=="อุปกรณ์ไฟฟ้า"){
            return 'teal darken-1'
          }else if(Cardtype=="สวิตซ์"){
            return 'deep-orange darken-4'
          }else if(Cardtype=="อุณภูมิ"){
            return 'red darken-1'
          }else if(Cardtype=="ความชื้น"){
            return 'red darken-1'
          }else if(Cardtype=="เซ็นเซอร์วัดแสง"){
            return 'red darken-1'
          }
    },
      colorSwitch(el,st){
        let res;
            if(el){
              res= 'green'
            }else{
              res= 'red'
            }
            if(!st){
              res = 'offline'
            }
            return res
      },
      add() {
                socket = io.connect('http://'+this.$store.state.host+'');
                console.log("emitting");
                
                socket.emit("publicrealtime", '');        
               
      },   
  },
  created () {
    this.$store.commit('updatesubTitle','');
    this.$store.commit('updatesubText','');
    this.$store.commit('updateComponent',0);
    document.head.querySelector('meta[name=theme-color]').content = this.$store.state.color_component 
    console.log("changed", this.$store.state.color_component)
  },
   destroyed () {
      console.log("close socket");
      socket.disconnect();
    },
     computed:{
        orderedDevice_id: function () {
            return _.orderBy(this.io, 'device_id')
        },
        onresize(){
            return this.windowSize.y/4
        }   
    }
}
</script>
