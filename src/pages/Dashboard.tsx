
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  TrendingUp, 
  History, 
  Settings, 
  DollarSign, 
  ChevronUp, 
  ChevronDown,
  ArrowUpRight,
  Bell,
  Plus,
  Star,
  BarChart3
} from 'lucide-react';
import PredictionForm from '@/components/PredictionForm';

// Mock data
const recentPredictions = [
  { id: 1, crypto: 'Bitcoin', model: 'LSTM', predicted: 32150, actual: 33200, timestamp: new Date(Date.now() - 86400000 * 2), accuracy: 97 },
  { id: 2, crypto: 'Ethereum', model: 'ARIMA', predicted: 1850, actual: 1820, timestamp: new Date(Date.now() - 86400000 * 3), accuracy: 98 },
  { id: 3, crypto: 'Cardano', model: 'GRU', predicted: 0.42, actual: 0.46, timestamp: new Date(Date.now() - 86400000 * 5), accuracy: 91 },
  { id: 4, crypto: 'Solana', model: 'Transformer', predicted: 42.5, actual: 40.2, timestamp: new Date(Date.now() - 86400000 * 6), accuracy: 95 },
];

const marketSummary = [
  { 
    crypto: 'Bitcoin', 
    price: 32150.73, 
    change: 2.5, 
    volume: '3.2B', 
    marketCap: '621.3B'
  },
  { 
    crypto: 'Ethereum', 
    price: 1850.42, 
    change: -1.2, 
    volume: '1.5B', 
    marketCap: '219.7B'
  },
  { 
    crypto: 'Cardano', 
    price: 0.42, 
    change: 5.7, 
    volume: '320M', 
    marketCap: '14.2B'
  },
  { 
    crypto: 'Solana', 
    price: 42.5, 
    change: 8.1, 
    volume: '850M', 
    marketCap: '18.5B'
  },
  { 
    crypto: 'Ripple', 
    price: 0.56, 
    change: -3.2, 
    volume: '430M', 
    marketCap: '29.7B'
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const { isAuthenticated, user, loading } = state;
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !isAuthenticated) {
      toast({
        title: 'Access Denied',
        description: 'Please log in to access the dashboard.',
        variant: 'destructive',
      });
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect will happen based on the useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">
                    +3% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Favorite Model
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">LSTM</div>
                  <p className="text-xs text-muted-foreground">
                    Used in 8 predictions
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle>Recent Predictions</CardTitle>
                <CardDescription>
                  Your last 4 cryptocurrency price predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentPredictions.map((prediction) => (
                    <div key={prediction.id} className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-border/20 last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <div className="font-medium">{prediction.crypto}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className="flex items-center mr-4">
                            <LineChart className="h-3.5 w-3.5 mr-1" />
                            {prediction.model}
                          </div>
                          <div className="flex items-center">
                            <History className="h-3.5 w-3.5 mr-1" />
                            {new Date(prediction.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 mt-2 md:mt-0">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Predicted</div>
                          <div className="font-medium">${prediction.predicted.toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Actual</div>
                          <div className="font-medium">${prediction.actual.toLocaleString()}</div>
                        </div>
                        <div className="text-right min-w-[80px]">
                          <div className="text-sm text-muted-foreground">Accuracy</div>
                          <div className={`font-medium ${prediction.accuracy >= 95 ? 'text-green-500' : prediction.accuracy >= 90 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {prediction.accuracy}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Predictions
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle>Market Summary</CardTitle>
                <CardDescription>
                  Current prices and trends for top cryptocurrencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-muted-foreground text-sm border-b border-border/20">
                        <th className="pb-3 font-medium">Cryptocurrency</th>
                        <th className="pb-3 font-medium">Price</th>
                        <th className="pb-3 font-medium">24h Change</th>
                        <th className="pb-3 font-medium">Volume</th>
                        <th className="pb-3 font-medium">Market Cap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketSummary.map((crypto, index) => (
                        <tr key={index} className="border-b border-border/10 last:border-0">
                          <td className="py-3 font-medium">{crypto.crypto}</td>
                          <td className="py-3">${crypto.price.toLocaleString()}</td>
                          <td className="py-3">
                            <span className={`flex items-center ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {crypto.change >= 0 ? (
                                <ChevronUp className="h-4 w-4 mr-1" />
                              ) : (
                                <ChevronDown className="h-4 w-4 mr-1" />
                              )}
                              {Math.abs(crypto.change)}%
                            </span>
                          </td>
                          <td className="py-3">${crypto.volume}</td>
                          <td className="py-3">${crypto.marketCap}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle>New Prediction</CardTitle>
                <CardDescription>
                  Create a new cryptocurrency price prediction using AI models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PredictionForm />
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle>Prediction History</CardTitle>
                <CardDescription>
                  History of all your cryptocurrency price predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentPredictions.map((prediction) => (
                    <div key={prediction.id} className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-border/20 last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <div className="font-medium">{prediction.crypto}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className="flex items-center mr-4">
                            <LineChart className="h-3.5 w-3.5 mr-1" />
                            {prediction.model}
                          </div>
                          <div className="flex items-center">
                            <History className="h-3.5 w-3.5 mr-1" />
                            {new Date(prediction.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 mt-2 md:mt-0">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Predicted</div>
                          <div className="font-medium">${prediction.predicted.toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Actual</div>
                          <div className="font-medium">${prediction.actual.toLocaleString()}</div>
                        </div>
                        <div className="text-right min-w-[80px]">
                          <div className="text-sm text-muted-foreground">Accuracy</div>
                          <div className={`font-medium ${prediction.accuracy >= 95 ? 'text-green-500' : prediction.accuracy >= 90 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {prediction.accuracy}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Load More
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {marketSummary.slice(0, 4).map((crypto, index) => (
                <Card key={index} className="bg-card border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">
                      {crypto.crypto}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${crypto.price.toLocaleString()}</div>
                    <div className={`flex items-center text-sm ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {crypto.change >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(crypto.change)}%
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="flex items-center text-xs">
                      <Star className="h-3.5 w-3.5 mr-1.5" />
                      Add to favorites
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
                <CardDescription>
                  Detailed information about cryptocurrency markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-muted-foreground text-sm border-b border-border/20">
                        <th className="pb-3 font-medium">Cryptocurrency</th>
                        <th className="pb-3 font-medium">Price</th>
                        <th className="pb-3 font-medium">24h Change</th>
                        <th className="pb-3 font-medium">24h High</th>
                        <th className="pb-3 font-medium">24h Low</th>
                        <th className="pb-3 font-medium">Volume</th>
                        <th className="pb-3 font-medium">Market Cap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketSummary.map((crypto, index) => {
                        // Generate random high and low values
                        const highPrice = crypto.price * (1 + Math.random() * 0.05);
                        const lowPrice = crypto.price * (1 - Math.random() * 0.05);
                        
                        return (
                          <tr key={index} className="border-b border-border/10 last:border-0">
                            <td className="py-3 font-medium">{crypto.crypto}</td>
                            <td className="py-3">${crypto.price.toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`flex items-center ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {crypto.change >= 0 ? (
                                  <ChevronUp className="h-4 w-4 mr-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 mr-1" />
                                )}
                                {Math.abs(crypto.change)}%
                              </span>
                            </td>
                            <td className="py-3 text-green-500">${highPrice.toFixed(2)}</td>
                            <td className="py-3 text-red-500">${lowPrice.toFixed(2)}</td>
                            <td className="py-3">${crypto.volume}</td>
                            <td className="py-3">${crypto.marketCap}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Refresh Market Data
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
