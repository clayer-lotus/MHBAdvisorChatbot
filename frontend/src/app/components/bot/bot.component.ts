import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent {
  @ViewChild('scrollContainer', { static: false }) private scrollContainer!: ElementRef;

  userMessage!: string;
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [
  ];
  phoneNumberInputMask = createMask({ mask: '(999) 999-9999' });

  formData: any = {
    sessionFullStreetAddress: '',
    firstName: '',
    phoneNumber: '',
    email: ''
  };

  formData2: any = {
    ownedProperty: '',
    sizeProperty: '',
    numberOfBedroom: '',
    numberOfBathroom: '',
    desiredSellingPrice: '',
    currentCondition: '',
    motiveSellProperty: ''
  };


  selectedPropertyType: string = '';
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
    },
    {
      id: 9,
      label: "Others",
      status: false
    }
  ];
  selectChangeHandler1(event: any) {
    this.selectedPropertyType = event.target.value;
  }

  selectedSellingTimeline: string = '';
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
  selectChangeHandler2(event: any) {
    this.selectedSellingTimeline = event.target.value;
  }

  step1: boolean = true;

  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  step5: boolean = false;
  step6: boolean = false;
  step7: boolean = false;
  step8: boolean = false;
  step9: boolean = false;
  step10: boolean = false;

  options: any = {
    componentRestrictions: {
      country: 'CA'
    }
  }
  handleAddressChange(address: Address) {
    this.formData.sessionFullStreetAddress = address.formatted_address;

  }

  handleEnterKey1() {
    // Perform action when Enter key is pressed and firstName is not empty
    alert('Enter key pressed with a valid first name: ' + this.formData.firstName);
    // Your logic here
    this.step1 = true;
  }
  sellHomeCondTrue() {
    this.step3 = true;
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

  }

  sellHomeCondFalse() {

  }

  contactFormData(form: NgForm) {
    if (form.valid) {
      setTimeout(() => {
        const container = this.scrollContainer.nativeElement;
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth' // Use smooth behavior for smooth scrolling
        });
      }, 100); // Adjust the delay as needed

      // // this.spinner.show();
      // this.step3 = false;
      // this.step4 = true;
      // console.log(form.value);
      // console.log(this.formData);
      // this.chatMessages.push({ role: 'bot', content: `Please provide your property information.` });
      this.step4 = true;
    }
  }
  personalInformationConf() {
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

    this.step5 = true;
  }



  propertyInformaionForm(form: NgForm) {
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

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
    this.step6 = true;
  }
  propertyInformaionConf() {
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed
this.step7 = true;
  }


  refresh() {

  }
  sendMessage() {

  }

}