import { LightningElement } from 'lwc';
import getCustomSettingsMap from '@salesforce/apex/HomePageUrlRetrival.customSettingsMap';


export default class EbscoNewsHomeFeatured extends LightningElement {
    customSettingsMap;

    connectedCallback(){
        getCustomSettingsMap()
        .then(result => {
            if (result) {
                this.customSettingsMap = result;
                /*for (let key in result) {
                   this.customSettingsMap.push({key:key,value:result[key]});
                }*/
            }
        })
        .catch(error => {
            this.error = error;
        });
    }
}