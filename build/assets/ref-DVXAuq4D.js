import{E as h}from"./index-W7O16Knq.js";import{f as o}from"./index-Cqg5Vvc8.js";import{e as n}from"./index-KkpI0fgd.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const a=()=>new r;class r{}const e=new WeakMap,G=n(class extends o{render(t){return h}update(t,[s]){const i=s!==this.G;return i&&this.G!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=s,this.ht=t.options?.host,this.rt(this.ct=t.element)),h}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){const s=this.ht??globalThis;let i=e.get(s);i===void 0&&(i=new WeakMap,e.set(s,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return typeof this.G=="function"?e.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});export{a as e,G as n};
