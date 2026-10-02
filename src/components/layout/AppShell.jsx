import Navigation from './Navigation';

// pb-28 trên mobile chừa chỗ cho thanh điều hướng nổi ở đáy.
export default function AppShell({ page, onNavigate, children }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl gap-6 p-4 pb-28 md:p-6 md:pb-6">
      <Navigation page={page} onNavigate={onNavigate} />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}