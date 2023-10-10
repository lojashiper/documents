function CartaoInvalidoException() {
    this.message = "Número do cartão deve ter ao menos 6 digitos para o processamento do 3ds.", this.name = "CartaoInvalidoException"
}
window.gateway_adiq_url = "https://corsproxy.io/?https://ecommerce.adiq.io/v1/", window.jwtString = "", $.getScript("https://songbird.cardinalcommerce.com/cardinalcruise/v1/songbird.js", function(e, o, n) {
    console.log(o), console.log(n.status), console.log("Load was performed.")
});
class Adiq3ds {
    constructor(e, o) {
        this.ValidParams(e), this.cardNumberId = e, this.threeDsCode = "", this.validateCallback = o, this.wasCancelled = !1
    }
    ValidParams(e) {
        let o = document.getElementById(e).value;
        if(null == o || null == o || o.length < 6) throw new CartaoInvalidoException;
        if((o = o.replace(/[^\d]/, "").substring(0, 6)).length < 6) throw new CartaoInvalidoException
    }
  
    Authorization3ds() {
      return new Promise((resolve, reject) => {
        configureSongbird(this.cardNumberId, this.validateCallback);
        getTokenAuthorization3ds()
          .then((e) => {
            this.threeDsCode = e;
            resolve();
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    }
    InitChallenge(e, o, n) {
        Cardinal.continue("cca", {
            AcsUrl: e,
            Payload: o
        }, {
            OrderDetails: {
                TransactionId: n
            }
        })
    }
    getThreeDsCode() {
        return this.threeDsCode
    }
}

function configureSongbird(e, o) {
    console.log("configureSongbird"), Cardinal.configure({
        timeout: "30000",
        maxRequestRetries: "10",
        logging: {
            level: "verbose"
        },
        payment: {
            displayLoading: !0,
            displayExitButton: !0
        }
    }), Cardinal.on("payments.setupComplete", function(o) {
        console.log("payments.setupComplete event"), console.log(o), getBIN(document.getElementById(e))
    }), Cardinal.on("payments.validated", function(e, n) {
        console.log("payments.validated event"), console.log("Data:"), console.log(e), null == n ? console.log("JWT is null.") : (console.log("JWT:"), console.log(n), console.log(JSON.parse(parseJwt(n))), ChallengeResponseOk(n) && o(n, this.wasCancelled ? "Cancelled" : "Approved"))
    })
}

function ChallengeResponseOk(e) {
    return window.jwtString == parseJwt(e) ? (console.log("tratamento dos jwt duplicados."), !1) : (window.jwtString = parseJwt(e), -1 == window.jwtString.indexOf("ChallengeCancel") ? (this.wasCancelled = !1, !0) : (this.wasCancelled = !0, console.log("Challenge foi cancelado pelo usuario."), !0))
}

function parseJwt(e) {
    var o = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return decodeURIComponent(atob(o).split("").map(function(e) {
        return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
    }).join(""))
}
var previousBin = "";

function getBIN(e) {
    var o = e.value.replace(/[^\d]/, "");
    if(o.length >= 6) {
        var n = o.slice(0, 6);
        console.log("BIN: " + n), n != previousBin && (previousBin = n, Cardinal.trigger("bin.process", n))
    }
}
async function getTokenAuthorization3ds() {
    console.log("getTokenAuthorization3ds");
    var e = {
        async: !0,
        crossDomain: !0,
        url: window.gateway_adiq_url + "threeds/token",
        method: "GET",
        headers: {
            Accept: "*/*",
            "Cache-Control": "no-cache",
            "cache-control": "no-cache"
        }
    };
    let o;
    try {
        o = await $.ajax(e)
    } catch (e) {
        console.error(e)
    }
    return console.log("jwt: " + o), Cardinal.setup("init", {
        jwt: o.jwt
    }), o.orderNumber
}
