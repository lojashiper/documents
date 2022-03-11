const checkElement = async selector => {
    while ( document.querySelector(selector) === null) {
        await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector); 
};

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
    options.forEach(function(button){
        if(button.value != 0 && button.value){
            if(button.value == selectValue) selectField.insertAdjacentHTML('beforebegin', '<div data-value="' +  + button.value + '" data-target="' + selectId  + '" class="selectbtn target-' + selectId  + ' selected" onclick="clickButtonSelect(this,'+ index +')">' + button.innerText + '</div>');
            else selectField.insertAdjacentHTML('beforebegin', '<div data-value="' +  + button.value + '" data-target="' + selectId  + '" class="selectbtn target-' + selectId  + '" onclick="clickButtonSelect(this,'+ index +')">' + button.innerText + '</div>');
        }
    });
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
}

function loading_on_home_page(){
    /* begin:: Seção de categorias */
    document.querySelector('.main-banner').insertAdjacentHTML('afterend', '<section class="collection categores"> <div class="container holder-collection"> <div class="flex -between"> <div class="holder-left flex -vcenter"> <h2 class="theme-title collection-name">Navegue por categorias</h2> </div></div><div class="col_categories" style="width: 100%;flex: 0 1 100%"> <div class="grid_categories" style="flex: 1 1 0%;display: flex;-webkit-box-pack: justify;justify-content: space-between;flex-wrap: wrap"> <div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/produtos-domesticos?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136993da490f.png" alt="Casa"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/saude-e-beleza?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a2c10115c.png" alt="Saúde e Beleza"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/casa-e-cozinha?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/61369d4d6a589.png" alt="Cozinha"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/eletronicos?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a34fab1aa.png" alt="Eletrônicos"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/bebe?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/613a24f5312b2.png" alt="Bebê"></picture> </div></div></a> </div><div class="col_categories" style="width: 16.6667%;flex: 0 1 calc(16.6667% - 5px)"> <a class="" href="https://lojashiper.com/fitness?sort_by=best_sellers"> <div class="spacey-image"> <div class="src__wrapper"> <picture class="src_picture"><img loading="lazy" src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6136a26006061.png" alt="Fitness"></picture> </div></div></a> </div></div></div></div></section>');
    console.log('#seção de categorias adicionado');
    /* end:: Seção de categorias */
    
    /* begin:: Selos de segurança */
    checkElement('.footer').then((selector) => {
        document.querySelector('.footer').insertAdjacentHTML('beforebegin', '<section class="selos-seguranca banner-3" style="margin-bottom: -30px;margin-top: 50px;"><div class="holder-banner-3 container relative"><div class="flex"><div class="flex banner"><div> <svg id="b9fc2764-b1ea-4f95-950c-34e5a7681c67" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" width="60.5" height="53.3" viewBox="0 0 60.5 53.3"><title>receba-em-casa-selo</title><g id="a85833d7-f191-4087-a6d1-2e34f6109de5" data-name="Desktop"><g id="b9d3a989-89f8-40c4-bed8-1a361304dc07" data-name="Home V1"><g id="a73b2c51-d21e-4683-80d6-5980a02a62f2" data-name="Footer"><g id="f5a7fd43-ebc4-42fc-925e-0fe0a95e2a50" data-name="Group-41"><g id="e02249f4-a6b0-4cb9-8d2d-ee6c0b1b53b0" data-name="Envio"><g id="bd212004-d75a-4b2e-b024-b7a0fc88f57a" data-name="Group-16"><rect id="e8093c93-6b5d-4f2d-a6b0-bbabb294a49a" data-name="Rectangle-193" x="1.3" y="1.3" width="58" height="10.44" rx="2" fill="none" stroke="#191919" stroke-width="2.5"></rect><path id="af90b712-6651-40e4-87cf-69f9ab214a0b" data-name="Rectangle-194" d="M5.1,18.9H57.9v39h0a1.3,1.3,0,0,1-1.3,1.4H6.5a1.4,1.4,0,0,1-1.4-1.4Z" transform="translate(-1.8 -7.2)" fill="none" stroke="#191919" stroke-width="2.5"></path><polygon id="aca30934-6164-4025-80a4-1bfb327ecf9e" data-name="Fill-9" points="24.9 23.3 26.6 21.5 28.4 23.3 30.2 21.5 31.9 23.3 33.7 21.5 35.4 23.3 35.4 10.9 24.9 10.9 24.9 23.3" fill="#0046be" fill-rule="evenodd"></polygon><rect id="e3637387-6aa1-4c69-8d5a-addf5d5446c1" data-name="Rectangle-195" x="24.9" y="0.5" width="10.5" height="11.19" fill="#0046be"></rect><g id="bc64bbe0-cc8b-45b1-86a2-8177eecb457a" data-name="Group-12"><path id="af4d7e3b-fe61-4335-8a93-13534d82f509" data-name="Fill-15" d="M30.8,54.6H11a.5.5,0,0,1-.5-.5V43.4a.6.6,0,0,1,.5-.6H30.8a.6.6,0,0,1,.5.6V54.1a.5.5,0,0,1-.5.5" transform="translate(-1.8 -7.2)" fill="#fff" stroke="#191919" stroke-width="2" fill-rule="evenodd"></path><path id="ef7ee9e2-4be7-424a-8210-ff3809696cec" data-name="Fill-16" d="M15.4,48.8a.8.8,0,0,1-.7-.3.7.7,0,0,1-.2-.6.9.9,0,1,1,.9.9m0-3.3a2.5,2.5,0,0,0-2.5,2.4,2.5,2.5,0,0,0,.4,1.3L15.4,52l2.1-2.8a2.5,2.5,0,0,0,.4-1.3,2.5,2.5,0,0,0-2.5-2.4" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="a6e827d9-886d-4320-b5a4-fabbe4b15f43" data-name="Fill-17" d="M20.4,46.8H27a.7.7,0,0,0,.7-.7h0a.7.7,0,0,0-.7-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,46.8Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="a76236e7-1ad2-4da4-867a-58ece364c223" data-name="Fill-18" d="M20.4,49.4H25a.7.7,0,0,0,.7-.7h0a.7.7,0,0,0-.7-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,49.4Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="ee216a4c-af5a-4c6f-9781-632363913652" data-name="Fill-19" d="M20.4,52h5.3a.7.7,0,0,0,.6-.7h0a.6.6,0,0,0-.6-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,52Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path></g></g></g></g></g></g></g></svg></div><div class="block" style="margin-left: 15px;margin-right: 5px;"> <span class="block" style="font-weight: 600;font-size: 14px;">Compre online e receba em casa</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Envio imediato com código de rastreamento para você acompanhar o seu pedido</span></div></div><div class="flex banner"><div> <svg id="bb51f0a5-15c5-4de7-9e0e-37b89194541c" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60.6" height="58.4" viewBox="0 0 60.6 58.4"><defs><mask id="a8dcdce0-cf35-40c8-811e-ad1d7548ce30" x="0" y="0" width="60.59" height="41.81" maskUnits="userSpaceOnUse"><g transform="translate(-1.2 -5.9)"><g id="a565e7c0-7f02-4ebd-a32c-1ed050b238f8" data-name="mask-2"><polygon id="a4ddd7de-6f9e-4b63-ba4c-28c88f5e9a4b" data-name="path-1" points="61.1 47 2 47 2 6.7 61.1 6.7 61.1 47" fill="#fff" fill-rule="evenodd"></polygon></g></g></mask></defs><title>pagamento-seguro-selo</title><g id="e5706853-e815-4df2-a8d5-006759ddc413" data-name="Desktop"><g id="ed3a7d9d-ca1f-44f2-b238-b295dcd0f013" data-name="Home V1"><g id="adee5aaa-0a9f-4cd7-98b0-f29a0037169e" data-name="Footer"><g id="a1736b67-db1e-4751-b60a-cfdc37654e68" data-name="Group-42"><g id="b4bd78e5-f2ea-431c-9f4c-1b00572e2c4b" data-name="Pago"><g id="a01625a5-ce8d-47da-a08d-4fa09bab8700" data-name="Group-17"><g id="aeeb611b-06ec-4812-8738-b1acfa7af3f4" data-name="Group-10"><path id="a35595c8-3f46-425c-9b99-32d174fe9eb8" data-name="Fill-1" d="M2.8,10.2A2.7,2.7,0,0,1,5.6,7.5H57.5a2.8,2.8,0,0,1,2.8,2.7V43.5a2.8,2.8,0,0,1-2.8,2.7H5.6a2.7,2.7,0,0,1-2.8-2.7Z" transform="translate(-1.2 -5.9)" fill="#fff" fill-rule="evenodd"></path><g id="adb801d1-799e-4548-b13c-7480cc21dac1" data-name="Group-5"><g mask="url(#a8dcdce0-cf35-40c8-811e-ad1d7548ce30)"><path id="aad36856-9b8f-4866-a753-97ad19d0c965" data-name="Fill-3" d="M5.6,8.3a1.9,1.9,0,0,0-2,1.9V43.5a1.9,1.9,0,0,0,2,1.9H57.5a1.8,1.8,0,0,0,1.9-1.9V10.2a1.8,1.8,0,0,0-1.9-1.9ZM5.6,47A3.6,3.6,0,0,1,2,43.5V10.2A3.6,3.6,0,0,1,5.6,6.7H57.5a3.6,3.6,0,0,1,3.6,3.5V43.5A3.6,3.6,0,0,1,57.5,47Z" transform="translate(-1.2 -5.9)" fill="#191919" stroke="#191919" stroke-miterlimit="10" stroke-width="1.5" fill-rule="evenodd"></path></g></g><path id="b507deef-8795-4fd5-ae6f-eef5e1e1f069" data-name="Fill-6" d="M17.5,20.6a4,4,0,1,0,0-8,4.1,4.1,0,0,0-4.2,4,4.1,4.1,0,0,0,4.2,4" transform="translate(-1.2 -5.9)" fill="#fff" fill-rule="evenodd"></path><path id="a907fff4-9127-422f-b521-3e1325551578" data-name="Fill-8" d="M17.5,13.4a3.2,3.2,0,1,0,0,6.4,3.2,3.2,0,1,0,0-6.4m0,8a4.9,4.9,0,0,1-5-4.8,4.8,4.8,0,0,1,5-4.8,4.9,4.9,0,0,1,5,4.8,5,5,0,0,1-5,4.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path></g><g id="f3747952-8c8a-4cdb-a874-bdd2c224271f" data-name="Group-43"><path id="a161e30f-b8ce-4ee7-9aeb-07d804b1e2f4" data-name="Fill-13" d="M11.5,21.1a4.6,4.6,0,0,0,4.7-4.5,4.7,4.7,0,0,0-9.4,0,4.6,4.6,0,0,0,4.7,4.5" transform="translate(-1.2 -5.9)" fill="#0046be" fill-rule="evenodd"></path><path id="e48b6215-ca6d-4663-91b7-fedea9f981cc" data-name="Fill-17" d="M15.3,28.6H8a.8.8,0,0,1-.9-.8A.9.9,0,0,1,8,27h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="baaf3d29-9682-4a19-b171-c40deffc08e9" data-name="Fill-21" d="M12.4,37.1H7.1a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h5.3a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="e54c7df4-9554-4ac8-9104-616f9fcc0369" data-name="Fill-25" d="M23.7,37.1H16.4a.6.6,0,0,1-.6-.5.6.6,0,0,1,.6-.5h7.3a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="f9161f25-116c-47a1-a14b-9da4d3847ac9" data-name="Fill-29" d="M20.7,40.4H7.1a.5.5,0,0,1,0-1H20.7a.5.5,0,0,1,0,1" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="b8f49b7d-6f64-423c-8804-e452d45f72b7" data-name="Fill-33" d="M28.2,28.6H20.9a.8.8,0,0,1-.9-.8.9.9,0,0,1,.9-.8h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="a8ded640-741a-4b2e-a7ed-5912494d3e73" data-name="Fill-37" d="M41.1,28.6H33.8a.8.8,0,0,1-.9-.8.9.9,0,0,1,.9-.8h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="b3519f18-dd9a-4fb3-9b16-b13f5c22227a" data-name="Fill-41" d="M54.2,28.6H46.5a.8.8,0,0,1-.8-.8.9.9,0,0,1,.8-.8h7.7a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path></g></g></g></g></g></g></g><rect x="32.3" y="39.9" width="20" height="17" rx="1" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></rect><path d="M38.6,45.7V40.6a5.1,5.1,0,0,1,10.2,0v5.1" transform="translate(-1.2 -5.9)" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></path><line x1="42.5" y1="47.4" x2="42.5" y2="50" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></line></svg></div><div class="block" style="margin-left: 15px;margin-right: 5px;"> <span class="block" style="font-weight: 600;font-size: 14px;">Escolha como pagar</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Pague sua compra de forma segura com boleto bancário, pix ou cartão de crédito</span></div></div><div class="flex banner"><div> <svg id="a969efb4-3207-4c6f-93c1-c4255184b22c" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" width="54.2" height="57.6" viewBox="0 0 54.2 57.6"><title>reembolso-selo</title><g id="ef0a8b4d-3633-452c-992e-4c8bf9dbed30" data-name="Desktop"><g id="bcbf4a0e-8487-42e3-ae30-4335143bd100" data-name="Home"><g id="bbd4fccf-b7bf-4c99-8a3e-d9f7f83647a5" data-name="Footer"><g id="fb961cd4-9f3d-463f-ade4-933cb504b3b0" data-name="Compra-protegida"><path id="b6b13351-30e0-43b4-ac94-5b662f8771b5" data-name="Shape" d="M26.1,39.2l-5.9-5.9h0a1.1,1.1,0,0,1,0-1.5l1.6-1.7h0a1.1,1.1,0,0,1,1.5,0l3.5,3.5,9.8-9.8h0a1.1,1.1,0,0,1,1.5,0l1.7,1.7h0a1.1,1.1,0,0,1,0,1.5L27.6,39.2h0A1.1,1.1,0,0,1,26.1,39.2Z" transform="translate(-1.9 -3.7)" fill="#0046be"></path><path id="a6fafce5-dc61-4d44-ae46-4d4e067577cd" data-name="Page-1" d="M29,4.9S21.7,15.5,3.7,12.3c0,0-6.3,31,25.3,47.7C60.7,43.3,54.4,12.3,54.4,12.3,36.4,15.5,29,4.9,29,4.9Z" transform="translate(-1.9 -3.7)" fill="none" stroke="#191919" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path></g></g></g></g></svg></div><div class="block" style="margin-left: 15px"> <span class="block" style="font-weight: 600;font-size: 14px;">Segurança do início ao fim</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Nós garantimos a sua entrega ou devolvemos o seu dinheiro</span></div></div></div></div></section>');            console.log('#selos de segurança adicionado');
        console.log('#selos de segurança adicionado');
    });
    /* end:: Selos de segurança */
}

