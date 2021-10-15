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
            
            /* begin:: Informações do frete */
            document.querySelector('.main-product-info .main-product-buy-button-holder').insertAdjacentHTML('beforebegin', '<div class="shipping-preview-line" style="position: relative;height: fit-content;margin-bottom: 20px;"> <div style="margin-top: 3px;display: flex;position: absolute;width: fit-content;"> <svg xmlns="http://www.w3.org/2000/svg" class="product-info-shipping-icon" width="18" height="15" viewBox="0 0 18 15" style="width: 19px;height: 16px;"><path fill-rule="nonzero" d="M7.763 12.207a2.398 2.398 0 0 1-4.726 0H1.8a1.8 1.8 0 0 1-1.8-1.8V2.195a1.8 1.8 0 0 1 1.8-1.8h8.445a1.8 1.8 0 0 1 1.8 1.8v.568l3.322.035L18 6.821v5.386h-2.394a2.398 2.398 0 0 1-4.727 0H7.763zm-.1-1.2h3.182V2.195a.6.6 0 0 0-.6-.6H1.8a.6.6 0 0 0-.6.6v8.212a.6.6 0 0 0 .6.6h1.337a2.399 2.399 0 0 1 4.526 0zm7.843 0H16.8V7.179l-2.086-3.187-2.669-.029v5.76a2.399 2.399 0 0 1 3.461 1.284zm-2.263 1.99a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396zm-7.843 0a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396z"></path></svg> </div><p class="shipping-preview-loading" style="padding: 0px 0px 0px 35px;margin: -15px 0px 30px;display: none;text-align: left !important;color: rgb(74, 74, 74) !important;font-size: 13px !important;">Carregando, aguarde...</p><p style="text-align: left !important;color: #4a4a4a !important;padding: 0 0 0 35px;font-size: 13px !important;margin: -15px 0 0 0;" class="custom-address"></p><p style="margin:-0.5px;text-align: left !important;color: #4a4a4a !important;padding: 0 0 0 35px;font-size: 13px !important;" class="shipping-estimated"></p></div>');
            console.log('#informação do vendedor adicionado');
            /* end:: Informações do frete */
            
            /* begin:: Informação do vendedor */
            document.querySelector('.main-product-info .main-product-buy-button-holder').insertAdjacentHTML('afterend', '<p class="prod-current-seller" id="sold-by">Vendido e entregue por <span class="text-primary">Lojas Hiper</span></p>');
            console.log('#informação do vendedor adicionado');
            /* end:: Informação do vendedor */

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
            
            /* begin:: Avaliações do produto */           
            document.querySelector('section.collection').insertAdjacentHTML('beforebegin', '<div class="holder-collection container" style="margin-top: 40px"><div class="flex -between"><div class="holder-left flex -vcenter"><h2 class="theme-title collection-name">Avaliações do produto</h2></div></div></div> <div class="lt-block-reviews" style="min-height: 40px"> <ryviu-widget handle="'+ window.location.pathname.split('/')[1] +'" style="display: inline-block;"></ryviu-widget> </ryviu-widget></div>');
            console.log('#div ryviu adicionado');
            
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:2609700,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t;
              a.appendChild(r);
            })(window,document,'//cdn.ryviu.com/v/static/js/app.js?shop=lojashiper.com','');
            console.log('#script ryviu adicionado');
            /* end:: Avaliações do produto */
            
            /* begin:: Gatilho de número de compras */
            if(document.querySelector('.main-product-info .holder-flags .flag')){
                document.querySelector('h1.main-product-name').insertAdjacentHTML('afterend', '<style type="text/css">@-webkit-keyframes fade-in{0%{opacity:0;height: 0px}100%{opacity:1;height: auto}}@keyframes fade-in{0%{opacity:0;height: 0px}100%{opacity:1;height: auto}}</style> <div style="display: block;visibility: visible;position: relative;height: auto;-webkit-animation:fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) 5s both;animation:fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) 5s both"><div><div style="background-color: rgb(255, 255, 255) !important; background-image: none !important; background-size: 100% 100% !important; border-width: 0px !important; border-style: none !important; border-color: rgb(0, 0, 0) !important; border-radius: 0px !important; position: relative; display: inline-block;padding-top:15px;width: 100%;"><div style="align-items: stretch;display: flex;position: relative;"><div><div style="background-color: rgb(255, 255, 255) !important;align-content: center;align-items: center;align-self: stretch;display: flex;height: 100%;justify-content: center;min-height: 40px;min-width: 40px;overflow: hidden;width: inherit;"> <img src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6158b12003fb7.png"style="height: 41px !important;"></div></div><div style="align-self: center;color: #3c3c3c;font-size: 13px;font-style: normal;font-weight: 400;line-height: normal;max-height: 100px;overflow: hidden;padding: 10px 30px 10px 10px;text-align: left;width: 100%;word-wrap: break-word;"><div><div style="white-space: normal;"><span>'+ Math.floor(Math.random() * (14 - 4 + 1) + 4) +'</span>&nbsp;<span style="font-weight: bold;">pessoas</span> compraram este produto nas últimas 24h!</div></div></div><div style="align-items: center;border-style: none !important;display: flex;font-family: sans-serif;font-weight: 100;height: 10px;justify-content: center;line-height: 10px;position: absolute;right: 10px;top: 10px;width: 10px;z-index: 2147483647;"><div onclick="javascript:this.parentNode.parentNode.parentNode.parentNode.parentNode.remove()" style="cursor: pointer;font-size: 20px;text-align: center;width: 28px;"> <span>×</span></div></div></div></div></div></div>');
                console.log('#gatilho de compras adicionado');
            }
            /* end:: Gatilho de número de compras */
        });
    }
});
