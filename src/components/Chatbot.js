import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const API_KEY = "AIzaSyDpanN90i6l5QYhbp6OrQMKhyDW0tBLCDY"
const genAI = new GoogleGenerativeAI(API_KEY);
const Chatbot = () => {
  const token = localStorage.getItem('authtoken');
  const navigate = useNavigate();
  const [chat, setChat] = useState("");
  const [query, setQuery] = useState("");
const fetchData= async () => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = `${query}.  Present the data in a suitable HTML format.  Use the most appropriate HTML structure to represent the data, prioritizing semantic accuracy and accessibility.

Specifically:

-   If the data is a set of distinct items or categories, use an unordered list (<ul>).
-   If the data is a sequence of steps or a ranked list, use an ordered list (<ol>).
-   If the data consists of terms and their definitions, use a definition list (<dl>).
-   If the data is a table of information with rows and columns, use an HTML table (<table>) with a header row (<thead>) and body (<tbody>).
-   If the data is a single piece of information, format it as a paragraph (<p>) or heading (<h1>-<h6>) as appropriate.

Do not include any introductory or explanatory text before or after the HTML elements. The generated HTML should be well-formed, valid, and semantically correct.  If the query implies tabular data, make the first row the header row.
`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    // console.log(responseText)s
    let cleanedText = responseText.replace(/```html|```json|```/g, "").trim();
    setChat(cleanedText);
  } catch (error) {
    console.error("Error fetching diet plan:", error);
  }
};

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
     toast.success('Welcome To Our Ai Chat Bot', {
            position: 'top-center',
            theme: 'dark',
          });
    // eslint-disable-next-line
  }, []);

  return (
    <>
   <div className="chatbot-container">
                <div className="chatbot-header">
                    
                    <span role="img" className="robo">🤖</span>
                    <div className="chatbot-header-title">Healthcare Assistant</div>
                    </div>
                    <div className="output">
                    {query && (
          <div className="diet">
            <div dangerouslySetInnerHTML={{ __html: chat || "Loading..." }} />
        </div>
      )}
                    </div>

                    
      
                <div className="chatbot-input">
                    <input type="text" placeholder="Type your message..."  value={query} onChange={(e)=>setQuery(e.target.value)}/>
                    <button onClick={fetchData}>Send</button>
                </div>
    </div>
  <ToastContainer />
    
    </>
  );
};

export default Chatbot;
