
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

type VerificationFormProps = {
  onSubmit: (text: string) => void;
  isLoading: boolean;
};

const VerificationForm: React.FC<VerificationFormProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <Card className="w-full max-w-3xl shadow-lg border-2 border-slate-200">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea 
              placeholder="Paste the news or information you want to verify..."
              className="min-h-[150px] text-base resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isLoading || !text.trim()} 
              className="w-full sm:w-auto"
            >
              {isLoading ? "Verifying..." : "Verify Now"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerificationForm;
