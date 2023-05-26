//this fn is reached with -> api/anything, maybe an Id
//note that you can also implement catch-all-rotes with [...feedback].js
import { buildFeedbackPath, extractFeedback } from ".";

function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
