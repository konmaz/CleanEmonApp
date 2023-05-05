"use strict";
let is_not_there;
is_not_there = localStorage.getItem('emon_id') === null;
window.addEventListener('load', function () {
    if (is_not_there) {
        document.body.insertAdjacentHTML('beforeend', `<div class="modal fade" id="modal_no_settings" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 text-danger" id="staticBackdropLabel">No CleanEmon device</h1>
            </div>
            <div class="modal-body">
                Please select a device from the list in the settings.
            </div>
            <div class="modal-footer">
                <a href="settings.html"><button type="button" class="btn btn-primary">Go to Settigns</button></a>

            </div>
        </div>
    </div>
</div>`);
        const myModal = new bootstrap.Modal(document.getElementById('modal_no_settings'));
        myModal.show();
    }
});
