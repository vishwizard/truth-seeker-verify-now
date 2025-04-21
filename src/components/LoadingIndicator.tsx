
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LoadingIndicator = () => {
  return (
    <Card className="w-full max-w-3xl shadow-lg border-2 border-slate-200">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
        <p className="text-lg font-medium">Verifying information...</p>
        <p className="text-sm text-muted-foreground mt-2">
          Our system is analyzing the content for factual accuracy
        </p>
      </CardContent>
    </Card>
  );
};

export default LoadingIndicator;
