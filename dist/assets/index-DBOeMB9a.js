import{U as p,X as g,T as _,a5 as h,ad as w,W as m,V as c,aR as E,a7 as R,O as y,P as b}from"./index-NVPnfjv5.js";import{n as u}from"./class-map-BfYkPkqt.js";import{o as $}from"./if-defined-Cb88xRGe.js";import{c as C,r as v,a as S,e as O}from"./index-CLkz0d9K.js";function T(){try{return c.returnOpenHref(`${R.SECURE_SITE_SDK_ORIGIN}/loading`,"popupWindow","width=600,height=800,scrollbars=yes")}catch{throw new Error("Could not open social popup")}}async function U(){h.push("ConnectingFarcaster");const e=w.getAuthConnector();if(e&&!p.state.farcasterUrl)try{const{url:t}=await e.provider.getFarcasterUri();p.setFarcasterUrl(t,g.state.activeChain)}catch(t){h.goBack(),m.showError(t)}}async function W(e){h.push("ConnectingSocial");const t=w.getAuthConnector();let o=null;try{const i=setTimeout(()=>{throw new Error("Social login timed out. Please try again.")},45e3);if(t&&e){if(c.isTelegram()||(o=T()),o)p.setSocialWindow(o,g.state.activeChain);else if(!c.isTelegram())throw new Error("Could not create social popup");const{uri:n}=await t.provider.getSocialRedirectUri({provider:e});if(!n)throw o?.close(),new Error("Could not fetch the social redirect uri");if(o&&(o.location.href=n),c.isTelegram()){E.setTelegramSocialProvider(e);const r=c.formatTelegramSocialLoginUrl(n);c.openHref(r,"_top")}clearTimeout(i)}}catch(i){o?.close(),m.showError(i?.message)}}async function F(e){p.setSocialProvider(e,g.state.activeChain),_.sendEvent({type:"track",event:"SOCIAL_LOGIN_STARTED",properties:{provider:e}}),e==="farcaster"?await U():await W(e)}const j=C`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: ${({borderRadius:e})=>e[20]};
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`;var x=function(e,t,o,i){var n=arguments.length,r=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,o,i);else for(var l=e.length-1;l>=0;l--)(a=e[l])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let f=class extends y{constructor(){super(...arguments),this.logo="google"}render(){return b`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};f.styles=[v,j];x([u()],f.prototype,"logo",void 0);f=x([S("wui-logo")],f);const I=C`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:e})=>e[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-text {
    text-transform: capitalize;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var d=function(e,t,o,i){var n=arguments.length,r=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,o,i);else for(var l=e.length-1;l>=0;l--)(a=e[l])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let s=class extends y{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.disabled=!1}render(){return b`
      <button ?disabled=${this.disabled} tabindex=${$(this.tabIdx)}>
        <wui-flex gap="2" alignItems="center">
          <wui-image ?boxed=${!0} logo=${this.logo}></wui-image>
          <wui-text variant="lg-regular" color="primary">${this.name}</wui-text>
        </wui-flex>
        <wui-icon name="chevronRight" size="lg" color="default"></wui-icon>
      </button>
    `}};s.styles=[v,O,I];d([u()],s.prototype,"logo",void 0);d([u()],s.prototype,"name",void 0);d([u()],s.prototype,"tabIdx",void 0);d([u({type:Boolean})],s.prototype,"disabled",void 0);s=d([S("wui-list-social")],s);export{F as e};
