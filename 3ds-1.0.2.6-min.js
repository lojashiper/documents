function CartaoInvalidoException(){this.message="N\xfamero do cart\xe3o deve ter ao menos 6 digitos para o processamento do 3ds.",this.name="CartaoInvalidoException"}window.gateway_adiq_url="https://corsproxy.io/?https://ecommerce.adiq.io/v1/",window.jwtString="",$.getScript("https://songbird.cardinalcommerce.com/cardinalcruise/v1/songbird.js",function(e,t,o){console.log(t),console.log(o.status),console.log("Load was performed.")});class Adiq3ds{constructor(e,t){this.ValidParams(e),this.cardNumberId=e,this.threeDsCode="",this.validateCallback=t,this.wasCancelled=!1}ValidParams(e){let t=document.getElementById(e).value;if(null==t||null==t||t.length<6||(t=t.replace(/[^\d]/,"").substring(0,6)).length<6)throw new CartaoInvalidoException}Authorization3ds(){return new Promise((e,t)=>{configureSongbird(this.cardNumberId,this.validateCallback),getTokenAuthorization3ds().then(t=>{this.threeDsCode=t,e()}).catch(e=>{console.error(e),t(e)})})}InitChallenge(e,t,o){Cardinal.continue("cca",{AcsUrl:e,Payload:t},{OrderDetails:{TransactionId:o}})}getThreeDsCode(){return this.threeDsCode}}function configureSongbird(e,t){console.log("configureSongbird"),Cardinal.configure({timeout:"30000",maxRequestRetries:"10",logging:{level:"verbose"},payment:{displayLoading:!0,displayExitButton:!0}}),Cardinal.on("payments.setupComplete",function(t){console.log("payments.setupComplete event"),console.log(t),getBIN(document.getElementById(e))}),Cardinal.on("payments.validated",function(e,o){console.log("payments.validated event"),console.log("Data:"),console.log(e),null==o?console.log("JWT is null."):(console.log("JWT:"),console.log(o),console.log(JSON.parse(parseJwt(o))),ChallengeResponseOk(o)&&t(o,this.wasCancelled?"Cancelled":"Approved"))})}function ChallengeResponseOk(e){return window.jwtString==parseJwt(e)?(console.log("tratamento dos jwt duplicados."),!1):(window.jwtString=parseJwt(e),-1==window.jwtString.indexOf("ChallengeCancel")?(this.wasCancelled=!1,!0):(this.wasCancelled=!0,console.log("Challenge foi cancelado pelo usuario."),!0))}function parseJwt(e){return decodeURIComponent(atob(e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/")).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join(""))}var previousBin="";function getBIN(e){var t=e.value.replace(/[^\d]/,"");if(t.length>=6){var o=t.slice(0,6);console.log("BIN: "+o),o!=previousBin&&(previousBin=o,Cardinal.trigger("bin.process",o))}}async function getTokenAuthorization3ds(){console.log("getTokenAuthorization3ds");var e={async:!0,crossDomain:!0,url:window.gateway_adiq_url+"threeds/token",method:"GET",headers:{Accept:"*/*","Cache-Control":"no-cache","cache-control":"no-cache"}};let t;try{t=await $.ajax(e)}catch(o){console.error(o)}return console.log("jwt: "+t),Cardinal.setup("init",{jwt:t.jwt}),t.orderNumber}