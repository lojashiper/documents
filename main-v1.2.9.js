document.addEventListener("DOMContentLoaded", function() {
    if(document.body.classList.contains('home')){
        window.addEventListener('load', function(){
            document.querySelector('.main-banner').insertAdjacentHTML('afterend', '<section class="collection categores"> <div class="container holder-collection"> <div class="flex -between"> <div class="holder-left flex -vcenter"> <h2 class="theme-title collection-name">Navegue por categorias</h2> </div></div><div class="col_categories" style="width: 100%;flex: 0 1 100%"> <div class="grid_categories" style="flex: 1 1 0%;display: flex;-webkit-box-pack: justify;justify-content: space-between;flex-wrap: wrap"> <div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/produtos-domesticos?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="https://images.yampi.me/assets/stores/lojashiper/uploads/banners/6136993da490f.png" alt="Casa"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/saude-e-beleza?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="https://images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a2c10115c.png" alt="Saúde e Beleza"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/casa-e-cozinha?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="https://images.yampi.me/assets/stores/lojashiper/uploads/banners/61369d4d6a589.png" alt="Cozinha"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/eletronicos?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="https://images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a34fab1aa.png" alt="Eletrônicos"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/bebe?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="https://images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a17263bcb.png" alt="Bebê"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/fitness?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="https://images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a26006061.png" alt="Fitness"></picture> </div></div></a> </div></div></div></div></section>');
            console.log('#seção de categorias adicionado');
        });
    }
    if(document.body.classList.contains('product')){
        window.addEventListener('load', function(){
            /* begin:: Retirada grátis */
            document.querySelector('.main-product-buy-button-holder').insertAdjacentHTML('afterend', '<button id="button-retira-gratis" class="loader-button btn btn-primary" style=" width: 100%; background-color: var(--color-general-primary); border-color: var(--color-general-primary);">Retira Grátis <svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg></button>');
            console.log('#botão de retirada grátis adicionado');

            document.querySelector('#button-retira-gratis').insertAdjacentHTML('afterend', '<div class="modal-background retira-gratis"><div id="modal-retira-gratis" class="modal"><div class="flex -between"><div class="modal-header"><div class="theme-title">Retira Grátis</div> <div class="-subtitle">Digite o seu CEP abaixo para verificarmos o lugar ideal para você retirar o seu pedido.</div></div> <div class="close-modal"><i class="icon icon-close-modal"></i></div></div> <div class="modal-content"> <div id="retira-gratis-zipcode"><div class="-holder relative"><input type="tel" name="zipcode" placeholder="Ex.: 00000-000" class=""> <button disabled="disabled" class="loader-button btn btn-secundary -small" style="position: absolute;right: 5px;top: 5px;">Verificar<svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg></button></div><div class="disclaimer" style="display: none; font-size: 12px; color: var(--black-light); margin-top: 16px; line-height: 17px;"></div></div> </div></div></div>');
            console.log('#modal de retirada grátis adicionado');
            
            document.querySelector('#button-retira-gratis').insertAdjacentHTML('afterend', '<p class="prod-current-seller" id="sold-by">Vendido por <span class="text-primary">Lojas Hiper</span></p>');
            console.log('#informação do vendedor adicionado');
            
            document.querySelector('#button-retira-gratis').onclick = function() {
                document.querySelector('#modal-retira-gratis').parentNode.classList.add("active");
            };
            document.querySelector('#modal-retira-gratis .close-modal').onclick = function() {
                document.querySelector('#modal-retira-gratis').parentNode.classList.remove("active");
            };
            window.onclick = function(event) {
                if(event.target.classList.contains('retira-gratis') && event.target.classList.contains('modal-background') && event.target.classList.contains('active')) event.target.classList.remove("active");
            };
            document.querySelector('#modal-retira-gratis input[name="zipcode"]').onkeyup = function(){
                if(this.value.length <= 9){
                    var v = this.value.replace(/\D/g,"");
                    v = v.replace(/^(\d{5})(\d)/,"$1-$2");
                    this.value = v;
                    if(/^[0-9]{5}-[0-9]{3}$/.test(v)) document.querySelector('#modal-retira-gratis button').removeAttribute('disabled');
                    else{
                        if(!document.querySelector('#modal-retira-gratis button').hasAttribute('disabled')) document.querySelector('#modal-retira-gratis button').setAttribute('disabled','');
                        document.querySelector('#modal-retira-gratis .disclaimer').style.display = 'none';
                    }
                }else this.value = this.value.slice(0, this.maxLength);
            };
            document.querySelector('#modal-retira-gratis button').onclick = function(){
                document.querySelector('#modal-retira-gratis button').classList.add('sending');
                setTimeout(function(){
                    document.querySelector('#modal-retira-gratis button').classList.remove('sending');
                    document.querySelector('#modal-retira-gratis .disclaimer').innerHTML = 'Desculpe! Não encontramos nenhum Ponto de Retirada próximo ao cep informado. <span style="font-weight: 600;margin-top: 5px;display: block;">Mas, não se preocupe, você poderá receber seu pedido em casa. Consulte o frete.</span>';
                    document.querySelector('#modal-retira-gratis .disclaimer').style.display = 'block';
                },3000);
            };
            console.log('#scripts de retirada grátis adicionado');
            /* end:: Retirada grátis */
            
            /* begin:: Mensagem de frete */
            document.querySelector('.main-product-shipping label').insertAdjacentHTML('beforebegin', '<div class="product-info-shipping"> <figure aria-hidden="true" class="product-info-shipping-figure"> <svg xmlns="http://www.w3.org/2000/svg" class="product-info-shipping-icon" width="18" height="15" viewBox="0 0 18 15"><path fill-rule="nonzero" d="M7.763 12.207a2.398 2.398 0 0 1-4.726 0H1.8a1.8 1.8 0 0 1-1.8-1.8V2.195a1.8 1.8 0 0 1 1.8-1.8h8.445a1.8 1.8 0 0 1 1.8 1.8v.568l3.322.035L18 6.821v5.386h-2.394a2.398 2.398 0 0 1-4.727 0H7.763zm-.1-1.2h3.182V2.195a.6.6 0 0 0-.6-.6H1.8a.6.6 0 0 0-.6.6v8.212a.6.6 0 0 0 .6.6h1.337a2.399 2.399 0 0 1 4.526 0zm7.843 0H16.8V7.179l-2.086-3.187-2.669-.029v5.76a2.399 2.399 0 0 1 3.461 1.284zm-2.263 1.99a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396zm-7.843 0a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396z"></path></svg> </figure> <div class="product-info-shipping-body"> <p class="product-info-shipping-title">Envio para todo o país</p> <p class="product-info-shipping-text">Calcule o frete e o prazo de entrega</p> </div> </div>');
            console.log('#mensagem de frete adicionado');
            /* end:: Mensagem de frete */
        });
    }
});
