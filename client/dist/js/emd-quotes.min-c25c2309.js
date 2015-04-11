"use strict";!function(){angular.module("emd.client.socket.module",["btford.socket-io"]).service("SocketService",["socketFactory",function(e){return e()}])}();var quotesApp=angular.module("quotes",["ngResource","ngNewRouter","btford.socket-io","emd.client.socket.module","emd.ng-xtorage"]);quotesApp.config(["$locationProvider","$xtorageProvider",function(e,t){e.html5Mode(!0),t.storage="sessionStorage"}]),quotesApp.constant("QUOTE_LIKED_KEY","q_liked"),quotesApp.constant("VERSION","0.0.1"),quotesApp.constant("author",{name:"Eric Mendes Dantas",github:"https://github.com/ericmdantas"}),quotesApp.factory("QuotesResource",["$resource",function(e){var t="/api/quotes/:type/:id",o={id:"@id"},r={update:{method:"PUT"}};return e(t,o,r)}]),quotesApp.service("Randomizer",[function(){var e=function(e){for(var t,o,r=e.length;r;)o=Math.floor(Math.random()*r--),t=e[r],e[r]=e[o],e[o]=t;return e},t=function(e){var t=e.length,o=Math.floor(Math.random()*t);return[e[o]]};this.shuffle=e,this.shuffleSingle=t}]),quotesApp.service("QuotesDAO",["$q","$xtorage","SocketService","QuotesModel","QuotesCache","QuotesResource","QUOTE_LIKED_KEY",function(e,t,o,r,n,a,u){var i=function(){var e=function(e){var o=[],n=t.getFromLocalStorage(u)||[];return angular.forEach(e,function(e){angular.forEach(n,function(t){t===e._id&&(e.alreadyLiked=!0)}),o.push(new r(e))}),o};return a.query().$promise.then(e)},s=function(e){if(!angular.isString(e))throw new Error("O id passado não é uma string válida. Não será possível favoritar a mensagem.");o.emit("fav:quote",e)},c=function(t){var o=function(e){var t=new r(e);return t},n=function(t){var o={msg:t.data.error,status:t.status};return e.reject(o)};return angular.isObject(t)&&t instanceof r&&t.isValid()?(t.quote=t.removeQuotationMarks(),a.save(t).$promise.then(o)["catch"](n)):e.reject(new Error("Não é possível criar uma nova frase, pois a mesma não é válida."))};this.getAll=i,this.favQuote=s,this.createQuote=c}]),quotesApp.service("QuotesCache",["$xtorage",function(e){var t="q",o=function(o){if(!angular.isArray(o))throw new Error("A informação a ser armazenada em cache deve ser um array.");e.save(t,o)},r=function(){return e.get(t)};this.saveArray=o,this.getArray=r}]),quotesApp.factory("QuotesModel",[function(){function e(e){this.author=null,this.quote=null,this.likes=0,angular.extend(this,e)}return e.prototype={isValid:function(){return angular.isString(this.author)&&angular.isString(this.quote)},removeQuotationMarks:function(){var e=this.quote,t=/^"|^'|"$|'$/g;return e=e.replace(t,"")}},e}]),quotesApp.controller("QuoteController",["$rootScope","QuotesModel","QuotesDAO","SocketService","Randomizer",function(e,t,o,r,n){var a=this;a.quotes=[],a.quotesKeeper=[],a.favQuote=o.favQuote,a.quoteInstance=new t,a.order="author";var u=function(){var e=function(e){a.quotes=e,a.quotesKeeper=angular.copy(a.quotes)};o.getAll().then(e)};a.__onFavorited=function(e){angular.forEach(a.quotes,function(t,o){t._id===e._id&&(a.quotes[o].likes=e.likes)})},r.on("quote:faved",a.__onFavorited),a.createQuote=function(e){var r=function(e){a.quoteInstance=new t,a.quotes.push(e)};o.createQuote(e).then(r)},a.setSingle=function(e){if(!angular.isArray(e))throw new Error("Houve um erro ao randomizar as mensagens. O objeto passado não é um objeto ou array válido.");a.quotes=n.shuffleSingle(a.quotes),a.singleView=!0},a.setMultiple=function(){a.quotes=a.quotesKeeper,a.singleView=!1},a.setOrder=function(e){a.order=e},a.randomize=function(){a.quotes=n.shuffleSingle(a.quotesKeeper)},a.shuffle=function(){a.setOrder(null),n.shuffle(a.quotes)},u()}]),quotesApp.controller("RouterController",["$router",function(e){var t=[];t.push({path:"/",component:"quote"}),e.config(t)}]),quotesApp.directive("activable",[function(){return function(e,t,o){t.on("click",function(){var e=o.deactive||null;if(!angular.isString(e))throw new Error("É necessário informar o caminho do element a ser removido a classe active.");$(e).removeClass("active"),t.addClass("active")})}}]),quotesApp.directive("like",["$xtorage","QUOTE_LIKED_KEY",function(e,t){var o="partials/includes/likes.html",r=function(o,r){o.quoteLiked="true"===o.alreadyLiked,o.star=o.quoteLiked?"fa-star":"fa-star-o",r.on("click",function(){e.pushIntoLocalStorage(t,o.qid),o.star="fa-star"})};return{restrict:"E",templateUrl:o,link:r,scope:{liked:"&",numberlikes:"@",qid:"@",alreadyLiked:"@"}}}]),quotesApp.directive("showOtherOptions",[function(){var e=function(e,t){t.on("click",function(){$(".opt").not(t).slideToggle(),t.find(".fa").toggleClass("fa-minus")})};return e}]);