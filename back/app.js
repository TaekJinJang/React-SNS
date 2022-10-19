const express = require("express");
const postRouter = require("./routes/post");
const app = express();

// app.get -> 가져오다
// app.post -> 생성하다
// app.put -> 전체 수정 (통째로 덮는게 아니면 잘 안씀)
// app.delete -> 제거
// app.patch -> 부분 수정
// app.options -> 찔러보기 (요청을 보내도 되는지 확인용?)
// app.head -> 헤더만 가져오기 (잘 안씀)

app.get("/", (req, res) => {
  res.send("helo express");
});
app.get("/api", (req, res) => {
  res.send("helo express");
});
app.use("/post", postRouter);

app.listen(3003, () => {
  console.log("gdgd");
});
