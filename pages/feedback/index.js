//this import wont be added in the client since it is a server-side import
import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  //this fn is unnecessary but I used it to explain dynamic route(take-note)
  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }
  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            {/* we used bind here bcus, if we do it like this -> loadFeedbackHandler(), this fn will execute 
        when this component renders not on button click, to avoid this, we used bind
        bind allows you to pre-configure a fn for future execution, the first value passed to bind
        is the 'this' keyword, since this is a fn, we pass null, the second value is the first
        parameter passed to the fn */}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  //we do not use fetch here since the data we need for the Component above is in same server with our Component
  //and getStaticProps only executes on this server not in the client, so we access the data directly

  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
