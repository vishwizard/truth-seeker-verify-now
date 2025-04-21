
import { useState } from "react";
import { verifyText, type VerificationResult as VerificationResultType } from "@/utils/verificationService";
import VerificationForm from "@/components/VerificationForm";
import VerificationResult from "@/components/VerificationResult";
import LoadingIndicator from "@/components/LoadingIndicator";
import { ShieldCheck } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResultType | null>(null);

  const handleVerify = async (text: string) => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const verificationResult = await verifyText(text);
      setResult(verificationResult);
    } catch (error) {
      console.error("Verification error:", error);
      // In a real app, we'd handle errors properly here
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
