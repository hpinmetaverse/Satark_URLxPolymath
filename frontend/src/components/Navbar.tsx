const Topbar = () => {
  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-yellow-50
       z-10 
    "
    >
      <div className="flex gap-2 items-center">
        <img src="/AutoInsight.png" className="size-12" alt="A" />
      </div>
      <div className="flex items-center gap-4"></div>
    </div>
  );
};

export default Topbar;
