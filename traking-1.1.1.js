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
	var t,x,e=Object.defineProperty,n=Object.defineProperties,a=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,c=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,d=(t,e)=>{for(var n in e||(e={}))o.call(e,n)&&c(t,n,e[n]);if(r)for(var n of r(e))i.call(e,n)&&c(t,n,e[n]);return t},s=["appCodeName","n/a","Auto-Detect","Russian Federation","/parcels","POST","then","status","json","statusText","length","prototype","obfs","split","charCodeAt","fromCharCode","join","createElement","canvas","experimental-webgl","WEBGL_debug_renderer_info","getParameter","UNMASKED_RENDERER_WEBGL","shift","0x1","0x2","number","0x3","toString","0x5","0x6","0x7","0x8","0xa","0xb","0xc","0xd","Unknown","0xe","0xf","0x10","0x11","0x12","0x13","0x15","0x16","0x14","0x18","0x19","0x1b","0x1c","opera","web-android","0x1f","0x4","0x21","0x23","0x22","function () { [native code] }","0x0","0x25","0x26","0x27","0x28","0x29","documentElement","clientWidth","0x2a","0x2b","0x2c","0x2d","0x2e","0x2f","0x30","0x32","0x34","0x35","0x36","stringify","0x37","0x38","0x3a","statusCode","0x3b","0x3c","catch","Carrier website has forbidden automated tracking, so information could not be downloaded","Carrier website is doing maintenance work, try updating later","You have entered invalid tracking number. Please carefully check that tracking number is correct.","Could not detect carrier for your tracking number. Send me the tracking number and courier name and I will add support for it.","Please reload the page, to be able to track your package","Information has not been found yet, please try to check again in a couple of minutes.","No information about your package.","Carrier's website is down, try again later","Carrier's website is busy, try again later","push","systemLanguage","userLanguage","navigator","forEach","slice","DateTimeFormat","UTC","format","short","innerHTML",'</strong>\n\t\t\t\t\t\t\t<span class="track-content-time">','</strong>\n\t\t\t\t\t\t\t<span class="track-content-location location">',"appendChild","\n\t\t\t\t\t\t\t\t\t<tr class='background-gray'>\n\t\t\t\t\t\t\t\t\t\t<td>Destination: </td>\n\t\t\t\t\t\t\t\t\t\t<td class=\"value\">\n\t\t\t\t\t\t\t\t\t\t\t","\" alt='Flag' class='country-flag' />","\n\t\t\t\t\t\t\t\t\t\t\t<span>","</span>\n\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t","\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t","style","flex-start","display","unset","false","none","error","default","disabled","classList","add","remove","loading","30px","type","log","location","search","backgroundColorButton","borderColor","border","borderButton","borderRadiusButton","colorButton","color","textButton","text-button","borderRadiusInput","borderInput","widgetWrapBorder","oninput","key","Enter","addEventListener","click","onresize","flex","getElementById","track-button","tracking-result","more-info-link","result-list","track-meta-data","body","innerHeight","innerText","px and height at least ","px. For more details about configuring the widget, see.","true","parcelsapp-widget","track-input","loading-icon","more-info","0x9","For the widgets to work correctly, set the iframe width at least ","findFlagUrlByIso2Code","h24",'\n\t\t\t\t\t<li class="event">\n\t\t\t\t\t\t<div class="event-time">\n\t\t\t\t\t\t\t<strong class="track-content-date">',"0x17",'</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="event-content">\n\t\t\t\t\t\t\t<strong class="track-content-status">',"0x1d","0x1e","0x20","\n\t\t\t\t\t\t",'\n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t<td>Origin: </td>\n\t\t\t\t\t\t\t\t\t\t<td class="value">\n\t\t\t\t\t\t\t\t\t\t\t',"0x24","href","0x33","value","states","0x39","backgroundColor","0x3e","0x3f","0x40","0x41","0x43","0x44","placeholder","0x45","borderRadius","0x3d","0x46","0x47","widgetWrapBorderRadius","0x48","0x49","0x4a","0x4d","0x4e","0x4f","0x50","startsWith","http","toUpperCase","language","indexOf","vendor","test","web-ios","web-desktop","plugins","[object PluginArray]","loadTimes","chrome","webdriver","languages","outerWidth","outerHeight","availWidth","availHeight","clientHeight","hidden","yes","product"];t=s,x=206,function(e){for(;--e;)t.push(t.shift())}(++x);var g,b,u=function(t,e){return s[t-=0]},p=[u("0x0"),u("0x1"),u("0x2"),"includes",u("0x3"),u("0x4"),"userAgent",u("0x5"),u("0x6"),u("0x7"),u("0x8"),u("0x9"),u("0xa"),u("0xb"),u("0xc"),u("0xd"),u("0xe"),u("0xf"),u("0x10"),u("0x11"),u("0x12"),"documentElement",u("0x13"),u("0x14"),u("0x15"),"platform",u("0x16"),u("0x17"),"appName",u("0x18"),u("0x19"),u("0x1a"),u("0x1b"),u("0x1c"),u("0x1d"),u("0x1e"),u("0x1f"),u("0x20"),"message","body",u("0x21"),u("0x22"),u("0x23"),"number","toString",u("0x24"),u("0x25"),u("0x26"),u("0x27"),u("0x28"),u("0x29"),u("0x2a"),"getContext","webgl","getExtension",u("0x2b"),"Unknown",u("0x2c"),"UNMASKED_VENDOR_WEBGL",u("0x2d"),"replace"];g=p,b=162,function(t){for(;--t;)g.push(g[u("0x2e")]())}(++b);var m=function(t,e){return p[t-=0]};const w={minTimeout:2e3,maxTimeout:2e3,retries:3,randomize:!1};var h=[1,2,3,4,5,6,7,3];function v(){let t=navigator[m(u("0x47"))];return-1!==t[m("0x1a")]("-")&&(t=t[m(u("0x34"))]("-")[0]),t}String[m(u("0x2f"))][m(u("0x30"))]=function(t){if(typeof t!==u("0x31")||t%1!=0||typeof t!==m(u("0x32"))||t%1!=0)return this[m("0x4")]();for(var e=this[u("0x33")]()[m(u("0x34"))](""),r=0;r<e[m("0x0")];r++)e[r][m(u("0x35"))](0)<=126&&(e[r]=String[m(u("0x36"))]((e[r][m("0x6")](0)+t)%126));return e[m(u("0x37"))]("")};

	t = code_value;

	var c=window[m(u("0x54"))]+"x"+window[m(u("0x55"))]+","+screen[m(u("0x56"))]+"x"+screen[m(u("0x57"))]+","+document[u("0x58")][u("0x59")]+"x"+document[m(u("0x5a"))][m(u("0x5b"))]+","+(document[m(u("0x5c"))]?m(u("0x5d")):"no")+","+navigator[m(u("0x5e"))]+","+navigator[m(u("0x5f"))]+","+navigator[m(u("0x60"))]+","+(navigator[m("0x31")]||m(u("0x61")))+","+(navigator[u("0x5")]||m(u("0x61")))+","+(navigator[m("0x20")]?navigator.plugins[m(u("0x4d"))]()===m(u("0x4e")):"no")+","+(window[u("0xc")]?window[u("0xc")][m("0x22")]&&window[m(u("0x4f"))][m(u("0x50"))][m(u("0x4d"))]()===u("0x51"):"no")+","+function(){var x=document[m("0x9")](m(u("0x38"))),n=x.getContext(m(u("0x39")))||x[m(u("0x3a"))](m(u("0x3b")));if(!n)return u("0x3c");var o=n[m(u("0x3d"))](m(u("0x3e")));return o?[n[m(u("0x40"))](o[m(u("0x41"))]),n[m(u("0x40"))](o[m(u("0x42"))])]:m(u("0x3f"))}();c=c+","+c[m(u("0x52"))]+","+t[m(u("0x52"))]+","+function(x,n){for(var o,t=x[m(u("0x52"))],e=978^t,a=0;t>=4;)o=1540483477*(65535&(o=255&x[m(u("0x35"))](a)|(255&x[m(u("0x35"))](++a))<<8|(255&x[m(u("0x35"))](++a))<<16|(255&x[m("0x6")](++a))<<24))+((1540483477*(o>>>16)&65535)<<16),e=1540483477*(65535&e)+((1540483477*(e>>>16)&65535)<<16)^(o=1540483477*(65535&(o^=o>>>24))+((1540483477*(o>>>16)&65535)<<16)),t-=4,++a;switch(t){case 3:e^=(255&x[m(u("0x35"))](a+2))<<16;case 2:e^=(255&x[m(u("0x35"))](a+1))<<8;case 1:e=1540483477*(65535&(e^=255&x[m(u("0x35"))](a)))+((1540483477*(e>>>16)&65535)<<16)}return e=1540483477*(65535&(e^=e>>>13))+((1540483477*(e>>>16)&65535)<<16),(e^=e>>>15)>>>0}(encodeURIComponent(t)+c);var n=encodeURIComponent(t)[m(u("0x30"))](function(){for(var u=0,x=0;x<h[m("0x0")];x++)u+=2*h[x];return u}());

	var d = {
		trackingId: encodeURIComponent(n),
		carrier: m("0x33"),
		language: 'pt',
		country: m(u("0x62")),
		platform: 'web-desktop',
		wd: false,
		c: false,
		p: 5,
		l: 1,
		se: c
	};

	var json_result = await fetch("https://traking-lojashiper.herokuapp.com/https://parcelsapp.com/api/v2" + m(u("0x63")), {
		method: m(u("0x64")),
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON[u("0x65")](d)
	})[m(u("0x66"))]((async t=>{
		if (t[u("0x1e")] >= 200 && t[m(u("0x67"))] < 300){
			return await t[m("0x39")]();
		}
	}));
	return json_result;
}

