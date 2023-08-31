import path from "path"
import multer from "multer";
import { Router } from "express";
const route = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

route.post("/", upload.single("image"), (req, res) => {
    res.send({
        message: "Image uploaded",
        image: `http://${req.hostname}:${process.env.PORT}/uploads/${req.file.filename}`
    })
})

export default route