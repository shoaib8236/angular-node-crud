const express = require("express");
var cors = require("cors");
const { records } = require("../data");
const app = express();
const port = 8080;

// *** *** libs usage *** *** //

app.use(cors());
app.use(express.json());

// *** *** libs usage ends *** *** //

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let users = [];

for (let index = 0; index < 12; index++) {
  users.push(records(index + 1));
}

app.get("/users-data", (req, res) => {
  try {
    setTimeout(() => {
      return res.status(200).send({
        message: "successfully",
        status: 200,
        data: users,
      });
    }, 1000);
  } catch (error) {
    return res.status(400).send({
      message: "Error",
      status: 400,
      data: [],
    });
  }
});

app.delete(`/delete-user/:id`, (req, res) => {
  let ids = req.params.id.split(",");
  users = users.filter((item) => !ids.includes(item._id));

  try {
    return res.status(200).send({
      message: "successfully deleted",
      status: 200,
      data: users,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Failed to delete users",
      status: 400,
      data: [],
    });
  }
});

app.post(`/add-user`, (req, res) => {
  let body = {
    _id: `${users.length + 1}`,
    ...req.body,
  };
  users = [...users, body];

  try {
    return res.status(200).send({
      message: "successfully added",
      status: 200,
      data: users,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Failed to add users",
      status: 400,
      data: [],
    });
  }
});

app.put(`/update-user/:id`, (req, res) => {
  users = users.map((item) =>
    item._id === req.params.id ? { ...item, ...req.body } : item
  );

  try {
    return res.status(200).send({
      message: "successfully updated",
      status: 200,
      data: users,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Failed to update user",
      status: 400,
      data: [],
    });
  }
});
