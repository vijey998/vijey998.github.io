import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  transition,
  query,
  style,
  animate,
  group,
} from '@angular/animations';
interface Dictionary<T> {
  [Key: string]: T;
}
const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '200px' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(-200px)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(200px)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '200px' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(200px)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(-200px)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
];
@Component({
  selector: 'app-results-tab',
  templateUrl: './results-tab.component.html',
  styleUrls: ['./results-tab.component.css'],
  animations: [
    trigger('animImageSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class ResultsTabComponent implements OnInit {
  @Input() weather: any;
  //@Input('address') address: string;
  counter: number = 0;
  resultOrFav: number = 0;
  idx: number = -1;
  starClass:string = "bi bi-star";
  starColor:string = 'black';
  resClass:string = "btn btn-primary";
  favClass:string = "btn btn-light";
  resColor:string = "white";
  favColor:string = "#0275d8";
  dailyFlag=false;
  meteoFlag=false;
  constructor() {}
  public codeDict: Dictionary<string> = {
    '1000Day': 'assets/images/clear_day.svg',
    '1000Night': 'assets/images/clear_night.svg',
    '1100Day': 'assets/images/mostly_clear_day.svg',
    '1100Night': 'assets/images/mostly_clear_night.svg',
    '1101Day': 'assets/images/partly_cloudy_day.svg',
    '1101Night': 'assets/images/partly_cloudy_night.svg',
    '1102': 'assets/images/mostly_cloudy.svg',
    '1001': 'assets/images/cloudy.svg',
    '2000':'assets/images/fog.svg',
    '2100': '/images/fog_light.svg',
    '8000': 'assets/images/tstorm.svg',
    '5001': 'assets/images/flurries.svg',
    '5100': 'assets/images/snow_light.svg',
    '5000': 'assets/images/snow.svg',
    '5101': 'assets/images/snow_heavy.svg',
    '7102': 'assets/images/ice_pellets_light.svg',
    '7000': 'assets/images/ice_pellets.svg',
    '7101': 'assets/images/ice_pellets_heavy.svg',
    '4000': 'assets/images/drizzle.svg',
    '6000': 'assets/images/freezing_drizzle.svg',
    '6200': 'assets/images/freezing_rain_light.svg',
    '6001': 'assets/images/freezing_rain.svg',
    '6201': 'assets/images/freezing_rain_heavy.svg',
    '4200': 'assets/images/rain_light.svg',
    '4001': 'assets/images/rain.svg',
    '4201': 'assets/images/rain_heavy.svg',
    '3000': 'assets/images/light_wind.svg',
    '3001': 'assets/images/wind.svg',
    '3002': 'assets/images/strong_wind.svg',
  };
  public description: Dictionary<string> = {
    0: 'Unknown',
    1000: 'Clear',
    1001: 'Cloudy',
    1100: 'Mostly Clear',
    1101: 'Partly Cloudy',
    1102: 'Mostly Cloudy',
    2000: 'Fog',
    2100: 'Light Fog',
    3000: 'Light Wind',
    3001: 'Wind',
    3002: 'Strong Wind',
    4000: 'Drizzle',
    4001: 'Rain',
    4200: 'Light Rain',
    4201: 'Heavy Rain',
    5000: 'Snow',
    5001: 'Flurries',
    5100: 'Light Snow',
    5101: 'Heavy Snow',
    6000: 'Freezing Drizzle',
    6001: 'Freezing Rain',
    6200: 'Light Freezing Rain',
    6201: 'Heavy Freezing Rain',
    7000: 'Ice Pellets',
    7101: 'Heavy Ice Pellets',
    7102: 'Light Ice Pellets',
    8000: 'Thunderstorm',
  };
  public months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  public precip: Dictionary<string> = {
    0: 'N/A',
    1: 'Rain',
    2: 'Snow',
    3: 'Freezing Rain',
    4: 'Ice Pellets',
  };
  ngOnInit(): void {
    var keys=this.getKeys();
    if(keys.includes(this.weather.city)){
      this.starClass="bi bi-star-fill";
      this.starColor='yellow';
    }
    else{
      this.starClass="bi bi-star";
      this.starColor='black';
    }
  }
  /*
  getLocalStorage(): Storage {
    return localStorage;
  }*/
  reInit(x:number){
    if(x==1){
      this.dailyFlag=true;
      this.meteoFlag=false;
    }
    else   {
      this.dailyFlag=false;
      this.meteoFlag=true;
      
    }
    console.log(this.meteoFlag);
    return Object.assign({}, this.weather);
  }
  handleResultOrFav(x:number){
    if(x==0){
      this.resultOrFav=0;
      this.resClass = "btn btn-primary";
      this.favClass = "btn btn-light";
      this.resColor = "white";
      this.favColor = "#0275d8"; 
    }
    else{
      this.resultOrFav=1;
      this.resClass = "btn btn-light";
      this.favClass = "btn btn-primary";
      this.resColor = "#0275d8";
      this.favColor = "white"; 
    }
  }
  onNext() {
    this.counter = 1;
  }

  onPrevious() {
    this.counter = 0;
  }

  addFav() {
    localStorage.setItem(
      this.weather.city,
      JSON.stringify(this.weather)
    );
    //this.resultOrFav = 1;
    //console.log(localStorage.getItem(this.address.split(',')[0]));
    //this.fav.push(this.address.split(',')[0]);
  }

  setData2Fav(city: any) {
    this.weather = JSON.parse(
      (localStorage.getItem(city) || '{}'))
    ;
    //console.log(city);
    //console.log(this.weather.data.timelines[0].intervals[0].values.weatherCode);
  }

  remFav(city: string) {
    if (this.weather.city===city){
      this.starClass="bi bi-star";
      this.starColor='black';
    }
    localStorage.removeItem(city);
  }

  getKeys() {
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i) || '');
    }
    return keys;
  }

  getState(city: string) {
    return JSON.parse((localStorage.getItem(city) || '{}')).state;
  }

  str2float(s:string){
    return parseFloat(s);
  }

  handleFavClick(){
      var keys=this.getKeys();
      if(!keys.includes(this.weather.city)){
        this.addFav();
        this.starClass="bi bi-star-fill";
        this.starColor='yellow';
      }
      else{
        this.remFav(this.weather.city);
        this.starClass="bi bi-star";
        this.starColor='black';
      }
  }
  public image(code: string): string {
    var d = new Date();
    var hour = d.getUTCHours();
    hour -= 7;
    if (hour < 0) hour = 24 + hour;
    if (code == '1000' || code == '1100' || code == '1101') {
      if (hour >= 1 && hour < 13) {
        // Change to Night if night icons are to be included
        code += 'Day';
      } else {
        code += 'Day';
      }
    }
    return this.codeDict[code];
  }

  public parseDate(x: string): string {
    var y = new Date(x);

    var month = this.months[y.getMonth()];
    var date = y.getDate() + '';
    if (date.length == 1) date = '0' + date;
    var year = y.getFullYear();
    var day = this.days[y.getDay()];
    return day + ', ' + date + ' ' + month + ' ' + year;
  }

  public parseTime(x: string): string {
    var y = new Date(x);
    /*
    let hour = y.getUTCHours();
    hour -= 7;
    if (hour < 0) hour = 24 + hour;
    if (hour < 12) return hour + 'AM';
    else if (hour == 12) return hour + 'PM';
    else return hour - 12 + 'PM';*/
    var hour=String(y.getHours());
    if (hour.length==1)hour='0'+hour;
    var minute=String(y.getMinutes());
    if (minute.length==1)minute='0'+minute;
    var second=String(y.getSeconds());
    if (second.length==1)second='0'+second;
    return hour+':'+minute+':'+second;
  }

  public descp(x: string): string {
    return this.description[x];
  }

  public precipType(x: string): string {
    return this.precip[x];
  }
}
