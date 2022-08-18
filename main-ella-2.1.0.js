const checkElement = async selector => {while ( document.querySelector(selector) === null) {await new Promise( resolve =>  requestAnimationFrame(resolve) ) } return document.querySelector(selector); }; 
function convertDate(e){var t, o=new Date(e);return[(t=o.getDate(),t<10?"0"+t:t)].join("/");}
function getMesExtenso(e){var t=new Array(12);return t[0]="janeiro",t[1]="fevereiro",t[2]="março",t[3]="abril",t[4]="maio",t[5]="junho",t[6]="julho",t[7]="agosto",t[8]="setembro",t[9]="outubro",t[10]="novembro",t[11]="dezembro",t[e];}
function getJSON(n,e){var s=new XMLHttpRequest;s.open("GET",n,!0),s.responseType="json",s.onload=function(){var n=s.status;e(200===n?null:n,s.response)},s.send()};

function verifyElement(selects, index){
    setTimeout(function(){
        if(selects[index].length > 1){
            selects[index].selectedIndex = 1;
            selects[index].dispatchEvent(new Event('change'));
        }else verifyElement(selects, index);
    }, 50);
}

function clickButtonSelect(button, index) {
    var target = button.getAttribute('data-target');
    document.querySelectorAll('.selectbtn.target-'+target).forEach(function(option){
        option.classList.remove('selected');
    });
    button.classList.add('selected');

    document.querySelector('.product-customizations div.custom-select select[name="'+ button.getAttribute('data-target') +'"]').value = button.getAttribute('data-value');
    document.querySelector('.product-customizations div.custom-select select[name="'+ button.getAttribute('data-target') +'"]').dispatchEvent(new Event('change'));

    document.querySelectorAll('.product-customizations div.custom-select select').forEach(function(select, i){
        if(i > index) waitElementToReplace(select, i);
    });
}

function ReplaceSelectWithButtons(selectField, index) {
    var selectValue = selectField.value;
    var selectId = selectField.id;

    document.querySelectorAll('.product-customizations div.custom-select div[data-target="'+ selectId +'"]').forEach(function(select){
        select.remove();
    });
    
    var options = selectField.querySelectorAll('option');
    if(selectId.toLowerCase().includes('kit') || selectId.toLowerCase().includes('kits')){
        options.forEach(function(button){
            if(button.value != 0 && button.value){
                var topMessageBadge = '', topDiscountBadge = '', discountMessageBadge = '', oldPriceProduct = '', marginBottom = 'mb-20';
                selectField.parentNode.parentNode.classList.add("sku-selectkit");
                var buttonOrder = window.data.product.data.skus.data.find(element => element.variations.find(element => element.value_id == button.value)).order;
                var priceSale = window.data.product.data.skus.data.find(element => element.variations.find(element => element.value_id == button.value)).price_sale;
                var priceDiscount = window.data.product.data.skus.data.find(element => element.variations.find(element => element.value_id == button.value)).price_discount;
                if(buttonOrder == 1){
                    topMessageBadge = '<div class="kit-mostsell-badge">Mais Vendido</div>';
                    if(priceDiscount){
                        topDiscountBadge = '<div class="kit-discount-badge">-'+ ((1 - priceDiscount/priceSale).toFixed(2) * 100) +'%</div>';
                        discountMessageBadge = '<div class="kit-save-badge"> <span>Economize</span> <strong>R$ '+ (priceSale - priceDiscount).toString().replace('.',',') +'</strong> </div>'
                    }
                }
                else if(buttonOrder == 2){
                    topMessageBadge = '<div class="kit-moreeconomy-badge">Maior Economia</div>';
                    marginBottom = 'mb-5';
                    if(priceDiscount){
                        topDiscountBadge = '<div class="kit-discount-badge">-'+ ((1 - priceDiscount/priceSale).toFixed(2) * 100) +'%</div>';
                        discountMessageBadge = '<div class="kit-save-badge"> <span>Economize</span> <strong>R$ '+ (priceSale - priceDiscount).toString().replace('.',',') +'</strong> </div>'
                    }
                }
                if(priceDiscount) oldPriceProduct = '<div class="kit-old-value-price">R$ '+ priceSale.toFixed(2).toString().replace('.',',') +'</div>';
                var priceShowProduct = (priceDiscount)? priceDiscount.toFixed(2).toString().replace('.',',') : priceSale.toFixed(2).toString().replace('.',',');
                var buttonImage = window.data.product.data.skus.data.find(element => element.variations.find(element => element.value_id == button.value)).images.data[0].url;
                var buttonImageLink = "'https://images.yampi.io/unsafe/fit-in/75x75/filters:background_color(white):upscale()/" + buttonImage + "'";
                var selectedButton = (button.value == selectValue)? 'selected' : '';
                selectField.insertAdjacentHTML('beforebegin', '<div data-value="' +  + button.value + '" data-target="' + selectId  + '" class="selectbtn selectkitbtn '+ marginBottom +' target-' + selectId  + ' ' + selectedButton + '" onclick="clickButtonSelect(this,'+ index +')"><div class="kit-item"> <div class="kit-content-left"> <div class="kit-product-image-wrapper" style="background-image: url('+ buttonImageLink +')"></div> <div class="kit-quantity"> '+ topMessageBadge +' <div class="kit-item-title-badge"> <div class="kit-item-title">'+ button.innerText +'</div> '+ discountMessageBadge +' </div> </div> </div> <div class="kit-content-right"> '+ topDiscountBadge +' <div class="kit-comparation-prices"> '+ oldPriceProduct +' <div class="kit-new-value-price">R$ '+ priceShowProduct +'</div> </div> </div> </div></div>');
            }
        });
    }else if(selectId.toLowerCase().includes('cor') || selectId.toLowerCase().includes('cores')){
        options.forEach(function(button){
            if(button.value != 0 && button.value){
                var buttonImage = window.data.product.data.skus.data.find(element => element.variations.find(element => element.value_id == button.value)).images.data[0].url;
                var buttonImageLink = "'https://images.yampi.io/unsafe/fit-in/75x75/filters:background_color(white):upscale()/" + buttonImage + "'";
                var selectedButton = (button.value == selectValue)? 'selected' : '';
                selectField.insertAdjacentHTML('beforebegin', '<div data-value="' +  + button.value + '" data-target="' + selectId  + '" class="selectbtn selectroundbtn target-' + selectId  + ' ' + selectedButton + '" onclick="clickButtonSelect(this,'+ index +')" style="background-image: url('+ buttonImageLink +')"></div>');
            }
        });
    }else{
        options.forEach(function(button){
            if(button.value != 0 && button.value){
                var selectedButton = (button.value == selectValue)? 'selected' : '';
                selectField.insertAdjacentHTML('beforebegin', '<div data-value="' +  + button.value + '" data-target="' + selectId  + '" class="selectbtn target-' + selectId  + ' ' + selectedButton + '" onclick="clickButtonSelect(this,'+ index +')">' + button.innerText + '</div>');
            }
        });
    }
    selectField.style.display = 'none';
    selectField.parentNode.querySelector('svg.icon-select-arrow').style.display = 'none';
}

function waitElementToReplace(select, index){
    setTimeout(function(){
        if(select.value != 0){
            ReplaceSelectWithButtons(select, index);
        }else waitElementToReplace(select, index);
    }, 50);
}

function loading_on_all_pages(){
	window.addEventListener('load', function(){
		checkElement('#app .header-content .logo').then((selector) => {
		    document.querySelector('.header-content .logo').addEventListener('click', function(his, event){
		        if(his.target.parentElement.classList.contains('opened')){
		            if(his.clientX > 60 && his.clientX < 80){
		                document.querySelector('.header-content').classList.remove('opened');
		                document.querySelector('.header-content .holder-search').style.display = 'none';
		            }
		        }else{
		            if(his.clientX > 60 && his.clientX < 80){
		                document.querySelector('.header-content').classList.add('opened');
		                document.querySelector('.header-content .holder-search').style.animation = 'slide-bottom .5s cubic-bezier(.25,.46,.45,.94) both';
		                document.querySelector('.header-content .holder-search').style.display = 'block';
		            }
		        }
		    });

		    document.querySelector('.header .header-hightlightbar .container').addEventListener('click', function(his, event){
		        if(his.offsetX <= (his.target.offsetWidth + 15) && his.offsetX > (his.target.offsetWidth - 15)){
		            his.target.parentNode.remove();
		        }
		    });
	    });
	});    
}

