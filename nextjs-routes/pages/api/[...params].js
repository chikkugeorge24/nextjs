const handler = (req, res) => {
  const { query } = req;
  const params = query.params;
  res.status(200).json(params);
};

export default handler;
