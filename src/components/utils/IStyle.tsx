export default function IStyle(focused: boolean): React.CSSProperties {
  return {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: `1px solid ${focused ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 10,
    padding: "9px 12px",
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    outline: "none",
    transition: "border-color 0.15s",
    fontFamily: "'Inter', sans-serif",
  };
}
