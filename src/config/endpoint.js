const endpoint = {
  coloco: {
    host:
      process.env.REACT_APP_ENVIRONMENT === "production"
        ? `${process.env.REACT_APP_API_COLOCO_URL}/api`
        : `${process.env.REACT_APP_API_COLOCO_URL}/api`,
  },
};

export default endpoint;
