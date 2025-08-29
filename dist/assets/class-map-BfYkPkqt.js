import{aS as f,aT as $,P as g,aU as b}from"./index-NVPnfjv5.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:f},m=(t=v,s,r)=>{const{kind:e,metadata:i}=r;let a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),e==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(r.name,t),e==="accessor"){const{name:n}=r;return{set(o){const u=s.get.call(this);s.set.call(this,o),this.requestUpdate(n,u,t)},init(o){return o!==void 0&&this.C(n,void 0,t,o),o}}}if(e==="setter"){const{name:n}=r;return function(o){const u=this[n];s.call(this,o),this.requestUpdate(n,u,t)}}throw Error("Unsupported decorator location: "+e)};function y(t){return(s,r)=>typeof r=="object"?m(t,s,r):((e,i,a)=>{const n=i.hasOwnProperty(a);return i.constructor.createProperty(a,e),n?Object.getOwnPropertyDescriptor(i,a):void 0})(t,s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function j(t){return y({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const p=Symbol.for(""),T=t=>{if(t?.r===p)return t?._$litStatic$},M=t=>({_$litStatic$:t,r:p}),d=new Map,_=t=>(s,...r)=>{const e=r.length;let i,a;const n=[],o=[];let u,c=0,h=!1;for(;c<e;){for(u=s[c];c<e&&(a=r[c],(i=T(a))!==void 0);)u+=i+s[++c],h=!0;c!==e&&o.push(a),n.push(u),c++}if(c===e&&n.push(s[e]),h){const l=n.join("$$lit$$");(s=d.get(l))===void 0&&(n.raw=n,d.set(l,s=n)),r=o}return t(s,...r)},P=_(g);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w={ATTRIBUTE:1,CHILD:2},A=t=>(...s)=>({_$litDirective$:t,values:s});class S{constructor(s){}get _$AU(){return this._$AM._$AU}_$AT(s,r,e){this._$Ct=s,this._$AM=r,this._$Ci=e}_$AS(s,r){return this.update(s,r)}update(s,r){return this.render(...r)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=A(class extends S{constructor(t){if(super(t),t.type!==w.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((s=>t[s])).join(" ")+" "}update(t,[s]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((e=>e!==""))));for(const e in s)s[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(s)}const r=t.element.classList;for(const e of this.st)e in s||(r.remove(e),this.st.delete(e));for(const e in s){const i=!!s[e];i===this.st.has(e)||this.nt?.has(e)||(i?(r.add(e),this.st.add(e)):(r.remove(e),this.st.delete(e)))}return b}});export{C as a,A as e,S as i,y as n,j as r,M as s,w as t,P as u};
