const express = require("express");
const app = express();
const port = 3000;

let currentUsers = [];

app.use(express.json());

app.post("/using", (req, res) => {
  if (currentUsers.length > 0) {
    return res
      .status(201)
      .json({ message: `Machine currently use by ${currentUsers[0]}.` });
  }
  const user = req.body.user;
  currentUsers.push(user);
  res.status(200).json({ message: `${user} is now using the machine.` });
});

app.post("/force-taking", (req, res) => {
  currentUsers[0] = req.body.user;
  return res.status(200).json({
    message: `${currentUsers[0]} taking access of no machine using force command!`,
  });
});

app.post("/finish", (req, res) => {
  const user = req.body.user;
  if (currentUsers.length === 0) {
    res
      .status(202)
      .json({ message: "Machine already free! You can take access." });
  } else if (currentUsers.length > 0) {
    const activeUser = currentUsers.filter((u) => u === user);
    if (activeUser) {
      const index = currentUsers.indexOf(activeUser);
      currentUsers.splice(index, 1);
    } else {
      res.status(200).json({
        message: `${currentUsers[0]} using machine. Let him/her finish.`,
      });
      return;
    }
  }
  res
    .status(201)
    .json({ message: "Thank you for using machine!! it's free now." });
});
app.get("/who", (req, res) => {
  res.json({ currentUsers: currentUsers });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
