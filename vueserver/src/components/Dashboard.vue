<template>

<v-flex>
      <v-snackbar
      :timeout="6000"
      :top="true"
      :value="completedalert"
    >
      สร้างแดชบอร์ดสำเร็จ
      <v-btn flat color="pink" @click.native="completedalert = false">Close</v-btn>
    </v-snackbar>
  <!-- add btn zone -->
  <v-card class="mb-2 mt-0 pt-1 offline elevation-0" dark style="height:30px" >
               <v-card-text class="pt-0 teal--text">DASHBOARD</v-card-text>
                  <v-btn
                  @click="preparecreateDashboard"
                    class="pr-0"
                    absolute
                    dark
                    fab
                    bottom
                    right
                    color="teal"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
  </v-card>
  <!-- card zone -->
  <v-container v-if="cards.length==0">
    <v-layout row warp>
        <v-flex xs12 sm12 md12 lg12>
            <v-alert :value="true" type="error">
      ดูเหมือนคุณยังไม่มี DASHBOARD เลย กด + เพื่อเพิ่ม
    </v-alert>
        </v-flex>
    </v-layout>
  </v-container>
  <v-container grid-list-md >
          <v-layout row wrap>
            <v-flex
             lg4 md4 xs12 sm12
              v-for="card in cards"
              :key="card.title"
            >
              <v-card >
                <v-card-media
                  :src="card.picture"
                  height="100px"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.home_name"/>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-title>
                  <v-flex xs12>
                    <span class="grey--text">{{card.weather.province}}</span><br>
                    <span>{{card.home_detail}}</span>
                    <v-divider></v-divider>
                  </v-flex>
                  
                  
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-actions>
                    <v-btn dark small color="black" @click="gotoConsole(card.home_id)">ไปที่ Console</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat drak small color="black" v-model="card.home_id"  @click="PrePereEdit(card.home_id)">แก้ใข</v-btn>
                    <v-btn flat small  color="red" v-model="card.home_id"  @click="deleteDashboard(card.home_id,false)">ลบ</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
  </v-container>
  <br><br><br>
  <!-- edit card zone -->
  <v-layout row justify-center>
    <v-dialog v-model="edit_dialog" persistent max-width="500px">
      <v-card><v-card-title><span class="headline">แก้ใขแดชบอร์ด</span></v-card-title><v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field box v-model="dashboardObj.home_id" label="หมายเลขแดชบอร์ด" readonly required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field box v-model="dashboardObj.home_name" label="ชื่อแดชบอร์ด" hint="กรอกชื่อแดชบอร์ด เช่น บ้าน ที่ทำงาน" required></v-text-field>
              </v-flex>
               <v-flex xs12 sm6 md6>
                <v-text-field box  v-model="dashboardObj.home_location.lat" label="ละติจูด" hint="ละติจูดตำแหน่งที่ตั้งของแดชบอร์ด" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field box v-model="dashboardObj.home_location.lng" label="ลองติจูด" hint="ลองติจูดตำแหน่งที่ตั้งของแดชบอร์ด" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                textarea 
                v-model="dashboardObj.home_detail"
                label="รายละเอียดแดชบอร์ด" 
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="stack_email"
                  label="สมาชิกในแดชบอร์ด"
                  multiple
                  autocomplete
                  chips
                  required
                  :items="memberlist"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  v-model="dashboardObj.weather.province"
                  label="จังหวัด"
                  required
                  :items="Province"
                  @change="getStations"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="สถานี"
                  required
                  v-model="dashboardObj.weather.station"
                  :items="StationNameTh"
                  
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="edit_dialog = false" >Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="edit_dialog = false" @click="saveEditDashboard" >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

  <!-- add card zone -->
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title><span class="headline">สร้างแดชบอร์ด</span></v-card-title>
          <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field box v-model="dashboardObj.home_id" label="หมายเลขแดชบอร์ด" readonly required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field :rules="formRule" box v-model="dashboardObj.home_name" label="ชื่อแดชบอร์ด" hint="กรอกชื่อแดชบอร์ด เช่น บ้าน ที่ทำงาน" required></v-text-field>
              </v-flex>
               <v-flex xs12 sm6 md6>
                <v-text-field :rules="formRule" box  v-model="dashboardObj.home_location.lat" label="ละติจูด" hint="ละติจูดตำแหน่งที่ตั้งของแดชบอร์ด" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field  :rules="formRule" box v-model="dashboardObj.home_location.lng" label="ลองติจูด" hint="ลองติจูดตำแหน่งที่ตั้งของแดชบอร์ด" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                textarea 
                v-model="dashboardObj.home_detail"
                label="รายละเอียดแดชบอร์ด" 
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-select
                  box
                  :rules="formRule" 
                  v-model="stack_email"
                  label="สมาชิกในแดชบอร์ด"
                  multiple
                  autocomplete
                  chips
                  required
                  v-bind:items="memberlist"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  box
                  v-model="dashboardObj.weather.province"
                  label="จังหวัด"
                  :rules="formRule" 
                  required
                  :items="Province"
                  
                  @change="getStations"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  box
                  label="สถานี"
                  required
                  v-model="dashboardObj.weather.station"
                  :items="StationNameTh"
                  
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false" >Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false" @click="saveDashboard">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

      <v-dialog v-model="deletedialog" max-width="500px">
        <v-card>
          <v-card-title>
            กรุณากรอกข้อความ "{{delete_id}}" เพื่อยืนยันการลบ
          </v-card-title>
          <v-card-text>
            <v-text-field
            v-model="compare_delete"
     
      label="กรอกรหัสเพื่อยืนยันการลบ"
      required
    ></v-text-field>
          </v-card-text>
           <v-card-actions>
            <v-btn color="black" flat @click.stop="deletedialog=false">Close</v-btn>
            <v-spacer></v-spacer>
             <v-btn color="blue darken-1" flat @click="deleteDashboard(delete_id,true)">ลบแดชบอร์อด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

