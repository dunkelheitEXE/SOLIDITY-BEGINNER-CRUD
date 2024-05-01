const TasksContract = artifacts.require("TasksContract");
contract("TasksContract", ()=>{

    before(async()=>{
        this.tc = await TasksContract.deployed();
    });

    it('migrate deployed successfully', async ()=>{
        const address = this.tc.address;
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it('get Tasks List', async() => {
        const counter = await this.tc.taskCounter();
        const task = await this.tc.tasks(counter);

        assert.equal(task.id.toNumber(), counter);
        assert.equal(task.title, "mi tare ejemplo");
        assert.equal(task.description, "tarea de ejemplo papu");
        assert.equal(task.done, false);
        assert.equal(counter, 1);
    })

    it('task created successfully', async ()=>{
        const result = await this.tc.createTask(
            "some Task added", 
            "I've been learning"
        );

        const taskEvent = result.logs[0].args;
        const taskCounter = await this.tc.taskCounter();

        assert.equal(taskCounter.toNumber(), 2);
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "some Task added");
        assert.equal(taskEvent.description, "I've been learning");
        assert.equal(taskEvent.done, false);
    });

    it('Task Toggle Done', async ()=>{
        const result = await this.tc.toggleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.tc.tasks(1);
        
        assert.equal(taskEvent.done, true);
        assert.equal(taskEvent.id, 1);
        assert.equal(task.done, true);
    });
});