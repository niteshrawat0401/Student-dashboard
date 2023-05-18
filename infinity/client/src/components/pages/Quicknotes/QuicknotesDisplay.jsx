import React from 'react'

export const QuicknotesDisplay = ({data}) => {
    // console.log("data", data);
  return (
    <div>
        <div 
        // className={clas.notes_container}
        >
                  {data.length == 0 ? (
                    <div>
                      <img
                        style={{ width: "20rem" }}
                        src="https://easyhaionlinewebsite.s3.amazonaws.com/5437683.jpg"
                      />
                      <h1>Notes are not available</h1>
                    </div>
                  ) : (
                    <div>
                      <h2 style={{ fontSize: "22px" }}>QuickNotes</h2>
                      <table
                    //    className={clas.table_notes}
                       >
                        <thead
                        //  className={clas.theader}
                         >
                          <tr>
                            <th style={{ border: "1px solid black" }}>
                              Subject
                            </th>
                            <th style={{ border: "1px solid black" }}>Notes</th>
                            <th style={{ border: "1px solid black" }}>Q&A</th>
                          </tr>
                        </thead>

                        <tbody
                        //  className={clas.body}
                         >
                          { data.map((ele, i) => (
                            <tr key={i}>
                              <td
                                style={{
                                  border: "1px solid black",
                                  fontSize: "15px",
                                  fontWeight: "bold",
                                }}
                              >
                                {ele.subject}
                              </td>
                              <td style={{ border: "1px solid black" }}>
                                <a style={{color:"blue",textDecoration: "none", fontWeight:"500"}} target="_blank" handleOpenPDF  href={ele.pdf}>
                                  View
                                </a>
                              </td>
                              <td style={{ border: "1px solid black" }}>
                                <a style={{color:"blue",textDecoration: "none" ,fontWeight:"500"}} target="_blank" href={ele.qna}>
                                  View
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

    </div>
  )
}
