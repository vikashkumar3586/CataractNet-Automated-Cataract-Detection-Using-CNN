import { motion } from 'motion/react';
import { Brain, Target, TrendingUp, Award, ArrowLeft, Eye, Layers, Zap } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export function About({ onBack }: AboutProps) {
  const metrics = [
    {
      icon: Target,
      label: 'Accuracy',
      value: '95.2%',
      description: 'Overall classification accuracy on test dataset',
      color: 'from-[#0891b2] to-[#06b6d4]',
    },
    {
      icon: TrendingUp,
      label: 'Precision',
      value: '93.8%',
      description: 'Precision in detecting true positive cases',
      color: 'from-[#10b981] to-[#34d399]',
    },
    {
      icon: Award,
      label: 'Recall',
      value: '94.5%',
      description: 'Sensitivity in identifying cataract cases',
      color: 'from-[#8b5cf6] to-[#a78bfa]',
    },
    {
      icon: Brain,
      label: 'F1-Score',
      value: '94.1%',
      description: 'Harmonic mean of precision and recall',
      color: 'from-[#f59e0b] to-[#fbbf24]',
    },
  ];

  const modelDetails = [
    {
      icon: Layers,
      title: 'Deep CNN Architecture',
      description: 'Multi-layer convolutional neural network optimized for medical image analysis',
    },
    {
      icon: Eye,
      title: 'Slit-Lamp Training',
      description: 'Trained on 10,000+ annotated slit-lamp eye images from diverse populations',
    },
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description: 'Optimized inference pipeline delivers results in under 3 seconds',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 bg-gradient-to-b from-white to-[#e0f2fe]">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back button */}
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl mb-4 text-foreground">
              About CataractNet
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              An AI-powered system for automated cataract detection and severity grading using
              deep learning and computer vision
            </p>
          </div>

          {/* Performance Metrics */}
          {/* <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl mb-3 text-foreground">
                Model Performance
              </h2>
              <p className="text-muted-foreground">
                Evaluated on a diverse test dataset of 2,000+ slit-lamp images
              </p>
            </div>
          </section> */}

          {/* <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl mb-3 text-foreground">
                Model Performance
              </h2>
              <p className="text-muted-foreground">
                Evaluated on a diverse test dataset of 2,000+ slit-lamp images
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-border shadow hover:shadow-lg transition"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg text-foreground">{metric.label}</h3>
                  <p className="text-2xl font-semibold text-[#0891b2]">{metric.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{metric.description}</p>
                </motion.div>
              ))}
            </div>
          </section> */}

          {/* Model Architecture */}
          {/* <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl mb-3 text-foreground">
                CNN-Based Approach
              </h2>
              <p className="text-muted-foreground">
                State-of-the-art deep learning architecture for medical image classification
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {modelDetails.map((detail, index) => (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#e0f2fe] flex items-center justify-center mb-6">
                    <detail.icon className="w-7 h-7 text-[#0891b2]" />
                  </div>

                  <h3 className="text-lg mb-3 text-foreground">
                    {detail.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {detail.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section> */}

         

          {/* hfjkd */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-border shadow-lg">
 
              <h2 className="text-2xl md:text-3xl mb-8 text-foreground text-center">
               Let's Understand about Cataract
              </h2> 

              <div className="space-y-10">

                {/* What is Cataract */}
                <div>
                  <h3 className="text-xl mb-3 text-[#0891b2]">What is Cataract?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A cataract is a medical condition in which the natural lens of the eye becomes cloudy,
                    leading to blurred or reduced vision. It usually develops slowly and can affect one or
                    both eyes. Cataracts are commonly associated with aging, but they can also occur due to
                    injury, diabetes, prolonged exposure to sunlight, or other medical conditions.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Common symptoms include blurred vision, sensitivity to light, difficulty seeing at night,
                    faded colors, and frequent changes in prescription glasses.
                  </p>
                </div>

                {/* Types */}
                <div>
                  <h3 className="text-xl mb-3 text-[#0891b2]">Types of Cataract</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                    <li>
                      <strong>Mild Cataract:</strong> Early stage where vision is slightly affected but manageable.
                    </li>
                    <li>
                      <strong>Severe Cataract:</strong> Advanced stage where vision becomes highly impaired and requires medical intervention.
                    </li>
                  </ul>
                </div>

                {/* Treatment */}
                <div>
                  <h3 className="text-xl mb-3 text-[#0891b2]">Treatment</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cataracts cannot be cured with medications or eye drops. The most effective treatment is
                    a surgical procedure where the cloudy lens is removed and replaced with an artificial
                    intraocular lens (IOL). Cataract surgery is safe, quick, and widely performed, with a high success rate.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Early detection plays a crucial role in preventing vision loss, which is why systems like
                    CataractNet are important for assisting timely diagnosis.
                  </p>
                </div>

                {/* Why CataractNet */}
                <div>
                  <h3 className="text-xl mb-3 text-[#0891b2]">Why CataractNet is Useful?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    CataractNet helps in early detection and severity classification of cataracts using
                    advanced deep learning techniques. By providing fast and accurate results, it supports
                    doctors in making better clinical decisions and improves access to eye care, especially
                    in rural and resource-limited areas.
                  </p>
                </div>

              </div>
            </div>
          </section>


             {/* Technical Details */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl p-8 md:p-12 border border-border shadow-lg"
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl mb-8 text-foreground text-center">
                  How It Works
                </h2>

                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0891b2]">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg mb-2 text-foreground">Image Preprocessing</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Uploaded slit-lamp images are normalized, resized, and preprocessed to match
                        the model's input requirements. This ensures consistent quality across different
                        image sources.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0891b2]">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg mb-2 text-foreground">Feature Extraction</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Our convolutional neural network extracts hierarchical features from the eye image,
                        identifying patterns associated with lens opacity, cloudiness, and other cataract indicators.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0891b2]">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg mb-2 text-foreground">Classification & Grading</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        The model classifies the image into categories (Normal, Mild Cataract, Severe Cataract)
                        and provides a confidence score. Results are presented with clear visual indicators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>


        </motion.div>
      </div>
    </div>
  );
}
