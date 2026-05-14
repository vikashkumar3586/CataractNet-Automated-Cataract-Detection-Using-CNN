import { motion } from 'motion/react';
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Phone, FileQuestion, Upload, Search, Eye, Users, Instagram, Youtube, Facebook } from 'lucide-react';

interface HelpProps {
  onBack: () => void;
}

export function Help({ onBack }: HelpProps) {
  const faqs = [
    {
      question: 'How do I upload an eye image?',
      answer: 'Navigate to the Upload page, enter patient details (name, age, gender), then either drag and drop an eye image or click to select a file from your device. Once uploaded, click "Analyze Image" to start the AI detection process.',
    },
    {
      question: 'What is a serial number and how do I use it?',
      answer: 'After analysis, each patient receives a unique serial number (format: CN followed by numbers). Save this number to retrieve the patient\'s report later. You can use it on the "View Report" page to access previous results.',
    },
    {
      question: 'How can I view patient history?',
      answer: 'Click on the "History" link in the navigation menu to see all patient records. You can search by patient name or serial number to find specific records.',
    },
    {
      question: 'What image format should I use?',
      answer: 'We accept JPG, PNG, and JPEG formats. Use clear, high-quality slit-lamp eye images with the eye and lens clearly visible. Avoid blurry or poorly lit images for best results.',
    },
    {
      question: 'How accurate is the AI detection?',
      answer: 'Our AI model provides a confidence score with each analysis. The system is trained on extensive datasets and shows high accuracy. However, always consult with qualified medical professionals for final diagnosis.',
    },
    {
      question: 'Can I download the analysis report?',
      answer: 'Yes! After analysis, you can download the report from the Results page by clicking the "Download Report" button. The report includes all analysis details in JSON format.',
    },
    {
      question: 'Is my patient data secure?',
      answer: 'Currently, patient records are stored locally in your browser. For enhanced security and multi-device access, consider using our cloud backup option with proper encryption.',
    },
    {
      question: 'What do the severity levels mean?',
      answer: 'Results show three levels: "Normal" (no cataract detected), "Mild Cataract" (early stage, recommend monitoring), and "Severe Cataract" (advanced stage, recommend clinical consultation).',
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      value: 'contact@cataractnet.com',
      description: 'Send us an email anytime',
      link: 'mailto:contact@cataractnet.com',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+1 (234) 567-890',
      description: 'Chat with us on WhatsApp',
      link: 'https://wa.me/1234567890',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      value: '+1 (234) 567-890',
      description: 'Call us during business hours',
      link: 'tel:+1234567890',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  const socialMedia = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@cataractnet',
      link: 'https://instagram.com/cataractnet',
      color: 'bg-pink-50 text-pink-600 hover:bg-pink-100',
    },
    {
      icon: Youtube,
      name: 'YouTube',
      handle: '@cataractnet',
      link: 'https://youtube.com/@cataractnet',
      color: 'bg-red-50 text-red-600 hover:bg-red-100',
    },
    {
      icon: Facebook,
      name: 'Facebook',
      handle: 'CataractNet',
      link: 'https://facebook.com/cataractnet',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    },
  ];

  const quickGuides = [
    {
      icon: Upload,
      title: 'Getting Started',
      steps: [
        'Navigate to Upload page',
        'Enter patient details',
        'Upload eye image',
        'Click Analyze',
      ],
    },
    {
      icon: Search,
      title: 'Finding Reports',
      steps: [
        'Go to View Report page',
        'Enter serial number',
        'Click Search Report',
        'View full analysis',
      ],
    },
    {
      icon: Eye,
      title: 'Understanding Results',
      steps: [
        'Check status badge',
        'Review confidence score',
        'Note severity level',
        'Download report',
      ],
    },
    {
      icon: Users,
      title: 'Managing Patients',
      steps: [
        'Visit History page',
        'Search by name/serial',
        'View all records',
        'Track trends',
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 bg-gradient-to-b from-white to-[#e0f2fe]">
      <div className="container mx-auto px-4 max-w-6xl">
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
            Back to Home
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0891b2] to-[#06b6d4] flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl mb-4 text-foreground">
              Help & Support
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions and get in touch with our support team
            </p>
          </div>

          {/* Quick Guides */}
          <div className="mb-12">
            <h2 className="text-2xl mb-6 text-foreground text-center">Quick Start Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickGuides.map((guide, index) => {
                const Icon = guide.icon;
                return (
                  <motion.div
                    key={guide.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 border border-border shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#e0f2fe] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#0891b2]" />
                    </div>
                    <h3 className="text-sm mb-3 text-foreground">{guide.title}</h3>
                    <ol className="space-y-2">
                      {guide.steps.map((step, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-[#0891b2] font-semibold">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="mb-12">
            <h2 className="text-2xl mb-6 text-foreground text-center">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.title}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`w-12 h-12 rounded-lg ${method.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm mb-1 text-foreground">{method.title}</h3>
                    <p className="text-sm text-[#0891b2] mb-2">{method.value}</p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Social Media */}
          <div className="mb-12">
            <h2 className="text-2xl mb-6 text-foreground text-center">Follow Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialMedia.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`rounded-xl p-6 border border-border shadow-sm transition-all ${social.color}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{social.name}</h3>
                        <p className="text-xs opacity-80">{social.handle}</p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl mb-6 text-foreground text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#e0f2fe] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileQuestion className="w-4 h-4 text-[#0891b2]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm mb-2 text-foreground">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Support CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-[#0891b2] to-[#06b6d4] rounded-2xl p-8 text-center text-white"
          >
            <h3 className="text-xl mb-3">Still Need Help?</h3>
            <p className="text-sm text-white/90 mb-6 max-w-2xl mx-auto">
              Our support team is here to assist you. Reach out via email, WhatsApp, or social media, and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:contact@cataractnet.com"
                className="px-6 py-3 bg-white text-[#0891b2] rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
