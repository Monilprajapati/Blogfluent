import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { uploadImage } from "../common/aws";

// This function is used to upload image by url : Pasting the URL in the Marku
const uploadImageByUrl = (e) => {
  // This promise is used to handle the async operation of uploading image by url
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (err) {
      reject(err);
    }
  });

  // After getting the link, we return the link
  return link.then(
    (res) => {
      return res;
    },
    (err) => {
      return err;
    }
  );
};

// This function is used to upload image by file
const uploadImageByFile = async (e) => {
  // Here we are using function to upload the image in the aws s3 bucket
  return await uploadImage(e)
    .then((url) => {
      if (url) {
        return {
          success: 1,
          file: {
            url,
          },
        };
      }
    })
    .catch((error) => {
      console.log(error);
      return {
        success: 0,
        file: {
          url: "",
        },
      };
    });
};

// Editor js tools to be used in the editor
export const EDITOR_JS_TOOLS = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  code: Code,
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  inlineCode: InlineCode,
};
