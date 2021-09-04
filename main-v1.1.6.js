document.addEventListener("DOMContentLoaded", function() {
    if(document.body.classList.contains('product')){
        /*Adiciona botão de retirada grátis*/
        window.addEventListener('load', function(){
            document.getElementsByClassName('main-product-buy-button-holder')[0].insertAdjacentHTML('afterend', '<button class="loader-button btn btn-primary" style=" width: 100%; background-color: var(--color-general-primary); border-color: var(--color-general-primary);">Retira Grátis <svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg></button>');
            console.log('#botão de retirada grátis adicionado');
        });
    }
});
