(this.webpackJsonpmixer=this.webpackJsonpmixer||[]).push([[0],{19:function(e,t,n){},20:function(e,t,n){},21:function(e,t,n){},24:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),i=n(9),a=n.n(i),s=(n(19),n(20),n(21),n(1)),o=function(){return Object(s.jsx)("div",{className:"header",children:Object(s.jsx)("div",{className:"logo",children:"Compare audio side by side"})})},u=n(10),d=n(14),j=n(5),l=n(6),b=n.n(l),f=n(11),O=n.n(f),p=(n(24),n(7)),m=n(13),h=(n(27),function(e){var t=e.onDrop,n=Object(m.a)({onDrop:function(e){return t({files:e})},accept:"audio/*"}),c=n.getRootProps,r=n.getInputProps,i=n.isDragActive;return Object(s.jsxs)("div",Object(p.a)(Object(p.a)({className:b()("dropzone",{dropzone_active:i})},c()),{},{children:[Object(s.jsx)("input",Object(p.a)({},r())),Object(s.jsx)("div",{children:Object(s.jsxs)("div",{className:"dropzone__button",children:[i?"Now drop the files here":"Drag'n'drop audio files to this page",Object(s.jsx)("br",{}),Object(s.jsx)("span",{children:"or just click"})]})})]}))}),v="empty",x="loading",g="ready",y=function(){var e=Object(c.useState)(v),t=Object(j.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)([]),a=Object(j.a)(i,2),o=a[0],l=a[1],f=Object(c.useState)(0),p=Object(j.a)(f,2),m=p[0],y=p[1],N=Object(c.useState)(void 0),k=Object(j.a)(N,2),S=k[0],_=k[1],w=Object(c.useRef)(0),R=Object(c.useRef)(),D=Object(c.useRef)(new Set),T=function(e){e&&D.current.add(e)};Object(c.useEffect)((function(){m>0&&o.length===m&&r(g)}),[o,m]);var M=Object(c.useMemo)((function(){return O()((function(e){var t,n=e.id,c=Object(u.a)(D.current);try{for(c.s();!(t=c.n()).done;){var r=t.value,i=r.dataset.id;i===n?i!==S&&r.duration>=w.current&&(r.currentTime=w.current,r.paused&&r.play()):r.pause()}}catch(a){c.e(a)}finally{c.f()}_(n)}),100)}),[S,_]);return n===v?Object(s.jsx)(h,{onDrop:function(e){var t=e.files;r(x),y(t.length);for(var n=function(e){var n=t[e],c=new FileReader;c.onload=function(t){l((function(c){return[].concat(Object(d.a)(c),[{id:String(e),name:n.name,blob:URL.createObjectURL(new Blob([t.target.result],{type:n.type}))}])}))},c.readAsArrayBuffer(t[e])},c=0;c<t.length;c++)n(c)}}):n===x?Object(s.jsx)("div",{className:"loader",children:"loading..."}):n===g?Object(s.jsx)("div",{className:"player",ref:R,children:o.map((function(e){return Object(s.jsxs)("div",{className:b()("item",{item__active:e.id===S}),children:[Object(s.jsx)("div",{className:"item__title",children:e.name}),Object(s.jsx)("audio",{ref:T,controls:!0,"data-id":e.id,muted:!1,src:e.blob,onMouseOver:function(){return M({id:e.id})},onPlay:function(t){return M({id:e.id})},onSeeked:function(e){return function(e){var t=e.target;t.paused&&t.play()}(e)},onTimeUpdate:function(t){return function(e){var t=e.currentTime;e.id===S&&(w.current=t)}({currentTime:t.target.currentTime,id:e.id})}})]},e.id)}))}):null},N=(n(28),function(){return Object(s.jsx)("div",{className:"footer",children:Object(s.jsxs)("div",{className:"disclaimer",children:["Made with ",Object(s.jsx)("span",{children:"\ud83d\udda4"})," by ",Object(s.jsx)("a",{href:"https://linktr.ee/futurfrukt",target:"_blank",children:"FuturFrukt"})]})})});function k(){return Object(s.jsxs)("div",{className:"app",children:[Object(s.jsx)(o,{}),Object(s.jsx)("div",{className:"main",children:Object(s.jsx)(y,{})}),Object(s.jsx)(N,{})]})}a.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(k,{})}),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.f5e35483.chunk.js.map