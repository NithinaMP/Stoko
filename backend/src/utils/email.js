exports.send = async (to, subject, body) => {
  console.log("Pretend sending email to:", to, subject);
  return Promise.resolve();
};
