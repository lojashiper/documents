var mes_date = new Array ("jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez");

function pad_2digit(num){
  return String(num).padStart(2, '0');
}

document.querySelector('#rastreio-yampi').innerHTML = '<div class="input-group-raspi"> <input type="text" class="form-control-raspi code-value" placeholder="LO235569205CN"> <div class="input-group-button-raspi"> <button class="button-raspi"> <span class="button-raspi-text">Buscar</span> </button> </div> </div>';

function activate_loading(){
	document.querySelector('#rastreio-yampi .button-raspi').classList.add("button-loading");
}

function disactivate_loading(){
	document.querySelector('#rastreio-yampi .button-raspi').classList.remove("button-loading");
}

async function get_tracker(code_value) {
	let response = await fetch('https://1trackapp.com/ajax/tracking?lang=pt&track='+ code_value, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
    }
  });
	return await response.json();
}

function create_result_traking(code_value, status_track){
	if(status_track['status'] == 'ok'){
		document.querySelector('#rastreio-yampi').insertAdjacentHTML('beforeend','<div id="rastreio-yampi"><div class="container-traking"><h1 class="title-h1-text"><span class="text-primary">Resultado</span></h1><h3 class="title-h3-text"><span class="badge-code-check">'+ code_value +'<i class="fas fa-check"></i></span></h3><h3 class="title-h3-text"><div class="alert-message" role="alert" style="padding:18px;font-size:17px;background-color:#21252f;border-color:#21252e"><span>Devido ao surto de COVID-19, todos os processos de envio nacional e internacional estarão sujeitos a atrasos.</span></div></h3><div class="timeline-container"><div class="item"><div id="timeline"><div><i class="icon-home"></i></div><br><div class="timeline-sections"></div></div></div><div class="timeline-border-bottom"></div></div></div></div>');
		status_track['events'].forEach(function(event){
			var state_date = new Date(event['date']);
			document.querySelector('#rastreio-yampi .timeline-container .timeline-sections').insertAdjacentHTML('beforeend','<section class="time-line-data"><h3 class="year">'+ state_date.getDate() +' de '+ mes_date[state_date.getMonth()] +'<br> de '+ state_date.getFullYear() +'</h3><section><ul><li>'+ event['attribute'] +'</li><li></li><li class="timer">'+ pad_2digit(state_date.getHours()) +':'+ pad_2digit(state_date.getMinutes()) +'</li></ul></section></section>');
		});
	}
}

function invalid_code(){
	document.querySelector('#rastreio-yampi .code-value').classList.add("is-invalid");
	setTimeout(function(){
		document.querySelector('#rastreio-yampi .code-value').classList.remove("is-invalid");
	}, 1500);
}

async function analyse_code(){
	var code_value = document.querySelector('#rastreio-yampi .code-value').value;
	if(code_value == ''){
		invalid_code();
	}else{
		activate_loading();
		var status_track = await get_tracker(code_value);
		disactivate_loading();
		create_result_traking(code_value, status_track);
	}
}

document.querySelector('#rastreio-yampi .button-raspi').addEventListener("click", function(){
	analyse_code();
});
