import { LightningElement, track } from 'lwc';
import Logins from '@salesforce/label/c.Logins';
import All_rights_reserved from '@salesforce/label/c.All_rights_reserved';
import Home_Footer_Privacy_Policy from '@salesforce/label/c.Home_Footer_Privacy_Policy';
import EBSCOHOMEPAGELOGO from '@salesforce/resourceUrl/EBSCOHOMEPAGELOGO';
import getCustomSettingsMap from '@salesforce/apex/HomePageUrlRetrival.customSettingsMap';
import FontAwesomeCss from '@salesforce/resourceUrl/FontAwesomeCss';


import { loadStyle } from 'lightning/platformResourceLoader';

export default class EbscoLoginFooter extends LightningElement {

    @track customSettingsMap;

    imageurl = EBSCOHOMEPAGELOGO+'/IMAGES/logo.PNG';

    Label={
        Logins,
        All_rights_reserved,
        Home_Footer_Privacy_Policy,

    }

    constructor() {
        super();
        Promise.all([
            loadStyle(this, FontAwesomeCss + '/css/font-awesome.min.css')
        ]).then(() => {
            console.log( 'Files loaded' );
        })
        .catch(error => {
            console.log( error.body.message );
    });
}

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