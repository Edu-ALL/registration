const t=e=>{window.localStorage.setItem("data-event",JSON.stringify(e))},n=()=>JSON.parse(window.localStorage.getItem("data-event")),o=()=>{window.localStorage.removeItem("data-event")},a={saveClientEvent:t,getClientEvent:n,destroyClientEvent:o};export{a as C};