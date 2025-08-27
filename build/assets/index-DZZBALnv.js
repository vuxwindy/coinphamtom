import{S as c,T as g,U as h,V as x,W as u}from"./index-W7O16Knq.js";import{n as d,c as w}from"./index-KkpI0fgd.js";import"./index-DgA7GKrI.js";import"./index-CX_ap1W4.js";import"./index-BTClOK_9.js";const m=c`
  :host {
    display: block;
  }

  :host > button,
  :host > wui-flex {
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-1xs);
    height: 40px;
    border-radius: var(--wui-border-radius-l);
    background: var(--wui-color-gray-glass-002);
    border-width: 0px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
  }

  :host > button wui-image {
    width: 24px;
    height: 24px;
    border-radius: var(--wui-border-radius-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;var l=function(o,t,r,s){var a=arguments.length,e=a<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,r):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(o,t,r,s);else for(var p=o.length-1;p>=0;p--)(n=o[p])&&(e=(a<3?n(e):a>3?n(t,r,e):n(t,r))||e);return a>3&&e&&Object.defineProperty(t,r,e),e};let i=class extends x{constructor(){super(...arguments),this.text="",this.loading=!1}render(){return this.loading?u` <wui-flex alignItems="center" gap="xxs" padding="xs">
        <wui-shimmer width="24px" height="24px"></wui-shimmer>
        <wui-shimmer width="40px" height="20px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>`:u`
      <button>
        ${this.tokenTemplate()}
        <wui-text variant="paragraph-600" color="fg-100">${this.text}</wui-text>
      </button>
    `}tokenTemplate(){return this.imageSrc?u`<wui-image src=${this.imageSrc}></wui-image>`:u`
      <wui-icon-box
        size="sm"
        iconColor="fg-200"
        backgroundColor="fg-300"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};i.styles=[g,h,m];l([d()],i.prototype,"imageSrc",void 0);l([d()],i.prototype,"text",void 0);l([d({type:Boolean})],i.prototype,"loading",void 0);i=l([w("wui-token-button")],i);
