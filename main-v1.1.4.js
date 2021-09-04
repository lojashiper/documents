document.addEventListener("DOMContentLoaded", function() {
    if(document.body.classList.contains('product')){
        document.querySelector('#app').addEventListener('load', function(){
            console.log('segundo teste');
            document.getElementsByClassName('main-product-buy-button-holder')[0].insertAdjacentHTML('afterend', '<button class="loader-button btn btn-primary">Retira Grátis <svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg></button>');
        });
    }
});
