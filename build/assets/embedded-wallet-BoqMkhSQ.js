import{i as N,a as y,x as l,r as p,n as P}from"./state-Cf6Acp3J.js";import{aF as _,aJ as j,af as k,aH as A,bm as z,ad as I,S as F,T as H,V,W as w,a2 as C,bn as m,aa as O,a8 as W,a3 as v,a4 as x,a6 as $,a5 as S,a0 as K,$ as B}from"./index-W7O16Knq.js";import{c as f,n as g}from"./index-KkpI0fgd.js";import{H as R,N as G}from"./HelpersUtil-DNixBIjv.js";import{e as Y,n as L}from"./ref-D8lD3BzL.js";import{o as q}from"./if-defined-Cjow_KMx.js";import"./index-XAL8BJnK.js";import"./index-DkewI-3x.js";import"./index-Cqg5Vvc8.js";import"./index-BkuMDALp.js";import"./index-Sz6pSxEn.js";import"./index-NtF0e3ax.js";import"./index-BTClOK_9.js";import"./index-DsLsIr5D.js";import"./index-DgA7GKrI.js";import"./ref-DVXAuq4D.js";const X=N`
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;var M=function(s,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(s,e,t,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};const T=600,D=360,J=64;let b=class extends y{constructor(){super(),this.bodyObserver=void 0,this.unsubscribe=[],this.iframe=document.getElementById("w3m-iframe"),this.ready=!1,this.unsubscribe.push(_.subscribeKey("open",e=>{e||this.onHideIframe()}),_.subscribeKey("shake",e=>{e?this.iframe.style.animation="w3m-shake 500ms var(--wui-ease-out-power-2)":this.iframe.style.animation="none"}))}disconnectedCallback(){this.onHideIframe(),this.unsubscribe.forEach(e=>e()),this.bodyObserver?.unobserve(window.document.body)}async firstUpdated(){await this.syncTheme(),this.iframe.style.display="block";const e=this?.renderRoot?.querySelector("div");this.bodyObserver=new ResizeObserver(t=>{const o=t?.[0]?.contentBoxSize?.[0]?.inlineSize;this.iframe.style.height=`${T}px`,e.style.height=`${T}px`,j.state.enableEmbedded?this.updateFrameSizeForEmbeddedMode():o&&o<=430?(this.iframe.style.width="100%",this.iframe.style.left="0px",this.iframe.style.bottom="0px",this.iframe.style.top="unset",this.onShowIframe()):(this.iframe.style.width=`${D}px`,this.iframe.style.left=`calc(50% - ${D/2}px)`,this.iframe.style.top=`calc(50% - ${T/2}px + ${J/2}px)`,this.iframe.style.bottom="unset",this.onShowIframe())}),this.bodyObserver.observe(window.document.body)}render(){return l`<div data-ready=${this.ready} id="w3m-frame-container"></div>`}onShowIframe(){const e=window.innerWidth<=430;this.ready=!0,this.iframe.style.animation=e?"w3m-iframe-zoom-in-mobile 200ms var(--wui-ease-out-power-2)":"w3m-iframe-zoom-in 200ms var(--wui-ease-out-power-2)"}onHideIframe(){this.iframe.style.display="none",this.iframe.style.animation="w3m-iframe-fade-out 200ms var(--wui-ease-out-power-2)"}async syncTheme(){const e=k.getAuthConnector();if(e){const t=A.getSnapshot().themeMode,n=A.getSnapshot().themeVariables;await e.provider.syncTheme({themeVariables:n,w3mThemeVariables:z(n,t)})}}async updateFrameSizeForEmbeddedMode(){const e=this?.renderRoot?.querySelector("div");await new Promise(n=>{setTimeout(n,300)});const t=this.getBoundingClientRect();e.style.width="100%",this.iframe.style.left=`${t.left}px`,this.iframe.style.top=`${t.top}px`,this.iframe.style.width=`${t.width}px`,this.iframe.style.height=`${t.height}px`,this.onShowIframe()}};b.styles=X;M([p()],b.prototype,"ready",void 0);b=M([f("w3m-approve-transaction-view")],b);var Q=function(s,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(s,e,t,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let U=class extends y{render(){return l`
      <wui-flex flexDirection="column" alignItems="center" gap="xl" padding="xl">
        <wui-text variant="paragraph-400" color="fg-100">Follow the instructions on</wui-text>
        <wui-chip
          icon="externalLink"
          variant="fill"
          href=${I.SECURE_SITE_DASHBOARD}
          imageSrc=${I.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-chip>
        <wui-text variant="small-400" color="fg-200">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `}};U=Q([f("w3m-upgrade-wallet-view")],U);const Z=F`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  .error {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }

  .base-name {
    position: absolute;
    right: 45px;
    top: 15px;
    text-align: right;
  }
`;var h=function(s,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(s,e,t,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let c=class extends V{constructor(){super(...arguments),this.disabled=!1,this.loading=!1}render(){return w`
      <wui-input-text
        value=${q(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value||""}
        data-testid="wui-ens-input"
        inputRightPadding="5xl"
        .onKeyDown=${this.onKeyDown}
      >
        ${this.baseNameTemplate()} ${this.errorTemplate()}${this.loadingTemplate()}
      </wui-input-text>
    `}baseNameTemplate(){return w`<wui-text variant="paragraph-400" color="fg-200" class="base-name">
      ${C.WC_NAME_SUFFIX}
    </wui-text>`}loadingTemplate(){return this.loading?w`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}errorTemplate(){return this.errorMessage?w`<wui-text variant="tiny-500" color="error-100" class="error"
        >${this.errorMessage}</wui-text
      >`:null}};c.styles=[H,Z];h([g()],c.prototype,"errorMessage",void 0);h([g({type:Boolean})],c.prototype,"disabled",void 0);h([g()],c.prototype,"value",void 0);h([g({type:Boolean})],c.prototype,"loading",void 0);h([g({attribute:!1})],c.prototype,"onKeyDown",void 0);c=h([f("wui-ens-input")],c);const ee=N`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    border: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    padding: var(--wui-spacing-m);
  }

  .suggestion:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .suggestion:focus-visible:not(:disabled) {
    outline: 1px solid var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-005);
  }

  .suggestion:hover:not(:disabled) {
    background-color: var(--wui-color-gray-glass-005);
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
    position: relative;
  }

  .input-submit-button,
  .input-loading-spinner {
    position: absolute;
    top: 26px;
    transform: translateY(-50%);
    right: 10px;
  }
`;var d=function(s,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(s,e,t,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let u=class extends y{constructor(){super(),this.formRef=Y(),this.usubscribe=[],this.name="",this.error="",this.loading=m.state.loading,this.suggestions=m.state.suggestions,this.profileName=O.state.profileName,this.onDebouncedNameInputChange=W.debounce(e=>{e.length<4?this.error="Name must be at least 4 characters long":R.isValidReownName(e)?(this.error="",m.getSuggestions(e)):this.error="The value is not a valid username"}),this.usubscribe.push(m.subscribe(e=>{this.suggestions=e.suggestions,this.loading=e.loading}),O.subscribeKey("profileName",e=>{this.profileName=e,e&&(this.error="You already own a name")}))}firstUpdated(){this.formRef.value?.addEventListener("keydown",this.onEnterKey.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.usubscribe.forEach(e=>e()),this.formRef.value?.removeEventListener("keydown",this.onEnterKey.bind(this))}render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="m"
        .padding=${["0","s","m","s"]}
      >
        <form ${L(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
            .onKeyDown=${this.onKeyDown.bind(this)}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `}submitButtonTemplate(){const e=this.suggestions.find(n=>n.name?.split(".")?.[0]===this.name&&n.registered);if(this.loading)return l`<wui-loading-spinner
        class="input-loading-spinner"
        color="fg-200"
      ></wui-loading-spinner>`;const t=`${this.name}${C.WC_NAME_SUFFIX}`;return l`
      <wui-icon-link
        .disabled=${e}
        class="input-submit-button"
        size="sm"
        icon="chevronRight"
        iconColor=${e?"fg-200":"accent-100"}
        @click=${()=>this.onSubmitName(t)}
      >
      </wui-icon-link>
    `}onNameInputChange(e){const t=R.validateReownName(e.detail||"");this.name=t,this.onDebouncedNameInputChange(t)}onKeyDown(e){e.key.length===1&&!R.isValidReownName(e.key)&&e.preventDefault()}nameSuggestionTagTemplate(e){return this.loading?l`<wui-loading-spinner color="fg-200"></wui-loading-spinner>`:e.registered?l`<wui-tag variant="shade" size="lg">Registered</wui-tag>`:l`<wui-tag variant="success" size="lg">Available</wui-tag>`}templateSuggestions(){return!this.name||this.name.length<4||this.error?null:l`<wui-flex flexDirection="column" gap="xxs" alignItems="center">
      ${this.suggestions.map(e=>l`<button
            .disabled=${e.registered||this.loading}
            data-testid="account-name-suggestion"
            class="suggestion"
            @click=${()=>this.onSubmitName(e.name)}
          >
            <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
              ${e.name}</wui-text
            >${this.nameSuggestionTagTemplate(e)}
          </button>`)}
    </wui-flex>`}isAllowedToSubmit(e){const t=e.split(".")?.[0],n=this.suggestions.find(o=>o.name?.split(".")?.[0]===t&&o.registered);return!this.loading&&!this.error&&!this.profileName&&t&&m.validateName(t)&&!n}async onSubmitName(e){try{if(!this.isAllowedToSubmit(e))return;v.sendEvent({type:"track",event:"REGISTER_NAME_INITIATED",properties:{isSmartAccount:x($.state.activeChain)===S.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:e}}),await m.registerName(e),v.sendEvent({type:"track",event:"REGISTER_NAME_SUCCESS",properties:{isSmartAccount:x($.state.activeChain)===S.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:e}})}catch(t){K.showError(t.message),v.sendEvent({type:"track",event:"REGISTER_NAME_ERROR",properties:{isSmartAccount:x($.state.activeChain)===S.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:e,error:t?.message||"Unknown error"}})}}onEnterKey(e){if(e.key==="Enter"&&this.name&&this.isAllowedToSubmit(this.name)){const t=`${this.name}${C.WC_NAME_SUFFIX}`;this.onSubmitName(t)}}};u.styles=ee;d([P()],u.prototype,"errorMessage",void 0);d([p()],u.prototype,"name",void 0);d([p()],u.prototype,"error",void 0);d([p()],u.prototype,"loading",void 0);d([p()],u.prototype,"suggestions",void 0);d([p()],u.prototype,"profileName",void 0);u=d([f("w3m-register-account-name-view")],u);const te=N`
  .continue-button-container {
    width: 100%;
  }
`;var ie=function(s,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(s,e,t,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let E=class extends y{render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{W.openHref(G.URLS.FAQ,"_blank")}}
        >
          Learn more
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
          size="xl"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return l`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`}redirectToAccount(){B.replace("Account")}};E.styles=te;E=ie([f("w3m-register-account-name-success-view")],E);export{b as W3mApproveTransactionView,E as W3mRegisterAccountNameSuccess,u as W3mRegisterAccountNameView,U as W3mUpgradeWalletView};
