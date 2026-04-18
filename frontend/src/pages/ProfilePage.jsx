import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { updateProfile, updatePassword } from "../services/api/userService";
import { User, Mail, Phone, FileText, Lock, Save, Camera } from "lucide-react";
import Header from "../components/Header/Header";

const ProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const toast = useToast();
  const [tab, setTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({ name: "", email: "", phone: "", bio: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateProfile(profileForm);
      await refreshUser();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    try {
      setSaving(true);
      await updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password.");
    } finally {
      setSaving(false);
    }
  };

  const tabStyle = (active) => ({
    padding: "0.75rem 1.25rem",
    borderRadius: "var(--radius-md)",
    fontWeight: 600,
    fontSize: "0.875rem",
    cursor: "pointer",
    border: "none",
    background: active ? "rgba(201,168,76,0.1)" : "transparent",
    color: active ? "var(--color-primary)" : "var(--color-text-muted)",
    borderBottom: active ? "2px solid var(--color-primary)" : "2px solid transparent",
    transition: "all 0.2s",
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-deep)" }}>
      <Header />
      <main style={{ paddingTop: "calc(76px + 2rem)", paddingBottom: "4rem" }}>
        <div className="container-shell" style={{ maxWidth: 800 }}>
          {/* Profile Header */}
          <div className="card-surface" style={{
            padding: "2rem", marginBottom: "1.5rem",
            display: "flex", alignItems: "center", gap: "1.5rem",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -30, right: -30,
              width: 120, height: 120, borderRadius: "50%",
              background: "rgba(201,168,76,0.06)", filter: "blur(30px)",
            }} />
            <div style={{ position: "relative" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "1.75rem", color: "#0a0e1a",
                fontFamily: "var(--font-display)",
              }}>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
            <div>
              <h1 style={{
                fontSize: "1.5rem", fontWeight: 700,
                color: "var(--color-text-bright)", marginBottom: "0.25rem",
              }}>{user?.name}</h1>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>{user?.email}</p>
              <span className={`badge ${user?.role === "admin" ? "badge-gold" : "badge-info"}`} style={{ marginTop: "0.5rem" }}>
                {user?.role === "admin" ? "Administrator" : "Member"}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex", gap: "0.25rem",
            marginBottom: "1.5rem",
            borderBottom: "1px solid var(--color-border)",
          }}>
            <button style={tabStyle(tab === "profile")} onClick={() => setTab("profile")}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <User size={16} /> Profile
              </span>
            </button>
            <button style={tabStyle(tab === "password")} onClick={() => setTab("password")}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <Lock size={16} /> Password
              </span>
            </button>
          </div>

          {/* Profile Tab */}
          {tab === "profile" && (
            <div className="card-surface" style={{ padding: "2rem" }}>
              <h2 style={{
                fontWeight: 600, fontSize: "1.125rem",
                color: "var(--color-text-bright)", marginBottom: "1.5rem",
              }}>Personal Information</h2>
              <form onSubmit={handleProfileSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div style={{ position: "relative" }}>
                      <User size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))}
                        style={{ width: "100%", paddingLeft: "2.5rem" }}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <div style={{ position: "relative" }}>
                      <Mail size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))}
                        style={{ width: "100%", paddingLeft: "2.5rem" }}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <div style={{ position: "relative" }}>
                    <Phone size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))}
                      style={{ width: "100%", paddingLeft: "2.5rem" }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <div style={{ position: "relative" }}>
                    <FileText size={16} style={{ position: "absolute", left: 12, top: 14, color: "var(--color-text-muted)" }} />
                    <textarea
                      placeholder="Tell us about yourself..."
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm((p) => ({ ...p, bio: e.target.value }))}
                      rows={3}
                      style={{ width: "100%", paddingLeft: "2.5rem", resize: "vertical" }}
                    />
                  </div>
                </div>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                  <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {/* Password Tab */}
          {tab === "password" && (
            <div className="card-surface" style={{ padding: "2rem" }}>
              <h2 style={{
                fontWeight: 600, fontSize: "1.125rem",
                color: "var(--color-text-bright)", marginBottom: "1.5rem",
              }}>Change Password</h2>
              <form onSubmit={handlePasswordSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: 400 }}>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                    style={{ width: "100%" }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                    style={{ width: "100%" }}
                    placeholder="Min. 6 characters"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                    style={{ width: "100%" }}
                    required
                  />
                </div>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                  <Lock size={16} /> {saving ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
