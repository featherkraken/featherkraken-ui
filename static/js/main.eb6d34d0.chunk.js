(this.webpackJsonpfeatherkraken=this.webpackJsonpfeatherkraken||[]).push([[0],{179:function(e,t,a){e.exports=a(315)},195:function(e,t){},227:function(e,t,a){},315:function(e,t,a){"use strict";a.r(t);var n,r,o=a(1),i=a(25),l=a(68),s=a(166),c=a(177),u=a(167),m=a(178),d=(a(184),a(185),a(227),a(324)),h=a(319),p=a(323),v=a(320),f=a(75),g=a(169),E=a(321),y=a(325),b=a(176),D=a(69),F=a(322);!function(e){e.RoundTrip="Round trip",e.OneWay="One-way"}(n||(n={})),function(e){e.Economy="Economy",e.PremiumEconomy="Premium Economy",e.Business="Business",e.FirstClass="First class"}(r||(r={}));var Y=function e(){Object(l.a)(this,e),this.limit=10,this.tripType=n.RoundTrip,this.classType=r.Economy,this.passengers=1,this.source=void 0,this.radius=void 0,this.target=void 0,this.departure=void 0,this.return=void 0,this.stops=void 0},k=a(11),M=a.n(k),q=a(87),N=a.n(q),S=a(318),T=a(88);function x(e){if(e.flight){var t=e.flight;return o.createElement("div",null,t.route?t.route.map((function(e,t){var a,n,r,i;return o.createElement(S.a,{key:t},o.createElement(h.a,{className:"mb-1"},o.createElement("div",null,o.createElement("big",null,o.createElement(T.b,null)," "),e.departure?M()(e.departure).format("ddd D MMM"):"",0!==M()(e.departure).diff(e.arrival,"days")?" - ".concat(M()(e.arrival).format("ddd D MMM")):"")),o.createElement(h.a,{className:"mb-3"},o.createElement(g.a,{sm:1},o.createElement(T.a,null)),o.createElement(g.a,{className:"border rounded"},o.createElement("div",{className:"p-2"},o.createElement("div",null,o.createElement("strong",{title:M()(e.departure).format("ddd D MMM")},e.departure?M()(e.departure).format("HH:mm"):"")," ",null===(a=e.source)||void 0===a?void 0:a.displayName," ",null===(n=e.source)||void 0===n?void 0:n.name),o.createElement("div",null,o.createElement("strong",{title:M()(e.arrival).format("ddd D MMM")},e.arrival?M()(e.arrival).format("HH:mm"):"")," ",null===(r=e.target)||void 0===r?void 0:r.displayName," ",null===(i=e.target)||void 0===i?void 0:i.name))),o.createElement(g.a,{sm:3},o.createElement("img",{alt:"Airline ".concat(e.airline),src:"https://images.kiwi.com/airlines/64/".concat(e.airline,".png")}))))})):"")}return o.createElement("div",null)}function R(e){return e.trips?o.createElement("div",null,e.trips.map((function(e,t){var a;return o.createElement(S.a,{className:"mb-3 border-bottom",key:t},o.createElement(h.a,null,o.createElement(g.a,null,o.createElement("div",{className:"mb-2"},o.createElement("b",null,"DEPARTURE")," Duration: ",null===(a=e.outwardFlight)||void 0===a?void 0:a.duration),o.createElement(x,{flight:e.outwardFlight})),e.returnFlight?o.createElement(g.a,null,o.createElement("div",{className:"mb-2"},o.createElement("b",null,"RETURN")," Duration: ",e.returnFlight.duration),o.createElement(x,{flight:e.returnFlight})):"",o.createElement(g.a,{sm:1},o.createElement(h.a,null,o.createElement("h2",null,e.price," \u20ac")),o.createElement(h.a,{className:"mt-3"},o.createElement("a",{href:e.link,target:"_blank",rel:"noopener noreferrer"},o.createElement(D.a,{variant:"success"},"Book"))))))}))):o.createElement("div",null)}var C=a(41),w=a(60),I=a(61),O="http://localhost:8080/featherkraken/rest",P=[];for(var B in n)P.push(n[B]);var j=[];for(var A in r)j.push(r[A]);var G=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={request:new Y,searching:!1,allowNew:!1,isLoading:!1,multiple:!1,options:[],departureFlexible:!1,departureFocused:!1,departureSpanFocused:null,returnFlexible:!1,returnFocused:!1,returnSpanFocused:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"changeRequest",value:function(e,t){var a=this.state.request;a[e]=t,this.setState({request:a})}},{key:"performSearch",value:function(){var e=this;this.setState({searching:!0}),N.a.post("".concat(O,"/flights"),this.state.request).then((function(t){e.setState({trips:t.data}),e.setState({searching:!1})})).catch((function(t){console.error(t),e.setState({searching:!1})}))}},{key:"getAirports",value:function(e){var t=this;N.a.get("".concat(O,"/airports?query=").concat(e)).then((function(e){t.setState({options:e.data})})).catch((function(e){console.error(e)}))}},{key:"getPassengerTitle",value:function(){if(!this.state.request.passengers)return"Passengers";var e=+this.state.request.passengers;return"".concat(e," Passenger").concat(1===e?"":"s")}},{key:"getStopTitle",value:function(){if(!this.state.request.stops)return"Filter stops";var e=+this.state.request.stops;return 0===e?"Non-stop":1===e?"1 Stop":"".concat(e," Stops")}},{key:"dateToMoment",value:function(e){return e?M()(e,"DD.MM.YYYY"):M()(new Date)}},{key:"render",value:function(){var e,t,a,r,i,l,s,c,u,m,Y,k,M=this;return o.createElement("div",null,o.createElement(d.a,{className:"shadow"},o.createElement(d.a.Brand,{href:"#home"},o.createElement(h.a,null,o.createElement("img",{alt:"Featherkraken",src:"./logo512.png",width:"50",height:"50",className:"d-inline-block align-top ml-3 mr-3"}),o.createElement("h2",null,"Featherkraken")))),o.createElement(p.a,{className:"m-5"},o.createElement(h.a,{className:"ml-3"},o.createElement(v.a,{variant:"outline",id:"tripType",title:this.state.request.tripType,className:"mr-1",onSelect:function(e){M.changeRequest("tripType",e)}},P.map((function(e){return o.createElement(f.a.Item,{key:P.indexOf(e),eventKey:e},e)}))),o.createElement(v.a,{variant:"outline",id:"passengers",title:this.getPassengerTitle(),className:"mr-1"},o.createElement(p.a.Control,{type:"number",min:"1",defaultValue:"1",onChange:function(e){M.changeRequest("passengers",e.target.value)}})),o.createElement(v.a,{variant:"outline",id:"classType",title:this.state.request.classType,onSelect:function(e){M.changeRequest("classType",e)}},j.map((function(e){return o.createElement(f.a.Item,{key:j.indexOf(e),eventKey:e},e)}))),o.createElement(v.a,{variant:"outline",id:"stops",title:this.getStopTitle(),className:"mr-1"},o.createElement(p.a.Control,{type:"number",min:"0",defaultValue:"0",onChange:function(e){M.changeRequest("stops",e.target.value)}})),o.createElement(v.a,{variant:"outline",id:"stops",title:"".concat(this.state.request.limit," Results"),className:"mr-1"},o.createElement(p.a.Control,{type:"number",min:"0",max:"1000",step:25,defaultValue:this.state.request.limit,onChange:function(e){M.changeRequest("limit",e.target.value)}}))),o.createElement(h.a,{className:"mt-3 ml-3 mr-3"},o.createElement(p.a.Group,{as:g.a,controlId:"source",className:"mr-3"},o.createElement(C.a,Object.assign({},this.state,{id:"source",labelKey:function(e){return"".concat(e.displayName," ").concat(e.name)},placeholder:"Source",minLength:2,onSearch:function(e){return M.getAirports(e)},onChange:function(e){M.changeRequest("source",e[0])},renderMenu:function(e,t){return o.createElement(C.b,t,e.map((function(e,t){return o.createElement(C.c,{option:e,position:t,key:t},e.displayName," ",e.name)})))}}))),o.createElement(p.a.Group,{as:g.a,controlId:"distance",className:"mr-3",lg:"1"},o.createElement(E.a,null,o.createElement(p.a.Control,{type:"number",min:"0",defaultValue:this.state.request.radius,onChange:function(e){M.changeRequest("radius",e.target.value)}}),o.createElement(E.a.Append,null,o.createElement(E.a.Text,{id:"km-addon"},"km")))),o.createElement(p.a.Group,{as:g.a,controlId:"target",className:"mr-3"},o.createElement(C.a,Object.assign({},this.state,{id:"target",labelKey:function(e){return"".concat(e.displayName," ").concat(e.name)},placeholder:"Target location",minLength:2,onSearch:function(e){return M.getAirports(e)},onChange:function(e){M.changeRequest("target",e[0])},renderMenu:function(e,t){return o.createElement(C.b,t,e.map((function(e,t){return o.createElement(C.c,{option:e,position:t,key:t},e.displayName," ",e.name)})))}}))),o.createElement(p.a.Group,{as:g.a,controlId:"departure",className:"mr-3 border rounded",lg:"2"},o.createElement(y.a,{type:"checkbox",onChange:function(e){M.setState({departureFlexible:e.indexOf("departureFlexible")>-1})}},o.createElement(b.a,{variant:"light",type:"checkbox",value:"departureFlexible"},this.state.departureFlexible?o.createElement(I.a,{title:"Exact date"}):o.createElement(I.b,{title:"Flexible date"}))),this.state.departureFlexible?o.createElement(w.DateRangePicker,{startDate:this.dateToMoment(null===(e=this.state.request)||void 0===e?void 0:null===(t=e.departure)||void 0===t?void 0:t.from),startDateId:"departureFrom",endDate:this.dateToMoment(null===(a=this.state.request)||void 0===a?void 0:null===(r=a.departure)||void 0===r?void 0:r.to),endDateId:"departureTo",onDatesChange:function(e){var t=e.startDate,a=e.endDate,n={from:null===t||void 0===t?void 0:t.format("DD.MM.YYYY"),to:null===a||void 0===a?void 0:a.format("DD.MM.YYYY")};M.changeRequest("departure",n)},focusedInput:this.state.departureSpanFocused,onFocusChange:function(e){return M.setState({departureSpanFocused:e})},displayFormat:"DD.MM.YYYY",noBorder:!0}):o.createElement(w.SingleDatePicker,{id:"departure",date:this.dateToMoment(null===(i=this.state.request)||void 0===i?void 0:null===(l=i.departure)||void 0===l?void 0:l.from),focused:this.state.departureFocused,onFocusChange:function(e){return M.setState({departureFocused:e.focused})},onDateChange:function(e){var t={from:null===e||void 0===e?void 0:e.format("DD.MM.YYYY")};M.changeRequest("departure",t)},displayFormat:"DD.MM.YYYY",noBorder:!0})),this.state.request.tripType===n.RoundTrip?o.createElement(p.a.Group,{as:g.a,controlId:"return",lg:"2",className:"mr-3 border rounded"},o.createElement(y.a,{type:"checkbox",onChange:function(e){M.setState({returnFlexible:e.indexOf("returnFlexible")>-1})}},o.createElement(b.a,{variant:"light",type:"checkbox",value:"returnFlexible"},this.state.returnFlexible?o.createElement(I.a,{title:"Exact date"}):o.createElement(I.b,{title:"Flexible date"}))),this.state.returnFlexible?o.createElement(w.DateRangePicker,{startDate:this.dateToMoment(null===(s=this.state.request)||void 0===s?void 0:null===(c=s.return)||void 0===c?void 0:c.from),startDateId:"returnFrom",endDate:this.dateToMoment(null===(u=this.state.request)||void 0===u?void 0:null===(m=u.return)||void 0===m?void 0:m.to),endDateId:"returnTo",onDatesChange:function(e){var t=e.startDate,a=e.endDate,n={from:null===t||void 0===t?void 0:t.format("DD.MM.YYYY"),to:null===a||void 0===a?void 0:a.format("DD.MM.YYYY")};M.changeRequest("return",n)},focusedInput:this.state.returnSpanFocused,onFocusChange:function(e){return M.setState({returnSpanFocused:e})},displayFormat:"DD.MM.YYYY",noBorder:!0}):o.createElement(w.SingleDatePicker,{id:"return",date:this.dateToMoment(null===(Y=this.state.request)||void 0===Y?void 0:null===(k=Y.return)||void 0===k?void 0:k.from),focused:this.state.returnFocused,onFocusChange:function(e){return M.setState({returnFocused:e.focused})},onDateChange:function(e){var t={from:null===e||void 0===e?void 0:e.format("DD.MM.YYYY")};M.changeRequest("return",t)},displayFormat:"DD.MM.YYYY",noBorder:!0})):""),o.createElement(h.a,{className:"justify-content-md-center mt-3"},o.createElement(D.a,{variant:"primary",onClick:function(){return M.performSearch()}},"Search")),this.state.searching?o.createElement(F.a,{className:"m-3",animated:!0,now:100}):""),o.createElement(R,{trips:this.state.trips}))}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.render(o.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[179,1,2]]]);
//# sourceMappingURL=main.eb6d34d0.chunk.js.map