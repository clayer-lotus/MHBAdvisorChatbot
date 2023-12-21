import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  
  userMessage!: string;
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [
  ];

  @ViewChild('scrollContainer', { static: false }) private scrollContainer!: ElementRef;

  constructor(private _apiCallServices : ChatService){}

  refresh(){
    window.location.reload();
  }

  sendMessage() {
    const userMessage = this.userMessage;
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

    this.chatMessages.push({ role: 'user', content: userMessage });
    // this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });
    // Clear the input field after sending the message
   
    
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
          this.chatMessages.push({ role: 'bot', content: res.response });
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
        this.chatMessages.push({ role: 'bot', content: `Internal server error. Please try again later.` });
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

  preQues1(){

    const userMessage = "Who is Michael the Home Buyer?";
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed

    this.chatMessages.push({ role: 'user', content: userMessage });
    // this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });
    // Clear the input field after sending the message
   
    
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
          this.chatMessages.push({ role: 'bot', content: res.response });
          this.userMessage = '';
       
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
        this.chatMessages.push({ role: 'bot', content: `Internal server error. Please try again later.` });
   
      }

  });

}
preQues2(){

  const userMessage = "What is the process to sell house?";
  setTimeout(() => {
    const container = this.scrollContainer.nativeElement;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth' // Use smooth behavior for smooth scrolling
    });
  }, 100); // Adjust the delay as needed

  this.chatMessages.push({ role: 'user', content: userMessage });
  // this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });
  // Clear the input field after sending the message
 
  
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
        this.chatMessages.push({ role: 'bot', content: res.response });
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
      this.chatMessages.push({ role: 'bot', content: `Internal server error. Please try again later.` });
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
preQues3(){
  // this.chatMessages.push({ role: 'user', content: '' });
  // this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });

  // setTimeout(() => {
  //   const container = this.scrollContainer.nativeElement;
  //   container.scrollTo({
  //     top: container.scrollHeight,
  //     behavior: 'smooth' // Use smooth behavior for smooth scrolling
  //   });
  // }, 100); // Adjust the delay as needed }


  
  const userMessage = "How long is the process to sell?";
  setTimeout(() => {
    const container = this.scrollContainer.nativeElement;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth' // Use smooth behavior for smooth scrolling
    });
  }, 100); // Adjust the delay as needed

  this.chatMessages.push({ role: 'user', content: userMessage });
  // this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });
  // Clear the input field after sending the message
 
  
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
        this.chatMessages.push({ role: 'bot', content: res.response });
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
      this.chatMessages.push({ role: 'bot', content: `Internal server error. Please try again later.` });
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

preQues4(){
  // this.chatMessages.push({ role: 'user', content: 'Do you buy condominiums?' });
  // this.chatMessages.push({ role: 'bot', content: `Yes. Michael the Home Buyer will purchase a condo, town- house, duplex, farm, apartment house, vacation property, land – almost any piece of real estate.` });

  // setTimeout(() => {
  //   const container = this.scrollContainer.nativeElement;
  //   container.scrollTo({
  //     top: container.scrollHeight,
  //     behavior: 'smooth' // Use smooth behavior for smooth scrolling
  //   });
  // }, 100); // Adjust the delay as needed }


  const userMessage = "Do you buy condominiums?";
  setTimeout(() => {
    const container = this.scrollContainer.nativeElement;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth' // Use smooth behavior for smooth scrolling
    });
  }, 100); // Adjust the delay as needed

  this.chatMessages.push({ role: 'user', content: userMessage });
  // this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });
  // Clear the input field after sending the message
 
  
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
        this.chatMessages.push({ role: 'bot', content: res.response });
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
      this.chatMessages.push({ role: 'bot', content: `Internal server error. Please try again later.` });
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
}