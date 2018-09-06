<template>
<v-flex>
  <v-flex>
    <!-- container temp zone -->
  <v-container fill-height fluid grid-list-md class="lighten-4 innerstyle h-100">
           <!-- v-bind="{ [`lg${topcard.flex}`]: true }" -->
        <v-layout row wrap>
          <v-flex
            lg3 md3 xs6 sm6
            v-for="topcard in topcards"
            :key="topcard.title"
            text-xs-center
          >
            <v-card
            
            >
              <v-card-media
                height="110px"
                 :src="topcard.picture"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 text-xs-center flexbox>
                      <div v-if="topcard.type=='แสดงข้อมูล'">
                  
                          <span  class="topic white--text" v-text="topcard.title"></span><br>
                        <h1 class="display-1 white--text">{{ topcard.value }}</h1>
                          <v-divider></v-divider>
                          <span class="caption white--text">{{topcard.unitname}}</span>
                        </div>
         
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>
                    <v-flex
            lg3 md3 xs6 sm6
            text-xs-center
          >
            <v-card
            
            >
              <v-card-media
                height="110px"
                 src="/static/time.jpg"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 text-xs-center flexbox>
                  
                          <span  class="topic white--text">เวลา</span><br>
                        <h1 class="display-1 white--text">{{ now }}</h1>
                          <v-divider></v-divider>
                          <span class="caption white--text">นาที</span>

         
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
  </v-container>
    <!-- container realtime zone -->
  <v-container fill-height fluid grid-list-md class="lighten-4 innerstyle h-100">       
        <v-layout row wrap>
         
          <v-flex
            lg3 md3 xs6 sm6
            v-for="card in orderedDevice_id "
            :key="card.index"
            
            
          >
            <v-card dark :color="oncolor(card.device_type)">

              
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
                          @click="updateState(card.device_id,card.value)"
                          :color="colorSwitch(card.value,card.device_status)"
                        
                           >
                        
                            <h1 v-if="card.value">เปิด</h1>
                            <h1 v-if="!card.value">ปิด</h1>
                        
                        
                          </v-btn>
                          <br>
                          <span v-if="card.prediction!='none'&&card.device_status">ระบบแนะนำให้ : <h1 class="headline" v-if="card.prediction=='false'">เปิด</h1><h1 class="headline" v-if="card.prediction=='true'">ปิด</h1></span>
                          <br>
                       
                          <span v-if="!card.device_status" class="caption offline--text">connection lost</span>

                        
                      </div>




                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-actions class="dark" >
                <v-spacer></v-spacer>
                <v-btn icon  @click="viewdetail(card.device_id)">
                  <v-icon color="offline"  >fas fa-comment-alt</v-icon>
                </v-btn>
                <v-btn icon  @click="prepareeditConsole(card.device_id)">
                  <v-icon color="offline">fas fa-cogs</v-icon>
                </v-btn>
                <v-btn icon @click="deleteConsole(card.device_id,false)">
                  <v-icon color="offline">fas fa-minus-circle</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

        </v-layout>
  </v-container>
    <!-- container control zone -->
  <v-container fluid grid-list-md class="lighten-4 innerstyle offline h-100" dark style="height:60px">
        <v-layout row wrap xs12 md12 sm12 lg12>
                  <v-btn
                    class="pr-0 pt-0"
                    absolute
                    dark
                    fab
                    buttom
                    right
                    color="brown"
                    @click="dialog=true"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
        </v-layout>
  </v-container>

  <br><br><br>
  </v-flex>

  <!-- flex control popup -->
  <v-flex>
          <!-- layout add dailog -->
          <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="500px">
              <!-- <v-btn color="primary" dark slot="activator">คลิกเพื่อเพิ่มอุปกรณ์</v-btn> -->
                <v-card>
                  <v-divider></v-divider>
                  <v-card-title><span class="headline black--text">เพิ่มอุปกรณ์</span></v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md6>
                        <v-text-field v-model="createdevice.device_id" label="หมายเลขอุปกรณ์" readonly required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-text-field v-model="createdevice.device_name" label="ชื่ออุปกรณ์" hint="กรอกชื่อแดชบอร์ด เช่น บ้าน ที่ทำงาน" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-text-field  v-model="createdevice.device_unitname" label="หน่วยของข้อมูล" hint="ละติจูดตำแหน่งที่ตั้งของแดชบอร์ด" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select
                          v-model="createdevice.device_type"
                          label="ประเภทการแสดงผล"
                          required
                          :items="device_type_list"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select
                          label="การเข้าถึง"
                          required
                          v-model="createdevice.device_public"
                          :items="device_public_list"
                          
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>เครื่องหมาย * หมายถึงข้อมูลที่ต้องกรอก</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="pink darken-1" flat @click.native="dialog = false"  >Close</v-btn>
                  <v-btn color="green darken-1" flat @click.native="dialog = false" @click="createDevice" >Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>

          <!-- layout edit dailog -->
          <v-layout row justify-center>
            <v-dialog v-model="edit_dialog" persistent max-width="500px">
                <v-card>
                  <v-card-title><span class="headline">แก้ใขอุปกรณ์</span></v-card-title>
                  <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md6>
                        <v-text-field v-model="createdevice.device_id" label="หมายเลขอุปกรณ์" readonly required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-text-field v-model="createdevice.device_name" label="ชื่ออุปกรณ์" hint="กรอกชื่อแดชบอร์ด เช่น บ้าน ที่ทำงาน" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-text-field  v-model="createdevice.device_unitname" label="หน่วยของข้อมูล" hint="เช่น watt v amp เป็นต้น" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select
                          v-model="createdevice.device_type"
                          label="ประเภทการแสดงผล"
                          required
                          :items="device_type_list"
                          readonly
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select
                          label="การเข้าถึง"
                          required
                          v-model="createdevice.device_public"
                          :items="device_public_list"
                          
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>เครื่องหมาย * หมายถึงข้อมูลที่ต้องกรอก</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="edit_dialog = false"  >Close</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="edit_dialog = false" @click="editDevice" >Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>  
          </v-layout>

          <!-- layout detail dailog -->
          <v-layout row justify-center>
            <v-dialog v-model="detail_dialog" persistent max-width="1100px">
                <v-card>
                  <v-card-title><span class="headline">การเชื่อมต่ออุปกรณ์กับระบบ</span></v-card-title>
                  <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                        <v-card
                        label="ในการเชื่อมต่อกับระบบ ให้ทำการใส่ข้อมูลเข้าไปดังต่อไปนี้"
                      >
                        pubString = "{\"device_id\": \"{{createdevice.device_id}}\",\"value\": ค่าที่ต้องการส่ง}";<br>
                        String pubStringLength = String(pubString.length(), DEC);<br>
                        client.println("PUT /realtime HTTP/1.1");<br>
                        client.println("Host: {{this.$store.state.host}}");<br>
                        client.println("Authorization: JWT {{createdevice.device_token}}");
                        client.println("Content-Type: application/json");<br>
                        client.println("Connection: close");<br>
                        client.print("Content-Length: ");<br>
                        client.println(pubStringLength);<br>
                        client.print(pubString);<br>
                      </v-card>
                      </v-flex>
                    
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="detail_dialog = false"  >Close</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="detail_dialog = false" @click="editDevice" >Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>   
          </v-layout>
          
  </v-flex>
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
             <v-btn color="blue darken-1" flat @click="deleteConsole(delete_id,true)">ลบอุปกรณ์</v-btn>
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
  import moment from 'moment';
  import _ from 'lodash';
  var socket;

  export default {
    name: 'Console',
    data () {
      return {
        index : 0,
        dialog : false,
        edit_dialog: false,
        detail_dialog : false,
        displayname: '',
        cardColor: 'white',
        photoURL: '',
        home_id : '',
        home_data : [],
        io : null,
        createdevice : [{
          home_id : null,
          device_id : null,
          device_name : null,
          device_type : null,
          device_unitname : null,
           deletedialog: false,
          compare_delete : null,
          delete_id : null,
          device_added : null,
          device_public : null
        }],
        windowSize: {
          x: 0,
          y: 0
        }
        ,
        device_type_list:  ['แบตเตอรี่','สวิตซ์','อุปกรณ์ไฟฟ้า','อุณภูมิ','ความชื้น','เซ็นเซอร์วัดแสง','แผงโซล่าเซลล์'],
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
    methods: {
      getDateFromNow(date){
        return moment(date).fromNow();
      },
      updateState(id,value){
        var state;
        if(!value||value==null){
          state = true
        }else{
          state = false
        }
        console.log("updatestate",state,"to",id)
        axios({ method: "post", "url": "http://"+this.$store.state.host+"/state","data": {"home_id" : this.$store.state.home_id,"device_id" : id,"value" : state},"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {

        });

      },
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
      colorSwitch(el,st){
        let res;
            if(el){
              res= 'red'
            }else{
              res= 'grayz'
            }
            if(!st){
              res = 'offline'
            }
            return res
      },
      preparing_homedata(id){
        this.topcards = [];
        this.cards = [];
        console.log("home_id",id)
        this.home_id  =id
        axios({ method: "GET", "url": "http://"+this.$store.state.host+"/edithome/"+id,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                        
                        this.home_data.push(result.data[0]);
                        this.createdevice.device_id = uniqid();
                        this.$store.commit('updatesubTitle',result.data[0].home_name);
                        this.$store.commit('updatesubText',result.data[0].home_detail);

                        // get weather data 
                          var tmpurl = "http://"+this.$store.state.host+"/gettempdata/"+this.home_data[0].weather.province+"/"+this.home_data[0].weather.station;
                              axios({ method: "GET", "url": tmpurl,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                                    console.log(tmpurl,"weather",result);
                                    
                                    this.topcards.push({ title: "อุณหภูมิ",type:'แสดงข้อมูล', unitname : "องศาเซลเซียส",value: result.data[0].Observe.Temperature.Value,picture:'/static/sunset.jpg' });
                                    this.topcards.push({ title: "ความชื้นสัมพัทธ์",type:'แสดงข้อมูล',unitname : "เปอร์เซ็นต์", value: result.data[0].Observe.RelativeHumidity.Value,picture:'/static/humidity.jpg' });
                                    this.topcards.push({ title: "ปริมาณน้ำฝน",type:'แสดงข้อมูล', unitname : "มิลิมิเมตร",value: result.data[0].Observe.Rainfall.Value,picture:'/static/rain.jpg'  });

                                       // get console data 
                          var tmpurl2 = "http://"+this.$store.state.host+"/console/"+this.home_id;
                              axios({ method: "GET", "url": tmpurl2,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                                    console.log("card",result);
                                    
                                    for(var i=0;i< len(result.data);i++){
                                      this.cards.push({ 
                                        id:result.data[i].device_id, 
                                        unitname : result.data[i].device_unitname,
                                        date_added :result.data[i].date_added ,
                                        title: result.data[i].device_name,
                                        type:result.data[i].device_type,
                                        device_token :result.data[i].device_token
                                        });
                                    }
                              }, error => {
                                      console.error(error);
                              });


                              }, error => {
                                      console.error(error);
                              });
                     
                          
                      
                        }, error => {
                                console.error(error);
                        });
                        
        
      },
      viewdetail(id){
          var tmpurlview = "http://"+this.$store.state.host+"/getdevice/"+id;
          axios({ method: "GET", "url": tmpurlview,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                  console.log("device",result.data);
                  this.createdevice = [];
                      this.createdevice.home_id=result.data[0].home_id;
                      this.createdevice.device_id=result.data[0].device_id;
                      this.createdevice.device_name=result.data[0].device_name;
                      this.createdevice.device_type=result.data[0].device_type;
                      this.createdevice.device_unitname=result.data[0].device_unitname;
                      this.createdevice.device_added=result.data[0].device_added;
                      this.createdevice.device_public=result.data[0].device_public;
                      this.createdevice.device_token=result.data[0].device_token;
                        }, error => {
                                console.error(error);
                        });
          this.detail_dialog = true;

      },
      createDevice(){

          var tmpvalue_url = "http://"+this.$store.state.host+"/createjwt/";
                        axios({ method: "POST", "url": tmpvalue_url,"data": {email : this.$store.state.email},"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                          this.createdevice.device_token = result.data.token
                          this.createdevice.device_added = new Date;
                          this.createdevice.home_id = this.home_id;
                            var putdata = {
                                  home_id : this.createdevice.home_id,
                                  device_id: this.createdevice.device_id,
                                  device_name: this.createdevice.device_name,
                                  device_type: this.createdevice.device_type,
                                  device_unitname: this.createdevice.device_unitname,
                                  device_added: this.createdevice.device_added,
                                  device_public: this.createdevice.device_public,
                                  device_token : this.createdevice.device_token
                                }
                                console.log("putting",putdata);
                                axios({ method: "PUT", "url": "http://"+this.$store.state.host+"/console", "data": putdata, "headers": { "content-type": "application/json", "Authorization" : this.$store.state.token } }).then(result => {
                                          this.createdevice = [{
                                          home_id : null,
                                          device_id : null,
                                          device_name : null,
                                          device_type : null,
                                          device_unitname : null,
                                          device_added : null,
                                          device_public : null,
                                          device_token : null
                                          }]
                                  this.createdevice.device_id = uniqid();
                                  this.preparing_homedata(this.home_id);
                                  }, error => {
                                              console.error(error);
                                  });
                        });
  
      },
      prepareeditConsole(id){
      
          var tmpurltoedit = "http://"+this.$store.state.host+"/getdevice/"+id;
          axios({ method: "GET", "url": tmpurltoedit,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                  console.log("device",result.data);
                  this.createdevice = [];
                      this.createdevice.home_id=result.data[0].home_id;
                      this.createdevice.device_id=result.data[0].device_id;
                      this.createdevice.device_name=result.data[0].device_name;
                      this.createdevice.device_type=result.data[0].device_type;
                      this.createdevice.device_unitname=result.data[0].device_unitname;
                      this.createdevice.device_added=result.data[0].device_added;
                      this.createdevice.device_public=result.data[0].device_public;
                      this.createdevice.device_token=result.data[0].device_token;
                        }, error => {
                                console.error(error);
                        });
        this.edit_dialog = true;
      },
      editDevice(){
        var putdata = {
          home_id : this.createdevice.home_id,
          device_id: this.createdevice.device_id,
          device_name: this.createdevice.device_name,
          device_type: this.createdevice.device_type,
          device_unitname: this.createdevice.device_unitname,
          device_added: this.createdevice.device_added,
          device_public: this.createdevice.device_public,
          device_token: this.createdevice.device_token
          }
          console.log(putdata)
        axios({ method: "POST", "url": "http://"+this.$store.state.host+"/console", "data": putdata, "headers": { "content-type": "application/json", "Authorization" : this.$store.state.token } }).then(result => {
                          this.preparing_homedata(this.home_id);
                          this.createdevice = [];
              }, error => {
                          console.error(error);
              });

      },
      deleteConsole(id,state){

         if(state==false){
          this.delete_id = id
          this.compare_delete= null
          this.deletedialog = true
      }else{
        if(this.compare_delete==this.delete_id){
         this.putdata = {"device_id": id};
        console.log("dalete",this.putdata);
        axios({ method: "DELETE", "url": "http://"+this.$store.state.host+"/console", "data": this.putdata, "headers": { "content-type": "application/json", "Authorization" : this.$store.state.token } }).then(result => {
                          this.deletedialog = false
                          this.preparing_homedata(this.home_id);
              }, error => {
                          console.error(error);
              });
      }
    }

        
      },
      add(id) {
                socket = io.connect('http://'+this.$store.state.host+'');
                console.log("emitting");
                
                socket.emit("realtimedatalog", id);       
               
      },
      time() {
        this.PA =  moment().format('a')
        this.now = moment().format('HH:mm')
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
        } 
    },
    mounted() {
            let authListenerUnsuscribe = firebaseApp.auth().onAuthStateChanged(user => { 
        if (user) {
          var data =[user.email,user.displayName,user.photoURL,user.providerData[0].providerId,user.uid];
          console.log("user",data)
          this.$store.commit('updateUser',data);
           if(this.$store.state.home_id==''){
                this.$router.replace("/");
            }      
          }else{
          this.$router.replace("/");
          this.login_dialog = true; 
          }
        });
       
        this.preparing_homedata(this.$store.state.home_id);
         this.interval = setInterval(this.time, 60000);
          this.windowSize = { x: window.innerWidth, y: window.innerHeight }
          this.add(this.$store.state.home_id)
          var vm =this
          socket.on('outputlog', function (data) {
          vm.io = data
          //console.log(data);
      });

        // var recognition = new webkitSpeechRecognition();
        //           var interim_transcript = '';
        //           var final_transcript = '';
        //           recognition.continuous = true;
        //           recognition.interimResults = true;
        //           recognition.lang = 'th-TH';
        //           recognition.start();
        //           var me = this
        //           recognition.onresult = function(event) {
        //             for (var i = event.resultIndex; i < event.results.length; ++i) {
        //               if (event.results[i].isFinal) {
        //                 final_transcript = event.results[i][0].transcript;
        //               } else {
        //                 interim_transcript = event.results[i][0].transcript;
        //               }
        //               if(final_transcript=="เพิ่ม"){
        //               console.log("เพิ่มอุปกรณ์");
        //               me.dialog = true
        //               }
        //               if(final_transcript=="ปิดหน้าต่าง"){
        //               console.log("ปิด");
        //               me.dialog = false
        //               }
                       
        //             }
                   
        //               console.log(final_transcript);
        //           };
        //            recognition.onaudioend = function(event) {
        //              console.log("re-reg");
        //            }
                   


    },
    beforeCreate(){
      socket = io.connect('http://'+this.$store.state.host+'');
    },
    created () {
      this.$store.commit('updateComponent',2);
      document.head.querySelector('meta[name=theme-color]').content = "brown" 
      console.log("changed", this.$store.state.color_component)
    },
    beforeDestroy () {
      console.log("close socket");
      
      socket.disconnect();
      clearInterval(this.interval)
    },
    computed:{
        orderedDevice_id: function () {
            return _.orderBy(this.io, 'device_id')
        },
        onresize(){
            return this.windowSize.y/4
        },
  
    }
  }

</script>



<style scoped> 
  #innerstyle {
    background-color: rgb(192, 190, 190); }
    #disconnected{
    background-color: rgb(161, 153, 153);
  }
</style>
