import{bo as x,bp as S,bi as C,S as m,T as v,V as y,W as $}from"./index-W7O16Knq.js";const p={getSpacingStyles(t,e){if(Array.isArray(t))return t[e]?`var(--wui-spacing-${t[e]})`:void 0;if(typeof t=="string")return`var(--wui-spacing-${t})`},getFormattedDate(t){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t)},getHostName(t){try{return new URL(t).hostname}catch{return""}},getTruncateString({string:t,charsStart:e,charsEnd:i,truncate:n}){return t.length<=e+i?t:n==="end"?`${t.substring(0,e)}...`:n==="start"?`...${t.substring(t.length-i)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(i))}`},generateAvatarColors(t){const i=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),n=this.hexToRgb(i),r=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),s=100-3*Number(r?.replace("px","")),a=`${s}% ${s}% at 65% 40%`,f=[];for(let h=0;h<5;h+=1){const w=this.tintColor(n,.15*h);f.push(`rgb(${w[0]}, ${w[1]}, ${w[2]})`)}return`
    --local-color-1: ${f[0]};
    --local-color-2: ${f[1]};
    --local-color-3: ${f[2]};
    --local-color-4: ${f[3]};
    --local-color-5: ${f[4]};
    --local-radial-circle: ${a}
   `},hexToRgb(t){const e=parseInt(t,16),i=e>>16&255,n=e>>8&255,r=e&255;return[i,n,r]},tintColor(t,e){const[i,n,r]=t,o=Math.round(i+(255-i)*e),s=Math.round(n+(255-n)*e),a=Math.round(r+(255-r)*e);return[o,s,a]},isNumber(t){return{number:/^[0-9]+$/u}.number.test(t)},getColorTheme(t){return t||(typeof window<"u"&&window.matchMedia&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-color-scheme: dark)")?.matches?"dark":"light":"dark")},splitBalance(t){const e=t.split(".");return e.length===2?[e[0],e[1]]:["0","00"]},roundNumber(t,e,i){return t.toString().length>=e?Number(t).toFixed(i):t}};function z(t,e){const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(r){customElements.get(t)||customElements.define(t,r)}}}function T(t,e){return customElements.get(t)||customElements.define(t,e),e}function b(t){return function(i){return typeof i=="function"?T(t,i):z(t,i)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _={attribute:!0,type:String,converter:S,reflect:!1,hasChanged:x},j=(t=_,e,i)=>{const{kind:n,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),n==="accessor"){const{name:s}=i;return{set(a){const f=e.get.call(this);e.set.call(this,a),this.requestUpdate(s,f,t)},init(a){return a!==void 0&&this.C(s,void 0,t,a),a}}}if(n==="setter"){const{name:s}=i;return function(a){const f=this[s];e.call(this,a),this.requestUpdate(s,f,t)}}throw Error("Unsupported decorator location: "+n)};function l(t){return(e,i)=>typeof i=="object"?j(t,e,i):((n,r,o)=>{const s=r.hasOwnProperty(o);return r.constructor.createProperty(o,n),s?Object.getOwnPropertyDescriptor(r,o):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M={ATTRIBUTE:1,CHILD:2},U=t=>(...e)=>({_$litDirective$:t,values:e});class R{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,n){this._$Ct=e,this._$AM=i,this._$Ci=n}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=U(class extends R{constructor(t){if(super(t),t.type!==M.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((n=>n!==""))));for(const n in e)e[n]&&!this.nt?.has(n)&&this.st.add(n);return this.render(e)}const i=t.element.classList;for(const n of this.st)n in e||(i.remove(n),this.st.delete(n));for(const n in e){const r=!!e[n];r===this.st.has(n)||this.nt?.has(n)||(r?(i.add(n),this.st.add(n)):(i.remove(n),this.st.delete(n)))}return C}}),E=m`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600,
  .wui-font-micro-500 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;var g=function(t,e,i,n){var r=arguments.length,o=r<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let d=class extends y{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){const e={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,$`<slot class=${A(e)}></slot>`}};d.styles=[v,E];g([l()],d.prototype,"variant",void 0);g([l()],d.prototype,"color",void 0);g([l()],d.prototype,"align",void 0);g([l()],d.prototype,"lineClamp",void 0);d=g([b("wui-text")],d);const P=m`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var c=function(t,e,i,n){var r=arguments.length,o=r<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let u=class extends y{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&p.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&p.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&p.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&p.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&p.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&p.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&p.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&p.getSpacingStyles(this.margin,3)};
    `,$`<slot></slot>`}};u.styles=[v,P];c([l()],u.prototype,"flexDirection",void 0);c([l()],u.prototype,"flexWrap",void 0);c([l()],u.prototype,"flexBasis",void 0);c([l()],u.prototype,"flexGrow",void 0);c([l()],u.prototype,"flexShrink",void 0);c([l()],u.prototype,"alignItems",void 0);c([l()],u.prototype,"justifyContent",void 0);c([l()],u.prototype,"columnGap",void 0);c([l()],u.prototype,"rowGap",void 0);c([l()],u.prototype,"gap",void 0);c([l()],u.prototype,"padding",void 0);c([l()],u.prototype,"margin",void 0);u=c([b("wui-flex")],u);export{p as U,A as a,b as c,U as e,R as i,l as n,M as t};
