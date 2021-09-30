document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('body').classList.add('script-lojashiper');
    console.log('#iniciando definição de script');
    
    if(document.body.classList.contains('home')){
        window.addEventListener('load', function(){
            document.querySelector('.main-banner').insertAdjacentHTML('afterend', '<section class="collection categores"> <div class="container holder-collection"> <div class="flex -between"> <div class="holder-left flex -vcenter"> <h2 class="theme-title collection-name">Navegue por categorias</h2> </div></div><div class="col_categories" style="width: 100%;flex: 0 1 100%"> <div class="grid_categories" style="flex: 1 1 0%;display: flex;-webkit-box-pack: justify;justify-content: space-between;flex-wrap: wrap"> <div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/produtos-domesticos?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136993da490f.png" alt="Casa"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/saude-e-beleza?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a2c10115c.png" alt="Saúde e Beleza"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/casa-e-cozinha?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/61369d4d6a589.png" alt="Cozinha"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/eletronicos?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a34fab1aa.png" alt="Eletrônicos"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/bebe?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/613a24f5312b2.png" alt="Bebê"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/fitness?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a26006061.png" alt="Fitness"></picture> </div></div></a> </div></div></div></div></section>');
            console.log('#seção de categorias adicionado');
        });
    }
    if(document.body.classList.contains('product')){
        window.addEventListener('load', function(){
            /* begin:: Tipos de pagamento */
            document.querySelector('.main-product-prices .show-installments').classList.add('loaded-lojashiper');
            var valor_produto = document.querySelector('.main-product-prices .actual-price').innerText;
            var valor_parcelas = ((parseFloat(valor_produto.split(' ')[1].replace(',','.')) * 1.1979999) / 12).toFixed(2);
            valor_parcelas = '12x de R$ ' + valor_parcelas.replace('.', ',');
            document.querySelector('.main-product-prices .show-installments').insertAdjacentHTML('afterend', '<div id="payment-methods" style="margin-top: 25px;"><div id="card-conditions" style="display: flex;-webkit-box-align: center;align-items: center;margin-top: 0.5rem;margin-bottom: 1rem;padding-bottom: 1rem;border-bottom: 1px solid;border-color: rgb(231, 231, 231);"><i style="display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;-webkit-box-pack: center;-webkit-justify-content: center;-ms-flex-pack: center;justify-content: center;-webkit-align-items: center;-webkit-box-align: center;-ms-flex-align: center;align-items: center;-webkit-transform: rotate(0deg);-ms-transform: rotate(0deg);transform: rotate(0deg);"><svg viewBox="0 0 24 24" title="Cartão" style="display: flex;width: 1.5rem;height: 1.5rem;fill: rgb(139, 139, 139);"><path fill-rule="nonzero" stroke="none" stroke-width="1" d="M 0.94343318,4.4777761 H 23.056567 c 0.515406,0 0.930336,0.4149294 0.930336,0.9303351 V 18.591889 c 0,0.515405 -0.41493,0.930335 -0.930336,0.930335 H 0.94343318 c -0.51540564,0 -0.9303351,-0.41493 -0.9303351,-0.930335 V 5.4081112 c 0,-0.5154057 0.41492946,-0.9303351 0.9303351,-0.9303351 z" fill="#71a7d5" transform="translate(0)"></path><path fill-rule="nonzero" stroke="none" stroke-width="1" d="m 10.33191,14.365842 h 2.354678 c 0.260795,0 0.470749,0.209954 0.470749,0.470749 0,0.260796 -0.209954,0.47075 -0.470749,0.47075 H 10.33191 c -0.260795,0 -0.4707497,-0.209954 -0.4707497,-0.47075 0,-0.260795 0.2099547,-0.470749 0.4707497,-0.470749 z" fill="#ffffff" transform="translate(0)"></path><path fill-rule="nonzero" stroke="none" stroke-width="1" d="m 14.569586,14.365842 h 2.354679 c 0.260795,0 0.470749,0.209954 0.470749,0.470749 0,0.260796 -0.209954,0.47075 -0.470749,0.47075 h -2.354679 c -0.260795,0 -0.470749,-0.209954 -0.470749,-0.47075 0,-0.260795 0.209954,-0.470749 0.470749,-0.470749 z" fill="#ffffff" transform="translate(0)"></path><path fill-rule="nonzero" stroke="none" stroke-width="1" d="m 18.807261,14.365842 h 2.354678 c 0.260795,0 0.47075,0.209954 0.47075,0.470749 0,0.260796 -0.209955,0.47075 -0.47075,0.47075 h -2.354678 c -0.260795,0 -0.470749,-0.209954 -0.470749,-0.47075 0,-0.260795 0.209954,-0.470749 0.470749,-0.470749 z" fill="#ffffff" transform="translate(0)"></path></svg></i><div class="payment--container" style="display: flex;flex-direction: column;margin-left: 1rem;"><span style="font-size: 1rem;line-height: 1.5;color: rgb(87, 87, 87);font-weight: 700;">'+ valor_parcelas +'</span><span style="font-size: 0.75rem;line-height: 1.5;color: rgb(87, 87, 87);"> ou 1x de '+ valor_produto +' à vista no Cartão de Crédito </span></div></div><div id="product-discount" style="display: flex;-webkit-box-align: center;align-items: center;margin-top: 0.5rem;margin-bottom: 1rem;padding-bottom: 0.5rem;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16"><title>Código de Barras</title><g transform="translate(0 -88.816)"><path d="M3.429,88.816H.571A.571.571,0,0,0,0,89.387v2.857a.572.572,0,1,0,1.143,0V89.959H3.429a.572.572,0,0,0,0-1.143Z"></path><path d="M442.286,88.816h-2.857a.571.571,0,1,0,0,1.143h2.286v2.286a.572.572,0,1,0,1.143,0V89.387a.571.571,0,0,0-.572-.571Z" transform="translate(-418.858)"></path><path d="M442.286,350.041a.571.571,0,0,0-.571.571V352.9h-2.286a.571.571,0,1,0,0,1.143h2.857a.571.571,0,0,0,.571-.571v-2.857a.571.571,0,0,0-.571-.574Z" transform="translate(-418.858 -249.227)"></path><path d="M3.429,352.9H1.143v-2.286a.572.572,0,1,0-1.143,0v2.857a.571.571,0,0,0,.571.571H3.429a.572.572,0,0,0,0-1.143Z" transform="translate(0 -249.227)"></path><path d="M450.449,141.562V131.088a.581.581,0,0,0-1.143,0v10.475a.581.581,0,0,0,1.143,0Z" transform="translate(-428.735 -39.51)"></path><path d="M398.938,130.612a.571.571,0,0,0-.571.571v9.867a.571.571,0,1,0,1.143,0v-9.867a.571.571,0,0,0-.572-.571Z" transform="translate(-379.826 -39.51)"></path><path d="M398.938,358.055a.571.571,0,0,0-.571.571v.133a.571.571,0,1,0,1.143,0v-.133a.571.571,0,0,0-.572-.571Z" transform="translate(-379.826 -256.803)"></path><path d="M348,130.612a.571.571,0,0,0-.571.571v9.867a.572.572,0,0,0,1.143,0v-9.867a.571.571,0,0,0-.572-.571Z" transform="translate(-331.259 -39.51)"></path><path d="M348,358.055a.571.571,0,0,0-.571.571v.133a.572.572,0,1,0,1.143,0v-.133a.571.571,0,0,0-.572-.571Z" transform="translate(-331.259 -256.803)"></path><path d="M297.061,130.612a.571.571,0,0,0-.571.571v9.867a.571.571,0,1,0,1.143,0v-9.867a.571.571,0,0,0-.572-.571Z" transform="translate(-282.691 -39.51)"></path><path d="M297.061,358.055a.571.571,0,0,0-.571.571v.133a.571.571,0,1,0,1.143,0v-.133a.571.571,0,0,0-.572-.571Z" transform="translate(-282.691 -256.803)"></path><path d="M246.122,130.612a.571.571,0,0,0-.571.571v9.867a.572.572,0,1,0,1.143,0v-9.867a.571.571,0,0,0-.572-.571Z" transform="translate(-234.123 -39.51)"></path><path d="M246.122,358.055a.571.571,0,0,0-.571.571v.133a.572.572,0,0,0,1.143,0v-.133a.571.571,0,0,0-.572-.571Z" transform="translate(-234.123 -256.803)"></path><path d="M195.183,130.612a.571.571,0,0,0-.571.571v9.867a.572.572,0,1,0,1.143,0v-9.867a.571.571,0,0,0-.572-.571Z" transform="translate(-185.554 -39.51)"></path><path d="M195.183,358.055a.571.571,0,0,0-.571.571v.133a.572.572,0,0,0,1.143,0v-.133a.571.571,0,0,0-.572-.571Z" transform="translate(-185.554 -256.803)"></path><path d="M144.244,130.612a.571.571,0,0,0-.571.571v9.867a.572.572,0,0,0,1.143,0v-9.867a.571.571,0,0,0-.572-.571Z" transform="translate(-136.986 -39.51)"></path><path d="M144.244,358.055a.571.571,0,0,0-.571.571v.133a.572.572,0,1,0,1.143,0v-.133a.571.571,0,0,0-.572-.571Z" transform="translate(-136.986 -256.803)"></path><path d="M93.306,130.612a.571.571,0,0,0-.571.571v9.867a.571.571,0,1,0,1.143,0v-9.867a.571.571,0,0,0-.572-.571Z" transform="translate(-88.419 -39.51)"></path><path d="M93.306,358.055a.571.571,0,0,0-.571.571v.133a.571.571,0,1,0,1.143,0v-.133a.571.571,0,0,0-.572-.571Z" transform="translate(-88.419 -256.803)"></path><path d="M42.939,141.562V131.088a.581.581,0,0,0-1.143,0v10.475a.581.581,0,0,0,1.143,0Z" transform="translate(-39.51 -39.51)"></path></g></svg><div class="payment--container" style="display: flex;flex-direction: column;margin-left: 1rem;"><span style="font-size: 1rem;line-height: 1.5;color: rgb(87, 87, 87);font-weight: 700;">'+ valor_produto +'</span><span style="font-size: 0.75rem;line-height: 1.5;color: rgb(87, 87, 87);">1x no Cartão, Pix ou Boleto Bancário.</span></div></div></div>');
            console.log('#tipos de pagamento adicionado');
            /* end:: Tipos de pagamento */
            
            /* begin:: Envia evento de adição ao carrinho */
            document.querySelector('.main-product-buy-button-holder button').addEventListener('click', function(){
                if(document.getElementsByClassName('error').length == 0){
                    fbq('track', 'AddToCart', {
                        content_ids: [google_tag_params.ecomm_prodid.toString()],
                        content_type: 'product',
                        value: parseFloat(document.querySelector('.main-product-prices .actual-price').innerText.split(' ')[1].replace(',','.')).toFixed(2),
                        currency: 'BRL' 
                    });
                }
            });
            console.log('#evento addtocart fbq adicionado');
            /* end:: Envia evento de adição ao carrinho */
          
            /* begin:: Retirada grátis */
            document.querySelector('.main-product-buy-button-holder').insertAdjacentHTML('afterend', '<button id="button-retira-gratis" class="loader-button btn btn-primary" style=" width: 100%; background-color: var(--color-general-primary); border-color: var(--color-general-primary);">Retira Grátis <svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg></button>');
            console.log('#botão de retirada grátis adicionado');

            document.querySelector('#button-retira-gratis').insertAdjacentHTML('afterend', '<div class="modal-background retira-gratis"><div id="modal-retira-gratis" class="modal"><div class="flex -between"><div class="modal-header"><div class="theme-title">Retira Grátis</div> <div class="-subtitle">Digite o seu cep abaixo para verificarmos o lugar ideal para você retirar o seu pedido.</div></div> <div class="close-modal"><i class="icon icon-close-modal"></i></div></div> <div class="modal-content"> <div id="retira-gratis-zipcode"><div class="-holder relative"><input type="tel" name="zipcode" placeholder="Ex.: 00000-000" class=""> <button disabled="disabled" class="loader-button btn btn-secundary -small" style="position: absolute;right: 5px;top: 5px;">Verificar<svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg></button></div><div class="disclaimer" style="display: none; font-size: 12px; color: var(--black-light); margin-top: 16px; line-height: 17px;"></div></div> </div></div></div>');
            console.log('#modal de retirada grátis adicionado');
            
            document.querySelector('#button-retira-gratis').onclick = function() {
                document.querySelector('#modal-retira-gratis').parentNode.classList.add('active');
            };
            document.querySelector('#modal-retira-gratis .close-modal').onclick = function() {
                document.querySelector('#modal-retira-gratis').parentNode.classList.remove('active');
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
            
            /* begin:: Informação do vendedor */
            document.querySelector('#button-retira-gratis').insertAdjacentHTML('afterend', '<p class="prod-current-seller" id="sold-by">Vendido e entregue por <span class="text-primary">Lojas Hiper</span></p>');
            console.log('#informação do vendedor adicionado');
            /* end:: Informação do vendedor */
            
            /* begin:: Mensagem de frete */
            document.querySelector('.main-product-shipping').classList.add('lojashiper');
            document.querySelector('.main-product-shipping.lojashiper label').insertAdjacentHTML('beforebegin', '<div class="product-info-shipping"> <figure aria-hidden="true" class="product-info-shipping-figure"> <svg xmlns="http://www.w3.org/2000/svg" class="product-info-shipping-icon" width="18" height="15" viewBox="0 0 18 15"><path fill-rule="nonzero" d="M7.763 12.207a2.398 2.398 0 0 1-4.726 0H1.8a1.8 1.8 0 0 1-1.8-1.8V2.195a1.8 1.8 0 0 1 1.8-1.8h8.445a1.8 1.8 0 0 1 1.8 1.8v.568l3.322.035L18 6.821v5.386h-2.394a2.398 2.398 0 0 1-4.727 0H7.763zm-.1-1.2h3.182V2.195a.6.6 0 0 0-.6-.6H1.8a.6.6 0 0 0-.6.6v8.212a.6.6 0 0 0 .6.6h1.337a2.399 2.399 0 0 1 4.526 0zm7.843 0H16.8V7.179l-2.086-3.187-2.669-.029v5.76a2.399 2.399 0 0 1 3.461 1.284zm-2.263 1.99a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396zm-7.843 0a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396z"></path></svg> </figure> <div class="product-info-shipping-body"> <p class="product-info-shipping-title">Envio para todo o país</p> <p class="product-info-shipping-text">Calcule o frete para seu endereço</p> </div> </div>');
            console.log('#mensagem de frete adicionado');
            /* end:: Mensagem de frete */
            
            /* begin:: Mensagem de segurança e garantia */
            document.querySelector('.main-product-shipping.lojashiper').insertAdjacentHTML('afterend', '<ul class="ui-pdp-benefits" style="margin-top: 25px;"><li style="margin-bottom: 16px;"><div style="display: -webkit-flex;display: flex;-webkit-align-items: flex-start;align-items: flex-start;color: var(--black-medium);"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" style="width: 20px;height: 16px;margin: 0 8px 0 0;margin-top: 1px;fill: #248430;"> <defs><style>.b7040e92-7d62-4793-83e5-569766fe51db{fill:#248430;stroke:#248430;stroke-miterlimit:10;stroke-width:0.75px}</style></defs><path class="b7040e92-7d62-4793-83e5-569766fe51db" d="M8.4,11.6H5.8a1.9,1.9,0,0,1-2.3,1.3,1.9,1.9,0,0,1-1.3-2.3l.2-.5H1.3V9.2H4a1.8,1.8,0,0,1,1.8,1.4H8.4A2,2,0,0,1,9.8,9.3l1.8-4.7a.4.4,0,0,0-.3-.6H4V3.1h7.2a1.3,1.3,0,0,1,1.3,1.3.9.9,0,0,1-.1.5h1.3l1,3.1-1.5,3.6H12a1.9,1.9,0,0,1-2.3,1.3A2.1,2.1,0,0,1,8.4,11.6Zm3.6-.9h.6L13.8,8,13,5.8h-.9L10.7,9.3A2,2,0,0,1,12,10.7ZM5.7,4.9v.9H1.3V4.9ZM4,6.7v.9H2.2V6.7ZM4,12a.9.9,0,0,0,0-1.8H4A.9.9,0,0,0,4,12Zm6.2,0a.9.9,0,0,0,0-1.8h0a.9.9,0,0,0,0,1.8Z" transform="translate(-0.9 -2.7)"></path> </svg><div style="margin-bottom: 2px;line-height: 1.3;font-weight: 400;font-size: 13px;"><p><span style="display: inline;font-weight: 500;color: #298e36;">Código de rastreio</span> enviado via e-mail em até 7 dias.</p></div></div></li><li style="margin-bottom: 16px;"><div style="display: -webkit-flex;display: flex;-webkit-align-items: flex-start;align-items: flex-start;color: var(--black-medium);"> <svg class="ui-pdp-icon ui-pdp-icon--return ui-pdp-color--GRAY" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" style="width: 19px;height: 12.5px;margin: 0 8px 0 0;margin-top: 1px;fill: #248430;"> <defs><style>.b3af21d8-768b-4f95-980d-3efefd63cdb6{fill:#248430;stroke:#248430;stroke-miterlimit:10}</style></defs><path class="b3af21d8-768b-4f95-980d-3efefd63cdb6" d="M3.6,9.1h7.2a2.7,2.7,0,0,0,0-5.4H8.1V2.5h2.7a3.8,3.8,0,0,1,3.9,3.9,3.9,3.9,0,0,1-3.9,3.9H3.6l2.5,2.4-.9.8L1.3,9.7,5.2,5.8l.9.9L3.6,9.1Z" transform="translate(-0.6 -2)"></path> </svg><div style="-webkit-flex: 1 1 0%;flex: 1 1 0%;"><div style="margin-bottom: 2px;line-height: 1.3;font-weight: 400;font-size: 13px;"><div style="display: inline;font-weight: 500;color: #298e36;"> <span>Trocas e Devoluções</span></div>, em até 7 dias a partir da data de recebimento.</div></div></div></li><li style="margin-bottom: 16px;"><div style="display: -webkit-flex;display: flex;-webkit-align-items: flex-start;align-items: flex-start;color: var(--black-medium);"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" style="width: 16px;height: 16px;margin: 0 10px 0 0;margin-top: 1px;fill: #248430;"> <defs><style>.b306b133-4171-4324-a7a6-35edefba34cf{fill:#248430}.ee141ce0-902f-4815-8c10-0060f9589c50{fill:#fff}</style></defs><path class="b306b133-4171-4324-a7a6-35edefba34cf" d="M1.3,4.3V3.7h.6A8.9,8.9,0,0,0,7.6,1.3L8,1l.4.3a8.9,8.9,0,0,0,5.7,2.4h.6v.6c0,5.6-2.2,9.2-6.5,10.7H7.8C3.5,13.5,1.3,9.9,1.3,4.3Z" transform="translate(-1.3 -1)"></path><polygon class="ee141ce0-902f-4815-8c10-0060f9589c50" points="5.8 8 8.9 4.4 9.8 5.2 5.8 9.8 3.4 7.4 4.2 6.5 5.8 8"></polygon> </svg><div style="-webkit-flex: 1 1 0%;flex: 1 1 0%;"><p style="margin-bottom: 2px;line-height: 1.3;font-weight: 400;font-size: 13px;"> <span style="display: inline;font-weight: 500;color: #298e36;">Compra Segura</span>, receba o produto que está esperando ou devolvemos o dinheiro.</p></div></div></li><li><div style="display: -webkit-flex;display: flex;-webkit-align-items: flex-start;align-items: flex-start;color: var(--black-medium);"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" style="width: 16px;height: 16px;margin: 0 10px 0 0;margin-top: 1px;fill: #248430;"> <defs><style>.b90f2152-5460-4a3a-8d05-82ab56bde19e{fill:#248430;stroke:#248430;stroke-miterlimit:10;stroke-width:0.75px}</style></defs><path class="b90f2152-5460-4a3a-8d05-82ab56bde19e" d="M7.4,11.5,5.7,14.8,4.5,12.4H2.1L3.8,9.2a5.2,5.2,0,0,1,8.7-5.7,5.3,5.3,0,0,1-.2,5.9l1.6,3H11.5l-1.2,2.4L8.6,11.5Zm-1-.2a6.3,6.3,0,0,1-2-1.3l-.6,1.4H5.1l.6,1.2Zm3.2,0,.7,1.3.6-1.2h1.3l-.6-1.2a4.3,4.3,0,0,1-2,1.1Zm-1.5-.9a4,4,0,0,0,4-4,3.9,3.9,0,0,0-4-4,3.9,3.9,0,0,0-4,4A4,4,0,0,0,8.1,10.4Z" transform="translate(-1.5 -0.8)"></path> </svg><div style="margin-bottom: 2px;line-height: 1.3;font-weight: 400;font-size: 13px;"><p><span style="display: inline;font-weight: 500;color: #298e36;">30 dias de garantia</span> diretamente em nossa loja.</p></div></div></li></ul>');
            console.log('#mensagem de segurança e garantia adicionado');
            /* end:: Mensagem de segurança e garantia */
            
            /* begin:: Valor do desconto */
            if(document.querySelector('.product .old-price')){
                var valor_produto_antigo = document.querySelector('.product .old-price').innerText;
                var valor_produto_float_antigo = parseFloat(valor_produto_antigo.split(' ')[1].replace(',','.'));
                var valor_produto = document.querySelector('.product .actual-price').innerText;
                var valor_produto_float = parseFloat(valor_produto.split(' ')[1].replace(',','.'));
                var valor_desconto = (valor_produto_float_antigo - valor_produto_float).toFixed(2).replace('.', ',');
                document.querySelector('.main-product-prices .show-installments').insertAdjacentHTML('beforebegin', '<div style="display: block;-webkit-box-align: center;align-items: center;padding: 6px 16px;font-size: 0.875rem;border: none;min-height: 1.5rem;max-width: fit-content;min-width: 1.5rem;font-weight: bold;color: rgb(255, 255, 255);margin-top: 15px;background: rgb(59 181 74);border-radius: 4px;"><span><span>ECONOMIA DE </span><span class="economy-price" style="color: var(--color-general-secundary);">R$&nbsp;'+ valor_desconto +'</span></span></div>');
                console.log('#valor do desconto adicionado');
            }
            /* end:: Valor do desconto */
            
            /* begin:: Avaliações no produto */
            var total_avaliacoes = document.querySelector('.holder-product-reviews-title .-quantity').innerText;
            if(parseInt(total_avaliacoes) > 0){
                if(parseInt(total_avaliacoes) == 1){
                    document.querySelector('h1.main-product-name').insertAdjacentHTML('afterend', '<div class="-rating"><i class="icon icon-star-gold"></i><i class="icon icon-star-gold"></i><i class="icon icon-star-gold"></i><i class="icon icon-star-gold"></i><i class="icon icon-star-gold"></i><p style="display: inline-block;margin-left: 10px;margin-top: 10px;margin-bottom: 2px;color: #717171;">'+ total_avaliacoes +' Avaliação</p></div>'); 
                }else{
                    document.querySelector('h1.main-product-name').insertAdjacentHTML('afterend', '<div class="-rating"><i class="icon icon-star-gold"></i><i class="icon icon-star-gold"></i><i class="icon icon-star-gold"></i><i class="icon icon-star-gold"></i><i class="icon icon-star-gold"></i><p style="display: inline-block;margin-left: 10px;margin-top: 10px;margin-bottom: 2px;color: #717171;">'+ total_avaliacoes +' Avaliações</p></div>');
                }
            }else{
                document.querySelector('h1.main-product-name').insertAdjacentHTML('afterend', '<div class="-rating"><i class="icon icon-star-grey"></i><i class="icon icon-star-grey"></i><i class="icon icon-star-grey"></i><i class="icon icon-star-grey"></i><i class="icon icon-star-grey"></i><p style="display: inline-block;margin-left: 10px;margin-top: 10px;margin-bottom: 2px;color: #717171;">0 Avaliações</p></div>');
            }
            console.log('#avaliações do produto adicionado');
            /* end:: Avaliações no produto */
            
            /* begin:: Estimativa de entrega */
            function convertDate(e){var t, o=new Date(e);return[(t=o.getDate(),t<10?"0"+t:t)].join("/");}
            function getMesExtenso(e){var t=new Array(12);return t[0]="janeiro",t[1]="fevereiro",t[2]="março",t[3]="abril",t[4]="maio",t[5]="junho",t[6]="julho",t[7]="agosto",t[8]="setembro",t[9]="outubro",t[10]="novembro",t[11]="dezembro",t[e];}

            var t = new Date, o=t.setDate(t.getDate()+4), n=t.setDate(t.getDate()+2), r=getMesExtenso(t.getMonth());
            if(convertDate(o)>convertDate(n)){
                var a = "<strong>"+ convertDate(n) +"</strong> e <strong>"+ convertDate(o) +" de "+ r +"</strong>";
            }else{
                if(null==(s=getMesExtenso(t.getMonth()+1))) var s=getMesExtenso(t.getMonth()-11);
                a = "<strong>"+convertDate(n)+" de "+ r +"</strong> e <strong>"+ convertDate(o) +" de "+ s +"</strong>";
            }
            document.querySelector("#modal-zipcode .disclaimer").innerHTML = "Entrega estimada entre "+ a +", a depender do frete escolhido.";
            console.log('#estimativa de entrega adicionado');
            /* end:: Estimativa de entrega */
          
            document.querySelector('section.product-reviews').insertAdjacentHTML('afterend', '<div data-fera-container="442151" data-product_id="6886111346881"></div>');
            console.log('#div ryviu adicionado');
          
            (function() {
              function asyncLoad() {
                var urls = ["\/\/cdn.fera.ai\/js\/fera.placeholder.js?shop=lojas-hiper-brasil.myshopify.com"];
                for (var i = 0; i < urls.length; i++) {
                  var s = document.createElement('script');
                  s.type = 'text/javascript';
                  s.async = true;
                  s.src = urls[i];
                  var x = document.getElementsByTagName('script')[0];
                  x.parentNode.insertBefore(s, x);
                }
              };
              if(window.attachEvent) {
                window.attachEvent('onload', asyncLoad);
              } else {
                window.addEventListener('load', asyncLoad, false);
              }
          })();
          console.log('#script fera adicionado');
        });
    }
});
