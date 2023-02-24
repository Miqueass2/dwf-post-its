import { state } from "../../src/state";
export function initTodoItem() {
   class TodoItems extends HTMLElement{
      // shadow: ShadowRoot;
      shadow:ShadowRoot = this.attachShadow({ mode: 'open' });
      title: string;
      checked: boolean;
      constructor() {
         super();
         
      }
      connectedCallback() {

         this.title = this.getAttribute("title") || "";
         
         this.checked = this.hasAttribute("checked");
         
         this.id = this.getAttribute("id")!;
      
         this.render();
      }
      addListenerCheck() {
         const checkInput: any = this.shadow.querySelector(".checkbox-input");
         
         checkInput?.addEventListener("click", (e) => {
            // console.log("soy chek",checkInput);
            const target = e.target as any
            const event = new CustomEvent('change', {
               detail: {
                  id: this.id,
                  value: target.checked,
               }
            });
            this.dispatchEvent(event);
         });

      }
      render() {
         console.log("render");
         
         const trashImage = require("../../assets/delete.png");
         const style = document.createElement('style');
         style.textContent = `
         .card{
            margin: 0 30px 20px 30px;
            padding:22px 13px;
            background-color:#FFF599;
            width:312px;
            height:110px;
            display: flex;
            justify-content: space-between;
         }
         .titulo.checked{
            text-decoration: line-through;
         }
         .checkbox-input{
            width: 43px;
            height: 22px;
         }
         .content-input{
            position: relative;
            top: 20px;
         }
         .img-trash{
            position: relative;
            top: -60px;
            right: -130px;
         }
         .trash{
            cursor:pointer;
            
         }
         .border-color{
            border:3px solid;

         }
         
         `;
         
         this.shadow.innerHTML = `
         <div class="card">
            <h3 class="titulo ${this.checked? "checked":""}">${this.title}</h3>
         <div class="content-input">
            <input class="checkbox-input" type="checkbox" ${this.checked? "checked" : ""}/>
         </div>
         
         
         </div>
         
         ${this.checked ? `<div class="img-trash">
         <img id="trashId" class="trash" src="${trashImage}">
      </div>`:""}
         `;
         const selectDivBorder:any = this.shadow.querySelector(".card");
         if (this.checked == true) {
            selectDivBorder.classList.add("border-color");
         }
         // ELIMINAR TASKS
         const trashDelete = this.shadow.querySelector('.trash');
         trashDelete?.addEventListener('click', () => {

            const cbTrue = state.getState().tasks;
            for (const i of cbTrue) {
               if (i.completed === true) {
                  state.deleteTasks(i.id);
                  // console.log("soy i",i.id);
                  // console.log("soy i",i.completed);
               }
            }
         });
         this.shadow.appendChild(style);
         this.addListenerCheck();
      }
   }
   customElements.define('todo-card', TodoItems);
}


