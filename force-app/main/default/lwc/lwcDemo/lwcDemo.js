import { LightningElement,api,track } from 'lwc';
import getContactRec from "@salesforce/apex/contactController.getContactRec";

export default class lwcDemo extends LightningElement {
  @api recordId;
  input = 'Search here';
  @track conItems =[];
  @track filterconItems=[];

  @track showResultmsg=false;
  connectedCallback() {

    this.fetchContacts();
  }

  changeHandler(event) {
    this.input = event.target.value;
    this.filterconItems= this.conItems.filter(el => el.conName.includes(this.input));
    if(this.filterconItems.length==0){
        this.showResultmsg=true;
    }
    if(this.input==''){
      this.filterconItems.length=0;
      this.showResultmsg=false;
    }
  }



  fetchContacts() {
    console.log('accId'+this.recordId);
    getContactRec({accId: this.recordId})
      .then(result => {
        if (result) {
          //update conItems property with result
          this.conItems = result;
          console.log('size '+result.length);
          console.log('Result '+JSON.stringify(this.conItems));
          this.handleRefresh();
        }
      })
      .catch(error => {
        console.error("Error in fetching contacts" + error);
      });
  }


  
  updateConHandler(event) {
    if (event) {
      this.fetchContacts();
      //const myObj = JSON.parse(event.detail);
      console.log('contact '+event);
      
    }
  }

  deleteConHandler(event) {
    if (event) {
      this.fetchContacts();
      //this.handleRefresh();
    }
  }
  handleRefresh(){
    const inputBox = this.template.querySelector("lightning-input");
    console.log('Current value'+inputBox.value);
    console.log('Current value 2 '+this.input);
    if(inputBox.value!=''){
      this.filterconItems= this.conItems.filter(el => el.conName.includes(inputBox.value));
    }
    console.log('Filtered'+JSON.stringify(this.conItems));
  }
  

}