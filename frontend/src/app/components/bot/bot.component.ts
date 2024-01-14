import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent {
  @ViewChild('scrollContainer', { static: false }) private scrollContainer!: ElementRef;

  

  @ViewChild('fullNameInput') fullNameInput!: ElementRef;
  @ViewChild('propertyAddressInput') propertyAddressInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('phoneInput') phoneInput!: ElementRef;
  
  @ViewChild('ownedPropertyInput') ownedPropertyInput!: ElementRef;
  @ViewChild('sizePropertyInput') sizePropertyInput!: ElementRef;
  @ViewChild('numberOfBedroomInput') numberOfBedroomInput!: ElementRef;
  @ViewChild('numberOfBathroomInput') numberOfBathroomInput!: ElementRef;
  @ViewChild('desiredSellingPriceInput') desiredSellingPriceInput!: ElementRef;
  @ViewChild('currentConditionInput') currentConditionInput!: ElementRef;
  @ViewChild('motiveSellPropertyInput') motiveSellPropertyInput!: ElementRef;

  audioFile = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
  );
  userMessage!: string;
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [
  ];
  phoneNumberInputMask = createMask({ mask: '(999) 999-9999' });
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 0,
    digitsOptional: false,
    placeholder: '0',
  });


  numericInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 0,
    digitsOptional: false,
    placeholder: '0',
  });

  numericDecimalInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });
  

  formData: any = {
    sessionFullStreetAddress: '',
    fullName: '',
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

  step1: boolean = false;

  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  step5: boolean = false;

  propertyDetailsStep: boolean = false;
  currentCondStep: boolean = false;
  sellingIntentions: boolean = false;
  reasonForSelling: boolean = false;

  step6: boolean = false;
  step7: boolean = false;
  errorFormSubmit: boolean = false;
  step8: boolean = false;
  step9: boolean = false;
  step10: boolean = false;
  isTextareaDisabled: boolean = true;
  pleaseWait: boolean = false;
  loadingSpinner: boolean = true;

  options: any = {
    componentRestrictions: {
      country: 'CA'
    }
  }
  constructor(private _apiCallServices: ChatService) { }

  playFile() {
    this.audioFile.play();
  }

  handleAddressChange(address: Address) {
    this.formData.sessionFullStreetAddress = address.formatted_address;

  }

  handleEnterKey1() {
    // Perform action when Enter key is pressed and firstName is not empty
    // alert('Enter key pressed with a valid first name: ' + this.formData.firstName);
    // Your logic here

    this.playFile();
    this.step1 = true;

  }

  fullnameFormData(form: NgForm) {

    this.playFile();
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

    this.playFile();
  }

  sellHomeCondFalse() {

    this.playFile();
    this.step8 = true;
    this.isTextareaDisabled = false;
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

      this.playFile();
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

    this.playFile();
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

    this.playFile();
    this.propertyDetailsStep = true;
    // this.step6 = true;
  }

  // propertyDetailsStep: boolean = false;
  // currentCondStep: boolean = false;
  // sellingIntentions: boolean = false;
  // reasonForSelling: boolean = false;

  propertyDetailsForm(form: NgForm) {
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

    this.playFile();
    this.currentCondStep = true;
  }


  currentCondStepForm(form: NgForm) {
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

    this.playFile();
    this.sellingIntentions = true;
  }


  sellingIntentionsForm(form: NgForm) {
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

    this.playFile();
    this.reasonForSelling = true;
  }

  reasonForSellingForm(form: NgForm) {
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

    this.playFile();
    this.step6 = true;
  }

  propertyInformaionConf() {

    this.pleaseWait = true;
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

   this.formData.fullName  = this.fullNameInput.nativeElement.value;
   this.formData.email  = this.emailInput.nativeElement.value;
   this.formData.phoneNumber  = this.phoneInput.nativeElement.value;
   this.formData.sessionFullStreetAddress  = this.propertyAddressInput.nativeElement.value;
   this.formData2.ownedProperty  = this.ownedPropertyInput.nativeElement.value;
   this.formData2.sizeProperty  = this.sizePropertyInput.nativeElement.value;
   this.formData2.numberOfBedroom  = this.numberOfBedroomInput.nativeElement.value;
   this.formData2.numberOfBathroom  = this.numberOfBathroomInput.nativeElement.value;
   this.formData2.desiredSellingPrice  = this.desiredSellingPriceInput.nativeElement.value;
   this.formData2.currentCondition  = this.currentConditionInput.nativeElement.value;
   this.formData2.motiveSellProperty  = this.motiveSellPropertyInput.nativeElement.value;

    this._apiCallServices.mhbAdvisorAPI(this.formData.fullName, this.formData.email, this.formData.phoneNumber, this.formData.sessionFullStreetAddress, this.formData2.ownedProperty, this.formData2.sizeProperty,
      this.formData2.numberOfBedroom, this.formData2.numberOfBathroom, this.formData2.desiredSellingPrice, this.formData2.currentCondition, this.formData2.motiveSellProperty, this.selectedPropertyType, this.selectedSellingTimeline).subscribe(res => {
        console.log(res);
        if (res.status == "success") {
          // setTimeout(() => {
          //     this.spinner.hide();
          // }, 1000);
          // this._toast.success({detail: "SUCCESS", summary: 'Form successfully submitted', position: 'br'});
          // this.SimpleModalService.addModal(AlertComponent, { message: 'Redirecting you to chat window..'});

          // setTimeout(function () {
          //     window.location.href = '/chat'
          // }, 12000);

          this.playFile();
          this.step7 = true;
          setTimeout(() => {
            const container = this.scrollContainer.nativeElement;
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth' // Use smooth behavior for smooth scrolling
            });
          }, 100); // Adjust the delay as needed

        } else if (res.status == "error") {
          // alert(res.message);
          // location.reload;
          //   setTimeout(() => {
          //       this.spinner.hide();
          //       window.location.reload();
          //   }, 1000);

          this.playFile();
          this.errorFormSubmit = true;
          setTimeout(() => {
            const container = this.scrollContainer.nativeElement;
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth' // Use smooth behavior for smooth scrolling
            });
          }, 100); // Adjust the delay as needed


        } else if (res.status == "timeout") {

          this.playFile();
          this.errorFormSubmit = true;
          setTimeout(() => {
            const container = this.scrollContainer.nativeElement;
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth' // Use smooth behavior for smooth scrolling
            });
          }, 100); // Adjust the delay as needed


        }


      }, err => {
        // this.SimpleModalService.addModal(CustomErrorComponent);

        // alert('An error occurred. Please try after sometime!');
        // location.reload;
        //   setTimeout(() => {
        //       this.spinner.hide();
        //       window.location.reload();
        //   }, 1000);
        this.errorFormSubmit = true;
        setTimeout(() => {
          const container = this.scrollContainer.nativeElement;
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth' // Use smooth behavior for smooth scrolling
          });
        }, 100); // Adjust the delay as needed


      }, () => console.log("CONTACT DETAILS FORM SUMBITTED SUCCESSFULLY"))

    // this.step7 = true;
    this.isTextareaDisabled = false;
  }

  sendMessage() {
    const userMessage = this.userMessage;
    this.userMessage = "";
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

    this.playFile();
    this.chatMessages.push({ role: 'user', content: userMessage });
    // this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });
    // Clear the input field after sending the message

    this.chatMessages.push({ role: 'bot', content: '...' });
    this.isTextareaDisabled = true;
  
    this._apiCallServices.getResponseFromChatbot(userMessage).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        // setTimeout(() => {
        //     this.spinner.hide();
        // }, 1000);
        // this._toast.success({detail: "SUCCESS", summary: 'Form successfully submitted', position: 'br'});
        // setTimeout(function () {
        //     window.location.href = '/thank-you'
        // }, 1000);

        this.chatMessages.pop();
        
        this.playFile();
        this.chatMessages.push({ role: 'bot', content: res.response.content });
        this.isTextareaDisabled = false;
  
        this.userMessage = '';
        setTimeout(() => {
          const container = this.scrollContainer.nativeElement;
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth' // Use smooth behavior for smooth scrolling
          });
        }, 100); // Adjust the delay as needed

      }
      // else if (res.status == "error") {
      //   alert(res.message);
      //   location.reload;
      //     setTimeout(() => {
      //         this.spinner.hide();
      //         window.location.reload();
      //     }, 1000);

      // } 
      else if (res.status == "timeout") {
        // alert(res.message);
        // location.reload;
        //   setTimeout(() => {
        //       this.spinner.hide();
        //       window.location.reload();
        //   }, 1000);

        this.chatMessages.pop();
        this.playFile();
        this.chatMessages.push({ role: 'bot', content: `Internal server error. Please try again later.` });
        this.isTextareaDisabled = false;
  
        setTimeout(() => {
          const container = this.scrollContainer.nativeElement;
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth' // Use smooth behavior for smooth scrolling
          });
        }, 100); // Adjust the delay as needed

      }

    });
  }

  preQues1() {
    const userMessage = "Who is Michael the Home Buyer?";
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

    this.playFile();
    this.chatMessages.push({ role: 'user', content: userMessage });
    // this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });
    // Clear the input field after sending the message

    this.chatMessages.push({ role: 'bot', content: '...' });
    this.isTextareaDisabled = true;
  
    this._apiCallServices.getResponseFromChatbot(userMessage).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        // setTimeout(() => {
        //     this.spinner.hide();
        // }, 1000);
        // this._toast.success({detail: "SUCCESS", summary: 'Form successfully submitted', position: 'br'});
        // setTimeout(function () {
        //     window.location.href = '/thank-you'
        // }, 1000);
        this.chatMessages.pop();
        this.playFile();
        this.chatMessages.push({ role: 'bot', content: res.response.content });
        this.userMessage = '';
        this.isTextareaDisabled = false;
  
        setTimeout(() => {
          const container = this.scrollContainer.nativeElement;
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth' // Use smooth behavior for smooth scrolling
          });
        }, 100); // Adjust the delay as needed

      }
      // else if (res.status == "error") {
      //   alert(res.message);
      //   location.reload;
      //     setTimeout(() => {
      //         this.spinner.hide();
      //         window.location.reload();
      //     }, 1000);

      // } 
      else if (res.status == "timeout") {
        // alert(res.message);
        // location.reload;
        //   setTimeout(() => {
        //       this.spinner.hide();
        //       window.location.reload();
        //   }, 1000);

        this.chatMessages.pop();
        this.playFile();
        this.chatMessages.push({ role: 'bot', content: `Internal server error. Please try again later.` });
        this.isTextareaDisabled = false;
  
        setTimeout(() => {
          const container = this.scrollContainer.nativeElement;
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth' // Use smooth behavior for smooth scrolling
          });
        }, 100); // Adjust the delay as needed

      }

    });
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

  }


  preQues2() {
    const userMessage = "How long is the process to sell?";
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

    this.playFile();
    this.chatMessages.push({ role: 'user', content: userMessage });

    // this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });
    // Clear the input field after sending the message

    this.chatMessages.push({ role: 'bot', content: '...' });
    this.isTextareaDisabled = true;
  
    this._apiCallServices.getResponseFromChatbot(userMessage).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        // setTimeout(() => {
        //     this.spinner.hide();
        // }, 1000);
        // this._toast.success({detail: "SUCCESS", summary: 'Form successfully submitted', position: 'br'});
        // setTimeout(function () {
        //     window.location.href = '/thank-you'
        // }, 1000);

        this.chatMessages.pop();
        this.playFile();
        this.chatMessages.push({ role: 'bot', content: res.response.content });
        this.userMessage = '';
        this.isTextareaDisabled = false;
  
        setTimeout(() => {
          const container = this.scrollContainer.nativeElement;
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth' // Use smooth behavior for smooth scrolling
          });
        }, 100); // Adjust the delay as needed

      }
      // else if (res.status == "error") {
      //   alert(res.message);
      //   location.reload;
      //     setTimeout(() => {
      //         this.spinner.hide();
      //         window.location.reload();
      //     }, 1000);

      // } 
      else if (res.status == "timeout") {
        // alert(res.message);
        // location.reload;
        //   setTimeout(() => {
        //       this.spinner.hide();
        //       window.location.reload();
        //   }, 1000);

        this.chatMessages.pop();
        this.playFile();
        this.chatMessages.push({ role: 'bot', content: `Internal server error. Please try again later.` });
        this.isTextareaDisabled = false;
  
        setTimeout(() => {
          const container = this.scrollContainer.nativeElement;
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth' // Use smooth behavior for smooth scrolling
          });
        }, 100); // Adjust the delay as needed

      }

    });
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

  }


  preQues3() {
    const userMessage = "What is the contact information of MHB?";
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

    this.playFile();
    this.chatMessages.push({ role: 'user', content: userMessage });
    // this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });
    // Clear the input field after sending the message

    this.chatMessages.push({ role: 'bot', content: '...' });
    this.isTextareaDisabled = true;
  
    this._apiCallServices.getResponseFromChatbot(userMessage).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        // setTimeout(() => {
        //     this.spinner.hide();
        // }, 1000);
        // this._toast.success({detail: "SUCCESS", summary: 'Form successfully submitted', position: 'br'});
        // setTimeout(function () {
        //     window.location.href = '/thank-you'
        // }, 1000);
this.chatMessages.pop();
        this.playFile();
        this.chatMessages.push({ role: 'bot', content: res.response.content });
        this.userMessage = '';
        this.isTextareaDisabled = false;
  
        setTimeout(() => {
          const container = this.scrollContainer.nativeElement;
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth' // Use smooth behavior for smooth scrolling
          });
        }, 100); // Adjust the delay as needed

      }
      // else if (res.status == "error") {
      //   alert(res.message);
      //   location.reload;
      //     setTimeout(() => {
      //         this.spinner.hide();
      //         window.location.reload();
      //     }, 1000);

      // } 
      else if (res.status == "timeout") {
        // alert(res.message);
        // location.reload;
        //   setTimeout(() => {
        //       this.spinner.hide();
        //       window.location.reload();
        //   }, 1000);

        this.chatMessages.pop();
        this.playFile();
        this.chatMessages.push({ role: 'bot', content: `Internal server error. Please try again later.` });
        this.isTextareaDisabled = false;
  
        setTimeout(() => {
          const container = this.scrollContainer.nativeElement;
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth' // Use smooth behavior for smooth scrolling
          });
        }, 100); // Adjust the delay as needed

      }

    });
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

  }

  refresh() {

  }

}
