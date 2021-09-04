document.addEventListener("DOMContentLoaded", function() {
    if(document.body.classList.contains('product')){
        window.addEventListener('load', function(){
            /* begin:: Retirada grátis */
            document.querySelector('.main-product-buy-button-holder').insertAdjacentHTML('afterend', '<button id="button-retira-gratis" class="loader-button btn btn-primary" style=" width: 100%; background-color: var(--color-general-primary); border-color: var(--color-general-primary);">Retira Grátis <svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg></button>');
            console.log('#botão de retirada grátis adicionado');

            document.querySelector('#button-retira-gratis').insertAdjacentHTML('afterend', '<div class="modal-background retira-gratis"><div id="modal-retira-gratis" class="modal"><div class="flex -between"><div class="modal-header"><div class="theme-title">Retira Grátis</div> <div class="-subtitle"> Para o cep <span class="selected-retira-gratis"></span> <span class="-divisor"> | </span> <span class="selected-city"> - </span></div></div> <div class="close-modal"><i class="icon icon-close-modal"></i></div></div> <div class="modal-content"> <table class="table"><tr><th>Tipo</th> <th>Prazo</th> <th>Valor</th></tr> </table> <div class="disclaimer"> Prazo de entrega a partir da aprovação de pagamento <span class="display-hibrid">e envio ao operador logístico.</span></div></div></div></div></div>');
            console.log('#modal de retirada grátis adicionado');
            
            document.querySelector('#button-retira-gratis').onclick = function() {
                document.querySelector('#modal-retira-gratis').parentNode.classList.add("active");
            };
            document.querySelector('#modal-retira-gratis .close-modal').onclick = function() {
                document.querySelector('#modal-retira-gratis').parentNode.classList.remove("active");
            };
            window.onclick = function(event) {
                if(event.target.classList.contains('retira-gratis') && event.target.classList.contains('modal-background') && event.target.classList.contains('active')) event.target.classList.remove("active");
            };
            console.log('#scripts de retirada grátis adicionado');
            /* end:: Retirada grátis */
            
            /* begin:: Mensagem de frete */
            document.querySelector('.main-product-shipping label').insertAdjacentHTML('beforebegin', '<div class="product-info-shipping"> <figure aria-hidden="true" class="product-info-shipping-figure"> <svg xmlns="http://www.w3.org/2000/svg" class="ui-pdp-icon ui-pdp-icon--shipping ui-pdp-icon--truck ui-pdp-color--BLACK" width="18" height="15" viewBox="0 0 18 15"><path fill-rule="nonzero" d="M7.763 12.207a2.398 2.398 0 0 1-4.726 0H1.8a1.8 1.8 0 0 1-1.8-1.8V2.195a1.8 1.8 0 0 1 1.8-1.8h8.445a1.8 1.8 0 0 1 1.8 1.8v.568l3.322.035L18 6.821v5.386h-2.394a2.398 2.398 0 0 1-4.727 0H7.763zm-.1-1.2h3.182V2.195a.6.6 0 0 0-.6-.6H1.8a.6.6 0 0 0-.6.6v8.212a.6.6 0 0 0 .6.6h1.337a2.399 2.399 0 0 1 4.526 0zm7.843 0H16.8V7.179l-2.086-3.187-2.669-.029v5.76a2.399 2.399 0 0 1 3.461 1.284zm-2.263 1.99a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396zm-7.843 0a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396z"></path></svg> </figure> <div class="product-info-shipping-body"> <p class="product-info-shipping-title">Envio para todo o país</p> <p class="product-info-shipping-text">Saiba os prazos de entrega e as formas de envio.</p> </div> </div>');
            console.log('#mensagem de frete adicionado');
            /* end:: Mensagem de frete */
        });
    }
});
