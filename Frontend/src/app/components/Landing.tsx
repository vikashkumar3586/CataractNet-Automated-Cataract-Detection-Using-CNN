import { Eye, Brain, Zap, Shield, Upload, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import type { Page } from '../App';
import { isAuthenticated } from '../utils/auth';

interface LandingProps {
  onNavigate: (page: Page) => void;
}

export function Landing({ onNavigate }: LandingProps) {
  const features = [
    {
      icon: Brain,
      title: 'AI-Based Cataract Detection',
      description: 'Advanced deep learning model trained on thousands of slit-lamp eye images for accurate detection.',
      color: 'from-[#0891b2] to-[#06b6d4]',
    },
    {
      icon: Zap,
      title: 'Severity Classification',
      description: 'Automatically classifies cataracts into Normal, Mild, or Severe categories with confidence scores.',
      color: 'from-[#10b981] to-[#34d399]',
    },
    {
      icon: Shield,
      title: 'Fast and Accurate Screening',
      description: 'Get results in seconds with high accuracy, helping healthcare professionals make informed decisions.',
      color: 'from-[#8b5cf6] to-[#a78bfa]',
    },
  ];
  const handleUploadClick = () => {
  if (isAuthenticated()) {
    onNavigate('upload');
  } else {
    onNavigate('login');
  }
};


  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#e0f2fe] to-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Hero Text */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-4 px-4 py-2 bg-[#0891b2]/10 rounded-full">
                <span className="text-sm text-[#0891b2]">Powered by Deep Learning</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
                CataractNet
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                Automated Cataract Detection Using Deep Learning
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl">
                Upload slit-lamp eye images and get instant AI-powered analysis for cataract detection and severity grading. 
                Fast, accurate, and reliable screening for healthcare professionals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleUploadClick}
                  className="px-8 py-4 bg-[#0891b2] text-white rounded-xl hover:bg-[#0e7490] transition-colors flex items-center gap-2 justify-center shadow-lg hover:shadow-xl"
                >
                  <Upload className="w-5 h-5" />
                  Upload Eye Image
                </button>
                
              </div>
            </motion.div>
            
            {/* Hero Image/Illustration */}
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0891b2]/20 to-[#06b6d4]/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <div className="w-full aspect-square bg-gradient-to-br from-[#e0f2fe] to-[#e0f2f1] rounded-2xl flex items-center justify-center">
                    <Eye className="w-32 h-32 text-[#0891b2]" strokeWidth={1.5} />
                  </div>
                  
                  {/* Floating badges */}
                  {/*<motion.div
                    className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-border"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>
                      <span className="text-sm">AI Powered</span>
                    </div>
                  </motion.div>*/}
                  
                  {/*<motion.div
                    className="absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-border"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#0891b2] rounded-full"></div>
                      <span className="text-sm">95% Accuracy</span>
                    </div>
                  </motion.div>*/}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-foreground">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology for reliable cataract detection and grading
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-shadow"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl mb-3 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0891b2] to-[#06b6d4]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-white">
              Ready to Get Started?
            </h2>
            
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              Upload a slit-lamp eye image and receive instant AI-powered analysis with cataract detection and severity grading.
            </p>
            
            <button
              onClick={handleUploadClick}
              className="px-10 py-4 bg-white text-[#0891b2] rounded-xl hover:bg-gray-50 transition-colors inline-flex items-center gap-2 shadow-xl"
            >
              <Upload className="w-5 h-5" />
              Upload Image Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
