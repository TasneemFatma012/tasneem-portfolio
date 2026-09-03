import React, { useState } from "react";
import { Plus, Edit3, Trash2, Check, X } from "lucide-react";
import Card from "../common/Card";
import { c, display, btnPrimary, btnGhost } from "../../utils/constants";

export default function ListEditor({
  title,
  items,
  onSave,
  onSaveItem,
  onRemoveItem,
  empty,
  renderForm,
  renderRow,
}) {
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const getId = (item) => item.id ?? item._id ?? null;

  const remove = async (id) => {
    if (onRemoveItem) {
      await onRemoveItem(id);
    } else if (onSave) {
      onSave(items.filter((i) => getId(i) !== id));
    }
  };

  const upsert = async (item) => {
    setSaving(true);
    try {
      let saved = item;
      if (onSaveItem) {
        saved = await onSaveItem(item);
   
        if (saved && !saved.id && saved._id) {
          saved = { ...saved, id: saved._id };
        }
      }

      const itemId = getId(item);
      const exists = itemId != null && items.some((i) => getId(i) === itemId);

      const next = exists
        ? items.map((i) => (getId(i) === itemId ? saved : i))
        : [...items, saved];

      if (onSave) onSave(next);
      setEditing(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h2 style={{ ...display, fontSize: 20, fontWeight: 600, color: c.text }}>
          {title}
        </h2>
        <button
          onClick={() => setEditing(empty())}
          style={{ ...btnGhost, padding: "8px 14px" }}
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      {editing && (
        <Card style={{ marginBottom: 20 }}>
          {renderForm(editing, setEditing)}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button
              onClick={() => upsert(editing)}
              disabled={saving}
              style={{
                ...btnPrimary,
                padding: "8px 16px",
                opacity: saving ? 0.6 : 1,
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              <Check size={14} />
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditing(null)}
              disabled={saving}
              style={{ ...btnGhost, padding: "8px 16px" }}
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.length === 0 && (
          <p style={{ color: c.muted, fontSize: 14 }}>Nothing here yet.</p>
        )}
        {items.map((item, idx) => (
          <Card
            key={getId(item) ?? idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>{renderRow(item)}</div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button
                onClick={() => setEditing(item)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  background: "transparent",
                  border: "none",
                  color: c.muted,
                  cursor: "pointer",
                }}
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => remove(getId(item))}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  background: "transparent",
                  border: "none",
                  color: c.danger,
                  cursor: "pointer",
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}