function loading_on_home_page(){
	window.addEventListener('load', function(){
	    /* begin:: Seção de categorias */
	    checkElement('.main-banner').then((selector) => {
		    document.querySelector('.main-banner').insertAdjacentHTML('afterend', '<section class="collection categores"> <div class="container holder-collection"> <div class="flex -between"> <div class="holder-left flex -vcenter"> <h2 class="theme-title collection-name">Navegue por categorias</h2> </div></div><div class="col_categories" style="width: 100%;flex: 0 1 100%"> <div class="grid_categories" style="flex: 1 1 0%;display: flex;-webkit-box-pack: justify;justify-content: space-between;flex-wrap: wrap"> <div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/produtos-domesticos?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136993da490f.png" alt="Casa"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/saude-e-beleza?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a2c10115c.png" alt="Saúde e Beleza"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/casa-e-cozinha?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/61369d4d6a589.png" alt="Cozinha"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/eletronicos?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a34fab1aa.png" alt="Eletrônicos"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/bebe?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/613a24f5312b2.png" alt="Bebê"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/fitness?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a26006061.png" alt="Fitness"></picture> </div></div></a> </div></div></div></div></section>');
		    console.log('#seção de categorias adicionado');
		});
	    /* end:: Seção de categorias */
	    
	    /* begin:: Selos de segurança */
	    checkElement('.footer').then((selector) => {
	        document.querySelector('.footer').insertAdjacentHTML('beforebegin', '<section class="selos-seguranca banner-3" style="margin-bottom: -30px;margin-top: 50px;"><div class="holder-banner-3 container relative"><div class="flex"><div class="flex banner"><div> <svg id="b9fc2764-b1ea-4f95-950c-34e5a7681c67" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" width="60.5" height="53.3" viewBox="0 0 60.5 53.3"><title>receba-em-casa-selo</title><g id="a85833d7-f191-4087-a6d1-2e34f6109de5" data-name="Desktop"><g id="b9d3a989-89f8-40c4-bed8-1a361304dc07" data-name="Home V1"><g id="a73b2c51-d21e-4683-80d6-5980a02a62f2" data-name="Footer"><g id="f5a7fd43-ebc4-42fc-925e-0fe0a95e2a50" data-name="Group-41"><g id="e02249f4-a6b0-4cb9-8d2d-ee6c0b1b53b0" data-name="Envio"><g id="bd212004-d75a-4b2e-b024-b7a0fc88f57a" data-name="Group-16"><rect id="e8093c93-6b5d-4f2d-a6b0-bbabb294a49a" data-name="Rectangle-193" x="1.3" y="1.3" width="58" height="10.44" rx="2" fill="none" stroke="#191919" stroke-width="2.5"></rect><path id="af90b712-6651-40e4-87cf-69f9ab214a0b" data-name="Rectangle-194" d="M5.1,18.9H57.9v39h0a1.3,1.3,0,0,1-1.3,1.4H6.5a1.4,1.4,0,0,1-1.4-1.4Z" transform="translate(-1.8 -7.2)" fill="none" stroke="#191919" stroke-width="2.5"></path><polygon id="aca30934-6164-4025-80a4-1bfb327ecf9e" data-name="Fill-9" points="24.9 23.3 26.6 21.5 28.4 23.3 30.2 21.5 31.9 23.3 33.7 21.5 35.4 23.3 35.4 10.9 24.9 10.9 24.9 23.3" fill="#0046be" fill-rule="evenodd"></polygon><rect id="e3637387-6aa1-4c69-8d5a-addf5d5446c1" data-name="Rectangle-195" x="24.9" y="0.5" width="10.5" height="11.19" fill="#0046be"></rect><g id="bc64bbe0-cc8b-45b1-86a2-8177eecb457a" data-name="Group-12"><path id="af4d7e3b-fe61-4335-8a93-13534d82f509" data-name="Fill-15" d="M30.8,54.6H11a.5.5,0,0,1-.5-.5V43.4a.6.6,0,0,1,.5-.6H30.8a.6.6,0,0,1,.5.6V54.1a.5.5,0,0,1-.5.5" transform="translate(-1.8 -7.2)" fill="#fff" stroke="#191919" stroke-width="2" fill-rule="evenodd"></path><path id="ef7ee9e2-4be7-424a-8210-ff3809696cec" data-name="Fill-16" d="M15.4,48.8a.8.8,0,0,1-.7-.3.7.7,0,0,1-.2-.6.9.9,0,1,1,.9.9m0-3.3a2.5,2.5,0,0,0-2.5,2.4,2.5,2.5,0,0,0,.4,1.3L15.4,52l2.1-2.8a2.5,2.5,0,0,0,.4-1.3,2.5,2.5,0,0,0-2.5-2.4" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="a6e827d9-886d-4320-b5a4-fabbe4b15f43" data-name="Fill-17" d="M20.4,46.8H27a.7.7,0,0,0,.7-.7h0a.7.7,0,0,0-.7-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,46.8Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="a76236e7-1ad2-4da4-867a-58ece364c223" data-name="Fill-18" d="M20.4,49.4H25a.7.7,0,0,0,.7-.7h0a.7.7,0,0,0-.7-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,49.4Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="ee216a4c-af5a-4c6f-9781-632363913652" data-name="Fill-19" d="M20.4,52h5.3a.7.7,0,0,0,.6-.7h0a.6.6,0,0,0-.6-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,52Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path></g></g></g></g></g></g></g></svg></div><div class="block" style="margin-left: 15px;margin-right: 5px;"> <span class="block" style="font-weight: 600;font-size: 14px;">Compre online e receba em casa</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Envio imediato com código de rastreamento para você acompanhar o seu pedido</span></div></div><div class="flex banner"><div> <svg id="bb51f0a5-15c5-4de7-9e0e-37b89194541c" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60.6" height="58.4" viewBox="0 0 60.6 58.4"><defs><mask id="a8dcdce0-cf35-40c8-811e-ad1d7548ce30" x="0" y="0" width="60.59" height="41.81" maskUnits="userSpaceOnUse"><g transform="translate(-1.2 -5.9)"><g id="a565e7c0-7f02-4ebd-a32c-1ed050b238f8" data-name="mask-2"><polygon id="a4ddd7de-6f9e-4b63-ba4c-28c88f5e9a4b" data-name="path-1" points="61.1 47 2 47 2 6.7 61.1 6.7 61.1 47" fill="#fff" fill-rule="evenodd"></polygon></g></g></mask></defs><title>pagamento-seguro-selo</title><g id="e5706853-e815-4df2-a8d5-006759ddc413" data-name="Desktop"><g id="ed3a7d9d-ca1f-44f2-b238-b295dcd0f013" data-name="Home V1"><g id="adee5aaa-0a9f-4cd7-98b0-f29a0037169e" data-name="Footer"><g id="a1736b67-db1e-4751-b60a-cfdc37654e68" data-name="Group-42"><g id="b4bd78e5-f2ea-431c-9f4c-1b00572e2c4b" data-name="Pago"><g id="a01625a5-ce8d-47da-a08d-4fa09bab8700" data-name="Group-17"><g id="aeeb611b-06ec-4812-8738-b1acfa7af3f4" data-name="Group-10"><path id="a35595c8-3f46-425c-9b99-32d174fe9eb8" data-name="Fill-1" d="M2.8,10.2A2.7,2.7,0,0,1,5.6,7.5H57.5a2.8,2.8,0,0,1,2.8,2.7V43.5a2.8,2.8,0,0,1-2.8,2.7H5.6a2.7,2.7,0,0,1-2.8-2.7Z" transform="translate(-1.2 -5.9)" fill="#fff" fill-rule="evenodd"></path><g id="adb801d1-799e-4548-b13c-7480cc21dac1" data-name="Group-5"><g mask="url(#a8dcdce0-cf35-40c8-811e-ad1d7548ce30)"><path id="aad36856-9b8f-4866-a753-97ad19d0c965" data-name="Fill-3" d="M5.6,8.3a1.9,1.9,0,0,0-2,1.9V43.5a1.9,1.9,0,0,0,2,1.9H57.5a1.8,1.8,0,0,0,1.9-1.9V10.2a1.8,1.8,0,0,0-1.9-1.9ZM5.6,47A3.6,3.6,0,0,1,2,43.5V10.2A3.6,3.6,0,0,1,5.6,6.7H57.5a3.6,3.6,0,0,1,3.6,3.5V43.5A3.6,3.6,0,0,1,57.5,47Z" transform="translate(-1.2 -5.9)" fill="#191919" stroke="#191919" stroke-miterlimit="10" stroke-width="1.5" fill-rule="evenodd"></path></g></g><path id="b507deef-8795-4fd5-ae6f-eef5e1e1f069" data-name="Fill-6" d="M17.5,20.6a4,4,0,1,0,0-8,4.1,4.1,0,0,0-4.2,4,4.1,4.1,0,0,0,4.2,4" transform="translate(-1.2 -5.9)" fill="#fff" fill-rule="evenodd"></path><path id="a907fff4-9127-422f-b521-3e1325551578" data-name="Fill-8" d="M17.5,13.4a3.2,3.2,0,1,0,0,6.4,3.2,3.2,0,1,0,0-6.4m0,8a4.9,4.9,0,0,1-5-4.8,4.8,4.8,0,0,1,5-4.8,4.9,4.9,0,0,1,5,4.8,5,5,0,0,1-5,4.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path></g><g id="f3747952-8c8a-4cdb-a874-bdd2c224271f" data-name="Group-43"><path id="a161e30f-b8ce-4ee7-9aeb-07d804b1e2f4" data-name="Fill-13" d="M11.5,21.1a4.6,4.6,0,0,0,4.7-4.5,4.7,4.7,0,0,0-9.4,0,4.6,4.6,0,0,0,4.7,4.5" transform="translate(-1.2 -5.9)" fill="#0046be" fill-rule="evenodd"></path><path id="e48b6215-ca6d-4663-91b7-fedea9f981cc" data-name="Fill-17" d="M15.3,28.6H8a.8.8,0,0,1-.9-.8A.9.9,0,0,1,8,27h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="baaf3d29-9682-4a19-b171-c40deffc08e9" data-name="Fill-21" d="M12.4,37.1H7.1a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h5.3a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="e54c7df4-9554-4ac8-9104-616f9fcc0369" data-name="Fill-25" d="M23.7,37.1H16.4a.6.6,0,0,1-.6-.5.6.6,0,0,1,.6-.5h7.3a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="f9161f25-116c-47a1-a14b-9da4d3847ac9" data-name="Fill-29" d="M20.7,40.4H7.1a.5.5,0,0,1,0-1H20.7a.5.5,0,0,1,0,1" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="b8f49b7d-6f64-423c-8804-e452d45f72b7" data-name="Fill-33" d="M28.2,28.6H20.9a.8.8,0,0,1-.9-.8.9.9,0,0,1,.9-.8h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="a8ded640-741a-4b2e-a7ed-5912494d3e73" data-name="Fill-37" d="M41.1,28.6H33.8a.8.8,0,0,1-.9-.8.9.9,0,0,1,.9-.8h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="b3519f18-dd9a-4fb3-9b16-b13f5c22227a" data-name="Fill-41" d="M54.2,28.6H46.5a.8.8,0,0,1-.8-.8.9.9,0,0,1,.8-.8h7.7a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path></g></g></g></g></g></g></g><rect x="32.3" y="39.9" width="20" height="17" rx="1" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></rect><path d="M38.6,45.7V40.6a5.1,5.1,0,0,1,10.2,0v5.1" transform="translate(-1.2 -5.9)" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></path><line x1="42.5" y1="47.4" x2="42.5" y2="50" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></line></svg></div><div class="block" style="margin-left: 15px;margin-right: 5px;"> <span class="block" style="font-weight: 600;font-size: 14px;">Escolha como pagar</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Pague sua compra de forma segura com boleto bancário, pix ou cartão de crédito</span></div></div><div class="flex banner"><div> <svg id="a969efb4-3207-4c6f-93c1-c4255184b22c" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" width="54.2" height="57.6" viewBox="0 0 54.2 57.6"><title>reembolso-selo</title><g id="ef0a8b4d-3633-452c-992e-4c8bf9dbed30" data-name="Desktop"><g id="bcbf4a0e-8487-42e3-ae30-4335143bd100" data-name="Home"><g id="bbd4fccf-b7bf-4c99-8a3e-d9f7f83647a5" data-name="Footer"><g id="fb961cd4-9f3d-463f-ade4-933cb504b3b0" data-name="Compra-protegida"><path id="b6b13351-30e0-43b4-ac94-5b662f8771b5" data-name="Shape" d="M26.1,39.2l-5.9-5.9h0a1.1,1.1,0,0,1,0-1.5l1.6-1.7h0a1.1,1.1,0,0,1,1.5,0l3.5,3.5,9.8-9.8h0a1.1,1.1,0,0,1,1.5,0l1.7,1.7h0a1.1,1.1,0,0,1,0,1.5L27.6,39.2h0A1.1,1.1,0,0,1,26.1,39.2Z" transform="translate(-1.9 -3.7)" fill="#0046be"></path><path id="a6fafce5-dc61-4d44-ae46-4d4e067577cd" data-name="Page-1" d="M29,4.9S21.7,15.5,3.7,12.3c0,0-6.3,31,25.3,47.7C60.7,43.3,54.4,12.3,54.4,12.3,36.4,15.5,29,4.9,29,4.9Z" transform="translate(-1.9 -3.7)" fill="none" stroke="#191919" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path></g></g></g></g></svg></div><div class="block" style="margin-left: 15px"> <span class="block" style="font-weight: 600;font-size: 14px;">Segurança do início ao fim</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Nós garantimos a sua entrega ou devolvemos o seu dinheiro</span></div></div></div></div></section>');
	        console.log('#selos de segurança adicionado');
	    });
	    /* end:: Selos de segurança */
	});
}

