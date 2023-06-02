import {API} from './config.js';

const DEVICE = localStorage.getItem('emon_id');

const SPINER = `<div class="spinner-border text-primary mt-5" role="status" style="width:5rem; height: 5rem" >
  <span class="visually-hidden">Loading...</span>
</div>`

function getMaterialIconByContent(content) {
    content = content.toLowerCase();
    switch (true) {
        case content === "real_consumption":
            return `<i class="material-icons align-middle" style="font-size:1.5em">electric_meter</i>`;
        case content === "noise":
            return `<svg style="width:1.5em" fill="currentColor" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="m1.64 32.5h6.69c0.616 0 1.19-0.365 1.35-1.03l0.662-2.94 3.22 14.9c0.297 1.37 2.53 1.37 2.74-0.0228l2.79-18.3 3.26 28.2c0.206 1.69 2.63 1.67 2.76 0l3.01-33.7 2.99 33.7c0.16 1.71 2.56 1.71 2.76 0l3.26-28.2 2.81 18.3c0.205 1.39 2.42 1.39 2.74 0l3.17-14.7 0.684 2.76c0.206 0.753 0.731 1.03 1.35 1.03h6.48c0.913 0 1.62-0.708 1.62-1.6 0-0.89-0.707-1.62-1.62-1.62h-5.48l-1.83-7.08c-0.411-1.53-2.4-1.53-2.72 0l-2.83 13.3-3.22-21c-0.251-1.67-2.56-1.62-2.76 0.0229l-2.88 25-3.15-35.6c-0.137-1.71-2.65-1.71-2.81 0l-3.15 35.6-2.88-25c-0.183-1.69-2.49-1.69-2.76-0.0229l-3.22 21-2.81-13.3c-0.32-1.42-2.35-1.42-2.74 0l-1.83 7.08h-5.68c-0.913 0-1.64 0.73-1.64 1.62 0 0.89 0.73 1.6 1.64 1.6z"/></svg>`
        case content === "pred_computer":
            return `<svg style="width:1.5em" fill="currentColor" viewBox="0 0 390 390" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m383.4 84.9h-251.2v31.33h231.2v166.8h-231.2v41.22h42.01l-29.6 28.52c-0.978 0.942-1.53 2.242-1.53 3.601v6.396c0 2.761 2.238 5 5 5h151.4c2.762 0 5-2.239 5-5v-6.396c0-1.358-0.553-2.658-1.531-3.601l-29.6-28.52h110c3.64 0 6.592-2.951 6.592-6.596v-226.2c0-3.64-2.952-6.592-6.592-6.592zm-159.6 212.7c4.008 0 7.254 3.247 7.254 7.254 0 4.006-3.246 7.254-7.254 7.254-4.003 0-7.25-3.248-7.25-7.254 0-4.007 3.247-7.254 7.25-7.254z"/><path d="m101.6 22.23h-93.53c-4.461 0-8.076 3.615-8.076 8.076v329.1c0 4.461 3.615 8.076 8.076 8.076h93.53c4.461 0 8.076-3.615 8.076-8.076v-329.1c1e-3 -4.461-3.615-8.076-8.076-8.076zm-55.44 41.02c0-0.705 0.571-1.277 1.277-1.277h14.8c0.705 0 1.277 0.572 1.277 1.277v127.4c0 0.706-0.572 1.278-1.277 1.278h-14.8c-0.706 0-1.277-0.572-1.277-1.278v-127.4zm16.27 194.4c0 4.195-3.4 7.598-7.598 7.598-4.196 0-7.598-3.402-7.598-7.598s3.401-7.598 7.598-7.598c4.198 0 7.598 3.401 7.598 7.598zm-7.597 60.64c-9.877 0-17.88-8.007-17.88-17.88 0-9.877 8.008-17.88 17.88-17.88s17.88 8.008 17.88 17.88c0 9.878-8.008 17.88-17.88 17.88z"/></svg>`;
        case content === "pred_electric_oven":
            return `<svg style="width:1.5em" fill="currentColor" viewBox="0 0 490.67 490.67" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m458.67 5.333h-426.67c-17.707 0-32 14.293-32 32v416c0 17.707 14.293 32 32 32h426.67c17.707 0 32-14.293 32-32v-416c0-17.706-14.294-32-32-32zm10.666 448c0 5.867-4.8 10.667-10.667 10.667h-426.67c-5.867 0-10.667-4.8-10.667-10.667v-416c0-5.867 4.8-10.667 10.667-10.667h426.67c5.867 0 10.667 4.8 10.667 10.667v416z"/><path d="m117.33 85.44c0-20.587-16.747-37.333-37.333-37.333s-37.333 16.746-37.333 37.333 16.746 37.333 37.333 37.333c20.587-0.106 37.333-16.746 37.333-37.333zm-53.333 0c0-8.853 7.147-16 16-16s16 7.147 16 16-7.147 16-16 16-16-7.147-16-16z"/><path d="m410.67 48c-20.587 0-37.333 16.747-37.333 37.333s16.747 37.333 37.333 37.333c20.587 0 37.333-16.747 37.333-37.333s-16.747-37.226-37.333-37.333zm0 53.333c-9.067 0-16.427-7.573-16-16.747 0.427-8.107 7.04-14.827 15.253-15.253 9.173-0.427 16.747 6.933 16.747 16 0 8.747-7.147 16-16 16z"/><path d="m394.67 176h-298.67c-17.707 0-32 14.293-32 32v192c0 17.707 14.293 32 32 32h298.67c17.707 0 32-14.293 32-32v-192c0-17.707-14.294-32-32-32zm10.666 224c0 5.867-4.8 10.667-10.667 10.667h-298.67c-5.867 0-10.667-4.8-10.667-10.667v-192c0-5.867 4.8-10.667 10.667-10.667h298.67c5.867 0 10.667 4.8 10.667 10.667v192z"/><path d="m170.67 122.67h149.33c5.867 0 10.667-4.8 10.667-10.667s-4.8-10.667-10.667-10.667h-149.33c-5.867 0-10.667 4.8-10.667 10.667s4.8 10.667 10.667 10.667z"/><path d="m221.97 259.63c4.693-3.52 5.653-10.24 2.027-14.933-3.413-4.587-9.813-5.547-14.507-2.347-10.773 7.68-25.173 31.573-2.88 67.307 5.44 8.747 7.253 16.533 5.44 22.933-2.773 9.6-13.12 14.72-13.12 14.72-5.333 2.453-7.68 8.853-5.227 14.187s8.853 7.68 14.187 5.227c1.92-0.853 18.987-9.28 24.533-27.84 3.733-12.587 1.173-26.24-7.68-40.533-16.533-26.561-4.373-37.548-2.773-38.721z"/><path d="m285.87 259.73c4.693-3.52 5.76-10.133 2.24-14.933-3.52-4.693-10.133-5.76-14.933-2.24-10.453 7.573-24.64 31.36-2.88 66.987 5.333 8.853 7.147 16.533 5.227 23.04-2.773 9.493-12.693 14.507-12.693 14.507-5.333 2.56-7.467 8.96-4.907 14.293 1.813 3.627 5.44 5.973 9.493 5.973 1.6 0 3.093-0.427 4.587-1.067 1.92-0.853 18.453-9.173 24-27.52 3.733-12.587 1.28-26.24-7.467-40.533-16.107-26.24-4.161-37.227-2.667-38.507z"/></svg>`
        case content === "pred_kettle":
            return `<svg style="width:1.5em" fill="currentColor" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m428.87 83.009c-3.712-3.151-9.275-2.694-12.425 1.016-3.151 3.712-2.696 9.275 1.016 12.425 37.811 32.097 59.341 78.696 59.071 127.85-0.221 39.851-14.547 77.879-40.494 107.88 8.598-21.872 12.865-44.957 12.691-68.725-0.275-36.286-10.712-70.07-29.388-95.132-18.139-24.34-42.952-38.732-70.555-41.138l-4.069-66.652c15.929 3.404 31.228 9.145 45.607 17.128 1.355 0.752 2.823 1.11 4.271 1.11 3.098 0 6.104-1.637 7.714-4.537 2.364-4.257 0.83-9.623-3.427-11.987-17.348-9.632-35.912-16.309-55.276-19.907l-0.991-16.227c-0.225-3.683-2.719-6.835-6.251-7.902-80.422-24.282-165.44-24.282-245.86 0-3.532 1.066-6.026 4.22-6.251 7.902l-0.083 1.366-61.922 35.78c-2.057 1.188-3.547 3.156-4.133 5.457s-0.22 4.743 1.018 6.769l56.46 92.476-6.494 106.36c-0.296 4.859 3.403 9.039 8.262 9.336 4.857 0.287 9.04-3.403 9.336-8.262l14.646-239.89c0.26-0.724 0.424-1.479 0.49-2.247 73.274-20.868 150.3-20.836 223.56 0.099l25.062 410.52h-274.04l7.881-129.09c0.296-4.859-3.403-9.04-8.262-9.336-4.859-0.303-9.04 3.403-9.336 8.262l-7.946 130.17h-13.611c-3.7 0-7.007 2.311-8.278 5.785l-18.479 50.48c-0.99 2.703-0.597 5.721 1.053 8.081 1.649 2.359 4.347 3.766 7.225 3.766h282.39c4.87 0 8.816-3.947 8.816-8.816s-3.946-8.816-8.816-8.816h-269.78l12.023-32.849h324.28l12.023 32.849h-43.287c-4.87 0-8.816 3.947-8.816 8.816s3.946 8.816 8.816 8.816h55.903c2.879 0 5.576-1.406 7.225-3.766s2.042-5.376 1.053-8.081l-18.479-50.48c-1.272-3.475-4.578-5.785-8.278-5.785h-13.611l-18.247-298.88c26.984 3.19 44.81 19.735 55.33 33.851 16.451 22.077 25.646 52.167 25.893 84.728 0.174 23.715-4.534 46.67-13.992 68.213-3.273 7.429-0.823 15.762 5.959 20.265 2.835 1.883 5.995 2.803 9.118 2.803 4.316 0 8.562-1.76 11.786-5.171 32.109-34.034 49.935-78.533 50.195-125.3 0.3-54.375-23.499-105.91-65.292-141.38zm-351.4 54.194-38.582-63.196 43.992-25.421-5.41 88.617z"/><path d="m213.43 86.489c-17.107 0-31.026 13.918-31.026 31.026v238.27c0 17.108 13.919 31.027 31.026 31.027s31.026-13.919 31.026-31.027v-238.27c0-17.108-13.919-31.026-31.026-31.026zm-13.397 31.026c1e-3 -7.387 6.01-13.396 13.396-13.396s13.395 6.009 13.395 13.395v18.296h-26.791v-18.295zm26.792 238.27c0 7.386-6.009 13.396-13.395 13.396s-13.396-6.01-13.396-13.396v-38.377h26.791v38.377zm0-56.008h-26.791v-37.023h26.791v37.023zm0-54.654h-26.791v-37.023h26.791v37.023zm0-54.654h-26.791v-37.023h26.791v37.023z"/></svg>`
        case content === "pred_dish_washer":
            return `<svg style="width:1.5em" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 100.97 122.88" xml:space="preserve"><g><path d="M82.3,13.63c1.95,0,3.53,1.58,3.53,3.53s-1.58,3.53-3.53,3.53c-1.95,0-3.53-1.58-3.53-3.53S80.35,13.63,82.3,13.63 L82.3,13.63z M66.38,90.12c0.9-2.04,1.44-4.82,1.42-7.88c-0.03-6.26-2.4-11.33-5.28-11.32c-2.88,0.01-5.2,5.1-5.16,11.36 c0.02,3.06,0.59,5.84,1.51,7.88C61.39,94.77,63.89,94.28,66.38,90.12L66.38,90.12z M31.06,103c0.05,0.11,0.1,0.22,0.13,0.34h7.28 c-0.88-2.24-1.6-4.75-2.14-7.45c-0.67-3.37-1.04-7.07-1.06-10.94l0-0.09c-0.03-7.87,1.43-15.03,3.81-20.25 c0.47-1.02,0.97-1.97,1.51-2.85c-0.4-0.34-0.81-0.62-1.23-0.83c-0.57-0.29-1.15-0.46-1.72-0.48l-0.15,0.01v-0.01h-0.01 c-2.46,0.01-4.82,2.5-6.65,6.5c-2.07,4.55-3.34,10.88-3.31,17.9l0,0.07c0.02,3.52,0.36,6.87,0.96,9.91 C29.09,97.92,29.98,100.7,31.06,103L31.06,103z M25.98,103.34c-0.87-2.22-1.59-4.72-2.13-7.42c-0.67-3.38-1.05-7.08-1.07-10.97 l0-0.09c-0.03-7.87,1.43-15.03,3.81-20.25c2.62-5.76,6.44-9.34,10.83-9.36v-0.01h0.01c0.09,0,0.18,0,0.26,0.01 c1.27,0.03,2.49,0.36,3.64,0.95c0.83,0.42,1.63,0.98,2.4,1.67c1.86-1.67,3.94-2.61,6.18-2.62v-0.01h0.01c0.09,0,0.18,0,0.26,0.01 c1.28,0.04,2.52,0.37,3.69,0.98c0.82,0.42,1.6,0.97,2.35,1.64c1.86-1.67,3.94-2.61,6.18-2.62v-0.01h0.01c0.09,0,0.18,0,0.27,0.01 c4.31,0.12,8.08,3.65,10.71,9.31c2.43,5.22,3.96,12.39,4,20.27c0.02,3.78-0.3,7.38-0.89,10.65c-0.52,2.87-1.25,5.52-2.15,7.87h7.96 c0.48,0,0.93-0.2,1.25-0.52c0.32-0.32,0.52-0.76,0.52-1.25V49.04c0-0.48-0.2-0.92-0.52-1.24c-0.32-0.32-0.76-0.52-1.24-0.52H19 c-0.48,0-0.92,0.2-1.24,0.52s-0.52,0.76-0.52,1.24v52.53c0,0.48,0.2,0.92,0.52,1.24c0.32,0.32,0.76,0.52,1.24,0.52H25.98 L25.98,103.34z M43.53,102.96c0.06,0.12,0.11,0.25,0.15,0.38h7.29c-0.92-2.32-1.66-4.94-2.2-7.75c-0.63-3.27-0.98-6.86-1-10.64 l0-0.09c-0.03-7.87,1.43-15.03,3.81-20.25c0.46-1.02,0.97-1.97,1.51-2.85c-0.4-0.34-0.8-0.61-1.21-0.82 c-0.58-0.3-1.16-0.47-1.74-0.49l-0.15,0.01v-0.01h-0.01c-2.46,0.01-4.82,2.5-6.65,6.5c-2.07,4.55-3.34,10.88-3.31,17.9l0,0.07 c0.02,3.51,0.36,6.85,0.96,9.88C41.57,97.9,42.46,100.67,43.53,102.96L43.53,102.96z M55.85,102.57c0.11,0.25,0.18,0.51,0.22,0.77 h13.21c0.03-0.28,0.1-0.56,0.22-0.83c1-2.29,1.81-5.02,2.36-8.06c0.54-2.98,0.83-6.22,0.81-9.59c-0.04-7.05-1.37-13.4-3.49-17.95 c-1.83-3.92-4.15-6.37-6.56-6.46l-0.15,0.01v-0.01h-0.01c-2.46,0.01-4.82,2.5-6.65,6.5c-2.07,4.55-3.34,10.88-3.31,17.9v0.07 c0.02,3.39,0.34,6.64,0.91,9.62C53.99,97.58,54.83,100.3,55.85,102.57L55.85,102.57z M19,42.39h63.32c1.83,0,3.49,0.75,4.69,1.95 c1.2,1.2,1.95,2.87,1.95,4.7v52.53c0,1.82-0.75,3.48-1.95,4.68L87,106.27c-1.2,1.2-2.86,1.95-4.68,1.95H19 c-1.83,0-3.49-0.75-4.7-1.95c-1.2-1.2-1.95-2.86-1.95-4.69V49.04c0-1.83,0.75-3.49,1.95-4.7C15.5,43.14,17.17,42.39,19,42.39 L19,42.39z M16.43,13.63c1.95,0,3.53,1.58,3.53,3.53s-1.58,3.53-3.53,3.53s-3.53-1.58-3.53-3.53S14.48,13.63,16.43,13.63 L16.43,13.63z M31.71,13.27H69.6v7.78H31.71V13.27L31.71,13.27z M4.64,29.67h91.7V6.34c0-0.47-0.19-0.89-0.5-1.2 c-0.31-0.31-0.73-0.5-1.2-0.5H6.34c-0.47,0-0.89,0.19-1.2,0.5c-0.31,0.31-0.5,0.73-0.5,1.2V29.67L4.64,29.67L4.64,29.67z M100.97,116.54c0,1.74-0.71,3.33-1.86,4.48c-1.15,1.15-2.74,1.86-4.48,1.86H6.34c-1.74,0-3.33-0.71-4.48-1.86 C0.71,119.86,0,118.28,0,116.53V6.34c0-1.74,0.71-3.33,1.86-4.48S4.59,0,6.34,0h88.3c1.74,0,3.33,0.71,4.48,1.86 c1.15,1.15,1.86,2.74,1.86,4.48C100.97,44.87,100.97,77.89,100.97,116.54L100.97,116.54z M96.34,34.31H4.64v82.22 c0,0.47,0.19,0.89,0.5,1.2c0.31,0.31,0.73,0.5,1.2,0.5h88.3c0.47,0,0.89-0.19,1.2-0.5c0.31-0.31,0.5-0.73,0.5-1.2V34.31 L96.34,34.31L96.34,34.31z"/></g></svg>`
        case content === "pred_fridge":
            return `<svg style="width:1.5em" fill="currentColor" viewBox="-25.67 0 122.88 122.88" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m6.14 0h59.26c1.69 0 3.23 0.69 4.34 1.8s1.8 2.65 1.8 4.34v103.4c0 1.69-0.69 3.23-1.8 4.34s-2.65 1.8-4.34 1.8h-4.89v2.72c0 2.47-2.02 4.49-4.49 4.49s-4.49-2.02-4.49-4.49v-2.72h-31.36v2.72c0 2.47-2.02 4.49-4.49 4.49s-4.49-2.02-4.49-4.49v-2.72h-5.05c-1.69 0-3.23-0.69-4.34-1.8s-1.8-2.65-1.8-4.34v-103.4c0-1.69 0.69-3.23 1.8-4.34s2.65-1.8 4.34-1.8zm4.06 44.89c0-1.34 1.09-2.43 2.43-2.43s2.43 1.09 2.43 2.43v20.4c0 1.34-1.09 2.43-2.43 2.43s-2.43-1.09-2.43-2.43v-20.4zm0-34.5c0-1.34 1.09-2.43 2.43-2.43s2.43 1.09 2.43 2.43v15.15c0 1.34-1.09 2.43-2.43 2.43s-2.43-1.09-2.43-2.43v-15.15zm-5.33 22.98h61.81v-27.23c0-0.35-0.14-0.67-0.38-0.9-0.23-0.23-0.55-0.38-0.9-0.38h-59.26c-0.35 0-0.67 0.14-0.9 0.38-0.23 0.23-0.38 0.55-0.38 0.9v27.23h0.01zm61.8 4.87h-61.8v71.29c0 0.35 0.14 0.67 0.38 0.9 0.23 0.23 0.55 0.38 0.9 0.38h59.25c0.35 0 0.67-0.14 0.9-0.38 0.23-0.23 0.38-0.55 0.38-0.9v-71.29h-0.01z"/></svg>`;
        case content === "pred_light":
            return `<svg style="width:1.5em" fill="currentColor" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path class="st0" d="m428.22 172.22c8e-3 -47.522-19.292-90.648-50.445-121.78-31.121-31.145-74.255-50.445-121.77-50.438-47.514-7e-3 -90.648 19.293-121.77 50.446-31.153 31.121-50.454 74.247-50.446 121.77-8e-3 31.786 8.673 61.634 23.754 87.181h-8e-3c0.016 0.032 0.048 0.064 0.064 0.096 0.04 0.064 0.065 0.128 0.104 0.192l0.016-7e-3c10.98 19.436 26.7 34.724 38.945 48.835 6.167 7.056 11.452 13.751 15 20.014 3.572 6.295 5.382 11.908 5.502 17.53v95.421c8e-3 29.44 23.858 53.296 53.305 53.304h7.64c5.205 10.179 15.68 17.219 27.893 17.219s22.688-7.04 27.894-17.218h7.64c29.447-8e-3 53.296-23.865 53.304-53.304v-95.422c0.12-5.622 1.93-11.236 5.502-17.53 5.302-9.419 14.592-19.709 24.762-30.914 10.074-11.179 20.982-23.352 29.191-37.936l8e-3 7e-3c0.032-0.048 0.056-0.111 0.088-0.16 0.024-0.048 0.056-0.08 0.08-0.128h-8e-3c15.081-25.546 23.762-55.394 23.754-87.18zm-116.39 289.56c-5.23 5.214-12.325 8.401-20.294 8.409h-71.068c-7.969-8e-3 -15.064-3.195-20.294-8.409-5.213-5.23-8.401-12.333-8.409-20.294v-5.326l120.13 25.54c-0.023 0.024-0.039 0.056-0.063 0.08zm8.409-20.294c0 1.754-0.216 3.452-0.513 5.11l-127.96-27.205v-33.524l128.47 27.316v28.303zm0-45.08-128.47-27.317v-10.98h128.47v38.297zm62.906-149.26-0.104 0.169-0.064 0.112c-8.505 15.408-22.92 29.848-36.159 44.904-6.607 7.576-12.918 15.361-17.867 24.034-3.003 5.286-5.39 11.036-6.935 17.13h-132.03c-1.546-6.102-3.932-11.844-6.944-17.13-7.432-12.982-17.867-24.081-27.893-35.246-10.059-11.1-19.733-22.159-26.124-33.692l-0.08-0.128-0.089-0.152c-13.005-21.959-20.462-47.514-20.47-74.928 8e-3 -40.803 16.506-77.626 43.238-104.37 26.75-26.741 63.573-43.231 104.38-43.239 40.804 8e-3 77.627 16.498 104.38 43.238 26.732 26.748 43.23 63.571 43.238 104.37-8e-3 27.414-7.464 52.969-20.47 74.928z"/></svg>`;
        case content === "pred_washing_machine":
            return `<svg style="width:1.5em" fill="currentColor" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" ><path d="M9 3C7.3550302 3 6 4.3550302 6 6L6 44C6 45.64497 7.3550302 47 9 47L41 47C42.64497 47 44 45.64497 44 44L44 6C44 4.3550302 42.64497 3 41 3L9 3 z M 9 5L41 5C41.56503 5 42 5.4349698 42 6L42 44C42 44.56503 41.56503 45 41 45L9 45C8.4349698 45 8 44.56503 8 44L8 6C8 5.4349698 8.4349698 5 9 5 z M 31 8 A 2 2 0 0 0 29 10 A 2 2 0 0 0 31 12 A 2 2 0 0 0 33 10 A 2 2 0 0 0 31 8 z M 37 8 A 2 2 0 0 0 35 10 A 2 2 0 0 0 37 12 A 2 2 0 0 0 39 10 A 2 2 0 0 0 37 8 z M 25 15C18.58765 15 13.347947 20.063149 13.03125 26.398438 A 1.0003647 1.0003647 0 0 0 13.011719 26.783203C13.010406 26.856105 13 26.926791 13 27C13 33.615466 18.384534 39 25 39C31.613644 39 37 33.615686 37 27C37 26.927438 36.989577 26.8574 36.988281 26.785156 A 1.0003647 1.0003647 0 0 0 36.96875 26.390625C36.653041 20.187263 31.591575 15.26567 25.355469 15.072266 A 1.0001 1.0001 0 0 0 25 15 z M 25 17C29.728146 17 33.668186 20.265017 34.716797 24.667969C33.727371 24.214818 32.787337 24.018265 32.021484 24.001953C30.59388 23.971945 29.487301 24.586074 28.445312 25.080078C27.403325 25.574082 26.404985 26 25 26C23.595015 26 22.596676 25.574082 21.554688 25.080078C20.513209 24.586316 19.407059 23.97259 17.980469 24.001953L17.978516 24.001953C17.21168 24.017756 16.272368 24.214606 15.283203 24.667969C16.331391 20.264926 20.269992 17 25 17 z M 18.019531 26 A 1.0001 1.0001 0 0 0 18.021484 26C18.82988 25.98301 19.606254 26.369473 20.697266 26.886719C21.78823 27.403965 23.172985 28 25 28C26.827015 28 28.211723 27.403965 29.302734 26.886719C30.393746 26.369473 31.17012 25.983008 31.978516 26C32.628832 26.013851 33.818619 26.308572 34.994141 27.136719C34.92042 32.606917 30.486181 37 25 37C19.51166 37 15.079544 32.607128 15.005859 27.136719C16.181458 26.308358 17.370799 26.013159 18.019531 26 z"/></svg>`;
        case content === "pred_tumble_dryer":
            return `<svg style="width:1.5em" fill="currentColor" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" ><path d="M9 3C7.3550302 3 6 4.3550302 6 6L6 44C6 45.64497 7.3550302 47 9 47L41 47C42.64497 47 44 45.64497 44 44L44 6C44 4.3550302 42.64497 3 41 3L9 3 z M 9 5L41 5C41.56503 5 42 5.4349698 42 6L42 44C42 44.56503 41.56503 45 41 45L9 45C8.4349698 45 8 44.56503 8 44L8 6C8 5.4349698 8.4349698 5 9 5 z M 31 8 A 2 2 0 0 0 29 10 A 2 2 0 0 0 31 12 A 2 2 0 0 0 33 10 A 2 2 0 0 0 31 8 z M 37 8 A 2 2 0 0 0 35 10 A 2 2 0 0 0 37 12 A 2 2 0 0 0 39 10 A 2 2 0 0 0 37 8 z M 25 15C18.384534 15 13 20.384534 13 27C13 33.615466 18.384534 39 25 39C31.613644 39 37 33.615686 37 27C37 20.510331 31.79579 15.272004 25.355469 15.072266 A 1.0001 1.0001 0 0 0 25 15 z M 25 17C30.532356 17 35 21.465686 35 27C35 32.534314 30.532356 37 25 37C19.465466 37 15 32.534534 15 27C15 21.465466 19.465466 17 25 17 z M 20.984375 21.986328 A 1.0001 1.0001 0 0 0 20 23C20 25.324499 19.656261 25.712059 19.158203 26.488281C18.660146 27.264504 18 28.439429 18 31 A 1.0001 1.0001 0 1 0 20 31C20 28.714571 20.339854 28.350637 20.841797 27.568359C21.343739 26.786082 22 25.595501 22 23 A 1.0001 1.0001 0 0 0 20.984375 21.986328 z M 25.984375 21.986328 A 1.0001 1.0001 0 0 0 25 23C25 25.324499 24.656261 25.712059 24.158203 26.488281C23.660146 27.264504 23 28.439429 23 31 A 1.0001 1.0001 0 1 0 25 31C25 28.714571 25.339854 28.350637 25.841797 27.568359C26.343739 26.786082 27 25.595501 27 23 A 1.0001 1.0001 0 0 0 25.984375 21.986328 z M 30.984375 21.986328 A 1.0001 1.0001 0 0 0 30 23C30 25.324499 29.656261 25.712059 29.158203 26.488281C28.660146 27.264504 28 28.439429 28 31 A 1.0001 1.0001 0 1 0 30 31C30 28.714571 30.339854 28.350637 30.841797 27.568359C31.343739 26.786082 32 25.595501 32 23 A 1.0001 1.0001 0 0 0 30.984375 21.986328 z"/></svg>`;
        default:
            return "";
    }
}


