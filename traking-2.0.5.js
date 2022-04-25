const shadow = document.querySelector('#rastreio-yampi').attachShadow({mode: 'open' || 'closed'});
const styleNode = document.createElement('style');

styleNode.textContent = `.input-group-raspi{position:relative;display:flex;flex-wrap:wrap;align-items:stretch;width:100%}.form-control-raspi{display:block;padding:.8125rem 1.25rem;font-size:1.0625rem!important;line-height:initial;color:#161c2d;background-color:#fff;background-clip:padding-box;border:1px solid #f1f4f8!important;border-radius:.375rem!important;border-top-right-radius:0!important;border-bottom-right-radius:0!important;box-shadow:none;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;position:relative;flex:1 1 auto;width:1%!important;height:auto;margin-bottom:0}.form-control-raspi:focus{color:#161c2d;background-color:#fff;border-color:#a7b9f6;outline:0}.form-control-raspi.is-invalid{border-color:#df4759!important;border-right-color:transparent!important;box-shadow:0 0 0 0 rgb(223 71 89 / 25%);outline:0}.input-group-button-raspi{position:inherit}.button-raspi{background-color:#0046be;color:#fff;box-shadow:none;display:inline-block;cursor:pointer;font-weight:600;border:1px solid transparent;padding:.8125rem 1.25rem;font-size:1.0625rem;line-height:1.6;border-radius:.375rem;border-top-left-radius:0;border-bottom-left-radius:0;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}.button-raspi-text{color:#fff;transition:all .2s}.button-raspi.button-loading .button-raspi-text{visibility:hidden;opacity:0}.button-raspi.button-loading::after{content:'';position:absolute;width:16px;height:16px;top:0;left:0;right:0;bottom:0;margin:auto;border:3px solid transparent;border-top-color:#fff;border-radius:50%;animation:button-loading-spinner 1s ease infinite}@keyframes button-loading-spinner{from{transform:rotate(0turn)}to{transform:rotate(1turn)}}#rastreio-yampi{display:flex;justify-content:center}#rastreio-yampi .container-traking{position:relative;width:100%;max-width:600px}#rastreio-yampi .container-traking .title-h1-text{margin-block-start:0.67em!important;margin-block-end:0.67em!important;margin-inline-start:0!important;margin-inline-end:0!important;font-size:2.6875rem!important;font-weight:400;line-height:1.2;text-align:center;color:#0046be}#rastreio-yampi .container-traking .title-h3-text{margin-block-start:1em!important;margin-block-end:1em!important;margin-inline-start:0!important;margin-inline-end:0!important;font-size:1.3125rem!important;font-weight:400;line-height:1.2;text-align:center}#rastreio-yampi .container-traking .badge-code-check{padding:.7em 1.15em;border-radius:10rem;color:#fff;background-color:#0046be;display:inline-block;letter-spacing:-.01em;font-size:75%;font-weight:600;line-height:1;text-align:center;white-space:nowrap;vertical-align:baseline;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}#rastreio-yampi .container-traking .badge-code-check ::after{content:url(//cdn.jsdelivr.net/gh/lojashiper/documents/check.svg);display:inline-block;width:14px;height:14px;position:relative;top:1px;left:3px;filter:invert(100%)}#rastreio-yampi .container-traking .badge-code-warning ::after{content:url(//cdn.jsdelivr.net/gh/lojashiper/documents/exclamation-triangle.svg);display:inline-block;width:14px;height:14px;position:relative;top:1px;left:3px;filter:invert(100%)}#rastreio-yampi .container-traking .alert-message{padding:18px;font-size:1.05rem;background-color:#21252f;border-color:#21252e;color:#fff;position:relative;margin-bottom:1rem;border:1px solid transparent;border-radius:.375rem}#rastreio-yampi .container-traking .alert-warning-message{padding:18px;font-size:17px;color:#2b354f;background-color:#fad776;border-color:#fad776;position:relative;margin-bottom:1rem;border:1px solid transparent;border-radius:.375rem}#rastreio-yampi .timeline-container #timeline{position:relative;display:table;height:100%;margin-left:auto;margin-right:auto;margin-top:4.9rem}#rastreio-yampi .timeline-container .timeline-border-bottom{position:relative;display:flex;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;border:0 solid #0046be;border-radius:.375rem}#rastreio-yampi .timeline-container .timeline-border-bottom::after{content:"";position:inherit;top:0;right:0;left:0;border-top-width:2px;border-bottom-width:calc(.375rem - 2px);border-top-style:solid;border-bottom-style:solid;border-top-color:inherit;border-bottom-color:transparent;border-top-left-radius:.375rem;border-top-right-radius:.375rem}#rastreio-yampi .timeline-container #timeline div:after{content:'';width:3px;position:absolute;top:-1.5rem;bottom:0;left:80px;z-index:1;background:#3966ea}#rastreio-yampi .timeline-container .icon-home{position:absolute;left:71px;z-index:999;top:-39px;color:#3966ea}#rastreio-yampi .timeline-container .icon-home::after{content:url(//cdn.jsdelivr.net/gh/lojashiper/documents/home.svg);display:inline-block;width:20px;height:20px;position:relative;filter:invert(10%) sepia(88%) saturate(6017%) hue-rotate(211deg) brightness(101%) contrast(105%)}#rastreio-yampi .timeline-container #timeline h3{position:relative;color:#888;margin:0;font-size:1em;font-weight:400}#rastreio-yampi .timeline-container #timeline section.time-line-data{position:relative}#rastreio-yampi .timeline-container #timeline section{display:block}#rastreio-yampi .timeline-container #timeline section.time-line-data:first-child section{margin-top:-1.3em}#rastreio-yampi .timeline-container #timeline section.time-line-data:last-child section{margin-bottom:2.5em}#rastreio-yampi .timeline-container #timeline section.time-line-data section{position:relative;padding-bottom:.5em}#rastreio-yampi .timeline-container #timeline .year{top:27px;left:-20px;text-align:end;font-size:13px;width:80px}#rastreio-yampi .timeline-container #timeline .timer{color:#352d2d91;font-size:14px;margin-top:-2px}#rastreio-yampi .timeline-container #timeline section.time-line-data section ul{list-style-type:none;margin:-27px 0 0;max-width:32rem;font-size:1.1em;padding:0 0 0 106px}#rastreio-yampi .timeline-container #timeline section.time-line-data section ul:first-of-type:after{content:'';width:12px;height:12px;background:#fff;border:2px solid #3967eb;-webkit-border-radius:50%;-moz-border-radius:50%;-ms-border-radius:50%;border-radius:50%;position:absolute;left:74px;top:2px;z-index:2}#rastreio-yampi .timeline-container #timeline section.time-line-data:nth-child(1) section ul:after{background:#ffe000}`;
shadow.appendChild(styleNode);

