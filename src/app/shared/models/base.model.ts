import { CountriesModel } from './countries.model';
import { CityModel } from './city.model';
import { StatesModel } from './states.model';

export class BaseModel {
    actionType: string;
    countryList: Array<CountriesModel>;
    stateList: Array<StatesModel>;
    cityList: Array<CityModel>;
    countryname: string;
    statename: string;
    cityname: string;
    email: string;
    sekId: number;
    isChecked:boolean=false;
    isAdd: boolean = false;
    isUpdate: boolean = false;
    isDelete:boolean=false;
    hideForm:boolean=false;
    hideFormButton:boolean=true;

    public options={
            
        }
    

    joiningMonth = [{"Id":1, "joiningMonth": "January" }, {"Id":2, "joiningMonth": "February" }, { "Id":3,"joiningMonth": "March" }, {"Id":4, "joiningMonth": "April" }, { "Id":5,"joiningMonth": "May" }, { "Id":6,"joiningMonth": "June" },
    {"Id":7, "joiningMonth": "July" }, {"Id":8, "joiningMonth": "August" }, { "Id":9,"joiningMonth": "September" }, {"Id":10, "joiningMonth": "October" }, {"Id":11, "joiningMonth": "November" }, {"Id":12, "joiningMonth": "December" }];

    resigningMonth = [{"Id":1, "resigningMonth": "January" }, { "Id":2,"resigningMonth": "February" }, { "Id":3,"resigningMonth": "March" }, {"Id":4, "resigningMonth": "April" }, {"Id":5, "resigningMonth": "May" }, {"Id":6, "resigningMonth": "June" },
    { "Id":7,"resigningMonth": "July" }, { "Id":8,"resigningMonth": "August" }, { "Id":9,"resigningMonth": "September" }, {"Id":10, "resigningMonth": "October" }, {"Id":11, "resigningMonth": "November" }, {"Id":12, "resigningMonth": "December" }];;
    
    graduateMonth = [{ "Id":1,"graduateMonth": "January" }, {"Id":2, "graduateMonth": "February" }, {"Id":3, "graduateMonth": "March" }, {"Id":4, "graduateMonth": "April" }, {"Id":5, "graduateMonth": "May" }, { "Id":6,"graduateMonth": "June" },
    { "Id":7,"graduateMonth": "July" }, {"Id":8, "graduateMonth": "August" }, {"Id":9, "graduateMonth": "September" }, {"Id":10, "graduateMonth": "October" }, {"Id":11, "graduateMonth": "November" }, { "Id":12,"graduateMonth": "December" }];
  
  
    joiningYear = [];
    resigningYear = [];
    graduateYear = [];

    constructor() {
        for (var i = 1970; i <= new Date().getFullYear(); i++) {
            this.joiningYear.push({ "joiningYear": i });
            this.resigningYear.push({ "resigningYear": i });
            this.graduateYear.push({ "graduateYear": i });

        }
    }
}