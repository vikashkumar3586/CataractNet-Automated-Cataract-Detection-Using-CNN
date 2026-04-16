import { motion } from 'motion/react';
import { Brain, Eye, Sparkles } from 'lucide-react';

export function Processing() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-b from-white to-[#e0f2fe] py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-12 text-center border border-border"
        >
          {/* Animated Icon */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-[#e0f2fe] border-t-[#0891b2]"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner pulsing circle */}
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-[#0891b2] to-[#06b6d4] flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Eye className="w-12 h-12 text-white" />
            </motion.div>
            
            {/* Floating particles */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-[#0891b2]" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{ 
                y: [0, 10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              <Brain className="w-6 h-6 text-[#06b6d4]" />
            </motion.div>
          </div>

          {/* Text */}
          <h2 className="text-2xl md:text-3xl mb-4 text-foreground">
            Analyzing Eye Image
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            Our deep learning model is processing your image...
          </p>

          {/* Progress steps */}
          <div className="space-y-4 max-w-md mx-auto">
            {[
              { label: 'Preprocessing image', delay: 0 },
              { label: 'Running CNN model', delay: 0.3 },
              { label: 'Analyzing features', delay: 0.6 },
              { label: 'Generating results', delay: 0.9 },
            ].map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.delay, duration: 0.5 }}
                className="flex items-center gap-3 text-left"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#0891b2]"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    delay: step.delay 
                  }}
                />
                <span className="text-sm text-muted-foreground">{step.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Info */}
          <div className="mt-10 p-4 bg-[#e0f2fe] rounded-xl">
            <p className="text-sm text-[#0891b2]">
              This usually takes just a few seconds. Please wait...
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
