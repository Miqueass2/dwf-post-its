export const state = {
   data: {
      tasks: [
         { id: 1, title: "Item Example", completed: false },
         { id: 4, title: "Thirty item", deleted: true },
      ],
   },
   listeners: [],
   init() {
      const saveData = localStorage.getItem("saved-state")!;
      this.setState(JSON.parse(saveData));
   },
   getState() {
      return this.data;
   },
   getEnabledTasks() {
      const currentState = this.getState();
      //el signo ! funciona como un if negativo,
      //!t.deleted = si no tiene deleted false pasa el filtro, pero si tiene !deleted true no pasa.
      return currentState.tasks.filter((t) => !t.deleted)
   },
   setState(newState) {
      this.data = newState;
      for (const cb of this.listeners) {
         cb(newState);
      }
      console.log("soy el state, i change", this.data);
      localStorage.setItem("saved-state", JSON.stringify(newState))
   },
   subscribe(callback: (any) => any) {
      this.listeners.push(callback);
   },
   addTask(id, title) {
      const cb = state.getState();
      cb.tasks.push({ id, title, completed: false });
      this.setState(cb)
   },
   changeCompletedState(id, value) {
      const cb = state.getState();
      const foundId = cb.tasks.find((t) => t.id == id)
      foundId.completed = value;
      this.setState(cb)
      // console.log("task encontrado",foundId);

      // console.log("id",id);
      // console.log("value",value);
      
   },
   deleteTasks(taskId: number) {
      // El operador de desigualdad estricta ( !==) comprueba 
      //si sus dos operandos no son iguales y devuelve un resultado booleano.
      const currentState = this.getState();
      currentState.tasks = currentState.tasks.filter((i) => i.id !== taskId)
      // console.log("se elimino un id",currentState);
      
      this.setState(currentState);
   },
}

