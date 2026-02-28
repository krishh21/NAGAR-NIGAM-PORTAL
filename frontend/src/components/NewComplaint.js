import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaMapMarkerAlt, FaCamera, FaInfoCircle } from 'react-icons/fa';
import api from '../utils/axios';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  en: {
    title: 'Report a New Issue',
    subtitle: 'Help us make our city better by reporting civic issues. Your report will be forwarded to the concerned department.',
    issueTitle: 'Issue Title *',
    titlePlaceholder: 'e.g., Pothole on Main Street',
    titleHint: 'Be specific and concise (max 200 characters)',
    description: 'Detailed Description *',
    descriptionPlaceholder: 'Describe the issue in detail. Include any relevant information that can help in resolution.',
    descriptionHint: '{count}/1000 characters',
    category: 'Category *',
    selectCategory: 'Select a category',
    location: 'Location Address *',
    locationPlaceholder: 'Enter the exact location where the issue exists',
    locationHint: 'For better accuracy, you can add GPS coordinates later',
    images: 'Upload Images (Optional)',
    chooseImages: 'Choose Images',
    imagesHint: 'Upload up to 5 images (JPEG, PNG, GIF). Max 5MB each.',
    guidelines: 'Submission Guidelines:',
    guideline1: 'Provide clear and accurate information',
    guideline2: 'Add multiple images from different angles',
    guideline3: 'Include exact location details',
    guideline4: 'Complaints are typically addressed within 3-7 working days',
    guideline5: 'You can track the status of your complaint in real-time',
    cancel: 'Cancel',
    submit: 'Submit Complaint',
    submitting: 'Submitting...',
    maxImages: 'Maximum 5 images allowed',
    success: 'Complaint submitted successfully!',
    error: {
      titleRequired: 'Title is required',
      descriptionRequired: 'Description is required',
      categoryRequired: 'Category is required',
      addressRequired: 'Address is required',
      submitFailed: 'Failed to submit complaint'
    },
    categories: {
      road: 'Road & Infrastructure',
      water: 'Water Supply',
      electricity: 'Electricity',
      sanitation: 'Sanitation & Waste',
      safety: 'Public Safety',
      healthcare: 'Healthcare',
      education: 'Education',
      park: 'Parks & Recreation',
      traffic: 'Traffic & Transportation',
      other: 'Others'
    }
  },
  hi: {
    title: 'नई समस्या रिपोर्ट करें',
    subtitle: 'नागरिक समस्याओं की रिपोर्ट करके हमें अपने शहर को बेहतर बनाने में मदद करें। आपकी रिपोर्ट संबंधित विभाग को भेज दी जाएगी।',
    issueTitle: 'समस्या शीर्षक *',
    titlePlaceholder: 'जैसे, मेन रोड पर गड्ढा',
    titleHint: 'विशिष्ट और संक्षिप्त रहें (अधिकतम 200 अक्षर)',
    description: 'विस्तृत विवरण *',
    descriptionPlaceholder: 'समस्या का विस्तार से वर्णन करें। कोई भी प्रासंगिक जानकारी शामिल करें जो समाधान में सहायक हो।',
    descriptionHint: '{count}/1000 अक्षर',
    category: 'श्रेणी *',
    selectCategory: 'श्रेणी चुनें',
    location: 'स्थान का पता *',
    locationPlaceholder: 'जहां समस्या मौजूद है, वहां का सटीक पता दर्ज करें',
    locationHint: 'बेहतर सटीकता के लिए, आप बाद में GPS निर्देशांक जोड़ सकते हैं',
    images: 'छवियाँ अपलोड करें (वैकल्पिक)',
    chooseImages: 'छवियाँ चुनें',
    imagesHint: 'अधिकतम 5 छवियाँ अपलोड करें (JPEG, PNG, GIF)। प्रत्येक अधिकतम 5MB।',
    guidelines: 'सबमिशन दिशानिर्देश:',
    guideline1: 'सटीक और स्पष्ट जानकारी प्रदान करें',
    guideline2: 'विभिन्न कोणों से कई छवियाँ जोड़ें',
    guideline3: 'सटीक स्थान विवरण शामिल करें',
    guideline4: 'शिकायतों का आमतौर पर 3-7 कार्य दिवसों के भीतर समाधान किया जाता है',
    guideline5: 'आप अपनी शिकायत की स्थिति वास्तविक समय में ट्रैक कर सकते हैं',
    cancel: 'रद्द करें',
    submit: 'शिकायत दर्ज करें',
    submitting: 'दर्ज किया जा रहा है...',
    maxImages: 'अधिकतम 5 छवियाँ अनुमत हैं',
    success: 'शिकायत सफलतापूर्वक दर्ज की गई!',
    error: {
      titleRequired: 'शीर्षक आवश्यक है',
      descriptionRequired: 'विवरण आवश्यक है',
      categoryRequired: 'श्रेणी आवश्यक है',
      addressRequired: 'पता आवश्यक है',
      submitFailed: 'शिकायत दर्ज करने में विफल'
    },
    categories: {
      road: 'सड़क एवं बुनियादी ढांचा',
      water: 'जल आपूर्ति',
      electricity: 'बिजली',
      sanitation: 'स्वच्छता एवं कचरा',
      safety: 'सार्वजनिक सुरक्षा',
      healthcare: 'स्वास्थ्य सेवा',
      education: 'शिक्षा',
      park: 'पार्क एवं मनोरंजन',
      traffic: 'यातायात एवं परिवहन',
      other: 'अन्य'
    }
  }
};