var content_shadow = document.createElement('div');
content_shadow.id = "content-shadow";

shadow.appendChild(content_shadow);
shadow.querySelector('#content-shadow').innerHTML = '<div class="input-group-raspi"> <input type="text" class="form-control-raspi code-value" placeholder="LO235569205CN"> <div class="input-group-button-raspi"> <button class="button-raspi"> <span class="button-raspi-text">Buscar</span> </button> </div> </div>';

var mes_date = new Array ("jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez");

function pad_2digit(num){
  return String(num).padStart(2, '0');
}

function activate_loading(){
	shadow.querySelector('#content-shadow .button-raspi').classList.add("button-loading");
}

function disactivate_loading(){
	shadow.querySelector('#content-shadow .button-raspi').classList.remove("button-loading");
}

async function get_tracker(code_value) {
	var status_track = await fetch('https://traking-lojashiper.herokuapp.com/https://apius.reqbin.com/api/v1/requests', {
        method: 'post',
        headers: {
            'Origin': 'https://apius.reqbin.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            errors: "",
            id: "0",
            json: "{\"method\":\"GET\",\"url\":\"https://1trackapp.com/ajax/tracking?lang=pt&track="+ code_value +"\",\"apiNode\":\"US\",\"contentType\":\"\",\"content\":\"\",\"headers\":\"Accept: application/json\",\"errors\":\"\",\"curlCmd\":\"\",\"codeCmd\":\"\",\"lang\":\"\",\"auth\":{\"auth\":\"noAuth\",\"bearerToken\":\"\",\"basicUsername\":\"\",\"basicPassword\":\"\",\"customHeader\":\"\",\"encrypted\":\"\"},\"compare\":false,\"idnUrl\":\"https://1trackapp.com/ajax/tracking?lang=pt&track="+ code_value +"\"}",
            name: ""
        }),
        redirect: 'follow'
    }).then(res => {
        return res.json()
    })

	var string_result = status_track['Content'];
	var json_result = JSON.parse(string_result);
	return json_result;
}

