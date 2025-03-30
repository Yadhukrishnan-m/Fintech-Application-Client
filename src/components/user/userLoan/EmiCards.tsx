

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  AlertTriangle,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { IEMI, } from "@/interfaces/interfaces";





interface EMITimelineProps {
  emis: IEMI[];
  onPayEMI: () => void;

}

export default function EMITimeline({ emis = [], onPayEMI }: EMITimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the first payable EMI index or first overdue/grace period EMI
  useEffect(() => {
    const payableIndex = emis.findIndex((emi) => emi.canPay);
    if (payableIndex !== -1) {
      setActiveIndex(payableIndex);
    } else {
      // If no payable EMIs, find the first overdue or grace period EMI
      const overdueOrGraceIndex = emis.findIndex(
        (emi) => emi.status === "overdue" || emi.status === "grace"
      );
      if (overdueOrGraceIndex !== -1) {
        setActiveIndex(overdueOrGraceIndex);
      }
    }
  }, [emis]);

  const scrollToCard = (index: number) => {
    if (containerRef.current && index >= 0 && index < emis.length) {
      const container = containerRef.current;
      const cardWidth = container.scrollWidth / emis.length;
      container.scrollTo({
        left: cardWidth * index - container.clientWidth / 2 + cardWidth / 2,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < emis.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <Check className="h-5 w-5" />;
      case "upcoming":
        return <Clock className="h-5 w-5" />;
      case "grace":
        return <Clock className="h-5 w-5" />;
      case "overdue":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "paid":
        return {
          gradient: "from-green-500 to-green-700",
          iconBg: "bg-green-400/30",
          iconColor: "text-white",
          badge: "bg-green-200 text-green-800",
        };
      case "upcoming":
        return {
          gradient: "from-teal-400 to-teal-600",
          iconBg: "bg-teal-400/30",
          iconColor: "text-white",
          badge: "bg-teal-200 text-teal-800",
        };
      case "due":
        return {
          gradient: "from-orange-500 to-orange-700",
          iconBg: "bg-orange-400/30",
          iconColor: "text-white",
          badge: "bg-orange-200 text-orange-800",
        };
      case "grace":
        return {
          gradient: "from-amber-400 to-amber-600",
          iconBg: "bg-amber-400/30",
          iconColor: "text-white",
          badge: "bg-amber-200 text-amber-800",
        };
      case "overdue":
        return {
          gradient: "from-red-500 to-red-700",
          iconBg: "bg-red-400/30",
          iconColor: "text-white",
          badge: "bg-red-200 text-red-800",
        };
      default:
        return {
          gradient: "from-gray-400 to-gray-600",
          iconBg: "bg-gray-400/30",
          iconColor: "text-white",
          badge: "bg-gray-200 text-gray-800",
        };
    }
  };

  const formatDate = (date: Date) => {
    try {
      return format(new Date(date), "dd MMM yyyy");
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-teal-800">EMI Timeline</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={activeIndex === 0}
            className="border-teal-500 text-teal-700 hover:bg-teal-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={activeIndex === emis.length - 1}
            className="border-teal-500 text-teal-700 hover:bg-teal-50"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-6 pt-2 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {emis.map((emi, index) => {
            const styles = getStatusStyles(emi.status);
            return (
              <Card
                key={emi.emiNumber}
                className={`flex-shrink-0 w-[280px] snap-center rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 ${
                  index === activeIndex
                    ? "scale-105 shadow-xl z-10"
                    : "scale-95 opacity-80"
                }`}
                onClick={() => scrollToCard(index)}
              >
                <div
                  className={`bg-gradient-to-br ${styles.gradient} h-full flex flex-col`}
                >
                  {/* Card Header */}
                  <div className="p-5 pb-3">
                    <div className="flex justify-between items-center mb-3">
                      <Badge className={`${styles.badge} font-medium`}>
                        EMI #{emi.emiNumber}
                      </Badge>
                      <div
                        className={`flex items-center justify-center ${styles.iconBg} ${styles.iconColor} rounded-full p-2`}
                      >
                        {getStatusIcon(emi.status)}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1 mb-1">
                      <h3 className="text-2xl font-bold text-white">
                        ₹{emi.amount.toFixed(2)}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-white/90 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{formatDate(emi.dueDate)}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-5 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="capitalize font-medium text-white bg-white/20 px-3 py-1 rounded-full text-sm">
                        {emi.status}
                      </span>
                      {emi.penalty > 0 && (
                        <Badge
                          variant="destructive"
                          className="bg-white/20 text-white"
                        >
                          +₹{emi.penalty} penalty
                        </Badge>
                      )}
                    </div>

                    {emi.status === "grace" && (
                      <div className="mt-2 text-xs text-white/90">
                        <span>
                          Grace period ends:{" "}
                          {formatDate(emi.gracePeriodEndDate)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer - Push to bottom with flex-grow */}
                  <div className="mt-auto px-5 pb-5">
                    {emi.canPay ? (
                      <Button
                        className="w-full bg-white hover:bg-white/90 text-teal-700 font-medium flex items-center justify-center gap-2 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPayEMI();
                        }}
                      >
                        <CreditCard className="h-4 w-4" />
                        Pay Rs.{(emi.amount+emi.penalty).toFixed(2)} Now 
                      </Button>
                    ) : emi.status === "paid" ? (
                      <div className="w-full bg-white/20 text-white text-center py-2 rounded-md">
                        Paid on{" "}
                        {emi.transaction && emi.transaction.createdAt
                          ? formatDate(new Date(emi.transaction.createdAt))
                          : ""}
                      </div>
                    ) : (
                      <div className="w-full bg-white/10 text-white/70 text-center py-2 rounded-md">
                        {emi.status === "upcoming"
                          ? "Payment scheduled"
                          : "Payment not available"}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Timeline dots */}
        <div className="flex justify-center gap-1 mt-4">
          {emis.map((emi, index) => {
            const styles = getStatusStyles(emi.status);
            const dotBaseClass = `h-2 rounded-full transition-all`;
            const dotActiveClass = `bg-gradient-to-r ${styles.gradient} w-6`;
            const dotInactiveClass = `bg-gray-300 w-2`;

            return (
              <button
                key={index}
                className={`${dotBaseClass} ${
                  index === activeIndex ? dotActiveClass : dotInactiveClass
                }`}
                onClick={() => scrollToCard(index)}
                aria-label={`Go to EMI ${emi.emiNumber}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

