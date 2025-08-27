import{a6 as D,a1 as y,aJ as h,a3 as c,aF as _,$ as s,a0 as f,a8 as C,af as m,bj as W,a2 as $}from"./index-W7O16Knq.js";import{c as d}from"./index-KkpI0fgd.js";import{W as b}from"./index-BXVXKBFS.js";import{i as R,a as g,x as u,r as E}from"./state-Cf6Acp3J.js";import"./index-BTClOK_9.js";import"./index-DsLsIr5D.js";import{e as N,n as P}from"./ref-D8lD3BzL.js";import"./index-NtF0e3ax.js";import"./index-BwYKPcL7.js";import"./index-XAL8BJnK.js";import"./state-BNPL_3uu.js";import"./index-Cqg5Vvc8.js";import"./if-defined-Cjow_KMx.js";import"./index-DkewI-3x.js";import"./ref-DVXAuq4D.js";var T=function(a,e,t,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let x=class extends b{constructor(){super(...arguments),this.onOtpSubmit=async e=>{try{if(this.authConnector){const t=D.state.activeChain,r=y.getConnections(t),n=h.state.remoteFeatures?.multiWallet,i=r.length>0;if(await this.authConnector.provider.connectOtp({otp:e}),c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),t)await y.connectExternal(this.authConnector,t);else throw new Error("Active chain is not set on ChainControll");if(c.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"email",name:this.authConnector.name||"Unknown"}}),h.state.remoteFeatures?.emailCapture)return;if(h.state.siwx){_.close();return}if(i&&n){s.replace("ProfileWallets"),f.showSuccess("New Wallet Added");return}_.close()}}catch(t){throw c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:C.parseError(t)}}),t}},this.onOtpResend=async e=>{this.authConnector&&(await this.authConnector.provider.connectEmail({email:e}),c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}))}}};x=T([d("w3m-email-verify-otp-view")],x);const U=R`
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`;var S=function(a,e,t,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let w=class extends g{constructor(){super(),this.email=s.state.data?.email,this.authConnector=m.getAuthConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw new Error("w3m-email-verify-device-view: No email provided");if(!this.authConnector)throw new Error("w3m-email-verify-device-view: No auth connector provided");return u`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xxl","s","xxl","s"]}
        gap="l"
      >
        <wui-icon-box
          size="xl"
          iconcolor="accent-100"
          backgroundcolor="accent-100"
          icon="verify"
          background="opaque"
        ></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="s">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-400" color="fg-100">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="paragraph-400" color="fg-100"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="small-400" color="fg-200" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="xs">
            <wui-text variant="small-400" color="fg-100" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}async listenForDeviceApproval(){if(this.authConnector)try{await this.authConnector.provider.connectDevice(),c.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),s.replace("EmailVerifyOtp",{email:this.email})}catch{s.goBack()}}async onResendCode(){try{if(!this.loading){if(!this.authConnector||!this.email)throw new Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await this.authConnector.provider.connectEmail({email:this.email}),this.listenForDeviceApproval(),f.showSuccess("Code email resent")}}catch(e){f.showError(e)}finally{this.loading=!1}}};w.styles=U;S([E()],w.prototype,"loading",void 0);w=S([d("w3m-email-verify-device-view")],w);const F=R`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;var O=function(a,e,t,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let p=class extends g{constructor(){super(...arguments),this.formRef=N(),this.initialEmail=s.state.data?.email??"",this.redirectView=s.state.data?.redirectView,this.email="",this.loading=!1}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{e.key==="Enter"&&this.onSubmitEmail(e)})}render(){return u`
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${P(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `}onEmailInputChange(e){this.email=e.detail}async onSubmitEmail(e){try{if(this.loading)return;this.loading=!0,e.preventDefault();const t=m.getAuthConnector();if(!t)throw new Error("w3m-update-email-wallet: Auth connector not found");const r=await t.provider.updateEmail({email:this.email});c.sendEvent({type:"track",event:"EMAIL_EDIT"}),r.action==="VERIFY_SECONDARY_OTP"?s.push("UpdateEmailSecondaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView}):s.push("UpdateEmailPrimaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView})}catch(t){f.showError(t),this.loading=!1}}buttonsTemplate(){const e=!this.loading&&this.email.length>3&&this.email!==this.initialEmail;return this.redirectView?u`
      <wui-flex gap="s">
        <wui-button size="md" variant="neutral" fullWidth @click=${s.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `:u`
        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `}};p.styles=F;O([E()],p.prototype,"email",void 0);O([E()],p.prototype,"loading",void 0);p=O([d("w3m-update-email-wallet-view")],p);var j=function(a,e,t,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let I=class extends b{constructor(){super(),this.email=s.state.data?.email,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailPrimaryOtp({otp:e}),c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),s.replace("UpdateEmailSecondaryOtp",s.state.data))}catch(t){throw c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:C.parseError(t)}}),t}},this.onStartOver=()=>{s.replace("UpdateEmailWallet",s.state.data)}}};I=j([d("w3m-update-email-primary-otp-view")],I);var L=function(a,e,t,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let A=class extends b{constructor(){super(),this.email=s.state.data?.newEmail,this.redirectView=s.state.data?.redirectView,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailSecondaryOtp({otp:e}),c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),this.redirectView&&s.reset(this.redirectView))}catch(t){throw c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:C.parseError(t)}}),t}},this.onStartOver=()=>{s.replace("UpdateEmailWallet",s.state.data)}}};A=L([d("w3m-update-email-secondary-otp-view")],A);var V=function(a,e,t,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let v=class extends g{constructor(){super(),this.authConnector=m.getAuthConnector(),this.isEmailEnabled=h.state.remoteFeatures?.email,this.isAuthEnabled=this.checkIfAuthEnabled(m.state.connectors),this.connectors=m.state.connectors,m.subscribeKey("connectors",e=>{this.connectors=e,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)})}render(){if(!this.isEmailEnabled)throw new Error("w3m-email-login-view: Email is not enabled");if(!this.isAuthEnabled)throw new Error("w3m-email-login-view: No auth connector provided");return u`<wui-flex
      flexDirection="column"
      .padding=${["3xs","m","m","m"]}
      gap="l"
    >
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `}checkIfAuthEnabled(e){const t=e.filter(n=>n.type===W.CONNECTOR_TYPE_AUTH).map(n=>n.chain);return $.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(n=>t.includes(n))}};V([E()],v.prototype,"connectors",void 0);v=V([d("w3m-email-login-view")],v);export{v as W3mEmailLoginView,b as W3mEmailOtpWidget,w as W3mEmailVerifyDeviceView,x as W3mEmailVerifyOtpView,I as W3mUpdateEmailPrimaryOtpView,A as W3mUpdateEmailSecondaryOtpView,p as W3mUpdateEmailWalletView};
