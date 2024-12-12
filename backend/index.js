const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3010;

app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public/images")));

const dbconfig = require("./dbconfig.json")
const db = mysql.createConnection(dbconfig)

db.connect((err) => {
    if (err) {
        console.error("Ошибка подключения к базе данных:", err);
        return;
    }
    console.log("Подключение к базе данных успешно установлено.");
});

app.get("/sneakers", (req, res) => {
    const query = "SELECT * FROM sneakers";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Ошибка выполнения запроса:", err);
            res.status(500).send("Ошибка при запросе данных.");
        } else {
            const sneakers = results.map((sneaker) => ({
                ...sneaker,
                image_url: `/images/${sneaker.image_url}`,
            }));
            res.json(sneakers);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