function single_day_consumption(date) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}/dev_id/${DEVICE}/json/date/${date}?downsampling=true`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('bearer_token')}`);

    xhr.onloadstart = function () {
        const loadingText = document.getElementById('image-placeholder');
        loadingText.innerHTML = SPINER;
    };

    xhr.onload = function () {
        if (this.status === 200) {
            // console.log(JSON.parse(xhr.responseText).energy_data);
            let data;
            data = JSON.parse(xhr.responseText).energy_data
            if (data.length !== 0) {

                console.log(data)
                plot_sensor_data(data);
                document.getElementById('image-placeholder').innerHTML = "";

            } else {
                if (dayChartObj !== null) {
                    dayChartObj.destroy();
                }
                document.getElementById('image-placeholder').innerHTML = "No data for this date";
            }
        }
    };
    xhr.send();
}
let doc = document.getElementById("date_picker");
if (doc)
    doc.addEventListener('change', (event) => {
        if (event.target) {
            let selectedText = event.target;
            if (selectedText.value) {
                single_day_consumption(selectedText.value);
            }

        }
    });


function fetch_consumptions(number_of_days) {

    const today = new Date();
    const isoDateToday = today.toISOString().split('T')[0];

// Get the ISO date of X days before
    const XDaysAgo = new Date(today.setDate(today.getDate() - (number_of_days - 1)));
    let from = XDaysAgo.toISOString().split('T')[0];
    let until = isoDateToday;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}/dev_id/${DEVICE}/days_consumptions/range/${from}/${until}?summarize=false`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('bearer_token')}`);

    xhr.onloadstart = function () {
        const loadingText = document.getElementById('image-placeholder_consumption_history');
        loadingText.innerHTML = SPINER;
    };

    xhr.onload = function () {
        if (this.status === 200) {
            // console.log(JSON.parse(xhr.responseText).energy_data);
            let data;
            data = JSON.parse(xhr.responseText)
            if (data.length !== 0) {

                const keys = [];
                const values = [];

                for (let i = 0; i < data.length; i++) {
                    keys.push(data[i].key);
                    values.push(data[i].value);
                }
                console.log(data)
                plot_multiple_days_consumption(keys, values);
                document.getElementById('image-placeholder_consumption_history').innerHTML = "";

            } else {
                if (dayChartObj !== null) {
                    dayChartObj.destroy();
                }
                document.getElementById('image-placeholder_consumption_history').innerHTML = "No data";
            }
        }
    };

    xhr.send();

}
let consumption_history_chart_obj;
consumption_history_chart_obj = null

