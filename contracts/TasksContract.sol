// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {

    uint public taskCounter = 0;

    constructor () {
        createTask("mi tare ejemplo", "tarea de ejemplo papu");
    }

    // TO SAVE IN LOGS
    // This 'event' (called like that in solidity)
    // is used to save an object in logs, inside of an array
    // Data is defined by you
    // Here is the event to this project:
    event TaskCreated(
        uint id,
        string title,
        string description,
        bool done,
        uint createdAt
    );

    event TaskToggleDone(
        uint id,
        bool done
    );

    // DECLARE VARIABLES : STRUCT AND MAPPING
    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }
    mapping (uint256 => Task) public tasks;

    function createTask(string memory _title, string memory _description) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);

        // HERE YOU CALL EVENT FOR SAVE DATA THAT YOU SPECIFIED IN THE EVENT
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }
    
    function toggleDone(uint _id) public{
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskToggleDone(_id, _task.done);
    }


}