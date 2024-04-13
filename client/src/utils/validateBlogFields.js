let characterLimit = 200;

let tagLimit = 5;

export const validateBlogFields = ({ title, des, tags }) => {
 
    if (!title.length) {
    return {
      error: true,
      message: "Title is required",
    };
  }

  if(!des.length){
    return {
      error: true,
      message: "Description is required",
    };
  }
  
  if (des.length > characterLimit) {
    return {
      error: true,
      message: `Description is required and should be less than ${characterLimit} characters`,
    };
  }

  if (!tags.length) {
    return {
      error: true,
      message: "At least one tag is required",
    };
  }

  if (tags.length > tagLimit) {
    return {
      error: true,
      message: `You can only add ${tagLimit} tags`,
    };
  }

  return {
    error: false,
  };
};
