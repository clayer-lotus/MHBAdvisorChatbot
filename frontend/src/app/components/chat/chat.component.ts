import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';

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

  constructor(){}

  refresh(){
    window.location.reload();
  }

  sendMessage() {
    const userMessage = this.userMessage;
    this.chatMessages.push({ role: 'user', content: userMessage });
    this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });
    // Clear the input field after sending the message
    this.userMessage = '';
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed
  
  }

  preQues1(){
    this.chatMessages.push({ role: 'user', content: 'Who is Michael the Home Buyer?' });
    this.chatMessages.push({ role: 'bot', content: `We take pride in being Canada's most trusted home buyer. Since 2014 we have purchased hundreds of homes in the Province of Ontario We are not an outside agency that swoops in to buy up homes.` });

    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth' // Use smooth behavior for smooth scrolling
      });
    }, 100); // Adjust the delay as needed }
}
preQues2(){
  this.chatMessages.push({ role: 'user', content: 'What is the process to sell house?' });
  this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });

  setTimeout(() => {
    const container = this.scrollContainer.nativeElement;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth' // Use smooth behavior for smooth scrolling
    });
  }, 100); // Adjust the delay as needed }
}
preQues3(){
  this.chatMessages.push({ role: 'user', content: 'How long is the process to sell?' });
  this.chatMessages.push({ role: 'bot', content: `Discover the Magic of ChatGPT's Typewriter Reply Animation. Achieve the magical typewriter animation effect like ChatGPT with SSE in JavaScript.` });

  setTimeout(() => {
    const container = this.scrollContainer.nativeElement;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth' // Use smooth behavior for smooth scrolling
    });
  }, 100); // Adjust the delay as needed }
}
preQues4(){
  this.chatMessages.push({ role: 'user', content: 'Do you buy condominiums?' });
  this.chatMessages.push({ role: 'bot', content: `Yes. Michael the Home Buyer will purchase a condo, town- house, duplex, farm, apartment house, vacation property, land – almost any piece of real estate.` });

  setTimeout(() => {
    const container = this.scrollContainer.nativeElement;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth' // Use smooth behavior for smooth scrolling
    });
  }, 100); // Adjust the delay as needed }
}
}