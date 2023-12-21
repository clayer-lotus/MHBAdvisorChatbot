import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChatService } from 'src/app/services/chat/chat.service';

import { SimpleModalService } from 'ngx-simple-modal';
import { AlertComponent } from '../alert/alert.component';
import { CustomErrorComponent } from '../custom-error/custom-error.component';
@Component({
  selector: 'app-pointforms',
  templateUrl: './pointforms.component.html',
  styleUrls: ['./pointforms.component.css']
})
export class PointformsComponent {
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  step5:boolean = false;

  chatMessages: { role: string, content: string }[] = [
];

  progressWidth: number = 50;
  selectedPropertyType : string = '';
  propertyType = [
    {
        id: 1,
        label: "Detached",
        status: true
    },
    {
        id: 2,
        label: "Semi-detached",
        status: false
    },
    {
        id: 3,
        label: "Townhouses",
        status: false
    },
    {
        id: 4,
        label: "Condos",
        status: false
    },
    {
        id: 5,
        label: "Condo Townhomes",
        status: false
    },
    {
        id: 6,
        label: "Bungalows",
        status: false
    }
    ,
    {
        id: 7,
        label: "Split-level",
        status: false
    }
    ,
    {
        id: 8,
        label: "Duplex, Triplex, Fourplex",
        status: false
    }  ,
    {
        id: 9,
        label: "Others",
        status: false
    }
  ];
  selectChangeHandler1(event : any) {
    this.selectedPropertyType = event.target.value;
  }

  selectedSellingTimeline : string = '';
  sellingTimeline = [
    {
        id: 1,
        label: "Immediate Sale",
        status: true
    },
    {
        id: 2,
        label: "Within the Next 3 Months",
        status: false
    },
    {
        id: 3,
        label: "Within the Next 6 Months",
        status: false
    },
    {
        id: 4,
        label: "Within the Next Year",
        status: false
    },
    {
        id: 5,
        label: "Flexible Timeline",
        status: false
    },
    {
        id: 6,
        label: "Dependent on Finding a New Home",
        status: false
    }
    ,
    {
        id: 7,
        label: "Seasonal Considerations",
        status: false
    }
    ,
    {
        id: 8,
        label: "Financial Milestone",
        status: false
    }
  ];
  selectChangeHandler2(event : any) {
    this.selectedSellingTimeline = event.target.value;
  }
  sessionFullStreetAddress: any;
    isCheckboxChecked: boolean = false;
    options:any = {
        componentRestrictions: {
            country: 'CA'
        }
    }
    formData:any = {
        sessionFullStreetAddress: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
    };
    

    formData2:any = {
        ownedProperty: '',
        sizeProperty: '',
        numberOfBedroom: '',
        numberOfBathroom: '',
        desiredSellingPrice :'',
        currentCondition :'',
        motiveSellProperty :''
    };

    constructor(private route: ActivatedRoute, private spinner : NgxSpinnerService, private http : HttpClient, private _apiCallServices : ChatService, private SimpleModalService: SimpleModalService) {}
    phoneNumberInputMask = createMask({mask: '(999) 999-9999'});
    handleAddressChange(address : Address) {
        this.formData.sessionFullStreetAddress = address.formatted_address;

    }
    ngOnInit() {
        const expirationTime = sessionStorage.getItem('session_expiration');
        if(!expirationTime || new Date().getTime() > parseInt(expirationTime, 10)) {
            // Session has expired, or the expiration time is not set
            this.sessionFullStreetAddress = null;
        }
        else {
            this.sessionFullStreetAddress = sessionStorage.getItem('user_street_address');

            this.formData.sessionFullStreetAddress = this.sessionFullStreetAddress;
        }

        console.log(this.sessionFullStreetAddress);
        this.chatMessages.push({ role: 'bot', content: `Hello! I'm MHB Advisor, a virtual assistant here on behalf of Michael the Home Buyer. Before we procced to chat, please provide us some of property details, to ensure smooth communication.` });
        this.chatMessages.push({ role: 'bot', content: `Please provide your property address and contact info.` });
       
    }
    nextStep1(){
      this.step1 = false;
      this.step2 = true;
      this.step3 = true;
    
    }
    contactFormData(form: NgForm) {
        if(form.valid) {
            
            // this.spinner.show();
            this.step3 = false;
            this.step4 = true;
            console.log(form.value);
            console.log(this.formData);
            this.chatMessages.push({ role: 'bot', content: `Please provide your property information.` });
       
          
        }
    }

    propertyInformaionForm(form : NgForm){
        console.log(form.value);

        console.log(this.formData2);
        if (this.selectedPropertyType == '') {
            this.selectedPropertyType = 'Detached';
        
        }

        if (this.selectedSellingTimeline == '') {
            this.selectedSellingTimeline = 'Immediate Sale';
        
        }

        console.log(this.selectedPropertyType);
        
        console.log(this.selectedSellingTimeline);
        this.step4 = false;
        this.step5 = true;
        this.chatMessages.push({ role: 'bot', content: `Please confirm your deatils and click on Confim & Submit.` });
       
    }

    goBack(){
        this.step3 = true;
        this.step4 = false;
        this.chatMessages.pop();
    }
  
    goBackFromPointForm(){
        this.step4 = true;
        this.step5 = false;
        
        this.chatMessages.pop();
    }
    confirmPointForm()
    {
        this.step5 = false;
        this.spinner.show();


        //   this._apiCallServices.mhbAdvisorAPI(this.formData.firstName, this.formData.lastName, this.formData.email, this.formData.phoneNumber,  this.formData.sessionFullStreetAddress, this.formData2.ownedProperty, this.formData2.sizeProperty, 
        //     this.formData2.numberOfBedroom, this.formData2.numberOfBathroom, this.formData2.desiredSellingPrice, this.formData2.currentCondition, this.formData2.motiveSellProperty, this.selectedPropertyType, this.selectedSellingTimeline).subscribe(res => {
        //         console.log(res);
        //         if (res.status == "success") {
        //             setTimeout(() => {
        //                 this.spinner.hide();
        //             }, 1000);
        //             // this._toast.success({detail: "SUCCESS", summary: 'Form successfully submitted', position: 'br'});
        //               this.SimpleModalService.addModal(AlertComponent, { message: 'Redirecting you to chat window..'});
    
        //             setTimeout(function () {
        //                 window.location.href = '/chat'
        //             }, 12000);
        //         } else if (res.status == "error") {
        //           alert(res.message);
        //           location.reload;
        //             setTimeout(() => {
        //                 this.spinner.hide();
        //                 window.location.reload();
        //             }, 1000);
    
        //         } else if (res.status == "timeout") {
        //           alert(res.message);
        //           location.reload;
        //             setTimeout(() => {
        //                 this.spinner.hide();
        //                 window.location.reload();
        //             }, 1000);
    
        //         }
    
    
        //     }, err => {
        //         this.SimpleModalService.addModal(CustomErrorComponent);
  
        //         alert('An error occurred. Please try after sometime!');
        //         location.reload;
        //           setTimeout(() => {
        //               this.spinner.hide();
        //               window.location.reload();
        //           }, 1000);
              
    
    
        //     }, () => console.log("CONTACT DETAILS FORM SUMBITTED SUCCESSFULLY"))
    }

}
