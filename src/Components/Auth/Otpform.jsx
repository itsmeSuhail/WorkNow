import { Button } from "@mui/material";
import { useState } from "react";
import "./Otp.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import getCurrentUser from "../../utils/getCurrentUser";
import { apiUrl } from "../../ApiKeys";
import { useDispatch } from "react-redux";
import { fetchUserPoints } from "../../redux/apiCalls/userPoints.api";
import cookie from "js-cookie"
import { toast } from "react-toastify";
const OtpInput = (props) => {
  const {
    size = 6,
    validationPattern = /[0-9]{1}/,
    inputValues,
    setInputValues,
    className,
    ...restProps
  } = props;

  const arr = new Array(size).fill("-");

  const handleInputChange = (e, index) => {
    const elem = e.target;
    const val = e.target.value;

    if (!validationPattern.test(val) && val !== "") return;

    setInputValues(prev=>({
        ...prev,["input"+(index+1)]:val
    }));

    if (val) {
      const next = elem.nextElementSibling;
      next?.focus();
    }
  };

  const handleKeyUp = (e, index) => {
    const current = e.currentTarget;

    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      const prev = current.previousElementSibling;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }

    if (e.key === "ArrowRight") {
      const next = current.nextSibling;
      next?.focus();
      next?.setSelectionRange(0, 1);
      return;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const val = e.clipboardData.getData("text").substring(0, size);
    setInputValues({
      ...inputValues,
      input1: val[0] || '',
      input2: val[1] || '',
      input3: val[2] || '',
      input4: val[3] || '',
      input5: val[4] || '',
      input6: val[5] || '',
    });
  };

  return (
    <div className="flex gap-2">
      {arr.map((_, index) => {
        const inputKey = `input${index + 1}`;
        return (
          <input
            key={index}
            {...restProps}
            className={className || `input input-bordered px-0 text-center`}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern={validationPattern.source}
            maxLength={1}
            value={inputValues[inputKey] || ""}
            onChange={(e) => handleInputChange(e, index)}
            onKeyUp={(e) => handleKeyUp(e, index)}
            onPaste={handlePaste}
          />
        );
      })}
    </div>
  );
};

const OtpForm= ({handle,loader}) => {
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  });
  const {id}=useParams();
  const data=getCurrentUser();
  const [error, setError] = useState(null);
const dis=useDispatch();
  const getDataNow=async(obj)=>{
    loader(true);
    try {
      const {data}=await axios.post(`${apiUrl}/auth/verify/otp/`,obj,{
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer "+cookie.get("userAuthKey")
        },
        withCredentials: true
      });
      cookie.remove("userAuthKey");
      fetchUserPoints(dis,data._id);
      localStorage.setItem("currentUser",JSON.stringify(data));
      localStorage.setItem("mykey",data?._id);
    loader(false);
      
return data;
    } catch (error) {
      setError(error.response.data.body["otp"]||"something went wrong");
      setTimeout(() => {
          setError("");
      }, 3000)
      
    }finally{
      loader(false);

    }
}
 const getOtpDetails=()=>{
  var total="";
  for(var i in inputValues){
    total+=inputValues[i];
  }
  getDataNow({otp:total}).then(res=>{
    try {  if(res){
     
     toast.success("logged in successfull")
      handle();
    }

      
    } catch (error) {
      setError(error.response.data.data);
      setTimeout(() => {
          setError("");
      }, 3000)
    }
  })
 }
  return (
    <div className="container">
       <span className="error">
                                    {error && error}

                                </span>
      <div className="otpContainer">
        <OtpInput
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
        <div className="verifierBtn">
        <Button onClick={()=>{getOtpDetails()}} variant="contained" className="verify">Verify</Button>

        </div>
      </div>
    </div>
  );
};

export default OtpForm;
