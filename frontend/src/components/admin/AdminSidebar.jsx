import React from "react";
import {
  LayoutDashboard, User, FolderKanban, Layers,
  GraduationCap, Award, Briefcase, MessageSquare, LogOut,
} from "lucide-react";

export const ADMIN_TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "messages", label: "Messages", icon: MessageSquare },
];

export default function AdminSidebar({ tab, setTab, logout }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-title">/admin</div>
      <nav className="admin-nav">
        {ADMIN_TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={`admin-nav-button ${tab === t.id ? "active" : ""}`}>
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </nav>
      <button onClick={logout} className="admin-logout"><LogOut size={15} /> Exit admin</button>
    </aside>
  );
}