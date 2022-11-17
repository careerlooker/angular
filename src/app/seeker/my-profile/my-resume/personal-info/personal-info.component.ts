import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonalInfo } from 'src/app/seeker/models/personal-info.model';
import { CountriesModel } from 'src/app/shared/models/countries.model';
import { StatesModel } from 'src/app/shared/models/states.model';
import { CityModel } from 'src/app/shared/models/city.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { environment } from 'src/environments/environment';
import { AwardsModel } from 'src/app/seeker/models/awards.model';
import { BlockCompanies } from 'src/app/seeker/models/block-companies.model';
import { CertificateModel } from 'src/app/seeker/models/certificate.model';
import { ContactDetailsModel } from 'src/app/seeker/models/contact-details.model';
import { EducationModel } from 'src/app/seeker/models/education.model';
import { LanguageModel } from 'src/app/seeker/models/language.model';
import { TrainingModel } from 'src/app/seeker/models/training.model';
import { SkillsModel } from 'src/app/seeker/models/skills.model';
import { OthersDetails } from 'src/app/seeker/models/others-details.model';
import { professionalSummary } from 'src/app/seeker/models/professional-summary';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';



@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  @ViewChild(FileUploadComponent) fileUploadComponent: FileUploadComponent;
  jobSeekerModel: JobSeekerModel = new JobSeekerModel();

  credentials: string;
  email: string;
  countryList: Array<CountriesModel>;
  stateList: Array<StatesModel>;
  cityList: Array<CityModel>;
  countryname: string;
  statename: string;
  cityname: string;

  message: string = '';
  selectedFile = null;
  uploadResponse: any;

  imgUrl: any = {
    'image': '/assets/img/profile.png',
    'buttonText': 'Upload Your Photo',
    'id': 0,
    'picType': 'sek-pics'
  }
  constructor(private seekerService: SeekerService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private router: Router) { }

  ngOnInit() {
    this.jobSeekerModel.personalInfo = new PersonalInfo();
    this.jobSeekerModel.awards = new Array<AwardsModel>();
    this.jobSeekerModel.blockCompanies = new Array<BlockCompanies>();
    this.jobSeekerModel.certification = new Array<CertificateModel>();
    this.jobSeekerModel.contactDetails = new Array<ContactDetailsModel>();
    this.jobSeekerModel.education = new Array<EducationModel>();
    this.jobSeekerModel.language = new Array<LanguageModel>();
    this.jobSeekerModel.training = new Array<TrainingModel>();
    this.jobSeekerModel.skills = new Array<SkillsModel>();
    this.jobSeekerModel.otherDetails = new OthersDetails();
    this.jobSeekerModel.profSummary = new professionalSummary();
    this.getSeeker();
  }

  getSeeker() {
    if (localStorage.getItem('email') != null) {
      this.email = localStorage.getItem('email');
      this.seekerService.seekerLogin(this.email).subscribe((result: JobSeekerModel) => {
        if (result != null) {
          this.jobSeekerModel = result;
          this.email = this.jobSeekerModel.email;
          if (this.jobSeekerModel.personalInfo.photo) {
            this.jobSeekerModel.personalInfo.photo = environment.baseUrl+this.jobSeekerModel.personalInfo.photo;
            this.imgUrl.image = this.jobSeekerModel.personalInfo.photo;
            this.sharedService.updateApprovalMessage(this.imgUrl.image);
          }
          this.imgUrl.id = this.jobSeekerModel.id;
          if (this.jobSeekerModel.personalInfo) {
            this.seekerService.tickSubject.next('pi');
          }
          
          this.seekerService.updatePersonalInfoMessage(this.jobSeekerModel);
          this.getCountries();
        }
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      })
    }
  }

  getCountries() {
    this.sharedService.getAllCountries().subscribe((countries: Array<CountriesModel>) => {
      this.countryList = countries;
      if (this.jobSeekerModel.personalInfo != null && this.jobSeekerModel.personalInfo.country != null) {
        this.jobSeekerModel.personalInfo.country = this.countryList.filter(x => x.name === this.jobSeekerModel.personalInfo.country)[0].name;
        this.onCountrySelect(this.jobSeekerModel.personalInfo.country);
      }
    });
  }

  onCountrySelect(name: string) {
    if (name === "" || name === undefined) {
      this.jobSeekerModel.personalInfo.state = '';
      this.jobSeekerModel.personalInfo.city = '';
      this.cityList = [];
      this.stateList = [];
    } else {
      let id = this.countryList.filter(x => x.name === name)[0].id;
      this.sharedService.getAllStatesByCountryId(id).subscribe((states: Array<StatesModel>) => {
        this.stateList = states;
        if (Object.keys(this.stateList).length > 0 && this.jobSeekerModel.personalInfo.state) {
          this.jobSeekerModel.personalInfo.state = this.stateList.filter(x => x.name === this.jobSeekerModel.personalInfo.state)[0].name
          this.onStateSelect(this.jobSeekerModel.personalInfo.state);
        } else {
          this.jobSeekerModel.personalInfo.state = '';
          this.jobSeekerModel.personalInfo.city = '';
        }
      });
    }
  }
  onStateSelect(name: string) {
    if (name === "" || name === undefined) {
      this.jobSeekerModel.personalInfo.city = '';
      this.cityList = [];
    } else {
      let id = this.stateList.filter(x => x.name === name)[0].id;
      this.sharedService.getAllCitiesByStateId(id).subscribe((cities: Array<CityModel>) => {
        this.cityList = cities;
        if (Object.keys(this.cityList).length > 0 && this.jobSeekerModel.personalInfo.city) {
          this.jobSeekerModel.personalInfo.city = this.cityList.filter(x => x.name === this.jobSeekerModel.personalInfo.city)[0].name;
        } else {
          this.jobSeekerModel.personalInfo.city = '';
        }
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile.length === 0)
      return;
    var mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      this.selectedFile = null;
      return;
    }
    else {
      this.message = '';
    }
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl.image = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.jobSeekerModel.personalInfo.firstName = form.value.firstName;
      this.jobSeekerModel.personalInfo.lastName = form.value.lastName;
      this.jobSeekerModel.personalInfo.address = form.value.address;
      this.jobSeekerModel.personalInfo.phoneNo = form.value.phoneNo;
      this.jobSeekerModel.personalInfo.country = form.value.country;
      this.jobSeekerModel.personalInfo.state = form.value.state;
      this.jobSeekerModel.personalInfo.city = form.value.city;
      this.jobSeekerModel.personalInfo.zipCode = form.value.zipCode;
      if (this.fileUploadComponent.selectedFile) {
        this.jobSeekerModel.personalInfo.photo = "images/" + this.imgUrl.picType + "/" + this.imgUrl.id + '.' + this.fileUploadComponent.selectedFile.name.split('.')[1].toLowerCase();
      }
      this.seekerService.updateSeekerProfile(this.jobSeekerModel).subscribe((result: any) => {
        if (result) {
          this.getSeeker();
          this.seekerService.tickSubject.next('pi');
          this.toastr.success(JSON.parse(result).message)
        }
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      })
    }
  }
  next() {
    this.router.navigate(['/seeqem/my-profile/professional-summary'])
  }
}
