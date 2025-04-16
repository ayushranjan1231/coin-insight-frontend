
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, TrendingUp, DollarSign } from 'lucide-react';
import { AIModel, Cryptocurrency, PredictionFormData, Prediction } from '@/types';

// Mock data for available cryptocurrencies
const cryptocurrencies: Cryptocurrency[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', image: '' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', image: '' },
  { id: 'ripple', name: 'Ripple', symbol: 'XRP', image: '' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', image: '' },
  { id: 'solana', name: 'Solana', symbol: 'SOL', image: '' },
];

// Mock data for available AI models
const aiModels: AIModel[] = [
  { id: 'lstm', name: 'LSTM Neural Network', description: 'Long Short-Term Memory neural network for time series forecasting' },
  { id: 'arima', name: 'ARIMA', description: 'AutoRegressive Integrated Moving Average for statistical analysis' },
  { id: 'gru', name: 'GRU', description: 'Gated Recurrent Unit neural network for sequential data' },
  { id: 'transformer', name: 'Transformer', description: 'Attention-based model for sequence modeling' },
];

const PredictionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PredictionFormData>({
    cryptocurrencyId: '',
    modelId: ''
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real application, this would be an API call to your backend
      // For demo purposes, we'll simulate a prediction after a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock prediction result
      const randomPrice = Math.floor(Math.random() * 50000) + 10000;
      const randomConfidence = Math.floor(Math.random() * 30) + 70;

      setPrediction({
        cryptocurrency: formData.cryptocurrencyId,
        model: formData.modelId,
        predictedPrice: randomPrice,
        confidence: randomConfidence,
        timestamp: new Date()
      });

      toast({
        title: 'Prediction Generated',
        description: 'Your cryptocurrency prediction has been generated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate prediction. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: keyof PredictionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <LineChart className="h-6 w-6 text-primary" />
            <span>Cryptocurrency Price Prediction</span>
          </CardTitle>
          <CardDescription>
            Choose a cryptocurrency and an AI model to generate a price prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cryptocurrency">Cryptocurrency</Label>
                <Select 
                  onValueChange={(value) => handleChange('cryptocurrencyId', value)} 
                  value={formData.cryptocurrencyId}
                >
                  <SelectTrigger id="cryptocurrency">
                    <SelectValue placeholder="Select cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptocurrencies.map(crypto => (
                      <SelectItem key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">AI Model</Label>
                <Select 
                  onValueChange={(value) => handleChange('modelId', value)}
                  value={formData.modelId}
                >
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModels.map(model => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!formData.cryptocurrencyId || !formData.modelId || loading}
            >
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Generating Prediction...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Generate Prediction
                </>
              )}
            </Button>
          </form>
        </CardContent>
        
        {prediction && (
          <CardFooter className="flex flex-col space-y-4 border-t border-border/20 pt-6">
            <h3 className="text-lg font-semibold">Prediction Results</h3>
            <div className="w-full p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Cryptocurrency</p>
                  <p className="font-semibold">
                    {cryptocurrencies.find(c => c.id === prediction.cryptocurrency)?.name} 
                    ({cryptocurrencies.find(c => c.id === prediction.cryptocurrency)?.symbol})
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">AI Model</p>
                  <p className="font-semibold">
                    {aiModels.find(m => m.id === prediction.model)?.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Predicted Price</p>
                  <p className="text-xl font-bold flex items-center text-accent">
                    <DollarSign className="h-5 w-5 mr-1" />
                    {prediction.predictedPrice.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Confidence Level</p>
                  <div className="flex items-center">
                    <div className="flex-1 h-2 mr-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                    <span className="font-semibold text-primary">{prediction.confidence}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/20 text-xs text-muted-foreground">
                Generated on {prediction.timestamp.toLocaleString()}
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default PredictionForm;
