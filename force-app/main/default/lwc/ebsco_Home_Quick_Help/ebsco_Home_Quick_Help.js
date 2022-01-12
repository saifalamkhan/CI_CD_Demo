import { LightningElement } from 'lwc';
import needQuickHelp from '@salesforce/label/c.Need_Quick_Help';
import quickHelpLabel1 from '@salesforce/label/c.Home_Quick_Help_Label1';
import quickHelpLabel2 from '@salesforce/label/c.Home_Quick_Help_Label2';
import quickHelpLabel3 from '@salesforce/label/c.Home_Quick_Help_Label3';
import quickHelpLabel4 from '@salesforce/label/c.Home_Quick_Help_Label4';
import quickHelpLabel5 from '@salesforce/label/c.Home_Quick_Help_Label5';

import getCustomSettingsMap from '@salesforce/apex/HomePageUrlRetrival.customSettingsMap';



export default class Ebsco_Home_Quick_Help extends LightningElement {
    label={
        needQuickHelp,
        quickHelpLabel1,
        quickHelpLabel2,
        quickHelpLabel3,
        quickHelpLabel4,
        quickHelpLabel5
    }

    customSettingsMap;

    connectedCallback(){
        getCustomSettingsMap()
        .then(result => {
            if (result) {
                this.customSettingsMap = result;
            }
        })
        .catch(error => {
            this.error = error;
        });
    }
}