import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageCroppedEvent } from 'ngx-image-cropper';

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'facehiring-homecomponent',
  templateUrl: './homecomponent.component.html',
  styleUrls: ['./homecomponent.component.css']
})
export class HomecomponentComponent implements OnInit {
  
  imageChangedEvent: any = '';
  imageChangedEventR:any = '';

  croppedImage: any = '';

  HomPageForm: FormGroup;
  HomePagePostForm:FormGroup;

  loggedInEmployeeID:any;
  currentUser:any;
  employeeProfiles=[];
  peopleWhoMayKnow=[];
  employeeHomePagePics=[];
  postComments=[];
  isEmployeeProfileLoaded = false;
  ImageSizeerror:boolean = false;
  ImageTypeeerror:boolean = false;
  isPostEmpty = false;
  public thoughts = '';
  
  fileToReturn:any;
  data:any;

  imageSrcLeft: string;
  imageSrcRight: string;

  constructor(
    private router: Router,
    private EmployeeService_:EmployeeService,
    private formBuilder: FormBuilder
    
) {
    // redirect to home if already logged in
}


  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.loggedInEmployeeID  = this.currentUser['data'][0].id;
     this.loggedInEmployeeID  = 63;
    this.loadContent(this.loggedInEmployeeID);
    // console.log(this.loggedInEmployeeID);

    this.HomPageForm = this.formBuilder.group({
      leftSideFile: [],
      leftSidefileSource:[],
      rightSideFile:[],
      rightSidefileSource:[]
    });

