"use client"

export default function LeaveRequestSummary() {
  const pendingLeaveRequests = 20;
  
  return (
    <div className="flex flex-col gap-4 rounded-md p-4 w-full h-full justify-center">
      <h1 className="text-center text-2xl font-bold">
        Ilość wniosków do zatwierdzenia:
      </h1>
      <span
        className={`text-center text-6xl font-bold ${pendingLeaveRequests > 5 ? pendingLeaveRequests > 10 ? "text-red-600" : "text-yellow-600" : "text-green-600"}`}
      >
        {pendingLeaveRequests}
      </span>
    </div>
  );
}
