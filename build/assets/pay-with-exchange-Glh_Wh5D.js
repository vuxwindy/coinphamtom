import{i as E,a as I,x as l,r as p}from"./state-Cf6Acp3J.js";import{aI as A,aJ as x,Z as b,a3 as w,aa as y,a8 as v,a0 as h,ae as C,a7 as U,ag as $,ah as S,a6 as T,aG as L,$ as N}from"./index-W7O16Knq.js";import{c as D}from"./index-KkpI0fgd.js";import"./index-NtF0e3ax.js";import"./index-BkuMDALp.js";import"./index-DgA7GKrI.js";import"./index-BNLNiClf.js";import"./index-CX_ap1W4.js";import"./index-XAL8BJnK.js";import"./index-Cqg5Vvc8.js";import"./if-defined-Cjow_KMx.js";import"./index-BTClOK_9.js";const _={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"},solana:{native:{assetNamespace:"slip44",assetReference:"501"},defaultTokenNamespace:"token"}};class j extends Error{}function R(){return`https://rpc.walletconnect.org/v1/json-rpc?projectId=${x.getSnapshot().projectId}&source=fund-wallet`}async function f(n,e){const s=R(),{sdkType:r,sdkVersion:o,projectId:a}=x.getSnapshot(),m={jsonrpc:"2.0",id:1,method:n,params:{...e||{},st:r,sv:o,projectId:a}},g=await(await fetch(s,{method:"POST",body:JSON.stringify(m),headers:{"Content-Type":"application/json"}})).json();if(g.error)throw new j(g.error.message);return g}async function O(n){return(await f("reown_getExchanges",n)).result}async function F(n){return(await f("reown_getExchangePayUrl",n)).result}async function H(n){return(await f("reown_getExchangeBuyStatus",n)).result}function P(n,e){const{chainNamespace:s,chainId:r}=A.parseCaipNetworkId(n),o=_[s];if(!o)throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${s}`);let a=o.native.assetNamespace,m=o.native.assetReference;return e!=="native"&&(a=o.defaultTokenNamespace,m=e),`${`${s}:${r}`}/${a}:${m}`}const B=0,k={paymentAsset:{network:"eip155:1",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:0}},amount:0,tokenAmount:0,tokenPrice:null,priceLoading:!1,error:null,exchanges:[],isLoading:!1,currentPayment:void 0,isPaymentInProgress:!1,paymentId:""},t=b(k),i={state:t,subscribe(n){return S(t,()=>n(t))},subscribeKey(n,e){return $(t,n,e)},resetState(){Object.assign(t,{...k})},async fetchTokenPrice(){t.priceLoading=!0;const n=C(),e=await U.fetchTokenPrice({addresses:[n]});t.tokenPrice=e.fungibles?.[0]?.price||null,t.priceLoading=!1},getTokenAmount(){if(!t.tokenPrice)throw new Error("Cannot get token price");const n=new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:4}).format(t.amount/t.tokenPrice);return Number(n)},setAmount(n){t.amount=n,t.tokenPrice&&(t.tokenAmount=this.getTokenAmount())},setPaymentAsset(n){t.paymentAsset=n},async fetchExchanges(){try{t.isLoading=!0;const n=await O({page:B,asset:P(t.paymentAsset.network,t.paymentAsset.asset),amount:t.amount.toString()});t.exchanges=n.exchanges.slice(0,2)}catch{throw h.showError("Unable to get exchanges"),new Error("Unable to get exchanges")}finally{t.isLoading=!1}},async getPayUrl(n,e){try{const s=Number(e.amount),r=await F({exchangeId:n,asset:P(e.network,e.asset),amount:s.toString(),recipient:`${e.network}:${e.recipient}`});return w.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{exchange:{id:n},configuration:{network:e.network,asset:e.asset,recipient:e.recipient,amount:s},currentPayment:{type:"exchange",exchangeId:n},source:"fund-from-exchange",headless:!1}}),r}catch(s){throw s instanceof Error&&s.message.includes("is not supported")?new Error("Asset not supported"):new Error(s.message)}},async handlePayWithExchange(n){try{if(!y.state.address)throw new Error("No account connected");t.isPaymentInProgress=!0,t.paymentId=crypto.randomUUID(),t.currentPayment={type:"exchange",exchangeId:n};const{network:e,asset:s}=t.paymentAsset,r={network:e,asset:s,amount:t.tokenAmount,recipient:y.state.address},o=await this.getPayUrl(n,r);if(!o)throw new Error("Unable to initiate payment");t.currentPayment.sessionId=o.sessionId,t.currentPayment.status="IN_PROGRESS",t.currentPayment.exchangeId=n,v.openHref(o.url,"_blank","popup=yes,width=480,height=720,noopener,noreferrer")}catch{t.error="Unable to initiate payment",h.showError(t.error)}},async waitUntilComplete({exchangeId:n,sessionId:e,paymentId:s,retries:r=20}){const o=await this.getBuyStatus(n,e,s);if(o.status==="SUCCESS"||o.status==="FAILED")return o;if(r===0)throw new Error("Unable to get deposit status");return await new Promise(a=>{setTimeout(a,5e3)}),this.waitUntilComplete({exchangeId:n,sessionId:e,paymentId:s,retries:r-1})},async getBuyStatus(n,e,s){try{if(!t.currentPayment)throw new Error("No current payment");const r=await H({sessionId:e,exchangeId:n});return t.currentPayment.status=r.status,(r.status==="SUCCESS"||r.status==="FAILED")&&(t.currentPayment.result=r.txHash,t.isPaymentInProgress=!1,w.sendEvent({type:"track",event:r.status==="SUCCESS"?"PAY_SUCCESS":"PAY_ERROR",properties:{source:"fund-from-exchange",paymentId:s,configuration:{network:t.paymentAsset.network,asset:t.paymentAsset.asset,recipient:y.state.address||"",amount:t.amount},currentPayment:{type:"exchange",exchangeId:t.currentPayment?.exchangeId,sessionId:t.currentPayment?.sessionId,result:r.txHash}}})),r}catch{return{status:"UNKNOWN",txHash:""}}},reset(){t.currentPayment=void 0,t.isPaymentInProgress=!1,t.paymentId="",t.paymentAsset={network:"eip155:1",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:0}},t.amount=0,t.tokenAmount=0,t.tokenPrice=null,t.priceLoading=!1,t.error=null,t.exchanges=[],t.isLoading=!1}},W=E`
  .amount-input-container {
    border-radius: var(--wui-border-radius-m);
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-bg-100);
  }

  .container {
    background-color: var(--wui-color-bg-125);
  }
