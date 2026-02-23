export default function TodayLeaveRequest() {
  return (
    <div className="flex flex-col gap-4 rounded-md p-4 w-full h-full justify-center">
      <h1 className="text-center text-2xl font-bold">
        Dzisiaj na urlopie przebywa:
      </h1>
      {/* Dodano items-baseline */}
      <div className="flex flex-row gap-2 justify-center items-baseline">
        <span className="text-center text-6xl font-bold">20</span>
        {/* Usunięto my-auto */}
        <span className="text-3xl">osób</span>
      </div>
    </div>
  );
}
