import { api, LightningElement } from 'lwc';
import homefeaturedLabel1 from '@salesforce/label/c.Home_Featured_Tutorials_Label1';
import homefeaturedLabel2 from '@salesforce/label/c.Home_Featured_Tutorials_Label2';
import homefeaturedLabel3 from '@salesforce/label/c.Home_Featured_Tutorials_Label3';
import featuredTutorialTitle from '@salesforce/label/c.Featured_Tutorials_Title';
import browseAllTutorials from '@salesforce/label/c.Home_Featured_Tutorials_Browse_All_Tutorials';




export default class EbscoFeaturedHomeTutorials extends LightningElement {
    @api
    customSettingsMap;

    
    label = {
        homefeaturedLabel1,
        homefeaturedLabel2,
        homefeaturedLabel3,
        featuredTutorialTitle,
        browseAllTutorials
    };
}