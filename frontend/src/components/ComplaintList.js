import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaCheckCircle, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';
import { format } from 'date-fns';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  en: {
    noComplaints: 'No complaints found',
    viewDetails: 'View Details',
    category: 'Category:',
    dept: 'Dept:',
    priority: { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' }
  },
  hi: {
    noComplaints: 'कोई शिकायत नहीं मिली',
    viewDetails: 'विवरण देखें',
    category: 'श्रेणी:',
    dept: 'विभाग:',
    priority: { low: 'कम', medium: 'मध्यम', high: 'उच्च', critical: 'गंभीर' }
  }
};

const ComplaintList = ({ complaints }) => {
  const { language } = useLanguage();
  const t = (key) => {
    const keys = key.split('.');
    let val = translations[language];
    for (const k of keys) {
      if (val && val[k] !== undefined) val = val[k];
      else return key;
    }
    return val;
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <FaClock className="text-yellow-600" />;
      case 'In Progress': return <FaExclamationTriangle className="text-blue-600" />;
      case 'Resolved': return <FaCheckCircle className="text-green-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const classes = {
      Low: 'bg-gray-100 text-gray-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-orange-100 text-orange-800',
      Critical: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`badge ${classes[priority] || classes.Medium}`}>
        {t(`priority.${priority.toLowerCase()}`)}
      </span>
    );
  };

  if (complaints.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t('noComplaints')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <Link
          key={complaint._id}
          to={`/complaints/${complaint._id}`}
          className="block card hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                {getStatusIcon(complaint.status)}
                <h3 className="font-semibold text-lg">{complaint.title}</h3>
                {getPriorityBadge(complaint.priority)}
              </div>
              <p className="text-gray-600 line-clamp-2">{complaint.description}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{t('category')} {complaint.category}</span>
                  <span>•</span>
                  <span>{format(new Date(complaint.createdAt), 'MMM dd, yyyy')}</span>
                  {complaint.department && (
                    <>
                      <span>•</span>
                      <span>{t('dept')} {complaint.department.name}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-primary-600">
                  <span>{t('viewDetails')}</span>
                  <FaArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ComplaintList;