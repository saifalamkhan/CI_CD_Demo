import { LightningElement } from 'lwc';
import EBSCO_Academy from '@salesforce/label/c.EBSCO_Academy';
import Academy_Description from '@salesforce/label/c.Academy_Description';
import EBSCO_Academy_Button from '@salesforce/label/c.EBSCO_Academy_Button';
import EBSCO_Academy_Promo from '@salesforce/resourceUrl/EBSCO_Academy_Promo';


import { NavigationMixin } from 'lightning/navigation';

export default class EbscoHomeWebinar extends NavigationMixin(LightningElement) {

    imageurl = EBSCO_Academy_Promo;
    // Expose the labels to use in the template.
    Label = {
        EBSCO_Academy,
        Academy_Description,
        EBSCO_Academy_Button
    };

    goToCourses(){
        console.log('button clicked');
       try{
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'EBSCO_Academy__c'
            }
        }); 
       } catch(error){
        console.log(error);
       }
    }
}