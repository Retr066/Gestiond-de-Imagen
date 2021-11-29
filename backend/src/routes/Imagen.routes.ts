import { Router } from "express";
const router = Router();
import upload from "../utils/multerConfig";
import * as ImgControlles from "../Controllers/ImagenController";

router.post("/upload", upload.single("image"), ImgControlles.uploadImage);
router.get("/imagen", ImgControlles.getAllImage);
router.get("/imagen/:id", ImgControlles.getImage);
router.delete("/imagen/:id", ImgControlles.deleteImage);
router.put("/imagen/:id", upload.single("image"), ImgControlles.updatemage);

export default router;
