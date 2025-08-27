import{i as N,a as y,x as d,r as g}from"./state-Cf6Acp3J.js";import{o as C}from"./if-defined-BKrOdqAi.js";import{S as $,T as R,U as I,V as A,W as p,aa as m,a6 as l,a0 as f,aG as h,aH as b,a4 as T,a5 as S,$ as O,a8 as _}from"./index-W7O16Knq.js";import{n as v,c as x,U as E}from"./index-KkpI0fgd.js";import"./index-DU1pprzb.js";import"./index-Cqg5Vvc8.js";import"./index-DgA7GKrI.js";import"./index-fD5z2hcm.js";const W=$`
  button {
    display: flex;
    gap: var(--wui-spacing-xl);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-m) var(--wui-spacing-s);
  }

  wui-text {
    width: 100%;
  }

  wui-flex {
    width: auto;
  }

  .network-icon {
    width: var(--wui-spacing-2l);
    height: var(--wui-spacing-2l);
    border-radius: calc(var(--wui-spacing-2l) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`;var k=function(n,e,i,r){var o=arguments.length,t=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(n,e,i,r);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let u=class extends A{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return p`
      <button>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){const e=this.networkImages.slice(0,5);return p` <wui-flex class="networks">
      ${e?.map(i=>p` <wui-flex class="network-icon"> <wui-image src=${i}></wui-image> </wui-flex>`)}
    </wui-flex>`}};u.styles=[R,I,W];k([v({type:Array})],u.prototype,"networkImages",void 0);k([v()],u.prototype,"text",void 0);u=k([x("wui-compatible-network")],u);const U=N`
  wui-compatible-network {
    margin-top: var(--wui-spacing-l);
  }
`;var w=function(n,e,i,r){var o=arguments.length,t=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(n,e,i,r);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(t=(o<3?s(t):o>3?s(e,i,t):s(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let c=class extends y{constructor(){super(),this.unsubscribe=[],this.address=m.state.address,this.profileName=m.state.profileName,this.network=l.state.activeCaipNetwork,this.unsubscribe.push(m.subscribe(e=>{e.address?(this.address=e.address,this.profileName=e.profileName):f.showError("Account not found")}),l.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-wallet-receive-view: No account provided");const e=h.getNetworkImage(this.network);return d` <wui-flex
      flexDirection="column"
      .padding=${["0","l","l","l"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${E.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${e||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["l","0","0","0"]}
        alignItems="center"
        gap="s"
      >
        <wui-qr-code
          size=${232}
          theme=${b.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${C(b.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="paragraph-500" color="fg-100" align="center">
          Copy your address or scan this QR code
        </wui-text>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){const e=l.getAllRequestedCaipNetworks(),i=l.checkIfSmartAccountEnabled(),r=l.state.activeCaipNetwork,o=e.filter(a=>a?.chainNamespace===r?.chainNamespace);if(T(r?.chainNamespace)===S.ACCOUNT_TYPES.SMART_ACCOUNT&&i)return r?d`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[h.getNetworkImage(r)??""]}
      ></wui-compatible-network>`:null;const s=(o?.filter(a=>a?.assets?.imageId)?.slice(0,5)).map(h.getNetworkImage).filter(Boolean);return d`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${s}
    ></wui-compatible-network>`}onReceiveClick(){O.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(_.copyToClopboard(this.address),f.showSuccess("Address copied"))}catch{f.showError("Failed to copy")}}};c.styles=U;w([g()],c.prototype,"address",void 0);w([g()],c.prototype,"profileName",void 0);w([g()],c.prototype,"network",void 0);c=w([x("w3m-wallet-receive-view")],c);export{c as W3mWalletReceiveView};