const NewComplaint = () => {
  const navigate = useNavigate();
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

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: { address: '', coordinates: { lat: null, lng: null } }
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = Object.keys(translations[language].categories).map(key => ({
    key,
    label: t(`categories.${key}`)
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({ ...prev, location: { ...prev.location, [field]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      toast.error(t('maxImages'));
      return;
    }
    const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => setImages(prev => prev.filter((_, i) => i !== index));

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = t('error.titleRequired');
    if (!formData.description.trim()) newErrors.description = t('error.descriptionRequired');
    if (!formData.category) newErrors.category = t('error.categoryRequired');
    if (!formData.location.address.trim()) newErrors['location.address'] = t('error.addressRequired');
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setUploading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('location[address]', formData.location.address);
      if (formData.location.coordinates.lat && formData.location.coordinates.lng) {
        formDataToSend.append('location[coordinates][lat]', formData.location.coordinates.lat);
        formDataToSend.append('location[coordinates][lng]', formData.location.coordinates.lng);
      }
      images.forEach((image, index) => formDataToSend.append('images', image.file));
      const response = await api.post('/complaints', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success(t('success'));
      navigate(`/complaints/${response.data._id}`);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error(error.response?.data?.message || t('error.submitFailed'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
        <p className="text-gray-600 mb-6">{t('subtitle')}</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">{t('issueTitle')}</label>
            <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} className={`input-field ${errors.title ? 'border-red-300' : ''}`} placeholder={t('titlePlaceholder')} maxLength={200} />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            <p className="mt-1 text-sm text-gray-500">{t('titleHint')}</p>
          </div>
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">{t('description')}</label>
            <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} className={`input-field ${errors.description ? 'border-red-300' : ''}`} placeholder={t('descriptionPlaceholder')} maxLength={1000} />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            <p className="mt-1 text-sm text-gray-500">{t('descriptionHint', { count: formData.description.length })}</p>
          </div>
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">{t('category')}</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} className={`input-field ${errors.category ? 'border-red-300' : ''}`}>
              <option value="">{t('selectCategory')}</option>
              {categories.map(cat => <option key={cat.key} value={cat.key}>{cat.label}</option>)}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>
          {/* Location */}
          <div>
            <label htmlFor="location.address" className="block text-sm font-medium text-gray-700 mb-1">{t('location')}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaMapMarkerAlt className="h-5 w-5 text-gray-400" /></div>
              <input id="location.address" name="location.address" type="text" value={formData.location.address} onChange={handleChange} className={`input-field pl-10 ${errors['location.address'] ? 'border-red-300' : ''}`} placeholder={t('locationPlaceholder')} />
            </div>
            {errors['location.address'] && <p className="mt-1 text-sm text-red-600">{errors['location.address']}</p>}
            <p className="mt-2 text-sm text-gray-600 flex items-center space-x-1"><FaInfoCircle className="w-4 h-4" /><span>{t('locationHint')}</span></p>
          </div>
          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('images')}</label>
            <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
              <FaCamera className="w-12 h-12 text-gray-400 mb-4" />
              <div className="text-center">
                <label htmlFor="images" className="btn-primary cursor-pointer inline-block"><FaUpload className="inline-block mr-2" />{t('chooseImages')}</label>
                <input id="images" name="images" type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                <p className="mt-2 text-sm text-gray-500">{t('imagesHint')}</p>
              </div>
            </div>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image.preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">{t('guidelines')}</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• {t('guideline1')}</li>
              <li>• {t('guideline2')}</li>
              <li>• {t('guideline3')}</li>
              <li>• {t('guideline4')}</li>
              <li>• {t('guideline5')}</li>
            </ul>
          </div>
          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary" disabled={uploading}>{t('cancel')}</button>
            <button type="submit" className="btn-primary" disabled={uploading}>
              {uploading ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>{t('submitting')}</> : t('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewComplaint;