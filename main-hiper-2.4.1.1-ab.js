const random_model = (Date.now() % 2) ? 'A' : 'B';

const checkElement = async selector => {
    while(document.querySelector(selector) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return document.querySelector(selector);
};

const add_script = function(element, src, callback) {
    var s = document.createElement('script');
    s.setAttribute('src', src);
    s.onload = callback;
    element.appendChild(s);
};

function getJSON(n, e) {
    var s = new XMLHttpRequest;
    s.open("GET", n, !0), s.responseType = "json", s.onload = function() {
        var n = s.status;
        e(200 === n ? null : n, s.response)
    }, s.send()
}

function addView() {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:NYydPTYL/add_view?model=" + random_model, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(response => console.log("Add view: " + response['views']))
        .catch(error => console.log("Error Add view: " + error));
}

function addConversion(link) {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:NYydPTYL/add_conversion?model=" + random_model, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(response => console.log("Add conversion: " + response['conversions']))
        .catch(error => console.log("Error Add conversion: " + error))
        .finally(() => {
            window.location.href = link;
        });
}

const createBuyButton = (element, parent_element, link_button, eventFunction) => {
    const href_button = (link_button == '#') ? '' : link_button;
    if(element) {
        if(!parent_element.querySelector('.buy-button-custom')) {
            element.classList.add('hidden-button');

            const linkButton = document.createElement('a');
            if(href_button) linkButton.setAttribute('onClick', 'addConversion(\'' + href_button + '\')');

            linkButton.className = 'loader-button btn btn-primary buy-button-custom -clean';
            linkButton.innerHTML = 'Comprar agora <svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg>';

            element.insertAdjacentElement('afterend', linkButton);

            if(eventFunction != null) {
                linkButton.addEventListener('click', async () => {
                    linkButton.classList.add('sending');
                    await eventFunction();
                    linkButton.classList.remove('sending');
                });
            }
        }
    }
};

const createBuyFloatingButton = (element_floating, parent_element, link_button, eventFunction) => {
    const href_button = (link_button == '#') ? '' : link_button;
    if(element_floating) {
        if(!parent_element.querySelector('.buy-floating-button-custom')) {
            element_floating.classList.add('hidden-button');

            const linkButton = document.createElement('a');
            if(href_button) linkButton.setAttribute('onClick', 'addConversion(\'' + href_button + '\')');
            linkButton.className = 'loader-button btn btn-primary buy-floating-button-custom -clean';
            linkButton.style = 'padding: unset';
            linkButton.innerHTML = 'Comprar agora <svg viewBox="0 0 36 8"><circle cx="4" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".1"></animate></circle> <circle cx="18" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".2"></animate></circle> <circle cx="32" cy="4" r="4"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin=".3"></animate></circle></svg>';

            element_floating.insertAdjacentElement('afterend', linkButton);

            if(eventFunction != null) {
                linkButton.addEventListener('click', async () => {
                    linkButton.classList.add('sending');
                    await eventFunction();
                    linkButton.classList.remove('sending');
                });
            }
        }
    }
};

const addBuyButtons = (link_button, eventFunction = null) => {
    const parent_element = document.querySelector('.main-product-buy-button-holder');

    let element = parent_element.querySelector('.main-product-buy-button-holder > button.btn-primary');
    let element_floating = parent_element.querySelector('.main-product-buy-button-holder .floating-button-container button.btn-primary');

    createBuyButton(element, parent_element, link_button, eventFunction);
    createBuyFloatingButton(element_floating, parent_element, link_button, eventFunction);

    return new Promise((resolve) => {
        const observer = new MutationObserver((mutationsList, observer) => {
            observer.disconnect();

            element = parent_element.querySelector('.main-product-buy-button-holder > button.btn-primary');
            createBuyButton(element, parent_element, link_button, eventFunction);

            element_floating = parent_element.querySelector('.main-product-buy-button-holder .floating-button-container button.btn-primary');
            createBuyFloatingButton(element_floating, parent_element, link_button, eventFunction);

            observer.observe(parent_element, {
                childList: true,
                subtree: true
            });
        });

        observer.observe(parent_element, {
            childList: true,
            subtree: true
        });
    });
};

const createDestiny = (destiny_mode, destiny_option, sku_product, utm_params, variations_length, random_option_number) => {
    const default_buy_button = document.querySelector('.main-product-buy-button-holder > button.btn-primary');

    if(destiny_option == 'ADO') {
        if(variations_length) {
            const dynamic_sku = document.querySelector('.reference-availability .main-product-reference span').innerText;
            const sku_product_dynamic = (destiny_mode == 'TEAB') ? dynamic_sku.split('-')[random_option_number] : dynamic_sku;
            const destiny_url = 'https://compra.lojashiper.com/v/' + sku_product_dynamic + utm_params;

            const eventClickButton = (destiny_url) => {
                window.location.href = destiny_url;
            }

            addBuyButtons('#', () => {
                console.log('#criando redirecionamento ...');
                eventClickButton(destiny_url);
            });
        } else {
            const destiny_url = 'https://compra.lojashiper.com/v/' + sku_product + utm_params;
            addBuyButtons(destiny_url);
        }

    } else if(destiny_option == 'VEG') {
        if(variations_length) {
            const dynamic_sku = document.querySelector('.reference-availability .main-product-reference span').innerText;
            const sku_product_dynamic = (destiny_mode == 'TEAB') ? dynamic_sku.split('-')[random_option_number] : dynamic_sku;
            const destiny_url = 'https://pay.lojashiper.com/' + sku_product_dynamic + utm_params;

            const eventClickButton = (destiny_url) => {
                window.location.href = destiny_url;
            }

            addBuyButtons('#', () => {
                console.log('#criando redirecionamento ...');
                eventClickButton(destiny_url);
            });
        } else {
            const destiny_url = 'https://pay.lojashiper.com/' + sku_product + utm_params;
            addBuyButtons(destiny_url);
        }

    } else if(destiny_option == 'SUI') {
        if(variations_length) {
            const dynamic_sku = document.querySelector('.reference-availability .main-product-reference span').innerText;
            const sku_product_dynamic = (destiny_mode == 'TEAB') ? dynamic_sku.split('-')[random_option_number] : dynamic_sku;
            const destiny_url = 'https://checkout.suitpay.app/checkout/' + sku_product_dynamic + utm_params;

            const eventClickButton = (destiny_url) => {
                window.location.href = destiny_url;
            }

            addBuyButtons('#', () => {
                console.log('#criando redirecionamento ...');
                eventClickButton(destiny_url);
            });
        } else {
            const destiny_url = 'https://checkout.suitpay.app/checkout/' + sku_product + utm_params;
            addBuyButtons(destiny_url);
        }

    } else if(destiny_option == 'AVI') {
        if(variations_length) {
            const dynamic_sku = document.querySelector('.reference-availability .main-product-reference span').innerText;
            const sku_product_dynamic = (destiny_mode == 'TEAB') ? dynamic_sku.split('-')[random_option_number] : dynamic_sku;

            const eventClickButton = (sku_product_dynamic) => {
                buy_button.classList.add('sending');

                fetch("https://api-checkout.avizz.com.br/checkout/lojas-hiper-checkout-avizz.myshopify.com", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "currency": "BRL",
                            "item_count": 1,
                            "requires_shipping": false,
                            "items": [{
                                "id": sku_product_dynamic.split(":")[0],
                                "variant_id": sku_product_dynamic.split(":")[0],
                                "product_id": sku_product_dynamic.split(":")[1],
                                "quantity": 1,
                                "product_has_only_default_variant": true,
                                "has_components": false,
                                "taxable": false,
                                "gift_card": false
                            }]
                        }),
                        redirect: 'follow'
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        const destiny_url = data['checkoutUrl'].includes('?') ? data['checkoutUrl'] + utm_params.replace('?', '&') : data['checkoutUrl'] + utm_params;
                        window.location.href = destiny_url;
                    })
                    .catch(err => {
                        default_buy_button.click();
                    });
            }

            addBuyButtons('#', () => {
                console.log('#criando redirecionamento ...');
                eventClickButton(sku_product_dynamic);
            });
        } else {
            fetch("https://api-checkout.avizz.com.br/checkout/lojas-hiper-checkout-avizz.myshopify.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "currency": "BRL",
                        "item_count": 1,
                        "requires_shipping": false,
                        "items": [{
                            "id": sku_product.split(":")[0],
                            "variant_id": sku_product.split(":")[0],
                            "product_id": sku_product.split(":")[1],
                            "quantity": 1,
                            "product_has_only_default_variant": true,
                            "has_components": false,
                            "taxable": false,
                            "gift_card": false
                        }]
                    }),
                    redirect: 'follow'
                })
                .then((response) => response.json())
                .then((data) => {
                    const destiny_url = data['checkoutUrl'].includes('?') ? data['checkoutUrl'] + utm_params.replace('?', '&') : data['checkoutUrl'] + utm_params;
                    addBuyButtons(destiny_url);
                });
        }

    } else if(destiny_option == 'ABM') {
        if(variations_length) {
            const dynamic_sku = document.querySelector('.reference-availability .main-product-reference span').innerText;
            const sku_product_dynamic = (destiny_mode == 'TEAB') ? dynamic_sku.split('-')[random_option_number] : dynamic_sku;

            const eventClickButton = (sku_product_dynamic) => {
                buy_button.classList.add('sending');

                fetch("https://api.abmexpaycheckout.com/checkout/lojas-hiper-checkout-abmex.myshopify.com", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "currency": "BRL",
                            "item_count": 1,
                            "requires_shipping": false,
                            "items": [{
                                "id": sku_product_dynamic.split(":")[0],
                                "variant_id": sku_product_dynamic.split(":")[0],
                                "product_id": sku_product_dynamic.split(":")[1],
                                "quantity": 1,
                                "product_has_only_default_variant": true,
                                "has_components": false,
                                "taxable": false,
                                "gift_card": false
                            }]
                        }),
                        redirect: 'follow'
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        const destiny_url = data['checkoutUrl'].includes('?') ? data['checkoutUrl'] + utm_params.replace('?', '&') : data['checkoutUrl'] + utm_params;
                        window.location.href = destiny_url;
                    })
                    .catch(err => {
                        default_buy_button.click();
                    });
            }

            addBuyButtons('#', () => {
                console.log('#criando redirecionamento ...');
                eventClickButton(sku_product_dynamic);
            });
        } else {
            fetch("https://api.abmexpaycheckout.com/checkout/lojas-hiper-checkout-abmex.myshopify.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "currency": "BRL",
                        "item_count": 1,
                        "requires_shipping": false,
                        "items": [{
                            "id": sku_product.split(":")[0],
                            "variant_id": sku_product.split(":")[0],
                            "product_id": sku_product.split(":")[1],
                            "quantity": 1,
                            "product_has_only_default_variant": true,
                            "has_components": false,
                            "taxable": false,
                            "gift_card": false
                        }]
                    }),
                    redirect: 'follow'
                })
                .then((response) => response.json())
                .then((data) => {
                    const destiny_url = data['checkoutUrl'].includes('?') ? data['checkoutUrl'] + utm_params.replace('?', '&') : data['checkoutUrl'] + utm_params;
                    addBuyButtons(destiny_url);
                });
        }
    }
};

function verifyElement(selects, index) {
    setTimeout(function() {
        if(selects[index].length > 1) {
            selects[index].selectedIndex = 1;
            selects[index].dispatchEvent(new Event('change'));
        } else verifyElement(selects, index);
    }, 50);
}