function plot_multiple_days_consumption(dates, values) {
    if (consumption_history_chart_obj !== null) {
        consumption_history_chart_obj.destroy();
    }

    const datesFormatted = dates.map(function (entry) {
        const date = new Date(entry);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
    });

    const ctx = document.getElementById('consumption_history_canvas').getContext('2d');
    // Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--bs-emphasis-color');
    consumption_history_chart_obj = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datesFormatted,
            datasets: [{
                data: values,
                label: 'kWh'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,

            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }

                }
            },

            plugins: {
                legend: {
                    onClick: null
                },
                title: {
                    display: true,
                    text: `${dates.length}-days consumption history`

                }
            }
        }

    });
}

let dayChartObj;
dayChartObj = null;

function plot_sensor_data(data) {
    if (dayChartObj !== null) {
        dayChartObj.destroy();
    }
    let dates = data.map(function (entry) {
        let timestamp = entry.timestamp * 1000; // Convert Unix epoch to milliseconds
        return new Date(timestamp);
    });

    let datasets = [];
    let sensorKeys = Object.keys(data[0]).filter(function (key) {
        return key !== 'timestamp' && key !== 'original_timestamp';
    });

    sensorKeys.forEach(function (key) {
        let dataset;
        const values = data.map(function (entry) {
            return entry[key];
        });
        if (key === 'kwh' || key === 'vrms' || key === 'temp' || key === 'noise' || key.startsWith("pred")) { // hide those by default
            dataset = {
                data: values,
                label: key,
                hidden: true
            };
        } else {
            dataset = {
                data: values,
                label: key,
            };
        }

        datasets.push(dataset);

    });

    const ctx = document.getElementById('dayChart').getContext('2d');
    dayChartObj = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            elements: {
                point: {
                    radius: 0 // default to disabled in all datasets
                }
            },

            scales: {
                x: {
                    type: 'time',
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Sensor Data'
                }
            }
        }
    });
}

