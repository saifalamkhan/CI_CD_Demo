import { LightningElement } from 'lwc';
import getCustomSettingsMap from '@salesforce/apex/HomePageUrlRetrival.customSettingsMap';
import EBSCOHomePageResource from '@salesforce/resourceUrl/ebsco_connect_featured_tutorials_image';

export default class EbscoHomeWebinarFeaturedArticles extends LightningElement {

    imageurl = EBSCOHomePageResource;
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