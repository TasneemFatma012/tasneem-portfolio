import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import ProfileEditor from "./ProfileEditor";
import ProjectsEditor from "./ProjectsEditor";
import SkillsEditor from "./SkillsEditor";
import EducationEditor from "./EducationEditor";
import CertificatesEditor from "./CertificatesEditor";
import ExperienceEditor from "./ExperienceEditor";
import MessagesView from "./MessagesView";
import Card from "../common/Card";
import { saveProfile } from "../../api/profileApi";
import { saveResource, deleteResource } from "../../api/resourceApi";
import { fetchMessages, deleteMessage } from "../../api/messageApi";
import { c, display } from "../../utils/constants";

export default function AdminDashboard({ data, setData, logout }) {
  const [tab, setTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.messages.length === 0) {
      fetchMessages()
        .then((messages) => setData((d) => ({ ...d, messages })))
        .catch(console.error);
    }
  }, [data.messages.length, setData]);

  const updateProfile = async (profile) => {
    setLoading(true);
    try {
      const saved = await saveProfile(profile);
      setData((d) => ({ ...d, profile: saved }));
      return saved;
    } finally {
      setLoading(false);
    }
  };

  const saveListItem = async (resource, item) => {
    const saved = await saveResource(resource, item);
    setData((d) => ({
      ...d,
      [resource]: item.id
        ? d[resource].map((existing) => (existing.id === item.id ? saved : existing))
        : [...d[resource], saved],
    }));
    return saved;
  };

  const deleteListItem = async (resource, id) => {
    await deleteResource(resource, id);
    setData((d) => ({ ...d, [resource]: d[resource].filter((item) => item.id !== id) }));
  };

  const removeMessage = async (id) => {
    await deleteMessage(id);
    setData((d) => ({ ...d, messages: d.messages.filter((m) => m.id !== id) }));
  };

  return (
    <div className="admin-shell">
      <AdminSidebar tab={tab} setTab={setTab} logout={logout} />
      <main className="admin-main">
        {tab === "dashboard" && (
          <div>
            <h2 style={{ ...display, fontSize: 20, fontWeight: 600, color: c.text, marginBottom: 24 }}>Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[["Projects", data.projects.length], ["Skill groups", data.skills.length], ["Certificates", data.certificates.length], ["Messages", data.messages.length]].map(([l, v]) => (
                <Card key={l} style={{ textAlign: "center" }}>
                  <div style={{ ...display, fontSize: 24, fontWeight: 700, color: c.textBright }}>{v}</div>
                  <div style={{ fontSize: 12, color: c.muted, marginTop: 4 }}>{l}</div>
                </Card>
              ))}
            </div>
          </div>
        )}
        {tab === "profile" && <ProfileEditor profile={data.profile} onSave={updateProfile} loading={loading} />}
        {tab === "projects" && <ProjectsEditor items={data.projects} onSaveItem={(item) => saveListItem("projects", item)} onRemoveItem={(id) => deleteListItem("projects", id)} />}
        {tab === "skills" && <SkillsEditor items={data.skills} onSaveItem={(item) => saveListItem("skills", item)} onRemoveItem={(id) => deleteListItem("skills", id)} />}
        {tab === "education" && <EducationEditor items={data.education} onSaveItem={(item) => saveListItem("education", item)} onRemoveItem={(id) => deleteListItem("education", id)} />}
        {tab === "certificates" && <CertificatesEditor items={data.certificates} onSaveItem={(item) => saveListItem("certificates", item)} onRemoveItem={(id) => deleteListItem("certificates", id)} />}
        {tab === "experience" && <ExperienceEditor items={data.experience} onSaveItem={(item) => saveListItem("experience", item)} onRemoveItem={(id) => deleteListItem("experience", id)} />}
        {tab === "messages" && <MessagesView items={data.messages} onDelete={removeMessage} />}
      </main>
    </div>
  );
}