const buttonGroup = document.querySelector('.btn-group-toggle');

// Add event listener to the parent div
buttonGroup.addEventListener('click', function (event) {
    // Check if the clicked element is a radio button
    if (event.target.classList.contains('btn-check')) {
        // Code to execute when a button is clicked
        fetch_consumptions(event.target.value);
        // Add your custom logic here
    }
});



fetch_consumptions(7);
function dateToISO(date){
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    return `${currentYear}-${currentMonth}-${currentDay}`;
}


const date = new Date();


const datepicker = document.getElementById('date_picker');
datepicker.value = dateToISO(date);
datepicker.dispatchEvent(new Event('change'));

const div_list_appliances_consumptions_list = document.getElementById('Appliances_Consumptions_list');
const button_query_appliances_consumptions = document.getElementById('button_query_appliances_consumptions');
const appliances_consumption_start = document.getElementById('appliances_date_picker_start');
const appliances_consumption_end = document.getElementById('appliances_date_picker_end');


function appliances_consumptions_list(start,end) {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}/dev_id/${DEVICE}/pred_consumption/range/${start}/${end}?summarize=true`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('bearer_token')}`);

    xhr.onloadstart = function () {
        div_list_appliances_consumptions_list.innerHTML = SPINER;
    };

    xhr.onload = function () {

        if (this.status === 200) {
            // console.log(JSON.parse(xhr.responseText).energy_data);
            div_list_appliances_consumptions_list.innerHTML = ""
            let data;
            data = JSON.parse(xhr.responseText)
            console.log(data)

            for(const key in data){
                let key_formatted = key.replaceAll("_", " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                if (key.startsWith('pred'))
                    key_formatted = key_formatted.substring(4);

                let icon = getMaterialIconByContent(key)

                div_list_appliances_consumptions_list.insertAdjacentHTML('beforeend',
                    `<div class="row justify-content-center">
            <div class="col-7">
                <p class="fs-3"><i class="text-secondary">${icon}</i> ${key_formatted}</p>
            </div>
            <div class="col-5">
                <p class="fs-3 green text-nowrap bg-body-tertiary rounded">${Number(data[key]).toFixed(2) + " kWh"}</p>
            </div>
        </div>`)
            }
        }
        else if (this.status === 400){
            div_list_appliances_consumptions_list.innerHTML = JSON.parse(xhr.responseText).message;
        }
    }

    xhr.send();
}

