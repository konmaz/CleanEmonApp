"use strict";
let is_emon_id_not_set;
is_emon_id_not_set = localStorage.getItem('emon_id') === null;
import {isLoggedIn, showLoginModal} from './login.js';
window.addEventListener('load', function () {
    if (isLoggedIn()){
        if (is_emon_id_not_set) {
            document.body.insertAdjacentHTML('beforeend', `<div class="modal fade" id="modal_no_settings" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 text-danger" id="staticBackdropLabel">No CleanEmon device</h1>
                        </div>
                        <div class="modal-body">
                            Please select a device from the list in the settings.
                        </div>
                        <div class="modal-footer">
                            <a href="settings.html"><button type="button" autofocus class="btn btn-primary">Go to Settigns</button></a>
            
                        </div>
                    </div>
                </div>
            </div>`);
            const myModal = new bootstrap.Modal(document.getElementById('modal_no_settings'));
            myModal.show();
        }
    }else
        showLoginModal();
});
