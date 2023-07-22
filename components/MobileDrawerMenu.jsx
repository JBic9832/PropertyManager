export default function MobileDrawerMenu({
  children,
  isMenuOpen,
  changeMenuState,
}) {
  return (
    <div
      className={`${
        isMenuOpen ? "flex" : "hidden"
      } fixed left-0 top-0 bottom-0 flex flex-col p-6 gap-6 h-[100dvh] w-[90%] bg-white items-center text-3xl`}
    >
      {children}
      <h1 className="mt-auto" onClick={() => changeMenuState(false)}>
        Close
      </h1>
    </div>
  );
}
