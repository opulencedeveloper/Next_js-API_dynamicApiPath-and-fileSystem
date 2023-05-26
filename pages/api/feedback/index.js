// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

//you can extract this fn to a feedback folder, inside a file and import it from there, since we used this fn in another file, this is makes your code readable
export function buildFeedbackPath() {
  //join() to construct or add the path together
  //cwd means Current Working directory, which is the root path, no matter where this code is copied to
  //maybe to an online server,
  return path.join(process.cwd(), "data", "feedback.json");
}

//you can extract this fn to a feedback folder, inside a file and import it from there, since we used this fn in another file, this is makes your code readable
export function extractFeedback(filePath) {
  //readFileSync means the code execution will stop here untill the file reading is done, then it can continue
  const fileData = fs.readFileSync(filePath);

  //JSON.parse, is used to convert 'fileData' to a JS object, so we can append new data to it
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    const filePath = buildFeedbackPath();

    const data = extractFeedback(filePath);

    //since the file is stored as any array, we push the data which is now an Obj to it
    data.push(newFeedback);

    //writeFileSync means the code execution will stop here until the file writing is done, then it can continue
    //JSON.stringify is used to convert data to JSON, so we stored it back as json ARRAY to the file
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();

    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
