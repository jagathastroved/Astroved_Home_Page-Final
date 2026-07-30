import { useState, FormEvent, ReactNode } from 'react'
import './Account.css'

const MailIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
)

const LockIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
)

// interface CurrentUser {
//     fullName: string,
//     isCurrentUser: Boolean
// }

export function Email() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [loginMessage, setLoginMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

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
                Password: password
            }),
        })

        if (!response.ok) {
            throw new Error(`Login failed (${response.status})`)
        }

        const result = await response.json()
        const data = result.d

    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        debugger;
        e.preventDefault();
        setLoginMessage(null)
        setIsLoggingIn(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/UserAccount/AuthenticateLogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
                },
                body: JSON.stringify
                    ({
                        UserName: email,
                        Password: password,
                        Type: 1
                    }),
            });
            const result = await response.json();
            if (response.ok && result != null) {
                if (result.loginInfo != null && result.StatusCode == 200) {
                    console.log(result);
                    await createLoginSession({
                        shopId: 1,
                        customerId: result.loginInfo.CustomerId,
                        fullName: result.loginInfo.CustomerName,
                        userLogin: result.loginInfo.UserLogin,
                    })
                    setLoginMessage({
                        type: 'success',
                        text: result.Message,
                    });
                    //const fullName: string = result.loginInfo.CustomerName
                    //const isCurrentUser: Boolean = true
                    //persistLoggedInUser({ fullName, isCurrentUser })
                    window.location.reload()
                }
                else if (result.loginInfo == null && result.Status != '') {
                    setLoginMessage({
                        type: 'error',
                        text: result.Message,
                    });
                }
                else {
                    console.log("somthing went wrong");
                    setLoginMessage({
                        type: 'error',
                        text: 'somthing went wrong',
                    });
                    setIsLoggingIn(false);
                }
            }

        } catch (err) {
            console.error(err)
            setLoginMessage({
                type: 'error',
                text: err instanceof Error ? err.message : 'Login failed. Please try again.',
            })
        }
        finally {
            setIsLoggingIn(false);
        }
    }
    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                {/* <label className="field-label" htmlFor="email">User Login</label> */}
                <div className="input-field">
                    <span className="input-field__icon">{MailIcon}</span>
                    <input
                        id="email"
                        type="email"
                        className="input-field__input"
                        placeholder="User Login"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                        required
                        maxLength={50}
                    />
                </div>

                {/* <label className="field-label" htmlFor="password">Password</label> */}
                <div className="input-field">
                    <span className="input-field__icon">{LockIcon}</span>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="input-field__input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        maxLength={30}
                    />
                    <button
                        type="button"
                        className="eye-btn"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        )}
                    </button>
                </div>
                {loginMessage && (
                    <p className={`form-message form-message--${loginMessage.type}`}>
                        {loginMessage.text}
                    </p>
                )}
                <button type="submit" className="login-btn" disabled={isLoggingIn} >{isLoggingIn ? 'Logging in…' : 'Login'}</button>
                <a href="/ForgotPassword.aspx" className="forgot-link">Forgot your password</a>
            </form>
        </div>
    )
}