function appliances_consumptions_graph(start,end) {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}/dev_id/${DEVICE}/pred_consumption/range/${start}/${end}?summarize=false`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('bearer_token')}`);

    xhr.onloadstart = function () {
    };

    xhr.onload = function () {

        if (this.status === 200) {
            // console.log(JSON.parse(xhr.responseText).energy_data);
            let data;
            data = JSON.parse(xhr.responseText)
            console.log(data)

            const labels = data.map(item => {
                let key = item.id;
                return key.replaceAll("_", " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
            });

            const keys = Object.keys(data[0].value);
            const datasets = keys.map((key, index) => {
                let key_formatted = key.replaceAll("_", " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                if (key.startsWith('pred'))
                    key_formatted = key_formatted.substring(4);

                return {
                    label: key_formatted,
                    data: data.map(item => item.value[key]),
                    borderWidth: 1,
                    order: index,
                    hidden: key === 'noise' || key === 'real_consumption'
                };
            });

            show_appliances_consumptions_graph(labels, datasets);

        }
    }

    xhr.send();
}
let appliancesChart;
appliancesChart = null;
function show_appliances_consumptions_graph(labels, datasets){
    if (appliancesChart !== null)
        appliancesChart.destroy();

    const datesFormatted = labels.map(function (entry) {
        const date = new Date(entry);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
    });

    var ctx = document.getElementById('appliancesChart').getContext('2d');
    appliancesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datesFormatted,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        // Adjust the font size of the legend items
                        font: {
                            size: 16
                        },padding: 10
                    }
                }
            }
            ,
            indexAxis: 'x',
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    })

}

button_query_appliances_consumptions.addEventListener('click', function () {
    //div_list_appliances_consumptions_list.innerHTML = SPINER;
    if (appliances_consumption_start.value !== '' && appliances_consumption_end.value !== '') {
        appliances_consumptions_graph(appliances_consumption_start.value, appliances_consumption_end.value);
        appliances_consumptions_list(appliances_consumption_start.value, appliances_consumption_end.value);
    }

})

const startDateInput = appliances_consumption_start;
const endDateInput = appliances_consumption_end;

const today = new Date();

// Subtract one day to get yesterday's date
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);


// Set max date for start date input
endDateInput.setAttribute('max', dateToISO(yesterday));

startDateInput.setAttribute('max', dateToISO(yesterday));

// Set min date for end date input
startDateInput.addEventListener('change', function () {
    endDateInput.setAttribute('min', startDateInput.value);
});

// Set min date for start date input
endDateInput.addEventListener('change', function () {
    startDateInput.setAttribute('max', endDateInput.value);
});




