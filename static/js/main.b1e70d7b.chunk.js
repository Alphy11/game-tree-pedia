(this["webpackJsonpgame-tree-pedia"]=this["webpackJsonpgame-tree-pedia"]||[]).push([[0],{143:function(e){e.exports=JSON.parse('{"title":"welcome"}')},444:function(e,n,t){},475:function(e,n,t){"use strict";t.r(n);t(236),t(246);var a=t(0),r=t.n(a),c=t(103),o=t(59);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(439);var i=t(101),l=t(230),u=t(15),s=t(146),m=t(145);function f(){var e=Object(s.a)(["\n  html,\n  body {\n    height: 100%;\n    width: 100%;\n  }\n\n  body {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  }\n\n  #root {\n    min-height: 100%;\n    min-width: 100%;\n  }\n\n  p,\n  label {\n    font-family: Georgia, Times, 'Times New Roman', serif;\n    line-height: 1.5em;\n  }\n\n  input, select {\n    font-family: inherit;\n    font-size: inherit;\n  }\n"]);return f=function(){return e},e}var h=Object(m.a)(f()),d=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{fallback:null},c=e;n&&(c=function(){return e().then((function(e){return{default:n(e)}}))});var o=Object(a.lazy)(c);return function(e){return r.a.createElement(a.Suspense,{fallback:t.fallback},r.a.createElement(o,e))}},b=d((function(){return Promise.all([t.e(3),t.e(4)]).then(t.bind(null,483))}),(function(e){return e.HomePage})),p=d((function(){return t.e(5).then(t.bind(null,484))}),(function(e){return e.NotFoundPage})),v=t(476);t(441),t(442),t(443),t(444);function g(){var e=Object(v.a)().i18n;return a.createElement(l.a,null,a.createElement(i.a,{titleTemplate:"%s - React Boilerplate",defaultTitle:"React Boilerplate",htmlAttributes:{lang:e.language}},a.createElement("meta",{name:"description",content:"A React Boilerplate application"})),a.createElement(u.c,null,a.createElement(u.a,{exact:!0,path:"/",component:b}),a.createElement(u.a,{component:p})),a.createElement(h,null))}var E=t(147),j=t(106),O=t(231),w=t(234),y=t(221),k=t(28);function B(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return 0===Object.keys(e).length?function(e){return e}:Object(k.c)(Object(y.a)({},e))}var R=t(233),T=t(85),N=t(232),S=t(143),A={},H={en:{translation:S}};!function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:A,a=arguments.length>2?arguments[2]:void 0;Object.keys(n).forEach((function(r){var c=a?"".concat(a,".").concat(r):r;"object"===typeof n[r]?(t[r]={},e(n[r],t[r],c)):t[r]=c}))}(S);R.a.use(T.e).use(N.a).init({resources:H,fallbackLng:"en",debug:!1,interpolation:{escapeValue:!1}});var J=function(){var e=Object(w.a)({}),n=e.run,t=[e],a=[Object(O.a)({createReducer:B,runSaga:n})];return Object(j.a)({reducer:B(),middleware:[].concat(Object(E.a)(Object(j.b)()),t),devTools:!1,enhancers:a})}(),P=document.getElementById("root");c.render(a.createElement(o.a,{store:J},a.createElement(i.b,null,a.createElement(a.StrictMode,null,a.createElement(g,null)))),P),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[475,1,2]]]);