import logo from "../../assets/image-assets/volvo_logo.png";
import avatarImg from "../../assets/image-assets/account_icon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DownArrow from "../../assets/image-assets/Down Arrow.png";
import SettingsIcon from "../../assets/image-assets/settings_ic.png";

type NavBarProps = {
  showSettings?: boolean;
};

export default function NavBar({
  showSettings = false,
}: NavBarProps) {

  const [showLog, setShowLog] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setShowSettingsMenu(false);
    navigate(path);
  };

  return (
    <div className="navbar">
      <img
        src={logo}
        alt="Volvo Logo"
        className="logo-img"
      />

      <div className="right-section">

        {/* SETTINGS WRAPPER */}
        {showSettings && (
          <div className="settings-wrapper">
            <img
              src={SettingsIcon}
              alt="settings"
              className="settings-icon"
              onClick={() =>
                setShowSettingsMenu(!showSettingsMenu)
              }
            />

            {showSettingsMenu && (
              <div className="settings-dropdown">
                <p onClick={() => handleNavigation("/UserManagement")}>
                  User Management
                </p>
                <p onClick={() => handleNavigation("/LevelManagement")}>
                  Level Management
                </p>
              </div>
            )}
          </div>
        )}

        {/* ACCOUNT SECTION */}
        <div className="account-widget">
          <div className="avatar-box">
            <img
              src={avatarImg}
              alt="User Avatar"
              className="avatar-img"
            />
          </div>

          <div>
            <div className="name">Leonardo Lian</div>
            <div className="role">Environmental engineer</div>
          </div>

          <img
            src={DownArrow}
            alt="dropdown"
            className="dropdown-arrow"
            onClick={() => setShowLog(!showLog)}
          />

          {showLog && (
            <div className="logout-menu">
              <p onClick={() =>
                console.log("logout-clicked")
              }>
                Logout
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
