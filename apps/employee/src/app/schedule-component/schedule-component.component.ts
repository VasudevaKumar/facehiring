import { Component, OnInit , Input , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router , ActivatedRoute, Params } from '@angular/router';
import { HrserviceService } from './../../../../../_services/hrservice.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertsService } from 'angular-alert-module';
import { Subscription } from 'rxjs';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import { Schedule, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { extend } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { EventSettingsModel, ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

declare var jQuery: any;
declare var $: any;


declare var $: any;



@Component({
  selector: 'facehiring-schedule-component',
  templateUrl: './schedule-component.component.html',
  styleUrls: ['./schedule-component.component.css']
})
export class ScheduleComponentComponent implements OnInit {

  loggedInEmployeeID:any;
  jobPostings:Array<any>;
  selectedJobPosting=[];
  interviewSchedules=[];

  public currentUser:any;
  public dataSource:any;

  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponent;
  @ViewChild('addButtonObj', { static: true })
  public addButtonObj: ButtonComponent;
  @ViewChild('editButtonObj', { static: true })
  public editButtonObj: ButtonComponent;
  @ViewChild('deleteButtonObj', { static: true })
  public deleteButtonObj: ButtonComponent;
  
  constructor(private router: Router,
    private HrserviceService_:HrserviceService,
    private spinner: NgxSpinnerService,
    private alerts: AlertsService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.spinner.show();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedInEmployeeID  = this.currentUser[0].user_id;
    /*
    this.dataSource = [
        {
            "RoomId": 10,
            "Id": 1,
            "Subject": "Board Meeting s",
            "Description": "Meeting to discuss business goal of 2020.",
            "StartTime": "2020-01-05 04:00:00.000",
            "EndTime": "2020-01-05 05:00:00.000"
        },
        {
            "RoomId": 8,
            "Id": 2,
            "Subject": "Training session on JSP",
            "Description": "Knowledge sharing on JSP topics.",
            "StartTime": "2020-01-07T04:00:00.000Z",
            "EndTime": "2020-01-07T05:30:00.000Z"
        },
        {
            "RoomId": 3,
            "Id": 3,
            "Subject": "Sprint Planning with Team members",
            "Description": "Planning tasks for sprint.",
            "StartTime": "2020-01-09T04:00:00.000Z",
            "EndTime": "2020-01-09T05:30:00.000Z"
        },
        {
            "RoomId": 2,
            "Id": 4,
            "Subject": "Meeting with Client",
            "Description": "Customer meeting to discuss features.",
            "StartTime": "2020-01-11T03:30:00.000Z",
            "EndTime": "2020-01-11T05:00:00.000Z"
        },
        {
            "RoomId": 5,
            "Id": 5,
            "Subject": "Support Meeting with Managers",
            "Description": "Meeting to discuss support plan.",
            "StartTime": "2020-01-06T06:30:00.000Z",
            "EndTime": "2020-01-06T08:00:00.000Z"
        },
        {
            "RoomId": 1,
            "Id": 6,
            "Subject": "Client Meeting",
            "Description": "Meeting to discuss client requirements.",
            "StartTime": "2020-01-08T06:00:00.000Z",
            "EndTime": "2020-01-08T07:30:00.000Z"
        },
        {
            "RoomId": 7,
            "Id": 7,
            "Subject": "Appraisal Meeting",
            "Description": "Meeting to discuss employee appraisals.",
            "StartTime": "2020-01-10T05:30:00.000Z",
            "EndTime": "2020-01-10T07:00:00.000Z"
        },
        {
            "RoomId": 6,
            "Id": 8,
            "Subject": "HR Meeting",
            "Description": "Meeting to discuss HR plans.",
            "StartTime": "2020-01-05T07:30:00.000Z",
            "EndTime": "2020-01-05T09:00:00.000Z"
        },
        {
            "RoomId": 4,
            "Id": 9,
            "Subject": "Customer Meeting",
            "Description": "Meeting to discuss customer reported issues.",
            "StartTime": "2020-01-09T07:00:00.000Z",
            "EndTime": "2020-01-09T08:30:00.000Z"
        },
        {
            "RoomId": 9,
            "Id": 10,
            "Subject": "Board Meeting",
            "Description": "Meeting to discuss business plans.",
            "StartTime": "2020-01-11T07:30:00.000Z",
            "EndTime": "2020-01-11T09:00:00.000Z"
        }
        
    ]
    */

    this.getCompanyInterviewSchedules(this.loggedInEmployeeID);
   //  this.loadSchedules();
  }

  public getCompanyInterviewSchedules(employeeID)
    {
      this.spinner.show();
        const _that = this;
        this.HrserviceService_
      .InterviewSchedules(employeeID)
      .subscribe(dataSource => (this.dataSource = dataSource))
      .add(() => {
            this.loadSchedules();
      });

    }

  loadSchedules()
  {

    console.log(this.dataSource);
    
    let data: Object[] = <Object[]>extend([], (this.dataSource as any), null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '575px',
        selectedDate: new Date(2020, 1, 11),
        eventSettings: { dataSource: data },
        /*eventRendered: (args: EventRenderedArgs) => {
            let categoryColor: string = args.data.CategoryColor as string;
            if (!args.element || !categoryColor) {
                return;
            }
            if (scheduleObj.currentView === 'Agenda') {
                (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
            } else {
                args.element.style.backgroundColor = categoryColor;
            }
        },*/
    });
    scheduleObj.appendTo('#Schedule');

    this.spinner.hide();
  }

}


$('#ScheduleEditForm').submit(function() {
  // get all the inputs into an array.
  var $inputs = $('#ScheduleEditForm :input');

  // not sure if you wanted this, but I thought I'd add it.
  // get an associative array of just the values.
  var values = {};
  $inputs.each(function() {
      values[this.name] = $(this).val();
  });

});

$(".e-footer-content").click(function(){
  alert('here');
});

$(document).on("click", "#Schedule_dialog_wrapper .e-event-save", function(event){
  alert('g');
 
  var vals = getAllValues();
  //console.log(vals);
});

function getAllValues() {
  var inputValues = $('#ScheduleEditForm :input').map(function() {
      var type = $(this).prop("type");

      // checked radios/checkboxes
      if ((type == "checkbox" || type == "radio") && this.checked) { 
         // return $(this).val();
         console.log('xxxx');
         console.log($(this).val());
      }
      // all other fields, except buttons
      else if (type != "button" && type != "submit") {
         //  return $(this).val();
         console.log('yyyy');
         console.log($(this).val());
      }
  })
  // return inputValues.join(',');
}
