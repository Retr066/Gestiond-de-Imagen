import { Response, RequestHandler } from "express";
import Imagen from "../Schema/ImageSchema";
import cloudinary from "../utils/cloudinary";
export const uploadImage: RequestHandler = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const fileStr = req.file?.path;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "preset_cosas",
    });
    const { public_id, url } = uploadedResponse;
    const newImage = {
      title,
      category,
      description,
      imgUrl: url,
      public_id,
    };
    const response = new Imagen(newImage);
    const savedImagen = await response.save();
    res.json(savedImagen);
  } catch (error) {
    res.json({ error });
  }
};

export const getAllImage: RequestHandler = async (req, res) => {
  try {
    const imagenes = await Imagen.find();
    return res.json(imagenes);
  } catch (error) {
    res.json(error);
  }
};

export const getImage: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const imgFound = await Imagen.findById(id);
  if (!imgFound) return res.status(204).json();
  return res.json(imgFound);
};

export const deleteImage: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const imgFound = await Imagen.findByIdAndDelete(id);
  if (!imgFound) return res.status(204).json();
  await cloudinary.uploader.destroy(imgFound.public_id);
  return res.json(imgFound);
};

export const updatemage: RequestHandler = async (
  req,
  res
): Promise<Response> => {
  const id = req.params.id;
  const fileStr = req.file?.path;
  if (!fileStr) {
    const imgUpdated = await Imagen.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!imgUpdated) return res.status(204).json();
    return res.json(imgUpdated);
  }
  const imgFound = await Imagen.findById(id);
  if (!imgFound) return res.status(204).json();
  await cloudinary.uploader.destroy(imgFound.public_id);
  const { title, description, category } = req.body;
  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: "preset_cosas",
  });
  const { public_id, url } = uploadedResponse;
  const newImage = {
    title,
    description,
    category,
    imgUrl: url,
    public_id,
  };

  const imgUpdated = await Imagen.findByIdAndUpdate(id, newImage, {
    new: true,
  });
  if (!imgUpdated) return res.status(204).json();
  return res.json(imgUpdated);
};
