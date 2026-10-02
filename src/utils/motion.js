// ─── SPRING PRESETS ─────────────────────────────────────────
// stiffness cao + damping vừa = phản hồi nhanh nhưng không nảy quá đà.
export const spring = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }; // mặc định
export const springSoft = { type: 'spring', stiffness: 180, damping: 24 };        // modal, chuyển trang
export const springSnappy = { type: 'spring', stiffness: 420, damping: 32 };      // nút, hover

// ─── VARIANTS DÙNG LẠI ──────────────────────────────────────

// Chuyển trang: mờ dần + trượt nhẹ lên
export const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: springSoft },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

// Container danh sách: con xuất hiện lần lượt (stagger) → cảm giác "load dữ liệu" mượt
export const listContainer = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
export const listItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: spring },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2 } },
};

// Overlay + panel của modal / slide-over
export const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
export const slideOverVariants = {
  initial: { x: '100%' },
  animate: { x: 0, transition: springSoft },
  exit: { x: '100%', transition: { duration: 0.2 } },
};

// ─── TƯƠNG TÁC (props cho whileHover / whileTap) ────────────
export const hoverLift = { y: -3, scale: 1.01, transition: springSnappy };
export const tapPress = { scale: 0.97, transition: springSnappy };