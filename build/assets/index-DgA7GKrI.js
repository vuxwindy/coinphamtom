import{S as d,T as p,aj as u,V as f,W as m}from"./index-W7O16Knq.js";import{n as h,c as b}from"./index-KkpI0fgd.js";const g=d`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-object-fit='cover']) img {
    object-fit: cover;
    object-position: center center;
  }

  :host([data-object-fit='contain']) img {
    object-fit: contain;
    object-position: center center;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
`;var s=function(r,i,o,c){var a=arguments.length,t=a<3?i:c===null?c=Object.getOwnPropertyDescriptor(i,o):c,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,i,o,c);else for(var l=r.length-1;l>=0;l--)(n=r[l])&&(t=(a<3?n(t):a>3?n(i,o,t):n(i,o))||t);return a>3&&t&&Object.defineProperty(i,o,t),t};let e=class extends f{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0,this.objectFit="cover"}render(){return this.objectFit&&(this.dataset.objectFit=this.objectFit),this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,m`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};e.styles=[p,u,g];s([h()],e.prototype,"src",void 0);s([h()],e.prototype,"alt",void 0);s([h()],e.prototype,"size",void 0);s([h()],e.prototype,"objectFit",void 0);e=s([b("wui-image")],e);
