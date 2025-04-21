
import { CheckCircle, XCircle, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { VerificationResult as ResultType } from "@/utils/verificationService";

type VerificationResultProps = {
  result: ResultType;
};

const VerificationResult: React.FC<VerificationResultProps> = ({ result }) => {
  const { isTrue, confidence, explanation, sources } = result;
  
  const getResultColor = () => {
    if (isTrue === true) return "text-truth-true";
    if (isTrue === false) return "text-truth-false";
    return "text-truth-unknown";
  };
  
  const getResultIcon = () => {
    if (isTrue === true) return <CheckCircle className="h-8 w-8 text-truth-true" />;
    if (isTrue === false) return <XCircle className="h-8 w-8 text-truth-false" />;
    return <ShieldCheck className="h-8 w-8 text-truth-unknown" />;
  };
  
  const getResultText = () => {
    if (isTrue === true) return "Likely True";
    if (isTrue === false) return "Likely False";
    return "Unverified";
  };
  
  const confidencePercent = confidence * 100;
  
  const getConfidenceColor = () => {
    if (isTrue === true) return "bg-truth-true";
    if (isTrue === false) return "bg-truth-false";
    return "bg-truth-unknown";
  };

  return (
    <Card className="w-full max-w-3xl shadow-lg border-2 border-slate-200 animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="animate-in zoom-in-50 duration-500 delay-200">
          {getResultIcon()}
        </div>
        <CardTitle className={`text-2xl font-bold ${getResultColor()} animate-in fade-in-50 duration-500 delay-300`}>
          {getResultText()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Confidence</span>
            <span className="text-sm font-medium">{confidencePercent.toFixed(0)}%</span>
          </div>
          <Progress value={confidencePercent} className={`h-2 ${getConfidenceColor()}`} />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold">Analysis:</h3>
          <p className="text-muted-foreground">{explanation}</p>
        </div>
        
        {sources && sources.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Sources:</h3>
            <ul className="list-disc list-inside space-y-1">
              {sources.map((source, index) => (
                <li key={index}>
                  <a 
                    href={source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationResult;
