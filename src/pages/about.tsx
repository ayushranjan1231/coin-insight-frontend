
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Brain, Code, Cpu, BarChart, Network } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">About CryptoPredict</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leveraging artificial intelligence to predict cryptocurrency market trends
            </p>
          </div>

          <Card className="mb-12 bg-card border-border/50">
            <CardContent className="pt-6 pb-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                CryptoPredict was founded with a clear mission: to democratize access to advanced cryptocurrency 
                price prediction technology. We believe that by combining cutting-edge AI models with comprehensive 
                market data, we can provide valuable insights to investors and enthusiasts alike.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">The Technology</h2>
              <p className="text-muted-foreground">
                Our platform utilizes multiple AI models including Long Short-Term Memory (LSTM) networks, 
                ARIMA forecasting, Gated Recurrent Units (GRU), and Transformer architectures. We continuously 
                train and refine these models using historical cryptocurrency data, market indicators, 
                and sentiment analysis from social media and news sources.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-6 text-center">Our AI Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: <Cpu className="h-8 w-8 text-primary" />,
                title: "LSTM Networks",
                description: "Specialized neural networks that excel at learning patterns in sequential data, ideal for time series forecasting of cryptocurrency prices."
              },
              {
                icon: <BarChart className="h-8 w-8 text-accent" />,
                title: "ARIMA Models",
                description: "Statistical models that capture autocorrelations in temporal data, providing solid baseline predictions for cryptocurrency markets."
              },
              {
                icon: <Brain className="h-8 w-8 text-secondary" />,
                title: "GRU Models",
                description: "Streamlined recurrent neural networks that efficiently capture dependencies in price data without excessive computational requirements."
              },
              {
                icon: <Network className="h-8 w-8 text-crypto-purple" />,
                title: "Transformer Models",
                description: "Attention-based models that can identify complex relationships in market data across different timeframes simultaneously."
              },
            ].map((model, index) => (
              <Card key={index} className="bg-card border-border/50 h-full">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center mr-4 flex-shrink-0">
                      {model.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{model.title}</h3>
                      <p className="text-muted-foreground">{model.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-border/50">
            <CardContent className="pt-6 pb-6">
              <h2 className="text-2xl font-bold mb-4">The Team</h2>
              <p className="text-muted-foreground mb-6">
                CryptoPredict was created by a dedicated team of data scientists, machine learning engineers, 
                and cryptocurrency experts. Our diverse backgrounds in finance, computer science, and statistical 
                analysis allow us to approach cryptocurrency prediction from multiple angles.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Research & Development</h2>
              <p className="text-muted-foreground">
                We're committed to continuous improvement of our prediction models. Our team regularly publishes 
                research on cryptocurrency market analysis and machine learning applications in fintech. 
                We collaborate with academic institutions and industry partners to stay at the cutting edge 
                of AI and blockchain technology.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default About;
