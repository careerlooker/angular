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

    joiningMonth = [{ "joiningMonth": "January" }, { "joiningMonth": "February" }, { "joiningMonth": "March" }, { "joiningMonth": "April" }, { "joiningMonth": "May" }, { "joiningMonth": "June" },
    { "joiningMonth": "July" }, { "joiningMonth": "August" }, { "joiningMonth": "September" }, { "joiningMonth": "October" }, { "joiningMonth": "November" }, { "joiningMonth": "December" }];

    resigningMonth = [{ "resigningMonth": "January" }, { "resigningMonth": "February" }, { "resigningMonth": "March" }, { "resigningMonth": "April" }, { "resigningMonth": "May" }, { "resigningMonth": "June" },
    { "resigningMonth": "July" }, { "resigningMonth": "August" }, { "resigningMonth": "September" }, { "resigningMonth": "October" }, { "resigningMonth": "November" }, { "resigningMonth": "December" }];;
    
    graduateMonth = [{ "graduateMonth": "January" }, { "graduateMonth": "February" }, { "graduateMonth": "March" }, { "graduateMonth": "April" }, { "graduateMonth": "May" }, { "graduateMonth": "June" },
    { "graduateMonth": "July" }, { "graduateMonth": "August" }, { "graduateMonth": "September" }, { "graduateMonth": "October" }, { "graduateMonth": "November" }, { "graduateMonth": "December" }];
  
  
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