function loading_on_product_page(){
    /* begin:: Converte Select para Botão */
    if(document.querySelector('.product-customizations div.custom-select select')){
        var selects =  document.querySelectorAll('.product-customizations div.custom-select select');
        selects.forEach(function(select, index){
            if(index + 1 < selects.length){
                select.addEventListener('change', function(){
                    var target_select = select.id.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(" ", "-").toLowerCase();
                    if(document.querySelector('.info-'+ target_select)) document.querySelector('.info-'+ target_select).remove();
                    select.parentNode.parentNode.querySelector('label').insertAdjacentHTML('afterend', '<div class="info-'+ target_select +' info-sku-option">'+ select.options[select.selectedIndex].text +'</div>');
                    verifyElement(selects, index + 1);
                });
            }else if(index + 1 == selects.length){
                select.addEventListener('change', function(){
                    var target_select = select.id.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(" ", "-").toLowerCase();
                    if(document.querySelector('.info-'+ target_select)) document.querySelector('.info-'+ target_select).remove();
                    select.parentNode.parentNode.querySelector('label').insertAdjacentHTML('afterend', '<div class="info-'+ target_select +' info-sku-option">'+ select.options[select.selectedIndex].text +'</div>');
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
    /* end:: Converte Select para Botão */


    /* begin:: Informação de estoque */
    if(document.querySelector('.main-product-info .holder-flags .flag')){
        document.querySelector('.main-product-info .main-product-prices').insertAdjacentHTML('afterend', '<div class="section-estoque" style="margin-bottom: 23px;"><div style="font-size: 1rem; line-height: 1; font-weight: 600; color: rgb(87, 87, 87);">Estoque</div><div style="margin-top: 2px;display: flex;"><span style="font-size: 50px;line-height: 0;margin-right: 10px;color: #e93639;">.</span> <span class="unidades-disponiveis" style="margin-top: 5px;font-weight: 600;font-size: 13px;color: #e93639;">Poucas unidades disponíveis</span></div></div>');
    }else{
        document.querySelector('.main-product-info .main-product-prices').insertAdjacentHTML('afterend', '<div class="section-estoque" style="margin-bottom: 23px;"><div style="font-size: 1rem; line-height: 1; font-weight: 600; color: rgb(87, 87, 87);">Estoque</div><div style="margin-top: 2px; display: flex; color: #3bb54a;"><span style="font-size: 50px;line-height: 0;margin-right: 10px;color: #379543;">.</span> <span style="margin-top: 5px; font-weight: 600; font-size: 13px;">Produto em estoque</span></div></div>');
    }
    console.log('#informação de estoque adicionado');
    /* end:: Informação de estoque */
  
    /* begin:: Adição de gatilho de escassez */
    if(document.querySelector('.main-product-info .holder-flags .flag')){
        document.querySelector('.main-product-info .main-product-inventory-countdown').style.display = 'block';
        function verificaUnidades(){
            setTimeout(function(){
                if(parseInt(document.querySelector('.main-product-inventory-countdown .quantity-left').innerText) > 2){
                    document.querySelector('.section-estoque .unidades-disponiveis').innerText = 'Apenas '+ document.querySelector('.main-product-inventory-countdown .quantity-left').innerText +' unidades em estoque';
                    verificaUnidades();
                }else{
                    document.querySelector('.section-estoque .unidades-disponiveis').innerText = 'Apenas 2 unidades em estoque';
                }
            }, 5000);
        }
        verificaUnidades();
    }
    console.log('#informações de escassez adicionado');
    /* end:: Adição de gatilho de escassez */
    
    /* begin:: Informação do frete */
    document.querySelector('.main-product-info .main-product-buy-button-holder').insertAdjacentHTML('beforebegin', '<div style="height: fit-content;margin-bottom: 12px;margin-top: 0px;" class="shipping-preview-line"> <div style="margin-top: 3px;display: flex;position: absolute;width: fit-content;"> <svg xmlns="http://www.w3.org/2000/svg" class="product-info-shipping-icon" width="18" height="15" viewBox="0 0 18 15" style="width: 19px;height: 16px;"><path fill-rule="nonzero" d="M7.763 12.207a2.398 2.398 0 0 1-4.726 0H1.8a1.8 1.8 0 0 1-1.8-1.8V2.195a1.8 1.8 0 0 1 1.8-1.8h8.445a1.8 1.8 0 0 1 1.8 1.8v.568l3.322.035L18 6.821v5.386h-2.394a2.398 2.398 0 0 1-4.727 0H7.763zm-.1-1.2h3.182V2.195a.6.6 0 0 0-.6-.6H1.8a.6.6 0 0 0-.6.6v8.212a.6.6 0 0 0 .6.6h1.337a2.399 2.399 0 0 1 4.526 0zm7.843 0H16.8V7.179l-2.086-3.187-2.669-.029v5.76a2.399 2.399 0 0 1 3.461 1.284zm-2.263 1.99a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396zm-7.843 0a1.198 1.198 0 1 0 0-2.395 1.198 1.198 0 0 0 0 2.396z"></path></svg> </div><p class="shipping-preview-loading" style="padding: 0px 0px 0px 30px;text-align: left !important;color: rgb(74, 74, 74) !important; font-size: 13px !important;">Carregando, aguarde...</p><p style="text-align: left !important;color: #4a4a4a !important;padding: 0 0 0 30px;font-size: 13px !important;" class="custom-address"></p><p style="text-align: left !important;color: #4a4a4a !important;padding: 5px 0 0 30px;font-size: 13px !important;" class="shipping-estimated"></p></div>');
    console.log('#informação do frete adicionado');
    /* end:: Informação do frete */
    
    /* begin:: Estimativa de entrega */
    function convertDate(e){var t, o=new Date(e);return[(t=o.getDate(),t<10?"0"+t:t)].join("/");}
    function getMesExtenso(e){var t=new Array(12);return t[0]="janeiro",t[1]="fevereiro",t[2]="março",t[3]="abril",t[4]="maio",t[5]="junho",t[6]="julho",t[7]="agosto",t[8]="setembro",t[9]="outubro",t[10]="novembro",t[11]="dezembro",t[e];}
    function getJSON(n,e){var s=new XMLHttpRequest;s.open("GET",n,!0),s.responseType="json",s.onload=function(){var n=s.status;e(200===n?null:n,s.response)},s.send()};

    var t = new Date, o=t.setDate(t.getDate()+4), n=t.setDate(t.getDate()+2), r=getMesExtenso(t.getMonth());
    if(convertDate(o)>convertDate(n)){
        var a = "<strong>"+ convertDate(n) +"</strong> e <strong>"+ convertDate(o) +" de "+ r +"</strong>";
    }else{
        if(null==(s=getMesExtenso(t.getMonth()+1))) var s=getMesExtenso(t.getMonth()-11);
        a = "<strong>"+convertDate(n)+" de "+ r +"</strong> e <strong>"+ convertDate(o) +" de "+ s +"</strong>";
    }
    getJSON("https://wtfismyip.com/json", function(err, data) {
        if (err === null) {
            var o = (t = data.YourFuckingLocation).replace(", Brazil", "");
            document.querySelector(".custom-address").innerHTML = "<font color='3bb54a'><b>Frete Grátis</b></font> para <strong><font color='3bb54a'>" + o + " e Região</font></strong>";
            document.querySelector(".shipping-estimated").innerHTML = "Entrega estimada entre " + a + ".";
            document.querySelector(".shipping-preview-loading").style.display = "none";
        }
    });
    console.log('#estimativa de entrega adicionado');
    /* end:: Estimativa de entrega */
    
    /* begin:: Mensagem de segurança e garantia */
    document.querySelector('.shipping-preview-line').insertAdjacentHTML('afterend', '<div class="seguranca-e-garantia" style="padding-bottom: 20px"><span style="color: #3bb54a;font-size: 13px;"><i style="vertical-align: middle;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" style="width: 16px;height: 16px;margin: 0 10px 0 0;margin-top: 1px;fill: #248430;"> <defs><style>.b306b133-4171-4324-a7a6-35edefba34cf{fill:#248430}.ee141ce0-902f-4815-8c10-0060f9589c50{fill:#fff}</style></defs><path class="b306b133-4171-4324-a7a6-35edefba34cf" d="M1.3,4.3V3.7h.6A8.9,8.9,0,0,0,7.6,1.3L8,1l.4.3a8.9,8.9,0,0,0,5.7,2.4h.6v.6c0,5.6-2.2,9.2-6.5,10.7H7.8C3.5,13.5,1.3,9.9,1.3,4.3Z" transform="translate(-1.3 -1)"></path><polygon class="ee141ce0-902f-4815-8c10-0060f9589c50" points="5.8 8 8.9 4.4 9.8 5.2 5.8 9.8 3.4 7.4 4.2 6.5 5.8 8"></polygon> </svg></i> Garantia de 30 dias direto em nossa loja</span><br><span style="color: #3bb54a;font-size: 13px;margin-top: 2px;display: block;"><i style="vertical-align: middle;"><svg class="ui-pdp-icon ui-pdp-icon--return ui-pdp-color--GRAY" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" style="width: 16px;height: 12.5px;margin: 0 11px 0 0;margin-top: 1px;fill: #248430;"> <defs><style>.b3af21d8-768b-4f95-980d-3efefd63cdb6{fill:#248430;stroke:#248430;stroke-miterlimit:10}</style></defs><path class="b3af21d8-768b-4f95-980d-3efefd63cdb6" d="M3.6,9.1h7.2a2.7,2.7,0,0,0,0-5.4H8.1V2.5h2.7a3.8,3.8,0,0,1,3.9,3.9,3.9,3.9,0,0,1-3.9,3.9H3.6l2.5,2.4-.9.8L1.3,9.7,5.2,5.8l.9.9L3.6,9.1Z" transform="translate(-0.6 -2)"></path> </svg></i> 7 dias para trocas e devoluções</span></div>');
    console.log('#mensagem de segurança e garantia adicionado');
    /* end:: Mensagem de segurança e garantia */
    
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
    
    /* begin:: Gatilho de número de compras */
    if(document.querySelector('.main-product-info .holder-flags .flag')){
        var numero_maximo = 28, numero_minimo = 12;
        document.querySelector('h1.main-product-name').insertAdjacentHTML('afterend', '<style type="text/css">@-webkit-keyframes fade-in{0%{opacity:0;height: 0px}100%{opacity:1;height: auto}}@keyframes fade-in{0%{opacity:0;height: 0px}100%{opacity:1;height: auto}}</style> <div style="display: block;visibility: visible;position: relative;height: auto;-webkit-animation:fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) 5s both;animation:fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) 5s both"><div><div style="background-color: rgb(255, 255, 255) !important; background-image: none !important; background-size: 100% 100% !important; border-width: 0px !important; border-style: none !important; border-color: rgb(0, 0, 0) !important; border-radius: 0px !important; position: relative; display: inline-block;padding-top:15px;width: 100%;"><div style="align-items: stretch;display: flex;position: relative;"><div><div style="background-color: rgb(255, 255, 255) !important;align-content: center;align-items: center;align-self: stretch;display: flex;height: 100%;justify-content: center;min-height: 40px;min-width: 40px;overflow: hidden;width: inherit;"> <img src="//images.yampi.me/assets/stores/lojashiper/uploads/banners/6158b12003fb7.png"style="height: 41px !important;"></div></div><div style="align-self: center;color: #3c3c3c;font-size: 13px;font-style: normal;font-weight: 400;line-height: normal;max-height: 100px;overflow: hidden;padding: 10px 30px 10px 10px;text-align: left;width: 100%;word-wrap: break-word;"><div><div style="white-space: normal;"><span>'+ Math.floor(Math.random() * (numero_maximo - numero_minimo + 1) + numero_minimo) +'</span>&nbsp;<span style="font-weight: bold;">pessoas</span> compraram este produto nas últimas 24h!</div></div></div><div style="align-items: center;border-style: none !important;display: flex;font-family: sans-serif;font-weight: 100;height: 10px;justify-content: center;line-height: 10px;position: absolute;right: 10px;top: 10px;width: 10px;z-index: 2147483647;"><div onclick="javascript:this.parentNode.parentNode.parentNode.parentNode.parentNode.remove()" style="cursor: pointer;font-size: 20px;text-align: center;width: 28px;"> <span>×</span></div></div></div></div></div></div>');
        console.log('#gatilho de compras adicionado');
    }
    /* end:: Gatilho de número de compras */
    
    /* begin:: Selos de segurança */
    checkElement('.footer').then((selector) => {
        document.querySelector('.footer').insertAdjacentHTML('beforebegin', '<section class="selos-seguranca banner-3" style="margin-bottom: -30px;margin-top: 50px;"><div class="holder-banner-3 container relative"><div class="flex"><div class="flex banner"><div> <svg id="b9fc2764-b1ea-4f95-950c-34e5a7681c67" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" width="60.5" height="53.3" viewBox="0 0 60.5 53.3"><title>receba-em-casa-selo</title><g id="a85833d7-f191-4087-a6d1-2e34f6109de5" data-name="Desktop"><g id="b9d3a989-89f8-40c4-bed8-1a361304dc07" data-name="Home V1"><g id="a73b2c51-d21e-4683-80d6-5980a02a62f2" data-name="Footer"><g id="f5a7fd43-ebc4-42fc-925e-0fe0a95e2a50" data-name="Group-41"><g id="e02249f4-a6b0-4cb9-8d2d-ee6c0b1b53b0" data-name="Envio"><g id="bd212004-d75a-4b2e-b024-b7a0fc88f57a" data-name="Group-16"><rect id="e8093c93-6b5d-4f2d-a6b0-bbabb294a49a" data-name="Rectangle-193" x="1.3" y="1.3" width="58" height="10.44" rx="2" fill="none" stroke="#191919" stroke-width="2.5"></rect><path id="af90b712-6651-40e4-87cf-69f9ab214a0b" data-name="Rectangle-194" d="M5.1,18.9H57.9v39h0a1.3,1.3,0,0,1-1.3,1.4H6.5a1.4,1.4,0,0,1-1.4-1.4Z" transform="translate(-1.8 -7.2)" fill="none" stroke="#191919" stroke-width="2.5"></path><polygon id="aca30934-6164-4025-80a4-1bfb327ecf9e" data-name="Fill-9" points="24.9 23.3 26.6 21.5 28.4 23.3 30.2 21.5 31.9 23.3 33.7 21.5 35.4 23.3 35.4 10.9 24.9 10.9 24.9 23.3" fill="#0046be" fill-rule="evenodd"></polygon><rect id="e3637387-6aa1-4c69-8d5a-addf5d5446c1" data-name="Rectangle-195" x="24.9" y="0.5" width="10.5" height="11.19" fill="#0046be"></rect><g id="bc64bbe0-cc8b-45b1-86a2-8177eecb457a" data-name="Group-12"><path id="af4d7e3b-fe61-4335-8a93-13534d82f509" data-name="Fill-15" d="M30.8,54.6H11a.5.5,0,0,1-.5-.5V43.4a.6.6,0,0,1,.5-.6H30.8a.6.6,0,0,1,.5.6V54.1a.5.5,0,0,1-.5.5" transform="translate(-1.8 -7.2)" fill="#fff" stroke="#191919" stroke-width="2" fill-rule="evenodd"></path><path id="ef7ee9e2-4be7-424a-8210-ff3809696cec" data-name="Fill-16" d="M15.4,48.8a.8.8,0,0,1-.7-.3.7.7,0,0,1-.2-.6.9.9,0,1,1,.9.9m0-3.3a2.5,2.5,0,0,0-2.5,2.4,2.5,2.5,0,0,0,.4,1.3L15.4,52l2.1-2.8a2.5,2.5,0,0,0,.4-1.3,2.5,2.5,0,0,0-2.5-2.4" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="a6e827d9-886d-4320-b5a4-fabbe4b15f43" data-name="Fill-17" d="M20.4,46.8H27a.7.7,0,0,0,.7-.7h0a.7.7,0,0,0-.7-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,46.8Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="a76236e7-1ad2-4da4-867a-58ece364c223" data-name="Fill-18" d="M20.4,49.4H25a.7.7,0,0,0,.7-.7h0a.7.7,0,0,0-.7-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,49.4Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="ee216a4c-af5a-4c6f-9781-632363913652" data-name="Fill-19" d="M20.4,52h5.3a.7.7,0,0,0,.6-.7h0a.6.6,0,0,0-.6-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,52Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path></g></g></g></g></g></g></g></svg></div><div class="block" style="margin-left: 15px;margin-right: 5px;"> <span class="block" style="font-weight: 600;font-size: 14px;">Compre online e receba em casa</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Envio imediato com código de rastreamento para você acompanhar o seu pedido</span></div></div><div class="flex banner"><div> <svg id="bb51f0a5-15c5-4de7-9e0e-37b89194541c" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60.6" height="58.4" viewBox="0 0 60.6 58.4"><defs><mask id="a8dcdce0-cf35-40c8-811e-ad1d7548ce30" x="0" y="0" width="60.59" height="41.81" maskUnits="userSpaceOnUse"><g transform="translate(-1.2 -5.9)"><g id="a565e7c0-7f02-4ebd-a32c-1ed050b238f8" data-name="mask-2"><polygon id="a4ddd7de-6f9e-4b63-ba4c-28c88f5e9a4b" data-name="path-1" points="61.1 47 2 47 2 6.7 61.1 6.7 61.1 47" fill="#fff" fill-rule="evenodd"></polygon></g></g></mask></defs><title>pagamento-seguro-selo</title><g id="e5706853-e815-4df2-a8d5-006759ddc413" data-name="Desktop"><g id="ed3a7d9d-ca1f-44f2-b238-b295dcd0f013" data-name="Home V1"><g id="adee5aaa-0a9f-4cd7-98b0-f29a0037169e" data-name="Footer"><g id="a1736b67-db1e-4751-b60a-cfdc37654e68" data-name="Group-42"><g id="b4bd78e5-f2ea-431c-9f4c-1b00572e2c4b" data-name="Pago"><g id="a01625a5-ce8d-47da-a08d-4fa09bab8700" data-name="Group-17"><g id="aeeb611b-06ec-4812-8738-b1acfa7af3f4" data-name="Group-10"><path id="a35595c8-3f46-425c-9b99-32d174fe9eb8" data-name="Fill-1" d="M2.8,10.2A2.7,2.7,0,0,1,5.6,7.5H57.5a2.8,2.8,0,0,1,2.8,2.7V43.5a2.8,2.8,0,0,1-2.8,2.7H5.6a2.7,2.7,0,0,1-2.8-2.7Z" transform="translate(-1.2 -5.9)" fill="#fff" fill-rule="evenodd"></path><g id="adb801d1-799e-4548-b13c-7480cc21dac1" data-name="Group-5"><g mask="url(#a8dcdce0-cf35-40c8-811e-ad1d7548ce30)"><path id="aad36856-9b8f-4866-a753-97ad19d0c965" data-name="Fill-3" d="M5.6,8.3a1.9,1.9,0,0,0-2,1.9V43.5a1.9,1.9,0,0,0,2,1.9H57.5a1.8,1.8,0,0,0,1.9-1.9V10.2a1.8,1.8,0,0,0-1.9-1.9ZM5.6,47A3.6,3.6,0,0,1,2,43.5V10.2A3.6,3.6,0,0,1,5.6,6.7H57.5a3.6,3.6,0,0,1,3.6,3.5V43.5A3.6,3.6,0,0,1,57.5,47Z" transform="translate(-1.2 -5.9)" fill="#191919" stroke="#191919" stroke-miterlimit="10" stroke-width="1.5" fill-rule="evenodd"></path></g></g><path id="b507deef-8795-4fd5-ae6f-eef5e1e1f069" data-name="Fill-6" d="M17.5,20.6a4,4,0,1,0,0-8,4.1,4.1,0,0,0-4.2,4,4.1,4.1,0,0,0,4.2,4" transform="translate(-1.2 -5.9)" fill="#fff" fill-rule="evenodd"></path><path id="a907fff4-9127-422f-b521-3e1325551578" data-name="Fill-8" d="M17.5,13.4a3.2,3.2,0,1,0,0,6.4,3.2,3.2,0,1,0,0-6.4m0,8a4.9,4.9,0,0,1-5-4.8,4.8,4.8,0,0,1,5-4.8,4.9,4.9,0,0,1,5,4.8,5,5,0,0,1-5,4.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path></g><g id="f3747952-8c8a-4cdb-a874-bdd2c224271f" data-name="Group-43"><path id="a161e30f-b8ce-4ee7-9aeb-07d804b1e2f4" data-name="Fill-13" d="M11.5,21.1a4.6,4.6,0,0,0,4.7-4.5,4.7,4.7,0,0,0-9.4,0,4.6,4.6,0,0,0,4.7,4.5" transform="translate(-1.2 -5.9)" fill="#0046be" fill-rule="evenodd"></path><path id="e48b6215-ca6d-4663-91b7-fedea9f981cc" data-name="Fill-17" d="M15.3,28.6H8a.8.8,0,0,1-.9-.8A.9.9,0,0,1,8,27h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="baaf3d29-9682-4a19-b171-c40deffc08e9" data-name="Fill-21" d="M12.4,37.1H7.1a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h5.3a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="e54c7df4-9554-4ac8-9104-616f9fcc0369" data-name="Fill-25" d="M23.7,37.1H16.4a.6.6,0,0,1-.6-.5.6.6,0,0,1,.6-.5h7.3a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="f9161f25-116c-47a1-a14b-9da4d3847ac9" data-name="Fill-29" d="M20.7,40.4H7.1a.5.5,0,0,1,0-1H20.7a.5.5,0,0,1,0,1" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="b8f49b7d-6f64-423c-8804-e452d45f72b7" data-name="Fill-33" d="M28.2,28.6H20.9a.8.8,0,0,1-.9-.8.9.9,0,0,1,.9-.8h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="a8ded640-741a-4b2e-a7ed-5912494d3e73" data-name="Fill-37" d="M41.1,28.6H33.8a.8.8,0,0,1-.9-.8.9.9,0,0,1,.9-.8h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="b3519f18-dd9a-4fb3-9b16-b13f5c22227a" data-name="Fill-41" d="M54.2,28.6H46.5a.8.8,0,0,1-.8-.8.9.9,0,0,1,.8-.8h7.7a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path></g></g></g></g></g></g></g><rect x="32.3" y="39.9" width="20" height="17" rx="1" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></rect><path d="M38.6,45.7V40.6a5.1,5.1,0,0,1,10.2,0v5.1" transform="translate(-1.2 -5.9)" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></path><line x1="42.5" y1="47.4" x2="42.5" y2="50" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></line></svg></div><div class="block" style="margin-left: 15px;margin-right: 5px;"> <span class="block" style="font-weight: 600;font-size: 14px;">Escolha como pagar</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Pague sua compra de forma segura com boleto bancário, pix ou cartão de crédito</span></div></div><div class="flex banner"><div> <svg id="a969efb4-3207-4c6f-93c1-c4255184b22c" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" width="54.2" height="57.6" viewBox="0 0 54.2 57.6"><title>reembolso-selo</title><g id="ef0a8b4d-3633-452c-992e-4c8bf9dbed30" data-name="Desktop"><g id="bcbf4a0e-8487-42e3-ae30-4335143bd100" data-name="Home"><g id="bbd4fccf-b7bf-4c99-8a3e-d9f7f83647a5" data-name="Footer"><g id="fb961cd4-9f3d-463f-ade4-933cb504b3b0" data-name="Compra-protegida"><path id="b6b13351-30e0-43b4-ac94-5b662f8771b5" data-name="Shape" d="M26.1,39.2l-5.9-5.9h0a1.1,1.1,0,0,1,0-1.5l1.6-1.7h0a1.1,1.1,0,0,1,1.5,0l3.5,3.5,9.8-9.8h0a1.1,1.1,0,0,1,1.5,0l1.7,1.7h0a1.1,1.1,0,0,1,0,1.5L27.6,39.2h0A1.1,1.1,0,0,1,26.1,39.2Z" transform="translate(-1.9 -3.7)" fill="#0046be"></path><path id="a6fafce5-dc61-4d44-ae46-4d4e067577cd" data-name="Page-1" d="M29,4.9S21.7,15.5,3.7,12.3c0,0-6.3,31,25.3,47.7C60.7,43.3,54.4,12.3,54.4,12.3,36.4,15.5,29,4.9,29,4.9Z" transform="translate(-1.9 -3.7)" fill="none" stroke="#191919" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path></g></g></g></g></svg></div><div class="block" style="margin-left: 15px"> <span class="block" style="font-weight: 600;font-size: 14px;">Segurança do início ao fim</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Nós garantimos a sua entrega ou devolvemos o seu dinheiro</span></div></div></div></div></section>');            console.log('#selos de segurança adicionado');
        console.log('#selos de segurança adicionado');
    });
    /* end:: Selos de segurança */
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('body').classList.add('script-ella');
    console.log('#iniciando definição de script');

    if(document.body.classList.contains('home')){
        window.addEventListener('load', function(){
            loading_on_home_page();
            loading_on_all_pages();
        });
    }else if(document.body.classList.contains('product')){
        window.addEventListener('load', function(){
            loading_on_product_page();
            loading_on_all_pages();
        });
    }else{
        window.addEventListener('load', function(){            
            loading_on_all_pages();
        });
    }
});
