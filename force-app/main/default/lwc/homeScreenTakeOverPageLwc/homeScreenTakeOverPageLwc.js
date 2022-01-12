import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import doInit from "@salesforce/apex/HomePageScreenTakeOver.getPopupShowValue";
import getDependentMap from "@salesforce/apex/HomePageScreenTakeOver.getDependentMap";
import closePopup from "@salesforce/apex/HomePageScreenTakeOver.ClosePopup";
import getPreferences from "@salesforce/apex/HomePageScreenTakeOver.getPreferences";
import saveReferences from "@salesforce/apex/HomePageScreenTakeOver.SaveReferences";

// Import custom labels
import homePageWelcomeNote from '@salesforce/label/c.HomePageWelcomeNote';
import homePagePopupHeader1 from '@salesforce/label/c.HomePagePopupHeader1';
import homePagePopupErrorMessage from '@salesforce/label/c.HomePagePopupErrorMessage';
import homePagePopupHeader2 from '@salesforce/label/c.HomePagePopupHeader2';
import success from '@salesforce/label/c.Success';
import preference_Save_Message from '@salesforce/label/c.Preference_Save_Message';

export default class homeScreenTakeOverPageLwc extends LightningElement {
    @track isOpen;
    @api controllingFieldAPI = 'Market__c';
    @api dependingFieldAPI = 'Job_Role__c';
    @track objDetail = { 'sobjectType': 'User' };
    @api depnedentFieldMap;
    @api bDisabledDependentFld;
    @api preferences = [];
    @track listDependingValues = [{ label: '- Select Your Job Role -', value: '- Select Your Job Role -' }];
    @track listControllingValues = [];

    // Expose the labels to use in the template.
    label = {
        homePageWelcomeNote,
        homePagePopupHeader1,
        homePagePopupHeader2,
        homePagePopupErrorMessage,
    };

    connectedCallback() {
        // get the fields API name and pass it to helper function 
        //console.log(this.template.querySelector('[data-id="errorControl"]'));
        if (this.template.querySelector('[data-id="errorControl"]') != null) {
            this.template.querySelector('[data-id="errorControl"]').classList.add('slds-hide');
            this.template.querySelector('[data-id="errorDependent"]').classList.add('slds-hide');
        }
        this.bDisabledDependentFld = true;
        doInit().then((resp) => {
            this.isOpen = resp;
            if(this.isOpen){
                this.fetchPicklistValues();
            }
        }).catch(error => {
            console.log("Error message: " + error.body.message);
        });
    }

    closeModel() {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        this.isOpen = false;
        closePopup().then((resp) => {

        })
            .catch(error => {
                console.log("Error message: " + error.body.message);
            });
    }