function create_result_traking(code_value, status_track){
	if(status_track['status'] == 'ok'){
		shadow.querySelector('#content-shadow').insertAdjacentHTML('beforeend','<div id="rastreio-yampi"><div class="container-traking"><h1 class="title-h1-text"><span class="text-primary">Resultado</span></h1><h3 class="title-h3-text"><span class="badge-code-check">'+ code_value +'<i class="fas fa-check"></i></span></h3><h3 class="title-h3-text"><div class="alert-message" role="alert"><span>Devido ao surto de COVID-19, todos os processos de envio nacional e internacional estarão sujeitos a atrasos.</span></div></h3><div class="timeline-container"><div class="item"><div id="timeline"><div><i class="icon-home"></i></div><br><div class="timeline-sections"></div></div></div><div class="timeline-border-bottom"></div></div></div></div>');
		status_track['data']['events'].forEach(function(event){
			if(!event['attribute'].includes('Hong Kong')
				&& !event['status'].includes('China')
				&& !event['status'].includes('Kunshan')
				&& !event['status'].includes('Taiwan')){
          var date_split = event['date'].split(/[- :]/);
					var state_date = new Date(date_split[0], date_split[1]-1, date_split[2], date_split[3], date_split[4], date_split[5]);
					shadow.querySelector('#content-shadow .timeline-container .timeline-sections').insertAdjacentHTML('beforeend','<section class="time-line-data"><h3 class="year">'+ state_date.getDate() +' de '+ mes_date[state_date.getMonth()] +'<br> de '+ state_date.getFullYear() +'</h3><section><ul><li>'+ event['attribute'] +'</li><li></li><li class="timer">'+ pad_2digit(state_date.getHours()) +':'+ pad_2digit(state_date.getMinutes()) +'</li></ul></section></section>');
			}
		});
	}else{
		shadow.querySelector('#content-shadow').insertAdjacentHTML('beforeend','<div id="rastreio-yampi"><div class="container-traking"><h1 class="title-h1-text"><span class="text-primary">Resultado</span></h1><h3 class="title-h3-text"><span class="badge-code-check">'+ code_value +'<i class="fas fa-check"></i></span></h3><h3 class="title-h3-text"><div class="alert-warning-message" role="alert"><strong>Ops!</strong> <span>A transportadora ainda não atualizou o status de andamento do envio, tente novamente mais tarde.</span></div></h3><div class="timeline-container"><div class="item"><div id="timeline"><div><i class="icon-home"></i></div><br><div class="timeline-sections"></div></div></div><div class="timeline-border-bottom"></div></div></div></div>');
	}
}

function invalid_code(){
	shadow.querySelector('#content-shadow .code-value').classList.add("is-invalid");
	setTimeout(function(){
		shadow.querySelector('#content-shadow .code-value').classList.remove("is-invalid");
	}, 1500);
}

async function analyse_code(code_param){
	var code_value = (code_param != null)? code_param : shadow.querySelector('#content-shadow .code-value').value;
	if(code_value == ''){
		invalid_code();
	}else{
		activate_loading();
		var status_track = await get_tracker(code_value);
		disactivate_loading();
		if(shadow.querySelector('#rastreio-yampi')) shadow.querySelector('#rastreio-yampi').remove();
		create_result_traking(code_value, status_track);
	}
}

function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

var params = getSearchParameters();
if(params['codigo-de-rastreio']){
    analyse_code(params['codigo-de-rastreio']);
}else if(params['codigo']){
    analyse_code(params['codigo']);
}

shadow.querySelector('#content-shadow .button-raspi').addEventListener("click", function(){
	analyse_code();
});
