
import { useState, useEffect } from "react";
import { verifyText, type VerificationResult as VerificationResultType } from "@/utils/verificationService";
import VerificationForm from "@/components/VerificationForm";
import VerificationResult from "@/components/VerificationResult";
import LoadingIndicator from "@/components/LoadingIndicator";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResultType | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("gemini-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsApiKeySet(true);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini-api-key", apiKey);
      setIsApiKeySet(true);
      toast.success("API Key saved successfully");
    }
  };

  const resetApiKey = () => {
    localStorage.removeItem("gemini-api-key");
    setApiKey("");
    setIsApiKeySet(false);
    toast.info("API Key removed");
  };

  const handleVerify = async (text: string) => {
    if (!apiKey) {
      toast.error("Please enter your API key first");
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    
    try {
      const verificationResult = await verifyText(text, apiKey);
      setResult(verificationResult);
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Failed to verify text. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShieldCheck className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">TruthSeeker</h1>
            </div>
            <p className="text-sm text-gray-500">Verify before you share</p>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">News Verification Tool</h2>
            <p className="text-gray-600">
              Paste any news article, social media post, or claim to verify its accuracy
            </p>
          </div>

          {!isApiKeySet ? (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Enter your Gemini API Key</h3>
              <div className="flex space-x-2">
                <Input 
                  type="password" 
                  placeholder="Your Gemini API Key" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={saveApiKey} disabled={!apiKey.trim()}>
                  Save Key
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Your API key will be stored locally in your browser and is only used to make verification requests.
              </p>
            </div>
          ) : (
            <div className="mb-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={resetApiKey} className="text-xs">
                Reset API Key
              </Button>
            </div>
          )}

          <div className="mb-8">
            <VerificationForm onSubmit={handleVerify} isLoading={isLoading} />
          </div>
          
          {isLoading && <LoadingIndicator />}
          
          {!isLoading && result && <VerificationResult result={result} />}
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            TruthSeeker Verification Tool &copy; {new Date().getFullYear()} | Disclaimer: This is a demonstration app and does not provide actual fact-checking.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
