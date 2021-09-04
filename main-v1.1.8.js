document.addEventListener("DOMContentLoaded", function() {
    if(document.body.classList.contains('product')){
        /* Retirada grátis */
        window.addEventListener('load', function(){
            document.querySelector('.main-product-buy-button-holder').insertAdjacentHTML('afterend', '<button id="button-retira-gratis" class="loader-button btn btn-primary" style=" width: 100%; background-color: var(--color-general-primary); border-color: var(--color-general-primary);">Retira Grátis <svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg></button>');
            console.log('#botão de retirada grátis adicionado');

            document.querySelector('#button-retira-gratis').insertAdjacentHTML('afterend', '<div class="modal-background"><div id="modal-retira-gratis" class="modal"><div class="flex -between"><div class="modal-header"><div class="theme-title">Retira Grátis</div> <div class="-subtitle"> Para o cep <span class="selected-retira-gratis"></span> <span class="-divisor"> | </span> <span class="selected-city"> - </span></div></div> <div class="close-modal"><i class="icon icon-close-modal"></i></div></div> <div class="modal-content"> <table class="table"><tr><th>Tipo</th> <th>Prazo</th> <th>Valor</th></tr> </table> <div class="disclaimer"> Prazo de entrega a partir da aprovação de pagamento <span class="display-hibrid">e envio ao operador logístico.</span></div></div></div></div></div>');
            console.log('#modal de retirada grátis adicionado');
            
            document.querySelector('#button-retira-gratis').onclick = function() {
                document.querySelector('#modal-retira-gratis').parentNode.classList.add("active");
            };
            document.querySelector('#modal-retira-gratis .close-modal').onclick = function() {
                document.querySelector('#modal-retira-gratis').parentNode.classList.remove("active");
            };
            console.log('#scripts de retirada grátis adicionado');
        });
    }
});
