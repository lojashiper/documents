document.addEventListener("DOMContentLoaded", function() {
    if(document.body.classList.contains('home')){
        window.addEventListener('load', function(){
            document.querySelector('.main-banner').insertAdjacentHTML('afterend', '<section class="collection categores"> <div class="container holder-collection"> <div class="flex -between"> <div class="holder-left flex -vcenter"> <h2 class="theme-title collection-name">Navegue por categorias</h2> </div></div><div class="col_categories" style="width: 100%;flex: 0 1 100%"> <div class="grid_categories" style="flex: 1 1 0%;display: flex;-webkit-box-pack: justify;justify-content: space-between;flex-wrap: wrap"> <div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/produtos-domesticos?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136993da490f.png" alt="Casa"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/saude-e-beleza?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a2c10115c.png" alt="Saúde e Beleza"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/casa-e-cozinha?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/61369d4d6a589.png" alt="Cozinha"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/eletronicos?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a34fab1aa.png" alt="Eletrônicos"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/bebe?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/613a24f5312b2.png" alt="Bebê"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/fitness?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a26006061.png" alt="Fitness"></picture> </div></div></a> </div></div></div></div></section>');
            console.log('#seção de categorias adicionado');
        });
    }
    if(document.body.classList.contains('product')){
        window.addEventListener('load', function(){
            /* begin:: Adiciona botões de ver carrinho e finalizar compra */
            var store_token = document.querySelector('.mini-cart-holder a').href.split("?")[1];
            document.querySelector('#modal-cart-confirm .description').insertAdjacentHTML('afterend', '<a href="https://seguro.lojashiper.com/cart?'+ store_token +'" class="btn btn-primary flex -vcenter" style="background-color: #fff;margin-bottom: 3px;color: #191919;display: block;font-weight: 400;border-color: #86868680;border-width: 1px;margin: 0px 15px 5px 15px;">Ver carrinho</a> <a href="https://seguro.lojashiper.com/checkout?skipToCheckout=1&'+ store_token +'" class="btn btn-primary flex -vcenter" style="display: block;margin: 0px 15px;"><svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.1081 5.63865H9.83601V4.36532C9.83601 2.01021 7.96708 0.0428572 5.63113 0.000860586C5.5673 -0.000286862 5.43977 -0.000286862 5.37597 0.000860586C3.03996 0.0428572 1.17106 2.01021 1.17106 4.36532V5.63865H0.89897C0.479692 5.63865 0.137695 6.07129 0.137695 6.60563V12.9921C0.137695 13.5258 0.479692 13.9625 0.898998 13.9625H10.1081C10.5273 13.9625 10.8694 13.5258 10.8694 12.9921V6.60563C10.8694 6.07132 10.5274 5.63865 10.1081 5.63865ZM6.36631 9.79239V11.7221C6.36631 11.9431 6.18132 12.1301 5.96017 12.1301H5.04698C4.82581 12.1301 4.64081 11.9431 4.64081 11.7221V9.79239C4.42632 9.58126 4.30145 9.28932 4.30145 8.96637C4.30145 8.35438 4.77452 7.82851 5.37601 7.80421C5.43975 7.80163 5.56743 7.80163 5.63117 7.80421C6.23266 7.82851 6.70573 8.35438 6.70573 8.96637C6.70567 9.28932 6.5808 9.58126 6.36631 9.79239ZM5.6311 5.6387H8.04281H8.04284V4.36537C8.04284 2.96247 6.90268 1.80249 5.50351 1.80249C4.10434 1.80249 2.96423 2.96247 2.96423 4.36537V5.6387H5.37594H5.6311Z"></path></svg> Finalizar compra</a>');
            console.log('#botões de ver carrinho e flinalizar compra adicionados');
            /* end:: Adiciona botões de ver carrinho e finalizar compra */
            
            /* begin:: Retirada grátis */
            document.querySelector('.main-product-buy-button-holder').insertAdjacentHTML('afterend', '<button id="button-retira-gratis" class="loader-button btn btn-primary" style=" width: 100%; background-color: var(--color-general-primary); border-color: var(--color-general-primary);">Retira Grátis <svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg></button>');
            console.log('#botão de retirada grátis adicionado');

            document.querySelector('#button-retira-gratis').insertAdjacentHTML('afterend', '<div class="modal-background retira-gratis"><div id="modal-retira-gratis" class="modal"><div class="flex -between"><div class="modal-header"><div class="theme-title">Retira Grátis</div> <div class="-subtitle">Digite o seu cep abaixo para verificarmos o lugar ideal para você retirar o seu pedido.</div></div> <div class="close-modal"><i class="icon icon-close-modal"></i></div></div> <div class="modal-content"> <div id="retira-gratis-zipcode"><div class="-holder relative"><input type="tel" name="zipcode" placeholder="Ex.: 00000-000" class=""> <button disabled="disabled" class="loader-button btn btn-secundary -small" style="position: absolute;right: 5px;top: 5px;">Verificar<svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg></button></div><div class="disclaimer" style="display: none; font-size: 12px; color: var(--black-light); margin-top: 16px; line-height: 17px;"></div></div> </div></div></div>');
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