import{O as S,X as C,a3 as h,P as c,Y as K,T as R,a5 as v,U as L,V as M,ay as F,a8 as Q,a9 as q}from"./index-NVPnfjv5.js";import{r as l,n as w}from"./class-map-BfYkPkqt.js";import{c as I,a as P,r as B,e as H}from"./index-CLkz0d9K.js";import"./index-C42XPWu1.js";import"./index-Da51eeM5.js";import{M as U}from"./index-BFSKGv0e.js";import"./index-I5B69LTJ.js";import{S as r}from"./SwapController-DE9zMn-9.js";import"./index-BlrLXFjb.js";import"./index-Omz1xuYD.js";import"./index-BCnPW0XB.js";import"./index-CpoP7b4K.js";import"./index-BcQ7MX80.js";import"./if-defined-Cb88xRGe.js";const G={numericInputKeyDown(e,t,o){const n=["Backspace","Meta","Ctrl","a","A","c","C","x","X","v","V","ArrowLeft","ArrowRight","Tab"],s=e.metaKey||e.ctrlKey,i=e.key,a=i.toLocaleLowerCase(),u=a==="a",D=a==="c",W=a==="v",z=a==="x",_=i===",",j=i===".",O=i>="0"&&i<="9";!s&&(u||D||W||z)&&e.preventDefault(),t==="0"&&!_&&!j&&i==="0"&&e.preventDefault(),t==="0"&&O&&(o(i),e.preventDefault()),(_||j)&&(t||(o("0."),e.preventDefault()),(t?.includes(".")||t?.includes(","))&&e.preventDefault()),!O&&!n.includes(i)&&!j&&!_&&e.preventDefault()}},Y=I`
  :host {
    width: 100%;
  }

  .details-container > wui-flex {
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[3]};
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[3]};
    cursor: pointer;
  }

  .details-content-container {
    padding: ${({spacing:e})=>e[2]};
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({spacing:e})=>e[3]};
    padding-left: ${({spacing:e})=>e[3]};
    padding-right: ${({spacing:e})=>e[2]};
    border-radius: calc(
      ${({borderRadius:e})=>e[1]} + ${({borderRadius:e})=>e[1]}
    );
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .details-row-title {
    white-space: nowrap;
  }

  .details-row.provider-free-row {
    padding-right: ${({spacing:e})=>e[2]};
  }
`;var x=function(e,t,o,n){var s=arguments.length,i=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,n);else for(var u=e.length-1;u>=0;u--)(a=e[u])&&(i=(s<3?a(i):s>3?a(t,o,i):a(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i};const X=K.CONVERT_SLIPPAGE_TOLERANCE;let g=class extends S{constructor(){super(),this.unsubscribe=[],this.networkName=C.state.activeCaipNetwork?.name,this.detailsOpen=!1,this.sourceToken=r.state.sourceToken,this.toToken=r.state.toToken,this.toTokenAmount=r.state.toTokenAmount,this.sourceTokenPriceInUSD=r.state.sourceTokenPriceInUSD,this.toTokenPriceInUSD=r.state.toTokenPriceInUSD,this.priceImpact=r.state.priceImpact,this.maxSlippage=r.state.maxSlippage,this.networkTokenSymbol=r.state.networkTokenSymbol,this.inputError=r.state.inputError,this.unsubscribe.push(r.subscribe(t=>{this.sourceToken=t.sourceToken,this.toToken=t.toToken,this.toTokenAmount=t.toTokenAmount,this.priceImpact=t.priceImpact,this.maxSlippage=t.maxSlippage,this.sourceTokenPriceInUSD=t.sourceTokenPriceInUSD,this.toTokenPriceInUSD=t.toTokenPriceInUSD,this.inputError=t.inputError}))}render(){const t=this.toTokenAmount&&this.maxSlippage?h.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString():null;if(!this.sourceToken||!this.toToken||this.inputError)return null;const o=this.sourceTokenPriceInUSD&&this.toTokenPriceInUSD?1/this.toTokenPriceInUSD*this.sourceTokenPriceInUSD:0;return c`
      <wui-flex flexDirection="column" alignItems="center" gap="01" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${["0","2","0","2"]}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="2">
                <wui-text variant="sm-regular" color="primary">
                  1 ${this.sourceToken.symbol} =
                  ${h.formatNumberToLocalString(o,3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="sm-regular" color="secondary">
                  $${h.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen?c`
                <wui-flex flexDirection="column" gap="2" class="details-content-container">
                  ${this.priceImpact?c` <wui-flex flexDirection="column" gap="2">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="2">
                            <wui-text
                              class="details-row-title"
                              variant="sm-regular"
                              color="secondary"
                            >
                              Price impact
                            </wui-text>
                            <w3m-tooltip-trigger
                              text="Price impact reflects the change in market price due to your trade"
                            >
                              <wui-icon size="sm" color="default" name="info"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="sm-regular" color="secondary">
                              ${h.formatNumberToLocalString(this.priceImpact,3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  ${this.maxSlippage&&this.sourceToken.symbol?c`<wui-flex flexDirection="column" gap="2">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="2">
                            <wui-text
                              class="details-row-title"
                              variant="sm-regular"
                              color="secondary"
                            >
                              Max. slippage
                            </wui-text>
                            <w3m-tooltip-trigger
                              text=${`Max slippage sets the minimum amount you must receive for the transaction to proceed. ${t?`Transaction will be reversed if you receive less than ${h.formatNumberToLocalString(t,6)} ${this.toToken.symbol} due to price changes.`:""}`}
                            >
                              <wui-icon size="sm" color="default" name="info"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="sm-regular" color="secondary">
                              ${h.formatNumberToLocalString(this.maxSlippage,6)}
                              ${this.toToken.symbol} ${X}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  <wui-flex flexDirection="column" gap="2">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row provider-free-row"
                    >
                      <wui-flex alignItems="center" gap="2">
                        <wui-text class="details-row-title" variant="sm-regular" color="secondary">
                          Provider fee
                        </wui-text>
                      </wui-flex>
                      <wui-flex>
                        <wui-text variant="sm-regular" color="secondary">0.85%</wui-text>
                      </wui-flex>
                    </wui-flex>
                  </wui-flex>
                </wui-flex>
              `:null}
        </wui-flex>
      </wui-flex>
    `}toggleDetails(){this.detailsOpen=!this.detailsOpen}};g.styles=[Y];x([l()],g.prototype,"networkName",void 0);x([w()],g.prototype,"detailsOpen",void 0);x([l()],g.prototype,"sourceToken",void 0);x([l()],g.prototype,"toToken",void 0);x([l()],g.prototype,"toTokenAmount",void 0);x([l()],g.prototype,"sourceTokenPriceInUSD",void 0);x([l()],g.prototype,"toTokenPriceInUSD",void 0);x([l()],g.prototype,"priceImpact",void 0);x([l()],g.prototype,"maxSlippage",void 0);x([l()],g.prototype,"networkTokenSymbol",void 0);x([l()],g.prototype,"inputError",void 0);g=x([P("w3m-swap-details")],g);const Z=I`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: ${({borderRadius:e})=>e[5]};
    padding: ${({spacing:e})=>e[5]};
    padding-right: ${({spacing:e})=>e[3]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow: inset 0px 0px 0px 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    position: relative;
  }

  wui-shimmer.market-value {
    opacity: 0;
  }

  :host > wui-flex > svg.input_mask {
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  :host wui-flex .input_mask__border,
  :host wui-flex .input_mask__background {
    transition: fill ${({durations:e})=>e.md}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: fill;
  }

  :host wui-flex .input_mask__border {
    fill: ${({tokens:e})=>e.core.glass010};
  }

  :host wui-flex .input_mask__background {
    fill: ${({tokens:e})=>e.theme.foregroundPrimary};
  }
`;var V=function(e,t,o,n){var s=arguments.length,i=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,n);else for(var u=e.length-1;u>=0;u--)(a=e[u])&&(i=(s<3?a(i):s>3?a(t,o,i):a(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i};let E=class extends S{constructor(){super(...arguments),this.target="sourceToken"}render(){return c`
      <wui-flex class justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
          gap="1"
        >
          <wui-shimmer width="80px" height="40px" rounded variant="light"></wui-shimmer>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}templateTokenSelectButton(){return c`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="1"
      >
        <wui-shimmer width="80px" height="40px" rounded variant="light"></wui-shimmer>
      </wui-flex>
    `}};E.styles=[Z];V([w()],E.prototype,"target",void 0);E=V([P("w3m-swap-input-skeleton")],E);const J=I`
  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: ${({borderRadius:e})=>e[5]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    padding: ${({spacing:e})=>e[5]};
    padding-right: ${({spacing:e})=>e[3]};
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 0px 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    position: relative;
    transition: box-shadow ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.lg};
    will-change: background-color;
  }

  :host wui-flex.focus {
    box-shadow: inset 0px 0px 0px 1px ${({tokens:e})=>e.core.glass010};
  }

  :host > wui-flex .swap-input,
  :host > wui-flex .swap-token-button {
    z-index: 10;
  }

  :host > wui-flex .swap-input {
    -webkit-mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  :host > wui-flex .swap-input input {
    background: none;
    border: none;
    height: 42px;
    width: 100%;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -1.28px;
    outline: none;
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
    color: ${({tokens:e})=>e.theme.textPrimary};
    padding: 0px;
  }

  :host > wui-flex .swap-input input:focus-visible {
    outline: none;
  }

  :host > wui-flex .swap-input input::-webkit-outer-spin-button,
  :host > wui-flex .swap-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .max-value-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${({tokens:e})=>e.core.glass010};
    padding-left: 0px;
  }

  .market-value {
    min-height: 18px;
  }
`;var T=function(e,t,o,n){var s=arguments.length,i=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,n);else for(var u=e.length-1;u>=0;u--)(a=e[u])&&(i=(s<3?a(i):s>3?a(t,o,i):a(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i};const ee=5e-5;let k=class extends S{constructor(){super(...arguments),this.focused=!1,this.price=0,this.target="sourceToken",this.onSetAmount=null,this.onSetMaxValue=null}render(){const t=this.marketValue||"0",o=h.bigNumber(t).gt("0");return c`
      <wui-flex
        class="${this.focused?"focus":""}"
        justifyContent="space-between"
        alignItems="center"
      >
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
        >
          <input
            data-testid="swap-input-${this.target}"
            @focusin=${()=>this.onFocusChange(!0)}
            @focusout=${()=>this.onFocusChange(!1)}
            ?disabled=${this.disabled}
            value=${this.value||""}
            @input=${this.dispatchInputChangeEvent}
            @keydown=${this.handleKeydown}
            placeholder="0"
            type="text"
            inputmode="decimal"
          />
          <wui-text class="market-value" variant="sm-regular" color="secondary">
            ${o?`$${h.formatNumberToLocalString(this.marketValue,2)}`:null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}handleKeydown(t){return G.numericInputKeyDown(t,this.value,o=>this.onSetAmount?.(this.target,o))}dispatchInputChangeEvent(t){if(!this.onSetAmount)return;const o=t.target.value.replace(/[^0-9.]/gu,"");o===","||o==="."?this.onSetAmount(this.target,"0."):o.endsWith(",")?this.onSetAmount(this.target,o.replace(",",".")):this.onSetAmount(this.target,o)}setMaxValueToInput(){this.onSetMaxValue?.(this.target,this.balance)}templateTokenSelectButton(){return this.token?c`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="1"
      >
        <wui-token-button
          data-testid="swap-input-token-${this.target}"
          text=${this.token.symbol}
          imageSrc=${this.token.logoUri}
          @click=${this.onSelectToken.bind(this)}
        >
        </wui-token-button>
        <wui-flex alignItems="center" gap="1"> ${this.tokenBalanceTemplate()} </wui-flex>
      </wui-flex>
    `:c` <wui-button
        data-testid="swap-select-token-button-${this.target}"
        class="swap-token-button"
        size="md"
        variant="neutral-secondary"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`}tokenBalanceTemplate(){const t=h.multiply(this.balance,this.price),o=t?t?.gt(ee):!1;return c`
      ${o?c`<wui-text variant="sm-regular" color="secondary">
            ${h.formatNumberToLocalString(this.balance,2)}
          </wui-text>`:null}
      ${this.target==="sourceToken"?this.tokenActionButtonTemplate(o):null}
    `}tokenActionButtonTemplate(t){return t?c` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-primary" variant="sm-medium">Max</wui-text>
      </button>`:c` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-primary" variant="sm-medium">Buy</wui-text>
    </button>`}onFocusChange(t){this.focused=t}onSelectToken(){R.sendEvent({type:"track",event:"CLICK_SELECT_TOKEN_TO_SWAP"}),v.push("SwapSelectToken",{target:this.target})}onBuyToken(){v.push("OnRampProviders")}};k.styles=[J];T([w()],k.prototype,"focused",void 0);T([w()],k.prototype,"balance",void 0);T([w()],k.prototype,"value",void 0);T([w()],k.prototype,"price",void 0);T([w()],k.prototype,"marketValue",void 0);T([w()],k.prototype,"disabled",void 0);T([w()],k.prototype,"target",void 0);T([w()],k.prototype,"token",void 0);T([w()],k.prototype,"onSetAmount",void 0);T([w()],k.prototype,"onSetMaxValue",void 0);k=T([P("w3m-swap-input")],k);const te=I`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .action-button {
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  .action-button:disabled {
    border-color: 1px solid ${({tokens:e})=>e.core.glass010};
  }

  .swap-inputs-container {
    position: relative;
  }

  wui-icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({borderRadius:e})=>e[10]} !important;
    border: 4px solid ${({tokens:e})=>e.theme.backgroundPrimary};
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  .replace-tokens-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[4]};
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    padding: ${({spacing:e})=>e[2]};
  }

  .details-container > wui-flex {
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[3]};
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[3]};
    transition: background ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background;
  }

  .details-container > wui-flex > button:hover {
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .details-content-container {
    padding: ${({spacing:e})=>e[2]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({spacing:e})=>e[3]} ${({spacing:e})=>e[5]};
    border-radius: ${({borderRadius:e})=>e[3]};
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
  }
`;var m=function(e,t,o,n){var s=arguments.length,i=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,n);else for(var u=e.length-1;u>=0;u--)(a=e[u])&&(i=(s<3?a(i):s>3?a(t,o,i):a(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i};let p=class extends S{constructor(){super(),this.unsubscribe=[],this.initialParams=v.state.data?.swap,this.detailsOpen=!1,this.caipAddress=L.state.caipAddress,this.caipNetworkId=C.state.activeCaipNetwork?.caipNetworkId,this.initialized=r.state.initialized,this.loadingQuote=r.state.loadingQuote,this.loadingPrices=r.state.loadingPrices,this.loadingTransaction=r.state.loadingTransaction,this.sourceToken=r.state.sourceToken,this.sourceTokenAmount=r.state.sourceTokenAmount,this.sourceTokenPriceInUSD=r.state.sourceTokenPriceInUSD,this.toToken=r.state.toToken,this.toTokenAmount=r.state.toTokenAmount,this.toTokenPriceInUSD=r.state.toTokenPriceInUSD,this.inputError=r.state.inputError,this.fetchError=r.state.fetchError,this.lastTokenPriceUpdate=0,this.minTokenPriceUpdateInterval=1e4,this.visibilityChangeHandler=()=>{document?.hidden?(clearInterval(this.interval),this.interval=void 0):this.startTokenPriceInterval()},this.startTokenPriceInterval=()=>{this.interval&&Date.now()-this.lastTokenPriceUpdate<this.minTokenPriceUpdateInterval||(this.lastTokenPriceUpdate&&Date.now()-this.lastTokenPriceUpdate>this.minTokenPriceUpdateInterval&&this.fetchTokensAndValues(),clearInterval(this.interval),this.interval=setInterval(()=>{this.fetchTokensAndValues()},this.minTokenPriceUpdateInterval))},this.watchTokensAndValues=()=>{!this.sourceToken||!this.toToken||(this.subscribeToVisibilityChange(),this.startTokenPriceInterval())},this.onDebouncedGetSwapCalldata=M.debounce(async()=>{await r.swapTokens()},200),C.subscribeKey("activeCaipNetwork",t=>this.onCaipNetworkChange({newCaipNetwork:t,resetSwapState:!0,initializeSwapState:!1})),L.subscribeKey("caipAddress",t=>this.onCaipAddressChange({newCaipAddress:t,resetSwapState:!0,initializeSwapState:!1})),this.unsubscribe.push(C.subscribeKey("activeCaipNetwork",t=>this.onCaipNetworkChange({newCaipNetwork:t,resetSwapState:!1,initializeSwapState:!0})),L.subscribeKey("caipAddress",t=>this.onCaipAddressChange({newCaipAddress:t,resetSwapState:!1,initializeSwapState:!0})),F.subscribeKey("open",t=>{t||r.resetState()}),v.subscribeKey("view",t=>{t.includes("Swap")||r.resetValues()}),r.subscribe(t=>{this.initialized=t.initialized,this.loadingQuote=t.loadingQuote,this.loadingPrices=t.loadingPrices,this.loadingTransaction=t.loadingTransaction,this.sourceToken=t.sourceToken,this.sourceTokenAmount=t.sourceTokenAmount,this.sourceTokenPriceInUSD=t.sourceTokenPriceInUSD,this.toToken=t.toToken,this.toTokenAmount=t.toTokenAmount,this.toTokenPriceInUSD=t.toTokenPriceInUSD,this.inputError=t.inputError,this.fetchError=t.fetchError,t.sourceToken&&t.toToken&&this.watchTokensAndValues()}))}async firstUpdated(){r.initializeState(),this.watchTokensAndValues(),await this.handleSwapParameters()}disconnectedCallback(){this.unsubscribe.forEach(t=>t?.()),clearInterval(this.interval),document?.removeEventListener("visibilitychange",this.visibilityChangeHandler)}render(){return c`
      <wui-flex flexDirection="column" .padding=${["0","4","4","4"]} gap="3">
        ${this.initialized?this.templateSwap():this.templateLoading()}
      </wui-flex>
    `}subscribeToVisibilityChange(){document?.removeEventListener("visibilitychange",this.visibilityChangeHandler),document?.addEventListener("visibilitychange",this.visibilityChangeHandler)}fetchTokensAndValues(){r.getNetworkTokenPrice(),r.getMyTokensWithBalance(),r.swapTokens(),this.lastTokenPriceUpdate=Date.now()}templateSwap(){return c`
      <wui-flex flexDirection="column" gap="3">
        <wui-flex flexDirection="column" alignItems="center" gap="2" class="swap-inputs-container">
          ${this.templateTokenInput("sourceToken",this.sourceToken)}
          ${this.templateTokenInput("toToken",this.toToken)} ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateDetails()} ${this.templateActionButton()}
      </wui-flex>
    `}actionButtonLabel(){return this.fetchError?"Swap":!this.sourceToken||!this.toToken?"Select token":this.sourceTokenAmount?this.inputError?this.inputError:"Review swap":"Enter amount"}templateReplaceTokensButton(){return c`
      <wui-flex class="replace-tokens-button-container">
        <wui-icon-box
          @click=${this.onSwitchTokens.bind(this)}
          icon="recycleHorizontal"
          size="md"
          variant="default"
        ></wui-icon-box>
      </wui-flex>
    `}templateLoading(){return c`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex flexDirection="column" alignItems="center" gap="2" class="swap-inputs-container">
          <w3m-swap-input-skeleton target="sourceToken"></w3m-swap-input-skeleton>
          <w3m-swap-input-skeleton target="toToken"></w3m-swap-input-skeleton>
          ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateActionButton()}
      </wui-flex>
    `}templateTokenInput(t,o){const n=r.state.myTokensWithBalance?.find(u=>u?.address===o?.address),s=t==="toToken"?this.toTokenAmount:this.sourceTokenAmount,i=t==="toToken"?this.toTokenPriceInUSD:this.sourceTokenPriceInUSD,a=h.parseLocalStringToNumber(s)*i;return c`<w3m-swap-input
      .value=${t==="toToken"?this.toTokenAmount:this.sourceTokenAmount}
      .disabled=${t==="toToken"}
      .onSetAmount=${this.handleChangeAmount.bind(this)}
      target=${t}
      .token=${o}
      .balance=${n?.quantity?.numeric}
      .price=${n?.price}
      .marketValue=${a}
      .onSetMaxValue=${this.onSetMaxValue.bind(this)}
    ></w3m-swap-input>`}onSetMaxValue(t,o){const n=h.bigNumber(o||"0");this.handleChangeAmount(t,n.gt(0)?n.toFixed(20):"0")}templateDetails(){return!this.sourceToken||!this.toToken||this.inputError?null:c`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`}handleChangeAmount(t,o){r.clearError(),t==="sourceToken"?r.setSourceTokenAmount(o):r.setToTokenAmount(o),this.onDebouncedGetSwapCalldata()}templateActionButton(){const t=!this.toToken||!this.sourceToken,o=!this.sourceTokenAmount,n=this.loadingQuote||this.loadingPrices||this.loadingTransaction,s=n||t||o||this.inputError;return c` <wui-flex gap="2">
      <wui-button
        data-testid="swap-action-button"
        class="action-button"
        fullWidth
        size="lg"
        borderRadius="xs"
        variant="accent-primary"
        ?loading=${!!n}
        ?disabled=${!!s}
        @click=${this.onSwapPreview.bind(this)}
      >
        ${this.actionButtonLabel()}
      </wui-button>
    </wui-flex>`}onSwitchTokens(){r.switchTokens()}async onSwapPreview(){this.fetchError&&await r.swapTokens(),R.sendEvent({type:"track",event:"INITIATE_SWAP",properties:{network:this.caipNetworkId||"",swapFromToken:this.sourceToken?.symbol||"",swapToToken:this.toToken?.symbol||"",swapFromAmount:this.sourceTokenAmount||"",swapToAmount:this.toTokenAmount||"",isSmartAccount:Q(C.state.activeChain)===q.ACCOUNT_TYPES.SMART_ACCOUNT}}),v.push("SwapPreview")}async handleSwapParameters(){this.initialParams&&(r.state.initialized||await new Promise(o=>{const n=r.subscribeKey("initialized",s=>{s&&(n?.(),o())})}),await this.setSwapParameters(this.initialParams))}async setSwapParameters({amount:t,fromToken:o,toToken:n}){(!r.state.tokens||!r.state.myTokensWithBalance)&&await new Promise(a=>{const u=r.subscribeKey("myTokensWithBalance",D=>{D&&D.length>0&&(u?.(),a())});setTimeout(()=>{u?.(),a()},5e3)});const s=[...r.state.tokens||[],...r.state.myTokensWithBalance||[]];if(o){const i=s.find(a=>a.symbol.toLowerCase()===o.toLowerCase());i&&r.setSourceToken(i)}if(n){const i=s.find(a=>a.symbol.toLowerCase()===n.toLowerCase());i&&r.setToToken(i)}t&&!isNaN(Number(t))&&r.setSourceTokenAmount(t)}onCaipAddressChange({newCaipAddress:t,resetSwapState:o,initializeSwapState:n}){this.caipAddress!==t&&(this.caipAddress=t,o&&r.resetState(),n&&r.initializeState())}onCaipNetworkChange({newCaipNetwork:t,resetSwapState:o,initializeSwapState:n}){this.caipNetworkId!==t?.caipNetworkId&&(this.caipNetworkId=t?.caipNetworkId,o&&r.resetState(),n&&r.initializeState())}};p.styles=te;m([w({type:Object})],p.prototype,"initialParams",void 0);m([l()],p.prototype,"interval",void 0);m([l()],p.prototype,"detailsOpen",void 0);m([l()],p.prototype,"caipAddress",void 0);m([l()],p.prototype,"caipNetworkId",void 0);m([l()],p.prototype,"initialized",void 0);m([l()],p.prototype,"loadingQuote",void 0);m([l()],p.prototype,"loadingPrices",void 0);m([l()],p.prototype,"loadingTransaction",void 0);m([l()],p.prototype,"sourceToken",void 0);m([l()],p.prototype,"sourceTokenAmount",void 0);m([l()],p.prototype,"sourceTokenPriceInUSD",void 0);m([l()],p.prototype,"toToken",void 0);m([l()],p.prototype,"toTokenAmount",void 0);m([l()],p.prototype,"toTokenPriceInUSD",void 0);m([l()],p.prototype,"inputError",void 0);m([l()],p.prototype,"fetchError",void 0);m([l()],p.prototype,"lastTokenPriceUpdate",void 0);p=m([P("w3m-swap-view")],p);const oe=I`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  .preview-container,
  .details-container {
    width: 100%;
  }

  .token-image {
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px ${({tokens:e})=>e.core.glass010};
    border-radius: 12px;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .token-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[2]};
    height: 40px;
    border: none;
    border-radius: 80px;
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    cursor: pointer;
    transition: background ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background;
  }

  .token-item:hover {
    background: ${({tokens:e})=>e.core.glass010};
  }

  .preview-token-details-container {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({spacing:e})=>e[3]} ${({spacing:e})=>e[5]};
    border-radius: ${({borderRadius:e})=>e[3]};
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .action-buttons-container {
    width: 100%;
    gap: ${({spacing:e})=>e[2]};
  }

  .action-buttons-container > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    height: 48px;
    border-radius: ${({borderRadius:e})=>e[4]};
    border: none;
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.core.glass010};
  }

  .action-buttons-container > button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .action-button > wui-loading-spinner {
    display: inline-block;
  }

  .cancel-button:hover,
  .action-button:hover {
    cursor: pointer;
  }

  .action-buttons-container > wui-button.cancel-button {
    flex: 2;
  }

  .action-buttons-container > wui-button.action-button {
    flex: 4;
  }

  .action-buttons-container > button.action-button > wui-text {
    color: white;
  }

  .details-container > wui-flex {
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[3]};
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[3]};
    transition: background ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background;
  }

  .details-container > wui-flex > button:hover {
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .details-content-container {
    padding: ${({spacing:e})=>e[2]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({spacing:e})=>e[3]} ${({spacing:e})=>e[5]};
    border-radius: ${({borderRadius:e})=>e[3]};
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
  }
`;var f=function(e,t,o,n){var s=arguments.length,i=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,n);else for(var u=e.length-1;u>=0;u--)(a=e[u])&&(i=(s<3?a(i):s>3?a(t,o,i):a(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i};let d=class extends S{constructor(){super(),this.unsubscribe=[],this.detailsOpen=!0,this.approvalTransaction=r.state.approvalTransaction,this.swapTransaction=r.state.swapTransaction,this.sourceToken=r.state.sourceToken,this.sourceTokenAmount=r.state.sourceTokenAmount??"",this.sourceTokenPriceInUSD=r.state.sourceTokenPriceInUSD,this.toToken=r.state.toToken,this.toTokenAmount=r.state.toTokenAmount??"",this.toTokenPriceInUSD=r.state.toTokenPriceInUSD,this.caipNetwork=C.state.activeCaipNetwork,this.balanceSymbol=L.state.balanceSymbol,this.inputError=r.state.inputError,this.loadingQuote=r.state.loadingQuote,this.loadingApprovalTransaction=r.state.loadingApprovalTransaction,this.loadingBuildTransaction=r.state.loadingBuildTransaction,this.loadingTransaction=r.state.loadingTransaction,this.unsubscribe.push(L.subscribeKey("balanceSymbol",t=>{this.balanceSymbol!==t&&v.goBack()}),C.subscribeKey("activeCaipNetwork",t=>{this.caipNetwork!==t&&(this.caipNetwork=t)}),r.subscribe(t=>{this.approvalTransaction=t.approvalTransaction,this.swapTransaction=t.swapTransaction,this.sourceToken=t.sourceToken,this.toToken=t.toToken,this.toTokenPriceInUSD=t.toTokenPriceInUSD,this.sourceTokenAmount=t.sourceTokenAmount??"",this.toTokenAmount=t.toTokenAmount??"",this.inputError=t.inputError,t.inputError&&v.goBack(),this.loadingQuote=t.loadingQuote,this.loadingApprovalTransaction=t.loadingApprovalTransaction,this.loadingBuildTransaction=t.loadingBuildTransaction,this.loadingTransaction=t.loadingTransaction}))}firstUpdated(){r.getTransaction(),this.refreshTransaction()}disconnectedCallback(){this.unsubscribe.forEach(t=>t?.()),clearInterval(this.interval)}render(){return c`
      <wui-flex flexDirection="column" .padding=${["0","4","4","4"]} gap="3">
        ${this.templateSwap()}
      </wui-flex>
    `}refreshTransaction(){this.interval=setInterval(()=>{r.getApprovalLoadingState()||r.getTransaction()},1e4)}templateSwap(){const t=`${h.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${this.sourceToken?.symbol}`,o=`${h.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${this.toToken?.symbol}`,n=parseFloat(this.sourceTokenAmount)*this.sourceTokenPriceInUSD,s=parseFloat(this.toTokenAmount)*this.toTokenPriceInUSD,i=h.formatNumberToLocalString(n),a=h.formatNumberToLocalString(s),u=this.loadingQuote||this.loadingBuildTransaction||this.loadingTransaction||this.loadingApprovalTransaction;return c`
      <wui-flex flexDirection="column" alignItems="center" gap="4">
        <wui-flex class="preview-container" flexDirection="column" alignItems="flex-start" gap="4">
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="4"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="01">
              <wui-text variant="sm-regular" color="secondary">Send</wui-text>
              <wui-text variant="md-regular" color="primary">$${i}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${t}
              imageSrc=${this.sourceToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
          <wui-icon name="recycleHorizontal" color="default" size="md"></wui-icon>
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="4"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="01">
              <wui-text variant="sm-regular" color="secondary">Receive</wui-text>
              <wui-text variant="md-regular" color="primary">$${a}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${o}
              imageSrc=${this.toToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
        </wui-flex>

        ${this.templateDetails()}

        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="2">
          <wui-icon size="sm" color="default" name="info"></wui-icon>
          <wui-text variant="sm-regular" color="secondary">Review transaction carefully</wui-text>
        </wui-flex>

        <wui-flex
          class="action-buttons-container"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <wui-button
            class="cancel-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="neutral-secondary"
            @click=${this.onCancelTransaction.bind(this)}
          >
            <wui-text variant="md-medium" color="secondary">Cancel</wui-text>
          </wui-button>
          <wui-button
            class="action-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="accent-primary"
            ?loading=${u}
            ?disabled=${u}
            @click=${this.onSendTransaction.bind(this)}
          >
            <wui-text variant="md-medium" color="invert"> ${this.actionButtonLabel()} </wui-text>
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}templateDetails(){return!this.sourceToken||!this.toToken||this.inputError?null:c`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`}actionButtonLabel(){return this.loadingApprovalTransaction?"Approving...":this.approvalTransaction?"Approve":"Swap"}onCancelTransaction(){v.goBack()}onSendTransaction(){this.approvalTransaction?r.sendTransactionForApproval(this.approvalTransaction):r.sendTransactionForSwap(this.swapTransaction)}};d.styles=oe;f([l()],d.prototype,"interval",void 0);f([l()],d.prototype,"detailsOpen",void 0);f([l()],d.prototype,"approvalTransaction",void 0);f([l()],d.prototype,"swapTransaction",void 0);f([l()],d.prototype,"sourceToken",void 0);f([l()],d.prototype,"sourceTokenAmount",void 0);f([l()],d.prototype,"sourceTokenPriceInUSD",void 0);f([l()],d.prototype,"toToken",void 0);f([l()],d.prototype,"toTokenAmount",void 0);f([l()],d.prototype,"toTokenPriceInUSD",void 0);f([l()],d.prototype,"caipNetwork",void 0);f([l()],d.prototype,"balanceSymbol",void 0);f([l()],d.prototype,"inputError",void 0);f([l()],d.prototype,"loadingQuote",void 0);f([l()],d.prototype,"loadingApprovalTransaction",void 0);f([l()],d.prototype,"loadingBuildTransaction",void 0);f([l()],d.prototype,"loadingTransaction",void 0);d=f([P("w3m-swap-preview-view")],d);const ie=I`
  :host {
    width: 100%;
    height: 60px;
    min-height: 60px;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    display: flex;
    column-gap: ${({spacing:e})=>e[3]};
    padding: ${({spacing:e})=>e[2]};
    padding-right: ${({spacing:e})=>e[4]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
    color: ${({tokens:e})=>e.theme.foregroundSecondary};
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, opacity;
  }

  @media (hover: hover) and (pointer: fine) {
    :host > wui-flex:hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }

    :host > wui-flex:active {
      background-color: ${({tokens:e})=>e.core.glass010};
    }
  }

  :host([disabled]) > wui-flex {
    opacity: 0.6;
  }

  :host([disabled]) > wui-flex:hover {
    background-color: transparent;
  }

  :host > wui-flex > wui-flex {
    flex: 1;
  }

  :host > wui-flex > wui-image,
  :host > wui-flex > .token-item-image-placeholder {
    width: 40px;
    max-width: 40px;
    height: 40px;
    border-radius: ${({borderRadius:e})=>e[20]};
    position: relative;
  }

  :host > wui-flex > .token-item-image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > wui-flex > wui-image::after,
  :host > wui-flex > .token-item-image-placeholder::after {
    position: absolute;
    content: '';
    inset: 0;
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.core.glass010};
    border-radius: ${({borderRadius:e})=>e[8]};
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: ${({borderRadius:e})=>e[2]};
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }
`;var A=function(e,t,o,n){var s=arguments.length,i=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,n);else for(var u=e.length-1;u>=0;u--)(a=e[u])&&(i=(s<3?a(i):s>3?a(t,o,i):a(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i};let $=class extends S{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.imageSrc=void 0,this.name=void 0,this.symbol=void 0,this.price=void 0,this.amount=void 0,this.visible=!1,this.imageError=!1,this.observer=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting?this.visible=!0:this.visible=!1})},{threshold:.1})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){if(!this.visible)return null;const t=this.amount&&this.price?h.multiply(this.price,this.amount)?.toFixed(3):null;return c`
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="1">
          <wui-flex justifyContent="space-between">
            <wui-text variant="md-medium" color="primary" lineClamp="1">${this.name}</wui-text>
            ${t?c`
                  <wui-text variant="md-medium" color="primary">
                    $${h.formatNumberToLocalString(t,3)}
                  </wui-text>
                `:null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="sm-regular" color="secondary" lineClamp="1">${this.symbol}</wui-text>
            ${this.amount?c`<wui-text variant="sm-regular" color="secondary">
                  ${h.formatNumberToLocalString(this.amount,5)}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}visualTemplate(){return this.imageError?c`<wui-flex class="token-item-image-placeholder">
        <wui-icon name="image" color="inherit"></wui-icon>
      </wui-flex>`:this.imageSrc?c`<wui-image
        width="40"
        height="40"
        src=${this.imageSrc}
        @onLoadError=${this.imageLoadError}
      ></wui-image>`:null}imageLoadError(){this.imageError=!0}};$.styles=[B,H,ie];A([w()],$.prototype,"imageSrc",void 0);A([w()],$.prototype,"name",void 0);A([w()],$.prototype,"symbol",void 0);A([w()],$.prototype,"price",void 0);A([w()],$.prototype,"amount",void 0);A([l()],$.prototype,"visible",void 0);A([l()],$.prototype,"imageError",void 0);$=A([P("wui-token-list-item")],$);const ne=I`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: flex;
    column-gap: ${({spacing:e})=>e[3]};
    padding: ${({spacing:e})=>e[2]};
    padding-right: ${({spacing:e})=>e[4]};
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;var re=function(e,t,o,n){var s=arguments.length,i=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,n);else for(var u=e.length-1;u>=0;u--)(a=e[u])&&(i=(s<3?a(i):s>3?a(t,o,i):a(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i};let N=class extends S{render(){return c`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="1">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-flex flexDirection="column" gap="1" alignItems="flex-end">
          <wui-shimmer width="24px" height="12px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="32px" height="12px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `}};N.styles=[B,ne];N=re([P("wui-token-list-item-loader")],N);const se=I`
  :host {
    --tokens-scroll--top-opacity: 0;
    --tokens-scroll--bottom-opacity: 1;
    --suggested-tokens-scroll--left-opacity: 0;
    --suggested-tokens-scroll--right-opacity: 1;
  }

  :host > wui-flex:first-child {
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-height: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .suggested-tokens-container {
    overflow-x: auto;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--suggested-tokens-scroll--right-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--right-opacity))) 100%
    );
  }

  .suggested-tokens-container::-webkit-scrollbar {
    display: none;
  }

  .tokens-container {
    border-top: 1px solid ${({tokens:e})=>e.core.glass010};
    height: 100%;
    max-height: 390px;
  }

  .tokens {
    width: 100%;
    overflow-y: auto;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--tokens-scroll--top-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--tokens-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--bottom-opacity))) 100%
    );
  }

  .network-search-input,
  .select-network-button {
    height: 40px;
  }

  .select-network-button {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:e})=>e[2]};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.core.glass010};
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[3]};
    padding: ${({spacing:e})=>e[2]};
    align-items: center;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  .select-network-button:hover {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .select-network-button > wui-image {
    width: 26px;
    height: 26px;
    border-radius: ${({borderRadius:e})=>e[4]};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.core.glass010};
  }
`;var y=function(e,t,o,n){var s=arguments.length,i=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,n);else for(var u=e.length-1;u>=0;u--)(a=e[u])&&(i=(s<3?a(i):s>3?a(t,o,i):a(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i};let b=class extends S{constructor(){super(),this.unsubscribe=[],this.targetToken=v.state.data?.target,this.sourceToken=r.state.sourceToken,this.sourceTokenAmount=r.state.sourceTokenAmount,this.toToken=r.state.toToken,this.myTokensWithBalance=r.state.myTokensWithBalance,this.popularTokens=r.state.popularTokens,this.suggestedTokens=r.state.suggestedTokens,this.tokensLoading=r.state.tokensLoading,this.searchValue="",this.unsubscribe.push(r.subscribe(t=>{this.sourceToken=t.sourceToken,this.toToken=t.toToken,this.myTokensWithBalance=t.myTokensWithBalance,this.popularTokens=t.popularTokens,this.suggestedTokens=t.suggestedTokens,this.tokensLoading=t.tokensLoading}))}async firstUpdated(){await r.getTokenList()}updated(){this.renderRoot?.querySelector(".suggested-tokens-container")?.addEventListener("scroll",this.handleSuggestedTokensScroll.bind(this)),this.renderRoot?.querySelector(".tokens")?.addEventListener("scroll",this.handleTokenListScroll.bind(this))}disconnectedCallback(){super.disconnectedCallback();const t=this.renderRoot?.querySelector(".suggested-tokens-container"),o=this.renderRoot?.querySelector(".tokens");t?.removeEventListener("scroll",this.handleSuggestedTokensScroll.bind(this)),o?.removeEventListener("scroll",this.handleTokenListScroll.bind(this)),clearInterval(this.interval)}render(){return c`
      <wui-flex flexDirection="column" gap="3">
        ${this.templateSearchInput()} ${this.templateSuggestedTokens()} ${this.templateTokens()}
      </wui-flex>
    `}onSelectToken(t){this.targetToken==="sourceToken"?r.setSourceToken(t):(r.setToToken(t),this.sourceToken&&this.sourceTokenAmount&&r.swapTokens()),v.goBack()}templateSearchInput(){return c`
      <wui-flex .padding=${["1","3","0","3"]} gap="2">
        <wui-input-text
          data-testid="swap-select-token-search-input"
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
          .value=${this.searchValue}
          @inputChange=${this.onSearchInputChange.bind(this)}
        ></wui-input-text>
      </wui-flex>
    `}templateMyTokens(){const t=this.myTokensWithBalance?Object.values(this.myTokensWithBalance):[],o=this.filterTokensWithText(t,this.searchValue);return o?.length>0?c`<wui-flex justifyContent="flex-start" padding="2">
          <wui-text variant="md-medium" color="secondary">Your tokens</wui-text>
        </wui-flex>
        ${o.map(n=>{const s=n.symbol===this.sourceToken?.symbol||n.symbol===this.toToken?.symbol;return c`
            <wui-token-list-item
              data-testid="swap-select-token-item-${n.symbol}"
              name=${n.name}
              ?disabled=${s}
              symbol=${n.symbol}
              price=${n?.price}
              amount=${n?.quantity?.numeric}
              imageSrc=${n.logoUri}
              @click=${()=>{s||this.onSelectToken(n)}}
            >
            </wui-token-list-item>
          `})}`:null}templateAllTokens(){const t=this.popularTokens?this.popularTokens:[],o=this.filterTokensWithText(t,this.searchValue);return this.tokensLoading?c`
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
      `:o?.length>0?c`
        ${o.map(n=>c`
            <wui-token-list-item
              data-testid="swap-select-token-item-${n.symbol}"
              name=${n.name}
              symbol=${n.symbol}
              imageSrc=${n.logoUri}
              @click=${()=>this.onSelectToken(n)}
            >
            </wui-token-list-item>
          `)}
      `:null}templateTokens(){return c`
      <wui-flex class="tokens-container">
        <wui-flex class="tokens" .padding=${["0","2","2","2"]} flexDirection="column">
          ${this.templateMyTokens()}
          <wui-flex justifyContent="flex-start" padding="3">
            <wui-text variant="md-medium" color="secondary">Tokens</wui-text>
          </wui-flex>
          ${this.templateAllTokens()}
        </wui-flex>
      </wui-flex>
    `}templateSuggestedTokens(){const t=this.suggestedTokens?this.suggestedTokens.slice(0,8):null;return this.tokensLoading?c`
        <wui-flex
          class="suggested-tokens-container"
          .padding=${["0","3","0","3"]}
          gap="2"
        >
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
        </wui-flex>
      `:t?c`
      <wui-flex
        class="suggested-tokens-container"
        .padding=${["0","3","0","3"]}
        gap="2"
      >
        ${t.map(o=>c`
            <wui-token-button
              text=${o.symbol}
              imageSrc=${o.logoUri}
              @click=${()=>this.onSelectToken(o)}
            >
            </wui-token-button>
          `)}
      </wui-flex>
    `:null}onSearchInputChange(t){this.searchValue=t.detail}handleSuggestedTokensScroll(){const t=this.renderRoot?.querySelector(".suggested-tokens-container");t&&(t.style.setProperty("--suggested-tokens-scroll--left-opacity",U.interpolate([0,100],[0,1],t.scrollLeft).toString()),t.style.setProperty("--suggested-tokens-scroll--right-opacity",U.interpolate([0,100],[0,1],t.scrollWidth-t.scrollLeft-t.offsetWidth).toString()))}handleTokenListScroll(){const t=this.renderRoot?.querySelector(".tokens");t&&(t.style.setProperty("--tokens-scroll--top-opacity",U.interpolate([0,100],[0,1],t.scrollTop).toString()),t.style.setProperty("--tokens-scroll--bottom-opacity",U.interpolate([0,100],[0,1],t.scrollHeight-t.scrollTop-t.offsetHeight).toString()))}filterTokensWithText(t,o){return t.filter(n=>`${n.symbol} ${n.name} ${n.address}`.toLowerCase().includes(o.toLowerCase())).sort((n,s)=>{const i=`${n.symbol} ${n.name} ${n.address}`.toLowerCase(),a=`${s.symbol} ${s.name} ${s.address}`.toLowerCase(),u=i.indexOf(o.toLowerCase()),D=a.indexOf(o.toLowerCase());return u-D})}};b.styles=se;y([l()],b.prototype,"interval",void 0);y([l()],b.prototype,"targetToken",void 0);y([l()],b.prototype,"sourceToken",void 0);y([l()],b.prototype,"sourceTokenAmount",void 0);y([l()],b.prototype,"toToken",void 0);y([l()],b.prototype,"myTokensWithBalance",void 0);y([l()],b.prototype,"popularTokens",void 0);y([l()],b.prototype,"suggestedTokens",void 0);y([l()],b.prototype,"tokensLoading",void 0);y([l()],b.prototype,"searchValue",void 0);b=y([P("w3m-swap-select-token-view")],b);export{d as W3mSwapPreviewView,b as W3mSwapSelectTokenView,p as W3mSwapView};
