const config = {
  port: process.env.PORT,
};

// now this object is read only in other file
export default Object.freeze(config);
