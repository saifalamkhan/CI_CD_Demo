import { LightningElement } from 'lwc';
import having_trouble from '@salesforce/label/c.having_trouble';
import Still_having_trouble from '@salesforce/label/c.Still_having_trouble';
import Contact_support from '@salesforce/label/c.Contact_support';

import isGuestUser from '@salesforce/apex/UserHelper.isGuest';
import { NavigationMixin } from 'lightning/navigation';


export default class Ebsco_Home_Contact_Support extends NavigationMixin(LightningElement) {
    label = {
        having_trouble,
        Still_having_trouble,
        Contact_support
    };

    isGuest;
    error;
    contactSupportCSS = 'contact-support';

    connectedCallback(){
        isGuestUser()
        .then(result => {
            if(result){
                console.log('result:'+result);
                this.isGuest = result;
                var contactSupport =  this.template.querySelector('[data-id="contact-support"]');
                if(contactSupport && this.isGuest){
                    this.contactSupportCSS = 'contact-support-guest contact-support';
                    //this.template.querySelector('[data-id="contact-support"]').addClass('contact-support-guest');
                }
            }
            
        })
        .catch(error => {
            if (error) {
                if (error[0] && error[0].message) {
                  console.log("Error message: " + error[0].message);
                  this.error = error;
                }
              } else {
                  console.log("Unknown error");
              }
        });
    }

    openActionWindow(){
       /* this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: this.isGuest ?   '/loginpage' : '/contactsupport',
            }
        });*/

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: this.isGuest ?   'LoginPage__c' : 'Contact_Support'
            }
        }); 
    }
}