function loading_on_product_page(){
	/* begin:: Converte Select para Botão */
	checkElement('#app .product-customizations').then((selector) => {
    	if(document.querySelector('.product-customizations div.custom-select select')){
	        var selects =  document.querySelectorAll('.product-customizations div.custom-select select');
	        selects.forEach(function(select, index){
	            if(index + 1 < selects.length){
	                select.addEventListener('change', function(){
	                    if(document.querySelector('div[class="info-'+ select.id +' info-sku-option"]')) document.querySelector('div[class="info-'+ select.id +' info-sku-option"]').remove();
	                    select.parentNode.parentNode.querySelector('label').insertAdjacentHTML('afterend', '<div class="info-'+ select.id +' info-sku-option">'+ select.options[select.selectedIndex].text +'</div>');
	                    verifyElement(selects, index + 1);
	                });
	            }else if(index + 1 == selects.length){
	                select.addEventListener('change', function(){
	                    if(document.querySelector('div[class="info-'+ select.id +' info-sku-option"]')) document.querySelector('div[class="info-'+ select.id +' info-sku-option"]').remove();
	                    select.parentNode.parentNode.querySelector('label').insertAdjacentHTML('afterend', '<div class="info-'+ select.id +' info-sku-option">'+ select.options[select.selectedIndex].text +'</div>');
	                });
	            }
	        }, {once : true});
	        selects[0].selectedIndex = 1;
	        selects[0].dispatchEvent(new Event('change'));

	        document.querySelectorAll('.product-customizations div.custom-select select').forEach(function(select, index){
	            waitElementToReplace(select, index);
	        });
	        console.log('#conversão de selects para botões adicionado');
	    }
    });
    /* end:: Converte Select para Botão */

    /* begin:: Número de produtos vendidos */
    checkElement('.main-product-reference').then((selector) => {
    	document.querySelector('.main-product-reference').innerText = 'Novo | ' + parseInt(document.querySelector('.product .actual-price').innerText.split(' ')[1].replace(',','.')) * 77 + ' Vendidos';
    	console.log('#numero de produtos vendidos adicionado');
    });
    /* end:: Número de produtos vendidos */

    
    checkElement('.main-product-info').then((selector) => {
    	/* begin:: Informação de estoque */
    	if(document.querySelector('.main-product-info .holder-flags .flag')){
	        document.querySelector('.main-product-info .main-product-prices').insertAdjacentHTML('afterend', '<div class="section-estoque" style="margin-bottom: 23px;"><div style="font-size: 1rem; line-height: 1; font-weight: 600; color: rgb(87, 87, 87);">Estoque</div><div style="margin-top: 2px;display: flex;"><span style="font-size: 50px;line-height: 0;margin-right: 10px;color: #e93639;">.</span> <span class="unidades-disponiveis" style="margin-top: 5px;font-weight: 600;font-size: 13px;color: #e93639;">Poucas unidades disponíveis</span></div></div>');
	    }else{
	        document.querySelector('.main-product-info .main-product-prices').insertAdjacentHTML('afterend', '<div class="section-estoque" style="margin-bottom: 23px;"><div style="font-size: 1rem; line-height: 1; font-weight: 600; color: rgb(87, 87, 87);">Estoque</div><div style="margin-top: 2px; display: flex; color: #3bb54a;"><span style="font-size: 50px;line-height: 0;margin-right: 10px;color: #379543;">.</span> <span style="margin-top: 5px; font-weight: 600; font-size: 13px;">Produto em estoque</span></div></div>');
	    }
	    console.log('#informação de estoque adicionado');
	    /* end:: Informação de estoque */

	    /* begin:: Gatilho de número de compras */
    	if(document.querySelector('.main-product-info .holder-flags .flag')){
	        var numero_maximo = 127, numero_minimo = 77;
	        document.querySelector('h1.main-product-name').insertAdjacentHTML('afterend', '<style type="text/css">@-webkit-keyframes fade-in{0%{opacity:0;height: 0px}100%{opacity:1;height: auto}}@keyframes fade-in{0%{opacity:0;height: 0px}100%{opacity:1;height: auto}}</style> <div style="display: block;visibility: visible;position: relative;height: auto;-webkit-animation:fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) 5s both;animation:fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) 5s both"><div><div style="background-color: rgb(255, 255, 255) !important; background-image: none !important; background-size: 100% 100% !important; border-width: 0px !important; border-style: none !important; border-color: rgb(0, 0, 0) !important; border-radius: 0px !important; position: relative; display: inline-block;padding-top:15px;width: 100%;"><div style="align-items: stretch;display: flex;position: relative;"><div><div style="background-color: rgb(255, 255, 255) !important;align-content: center;align-items: center;align-self: stretch;display: flex;height: 100%;justify-content: center;min-height: 40px;min-width: 40px;overflow: hidden;width: inherit;"> <img src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6158b12003fb7.png"style="height: 41px !important;"></div></div><div style="align-self: center;color: #3c3c3c;font-size: 13px;font-style: normal;font-weight: 400;line-height: normal;max-height: 100px;overflow: hidden;padding: 10px 30px 10px 10px;text-align: left;width: 100%;word-wrap: break-word;"><div><div style="white-space: normal;"><span>'+ Math.floor(Math.random() * (numero_maximo - numero_minimo + 1) + numero_minimo) +'</span>&nbsp;<span style="font-weight: bold;">pessoas</span> compraram este produto nas últimas 24h!</div></div></div><div style="align-items: center;border-style: none !important;display: flex;font-family: sans-serif;font-weight: 100;height: 10px;justify-content: center;line-height: 10px;position: absolute;right: 10px;top: 10px;width: 10px;z-index: 2147483647;"><div onclick="javascript:this.parentNode.parentNode.parentNode.parentNode.parentNode.remove()" style="cursor: pointer;font-size: 20px;text-align: center;width: 28px;"> <span>×</span></div></div></div></div></div></div>');
	        console.log('#gatilho de compras adicionado');
	    }
	    /* end:: Gatilho de número de compras */
        
        /* begin:: Stiky da informação do produto em Desktop */
        checkElement('section.product-reviews').then((selector) => {
            if(window.innerWidth < 700 && document.querySelector('.main-product-info') && document.querySelector('section.product-reviews')){
                window.onscroll = function(){
                    var element = document.querySelector('.main-product-content .main-product-info');
                    var elementLeftParent = document.querySelector('.main-product-content .main-product-images');
                    var elementReviews = document.querySelector('section.product-reviews');
                    var limitTop = element.offsetTop;
                    var limitTopBottom = element.offsetTop + element.offsetHeight;
                    var limitBottom = elementReviews.offsetTop;
                    var heightElement = element.offsetHeight;
                    var widthElement = element.offsetWidth;
                    var widthElementLeftParent = elementLeftParent.offsetWidth;
                    var startElementLeftParent = elementLeftParent.offsetLeft;

                    if(self.innerHeight < heightElement){
                        if ((self.pageYOffset + self.innerHeight) >= limitTopBottom + 40){
                            element.style.width = widthElement + 'px';
                            element.style.left = (startElementLeftParent + widthElementLeftParent) +'px';
                            if(!document.querySelector('#stick-temporary-blank-div')) element.insertAdjacentHTML('beforebegin', '<div id="stick-temporary-blank-div" style="width: '+ widthElement +'px; height: '+ heightElement +'px"></div>');
                            element.style.position = 'fixed';
                            element.style.transform = 'translateY(-'+ ((heightElement - self.innerHeight) + limitTop + 40) +'px)';
                        }else{
                            element.style.position = 'unset';
                            element.style.left = 'unset';
                            element.style.width = 'unset';
                            element.style.transform = 'unset';
                            if(document.querySelector('#stick-temporary-blank-div')) document.querySelector('#stick-temporary-blank-div').remove();
                        }

                        if ((self.pageYOffset + self.innerHeight) >= limitBottom - 40){
                            element.style.width = widthElement + 'px';
                            element.style.left = (startElementLeftParent + widthElementLeftParent) +'px';
                            element.style.position = 'fixed';
                            element.style.transform = 'translateY('+ (-element.offsetTop + (limitBottom - self.pageYOffset) - heightElement - 80) +'px)';
                        }
                    }else{
                        if (self.pageYOffset >= limitTop - 40){
                            element.style.width = widthElement + 'px';
                            element.style.left = (startElementLeftParent + widthElementLeftParent) +'px';
                            element.style.position = 'fixed';
                            element.style.transform = 'translateY(-180px)';
                        }else{
                            element.style.position = 'unset';
                            element.style.left = 'unset';
                            element.style.width = 'unset';
                            element.style.transform = 'unset';
                        }

                        if ((self.pageYOffset +  heightElement) >= limitBottom - 100){
                            element.style.width = widthElement + 'px';
                            element.style.left = (startElementLeftParent + widthElementLeftParent) +'px';
                            element.style.position = 'fixed';
                            element.style.transform = 'translateY('+ (-200 + (limitBottom - self.pageYOffset) - heightElement - 80) +'px)';
                        }
                    }
                }
                console.log('#stiky da informação do produto');
            }
        });
        /* end:: Stiky da informação do produto em Desktop */
    });

    checkElement('.main-product-info .main-product-buy-button-holder').then((selector) => {
    	/* begin:: Informação do frete */
    	document.querySelector('.main-product-info .main-product-buy-button-holder').insertAdjacentHTML('beforebegin', '<div style="height: fit-content;margin-bottom: 12px;margin-top: 0px;" class="shipping-preview-line"> <div style="margin-top: 3px;display: flex;position: absolute;width: fit-content;"> <svg xmlns="http://www.w3.org/2000/svg" class="product-info-shipping-icon" width="18" height="15" viewBox="0 0 18 15" style="width: 19px;height: 16px;"><path fill-rule="nonzero" d="M7.763 12.207a2.398 2.398 0 0 1-4.726 0H1.8a1.8 1.8 0 0 1-1.8-1.8V2.195a1.8 1.8 0 0 1 1.8-1.8h8.445a1.8 1.8 0 0 1 1.8 1.8v.568l3.322.035L18 6.821v5.386h-2.394a2.398 2.398 0 0 1-4.727 0H7.763zm-.1-1.2h3.182V2.195a.6.6 0 0 0-.6-.6H1.8a.6.6 0 0 0-.6.6v8.212a.6.6 0 0 0 .6.6h1.337a2.399 2.399 0 0 1 4.526 0zm7.843 0H16.8V7.179l-2.086-3.187-2.669-.029v5.76a2.399 2.399 0 0 1 3.461 1.284zm-2.263 1.99a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396zm-7.843 0a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396z"></path></svg> </div><p class="shipping-preview-loading" style="padding: 0px 0px 0px 30px;text-align: left !important;color: rgb(74, 74, 74) !important; font-size: 13px !important;">Carregando, aguarde...</p><p style="text-align: left !important;color: #4a4a4a !important;padding: 0 0 0 30px;font-size: 13px !important;" class="custom-address"></p><p style="text-align: left !important;color: #4a4a4a !important;padding: 5px 0 0 30px;font-size: 13px !important;" class="shipping-estimated"></p></div>');
    	console.log('#informação do frete adicionado');
    	/* end:: Informação do frete */

    	/* begin:: Bandeiras de cartões */
    	document.querySelector('.main-product-info .main-product-buy-button-holder').insertAdjacentHTML('afterend', '<div class="prod-cartoes" style="margin-top: 25px;text-align: center;order: 7;"> <div class="payment-list" style="flex-wrap: wrap;"> <svg class="payment-list__item" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-american_express" style="width: 38px;height: 24px;margin: 4px;"><title id="pi-american_express">American Express</title><g fill="none"><path fill="#000" d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z" opacity=".07"></path><path fill="#006FCF" d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"></path><path fill="#FFF" d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"></path></g></svg> <svg class="payment-list__item" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-boleto" style="width: 38px;height: 24px;margin: 4px;"><title id="pi-boleto">Boleto</title><path fill="#fff" d="M35.7 23.965H2.3a2.307 2.307 0 0 1-2.3-2.3v-19.4C0 1 1.035-.035 2.3-.035h33.4c1.265 0 2.3 1.035 2.3 2.3v19.4c0 1.265-1.035 2.3-2.3 2.3z"></path><path fill="#A7A8AB" d="M35.564 23.965H2.436c-1.344 0-2.436-1.077-2.436-2.4v-19.2c0-1.323 1.092-2.4 2.436-2.4h33.128c1.344 0 2.436 1.077 2.436 2.4v19.2c0 1.323-1.092 2.4-2.436 2.4zM2.436.925c-.806 0-1.462.646-1.462 1.44v19.2c0 .794.656 1.44 1.462 1.44h33.128c.806 0 1.462-.646 1.462-1.44v-19.2c0-.794-.656-1.44-1.462-1.44H2.436z" opacity=".25"></path><path d="M8.079 4.945h.7v6.298h-.7zm-1.83 0h.7v6.298h-.7zm7.256 0h1.901v6.298h-1.901zm9.715 0h.95v6.298h-.95zm2.324 0h.95v6.298h-.95zm3.804 0h1.221v6.298h-1.221zm-1.375 0h.395v6.298h-.395zm-6.389 0h.395v6.298h-.395zm-.845 0h.395v6.298h-.395zm-2.746 0h.395v6.298h-.395zm-6.31 0h.395v6.298h-.395zm-1.163 0h.733v6.298h-.733zM6.249 19.3v-6.478H8.68c.495 0 .891.065 1.191.196.299.131.532.333.701.606.17.271.255.556.255.855 0 .276-.075.537-.225.781a1.604 1.604 0 0 1-.679.593c.392.115.694.311.903.588.211.276.317.603.317.98 0 .305-.065.587-.193.847a1.644 1.644 0 0 1-.475.603c-.189.14-.425.247-.709.32a4.328 4.328 0 0 1-1.046.109H6.248zm.86-3.755H8.51c.38 0 .653-.026.817-.075a.903.903 0 0 0 .493-.324.936.936 0 0 0 .166-.567 1.03 1.03 0 0 0-.155-.568c-.103-.164-.25-.278-.442-.338s-.52-.09-.985-.09H7.109v1.963zm0 2.995h1.614c.277 0 .472-.011.585-.032.196-.035.362-.094.495-.176a.946.946 0 0 0 .327-.362c.086-.158.128-.341.128-.547 0-.243-.062-.452-.187-.632a.978.978 0 0 0-.516-.377c-.219-.072-.535-.109-.947-.109H7.109v2.235zm4.813-1.588c0-.867.241-1.509.725-1.927.403-.347.896-.52 1.476-.52.644 0 1.172.211 1.582.633.409.421.614 1.004.614 1.748 0 .603-.09 1.077-.271 1.422a1.92 1.92 0 0 1-.792.805 2.292 2.292 0 0 1-1.132.286c-.657 0-1.188-.21-1.594-.63-.406-.421-.608-1.027-.608-1.817zm.814.002c0 .6.131 1.05.394 1.347.264.299.594.448.994.448.395 0 .724-.149.988-.449.262-.3.394-.757.394-1.371 0-.579-.133-1.018-.397-1.315a1.261 1.261 0 0 0-.985-.448c-.4 0-.73.148-.994.445-.262.297-.394.745-.394 1.344zm4.498 2.346v-6.478h.796V19.3h-.796zm5.231-1.52l.823.109c-.128.478-.368.85-.718 1.114-.35.264-.796.397-1.341.397-.685 0-1.227-.211-1.629-.633-.401-.421-.602-1.013-.602-1.775 0-.787.202-1.399.608-1.834.406-.436.932-.653 1.579-.653.626 0 1.137.213 1.534.639.397.427.596 1.027.596 1.8l-.004.211h-3.497c.03.514.175.909.437 1.182a1.3 1.3 0 0 0 .979.41c.291 0 .54-.077.745-.231.207-.154.369-.4.49-.737zm-2.606-1.276h2.615c-.035-.395-.136-.691-.3-.888a1.216 1.216 0 0 0-.983-.46c-.365 0-.671.122-.92.366-.247.244-.385.572-.412.982zm6.164 2.086l.109.703a2.951 2.951 0 0 1-.599.071c-.288 0-.511-.045-.671-.137-.158-.092-.27-.211-.335-.36s-.097-.463-.097-.941v-2.705h-.588v-.615h.588v-1.161l.796-.478v1.639h.796v.615h-.796v2.751c0 .228.014.374.042.439a.324.324 0 0 0 .136.155.53.53 0 0 0 .271.057l.347-.032zm.487-1.638c0-.867.241-1.509.725-1.927.403-.347.896-.52 1.476-.52.644 0 1.172.211 1.582.633.409.421.614 1.004.614 1.748 0 .603-.09 1.077-.271 1.422a1.92 1.92 0 0 1-.792.805 2.292 2.292 0 0 1-1.132.286c-.657 0-1.188-.21-1.594-.63-.406-.421-.608-1.027-.608-1.817zm.814.002c0 .6.131 1.05.394 1.347.264.299.594.448.994.448.395 0 .724-.149.988-.449.262-.3.394-.757.394-1.371 0-.579-.133-1.018-.397-1.315a1.261 1.261 0 0 0-.985-.448c-.4 0-.73.148-.994.445-.262.297-.394.745-.394 1.344z" fill="#221F1F"></path></svg> <svg class="payment-list__item" role="img" aria-labelledby="pi-elo" width="38" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" style="width: 38px;height: 24px;margin: 4px;"><title id="pi-elo">Elo</title><g fill-rule="nonzero" fill="none"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000" opacity=".07"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path><g fill="#000"><path d="M13.3 15.5c-.6.6-1.4.9-2.3.9-.6 0-1.2-.2-1.6-.5l-1.2 1.9c.8.6 1.8.9 2.8.9 1.5 0 2.9-.6 3.9-1.6l-1.6-1.6zm-2.1-7.7c-3 0-5.5 2.4-5.5 5.4 0 1.1.3 2.2.9 3.1l9.8-4.2c-.6-2.5-2.7-4.3-5.2-4.3zm-3.3 5.8v-.4c0-1.8 1.5-3.2 3.2-3.2 1 0 1.8.5 2.4 1.1l-5.6 2.5zm11.6-8.3v10.5l1.8.8-.9 2.1-1.8-.8c-.4-.2-.7-.4-.9-.7-.2-.3-.3-.7-.3-1.3V5.3h2.1zM26 10.2c.3-.1.7-.2 1-.2 1.5 0 2.8 1.1 3.1 2.6l2.2-.4c-.5-2.5-2.7-4.4-5.3-4.4-.6 0-1.2.1-1.7.3l.7 2.1zm-2.6 7.1l1.5-1.7c-.7-.6-1.1-1.4-1.1-2.4s.4-1.8 1.1-2.4l-1.5-1.7c-1.1 1-1.8 2.5-1.8 4.1 0 1.7.7 3.1 1.8 4.1zm6.7-3.4c-.3 1.5-1.6 2.6-3.1 2.6-.4 0-.7-.1-1-.2l-.7 2.1c.5.2 1.1.3 1.7.3 2.6 0 4.8-1.9 5.3-4.4l-2.2-.4z"></path></g></g></svg> <svg xmlns="http://www.w3.org/2000/svg" height="24" width="38" viewBox="0 0 38 24" aria-labelledby="pi-hypercard" role="img" class="payment-list__item" style="width: 38px;height: 24px;margin: 4px;"><title id="pi-hypercard">Hypercard</title><g fill="none" fill-rule="evenodd"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000" fill-rule="nonzero" opacity=".07"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF" fill-rule="nonzero"></path><path d="M11.9 5.1H8.6c-1.4.1-2.6.6-2.9 1.8-.2.6-.3 1.3-.4 2-.7 3.3-1.3 6.7-2 9.9h25.4c2 0 3.3-.4 3.7-2 .2-.7.3-1.5.5-2.3.6-3.1 1.3-6.2 1.9-9.4H11.9z" fill="#B3131B" fill-rule="nonzero"></path><path d="M6.38 9.31h.605v1.827h2.3V9.31h.605v4.421h-.605v-2.067h-2.3v2.067h-.604v-4.42zm4.364 1.213h.551v3.208h-.55v-3.208zm0-1.213h.551v.614h-.55V9.31zm3.36 3.74c.168-.212.252-.528.252-.95 0-.257-.037-.477-.111-.662-.14-.355-.398-.533-.77-.533-.376 0-.633.188-.771.563a2.23 2.23 0 00-.112.765c0 .248.037.46.112.635.14.333.397.5.77.5a.773.773 0 00.63-.318zm-2.032-2.527h.526v.428c.109-.147.227-.26.355-.34.183-.12.398-.181.644-.181.366 0 .676.14.93.42.255.28.383.68.383 1.2 0 .701-.184 1.203-.551 1.504a1.25 1.25 0 01-.813.286c-.242 0-.446-.053-.61-.16a1.408 1.408 0 01-.323-.31v1.646h-.541v-4.493zm5.477.074c.215.107.378.246.49.417.109.162.181.352.217.569.032.148.048.385.048.71h-2.362c.01.327.087.59.232.787.144.197.368.296.67.296.284 0 .51-.093.678-.28a.944.944 0 00.205-.376h.532c-.014.119-.06.25-.14.396a1.432 1.432 0 01-.266.357c-.165.16-.368.268-.61.325a1.873 1.873 0 01-.443.048c-.402 0-.742-.146-1.02-.438-.28-.292-.419-.7-.419-1.227 0-.517.14-.938.421-1.26.281-.324.648-.485 1.102-.485.229 0 .45.054.665.16zm.199 1.265a1.403 1.403 0 00-.154-.562c-.148-.261-.396-.392-.743-.392a.824.824 0 00-.626.27c-.169.18-.258.408-.268.684h1.79zm1.237-1.354h.514v.557c.042-.108.146-.24.31-.396a.804.804 0 01.62-.23l.124.012v.572a.81.81 0 00-.178-.015c-.273 0-.482.088-.629.263a.92.92 0 00-.22.607v1.853h-.541v-3.223zm4.166.172c.228.176.365.48.411.912h-.526a.972.972 0 00-.22-.495c-.115-.132-.298-.198-.55-.198-.346 0-.593.169-.741.506-.097.219-.145.489-.145.81 0 .323.068.594.205.815.136.22.351.331.644.331.225 0 .403-.068.534-.206.132-.137.222-.325.273-.564h.526c-.06.427-.21.74-.451.937-.241.198-.549.297-.924.297-.422 0-.758-.154-1.008-.462-.251-.308-.377-.693-.377-1.154 0-.566.138-1.007.413-1.322a1.332 1.332 0 011.05-.472c.363 0 .659.088.886.265zm1.54 2.564c.114.09.25.135.406.135.19 0 .375-.044.554-.132a.745.745 0 00.451-.72v-.436a.927.927 0 01-.256.106 2.18 2.18 0 01-.307.06l-.328.042a1.255 1.255 0 00-.442.123c-.167.095-.25.245-.25.452 0 .156.057.28.172.37zm1.14-1.466c.125-.016.208-.068.25-.156a.476.476 0 00.036-.208c0-.185-.065-.318-.197-.402-.131-.083-.32-.125-.564-.125-.283 0-.484.077-.602.23a.752.752 0 00-.13.375h-.505c.01-.397.139-.673.387-.829a1.59 1.59 0 01.862-.233c.38 0 .687.072.924.217.235.144.352.369.352.674v1.857c0 .056.012.101.035.135.023.034.071.051.146.051a.824.824 0 00.177-.018v.4c-.084.025-.148.04-.192.046a1.408 1.408 0 01-.181.009c-.187 0-.322-.067-.406-.199a.767.767 0 01-.094-.298c-.11.145-.269.27-.475.376a1.47 1.47 0 01-.683.16c-.3 0-.544-.091-.733-.273a.905.905 0 01-.285-.681c0-.3.094-.531.28-.695.187-.165.432-.266.735-.304l.863-.109zm1.716-1.27h.514v.557c.043-.108.146-.24.31-.396a.804.804 0 01.62-.23l.124.012v.572a.81.81 0 00-.178-.015c-.273 0-.482.088-.629.263a.92.92 0 00-.22.607v1.853h-.541v-3.223zm2.6 2.516c.147.233.381.35.704.35a.745.745 0 00.619-.324c.161-.216.242-.525.242-.929 0-.407-.083-.708-.25-.904a.78.78 0 00-.617-.294.814.814 0 00-.663.313c-.17.21-.255.516-.255.921 0 .345.074.634.22.867zm1.216-2.417c.096.06.206.166.328.316V9.295h.52v4.436h-.487v-.448a1.172 1.172 0 01-.448.43c-.173.089-.37.133-.593.133-.36 0-.67-.151-.933-.453-.263-.302-.394-.704-.394-1.206 0-.469.12-.876.36-1.22.239-.344.582-.516 1.027-.516.247 0 .453.052.62.156z" fill="#FFF"></path></g></svg> <svg class="payment-list__item" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-master" style="width: 38px;height: 24px;margin: 4px;"><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg><svg class="payment-list__item" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-visa" style="width: 38px;height: 24px;margin: 4px;"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path></svg> <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" style="width: 38px;height: 24px;margin: 4px;"><title>pix</title><path d="M304.3,387h-32a2.9,2.9,0,0,0-3,3v18a3,3,0,0,0,3,3h32a2.9,2.9,0,0,0,3-3V390A3,3,0,0,0,304.3,387Z" transform="translate(-269.3 -387)" style="opacity:0.07000000029802322;isolation:isolate"></path><path d="M304.3,388a2,2,0,0,1,2,2v18a2,2,0,0,1-2,2h-32a2,2,0,0,1-2-2V390a2,2,0,0,1,2-2h32" transform="translate(-269.3 -387)" style="fill:#fff"></path><path d="M284.9,403.6V397a2.2,2.2,0,0,1,2.2-2.2H289a2.2,2.2,0,0,1,2.2,2.2v1.4a2.2,2.2,0,0,1-2.2,2.2h-2.7" transform="translate(-269.3 -387)" style="fill:none;stroke:#939598;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.5px"></path><path d="M291.8,394.8h.8a.9.9,0,0,1,.9.9v5" transform="translate(-269.3 -387)" style="fill:none;stroke:#939598;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.5px"></path><path d="M293.3,394.1l-.3-.4a.3.3,0,0,1,0-.4h0l.3-.3a.3.3,0,0,1,.4,0l.4.3a.3.3,0,0,1,0,.4h0l-.4.4h-.4" transform="translate(-269.3 -387)" style="fill:#3cb6aa"></path><path d="M295.1,394.8h.9a1.6,1.6,0,0,1,1.1.5l2,2a.8.8,0,0,0,.9,0h0l2-2a1.6,1.6,0,0,1,1.1-.5h.7" transform="translate(-269.3 -387)" style="fill:none;stroke:#939598;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.5px"></path><path d="M295.1,400.6h.9a1.6,1.6,0,0,0,1.1-.5l2-1.9a.6.6,0,0,1,.9,0l2,1.9a1.6,1.6,0,0,0,1.1.5h.7" transform="translate(-269.3 -387)" style="fill:none;stroke:#939598;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.5px"></path><path d="M279.9,401.9a1.6,1.6,0,0,1-1.1-.5l-1.6-1.6a.3.3,0,0,0-.4,0l-1.6,1.6a1.7,1.7,0,0,1-1.2.5h-.3l2.1,2a1.7,1.7,0,0,0,2.3,0l2-2Z" transform="translate(-269.3 -387)" style="fill:#3cb6aa"></path><path d="M274,396.2a1.6,1.6,0,0,1,1.2.4l1.6,1.7h.4l1.6-1.7a2.1,2.1,0,0,1,1.1-.4h.2l-2-2.1a1.7,1.7,0,0,0-2.3,0h0l-2.1,2.1Z" transform="translate(-269.3 -387)" style="fill:#3cb6aa"></path><path d="M281.8,397.9l-1.2-1.3h-.7a1.1,1.1,0,0,0-.8.3l-1.6,1.6a.8.8,0,0,1-1.1,0l-1.6-1.6a1.1,1.1,0,0,0-.8-.3h-.7l-1.3,1.3a1.7,1.7,0,0,0,0,2.3l1.3,1.2h.7a1.1,1.1,0,0,0,.8-.3l1.6-1.6a.8.8,0,0,1,1.1,0l1.6,1.6a1.1,1.1,0,0,0,.8.3h.7l1.2-1.2a1.7,1.7,0,0,0,0-2.3h0" transform="translate(-269.3 -387)" style="fill:#3cb6aa"></path><path d="M286.6,403.1h-.3v.4h.2a.3.3,0,0,0,.3-.3c0-.2-.1-.2-.2-.2m-.4.7V403h.6c.1,0,.1.1.1.2s-.1.2-.1.3h-.5v.2Z" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M287.4,403.1c-.2,0-.3,0-.3.2a.3.3,0,1,0,.6,0c0-.2-.1-.2-.3-.2m.2.5h-.5c0-.1-.1-.2-.1-.3a.3.3,0,0,1,.1-.2h.3c.1,0,.2,0,.2.1s.1.1.1.2a.4.4,0,0,1-.1.3" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M288.6,403.6l-.2-.5h0l-.3.5h0l-.3-.6h.1l.2.5h0l.2-.5h.1l.2.5h0l.2-.5h.1l-.2.6Z" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M289.3,403.1c-.2,0-.2,0-.2.2h.5c0-.2-.1-.2-.3-.2m0,.5c-.1,0-.2,0-.2-.1s-.1-.1-.1-.2,0-.2.1-.2h.5c.1,0,.1.1.1.2h-.6c0,.1,0,.2.2.2h0" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M289.9,403.6V403h0v.5Z" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M290.6,403.1c-.2,0-.2,0-.2.2h.5c0-.2-.1-.2-.3-.2m0,.5c-.1,0-.2,0-.2-.1s-.1-.1-.1-.2,0-.2.1-.2h.2c.1,0,.2,0,.2.1s.1.1.1.2h-.5c0,.1,0,.2.2.2h0" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M291.7,403.1h-.2c-.2,0-.3,0-.3.2s0,.2.2.2h.3Zm0,.5h-.5a.4.4,0,0,1-.1-.3c0-.1,0-.2.1-.2h.5v-.2h.1v.8Z" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M292.8,403.1h-.3v.4h.2a.3.3,0,0,0,.3-.3c0-.2-.1-.2-.2-.2m.1.5h-.5v-.8h.1v.2h.5a.3.3,0,0,1,.1.2l-.2.3" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M293.2,403.8h0a.2.2,0,0,0,.2-.2h0l-.3-.6h.1l.3.5h0l.2-.5h.1l-.3.7h-.4" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M294.7,403.3h-.2v.2h.2c.2,0,.3,0,.3-.1h-.3m0-.4h-.2v.2h.2c.2,0,.2,0,.2-.1s-.1-.1-.2-.1m.4.6h-.8v-.8h.7a.1.1,0,0,1,.1.1c0,.1,0,.2-.1.2h0c.1,0,.1.1.1.2h0" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M295.8,403.4h-.3c0,.1,0,.1.1.1h.2Zm.1.2h-.5a.4.4,0,0,1-.1-.3h.3c.1,0,.2,0,.2.1h.1c.1,0,.1.1.1.2v.3Z" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M296.7,403.6v-.3c0-.1,0-.2-.1-.2h-.2v.4h-.2V403h.4c.1,0,.2,0,.2.1h.1v.4Z" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M297.4,403.6h-.3v-.3c0-.1,0-.2.1-.2s.1-.1.2-.1h0a.2.2,0,0,0-.2.2l.2.2h0" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M298.1,403.1a.2.2,0,0,0,0,.4c.2,0,.2-.1.2-.2s0-.2-.2-.2m.3.5h-.6c0-.1-.1-.2-.1-.3a.3.3,0,0,1,.1-.2h.6c.1,0,.1.1.1.2a.4.4,0,0,1-.1.3" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M299.5,403.6c-.1,0-.3,0-.3-.1s-.2-.2-.2-.3.1-.3.2-.3h.3a.3.3,0,0,0,0,.6h.3v.2h-.3" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M300.3,403.1h0m0,.5H300v-.2a.2.2,0,0,1,.2-.2c0-.1.1-.1.2-.1h.3c.1,0,.1.1.1.2h-.6a.2.2,0,0,0,.2.2h0" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M301.4,403.6v-.3a.2.2,0,0,0-.2-.2H301v.4h-.2V403h.7v.4Z" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M302,403.6h-.2v-.3h0v-.2h.1v.2h0v.2h.1c0,.1,0,.1.1.1H302" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M302.3,403.6V403h.2v.4Z" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M303.4,403.4H303c0,.1,0,.1.1.1h.3Zm0,.2h-.5c0-.1-.1-.1-.1-.2h.4c.1,0,.2,0,.2.1s.1.1.1.2v.3Z" transform="translate(-269.3 -387)" style="fill:#939598"></path><path d="M303.7,402.8h.2v.8h-.2Z" transform="translate(-269.3 -387)" style="fill:#939598"></path></svg></div></div>');
    	console.log('#informação do bandeiras de cartões adicionado');
	    /* end:: Bandeiras de cartões */

    	/* begin:: Informação do vendedor */
    	document.querySelector('.main-product-info .main-product-buy-button-holder').insertAdjacentHTML('afterend', '<p class="prod-current-seller" id="sold-by">Vendido e entregue por <span class="text-primary">Lojas Hiper</span></p>');
    	console.log('#informação do vendedor adicionado');
	    /* end:: Informação do vendedor */
    });

    /* begin:: Estimativa de entrega */
    checkElement('.custom-address').then((selector) => {
	    getJSON("https://wtfismyip.com/json", function(err, data) {
	        if (err === null) {
	            var o = (t = data.YourFuckingLocation).replace(", Brazil", "");
	            document.querySelector(".custom-address").innerHTML = "<font color='3bb54a'><b>Frete Grátis</b></font> para <strong><font color='3bb54a'>" + o + " e Região</font></strong>";
	            document.querySelector(".shipping-estimated").innerHTML = "Prazo de envio do produto de <strong>2 à 5 dias</strong>.";
	            document.querySelector(".shipping-preview-loading").style.display = "none";
	        }
	    });
	    console.log('#estimativa de entrega adicionado');
    });
    /* end:: Estimativa de entrega */

    /* begin:: Mensagem de segurança e garantia */
    checkElement('.shipping-preview-line').then((selector) => {
    	document.querySelector('.shipping-preview-line').insertAdjacentHTML('afterend', '<div class="seguranca-e-garantia" style="padding-bottom: 20px"><span style="color: #3bb54a;font-size: 13px;"><i style="vertical-align: middle;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" style="width: 16px;height: 16px;margin: 0 10px 0 0;margin-top: 1px;fill: #248430;"> <defs><style>.b306b133-4171-4324-a7a6-35edefba34cf{fill:#248430}.ee141ce0-902f-4815-8c10-0060f9589c50{fill:#fff}</style></defs><path class="b306b133-4171-4324-a7a6-35edefba34cf" d="M1.3,4.3V3.7h.6A8.9,8.9,0,0,0,7.6,1.3L8,1l.4.3a8.9,8.9,0,0,0,5.7,2.4h.6v.6c0,5.6-2.2,9.2-6.5,10.7H7.8C3.5,13.5,1.3,9.9,1.3,4.3Z" transform="translate(-1.3 -1)"></path><polygon class="ee141ce0-902f-4815-8c10-0060f9589c50" points="5.8 8 8.9 4.4 9.8 5.2 5.8 9.8 3.4 7.4 4.2 6.5 5.8 8"></polygon> </svg></i> Garantia de 30 dias direto em nossa loja</span><br><span style="color: #3bb54a;font-size: 13px;margin-top: 2px;display: block;"><i style="vertical-align: middle;"><svg class="ui-pdp-icon ui-pdp-icon--return ui-pdp-color--GRAY" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" style="width: 16px;height: 12.5px;margin: 0 11px 0 0;margin-top: 1px;fill: #248430;"> <defs><style>.b3af21d8-768b-4f95-980d-3efefd63cdb6{fill:#248430;stroke:#248430;stroke-miterlimit:10}</style></defs><path class="b3af21d8-768b-4f95-980d-3efefd63cdb6" d="M3.6,9.1h7.2a2.7,2.7,0,0,0,0-5.4H8.1V2.5h2.7a3.8,3.8,0,0,1,3.9,3.9,3.9,3.9,0,0,1-3.9,3.9H3.6l2.5,2.4-.9.8L1.3,9.7,5.2,5.8l.9.9L3.6,9.1Z" transform="translate(-0.6 -2)"></path> </svg></i> 7 dias para trocas e devoluções</span></div>');
    	console.log('#mensagem de segurança e garantia adicionado');
    });
    /* end:: Mensagem de segurança e garantia */

    /* begin:: Valor do desconto */
    checkElement('.main-product-prices .show-installments').then((selector) => {
    	if(document.querySelector('.product .old-price')){
	        var valor_produto_antigo = document.querySelector('.product .old-price').innerText;
	        var valor_produto_float_antigo = parseFloat(valor_produto_antigo.split(' ')[1].replace(',','.'));
	        var valor_produto = document.querySelector('.product .actual-price').innerText;
	        var valor_produto_float = parseFloat(valor_produto.split(' ')[1].replace(',','.'));
	        var valor_desconto = (valor_produto_float_antigo - valor_produto_float).toFixed(2).replace('.', ',');
	        document.querySelector('.main-product-prices .show-installments').insertAdjacentHTML('beforebegin', '<div style="display: block;-webkit-box-align: center;align-items: center;padding: 6px 16px;font-size: 0.875rem;border: none;min-height: 1.5rem;max-width: fit-content;min-width: 1.5rem;font-weight: bold;color: rgb(255, 255, 255);margin-top: 15px;background: #00a801;border-radius: 4px;"><span><span>ECONOMIA DE </span><span class="economy-price" style="color: var(--color-general-secundary);">R$&nbsp;'+ valor_desconto +'</span></span></div>');
	        console.log('#valor do desconto adicionado');
	    }
    });
    /* end:: Valor do desconto */

    /* begin:: Selos de segurança */
    checkElement('.footer').then((selector) => {
        document.querySelector('.footer').insertAdjacentHTML('beforebegin', '<section class="selos-seguranca banner-3" style="margin-bottom: -30px;margin-top: 50px;"><div class="holder-banner-3 container relative"><div class="flex"><div class="flex banner"><div> <svg id="b9fc2764-b1ea-4f95-950c-34e5a7681c67" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" width="60.5" height="53.3" viewBox="0 0 60.5 53.3"><title>receba-em-casa-selo</title><g id="a85833d7-f191-4087-a6d1-2e34f6109de5" data-name="Desktop"><g id="b9d3a989-89f8-40c4-bed8-1a361304dc07" data-name="Home V1"><g id="a73b2c51-d21e-4683-80d6-5980a02a62f2" data-name="Footer"><g id="f5a7fd43-ebc4-42fc-925e-0fe0a95e2a50" data-name="Group-41"><g id="e02249f4-a6b0-4cb9-8d2d-ee6c0b1b53b0" data-name="Envio"><g id="bd212004-d75a-4b2e-b024-b7a0fc88f57a" data-name="Group-16"><rect id="e8093c93-6b5d-4f2d-a6b0-bbabb294a49a" data-name="Rectangle-193" x="1.3" y="1.3" width="58" height="10.44" rx="2" fill="none" stroke="#191919" stroke-width="2.5"></rect><path id="af90b712-6651-40e4-87cf-69f9ab214a0b" data-name="Rectangle-194" d="M5.1,18.9H57.9v39h0a1.3,1.3,0,0,1-1.3,1.4H6.5a1.4,1.4,0,0,1-1.4-1.4Z" transform="translate(-1.8 -7.2)" fill="none" stroke="#191919" stroke-width="2.5"></path><polygon id="aca30934-6164-4025-80a4-1bfb327ecf9e" data-name="Fill-9" points="24.9 23.3 26.6 21.5 28.4 23.3 30.2 21.5 31.9 23.3 33.7 21.5 35.4 23.3 35.4 10.9 24.9 10.9 24.9 23.3" fill="#0046be" fill-rule="evenodd"></polygon><rect id="e3637387-6aa1-4c69-8d5a-addf5d5446c1" data-name="Rectangle-195" x="24.9" y="0.5" width="10.5" height="11.19" fill="#0046be"></rect><g id="bc64bbe0-cc8b-45b1-86a2-8177eecb457a" data-name="Group-12"><path id="af4d7e3b-fe61-4335-8a93-13534d82f509" data-name="Fill-15" d="M30.8,54.6H11a.5.5,0,0,1-.5-.5V43.4a.6.6,0,0,1,.5-.6H30.8a.6.6,0,0,1,.5.6V54.1a.5.5,0,0,1-.5.5" transform="translate(-1.8 -7.2)" fill="#fff" stroke="#191919" stroke-width="2" fill-rule="evenodd"></path><path id="ef7ee9e2-4be7-424a-8210-ff3809696cec" data-name="Fill-16" d="M15.4,48.8a.8.8,0,0,1-.7-.3.7.7,0,0,1-.2-.6.9.9,0,1,1,.9.9m0-3.3a2.5,2.5,0,0,0-2.5,2.4,2.5,2.5,0,0,0,.4,1.3L15.4,52l2.1-2.8a2.5,2.5,0,0,0,.4-1.3,2.5,2.5,0,0,0-2.5-2.4" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="a6e827d9-886d-4320-b5a4-fabbe4b15f43" data-name="Fill-17" d="M20.4,46.8H27a.7.7,0,0,0,.7-.7h0a.7.7,0,0,0-.7-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,46.8Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="a76236e7-1ad2-4da4-867a-58ece364c223" data-name="Fill-18" d="M20.4,49.4H25a.7.7,0,0,0,.7-.7h0a.7.7,0,0,0-.7-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,49.4Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="ee216a4c-af5a-4c6f-9781-632363913652" data-name="Fill-19" d="M20.4,52h5.3a.7.7,0,0,0,.6-.7h0a.6.6,0,0,0-.6-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,52Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path></g></g></g></g></g></g></g></svg></div><div class="block" style="margin-left: 15px;margin-right: 5px;"> <span class="block" style="font-weight: 600;font-size: 14px;">Compre online e receba em casa</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Envio imediato com código de rastreamento para você acompanhar o seu pedido</span></div></div><div class="flex banner"><div> <svg id="bb51f0a5-15c5-4de7-9e0e-37b89194541c" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60.6" height="58.4" viewBox="0 0 60.6 58.4"><defs><mask id="a8dcdce0-cf35-40c8-811e-ad1d7548ce30" x="0" y="0" width="60.59" height="41.81" maskUnits="userSpaceOnUse"><g transform="translate(-1.2 -5.9)"><g id="a565e7c0-7f02-4ebd-a32c-1ed050b238f8" data-name="mask-2"><polygon id="a4ddd7de-6f9e-4b63-ba4c-28c88f5e9a4b" data-name="path-1" points="61.1 47 2 47 2 6.7 61.1 6.7 61.1 47" fill="#fff" fill-rule="evenodd"></polygon></g></g></mask></defs><title>pagamento-seguro-selo</title><g id="e5706853-e815-4df2-a8d5-006759ddc413" data-name="Desktop"><g id="ed3a7d9d-ca1f-44f2-b238-b295dcd0f013" data-name="Home V1"><g id="adee5aaa-0a9f-4cd7-98b0-f29a0037169e" data-name="Footer"><g id="a1736b67-db1e-4751-b60a-cfdc37654e68" data-name="Group-42"><g id="b4bd78e5-f2ea-431c-9f4c-1b00572e2c4b" data-name="Pago"><g id="a01625a5-ce8d-47da-a08d-4fa09bab8700" data-name="Group-17"><g id="aeeb611b-06ec-4812-8738-b1acfa7af3f4" data-name="Group-10"><path id="a35595c8-3f46-425c-9b99-32d174fe9eb8" data-name="Fill-1" d="M2.8,10.2A2.7,2.7,0,0,1,5.6,7.5H57.5a2.8,2.8,0,0,1,2.8,2.7V43.5a2.8,2.8,0,0,1-2.8,2.7H5.6a2.7,2.7,0,0,1-2.8-2.7Z" transform="translate(-1.2 -5.9)" fill="#fff" fill-rule="evenodd"></path><g id="adb801d1-799e-4548-b13c-7480cc21dac1" data-name="Group-5"><g mask="url(#a8dcdce0-cf35-40c8-811e-ad1d7548ce30)"><path id="aad36856-9b8f-4866-a753-97ad19d0c965" data-name="Fill-3" d="M5.6,8.3a1.9,1.9,0,0,0-2,1.9V43.5a1.9,1.9,0,0,0,2,1.9H57.5a1.8,1.8,0,0,0,1.9-1.9V10.2a1.8,1.8,0,0,0-1.9-1.9ZM5.6,47A3.6,3.6,0,0,1,2,43.5V10.2A3.6,3.6,0,0,1,5.6,6.7H57.5a3.6,3.6,0,0,1,3.6,3.5V43.5A3.6,3.6,0,0,1,57.5,47Z" transform="translate(-1.2 -5.9)" fill="#191919" stroke="#191919" stroke-miterlimit="10" stroke-width="1.5" fill-rule="evenodd"></path></g></g><path id="b507deef-8795-4fd5-ae6f-eef5e1e1f069" data-name="Fill-6" d="M17.5,20.6a4,4,0,1,0,0-8,4.1,4.1,0,0,0-4.2,4,4.1,4.1,0,0,0,4.2,4" transform="translate(-1.2 -5.9)" fill="#fff" fill-rule="evenodd"></path><path id="a907fff4-9127-422f-b521-3e1325551578" data-name="Fill-8" d="M17.5,13.4a3.2,3.2,0,1,0,0,6.4,3.2,3.2,0,1,0,0-6.4m0,8a4.9,4.9,0,0,1-5-4.8,4.8,4.8,0,0,1,5-4.8,4.9,4.9,0,0,1,5,4.8,5,5,0,0,1-5,4.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path></g><g id="f3747952-8c8a-4cdb-a874-bdd2c224271f" data-name="Group-43"><path id="a161e30f-b8ce-4ee7-9aeb-07d804b1e2f4" data-name="Fill-13" d="M11.5,21.1a4.6,4.6,0,0,0,4.7-4.5,4.7,4.7,0,0,0-9.4,0,4.6,4.6,0,0,0,4.7,4.5" transform="translate(-1.2 -5.9)" fill="#0046be" fill-rule="evenodd"></path><path id="e48b6215-ca6d-4663-91b7-fedea9f981cc" data-name="Fill-17" d="M15.3,28.6H8a.8.8,0,0,1-.9-.8A.9.9,0,0,1,8,27h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="baaf3d29-9682-4a19-b171-c40deffc08e9" data-name="Fill-21" d="M12.4,37.1H7.1a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h5.3a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="e54c7df4-9554-4ac8-9104-616f9fcc0369" data-name="Fill-25" d="M23.7,37.1H16.4a.6.6,0,0,1-.6-.5.6.6,0,0,1,.6-.5h7.3a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="f9161f25-116c-47a1-a14b-9da4d3847ac9" data-name="Fill-29" d="M20.7,40.4H7.1a.5.5,0,0,1,0-1H20.7a.5.5,0,0,1,0,1" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="b8f49b7d-6f64-423c-8804-e452d45f72b7" data-name="Fill-33" d="M28.2,28.6H20.9a.8.8,0,0,1-.9-.8.9.9,0,0,1,.9-.8h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="a8ded640-741a-4b2e-a7ed-5912494d3e73" data-name="Fill-37" d="M41.1,28.6H33.8a.8.8,0,0,1-.9-.8.9.9,0,0,1,.9-.8h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="b3519f18-dd9a-4fb3-9b16-b13f5c22227a" data-name="Fill-41" d="M54.2,28.6H46.5a.8.8,0,0,1-.8-.8.9.9,0,0,1,.8-.8h7.7a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path></g></g></g></g></g></g></g><rect x="32.3" y="39.9" width="20" height="17" rx="1" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></rect><path d="M38.6,45.7V40.6a5.1,5.1,0,0,1,10.2,0v5.1" transform="translate(-1.2 -5.9)" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></path><line x1="42.5" y1="47.4" x2="42.5" y2="50" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></line></svg></div><div class="block" style="margin-left: 15px;margin-right: 5px;"> <span class="block" style="font-weight: 600;font-size: 14px;">Escolha como pagar</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Pague sua compra de forma segura com boleto bancário, pix ou cartão de crédito</span></div></div><div class="flex banner"><div> <svg id="a969efb4-3207-4c6f-93c1-c4255184b22c" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" width="54.2" height="57.6" viewBox="0 0 54.2 57.6"><title>reembolso-selo</title><g id="ef0a8b4d-3633-452c-992e-4c8bf9dbed30" data-name="Desktop"><g id="bcbf4a0e-8487-42e3-ae30-4335143bd100" data-name="Home"><g id="bbd4fccf-b7bf-4c99-8a3e-d9f7f83647a5" data-name="Footer"><g id="fb961cd4-9f3d-463f-ade4-933cb504b3b0" data-name="Compra-protegida"><path id="b6b13351-30e0-43b4-ac94-5b662f8771b5" data-name="Shape" d="M26.1,39.2l-5.9-5.9h0a1.1,1.1,0,0,1,0-1.5l1.6-1.7h0a1.1,1.1,0,0,1,1.5,0l3.5,3.5,9.8-9.8h0a1.1,1.1,0,0,1,1.5,0l1.7,1.7h0a1.1,1.1,0,0,1,0,1.5L27.6,39.2h0A1.1,1.1,0,0,1,26.1,39.2Z" transform="translate(-1.9 -3.7)" fill="#0046be"></path><path id="a6fafce5-dc61-4d44-ae46-4d4e067577cd" data-name="Page-1" d="M29,4.9S21.7,15.5,3.7,12.3c0,0-6.3,31,25.3,47.7C60.7,43.3,54.4,12.3,54.4,12.3,36.4,15.5,29,4.9,29,4.9Z" transform="translate(-1.9 -3.7)" fill="none" stroke="#191919" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path></g></g></g></g></svg></div><div class="block" style="margin-left: 15px"> <span class="block" style="font-weight: 600;font-size: 14px;">Segurança do início ao fim</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Nós garantimos a sua entrega ou devolvemos o seu dinheiro</span></div></div></div></div></section>');
        console.log('#selos de segurança adicionado');
    });
    /* end:: Selos de segurança */
}

document.querySelector('body').classList.add('script-ella');
console.log('#iniciando definição de script');

var current_domain = window.location.hostname.replace('www.','');
var store_domain = window.merchant['domain'];
if(current_domain != store_domain && !current_domain.includes('catalog.yampi.io')){
    window.merchant['checkout']['base_domain'] = window.merchant['checkout']['base_domain'].replace(store_domain, current_domain);
    window.merchant['checkout']['items'] = window.merchant['checkout']['items'].replace(store_domain, current_domain);
    window.merchant['checkout']['items_json'] = window.merchant['checkout']['items_json'].replace(store_domain, current_domain);
    window.merchant['checkout']['redirect_to'] = window.merchant['checkout']['redirect_to'].replace(store_domain, current_domain);
    window.merchant['checkout']['orders'] = window.merchant['checkout']['orders'].replace(store_domain, current_domain);
    console.log('#mudança de domínio completa');
}

if(document.body.classList.contains('home')){
	loading_on_home_page();
	loading_on_all_pages();
}else if(document.body.classList.contains('product')){
	loading_on_product_page();
	loading_on_all_pages();
}else{
	loading_on_all_pages();
}
