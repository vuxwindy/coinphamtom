import{O as f,a3 as p,P as d}from"./index-NVPnfjv5.js";import{n as c}from"./class-map-BfYkPkqt.js";import{c as h,r as b,e as x,a as g}from"./index-CLkz0d9K.js";import"./index-CpoP7b4K.js";const y=h`
  :host {
    width: 100%;
  }

  button {
    padding: ${({spacing:e})=>e[3]};
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    background-color: transparent;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  button:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image,
  wui-icon {
    width: ${({spacing:e})=>e[10]};
    height: ${({spacing:e})=>e[10]};
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e[16]};
  }
`;var s=function(e,o,r,n){var i=arguments.length,t=i<3?o:n===null?n=Object.getOwnPropertyDescriptor(o,r):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(e,o,r,n);else for(var u=e.length-1;u>=0;u--)(a=e[u])&&(t=(i<3?a(t):i>3?a(o,r,t):a(o,r))||t);return i>3&&t&&Object.defineProperty(o,r,t),t};let l=class extends f{constructor(){super(...arguments),this.tokenName="",this.tokenImageUrl="",this.tokenValue=0,this.tokenAmount="0.0",this.tokenCurrency="",this.clickable=!1}render(){return d`
      <button data-clickable=${String(this.clickable)}>
        <wui-flex gap="2" alignItems="center">
          ${this.visualTemplate()}
          <wui-flex flexDirection="column" justifyContent="space-between" gap="1">
            <wui-text variant="md-regular" color="primary">${this.tokenName}</wui-text>
            <wui-text variant="sm-regular-mono" color="secondary">
              ${p.formatNumberToLocalString(this.tokenAmount,4)} ${this.tokenCurrency}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          justifyContent="space-between"
          gap="1"
          alignItems="flex-end"
        >
          <wui-text variant="md-regular-mono" color="primary"
            >$${this.tokenValue.toFixed(2)}</wui-text
          >
          <wui-text variant="sm-regular-mono" color="secondary">
            ${p.formatNumberToLocalString(this.tokenAmount,4)}
          </wui-text>
        </wui-flex>
      </button>
    `}visualTemplate(){return this.tokenName&&this.tokenImageUrl?d`<wui-image alt=${this.tokenName} src=${this.tokenImageUrl}></wui-image>`:d`<wui-icon name="coinPlaceholder" color="default"></wui-icon>`}};l.styles=[b,x,y];s([c()],l.prototype,"tokenName",void 0);s([c()],l.prototype,"tokenImageUrl",void 0);s([c({type:Number})],l.prototype,"tokenValue",void 0);s([c()],l.prototype,"tokenAmount",void 0);s([c()],l.prototype,"tokenCurrency",void 0);s([c({type:Boolean})],l.prototype,"clickable",void 0);l=s([g("wui-list-token")],l);const k=h`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: ${({tokens:e})=>e.theme.borderPrimary};
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 8px;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }
`;var w=function(e,o,r,n){var i=arguments.length,t=i<3?o:n===null?n=Object.getOwnPropertyDescriptor(o,r):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(e,o,r,n);else for(var u=e.length-1;u>=0;u--)(a=e[u])&&(t=(i<3?a(t):i>3?a(o,r,t):a(o,r))||t);return i>3&&t&&Object.defineProperty(o,r,t),t};let m=class extends f{constructor(){super(...arguments),this.text=""}render(){return d`${this.template()}`}template(){return this.text?d`<wui-text variant="md-regular" color="secondary">${this.text}</wui-text>`:null}};m.styles=[b,k];w([c()],m.prototype,"text",void 0);m=w([g("wui-separator")],m);
