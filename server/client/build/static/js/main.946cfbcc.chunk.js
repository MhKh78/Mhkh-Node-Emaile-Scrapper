(this["webpackJsonpemail-front"]=this["webpackJsonpemail-front"]||[]).push([[0],{152:function(e,a,t){},245:function(e,a,t){e.exports=t(419)},250:function(e,a,t){},419:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(48),c=t.n(l),s=(t(250),t(20)),u=t(27),i=t.n(u),m=t(49),o=(t(252),t(76),t(144)),E=t(433),d=t(429),p=t(51),f=(t(152),t(430)),b=t(75),h=t(428),v=t(432),g=t(50),O=t.n(g),j=function(){var e=Object(n.useState)("http://localhost:5000"),a=Object(s.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)(!1),u=Object(s.a)(c,2),d=u[0],g=u[1],j=Object(n.useState)([]),C=Object(s.a)(j,2),w=C[0],y=C[1],k=function(){var e=Object(m.a)(i.a.mark((function e(a){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.next=3,O.a.post("http://localhost:8000/find_emails",{url:t});case 3:if(n=e.sent,0!==(r=n.data).emailsFound.length){e.next=7;break}return e.abrupt("return",g(!0));case 7:if(y(r.emailsFound),r.status){e.next=10;break}return e.abrupt("return",alert("Problem With Url, must start with http"));case 10:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Finder"),r.a.createElement("div",null,r.a.createElement(f.a,null,r.a.createElement("div",null,r.a.createElement(b.a,null,"Search Url For Emails: "),r.a.createElement(h.a,{type:"text",value:t,onChange:function(e){return l(e.target.value)}})),r.a.createElement("div",null,r.a.createElement(o.a,{onClick:k,positive:!0},"Search"),r.a.createElement(o.a,null,r.a.createElement(p.a,{to:"../"},"Go Back"))))),r.a.createElement("div",null,0!==w.length&&r.a.createElement(v.a,{celled:!0,className:"table"},r.a.createElement(v.a.Header,null,r.a.createElement(v.a.Row,{key:-1},r.a.createElement(v.a.HeaderCell,null,"Emails"),r.a.createElement(v.a.HeaderCell,null,"Address"))),r.a.createElement(v.a.Body,null,w.map((function(e,a){return r.a.createElement(v.a.Row,{key:a},r.a.createElement(v.a.Cell,null,r.a.createElement(b.a,{ribbon:!0},0===a?"First":a+1)),r.a.createElement(v.a.Cell,null,e))})))),d&&r.a.createElement(E.a,{className:"message",onDismiss:function(){return g(!1)},negative:!0,header:"No New Emails Found, Try Deleting All Previosly Found Emails In Main Screen"}))))},C=t(235),w=t(108),y=t(434),k=function(){var e=Object(n.useState)(!1),a=Object(s.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)(!1),u=Object(s.a)(c,2),d=u[0],p=u[1],g=Object(n.useState)(""),j=Object(s.a)(g,2),k=j[0],S=j[1],N=Object(n.useState)(!1),x=Object(s.a)(N,2),F=x[0],A=x[1],D=Object(n.useState)([]),H=Object(s.a)(D,2),B=H[0],R=H[1],T=Object(n.useState)(""),P=Object(s.a)(T,2),W=P[0],I=P[1],J=Object(n.useState)(""),U=Object(s.a)(J,2),z=U[0],G=U[1],M=function(){var e=Object(m.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.post("http://localhost:8000/email",{email:z,password:W,to:k});case 2:if(a=e.sent,!a.data.status){e.next=6;break}return e.abrupt("return",alert("done"));case 6:return e.abrupt("return",alert("not done"));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){(function(){var e=Object(m.a)(i.a.mark((function e(){var a,t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.a.get("http://localhost:8000/emails");case 3:if(a=e.sent,!(t=a.data).status){e.next=9;break}return e.abrupt("return",R(Object(C.a)(t.data)));case 9:return e.abrupt("return",l(!0));case 10:e.next=15;break;case 12:return e.prev=12,e.t0=e.catch(0),e.abrupt("return",l(!0));case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}})()()}),[F]),r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Sender"),r.a.createElement("div",null),r.a.createElement("div",null,0!==B.length&&r.a.createElement(v.a,{celled:!0,className:"table"},r.a.createElement(v.a.Header,null,r.a.createElement(v.a.Row,{key:-1},r.a.createElement(v.a.HeaderCell,null,"Emails"),r.a.createElement(v.a.HeaderCell,null,"Address"),r.a.createElement(v.a.HeaderCell,null,"timesEmailed"),r.a.createElement(v.a.HeaderCell,null,"timesRedirected"),r.a.createElement(v.a.HeaderCell,null,"Email"))),r.a.createElement(v.a.Body,null,B.map((function(e,a){return r.a.createElement(v.a.Row,{key:a},r.a.createElement(v.a.Cell,null,r.a.createElement(b.a,{ribbon:!0},0===a?"First":a+1)),r.a.createElement(v.a.Cell,null,e.address),r.a.createElement(v.a.Cell,null,e.timesEmailed),r.a.createElement(v.a.Cell,null,e.timesRedirected),r.a.createElement(v.a.Cell,null,r.a.createElement(o.a,{onClick:function(a){a.preventDefault(),a.stopPropagation(),S(e.address),p(!0)},primary:!0},"Email")))})))),t&&r.a.createElement("div",null,r.a.createElement(E.a,{className:"message",negative:!0,header:"No New Emails Found, Reload The Page, Or Try Finding Some In The Finder"}),r.a.createElement(o.a,{onClick:function(){l(!1),A(!F)}},"Try Again")),r.a.createElement("div",null,r.a.createElement(w.a,{open:d,onClose:function(){return p(!1)},size:"small"},r.a.createElement(y.a,{icon:!0},"Sending Email"),r.a.createElement(w.a.Content,null,r.a.createElement(f.a,null,r.a.createElement("div",{style:{display:"flex"}},r.a.createElement("div",{className:"margin"},r.a.createElement(b.a,null,"Sender Email"),r.a.createElement(h.a,{onChange:function(e){return G(e.target.value)},value:z,type:"text"})),r.a.createElement("div",{className:"margin"},r.a.createElement(b.a,null,"Sender Email Pass"),r.a.createElement(h.a,{onChange:function(e){return I(e.target.value)},value:W,type:"password"})),r.a.createElement("div",{className:"margin"},r.a.createElement("p",null,"To: ",k)),r.a.createElement("div",{className:"margin"},r.a.createElement(o.a,{onClick:function(){return M()},primary:!0},"Send Email"))))))))))},S=function(){var e=function(){var e=Object(m.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(!1),e.next=3,O.a.delete("http://localhost:8000/emails");case 3:a=e.sent,a.data.status?h(!0):alert("Sth Wrong");case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),a=Object(n.useState)(!1),t=Object(s.a)(a,2),l=t[0],c=t[1],u=Object(n.useState)(!1),f=Object(s.a)(u,2),b=f[0],h=f[1];return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Welcome To Email Finder"),r.a.createElement("div",null,r.a.createElement(o.a,{className:"btn",primary:!0,positive:!0},r.a.createElement(p.a,{to:"/finder"},"Finding Emails")),r.a.createElement(o.a,{primary:!0,className:"btn"},r.a.createElement(p.a,{to:"/sender"},"Sending Emails")),r.a.createElement(o.a,{onClick:function(){return c(!0)},negative:!0,className:"btn"},"Delete All Emails From Data Base"),b&&r.a.createElement(E.a,{onDismiss:function(){return h(!1)},negative:!0,header:"Emails Deleted"})),r.a.createElement(d.a,{content:"Delete All Emails From DB?",open:l,onCancel:function(){return c(!1)},onConfirm:e})))};var N=function(){return r.a.createElement(p.b,null,r.a.createElement(S,{path:"/"}),r.a.createElement(j,{path:"/finder"}),r.a.createElement(k,{path:"/sender"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},76:function(e,a,t){}},[[245,1,2]]]);
//# sourceMappingURL=main.946cfbcc.chunk.js.map