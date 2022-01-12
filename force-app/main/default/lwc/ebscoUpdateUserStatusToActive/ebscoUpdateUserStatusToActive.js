import { LightningElement } from 'lwc';
import updateuser from "@salesforce/apex/EbscoCurrentUserStatusUpdate.UpdateRecord"
export default class EbscoUpdateUserStatusToActive extends LightningElement {

    connectedCallback(){
        updateuser()
        .then(result => {
            //anylogic
        })
        .catch(error => {
            console.log(error)
        });
    }
}