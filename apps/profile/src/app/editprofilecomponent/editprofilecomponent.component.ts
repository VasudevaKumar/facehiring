import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CommonService } from '../_services/common.service';
import { RegisterService } from '../_services/register.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import months from './../_helpers/months.json';
import dates from './../_helpers/dates.json';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { ConfirmationDialogService } from './../confirmation-dialog-component/confirmation-dialog-service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertsService } from 'angular-alert-module';


declare var jQuery: any;
declare var $: any;



@Component({
  selector: 'facehiring-editprofilecomponent',
  templateUrl: './editprofilecomponent.component.html',
  styleUrls: ['./editprofilecomponent.component.css'],
  providers: [CommonService , ConfirmationDialogService]

})
export class EditprofilecomponentComponent implements OnInit {

    EditForm: FormGroup;
    loading = false;
    submitted = false;
    locations: Array<any>;
    positions: Array<any>;
    companies: Array<any>;
    skills:Array<any>;
    genders:Array<any>;
    languages:Array<any>;
    loggedInEmployeeID:any;
    employeeProfiles:Array<any>;
    imageSrc: string;
    url:string;
    isLocationsLoaded = false;
    
    showLocationErrorMessage = false;
    showCompanyErrorMessage = false;
    showSkillErrorMessage = false;
    showPositionErrorMessage = false;

    selectedLocation:any;
    selectedCompany:any;
    selectedPosition:any;
    
    /* Skills */
    dropdownList = [];
    selectedSkillItems = [];
    dropdownSettings = {};
    slectedSkillItemString = '';

    separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
    preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
    
    ImageSizeerror:boolean = false;
    ImageTypeeerror:boolean = false;
    ResumeTypeError:boolean = false;


    public isEmailAvailable = true;
    public isPhoneAvailable = true;

