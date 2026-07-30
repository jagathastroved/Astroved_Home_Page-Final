import { useState, FormEvent, ReactNode } from 'react';
import './Account.css';
import { Email } from '../Account/Email';
import { WhatsApp } from '../Account/WhatsApp';
import {SMS} from '../Account/SMS';

type TabId = 'email' | 'mobile' | 'whatsapp'

interface Tab {
  id: TabId
  label: string
  icon: ReactNode
}

const TABS: Tab[] = [
  {
    id: 'email',
    label: 'Email',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: 'Whatsapp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.09.81.82-3.01-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.55-3.7 8.19-8.26 8.19zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.08-.4-.12-.56.13-.17.25-.65.8-.79.96-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.16-.25.24-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.02 2.58c.12.17 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
      </svg>
    ),
  },
]
 

interface LoginModalProps {
  onClose: () => void;
}
export function LoginModal({ onClose }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('email')

  return (
    <div>
        <button
          type="button"
          className="login-panell__close"
          onClick={onClose}
          aria-label="Close login panel"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="heading">Already a user? Please log in below</h2>

        <div className="card">
          <div className="tabbar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tab ${activeTab === tab.id ? 'tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab__icon">{tab.icon}</span>
                <span className="tab__label">{tab.label}</span>
              </button>
            ))}
          </div>

          
            {activeTab === 'email' && (
              <Email/>
            )}

            {activeTab === 'mobile' && (
              <SMS/>
            )}

            {activeTab === 'whatsapp' && (
              <WhatsApp/>
            )}

          <p className="register">
            New to AstroVed? <a href="/Register.aspx?ReturnUrl=Default.aspx">Register now</a>
          </p>
        </div>
    </div>
  )
}
