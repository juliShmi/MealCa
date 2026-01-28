import { useEffect, useRef, useState } from "react";

function UserPage({ user, onUpdateNickname }) {
  if (!user) return null;

  const initials = String(user.nickname ?? "?")
    .trim()
    .slice(0, 2)
    .toUpperCase();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(String(user.nickname ?? ""));
  const inputRef = useRef(null);

  useEffect(() => {
    setDraft(String(user.nickname ?? ""));
  }, [user?.nickname]);

  useEffect(() => {
    if (!isEditing) return;
    inputRef.current?.focus?.();
    inputRef.current?.select?.();
  }, [isEditing]);

  return (
    <div style={{ padding: 16, maxWidth: 720 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          aria-label="User avatar placeholder"
          title={user.nickname}
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#eee",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            fontSize: 22,
            color: "#333",
            border: "1px solid #ddd",
          }}
        >
          {initials}
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 20, fontWeight: 900 }}>{user.nickname}</div>
            {!isEditing && (
              <button type="button" onClick={() => setIsEditing(true)} title="Edit nickname" aria-label="Edit nickname">
                ✎
              </button>
            )}
          </div>
          <div style={{ opacity: 0.7, marginTop: 4 }}>id: {user.id}</div>
        </div>
      </div>

      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const next = draft.trim();
            if (!next) return;
            onUpdateNickname?.(next);
            setIsEditing(false);
          }}
          style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center" }}
        >
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="New nickname"
            maxLength={32}
            style={{ flex: 1, minWidth: 0 }}
          />
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              setDraft(String(user.nickname ?? ""));
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default UserPage;

