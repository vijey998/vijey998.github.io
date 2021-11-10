import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css'],
})


export class SearchCardComponent implements OnInit {
  public street = '';
  public state = '';
  public city = '';
  public isDisabled = false;
  public isRequired = true;
  public isChecked = false;
  public allowSubmit= true;
  public showResults = false;
  public error=false;
  public showProgress=false;
  progress:number=0;
  geocoding_resp:any;
  public lng="";
  public lat="";
  public address="";
  public json_file={loc:",",city:"",region:"",country:""};
  
  weatherData: any;
  constructor(public http: HttpClient) {
    this.street = '';
    this.state = '';
    this.city = '';
  }
  options = {
    types:['(cities)'],
    componentRestrictions: { country: ['us'] }
  }  as unknown as Options;
  ngOnInit(): void {}
  handleAddressChange(address: any) {
      this.city=address.address_components[0].long_name;
      for (var i = 0; i < address.address_components.length; i++) {
        if(address.address_components[i].types[0]=="administrative_area_level_1"){
          this.state=address.address_components[i].long_name;
        }
      }
      //console.log(JSON.stringify(address));
  }
  onGroupChange(state:any){
    console.log(JSON.stringify(state));
    console.log(state);
    this.state=state;
  }
  async geocoding(): Promise<void> {
    if (this.isChecked) {
      var ipinfo_url = 'https://ipinfo.io?token=68ef393effbdfb';
      this.showProgress=true;
      this.progress=25;
      await this.http
        .get(ipinfo_url)
        .toPromise()
        .then((data: any) => {
          this.json_file = data;
          console.log('Hi' + JSON.stringify(this.json_file));
          this.lng = this.json_file.loc.split(',')[1];
          this.lat = this.json_file.loc.split(',')[0];
          this.address =
            this.json_file.city + ', ' + this.json_file.region;
          console.log(this.lng + ' ' + this.lat);
        })
        .catch((err: HttpErrorResponse):void => {this.error=true;this.showProgress=false;});
      this.progress=50;
    } else {
      this.showProgress=true;
      this.progress=25;
      var street = this.street;
      var city = this.city;
      var state = this.state;
      var geocoding_url =
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        street.replace(' ', '+') +',+' +city +',+' +state +
        '&key=AIzaSyAc7H889Wfuxy4690EjwxNH8hy1KABFDKI';
      console.log(geocoding_url);
      await this.http
        .get(geocoding_url)
        .toPromise()
        .then((data: any) => {
          this.geocoding_resp = data;
          /*
          if(this.geocoding_resp.results.length===0){
            this.showResults=false;
            return;
          }*/
          this.lng = this.geocoding_resp.results[0].geometry.location.lng;
          this.lat = this.geocoding_resp.results[0].geometry.location.lat;
          this.address = this.city+', '+this.state;
          console.log(this.lng + ' ' + this.lat + ' ' + this.address);
        })
      .catch((err: HttpErrorResponse):void => {this.error=true;this.showProgress=false;});
      this.progress=50;
    }
    this.getWeather(this.lat,this.lng);
    this.showResults=true;
    //generate_table(json_file, address);
  }
  async getWeather(lat: string, lng: string): Promise<void> {
    this.progress=75;
    var weather_url = 'https://weather-backend-dot-weatherappvijey998.wl.r.appspot.com/getWeather?lat=' + lat + '&lng=' + lng;
    //var weather_url = 'http://localhost:8080/getWeather?lat=' + lat + '&lng=' + lng;
    await this.http
      .get(weather_url)
      .toPromise()
      .then((data: any) => {
        this.weatherData=data;
        this.weatherData.city=this.address.split(',')[0];
        this.weatherData.state=this.address.split(',')[1];
        this.weatherData.latitude= this.lat;
        this.weatherData.longitude= this.lng;
        //console.log(JSON.stringify(data));
        this.weatherData = Object.assign({}, this.weatherData);
      });
      this.progress=100;
      this.showProgress=false;
      
  }

