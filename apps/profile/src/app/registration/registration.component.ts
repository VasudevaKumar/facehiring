import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from './../_services';
import { ConfirmPasswordValidator } from './../_validators/confirm-password.validator';
import { CommonService } from '../_services/common.service';
import { RegisterService } from '../_services/register.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import months from './../_helpers/months.json';
import dates from './../_helpers/dates.json';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';


declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'facehiring-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [CommonService]
})
export class RegistrationComponent implements OnInit {

    registerForm: FormGroup;
    loading = false;
    submitted = false;
    locations: Array<any>;
    positions: Array<any>;
    companies: Array<any>;
    skills:Array<any>;
    genders:Array<any>;
    languages:Array<any>;

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

    public monthLists:{id:string, name:string}[] = months;
    public dateLists:{id:string, data:any}[] = dates;

    public isEmailAvailable = true;
    public isPhoneAvailable = true;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        //  private authenticationService: AuthenticationService,
        // private userService: UserService,
        private alertService: AlertService,
        private CommonService_: CommonService,
        private RegisterService_:RegisterService
        
    ) {
        // redirect to home if already logged in
    }

    changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

    ngOnInit() {
        
        // this.getLoations();
        // this.getPositions();
        // this.getCompanies();
        // this.getskills();
        this.myFunction();
        this.selectedSkillItems = [];

        this.registerForm = this.formBuilder.group({
            
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
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(6)

                ]
            ],
            confirmPassword:
                ['',
                    [
                        Validators.required,
                        Validators.minLength(6)

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
                emailAddress: ['', 
                        [
                            Validators.required, 
                            Validators.email,
                            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
                        ]
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
               phoneNumber: ['', 
                        [
                            Validators.required
                        ]
                ],
                /*altphoneNumber: ['', 
                        [
                            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
                        ]
                ],*/
                // phoneNumber:[],
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
                fileInput: [
                    '', Validators.required
                            ,],
                fileInputSource:[]
                



        },
            { validator: ConfirmPasswordValidator.MatchPassword }
        );
    }
    months(months: any) {
        throw new Error("Method not implemented.");
    }
    

    get f() { return this.registerForm.controls; }

    /*
    onFileChange(event) {
  
        if (event.target.files.length > 0) {
            var reader = new FileReader();
                reader.onload = (event:any) => {

                this.imageSrc = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
            const file = event.target.files[0];
            this.registerForm.patchValue({
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
            console.log(width + '*' + height);

                console.log(event.target);
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
                this.registerForm.patchValue({
                    fileSource: file
                });

                
            
            }, 100);
            };
    }  

}

      fileEvent(event){
        this.ResumeTypeError = false;  
        let resumeValue = $("#file-upload").val();
            var ext = resumeValue.split('.').pop();
            if(ext=="pdf" || ext=="docx" || ext=="doc"){
                let files = event.target.files[0].name;
                document.getElementById('fileList').innerHTML = files;
                // this.registerForm.controls['fileInput'].setValue(files ? files.name : '');
                const fileInput = event.target.files[0];
                    this.registerForm.patchValue({
                        fileInputSource: fileInput
                    });
            } else{
                    console.log('error');
                    this.ResumeTypeError = true;
                    document.getElementById('fileList').innerHTML = '';
            }
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
        $("#phoneAvailability").hide();
        
        // reset alerts on submit
        // this.alertService.clear();
        // this.showLocationErrorMessage = true;
        this.showSkillErrorMessage = true;
        // stop here if form is invalid
        // console.log(this.selectedSkillItems);
          console.log(this.selectedSkillItems.length);
          if(this.selectedSkillItems.length == 0)
          {
            this.showSkillErrorMessage = true;
              return;
          } else {
            this.showSkillErrorMessage = false;
          }

            if (this.registerForm.invalid) {
                console.log('invalid');
                this.findInvalidControls();
                return;
            }

            
            else{
                this.showSkillErrorMessage = false;
            }
            
           this.openwaitdialog('<img src="assets/img/loading.gif">',200);

           console.log(this.registerForm.value);
           const formData = new FormData();
          
           formData.append('firstName', this.registerForm.value.firstName);
           formData.append('lastName', this.registerForm.value.lastName);
           formData.append('password', this.registerForm.value.password);
           formData.append('birthDateMonth', this.registerForm.value.birthDateMonth);
           formData.append('birthDateDate', this.registerForm.value.birthDateDate);
           formData.append('birthDateYear', this.registerForm.value.birthDateYear);
           formData.append('birthDateGender', this.registerForm.value.birthDateGender);
           formData.append('emailAddress', this.registerForm.value.emailAddress);
           formData.append('organization', this.registerForm.value.organization);
           formData.append('website', this.registerForm.value.website);
           formData.append('phoneNumber', this.registerForm.value.phoneNumber.internationalNumber);
           if(this.registerForm.value.altphoneNumber)
           {
            formData.append('altphoneNumber', this.registerForm.value.altphoneNumber.internationalNumber);
           }
           formData.append('language', this.registerForm.value.language);
           formData.append('bio', this.registerForm.value.bio);
           formData.append('ddlLocation', this.selectedLocation['id']);
           formData.append('file', this.registerForm.value.file); 
           formData.append('imageProfile', this.registerForm.value.imageProfile); 
           formData.append('InstagramLink', this.registerForm.value.InstagramLink);   
           formData.append('FacebookLink', this.registerForm.value.FacebookLink);     
           formData.append('TwitterLink', this.registerForm.value.TwitterLink);     
           formData.append('YoutubeLink', this.registerForm.value.YoutubeLink);     
           formData.append('GithubLink', this.registerForm.value.GithubLink);     
           formData.append('fromDate1', this.registerForm.value.fromDate1);     
           formData.append('toDate1', this.registerForm.value.toDate1);     
           formData.append('fileSource', this.registerForm.value.fileSource);     
           formData.append('file', this.registerForm.get('fileSource').value);
          //  formData.append('ddlCompany1', this.selectedCompany['id']);     
          //  formData.append('ddlPosition1', this.selectedPosition['id']);     
          formData.append('fileInput', this.registerForm.value.fileInputSource);     
          formData.append('resume', this.registerForm.get('fileInput').value);
         formData.append('ddlCompany1', this.registerForm.value.ddlCompany1);
         formData.append('ddlPosition1', this.registerForm.value.ddlPosition1);
           formData.append('skills', this.slectedSkillItemString);     
           
            const _that = this;
            this.RegisterService_
            .submitRegister(formData)
            .subscribe((resp) => {
                // const respMsg = "Thank you for that information. We will log this request to be completed within 30 days";
               //  this.showFlashMsg(respMsg,"success");
                console.log(resp);
                console.log(resp.status_code);

              if(resp.status_code == '201')
              {
                   this.closewaitdialog(); 
                   this.openwaitdialog(resp.message, 600); 
                   this.closewaitdialog();  
                   $("#primaryPhoneNumber").val('');
                   $("#phoneAvailability").html(resp.message);
                   $("#phoneAvailability").show();

              } 
              else {
               $('#waitDialog').dialog('close');
               this.openwaitdialog('Thank you. Your registration has been completed.', 600);
               this.closewaitdialog();
                
               setTimeout(function(){
                window.location.href = '/';
               }, 2000);
               
               
              }
              
              
                
              });

       //   }

        // this.loading = true;

    }
    showFlashMsg(respMsg , type)
    {
        console.log(respMsg);
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
        this.showSkillErrorMessage = false;
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
        //this.positions = res[1];
        //this.companies = res[2];
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

    openwaitdialog(loadingMessage: any = 'Loading', defaultWidth: any = 350) {
        // tslint:disable-next-line: max-line-length
           $('#waitDialog').html('<div>' + loadingMessage + ', please wait...</div>');
        $('#waitDialog').dialog({
         modal: true,
         // title: 'Please wait',
          zIndex: 10000,
          maxWidth: defaultWidth,
          maxHeight: 100,
          width: defaultWidth,
          height: 100,
          resizable: false,
          dialogClass: 'no-titlebar'
        });
      }
      closewaitdialog() {
        setTimeout(function(){
            $('#waitDialog').dialog('close');
        }, 15000);
        
      }
      
        openwaitdialogWait(loadingMessage: any = 'Loading', defaultWidth: any = 350) {
        // tslint:disable-next-line: max-line-length
        setTimeout(function(){
        $('#waitDialog').html('<div>' + loadingMessage + ', please wait...</div>');
        $('#waitDialog').dialog({
         modal: true,
         // title: 'Please wait',
          zIndex: 10000,
          maxWidth: defaultWidth,
          maxHeight: 100,
          width: defaultWidth,
          height: 100,
          resizable: false,
          dialogClass: 'no-titlebar'
        });
        }, 2000);
      }


      public findInvalidControls() {
        const invalid = [];
        const controls = this.registerForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        console.log(invalid);
    }

    verifyEmailAvailability(emailAddress)
    {
        this.isEmailAvailable = true;
        this.RegisterService_
            .verifyEmailAvailability(emailAddress)
            .subscribe((resp) => {
                console.log(resp.length);
            if(resp.length>0)
            {
                $("#emailAddress").val('');
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
   

}

