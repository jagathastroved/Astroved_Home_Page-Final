import { useState, useEffect,FormEvent, ReactNode } from 'react';
import './Account.css';



interface MyAccountProps {
    onClose: () => void;
}
interface CurrentUser {
    fullName: string,
    membershipName: string
}
interface MembershipDetailsResponse {
    UserLogin: string
    CustomerId: number
    CustomerName: string
    ErrorMessage: string | null
    IsMobileVerified: boolean
    IsEmailVerified: boolean
    MobileNo: string
    CustomerCurrency: string
    MembershipId: number
    MembershipName: string
    StartDate: string
    EndDate: string
}
async function getMembershipName(customerId: string): Promise<string> {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/UserAccount/GetMembershipDetailsByCustomerId?CustomerId=${customerId}`,
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
                },
            }
        )
        if (!response.ok) return ''

        const data: MembershipDetailsResponse = await response.json()
        return data.MembershipName ?? ''
    } catch (error) {
        console.warn('Failed to fetch membership name', error)
        return ''
    }
}
async function readStoredUser(): Promise<CurrentUser | null> {
    try {
        //const raw = localStorage.getItem(import.meta.env.VITE_STORAGE_KEY)
        var GetName = document.cookie.match(new RegExp("(^| )" + "FullName" + "=([^;]+)"));
        var match1 = GetName ? GetName[2] : null;
        var GetAuth = document.cookie.match(new RegExp("(^| )" + ".ASPXFORMSAUTH" + "=([^;]+)"));
        var match2 = GetAuth ? GetAuth[2] : null;
        var GetCustomerId = document.cookie.match(new RegExp("(^| )" + "C_Id" + "=([^;]+)"));
        var match3 = GetCustomerId ? GetCustomerId[2] : null;
        if (match3 != null) {
            const membershipName = await getMembershipName(match3);
            const tempObj: CurrentUser = {
                fullName: match1 ?? "",
                membershipName:membershipName
            }
            return tempObj;
        }
        return null
    } catch {
        return null
    }
}
const ACCOUNT_MENU_ITEMS: { label: string; href: string }[] = [
    { label: 'My Orders', href: '/orderhistory.aspx' },
    { label: 'My Wallet', href: '/astrovedwallet.aspx' },
    { label: 'My Membership', href: '/upgrade-your-membership.aspx' },
    { label: 'My EMI Transactions', href: '/recurringorderitems.aspx' },
    { label: 'My Subscribed Downloads', href: '/mydownloads.aspx' },
    { label: 'My Subscribed Videos', href: '/livewebcast.aspx' },
    { label: 'My Users/Family Members', href: '/subuser.aspx' },
    { label: 'My Addresses', href: '/addressbook.aspx' },
    { label: 'My Preferences', href: '/unsubscription.aspx' },
    { label: 'Change Password', href: '/changepassword.aspx' },
    { label: 'My Current Location', href: '/currentlocation.aspx' },
    { label: 'My Mobile Number', href: '/verifymobileno.aspx' },
    { label: 'My Credit Cards', href: '/managecreditcard.aspx' },
    { label: 'My Data', href: '/downloaduserdetails.aspx' },
    { label: 'Deactivate Your Account', href: '/accountdeactivation.aspx' },
]
export function MyAccount({ onClose }: MyAccountProps) {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

    useEffect(() => {
        readStoredUser().then(setCurrentUser)
    }, [])
    const handleLogOff = () => {
        setCurrentUser(null)
        try {
            if (typeof (Storage) !== "undefined") {
                localStorage.removeItem("CustomerId");
                localStorage.removeItem("LoggedIn");
            }
            localStorage.removeItem(import.meta.env.VITE_STORAGE_KEY)
            window.location.href = `${import.meta.env.VITE_SITE_URL}` + "/LogOffPage.aspx";
        } catch {
        }
    }
    return (
        <div>
            <button
                type="button"
                className="login-panell__close"
                onClick={onClose}
                aria-label="Close account panel"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            <h2 className="account-heading">My Account</h2>
            {currentUser && (
                <p className="account-welcome">Welcome {currentUser.fullName}</p>
            )}

            <ul className="account-menu">
                {/* <li className="membership-txt">
                    <span id="">Your Membership Plan: </span>
                    <span className="Platinum Membership">
                        <a href="/Upgrade-Your-Membership.aspx">
                            <span>
                                <span id="ctl00_ctlheader_vaaak_MyCart_vaaak_MyAccount_LoginView2_lblMembershipName">Platinum
                                </span>
                            </span>
                        </a>
                    </span>
                </li> */}
                {currentUser && currentUser.membershipName && (
                    <p className="account-membership">
                        <span className="account-membership__label">Your Membership Plan:</span>
                        <span
                            className={`account-membership__icon account-membership__icon--${currentUser.membershipName.toLowerCase()}`}
                        />
                        <span className="account-membership__name">{currentUser.membershipName}</span>
                    </p>
                )}
                {ACCOUNT_MENU_ITEMS.map((item) => (
                    <li key={item.href}>
                        <a href={item.href} className="account-menu__item">
                            <span className="account-menu__arrow">»</span>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>

            <button type="button" className="logoff-btn" onClick={handleLogOff}>
                Log Off
            </button>
        </div>
    )
}