</v-flex>
</template>

<script>
import {firebaseApp} from '../FirebaseApp'
import axios from 'axios';
import uniqid from 'uniqid';
import len from 'object-length';
export default {
  name : "Dashboard",
  data () {
      return {
              dashboardObj : {
        home_id : null,
        home_name : null,
        home_location : {
                          lat : null,
                          lng : null
                        },
        home_detail : null,
        member : [{ email : this.$store.state.email}],
        weather : {
                    province : null,
                    station : null
                  },
        device_list : []
      },
      cards : [],
      Edit_home_device: [],
      completedalert : false,
      putdata : [],
      deletedialog: false,
      compare_delete : null,
      delete_id : null,
      dialog: false,
      edit_dialog : false,
      datalength : 0,
      Province : [],
      StationNameTh : [] ,
      stack_email : [],
      device_list : [],
      memberlist : null,
      email : null,
      formRule : [
         v => {
          return !!v || 'กรุณากรอกข้อมูล'
        }
      ]
      }
  },
  methods :{
    goto(link){
            this.$router.push(link);
    },
    gotoConsole(home_id){
      this.$store.commit('updateWatcher',home_id);
      this.$router.push('/console');
    },
    deleteDashboard(id,state){
      if(state==false){
          this.delete_id = id
          this.compare_delete= null
          this.deletedialog = true
      }else{
        if(this.compare_delete==this.delete_id){
          this.putdata = {"home_id": id};
      console.log("dalete",this.putdata);
       axios({ method: "DELETE", "url": "http://"+this.$store.state.host+"/home", "data": this.putdata, "headers": { "content-type": "application/json", "Authorization" : this.$store.state.token } }).then(result => {
                        this.deletedialog = false
                        this.onloadDashboard(this.email);
            }, error => {
                        console.error(error);
            });
      }
    }
      
      
    },
    preparecreateDashboard(){
                this.dashboardObj = {
        home_id : null,
        home_name : null,
        home_location : {
                          lat : null,
                          lng : null
                        },
        home_detail : null,
        member : [{ email : this.$store.state.email}],
        weather : {
                    province : null,
                    station : null
                  },
        device_list : []
      }
      this.dashboardObj.home_id = uniqid();
      this.stack_email= [];
      this.stack_email[0] = this.$store.state.email;

                      axios({ method: "GET", "url": "http://"+this.$store.state.host+"/user/","headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                        this.memberlist = result.data;
                        this.dialog = true;
                      }, error => {
                        console.error(error);
                      });
    },
    saveDashboard(){
         var tmparray = Array();
                  for(var i=0;i< len(this.stack_email);i++){
                    tmparray.push({"email": this.stack_email[i]});
                  }
                 this.putdata = {
                            "home_id": this.dashboardObj.home_id,
                            "home_name" : this.dashboardObj.home_name,
                            "home_location" : {
                                          "lat" : this.dashboardObj.home_location.lat,
                                          "lng" : this.dashboardObj.home_location.lng
                              },
                            "home_detail" : this.dashboardObj.home_detail,
                            "member" : tmparray,
                            "weather" : {
                                          "province" : this.dashboardObj.weather.province,
                                          "station" : this.dashboardObj.weather.station
                                        },
                            "device_list" : this.device_list
                          };
                          console.log("prepare put",this.putdata);
            axios({ method: "PUT", "url": "http://"+this.$store.state.host+"/home","headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }, "data": this.putdata }).then(result => {
                        this.completedalert = true;
                        this.onloadDashboard(this.email);
            }, error => {
                        console.error(error);
            });
    },
    saveEditDashboard(){
                  var tmparray = Array();
                  for(var i=0;i< len(this.stack_email);i++){
                    tmparray.push({"email": this.stack_email[i]});
                  }
                 this.putdata = {
                            "home_id": this.dashboardObj.home_id,
                            "home_name" : this.dashboardObj.home_name,
                            "home_location" : {
                                          "lat" : this.dashboardObj.home_location.lat,
                                          "lng" : this.dashboardObj.home_location.lng
                              },
                            "home_detail" : this.dashboardObj.home_detail,
                            "member" : tmparray,
                            "weather" : {
                                          "province" : this.dashboardObj.weather.province,
                                          "station" : this.dashboardObj.weather.station
                                        },
                            "device_list" : this.device_list
                          };
                          console.log("prepare put",this.putdata);
            axios({ method: "POST", "url": "http://"+this.$store.state.host+"/home", "data": this.putdata, "headers": { "content-type": "application/json", "Authorization" : this.$store.state.token } }).then(result => {
                        this.responses = result.data;
                        this.onloadDashboard(this.email)
            }, error => {
                        console.error(error);
            });
    },
    getStations(value){
            axios({ method: "GET", "url": "http://"+this.$store.state.host+"/getStations/"+value,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                        this.StationNameTh = result.data;
            }, error => {
                        console.error(error);
            });
    },
    PrePereEdit(value){
            axios({ method: "GET", "url": "http://"+this.$store.state.host+"/edithome/"+value,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token } }).then(result => {
                  console.log("dtar",result.data)
                  this.dashboardObj.weather.province = result.data[0].weather.province;
                  this.dashboardObj.home_id = result.data[0].home_id;
                  this.dashboardObj.home_name = result.data[0].home_name;
                  this.dashboardObj.home_location.lat = result.data[0].home_location.lat;
                  this.dashboardObj.home_location.lng = result.data[0].home_location.lng;
                  this.dashboardObj.home_detail = result.data[0].home_detail;
                  var length = result.data[0].member.length;
                  this.device_list= result.data[0].device_list;
                  this.dashboardObj.weather.station = result.data[0].weather.station;
                  for(var i=0;i< length;i++){
                    this.stack_email[i] = result.data[0].member[i].email;
                    
                  }

                  console.log("email",this.stack_email)
                      axios({ method: "GET", "url": "http://"+this.$store.state.host+"/getStations/"+result.data[0].weather.province,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                        this.StationNameTh = result.data;
                      }, error => {
                        console.error(error);
                      });
                      axios({ method: "GET", "url": "http://"+this.$store.state.host+"/user/","headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                        this.memberlist = result.data;
                      }, error => {
                        console.error(error);
                      });
                      
                  this.edit_dialog = true;
            }, error => {
                        console.error(error);
            });

    },
    onloadDashboard(id){
      var url = "http://"+this.$store.state.host+"/home/"+id;
      console.log("dashboard onload url",url);
      
                  axios({ method: "GET", "url": url,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token } }).then(result => {
                      this.datas = result.data;
                      this.datalength =  result.data.length;
                      this.cards = [];
                      console.log('data',result.data);
                          for(var i=0;i<len(result.data);i++){
                              result.data[i].picture = '/static/cover.jpg';
                              this.cards.push(result.data[i]);
                          }    
                      }, error => {
                              console.error(error);
                      
                   });
                  axios({ method: "GET", "url": "http://"+this.$store.state.host+"/weatherlocation/","headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                      this.Province = result.data;
                      }, error => {
                              console.error(error);
                      });

    }
  }, 
  mounted() {
        let authListenerUnsuscribe = firebaseApp.auth().onAuthStateChanged(user => { 
        if (user) {
              var data =[user.email,user.displayName,user.photoURL,user.providerData[0].providerId];
              console.log('dashbaord user',data);
              
              this.$store.commit('updateUser',data);
              this.email= data[0]
              this.onloadDashboard(this.email);      
        }
      });
      
},
  created () {
    this.$store.commit('updatesubTitle','');
    this.$store.commit('updatesubText','');
    this.$store.commit('updateComponent',1);
    document.head.querySelector('meta[name=theme-color]').content = this.$store.state.color_component 
    console.log("changed", this.$store.state.color_component)
  }
}
</script>