`;var u=function(n,e,s,r){var o=arguments.length,a=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,s):r,m;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(n,e,s,r);else for(var d=n.length-1;d>=0;d--)(m=n[d])&&(a=(o<3?m(a):o>3?m(e,s,a):m(e,s))||a);return o>3&&a&&Object.defineProperty(e,s,a),a};const G=[10,50,100];let c=class extends I{constructor(){super(),this.unsubscribe=[],this.network=T.state.activeCaipNetwork,this.exchanges=i.state.exchanges,this.isLoading=i.state.isLoading,this.amount=i.state.amount,this.tokenAmount=i.state.tokenAmount,this.priceLoading=i.state.priceLoading,this.isPaymentInProgress=i.state.isPaymentInProgress,this.currentPayment=i.state.currentPayment,this.paymentId=i.state.paymentId,this.unsubscribe.push(i.subscribe(e=>{this.exchanges=e.exchanges,this.isLoading=e.isLoading,this.amount=e.amount,this.tokenAmount=e.tokenAmount,this.priceLoading=e.priceLoading,this.paymentId=e.paymentId,this.isPaymentInProgress=e.isPaymentInProgress,this.currentPayment=e.currentPayment,e.isPaymentInProgress&&e.currentPayment?.exchangeId&&e.currentPayment?.sessionId&&e.paymentId&&this.handlePaymentInProgress()}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),i.reset()}firstUpdated(){i.fetchExchanges(),i.fetchTokenPrice()}render(){return l`
      <wui-flex flexDirection="column" gap="xs" class="container">
        ${this.amountInputTemplate()} ${this.exchangesTemplate()}
      </wui-flex>
    `}exchangesTemplate(){return l`
      <wui-flex
        flexDirection="column"
        gap="xs"
        .padding=${["xs","s","s","s"]}
        class="exchanges-container"
      >
        ${this.exchanges.map(e=>l`<wui-list-item
              @click=${()=>this.onExchangeClick(e)}
              chevron
              variant="image"
              imageSrc=${e.imageUrl}
              ?loading=${this.isLoading}
              ?disabled=${!this.amount}
            >
              <wui-text variant="paragraph-500" color="fg-200">
                Deposit from ${e.name}
              </wui-text>
            </wui-list-item>`)}
      </wui-flex>
    `}amountInputTemplate(){return l`
      <wui-flex flexDirection="column" gap="s" .padding=${["0","s","s","s"]} class="amount-input-container">
        <wui-flex justifyContent="space-between">
          <wui-text variant="paragraph-500" color="fg-200">Asset</wui-text>
          <wui-chip-button
            data-testid="deposit-from-exchange-asset-button"
            text=${this.network?.nativeCurrency.symbol||""}
            imageSrc=${L.getNetworkImage(this.network)}
            size="sm"
            variant="gray"
            icon=${null}
          ></wui-chip-button>
        </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" justifyContent="center">
          <wui-flex alignItems="center" gap="4xs">
            <wui-text variant="2xl-500" color="fg-200">${this.amount}</wui-text>
            <wui-text variant="paragraph-500" color="fg-200">USD</wui-text>
          </wui-flex>
          ${this.tokenAmountTemplate()}
          </wui-flex>
          <wui-flex justifyContent="space-between" gap="xs">
            ${G.map(e=>l`<wui-button @click=${()=>this.onPresetAmountClick(e)} variant=${this.amount===e?"accent":"shade"} size="sm" fullWidth>$${e}</wui-button>`)}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}tokenAmountTemplate(){return this.priceLoading?l`<wui-shimmer
        width="65px"
        height="20px"
        borderRadius="xxs"
        variant="light"
      ></wui-shimmer>`:l`
      <wui-text variant="paragraph-500" color="fg-200">
        ${this.tokenAmount} ${this.network?.nativeCurrency.symbol}
      </wui-text>
    `}async onExchangeClick(e){this.amount&&await i.handlePayWithExchange(e.id)}handlePaymentInProgress(){this.isPaymentInProgress&&this.currentPayment?.exchangeId&&this.currentPayment?.sessionId&&this.paymentId&&(h.showLoading("Deposit in progress..."),N.replace("Account"),i.waitUntilComplete({exchangeId:this.currentPayment.exchangeId,sessionId:this.currentPayment.sessionId,paymentId:this.paymentId}).then(e=>{e.status==="SUCCESS"?h.showSuccess("Deposit completed"):e.status==="FAILED"&&h.showError("Deposit failed")}))}onPresetAmountClick(e){i.setAmount(e)}};c.styles=W;u([p()],c.prototype,"network",void 0);u([p()],c.prototype,"exchanges",void 0);u([p()],c.prototype,"isLoading",void 0);u([p()],c.prototype,"amount",void 0);u([p()],c.prototype,"tokenAmount",void 0);u([p()],c.prototype,"priceLoading",void 0);u([p()],c.prototype,"isPaymentInProgress",void 0);u([p()],c.prototype,"currentPayment",void 0);u([p()],c.prototype,"paymentId",void 0);c=u([D("w3m-deposit-from-exchange-view")],c);export{c as W3mDepositFromExchangeView};
