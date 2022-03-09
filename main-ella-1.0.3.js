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

    document.querySelector('div.custom-select select').value = button.getAttribute('data-value');
    document.querySelector('div.custom-select select').dispatchEvent(new Event('change'));

    document.querySelectorAll('div.custom-select select').forEach(function(select, i){
    	if(i > index) waitElementToReplace(select, i);
   	});
}

function ReplaceSelectWithButtons(selectField, index) {
    var selectValue = selectField.value;
    var selectId = selectField.id;

    document.querySelectorAll('div.custom-select div[data-target="'+ selectId +'"]').forEach(function(select){
        select.remove();
    });

    //adicionar esssa seção no tema
    selectField.insertAdjacentHTML('beforebegin', '<style>div.selectbtn { display : inline-block; background-color : #f9f9f9; border : 1px solid #dcd5cf; padding: 8px 16px; border-radius: 4px; margin-right : 8px; margin-bottom : 8px; cursor: pointer; } div.selectbtn.selected { background-color: rgba(var(--color-general-primary),.06); border: 1px solid #0046be; box-shadow: 0 0 0 1px var(--color-general-primary); border-color: var(--color-general-primary); color: var(--color-general-primary) }</style>');

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

function loading_on_product_page(){
    var selects =  document.querySelectorAll('div.custom-select select');
    selects.forEach(function(select, index){
        if(index + 1 < selects.length){
            select.addEventListener('change', function(){
                verifyElement(selects, index + 1);
            });
        }
    }, {once : true});
    selects[0].selectedIndex = 1;
    selects[0].dispatchEvent(new Event('change'));
  
    document.querySelectorAll('div.custom-select select').forEach(function(select, index){
        waitElementToReplace(select, index);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('body').classList.add('script-ella');
    console.log('#iniciando definição de script');

    if(document.body.classList.contains('home')){
        window.addEventListener('load', function(){
            loading_on_all_pages()
        });
    }else if(document.body.classList.contains('product')){
        window.addEventListener('load', function(){
            loading_on_product_page();
            loading_on_all_pages()
        });
    }else{
        window.addEventListener('load', function(){            
            loading_on_all_pages()
        });
    }
});
