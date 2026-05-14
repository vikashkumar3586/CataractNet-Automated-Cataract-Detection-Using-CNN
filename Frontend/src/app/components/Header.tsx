
import { Eye } from 'lucide-react';
import type { Page } from '../App';
import { logoutUser } from '../utils/auth';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export function Header({ currentPage, onNavigate, isLoggedIn, setIsLoggedIn }: HeaderProps) {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        
        {/* Logo */}
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#06b6d4] flex items-center justify-center">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl font-semibold text-foreground">CataractNet</span>
            <span className="text-xs text-muted-foreground">AI-Powered Detection</span>
          </div>
        </button>
        
        {/* Navigation */}
        <nav className="flex items-center gap-6">

          {/* Always visible */}
          <button
            onClick={() => onNavigate('landing')}
            className={`text-sm ${
              currentPage === 'landing'
                ? 'text-[#0891b2]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Home
          </button>

          

          {/* 🔐 Only when logged in */}
          {isLoggedIn && (
            <>
              <button
            onClick={() => onNavigate('upload')}
            className={`text-sm ${
              currentPage === 'upload' || currentPage === 'processing' || currentPage === 'results'
                ? 'text-[#0891b2]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Upload
              </button>

              <button
                onClick={() => onNavigate('history')}
                className={`text-sm ${
                  currentPage === 'history'
                    ? 'text-[#0891b2]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                History
              </button>

              {/* <button
                onClick={() => onNavigate('view-report')}
                className={`text-sm ${
                  currentPage === 'view-report'
                    ? 'text-[#0891b2]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                View Report
              </button> */}
            </>
          )}

          <button
            onClick={() => onNavigate('about')}
            className={`text-sm ${
              currentPage === 'about'
                ? 'text-[#0891b2]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            About
          </button>

          {/* 🔐 Auth Buttons */}
          <div className="flex items-center gap-3 ml-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-sm px-4 py-1.5 border border-[#0891b2] text-[#0891b2] rounded-lg hover:bg-[#0891b2]/10 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => onNavigate('register')}
                  className="text-sm px-4 py-1.5 bg-[#0891b2] text-white rounded-lg hover:bg-[#0e7490] transition"
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  logoutUser();
                  setIsLoggedIn(false);
                  onNavigate('landing');
                }}
                className="text-sm px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}