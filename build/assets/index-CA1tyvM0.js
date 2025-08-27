import{a as x,x as l,n as y,r as c,i as W,T as gn}from"./state-Cf6Acp3J.js";import{o as h}from"./if-defined-BKrOdqAi.js";import{S as _,T,U as D,V as N,W as w,a6 as d,aJ as v,br as Re,aG as S,aa as $,a8 as b,aF as B,a3 as I,aY as de,af as m,a2 as k,$ as f,ad as q,a0 as E,a4 as ke,a5 as ue,a1 as g,bw as vn,bB as Oe,bC as Se,bD as te,aI as xn,aj as yn,bt as A,bE as Pe,bk as Cn,ab as $n,bj as Sn,aH as ii,bF as kn,bG as In,bs as _i}from"./index-W7O16Knq.js";import{n as u,c as p,U as H}from"./index-KkpI0fgd.js";import{o as Me}from"./if-defined-Cjow_KMx.js";import"./index-DgA7GKrI.js";import"./index-XAL8BJnK.js";import"./index-B3sZNB9u.js";import"./index-BTClOK_9.js";import{W as kr}from"./index-DLaXJVxM.js";import"./index-BkuMDALp.js";import"./index-BNLNiClf.js";import"./index-Cqg5Vvc8.js";import"./index-NtF0e3ax.js";import{r as Qi}from"./state-BNPL_3uu.js";import"./index-Sz6pSxEn.js";import{n as An}from"./index-Dmbf6N_C.js";import{H as Wn,N as En}from"./HelpersUtil-DNixBIjv.js";import"./index-CUFGt7Ac.js";import"./index-DsLsIr5D.js";import{M as yt}from"./index-BxK889hR.js";import"./index-D0gkOPNs.js";import{a as _n,i as Tn,t as Nn,e as Rn,n as On}from"./ref-D8lD3BzL.js";import"./index-Br57CPtN.js";import{e as Ji,n as Zi}from"./ref-DVXAuq4D.js";import"./index-DkewI-3x.js";import"./index-CX_ap1W4.js";import"./index-BwYKPcL7.js";import{O as Ct}from"./index-Dl-p1Jbf.js";import{e as Pn}from"./index-SvmkJxsZ.js";import"./index-XapnR-EF.js";import"./index-DU1pprzb.js";import"./index-fD5z2hcm.js";import"./index-zd-rhwAS.js";import"./ConstantsUtil-Dmg8YACJ.js";const Dn=_`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    background: var(--wui-color-gray-glass-002);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  button:disabled {
    background: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-image,
  button:disabled > wui-flex > wui-avatar {
    filter: grayscale(1);
  }

  button:has(wui-image) {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-3xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
  }

  wui-text {
    color: var(--wui-color-fg-100);
  }

  wui-flex > wui-text {
    color: var(--wui-color-fg-200);
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-flex {
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    background: var(--wui-color-gray-glass-005);
    padding: 4px var(--wui-spacing-m) 4px var(--wui-spacing-xxs);
  }

  button.local-no-balance {
    border-radius: 0px;
    border: none;
    background: transparent;
  }

  wui-avatar {
    width: 20px;
    height: 20px;
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-010);
  }

  @media (max-width: 500px) {
    button {
      gap: 0px;
      padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) !important;
      height: 32px;
    }
    wui-image,
    wui-icon-box,
    button > wui-text {
      visibility: hidden;
      width: 0px;
      height: 0px;
    }
    button {
      border-radius: 0px;
      border: none;
      background: transparent;
      padding: 0px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }

    button:active:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }
  }
`;var he=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ie=class extends N{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.balance=void 0,this.isUnsupportedChain=void 0,this.disabled=!1,this.loading=!1,this.address="",this.profileName="",this.charsStart=4,this.charsEnd=6}render(){return w`
      <button
        ?disabled=${this.disabled}
        class=${Me(this.balance?void 0:"local-no-balance")}
      >
        ${this.balanceTemplate()}
        <wui-flex gap="xxs" alignItems="center">
          <wui-avatar
            .imageSrc=${this.avatarSrc}
            alt=${this.address}
            address=${this.address}
          ></wui-avatar>
          <wui-text variant="paragraph-600" color="inherit">
            ${this.address?H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"}):null}
          </wui-text>
        </wui-flex>
      </button>
    `}balanceTemplate(){if(this.isUnsupportedChain)return w` <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
          data-testid="wui-account-button-unsupported-chain"
        ></wui-icon-box>
        <wui-text variant="paragraph-600" color="inherit"> Switch Network</wui-text>`;if(this.balance){const e=this.networkSrc?w`<wui-image src=${this.networkSrc}></wui-image>`:w`
            <wui-icon-box
              size="sm"
              iconColor="fg-200"
              backgroundColor="fg-300"
              icon="networkPlaceholder"
            ></wui-icon-box>
          `,i=this.loading?w`<wui-loading-spinner size="md" color="fg-200"></wui-loading-spinner>`:w`<wui-text variant="paragraph-600" color="inherit"> ${this.balance}</wui-text>`;return w`${e} ${i}`}return null}};ie.styles=[T,D,Dn];he([u()],ie.prototype,"networkSrc",void 0);he([u()],ie.prototype,"avatarSrc",void 0);he([u()],ie.prototype,"balance",void 0);he([u({type:Boolean})],ie.prototype,"isUnsupportedChain",void 0);he([u({type:Boolean})],ie.prototype,"disabled",void 0);he([u({type:Boolean})],ie.prototype,"loading",void 0);he([u()],ie.prototype,"address",void 0);he([u()],ie.prototype,"profileName",void 0);he([u()],ie.prototype,"charsStart",void 0);he([u()],ie.prototype,"charsEnd",void 0);ie=he([p("wui-account-button")],ie);var V=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class G extends x{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance="show",this.charsStart=4,this.charsEnd=6,this.namespace=void 0,this.isSupported=v.state.allowUnsupportedChain?!0:d.state.activeChain?d.checkIfSupportedNetwork(d.state.activeChain):!0}connectedCallback(){super.connectedCallback(),this.setAccountData(d.getAccountData(this.namespace)),this.setNetworkData(d.getNetworkData(this.namespace))}firstUpdated(){const e=this.namespace;e?this.unsubscribe.push(d.subscribeChainProp("accountState",i=>{this.setAccountData(i)},e),d.subscribeChainProp("networkState",i=>{this.setNetworkData(i),this.isSupported=d.checkIfSupportedNetwork(e,i?.caipNetwork?.caipNetworkId)},e)):this.unsubscribe.push(Re.subscribeNetworkImages(()=>{this.networkImage=S.getNetworkImage(this.network)}),d.subscribeKey("activeCaipAddress",i=>{this.caipAddress=i}),$.subscribeKey("balance",i=>this.balanceVal=i),$.subscribeKey("balanceSymbol",i=>this.balanceSymbol=i),$.subscribeKey("profileName",i=>this.profileName=i),$.subscribeKey("profileImage",i=>this.profileImage=i),d.subscribeKey("activeCaipNetwork",i=>{this.network=i,this.networkImage=S.getNetworkImage(i),this.isSupported=i?.chainNamespace?d.checkIfSupportedNetwork(i?.chainNamespace):!0,this.fetchNetworkImage(i)}))}updated(){this.fetchNetworkImage(this.network)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!d.state.activeChain)return null;const e=this.balance==="show",i=typeof this.balanceVal!="string";return l`
      <wui-account-button
        .disabled=${!!this.disabled}
        .isUnsupportedChain=${v.state.allowUnsupportedChain?!1:!this.isSupported}
        address=${h(b.getPlainAddress(this.caipAddress))}
        profileName=${h(this.profileName)}
        networkSrc=${h(this.networkImage)}
        avatarSrc=${h(this.profileImage)}
        balance=${e?b.formatBalance(this.balanceVal,this.balanceSymbol):""}
        @click=${this.onClick.bind(this)}
        data-testid=${`account-button${this.namespace?`-${this.namespace}`:""}`}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${i}
      >
      </wui-account-button>
    `}onClick(){this.isSupported||v.state.allowUnsupportedChain?B.open({namespace:this.namespace}):B.open({view:"UnsupportedChain"})}async fetchNetworkImage(e){e?.assets?.imageId&&(this.networkImage=await S.fetchNetworkImage(e?.assets?.imageId))}setAccountData(e){e&&(this.caipAddress=e.caipAddress,this.balanceVal=e.balance,this.balanceSymbol=e.balanceSymbol,this.profileName=e.profileName,this.profileImage=e.profileImage)}setNetworkData(e){e&&(this.network=e.caipNetwork,this.networkImage=S.getNetworkImage(e.caipNetwork))}}V([y({type:Boolean})],G.prototype,"disabled",void 0);V([y()],G.prototype,"balance",void 0);V([y()],G.prototype,"charsStart",void 0);V([y()],G.prototype,"charsEnd",void 0);V([y()],G.prototype,"namespace",void 0);V([c()],G.prototype,"caipAddress",void 0);V([c()],G.prototype,"balanceVal",void 0);V([c()],G.prototype,"balanceSymbol",void 0);V([c()],G.prototype,"profileName",void 0);V([c()],G.prototype,"profileImage",void 0);V([c()],G.prototype,"network",void 0);V([c()],G.prototype,"networkImage",void 0);V([c()],G.prototype,"isSupported",void 0);let Ti=class extends G{};Ti=V([p("w3m-account-button")],Ti);let Ni=class extends G{};Ni=V([p("appkit-account-button")],Ni);const jn=W`
  :host {
    display: block;
    width: max-content;
  }
`;var we=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class ae extends x{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance=void 0,this.size=void 0,this.label=void 0,this.loadingLabel=void 0,this.charsStart=4,this.charsEnd=6,this.namespace=void 0}firstUpdated(){this.caipAddress=this.namespace?d.state.chains.get(this.namespace)?.accountState?.caipAddress:d.state.activeCaipAddress,this.namespace?this.unsubscribe.push(d.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},this.namespace)):this.unsubscribe.push(d.subscribeKey("activeCaipAddress",e=>this.caipAddress=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return this.caipAddress?l`
          <appkit-account-button
            .disabled=${!!this.disabled}
            balance=${h(this.balance)}
            .charsStart=${h(this.charsStart)}
            .charsEnd=${h(this.charsEnd)}
            namespace=${h(this.namespace)}
          >
          </appkit-account-button>
        `:l`
          <appkit-connect-button
            size=${h(this.size)}
            label=${h(this.label)}
            loadingLabel=${h(this.loadingLabel)}
            namespace=${h(this.namespace)}
          ></appkit-connect-button>
        `}}ae.styles=jn;we([y({type:Boolean})],ae.prototype,"disabled",void 0);we([y()],ae.prototype,"balance",void 0);we([y()],ae.prototype,"size",void 0);we([y()],ae.prototype,"label",void 0);we([y()],ae.prototype,"loadingLabel",void 0);we([y()],ae.prototype,"charsStart",void 0);we([y()],ae.prototype,"charsEnd",void 0);we([y()],ae.prototype,"namespace",void 0);we([c()],ae.prototype,"caipAddress",void 0);let Ri=class extends ae{};Ri=we([p("w3m-button")],Ri);let Oi=class extends ae{};Oi=we([p("appkit-button")],Oi);const Ln=_`
  :host {
    position: relative;
    display: block;
  }

  button {
    background: var(--wui-color-accent-100);
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-m);
    gap: var(--wui-spacing-xs);
  }

  button.loading {
    background: var(--wui-color-gray-glass-010);
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-080);
    }
  }

  button:focus-visible {
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-accent-090);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  button[data-size='sm'] {
    padding: 6.75px 10px 7.25px;
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
    color: var(--wui-color-inverse-100);
  }

  button[data-size='md'] {
    padding: 9px var(--wui-spacing-l) 9px var(--wui-spacing-l);
  }

  button[data-size='md'] + wui-text {
    padding-left: var(--wui-spacing-3xs);
  }

  @media (max-width: 500px) {
    button[data-size='md'] {
      height: 32px;
      padding: 5px 12px;
    }

    button[data-size='md'] > wui-text > slot {
      font-size: 14px !important;
    }
  }

  wui-loading-spinner {
    width: 14px;
    height: 14px;
  }

  wui-loading-spinner::slotted(svg) {
    width: 10px !important;
    height: 10px !important;
  }

  button[data-size='sm'] > wui-loading-spinner {
    width: 12px;
    height: 12px;
  }
`;var mi=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let st=class extends N{constructor(){super(...arguments),this.size="md",this.loading=!1}render(){const e=this.size==="md"?"paragraph-600":"small-600";return w`
      <button data-size=${this.size} ?disabled=${this.loading}>
        ${this.loadingTemplate()}
        <wui-text variant=${e} color=${this.loading?"accent-100":"inherit"}>
          <slot></slot>
        </wui-text>
      </button>
    `}loadingTemplate(){return this.loading?w`<wui-loading-spinner size=${this.size} color="accent-100"></wui-loading-spinner>`:null}};st.styles=[T,D,Ln];mi([u()],st.prototype,"size",void 0);mi([u({type:Boolean})],st.prototype,"loading",void 0);st=mi([p("wui-connect-button")],st);var Ee=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class _e extends x{constructor(){super(),this.unsubscribe=[],this.size="md",this.label="Connect Wallet",this.loadingLabel="Connecting...",this.open=B.state.open,this.loading=this.namespace?B.state.loadingNamespaceMap.get(this.namespace):B.state.loading,this.unsubscribe.push(B.subscribe(e=>{this.open=e.open,this.loading=this.namespace?e.loadingNamespaceMap.get(this.namespace):e.loading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      <wui-connect-button
        size=${h(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${`connect-button${this.namespace?`-${this.namespace}`:""}`}
      >
        ${this.loading?this.loadingLabel:this.label}
      </wui-connect-button>
    `}onClick(){this.open?B.close():this.loading||B.open({view:"Connect",namespace:this.namespace})}}Ee([y()],_e.prototype,"size",void 0);Ee([y()],_e.prototype,"label",void 0);Ee([y()],_e.prototype,"loadingLabel",void 0);Ee([y()],_e.prototype,"namespace",void 0);Ee([c()],_e.prototype,"open",void 0);Ee([c()],_e.prototype,"loading",void 0);let Pi=class extends _e{};Pi=Ee([p("w3m-connect-button")],Pi);let Di=class extends _e{};Di=Ee([p("appkit-connect-button")],Di);const Bn=_`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-s) var(--wui-spacing-2xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-gray-glass-005);
    color: var(--wui-color-fg-100);
  }

  button:disabled {
    border: 1px solid var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }
`;var Ut=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ve=class extends N{constructor(){super(...arguments),this.imageSrc=void 0,this.isUnsupportedChain=void 0,this.disabled=!1}render(){return w`
      <button data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant="paragraph-600" color="inherit">
          <slot></slot>
        </wui-text>
      </button>
    `}visualTemplate(){return this.isUnsupportedChain?w`
        <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
      `:this.imageSrc?w`<wui-image src=${this.imageSrc}></wui-image>`:w`
      <wui-icon-box
        size="sm"
        iconColor="inverse-100"
        backgroundColor="fg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};Ve.styles=[T,D,Bn];Ut([u()],Ve.prototype,"imageSrc",void 0);Ut([u({type:Boolean})],Ve.prototype,"isUnsupportedChain",void 0);Ut([u({type:Boolean})],Ve.prototype,"disabled",void 0);Ve=Ut([p("wui-network-button")],Ve);const Un=W`
  :host {
    display: block;
    width: max-content;
  }
`;var $e=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class ve extends x{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.network=d.state.activeCaipNetwork,this.networkImage=S.getNetworkImage(this.network),this.caipAddress=d.state.activeCaipAddress,this.loading=B.state.loading,this.isSupported=v.state.allowUnsupportedChain?!0:d.state.activeChain?d.checkIfSupportedNetwork(d.state.activeChain):!0,this.unsubscribe.push(Re.subscribeNetworkImages(()=>{this.networkImage=S.getNetworkImage(this.network)}),d.subscribeKey("activeCaipAddress",e=>{this.caipAddress=e}),d.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=S.getNetworkImage(e),this.isSupported=e?.chainNamespace?d.checkIfSupportedNetwork(e.chainNamespace):!0,S.fetchNetworkImage(e?.assets?.imageId)}),B.subscribeKey("loading",e=>this.loading=e))}firstUpdated(){S.fetchNetworkImage(this.network?.assets?.imageId)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.network?d.checkIfSupportedNetwork(this.network.chainNamespace):!0;return l`
      <wui-network-button
        .disabled=${!!(this.disabled||this.loading)}
        .isUnsupportedChain=${v.state.allowUnsupportedChain?!1:!e}
        imageSrc=${h(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `}getLabel(){return this.network?!this.isSupported&&!v.state.allowUnsupportedChain?"Switch Network":this.network.name:this.label?this.label:this.caipAddress?"Unknown Network":"Select Network"}onClick(){this.loading||(I.sendEvent({type:"track",event:"CLICK_NETWORKS"}),B.open({view:"Networks"}))}}ve.styles=Un;$e([y({type:Boolean})],ve.prototype,"disabled",void 0);$e([y({type:String})],ve.prototype,"label",void 0);$e([c()],ve.prototype,"network",void 0);$e([c()],ve.prototype,"networkImage",void 0);$e([c()],ve.prototype,"caipAddress",void 0);$e([c()],ve.prototype,"loading",void 0);$e([c()],ve.prototype,"isSupported",void 0);let ji=class extends ve{};ji=$e([p("w3m-network-button")],ji);let Li=class extends ve{};Li=$e([p("appkit-network-button")],Li);const zn=_`
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: block;
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-2l);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-accent-glass-010);
  }

  button:hover {
    background-color: var(--wui-color-accent-glass-015) !important;
  }

  button:active {
    background-color: var(--wui-color-accent-glass-020) !important;
  }
`;var zt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ge=class extends N{constructor(){super(...arguments),this.label="",this.description="",this.icon="wallet"}render(){return w`
      <button>
        <wui-flex gap="m" alignItems="center" justifyContent="space-between">
          <wui-icon-box
            size="lg"
            iconcolor="accent-100"
            backgroundcolor="accent-100"
            icon=${this.icon}
            background="transparent"
          ></wui-icon-box>

          <wui-flex flexDirection="column" gap="3xs">
            <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
            <wui-text variant="small-400" color="fg-200">${this.description}</wui-text>
          </wui-flex>

          <wui-icon size="md" color="fg-200" name="chevronRight"></wui-icon>
        </wui-flex>
      </button>
    `}};Ge.styles=[T,D,zn];zt([u()],Ge.prototype,"label",void 0);zt([u()],Ge.prototype,"description",void 0);zt([u()],Ge.prototype,"icon",void 0);Ge=zt([p("wui-notice-card")],Ge);var en=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ni=class extends x{constructor(){super(),this.unsubscribe=[],this.socialProvider=de.getConnectedSocialProvider(),this.socialUsername=de.getConnectedSocialUsername(),this.namespace=d.state.activeChain,this.unsubscribe.push(d.subscribeKey("activeChain",e=>{this.namespace=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=m.getConnectorId(this.namespace),i=m.getAuthConnector();if(!i||e!==k.CONNECTOR_ID.AUTH)return this.style.cssText="display: none",null;const n=i.provider.getEmail()??"";return!n&&!this.socialUsername?(this.style.cssText="display: none",null):l`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon=${this.socialProvider??"mail"}
        iconSize=${this.socialProvider?"xxl":"sm"}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${()=>{this.onGoToUpdateEmail(n,this.socialProvider)}}
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.getAuthName(n)}</wui-text>
      </wui-list-item>
    `}onGoToUpdateEmail(e,i){i||f.push("UpdateEmailWallet",{email:e,redirectView:"Account"})}getAuthName(e){return this.socialUsername?this.socialProvider==="discord"&&this.socialUsername.endsWith("0")?this.socialUsername.slice(0,-1):this.socialUsername:e.length>30?`${e.slice(0,-3)}...`:e}};en([c()],ni.prototype,"namespace",void 0);ni=en([p("w3m-account-auth-button")],ni);var xe=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let pe=class extends x{constructor(){super(),this.usubscribe=[],this.networkImages=Re.state.networkImages,this.address=$.state.address,this.profileImage=$.state.profileImage,this.profileName=$.state.profileName,this.network=d.state.activeCaipNetwork,this.disconnecting=!1,this.loading=!1,this.switched=!1,this.text="",this.remoteFeatures=v.state.remoteFeatures,this.usubscribe.push($.subscribe(e=>{e.address&&(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName)}),d.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}),v.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.usubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-account-settings-view: No account provided");const e=this.networkImages[this.network?.assets?.imageId??""];return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="l"
        .padding=${["0","xl","m","xl"]}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${h(this.profileImage)}
          size="2lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
              ${H.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" gap="m">
        <wui-flex flexDirection="column" gap="xs" .padding=${["0","l","m","l"]}>
          ${this.authCardTemplate()}
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            .variant=${e?"image":"icon"}
            iconVariant="overlay"
            icon="networkPlaceholder"
            imageSrc=${h(e)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="paragraph-500" color="fg-100">
              ${this.network?.name??"Unknown"}
            </wui-text>
          </wui-list-item>
          ${this.togglePreferredAccountBtnTemplate()} ${this.chooseNameButtonTemplate()}
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}chooseNameButtonTemplate(){const e=this.network?.chainNamespace,i=m.getConnectorId(e),n=m.getAuthConnector();return!d.checkIfNamesSupported()||!n||i!==k.CONNECTOR_ID.AUTH||this.profileName?null:l`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="id"
        iconSize="sm"
        ?chevron=${!0}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Choose account name </wui-text>
      </wui-list-item>
    `}authCardTemplate(){const e=m.getConnectorId(this.network?.chainNamespace),i=m.getAuthConnector(),{origin:n}=location;return!i||e!==k.CONNECTOR_ID.AUTH||n.includes(q.SECURE_SITE)?null:l`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}isAllowedNetworkSwitch(){const e=d.getAllRequestedCaipNetworks(),i=e?e.length>1:!1,n=e?.find(({id:o})=>o===this.network?.id);return i||!n}onCopyAddress(){try{this.address&&(b.copyToClopboard(this.address),E.showSuccess("Address copied"))}catch{E.showError("Failed to copy")}}togglePreferredAccountBtnTemplate(){const e=this.network?.chainNamespace,i=d.checkIfSmartAccountEnabled(),n=m.getConnectorId(e);return!m.getAuthConnector()||n!==k.CONNECTOR_ID.AUTH||!i?null:(this.switched||(this.text=ke(e)===ue.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your Smart Account"),l`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="swapHorizontalBold"
        iconSize="sm"
        ?chevron=${!0}
        ?loading=${this.loading}
        @click=${this.changePreferredAccountType.bind(this)}
        data-testid="account-toggle-preferred-account-type"
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>
      </wui-list-item>
    `)}onChooseName(){f.push("ChooseAccountName")}async changePreferredAccountType(){const e=this.network?.chainNamespace,i=d.checkIfSmartAccountEnabled(),n=ke(e)===ue.ACCOUNT_TYPES.SMART_ACCOUNT||!i?ue.ACCOUNT_TYPES.EOA:ue.ACCOUNT_TYPES.SMART_ACCOUNT;m.getAuthConnector()&&(this.loading=!0,await g.setPreferredAccountType(n,e),this.text=n===ue.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your Smart Account",this.switched=!0,vn.resetSend(),this.loading=!1,this.requestUpdate())}onNetworks(){this.isAllowedNetworkSwitch()&&f.push("Networks")}async onDisconnect(){try{this.disconnecting=!0;const e=this.network?.chainNamespace,n=g.getConnections(e).length>0,o=e&&m.state.activeConnectorIds[e],t=this.remoteFeatures?.multiWallet;await g.disconnect(t?{id:o,namespace:e}:{}),n&&t&&(f.push("ProfileWallets"),E.showSuccess("Wallet deleted"))}catch{I.sendEvent({type:"track",event:"DISCONNECT_ERROR",properties:{message:"Failed to disconnect"}}),E.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onGoToUpgradeView(){I.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),f.push("UpgradeEmailWallet")}};xe([c()],pe.prototype,"address",void 0);xe([c()],pe.prototype,"profileImage",void 0);xe([c()],pe.prototype,"profileName",void 0);xe([c()],pe.prototype,"network",void 0);xe([c()],pe.prototype,"disconnecting",void 0);xe([c()],pe.prototype,"loading",void 0);xe([c()],pe.prototype,"switched",void 0);xe([c()],pe.prototype,"text",void 0);xe([c()],pe.prototype,"remoteFeatures",void 0);pe=xe([p("w3m-account-settings-view")],pe);const Mn=_`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var Te=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let be=class extends N{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((e,i)=>{const n=i===this.activeTab;return w`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(i)}
          data-active=${n}
          data-testid="tab-${e.label?.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(e){return e.icon?w`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,i){const n=this.buttons[this.activeTab],o=this.buttons[e],t=n?.querySelector("wui-text"),s=o?.querySelector("wui-text"),r=o?.getBoundingClientRect(),C=s?.getBoundingClientRect();n&&t&&!i&&e!==this.activeTab&&(t.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),n.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&r&&C&&s&&(e!==this.activeTab||i)&&(this.localTabWidth=`${Math.round(r.width+C.width)+6}px`,o.animate([{width:`${r.width+C.width}px`}],{duration:i?0:500,fill:"forwards",easing:"ease"}),s.animate([{opacity:1}],{duration:i?0:125,delay:i?0:200,fill:"forwards",easing:"ease"}))}};be.styles=[T,D,Mn];Te([u({type:Array})],be.prototype,"tabs",void 0);Te([u()],be.prototype,"onTabChange",void 0);Te([u({type:Array})],be.prototype,"buttons",void 0);Te([u({type:Boolean})],be.prototype,"disabled",void 0);Te([u()],be.prototype,"localTabWidth",void 0);Te([Qi()],be.prototype,"activeTab",void 0);Te([Qi()],be.prototype,"isDense",void 0);be=Te([p("wui-tabs")],be);const Fn=_`
  button {
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-xxs);
    column-gap: var(--wui-spacing-xs);
  }

  wui-image,
  .icon-box {
    width: var(--wui-spacing-xxl);
    height: var(--wui-spacing-xxl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-text {
    flex: 1;
  }

  .icon-box {
    position: relative;
  }

  .icon-box[data-active='true'] {
    background-color: var(--wui-color-gray-glass-005);
  }

  .circle {
    position: absolute;
    left: 16px;
    top: 15px;
    width: var(--wui-spacing-1xs);
    height: var(--wui-spacing-1xs);
    background-color: var(--wui-color-success-100);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
  }
`;var ye=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let se=class extends N{constructor(){super(...arguments),this.address="",this.profileName="",this.alt="",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.loading=!1,this.charsStart=4,this.charsEnd=6}render(){return w`
      <button>
        ${this.leftImageTemplate()} ${this.textTemplate()} ${this.rightImageTemplate()}
      </button>
    `}leftImageTemplate(){const e=this.icon?w`<wui-icon
          size=${this.iconSize}
          color="fg-200"
          name=${this.icon}
          class="icon"
        ></wui-icon>`:w`<wui-image src=${this.imageSrc} alt=${this.alt}></wui-image>`;return w`
      <wui-flex
        alignItems="center"
        justifyContent="center"
        class="icon-box"
        data-active=${!!this.icon}
      >
        ${e}
        <wui-flex class="circle"></wui-flex>
      </wui-flex>
    `}textTemplate(){return w`
      <wui-text variant="paragraph-500" color="fg-100">
        ${H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?16:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"})}
      </wui-text>
    `}rightImageTemplate(){return w`<wui-icon name="chevronBottom" size="xs" color="fg-200"></wui-icon>`}};se.styles=[T,D,Fn];ye([u()],se.prototype,"address",void 0);ye([u()],se.prototype,"profileName",void 0);ye([u()],se.prototype,"alt",void 0);ye([u()],se.prototype,"imageSrc",void 0);ye([u()],se.prototype,"icon",void 0);ye([u()],se.prototype,"iconSize",void 0);ye([u({type:Boolean})],se.prototype,"loading",void 0);ye([u({type:Number})],se.prototype,"charsStart",void 0);ye([u({type:Number})],se.prototype,"charsEnd",void 0);se=ye([p("wui-wallet-switch")],se);const Vn=W`
  wui-flex {
    width: 100%;
  }

  :host > wui-flex:first-child {
    transform: translateY(calc(var(--wui-spacing-xxs) * -1));
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  wui-notice-card {
    margin-bottom: var(--wui-spacing-3xs);
  }

  wui-list-item > wui-text {
    flex: 1;
  }

  w3m-transactions-view {
    max-height: 200px;
  }

  .tab-content-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .tab-content-container::-webkit-scrollbar {
    display: none;
  }

  .account-button {
    width: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-s);
    height: 48px;
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: 24px;
    transition: background-color 0.2s linear;
  }

  .account-button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .avatar-container {
    position: relative;
  }

  wui-avatar.avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-wallet-switch {
    margin-top: var(--wui-spacing-xs);
  }

  wui-avatar.network-avatar {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 100%;
    top: 100%;
    transform: translate(-75%, -75%);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;
    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #667dff;
  }
`;var re=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Y=class extends x{constructor(){super(),this.unsubscribe=[],this.caipAddress=$.state.caipAddress,this.address=b.getPlainAddress($.state.caipAddress),this.profileImage=$.state.profileImage,this.profileName=$.state.profileName,this.disconnecting=!1,this.balance=$.state.balance,this.balanceSymbol=$.state.balanceSymbol,this.features=v.state.features,this.remoteFeatures=v.state.remoteFeatures,this.namespace=d.state.activeChain,this.activeConnectorIds=m.state.activeConnectorIds,this.unsubscribe.push($.subscribeKey("caipAddress",e=>{this.address=b.getPlainAddress(e),this.caipAddress=e}),$.subscribeKey("balance",e=>this.balance=e),$.subscribeKey("balanceSymbol",e=>this.balanceSymbol=e),$.subscribeKey("profileName",e=>this.profileName=e),$.subscribeKey("profileImage",e=>this.profileImage=e),v.subscribeKey("features",e=>this.features=e),v.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e),m.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),d.subscribeKey("activeChain",e=>this.namespace=e),d.subscribeKey("activeCaipNetwork",e=>{e?.chainNamespace&&(this.namespace=e?.chainNamespace)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.caipAddress||!this.namespace)return null;const e=this.activeConnectorIds[this.namespace],i=e?m.getConnectorById(e):void 0,n=S.getConnectorImage(i);return l`<wui-flex
        flexDirection="column"
        .padding=${["0","xl","m","xl"]}
        alignItems="center"
        gap="s"
      >
        <wui-avatar
          alt=${h(this.caipAddress)}
          address=${h(b.getPlainAddress(this.caipAddress))}
          imageSrc=${h(this.profileImage===null?void 0:this.profileImage)}
          data-testid="single-account-avatar"
        ></wui-avatar>
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          imageSrc=${n}
          alt=${i?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-200">
            ${b.formatBalance(this.balance,this.balanceSymbol)}
          </wui-text>
        </wui-flex>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${["0","s","s","s"]}>
        ${this.authCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>
        ${this.orderedFeaturesTemplate()} ${this.activityTemplate()}
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${!1}
          .loading=${this.disconnecting}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`}fundWalletTemplate(){if(!this.namespace)return null;const e=q.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace),i=this.remoteFeatures?.onramp&&e,n=!!this.features?.receive;return!i&&!n?null:l`
      <wui-list-item
        data-testid="w3m-account-default-fund-wallet-button"
        iconVariant="blue"
        icon="dollar"
        ?chevron=${!0}
        @click=${this.handleClickFundWallet.bind(this)}
      >
        <wui-text variant="paragraph-500" color="fg-100">Fund wallet</wui-text>
      </wui-list-item>
    `}orderedFeaturesTemplate(){return(this.features?.walletFeaturesOrder||q.DEFAULT_FEATURES.walletFeaturesOrder).map(i=>{switch(i){case"onramp":return this.fundWalletTemplate();case"swaps":return this.swapsTemplate();case"send":return this.sendTemplate();default:return null}})}activityTemplate(){return this.namespace&&this.remoteFeatures?.activity&&q.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace)?l` <wui-list-item
          iconVariant="blue"
          icon="clock"
          iconSize="sm"
          ?chevron=${!0}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>`:null}swapsTemplate(){const e=this.remoteFeatures?.swaps,i=d.state.activeChain===k.CHAIN.EVM;return!e||!i?null:l`
      <wui-list-item
        iconVariant="blue"
        icon="recycleHorizontal"
        ?chevron=${!0}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Swap</wui-text>
      </wui-list-item>
    `}sendTemplate(){const e=this.features?.send,i=d.state.activeChain;if(!i)throw new Error("SendController:sendTemplate - namespace is required");const n=q.SEND_SUPPORTED_NAMESPACES.includes(i);return!e||!n?null:l`
      <wui-list-item
        iconVariant="blue"
        icon="send"
        ?chevron=${!0}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Send</wui-text>
      </wui-list-item>
    `}authCardTemplate(){const e=d.state.activeChain;if(!e)throw new Error("AuthCardTemplate:authCardTemplate - namespace is required");const i=m.getConnectorId(e),n=m.getAuthConnector(),{origin:o}=location;return!n||i!==k.CONNECTOR_ID.AUTH||o.includes(q.SECURE_SITE)?null:l`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}handleClickFundWallet(){f.push("FundWallet")}handleClickSwap(){f.push("Swap")}handleClickSend(){f.push("WalletSend")}explorerBtnTemplate(){return $.state.addressExplorerUrl?l`
      <wui-button size="md" variant="neutral" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `:null}onTransactions(){I.sendEvent({type:"track",event:"CLICK_TRANSACTIONS",properties:{isSmartAccount:ke(d.state.activeChain)===ue.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.push("Transactions")}async onDisconnect(){try{this.disconnecting=!0;const i=g.getConnections(this.namespace).length>0,n=this.namespace&&m.state.activeConnectorIds[this.namespace],o=this.remoteFeatures?.multiWallet;await g.disconnect(o?{id:n,namespace:this.namespace}:{}),i&&o&&(f.push("ProfileWallets"),E.showSuccess("Wallet deleted"))}catch{I.sendEvent({type:"track",event:"DISCONNECT_ERROR",properties:{message:"Failed to disconnect"}}),E.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onExplorer(){const e=$.state.addressExplorerUrl;e&&b.openHref(e,"_blank")}onGoToUpgradeView(){I.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),f.push("UpgradeEmailWallet")}onGoToProfileWalletsView(){f.push("ProfileWallets")}};Y.styles=Vn;re([c()],Y.prototype,"caipAddress",void 0);re([c()],Y.prototype,"address",void 0);re([c()],Y.prototype,"profileImage",void 0);re([c()],Y.prototype,"profileName",void 0);re([c()],Y.prototype,"disconnecting",void 0);re([c()],Y.prototype,"balance",void 0);re([c()],Y.prototype,"balanceSymbol",void 0);re([c()],Y.prototype,"features",void 0);re([c()],Y.prototype,"remoteFeatures",void 0);re([c()],Y.prototype,"namespace",void 0);re([c()],Y.prototype,"activeConnectorIds",void 0);Y=re([p("w3m-account-default-widget")],Y);const Gn=_`
  span {
    font-weight: 500;
    font-size: 40px;
    color: var(--wui-color-fg-100);
    line-height: 130%; /* 52px */
    letter-spacing: -1.6px;
    text-align: center;
  }

  .pennies {
    color: var(--wui-color-fg-200);
  }
`;var bi=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let at=class extends N{constructor(){super(...arguments),this.dollars="0",this.pennies="00"}render(){return w`<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`}};at.styles=[T,Gn];bi([u()],at.prototype,"dollars",void 0);bi([u()],at.prototype,"pennies",void 0);at=bi([p("wui-balance")],at);const Kn=_`
  :host {
    display: block;
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);

    color: var(--wui-color-bg-100);
    position: relative;
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;var Mt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ke=class extends N{constructor(){super(...arguments),this.placement="top",this.variant="fill",this.message=""}render(){return this.dataset.variant=this.variant,w`<wui-icon
        data-placement=${this.placement}
        color="fg-100"
        size="inherit"
        name=${this.variant==="fill"?"cursor":"cursorTransparent"}
      ></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>`}};Ke.styles=[T,D,Kn];Mt([u()],Ke.prototype,"placement",void 0);Mt([u()],Ke.prototype,"variant",void 0);Mt([u()],Ke.prototype,"message",void 0);Ke=Mt([p("wui-tooltip")],Ke);const Hn=W`
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`;var qn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let oi=class extends x{render(){return l`<w3m-activity-list page="account"></w3m-activity-list>`}};oi.styles=Hn;oi=qn([p("w3m-account-activity-widget")],oi);const Yn=W`
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
`;var Xn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let si=class extends x{render(){return l`${this.nftTemplate()}`}nftTemplate(){return l` <wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
    >
      <wui-icon-box
        icon="wallet"
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
        <wui-text
          variant="paragraph-500"
          align="center"
          color="fg-100"
          data-testid="nft-template-title"
          >Coming soon</wui-text
        >
        <wui-text
          variant="small-400"
          align="center"
          color="fg-200"
          data-testid="nft-template-description"
          >Stay tuned for our upcoming NFT feature</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)} data-testid="link-receive-funds"
        >Receive funds</wui-link
      >
    </wui-flex>`}onReceiveClick(){f.push("WalletReceive")}};si.styles=Yn;si=Xn([p("w3m-account-nfts-widget")],si);const Qn=_`
  button {
    width: 100%;
    display: flex;
    gap: var(--wui-spacing-s);
    align-items: center;
    justify-content: flex-start;
    padding: var(--wui-spacing-s) var(--wui-spacing-m) var(--wui-spacing-s) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
  }

  wui-flex {
    width: auto;
  }
`;var Ne=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ge=class extends N{constructor(){super(...arguments),this.icon="card",this.text="",this.description="",this.tag=void 0,this.iconBackgroundColor="accent-100",this.iconColor="accent-100",this.disabled=!1}render(){return w`
      <button ?disabled=${this.disabled}>
        <wui-icon-box
          iconColor=${this.iconColor}
          backgroundColor=${this.iconBackgroundColor}
          size="inherit"
          icon=${this.icon}
          iconSize="md"
        ></wui-icon-box>
        <wui-flex flexDirection="column" justifyContent="spaceBetween">
          ${this.titleTemplate()}
          ${this.description?w`<wui-text variant="small-400" color="fg-200"> ${this.description}</wui-text>`:null}</wui-flex
        >
      </button>
    `}titleTemplate(){return this.tag?w` <wui-flex alignItems="center" gap="xxs"
        ><wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text
        ><wui-tag tagType="main" size="md">${this.tag}</wui-tag>
      </wui-flex>`:w`<wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>`}};ge.styles=[T,D,Qn];Ne([u()],ge.prototype,"icon",void 0);Ne([u()],ge.prototype,"text",void 0);Ne([u()],ge.prototype,"description",void 0);Ne([u()],ge.prototype,"tag",void 0);Ne([u()],ge.prototype,"iconBackgroundColor",void 0);Ne([u()],ge.prototype,"iconColor",void 0);Ne([u({type:Boolean})],ge.prototype,"disabled",void 0);ge=Ne([p("wui-list-description")],ge);const Jn=W`
  :host {
    width: 100%;
  }

  wui-flex {
    width: 100%;
  }

  .contentContainer {
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }
`;var gi=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let rt=class extends x{constructor(){super(),this.unsubscribe=[],this.tokenBalance=$.state.tokenBalance,this.remoteFeatures=v.state.remoteFeatures,this.unsubscribe.push($.subscribe(e=>{this.tokenBalance=e.tokenBalance}),v.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`${this.tokenTemplate()}`}tokenTemplate(){return this.tokenBalance&&this.tokenBalance?.length>0?l`<wui-flex class="contentContainer" flexDirection="column" gap="xs">
        ${this.tokenItemTemplate()}
      </wui-flex>`:l` <wui-flex flexDirection="column" gap="xs"
      >${this.onRampTemplate()}
      <wui-list-description
        @click=${this.onReceiveClick.bind(this)}
        text="Receive funds"
        description="Scan the QR code and receive funds"
        icon="qrCode"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="w3m-account-receive-button"
      ></wui-list-description
    ></wui-flex>`}onRampTemplate(){return this.remoteFeatures?.onramp?l`<wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
        data-testid="w3m-account-onramp-button"
      ></wui-list-description>`:l``}tokenItemTemplate(){return this.tokenBalance?.map(e=>l`<wui-list-token
          tokenName=${e.name}
          tokenImageUrl=${e.iconUrl}
          tokenAmount=${e.quantity.numeric}
          tokenValue=${e.value}
          tokenCurrency=${e.symbol}
        ></wui-list-token>`)}onReceiveClick(){f.push("WalletReceive")}onBuyClick(){I.sendEvent({type:"track",event:"SELECT_BUY_CRYPTO",properties:{isSmartAccount:ke(d.state.activeChain)===ue.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.push("OnRampProviders")}};rt.styles=Jn;gi([c()],rt.prototype,"tokenBalance",void 0);gi([c()],rt.prototype,"remoteFeatures",void 0);rt=gi([p("w3m-account-tokens-widget")],rt);const Zn=W`
  wui-flex {
    width: 100%;
  }

  wui-promo {
    position: absolute;
    top: -32px;
  }

  wui-profile-button {
    margin-top: calc(-1 * var(--wui-spacing-2l));
  }

  wui-promo + wui-profile-button {
    margin-top: var(--wui-spacing-2l);
  }

  wui-tabs {
    width: 100%;
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
`;var fe=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const eo=48,to=430;let ne=class extends x{constructor(){super(),this.unsubscribe=[],this.address=$.state.address,this.profileName=$.state.profileName,this.network=d.state.activeCaipNetwork,this.currentTab=$.state.currentTab,this.tokenBalance=$.state.tokenBalance,this.features=v.state.features,this.namespace=d.state.activeChain,this.activeConnectorIds=m.state.activeConnectorIds,this.remoteFeatures=v.state.remoteFeatures,this.unsubscribe.push($.subscribe(e=>{e.address?(this.address=e.address,this.profileName=e.profileName,this.currentTab=e.currentTab,this.tokenBalance=e.tokenBalance):B.close()}),m.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),d.subscribeKey("activeChain",e=>this.namespace=e),d.subscribeKey("activeCaipNetwork",e=>this.network=e),v.subscribeKey("features",e=>this.features=e),v.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e)),this.watchSwapValues()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearInterval(this.watchTokenBalance)}firstUpdated(){$.fetchTokenBalance()}render(){if(!this.address)throw new Error("w3m-account-view: No account provided");if(!this.namespace)return null;const e=this.activeConnectorIds[this.namespace],i=e?m.getConnectorById(e):void 0,{icon:n,iconSize:o}=this.getAuthData();return l`<wui-flex
      flexDirection="column"
      .padding=${["0","xl","m","xl"]}
      alignItems="center"
      gap="m"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center" gap="xs">
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          icon=${n}
          iconSize=${o}
          alt=${i?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        ${this.tokenBalanceTemplate()}
      </wui-flex>
      ${this.orderedWalletFeatures()} ${this.tabsTemplate()} ${this.listContentTemplate()}
    </wui-flex>`}orderedWalletFeatures(){const e=this.features?.walletFeaturesOrder||q.DEFAULT_FEATURES.walletFeaturesOrder;if(e.every(t=>t==="send"||t==="receive"?!this.features?.[t]:t==="swaps"||t==="onramp"?!this.remoteFeatures?.[t]:!0))return null;const n=e.map(t=>t==="receive"||t==="onramp"?"fund":t),o=[...new Set(n)];return l`<wui-flex gap="s">
      ${o.map(t=>{switch(t){case"fund":return this.fundWalletTemplate();case"swaps":return this.swapsTemplate();case"send":return this.sendTemplate();default:return null}})}
    </wui-flex>`}fundWalletTemplate(){const e=this.remoteFeatures?.onramp,i=this.features?.receive;return!e&&!i?null:l`
      <w3m-tooltip-trigger text="Fund wallet">
        <wui-icon-button
          data-testid="wallet-features-fund-wallet-button"
          @click=${this.onFundWalletClick.bind(this)}
          icon="dollar"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `}swapsTemplate(){const e=this.remoteFeatures?.swaps,i=d.state.activeChain===k.CHAIN.EVM;return!e||!i?null:l`
      <w3m-tooltip-trigger text="Swap">
        <wui-icon-button
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          icon="recycleHorizontal"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `}sendTemplate(){const e=this.features?.send,i=d.state.activeChain,n=q.SEND_SUPPORTED_NAMESPACES.includes(i);return!e||!n?null:l`
      <w3m-tooltip-trigger text="Send">
        <wui-icon-button
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          icon="send"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `}watchSwapValues(){this.watchTokenBalance=setInterval(()=>$.fetchTokenBalance(e=>this.onTokenBalanceError(e)),1e4)}onTokenBalanceError(e){e instanceof Error&&e.cause instanceof Response&&e.cause.status===k.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE&&clearInterval(this.watchTokenBalance)}listContentTemplate(){return this.currentTab===0?l`<w3m-account-tokens-widget></w3m-account-tokens-widget>`:this.currentTab===1?l`<w3m-account-nfts-widget></w3m-account-nfts-widget>`:this.currentTab===2?l`<w3m-account-activity-widget></w3m-account-activity-widget>`:l`<w3m-account-tokens-widget></w3m-account-tokens-widget>`}tokenBalanceTemplate(){if(this.tokenBalance&&this.tokenBalance?.length>=0){const e=b.calculateBalance(this.tokenBalance),{dollars:i="0",pennies:n="00"}=b.formatTokenBalance(e);return l`<wui-balance dollars=${i} pennies=${n}></wui-balance>`}return l`<wui-balance dollars="0" pennies="00"></wui-balance>`}tabsTemplate(){const e=Wn.getTabsByNamespace(d.state.activeChain);if(e.length===0)return null;const i=b.isMobile()&&window.innerWidth<to;let n="104px";return i?n=`${(window.innerWidth-eo)/e.length}px`:e.length===2?n="156px":n="104px",l`<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      localTabWidth=${n}
      .tabs=${e}
    ></wui-tabs>`}onTabChange(e){$.setCurrentTab(e)}onFundWalletClick(){f.push("FundWallet")}onSwapClick(){this.network?.caipNetworkId&&!q.SWAP_SUPPORTED_NETWORKS.includes(this.network?.caipNetworkId)?f.push("UnsupportedChain",{swapUnsupportedChain:!0}):(I.sendEvent({type:"track",event:"OPEN_SWAP",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:ke(d.state.activeChain)===ue.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.push("Swap"))}getAuthData(){const e=de.getConnectedSocialProvider(),i=de.getConnectedSocialUsername(),o=m.getAuthConnector()?.provider.getEmail()??"";return{name:Oe.getAuthName({email:o,socialUsername:i,socialProvider:e}),icon:e??"mail",iconSize:e?"xl":"md"}}onGoToProfileWalletsView(){f.push("ProfileWallets")}onSendClick(){I.sendEvent({type:"track",event:"OPEN_SEND",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:ke(d.state.activeChain)===ue.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.push("WalletSend")}};ne.styles=Zn;fe([c()],ne.prototype,"watchTokenBalance",void 0);fe([c()],ne.prototype,"address",void 0);fe([c()],ne.prototype,"profileName",void 0);fe([c()],ne.prototype,"network",void 0);fe([c()],ne.prototype,"currentTab",void 0);fe([c()],ne.prototype,"tokenBalance",void 0);fe([c()],ne.prototype,"features",void 0);fe([c()],ne.prototype,"namespace",void 0);fe([c()],ne.prototype,"activeConnectorIds",void 0);fe([c()],ne.prototype,"remoteFeatures",void 0);ne=fe([p("w3m-account-wallet-features-widget")],ne);var tn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ai=class extends x{constructor(){super(),this.unsubscribe=[],this.namespace=d.state.activeChain,this.unsubscribe.push(d.subscribeKey("activeChain",e=>{this.namespace=e}))}render(){if(!this.namespace)return null;const e=m.getConnectorId(this.namespace),i=m.getAuthConnector();return l`
      ${i&&e===k.CONNECTOR_ID.AUTH?this.walletFeaturesTemplate():this.defaultTemplate()}
    `}walletFeaturesTemplate(){return l`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`}defaultTemplate(){return l`<w3m-account-default-widget></w3m-account-default-widget>`}};tn([c()],ai.prototype,"namespace",void 0);ai=tn([p("w3m-account-view")],ai);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ri=_n(class extends Tn{constructor(a){if(super(a),a.type!==Nn.ATTRIBUTE||a.name!=="class"||a.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(a){return" "+Object.keys(a).filter((e=>a[e])).join(" ")+" "}update(a,[e]){if(this.st===void 0){this.st=new Set,a.strings!==void 0&&(this.nt=new Set(a.strings.join(" ").split(/\s/).filter((n=>n!==""))));for(const n in e)e[n]&&!this.nt?.has(n)&&this.st.add(n);return this.render(e)}const i=a.element.classList;for(const n of this.st)n in e||(i.remove(n),this.st.delete(n));for(const n in e){const o=!!e[n];o===this.st.has(n)||this.nt?.has(n)||(o?(i.add(n),this.st.add(n)):(i.remove(n),this.st.delete(n)))}return gn}}),io=_`
  wui-image {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-image,
  .icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-icon:not(.custom-icon, .icon-badge) {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: var(--wui-color-gray-glass-005);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
    padding: var(--wui-spacing-4xs);
  }
`;var J=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let U=class extends N{constructor(){super(...arguments),this.address="",this.profileName="",this.content=[],this.alt="",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.iconBadge=void 0,this.iconBadgeSize="md",this.buttonVariant="neutral",this.enableMoreButton=!1,this.charsStart=4,this.charsEnd=6}render(){return w`
      <wui-flex flexDirection="column" rowGap="xs">
        ${this.topTemplate()} ${this.bottomTemplate()}
      </wui-flex>
    `}topTemplate(){return w`
      <wui-flex alignItems="flex-start" justifyContent="space-between">
        ${this.imageOrIconTemplate()}
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="copy"
          @click=${this.dispatchCopyEvent}
        ></wui-icon-link>
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="externalLink"
          @click=${this.dispatchExternalLinkEvent}
        ></wui-icon-link>
        ${this.enableMoreButton?w`<wui-icon-link
              iconColor="fg-200"
              size="sm"
              icon="threeDots"
              @click=${this.dispatchMoreButtonEvent}
              data-testid="wui-active-profile-wallet-item-more-button"
            ></wui-icon-link>`:null}
      </wui-flex>
    `}bottomTemplate(){return w` <wui-flex flexDirection="column">${this.contentTemplate()}</wui-flex> `}imageOrIconTemplate(){return this.icon?w`
        <wui-flex flexGrow="1" alignItems="center">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon
              size=${this.iconSize}
              color="fg-200"
              name=${this.icon}
              class="custom-icon"
            ></wui-icon>

            ${this.iconBadge?w`<wui-icon
                  color="fg-175"
                  size=${this.iconBadgeSize}
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>`:null}
          </wui-flex>
        </wui-flex>
      `:w`
      <wui-flex flexGrow="1" alignItems="center">
        <wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>
      </wui-flex>
    `}contentTemplate(){return this.content.length===0?null:w`
      <wui-flex flexDirection="column" rowGap="s">
        ${this.content.map(e=>this.labelAndTagTemplate(e))}
      </wui-flex>
    `}labelAndTagTemplate({address:e,profileName:i,label:n,description:o,enableButton:t,buttonType:s,buttonLabel:r,buttonVariant:C,tagVariant:R,tagLabel:O,alignItems:K="flex-end"}){return w`
      <wui-flex justifyContent="space-between" alignItems=${K} columnGap="3xs">
        <wui-flex flexDirection="column" rowGap="4xs">
          ${n?w`<wui-text variant="micro-600" color="fg-200">${n}</wui-text>`:null}

          <wui-flex alignItems="center" columnGap="3xs">
            <wui-text variant="small-500" color="fg-100">
              ${H.getTruncateString({string:i||e,charsStart:i?16:this.charsStart,charsEnd:i?0:this.charsEnd,truncate:i?"end":"middle"})}
            </wui-text>

            ${R&&O?w`<wui-tag variant=${R} size="xs">${O}</wui-tag>`:null}
          </wui-flex>

          ${o?w`<wui-text variant="tiny-500" color="fg-200">${o}</wui-text>`:null}
        </wui-flex>

        ${t?this.buttonTemplate({buttonType:s,buttonLabel:r,buttonVariant:C}):null}
      </wui-flex>
    `}buttonTemplate({buttonType:e,buttonLabel:i,buttonVariant:n}){return w`
      <wui-button
        size="xs"
        variant=${n}
        @click=${e==="disconnect"?this.dispatchDisconnectEvent.bind(this):this.dispatchSwitchEvent.bind(this)}
        data-testid=${e==="disconnect"?"wui-active-profile-wallet-item-disconnect-button":"wui-active-profile-wallet-item-switch-button"}
      >
        ${i}
      </wui-button>
    `}dispatchDisconnectEvent(){this.dispatchEvent(new CustomEvent("disconnect",{bubbles:!0,composed:!0}))}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent("switch",{bubbles:!0,composed:!0}))}dispatchExternalLinkEvent(){this.dispatchEvent(new CustomEvent("externalLink",{bubbles:!0,composed:!0}))}dispatchMoreButtonEvent(){this.dispatchEvent(new CustomEvent("more",{bubbles:!0,composed:!0}))}dispatchCopyEvent(){this.dispatchEvent(new CustomEvent("copy",{bubbles:!0,composed:!0}))}};U.styles=[T,D,io];J([u()],U.prototype,"address",void 0);J([u()],U.prototype,"profileName",void 0);J([u({type:Array})],U.prototype,"content",void 0);J([u()],U.prototype,"alt",void 0);J([u()],U.prototype,"imageSrc",void 0);J([u()],U.prototype,"icon",void 0);J([u()],U.prototype,"iconSize",void 0);J([u()],U.prototype,"iconBadge",void 0);J([u()],U.prototype,"iconBadgeSize",void 0);J([u()],U.prototype,"buttonVariant",void 0);J([u({type:Boolean})],U.prototype,"enableMoreButton",void 0);J([u({type:Number})],U.prototype,"charsStart",void 0);J([u({type:Number})],U.prototype,"charsEnd",void 0);U=J([p("wui-active-profile-wallet-item")],U);const no=_`
  wui-image,
  .icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  .right-icon {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: var(--wui-color-gray-glass-005);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
    padding: var(--wui-spacing-4xs);
  }
`;var F=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let j=class extends N{constructor(){super(...arguments),this.address="",this.profileName="",this.alt="",this.buttonLabel="",this.buttonVariant="accent",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.iconBadgeSize="md",this.rightIcon="off",this.rightIconSize="md",this.loading=!1,this.charsStart=4,this.charsEnd=6}render(){return w`
      <wui-flex alignItems="center" columnGap="xs">
        ${this.imageOrIconTemplate()} ${this.labelAndDescriptionTemplate()}
        ${this.buttonActionTemplate()}
      </wui-flex>
    `}imageOrIconTemplate(){return this.icon?w`
        <wui-flex alignItems="center" justifyContent="center" class="icon-box">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon
              size=${this.iconSize}
              color="fg-200"
              name=${this.icon}
              class="custom-icon"
            ></wui-icon>
            ${this.iconBadge?w`<wui-icon
                  color="fg-175"
                  size=${this.iconBadgeSize}
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>`:null}
          </wui-flex>
        </wui-flex>
      `:w`<wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>`}labelAndDescriptionTemplate(){return w`
      <wui-flex
        flexDirection="column"
        flexGrow="1"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <wui-text variant="small-500" color="fg-100">
          ${H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?16:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"})}
        </wui-text>
      </wui-flex>
    `}buttonActionTemplate(){return w`
      <wui-flex columnGap="3xs" alignItems="center" justifyContent="center">
        <wui-button
          size="xs"
          variant=${this.buttonVariant}
          .loading=${this.loading}
          @click=${this.handleButtonClick}
          data-testid="wui-inactive-profile-wallet-item-button"
        >
          ${this.buttonLabel}
        </wui-button>

        <wui-icon-link
          iconColor="fg-200"
          size=${this.rightIconSize}
          icon=${this.rightIcon}
          class="right-icon"
          @click=${this.handleIconClick}
        ></wui-icon-link>
      </wui-flex>
    `}handleButtonClick(){this.dispatchEvent(new CustomEvent("buttonClick",{bubbles:!0,composed:!0}))}handleIconClick(){this.dispatchEvent(new CustomEvent("iconClick",{bubbles:!0,composed:!0}))}};j.styles=[T,D,no];F([u()],j.prototype,"address",void 0);F([u()],j.prototype,"profileName",void 0);F([u()],j.prototype,"alt",void 0);F([u()],j.prototype,"buttonLabel",void 0);F([u()],j.prototype,"buttonVariant",void 0);F([u()],j.prototype,"imageSrc",void 0);F([u()],j.prototype,"icon",void 0);F([u()],j.prototype,"iconSize",void 0);F([u()],j.prototype,"iconBadge",void 0);F([u()],j.prototype,"iconBadgeSize",void 0);F([u()],j.prototype,"rightIcon",void 0);F([u()],j.prototype,"rightIconSize",void 0);F([u({type:Boolean})],j.prototype,"loading",void 0);F([u({type:Number})],j.prototype,"charsStart",void 0);F([u({type:Number})],j.prototype,"charsEnd",void 0);j=F([p("wui-inactive-profile-wallet-item")],j);const ei={getAuthData(a){const e=a.connectorId===k.CONNECTOR_ID.AUTH;if(!e)return{isAuth:!1,icon:void 0,iconSize:void 0,name:void 0};const i=a?.auth?.name??de.getConnectedSocialProvider(),n=a?.auth?.username??de.getConnectedSocialUsername(),t=m.getAuthConnector()?.provider.getEmail()??"";return{isAuth:!0,icon:i??"mail",iconSize:i?"xl":"md",name:e?Oe.getAuthName({email:t,socialUsername:n,socialProvider:i}):void 0}}},oo=W`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
  }

  .balance-amount {
    flex: 1;
  }

  .wallet-list {
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
      black 40px,
      black calc(100% - 40px),
      rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
    );
  }

  .active-wallets {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  .active-wallets-box {
    height: 330px;
  }

  .empty-wallet-list-box {
    height: 400px;
  }

  .empty-box {
    width: 100%;
    padding: var(--wui-spacing-l);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-separator {
    margin: var(--wui-spacing-xs) 0 var(--wui-spacing-xs) 0;
  }

  .active-connection {
    padding: var(--wui-spacing-xs);
  }

  .recent-connection {
    padding: var(--wui-spacing-xs) 0 var(--wui-spacing-xs) 0;
  }

  @media (max-width: 430px) {
    .active-wallets-box,
    .empty-wallet-list-box {
      height: auto;
      max-height: clamp(360px, 470px, 80vh);
    }
  }
`;var Z=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const so=16,ao=4,oe={ADDRESS_DISPLAY:{START:4,END:6},BADGE:{SIZE:"md",ICON:"lightbulb"},SCROLL_THRESHOLD:50,OPACITY_RANGE:[0,1]},ot={eip155:"ethereum",solana:"solana",bip122:"bitcoin"},Bi=[{namespace:"eip155",icon:ot.eip155,label:"EVM"},{namespace:"solana",icon:ot.solana,label:"Solana"},{namespace:"bip122",icon:ot.bip122,label:"Bitcoin"}],ro={eip155:{title:"Add EVM Wallet",description:"Add your first EVM wallet"},solana:{title:"Add Solana Wallet",description:"Add your first Solana wallet"},bip122:{title:"Add Bitcoin Wallet",description:"Add your first Bitcoin wallet"}};let z=class extends x{constructor(){super(),this.unsubscribers=[],this.currentTab=0,this.namespace=d.state.activeChain,this.namespaces=Array.from(d.state.chains.keys()),this.caipAddress=void 0,this.profileName=void 0,this.activeConnectorIds=m.state.activeConnectorIds,this.lastSelectedAddress="",this.lastSelectedConnectorId="",this.isSwitching=!1,this.caipNetwork=d.state.activeCaipNetwork,this.user=$.state.user,this.remoteFeatures=v.state.remoteFeatures,this.tabWidth="",this.currentTab=this.namespace?this.namespaces.indexOf(this.namespace):0,this.caipAddress=d.getAccountData(this.namespace)?.caipAddress,this.profileName=d.getAccountData(this.namespace)?.profileName,this.unsubscribers.push(g.subscribeKey("connections",()=>this.onConnectionsChange()),g.subscribeKey("recentConnections",()=>this.requestUpdate()),m.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),d.subscribeKey("activeCaipNetwork",e=>this.caipNetwork=e),$.subscribeKey("user",e=>this.user=e),v.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e)),this.chainListener=d.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress,this.profileName=e?.profileName},this.namespace)}disconnectedCallback(){this.unsubscribers.forEach(e=>e()),this.resizeObserver?.disconnect(),this.tabsResizeObserver?.disconnect(),this.removeScrollListener(),this.chainListener?.()}firstUpdated(){const e=this.shadowRoot?.querySelector(".wallet-list"),i=this.shadowRoot?.querySelector("wui-tabs");if(!e)return;const n=()=>this.updateScrollOpacity(e);if(requestAnimationFrame(n),e.addEventListener("scroll",n),this.resizeObserver=new ResizeObserver(n),this.resizeObserver.observe(e),n(),i){const o=()=>{const s=Bi.filter(r=>this.namespaces.includes(r.namespace)).length;if(s>1){const r=this.getBoundingClientRect()?.width,C=ao*2,R=so*2,K=(r-R-C)/s;this.tabWidth=`${K}px`,this.requestUpdate()}};this.tabsResizeObserver=new ResizeObserver(o),this.tabsResizeObserver.observe(this),o()}}render(){const e=this.namespace;if(!e)throw new Error("Namespace is not set");return l`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="l">
        ${this.renderTabs()} ${this.renderHeader(e)} ${this.renderConnections(e)}
        ${this.renderAddConnectionButton(e)}
      </wui-flex>
    `}renderTabs(){const e=Bi.filter(n=>this.namespaces.includes(n.namespace));return e.length>1?l`
        <wui-tabs
          .onTabChange=${n=>this.handleTabChange(n)}
          .activeTab=${this.currentTab}
          localTabWidth=${this.tabWidth}
          .tabs=${e}
        ></wui-tabs>
      `:null}renderHeader(e){const n=this.getActiveConnections(e).flatMap(({accounts:o})=>o).length+(this.caipAddress?1:0);return l`
      <wui-flex alignItems="center" columnGap="3xs">
        <wui-icon
          name=${ot[e]??ot.eip155}
          size="lg"
        ></wui-icon>
        <wui-text color="fg-200" variant="small-400"
          >${n>1?"Wallets":"Wallet"}</wui-text
        >
        <wui-text
          color="fg-100"
          variant="small-400"
          class="balance-amount"
          data-testid="balance-amount"
        >
          ${n}
        </wui-text>
        <wui-link
          color="fg-200"
          @click=${()=>g.disconnect({namespace:e})}
          ?disabled=${!this.hasAnyConnections(e)}
          data-testid="disconnect-all-button"
        >
          Disconnect All
        </wui-link>
      </wui-flex>
    `}renderConnections(e){const i=this.hasAnyConnections(e);return l`
      <wui-flex flexDirection="column" class=${ri({"wallet-list":!0,"active-wallets-box":i,"empty-wallet-list-box":!i})} rowGap="s">
        ${i?this.renderActiveConnections(e):this.renderEmptyState(e)}
      </wui-flex>
    `}renderActiveConnections(e){const i=this.getActiveConnections(e),n=this.activeConnectorIds[e],o=this.getPlainAddress();return l`
      ${o||n||i.length>0?l`<wui-flex
            flexDirection="column"
            .padding=${["l","0","xs","0"]}
            class="active-wallets"
          >
            ${this.renderActiveProfile(e)} ${this.renderActiveConnectionsList(e)}
          </wui-flex>`:null}
      ${this.renderRecentConnections(e)}
    `}renderActiveProfile(e){const i=this.activeConnectorIds[e];if(!i)return null;const{connections:n}=Se.getConnectionsData(e),o=m.getConnectorById(i),t=S.getConnectorImage(o),s=this.getPlainAddress();if(!s)return null;const r=e===k.CHAIN.BITCOIN,C=ei.getAuthData({connectorId:i,accounts:[]}),R=this.getActiveConnections(e).flatMap(P=>P.accounts).length>0,O=n.find(P=>P.connectorId===i),K=O?.accounts.filter(P=>!te.isLowerCaseMatch(P.address,s));return l`
      <wui-flex flexDirection="column" .padding=${["0","l","0","l"]}>
        <wui-active-profile-wallet-item
          address=${s}
          alt=${o?.name}
          .content=${this.getProfileContent({address:s,connections:n,connectorId:i,namespace:e})}
          .charsStart=${oe.ADDRESS_DISPLAY.START}
          .charsEnd=${oe.ADDRESS_DISPLAY.END}
          .icon=${C.icon}
          .iconSize=${C.iconSize}
          .iconBadge=${this.isSmartAccount(s)?oe.BADGE.ICON:void 0}
          .iconBadgeSize=${this.isSmartAccount(s)?oe.BADGE.SIZE:void 0}
          imageSrc=${t}
          ?enableMoreButton=${C.isAuth}
          @copy=${()=>this.handleCopyAddress(s)}
          @disconnect=${()=>this.handleDisconnect(e,{id:i})}
          @switch=${()=>{r&&O&&K?.[0]&&this.handleSwitchWallet(O,K[0].address,e)}}
          @externalLink=${()=>this.handleExternalLink(s)}
          @more=${()=>this.handleMore()}
          data-testid="wui-active-profile-wallet-item"
        ></wui-active-profile-wallet-item>
        ${R?l`<wui-separator></wui-separator>`:null}
      </wui-flex>
    `}renderActiveConnectionsList(e){const i=this.getActiveConnections(e);return i.length===0?null:l`
      <wui-flex flexDirection="column" .padding=${["0","xs","0","xs"]}>
        ${this.renderConnectionList(i,!1,e)}
      </wui-flex>
    `}renderRecentConnections(e){const{recentConnections:i}=Se.getConnectionsData(e);return i.flatMap(o=>o.accounts).length===0?null:l`
      <wui-flex flexDirection="column" .padding=${["0","xs","0","xs"]} rowGap="xs">
        <wui-text color="fg-200" variant="micro-500" data-testid="recently-connected-text"
          >RECENTLY CONNECTED</wui-text
        >
        <wui-flex flexDirection="column" .padding=${["0","xs","0","xs"]}>
          ${this.renderConnectionList(i,!0,e)}
        </wui-flex>
      </wui-flex>
    `}renderConnectionList(e,i,n){return e.filter(o=>o.accounts.length>0).map((o,t)=>{const s=m.getConnectorById(o.connectorId),r=S.getConnectorImage(s)??"",C=ei.getAuthData(o);return o.accounts.map((R,O)=>{const K=t!==0||O!==0,P=this.isAccountLoading(o.connectorId,R.address);return l`
            <wui-flex flexDirection="column">
              ${K?l`<wui-separator></wui-separator>`:null}
              <wui-inactive-profile-wallet-item
                address=${R.address}
                alt=${o.connectorId}
                buttonLabel=${i?"Connect":"Switch"}
                buttonVariant=${i?"neutral":"accent"}
                rightIcon=${i?"bin":"off"}
                rightIconSize="sm"
                class=${i?"recent-connection":"active-connection"}
                data-testid=${i?"recent-connection":"active-connection"}
                imageSrc=${r}
                .iconBadge=${this.isSmartAccount(R.address)?oe.BADGE.ICON:void 0}
                .iconBadgeSize=${this.isSmartAccount(R.address)?oe.BADGE.SIZE:void 0}
                .icon=${C.icon}
                .iconSize=${C.iconSize}
                .loading=${P}
                .showBalance=${!1}
                .charsStart=${oe.ADDRESS_DISPLAY.START}
                .charsEnd=${oe.ADDRESS_DISPLAY.END}
                @buttonClick=${()=>this.handleSwitchWallet(o,R.address,n)}
                @iconClick=${()=>this.handleWalletAction({connection:o,address:R.address,isRecentConnection:i,namespace:n})}
              ></wui-inactive-profile-wallet-item>
            </wui-flex>
          `})})}renderAddConnectionButton(e){if(!this.isMultiWalletEnabled()&&this.caipAddress||!this.hasAnyConnections(e))return null;const{title:i}=this.getChainLabelInfo(e);return l`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="plus"
        iconSize="sm"
        ?chevron=${!0}
        @click=${()=>this.handleAddConnection(e)}
        data-testid="add-connection-button"
      >
        <wui-text variant="paragraph-500" color="fg-200">${i}</wui-text>
      </wui-list-item>
    `}renderEmptyState(e){const{title:i,description:n}=this.getChainLabelInfo(e);return l`
      <wui-flex alignItems="flex-start" class="empty-template" data-testid="empty-template">
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="s"
          class="empty-box"
        >
          <wui-icon-box
            size="lg"
            icon="wallet"
            background="gray"
            iconColor="fg-200"
            backgroundColor="glass-002"
          ></wui-icon-box>

          <wui-flex flexDirection="column" alignItems="center" justifyContent="center" gap="3xs">
            <wui-text color="fg-100" variant="paragraph-500" data-testid="empty-state-text"
              >No wallet connected</wui-text
            >
            <wui-text color="fg-200" variant="tiny-500" data-testid="empty-state-description"
              >${n}</wui-text
            >
          </wui-flex>

          <wui-button
            variant="neutral"
            size="md"
            @click=${()=>this.handleAddConnection(e)}
            data-testid="empty-state-button"
          >
            <wui-icon color="inherit" slot="iconLeft" name="plus"></wui-icon>
            ${i}
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}handleTabChange(e){const i=this.namespaces[e];i&&(this.chainListener?.(),this.currentTab=this.namespaces.indexOf(i),this.namespace=i,this.caipAddress=d.getAccountData(i)?.caipAddress,this.profileName=d.getAccountData(i)?.profileName,this.chainListener=d.subscribeChainProp("accountState",n=>{this.caipAddress=n?.caipAddress},i))}async handleSwitchWallet(e,i,n){try{this.isSwitching=!0,this.lastSelectedConnectorId=e.connectorId,this.lastSelectedAddress=i,await g.switchConnection({connection:e,address:i,namespace:n,closeModalOnConnect:!1,onChange({hasSwitchedAccount:o,hasSwitchedWallet:t}){t?E.showSuccess("Wallet switched"):o&&E.showSuccess("Account switched")}})}catch{E.showError("Failed to switch wallet")}finally{this.isSwitching=!1}}handleWalletAction(e){const{connection:i,address:n,isRecentConnection:o,namespace:t}=e;o?(de.deleteAddressFromConnection({connectorId:i.connectorId,address:n,namespace:t}),g.syncStorageConnections(),E.showSuccess("Wallet deleted")):this.handleDisconnect(t,{id:i.connectorId})}async handleDisconnect(e,{id:i}){try{await g.disconnect({id:i,namespace:e}),E.showSuccess("Wallet disconnected")}catch{E.showError("Failed to disconnect wallet")}}handleCopyAddress(e){b.copyToClopboard(e),E.showSuccess("Address copied")}handleMore(){f.push("AccountSettings")}handleExternalLink(e){const i=this.caipNetwork?.blockExplorers?.default.url;i&&b.openHref(`${i}/address/${e}`,"_blank")}handleAddConnection(e){m.setFilterByNamespace(e),f.push("Connect")}getChainLabelInfo(e){return ro[e]??{title:"Add Wallet",description:"Add your first wallet"}}isSmartAccount(e){if(!this.namespace)return!1;const i=this.user?.accounts?.find(n=>n.type==="smartAccount");return i&&e?te.isLowerCaseMatch(i.address,e):!1}getPlainAddress(){return this.caipAddress?b.getPlainAddress(this.caipAddress):void 0}getActiveConnections(e){const i=this.activeConnectorIds[e],{connections:n}=Se.getConnectionsData(e),[o]=n.filter(C=>te.isLowerCaseMatch(C.connectorId,i));if(!i)return n;const t=e===k.CHAIN.BITCOIN,{address:s}=this.caipAddress?xn.parseCaipAddress(this.caipAddress):{};let r=[...s?[s]:[]];return t&&o&&(r=o.accounts.map(C=>C.address)||[]),Se.excludeConnectorAddressFromConnections({connectorId:i,addresses:r,connections:n})}hasAnyConnections(e){const i=this.getActiveConnections(e),{recentConnections:n}=Se.getConnectionsData(e);return!!this.caipAddress||i.length>0||n.length>0}isAccountLoading(e,i){return te.isLowerCaseMatch(this.lastSelectedConnectorId,e)&&te.isLowerCaseMatch(this.lastSelectedAddress,i)&&this.isSwitching}getProfileContent(e){const{address:i,connections:n,connectorId:o,namespace:t}=e,[s]=n.filter(C=>te.isLowerCaseMatch(C.connectorId,o));if(t===k.CHAIN.BITCOIN&&s?.accounts.every(C=>typeof C.type=="string"))return this.getBitcoinProfileContent(s.accounts,i);const r=ei.getAuthData({connectorId:o,accounts:[]});return[{address:i,tagLabel:"Active",tagVariant:"success",enableButton:!0,profileName:this.profileName,buttonType:"disconnect",buttonLabel:"Disconnect",buttonVariant:"neutral",...r.isAuth?{description:this.isSmartAccount(i)?"Smart Account":"EOA Account"}:{}}]}getBitcoinProfileContent(e,i){const n=e.length>1,o=this.getPlainAddress();return e.map(t=>{const s=te.isLowerCaseMatch(t.address,o);let r="PAYMENT";return t.type==="ordinal"&&(r="ORDINALS"),{address:t.address,tagLabel:te.isLowerCaseMatch(t.address,i)?"Active":void 0,tagVariant:te.isLowerCaseMatch(t.address,i)?"success":void 0,enableButton:!0,...n?{label:r,alignItems:"flex-end",buttonType:s?"disconnect":"switch",buttonLabel:s?"Disconnect":"Switch",buttonVariant:s?"neutral":"accent"}:{alignItems:"center",buttonType:"disconnect",buttonLabel:"Disconnect",buttonVariant:"neutral"}}})}removeScrollListener(){const e=this.shadowRoot?.querySelector(".wallet-list");e&&e.removeEventListener("scroll",()=>this.handleConnectListScroll())}handleConnectListScroll(){const e=this.shadowRoot?.querySelector(".wallet-list");e&&this.updateScrollOpacity(e)}isMultiWalletEnabled(){return!!this.remoteFeatures?.multiWallet}updateScrollOpacity(e){e.style.setProperty("--connect-scroll--top-opacity",yt.interpolate([0,oe.SCROLL_THRESHOLD],oe.OPACITY_RANGE,e.scrollTop).toString()),e.style.setProperty("--connect-scroll--bottom-opacity",yt.interpolate([0,oe.SCROLL_THRESHOLD],oe.OPACITY_RANGE,e.scrollHeight-e.scrollTop-e.offsetHeight).toString())}onConnectionsChange(){if(this.isMultiWalletEnabled()&&this.namespace){const{connections:e}=Se.getConnectionsData(this.namespace);e.length===0&&f.reset("ProfileWallets")}this.requestUpdate()}};z.styles=oo;Z([c()],z.prototype,"currentTab",void 0);Z([c()],z.prototype,"namespace",void 0);Z([c()],z.prototype,"namespaces",void 0);Z([c()],z.prototype,"caipAddress",void 0);Z([c()],z.prototype,"profileName",void 0);Z([c()],z.prototype,"activeConnectorIds",void 0);Z([c()],z.prototype,"lastSelectedAddress",void 0);Z([c()],z.prototype,"lastSelectedConnectorId",void 0);Z([c()],z.prototype,"isSwitching",void 0);Z([c()],z.prototype,"caipNetwork",void 0);Z([c()],z.prototype,"user",void 0);Z([c()],z.prototype,"remoteFeatures",void 0);Z([c()],z.prototype,"tabWidth",void 0);z=Z([p("w3m-profile-wallets-view")],z);const lo=_`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;var nn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let $t=class extends N{constructor(){super(...arguments),this.inputElementRef=Ji(),this.checked=void 0}render(){return w`
      <label>
        <input
          ${Zi(this.inputElementRef)}
          type="checkbox"
          ?checked=${Me(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};$t.styles=[T,D,yn,lo];nn([u({type:Boolean})],$t.prototype,"checked",void 0);$t=nn([p("wui-switch")],$t);const co=_`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var on=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let St=class extends N{constructor(){super(...arguments),this.checked=void 0}render(){return w`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${Me(this.checked)}></wui-switch>
      </button>
    `}};St.styles=[T,D,co];on([u({type:Boolean})],St.prototype,"checked",void 0);St=on([p("wui-certified-switch")],St);const uo=_`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;var sn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let kt=class extends N{constructor(){super(...arguments),this.icon="copy"}render(){return w`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};kt.styles=[T,D,uo];sn([u()],kt.prototype,"icon",void 0);kt=sn([p("wui-input-element")],kt);const po=_`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;var ho=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let li=class extends N{constructor(){super(...arguments),this.inputComponentRef=Ji()}render(){return w`
      <wui-input-text
        ${Zi(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const i=this.inputComponentRef.value?.inputElementRef.value;i&&(i.value="",i.focus(),i.dispatchEvent(new Event("input")))}};li.styles=[T,po];li=ho([p("wui-search-bar")],li);const wo=_`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var an=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let It=class extends N{constructor(){super(...arguments),this.type="wallet"}render(){return w`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?w` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${An}`:w`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};It.styles=[T,D,wo];an([u()],It.prototype,"type",void 0);It=an([p("wui-card-select-loader")],It);const fo=_`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var le=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let X=class extends N{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&H.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&H.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&H.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&H.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&H.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&H.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&H.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&H.getSpacingStyles(this.margin,3)};
    `,w`<slot></slot>`}};X.styles=[T,fo];le([u()],X.prototype,"gridTemplateRows",void 0);le([u()],X.prototype,"gridTemplateColumns",void 0);le([u()],X.prototype,"justifyItems",void 0);le([u()],X.prototype,"alignItems",void 0);le([u()],X.prototype,"justifyContent",void 0);le([u()],X.prototype,"alignContent",void 0);le([u()],X.prototype,"columnGap",void 0);le([u()],X.prototype,"rowGap",void 0);le([u()],X.prototype,"gap",void 0);le([u()],X.prototype,"padding",void 0);le([u()],X.prototype,"margin",void 0);X=le([p("wui-grid")],X);const mo=W`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var gt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let De=class extends x{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(i=>{i.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){const e=this.wallet?.badge_type==="certified";return l`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${h(e?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${e?l`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():l`
      <wui-wallet-image
        size="md"
        imageSrc=${h(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return l`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=S.getWalletImage(this.wallet),!this.imageSrc&&(this.imageLoading=!0,this.imageSrc=await S.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};De.styles=mo;gt([c()],De.prototype,"visible",void 0);gt([c()],De.prototype,"imageSrc",void 0);gt([c()],De.prototype,"imageLoading",void 0);gt([y()],De.prototype,"wallet",void 0);De=gt([p("w3m-all-wallets-list-item")],De);const bo=W`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var Je=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Ui="local-paginator";let Ie=class extends x{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!A.state.wallets.length,this.wallets=A.state.wallets,this.recommended=A.state.recommended,this.featured=A.state.featured,this.filteredWallets=A.state.filteredWallets,this.unsubscribe.push(A.subscribeKey("wallets",e=>this.wallets=e),A.subscribeKey("recommended",e=>this.recommended=e),A.subscribeKey("featured",e=>this.featured=e),A.subscribeKey("filteredWallets",e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return l`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;const e=this.shadowRoot?.querySelector("wui-grid");e&&(await A.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,i){return[...Array(e)].map(()=>l`
        <wui-card-select-loader type="wallet" id=${h(i)}></wui-card-select-loader>
      `)}getWallets(){const e=[...this.featured,...this.recommended];this.filteredWallets?.length>0?e.push(...this.filteredWallets):e.push(...this.wallets);const i=b.uniqueBy(e,"id"),n=Pe.markWalletsAsInstalled(i);return Pe.markWalletsWithDisplayIndex(n)}walletsTemplate(){return this.getWallets().map(i=>l`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(i)}
          .wallet=${i}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:i,featured:n,count:o}=A.state,t=window.innerWidth<352?3:4,s=e.length+i.length;let C=Math.ceil(s/t)*t-s+t;return C-=e.length?n.length%t:0,o===0&&n.length>0?null:o===0||[...n,...e,...i].length<o?this.shimmerTemplate(C,Ui):null}createPaginationObserver(){const e=this.shadowRoot?.querySelector(`#${Ui}`);e&&(this.paginationObserver=new IntersectionObserver(([i])=>{if(i?.isIntersecting&&!this.loading){const{page:n,count:o,wallets:t}=A.state;t.length<o&&A.fetchWalletsByPage({page:n+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){m.selectWalletConnector(e)}};Ie.styles=bo;Je([c()],Ie.prototype,"loading",void 0);Je([c()],Ie.prototype,"wallets",void 0);Je([c()],Ie.prototype,"recommended",void 0);Je([c()],Ie.prototype,"featured",void 0);Je([c()],Ie.prototype,"filteredWallets",void 0);Ie=Je([p("w3m-all-wallets-list")],Ie);const go=W`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var Ft=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let He=class extends x{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?l`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await A.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:e}=A.state,i=Pe.markWalletsAsInstalled(e);return e.length?l`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${i.map(n=>l`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(n)}
              .wallet=${n}
              data-testid="wallet-search-item-${n.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:l`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){m.selectWalletConnector(e)}};He.styles=go;Ft([c()],He.prototype,"loading",void 0);Ft([y()],He.prototype,"query",void 0);Ft([y()],He.prototype,"badge",void 0);He=Ft([p("w3m-all-wallets-search")],He);var vi=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let At=class extends x{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=b.debounce(e=>{this.search=e})}render(){const e=this.search.length>=2;return l`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?l`<w3m-all-wallets-search
            query=${this.search}
            badge=${h(this.badge)}
          ></w3m-all-wallets-search>`:l`<w3m-all-wallets-list badge=${h(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onClick(){if(this.badge==="certified"){this.badge=void 0;return}this.badge="certified",E.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return b.isMobile()?l`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){f.push("ConnectingWalletConnect")}};vi([c()],At.prototype,"search",void 0);vi([c()],At.prototype,"badge",void 0);At=vi([p("w3m-all-wallets-view")],At);const vo=_`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 16.5px var(--wui-spacing-l) 16.5px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`;var Vt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let qe=class extends N{constructor(){super(...arguments),this.text="",this.disabled=!1,this.tabIdx=void 0}render(){return w`
      <button ?disabled=${this.disabled} tabindex=${Me(this.tabIdx)}>
        <wui-text align="center" variant="paragraph-500" color="inherit">${this.text}</wui-text>
      </button>
    `}};qe.styles=[T,D,vo];Vt([u()],qe.prototype,"text",void 0);Vt([u({type:Boolean})],qe.prototype,"disabled",void 0);Vt([u()],qe.prototype,"tabIdx",void 0);qe=Vt([p("wui-list-button")],qe);const xo=W`
  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: var(--wui-spacing-xs);
  }

  wui-loading-spinner {
    right: var(--wui-spacing-m);
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`;var Ze=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ae=class extends x{constructor(){super(),this.unsubscribe=[],this.formRef=Rn(),this.email="",this.loading=!1,this.error="",this.remoteFeatures=v.state.remoteFeatures,this.unsubscribe.push(v.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{e.key==="Enter"&&this.onSubmitEmail(e)})}render(){const e=g.hasAnyConnection(k.CONNECTOR_ID.AUTH);return l`
      <form ${On(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${h(this.tabIdx)}
          ?disabled=${e}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `}submitButtonTemplate(){return!this.loading&&this.email.length>3?l`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `:null}loadingTemplate(){return this.loading?l`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}templateError(){return this.error?l`<wui-text variant="tiny-500" color="error-100">${this.error}</wui-text>`:null}onEmailInputChange(e){this.email=e.detail.trim(),this.error=""}async onSubmitEmail(e){if(!k.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(n=>n===d.state.activeChain)){const n=d.getFirstCaipNetworkSupportsAuthConnector();if(n){f.push("SwitchNetwork",{network:n});return}}try{if(this.loading)return;this.loading=!0,e.preventDefault();const n=m.getAuthConnector();if(!n)throw new Error("w3m-email-login-widget: Auth connector not found");const{action:o}=await n.provider.connectEmail({email:this.email});if(I.sendEvent({type:"track",event:"EMAIL_SUBMITTED"}),o==="VERIFY_OTP")I.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),f.push("EmailVerifyOtp",{email:this.email});else if(o==="VERIFY_DEVICE")f.push("EmailVerifyDevice",{email:this.email});else if(o==="CONNECT"){const t=this.remoteFeatures?.multiWallet;await g.connectExternal(n,d.state.activeChain),t?(f.replace("ProfileWallets"),E.showSuccess("New Wallet Added")):f.replace("Account")}}catch(n){b.parseError(n)?.includes("Invalid email")?this.error="Invalid email. Try again.":E.showError(n)}finally{this.loading=!1}}onFocusEvent(){I.sendEvent({type:"track",event:"EMAIL_LOGIN_SELECTED"})}};Ae.styles=xo;Ze([y()],Ae.prototype,"tabIdx",void 0);Ze([c()],Ae.prototype,"email",void 0);Ze([c()],Ae.prototype,"loading",void 0);Ze([c()],Ae.prototype,"error",void 0);Ze([c()],Ae.prototype,"remoteFeatures",void 0);Ae=Ze([p("w3m-email-login-widget")],Ae);const yo=_`
  :host {
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    height: 56px;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var Gt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ye=class extends N{constructor(){super(...arguments),this.logo="google",this.disabled=!1,this.tabIdx=void 0}render(){return w`
      <button ?disabled=${this.disabled} tabindex=${Me(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
      </button>
    `}};Ye.styles=[T,D,yo];Gt([u()],Ye.prototype,"logo",void 0);Gt([u({type:Boolean})],Ye.prototype,"disabled",void 0);Gt([u()],Ye.prototype,"tabIdx",void 0);Ye=Gt([p("wui-logo-select")],Ye);const Co=W`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-m)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var Fe=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const zi=2,Mi=6;let Ce=class extends x{constructor(){super(),this.unsubscribe=[],this.walletGuide="get-started",this.tabIdx=void 0,this.connectors=m.state.connectors,this.remoteFeatures=v.state.remoteFeatures,this.authConnector=this.connectors.find(e=>e.type==="AUTH"),this.isPwaLoading=!1,this.unsubscribe.push(m.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(i=>i.type==="AUTH")}),v.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      <wui-flex
        class="container"
        flexDirection="column"
        gap="xs"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `}topViewTemplate(){const e=this.walletGuide==="explore";let i=this.remoteFeatures?.socials;return!i&&e?(i=q.DEFAULT_SOCIALS,this.renderTopViewContent(i)):i?this.renderTopViewContent(i):null}renderTopViewContent(e){return e.length===2?l` <wui-flex gap="xs">
        ${e.slice(0,zi).map(i=>l`<wui-logo-select
              data-testid=${`social-selector-${i}`}
              @click=${()=>{this.onSocialClick(i)}}
              logo=${i}
              tabIdx=${h(this.tabIdx)}
              ?disabled=${this.isPwaLoading||this.hasConnection()}
            ></wui-logo-select>`)}
      </wui-flex>`:l` <wui-list-social
      data-testid=${`social-selector-${e[0]}`}
      @click=${()=>{this.onSocialClick(e[0])}}
      logo=${h(e[0])}
      align="center"
      name=${`Continue with ${e[0]}`}
      tabIdx=${h(this.tabIdx)}
      ?disabled=${this.isPwaLoading||this.hasConnection()}
    ></wui-list-social>`}bottomViewTemplate(){let e=this.remoteFeatures?.socials;const i=this.walletGuide==="explore";return(!this.authConnector||!e||e.length===0)&&i&&(e=q.DEFAULT_SOCIALS),!e||e.length<=zi?null:e&&e.length>Mi?l`<wui-flex gap="xs">
        ${e.slice(1,Mi-1).map(o=>l`<wui-logo-select
              data-testid=${`social-selector-${o}`}
              @click=${()=>{this.onSocialClick(o)}}
              logo=${o}
              tabIdx=${h(this.tabIdx)}
              ?focusable=${this.tabIdx!==void 0&&this.tabIdx>=0}
              ?disabled=${this.isPwaLoading||this.hasConnection()}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${h(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
          ?disabled=${this.isPwaLoading||this.hasConnection()}
          data-testid="social-selector-more"
        ></wui-logo-select>
      </wui-flex>`:e?l`<wui-flex gap="xs">
      ${e.slice(1,e.length).map(o=>l`<wui-logo-select
            data-testid=${`social-selector-${o}`}
            @click=${()=>{this.onSocialClick(o)}}
            logo=${o}
            tabIdx=${h(this.tabIdx)}
            ?focusable=${this.tabIdx!==void 0&&this.tabIdx>=0}
            ?disabled=${this.isPwaLoading||this.hasConnection()}
          ></wui-logo-select>`)}
    </wui-flex>`:null}onMoreSocialsClick(){f.push("ConnectSocials")}async onSocialClick(e){if(!k.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(n=>n===d.state.activeChain)){const n=d.getFirstCaipNetworkSupportsAuthConnector();if(n){f.push("SwitchNetwork",{network:n});return}}e&&await Pn(e)}async handlePwaFrameLoad(){if(b.isPWA()){this.isPwaLoading=!0;try{this.authConnector?.provider instanceof Cn&&await this.authConnector.provider.init()}catch(e){$n.open({displayMessage:"Error loading embedded wallet in PWA",debugMessage:e.message},"error")}finally{this.isPwaLoading=!1}}}hasConnection(){return g.hasAnyConnection(k.CONNECTOR_ID.AUTH)}};Ce.styles=Co;Fe([y()],Ce.prototype,"walletGuide",void 0);Fe([y()],Ce.prototype,"tabIdx",void 0);Fe([c()],Ce.prototype,"connectors",void 0);Fe([c()],Ce.prototype,"remoteFeatures",void 0);Fe([c()],Ce.prototype,"authConnector",void 0);Fe([c()],Ce.prototype,"isPwaLoading",void 0);Ce=Fe([p("w3m-social-login-widget")],Ce);const $o=W`
  wui-flex {
    width: 100%;
  }

  .wallet-guide {
    width: 100%;
  }

  .chip-box {
    width: fit-content;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }
`;var xi=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let lt=class extends x{constructor(){super(...arguments),this.walletGuide="get-started"}render(){return this.walletGuide==="explore"?l`<wui-flex
          class="wallet-guide"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="xs"
          data-testid="w3m-wallet-guide-explore"
        >
          <wui-text variant="small-400" color="fg-200" align="center">
            Looking for a self-custody wallet?
          </wui-text>

          <wui-flex class="chip-box">
            <wui-chip
              imageIcon="walletConnectLightBrown"
              icon="externalLink"
              variant="transparent"
              href="https://walletguide.walletconnect.network"
              title="Find one on WalletGuide"
            ></wui-chip>
          </wui-flex>
        </wui-flex>`:l`<wui-flex
          columnGap="4xs"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          .padding=${["s","0","s","0"]}
        >
          <wui-text variant="small-400" class="title" color="fg-200"
            >Haven't got a wallet?</wui-text
          >
          <wui-link
            data-testid="w3m-wallet-guide-get-started"
            color="blue-100"
            class="get-started-link"
            @click=${this.onGetStarted}
            tabIdx=${h(this.tabIdx)}
          >
            Get started
          </wui-link>
        </wui-flex>`}onGetStarted(){f.push("Create")}};lt.styles=$o;xi([y()],lt.prototype,"tabIdx",void 0);xi([y()],lt.prototype,"walletGuide",void 0);lt=xi([p("w3m-wallet-guide")],lt);const So=_`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var rn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const ti=4;let Wt=class extends N{constructor(){super(...arguments),this.walletImages=[]}render(){const e=this.walletImages.length<ti;return w`${this.walletImages.slice(0,ti).map(({src:i,walletName:n})=>w`
            <wui-wallet-image
              size="inherit"
              imageSrc=${i}
              name=${Me(n)}
            ></wui-wallet-image>
          `)}
      ${e?[...Array(ti-this.walletImages.length)].map(()=>w` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};Wt.styles=[T,So];rn([u({type:Array})],Wt.prototype,"walletImages",void 0);Wt=rn([p("wui-all-wallets-image")],Wt);const ko=_`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var ee=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let M=class extends N{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return w`
      <button ?disabled=${this.disabled} tabindex=${Me(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?w` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?w` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?w`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:!this.showAllWallets&&!this.imageSrc?w`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`:null}templateStatus(){return this.loading?w`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?w`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?w`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};M.styles=[T,D,ko];ee([u({type:Array})],M.prototype,"walletImages",void 0);ee([u()],M.prototype,"imageSrc",void 0);ee([u()],M.prototype,"name",void 0);ee([u()],M.prototype,"tagLabel",void 0);ee([u()],M.prototype,"tagVariant",void 0);ee([u()],M.prototype,"icon",void 0);ee([u()],M.prototype,"walletIcon",void 0);ee([u()],M.prototype,"tabIdx",void 0);ee([u({type:Boolean})],M.prototype,"installed",void 0);ee([u({type:Boolean})],M.prototype,"disabled",void 0);ee([u({type:Boolean})],M.prototype,"showAllWallets",void 0);ee([u({type:Boolean})],M.prototype,"loading",void 0);ee([u({type:String})],M.prototype,"loadingSpinnerColor",void 0);M=ee([p("wui-list-wallet")],M);var et=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let je=class extends x{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.count=A.state.count,this.filteredCount=A.state.filteredWallets.length,this.isFetchingRecommendedWallets=A.state.isFetchingRecommendedWallets,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e),A.subscribeKey("count",e=>this.count=e),A.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),A.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.find(R=>R.id==="walletConnect"),{allWallets:i}=v.state;if(!e||i==="HIDE"||i==="ONLY_MOBILE"&&!b.isMobile())return null;const n=A.state.featured.length,o=this.count+n,t=o<10?o:Math.floor(o/10)*10,s=this.filteredCount>0?this.filteredCount:t;let r=`${s}`;this.filteredCount>0?r=`${this.filteredCount}`:s<o&&(r=`${s}+`);const C=g.hasAnyConnection(k.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${r}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${h(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
        ?disabled=${C}
      ></wui-list-wallet>
    `}onAllWallets(){I.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),f.push("AllWallets")}};et([y()],je.prototype,"tabIdx",void 0);et([c()],je.prototype,"connectors",void 0);et([c()],je.prototype,"count",void 0);et([c()],je.prototype,"filteredCount",void 0);et([c()],je.prototype,"isFetchingRecommendedWallets",void 0);je=et([p("w3m-all-wallets-widget")],je);var Kt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ct=class extends x{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.connections=g.state.connections,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e),g.subscribeKey("connections",e=>this.connections=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(i=>i.type==="ANNOUNCED");return e?.length?l`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(Oe.showConnector).map(i=>{const o=(this.connections.get(i.chain)??[]).some(t=>te.isLowerCaseMatch(t.connectorId,i.id));return l`
            <wui-list-wallet
              imageSrc=${h(S.getConnectorImage(i))}
              name=${i.name??"Unknown"}
              @click=${()=>this.onConnector(i)}
              tagVariant=${o?"shade":"success"}
              tagLabel=${o?"connected":"installed"}
              data-testid=${`wallet-selector-${i.id}`}
              .installed=${!0}
              tabIdx=${h(this.tabIdx)}
            >
            </wui-list-wallet>
          `})}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){e.id==="walletConnect"?b.isMobile()?f.push("AllWallets"):f.push("ConnectingWalletConnect"):f.push("ConnectingExternal",{connector:e})}};Kt([y()],ct.prototype,"tabIdx",void 0);Kt([c()],ct.prototype,"connectors",void 0);Kt([c()],ct.prototype,"connections",void 0);ct=Kt([p("w3m-connect-announced-widget")],ct);var Ht=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ut=class extends x{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.loading=!1,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e)),b.isTelegram()&&b.isIos()&&(this.loading=!g.state.wcUri,this.unsubscribe.push(g.subscribeKey("wcUri",e=>this.loading=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{customWallets:e}=v.state;if(!e?.length)return this.style.cssText="display: none",null;const i=this.filterOutDuplicateWallets(e),n=g.hasAnyConnection(k.CONNECTOR_ID.WALLET_CONNECT);return l`<wui-flex flexDirection="column" gap="xs">
      ${i.map(o=>l`
          <wui-list-wallet
            imageSrc=${h(S.getWalletImage(o))}
            name=${o.name??"Unknown"}
            @click=${()=>this.onConnectWallet(o)}
            data-testid=${`wallet-selector-${o.id}`}
            tabIdx=${h(this.tabIdx)}
            ?loading=${this.loading}
            ?disabled=${n}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(e){const i=de.getRecentWallets(),n=this.connectors.map(r=>r.info?.rdns).filter(Boolean),o=i.map(r=>r.rdns).filter(Boolean),t=n.concat(o);if(t.includes("io.metamask.mobile")&&b.isMobile()){const r=t.indexOf("io.metamask.mobile");t[r]="io.metamask"}return e.filter(r=>!t.includes(String(r?.rdns)))}onConnectWallet(e){this.loading||f.push("ConnectingWalletConnect",{wallet:e})}};Ht([y()],ut.prototype,"tabIdx",void 0);Ht([c()],ut.prototype,"connectors",void 0);Ht([c()],ut.prototype,"loading",void 0);ut=Ht([p("w3m-connect-custom-widget")],ut);var yi=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Et=class extends x{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const n=this.connectors.filter(t=>t.type==="EXTERNAL").filter(Oe.showConnector).filter(t=>t.id!==k.CONNECTOR_ID.COINBASE_SDK);if(!n?.length)return this.style.cssText="display: none",null;const o=g.hasAnyConnection(k.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-flex flexDirection="column" gap="xs">
        ${n.map(t=>l`
            <wui-list-wallet
              imageSrc=${h(S.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name??"Unknown"}
              data-testid=${`wallet-selector-external-${t.id}`}
              @click=${()=>this.onConnector(t)}
              tabIdx=${h(this.tabIdx)}
              ?disabled=${o}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(e){f.push("ConnectingExternal",{connector:e})}};yi([y()],Et.prototype,"tabIdx",void 0);yi([c()],Et.prototype,"connectors",void 0);Et=yi([p("w3m-connect-external-widget")],Et);var Ci=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let _t=class extends x{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){if(!this.wallets.length)return this.style.cssText="display: none",null;const e=g.hasAnyConnection(k.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(i=>l`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${i.id}`}
              imageSrc=${h(S.getWalletImage(i))}
              name=${i.name??"Unknown"}
              @click=${()=>this.onConnectWallet(i)}
              tabIdx=${h(this.tabIdx)}
              ?disabled=${e}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(e){m.selectWalletConnector(e)}};Ci([y()],_t.prototype,"tabIdx",void 0);Ci([y()],_t.prototype,"wallets",void 0);_t=Ci([p("w3m-connect-featured-widget")],_t);var qt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let dt=class extends x{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=[],this.connections=g.state.connections,this.unsubscribe.push(g.subscribeKey("connections",e=>this.connections=e))}render(){const e=this.connectors.filter(Oe.showConnector);return e.length===0?(this.style.cssText="display: none",null):l`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(i=>{const o=(this.connections.get(i.chain)??[]).some(t=>te.isLowerCaseMatch(t.connectorId,i.id));return l`
            <wui-list-wallet
              imageSrc=${h(S.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant=${o?"shade":"success"}
              tagLabel=${o?"connected":"installed"}
              data-testid=${`wallet-selector-${i.id}`}
              @click=${()=>this.onConnector(i)}
              tabIdx=${h(this.tabIdx)}
            >
            </wui-list-wallet>
          `})}
      </wui-flex>
    `}onConnector(e){m.setActiveConnector(e),f.push("ConnectingExternal",{connector:e})}};qt([y()],dt.prototype,"tabIdx",void 0);qt([y()],dt.prototype,"connectors",void 0);qt([c()],dt.prototype,"connections",void 0);dt=qt([p("w3m-connect-injected-widget")],dt);var $i=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Tt=class extends x{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(i=>i.type==="MULTI_CHAIN"&&i.name!=="WalletConnect");return e?.length?l`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(i=>l`
            <wui-list-wallet
              imageSrc=${h(S.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${i.id}`}
              @click=${()=>this.onConnector(i)}
              tabIdx=${h(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){m.setActiveConnector(e),f.push("ConnectingMultiChain")}};$i([y()],Tt.prototype,"tabIdx",void 0);$i([c()],Tt.prototype,"connectors",void 0);Tt=$i([p("w3m-connect-multi-chain-widget")],Tt);var Yt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let pt=class extends x{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.loading=!1,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e)),b.isTelegram()&&b.isIos()&&(this.loading=!g.state.wcUri,this.unsubscribe.push(g.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const i=de.getRecentWallets().filter(o=>!Pe.isExcluded(o)).filter(o=>!this.hasWalletConnector(o)).filter(o=>this.isWalletCompatibleWithCurrentChain(o));if(!i.length)return this.style.cssText="display: none",null;const n=g.hasAnyConnection(k.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-flex flexDirection="column" gap="xs">
        ${i.map(o=>l`
            <wui-list-wallet
              imageSrc=${h(S.getWalletImage(o))}
              name=${o.name??"Unknown"}
              @click=${()=>this.onConnectWallet(o)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${h(this.tabIdx)}
              ?loading=${this.loading}
              ?disabled=${n}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(e){this.loading||m.selectWalletConnector(e)}hasWalletConnector(e){return this.connectors.some(i=>i.id===e.id||i.name===e.name)}isWalletCompatibleWithCurrentChain(e){const i=d.state.activeChain;return i&&e.chains?e.chains.some(n=>{const o=n.split(":")[0];return i===o}):!0}};Yt([y()],pt.prototype,"tabIdx",void 0);Yt([c()],pt.prototype,"connectors",void 0);Yt([c()],pt.prototype,"loading",void 0);pt=Yt([p("w3m-connect-recent-widget")],pt);var Xt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ht=class extends x{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,b.isTelegram()&&b.isIos()&&(this.loading=!g.state.wcUri,this.unsubscribe.push(g.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const{connectors:e}=m.state,{customWallets:i,featuredWalletIds:n}=v.state,o=de.getRecentWallets(),t=e.find(P=>P.id==="walletConnect"),r=e.filter(P=>P.type==="INJECTED"||P.type==="ANNOUNCED"||P.type==="MULTI_CHAIN").filter(P=>P.name!=="Browser Wallet");if(!t)return null;if(n||i||!this.wallets.length)return this.style.cssText="display: none",null;const C=r.length+o.length,R=Math.max(0,2-C),O=Pe.filterOutDuplicateWallets(this.wallets).slice(0,R);if(!O.length)return this.style.cssText="display: none",null;const K=g.hasAnyConnection(k.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-flex flexDirection="column" gap="xs">
        ${O.map(P=>l`
            <wui-list-wallet
              imageSrc=${h(S.getWalletImage(P))}
              name=${P?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(P)}
              tabIdx=${h(this.tabIdx)}
              ?loading=${this.loading}
              ?disabled=${K}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(e){if(this.loading)return;const i=m.getConnector({id:e.id,rdns:e.rdns});i?f.push("ConnectingExternal",{connector:i}):f.push("ConnectingWalletConnect",{wallet:e})}};Xt([y()],ht.prototype,"tabIdx",void 0);Xt([y()],ht.prototype,"wallets",void 0);Xt([c()],ht.prototype,"loading",void 0);ht=Xt([p("w3m-connect-recommended-widget")],ht);var Qt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let wt=class extends x{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.connectorImages=Re.state.connectorImages,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e),Re.subscribeKey("connectorImages",e=>this.connectorImages=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(b.isMobile())return this.style.cssText="display: none",null;const e=this.connectors.find(o=>o.id==="walletConnect");if(!e)return this.style.cssText="display: none",null;const i=e.imageUrl||this.connectorImages[e?.imageId??""],n=g.hasAnyConnection(k.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-list-wallet
        imageSrc=${h(i)}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${h(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
        ?disabled=${n}
      >
      </wui-list-wallet>
    `}onConnector(e){m.setActiveConnector(e),f.push("ConnectingWalletConnect")}};Qt([y()],wt.prototype,"tabIdx",void 0);Qt([c()],wt.prototype,"connectors",void 0);Qt([c()],wt.prototype,"connectorImages",void 0);wt=Qt([p("w3m-connect-walletconnect-widget")],wt);const Io=W`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var vt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Le=class extends x{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.recommended=A.state.recommended,this.featured=A.state.featured,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e),A.subscribeKey("recommended",e=>this.recommended=e),A.subscribeKey("featured",e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:e,recent:i,announced:n,injected:o,multiChain:t,recommended:s,featured:r,external:C}=Oe.getConnectorsByType(this.connectors,this.recommended,this.featured);return Oe.getConnectorTypeOrder({custom:e,recent:i,announced:n,injected:o,multiChain:t,recommended:s,featured:r,external:C}).map(O=>{switch(O){case"injected":return l`
            ${t.length?l`<w3m-connect-multi-chain-widget
                  tabIdx=${h(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${n.length?l`<w3m-connect-announced-widget
                  tabIdx=${h(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${o.length?l`<w3m-connect-injected-widget
                  .connectors=${o}
                  tabIdx=${h(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return l`<w3m-connect-walletconnect-widget
            tabIdx=${h(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return l`<w3m-connect-recent-widget
            tabIdx=${h(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return l`<w3m-connect-featured-widget
            .wallets=${r}
            tabIdx=${h(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return l`<w3m-connect-custom-widget
            tabIdx=${h(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return l`<w3m-connect-external-widget
            tabIdx=${h(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return l`<w3m-connect-recommended-widget
            .wallets=${s}
            tabIdx=${h(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${O}`),null}})}};Le.styles=Io;vt([y()],Le.prototype,"tabIdx",void 0);vt([c()],Le.prototype,"connectors",void 0);vt([c()],Le.prototype,"recommended",void 0);vt([c()],Le.prototype,"featured",void 0);Le=vt([p("w3m-connector-list")],Le);var ln=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ci=class extends x{constructor(){super(...arguments),this.tabIdx=void 0}render(){return l`
      <wui-flex flexDirection="column" gap="xs">
        <w3m-connector-list tabIdx=${h(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${h(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `}};ln([y()],ci.prototype,"tabIdx",void 0);ci=ln([p("w3m-wallet-login-list")],ci);const Ao=W`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
    --connect-mask-image: none;
  }

  .connect {
    max-height: clamp(360px, 470px, 80vh);
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: var(--connect-mask-image);
  }

  .guide {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  .connect::-webkit-scrollbar {
    display: none;
  }

  .all-wallets {
    flex-flow: column;
  }

  .connect.disabled,
  .guide.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }

  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var ce=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Wo=470;let Q=class extends x{constructor(){super(),this.unsubscribe=[],this.connectors=m.state.connectors,this.authConnector=this.connectors.find(e=>e.type==="AUTH"),this.features=v.state.features,this.remoteFeatures=v.state.remoteFeatures,this.enableWallets=v.state.enableWallets,this.noAdapters=d.state.noAdapters,this.walletGuide="get-started",this.checked=Ct.state.isLegalCheckboxChecked,this.isEmailEnabled=this.remoteFeatures?.email&&!d.state.noAdapters,this.isSocialEnabled=this.remoteFeatures?.socials&&this.remoteFeatures.socials.length>0&&!d.state.noAdapters,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors),this.unsubscribe.push(m.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(i=>i.type==="AUTH"),this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)}),v.subscribeKey("features",e=>{this.features=e}),v.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e,this.setEmailAndSocialEnableCheck(this.noAdapters,this.remoteFeatures)}),v.subscribeKey("enableWallets",e=>this.enableWallets=e),d.subscribeKey("noAdapters",e=>this.setEmailAndSocialEnableCheck(e,this.remoteFeatures)),Ct.subscribeKey("isLegalCheckboxChecked",e=>this.checked=e))}disconnectedCallback(){this.unsubscribe.forEach(i=>i()),this.resizeObserver?.disconnect(),this.shadowRoot?.querySelector(".connect")?.removeEventListener("scroll",this.handleConnectListScroll.bind(this))}firstUpdated(){const e=this.shadowRoot?.querySelector(".connect");e&&(requestAnimationFrame(this.handleConnectListScroll.bind(this)),e?.addEventListener("scroll",this.handleConnectListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleConnectListScroll()}),this.resizeObserver?.observe(e),this.handleConnectListScroll())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:i}=v.state,n=v.state.features?.legalCheckbox,s=!!(e||i)&&!!n&&this.walletGuide==="get-started"&&!this.checked,r={connect:!0,disabled:s},C=v.state.enableWalletGuide,R=this.enableWallets,O=this.isSocialEnabled||this.authConnector,K=s?-1:void 0;return l`
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          class=${ri(r)}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="s"
            .padding=${O&&R&&C&&this.walletGuide==="get-started"?["3xs","s","0","s"]:["3xs","s","s","s"]}
          >
            ${this.renderConnectMethod(K)}
          </wui-flex>
        </wui-flex>
        ${this.guideTemplate(s)}
        <w3m-legal-footer></w3m-legal-footer>
      </wui-flex>
    `}setEmailAndSocialEnableCheck(e,i){this.isEmailEnabled=i?.email&&!e,this.isSocialEnabled=i?.socials&&i.socials.length>0&&!e,this.remoteFeatures=i,this.noAdapters=e}checkIfAuthEnabled(e){const i=e.filter(o=>o.type===Sn.CONNECTOR_TYPE_AUTH).map(o=>o.chain);return k.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(o=>i.includes(o))}renderConnectMethod(e){const i=Pe.getConnectOrderMethod(this.features,this.connectors);return l`${i.map((n,o)=>{switch(n){case"email":return l`${this.emailTemplate(e)} ${this.separatorTemplate(o,"email")}`;case"social":return l`${this.socialListTemplate(e)}
          ${this.separatorTemplate(o,"social")}`;case"wallet":return l`${this.walletListTemplate(e)}
          ${this.separatorTemplate(o,"wallet")}`;default:return null}})}`}checkMethodEnabled(e){switch(e){case"wallet":return this.enableWallets;case"social":return this.isSocialEnabled&&this.isAuthEnabled;case"email":return this.isEmailEnabled&&this.isAuthEnabled;default:return null}}checkIsThereNextMethod(e){const n=Pe.getConnectOrderMethod(this.features,this.connectors)[e+1];return n?this.checkMethodEnabled(n)?n:this.checkIsThereNextMethod(e+1):void 0}separatorTemplate(e,i){const n=this.checkIsThereNextMethod(e),o=this.walletGuide==="explore";switch(i){case"wallet":return this.enableWallets&&n&&!o?l`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null;case"email":{const t=n==="social";return this.isAuthEnabled&&this.isEmailEnabled&&!t&&n?l`<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>`:null}case"social":{const t=n==="email";return this.isAuthEnabled&&this.isSocialEnabled&&!t&&n?l`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null}default:return null}}emailTemplate(e){return!this.isEmailEnabled||!this.isAuthEnabled?null:l`<w3m-email-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${h(e)}
    ></w3m-email-login-widget>`}socialListTemplate(e){return!this.isSocialEnabled||!this.isAuthEnabled?null:l`<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${h(e)}
    ></w3m-social-login-widget>`}walletListTemplate(e){const i=this.enableWallets,n=this.features?.emailShowWallets===!1,o=this.features?.collapseWallets,t=n||o;return!i||(b.isTelegram()&&(b.isSafari()||b.isIos())&&g.connectWalletConnect().catch(r=>({})),this.walletGuide==="explore")?null:this.isAuthEnabled&&(this.isEmailEnabled||this.isSocialEnabled)&&t?l`<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${h(e)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`:l`<w3m-wallet-login-list tabIdx=${h(e)}></w3m-wallet-login-list>`}guideTemplate(e=!1){if(!v.state.enableWalletGuide)return null;const n={guide:!0,disabled:e},o=e?-1:void 0;return!this.authConnector&&!this.isSocialEnabled?null:l`
      ${this.walletGuide==="explore"&&!d.state.noAdapters?l`<wui-separator data-testid="wui-separator" id="explore" text="or"></wui-separator>`:null}
      <w3m-wallet-guide
        class=${ri(n)}
        tabIdx=${h(o)}
        walletGuide=${this.walletGuide}
      ></w3m-wallet-guide>
    `}legalCheckboxTemplate(){return this.walletGuide==="explore"?null:l`<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`}handleConnectListScroll(){const e=this.shadowRoot?.querySelector(".connect");if(!e)return;e.scrollHeight>Wo?(e.style.setProperty("--connect-mask-image",`linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
          black 40px,
          black calc(100% - 40px),
          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
        )`),e.style.setProperty("--connect-scroll--top-opacity",yt.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--connect-scroll--bottom-opacity",yt.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--connect-mask-image","none"),e.style.setProperty("--connect-scroll--top-opacity","0"),e.style.setProperty("--connect-scroll--bottom-opacity","0"))}onContinueWalletClick(){f.push("ConnectWallets")}};Q.styles=Ao;ce([c()],Q.prototype,"connectors",void 0);ce([c()],Q.prototype,"authConnector",void 0);ce([c()],Q.prototype,"features",void 0);ce([c()],Q.prototype,"remoteFeatures",void 0);ce([c()],Q.prototype,"enableWallets",void 0);ce([c()],Q.prototype,"noAdapters",void 0);ce([y()],Q.prototype,"walletGuide",void 0);ce([c()],Q.prototype,"checked",void 0);ce([c()],Q.prototype,"isEmailEnabled",void 0);ce([c()],Q.prototype,"isSocialEnabled",void 0);ce([c()],Q.prototype,"isAuthEnabled",void 0);Q=ce([p("w3m-connect-view")],Q);const Eo=_`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var Jt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Xe=class extends N{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return w`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};Xe.styles=[T,D,Eo];Jt([u({type:Boolean})],Xe.prototype,"disabled",void 0);Jt([u()],Xe.prototype,"label",void 0);Jt([u()],Xe.prototype,"buttonLabel",void 0);Xe=Jt([p("wui-cta-button")],Xe);const _o=W`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var cn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Nt=class extends x{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:e,app_store:i,play_store:n,chrome_store:o,homepage:t}=this.wallet,s=b.isMobile(),r=b.isIos(),C=b.isAndroid(),R=[i,n,t,o].filter(Boolean).length>1,O=H.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return R&&!s?l`
        <wui-cta-button
          label=${`Don't have ${O}?`}
          buttonLabel="Get"
          @click=${()=>f.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!R&&t?l`
        <wui-cta-button
          label=${`Don't have ${O}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:i&&r?l`
        <wui-cta-button
          label=${`Don't have ${O}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:n&&C?l`
        <wui-cta-button
          label=${`Don't have ${O}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&b.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&b.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&b.openHref(this.wallet.homepage,"_blank")}};Nt.styles=[_o];cn([y({type:Object})],Nt.prototype,"wallet",void 0);Nt=cn([p("w3m-mobile-download-links")],Nt);const To=W`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var me=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class L extends x{constructor(){super(),this.wallet=f.state.data?.wallet,this.connector=f.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=S.getWalletImage(this.wallet)??S.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=g.state.wcUri,this.error=g.state.wcError,this.ready=!1,this.showRetry=!1,this.label=void 0,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(g.subscribeKey("wcUri",e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),g.subscribeKey("wcError",e=>this.error=e)),(b.isTelegram()||b.isSafari())&&b.isIos()&&g.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),g.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let i="";return this.label?i=this.label:(i=`Continue in ${this.name}`,this.error&&(i="Connection declined")),l`
      <wui-flex
        data-error=${h(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${h(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text
            align="center"
            variant="paragraph-500"
            color=${this.error?"error-100":"fg-100"}
          >
            ${i}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?l`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?l`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){this.error&&!this.showRetry&&(this.showRetry=!0,this.shadowRoot?.querySelector("wui-button")?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"}))}onTryAgain(){g.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){const e=ii.state.themeVariables["--w3m-border-radius-master"],i=e?parseInt(e.replace("px",""),10):4;return l`<wui-loading-thumbnail radius=${i*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(b.copyToClopboard(this.uri),E.showSuccess("Link copied"))}catch{E.showError("Failed to copy")}}}L.styles=To;me([c()],L.prototype,"isRetrying",void 0);me([c()],L.prototype,"uri",void 0);me([c()],L.prototype,"error",void 0);me([c()],L.prototype,"ready",void 0);me([c()],L.prototype,"showRetry",void 0);me([c()],L.prototype,"label",void 0);me([c()],L.prototype,"secondaryBtnLabel",void 0);me([c()],L.prototype,"secondaryLabel",void 0);me([c()],L.prototype,"isLoading",void 0);me([y({type:Boolean})],L.prototype,"isMobile",void 0);me([y()],L.prototype,"onRetry",void 0);var No=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Fi=class extends L{constructor(){if(super(),this.externalViewUnsubscribe=[],this.connectionsByNamespace=g.getConnections(this.connector?.chain),this.hasMultipleConnections=this.connectionsByNamespace.length>0,this.remoteFeatures=v.state.remoteFeatures,this.currentActiveConnectorId=m.state.activeConnectorIds[this.connector?.chain],!this.connector)throw new Error("w3m-connecting-view: No connector provided");const e=this.connector?.chain;this.isAlreadyConnected(this.connector)&&(this.secondaryBtnLabel=void 0,this.label=`This account is already linked, change your account in ${this.connector.name}`,this.secondaryLabel=`To link a new account, open ${this.connector.name} and switch to the account you want to link`),I.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.connector.name??"Unknown",platform:"browser",displayIndex:this.wallet?.display_index}}),this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),this.isWalletConnect=!1,this.externalViewUnsubscribe.push(m.subscribeKey("activeConnectorIds",i=>{const n=i[e],o=this.remoteFeatures?.multiWallet;n!==this.currentActiveConnectorId&&(this.hasMultipleConnections&&o?(f.replace("ProfileWallets"),E.showSuccess("New Wallet Added")):B.close())}),g.subscribeKey("connections",this.onConnectionsChange.bind(this)))}disconnectedCallback(){this.externalViewUnsubscribe.forEach(e=>e())}async onConnectProxy(){try{if(this.error=!1,this.connector){if(this.isAlreadyConnected(this.connector))return;(this.connector.id!==k.CONNECTOR_ID.COINBASE_SDK||!this.error)&&(await g.connectExternal(this.connector,this.connector.chain),I.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.connector.name||"Unknown"}}))}}catch(e){I.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}onConnectionsChange(e){if(this.connector?.chain&&e.get(this.connector.chain)&&this.isAlreadyConnected(this.connector)){const i=e.get(this.connector.chain)??[],n=this.remoteFeatures?.multiWallet;if(i.length===0)f.replace("Connect");else{const o=Se.getConnectionsByConnectorId(this.connectionsByNamespace,this.connector.id).flatMap(s=>s.accounts),t=Se.getConnectionsByConnectorId(i,this.connector.id).flatMap(s=>s.accounts);t.length===0?this.hasMultipleConnections&&n?(f.replace("ProfileWallets"),E.showSuccess("Wallet deleted")):B.close():!o.every(r=>t.some(C=>te.isLowerCaseMatch(r.address,C.address)))&&n&&f.replace("ProfileWallets")}}}isAlreadyConnected(e){return!!e&&this.connectionsByNamespace.some(i=>te.isLowerCaseMatch(i.connectorId,e.id))}};Fi=No([p("w3m-connecting-external-view")],Fi);const Ro=W`
  wui-flex,
  wui-list-wallet {
    width: 100%;
  }
`;var un=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Rt=class extends x{constructor(){super(),this.unsubscribe=[],this.activeConnector=m.state.activeConnector,this.unsubscribe.push(m.subscribeKey("activeConnector",e=>this.activeConnector=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["m","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${h(S.getConnectorImage(this.activeConnector))}
          ></wui-wallet-image>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${["0","s","0","s"]}
        >
          <wui-text variant="paragraph-500" color="fg-100">
            Select Chain for ${this.activeConnector?.name}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${["xs","0","xs","0"]}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `}networksTemplate(){return this.activeConnector?.connectors?.map(e=>e.name?l`
            <wui-list-wallet
              imageSrc=${h(S.getChainImage(e.chain))}
              name=${k.CHAIN_NAME_MAP[e.chain]}
              @click=${()=>this.onConnector(e)}
              data-testid="wui-list-chain-${e.chain}"
            ></wui-list-wallet>
          `:null)}onConnector(e){const i=this.activeConnector?.connectors?.find(n=>n.chain===e.chain);if(!i){E.showError("Failed to find connector");return}i.id==="walletConnect"?b.isMobile()?f.push("AllWallets"):f.push("ConnectingWalletConnect"):f.push("ConnectingExternal",{connector:i})}};Rt.styles=Ro;un([c()],Rt.prototype,"activeConnector",void 0);Rt=un([p("w3m-connecting-multi-chain-view")],Rt);var Si=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ot=class extends x{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.generateTabs();return l`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const e=this.platforms.map(i=>i==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:i==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:i==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:i==="web"?{label:"Webapp",icon:"browser",platform:"web"}:i==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:i})=>i),e}onTabChange(e){const i=this.platformTabs[e];i&&this.onSelectPlatfrom?.(i)}};Si([y({type:Array})],Ot.prototype,"platforms",void 0);Si([y()],Ot.prototype,"onSelectPlatfrom",void 0);Ot=Si([p("w3m-connecting-header")],Ot);var Oo=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Vi=class extends L{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),I.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index}})}async onConnectProxy(){try{this.error=!1;const{connectors:e}=m.state,i=e.find(n=>n.type==="ANNOUNCED"&&n.info?.rdns===this.wallet?.rdns||n.type==="INJECTED"||n.name===this.wallet?.name);if(i)await g.connectExternal(i,i.chain);else throw new Error("w3m-connecting-wc-browser: No connector found");B.close(),I.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown"}})}catch(e){I.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};Vi=Oo([p("w3m-connecting-wc-browser")],Vi);var Po=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Gi=class extends L{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),I.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop",displayIndex:this.wallet?.display_index}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:e,name:i}=this.wallet,{redirect:n,href:o}=b.formatNativeUrl(e,this.uri);g.setWcLinking({name:i,href:o}),g.setRecentWallet(this.wallet),b.openHref(n,"_blank")}catch{this.error=!0}}};Gi=Po([p("w3m-connecting-wc-desktop")],Gi);var tt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Be=class extends L{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=v.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:e,link_mode:i,name:n}=this.wallet,{redirect:o,redirectUniversalLink:t,href:s}=b.formatNativeUrl(e,this.uri,i);this.redirectDeeplink=o,this.redirectUniversalLink=t,this.target=b.isIframe()?"_top":"_self",g.setWcLinking({name:n,href:s}),g.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?b.openHref(this.redirectUniversalLink,this.target):b.openHref(this.redirectDeeplink,this.target)}catch(e){I.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:e instanceof Error?e.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=q.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(g.subscribeKey("wcUri",()=>{this.onHandleURI()})),I.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile",displayIndex:this.wallet?.display_index}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){g.setWcError(!1),this.onConnect?.()}};tt([c()],Be.prototype,"redirectDeeplink",void 0);tt([c()],Be.prototype,"redirectUniversalLink",void 0);tt([c()],Be.prototype,"target",void 0);tt([c()],Be.prototype,"preferUniversalLinks",void 0);tt([c()],Be.prototype,"isLoading",void 0);Be=tt([p("w3m-connecting-wc-mobile")],Be);const Do=W`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;var jo=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ui=class extends L{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),I.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode",displayIndex:this.wallet?.display_index}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.getBoundingClientRect().width-40,i=this.wallet?this.wallet.name:void 0;return g.setWcLinking(void 0),g.setRecentWallet(this.wallet),l` <wui-qr-code
      size=${e}
      theme=${ii.state.themeMode}
      uri=${this.uri}
      imageSrc=${h(S.getWalletImage(this.wallet))}
      color=${h(ii.state.themeVariables["--w3m-qr-color"])}
      alt=${h(i)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return l`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};ui.styles=Do;ui=jo([p("w3m-connecting-wc-qrcode")],ui);var Lo=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ki=class extends x{constructor(){if(super(),this.wallet=f.state.data?.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");I.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index}})}render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${h(S.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Ki=Lo([p("w3m-connecting-wc-unsupported")],Ki);var dn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let di=class extends L{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=q.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(g.subscribeKey("wcUri",()=>{this.updateLoadingState()})),I.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web",displayIndex:this.wallet?.display_index}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:e,name:i}=this.wallet,{redirect:n,href:o}=b.formatUniversalUrl(e,this.uri);g.setWcLinking({name:i,href:o}),g.setRecentWallet(this.wallet),b.openHref(n,"_blank")}catch{this.error=!0}}};dn([c()],di.prototype,"isLoading",void 0);di=dn([p("w3m-connecting-wc-web")],di);var it=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ue=class extends x{constructor(){super(),this.wallet=f.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!v.state.siwx,this.remoteFeatures=v.state.remoteFeatures,this.displayBranding=!0,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(v.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return!this.remoteFeatures?.reownBranding||!this.displayBranding?null:l`<wui-ux-by-reown></wui-ux-by-reown>`}async initializeConnection(e=!1){if(!(this.platform==="browser"||v.state.manualWCControl&&!e))try{const{wcPairingExpiry:i,status:n}=g.state;if(e||v.state.enableEmbedded||b.isPairingExpired(i)||n==="connecting"){const o=g.getConnections(d.state.activeChain),t=this.remoteFeatures?.multiWallet,s=o.length>0;await g.connectWalletConnect({cache:"never"}),this.isSiwxEnabled||(s&&t?(f.replace("ProfileWallets"),E.showSuccess("New Wallet Added")):B.close())}}catch(i){if(i instanceof Error&&i.message.includes("An error occurred when attempting to switch chain")&&!v.state.enableNetworkSwitch&&d.state.activeChain){d.setActiveCaipNetwork(kn.getUnsupportedNetwork(`${d.state.activeChain}:${d.state.activeCaipNetwork?.id}`)),d.showUnsupportedChainUI();return}I.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:i?.message??"Unknown"}}),g.setWcError(!0),E.showError(i.message??"Connection error"),g.resetWcConnection(),f.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;const{mobile_link:e,desktop_link:i,webapp_link:n,injected:o,rdns:t}=this.wallet,s=o?.map(({injected_id:bn})=>bn).filter(Boolean),r=[...t?[t]:s??[]],C=v.state.isUniversalProvider?!1:r.length,R=e,O=n,K=g.checkInstalled(r),P=C&&K,mn=i&&!b.isMobile();P&&!d.state.noAdapters&&this.platforms.push("browser"),R&&this.platforms.push(b.isMobile()?"mobile":"qrcode"),O&&this.platforms.push("web"),mn&&this.platforms.push("desktop"),!P&&C&&!d.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return l`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return l`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return l`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return l`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return l`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return l`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?l`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){const i=this.shadowRoot?.querySelector("div");i&&(await i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};it([c()],Ue.prototype,"platform",void 0);it([c()],Ue.prototype,"platforms",void 0);it([c()],Ue.prototype,"isSiwxEnabled",void 0);it([c()],Ue.prototype,"remoteFeatures",void 0);it([y({type:Boolean})],Ue.prototype,"displayBranding",void 0);Ue=it([p("w3m-connecting-wc-view")],Ue);var ki=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Pt=class extends x{constructor(){super(),this.unsubscribe=[],this.isMobile=b.isMobile(),this.remoteFeatures=v.state.remoteFeatures,this.unsubscribe.push(v.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(this.isMobile){const{featured:e,recommended:i}=A.state,{customWallets:n}=v.state,o=de.getRecentWallets(),t=e.length||i.length||n?.length||o.length;return l`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${t?l`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return l`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
        <w3m-connecting-wc-view .displayBranding=${!1}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?l` <wui-flex flexDirection="column" .padding=${["3xs","0","3xs","0"]}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>`:null}};ki([c()],Pt.prototype,"isMobile",void 0);ki([c()],Pt.prototype,"remoteFeatures",void 0);Pt=ki([p("w3m-connecting-wc-basic-view")],Pt);const Bo=W`
  .continue-button-container {
    width: 100%;
  }
`;var pn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Dt=class extends x{constructor(){super(...arguments),this.loading=!1}render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{b.openHref(En.URLS.FAQ,"_blank")}}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return l` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0","xxl","0","xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          icon="id"
          size="xl"
          iconSize="xxl"
          iconColor="fg-200"
          backgroundColor="fg-200"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Choose your account name
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          Finally say goodbye to 0x addresses, name your account to make it easier to exchange
          assets
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return l`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button
        fullWidth
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${this.handleContinue.bind(this)}
        >Choose name
      </wui-button>
    </wui-flex>`}handleContinue(){f.push("RegisterAccountName"),I.sendEvent({type:"track",event:"OPEN_ENS_FLOW",properties:{isSmartAccount:ke(d.state.activeChain)===ue.ACCOUNT_TYPES.SMART_ACCOUNT}})}};Dt.styles=Bo;pn([c()],Dt.prototype,"loading",void 0);Dt=pn([p("w3m-choose-account-name-view")],Dt);var Uo=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Hi=class extends x{constructor(){super(...arguments),this.wallet=f.state.data?.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return l`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?l`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?l`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?l`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?l`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&b.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&b.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&b.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&b.openHref(this.wallet.homepage,"_blank")}};Hi=Uo([p("w3m-downloads-view")],Hi);var zo=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Mo="https://walletconnect.com/explorer";let qi=class extends x{render(){return l`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.recommendedWalletsTemplate()}
        <wui-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          @click=${()=>{b.openHref("https://walletconnect.com/explorer?type=wallet","_blank")}}
        ></wui-list-wallet>
      </wui-flex>
    `}recommendedWalletsTemplate(){const{recommended:e,featured:i}=A.state,{customWallets:n}=v.state;return[...i,...n??[],...e].slice(0,4).map(t=>l`
        <wui-list-wallet
          name=${t.name??"Unknown"}
          tagVariant="main"
          imageSrc=${h(S.getWalletImage(t))}
          @click=${()=>{b.openHref(t.homepage??Mo,"_blank")}}
        ></wui-list-wallet>
      `)}};qi=zo([p("w3m-get-wallet-view")],qi);var hn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let pi=class extends x{constructor(){super(...arguments),this.data=[]}render(){return l`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        ${this.data.map(e=>l`
            <wui-flex flexDirection="column" alignItems="center" gap="xl">
              <wui-flex flexDirection="row" justifyContent="center" gap="1xs">
                ${e.images.map(i=>l`<wui-visual name=${i}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="xxs">
              <wui-text variant="paragraph-500" color="fg-100" align="center">
                ${e.title}
              </wui-text>
              <wui-text variant="small-500" color="fg-200" align="center">${e.text}</wui-text>
            </wui-flex>
          `)}
      </wui-flex>
    `}};hn([y({type:Array})],pi.prototype,"data",void 0);pi=hn([p("w3m-help-widget")],pi);var Fo=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Vo=[{images:["login","profile","lock"],title:"One login for all of web3",text:"Log in to any app by connecting your wallet. Say goodbye to countless passwords!"},{images:["defi","nft","eth"],title:"A home for your digital assets",text:"A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."},{images:["browser","noun","dao"],title:"Your gateway to a new web",text:"With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."}];let Yi=class extends x{render(){return l`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${Vo}></w3m-help-widget>
        <wui-button variant="main" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `}onGetWallet(){I.sendEvent({type:"track",event:"CLICK_GET_WALLET"}),f.push("GetWallet")}};Yi=Fo([p("w3m-what-is-a-wallet-view")],Yi);const Go=W`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var wn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let jt=class extends x{constructor(){super(),this.unsubscribe=[],this.checked=Ct.state.isLegalCheckboxChecked,this.unsubscribe.push(Ct.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:i}=v.state,n=v.state.features?.legalCheckbox,t=!!(e||i)&&!!n,s=t&&!this.checked,r=s?-1:void 0;return l`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${t?["0","s","s","s"]:"s"}
        gap="xs"
        class=${h(s?"disabled":void 0)}
      >
        <w3m-wallet-login-list tabIdx=${h(r)}></w3m-wallet-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};jt.styles=Go;wn([c()],jt.prototype,"checked",void 0);jt=wn([p("w3m-connect-wallets-view")],jt);const Ko=_`
  :host {
    display: block;
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
  }

  svg {
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
  }

  use {
    stroke: var(--wui-color-accent-100);
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var Ho=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let hi=class extends N{render(){return w`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `}};hi.styles=[T,Ko];hi=Ho([p("wui-loading-hexagon")],hi);const qo=W`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`;var Ii=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ft=class extends x{constructor(){super(),this.network=f.state.data?.network,this.unsubscribe=[],this.showRetry=!1,this.error=!1}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.onSwitchNetwork()}render(){if(!this.network)throw new Error("w3m-network-switch-view: No network provided");this.onShowRetry();const e=this.getLabel(),i=this.getSubLabel();return l`
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","3xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${h(S.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error?null:l`<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            ?border=${!0}
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">${e}</wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${i}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="accent"
          size="md"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `}getSubLabel(){const e=m.getConnectorId(d.state.activeChain);return m.getAuthConnector()&&e===k.CONNECTOR_ID.AUTH?"":this.error?"Switch can be declined if chain is not supported by a wallet or previous request is still active":"Accept connection request in your wallet"}getLabel(){const e=m.getConnectorId(d.state.activeChain);return m.getAuthConnector()&&e===k.CONNECTOR_ID.AUTH?`Switching to ${this.network?.name??"Unknown"} network...`:this.error?"Switch declined":"Approve in wallet"}onShowRetry(){this.error&&!this.showRetry&&(this.showRetry=!0,this.shadowRoot?.querySelector("wui-button")?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"}))}async onSwitchNetwork(){try{this.error=!1,d.state.activeChain!==this.network?.chainNamespace&&d.setIsSwitchingNamespace(!0),this.network&&await d.switchActiveNetwork(this.network)}catch{this.error=!0}}};ft.styles=qo;Ii([c()],ft.prototype,"showRetry",void 0);Ii([c()],ft.prototype,"error",void 0);ft=Ii([p("w3m-network-switch-view")],ft);const Yo=_`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button[data-transparent='true'] {
    pointer-events: none;
    background-color: transparent;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-image {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: 100%;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }
`;var nt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let We=class extends N{constructor(){super(...arguments),this.imageSrc="",this.name="",this.disabled=!1,this.selected=!1,this.transparent=!1}render(){return w`
      <button data-transparent=${this.transparent} ?disabled=${this.disabled}>
        <wui-flex gap="s" alignItems="center">
          ${this.templateNetworkImage()}
          <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text></wui-flex
        >
        ${this.checkmarkTemplate()}
      </button>
    `}checkmarkTemplate(){return this.selected?w`<wui-icon size="sm" color="accent-100" name="checkmarkBold"></wui-icon>`:null}templateNetworkImage(){return this.imageSrc?w`<wui-image size="sm" src=${this.imageSrc} name=${this.name}></wui-image>`:this.imageSrc?null:w`<wui-network-image
        ?round=${!0}
        size="md"
        name=${this.name}
      ></wui-network-image>`}};We.styles=[T,D,Yo];nt([u()],We.prototype,"imageSrc",void 0);nt([u()],We.prototype,"name",void 0);nt([u({type:Boolean})],We.prototype,"disabled",void 0);nt([u({type:Boolean})],We.prototype,"selected",void 0);nt([u({type:Boolean})],We.prototype,"transparent",void 0);We=nt([p("wui-list-network")],We);const Xo=W`
  .container {
    max-height: 360px;
    overflow: auto;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
`;var xt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ze=class extends x{constructor(){super(),this.unsubscribe=[],this.network=d.state.activeCaipNetwork,this.requestedCaipNetworks=d.getCaipNetworks(),this.search="",this.onDebouncedSearch=b.debounce(e=>{this.search=e},100),this.unsubscribe.push(Re.subscribeNetworkImages(()=>this.requestUpdate()),d.subscribeKey("activeCaipNetwork",e=>this.network=e),d.subscribe(()=>{this.requestedCaipNetworks=d.getAllRequestedCaipNetworks()}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      ${this.templateSearchInput()}
      <wui-flex
        class="container"
        .padding=${["0","s","s","s"]}
        flexDirection="column"
        gap="xs"
      >
        ${this.networksTemplate()}
      </wui-flex>

      <wui-separator></wui-separator>

      <wui-flex padding="s" flexDirection="column" gap="m" alignItems="center">
        <wui-text variant="small-400" color="fg-300" align="center">
          Your connected wallet may not support some of the networks available for this dApp
        </wui-text>
        <wui-link @click=${this.onNetworkHelp.bind(this)}>
          <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
          What is a network
        </wui-link>
      </wui-flex>
    `}templateSearchInput(){return l`
      <wui-flex gap="xs" .padding=${["0","s","s","s"]}>
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="md"
          placeholder="Search network"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onNetworkHelp(){I.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),f.push("WhatIsANetwork")}networksTemplate(){const e=d.getAllApprovedCaipNetworkIds(),i=b.sortRequestedNetworks(e,this.requestedCaipNetworks);return this.search?this.filteredNetworks=i?.filter(n=>n?.name?.toLowerCase().includes(this.search.toLowerCase())):this.filteredNetworks=i,this.filteredNetworks?.map(n=>l`
        <wui-list-network
          .selected=${this.network?.id===n.id}
          imageSrc=${h(S.getNetworkImage(n))}
          type="network"
          name=${n.name??n.id}
          @click=${()=>this.onSwitchNetwork(n)}
          .disabled=${this.getNetworkDisabled(n)}
          data-testid=${`w3m-network-switch-${n.name??n.id}`}
        ></wui-list-network>
      `)}getNetworkDisabled(e){const i=e.chainNamespace,n=$.getCaipAddress(i),o=d.getAllApprovedCaipNetworkIds(),t=d.getNetworkProp("supportsAllNetworks",i)!==!1,s=m.getConnectorId(i),r=m.getAuthConnector(),C=s===k.CONNECTOR_ID.AUTH&&r;return!n||t||C?!1:!o?.includes(e.caipNetworkId)}onSwitchNetwork(e){In.onSwitchNetwork({network:e})}};ze.styles=Xo;xt([c()],ze.prototype,"network",void 0);xt([c()],ze.prototype,"requestedCaipNetworks",void 0);xt([c()],ze.prototype,"filteredNetworks",void 0);xt([c()],ze.prototype,"search",void 0);ze=xt([p("w3m-networks-view")],ze);const Qo=W`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    width: var(--wui-wallet-image-size-lg);
    height: var(--wui-wallet-image-size-lg);
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wui-ease-out-power-2) var(--wui-duration-lg),
      transform var(--wui-ease-out-power-2) var(--wui-duration-lg);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
  }

  .capitalize {
    text-transform: capitalize;
  }
`;var fn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Jo={eip155:"eth",solana:"solana",bip122:"bitcoin",polkadot:void 0};let Lt=class extends x{constructor(){super(...arguments),this.unsubscribe=[],this.switchToChain=f.state.data?.switchToChain,this.caipNetwork=f.state.data?.network,this.activeChain=d.state.activeChain}firstUpdated(){this.unsubscribe.push(d.subscribeKey("activeChain",e=>this.activeChain=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.switchToChain?k.CHAIN_NAME_MAP[this.switchToChain]:"supported";if(!this.switchToChain)return null;const i=k.CHAIN_NAME_MAP[this.switchToChain];return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="xl">
          <wui-visual name=${h(Jo[this.switchToChain])}></wui-visual>
          <wui-text
            data-testid=${`w3m-switch-active-chain-to-${i}`}
            variant="paragraph-500"
            color="fg-100"
            align="center"
            >Switch to <span class="capitalize">${i}</span></wui-text
          >
          <wui-text variant="small-400" color="fg-200" align="center">
            Connected wallet doesn't support connecting to ${e} chain. You
            need to connect with a different wallet.
          </wui-text>
          <wui-button
            data-testid="w3m-switch-active-chain-button"
            size="md"
            @click=${this.switchActiveChain.bind(this)}
            >Switch</wui-button
          >
        </wui-flex>
      </wui-flex>
    `}async switchActiveChain(){this.switchToChain&&(d.setIsSwitchingNamespace(!0),m.setFilterByNamespace(this.switchToChain),this.caipNetwork?await d.switchActiveNetwork(this.caipNetwork):d.setActiveNamespace(this.switchToChain),f.reset("Connect"))}};Lt.styles=Qo;fn([y()],Lt.prototype,"activeChain",void 0);Lt=fn([p("w3m-switch-active-chain-view")],Lt);var Zo=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const es=[{images:["network","layers","system"],title:"The system’s nuts and bolts",text:"A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."},{images:["noun","defiAlt","dao"],title:"Designed for different uses",text:"Each network is designed differently, and may therefore suit certain apps and experiences."}];let Xi=class extends x{render(){return l`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${es}></w3m-help-widget>
        <wui-button
          variant="main"
          size="md"
          @click=${()=>{b.openHref("https://ethereum.org/en/developers/docs/networks/","_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};Xi=Zo([p("w3m-what-is-a-network-view")],Xi);const ts=W`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var Ai=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let mt=class extends x{constructor(){super(),this.swapUnsupportedChain=f.state.data?.swapUnsupportedChain,this.unsubscribe=[],this.disconnecting=!1,this.remoteFeatures=v.state.remoteFeatures,this.unsubscribe.push(Re.subscribeNetworkImages(()=>this.requestUpdate()),v.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      <wui-flex class="container" flexDirection="column" gap="0">
        <wui-flex
          class="container"
          flexDirection="column"
          .padding=${["m","xl","xs","xl"]}
          alignItems="center"
          gap="xl"
        >
          ${this.descriptionTemplate()}
        </wui-flex>

        <wui-flex flexDirection="column" padding="s" gap="xs">
          ${this.networksTemplate()}
        </wui-flex>

        <wui-separator text="or"></wui-separator>
        <wui-flex flexDirection="column" padding="s" gap="xs">
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}descriptionTemplate(){return this.swapUnsupportedChain?l`
        <wui-text variant="small-400" color="fg-200" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      `:l`
      <wui-text variant="small-400" color="fg-200" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `}networksTemplate(){const e=d.getAllRequestedCaipNetworks(),i=d.getAllApprovedCaipNetworkIds(),n=b.sortRequestedNetworks(i,e);return(this.swapUnsupportedChain?n.filter(t=>q.SWAP_SUPPORTED_NETWORKS.includes(t.caipNetworkId)):n).map(t=>l`
        <wui-list-network
          imageSrc=${h(S.getNetworkImage(t))}
          name=${t.name??"Unknown"}
          @click=${()=>this.onSwitchNetwork(t)}
        >
        </wui-list-network>
      `)}async onDisconnect(){try{this.disconnecting=!0;const e=d.state.activeChain,n=g.getConnections(e).length>0,o=e&&m.state.activeConnectorIds[e],t=this.remoteFeatures?.multiWallet;await g.disconnect(t?{id:o,namespace:e}:{}),n&&t&&(f.push("ProfileWallets"),E.showSuccess("Wallet deleted"))}catch{I.sendEvent({type:"track",event:"DISCONNECT_ERROR",properties:{message:"Failed to disconnect"}}),E.showError("Failed to disconnect")}finally{this.disconnecting=!1}}async onSwitchNetwork(e){const i=$.state.caipAddress,n=d.getAllApprovedCaipNetworkIds(),o=d.getNetworkProp("supportsAllNetworks",e.chainNamespace),t=f.state.data;i?n?.includes(e.caipNetworkId)?await d.switchActiveNetwork(e):o?f.push("SwitchNetwork",{...t,network:e}):f.push("SwitchNetwork",{...t,network:e}):i||(d.setActiveCaipNetwork(e),f.push("Connect"))}};mt.styles=ts;Ai([c()],mt.prototype,"disconnecting",void 0);Ai([c()],mt.prototype,"remoteFeatures",void 0);mt=Ai([p("w3m-unsupported-chain-view")],mt);const is=_`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`;var Wi=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let bt=class extends N{constructor(){super(...arguments),this.icon="externalLink",this.text=""}render(){return w`
      <wui-flex gap="1xs" alignItems="center">
        <wui-icon-box
          size="sm"
          iconcolor="fg-200"
          backgroundcolor="fg-200"
          icon=${this.icon}
          background="transparent"
        ></wui-icon-box>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `}};bt.styles=[T,D,is];Wi([u()],bt.prototype,"icon",void 0);Wi([u()],bt.prototype,"text",void 0);bt=Wi([p("wui-banner")],bt);const ns=W`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var os=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let wi=class extends x{constructor(){super(),this.unsubscribe=[]}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l` <wui-flex
      flexDirection="column"
      .padding=${["xs","s","m","s"]}
      gap="xs"
    >
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){const e=d.getAllRequestedCaipNetworks(),i=d.getAllApprovedCaipNetworkIds(),n=d.state.activeCaipNetwork,o=d.checkIfSmartAccountEnabled();let t=b.sortRequestedNetworks(i,e);if(o&&ke(n?.chainNamespace)===ue.ACCOUNT_TYPES.SMART_ACCOUNT){if(!n)return null;t=[n]}return t.filter(r=>r.chainNamespace===n?.chainNamespace).map(r=>l`
        <wui-list-network
          imageSrc=${h(S.getNetworkImage(r))}
          name=${r.name??"Unknown"}
          ?transparent=${!0}
        >
        </wui-list-network>
      `)}};wi.styles=ns;wi=os([p("w3m-wallet-compatible-networks-view")],wi);const ss=_`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--wui-icon-box-size-xl);
    height: var(--wui-icon-box-size-xl);
    box-shadow: 0 0 0 8px var(--wui-thumbnail-border);
    border-radius: var(--local-border-radius);
    overflow: hidden;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`;var Zt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Qe=class extends N{render(){return this.style.cssText=`--local-border-radius: ${this.borderRadiusFull?"1000px":"20px"}; background-color: var(--wui-color-modal-bg);`,w`${this.templateVisual()}`}templateVisual(){return this.imageSrc?w`<wui-image src=${this.imageSrc} alt=${this.alt??""}></wui-image>`:w`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};Qe.styles=[T,ss];Zt([u()],Qe.prototype,"imageSrc",void 0);Zt([u()],Qe.prototype,"alt",void 0);Zt([u({type:Boolean})],Qe.prototype,"borderRadiusFull",void 0);Qe=Zt([p("wui-visual-thumbnail")],Qe);const as=W`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;var rs=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let fi=class extends x{constructor(){super(...arguments),this.dappImageUrl=v.state.metadata?.icons,this.walletImageUrl=$.state.connectedWalletInfo?.icon}firstUpdated(){const e=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");e?.[0]&&this.createAnimation(e[0],"translate(18px)"),e?.[1]&&this.createAnimation(e[1],"translate(-18px)")}render(){return l`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(e,i){e.animate([{transform:"translateX(0px)"},{transform:i}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};fi.styles=as;fi=rs([p("w3m-siwx-sign-message-thumbnails")],fi);var Ei=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Bt=class extends x{constructor(){super(...arguments),this.dappName=v.state.metadata?.name,this.isCancelling=!1,this.isSigning=!1}render(){return l`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-siwx-sign-message-thumbnails></w3m-siwx-sign-message-thumbnails>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          ${this.isCancelling?"Cancelling...":"Cancel"}
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}async onSign(){this.isSigning=!0;try{await _i.requestSignMessage()}catch(e){if(e instanceof Error&&e.message.includes("OTP is required")){E.showError({message:"Something went wrong. We need to verify your account again."}),f.replace("DataCapture");return}throw e}finally{this.isSigning=!1}}async onCancel(){this.isCancelling=!0,await _i.cancelSignMessage().finally(()=>this.isCancelling=!1)}};Ei([c()],Bt.prototype,"isCancelling",void 0);Ei([c()],Bt.prototype,"isSigning",void 0);Bt=Ei([p("w3m-siwx-sign-message-view")],Bt);export{Ni as AppKitAccountButton,Oi as AppKitButton,Di as AppKitConnectButton,Li as AppKitNetworkButton,Ti as W3mAccountButton,pe as W3mAccountSettingsView,ai as W3mAccountView,At as W3mAllWalletsView,Ri as W3mButton,Dt as W3mChooseAccountNameView,Pi as W3mConnectButton,Q as W3mConnectView,jt as W3mConnectWalletsView,Fi as W3mConnectingExternalView,Rt as W3mConnectingMultiChainView,Pt as W3mConnectingWcBasicView,Ue as W3mConnectingWcView,Hi as W3mDownloadsView,qi as W3mGetWalletView,ji as W3mNetworkButton,ft as W3mNetworkSwitchView,ze as W3mNetworksView,z as W3mProfileWalletsView,kr as W3mRouter,Bt as W3mSIWXSignMessageView,Lt as W3mSwitchActiveChainView,mt as W3mUnsupportedChainView,wi as W3mWalletCompatibleNetworksView,Xi as W3mWhatIsANetworkView,Yi as W3mWhatIsAWalletView};
