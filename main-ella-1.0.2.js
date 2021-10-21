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

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('body').classList.add('script-ella');
    console.log('#iniciando definição de script');

    if(document.body.classList.contains('home')){
        window.addEventListener('load', function(){
            loading_on_all_pages()
        });
    }else if(document.body.classList.contains('product')){
        window.addEventListener('load', function(){            
            loading_on_all_pages()
        });
    }else{
        window.addEventListener('load', function(){            
            loading_on_all_pages()
        });
    }
});
