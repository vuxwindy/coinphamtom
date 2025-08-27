import{i as f,a as m,x as a}from"./state-Cf6Acp3J.js";import"./index-W7O16Knq.js";import{c as p}from"./index-KkpI0fgd.js";import"./index-CUFGt7Ac.js";import"./index-BTClOK_9.js";import"./index-Cqg5Vvc8.js";import"./index-DsLsIr5D.js";import"./if-defined-Cjow_KMx.js";import"./index-DgA7GKrI.js";import"./index-CX_ap1W4.js";const d=f`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;var u=function(o,e,i,r){var n=arguments.length,t=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(o,e,i,r);else for(var c=o.length-1;c>=0;c--)(l=o[c])&&(t=(n<3?l(t):n>3?l(e,i,t):l(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let s=class extends m{render(){return a`
      <wui-flex flexDirection="column" .padding=${["0","m","m","m"]} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};s.styles=d;s=u([p("w3m-transactions-view")],s);export{s as W3mTransactionsView};
