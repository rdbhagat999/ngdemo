"use strict";(self.webpackChunkngdemo=self.webpackChunkngdemo||[]).push([[196],{9196:(Z,m,r)=>{r.r(m),r.d(m,{ProductsModule:()=>p});var d=r(6895),y=r(4546),t=r(8256),C=r(3151);class a{constructor(){this.el=(0,t.f3M)(t.SBq),this.renderer=(0,t.f3M)(t.Qsj),this.appHighlight="",this.defaultColor="",this.isMouseOver=!1}ngOnInit(){}onMouseEnter(){console.log("mouseenter"),this.highlight("black",this.appHighlight||this.defaultColor||"yellow"),this.isMouseOver=!0}onMouseLeave(){console.log("mouseleave"),this.highlight("",""),this.isMouseOver=!1}highlight(e,o){console.log("highlight"),this.renderer.setStyle(this.el.nativeElement,"color",e),this.renderer.setStyle(this.el.nativeElement,"backgroundColor",o)}}a.\u0275fac=function(e){return new(e||a)},a.\u0275dir=t.lG2({type:a,selectors:[["","appHighlight",""]],hostVars:2,hostBindings:function(e,o){1&e&&t.NdJ("mouseenter",function(){return o.onMouseEnter()})("mouseleave",function(){return o.onMouseLeave()}),2&e&&t.ekj("text-4xl",o.isMouseOver)},inputs:{appHighlight:"appHighlight",defaultColor:"defaultColor"}});class s{}s.\u0275fac=function(e){return new(e||s)},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-product-title"]],ngContentSelectors:["*"],decls:2,vars:0,consts:[["appHighlight","",1,"mb-2","text-2xl","font-bold","tracking-tight","text-gray-900","dark:text-white"]],template:function(e,o){1&e&&(t.F$t(),t.TgZ(0,"h5",0),t.Hsn(1),t.qZA())},dependencies:[a],changeDetection:0});class g{constructor(){this.el=(0,t.f3M)(t.SBq),this.renderer=(0,t.f3M)(t.Qsj),this.zone=(0,t.f3M)(t.R0b),this.delay=100}createTooltipPopup(e,o){let i=this.renderer.createElement("div");i.setAttribute("class","tooltip-container"),i.innerHTML=this.tooltip,i.style.top=o.toString()+"px",i.style.left=e.toString()+"px",i.style.fontSize="1rem",i.style.maxWidth="300px",this.renderer.appendChild(this.el.nativeElement,i),this.myPopup=i}handleMouseEnterEvent(){this.zone.runOutsideAngular(()=>{this.timer=setTimeout(()=>{let e=this.el.nativeElement.getBoundingClientRect().left+this.el.nativeElement.offsetWidth/2,o=this.el.nativeElement.getBoundingClientRect().top+this.el.nativeElement.offsetHeight+6;this.createTooltipPopup(e,o)},this.delay)})}handleMouseLeaveEvent(){this.zone.runOutsideAngular(()=>{this.timer&&clearTimeout(this.timer),this.myPopup&&this.myPopup?.remove()})}ngOnDestroy(){this.timer&&clearTimeout(this.timer),this.myPopup&&this.myPopup?.remove()}}g.\u0275fac=function(e){return new(e||g)},g.\u0275dir=t.lG2({type:g,selectors:[["","appTooltip",""]],hostBindings:function(e,o){1&e&&t.NdJ("mouseenter",function(){return o.handleMouseEnterEvent()})("mouseleave",function(){return o.handleMouseLeaveEvent()})},inputs:{tooltip:"tooltip"}});class h{transform(e="",o="/assets/dreamy_nights.jpg"){return e||o}}h.\u0275fac=function(e){return new(e||h)},h.\u0275pipe=t.Yjl({name:"default",type:h,pure:!0});const H=[[["app-product-title"]]];class c{ngAfterContentInit(){console.log("[ngAfterContentInit] productHeading",this.productHeading)}ngAfterContentChecked(){console.log("[AfterContentChecked] productHeading",this.productHeading)}}function _(n,e){if(1&n&&(t.TgZ(0,"li")(1,"app-product",2)(2,"app-product-title"),t._uU(3),t.qZA()()()),2&n){const o=e.$implicit;t.xp6(1),t.Q6J("product",o),t.xp6(2),t.hij(" ",o.title," ")}}c.\u0275fac=function(e){return new(e||c)},c.\u0275cmp=t.Xpm({type:c,selectors:[["app-product"]],contentQueries:function(e,o,i){if(1&e&&t.Suo(i,s,5),2&e){let v;t.iGM(v=t.CRH())&&(o.productHeading=v.first)}},inputs:{product:"product"},ngContentSelectors:["app-product-title"],decls:12,vars:11,consts:[[1,"max-w-sm","h-full","bg-white","border","border-gray-200","rounded-lg","shadow","dark:bg-gray-800","dark:border-gray-700",3,"id"],[1,"cursor-pointer"],[1,"rounded-t-lg",3,"src","alt"],[1,"flex","flex-col","justify-between","items-start","p-5"],[1,"mb-2","text-lg","font-bold","tracking-tight","text-gray-900","dark:text-white"],["appTooltip","",1,"description","mb-3","font-normal","line-clamp-2","text-gray-700","dark:text-gray-400",3,"tooltip"]],template:function(e,o){1&e&&(t.F$t(H),t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"img",2),t.ALo(3,"default"),t.qZA(),t.TgZ(4,"div",3)(5,"a",1),t.Hsn(6),t.qZA(),t.TgZ(7,"h6",4),t._uU(8),t.ALo(9,"currency"),t.qZA(),t.TgZ(10,"p",5),t._uU(11),t.qZA()()()),2&e&&(t.Q6J("id",o.product.id),t.xp6(2),t.Q6J("src",t.xi3(3,6,o.product.thumbnail,"/assets/dreamy_nights.jpg"),t.LSH)("alt",o.product.title),t.xp6(6),t.hij(" ",t.lcZ(9,9,o.product.price)," "),t.xp6(2),t.Q6J("tooltip",o.product.description),t.xp6(1),t.hij(" ",o.product.description," "))},dependencies:[g,d.H9,h],changeDetection:0});class l{constructor(){this.products=[]}trackById(e,o){return o.id}ngAfterViewInit(){const e=this.productQueryList.toArray();console.log("[ngAfterViewInit]"),console.log("productList",e)}ngAfterViewChecked(){const e=this.productQueryList.toArray();console.log("[ngAfterViewChecked]"),console.log("productList",e)}}l.\u0275fac=function(e){return new(e||l)},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-product-list"]],viewQuery:function(e,o){if(1&e&&t.Gf(c,5),2&e){let i;t.iGM(i=t.CRH())&&(o.productQueryList=i)}},inputs:{products:"products"},decls:2,vars:2,consts:[[1,"grid","grid-cols-1","gap-4","md:grid-cols-2","xl:grid-cols-3"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"h-full",3,"product"]],template:function(e,o){1&e&&(t.TgZ(0,"ul",0),t.YNc(1,_,4,2,"li",1),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngForOf",o.products)("ngForTrackBy",o.trackById))},dependencies:[d.sg,c,s]});const M=["heading"];function x(n,e){if(1&n&&(t.ynx(0),t._UZ(1,"app-product-list",4),t.BQk()),2&n){const o=t.oxw().ngIf;t.xp6(1),t.Q6J("products",o)}}function A(n,e){if(1&n&&(t.ynx(0),t.YNc(1,x,2,1,"ng-container",3),t.BQk()),2&n){const o=e.ngIf;t.xp6(1),t.Q6J("ngIf",o.length)}}class f{constructor(){this.productService=(0,t.f3M)(C.M5)}ngOnInit(){this.products$=this.productService.getProducts()}}f.\u0275fac=function(e){return new(e||f)},f.\u0275cmp=t.Xpm({type:f,selectors:[["app-product-page"]],viewQuery:function(e,o){if(1&e&&(t.Gf(M,5),t.Gf(l,5)),2&e){let i;t.iGM(i=t.CRH())&&(o.headingRef=i.first),t.iGM(i=t.CRH())&&(o.productList=i.first)}},decls:6,vars:3,consts:[[1,"text-4xl","font-bold"],["heading",""],[1,"my-4","py-4"],[4,"ngIf"],[1,"h-full",3,"products"]],template:function(e,o){1&e&&(t.TgZ(0,"h1",0,1),t._uU(2,"Product List"),t.qZA(),t.TgZ(3,"div",2),t.YNc(4,A,2,1,"ng-container",3),t.ALo(5,"async"),t.qZA()),2&e&&(t.xp6(4),t.Q6J("ngIf",t.lcZ(5,1,o.products$)))},dependencies:[d.O5,l,d.Ov]});const L=[{path:"",component:f}];class u{}u.\u0275fac=function(e){return new(e||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[y.Bz.forChild(L),y.Bz]});var B=r(8855);class p{}p.\u0275fac=function(e){return new(e||p)},p.\u0275mod=t.oAB({type:p}),p.\u0275inj=t.cJS({imports:[d.ez,B.m,u]})}}]);