    currentUser:any;
    public monthLists:{id:string, name:string}[] = months;
    public dateLists:{id:string, data:any}[] = dates;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private spinner: NgxSpinnerService,
        private alerts: AlertsService,
        private CommonService_: CommonService,
        private RegisterService_:RegisterService,
        private confirmationDialogService: ConfirmationDialogService
        
    ) {
        // redirect to home if already logged in
    }

    ngOnInit() {
       this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       this.loggedInEmployeeID  = this.currentUser[0].user_id;
       this.myFunction();
       // this.loggedInEmployeeID  = 63;
        this.getEmployeeProfile(this.loggedInEmployeeID);

       //  this.selectedSkillItems = [];
        this.EditForm = this.formBuilder.group({

            firstName: ['',
                [
                    Validators.required,
                    Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
                ]
            ],
            lastName: ['',
                [
                    Validators.required,
                    Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
                ]
            ],
               birthDateMonth : 
                [
                    '',[Validators.required]
                ],
                birthDateDate : 
                [
                    '',[Validators.required]
                ],
                birthDateYear : 
                [
                    '',[Validators.required]
                ],
                birthDateGender : 
                [
                    '',[Validators.required]
                ],
                organization: ['',
                    [
                           Validators.pattern(/^[a-z\d\-_\s]+$/i)
                    ]
                ],
                website: ['',
                    [
                           Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)
                    ]
                ],
                /*
                phoneNumber: ['', 
                        [
                            Validators.required
                           //  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
                        ]
                ],
                altphoneNumber: [],
                */
               phoneNumber:['',[Validators.required]],
               altphoneNumber:[],
                language: 
                [
                    '',[Validators.required]
                ],
                bio: 
                [
                    '',[Validators.required]
                ],
                ddlLocation:
                [
                    '',[Validators.required]
                ],
                skills:[],
                file:[],
                imageProfile:[],
                InstagramLink:[],
                FacebookLink:[],
                TwitterLink:[],
                YoutubeLink:[],
                GithubLink:[],
                fromDate1:[],
                toDate1:[],
                fileSource:[],
                resumeFileSource:[],
                ddlCompany1:['', 
                    [
                        Validators.pattern(/^[a-z\d\-_\s]+$/i)
                    ]
                ],
                ddlPosition1:['',
                    [
                        Validators.pattern(/^[a-z\d\-_\s]+$/i)
                    ] 
                ],
                fileInput: [],
                fileInputSource:[]


        });
    }
    months(months: any) {
        throw new Error("Method not implemented.");
    }
    

    get f() { return this.EditForm.controls; }

    /*
    onFileChange(event) {
  
        if (event.target.files.length > 0) {
            var reader = new FileReader();
                reader.onload = (event:any) => {
                this.imageSrc = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
            const file = event.target.files[0];
            this.EditForm.patchValue({
                fileSource: file
            });
        }
      }
      */

     onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        var pattern = /image-*/;
        if (!file.type.match(pattern)) {
            this.ImageTypeeerror = true;
            return;
          }
        let img = new Image();
        img.src = window.URL.createObjectURL( file );
        reader.readAsDataURL(file);
        reader.onload = (event:any) => {
            setTimeout(() => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            window.URL.revokeObjectURL( img.src );
            // console.log(width + '*' + height);

               // console.log(event.target);
                this.ImageSizeerror = false;

                var canvas=document.createElement("canvas");
                var context=canvas.getContext("2d");
                // defining cause it wasnt
                  var maxWidth = 130,
                      maxHeight = 130;

                    if(img.width > maxWidth)
                    {
                            var ratio = maxWidth / img.width;
                    }
                    else if(img.height > maxHeight)
                    {
                            ratio = maxHeight / img.height;
                    }
                    else {
                            ratio = 1;
                    }

                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);

                    canvas.width = img.width * ratio;
                    canvas.height = img.width * ratio;
                    //context.drawImage(canvas, 0, 0, canvas.width, canvas.height);

              
                context.drawImage(img,
                    0,
                    0,
                    img.width,
                    img.height,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
              
                this.imageSrc = canvas.toDataURL();
                this.EditForm.patchValue({
                    fileSource: file
                });

                
            
            }, 100);
            };
    }  

}


      fileEvent(event){
        let files = event.target.files[0].name;
        document.getElementById('fileList').innerHTML = files;
        // this.EditForm.controls['fileInput'].setValue(files ? files.name : '');
        const fileInput = event.target.files[0];
            this.EditForm.patchValue({
                fileInputSource: fileInput
            });

    }
    removeFileLink()
    {
        document.getElementById('fileList').innerHTML = '';
    }


  resetImage()
    {
        this.imageSrc = 'assets/img/p13.png';
        
    }

    onSubmit() {
            this.submitted = true;
           this.showSkillErrorMessage = true;
           

         if(this.selectedSkillItems.length == 0)
          {
            this.showSkillErrorMessage = true;  
             window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          } else {
            this.showSkillErrorMessage = false;
          }

          // console.log(this.slectedSkillItemString);

         
            if (this.EditForm.invalid) {
              //  console.log('here');
              window.scrollTo({ top: 0, behavior: 'smooth' });
                //this.findInvalidControls();
            return;
            }
           
          this.spinner.show();

//            console.log(this.EditForm.value);
           const formData = new FormData();
          
           formData.append('firstName', this.EditForm.value.firstName);
           formData.append('lastName', this.EditForm.value.lastName);
           formData.append('birthDateMonth', this.EditForm.value.birthDateMonth);
           formData.append('birthDateDate', this.EditForm.value.birthDateDate);
           formData.append('birthDateYear', this.EditForm.value.birthDateYear);
           formData.append('birthDateGender', this.EditForm.value.birthDateGender);
           formData.append('organization', this.EditForm.value.organization);
           formData.append('website', this.EditForm.value.website);
           formData.append('phoneNumber', this.EditForm.value.phoneNumber.internationalNumber);
           if(this.EditForm.value.altphoneNumber)
           {
            formData.append('altphoneNumber', this.EditForm.value.altphoneNumber.internationalNumber);
           }
           formData.append('language', this.EditForm.value.language);
           formData.append('bio', this.EditForm.value.bio);
           formData.append('ddlLocation', this.selectedLocation['id']);
           formData.append('file', this.EditForm.value.file); 
           formData.append('imageProfile', this.EditForm.value.imageProfile); 
           formData.append('InstagramLink', this.EditForm.value.InstagramLink);   
           formData.append('FacebookLink', this.EditForm.value.FacebookLink);     
           formData.append('TwitterLink', this.EditForm.value.TwitterLink);     
           formData.append('YoutubeLink', this.EditForm.value.YoutubeLink);     
           formData.append('GithubLink', this.EditForm.value.GithubLink);     
           formData.append('fromDate1', this.EditForm.value.fromDate1);     
           formData.append('toDate1', this.EditForm.value.toDate1);     
           formData.append('fileSource', this.EditForm.value.fileSource);     
           // formData.append('file', this.EditForm.get('fileSource').value);
            // formData.append('ddlCompany1', this.selectedCompany['id']);     
            // formData.append('ddlPosition1', this.selectedPosition['id']);     
            formData.append('ddlCompany1', this.EditForm.value.ddlCompany1);
         formData.append('ddlPosition1', this.EditForm.value.ddlPosition1);

           formData.append('fileInput', this.EditForm.value.fileInputSource);     
         //  formData.append('resume', this.EditForm.get('fileInput').value);
           
           formData.append('skills', this.slectedSkillItemString);     
           formData.append('loggedInUser', this.loggedInEmployeeID);   
           
            const _that = this;
            this.RegisterService_
            .editProfile(formData)
            .subscribe((resp) => {

               if(resp.status_code == '201')
              {
                this.spinner.hide();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                this.alerts.setDefaults('timeout',500);
                this.alerts.setMessage(resp.message,'error');

                $("#primaryPhoneNumber").val('');
                $("#phoneAvailability").html(resp.message);
                $("#phoneAvailability").show();
                return;


              } 
              else {
                this.spinner.hide();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                $('.alertsContainer .alertsRow.error').attr("style", "display: none !important");
                this.alerts.setMessage('You profile details has been updated! Please wait ..' ,'success');

                setTimeout(function(){
                    _that.router.navigate(['/']);
                   }, 2000);
              }

                


              });

       //   }

        // this.loading = true;

    }
    showFlashMsg(respMsg , type)
    {
        // console.log(respMsg);
    }

    redictedtoHomePage()
    {
        const _that = this;
        setTimeout(function(){
            $('#waitDialog').dialog('close');
        }, 5000);

        setTimeout(function(){
            _that.router.navigate(['/']);
           }, 10000);

    }

    /* Auto completes */
    location_keyword = 'locationName';
    selectLocationEvent(item) {
    // do something with selected item
        this.selectedLocation = item;
        this.showLocationErrorMessage = false;
    }

    onChangeLocationSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
        this.showLocationErrorMessage = false;
    }

    onLocationFocused(e){
    // do something when input is focused
    
    }
    onLocationClosed(e){
        // this.showLocationErrorMessage = true;
    }

    company_keyword = 'companyName';
    selectCompaniesEvent(item) {
    // do something with selected item
    this.showCompanyErrorMessage = false;
    this.selectedCompany = item;
    }

    onChangeCompaniesSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }

    onCompaniesFocused(e){
    // do something when input is focused
    }
    onCompaniesClosed(e){
        this.showCompanyErrorMessage = true;
    }


    position_keyword = 'positionName';
    selectPositionEvent(item) {
    // do something with selected item
    this.showPositionErrorMessage = false;
    this.selectedPosition = item;
    }

    onChangePositionSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }

    onPositionFocused(e){
    // do something when input is focused
    }
    onPositionClosed(e){
        this.showPositionErrorMessage = true;
    }

    onItemSelect(item:any){
        this.slectedSkillItemString = '';
        for(let i=0; i<this.selectedSkillItems.length; i++){
          this.slectedSkillItemString += this.selectedSkillItems[i].id+',';
        }

    }
    OnItemDeSelect(item:any){
        this.slectedSkillItemString = '';
        for(let i=0; i<this.selectedSkillItems.length; i++){
          this.slectedSkillItemString += this.selectedSkillItems[i].id+',';
        }
    }
    onSelectAll(items: any){
        this.slectedSkillItemString = '';
        for(let i=0; i<this.selectedSkillItems.length; i++){
          this.slectedSkillItemString += this.selectedSkillItems[i].id+',';
        }
    }
    onDeSelectAll(items: any){
        this.slectedSkillItemString = '';
        for(let i=0; i<this.selectedSkillItems.length; i++){
          this.slectedSkillItemString += this.selectedSkillItems[i].id+',';
        }

    }
   
    /* End of auto completes. */
    
    async myFunction() {
        
        // console.log('ddd');

        const locations = this.CommonService_.getLocations().toPromise();
       // const positions = this.CommonService_.getPositions().toPromise();
        // const companies = this.CommonService_.getCompanies().toPromise();
        const skills = this.CommonService_.getSkills().toPromise();
        const genders = this.CommonService_.getGenders().toPromise();
        const languages = this.CommonService_.getLanguages().toPromise();
    
        let res = await Promise.all([locations, skills,genders,languages]);
        
        this.locations = res[0];
        // this.positions = res[1];
        // this.companies = res[2];
        this.skills = res[1];
        this.genders = res[2];
        this.languages = res[3];

        this.dropdownList = this.skills;
        this.dropdownSettings = { 
                singleSelection: false, 
                text:"Select Skills",
                selectAllText:'Select All',
                unSelectAllText:'UnSelect All',
                enableSearchFilter: true,
                classes:"myclass custom-class"
                }; 

        // here you can retrieve promises results,
        // in res[0], res[1], res[2] respectively.
    }

    async getEmployeeProfile(employeeID)
    {
        const _that = this;
        this.RegisterService_
      .getEmployeeProfile(employeeID)
      .subscribe(employeeProfiles => (_that.employeeProfiles = employeeProfiles))
      .add(() => {
        /*console.log(_that.employeeProfiles['profileData'][0].firstName);*/
       //  console.log(_that.employeeProfiles);
        this.assignEmployeeDetails();
        // console.log(_that.employeeProfiles['userSocialLinks']);

      });

    }

    assignEmployeeDetails()
    {
        const _that = this;

       
        let dobArray = _that.employeeProfiles['profileData'][0].dob.split('-');
        
        this.EditForm.controls["firstName"].setValue(_that.employeeProfiles['profileData'][0].firstName);
        this.EditForm.controls["lastName"].setValue(_that.employeeProfiles['profileData'][0].lastName);
        this.EditForm.controls["birthDateYear"].setValue(dobArray[0]);
        this.EditForm.controls["birthDateMonth"].setValue(dobArray[1]);
        this.EditForm.controls["birthDateDate"].setValue(dobArray[2]);
        this.EditForm.controls["birthDateGender"].setValue(_that.employeeProfiles['profileData'][0].gender);
        this.EditForm.controls["ddlLocation"].setValue(_that.employeeProfiles['profileData'][0].locationName);
        this.selectedLocation = _that.employeeProfiles['profileData'][0].locationID;
        this.EditForm.controls["organization"].setValue(_that.employeeProfiles['profileData'][0].organization);
        this.EditForm.controls["website"].setValue(_that.employeeProfiles['profileData'][0].website);
        this.EditForm.controls["language"].setValue(_that.employeeProfiles['profileData'][0].languageID);
        this.imageSrc = _that.employeeProfiles['profileData'][0].imageProfile;
        this.EditForm.controls["bio"].setValue(_that.employeeProfiles['profileData'][0].about);
        this.EditForm.controls["phoneNumber"].setValue(_that.employeeProfiles['phoneNumbers'][0].phoneNumber);
         this.EditForm.controls["altphoneNumber"].setValue(_that.employeeProfiles['phoneNumbers'][1].phoneNumber);
         this.EditForm.controls["fromDate1"].setValue(_that.employeeProfiles['professionalExp'][0].fromDate);
         this.EditForm.controls["toDate1"].setValue(_that.employeeProfiles['professionalExp'][0].fromDate);
         this.EditForm.controls["ddlCompany1"].setValue(_that.employeeProfiles['professionalExp'][0].companyName);
         this.EditForm.controls["ddlPosition1"].setValue(_that.employeeProfiles['professionalExp'][0].positionName);
         // document.getElementById('fileList').innerHTML = _that.employeeProfiles['userResumes'][0].resumeName;
       
        this.EditForm.controls["fileInputSource"].setValue(_that.employeeProfiles['userResumes'][0].resumePath);
         this.EditForm.controls["InstagramLink"].setValue(_that.employeeProfiles['userSocialLinks'][0].socialProfile);
         this.EditForm.controls["FacebookLink"].setValue(_that.employeeProfiles['userSocialLinks'][1].socialProfile);
         this.EditForm.controls["TwitterLink"].setValue(_that.employeeProfiles['userSocialLinks'][2].socialProfile);
         this.EditForm.controls["YoutubeLink"].setValue(_that.employeeProfiles['userSocialLinks'][3].socialProfile);
         this.EditForm.controls["GithubLink"].setValue(_that.employeeProfiles['userSocialLinks'][4].socialProfile);

         this.selectedPosition = _that.employeeProfiles['professionalExp'][0].positionName;
         this.selectedCompany = _that.employeeProfiles['professionalExp'][0].companyName;
         this.selectedSkillItems = _that.employeeProfiles['skills'];
         $("#fileList").html(_that.employeeProfiles['userResumes'][0].resumeName); 


    }


      public findInvalidControls() {
        const invalid = [];
        const controls = this.EditForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        // console.log(invalid);
    }

    verifyEmailAvailability(emailAddress)
    {
      
        this.isEmailAvailable = true;
        this.RegisterService_
            .verifyEmailAvailabilityForEdit(emailAddress , this.loggedInEmployeeID)
            .subscribe((resp) => {
               //  console.log(resp.length);
            if(resp.length>0)
            {
                $("#emailAddress").val('');
                $("#emailAddress").focus();
                this.isEmailAvailable = false;
            }

              });
    }
    resetEmailValidation()
    {
        this.isEmailAvailable = true;
    }

    hidePhoneAvailability()
    {
       $("#phoneAvailability").hide();
    }

    cancelRegForm()
    {
     this.confirmationDialogService.confirm('Please confirm..', 'Do you want to cancel')
    .then((confirmed) => {if(confirmed){ this.router.navigate(['/']); }})
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    }



}