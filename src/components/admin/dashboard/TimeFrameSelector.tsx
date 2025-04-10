
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TimeFrame =  "monthly" | "yearly";

interface TimeFrameSelectorProps {
  timeFrame: TimeFrame;
  setTimeFrame: (timeFrame: TimeFrame) => void;
  className?: string;
}

export function TimeFrameSelector({
  timeFrame,
  setTimeFrame,
  className,
}: TimeFrameSelectorProps) {
  return (
    <div className={cn("flex space-x-2", className)}>
   
      <Button
        variant={timeFrame === "monthly" ? "default" : "outline"}
        size="sm"
        onClick={() => setTimeFrame("monthly")}
        className={
          timeFrame === "monthly" ? "bg-teal-600 hover:bg-teal-700" : ""
        }
      >
        Monthly
      </Button>
      <Button
        variant={timeFrame === "yearly" ? "default" : "outline"}
        size="sm"
        onClick={() => setTimeFrame("yearly")}
        className={
          timeFrame === "yearly" ? "bg-teal-600 hover:bg-teal-700" : ""
        }
      >
        Yearly
      </Button>
    </div>
  );
}