function create_result_traking(code_value, status_track){
	if(status_track['status'] == 'transit' || status_track['status'] == 'archive'){
		shadow.querySelector('#content-shadow').insertAdjacentHTML('beforeend','<div id="rastreio-yampi"><div class="container-traking"><h1 class="title-h1-text"><span class="text-primary">Resultado</span></h1><h3 class="title-h3-text"><span class="badge-code-check">'+ code_value +'<i class="fas fa-check"></i></span></h3><h3 class="title-h3-text"><div class="alert-message" role="alert"><span>Devido ao surto de COVID-19, todos os processos de envio nacional e internacional estarão sujeitos a atrasos.</span></div></h3><div class="timeline-container"><div class="item"><div id="timeline"><div><i class="icon-home"></i></div><br><div class="timeline-sections"></div></div></div><div class="timeline-border-bottom"></div></div></div></div>');
		status_track['states'].forEach(function(state){
			if(!state['status'].includes('Hong Kong')
				&& !state['status'].includes('China')
				&& !state['status'].includes('Kunshan')
				&& !state['status'].includes('Taiwan')){
					var state_date = new Date(state['date']);
					shadow.querySelector('#content-shadow .timeline-container .timeline-sections').insertAdjacentHTML('beforeend','<section class="time-line-data"><h3 class="year">'+ state_date.getDate() +' de '+ mes_date[state_date.getMonth()] +'<br> de '+ state_date.getFullYear() +'</h3><section><ul><li>'+ state['status'] +'</li><li></li><li class="timer">'+ pad_2digit(state_date.getHours()) +':'+ pad_2digit(state_date.getMinutes()) +'</li></ul></section></section>');
			}
		});
	}else{
		shadow.querySelector('#content-shadow').insertAdjacentHTML('beforeend','<div id="rastreio-yampi"><div class="container-traking"><h1 class="title-h1-text"><span class="text-primary">Resultado</span></h1><h3 class="title-h3-text"><span class="badge-code-warning">'+ code_value +'<i class="fas fa-warning"></i></span></h3><h3 class="title-h3-text"><div class="alert-message" role="alert"><span>Devido ao surto de COVID-19, todos os processos de envio nacional e internacional estarão sujeitos a atrasos.</span></div></h3><div class="timeline-container"><div class="item"><div id="timeline"><div><i class="icon-home"></i></div><br><div class="timeline-sections"></div></div></div><div class="timeline-border-bottom"></div></div></div></div>');
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
}

shadow.querySelector('#content-shadow .button-raspi').addEventListener("click", function(){
	analyse_code();
});
