import React, { useState } from "react";
import ListEditor from "./ListEditor";
import Field from "../common/Field";
import { c, mono, inputStyle, API_BASE } from "../../utils/constants";


function getImageUrl(url) {
  if (!url) return "";
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `${API_BASE}${url}`;
}

export default function ProjectsEditor({
  items,
  onSaveItem,
  onRemoveItem,
}) {
  return (
    <ListEditor
      title="Projects"
      items={items}
      onSaveItem={onSaveItem}
      onRemoveItem={onRemoveItem}
      empty={() => ({
        id: null,
        name: "",
        description: "",
        screenshotUrl: "",
        techStack: [],
        features: [],
        githubUrl: "",
        liveUrl: "",
        featured: false,
        published: true,
        order: 0,
      })}
      renderForm={(f, setF) => (
        <ProjectForm f={f} setF={setF} />
      )}
      renderRow={(p) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {p.screenshotUrl && (
            <img
              src={getImageUrl(p.screenshotUrl)}
              alt={p.name}
              style={{
                width: 70,
                height: 45,
                objectFit: "cover",
                borderRadius: 7,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}

          <div>
            <div style={{ fontWeight: 600, color: c.text }}>
              {p.name}
            </div>

            <div
              style={{
                fontSize: 11,
                color: c.muted,
                marginTop: 3,
              }}
            >
              {Array.isArray(p.techStack)
                ? p.techStack.join(" · ")
                : p.techStack}
            </div>
          </div>
        </div>
      )}
    />
  );
}

function ProjectForm({ f, setF }) {
  const [preview, setPreview] = useState(
    f.screenshotUrl ? getImageUrl(f.screenshotUrl) : ""
  );

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    setF({
      ...f,
      imageFile: file,
    });
  };

  return (
    <div className="grid sm:grid-cols-2 gap-3">

      <Field
        label="Project Name"
        value={f.name}
        onChange={(e) =>
          setF({
            ...f,
            name: e.target.value,
          })
        }
      />

      <Field
        label="Tech stack"
        value={Array.isArray(f.techStack) ? f.techStack.join(", ") : ""}
        onChange={(e) =>
          setF({
            ...f,
            techStack: e.target.value
              .split(",")
              .map((x) => x.trim())
              .filter(Boolean),
          })
        }
      />

      <Field
        label="GitHub URL"
        value={f.githubUrl}
        onChange={(e) =>
          setF({
            ...f,
            githubUrl: e.target.value,
          })
        }
      />

      <Field
        label="Live URL"
        value={f.liveUrl}
        onChange={(e) =>
          setF({
            ...f,
            liveUrl: e.target.value,
          })
        }
      />

      <label
        style={{
          gridColumn: "1 / -1",
          display: "block",
          fontSize: 12,
          color: c.muted,
        }}
      >
        Project Screenshot

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            ...inputStyle,
            marginTop: 6,
            padding: "8px",
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              marginTop: 10,
              width: 160,
              height: 100,
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              display: "block",
            }}
          />
        )}

        {f.imageFile && (
          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: c.mutedSoft,
            }}
          >
            Selected: {f.imageFile.name}
          </div>
        )}
      </label>

      {/* DESCRIPTION */}
      <label
        style={{
          gridColumn: "1 / -1",
          display: "block",
          ...mono,
          fontSize: 12,
          color: c.muted,
        }}
      >
        Description

        <textarea
          value={f.description}
          onChange={(e) =>
            setF({
              ...f,
              description: e.target.value,
            })
          }
          rows={3}
          style={{
            ...inputStyle,
            marginTop: 5,
            fontFamily: "Inter, sans-serif",
            resize: "vertical",
          }}
        />
      </label>

      {/* FEATURED */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 14,
          color: c.body,
        }}
      >
        <input
          type="checkbox"
          checked={!!f.featured}
          onChange={(e) =>
            setF({
              ...f,
              featured: e.target.checked,
            })
          }
        />

        Featured
      </label>
    </div>
  );
}