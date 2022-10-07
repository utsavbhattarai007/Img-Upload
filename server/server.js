//Importing dependencies
import express from "express";
import multer from "multer";
import cors from "cors"

//Making Instances
const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(cors("*"));


// setting up the storage mechanism
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
});

/* Creating an instance of multer with the storage mechanism we defined above. */
const upload = multer({
  storage: storage,
});

//Routes
app.get("/", (req, res) => res.send("Hello World!"));

//Serving the static files from the uploads folder. 
app.use("/uploads", express.static("uploads"));

//Img Url Route
app.post("/api/upload", upload.single("pic"), async (req, res) => {
  try {
    if (req.file === undefined)
      return res
        .status(400)
        .json({ error: false, msg: "You must select a file." });
    const url =
      req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
    res
      .status(200)
      .json({ error: false, msg: "File uploaded successfully!", imgUrl: url });
  } catch (error) {
    res.status(400).json({ error: true, msg: "Img upload failed" });
  }
});

//Listening on port
app.listen(port, () => console.log(`Listening on port ${port}!`));
