
// OBJECT CREATION
App = {

    web3Provider: "",

    init: ()=>{
        console.log("Server Successfully");
        App.loadEther();
        App.loadContracts();
    },

    loadEther: async ()=> {
        if(window.ethereum) {
            console.log("Ethereum Exist!");
            App.web3Provider = window.ethereum;
            await window.ethereum.request({method: 'eth_requestAccounts'});
        } else {
            console.log("Please, before to continue, install meta mask");
        }
    },

    loadContracts: async ()=>{
        const result = await fetch('TasksContract.json');
        const tasksContractJSON = await result.json();
        console.log(tasksContractJSON);
    }
}

App.init();
