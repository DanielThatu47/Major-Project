
import { Book, Video, HelpCircle, FileText } from 'lucide-react';

const LearningCenter = () => {
  const resources = [
    { title: 'Introduction to Stock Market', icon: Book, type: 'Article' },
    { title: 'Understanding Stock Charts', icon: Video, type: 'Video' },
    { title: 'Fundamental Analysis Basics', icon: Book, type: 'Article' },
    { title: 'Technical Analysis for Beginners', icon: Video, type: 'Video' },
    { title: 'Risk Management Strategies', icon: FileText, type: 'Guide' },
    { title: 'How to Read Financial Statements', icon: Book, type: 'Article' },
  ];

  const faqs = [
    { question: 'What is a stock?', answer: 'A stock represents ownership in a company...' },
    { question: 'How do I start investing?', answer: 'To start investing, you need to open a brokerage account...' },
    { question: 'What is market capitalization?', answer: 'Market capitalization is the total value of a company\'s outstanding shares...' },
    { question: 'What is a dividend?', answer: 'A dividend is a distribution of a company\'s earnings to shareholders...' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Learning Center</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Educational Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <resource.icon className="w-8 h-8 text-blue-500 mb-2" />
              <h3 className="text-lg font-medium mb-1">{resource.title}</h3>
              <p className="text-sm text-gray-500">{resource.type}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <HelpCircle className="w-5 h-5 text-blue-500 mr-2" />
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
        <p className="text-gray-700 mb-4">Our team of experts is here to assist you with any questions you may have about stock market investing.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Contact Support</button>
      </div>
    </div>
  );
};

export default LearningCenter;