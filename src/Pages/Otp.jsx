import { useState } from "react";
import logo from "../../public/chaicode.png"
const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [buttonState, setButtonState] = useState({
    text: "Verify Account",
    color: "bg-[#112D4E]"
  });

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
      validateOtp(newOtp);
    } else {
      validateOtp(otp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "") {
        if (index > 0) {
          document.getElementById(`otp-input-${index - 1}`).focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
      validateOtp(newOtp);
    }
  };

  const validateOtp = (currentOtp) => {
    const otpString = currentOtp.join("");
    const expectedOtp = "1234";

    if (currentOtp.every((digit) => digit !== "")) {
      if (otpString === expectedOtp) {
        setButtonState({ text: "Verified", color: "bg-green-500" });
      } else {
        setButtonState({ text: "Verification failed", color: "bg-red-500" });
      }
    } else {
      setButtonState({ text: "Verify Account", color: "bg-[#112D4E]" });
    }
  };

  return (
    <div className="flex bg-[#3F72AF] pt-10 relative flex-col items-center w-screen gap-y-10">
      <h1 className="text-5xl text-white text-center font-semibold">Chai aur Code</h1>
      <form className="bg-white flex flex-col items-center gap-y-3 text-center w-5/12 rounded-xl py-2" action="">
        <h3 className="text-2xl font-bold">Mobile Phone Verification</h3>
        <h4 className="text-lg w-8/12 text-zinc-300">Enter the 4-digit verification code that was sent to your mobile number</h4>
        {/* OTP 4 input boxes */}
        <div className="flex gap-x-2">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              className="w-12 h-12 bg-[#DBE2EF]  text-center text-2xl rounded-md "
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className={`text-lg px-14  py-2 rounded-md text-white ${buttonState.color}`}>{buttonState.text}</button>
        <h5 className="text-zinc-400">Didn't receive code? <span className="text-[#112D4E] font-semibold">Resend</span></h5>
      </form>
         <a target="_blank" href="http://chaicode.com/"> <img  className="h-20 rounded-md absolute bottom-5 right-5 w-20" src={logo} alt="" /> </a>
    </div>
  );
}

export default Otp;
