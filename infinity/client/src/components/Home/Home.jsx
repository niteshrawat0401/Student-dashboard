import React, { useState } from 'react'
import axios from "axios"

// let init = {
//     productType: "",
//     issueType: "",
//     IssueDescription: "",
//     policyUpload: ""
// }
// const issueTypes = {
//     'Mobile Phone': ['Broken Screen', 'Faulty Camera', 'Overheating Issue'],
//     'TV': ['Damaged Screen', 'Discoloration Of Screen', 'Adapter Issues'],
//     'Refrigerator': ['Panel Controls Broken', 'Compressor Not Working', 'Unable To Turn On'],
//     'Washing Machine': ['Water overflowing', 'Motor not working'],
//   };
// export const Home = () => {
//     const [productPost, setProductPost] = useState(init);

//     const handleChanged = (e) =>{
//         const {name, value} = e.target.value;
//         setProductPost({ ...productPost, [name]: value})
//     }

//     const handlePost = () =>{

//     }

//     const [productType, setProductType] = useState('');
//   const [selectedIssueTypes, setSelectedIssueTypes] = useState([]);

//   const handleProductTypeChange = (event) => {
//     const selectedProductType = event.target.value;
//     setProductType(selectedProductType);
//     setSelectedIssueTypes([]);
//   };

//   const handleIssueTypeChange = (event) => {
//     const selectedIssueType = event.target.value;
//     const updatedSelectedIssueTypes = [...selectedIssueTypes];

//     if (updatedSelectedIssueTypes.includes(selectedIssueType)) {
//       updatedSelectedIssueTypes.splice(updatedSelectedIssueTypes.indexOf(selectedIssueType), 1);
//     } else {
//       updatedSelectedIssueTypes.push(selectedIssueType);
//     }

//     setSelectedIssueTypes(updatedSelectedIssueTypes);
//   };
//   return (
//     <div>
//         <form onSubmit={handlePost}>
//         {/* <label htmlFor="product-type-select">Product Type:</label> */}
//       <select id="product-type-select" value={productType} onChange={handleProductTypeChange} required>
//         <option value="">--Please select a product type--</option>
//         <option value="Mobile Phone">Mobile Phone</option>
//         <option value="TV">TV</option>
//         <option value="Refrigerator">Refrigerator</option>
//         <option value="Washing Machine">Washing Machine</option>
//       </select>
//     <br/>
//       {productType && (
//         <>
//           {/* <label htmlFor="issue-type-select">Issue Type:</label> */}
//           <select value={selectedIssueTypes} onChange={handleIssueTypeChange} required>
//             {issueTypes[productType].map((issueType) => (
//               <option key={issueType} value={issueType}>
//                 {issueType}
//               </option>
//             ))}
//           </select>
//         </>
//       )}
//         <br/>
//         <input name="IssueDescription" type="text" placeholder='Description'/>
//         <br/>
//         <input name="policyUpload" style={{width: "18%"}} type="file" placeholder='policyUpload'/>
//         <br/>
//         <input type="submit" value="Submit" />
//       </form>
//     </div>
//   )
// }
let init = {
    productType: "",
    issueType: "",
    IssueDescription: "",
    policyUpload: ""
}
export const Home = () => {
    const [data, setData] = useState(init);
  const [productType, setProductType] = useState('');
  const [issueType, setIssueTypes] = useState([]);
  const [issueDescription, setIssueDescription] = useState('');
  const [policyDocument, setPolicyDocument] = useState(null);

  const handleProductTypeChange = (event) => {
    const selectedProductType = event.target.value;
    setProductType(selectedProductType);
    // populate issue types based on selected product type
    switch (selectedProductType) {
      case 'Mobile Phone':
        setIssueTypes(['Broken Screen', 'Faulty Camera', 'Overheating Issue']);
        break;
      case 'TV':
        setIssueTypes(['Damaged Screen', 'Discoloration Of Screen', 'Adapter Issues']);
        break;
      case 'Refrigerator':
        setIssueTypes(['Panel Controls Broken', 'Compressor Not Working', 'Unable To Turn On']);
        break;
      case 'Washing Machine':
        setIssueTypes(['Water overflowing', 'Motor not working']);
        break;
      default:
        setIssueTypes([]);
        break;
    }
  };
console.log(productType);
  const handleIssueTypesChange = (event) => {
    const selectedIssueTypes = Array.from(event.target.selectedOptions, option => option.value);
    setIssueTypes(selectedIssueTypes);
  };
//   console.log(issueType);

  const handleIssueDescriptionChange = (event) => {
    const value = event.target.value;
    setIssueDescription(value);
  };
  console.log(issueDescription);

  const handlePolicyDocumentChange = (event) => {
    const file = event.target.files[0];
    setPolicyDocument(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/user/create",
    // productType ,
    // issueType ,
    issueDescription
    )
    .then((res)=>{
        setData(res.data)
        console.log("res", res);
    })
    .catch((err)=>{
        console.log("err", err);
    })
    // handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* <label>Product Type:</label>
        <select name='productType' value={productType} onChange={handleProductTypeChange} >
          <option value="">Select a product type</option>
          <option value="Mobile Phone">Mobile Phone</option>
          <option value="TV">TV</option>
          <option value="Refrigerator">Refrigerator</option>
          <option value="Washing Machine">Washing Machine</option>
        </select> */}
      </div>
      {/* {issueType.length > 0 && (
        <div>
          <label>Issue Type:</label>
          <select name='issueType' value={issueType} onChange={handleIssueTypesChange} multiple >
            {issueType.map(issueType => (
              <option key={issueType} value={issueType}>{issueType}</option>
            ))}
          </select>
        </div>
      )} */}
      <div>
        <label>Issue Description:</label>
        <textarea name='issueDescription' value={issueDescription} onChange={handleIssueDescriptionChange}></textarea>
      </div>
      <div>
        <label htmlFor="policy-document">Policy Upload:</label>
         <input type="file" id="policy-document" name='policyUpload' accept=".pdf,.doc,.docx,.jpg,.png" onChange={handlePolicyDocumentChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Home;
