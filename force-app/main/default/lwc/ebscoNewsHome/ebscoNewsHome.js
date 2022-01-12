import { api, LightningElement } from 'lwc';

import homeNewsLabel1 from '@salesforce/label/c.Home_News_Label1';
import homeNewsLabel2 from '@salesforce/label/c.Home_News_Label2';
import homeNewsLabel3 from '@salesforce/label/c.Home_News_Label3';
import homeNewsLabel4 from '@salesforce/label/c.Home_News_Label4';
import homeNewsViewAll from '@salesforce/label/c.Home_News_View_All';
import news from '@salesforce/label/c.News';



export default class EbscoNewsHome extends LightningElement {
@api
customSettingsMap;

    label = {
        homeNewsLabel1,
        homeNewsLabel2,
        homeNewsLabel3,
        homeNewsLabel4,
        homeNewsViewAll,
        news
    };

 
}