export default function handler(req, res) {
  res.setPreviewData({ user: "Chikku" });
  res.redirect(req.query.redirect);
}
