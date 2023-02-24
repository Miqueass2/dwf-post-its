//el componente no interactuca con el estado
//la page si interactua con el estado


import { state } from "../../src/state";
export function initHomePage(container: Element) {
   const div = document.createElement("div");
   
   const tasks = state.getEnabledTasks();

   div.innerHTML = `
      <header-component></header-component>
      <div class="content-h1">
         <h1 class="title-h1">Mis Pendientes</h1>
      </div>
      <form class="content">
         <input class="input"/>
         <button class="addButon">Agregar</button>
      </form>
      
      <ul class="list"></ul>
      `;
   
   const listEl = div.querySelector(".list")!;
   
   function createTasks(itemTasks) {
      listEl.innerHTML = "";
      for (const tasks of itemTasks) {
         console.log("im itemTasks",itemTasks)
         const todoItemEl = document.createElement('todo-card');
         todoItemEl.classList.add("container-todo")
         todoItemEl.setAttribute("title", tasks.title);
         todoItemEl.setAttribute("id", tasks.id);
         if (tasks.completed) {
            todoItemEl.setAttribute("checked", "true");
            // todoItemEl.style. = "black";
         }
         todoItemEl.addEventListener('change', (e:any) => {
            state.changeCompletedState(e.detail.id, e.detail.value);    
         });
         listEl.appendChild(todoItemEl);
      }
      
   }


   state.subscribe(() => {
      createTasks(state.getEnabledTasks());   

   })
   
   createTasks(tasks); 
   

   const style = document.createElement('style');
   style.textContent = `
   .container-todo{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
   }
   .title-h1{
      width:271px;
      font-size:52px;
      margin:41px 74px 25px 30px;
   }
   @media (min-width:759px){
      .title-h1{
      width:auto;
      }
      .list{
         display: grid;
         grid-template-columns: 393px 387px;
         justify-content: center;
      }
   }
   .content{
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
   }
   @media (min-width:759px){
      .content{
      flex-direction:row;

      }
   }
   .content-h1{
      display: flex;
      justify-content: center;
      align-items: center;
   }
   .input{
      width:300px;
      height:42px;
      margin: 0 32px 15px
   }
   .addButon{
      width:300px;
      height:42px;
      background-color: #9CBBE9;
      font-size:22px;
      color:black;
      border-style:none;
      margin-bottom: 40px;
   }
   @media (min-width:759px){
      .addButon{
         width: 240px;
         margin-bottom: 16px;
      }
      .input{
         width: 450px;
         border:2px solid;
      }
   }
   @media (min-width:1167px){
      .list{
         grid-template-columns: 393px 361px 391px;
         justify-content: center;
      }
   }
   `;



   
   const formEl = div.querySelector(".content");
   formEl?.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputEl: any = div.querySelector(".input");
      const valueInput = inputEl.value
      // console.log(valueInput);
         if (valueInput === "") {
            alert("No se puede agregar un campo vacio")
            return false
         } else {
            state.addTask(Math.random(), valueInput);
            inputEl.value = "";
         }
      
   })
   container.appendChild(div);
   container.appendChild(style);
}