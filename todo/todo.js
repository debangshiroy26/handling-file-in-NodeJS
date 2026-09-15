//fs stands for: File System  (It is a built-in Node.js module. It gives you functions to work with files and folders. For example: fs.readFileSync(), fs.writeFileSync(), etc.)


const fs = require('fs');      //Node.js, give me the built-in File System module and store it inside the variable fs.

const filePath = "./tasks.json";


//purpose of this function is: Read tasks.json and convert its contents into a JavaScript array. 
const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);     // Node.js typically gives you a Buffer when reading a file this way without an encoding. A Buffer is basically Node's way of representing raw binary data.

        const dataJSON = dataBuffer.toString();    //.toString() converts the Buffer into normal text.

        return JSON.parse(dataJSON);        //We need to convert JSON text into a JavaScript object/array.

    } catch (error) {
        return [];      //If the file doesn't exist, we return an empty array. It says: If I can't load the tasks, assume there are currently no tasks.

    }
}

//purpose of this function is: Take a JavaScript array and save it to tasks.json.
const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks);      //JSON.stringify() converts a JS object/array into JSON text, so that it can be saved to a file.
    fs.writeFileSync(filePath, dataJSON);     // write the JSON text to tasks.json, creating the file if it doesn't exist, or overwriting it if it does.

}


// purpose of this function is: Add a new task to the tasks.json file.
const addTask = (task) => {
    const tasks = loadTasks();    //Load the existing tasks from tasks.json into a JavaScript array.
    tasks.push({ task });
    saveTasks(tasks);
    console.log("Task added", task)

}


// purpose of this function is: Remove a task from the tasks.json
const removeTask = (index) => {
    const tasks = loadTasks();

    if (index < 1 || index > tasks.length) {
        console.log("Invalid task number");
        return;
    }

    const removedTask = tasks.splice(index - 1, 1);

    saveTasks(tasks);

    console.log("Task removed:", removedTask[0].task);
};




// purpose of this function is: List all tasks in the tasks.json file. 
const listTasks = () => {
    const tasks = loadTasks();    // Again load the existing tasks from tasks.json into a JS array.

    tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));   // Loop through the array and print each task to the console, along with its index (starting from 1).

}



// This is how your program receives input from the terminal. (process.argv is an array.)
const command = process.argv[2];
const argument = process.argv[3];

if (command === 'add') {
    addTask(argument)
} else if (command === 'list') {
    listTasks()
} else if (command === 'remove') {
    removeTask (parseInt(argument))
} else {
    console.log("Command not found !");
}