function clickButtonSelect(button, index) {
    var target = button.getAttribute('data-target');
    document.querySelectorAll('.selectbtn.target-' + target).forEach(function(option) {
        option.classList.remove('selected');
    });
    button.classList.add('selected');

    document.querySelector('.product-customizations div.custom-select select[name="' + button.getAttribute('data-target') + '"]').value = button.getAttribute('data-value');
    document.querySelector('.product-customizations div.custom-select select[name="' + button.getAttribute('data-target') + '"]').dispatchEvent(new Event('change'));

    document.querySelectorAll('.product-customizations div.custom-select select').forEach(function(select, i) {
        if(i > index) waitElementToReplace(select, i);
    });
}

function ReplaceSelectWithButtons(selectField, index) {
    var selectValue = selectField.value;
    var selectId = selectField.id;
    var imageReduceYampi = 'https://images.yampi.io/unsafe/fit-in/60x60/filters:background_color(white):upscale()/';

    document.querySelectorAll('.product-customizations div.custom-select div[data-target="' + selectId + '"]').forEach(function(select) {
        select.remove();
    });

    var options = selectField.querySelectorAll('option');
    if(selectId.toLowerCase().includes('kit') || selectId.toLowerCase().includes('kits')) {
        options.forEach(function(button) {
            if(button.value != 0 && button.value) {
                var topMessageBadge = '',
                    topDiscountBadge = '',
                    discountMessageBadge = '',
                    oldPriceProduct = '',
                    marginBottom = 'mb-20';
                selectField.parentNode.parentNode.classList.add("sku-selectkit");
                var buttonOrder = window.data.product.data.skus.data.find(element => element.variations.find(element => element.value_id == button.value)).order;
                var priceSale = window.data.product.data.skus.data.find(element => element.variations.find(element => element.value_id == button.value)).price_sale;
                var priceDiscount = window.data.product.data.skus.data.find(element => element.variations.find(element => element.value_id == button.value)).price_discount;
                if(buttonOrder == 1) {
                    topMessageBadge = '<div class="kit-mostsell-badge">Mais Vendido</div>';
                    if(priceDiscount) {
                        topDiscountBadge = '<div class="kit-discount-badge">-' + ((1 - priceDiscount / priceSale).toFixed(2) * 100) + '%</div>';
                        discountMessageBadge = '<div class="kit-save-badge"> <span>Economize</span> <strong>R$ ' + (priceSale - priceDiscount).toString().replace('.', ',') + '</strong> </div>'
                    }
                } else if(buttonOrder == 2) {
                    topMessageBadge = '<div class="kit-moreeconomy-badge">Maior Economia</div>';
                    marginBottom = 'mb-5';
                    if(priceDiscount) {
                        topDiscountBadge = '<div class="kit-discount-badge">-' + ((1 - priceDiscount / priceSale).toFixed(2) * 100) + '%</div>';
                        discountMessageBadge = '<div class="kit-save-badge"> <span>Economize</span> <strong>R$ ' + (priceSale - priceDiscount).toString().replace('.', ',') + '</strong> </div>'
                    }
                }
                if(priceDiscount) oldPriceProduct = '<div class="kit-old-value-price">R$ ' + priceSale.toFixed(2).toString().replace('.', ',') + '</div>';
                var priceShowProduct = (priceDiscount) ? priceDiscount.toFixed(2).toString().replace('.', ',') : priceSale.toFixed(2).toString().replace('.', ',');
                var buttonDataImages = window.data.product.data.skus.data.find(element => element.variations.find(element => element.value_id == button.value)).images.data;
                var buttonImage = buttonDataImages[0].url;
                if(buttonOrder == 0) buttonImage = buttonDataImages[buttonDataImages.length - 1].url;
                var buttonImageLink = "'" + imageReduceYampi + buttonImage + "'";
                var selectedButton = (button.value == selectValue) ? 'selected' : '';
                selectField.insertAdjacentHTML('beforebegin', '<div data-value="' + +button.value + '" data-target="' + selectId + '" class="selectbtn selectkitbtn ' + marginBottom + ' target-' + selectId + ' ' + selectedButton + '" onclick="clickButtonSelect(this,' + index + ')"><div class="kit-item"> <div class="kit-content-left"> <div class="kit-product-image-wrapper" style="background-image: url(' + buttonImageLink + ')"></div> <div class="kit-quantity"> ' + topMessageBadge + ' <div class="kit-item-title-badge"> <div class="kit-item-title">' + button.innerText + '</div> ' + discountMessageBadge + ' </div> </div> </div> <div class="kit-content-right"> ' + topDiscountBadge + ' <div class="kit-comparation-prices"> ' + oldPriceProduct + ' <div class="kit-new-value-price">R$ ' + priceShowProduct + '</div> </div> </div> </div></div>');
            }
        });
    } else if(selectId.toLowerCase().includes('cor') || selectId.toLowerCase().includes('cores')) {
        options.forEach(function(button) {
            if(button.value != 0 && button.value) {
                var buttonOrder = window.data.product.data.skus.data.find(element => element.variations.find(element => element.value_id == button.value)).order;
                var buttonDataImages = window.data.product.data.skus.data.find(element => element.variations.find(element => element.value_id == button.value)).images.data;
                var buttonImage = buttonDataImages[0].url;
                if(buttonOrder == 0) buttonImage = buttonDataImages[buttonDataImages.length - 1].url;
                var buttonImageLink = "'" + imageReduceYampi + buttonImage + "'";
                var selectedButton = (button.value == selectValue) ? 'selected' : '';
                selectField.insertAdjacentHTML('beforebegin', '<div data-value="' + +button.value + '" data-target="' + selectId + '" class="selectbtn selectroundbtn target-' + selectId + ' ' + selectedButton + '" onclick="clickButtonSelect(this,' + index + ')" style="background-image: url(' + buttonImageLink + ')"></div>');
            }
        });
    } else {
        options.forEach(function(button) {
            if(button.value != 0 && button.value) {
                var selectedButton = (button.value == selectValue) ? 'selected' : '';
                selectField.insertAdjacentHTML('beforebegin', '<div data-value="' + +button.value + '" data-target="' + selectId + '" class="selectbtn target-' + selectId + ' ' + selectedButton + '" onclick="clickButtonSelect(this,' + index + ')">' + button.innerText + '</div>');
            }
        });
    }
    selectField.style.display = 'none';
    selectField.parentNode.querySelector('svg.icon-select-arrow').style.display = 'none';
}

function waitElementToReplace(select, index) {
    setTimeout(function() {
        if(select.value != 0) {
            ReplaceSelectWithButtons(select, index);
        } else waitElementToReplace(select, index);
    }, 50);
}

function loading_on_all_pages() {
    window.addEventListener('load', function() {
        checkElement('#app .header-content .logo').then((selector) => {
            document.querySelector('.header-content .logo').addEventListener('click', function(his, event) {
                if(his.target.parentElement.classList.contains('opened')) {
                    if(his.clientX > 60 && his.clientX < 80) {
                        document.querySelector('.header-content').classList.remove('opened');
                        document.querySelector('.header-content .holder-search').style.display = 'none';
                    }
                } else {
                    if(his.clientX > 60 && his.clientX < 80) {
                        document.querySelector('.header-content').classList.add('opened');
                        document.querySelector('.header-content .holder-search').style.animation = 'slide-bottom .5s cubic-bezier(.25,.46,.45,.94) both';
                        document.querySelector('.header-content .holder-search').style.display = 'block';
                    }
                }
            });

            document.querySelector('.header .header-hightlightbar .container').addEventListener('click', function(his, event) {
                if(his.offsetX <= (his.target.offsetWidth + 15) && his.offsetX > (his.target.offsetWidth - 15)) {
                    his.target.parentNode.remove();
                }
            });
        });
    });
}