    this.HomePagePostForm = this.formBuilder.group({
      frm_uploadImageFile: [],
      uploadImageSource:[]

    });

    
 }
 get f() { return this.HomPageForm.controls; }

  getEmployeeProfile(employeeID)
  {
        const _that = this;
        this.EmployeeService_
      .getEmployeeHomDetails(employeeID)
      .subscribe(employeeProfiles => (_that.employeeProfiles = employeeProfiles))
      .add(() => {
        /*console.log(_that.employeeProfiles['profileData'][0].firstName);*/
       console.log(_that.employeeProfiles);
       _that.isEmployeeProfileLoaded = true;
      });

    }

    fn_leftSidePrfilePic()
    {
       document.getElementById('leftSideFile').click();
    }
    fn_rightSidePrfilePic()
    {
      document.getElementById('rightSideFile').click();
    }
    fn_UploadImagePost()
    {
      document.getElementById('uploadImageFile').click();

    }
    onUploadImageFileChange(event){
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
                var maxWidth = 550,
                    maxHeight = 175;
                 
                  this.HomePagePostForm.patchValue({
                      uploadImageSource: file
                  });

                 this.postImage();
        
          }, 100);
          };
  }  
}
 
    async loadContent(employeeID)
    {
      const _that = this;
      const res1 = this.EmployeeService_.getEmployeeHomDetails(employeeID).toPromise();
      const res2 = this.EmployeeService_.getPeopleWhoMayKnow(employeeID).toPromise();
      const res3 = this.EmployeeService_.getEmployeeHomePics(employeeID).toPromise();
      const res4 = this.EmployeeService_.getPosts(employeeID).toPromise();

      let res = await Promise.all([res1, res2, res3, res4]);
      //let res = await Promise.all([res1, res4]);
      _that.employeeProfiles = res[0];
       _that.peopleWhoMayKnow = res[1];
      _that.employeeHomePagePics = res[2];
      _that.postComments = res[3];
      _that.isEmployeeProfileLoaded = true;

      this.imageSrcLeft = this.employeeHomePagePics[0].leftsideimagepath;
      this.imageSrcRight = this.employeeHomePagePics[0].rightsideimagepath;

      console.log(_that.postComments);
      console.log(_that.employeeHomePagePics);

      // _that.imageSrcLeft =  _that.isEmployeeProfileLoaded.data

    }

    submitForm(type)
    {
     
      //  this.openwaitdialog('<img src="assets/img/loading.gif">',200);
      if(type == 'left')
      {
        const formData = new FormData();
        formData.append('leftSidefileSource', this.HomPageForm.value.leftSidefileSource);  
        formData.append('loggedInUser', this.loggedInEmployeeID);      
      //   formData.append('leftSidefile', this.HomPageForm.get('leftSidefileSource').value);
        const _that = this;
              this.EmployeeService_
              .uploadHomePageFileL(formData)
              .subscribe((resp) => {
                //console.log(resp);
              });
      }
      if(type == 'right')
      {
        const formData = new FormData();
        formData.append('rightSidefileSource', this.HomPageForm.value.rightSidefileSource);  
        formData.append('loggedInUser', this.loggedInEmployeeID);      
      //   formData.append('leftSidefile', this.HomPageForm.get('leftSidefileSource').value);
        const _that = this;
              this.EmployeeService_
              .uploadHomePageFileR(formData)
              .subscribe((resp) => {
                //console.log(resp);
              });
      }

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
      }, 100);
      
    }

    pushComment(commentNotes , key , postID, event)
    {
      this.postComments[key]['posts']['comments'].unshift({
        comments: commentNotes,
        companyName: "",
        created_at: new Date(),
        firstName: this.employeeProfiles[0].firstName,
        id: 1,
        imageProfile: this.employeeProfiles[0].imageProfile,
        lastName: this.employeeProfiles[0].lastName,
        positionName: "",
        post_id: postID,
        user_id: this.loggedInEmployeeID
      });
      let cnt = $("#commentDiv_"+postID).text();
      $("#commentDiv_"+postID).html(parseInt(cnt)+1);

      this.EmployeeService_.pushComments(this.loggedInEmployeeID , postID , commentNotes).toPromise();
      this.clearValue(event);
    }

    clearValue(event)
    {
      event.target.value='';
    }

    submitPost()
    {
      this.isPostEmpty = false;

      if(this.thoughts == '')
      {
        this.isPostEmpty = true;
      }
      
      if(this.thoughts != '')
      {
        this.isPostEmpty = false;
        this.pushTextPost();
      }

    }

    postImage()
    {
      this.openwaitdialog('<img src="assets/img/loading.gif">', 200);
      const formData = new FormData();
      formData.append('uploadImageSource', this.HomePagePostForm.value.uploadImageSource);  
      formData.append('loggedInUser', this.loggedInEmployeeID);      
    //   formData.append('leftSidefile', this.HomPageForm.get('leftSidefileSource').value);
      const _that = this;
            this.EmployeeService_
            .postImage(formData)
            .subscribe((resp) => {})
            .add(() => {
              /*console.log(_that.employeeProfiles['profileData'][0].firstName);*/
              this.postComments= [];
              this.getPosts();
            });
              

    }

    pushTextPost()
    {
      this.openwaitdialog('<img src="assets/img/loading.gif">', 200);
      /*
      let commentData =  {
        'posts':{
          comments:[],
          companyName: this.employeeProfiles[0].companyName,
          created_at: "2020-07-05 13:31:15",
          firstName: this.employeeProfiles[0].firstName,
          id: 1,
          imageProfile: this.employeeProfiles[0].imageProfile,
          lastName: this.employeeProfiles[0].lastName,
          positionName: this.employeeProfiles[0].positionName,
          post: this.thoughts,
          user_id: 54
        }
      } ;
      this.postComments.unshift(commentData);
      */
       // console.log(this.postComments);
      // console.log(this.postComments);

     // this.EmployeeService_.pushPost(this.loggedInEmployeeID ,this.thoughts).toPromise();
    
     const _that = this;
        this.EmployeeService_
      .pushPost(this.loggedInEmployeeID , this.thoughts)
      .subscribe((resp) => {})
      .add(() => {
        /*console.log(_that.employeeProfiles['profileData'][0].firstName);*/
        this.postComments= [];
        this.getPosts();
      });


    }

    getPosts()
    {
      const _that = this;
      this.EmployeeService_
    .getPosts(this.loggedInEmployeeID)
    .subscribe(postComments => (_that.postComments = postComments))
    .add(() => {
      /*console.log(_that.employeeProfiles['profileData'][0].firstName);*/
      console.log(_that.postComments);
      this.closewaitdialog();
    });

    }

    postSharing(postID, shareCount)
    {
       // alert(postID);

       this.openwaitdialog('<img src="assets/img/loading.gif">', 200);
       const _that = this;
       this.EmployeeService_
     .postSharing(postID , this.loggedInEmployeeID)
     .subscribe((resp) => {})
     .add(() => {
      this.closewaitdialog();
      $("#shareDiv_"+postID).html(shareCount+1);
     });


    }

    postLike(postID , likeCount)
    {
        this.openwaitdialog('<img src="assets/img/loading.gif">', 200);
        const _that = this;
        this.EmployeeService_
      .postLike(postID , this.loggedInEmployeeID)
      .subscribe((resp) => {})
      .add(() => {
        this.closewaitdialog();
        $("#likeDiv_"+postID).html(likeCount+1);
      });
    }
    displayMessage(postID)
    {
      $("#commentPost_"+postID).show();
    }


  onLeftSidePicChange(event: any): void {
      this.openDialogL();
      this.imageChangedEvent = event;
   }

 imageCroppedL(event: ImageCroppedEvent) {
  this.imageSrcLeft = event.base64;
   this.fileToReturn = this.base64ToFile(
    event.base64,
    this.imageChangedEvent.target.files[0].name,
  )
  this.HomPageForm.patchValue({
    leftSidefileSource: this.fileToReturn
  });
}
 imageLoadedL() {
        // show cropper
}
cropperReadyL() {
        // cropper ready
 }
  loadImageFailedL() {
        // show message
 }

  
    
    openDialogL()
    {
      let _that = this;
     $('#imageCropDailogL').dialog({
       modal: true,
       title: 'Crop your image',
        width: 1200,
        height: 600,
        zIndex: 10000,
        resizable: false,
        buttons: {
        'Save': function() {
                // Save code here
                $('#imageCropDailogL').dialog('close');
               _that.submitForm('left');
          }
      },
        close: function() {
         // _that.submitForm('left');
        }
      });
    }


    onRightSidePicChange(event: any): void {
      this.openDialogR();
      this.imageChangedEventR = event;
   }

 imageCroppedR(event: ImageCroppedEvent) {
  this.imageSrcRight = event.base64;
   this.fileToReturn = this.base64ToFile(
    event.base64,
    this.imageChangedEventR.target.files[0].name,
  )
  this.HomPageForm.patchValue({
    rightSidefileSource: this.fileToReturn
  });
}
 imageLoadedR() {
        // show cropper
}
cropperReadyR() {
        // cropper ready
 }
  loadImageFailedR() {
        // show message
 }

  
    
    openDialogR()
    {
      let _that = this;
     $('#imageCropDailogR').dialog({
       modal: true,
       title: 'Crop your image',
        width: 1200,
        height: 600,
        zIndex: 10000,
        resizable: false,
        buttons: {
        'Save': function() {
                // Save code here
                $('#imageCropDailogR').dialog('close');
               _that.submitForm('right');
          }
      },
        close: function() {
         // _that.submitForm('left');
        }
      });
    }




    base64ToFile(data, filename) {

      const arr = data.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
    
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
    
      return new File([u8arr], filename, { type: mime });
    }
}
