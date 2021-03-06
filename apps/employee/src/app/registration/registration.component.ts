import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ConfirmPasswordValidator } from './../_validators/confirm-password.validator';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { CommonService } from './../../../../../_services/common.service';
import { HrserviceService } from './../../../../../_services/hrservice.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertsService } from 'angular-alert-module';

declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'facehiring-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [CommonService , HrserviceService]
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

    public isLocationsLoaded = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private CommonService_:CommonService,
        private HrserviceService_:HrserviceService,
        private spinner: NgxSpinnerService,
        private alerts: AlertsService
       
    ) {
        // redirect to home if already logged in
    }

    changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

    ngOnInit() {
        
        this.selectedSkillItems = [];
        this.loadLocations();
        this.registerForm = this.formBuilder.group({
            
            companyName: ['',
                [
                    Validators.required,
                   //  Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
                   Validators.pattern(/^[a-z0-9 .\-]+$/i)  // alpha number with spaces
                    
                ]
            ],
            companyContact: ['',
                [
                    Validators.required,
                    Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/) // Only alpha with space
                ]
            ],
            designation: ['',
                [
                    Validators.required,
                    Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/) // Only alpha with space
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
                emailAddress: ['', 
                        [
                            Validators.required, 
                            Validators.email,
                            //Validators.pattern(/^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!mail\.ru)(?!yandex\.ru)(?!mail\.com)([\w-]+.)+[\w-]{2,4})?$/)
                            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
                        ]
                ],
                
                sizeOfCompany: ['',
                [
                    Validators.required,
                    Validators.pattern(/^[1-9]\d*$/)
                ]
            ],

               phoneNumber: ['', 
                        [
                            Validators.required
                        ]
                ],
                aboutCompany: ['', 
                        [
                            Validators.required
                        ]
                ],

                ddlLocation:
                [
                    '',[Validators.required]
                ],
                companyAddress:[
                    '',[
                            Validators.required,
                            Validators.pattern(/^[a-zA-Z0-9,.!? ]*$/) // alpha number with space comma.
                        ]
                ],               
                file:[],
                fileSource:[],
                webSite:['',
                    [
                        Validators.required,
                        Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)
                    ]
                ],
                Industry:[ '',

                        [
                            Validators.required,
                            Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
                        ]
                ],
                companyType:[ '',
                        [
                            Validators.required,
                            Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
                        ]
                ],
                Founded:[ '',
                        [
                            Validators.required,    
                            Validators.pattern(/^[1-9]\d*$/)
                        ]
                ],
                headQts:[
                            '',
                            [
                                Validators.required,
                                Validators.pattern(/^[a-zA-Z0-9,.!? ]*$/) // alpha number with space comma.
                            ]
                ],
                specialties:[
                            '',
                            [
                                Validators.required,
                                Validators.pattern(/^[a-zA-Z0-9,.!? ]*$/) // alpha number with space comma.
                            ]
                ]

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


    onSubmit() {
        this.submitted = true;

        
            if(typeof (this.selectedLocation) == 'undefined')
            {
     
                this.showLocationErrorMessage = true;
                return;
            } else {
                this.showLocationErrorMessage = false;
            }


            if (this.registerForm.invalid) {
                console.log('invalid');
                this.findInvalidControls();
               return;
            }
           
           this.spinner.show();

           const formData = new FormData();
        
           formData.append('aboutCompany', this.registerForm.value.aboutCompany);
           formData.append('companyName', this.registerForm.value.companyName);
           formData.append('companyContact', this.registerForm.value.companyContact);
           formData.append('designation', this.registerForm.value.designation);
           formData.append('phoneNumber', this.registerForm.value.phoneNumber.internationalNumber);
           formData.append('emailAddress', this.registerForm.value.emailAddress);
           formData.append('sizeOfCompany', this.registerForm.value.sizeOfCompany);
           formData.append('ddlLocation', this.selectedLocation['id']);
           formData.append('companyAddress', this.registerForm.value.companyAddress);
           formData.append('webSite', this.registerForm.value.webSite);
           formData.append('Industry', this.registerForm.value.Industry);
           formData.append('companyType', this.registerForm.value.companyType);
           formData.append('Founded', this.registerForm.value.Founded);
           formData.append('headQts', this.registerForm.value.headQts);
           formData.append('specialties', this.registerForm.value.specialties);
           formData.append('password', this.registerForm.value.password);
           formData.append('file', this.registerForm.value.file); 
           formData.append('fileSource', this.registerForm.value.fileSource);  
           const _that = this;
            this.HrserviceService_
            .submitEmployeeRegister(formData)
            .subscribe((resp) => {
                // const respMsg = "Thank you for that information. We will log this request to be completed within 30 days";
               //  this.showFlashMsg(respMsg,"success");
                // console.log(resp);
                // console.log(resp.status_code);

                if(resp.status_code == '201')
              {
                   this.spinner.hide();
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                   this.alerts.setDefaults('timeout',500);
                   this.alerts.setMessage(resp.message,'error');
                   $("#primaryPhoneNumber").val('');
                   $("#phoneAvailability").html(resp.message);
                   $("#phoneAvailability").show();

              } 
              else {
               this.spinner.hide();
               window.scrollTo({ top: 0, behavior: 'smooth' });
               $('.alertsContainer .alertsRow.error').attr("style", "display: none !important");
               this.alerts.setMessage('Thank you. Your registration has been completed! Please check your email to activate the facehiring account! Please wait ..' ,'success');
               setTimeout(function(){
                 window.location.href = '/employee';
               }, 5000);
               
              }

                
              });

            
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
 
      
    hidePhoneAvailability()
    {
       $("#phoneAvailability").hide();
    }    
    resetImage()
    {
        this.imageSrc = 'assets/img/p13.png';
        
    }
    resetEmailValidation()
    {

    }
    verifyEmailAvailability(emailAddress)
    {
    this.isEmailAvailable = true;
    this.HrserviceService_
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
   
    
    loadLocations(){
     const _that = this;
     _that.isLocationsLoaded = false;

      this.CommonService_
    .getLocations()
    .subscribe(locations => (_that.locations = locations))
    .add(() => {
        _that.isLocationsLoaded = true;
    });

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

    
 

}

