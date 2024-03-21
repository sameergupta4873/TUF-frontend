"use client";
import Image from "next/image";
import CodeMirror from "@uiw/react-codemirror";
import React, { use, useEffect } from "react";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import Navbar from "@/components/Navbar";

export default function Home() {
  const sampleCode = "";
  const [code, setCode] = React.useState(sampleCode);
  const [input, setInput] = React.useState(""); // input for stdin
  const [language, setLanguage] = React.useState("cpp");
  const [username, setUsername] = React.useState(""); // input for stdin
  const [loading, setLoading] = React.useState(false);
  const [verdict, setVerdict] = React.useState("");
  const [success, setSuccess] = React.useState<any>(null);

  const onChange = React.useCallback((val: any, viewUpdate: any) => {
    console.log("val:", val);
    setCode(val);
  }, []);
  const onChangeInput = React.useCallback((val: any, viewUpdate: any) => {
    console.log("val:", val);
    setInput(val);
  }, []);
  const onChangeLanguage = React.useCallback((e: any) => {
    console.log("val:", e.target.value);
    setLanguage(e.target.value);
  }, []);

  // create submission in  backend
  const createSubmission = async () => {
    let verdict = "";
    try {
      const response = await fetch("https://tuf-backend-dun.vercel.app/api/v1/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          stdin: input,
          language: language,
          username: username,
        }),
      });
      const data = await response.json();
      console.log(data);
      verdict = data?.status || "Internal Server Error";
      setSuccess(data?.status === "success");
    } catch (error) {
      console.error("Error:", error);
      setSuccess(false);
    }
  };

  const onSubmit = () => {
    setVerdict("Submitting code...");
    setSuccess(null);
    setLoading(true);
    // check if username, code, language, input is not empty
    if (!username || !code || !language) {
      setVerdict("Please fill all the fields!");
      setSuccess(false);
      setLoading(false);
      return;
    }
    createSubmission();
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setVerdict("Code submitted successfully! :)");
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (success === false) {
      const timer = setTimeout(() => {
        setVerdict("Code submission failed! :(");
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      if (loading) {
        const timer = setTimeout(() => {
          setVerdict("Submitting code...");
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [success]);

  return (
    <main className="">
      <Navbar activeProp={"Home"} />
      <div className="pt-[5rem] px-[20rem] w-full">
        <div className="h-[4rem] bg-[#F3F7F7] border-[1.5px] flex justify-start items-center px-[1.25rem] mb-[2rem] shadow">
          <h1 className="text-[#4e5c65] font-[400] text-[1rem]">Username</h1>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded outline-none focus:ring-gray-600 focus:border-gray-600 block w-[25rem] px-2.5 py-2 ml-3"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="h-[90vh] w-full form-shadow mb-[2rem]">
          <div className="h-[4rem] bg-[#F3F7F7] border-y-[1.5px] flex justify-between items-center px-[1.25rem]">
            <div className="flex justify-start items-center">
              <h1 className="text-[#4e5c65] font-[400] text-[1.25rem]">
                Code Submission
              </h1>
            </div>
            <div className="flex justify-end items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="w-6 h-6 text-[#738F93] hover:text-[#0E141E] hover:cursor-pointer"
                onClick={() => setCode("")}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <div className="border border-[#CFDADC] ml-[1rem] h-[1.5rem]"></div>
              <h1 className="ml-[1rem] text-[#4e5c65] font-[300] text-[1rem] mr-[0.25rem]">
                Language
              </h1>
              <select
                value={language}
                onChange={onChangeLanguage}
                className="pl-[0.5rem] py-[0.5rem] pr-[2rem] outline-none border border-[#CFDADC] rounded-md hover:border-[#0A0A0B] text-sm"
              >
                <option value="c++">C++</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>
            </div>
          </div>
          <CodeMirror
            value={code}
            onChange={onChange}
            height="81.5vh"
            extensions={[cpp(), javascript(), python(), java()]}
            placeholder={"// your code here\n"}
          />
        </div>
        <div className="h-[15vh] w-full form-shadow mb-[2rem]">
          <div className="h-[2rem] bg-[#F3F7F7] border-y-[1.5px] flex justify-between items-center px-[1.25rem]">
            <div className="flex justify-start items-center">
              <h1 className="text-[#4e5c65] font-[300] text-[0.75rem]">
                STDIN
              </h1>
            </div>
          </div>
          <CodeMirror
            value={input}
            onChange={onChangeInput}
            height="13vh"
            placeholder={"input here\n"}
          />
        </div>
        <div className="mt-[3rem] h-[2.5rem] mb-[5rem] w-full flex justify-between items-center pl-[2rem] pr-[0.25rem]">
          <div className="flex justify-center items-start h-full text-[#738F93]">
            <div className="flex items-center mr-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.75"
                stroke="currentColor"
                className="w-4 h-4 mr-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
              <h1 className="text-sm font-[400] hover:underline hover:cursor-pointer">
                UploadCodeasFile
              </h1>
            </div>
            {/* <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <label htmlFor="default-checkbox" className="text-sm font-[400] hover:cursor-pointer">
                Test against custom input
              </label>
            </div> */}
          </div>
          <div className="flex justify-center items-end h-full">
            {/* <button className="px-[1rem] h-full bg-[#FFFFFF] hover:bg-[#EAEAEC] rounded-sm text-[0.85rem] font-[500] mr-2.5 border">
              Run Code
            </button> */}
            <button
              onClick={onSubmit}
              className="px-[2rem] h-full bg-[#01751F] text-white hover:bg-[#015217] rounded-sm text-[0.85rem] font-[500]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed bottom-0 w-full bg-[#F3F7F7] flex justify-center items-center ${verdict ? "h-[8vh]" : "h-0"} transition-all duration-500 ease-in-out shadow-2xl`}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner center mr-5">
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
            </div>
            <h1 className="text-[#4e5c65] font-[400] text-[1rem]">
              {verdict}
            </h1>
          </div>
        ) : (
          <h1 className={`text-[#4e5c65] ${success === true ? "text-green-600" : success === false && "text-red-600"} font-[500] text-[1rem]`}>
            {verdict}
          </h1>
        )}
      </div>
    </main>
  );
}
