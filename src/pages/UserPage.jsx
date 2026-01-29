import { useEffect, useMemo, useRef, useState } from "react";

function UserPage({ user, recipes = [], onUpdateNickname, onClearSignatureDish }) {
  if (!user) return null;

  const initials = String(user.nickname ?? "?")
    .trim()
    .slice(0, 2)
    .toUpperCase();

  const signatureDish = useMemo(() => {
    const sigId = user?.signatureDishRecipeId;
    if (!sigId) return null;
    return (recipes ?? []).find(
      (r) => String(r.authorId) === String(user.id) && String(r.id) === String(sigId),
    ) ?? null;
  }, [recipes, user?.id, user?.signatureDishRecipeId]);

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

      <div style={{ marginTop: 18 }}>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>Signature dish</div>
        {signatureDish ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              aria-label="Signature dish image placeholder"
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "#f3f3f3",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                color: "#444",
              }}
            >
              {(signatureDish.name ?? "?").slice(0, 1).toUpperCase()}
            </div>
            <div style={{ fontWeight: 800 }}>{signatureDish.name}</div>
            <button
              type="button"
              onClick={() => onClearSignatureDish?.()}
              title="Remove signature dish"
              aria-label="Remove signature dish"
              style={{
                marginLeft: 4,
                width: 28,
                height: 28,
                borderRadius: 999,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <div style={{ opacity: 0.65 }}>Not assigned</div>
        )}
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

