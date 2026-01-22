import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function NotesLibrary({ stickers, onCreate, onUpdate, onDelete, query, onQueryChange }) {
  const COLORS = ["#FFF7CC", "#DFF3FF", "#E8F8E8", "#FBE3FF", "#FFE2D6"];
  const [newText, setNewText] = useState("");
  const [newColor, setNewColor] = useState(COLORS[0]);
  const [open, setOpen] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingColor, setEditingColor] = useState(COLORS[0]);

  const normalizedQuery = String(query ?? "").trim().toLowerCase();

  const sorted = useMemo(() => {
    const list = [...(stickers ?? [])];
    list.sort((a, b) => String(a?.text ?? "").localeCompare(String(b?.text ?? "")));
    return list;
  }, [stickers]);

  const filtered = useMemo(() => {
    if (!normalizedQuery) return sorted;
    return sorted.filter((s) => String(s?.text ?? "").toLowerCase().includes(normalizedQuery));
  }, [sorted, normalizedQuery]);

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditingText(String(note.text ?? ""));
    setEditingColor(note.color ?? COLORS[0]);
  };

  const saveEdit = () => {
    const trimmed = editingText.trim();
    if (!trimmed || !editingId) return;
    onUpdate?.({ id: editingId, text: trimmed, color: editingColor });
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const create = () => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    onCreate?.({ id: uuidv4(), text: trimmed, color: newColor });
    setNewText("");
  };

  const onDragStart = (e, noteId) => {
    e.dataTransfer.setData("itemToken", `sticker:${noteId}`);
  };

  return (
    <div style={{ marginTop: 18 }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "10px 12px",
          border: "1px solid #ddd",
          borderRadius: 10,
          background: "#fff",
          cursor: "pointer",
          fontWeight: 900,
        }}
        aria-expanded={open}
      >
        <span>Stickers</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ opacity: 0.7, fontSize: 12 }}>{filtered.length}</span>
          <span aria-hidden="true">{open ? "▾" : "▸"}</span>
        </span>
      </button>

      {open && (
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map((note) => {
              const isEditing = editingId === note.id;
              const bg = note.color ?? "#FFF7CC";

              return (
                <div
                  key={note.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, note.id)}
                  onClick={() => onQueryChange?.(String(note?.text ?? ""))}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    padding: 10,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    cursor: "grab",
                    maxWidth: "100%",
                    userSelect: "none",
                  }}
                  title="Drag into calendar"
                >
                  {isEditing ? (
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flex: 1,
                        minWidth: 0,
                        alignItems: "center",
                        flexWrap: "wrap",
                        cursor: "auto",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        style={{ flex: "1 1 180px", minWidth: 0 }}
                      />
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        {COLORS.map((c) => {
                          const isActive = c === editingColor;
                          return (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setEditingColor(c)}
                              aria-label="Pick sticker color"
                              title="Pick color"
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 999,
                                border: isActive ? "2px solid #111" : "1px solid rgba(0,0,0,0.25)",
                                background: c,
                                cursor: "pointer",
                                padding: 0,
                              }}
                            />
                          );
                        })}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button type="button" onClick={saveEdit}>
                          Save
                        </button>
                        <button type="button" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                        <span aria-hidden="true">🏷️</span>
                        <span
                          style={{
                            fontWeight: 800,
                            minWidth: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {note.text}
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEdit(note);
                          }}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(note.id);
                          }}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add form below list */}
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Add sticker (e.g. Yogurt)"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "8px 10px",
                    border: "1px solid #ccc",
                    borderRadius: 10,
                  }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  {COLORS.map((c) => {
                    const isActive = c === newColor;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setNewColor(c)}
                        aria-label="Pick sticker color"
                        title="Pick color"
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 999,
                          border: isActive ? "2px solid #111" : "1px solid rgba(0,0,0,0.25)",
                          background: c,
                          cursor: "pointer",
                          padding: 0,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="button" onClick={create}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesLibrary;

