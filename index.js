const express = require("express");
const app = express();
const port = 8080;


app.use(express.json());


const DB = [
    {
        id: 0,
        text: "Text a",
        backgroundColor: "#4CAF50"
    },
    {
        id: 1,
        text: "Text b",
        backgroundColor: "#ADD8E6"
    },
    {
        id: 2,
        text: "Text c",
        backgroundColor: "#D8BFD8"
    },
    {
        id: 3,
        text: "Text d",
        backgroundColor: "#FFA500"
    }
];


const getNextId = () => 
    DB.length > 0?  Math.max(...DB.map(user => user.id)) + 1 : 0;


app.get("/", (req, res) => {
    res.json(DB);
});

app.post("/", (req, res) => {
    const { text, backgroundColor } = req.body;
    if (!text || !backgroundColor) 
        return res.status(400).send({ error: 'text and background are required' });
    const newCard = {
        id: getNextId(),
        text,
        backgroundColor,
    };
    DB.push(newCard);
    res.json(newCard);
});

app.patch('/:id', (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    let cardIndex = DB.findIndex(card => card.id == id);

    if (cardIndex === -1) return res.status(404).send({ error: 'Card not found' });

    DB[cardIndex] = { ...DB[cardIndex], ...req.body };
    res.json(DB[cardIndex]);
});

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = DB.findIndex(card => card.id == id);
    if (index !== -1) {
        const deletedCard = DB[index];
        DB.splice(index, 1);
        res.json(deletedCard);
    } else {
        res.status(404).send({ error: 'card not found' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
































