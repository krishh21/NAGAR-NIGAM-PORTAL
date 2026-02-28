import React from 'react';
import { 
  FaFileInvoice, 
  FaWater, 
  FaLightbulb, 
  FaTrash, 
  FaRoad,
  FaHome,
  FaHospital,
  FaSchool,
  FaCar
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  en: {
    title: 'Municipal Services',
    subtitle: 'All online services of Bareilly Nagar Nigam',
    available: '24x7 Available',
    online: 'Online Services',
    total: 'Total Services',
    activeUsers: 'Active Users',
    avgResponse: 'Avg. Response Time',
    satisfaction: 'Service Satisfaction',
    hours: 'hours',
    howToUse: 'How to Use Services',
    step1: 'Login',
    step1Desc: 'Login to your account',
    step2: 'Choose Service',
    step2Desc: 'Select the required service',
    step3: 'Fill Form',
    step3Desc: 'Provide required details',
    step4: 'Make Payment',
    step4Desc: 'Complete online payment',
    support: 'Need Help?',
    supportDesc: 'Our support team is ready to assist you',
    helpline: 'Helpline: 1800-XXX-XXXX',
    emailSupport: 'Email: support@bareilly.up.in',
    items: [
      { name: 'Municipal Tax Payment', desc: 'Pay municipal tax online' },
      { name: 'Water Bill Payment', desc: 'Pay water department bill' },
      { name: 'Electricity Bill', desc: 'Pay electricity bill' },
      { name: 'Garbage Fee', desc: 'Pay sanitation fee' },
      { name: 'Road Tax', desc: 'Pay road tax' },
      { name: 'Property Registration', desc: 'Property registration service' },
      { name: 'Birth Certificate', desc: 'Online birth certificate' },
      { name: 'Death Certificate', desc: 'Online death certificate' },
      { name: 'School Admission', desc: 'Municipal school admission' },
      { name: 'Parking Permit', desc: 'Apply for parking permit' }
    ]
  },
  hi: {
    title: 'नगर निगम सेवाएं',
    subtitle: 'बरेली नगर निगम की सभी ऑनलाइन सेवाएं',
    available: '24x7 उपलब्ध',
    online: 'ऑनलाइन सेवाएं',
    total: 'कुल सेवाएं',
    activeUsers: 'सक्रिय उपयोगकर्ता',
    avgResponse: 'औसत प्रतिक्रिया समय',
    satisfaction: 'सेवा संतुष्टि',
    hours: 'घंटे',
    howToUse: 'सेवाओं का उपयोग कैसे करें',
    step1: 'लॉगिन करें',
    step1Desc: 'अपने खाते में लॉगिन करें',
    step2: 'सेवा चुनें',
    step2Desc: 'आवश्यक सेवा का चयन करें',
    step3: 'फॉर्म भरें',
    step3Desc: 'आवश्यक विवरण प्रदान करें',
    step4: 'भुगतान करें',
    step4Desc: 'ऑनलाइन भुगतान पूरा करें',
    support: 'सहायता चाहिए?',
    supportDesc: 'हमारी सहायता टीम आपकी मदद के लिए तैयार है',
    helpline: 'हेल्पलाइन: 1800-XXX-XXXX',
    emailSupport: 'ईमेल: support@bareilly.up.in',
    items: [
      { name: 'नगर कर भुगतान', desc: 'ऑनलाइन नगर कर का भुगतान करें' },
      { name: 'जल बिल भुगतान', desc: 'जल विभाग बिल भुगतान' },
      { name: 'बिजली बिल', desc: 'बिजली विभाग बिल भुगतान' },
      { name: 'कचरा शुल्क', desc: 'स्वच्छता शुल्क भुगतान' },
      { name: 'सड़क टैक्स', desc: 'सड़क कर का भुगतान' },
      { name: 'संपत्ति पंजीकरण', desc: 'संपत्ति पंजीकरण सेवा' },
      { name: 'जन्म प्रमाण पत्र', desc: 'ऑनलाइन जन्म प्रमाण पत्र' },
      { name: 'मृत्यु प्रमाण पत्र', desc: 'ऑनलाइन मृत्यु प्रमाण पत्र' },
      { name: 'विद्यालय प्रवेश', desc: 'नगर निगम विद्यालय प्रवेश' },
      { name: 'पार्किंग परमिट', desc: 'पार्किंग परमिट आवेदन' }
    ]
  }
};

const Services = () => {
  const { language } = useLanguage();
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let val = translations[language];
    for (const k of keys) {
      if (val && val[k] !== undefined) val = val[k];
      else return key;
    }
    if (typeof val === 'string') {
      Object.keys(params).forEach(p => { val = val.replace(`{${p}}`, params[p]); });
    }
    return val;
  };

  const services = translations[language].items.map((item, index) => ({
    ...item,
    icon: [
      FaFileInvoice, FaWater, FaLightbulb, FaTrash, FaRoad,
      FaHome, FaHospital, FaHospital, FaSchool, FaCar
    ][index],
    color: [
      'bg-blue-600', 'bg-cyan-600', 'bg-yellow-600', 'bg-green-600', 'bg-orange-600',
      'bg-purple-600', 'bg-pink-600', 'bg-gray-600', 'bg-indigo-600', 'bg-red-600'
    ][index],
    link: [
      '/tax-payment', '/water-bill', '/electricity-bill', '/garbage-charge', '/road-tax',
      '/property-registration', '/birth-certificate', '/death-certificate', '/school-admission', '/parking-permit'
    ][index]
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-up-gov-blue to-up-gov-dark-blue rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <p className="text-up-gov-light-blue">{t('subtitle')}</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <p className="text-sm">{t('available')}</p>
              <p className="font-bold">{t('online')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600">{t('total')}</p>
          <p className="text-2xl font-bold text-up-gov-blue">15+</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600">{t('activeUsers')}</p>
          <p className="text-2xl font-bold text-green-600">10,000+</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600">{t('avgResponse')}</p>
          <p className="text-2xl font-bold text-orange-600">24 {t('hours')}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600">{t('satisfaction')}</p>
          <p className="text-2xl font-bold text-purple-600">92%</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <a
              key={index}
              href={service.link}
              className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition-all duration-200 group"
            >
              <div className={`${service.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-xs text-gray-600">{service.desc}</p>
            </a>
          );
        })}
      </div>

      {/* How to Use */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-up-gov-blue">{t('howToUse')}</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
            <h4 className="font-bold mb-2">{t('step1')}</h4>
            <p className="text-sm text-gray-600">{t('step1Desc')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
            <h4 className="font-bold mb-2">{t('step2')}</h4>
            <p className="text-sm text-gray-600">{t('step2Desc')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
            <h4 className="font-bold mb-2">{t('step3')}</h4>
            <p className="text-sm text-gray-600">{t('step3Desc')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">4</div>
            <h4 className="font-bold mb-2">{t('step4')}</h4>
            <p className="text-sm text-gray-600">{t('step4Desc')}</p>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-gradient-to-r from-up-gov-blue to-up-gov-dark-blue rounded-xl shadow-lg p-8 text-white">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">{t('support')}</h3>
          <p className="mb-6">{t('supportDesc')}</p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="tel:1800XXXXXX" className="bg-white text-up-gov-blue px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
              {t('helpline')}
            </a>
            <a href="mailto:support@bareilly.up.in" className="bg-white text-up-gov-blue px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
              {t('emailSupport')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;