function loading_on_home_page() {
    window.addEventListener('load', function() {
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

function loading_on_product_page(model) {
    /* begin:: Converte Select para Botão */
    checkElement('#app .product-customizations').then((selector) => {
        if(document.querySelector('.product-customizations div.custom-select select')) {
            var selects = document.querySelectorAll('.product-customizations div.custom-select select');
            selects.forEach(function(select, index) {
                if(index + 1 < selects.length) {
                    select.addEventListener('change', function() {
                        if(document.querySelector('div[class="info-' + select.id + ' info-sku-option"]')) document.querySelector('div[class="info-' + select.id + ' info-sku-option"]').remove();
                        select.parentNode.parentNode.querySelector('label').insertAdjacentHTML('afterend', '<div class="info-' + select.id + ' info-sku-option">' + select.options[select.selectedIndex].text + '</div>');
                        verifyElement(selects, index + 1);
                    });
                } else if(index + 1 == selects.length) {
                    select.addEventListener('change', function() {
                        if(document.querySelector('div[class="info-' + select.id + ' info-sku-option"]')) document.querySelector('div[class="info-' + select.id + ' info-sku-option"]').remove();
                        select.parentNode.parentNode.querySelector('label').insertAdjacentHTML('afterend', '<div class="info-' + select.id + ' info-sku-option">' + select.options[select.selectedIndex].text + '</div>');
                    });
                }
            }, {
                once: true
            });
            selects[0].selectedIndex = 1;
            selects[0].dispatchEvent(new Event('change'));

            document.querySelectorAll('.product-customizations div.custom-select select').forEach(function(select, index) {
                waitElementToReplace(select, index);
            });
            console.log('#conversão de selects para botões adicionado');
        }
    });
    /* end:: Converte Select para Botão */

    /* begin:: Número de produtos vendidos */
    checkElement('.main-product-reference').then((selector) => {
        document.querySelector('.reference-availability').insertAdjacentHTML('beforeend', '<span class="main-products-sold">Novo | ' + parseInt(document.querySelector('.product .actual-price').innerText.split(' ')[1].replace(',', '.')) * 77 + ' Vendidos</span>');
        console.log('#numero de produtos vendidos adicionado');
    });
    /* end:: Número de produtos vendidos */

    checkElement('.main-product-info').then((selector) => {
        /* begin:: Informação de estoque */
        if(document.querySelector('.main-product-info .holder-flags .flag')) {
            document.querySelector('.main-product-info .main-product-prices').insertAdjacentHTML('afterend', '<div class="section-estoque" style="margin-bottom: 23px;"><div style="font-size: 1rem; line-height: 1; font-weight: 600; color: rgb(87, 87, 87);">Estoque</div><div style="margin-top: 2px;display: flex;"><span style="font-size: 50px;line-height: 0;margin-right: 10px;color: #e93639;">.</span> <span class="unidades-disponiveis" style="margin-top: 5px;font-weight: 600;font-size: 13px;color: #e93639;">Poucas unidades disponíveis</span></div></div>');
        } else {
            document.querySelector('.main-product-info .main-product-prices').insertAdjacentHTML('afterend', '<div class="section-estoque" style="margin-bottom: 23px;"><div style="font-size: 1rem; line-height: 1; font-weight: 600; color: rgb(87, 87, 87);">Estoque</div><div style="margin-top: 2px; display: flex; color: #3bb54a;"><span style="font-size: 50px;line-height: 0;margin-right: 10px;color: #379543;">.</span> <span style="margin-top: 5px; font-weight: 600; font-size: 13px;">Produto em estoque</span></div></div>');
        }
        console.log('#informação de estoque adicionado');
        /* end:: Informação de estoque */
    });

    checkElement('.main-product-info .main-product-inventory-countdown').then((selector) => {
        /* begin:: Adição de gatilho de escassez */
        if(document.querySelector('.main-product-info .holder-flags .flag')) {
            if((Array.from(document.querySelectorAll('.main-product-info .holder-flags .flag')).filter(e => e.innerText.includes('OFERTA')).length) && (window.location.href.search("[?&]utm_source=") != -1)) {
                document.querySelector('.main-product-info .main-product-inventory-countdown').style.display = 'block';
                const product_quatity_left = document.querySelector('.main-product-inventory-countdown .quantity-left');
                const observer_product_left = new MutationObserver(function(mutationsList, observer_product_left) {
                    if(parseInt(product_quatity_left.innerText) > 2) {
                        document.querySelector('.section-estoque .unidades-disponiveis').innerText = 'Apenas ' + product_quatity_left.innerText + ' unidades em estoque';
                    } else {
                        document.querySelector('.section-estoque .unidades-disponiveis').innerText = 'Apenas 2 unidades em estoque';
                    }
                });
                observer_product_left.observe(product_quatity_left, {
                    childList: true,
                    subtree: true
                });
                console.log('#informações de escassez adicionado');
            }
        }
        /* end:: Adição de gatilho de escassez */
    });

    checkElement('.main-product-info .main-product-buy-button-holder').then((selector) => {
        /* begin:: Informação do frete */
        document.querySelector('.main-product-info .main-product-buy-button-holder').insertAdjacentHTML('beforebegin', '<div style="height: fit-content;margin-bottom: 15px;margin-top: 0px;" class="shipping-preview-line"> <div style="margin-top: 4px;display: flex;position: absolute;width: fit-content;"> <svg style="width:20px" viewBox="0 0 31.12 22.72" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a" x1="722.44" x2="663.6" y1="-677.75" y2="-723.73" data-name="Gradiente sem nome 5" gradientTransform="translate(-162.84 -161.66) scale(.25 -.25)" gradientUnits="userSpaceOnUse"><stop stop-color="#fd0" offset="0"/><stop stop-color="#d49f00" offset=".9"/><stop stop-color="#fd0" offset="1"/></linearGradient><linearGradient id="d" x1="723.61" x2="680.81" y1="-724.71" y2="-724.71" data-name="Gradiente sem nome 2" gradientTransform="translate(-162.84 -161.66) scale(.25 -.25)" gradientUnits="userSpaceOnUse"><stop stop-color="#d49f00" offset="0"/><stop stop-color="#ab5808" offset="1"/></linearGradient><linearGradient id="c" x1="709.52" x2="768.41" y1="-711.08" y2="-665.24" data-name="Gradiente sem nome 3" gradientTransform="translate(-162.84 -161.66) scale(.25 -.25)" gradientUnits="userSpaceOnUse"><stop stop-color="#00537e" offset="0"/><stop stop-color="#18aae2" offset=".9"/><stop stop-color="#107bc0" offset="1"/></linearGradient><linearGradient id="b" x1="745.42" x2="720.4" y1="-644.66" y2="-664.21" data-name="Gradiente sem nome 4" gradientTransform="translate(-162.84 -161.66) scale(.25 -.25)" gradientUnits="userSpaceOnUse"><stop stop-color="#002542" offset="0"/><stop stop-color="#004169" offset="1"/></linearGradient></defs><path d="m7.9,22.72h-1c-.8,0-1.52-.38-2-.97L.17,15.67c-.1-.15-.17-.32-.17-.52s.07-.38.17-.52l4.76-6.08c.47-.6,1.17-.97,1.99-.97h10.52l-5.98,7.5-4.36,5.5.8,2.14Z" fill="url(#a)" fill-rule="evenodd"/><path d="m11.54,15.15l-.05-.07-4.38,5.5c-.18.23-.32.52-.32,1.02s.47,1.12,1.42,1.12h9.25l-5.91-7.57Z" fill="url(#d)" fill-rule="evenodd"/><path d="m23.99,2.14l-.8-2.14h1c.8,0,1.52.38,1.99.97l4.76,6.08c.1.15.17.32.17.52s-.07.38-.17.52l-4.79,6.08c-.47.6-1.17.97-1.99.97h-10.52l5.98-7.5,4.36-5.5Z" fill="url(#c)" fill-rule="evenodd"/><path d="m19.58,7.57l.05.07,4.36-5.5c.18-.23.32-.52.32-1.02s-.47-1.12-1.42-1.12h-9.24l5.93,7.57Z" fill="url(#b)" fill-rule="evenodd"/><path d="m24.24,2.04c.17-.22.27-.47.27-.77,0-.7-.57-1.27-1.27-1.27h-.32c.7,0,1.25.57,1.25,1.27,0,.3-.1.57-.28.77l-4.31,5.53-5.91,7.55L24.24,2.04Z" fill="#0bbbef"/><path d="m6.88,20.68c-.17.22-.27.47-.27.77,0,.7.57,1.27,1.27,1.27h.32c-.7,0-1.27-.57-1.27-1.27,0-.3.1-.57.27-.77l4.34-5.53,5.91-7.55-10.57,13.08Z" fill="#ffd500"/></svg> </div><p class="shipping-preview-loading" style="padding: 0px 0px 0px 30px;text-align: left !important;color: rgb(74, 74, 74) !important; font-size: 13px !important;">Carregando, aguarde...</p><p style="text-align: left !important;color: #4a4a4a !important;padding: 0 0 0 30px;font-size: 13px !important;" class="custom-address"></p><p style="text-align: left !important;color: #4a4a4a !important;padding: 5px 0 0 30px;font-size: 13px !important;" class="shipping-estimated"></p></div>');
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

        /* begin:: Barra de informações da loja */
        const numero_maximo = 487,
            numero_minimo = 227;
        document.querySelector('.main-product-info .main-product-buy-button-holder').insertAdjacentHTML('afterend', '<div class="store-info-bar" style="order:8;display:flex;justify-content:space-between;margin-top:15px;padding:10px 0;border:1px solid #e7e7e7;border-radius:10px"><div style="border-right:1px solid #d1d1d1;justify-items:center;flex-basis:100%;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;text-align:center;position:relative;padding:8px"><span style="font-size:22px;font-weight:400">' + Math.floor(Math.random() * (numero_maximo - numero_minimo + 1) + numero_minimo) + '</span><p style="font-size:12px;line-height:1.3;text-align:center;color:#696969;font-weight:400">Produtos entregues nos últimos 7 dias</p></div><div style="justify-items:center;flex-basis:100%;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;text-align:center;position:relative;padding:8px"><span style=""><svg viewBox="0 0 29 24" xmlns="http://www.w3.org/2000/svg" style="width:27px"><g fill-rule="evenodd" fill="none"><path d="M6.747 21.511l4.538-3.518h8.238c1.032 0 1.868-.98 1.868-2.19V3.21c0-1.21-.836-2.19-1.868-2.19H3.173c-1.032 0-1.869.98-1.869 2.19v14.077c0 .39.316.706.706.706H5.61v2.96a.706.706 0 0 0 1.138.558z" stroke-width="1.5" stroke="#333"></path><g transform="translate(14 9)"><circle cx="7.5" cy="7.5" r="7.5" fill="#39B54A"></circle><g stroke-linecap="round" stroke-width="1.059" stroke="#FFF"><path d="M3.75 7.5l2.445 2.445M6.25 9.89L11.14 5"></path></g></g></g></svg></span><p style="font-size:12px;line-height:1.3;text-align:center;color:#696969;font-weight:400">Presta bom atendimento</p></div><div style="border-left:1px solid #d1d1d1;justify-items:center;flex-basis:100%;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;text-align:center;position:relative;padding:8px"><span><svg viewBox="0 0 30 26" xmlns="http://www.w3.org/2000/svg" style="width:27px"><g fill-rule="evenodd" fill="none"><g transform="translate(1 .02)" stroke="#333"><ellipse cx="10.5" cy="13.714" rx="10.5" ry="10.286" stroke-width="1.286"></ellipse><path d="M19.107 13.714h-1.59M3.42 13.714H1.83M10.5 5.143v1.59M10.563 20.571v1.59M10.5.857v2.484M8.75.857h3.637M10.313 8.801v4.944H5.24" stroke-linecap="round" stroke-width="1.102"></path></g><g transform="translate(15 10.02)"><circle cx="7.5" cy="7.5" r="7.5" fill="#39B54A"></circle><g stroke-linecap="round" stroke-width="1.059" stroke="#FFF"><path d="M3.75 7.5l2.445 2.445M6.25 9.89L11.14 5"></path></g></g></g></svg></span><p style="font-size:12px;line-height:1.3;text-align:center;color:#696969;font-weight:400">Entrega os produtos dentro do prazo</p></div></div>');
        console.log('#barra de informações da loja adicionado');
        /* end:: Barra de informações da loja */

        /* begin:: Mudança de destino */
        const utm_params = window.location.search,
            brand_name = window.data['product']['data']['brand']['data']['name'],
            variations_length = window.data['product']['data']['variations']['data']['length'];
        if(brand_name.includes('-')) {
            const destiny_mode = brand_name.split('-')[0],
                sku_product = window.data['product']['data']['sku'];
            if(destiny_mode == 'CHEU') {
                const destiny_option = brand_name.split('-')[1];
                createDestiny(destiny_mode, destiny_option, sku_product, utm_params, variations_length, 0);
            } else if(destiny_mode == 'TEAB') {
                const random_number = Math.floor(Math.random() * 10);
                const random_option_number = (random_number % 2 === 0) ? 0 : 1;
                const destiny_options = [brand_name.split('-')[1], brand_name.split('-')[2]];
                const destiny_option = destiny_options[random_option_number];
                const skus_product = sku_product.split('-');
                const sku_option = skus_product[random_option_number];
                createDestiny(destiny_mode, destiny_option, sku_option, utm_params, variations_length, random_option_number);
            }
        }
        console.log('#mudança de destino adicionado');
        /* end:: Mudança de destino */
    });

    /* begin:: Estimativa de entrega */
    checkElement('.custom-address').then((selector) => {
        getJSON("https://wtfismyip.com/json", function(err, data) {
            if(err === null) {
                var o = (t = data.YourFuckingLocation).replace(", Brazil", "");
                document.querySelector(".custom-address").innerHTML = "<font color='3bb54a'><b>Frete Grátis</b></font> para <strong><font color='3bb54a'>" + o + " e Região</font></strong>";
                document.querySelector(".shipping-estimated").innerHTML = "Envio pelos <strong>Correios©</strong> de <strong>2 à 5 dias</strong>.";
                document.querySelector(".shipping-preview-loading").style.display = "none";
            }
        });
        console.log('#estimativa de entrega adicionado');
    });
    /* end:: Estimativa de entrega */

    /* begin:: Mensagem de segurança e garantia */
    checkElement('.shipping-preview-line').then((selector) => {
        document.querySelector('.shipping-preview-line').insertAdjacentHTML('afterend', '<div class="seguranca-e-garantia" style="padding-bottom: 20px"><span style="color: #3bb54a;font-size: 13px;"><i style="vertical-align: middle;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" style="width: 16px;height: 16px;margin: 0 10px 0 0;margin-top: 1px;fill: #248430;"> <defs><style>.b306b133-4171-4324-a7a6-35edefba34cf{fill:#248430}.ee141ce0-902f-4815-8c10-0060f9589c50{fill:#fff}</style></defs><path class="b306b133-4171-4324-a7a6-35edefba34cf" d="M1.3,4.3V3.7h.6A8.9,8.9,0,0,0,7.6,1.3L8,1l.4.3a8.9,8.9,0,0,0,5.7,2.4h.6v.6c0,5.6-2.2,9.2-6.5,10.7H7.8C3.5,13.5,1.3,9.9,1.3,4.3Z" transform="translate(-1.3 -1)"></path><polygon class="ee141ce0-902f-4815-8c10-0060f9589c50" points="5.8 8 8.9 4.4 9.8 5.2 5.8 9.8 3.4 7.4 4.2 6.5 5.8 8"></polygon> </svg></i><strong>Compra Garantida:</strong> Garantia de 30 dias direto em nossa loja</span><br><span style="color: #3bb54a;font-size: 13px;margin-top: 2px;display: block;"><i style="vertical-align: middle;"><svg class="ui-pdp-icon ui-pdp-icon--return ui-pdp-color--GRAY" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" style="width: 16px;height: 12.5px;margin: 0 11px 0 0;margin-top: 1px;fill: #248430;"> <defs><style>.b3af21d8-768b-4f95-980d-3efefd63cdb6{fill:#248430;stroke:#248430;stroke-miterlimit:10}</style></defs><path class="b3af21d8-768b-4f95-980d-3efefd63cdb6" d="M3.6,9.1h7.2a2.7,2.7,0,0,0,0-5.4H8.1V2.5h2.7a3.8,3.8,0,0,1,3.9,3.9,3.9,3.9,0,0,1-3.9,3.9H3.6l2.5,2.4-.9.8L1.3,9.7,5.2,5.8l.9.9L3.6,9.1Z" transform="translate(-0.6 -2)"></path> </svg></i><strong>Troca Grátis:</strong> 7 dias para trocas e devoluções</span></div>');
        console.log('#mensagem de segurança e garantia adicionado');
    });
    /* end:: Mensagem de segurança e garantia */

    /* begin:: Valor do desconto */
    checkElement('.main-product-prices .show-installments').then((selector) => {
        if(document.querySelector('.product .old-price')) {
            const valor_produto_antigo = document.querySelector('.product .old-price').innerText;
            const valor_produto_float_antigo = parseFloat(valor_produto_antigo.split(' ')[1].replace(',', '.'));
            const valor_produto = document.querySelector('.product .actual-price').innerText;
            const valor_produto_float = parseFloat(valor_produto.split(' ')[1].replace(',', '.'));
            const valor_desconto = (valor_produto_float_antigo - valor_produto_float).toFixed(2).replace('.', ',');
            document.querySelector('.main-product-prices .show-installments').insertAdjacentHTML('beforebegin', '<div style="display: block;-webkit-box-align: center;align-items: center;padding: 6px 16px;font-size: 0.875rem;border: none;min-height: 1.5rem;max-width: fit-content;min-width: 1.5rem;font-weight: bold;color: rgb(255, 255, 255);margin-top: 15px;background: #00a801;border-radius: 4px;"><span><span>ECONOMIA DE </span><span class="economy-price" style="color: var(--color-general-secundary);">R$&nbsp;' + valor_desconto + '</span></span></div>');
            console.log('#valor do desconto adicionado');
        }
    });
    /* end:: Valor do desconto */

    if(model == 'B' && window.location.href.includes('base-color-velvet')) {
        checkElement('section.product-specifications[class*="product_specifications"]').then((selector) => {
            document.querySelector('section.product-specifications[class*="product_specifications"]').style.display = 'none';
            document.querySelector('section.product-specifications[class*="product_specifications"]').insertAdjacentHTML('beforebegin', '<section class="product-specifications product-test-model-b"><div class=container><div class=product-main-infos style=text-align:left;display:grid;gap:30px;line-height:1.6;padding-bottom:30px> <h1 style=color:#008a00>Chega de sofrer com MARCAS, MANCHAS, CICATRIZES, MELASMAS e ESPINHAS no Rosto!</h1><div class="product-description closed" style=display:grid;gap:20px><p><strong>Conheça a Base Color Velvet</strong>, a solução número 1 para seus problemas de pele. Desenvolvida com <strong>tecnologia avançada</strong>, esta base corretiva é a solução para<strong> cobrir completamente</strong> <strong>Manchas</strong>, <strong>Acnes</strong>, <strong>Espinhas</strong>, <strong>Melasmas </strong>e <strong>Cicatrizes </strong>do rosto, garantindo uma <strong>pele impecável</strong> durante seu <strong>dia-a-dia</strong>. Veja resultados visíveis em simples aplicações.</p><p style=display:none>Diferente de todas as bases que você já conheceu, a Base Color Velvet é uma base corretiva que se adapta a <strong>todos os tons de pele</strong>, proporcionando um <strong>resultado natural</strong> e <strong>sem exageros</strong>. E o melhor de tudo? Você não precisa se preocupar com a aparência pegajosa ou oleosa, <strong>mesmo após horas de uso</strong>.</p><p style=display:none>Com <strong>acabamento natural e duradouro</strong>, essa base é <strong>hipoalergênica</strong>, <strong>segura para todo tipo de pele</strong> e não testada em animais. E não para por aí, a fórmula da Base Color Velvet é livre de corantes, fragrâncias sintéticas, derivados de petróleo e parabenos.</p><p style=display:none><strong>Experimente a Base Color Velvet</strong> e descubra como ter uma<strong> pele impecável todos os dias</strong>!</p><div style=font-size:15px;font-weight:600;color:#008a00 class=more-less>+ Ler mais</div></div></div><div class="accordion mt20" style=text-align:left><div class="accordion-option closed" style="border-top:1px solid #ffe7ec"><div class="title closed" style="padding:18px 0;display:flex;align-items:center;justify-content:space-between"> <h2 style=font-size:18px>Como escolher a cor?</h2><span style=font-size:20px;font-weight:600;width:12px;display:flex>+</span></div><div class=description style=margin-top:10px;margin-bottom:20px;line-height:1.5;gap:20px;display:none><p>Excelente pergunta! A Base Color Velvet é uma <strong>base inovadora</strong> que <strong>se adapta a todos os tons de pele</strong>, eliminando a necessidade daquele processo complicado e muitas vezes duvidoso de escolher um tom que pode não ficar bom na pele (principalmente em compras online onde não é possível provar). Você não precisa se preocupar em selecionar uma cor específica, pois nossa <strong>tecnologia avançada</strong> garante que a base <strong>se ajuste perfeitamente ao seu tom de pele</strong></p><p>Isso significa que, independentemente do seu tom de pele, a Base Color Velvet <strong>proporcionará uma cobertura uniforme e natural</strong>. É a base perfeita para todos! Portanto, você pode ficar tranquila sabendo que, ao escolher a Base Color Velvet, você está optando por uma base que <strong>se adequa a você</strong>, independentemente de sua cor de pele, proporcionando um <strong>acabamento impecável e duradouro</strong>. Experimente e descubra a diferença!</p></div></div><div class="accordion-option closed" style="border-top:1px solid #ffe7ec"><div class="title closed" style="padding:15px 0;display:flex;align-items:center;justify-content:space-between"> <h2 style=font-size:18px>Qual a diferença entre outras bases?</h2><span style=font-size:20px;font-weight:600;width:12px;display:flex>+</span></div><div class=description style=margin-top:10px;margin-bottom:20px;line-height:1.5;gap:20px;display:none><p>A Base Color Velvet se destaca das demais bases no mercado devido à sua <strong>cobertura completa e natural</strong>, que <strong>oculta manchas</strong>, <strong>acnes</strong>, <strong>espinhas</strong>, <strong>cicatrizes</strong> e <strong>melasmas</strong>, sem criar uma aparência pesada.</p><p>Além disso, sua tecnologia avançada de aplicação, <strong>controle de oleosidade</strong>, durabilidade <strong>à prova d\'água e proteção solar FPS40</strong> a tornam uma escolha muito superior. Ela é hipoalergênica, ética e livre de químicos nocivos, refletindo um compromisso com a qualidade e a saúde da pele, <strong>diferenciando-a claramente das demais bases disponíveis</strong>.</p></div></div><div class="accordion-option closed" style="border-top:1px solid #ffe7ec"><div class="title closed" style="padding:15px 0;display:flex;align-items:center;justify-content:space-between"> <h2 style=font-size:18px>Ela pode ser usada em peles maduras?</h2><span style=font-size:20px;font-weight:600;width:12px;display:flex>+</span></div><div class=description style=margin-top:10px;margin-bottom:20px;line-height:1.5;gap:20px;display:none><p>Sim, a Base Color Velvet é adequada a qualquer tipo de pele, <strong>incluindo peles maduras</strong>. A fórmula avançada desta base corretiva é projetada para oferecer uma cobertura suave e uniforme, enquanto também hidrata a pele. Isso significa que, mesmo se você tiver uma pele madura, a Base Color Velvet pode <strong>ajudar a disfarçar imperfeições</strong>, <strong>rugas</strong> ou <strong>linhas finas</strong>, proporcionando um <strong>acabamento natural e duradouro</strong>.</p><p>Além disso, sua composição é hipoalergênica, o que a torna segura para todos os tipos de pele, incluindo peles maduras. Portanto, você pode usar a Base Color Velvet com confiança, sabendo que ela atenderá às suas necessidades, <strong>independentemente da sua faixa etária</strong>.</p></div></div><div class="accordion-option closed" style="border-top:1px solid #ffe7ec"><div class="title closed" style="padding:15px 0;display:flex;align-items:center;justify-content:space-between"> <h2 style=font-size:18px>O resultado é garantido?</h2><span style=font-size:20px;font-weight:600;width:12px;display:flex>+</span></div><div class=description style=margin-top:10px;margin-bottom:20px;line-height:1.5;gap:20px;display:none><p>Absolutamente! Confiamos tanto na eficácia da Base Color Velvet que oferecemos uma <strong>garantia sólida de 30 dias</strong> em todas as compras. Isso significa que <strong>você pode experimentar a Base Color Velvet sem riscos</strong>.</p><p>Se, por <strong>qualquer motivo</strong>, você não estiver satisfeito com os resultados ou sua experiência com o produto, estamos prontos para <strong>reembolsar integralmente o seu investimento</strong>. Com a garantia de 30 dias, você tem tempo suficiente para <strong>ver a transformação em sua pele</strong> e <strong>sentir a diferença</strong> que a Base Color Velvet pode fazer. Portanto, não hesite em experimentar a Base Color Velvet e descobrir os benefícios de uma pele impecável. <strong>Estamos ao seu lado</strong> durante essa jornada.</p></div></div></div></div></section>');
            window.addEventListener('load', function(){
                document.querySelector('.product-specifications.product-test-model-b .product-main-infos .more-less').addEventListener('click', e => {
                    if(e.target.parentNode.matches('.opened')) {
                        e.target.parentNode.classList.remove('opened');
                        e.target.parentNode.classList.add('closed');
                        e.target.parentNode.querySelectorAll('p:nth-last-child(-n + 4)').forEach(element => element.style.display = 'none');
                        e.target.innerText = '+ Ler mais';
                    } else {
                        e.target.parentNode.classList.remove('closed');
                        e.target.parentNode.classList.add('opened');
                        e.target.parentNode.querySelectorAll('p:nth-last-child(-n + 4)').forEach(element => element.style.display = 'block');
                        e.target.innerText = '– Ler menos';
                    }
                });
                document.querySelectorAll('.product-specifications.product-test-model-b .accordion .accordion-option').forEach(option => {
                    option.querySelector('.title').addEventListener('click', e => {
                        var element = (e.target.matches('div')) ? e.target : (e.target.matches('h2') || e.target.matches('span')) ? e.target.parentNode : null;
                        if(element && element.parentNode.matches('.opened')) {
                            element.parentNode.classList.remove('opened');
                            element.parentNode.classList.add('closed');
                            element.parentNode.querySelector('.description').style.display = 'none';
                            element.querySelector('span').innerText = '+';
                        } else if(element) {
                            element.parentNode.classList.remove('closed');
                            element.parentNode.classList.add('opened');
                            element.parentNode.querySelector('.description').style.display = 'grid';
                            element.querySelector('span').innerText = '–';
                        }
                    });
                });
            });

            document.querySelector('section.product-specifications[class*="product_specifications"]').insertAdjacentHTML('beforebegin', '<section class="product-video product-test-model-b" style=margin-top:30px><div class=container style=width:100%;height:420px;position:relative;overflow:hidden><div style="display:block;position:absolute;width:100%;height:100%;background-image:url(//images.yampi.me/assets/stores/pontodeamor/uploads/banners/6532d862b4d10.jpg);background-size:cover;background-position-x:center;background-repeat:no-repeat;margin:0 -16px;z-index:-1"></div><div style="display:block;position:absolute;width:100%;height:100%;background:linear-gradient(90deg,#e8dbcf 10%,#e6d8cf 10% 20%,#d7c8c5 20% 30%,#ab9f9e 30% 40%,#5f5a51 40% 50%,#453401 50% 60%,#937763 60% 70%,#c0a199 70% 80%,#b89f9d 80% 90%,#7d7779 90% 100%),linear-gradient(90deg,#ecded4 10%,#e9dad2 10% 20%,#dac9c6 20% 30%,#b5a6a5 30% 40%,#857a75 40% 50%,#827161 50% 60%,#b19486 60% 70%,#d0aea5 70% 80%,#c5a8a2 80% 90%,#928381 90% 100%),linear-gradient(90deg,#f4e3de 10%,#f0ddd8 10% 20%,#e1cbc8 20% 30%,#c9b3b2 30% 40%,#b6a3a1 40% 50%,#bea9a3 50% 60%,#d8bab0 60% 70%,#e6c1b5 70% 80%,#d7b3a9 80% 90%,#b1968f 90% 100%),linear-gradient(90deg,#f8e5e0 10%,#f3ded9 10% 20%,#e6cbc6 20% 30%,#d4b7b4 30% 40%,#c7afac 40% 50%,#ccb4b0 50% 60%,#dbbdb3 60% 70%,#e1bdaf 70% 80%,#d5b0a2 80% 90%,#bb9c93 90% 100%),linear-gradient(90deg,#f2ded4 10%,#eed7ce 10% 20%,#e2c5bc 20% 30%,#cbaca5 30% 40%,#b29792 40% 50%,#a9918a 50% 60%,#b2998c 60% 70%,#bea090 70% 80%,#bc9d90 80% 90%,#af938c 90% 100%),linear-gradient(90deg,#e5cdbc 10%,#e1c7b8 10% 20%,#d0b4a8 20% 30%,#ae9289 30% 40%,#816658 40% 50%,#634e2c 50% 60%,#786547 60% 70%,#98836f 70% 80%,#a78f82 80% 90%,#a48d86 90% 100%),linear-gradient(90deg,#d8baa5 10%,#d0b3a1 10% 20%,#b69c91 20% 30%,#87736a 30% 40%,#4b3c0b 40% 50%,#3e3101 50% 60%,#75653b 60% 70%,#9e8a75 70% 80%,#af988a 80% 90%,#ae968a 90% 100%),linear-gradient(90deg,#d6b4a1 10%,#c9ab9a 10% 20%,#a48f85 20% 30%,#6e665d 30% 40%,#474929 40% 50%,#6a6237 50% 60%,#9c8a6c 60% 70%,#bba38e 70% 80%,#c3a998 80% 90%,#bda292 90% 100%),linear-gradient(90deg,#dfc2b2 10%,#d1b7a9 10% 20%,#ab9a8e 20% 30%,#797467 30% 40%,#615f46 40% 50%,#817658 50% 60%,#aa987d 60% 70%,#c2ac95 70% 80%,#c5ac9a 80% 90%,#bda191 90% 100%),linear-gradient(90deg,#ebd4c6 10%,#dfcbbc 10% 20%,#beb0a0 20% 30%,#908874 30% 40%,#6e6548 40% 50%,#786a49 50% 60%,#998a6d 60% 70%,#b0a087 70% 80%,#b5a18e 80% 90%,#ae9487 90% 100%);background-position:0 0,0 11%,0 22%,0 33%,0 44%,0 56%,0 67%,0 78%,0 89%,0 100%;background-size:100% 10%;filter:blur(24px);background-repeat:no-repeat;transform:scale(1.2);margin:0 -16px;z-index:-2"></div><div style=display:grid;height:100%;width:100%;align-items:center;align-content:center;gap:25px><div style=text-align:center;line-height:1.5;display:grid;gap:15px><div> <h2 style="color:#fff;font-size:15px;text-shadow:0 0 20px #19191980">Veja nossa base em ação!</h2></div><div> <h1 style="color:#fff;font-size:24px;text-shadow:0 0 20px #19191980">Viva sua vida muito mais sorridente e confiante.</h1></div><div style="color:#fff;text-shadow:0 0 20px #19191980"> <p>A aplicação é muito rápida e sem necessidade de nenhum conhecimento avançado de maquiagem.</p></div></div><div style=display:flex;justify-content:center;align-items:center><div style=width:85px;height:85px;display:flex;background-color:#fff;border-radius:50px;justify-content:center;align-items:center><span style="display:block;background-color:#191919;height:30px;width:30px;clip-path:polygon(0% 100%,50% 0%,100% 100%);transform:rotate(90deg);margin-left:5px"></span></div></div></div></div> <svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 375 37" style=margin-top:-30px;display:block><path fill=#FFFFFF d="M182.46 19.887c50.21-8.545 127.391-31.16 191.554-13.039 2.466.697 3.986 3.03 3.986 5.985V37H-.828C-.862 31.228-2.16 25.898 2.94 26.5c38.074 4.498 124.439 2.762 179.521-6.613Z"></path></svg></section>');
            document.querySelector('section.product-specifications[class*="product_specifications"]').insertAdjacentHTML('beforebegin', '<div class="modal-background modal-product-video"><div id="modal-product-video" class="modal" style="border-radius: 10px;padding: 0px;display: flex;align-items: center;justify-content: center;width: fit-content;overflow: hidden;border: 0 !important;background-color: transparent;"><div class="flex -between" style="display: block;position: absolute;top: 15px;right: 15px"> <div class="close-modal" style="background-color: #ffffff;border-radius: 50px;width: 30px;height: 30px;display: flex;margin: 0;padding: 0;opacity: 1;justify-content: center;align-items: center;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;"><span style="font-weight: 600;">X</span></div></div> <iframe width="315" height="560" src="https://www.youtube.com/embed/hY_Mul5EyDQ?si=0kgglRpMhg9n3eJQ&amp;controls=0" title="Base Review" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></div></div>');
            window.addEventListener('load', function(){
                document.querySelector('.product-video .container').addEventListener('click', e => {
                    var modal_element = document.querySelector('.modal-product-video');
                    if(!modal_element.matches('.active')) modal_element.classList.add('active');
                });
                document.querySelector('.modal-product-video').addEventListener('click', e => {
                    var modal_element = document.querySelector('.modal-product-video');
                    var iframe_element = document.querySelector('.modal-product-video iframe');
                    if(modal_element.matches('.active')){
                    	modal_element.classList.remove('active');
                    	iframe_element.src = iframe_element.src;
                    }
                });
                document.querySelector('.modal-product-video .close-modal').addEventListener('click', e => {
                    var modal_element = document.querySelector('.modal-product-video');
                    var iframe_element = document.querySelector('.modal-product-video iframe');
                    if(modal_element.matches('.active')){
                    	modal_element.classList.remove('active');
                    	iframe_element.src = iframe_element.src;
                    }
                });
            });

            document.querySelector('section.product-specifications[class*="product_specifications"]').insertAdjacentHTML('beforebegin', '<section class="product-features product-test-model-b" style="margin-top:30px"><link rel="stylesheet" href="//cdn.jsdelivr.net/npm/keen-slider@6.8.5/keen-slider.min.css"><div class="content" style="padding:16px"><div class="product-features-headline" style="text-align:center;padding:0 5px 15px"> <h2 style="font-size:15px;font-weight:600;color:#008a00"> Seu rosto renovado! </h2></div><div class="product-features-title" style="text-align:center;padding:0 20px 30px"> <h1>O que pode melhorar?</h1></div><div></div><div id="keen-slider-features" class="keen-slider" style="max-width:600px"><div class="keen-slider__slide number-slide1" style="min-width: calc(80% - 4.8px); max-width: calc(80% - 4.8px); transform: translate3d(-808.782px, 0px, 0px);"><div class="slider-content" style="display:grid;gap:12px;margin-right:20px;line-height:1.5"><div class="image" style="position: relative;width: 100%"> <div style="position: absolute;top: 0;left: 0;width:100%;height:100%;z-index: -1;overflow: hidden;border-radius: 10px;"><div style="display: block;width:100%;height:100%;background: linear-gradient(90deg,rgb(183,177,163) 10%,rgb(190,185,173) 10% 20%,rgb(203,199,191) 20% 30%,rgb(208,206,202) 30% 40%,rgb(202,203,202) 40% 50%,rgb(191,198,200) 50% 60%,rgb(187,199,202) 60% 70%,rgb(191,204,207) 70% 80%,rgb(197,206,208) 80% 90%,rgb(201,204,205) 90% 100%),linear-gradient(90deg,rgb(187,174,163) 10%,rgb(193,179,168) 10% 20%,rgb(203,187,179) 20% 30%,rgb(208,192,186) 30% 40%,rgb(203,192,189) 40% 50%,rgb(194,192,192) 50% 60%,rgb(189,194,196) 60% 70%,rgb(191,197,199) 70% 80%,rgb(195,195,196) 80% 90%,rgb(197,189,189) 90% 100%),linear-gradient(90deg,rgb(192,166,158) 10%,rgb(197,164,155) 10% 20%,rgb(206,161,150) 20% 30%,rgb(210,161,149) 30% 40%,rgb(206,166,158) 40% 50%,rgb(198,175,171) 50% 60%,rgb(192,180,180) 60% 70%,rgb(190,178,178) 70% 80%,rgb(189,167,166) 80% 90%,rgb(188,154,150) 90% 100%),linear-gradient(90deg,rgb(191,147,143) 10%,rgb(198,146,138) 10% 20%,rgb(211,144,130) 20% 30%,rgb(216,145,126) 30% 40%,rgb(211,149,134) 40% 50%,rgb(200,157,148) 50% 60%,rgb(191,162,159) 60% 70%,rgb(188,158,156) 70% 80%,rgb(186,143,138) 80% 90%,rgb(183,124,113) 90% 100%),linear-gradient(90deg,rgb(180,117,116) 10%,rgb(193,129,122) 10% 20%,rgb(215,149,134) 20% 30%,rgb(226,159,139) 30% 40%,rgb(218,156,137) 40% 50%,rgb(200,149,136) 50% 60%,rgb(187,145,140) 60% 70%,rgb(184,143,140) 70% 80%,rgb(185,138,128) 80% 90%,rgb(184,126,107) 90% 100%),linear-gradient(90deg,rgb(166,87,85) 10%,rgb(184,115,108) 10% 20%,rgb(215,155,141) 20% 30%,rgb(232,174,156) 30% 40%,rgb(227,168,150) 40% 50%,rgb(206,149,137) 50% 60%,rgb(186,135,130) 60% 70%,rgb(178,134,130) 70% 80%,rgb(182,137,126) 80% 90%,rgb(186,137,114) 90% 100%),linear-gradient(90deg,rgb(158,72,68) 10%,rgb(175,103,94) 10% 20%,rgb(208,145,131) 20% 30%,rgb(230,167,150) 30% 40%,rgb(232,166,150) 40% 50%,rgb(214,149,138) 50% 60%,rgb(189,131,128) 60% 70%,rgb(171,123,122) 70% 80%,rgb(173,126,115) 80% 90%,rgb(183,130,104) 90% 100%),linear-gradient(90deg,rgb(155,74,71) 10%,rgb(168,91,82) 10% 20%,rgb(193,120,104) 20% 30%,rgb(216,141,121) 30% 40%,rgb(223,147,130) 40% 50%,rgb(211,141,131) 50% 60%,rgb(186,126,125) 60% 70%,rgb(163,112,113) 70% 80%,rgb(160,104,95) 80% 90%,rgb(172,103,75) 90% 100%),linear-gradient(90deg,rgb(152,73,74) 10%,rgb(160,82,77) 10% 20%,rgb(177,99,83) 20% 30%,rgb(191,114,92) 30% 40%,rgb(195,122,102) 40% 50%,rgb(187,123,112) 50% 60%,rgb(170,117,116) 60% 70%,rgb(155,106,109) 70% 80%,rgb(152,92,89) 80% 90%,rgb(158,79,58) 90% 100%),linear-gradient(90deg,rgb(146,63,70) 10%,rgb(153,77,77) 10% 20%,rgb(163,98,86) 20% 30%,rgb(165,107,86) 30% 40%,rgb(157,104,82) 40% 50%,rgb(146,101,87) 50% 60%,rgb(143,105,103) 60% 70%,rgb(148,108,112) 70% 80%,rgb(150,100,103) 80% 90%,rgb(146,80,77) 90% 100%);background-position: 0 0,0 11%,0 22%,0 33%,0 44%,0 56%,0 67%,0 78%,0 89%,0 100%;background-size:100% 10%;filter:blur(24px);background-repeat:no-repeat;transform:scale(1.2);"></div></div> <img src="//images.yampi.io/unsafe/fit-in/400x400/filters:background_color(white):upscale()/https://images.yampi.me/assets/stores/lojashiper/uploads/images/base-color-velvet-para-todos-os-tons-de-pele-compre-1-e-leve-2-64c085e47beb6-large.jpg" style="border-radius:10px;width:100%;height:100%"></div><div class="title"> <h2 style="font-size:17px">Marcas ou Espinhas</h2></div><div class="description"><p>Seja livre para revelar sua verdadeira beleza. A Base Color Velvet é a chave para ocultar marcas e imperfeições causadas por espinhas e suas sequelas.</p></div></div></div><div class="keen-slider__slide number-slide2" style="min-width: calc(80% - 4.8px); max-width: calc(80% - 4.8px); transform: translate3d(-808.782px, 0px, 0px);"><div class="slider-content" style="display:grid;gap:12px;margin-right:20px;line-height:1.5"><div class="image" style="position: relative;width: 100%"> <div style="position: absolute;top: 0;left: 0;width:100%;height:100%;z-index: -1;overflow: hidden;border-radius: 10px;"><div style="display: block;width:100%;height:100%;background: linear-gradient(90deg,rgb(174,151,117) 10%,rgb(162,140,110) 10% 20%,rgb(134,118,100) 20% 30%,rgb(117,110,108) 30% 40%,rgb(125,119,124) 40% 50%,rgb(132,118,123) 50% 60%,rgb(121,90,95) 60% 70%,rgb(103,51,48) 70% 80%,rgb(111,73,54) 80% 90%,rgb(136,118,98) 90% 100%),linear-gradient(90deg,rgb(171,144,110) 10%,rgb(166,140,110) 10% 20%,rgb(157,134,116) 20% 30%,rgb(152,135,129) 30% 40%,rgb(152,137,137) 40% 50%,rgb(146,127,127) 50% 60%,rgb(131,98,97) 60% 70%,rgb(123,79,67) 70% 80%,rgb(141,107,88) 80% 90%,rgb(167,145,125) 90% 100%),linear-gradient(90deg,rgb(166,130,99) 10%,rgb(174,139,114) 10% 20%,rgb(190,158,142) 20% 30%,rgb(198,170,160) 30% 40%,rgb(190,166,159) 40% 50%,rgb(169,144,137) 50% 60%,rgb(149,115,104) 60% 70%,rgb(154,113,94) 70% 80%,rgb(182,148,127) 80% 90%,rgb(209,183,162) 90% 100%),linear-gradient(90deg,rgb(168,130,109) 10%,rgb(179,143,124) 10% 20%,rgb(200,167,152) 20% 30%,rgb(212,182,171) 30% 40%,rgb(205,178,170) 40% 50%,rgb(183,156,149) 50% 60%,rgb(162,129,118) 60% 70%,rgb(167,130,111) 70% 80%,rgb(195,162,142) 80% 90%,rgb(223,195,175) 90% 100%),linear-gradient(90deg,rgb(177,148,135) 10%,rgb(180,151,138) 10% 20%,rgb(187,161,149) 20% 30%,rgb(195,172,164) 30% 40%,rgb(197,175,171) 40% 50%,rgb(187,163,162) 50% 60%,rgb(171,141,137) 60% 70%,rgb(166,132,120) 70% 80%,rgb(185,154,136) 80% 90%,rgb(210,183,166) 90% 100%),linear-gradient(90deg,rgb(187,164,155) 10%,rgb(182,160,151) 10% 20%,rgb(175,155,147) 20% 30%,rgb(179,162,158) 30% 40%,rgb(191,173,174) 40% 50%,rgb(195,172,175) 50% 60%,rgb(183,154,153) 60% 70%,rgb(170,135,126) 70% 80%,rgb(176,143,129) 80% 90%,rgb(195,168,155) 90% 100%),linear-gradient(90deg,rgb(189,167,160) 10%,rgb(186,163,156) 10% 20%,rgb(184,160,154) 20% 30%,rgb(193,169,167) 30% 40%,rgb(207,183,184) 40% 50%,rgb(210,184,184) 50% 60%,rgb(199,165,161) 60% 70%,rgb(185,144,132) 70% 80%,rgb(188,148,133) 80% 90%,rgb(204,172,160) 90% 100%),linear-gradient(90deg,rgb(183,155,148) 10%,rgb(186,156,149) 10% 20%,rgb(196,163,158) 20% 30%,rgb(213,180,176) 30% 40%,rgb(225,193,190) 40% 50%,rgb(223,190,185) 50% 60%,rgb(207,168,158) 60% 70%,rgb(193,146,130) 70% 80%,rgb(200,154,137) 80% 90%,rgb(218,180,167) 90% 100%),linear-gradient(90deg,rgb(173,135,128) 10%,rgb(176,137,131) 10% 20%,rgb(189,149,143) 20% 30%,rgb(211,171,165) 30% 40%,rgb(226,188,181) 40% 50%,rgb(223,185,175) 50% 60%,rgb(200,158,145) 60% 70%,rgb(180,129,111) 70% 80%,rgb(187,136,121) 80% 90%,rgb(212,167,156) 90% 100%),linear-gradient(90deg,rgb(164,119,111) 10%,rgb(160,114,107) 10% 20%,rgb(162,118,109) 20% 30%,rgb(184,144,134) 30% 40%,rgb(209,170,160) 40% 50%,rgb(211,171,160) 50% 60%,rgb(183,139,128) 60% 70%,rgb(146,89,77) 70% 80%,rgb(148,89,79) 80% 90%,rgb(182,132,124) 90% 100%);background-position: 0 0,0 11%,0 22%,0 33%,0 44%,0 56%,0 67%,0 78%,0 89%,0 100%;background-size:100% 10%;filter:blur(24px);background-repeat:no-repeat;transform:scale(1.2);"></div></div> <img src="//images.yampi.io/unsafe/fit-in/400x400/filters:background_color(white):upscale()/https://images.yampi.me/assets/stores/lojashiper/uploads/images/base-color-velvet-para-todos-os-tons-de-pele-compre-1-e-leve-2-64c085e47ff07-large.jpg" style="border-radius:10px;width:100%;height:100%"></div><div class="title"> <h2 style="font-size:17px">Manchas ou Melasma</h2></div><div class="description"><p>Diga adeus às preocupações com manchas e melasmas. A Base Color Velvet é a solução para uma pele uniforme e radiante.</p></div></div></div><div class="keen-slider__slide number-slide3" style="min-width: calc(80% - 4.8px); max-width: calc(80% - 4.8px); transform: translate3d(-808.782px, 0px, 0px);"><div class="slider-content" style="display:grid;gap:12px;margin-right:20px;line-height:1.5"><div class="image" style="position: relative;width: 100%"> <div style="position: absolute;top: 0;left: 0;width:100%;height:100%;z-index: -1;overflow: hidden;border-radius: 10px;"><div style="display: block;width:100%;height:100%;background: linear-gradient(90deg,rgb(145,116,71) 10%,rgb(144,111,72) 10% 20%,rgb(138,97,70) 20% 30%,rgb(128,81,62) 30% 40%,rgb(119,80,61) 40% 50%,rgb(124,100,81) 50% 60%,rgb(138,121,106) 60% 70%,rgb(147,128,114) 70% 80%,rgb(143,115,97) 80% 90%,rgb(129,87,46) 90% 100%),linear-gradient(90deg,rgb(155,123,81) 10%,rgb(154,120,83) 10% 20%,rgb(151,111,85) 20% 30%,rgb(146,104,84) 30% 40%,rgb(141,106,85) 40% 50%,rgb(140,117,97) 50% 60%,rgb(144,127,112) 60% 70%,rgb(148,129,116) 70% 80%,rgb(148,120,102) 80% 90%,rgb(145,104,69) 90% 100%),linear-gradient(90deg,rgb(169,135,98) 10%,rgb(170,134,101) 10% 20%,rgb(173,134,108) 20% 30%,rgb(175,136,114) 30% 40%,rgb(174,141,118) 40% 50%,rgb(167,144,122) 50% 60%,rgb(156,141,124) 60% 70%,rgb(151,136,123) 70% 80%,rgb(160,133,115) 80% 90%,rgb(173,133,103) 90% 100%),linear-gradient(90deg,rgb(168,139,106) 10%,rgb(172,140,110) 10% 20%,rgb(180,144,119) 20% 30%,rgb(187,151,128) 30% 40%,rgb(187,157,133) 40% 50%,rgb(178,157,136) 50% 60%,rgb(164,153,136) 60% 70%,rgb(161,148,135) 70% 80%,rgb(173,149,132) 80% 90%,rgb(191,154,127) 90% 100%),linear-gradient(90deg,rgb(154,133,105) 10%,rgb(160,135,110) 10% 20%,rgb(172,141,119) 20% 30%,rgb(180,147,127) 30% 40%,rgb(178,152,132) 40% 50%,rgb(171,156,138) 50% 60%,rgb(168,159,144) 60% 70%,rgb(174,162,148) 70% 80%,rgb(185,163,147) 80% 90%,rgb(195,163,141) 90% 100%),linear-gradient(90deg,rgb(145,130,105) 10%,rgb(152,131,109) 10% 20%,rgb(164,135,117) 20% 30%,rgb(169,137,123) 30% 40%,rgb(165,142,127) 40% 50%,rgb(162,151,137) 50% 60%,rgb(170,162,150) 60% 70%,rgb(183,171,158) 70% 80%,rgb(194,171,157) 80% 90%,rgb(197,167,148) 90% 100%),linear-gradient(90deg,rgb(154,136,110) 10%,rgb(160,136,114) 10% 20%,rgb(169,137,120) 20% 30%,rgb(172,138,125) 30% 40%,rgb(168,143,130) 40% 50%,rgb(164,152,140) 50% 60%,rgb(171,164,153) 60% 70%,rgb(185,171,161) 70% 80%,rgb(197,173,160) 80% 90%,rgb(203,170,152) 90% 100%),linear-gradient(90deg,rgb(167,142,115) 10%,rgb(171,142,118) 10% 20%,rgb(179,142,124) 20% 30%,rgb(183,146,131) 30% 40%,rgb(180,152,136) 40% 50%,rgb(173,158,143) 50% 60%,rgb(170,162,151) 60% 70%,rgb(178,165,156) 70% 80%,rgb(195,168,157) 80% 90%,rgb(210,173,153) 90% 100%),linear-gradient(90deg,rgb(162,138,110) 10%,rgb(167,138,114) 10% 20%,rgb(178,141,122) 20% 30%,rgb(186,148,130) 30% 40%,rgb(185,155,136) 40% 50%,rgb(174,158,141) 50% 60%,rgb(163,156,144) 60% 70%,rgb(167,156,146) 70% 80%,rgb(187,162,148) 80% 90%,rgb(209,172,149) 90% 100%),linear-gradient(90deg,rgb(142,124,98) 10%,rgb(150,126,102) 10% 20%,rgb(167,132,112) 20% 30%,rgb(179,141,122) 30% 40%,rgb(179,148,129) 40% 50%,rgb(167,150,132) 50% 60%,rgb(154,148,134) 60% 70%,rgb(157,149,137) 70% 80%,rgb(179,158,140) 80% 90%,rgb(202,169,143) 90% 100%);background-position: 0 0,0 11%,0 22%,0 33%,0 44%,0 56%,0 67%,0 78%,0 89%,0 100%;background-size:100% 10%;filter:blur(24px);background-repeat:no-repeat;transform:scale(1.2);"></div></div> <img src="//images.yampi.io/unsafe/fit-in/400x400/filters:background_color(white):upscale()/https://images.yampi.me/assets/stores/lojashiper/uploads/images/base-color-velvet-para-todos-os-tons-de-pele-compre-1-e-leve-2-64c085e481f8f-large.jpg" style="border-radius:10px;width:100%;height:100%"></div><div class="title"> <h2 style="font-size:17px">Rugas ou Linhas de Exp.</h2></div><div class="description"><p>Recupere a juventude da sua pele. A Base Color Velvet é a sua aliada para suavizar rugas e linhas de expressão, revelando uma pele mais jovem e radiante.</p></div></div></div><div class="keen-slider__slide number-slide4" style="min-width: calc(80% - 4.8px); max-width: calc(80% - 4.8px); transform: translate3d(-808.782px, 0px, 0px);"><div class="slider-content" style="display:grid;gap:12px;margin-right:20px;line-height:1.5"><div class="image" style="position: relative;width: 100%"> <div style="position: absolute;top: 0;left: 0;width:100%;height:100%;z-index: -1;overflow: hidden;border-radius: 10px;"><div style="display: block;width:100%;height:100%;background: linear-gradient(90deg,rgb(197,195,170) 10%,rgb(187,179,155) 10% 20%,rgb(167,144,123) 20% 30%,rgb(166,129,115) 30% 40%,rgb(187,158,148) 40% 50%,rgb(207,190,180) 50% 60%,rgb(209,201,191) 60% 70%,rgb(193,189,179) 70% 80%,rgb(174,165,156) 80% 90%,rgb(162,145,136) 90% 100%),linear-gradient(90deg,rgb(182,179,156) 10%,rgb(177,166,144) 10% 20%,rgb(171,141,120) 20% 30%,rgb(178,133,116) 30% 40%,rgb(194,157,143) 40% 50%,rgb(204,182,170) 50% 60%,rgb(199,189,178) 60% 70%,rgb(184,177,167) 70% 80%,rgb(169,157,147) 80% 90%,rgb(165,142,129) 90% 100%),linear-gradient(90deg,rgb(152,143,124) 10%,rgb(161,140,120) 10% 20%,rgb(180,136,114) 20% 30%,rgb(197,141,118) 30% 40%,rgb(205,155,133) 40% 50%,rgb(198,166,148) 50% 60%,rgb(180,165,152) 60% 70%,rgb(165,155,144) 70% 80%,rgb(163,143,129) 80% 90%,rgb(171,136,114) 90% 100%),linear-gradient(90deg,rgb(149,129,114) 10%,rgb(162,130,114) 10% 20%,rgb(187,135,115) 20% 30%,rgb(206,144,119) 30% 40%,rgb(211,154,127) 40% 50%,rgb(198,159,136) 50% 60%,rgb(177,157,140) 60% 70%,rgb(162,150,136) 70% 80%,rgb(165,142,124) 80% 90%,rgb(178,136,108) 90% 100%),linear-gradient(90deg,rgb(179,155,141) 10%,rgb(183,150,135) 10% 20%,rgb(192,140,124) 20% 30%,rgb(204,141,119) 30% 40%,rgb(211,154,129) 40% 50%,rgb(207,168,145) 50% 60%,rgb(192,172,154) 60% 70%,rgb(177,166,151) 70% 80%,rgb(176,154,136) 80% 90%,rgb(185,144,118) 90% 100%),linear-gradient(90deg,rgb(200,178,164) 10%,rgb(198,168,154) 10% 20%,rgb(197,146,131) 20% 30%,rgb(204,138,119) 30% 40%,rgb(213,155,134) 40% 50%,rgb(214,175,156) 50% 60%,rgb(201,182,167) 60% 70%,rgb(186,174,161) 70% 80%,rgb(183,160,145) 80% 90%,rgb(191,150,127) 90% 100%),linear-gradient(90deg,rgb(189,173,162) 10%,rgb(191,163,152) 10% 20%,rgb(198,143,129) 20% 30%,rgb(208,137,118) 30% 40%,rgb(214,152,131) 40% 50%,rgb(207,167,150) 50% 60%,rgb(188,167,157) 60% 70%,rgb(171,156,149) 70% 80%,rgb(175,147,135) 80% 90%,rgb(192,147,125) 90% 100%),linear-gradient(90deg,rgb(146,139,134) 10%,rgb(158,134,127) 10% 20%,rgb(182,126,112) 20% 30%,rgb(201,130,107) 30% 40%,rgb(203,140,117) 40% 50%,rgb(183,142,126) 50% 60%,rgb(150,129,126) 60% 70%,rgb(131,112,117) 70% 80%,rgb(150,114,109) 80% 90%,rgb(180,132,108) 90% 100%),linear-gradient(90deg,rgb(82,89,90) 10%,rgb(104,88,87) 10% 20%,rgb(141,92,82) 20% 30%,rgb(165,104,83) 30% 40%,rgb(166,114,90) 40% 50%,rgb(141,109,94) 50% 60%,rgb(97,87,90) 60% 70%,rgb(72,65,83) 70% 80%,rgb(111,79,81) 80% 90%,rgb(152,108,84) 90% 100%),linear-gradient(90deg,rgb(1,47,48) 10%,rgb(19,39,43) 10% 20%,rgb(55,29,35) 20% 30%,rgb(85,50,38) 30% 40%,rgb(100,74,54) 40% 50%,rgb(88,83,69) 50% 60%,rgb(44,74,76) 60% 70%,rgb(1,59,75) 70% 80%,rgb(65,65,70) 80% 90%,rgb(115,85,65) 90% 100%);background-position: 0 0,0 11%,0 22%,0 33%,0 44%,0 56%,0 67%,0 78%,0 89%,0 100%;background-size:100% 10%;filter:blur(24px);background-repeat:no-repeat;transform:scale(1.2);"></div></div> <img src="//images.yampi.io/unsafe/fit-in/400x400/filters:background_color(white):upscale()/https://images.yampi.me/assets/stores/lojashiper/uploads/images/base-color-velvet-para-todos-os-tons-de-pele-compre-1-e-leve-2-64f22efb315d3-large.jpg" style="border-radius:10px;width:100%;height:100%"></div><div class="title"> <h2 style="font-size:17px">Riscos ou Cicatrizes</h2></div><div class="description"><p>Descubra a magia da Base Color Velvet e veja como ela transforma riscos e cicatrizes em lembranças do passado.</p></div></div></div></div></div></section>');
            window.addEventListener('load', function(){
                add_script(document.querySelector('section.product-features'), '//cdn.jsdelivr.net/npm/keen-slider@6.8.5/keen-slider.min.js', (loaded) => {
                   var slider = new KeenSlider("#keen-slider-features", {
                       loop: true,
                       mode: "snap",
                       rtl: false,
                       slides: { perView: "auto" }
                   });
                });
            });

            document.querySelector('section.product-specifications[class*="product_specifications"]').insertAdjacentHTML('beforebegin', '<section class="product-original product-test-model-b" style=margin-top:30px><div class=content><div><div class=title style="text-align:center;padding:0 5px 15px"><h2 style=font-size:15px;font-weight:600;color:#008a00>Compra garantida!</h2></div><div class=title style="padding:0 15px 16px;text-align:center"> <h1>Produto Original</h1></div><div style="display:block;width:100%;padding:0 10px"><img src=https://s3.sa-east-1.amazonaws.com/king-assets.yampi.me/dooki/64f0ea47d269e/64f0ea47d26a2.jpg data-src=https://s3.sa-east-1.amazonaws.com/king-assets.yampi.me/dooki/64f0ea47d269e/64f0ea47d26a2.jpg alt=64f0ea47d26a2.jpg style=width:100%></div></div></div></section>');
            console.log('#descrição de produto modelo b adicionado');
        });
    }

    /* begin:: Selos de segurança */
    checkElement('.footer').then((selector) => {
        document.querySelector('.footer').insertAdjacentHTML('beforebegin', '<section class="selos-seguranca banner-3" style="margin-bottom: -30px;margin-top: 50px;"><div class="holder-banner-3 container relative"><div class="flex"><div class="flex banner"><div> <svg id="b9fc2764-b1ea-4f95-950c-34e5a7681c67" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" width="60.5" height="53.3" viewBox="0 0 60.5 53.3"><title>receba-em-casa-selo</title><g id="a85833d7-f191-4087-a6d1-2e34f6109de5" data-name="Desktop"><g id="b9d3a989-89f8-40c4-bed8-1a361304dc07" data-name="Home V1"><g id="a73b2c51-d21e-4683-80d6-5980a02a62f2" data-name="Footer"><g id="f5a7fd43-ebc4-42fc-925e-0fe0a95e2a50" data-name="Group-41"><g id="e02249f4-a6b0-4cb9-8d2d-ee6c0b1b53b0" data-name="Envio"><g id="bd212004-d75a-4b2e-b024-b7a0fc88f57a" data-name="Group-16"><rect id="e8093c93-6b5d-4f2d-a6b0-bbabb294a49a" data-name="Rectangle-193" x="1.3" y="1.3" width="58" height="10.44" rx="2" fill="none" stroke="#191919" stroke-width="2.5"></rect><path id="af90b712-6651-40e4-87cf-69f9ab214a0b" data-name="Rectangle-194" d="M5.1,18.9H57.9v39h0a1.3,1.3,0,0,1-1.3,1.4H6.5a1.4,1.4,0,0,1-1.4-1.4Z" transform="translate(-1.8 -7.2)" fill="none" stroke="#191919" stroke-width="2.5"></path><polygon id="aca30934-6164-4025-80a4-1bfb327ecf9e" data-name="Fill-9" points="24.9 23.3 26.6 21.5 28.4 23.3 30.2 21.5 31.9 23.3 33.7 21.5 35.4 23.3 35.4 10.9 24.9 10.9 24.9 23.3" fill="#0046be" fill-rule="evenodd"></polygon><rect id="e3637387-6aa1-4c69-8d5a-addf5d5446c1" data-name="Rectangle-195" x="24.9" y="0.5" width="10.5" height="11.19" fill="#0046be"></rect><g id="bc64bbe0-cc8b-45b1-86a2-8177eecb457a" data-name="Group-12"><path id="af4d7e3b-fe61-4335-8a93-13534d82f509" data-name="Fill-15" d="M30.8,54.6H11a.5.5,0,0,1-.5-.5V43.4a.6.6,0,0,1,.5-.6H30.8a.6.6,0,0,1,.5.6V54.1a.5.5,0,0,1-.5.5" transform="translate(-1.8 -7.2)" fill="#fff" stroke="#191919" stroke-width="2" fill-rule="evenodd"></path><path id="ef7ee9e2-4be7-424a-8210-ff3809696cec" data-name="Fill-16" d="M15.4,48.8a.8.8,0,0,1-.7-.3.7.7,0,0,1-.2-.6.9.9,0,1,1,.9.9m0-3.3a2.5,2.5,0,0,0-2.5,2.4,2.5,2.5,0,0,0,.4,1.3L15.4,52l2.1-2.8a2.5,2.5,0,0,0,.4-1.3,2.5,2.5,0,0,0-2.5-2.4" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="a6e827d9-886d-4320-b5a4-fabbe4b15f43" data-name="Fill-17" d="M20.4,46.8H27a.7.7,0,0,0,.7-.7h0a.7.7,0,0,0-.7-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,46.8Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="a76236e7-1ad2-4da4-867a-58ece364c223" data-name="Fill-18" d="M20.4,49.4H25a.7.7,0,0,0,.7-.7h0a.7.7,0,0,0-.7-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,49.4Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path><path id="ee216a4c-af5a-4c6f-9781-632363913652" data-name="Fill-19" d="M20.4,52h5.3a.7.7,0,0,0,.6-.7h0a.6.6,0,0,0-.6-.6H20.4a.7.7,0,0,0-.7.6h0A.7.7,0,0,0,20.4,52Z" transform="translate(-1.8 -7.2)" fill="#191919" fill-rule="evenodd"></path></g></g></g></g></g></g></g></svg></div><div class="block" style="margin-left: 15px;margin-right: 5px;"> <span class="block" style="font-weight: 600;font-size: 14px;">Compre online e receba em casa</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Envio imediato com código de rastreamento para você acompanhar o seu pedido</span></div></div><div class="flex banner"><div> <svg id="bb51f0a5-15c5-4de7-9e0e-37b89194541c" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60.6" height="58.4" viewBox="0 0 60.6 58.4"><defs><mask id="a8dcdce0-cf35-40c8-811e-ad1d7548ce30" x="0" y="0" width="60.59" height="41.81" maskUnits="userSpaceOnUse"><g transform="translate(-1.2 -5.9)"><g id="a565e7c0-7f02-4ebd-a32c-1ed050b238f8" data-name="mask-2"><polygon id="a4ddd7de-6f9e-4b63-ba4c-28c88f5e9a4b" data-name="path-1" points="61.1 47 2 47 2 6.7 61.1 6.7 61.1 47" fill="#fff" fill-rule="evenodd"></polygon></g></g></mask></defs><title>pagamento-seguro-selo</title><g id="e5706853-e815-4df2-a8d5-006759ddc413" data-name="Desktop"><g id="ed3a7d9d-ca1f-44f2-b238-b295dcd0f013" data-name="Home V1"><g id="adee5aaa-0a9f-4cd7-98b0-f29a0037169e" data-name="Footer"><g id="a1736b67-db1e-4751-b60a-cfdc37654e68" data-name="Group-42"><g id="b4bd78e5-f2ea-431c-9f4c-1b00572e2c4b" data-name="Pago"><g id="a01625a5-ce8d-47da-a08d-4fa09bab8700" data-name="Group-17"><g id="aeeb611b-06ec-4812-8738-b1acfa7af3f4" data-name="Group-10"><path id="a35595c8-3f46-425c-9b99-32d174fe9eb8" data-name="Fill-1" d="M2.8,10.2A2.7,2.7,0,0,1,5.6,7.5H57.5a2.8,2.8,0,0,1,2.8,2.7V43.5a2.8,2.8,0,0,1-2.8,2.7H5.6a2.7,2.7,0,0,1-2.8-2.7Z" transform="translate(-1.2 -5.9)" fill="#fff" fill-rule="evenodd"></path><g id="adb801d1-799e-4548-b13c-7480cc21dac1" data-name="Group-5"><g mask="url(#a8dcdce0-cf35-40c8-811e-ad1d7548ce30)"><path id="aad36856-9b8f-4866-a753-97ad19d0c965" data-name="Fill-3" d="M5.6,8.3a1.9,1.9,0,0,0-2,1.9V43.5a1.9,1.9,0,0,0,2,1.9H57.5a1.8,1.8,0,0,0,1.9-1.9V10.2a1.8,1.8,0,0,0-1.9-1.9ZM5.6,47A3.6,3.6,0,0,1,2,43.5V10.2A3.6,3.6,0,0,1,5.6,6.7H57.5a3.6,3.6,0,0,1,3.6,3.5V43.5A3.6,3.6,0,0,1,57.5,47Z" transform="translate(-1.2 -5.9)" fill="#191919" stroke="#191919" stroke-miterlimit="10" stroke-width="1.5" fill-rule="evenodd"></path></g></g><path id="b507deef-8795-4fd5-ae6f-eef5e1e1f069" data-name="Fill-6" d="M17.5,20.6a4,4,0,1,0,0-8,4.1,4.1,0,0,0-4.2,4,4.1,4.1,0,0,0,4.2,4" transform="translate(-1.2 -5.9)" fill="#fff" fill-rule="evenodd"></path><path id="a907fff4-9127-422f-b521-3e1325551578" data-name="Fill-8" d="M17.5,13.4a3.2,3.2,0,1,0,0,6.4,3.2,3.2,0,1,0,0-6.4m0,8a4.9,4.9,0,0,1-5-4.8,4.8,4.8,0,0,1,5-4.8,4.9,4.9,0,0,1,5,4.8,5,5,0,0,1-5,4.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path></g><g id="f3747952-8c8a-4cdb-a874-bdd2c224271f" data-name="Group-43"><path id="a161e30f-b8ce-4ee7-9aeb-07d804b1e2f4" data-name="Fill-13" d="M11.5,21.1a4.6,4.6,0,0,0,4.7-4.5,4.7,4.7,0,0,0-9.4,0,4.6,4.6,0,0,0,4.7,4.5" transform="translate(-1.2 -5.9)" fill="#0046be" fill-rule="evenodd"></path><path id="e48b6215-ca6d-4663-91b7-fedea9f981cc" data-name="Fill-17" d="M15.3,28.6H8a.8.8,0,0,1-.9-.8A.9.9,0,0,1,8,27h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="baaf3d29-9682-4a19-b171-c40deffc08e9" data-name="Fill-21" d="M12.4,37.1H7.1a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h5.3a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="e54c7df4-9554-4ac8-9104-616f9fcc0369" data-name="Fill-25" d="M23.7,37.1H16.4a.6.6,0,0,1-.6-.5.6.6,0,0,1,.6-.5h7.3a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="f9161f25-116c-47a1-a14b-9da4d3847ac9" data-name="Fill-29" d="M20.7,40.4H7.1a.5.5,0,0,1,0-1H20.7a.5.5,0,0,1,0,1" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="b8f49b7d-6f64-423c-8804-e452d45f72b7" data-name="Fill-33" d="M28.2,28.6H20.9a.8.8,0,0,1-.9-.8.9.9,0,0,1,.9-.8h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="a8ded640-741a-4b2e-a7ed-5912494d3e73" data-name="Fill-37" d="M41.1,28.6H33.8a.8.8,0,0,1-.9-.8.9.9,0,0,1,.9-.8h7.3a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path><path id="b3519f18-dd9a-4fb3-9b16-b13f5c22227a" data-name="Fill-41" d="M54.2,28.6H46.5a.8.8,0,0,1-.8-.8.9.9,0,0,1,.8-.8h7.7a.9.9,0,0,1,.8.8.8.8,0,0,1-.8.8" transform="translate(-1.2 -5.9)" fill="#191919" fill-rule="evenodd"></path></g></g></g></g></g></g></g><rect x="32.3" y="39.9" width="20" height="17" rx="1" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></rect><path d="M38.6,45.7V40.6a5.1,5.1,0,0,1,10.2,0v5.1" transform="translate(-1.2 -5.9)" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></path><line x1="42.5" y1="47.4" x2="42.5" y2="50" fill="none" stroke="#0046be" stroke-linecap="square" stroke-width="3"></line></svg></div><div class="block" style="margin-left: 15px;margin-right: 5px;"> <span class="block" style="font-weight: 600;font-size: 14px;">Escolha como pagar</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Pague sua compra de forma segura com boleto bancário, pix ou cartão de crédito</span></div></div><div class="flex banner"><div> <svg id="a969efb4-3207-4c6f-93c1-c4255184b22c" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" width="54.2" height="57.6" viewBox="0 0 54.2 57.6"><title>reembolso-selo</title><g id="ef0a8b4d-3633-452c-992e-4c8bf9dbed30" data-name="Desktop"><g id="bcbf4a0e-8487-42e3-ae30-4335143bd100" data-name="Home"><g id="bbd4fccf-b7bf-4c99-8a3e-d9f7f83647a5" data-name="Footer"><g id="fb961cd4-9f3d-463f-ade4-933cb504b3b0" data-name="Compra-protegida"><path id="b6b13351-30e0-43b4-ac94-5b662f8771b5" data-name="Shape" d="M26.1,39.2l-5.9-5.9h0a1.1,1.1,0,0,1,0-1.5l1.6-1.7h0a1.1,1.1,0,0,1,1.5,0l3.5,3.5,9.8-9.8h0a1.1,1.1,0,0,1,1.5,0l1.7,1.7h0a1.1,1.1,0,0,1,0,1.5L27.6,39.2h0A1.1,1.1,0,0,1,26.1,39.2Z" transform="translate(-1.9 -3.7)" fill="#0046be"></path><path id="a6fafce5-dc61-4d44-ae46-4d4e067577cd" data-name="Page-1" d="M29,4.9S21.7,15.5,3.7,12.3c0,0-6.3,31,25.3,47.7C60.7,43.3,54.4,12.3,54.4,12.3,36.4,15.5,29,4.9,29,4.9Z" transform="translate(-1.9 -3.7)" fill="none" stroke="#191919" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path></g></g></g></g></svg></div><div class="block" style="margin-left: 15px"> <span class="block" style="font-weight: 600;font-size: 14px;">Segurança do início ao fim</span> <span class="block" style="margin-top: 2px;font-size: 13px;">Nós garantimos a sua entrega ou devolvemos o seu dinheiro</span></div></div></div></div></section>');
        console.log('#selos de segurança adicionado');
    });
    /* end:: Selos de segurança */
}

document.querySelector('body').classList.add('script-ella');
console.log('#iniciando definição de script');

const current_domain = window.location.hostname.replace('www.', '');
const store_domain = window.merchant['domain'];
if(current_domain != store_domain && !current_domain.includes('catalog.yampi.io')) {
    window.merchant['checkout']['base_domain'] = window.merchant['checkout']['base_domain'].replace(store_domain, current_domain);
    window.merchant['checkout']['items'] = window.merchant['checkout']['items'].replace(store_domain, current_domain);
    window.merchant['checkout']['items_json'] = window.merchant['checkout']['items_json'].replace(store_domain, current_domain);
    window.merchant['checkout']['redirect_to'] = window.merchant['checkout']['redirect_to'].replace(store_domain, current_domain);
    window.merchant['checkout']['orders'] = window.merchant['checkout']['orders'].replace(store_domain, current_domain);
    console.log('#mudança de domínio completa');
}

if(document.body.classList.contains('home')) {
    loading_on_home_page();
    loading_on_all_pages();
} else if(document.body.classList.contains('product')) {
    addView();
    loading_on_product_page(random_model);
    loading_on_all_pages();
} else {
    loading_on_all_pages();
}
