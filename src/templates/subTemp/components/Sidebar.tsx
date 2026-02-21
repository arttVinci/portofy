import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import MenuItem from "./MenuItem";
import { PiCertificate } from "react-icons/pi";
import { Home, User, FolderOpen, Send, X } from "lucide-react";
import type { ProfileItem } from "../../../types/ui.types";

interface Props {
  activeMenu: string;
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileItem | null;
  setACtiveMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({
  activeMenu,
  isOpen,
  onClose,
  profileData,
  setACtiveMenu,
}: Props) {
  const navigate = useNavigate();

  const { username } = useParams();

  const menuItems = useMemo(() => {
    const userPrefix = username ? `/${username}` : "";
    return [
      { icon: Home, label: "Home", route: `${userPrefix}/` },
      { icon: User, label: "About", route: `${userPrefix}/about` },
      {
        icon: PiCertificate,
        label: "Achievements",
        route: `${userPrefix}/achievements`,
      },
      { icon: FolderOpen, label: "Projects", route: `${userPrefix}/projects` },
      { icon: Send, label: "Contact", route: `${userPrefix}/contact` },
    ];
  }, [username]);

  const handleMenuClick = (item: any) => {
    setACtiveMenu(item.label);
    navigate(item.route);

    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-blue-card z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`
          w-full lg:w-60 flex flex-col fixed top-0 h-screen z-50
          bg-blue-card lg:bg-transparent
          ml-0 lg:ml-20
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          transition-transform duration-300 lg:transition-none
          px-6 lg:px-0
        `}
      >
        <button
          onClick={onClose}
          className="lg:hidden absolute top-6 right-6 text-white hover:text-gray-300 z-10 p-2 transition-colors"
        >
          <X className="w-7 h-7" />
        </button>

        <div className="pt-6 lg:pt-0">
          <ProfileHeader data={profileData} />
        </div>

        <div className="flex-1 py-4 space-y-1">
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.label}
              item={item}
              isActive={activeMenu === item.label}
              onClick={() => handleMenuClick(item)}
              index={index}
            />
          ))}

          <div className="px-5 pb-6 pt-2 mt-8 text-center border-t border-zinc-700">
            <p className="text-gray-500 text-xs">
              © 2026 {profileData?.fullName || "Portfolio"}.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
