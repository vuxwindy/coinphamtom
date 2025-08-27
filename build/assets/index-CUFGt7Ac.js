import{i as At,n as Ct,r as nt,a as Rt,x as N}from"./state-Cf6Acp3J.js";import{bz as ht,S as vt,V as $t,W as L,T as St,a6 as ut,bA as j,a8 as gt,$ as Lt,aJ as Nt,a3 as jt,a4 as Ft,a5 as kt}from"./index-W7O16Knq.js";import{U as Dt,n as _,c as mt}from"./index-KkpI0fgd.js";import"./index-BTClOK_9.js";import"./index-DsLsIr5D.js";import{o as Tt}from"./if-defined-Cjow_KMx.js";import"./index-Cqg5Vvc8.js";import"./index-DgA7GKrI.js";import"./index-CX_ap1W4.js";var lt={exports:{}},Yt=lt.exports,_t;function Bt(){return _t||(_t=1,(function(e,t){(function(i,o){e.exports=o()})(Yt,(function(){var i=1e3,o=6e4,c=36e5,n="millisecond",l="second",p="minute",g="hour",m="day",v="week",x="month",U="quarter",M="year",A="date",k="Invalid Date",W=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,X=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,tt={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(d){var a=["th","st","nd","rd"],r=d%100;return"["+d+(a[(r-20)%10]||a[r]||a[0])+"]"}},et=function(d,a,r){var u=String(d);return!u||u.length>=a?d:""+Array(a+1-u.length).join(r)+d},H={s:et,z:function(d){var a=-d.utcOffset(),r=Math.abs(a),u=Math.floor(r/60),s=r%60;return(a<=0?"+":"-")+et(u,2,"0")+":"+et(s,2,"0")},m:function d(a,r){if(a.date()<r.date())return-d(r,a);var u=12*(r.year()-a.year())+(r.month()-a.month()),s=a.clone().add(u,x),f=r-s<0,h=a.clone().add(u+(f?-1:1),x);return+(-(u+(r-s)/(f?s-h:h-s))||0)},a:function(d){return d<0?Math.ceil(d)||0:Math.floor(d)},p:function(d){return{M:x,y:M,w:v,d:m,D:A,h:g,m:p,s:l,ms:n,Q:U}[d]||String(d||"").toLowerCase().replace(/s$/,"")},u:function(d){return d===void 0}},I="en",O={};O[I]=tt;var G="$isDayjsObject",V=function(d){return d instanceof ot||!(!d||!d[G])},st=function d(a,r,u){var s;if(!a)return I;if(typeof a=="string"){var f=a.toLowerCase();O[f]&&(s=f),r&&(O[f]=r,s=f);var h=a.split("-");if(!s&&h.length>1)return d(h[0])}else{var y=a.name;O[y]=a,s=y}return!u&&s&&(I=s),s||!u&&I},b=function(d,a){if(V(d))return d.clone();var r=typeof a=="object"?a:{};return r.date=d,r.args=arguments,new ot(r)},w=H;w.l=st,w.i=V,w.w=function(d,a){return b(d,{locale:a.$L,utc:a.$u,x:a.$x,$offset:a.$offset})};var ot=(function(){function d(r){this.$L=st(r.locale,null,!0),this.parse(r),this.$x=this.$x||r.x||{},this[G]=!0}var a=d.prototype;return a.parse=function(r){this.$d=(function(u){var s=u.date,f=u.utc;if(s===null)return new Date(NaN);if(w.u(s))return new Date;if(s instanceof Date)return new Date(s);if(typeof s=="string"&&!/Z$/i.test(s)){var h=s.match(W);if(h){var y=h[2]-1||0,$=(h[7]||"0").substring(0,3);return f?new Date(Date.UTC(h[1],y,h[3]||1,h[4]||0,h[5]||0,h[6]||0,$)):new Date(h[1],y,h[3]||1,h[4]||0,h[5]||0,h[6]||0,$)}}return new Date(s)})(r),this.init()},a.init=function(){var r=this.$d;this.$y=r.getFullYear(),this.$M=r.getMonth(),this.$D=r.getDate(),this.$W=r.getDay(),this.$H=r.getHours(),this.$m=r.getMinutes(),this.$s=r.getSeconds(),this.$ms=r.getMilliseconds()},a.$utils=function(){return w},a.isValid=function(){return this.$d.toString()!==k},a.isSame=function(r,u){var s=b(r);return this.startOf(u)<=s&&s<=this.endOf(u)},a.isAfter=function(r,u){return b(r)<this.startOf(u)},a.isBefore=function(r,u){return this.endOf(u)<b(r)},a.$g=function(r,u,s){return w.u(r)?this[u]:this.set(s,r)},a.unix=function(){return Math.floor(this.valueOf()/1e3)},a.valueOf=function(){return this.$d.getTime()},a.startOf=function(r,u){var s=this,f=!!w.u(u)||u,h=w.p(r),y=function(z,S){var E=w.w(s.$u?Date.UTC(s.$y,S,z):new Date(s.$y,S,z),s);return f?E:E.endOf(m)},$=function(z,S){return w.w(s.toDate()[z].apply(s.toDate("s"),(f?[0,0,0,0]:[23,59,59,999]).slice(S)),s)},D=this.$W,T=this.$M,R=this.$D,K="set"+(this.$u?"UTC":"");switch(h){case M:return f?y(1,0):y(31,11);case x:return f?y(1,T):y(0,T+1);case v:var q=this.$locale().weekStart||0,it=(D<q?D+7:D)-q;return y(f?R-it:R+(6-it),T);case m:case A:return $(K+"Hours",0);case g:return $(K+"Minutes",1);case p:return $(K+"Seconds",2);case l:return $(K+"Milliseconds",3);default:return this.clone()}},a.endOf=function(r){return this.startOf(r,!1)},a.$set=function(r,u){var s,f=w.p(r),h="set"+(this.$u?"UTC":""),y=(s={},s[m]=h+"Date",s[A]=h+"Date",s[x]=h+"Month",s[M]=h+"FullYear",s[g]=h+"Hours",s[p]=h+"Minutes",s[l]=h+"Seconds",s[n]=h+"Milliseconds",s)[f],$=f===m?this.$D+(u-this.$W):u;if(f===x||f===M){var D=this.clone().set(A,1);D.$d[y]($),D.init(),this.$d=D.set(A,Math.min(this.$D,D.daysInMonth())).$d}else y&&this.$d[y]($);return this.init(),this},a.set=function(r,u){return this.clone().$set(r,u)},a.get=function(r){return this[w.p(r)]()},a.add=function(r,u){var s,f=this;r=Number(r);var h=w.p(u),y=function(T){var R=b(f);return w.w(R.date(R.date()+Math.round(T*r)),f)};if(h===x)return this.set(x,this.$M+r);if(h===M)return this.set(M,this.$y+r);if(h===m)return y(1);if(h===v)return y(7);var $=(s={},s[p]=o,s[g]=c,s[l]=i,s)[h]||1,D=this.$d.getTime()+r*$;return w.w(D,this)},a.subtract=function(r,u){return this.add(-1*r,u)},a.format=function(r){var u=this,s=this.$locale();if(!this.isValid())return s.invalidDate||k;var f=r||"YYYY-MM-DDTHH:mm:ssZ",h=w.z(this),y=this.$H,$=this.$m,D=this.$M,T=s.weekdays,R=s.months,K=s.meridiem,q=function(S,E,rt,at){return S&&(S[E]||S(u,f))||rt[E].slice(0,at)},it=function(S){return w.s(y%12||12,S,"0")},z=K||function(S,E,rt){var at=S<12?"AM":"PM";return rt?at.toLowerCase():at};return f.replace(X,(function(S,E){return E||(function(rt){switch(rt){case"YY":return String(u.$y).slice(-2);case"YYYY":return w.s(u.$y,4,"0");case"M":return D+1;case"MM":return w.s(D+1,2,"0");case"MMM":return q(s.monthsShort,D,R,3);case"MMMM":return q(R,D);case"D":return u.$D;case"DD":return w.s(u.$D,2,"0");case"d":return String(u.$W);case"dd":return q(s.weekdaysMin,u.$W,T,2);case"ddd":return q(s.weekdaysShort,u.$W,T,3);case"dddd":return T[u.$W];case"H":return String(y);case"HH":return w.s(y,2,"0");case"h":return it(1);case"hh":return it(2);case"a":return z(y,$,!0);case"A":return z(y,$,!1);case"m":return String($);case"mm":return w.s($,2,"0");case"s":return String(u.$s);case"ss":return w.s(u.$s,2,"0");case"SSS":return w.s(u.$ms,3,"0");case"Z":return h}return null})(S)||h.replace(":","")}))},a.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},a.diff=function(r,u,s){var f,h=this,y=w.p(u),$=b(r),D=($.utcOffset()-this.utcOffset())*o,T=this-$,R=function(){return w.m(h,$)};switch(y){case M:f=R()/12;break;case x:f=R();break;case U:f=R()/3;break;case v:f=(T-D)/6048e5;break;case m:f=(T-D)/864e5;break;case g:f=T/c;break;case p:f=T/o;break;case l:f=T/i;break;default:f=T}return s?f:w.a(f)},a.daysInMonth=function(){return this.endOf(x).$D},a.$locale=function(){return O[this.$L]},a.locale=function(r,u){if(!r)return this.$L;var s=this.clone(),f=st(r,u,!0);return f&&(s.$L=f),s},a.clone=function(){return w.w(this.$d,this)},a.toDate=function(){return new Date(this.valueOf())},a.toJSON=function(){return this.isValid()?this.toISOString():null},a.toISOString=function(){return this.$d.toISOString()},a.toString=function(){return this.$d.toUTCString()},d})(),bt=ot.prototype;return b.prototype=bt,[["$ms",n],["$s",l],["$m",p],["$H",g],["$W",m],["$M",x],["$y",M],["$D",A]].forEach((function(d){bt[d[1]]=function(a){return this.$g(a,d[0],d[1])}})),b.extend=function(d,a){return d.$i||(d(a,ot,b),d.$i=!0),b},b.locale=st,b.isDayjs=V,b.unix=function(d){return b(1e3*d)},b.en=O[I],b.Ls=O,b.p={},b}))})(lt)),lt.exports}var Et=Bt();const Q=ht(Et);var dt={exports:{}},Ut=dt.exports,Mt;function Wt(){return Mt||(Mt=1,(function(e,t){(function(i,o){e.exports=o()})(Ut,(function(){return{name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(i){var o=["th","st","nd","rd"],c=i%100;return"["+i+(o[(c-20)%10]||o[c]||o[0])+"]"}}}))})(dt)),dt.exports}var Ht=Wt();const Vt=ht(Ht);var pt={exports:{}},qt=pt.exports,It;function zt(){return It||(It=1,(function(e,t){(function(i,o){e.exports=o()})(qt,(function(){return function(i,o,c){i=i||{};var n=o.prototype,l={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function p(m,v,x,U){return n.fromToBase(m,v,x,U)}c.en.relativeTime=l,n.fromToBase=function(m,v,x,U,M){for(var A,k,W,X=x.$locale().relativeTime||l,tt=i.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],et=tt.length,H=0;H<et;H+=1){var I=tt[H];I.d&&(A=U?c(m).diff(x,I.d,!0):x.diff(m,I.d,!0));var O=(i.rounding||Math.round)(Math.abs(A));if(W=A>0,O<=I.r||!I.r){O<=1&&H>0&&(I=tt[H-1]);var G=X[I.l];M&&(O=M(""+O)),k=typeof G=="string"?G.replace("%d",O):G(O,v,I.l,W);break}}if(v)return k;var V=W?X.future:X.past;return typeof V=="function"?V(k):V.replace("%s",k)},n.to=function(m,v){return p(m,v,this,!0)},n.from=function(m,v){return p(m,v,this)};var g=function(m){return m.$u?c.utc():c()};n.toNow=function(m){return this.to(g(this),m)},n.fromNow=function(m){return this.from(g(this),m)}}}))})(pt)),pt.exports}var Jt=zt();const Pt=ht(Jt);var ft={exports:{}},Gt=ft.exports,Ot;function Kt(){return Ot||(Ot=1,(function(e,t){(function(i,o){e.exports=o()})(Gt,(function(){return function(i,o,c){c.updateLocale=function(n,l){var p=c.Ls[n];if(p)return(l?Object.keys(l):[]).forEach((function(g){p[g]=l[g]})),p}}}))})(ft)),ft.exports}var Zt=Kt();const Qt=ht(Zt);Q.extend(Pt);Q.extend(Qt);const Xt={...Vt,name:"en-web3-modal",relativeTime:{future:"in %s",past:"%s ago",s:"%d sec",m:"1 min",mm:"%d min",h:"1 hr",hh:"%d hrs",d:"1 d",dd:"%d d",M:"1 mo",MM:"%d mo",y:"1 yr",yy:"%d yr"}},te=["January","February","March","April","May","June","July","August","September","October","November","December"];Q.locale("en-web3-modal",Xt);const wt={getMonthNameByIndex(e){return te[e]},getYear(e=new Date().toISOString()){return Q(e).year()},getRelativeDateFromNow(e){return Q(e).locale("en-web3-modal").fromNow(!0)},formatDate(e,t="DD MMM"){return Q(e).format(t)}},ee=3,ie=["receive","deposit","borrow","claim"],re=["withdraw","repay","burn"],Z={getTransactionGroupTitle(e,t){const i=wt.getYear(),o=wt.getMonthNameByIndex(t);return e===i?o:`${o} ${e}`},getTransactionImages(e){const[t,i]=e,o=!!t&&e?.every(l=>!!l.nft_info),c=e?.length>1;return e?.length===2&&!o?[this.getTransactionImage(i),this.getTransactionImage(t)]:c?e.map(l=>this.getTransactionImage(l)):[this.getTransactionImage(t)]},getTransactionImage(e){return{type:Z.getTransactionTransferTokenType(e),url:Z.getTransactionImageURL(e)}},getTransactionImageURL(e){let t;const i=!!e?.nft_info,o=!!e?.fungible_info;return e&&i?t=e?.nft_info?.content?.preview?.url:e&&o&&(t=e?.fungible_info?.icon?.url),t},getTransactionTransferTokenType(e){if(e?.fungible_info)return"FUNGIBLE";if(e?.nft_info)return"NFT"},getTransactionDescriptions(e){const t=e?.metadata?.operationType,i=e?.transfers,o=e?.transfers?.length>0,c=e?.transfers?.length>1,n=o&&i?.every(x=>!!x?.fungible_info),[l,p]=i;let g=this.getTransferDescription(l),m=this.getTransferDescription(p);if(!o)return(t==="send"||t==="receive")&&n?(g=Dt.getTruncateString({string:e?.metadata.sentFrom,charsStart:4,charsEnd:6,truncate:"middle"}),m=Dt.getTruncateString({string:e?.metadata.sentTo,charsStart:4,charsEnd:6,truncate:"middle"}),[g,m]):[e.metadata.status];if(c)return i.map(x=>this.getTransferDescription(x)).reverse();let v="";return ie.includes(t)?v="+":re.includes(t)&&(v="-"),g=v.concat(g),[g]},getTransferDescription(e){let t="";return e&&(e?.nft_info?t=e?.nft_info?.name||"-":e?.fungible_info&&(t=this.getFungibleTransferDescription(e)||"-")),t},getFungibleTransferDescription(e){return e?[this.getQuantityFixedValue(e?.quantity.numeric),e?.fungible_info?.symbol].join(" ").trim():null},getQuantityFixedValue(e){return e?parseFloat(e).toFixed(ee):null}};var yt;(function(e){e.approve="approved",e.bought="bought",e.borrow="borrowed",e.burn="burnt",e.cancel="canceled",e.claim="claimed",e.deploy="deployed",e.deposit="deposited",e.execute="executed",e.mint="minted",e.receive="received",e.repay="repaid",e.send="sent",e.sell="sold",e.stake="staked",e.trade="swapped",e.unstake="unstaked",e.withdraw="withdrawn"})(yt||(yt={}));const ne=vt`
  :host > wui-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 40px;
    height: 40px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-005);
  }

  :host > wui-flex wui-image {
    display: block;
  }

  :host > wui-flex,
  :host > wui-flex wui-image,
  .swap-images-container,
  .swap-images-container.nft,
  wui-image.nft {
    border-top-left-radius: var(--local-left-border-radius);
    border-top-right-radius: var(--local-right-border-radius);
    border-bottom-left-radius: var(--local-left-border-radius);
    border-bottom-right-radius: var(--local-right-border-radius);
  }

  wui-icon {
    width: 20px;
    height: 20px;
  }

  wui-icon-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
  }

  .swap-images-container {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  .swap-images-container wui-image:first-child {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0%;
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-images-container wui-image:last-child {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }
`;var J=function(e,t,i,o){var c=arguments.length,n=c<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,i):o,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,o);else for(var p=e.length-1;p>=0;p--)(l=e[p])&&(n=(c<3?l(n):c>3?l(t,i,n):l(t,i))||n);return c>3&&n&&Object.defineProperty(t,i,n),n};let Y=class extends $t{constructor(){super(...arguments),this.images=[],this.secondImage={type:void 0,url:""}}render(){const[t,i]=this.images,o=t?.type==="NFT",c=i?.url?i.type==="NFT":o,n=o?"var(--wui-border-radius-xxs)":"var(--wui-border-radius-s)",l=c?"var(--wui-border-radius-xxs)":"var(--wui-border-radius-s)";return this.style.cssText=`
    --local-left-border-radius: ${n};
    --local-right-border-radius: ${l};
    `,L`<wui-flex> ${this.templateVisual()} ${this.templateIcon()} </wui-flex>`}templateVisual(){const[t,i]=this.images,o=t?.type;return this.images.length===2&&(t?.url||i?.url)?L`<div class="swap-images-container">
        ${t?.url?L`<wui-image src=${t.url} alt="Transaction image"></wui-image>`:null}
        ${i?.url?L`<wui-image src=${i.url} alt="Transaction image"></wui-image>`:null}
      </div>`:t?.url?L`<wui-image src=${t.url} alt="Transaction image"></wui-image>`:o==="NFT"?L`<wui-icon size="inherit" color="fg-200" name="nftPlaceholder"></wui-icon>`:L`<wui-icon size="inherit" color="fg-200" name="coinPlaceholder"></wui-icon>`}templateIcon(){let t="accent-100",i;return i=this.getIcon(),this.status&&(t=this.getStatusColor()),i?L`
      <wui-icon-box
        size="xxs"
        iconColor=${t}
        backgroundColor=${t}
        background="opaque"
        icon=${i}
        ?border=${!0}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
    `:null}getDirectionIcon(){switch(this.direction){case"in":return"arrowBottom";case"out":return"arrowTop";default:return}}getIcon(){return this.onlyDirectionIcon?this.getDirectionIcon():this.type==="trade"?"swapHorizontalBold":this.type==="approve"?"checkmark":this.type==="cancel"?"close":this.getDirectionIcon()}getStatusColor(){switch(this.status){case"confirmed":return"success-100";case"failed":return"error-100";case"pending":return"inverse-100";default:return"accent-100"}}};Y.styles=[ne];J([_()],Y.prototype,"type",void 0);J([_()],Y.prototype,"status",void 0);J([_()],Y.prototype,"direction",void 0);J([_({type:Boolean})],Y.prototype,"onlyDirectionIcon",void 0);J([_({type:Array})],Y.prototype,"images",void 0);J([_({type:Object})],Y.prototype,"secondImage",void 0);Y=J([mt("wui-transaction-visual")],Y);const se=vt`
  :host > wui-flex:first-child {
    align-items: center;
    column-gap: var(--wui-spacing-s);
    padding: 6.5px var(--wui-spacing-xs) 6.5px var(--wui-spacing-xs);
    width: 100%;
  }

  :host > wui-flex:first-child wui-text:nth-child(1) {
    text-transform: capitalize;
  }

  wui-transaction-visual {
    width: 40px;
    height: 40px;
  }

  wui-flex {
    flex: 1;
  }

  :host wui-flex wui-flex {
    overflow: hidden;
  }

  :host .description-container wui-text span {
    word-break: break-all;
  }

  :host .description-container wui-text {
    overflow: hidden;
  }

  :host .description-separator-icon {
    margin: 0px 6px;
  }

  :host wui-text > span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;var F=function(e,t,i,o){var c=arguments.length,n=c<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,i):o,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,o);else for(var p=e.length-1;p>=0;p--)(l=e[p])&&(n=(c<3?l(n):c>3?l(t,i,n):l(t,i))||n);return c>3&&n&&Object.defineProperty(t,i,n),n};let C=class extends $t{constructor(){super(...arguments),this.type="approve",this.onlyDirectionIcon=!1,this.images=[],this.price=[],this.amount=[],this.symbol=[]}render(){return L`
      <wui-flex>
        <wui-transaction-visual
          .status=${this.status}
          direction=${Tt(this.direction)}
          type=${this.type}
          onlyDirectionIcon=${Tt(this.onlyDirectionIcon)}
          .images=${this.images}
        ></wui-transaction-visual>
        <wui-flex flexDirection="column" gap="3xs">
          <wui-text variant="paragraph-600" color="fg-100">
            ${yt[this.type]||this.type}
          </wui-text>
          <wui-flex class="description-container">
            ${this.templateDescription()} ${this.templateSecondDescription()}
          </wui-flex>
        </wui-flex>
        <wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>
      </wui-flex>
    `}templateDescription(){const t=this.descriptions?.[0];return t?L`
          <wui-text variant="small-500" color="fg-200">
            <span>${t}</span>
          </wui-text>
        `:null}templateSecondDescription(){const t=this.descriptions?.[1];return t?L`
          <wui-icon class="description-separator-icon" size="xxs" name="arrowRight"></wui-icon>
          <wui-text variant="small-400" color="fg-200">
            <span>${t}</span>
          </wui-text>
        `:null}};C.styles=[St,se];F([_()],C.prototype,"type",void 0);F([_({type:Array})],C.prototype,"descriptions",void 0);F([_()],C.prototype,"date",void 0);F([_({type:Boolean})],C.prototype,"onlyDirectionIcon",void 0);F([_()],C.prototype,"status",void 0);F([_()],C.prototype,"direction",void 0);F([_({type:Array})],C.prototype,"images",void 0);F([_({type:Array})],C.prototype,"price",void 0);F([_({type:Array})],C.prototype,"amount",void 0);F([_({type:Array})],C.prototype,"symbol",void 0);C=F([mt("wui-transaction-list-item")],C);const oe=vt`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;var ae=function(e,t,i,o){var c=arguments.length,n=c<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,i):o,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,o);else for(var p=e.length-1;p>=0;p--)(l=e[p])&&(n=(c<3?l(n):c>3?l(t,i,n):l(t,i))||n);return c>3&&n&&Object.defineProperty(t,i,n),n};let xt=class extends $t{render(){return L`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="2xs">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-shimmer width="24px" height="12px" borderRadius="5xs"></wui-shimmer>
      </wui-flex>
    `}};xt.styles=[St,oe];xt=ae([mt("wui-transaction-list-item-loader")],xt);const ue=At`
  :host {
    min-height: 100%;
  }

  .group-container[last-group='true'] {
    padding-bottom: var(--wui-spacing-m);
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }

  .emptyContainer {
    height: 100%;
  }
`;var P=function(e,t,i,o){var c=arguments.length,n=c<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,i):o,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,o);else for(var p=e.length-1;p>=0;p--)(l=e[p])&&(n=(c<3?l(n):c>3?l(t,i,n):l(t,i))||n);return c>3&&n&&Object.defineProperty(t,i,n),n};const ct="last-transaction",ce=7;let B=class extends Rt{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.page="activity",this.caipAddress=ut.state.activeCaipAddress,this.transactionsByYear=j.state.transactionsByYear,this.loading=j.state.loading,this.empty=j.state.empty,this.next=j.state.next,j.clearCursor(),this.unsubscribe.push(ut.subscribeKey("activeCaipAddress",t=>{t&&this.caipAddress!==t&&(j.resetTransactions(),j.fetchTransactions(t)),this.caipAddress=t}),ut.subscribeKey("activeCaipNetwork",()=>{this.updateTransactionView()}),j.subscribe(t=>{this.transactionsByYear=t.transactionsByYear,this.loading=t.loading,this.empty=t.empty,this.next=t.next}))}firstUpdated(){this.updateTransactionView(),this.createPaginationObserver()}updated(){this.setPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return N` ${this.empty?null:this.templateTransactionsByYear()}
    ${this.loading?this.templateLoading():null}
    ${!this.loading&&this.empty?this.templateEmpty():null}`}updateTransactionView(){j.resetTransactions(),this.caipAddress&&j.fetchTransactions(gt.getPlainAddress(this.caipAddress))}templateTransactionsByYear(){return Object.keys(this.transactionsByYear).sort().reverse().map(i=>{const o=parseInt(i,10),c=new Array(12).fill(null).map((n,l)=>{const p=Z.getTransactionGroupTitle(o,l),g=this.transactionsByYear[o]?.[l];return{groupTitle:p,transactions:g}}).filter(({transactions:n})=>n).reverse();return c.map(({groupTitle:n,transactions:l},p)=>{const g=p===c.length-1;return l?N`
          <wui-flex
            flexDirection="column"
            class="group-container"
            last-group="${g?"true":"false"}"
            data-testid="month-indexes"
          >
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${["xs","s","s","s"]}
            >
              <wui-text variant="paragraph-500" color="fg-200" data-testid="group-title"
                >${n}</wui-text
              >
            </wui-flex>
            <wui-flex flexDirection="column" gap="xs">
              ${this.templateTransactions(l,g)}
            </wui-flex>
          </wui-flex>
        `:null})})}templateRenderTransaction(t,i){const{date:o,descriptions:c,direction:n,isAllNFT:l,images:p,status:g,transfers:m,type:v}=this.getTransactionListItemProps(t),x=m?.length>1;return m?.length===2&&!l?N`
        <wui-transaction-list-item
          date=${o}
          .direction=${n}
          id=${i&&this.next?ct:""}
          status=${g}
          type=${v}
          .images=${p}
          .descriptions=${c}
        ></wui-transaction-list-item>
      `:x?m.map((M,A)=>{const k=Z.getTransferDescription(M),W=i&&A===m.length-1;return N` <wui-transaction-list-item
          date=${o}
          direction=${M.direction}
          id=${W&&this.next?ct:""}
          status=${g}
          type=${v}
          .onlyDirectionIcon=${!0}
          .images=${[p[A]]}
          .descriptions=${[k]}
        ></wui-transaction-list-item>`}):N`
      <wui-transaction-list-item
        date=${o}
        .direction=${n}
        id=${i&&this.next?ct:""}
        status=${g}
        type=${v}
        .images=${p}
        .descriptions=${c}
      ></wui-transaction-list-item>
    `}templateTransactions(t,i){return t.map((o,c)=>{const n=i&&c===t.length-1;return N`${this.templateRenderTransaction(o,n)}`})}emptyStateActivity(){return N`<wui-flex
      class="emptyContainer"
      flexGrow="1"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      .padding=${["3xl","xl","3xl","xl"]}
      gap="xl"
      data-testid="empty-activity-state"
    >
      <wui-icon-box
        backgroundColor="gray-glass-005"
        background="gray"
        iconColor="fg-200"
        icon="wallet"
        size="lg"
        ?border=${!0}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
      <wui-flex flexDirection="column" alignItems="center" gap="xs">
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >No Transactions yet</wui-text
        >
        <wui-text align="center" variant="small-500" color="fg-200"
          >Start trading on dApps <br />
          to grow your wallet!</wui-text
        >
      </wui-flex>
    </wui-flex>`}emptyStateAccount(){return N`<wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
      data-testid="empty-account-state"
    >
      <wui-icon-box
        icon="swapHorizontal"
        size="inherit"
        iconColor="fg-200"
        backgroundColor="fg-200"
        iconSize="lg"
      ></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="xs"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100">No activity yet</wui-text>
        <wui-text variant="small-400" align="center" color="fg-200"
          >Your next transactions will appear here</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)}>Trade</wui-link>
    </wui-flex>`}templateEmpty(){return this.page==="account"?N`${this.emptyStateAccount()}`:N`${this.emptyStateActivity()}`}templateLoading(){return this.page==="activity"?Array(ce).fill(N` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map(t=>t):null}onReceiveClick(){Lt.push("WalletReceive")}createPaginationObserver(){const{projectId:t}=Nt.state;this.paginationObserver=new IntersectionObserver(([i])=>{i?.isIntersecting&&!this.loading&&(j.fetchTransactions(gt.getPlainAddress(this.caipAddress)),jt.sendEvent({type:"track",event:"LOAD_MORE_TRANSACTIONS",properties:{address:gt.getPlainAddress(this.caipAddress),projectId:t,cursor:this.next,isSmartAccount:Ft(ut.state.activeChain)===kt.ACCOUNT_TYPES.SMART_ACCOUNT}}))},{}),this.setPaginationObserver()}setPaginationObserver(){this.paginationObserver?.disconnect();const t=this.shadowRoot?.querySelector(`#${ct}`);t&&this.paginationObserver?.observe(t)}getTransactionListItemProps(t){const i=wt.formatDate(t?.metadata?.minedAt),o=Z.getTransactionDescriptions(t),c=t?.transfers,n=t?.transfers?.[0],l=!!n&&t?.transfers?.every(g=>!!g.nft_info),p=Z.getTransactionImages(c);return{date:i,direction:n?.direction,descriptions:o,isAllNFT:l,images:p,status:t.metadata?.status,transfers:c,type:t.metadata?.operationType}}};B.styles=ue;P([Ct()],B.prototype,"page",void 0);P([nt()],B.prototype,"caipAddress",void 0);P([nt()],B.prototype,"transactionsByYear",void 0);P([nt()],B.prototype,"loading",void 0);P([nt()],B.prototype,"empty",void 0);P([nt()],B.prototype,"next",void 0);B=P([mt("w3m-activity-list")],B);
