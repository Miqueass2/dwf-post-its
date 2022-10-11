// COMPONENTES
import { headerEl } from "../components/header/index"
import { initTodoItem } from "../components/todo-item";
// PAGE
import { initHomePage } from "../pages/home"
import {state} from "./state"

(function () {
   state.init();

   headerEl();
   initTodoItem();
   const div = document.querySelector(".root")!;
   initHomePage(div);
})();