    fetchPicklistValues() {
        // call the server side function  
        getDependentMap({ objDetail: this.objDetail, contrfieldApiName: this.controllingFieldAPI, depfieldApiName: this.dependingFieldAPI }).then((resp) => {
            this.depnedentFieldMap = resp;
            var StoreResponse = resp;
            // create a empty array for store map keys(@@--->which is controller picklist values) 
            var listOfkeys = []; // for store all map keys (controller picklist values)
            var ControllerField = []; // for store controller picklist value to set on lightning:select. 

            // play a for loop on Return map 
            // and fill the all map key on listOfkeys variable.
            var defaultvalue = [];
            for (var singlekey in StoreResponse) {

                if (singlekey != 'Default')
                    listOfkeys.push(singlekey);
                else
                    defaultvalue = StoreResponse['Default'];
            }
            var dependentPopulate;
            if (defaultvalue != null && defaultvalue.length > 0) {
                ControllerField.push(defaultvalue[0]);
                this.objDetail.Market__c = defaultvalue[0];
                this.objDetail.Job_Role__c = defaultvalue[1];

                console.log(this.objDetail.Market__c);
                console.log(this.objDetail.Job_Role__c);

                if (this.objDetail.Market__c != null && this.objDetail.Job_Role__c != null) {
                    this.template.querySelector('[data-id="errorControl"]').classList.add('slds-hide');
                    this.template.querySelector('[data-id="errorDependent"]').classList.add('slds-hide');
                }

                dependentPopulate = true;

                this.bDisabledDependentFld = false;

                var dependentFields = [];
                dependentFields.push(defaultvalue[1]);


                var textarray = [];
                textarray = this.depnedentFieldMap[defaultvalue[0]];

                for (i = 0; i < textarray.length; i++) {
                    dependentFields.push(textarray[i]);
                }
                for (var i = 0; i < dependentFields.length; i++) {
                    this.listDependingValues.push({ label: dependentFields[i], value: dependentFields[i] });
                }
            } else {
                if (listOfkeys != undefined && listOfkeys.length > 0) {
                    this.objDetail.Market__c = '- Select Your Market -';
                    ControllerField.push('- Select Your Market -');
                    this.objDetail.Job_Role__c = '- Select Your Job Role -';
                }
            }

            for (var i = 0; i < listOfkeys.length; i++) {
                if (listOfkeys[i] != defaultvalue[0])
                    ControllerField.push(listOfkeys[i]);
            }

            for (var i = 0; i < ControllerField.length; i++) {
                this.listControllingValues.push({ label: ControllerField[i], value: ControllerField[i] });
            }
            // call the server side function  
            getPreferences().then((pref) => {
                this.preferences = pref;
            });
        })
            .catch(error => {
                console.log('The error:' + error);
                alert('Something went wrong..');
            });
    };
    onControllerFieldChange(event) {
        var controllerValueKey = event.detail.value; // get selected controller field value
        this.objDetail.Market__c = controllerValueKey;
        this.objDetail.Job_Role__c = "- Select Your Job Role -";
        if (controllerValueKey == '- Select Your Market -') {
            this.template.querySelector('[data-id="errorControl"]').classList.remove('slds-hide');
        }

        if (controllerValueKey != '- Select Your Market -') {
            this.template.querySelector('[data-id="errorControl"]').classList.add('slds-hide');
            var ListOfDependentFields = this.depnedentFieldMap[controllerValueKey];

            if (ListOfDependentFields.length > 0) {
                this.bDisabledDependentFld = false;
                this.fetchDepValues(ListOfDependentFields);
            } else {
                this.bDisabledDependentFld = true;
                this.listDependingValues = [{ label: '- Select Your Job Role -', value: '- Select Your Job Role -' }];
            }

        } else {
            this.listDependingValues = [{ label: '- Select Your Job Role -', value: '- Select Your Job Role -' }];
            this.bDisabledDependentFld = true;
        }
    };
    dependentFieldChange(event) {
        var controllerValueKey = event.detail.value; // get selected controller field value
        this.objDetail.Job_Role__c = controllerValueKey;
        if (controllerValueKey != '- Select Your Job Role -') {
            this.template.querySelector('[data-id="errorDependent"]').classList.add('slds-hide');
        }
        if (controllerValueKey == '- Select Your Job Role -') {
            this.template.querySelector('[data-id="errorDependent"]').classList.remove('slds-hide');
        }
    };
    fetchDepValues(ListOfDependentFields) {
        this.listDependingValues = [];
        this.listDependingValues.push({ label: '- Select Your Job Role -', value: '- Select Your Job Role -' });
        for (var i = 0; i < ListOfDependentFields.length; i++) {
            this.listDependingValues.push({ label: ListOfDependentFields[i], value: ListOfDependentFields[i] });
        }
    };
    savePreferencs() {
        var error = false;
        if (this.objDetail.Market__c == "" || this.objDetail.Market__c == '- Select Your Market -') {
            this.template.querySelector('[data-id="errorControl"]').classList.remove('slds-hide');
            error = true;
        }
        if (this.objDetail.Job_Role__c == "" || this.objDetail.Job_Role__c == '- Select Your Job Role -') {
            this.template.querySelector('[data-id="errorDependent"]').classList.remove('slds-hide');
            error = true;
        }
        if (!error) {
            var objDetail = JSON.stringify(this.objDetail);
            var preferencesWrapper = JSON.stringify(this.preferences);
            // call the server side function  
            saveReferences({ objDetail: objDetail, preferencesWrapper: preferencesWrapper }).then((pref) => {
                var toastEvent = new ShowToastEvent({
                    "title": success,
                    "message": preference_Save_Message,
                });
                this.dispatchEvent(toastEvent);
            })
                .catch(error => {
                    console.log('The error:' + error.body.message);
                    alert('Something went wrong..');
                });
        }
    }
}