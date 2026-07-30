import { useState, FormEvent, ReactNode } from 'react'
import './Account.css'

const PhoneIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.902.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.908.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)
const OtpIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
)
export function SMS() {
  const [mobileNumber, setMobileNumber] = useState('') // set value
  const [mobileOtpSent, setMobileOtpSent] = useState(false) //check bool
  const [otpsentMessage, setotpsentMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)


  const [mobileOtp, setMobileOtp] = useState('') // set value otp
  const [mobileNumberotp, setMobileNumberOtp] = useState('') // set otp mobile No
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [verifyOtploginMessage, setverifyOtploginMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)



  const createLoginSession = async (session: {
    shopId: number
    customerId: number
    fullName: string
    userLogin: string
  }) => {
    const response = await fetch(`${import.meta.env.VITE_SITE_URL}/CheckOutNew.aspx/CookieLogin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        shopId: session.shopId,
        CustomerId: session.customerId,
        FullName: session.fullName,
        UserLogin: session.userLogin,
        Password: ""
      }),
    })

    if (!response.ok) {
      throw new Error(`Login failed (${response.status})`)
    }

    const result = await response.json()
    const data = result.d

  }
  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    setotpsentMessage(null);
    setMobileOtpSent(false);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/UserAccount/AuthenticateLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
        body: JSON.stringify
          ({
            Type: 2,
            CountryCode: "+91",
            MobileNo: mobileNumber
          }),
      });

      const result = await response.json();
      if (response.ok && result != null) {
        if (result.StatusCode == 200) {
          console.log(result);
          setotpsentMessage({
            type: 'success',
            text: result.Message,
          });
          setMobileOtpSent(true);
          setMobileNumberOtp(mobileNumber);
          setTimeout(() => setotpsentMessage(null), 900)
        }
        else if (result.loginInfo == null && result.Status != '') {
          setotpsentMessage({
            type: 'error',
            text: result.Message,
          });
          setMobileOtpSent(false);
        }
        else {
          console.log("somthing went wrong");
          setotpsentMessage({
            type: 'error',
            text: 'somthing went wrong',
          });
          setMobileOtpSent(false);
        }
      }

    } catch (err) {
      console.error(err)
      setotpsentMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Login failed. Please try again.',
      })
    }
  }
  const handleResendOtp = async () => {
    debugger;
    setverifyOtploginMessage(null);
    setIsLoggingIn(false);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/UserAccount/AuthenticateLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
        body: JSON.stringify
          ({
            Type: 2,
            CountryCode: "+91",
            MobileNo: mobileNumberotp
          }),
      });

      const result = await response.json();
      if (response.ok && result != null) {
        if (result.StatusCode == 200) {
          console.log(result);
          setverifyOtploginMessage({
            type: 'success',
            text: result.Message,
          });
          setTimeout(() => setverifyOtploginMessage(null), 3900)
        }
        else if (result.loginInfo == null && result.Status != '' && result.StatusCode !== 200) {
          setverifyOtploginMessage({
            type: 'error',
            text: result.Message,
          });
          setIsLoggingIn(false);
        }
        else {
          console.log("somthing went wrong");
          setverifyOtploginMessage({
            type: 'error',
            text: 'somthing went wrong',
          });
          setIsLoggingIn(false);
        }
      }
    } catch (err) {
      console.error(err)
      setverifyOtploginMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Login failed. Please try again.',
      })
    }
  }
  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    setverifyOtploginMessage(null);
    setIsLoggingIn(false);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/UserAccount/VerifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
        body: JSON.stringify
          ({
            Type: 2,
            CountryCode: "+91",
            MobileNo: mobileNumberotp,
            OTP: mobileOtp
          }),
      });

      const result = await response.json();
      if (response.ok && result != null) {
        if (result.loginInfo != null && result.StatusCode == 200) {
          console.log(result);
          setIsLoggingIn(true);
          //setTimeout(() => setverifyOtploginMessage(null), 900)
          await createLoginSession({
            shopId: 1,
            customerId: result.loginInfo.CustomerId,
            fullName: result.loginInfo.CustomerName,
            userLogin: result.loginInfo.UserLogin,
          })
          setverifyOtploginMessage({
            type: 'success',
            text: result.Message,
          });
          // const fullName: string = result.loginInfo.CustomerName
          // const isCurrentUser: Boolean = true
          // persistLoggedInUser({ fullName, isCurrentUser })
          window.location.reload()
        }
        else if (result.loginInfo == null && result.Status != '') {
          setverifyOtploginMessage({
            type: 'error',
            text: result.Message,
          });
          setIsLoggingIn(false);
        }
        else {
          console.log("somthing went wrong");
          setverifyOtploginMessage({
            type: 'error',
            text: 'somthing went wrong',
          });
          setIsLoggingIn(false);
        }
      }

    } catch (err) {
      console.error(err)
      setverifyOtploginMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Login failed. Please try again.',
      })
    }
  }

  return (
    <div>
      {!mobileOtpSent ? (
        <>
          <form className="form" onSubmit={handleSendOtp}>
            <div className="phone-field">
              <span className="phone-field__code">
                <span className="phone-field__icon">{PhoneIcon}</span>
                +91
              </span>
              <input
                type="tel"
                className="phone-field__input"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                autoComplete="tel-national"
                required
                maxLength={10}
                minLength={10}
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit mobile number"
              />
            </div>
            {otpsentMessage && (
              <p className={`form-message form-message--${otpsentMessage.type}`}>
                {otpsentMessage.text}
              </p>
            )}
            <button type="submit" className="login-btn" disabled={mobileOtpSent} >
              {mobileOtpSent ? 'SendOTP in…' : 'Send OTP'}
            </button>
          </form>
        </>
      ) : (
        <>
          <form className="form" onSubmit={handleVerifyOtp}>
            <div className="phone-field">
              <span className="phone-field__code">
                <span className="phone-field__icon">{PhoneIcon}</span>
                +91
              </span>
              <input
                type="tel"
                className="phone-field__input"
                placeholder="Mobile Number"
                value={mobileNumberotp}
                onChange={(e) => setMobileNumberOtp(e.target.value)}
                autoComplete="tel-national"
                readOnly
              />
            </div>
            <div className="phone-field">
              <span className="phone-field__icon phone-field__icon--otp">{OtpIcon}</span>
              <input
                type="text"
                inputMode="numeric"
                className="phone-field__input"
                placeholder="Enter OTP"
                value={mobileOtp}
                onChange={(e) => setMobileOtp(e.target.value)}
                autoComplete="one-time-code"
                maxLength={6}
                required
              />
            </div>
            {verifyOtploginMessage && (
              <p className={`form-message form-message--${verifyOtploginMessage.type}`}>
                {verifyOtploginMessage.text}
              </p>
            )}
            <div className="otp-actions">
              <button type="button" className="resend-btn" onClick={handleResendOtp}>
                Resend
              </button>
              <button type="submit" className="login-btn login-btn--flex" disabled={isLoggingIn}>
                {isLoggingIn ? 'Logging in…' : 'Login'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
