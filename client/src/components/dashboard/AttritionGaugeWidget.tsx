import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AttritionGaugeWidget() {
  const attritionRate = 4.2;
  const target = 8;
  const percentage = (attritionRate / target) * 100;
  const rotation = (percentage / 100) * 180 - 90;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Attrition Rate</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-40 h-20 overflow-hidden">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Background arc */}
            <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="hsl(var(--muted))" strokeWidth="16" strokeLinecap="round" />
            {/* Value arc */}
            <path
              d="M 10 100 A 90 90 0 0 1 190 100"
              fill="none"
              stroke="hsl(160,100%,39%)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.83} 283`}
            />
            {/* Needle */}
            <line
              x1="100" y1="100" x2="100" y2="25"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
              transform={`rotate(${rotation}, 100, 100)`}
            />
            <circle cx="100" cy="100" r="5" fill="hsl(var(--foreground))" />
          </svg>
        </div>
        <div className="text-center mt-2">
          <p className="text-2xl font-bold text-foreground">{attritionRate}%</p>
          <p className="text-xs text-muted-foreground">Target: &lt;{target}%</p>
        </div>
      </CardContent>
    </Card>
  );
}