  public disable_inputs(x: number): void {
    if (x == 0) {
      this.street = '';
      this.city = '';
      this.state = 'null';
      this.isDisabled = false;
      this.isRequired = true;
      this.isChecked = false;
      this.showResults= false;
    }
    if (x == 1) {
      this.isChecked = !this.isChecked;
      this.isDisabled = this.isChecked;
      this.isRequired = !this.isChecked;
    }
  }
  statesList:any = [
    {
        name: "Alabama",
        abbreviation: "AL"
    },
    {
        name: "Alaska",
        abbreviation: "AK"
    },
    {
        name: "American Samoa",
        abbreviation: "AS"
    },
    {
        name: "Arizona",
        abbreviation: "AZ"
    },
    {
        name: "Arkansas",
        abbreviation: "AR"
    },
    {
        name: "California",
        abbreviation: "CA"
    },
    {
        name: "Colorado",
        abbreviation: "CO"
    },
    {
        name: "Connecticut",
        abbreviation: "CT"
    },
    {
        name: "Delaware",
        abbreviation: "DE"
    },
    {
        name: "District Of Columbia",
        abbreviation: "DC"
    },
    {
        name: "Federated States Of Micronesia",
        abbreviation: "FM"
    },
    {
        name: "Florida",
        abbreviation: "FL"
    },
    {
        name: "Georgia",
        abbreviation: "GA"
    },
    {
        name: "Guam",
        abbreviation: "GU"
    },
    {
        name: "Hawaii",
        abbreviation: "HI"
    },
    {
        name: "Idaho",
        abbreviation: "ID"
    },
    {
        name: "Illinois",
        abbreviation: "IL"
    },
    {
        name: "Indiana",
        abbreviation: "IN"
    },
    {
        name: "Iowa",
        abbreviation: "IA"
    },
    {
        name: "Kansas",
        abbreviation: "KS"
    },
    {
        name: "Kentucky",
        abbreviation: "KY"
    },
    {
        name: "Louisiana",
        abbreviation: "LA"
    },
    {
        name: "Maine",
        abbreviation: "ME"
    },
    {
        name: "Marshall Islands",
        abbreviation: "MH"
    },
    {
        name: "Maryland",
        abbreviation: "MD"
    },
    {
        name: "Massachusetts",
        abbreviation: "MA"
    },
    {
        name: "Michigan",
        abbreviation: "MI"
    },
    {
        name: "Minnesota",
        abbreviation: "MN"
    },
    {
        name: "Mississippi",
        abbreviation: "MS"
    },
    {
        name: "Missouri",
        abbreviation: "MO"
    },
    {
        name: "Montana",
        abbreviation: "MT"
    },
    {
        name: "Nebraska",
        abbreviation: "NE"
    },
    {
        name: "Nevada",
        abbreviation: "NV"
    },
    {
        name: "New Hampshire",
        abbreviation: "NH"
    },
    {
        name: "New Jersey",
        abbreviation: "NJ"
    },
    {
        name: "New Mexico",
        abbreviation: "NM"
    },
    {
        name: "New York",
        abbreviation: "NY"
    },
    {
        name: "North Carolina",
        abbreviation: "NC"
    },
    {
        name: "North Dakota",
        abbreviation: "ND"
    },
    {
        name: "Northern Mariana Islands",
        abbreviation: "MP"
    },
    {
        name: "Ohio",
        abbreviation: "OH"
    },
    {
        name: "Oklahoma",
        abbreviation: "OK"
    },
    {
        name: "Oregon",
        abbreviation: "OR"
    },
    {
        name: "Palau",
        abbreviation: "PW"
    },
    {
        name: "Pennsylvania",
        abbreviation: "PA"
    },
    {
        name: "Puerto Rico",
        abbreviation: "PR"
    },
    {
        name: "Rhode Island",
        abbreviation: "RI"
    },
    {
        name: "South Carolina",
        abbreviation: "SC"
    },
    {
        name: "South Dakota",
        abbreviation: "SD"
    },
    {
        name: "Tennessee",
        abbreviation: "TN"
    },
    {
        name: "Texas",
        abbreviation: "TX"
    },
    {
        name: "Utah",
        abbreviation: "UT"
    },
    {
        name: "Vermont",
        abbreviation: "VT"
    },
    {
        name: "Virgin Islands",
        abbreviation: "VI"
    },
    {
        name: "Virginia",
        abbreviation: "VA"
    },
    {
        name: "Washington",
        abbreviation: "WA"
    },
    {
        name: "West Virginia",
        abbreviation: "WV"
    },
    {
        name: "Wisconsin",
        abbreviation: "WI"
    },
    {
        name: "Wyoming",
        abbreviation: "WY"
    }
];
}
