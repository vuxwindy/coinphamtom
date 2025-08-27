import{i as S,a as R,x as c,r as v}from"./state-Cf6Acp3J.js";import{S as O,T as $,U as L,V as C,W as g,a_ as f,$ as P,af as I,a8 as k,a0 as T}from"./index-W7O16Knq.js";import{n as h,c as b,U as E}from"./index-KkpI0fgd.js";import"./index-DsLsIr5D.js";import"./index-XAL8BJnK.js";import{r as _}from"./state-BNPL_3uu.js";const W=O`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 50px;
    height: 50px;
    background: var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
    font-family: var(--wui-font-family);
    font-size: var(--wui-font-size-large);
    font-weight: var(--wui-font-weight-regular);
    letter-spacing: var(--wui-letter-spacing-large);
    text-align: center;
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
    background: var(--wui-color-gray-glass-005);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-accent-100);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }
`;var x=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(n=(o<3?r(n):o>3?r(t,e,n):r(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let p=class extends C{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return g`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};p.styles=[$,L,W];x([h({type:Boolean})],p.prototype,"disabled",void 0);x([h({type:String})],p.prototype,"value",void 0);p=x([b("wui-input-numeric")],p);const A=O`
  :host {
    position: relative;
    display: block;
  }
`;var d=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(n=(o<3?r(n):o>3?r(t,e,n):r(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let u=class extends C{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map(()=>""),this.numerics=[],this.shouldInputBeEnabled=t=>this.values.slice(0,t).every(i=>i!==""),this.handleKeyDown=(t,e)=>{const i=t.target,o=this.getInputElement(i),n=["ArrowLeft","ArrowRight","Shift","Delete"];if(!o)return;n.includes(t.key)&&t.preventDefault();const r=o.selectionStart;switch(t.key){case"ArrowLeft":r&&o.setSelectionRange(r+1,r+1),this.focusInputField("prev",e);break;case"ArrowRight":this.focusInputField("next",e);break;case"Shift":this.focusInputField("next",e);break;case"Delete":o.value===""?this.focusInputField("prev",e):this.updateInput(o,e,"");break;case"Backspace":o.value===""?this.focusInputField("prev",e):this.updateInput(o,e,"");break}},this.focusInputField=(t,e)=>{if(t==="next"){const i=e+1;if(!this.shouldInputBeEnabled(i))return;const o=this.numerics[i<this.length?i:e],n=o?this.getInputElement(o):void 0;n&&(n.disabled=!1,n.focus())}if(t==="prev"){const i=e-1,o=this.numerics[i>-1?i:e],n=o?this.getInputElement(o):void 0;n&&n.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(""));const t=this.shadowRoot?.querySelectorAll("wui-input-numeric");t&&(this.numerics=Array.from(t)),this.numerics[0]?.focus()}render(){return g`
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map((t,e)=>g`
            <wui-input-numeric
              @input=${i=>this.handleInput(i,e)}
              @click=${i=>this.selectInput(i)}
              @keydown=${i=>this.handleKeyDown(i,e)}
              .disabled=${!this.shouldInputBeEnabled(e)}
              .value=${this.values[e]||""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `}updateInput(t,e,i){const o=this.numerics[e],n=t||(o?this.getInputElement(o):void 0);n&&(n.value=i,this.values=this.values.map((r,s)=>s===e?i:r))}selectInput(t){const e=t.target;e&&this.getInputElement(e)?.select()}handleInput(t,e){const i=t.target,o=this.getInputElement(i);if(o){const n=o.value;t.inputType==="insertFromPaste"?this.handlePaste(o,n,e):E.isNumber(n)&&t.data?(this.updateInput(o,e,t.data),this.focusInputField("next",e)):this.updateInput(o,e,"")}this.dispatchInputChangeEvent()}handlePaste(t,e,i){const o=e[0];if(o&&E.isNumber(o)){this.updateInput(t,i,o);const r=e.substring(1);if(i+1<this.length&&r.length){const s=this.numerics[i+1],y=s?this.getInputElement(s):void 0;y&&this.handlePaste(y,r,i+1)}else this.focusInputField("next",i)}else this.updateInput(t,i,"")}getInputElement(t){return t.shadowRoot?.querySelector("input")?t.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){const t=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:t,bubbles:!0,composed:!0}))}};u.styles=[$,A];d([h({type:Number})],u.prototype,"length",void 0);d([h({type:String})],u.prototype,"otp",void 0);d([_()],u.prototype,"values",void 0);u=d([b("wui-otp")],u);const D=S`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`;var m=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(n=(o<3?r(n):o>3?r(t,e,n):r(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n},w;let l=w=class extends R{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=f.getTimeToNextEmailLogin(),this.error="",this.otp="",this.email=P.state.data?.email,this.authConnector=I.getAuthConnector()}render(){if(!this.email)throw new Error("w3m-email-otp-widget: No email provided");const t=!!this.timeoutTimeLeft,e=this.getFooterLabels(t);return c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["l","0","l","0"]}
        gap="l"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${["0","xl","0","xl"]}
        >
          <wui-text variant="paragraph-400" color="fg-100" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="paragraph-500" color="fg-100" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="small-400" color="fg-200">The code expires in 20 minutes</wui-text>

        ${this.loading?c`<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>`:c` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error?c`
                    <wui-text variant="small-400" align="center" color="error-100">
                      ${this.error}. Try Again
                    </wui-text>
                  `:null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="small-400" color="fg-200">${e.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${t}>
            ${e.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}startOTPTimeout(){this.timeoutTimeLeft=f.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=f.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}async onOtpInputChange(t){try{this.loading||(this.otp=t.detail,this.shouldSubmitOnOtpChange()&&(this.loading=!0,await this.onOtpSubmit?.(this.otp)))}catch(e){this.error=k.parseError(e),this.loading=!1}}async onResendCode(){try{if(this.onOtpResend){if(!this.loading&&!this.timeoutTimeLeft){if(this.error="",this.otp="",!I.getAuthConnector()||!this.email)throw new Error("w3m-email-otp-widget: Unable to resend email");this.loading=!0,await this.onOtpResend(this.email),this.startOTPTimeout(),T.showSuccess("Code email resent")}}else this.onStartOver&&this.onStartOver()}catch(t){T.showError(t)}finally{this.loading=!1}}getFooterLabels(t){return this.onStartOver?{title:"Something wrong?",action:`Try again ${t?`in ${this.timeoutTimeLeft}s`:""}`}:{title:"Didn't receive it?",action:`Resend ${t?`in ${this.timeoutTimeLeft}s`:"Code"}`}}shouldSubmitOnOtpChange(){return this.authConnector&&this.otp.length===w.OTP_LENGTH}};l.OTP_LENGTH=6;l.styles=D;m([v()],l.prototype,"loading",void 0);m([v()],l.prototype,"timeoutTimeLeft",void 0);m([v()],l.prototype,"error",void 0);l=w=m([b("w3m-email-otp-widget")],l);export{l as W};
