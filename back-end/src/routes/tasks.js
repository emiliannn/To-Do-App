const router = require('express')();
const axios = require('axios');
const { Console, time } = require('console');
const fsP = require('fs/promises');
const fs = require('fs');

const { networkInterfaces } = require('os');
const dir = 'src/DB';


router.use(require('express').json())  
router.use(require('express').urlencoded({ extended: true }))


async function writeData(taskList, request) {
    if (request !== null) {
        taskList.push(request);
    }

    taskList = JSON.stringify(taskList);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const result = await fsP.writeFile(`${dir}/tasks.json`, taskList);
    return result;
}


router.get('/tasks', async (req, res) => {
    try {
        const v = await fsP.readFile(`${dir}/tasks.json`);
        res.status(200).json(
            {   
                message: "Succes! Data has been retrieved.",
                result: 'succes',
                value: JSON.parse(Buffer.from(v).toString())
            })
        }
    catch (ex) {
        res.status(500).json({
            message: ex.message,
            result: 'error'
        })
    }

})

router.post('/task', async (req, res) => {
    let task = req.body;
    console.log(task)
    try {
        let taskList = await fsP.readFile(`${dir}/tasks.json`);
        taskList = JSON.parse(Buffer.from(taskList).toString());

        writeData(taskList, task)
            .then(() => {
                res.status(200).json({
                    message: "Succes! Data has been written",
                    result: 'succes'
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: err,
                    result: 'error'
                })
            })
    }
    catch (ex) {
        res.status(500).json({
            message: ex,
            result: 'error'
        })
    }
});


router.put('/task', async (req, res) => {
    const taskId = req.body.id;
    const task = req.body;

    try {
        let taskList = await fsP.readFile(`${dir}/tasks.json`);
        taskList = JSON.parse(Buffer.from(taskList).toString());

        if (taskList !== undefined && taskList !== null && taskList.length > 0) {
            for (let t of taskList) {
                if (t.id === taskId) {
                    taskList[taskList.indexOf(t)] = task;
                    break;
                }
            }

            writeData(taskList, null)
                .then(() => {
                    res.status(200).json({
                        message: "Succes! Data has been updated.",
                        result: 'succes'
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err,
                        result: 'error'
                    })
                })
        }


    }
    catch (ex) {
        res.status(500).json({
            message: ex.message,
            result: 'error'
        })
    }
});


router.delete('/task/:taskId', async (req, res) => {
    const taskId = req.params.taskId;

    try {
        let taskList = await fsP.readFile(`${dir}/tasks.json`);
        taskList = JSON.parse(Buffer.from(taskList).toString());

        if (taskList !== undefined && taskList !== null && taskList.length > 0) {
            for (let t of taskList) {

                if (t.id === taskId) {
                    taskList.splice(taskList.indexOf(t), 1);
                    break;
                }
            }

            writeData(taskList, null)
                .then(() => {
                    res.status(200).json({
                        message: "Succes! Task has been deleted.",
                        result: 'succes'
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err,
                        result: 'error'
                    })
                })
        }


    }
    catch (ex) {
        res.status(500).json({
            message: ex.message,
            result: 'error'
        })
    }
});




module.exports = router;