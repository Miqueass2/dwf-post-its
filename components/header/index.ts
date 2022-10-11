export function headerEl() {
   
   class Header extends HTMLElement{
      shadowRoot: ShadowRoot | null;
      shadow = this.attachShadow({ mode: 'open' });
      constructor() {
         super();
         this.render();
      }
      render() {
         let style = document.createElement('style');
         style.textContent = `
         .header{
            background-color:#FF8282;
            height:55px;
         }
         `;

         this.shadow.innerHTML = `
         <header class="header"></header>
         `;
         this.shadow.appendChild(style)
      }
   }
   customElements.define('header-component',Header)
}