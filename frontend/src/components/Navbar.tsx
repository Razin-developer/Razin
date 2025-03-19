import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Book, Contact, Frame, LogOut, Menu, Network, Settings, User, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Frame className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold text-primary">Razin</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          <Link to="/skills" className="btn btn-sm gap-2">
            <Book className="size-5" />
            <span>Skills</span>
          </Link>
          <Link to="/works" className="btn btn-sm gap-2">
            <Network className="size-5" />
            <span>Works</span>
          </Link>
          <Link to="/contact" className="btn btn-sm gap-2">
            <Contact className="size-5" />
            <span>Contact</span>
          </Link>
          <Link to="/about" className="btn btn-sm gap-2">
            <FontAwesomeIcon icon={faAddressCard} className="size-5" />
            <span>About</span>
          </Link>
        </nav>

        {/* User Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {authUser ? (
            <>
              <Link to="/profile" className="btn btn-sm gap-2">
                <User className="size-5" />
                <span>Profile</span>
              </Link>
              <Link to="/settings" className="btn btn-sm gap-2">
                <Settings className="size-5" />
                <span>Settings</span>
              </Link>
              <button onClick={logout} className="btn btn-sm gap-2">
                <LogOut className="size-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm gap-2">
                <User className="size-5" />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="btn btn-sm gap-2">
                <User className="size-5" />
                <span>Signup</span>
              </Link>
              <Link to="/settings" className="btn btn-sm gap-2">
                <Settings className="size-5" />
                <span>Settings</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button with Animation */}
        <motion.button
          className="lg:hidden flex items-center p-2 border rounded-md"
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && <MenuComponent authUser={authUser} logout={logout} setIsOpen={setIsOpen} isOpen={isOpen} />}
      </AnimatePresence>
    </header>
  );
};

const MenuComponent = ({ authUser, logout, setIsOpen , isOpen}: { authUser: any | null; logout: () => Promise<void>; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; isOpen: boolean }) => {
  return (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -200, opacity: 0 }}
      transition={{ duration: 0.3 }}
      key="menucomponent"
      className="lg:hidden fixed top-16 left-0 w-full bg-base-100/80 backdrop-blur-lg shadow-lg border-t border-base-300"
    >
      <nav className="flex flex-col items-center gap-4 py-6">
        <Link onClick={() => setIsOpen(!isOpen)} to="/skills" className="btn btn-sm w-3/4 bg-base-100/95">Skills</Link>
        <Link onClick={() => setIsOpen(!isOpen)} to="/works" className="btn btn-sm w-3/4 bg-base-100/95">Works</Link>
        <Link onClick={() => setIsOpen(!isOpen)} to="/contact" className="btn btn-sm w-3/4 bg-base-100/95">Contact</Link>
        <Link onClick={() => setIsOpen(!isOpen)} to="/about" className="btn btn-sm w-3/4 bg-base-100/95">About</Link>
        {authUser ? (
          <>
            <Link onClick={() => setIsOpen(!isOpen)} to="/profile" className="btn btn-sm w-3/4 bg-base-100/95">Profile</Link>
            <Link onClick={() => setIsOpen(!isOpen)} to="/settings" className="btn btn-sm w-3/4 bg-base-100/95">Settings</Link>
            <button onClick={logout} className="btn btn-sm w-3/4 bg-base-100/95">Logout</button>
          </>
        ) : (
          <>
            <Link onClick={() => setIsOpen(!isOpen)} to="/login" className="btn btn-sm w-3/4 bg-base-100/95">Login</Link>
            <Link onClick={() => setIsOpen(!isOpen)} to="/signup" className="btn btn-sm w-3/4 bg-base-100/95">Signup</Link>
            <Link onClick={() => setIsOpen(!isOpen)} to="/settings" className="btn btn-sm w-3/4 bg-base-100/95">Settings</Link>
          </>
        )}
      </nav>
    </motion.div>
  );
};

export default Navbar;
