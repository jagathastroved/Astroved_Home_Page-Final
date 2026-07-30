import { useState, FormEvent, ReactNode } from 'react'
import './Account.css'


const WhatsappIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.09.81.82-3.01-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.55-3.7 8.19-8.26 8.19zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.08-.4-.12-.56.13-.17.25-.65.8-.79.96-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.16-.25.24-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.02 2.58c.12.17 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
  </svg>
)
const OtpIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
)

export function WhatsApp() {
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [whatsappOtpSent, setWhatsappOtpSent] = useState(false)
  const [waotpsentMessage, setwaotpsentMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)


  const [whatsappOtp, setWhatsappOtp] = useState('')
  const [whatsappNumberOtp, setWhatsappNumberOtp] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [verifyWAOtploginMessage, setverifyWAOtploginMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)


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
  const handleSendWhatsapp = async (e: FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    setwaotpsentMessage(null);
    setWhatsappOtpSent(false);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/UserAccount/AuthenticateLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
        body: JSON.stringify
          ({
            Type: 3,
            CountryCode: "+91",
            MobileNo: whatsappNumber
          }),
      });

      const result = await response.json();
      if (response.ok && result != null) {
        if (result.StatusCode == 200) {
          console.log(result);
          setwaotpsentMessage({
            type: 'success',
            text: result.Message,
          });
          setWhatsappOtpSent(true);
          setWhatsappNumberOtp(whatsappNumber);
          setTimeout(() => setwaotpsentMessage(null), 900)
        }
        else if (result.loginInfo == null && result.Status != '') {
          setwaotpsentMessage({
            type: 'error',
            text: result.Message,
          });
          setWhatsappOtpSent(false);
        }
        else {
          console.log("somthing went wrong");
          setwaotpsentMessage({
            type: 'error',
            text: 'somthing went wrong',
          });
          setWhatsappOtpSent(false);
        }
      }

    } catch (err) {
      console.error(err)
      setwaotpsentMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Login failed. Please try again.',
      })
    }
  }
  const handleResendWhatsapp = async () => {
    debugger;
    setverifyWAOtploginMessage(null);
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
            Type: 3,
            CountryCode: "+91",
            MobileNo: whatsappNumberOtp
          }),
      });

      const result = await response.json();
      if (response.ok && result != null) {
        if (result.StatusCode == 200) {
          console.log(result);
          setverifyWAOtploginMessage({
            type: 'success',
            text: result.Message,
          });
          setTimeout(() => setverifyWAOtploginMessage(null), 3900)
        }
        else if (result.loginInfo == null && result.Status != '' && result.StatusCode !== 200) {
          setverifyWAOtploginMessage({
            type: 'error',
            text: result.Message,
          });
          setIsLoggingIn(false);
        }
        else {
          console.log("somthing went wrong");
          setverifyWAOtploginMessage({
            type: 'error',
            text: 'somthing went wrong',
          });
          setIsLoggingIn(false);
        }
      }
    } catch (err) {
      console.error(err)
      setverifyWAOtploginMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Login failed. Please try again.',
      })
    }
  }
  const handleVerifyWhatsapp = async (e: FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    setverifyWAOtploginMessage(null);
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
            Type: 3,
            CountryCode: "+91",
            MobileNo: whatsappNumberOtp,
            OTP: whatsappOtp
          }),
      });

      const result = await response.json();
      if (response.ok && result != null) {
        if (result.loginInfo != null && result.StatusCode == 200) {
          console.log(result);
          setIsLoggingIn(true);
          await createLoginSession({
            shopId: 1,
            customerId: result.loginInfo.CustomerId,
            fullName: result.loginInfo.CustomerName,
            userLogin: result.loginInfo.UserLogin,
          })
          setverifyWAOtploginMessage({
            type: 'success',
            text: result.Message,
          });
          //const fullName: string = result.loginInfo.CustomerName
          //const isCurrentUser: Boolean = true
          //persistLoggedInUser({ fullName,isCurrentUser })
          window.location.reload()
        }
        else if (result.loginInfo == null && result.Status != '') {
          setverifyWAOtploginMessage({
            type: 'error',
            text: result.Message,
          });
          setIsLoggingIn(false);
        }
        else {
          console.log("somthing went wrong");
          setverifyWAOtploginMessage({
            type: 'error',
            text: 'somthing went wrong',
          });
          setIsLoggingIn(false);
        }
      }
    } catch (err) {
      console.error(err)
      setverifyWAOtploginMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Login failed. Please try again.',
      })
    }
  }

  return (
    <div>
      {!whatsappOtpSent ? (
        <>
          <form className="form" onSubmit={handleSendWhatsapp}>
            <div className="phone-field">
              <span className="phone-field__code">
                <span className="phone-field__icon">{WhatsappIcon}</span>
                +91
              </span>
              <input
                type="tel"
                className="phone-field__input"
                placeholder="Mobile Number"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                autoComplete="tel-national"
                required
                maxLength={10}
                minLength={10}
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit mobile number"
              />
            </div>
            {waotpsentMessage && (
              <p className={`form-message form-message--${waotpsentMessage.type}`}>
                {waotpsentMessage.text}
              </p>
            )}
            <button type="submit" className="login-btn" disabled={whatsappOtpSent} >
              {whatsappOtpSent ? 'SendOTP in…' : 'Send OTP'}
            </button>
          </form>
        </>
      ) : (
        <>
          <form className="form" onSubmit={handleVerifyWhatsapp}>
            <div className="phone-field">
              <span className="phone-field__code">
                <span className="phone-field__icon">{WhatsappIcon}</span>
                +91
              </span>
              <input
                type="tel"
                className="phone-field__input"
                placeholder="Mobile Number"
                value={whatsappNumberOtp}
                onChange={(e) => setWhatsappNumberOtp(e.target.value)}
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
                value={whatsappOtp}
                onChange={(e) => setWhatsappOtp(e.target.value)}
                autoComplete="one-time-code"
                maxLength={6}
                required
              />
            </div>
            {verifyWAOtploginMessage && (
              <p className={`form-message form-message--${verifyWAOtploginMessage.type}`}>
                {verifyWAOtploginMessage.text}
              </p>
            )}
            <div className="otp-actions">
              <button type="button" className="resend-btn" onClick={handleResendWhatsapp}>
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
