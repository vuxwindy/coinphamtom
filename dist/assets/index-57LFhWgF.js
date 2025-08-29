import{O as h,a5 as w,P as e,T as y}from"./index-NVPnfjv5.js";import{r as u}from"./class-map-BfYkPkqt.js";import{c as f,a as g}from"./index-CLkz0d9K.js";import"./index-BsWWBOlI.js";import{H as v}from"./HelpersUtil-C0uqyoDt.js";const b=f`
  :host {
    display: block;
  }

  div.container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: auto;
    display: block;
  }

  div.container[status='hide'] {
    animation: fade-out;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:n})=>n["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: 0s;
  }

  div.container[status='show'] {
    animation: fade-in;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:n})=>n["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      filter: blur(6px);
    }
    to {
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      filter: blur(0px);
    }
    to {
      opacity: 0;
      filter: blur(6px);
    }
  }
`;var p=function(n,t,a,s){var r=arguments.length,i=r<3?t:s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(n,t,a,s);else for(var c=n.length-1;c>=0;c--)(o=n[c])&&(i=(r<3?o(i):r>3?o(t,a,i):o(t,a))||i);return r>3&&i&&Object.defineProperty(t,a,i),i};let l=class extends h{constructor(){super(...arguments),this.resizeObserver=void 0,this.unsubscribe=[],this.status="hide",this.view=w.state.view}firstUpdated(){this.status=v.hasFooter()?"show":"hide",this.unsubscribe.push(w.subscribeKey("view",t=>{this.view=t,this.status=v.hasFooter()?"show":"hide",this.status==="hide"&&document.documentElement.style.setProperty("--apkt-footer-height","0px")})),this.resizeObserver=new ResizeObserver(t=>{for(const a of t)if(a.target===this.getWrapper()){const s=`${a.contentRect.height}px`;document.documentElement.style.setProperty("--apkt-footer-height",s)}}),this.resizeObserver.observe(this.getWrapper())}render(){return e`
      <div class="container" status=${this.status}>${this.templatePageContainer()}</div>
    `}templatePageContainer(){return v.hasFooter()?e` ${this.templateFooter()}`:null}templateFooter(){switch(this.view){case"Networks":return this.templateNetworksFooter();case"Connect":case"ConnectWallets":case"OnRampFiatSelect":case"OnRampTokenSelect":return e`<w3m-legal-footer></w3m-legal-footer>`;case"OnRampProviders":return e`<w3m-onramp-providers-footer></w3m-onramp-providers-footer>`;default:return null}}templateNetworksFooter(){return e` <wui-flex
      class="footer-in"
      padding="3"
      flexDirection="column"
      gap="3"
      alignItems="center"
    >
      <wui-text variant="md-regular" color="secondary" align="center">
        Your connected wallet may not support some of the networks available for this dApp
      </wui-text>
      <wui-link @click=${this.onNetworkHelp.bind(this)}>
        <wui-icon size="sm" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
        What is a network
      </wui-link>
    </wui-flex>`}onNetworkHelp(){y.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),w.push("WhatIsANetwork")}getWrapper(){return this.shadowRoot?.querySelector("div.container")}};l.styles=[b];p([u()],l.prototype,"status",void 0);p([u()],l.prototype,"view",void 0);l=p([g("w3m-footer")],l);const k=f`
  :host {
    display: block;
    width: inherit;
  }
`;var d=function(n,t,a,s){var r=arguments.length,i=r<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,a):s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(n,t,a,s);else for(var c=n.length-1;c>=0;c--)(o=n[c])&&(i=(r<3?o(i):r>3?o(t,a,i):o(t,a))||i);return r>3&&i&&Object.defineProperty(t,a,i),i};let m=class extends h{constructor(){super(),this.unsubscribe=[],this.viewState=w.state.view,this.history=w.state.history.join(","),this.unsubscribe.push(w.subscribeKey("view",()=>{this.history=w.state.history.join(","),document.documentElement.style.setProperty("--apkt-duration-dynamic","var(--apkt-durations-lg)")}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),document.documentElement.style.setProperty("--apkt-duration-dynamic","0s")}render(){return e`${this.templatePageContainer()}`}templatePageContainer(){return e`<w3m-router-container
      history=${this.history}
      .setView=${()=>{this.viewState=w.state.view}}
    >
      ${this.viewTemplate(this.viewState)}
    </w3m-router-container>`}viewTemplate(t){switch(t){case"AccountSettings":return e`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return e`<w3m-account-view></w3m-account-view>`;case"AllWallets":return e`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return e`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return e`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return e`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":return e`<w3m-connect-view></w3m-connect-view>`;case"Create":return e`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return e`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return e`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return e`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return e`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return e`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return e`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return e`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"DataCapture":return e`<w3m-data-capture-view></w3m-data-capture-view>`;case"DataCaptureOtpConfirm":return e`<w3m-data-capture-otp-confirm-view></w3m-data-capture-otp-confirm-view>`;case"Downloads":return e`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return e`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return e`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return e`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return e`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return e`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return e`<w3m-network-switch-view></w3m-network-switch-view>`;case"ProfileWallets":return e`<w3m-profile-wallets-view></w3m-profile-wallets-view>`;case"Transactions":return e`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return e`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampTokenSelect":return e`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return e`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return e`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return e`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return e`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return e`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return e`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return e`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return e`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return e`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return e`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return e`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return e`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WhatIsABuy":return e`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return e`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return e`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return e`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return e`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return e`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return e`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return e`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return e`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return e`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return e`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return e`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return e`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case"Pay":return e`<w3m-pay-view></w3m-pay-view>`;case"PayLoading":return e`<w3m-pay-loading-view></w3m-pay-loading-view>`;case"FundWallet":return e`<w3m-fund-wallet-view></w3m-fund-wallet-view>`;case"PayWithExchange":return e`<w3m-deposit-from-exchange-view></w3m-deposit-from-exchange-view>`;case"PayWithExchangeSelectAsset":return e`<w3m-deposit-from-exchange-select-asset-view></w3m-deposit-from-exchange-select-asset-view>`;default:return e`<w3m-connect-view></w3m-connect-view>`}}};m.styles=[k];d([u()],m.prototype,"viewState",void 0);d([u()],m.prototype,"history",void 0);m=d([g("w3m-router")],m);export{m as W,l as a};
