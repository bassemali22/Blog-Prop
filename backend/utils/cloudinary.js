const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
    });
    return data;
  } catch (error) {
    throw new Error("Internal Server Error(Cloudinary)");
  }
};

const cloudinaryRemoveImage = async (iamgePublicuId) => {
  try {
    const result = cloudinary.uploader.destroy(iamgePublicuId);
    return result;
  } catch (error) {
    return error;
  }
};

const cloudinaryReomeMultipleImage = async (PublicuIds) => {
  try {
    const result = cloudinary.v2.api.delete_resources(PublicuIds);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryReomeMultipleImage,
};
