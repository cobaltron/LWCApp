import ContactId from '@salesforce/schema/Case.ContactId';
import { LightningElement } from 'lwc';
import { api } from 'lwc';
import deleteContact from "@salesforce/apex/contactController.deleteContact";
import updateContact from "@salesforce/apex/contactController.updateContact";
export default class conItem extends LightningElement {
    @api conName;
    @api active;
    @api conId;
    @api email;

    updateHandler(){

    const con = {
        conId: this.conId,
        active: !this.active
      };
  
      //make a call to server to update the item
      updateContact({ payload: JSON.stringify(con) })
        .then(result => {
          //on successful update, fire an event to notify parent component
          const updateEvent = new CustomEvent("update", { detail: con });
          this.dispatchEvent(updateEvent);
        })
        .catch(error => {
          console.error("Error in updatig records ", error);
        });
    }
    deleteHandler() {
        //make a call to server to delete item
        deleteContact({ conId: this.conId })
            .then(result => {
            //on successful delete, fire an event to notify parent component
            this.dispatchEvent(new CustomEvent("delete", { detail: this.conid }));
            })
            .catch(error => {
            console.error("Error in updatig records ", error);
            });
        }

    get buttonIcon() {
        return this.active ? "utility:hide" : "utility:check";
      }
    
      // get property to return container class
      get containerClass() {
        return this.active ? "contact active" : "contact inactive";
      }
}