"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState<any>(null);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [verdict, setVerdict] = useState<any>(null);

  const getTimeandDate = (date: any) => {
    const d = new Date(date);
    return d.toLocaleString();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://tuf-backend-dun.vercel.app/api/v1/submissions");
      const data = await response.json();
      console.log(data);
      setTableData(data?.submissions || []);
    } catch (error) {
      console.error("Error:", error);
    }finally{
        setLoading(false);
    }
  };

  const fetchSubmission = async (submission: any) => {
    setSubmissionLoading(true);
    let language_id = 52;
    if (submission.language === "python") {
      language_id = 71;
    } else if (submission.language === "java") {
      language_id = 62;
    } else if (submission.language === "javascript") {
      language_id = 63;
    }
    try {
      const response = await fetch(
        "https://tuf-backend-dun.vercel.app/api/v1/submissions/run",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_code: submission.source_code,
            stdin: submission.stdin,
            language: language_id,
          }),
        }
      );
      const promise = await response.json();
      console.log(promise);
      if (promise.status === "success") {
        let out = promise?.data?.stdout;
        // convert base64 to string
        out = atob(out);
        setOutput(out);
        if (promise?.data?.status === "Accepted") {
          setVerdict("Accepted");
        } else {
          setVerdict(promise?.data?.status?.description || "Error in code");
        }
      } else {
        setVerdict("Error in code");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setSubmissionLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <>
      <Navbar activeProp={"Submissions"} />
      <div className="px-[15rem] pt-[5rem] bg-[#FDFCFA] h-[100vh]">
        {tableData.length !== 0 ? (
          <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Language
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Timestamp
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  tableData?.map((item: any, index: any) => {
                    return (
                      <>
                        <tr className="odd:bg-white even:bg-gray-50">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {item.username}
                          </th>
                          <td className="px-6 py-4">{item.language}</td>
                          <td className="px-6 py-4">
                            {getTimeandDate(item.submission_datetime)}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => {
                                if (submissionId === item.id) {
                                  setSubmissionId(null);
                                } else {
                                  setSubmissionId(item?.id || null);
                                  setOutput(null);
                                  setVerdict(null);
                                }
                              }}
                              className="font-medium text-blue-600 hover:underline"
                            >
                              {submissionId === item.id
                                ? "Hide"
                                : "View Submission"}
                            </button>
                          </td>
                        </tr>
                        <tr
                          className={`${
                            submissionId === item.id ? "max-h" : "h-0"
                          } transition-all duration-300 ease-in-out`}
                        >
                          {submissionId === item.id && (
                            <td colSpan={4} className="p-4">
                              <pre className="bg-gray-100 p-4">
                                {item.source_code}
                              </pre>
                              {/* stdin */}
                              <div className="mt-4">
                                <h1 className="text-sm font-[500] ml-2 mb-2">
                                  Input
                                </h1>
                                <pre className="bg-gray-100 p-4">
                                  {item.stdin || "No input provided"}
                                </pre>
                              </div>
                              {/* Run button & Code */}
                              <button
                                onClick={() => {
                                  fetchSubmission(item);
                                }}
                                disabled={submissionLoading}
                                className="px-[1rem] py-[0.5rem] h-full bg-[#FFFFFF] hover:bg-[#EAEAEC] rounded-sm text-[0.85rem] font-[500] mr-2.5 border mt-5"
                              >
                                {submissionLoading ? "Running..." : "Run Code"}
                              </button>
                              {/* Verdict */}
                              {verdict && (
                                <div className="mt-4">
                                  <h1 className="text-sm font-[500] ml-2 mb-2">
                                    Verdict
                                  </h1>
                                  <pre className="bg-gray-100 p-4">
                                    {verdict || "No verdict"}
                                  </pre>
                                </div>
                              )}
                              {output && (
                                <div className="mt-4">
                                  <h1 className="text-sm font-[500] ml-2 mb-2">
                                    Output
                                  </h1>
                                  <pre className="bg-gray-100 p-4">
                                    {output || "No output"}
                                  </pre>
                                </div>
                              )}
                            </td>
                          )}
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : loading && (
          <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] spinner center">
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
        )}
      </div>
    </>
  );
};

export default Page;
