import app from "./app";
import "./database";
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Se ecucha en el putero ${PORT}`);
});
