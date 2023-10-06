function CartaoInvalidoException() {
  this.message = "Número do cartão deve ter pelo menos 6 dígitos para o processamento do 3DS.";
  this.name = "CartaoInvalidoException";
}

window.gateway_adiq_url = "https://ecommerce-hml.adiq.io/v1/";
window.jwtString = "";

fetch("https://songbirdstag.cardinalcommerce.com/cardinalcruise/v1/songbird.js")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Failed to fetch songbird.js");
    }
    return response.text();
  })
  .then(function (scriptContent) {
    // Coloque seu código relacionado ao songbird.js aqui
    console.log("Load was performed.");
  })
  .catch(function (error) {
    console.error("Error fetching songbird.js:", error);
  });

class Adiq3ds {
  constructor(e, o) {
    this.ValidParams(e);
    this.cardNumberId = e;
    this.threeDsCode = "";
    this.validateCallback = o;
    this.wasCancelled = false;
  }

  ValidParams(e) {
    let o = document.getElementById(e).value;
    if (o === null || o === undefined || o.length < 6) {
      throw new CartaoInvalidoException();
    }
    o = o.substring(0, 6).replace(/[^\d]/g, "");
    if (o.length < 6) {
      throw new CartaoInvalidoException();
    }
  }

  Authorization3ds() {
    configureSongbird(this.cardNumberId, this.validateCallback);
    getTokenAuthorization3ds()
      .then((e) => {
        this.threeDsCode = e;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  InitChallenge(e, o, n) {
    Cardinal.continue("cca", { AcsUrl: e, Payload: o }, { OrderDetails: { TransactionId: n } });
  }

  getThreeDsCode() {
    return this.threeDsCode;
  }
}

function configureSongbird(e, o) {
  console.log("configureSongbird");
  Cardinal.configure({
    timeout: "30000",
    maxRequestRetries: "10",
    logging: { level: "verbose" },
    payment: { displayLoading: true, displayExitButton: true },
  });

  Cardinal.on("payments.setupComplete", function (o) {
    console.log("payments.setupComplete event");
    console.log(o);
    getBIN(document.getElementById(e));
  });

  Cardinal.on("payments.validated", function (e, n) {
    console.log("payments.validated event");
    console.log("Data:");
    console.log(e);

    if (n === null) {
      console.log("JWT is null.");
    } else {
      console.log("JWT:");
      console.log(n);
      console.log(JSON.parse(parseJwt(n)));

      if (ChallengeResponseOk(n)) {
        o(n, this.wasCancelled ? "Cancelled" : "Approved");
      }
    }
  });
}

function ChallengeResponseOk(e) {
  if (window.jwtString === parseJwt(e)) {
    console.log("tratamento dos jwt duplicados.");
    return false;
  } else {
    window.jwtString = parseJwt(e);
    if (window.jwtString.indexOf("ChallengeCancel") === -1) {
      this.wasCancelled = false;
      return true;
    } else {
      this.wasCancelled = true;
      console.log("Challenge foi cancelado pelo usuário.");
      return true;
    }
  }
}

function parseJwt(e) {
  var o = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(
    atob(o)
      .split("")
      .map(function (e) {
        return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

var previousBin = "";

function getBIN(e) {
  e.value = e.value.replace(/[^\d]/g, "");
  var o = e.value;
  if (o.length >= 6) {
    var n = o.slice(0, 6);
    console.log("BIN: " + n);
    if (n !== previousBin) {
      previousBin = n;
      Cardinal.trigger("bin.process", n);
    }
  }
}

function getTokenAuthorization3ds() {
  console.log("getTokenAuthorization3ds");
  var e = {
    "headers": {
      "accept": "*/*",
      "accept-language": "pt-BR,pt;q=0.9",
      "Cache-Control": "no-cache",
      "cache-control": "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site"
    },
    "referrer": "https://pontodeamor.pay.yampi.com.br/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  };

  return fetch(window.gateway_adiq_url + "threeds/token", e)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }
      return response.json();
    })
    .then(function (data) {
      console.log("jwt: " + data.jwt);
      Cardinal.setup("init", { jwt: data.jwt });
      return data.jwt;
    })
    .catch(function (error) {
      console.error("Error fetching token:", error);
    });
}
