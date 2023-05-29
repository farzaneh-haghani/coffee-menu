const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const menuData = require("./data.json");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));


app.get("/home", function (request, response) {
  response.status(200).json(menuData);
});


app.put("/editForm", (req, res) => {
  const id = parseInt(req.body.id);
  const newItem = req.body;
  
  const itemIndex = menuData.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    res
      .status(400)
      .json({ success: "failure", message: "This id does not exist" });
  }
  
  menuData.splice(itemIndex, 1, newItem);
  res.status(200).json({ success: true, item: newItem });
});


app.post("/", (req, res) => {
  res.json({ success: true });
});


app.get("/menu/q", function (request, response) {
  const str = (request.query.str).toLowerCase();
  
  const filteredMenuItems = menuData.filter((item) => {
    return (
      item.title.toLowerCase().includes(str) ||
      item.category.toLowerCase().includes(str) ||
      item.desc.toLowerCase().includes(str)
    );
  });

  if (filteredMenuItems.length > 0) {
    response.status(200).json(filteredMenuItems);
  } else {
    response.status(404).json({ message: "No items match." });
  }
});


const port = process.env.PORT ?? 3005;
app.listen(port, () =>
  console.log("Your app is listening on port " + port)
);
