import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaDownload, FaCalendar } from 'react-icons/fa';
import api from '../../utils/axios';
import { useLanguage } from '../../context/LanguageContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const translations = {
  en: {
    title: 'Analytics Dashboard',
    subtitle: 'Comprehensive system analytics and insights',
    export: 'Export Report',
    exporting: 'Exporting...',
    dateRange: {
      week: 'Last Week',
      month: 'Last Month',
      quarter: 'Last Quarter',
      year: 'Last Year',
      all: 'All Time'
    },
    stats: {
      totalUsers: 'Total Users',
      activeDepts: 'Active Departments',
      totalComplaints: 'Total Complaints',
      avgResolution: 'Avg. Resolution Time'
    },
    hours: 'h',
    charts: {
      userDistribution: 'User Distribution by Role',
      topDepts: 'Top Performing Departments',
      trends: 'Complaint Trends',
      trendsLabel: 'Number of Complaints',
      complaintsFiled: 'Complaints Filed',
      complaintsResolved: 'Complaints Resolved',
      resolutionRate: 'Resolution Rate'
    },
    resolutionStats: 'Resolution Time Statistics',
    avg: 'Average',
    fastest: 'Fastest',
    slowest: 'Slowest',
    userStats: 'User Statistics',
    recentActivity: 'Recent Activity',
    systemUsage: 'System Usage',
    resolvedLast30: 'complaints resolved in last 30 days',
    deptPerformance: 'Department Performance',
    topDeptResolved: 'Top department resolved {count} complaints',
    userEngagement: 'User Engagement',
    avgPerCitizen: 'Average {avg} complaints per citizen',
    allSystemUsers: 'All system users',
    managingComplaints: 'Managing complaints',
    allTimeComplaints: 'All time complaints',
    fromSubmission: 'From submission to resolution',
    exportComingSoon: 'Export feature coming soon',
    role: {
      citizen: 'Citizen',
      department: 'Department',
      admin: 'Admin'
    }
  },
  hi: {
    title: 'एनालिटिक्स डैशबोर्ड',
    subtitle: 'व्यापक सिस्टम एनालिटिक्स और अंतर्दृष्टि',
    export: 'रिपोर्ट निर्यात करें',
    exporting: 'निर्यात हो रहा है...',
    dateRange: {
      week: 'पिछला सप्ताह',
      month: 'पिछला महीना',
      quarter: 'पिछली तिमाही',
      year: 'पिछला वर्ष',
      all: 'संपूर्ण समय'
    },
    stats: {
      totalUsers: 'कुल उपयोगकर्ता',
      activeDepts: 'सक्रिय विभाग',
      totalComplaints: 'कुल शिकायतें',
      avgResolution: 'औसत समाधान समय'
    },
    hours: 'घंटे',
    charts: {
      userDistribution: 'भूमिका के अनुसार उपयोगकर्ता वितरण',
      topDepts: 'शीर्ष प्रदर्शन करने वाले विभाग',
      trends: 'शिकायत प्रवृत्तियाँ',
      trendsLabel: 'शिकायतों की संख्या',
      complaintsFiled: 'दर्ज शिकायतें',
      complaintsResolved: 'हल की गई शिकायतें',
      resolutionRate: 'समाधान दर'
    },
    resolutionStats: 'समाधान समय आँकड़े',
    avg: 'औसत',
    fastest: 'सबसे तेज़',
    slowest: 'सबसे धीमा',
    userStats: 'उपयोगकर्ता आँकड़े',
    recentActivity: 'हाल की गतिविधि',
    systemUsage: 'सिस्टम उपयोग',
    resolvedLast30: 'पिछले 30 दिनों में हल की गई शिकायतें',
    deptPerformance: 'विभाग प्रदर्शन',
    topDeptResolved: 'शीर्ष विभाग ने {count} शिकायतें हल कीं',
    userEngagement: 'उपयोगकर्ता सहभागिता',
    avgPerCitizen: 'औसत {avg} शिकायतें प्रति नागरिक',
    allSystemUsers: 'सभी सिस्टम उपयोगकर्ता',
    managingComplaints: 'शिकायतों का प्रबंधन',
    allTimeComplaints: 'सभी समय की शिकायतें',
    fromSubmission: 'दर्ज करने से समाधान तक',
    exportComingSoon: 'निर्यात सुविधा जल्द ही आ रही है',
    role: {
      citizen: 'नागरिक',
      department: 'विभाग',
      admin: 'प्रशासक'
    }
  }
};

const Analytics = () => {
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

  const [analytics, setAnalytics] = useState({
    usersByRole: [],
    totalDepartments: 0,
    totalComplaints: 0,
    recentResolved: 0,
    resolutionStats: {},
    topDepartments: [],
    monthlyTrend: []
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('month');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      toast.success(t('exportComingSoon'));
    } catch (error) {
      console.error('Error exporting:', error);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Prepare chart data
  const usersByRoleData = {
    labels: analytics.usersByRole?.map(item => t(`role.${item._id}`)) || [],
    datasets: [{
      data: analytics.usersByRole?.map(item => item.count) || [],
      backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6']
    }]
  };

  const monthlyTrendData = {
    labels: analytics.monthlyTrend?.map(item => 
      item._id && item._id.month ? `${item._id.month}/${item._id.year}` : 'N/A'
    ).slice(-6) || [],
    datasets: [{
      label: t('charts.complaintsFiled'),
      data: analytics.monthlyTrend?.map(item => item.complaints || 0).slice(-6) || [],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true
    }, {
      label: t('charts.complaintsResolved'),
      data: analytics.monthlyTrend?.map(item => item.resolved || 0).slice(-6) || [],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true
    }]
  };

  const departmentPerformanceData = {
    labels: analytics.topDepartments?.slice(0, 5).map(dept => dept.name) || [],
    datasets: [{
      label: t('charts.resolutionRate') + ' (%)',
      data: analytics.topDepartments?.slice(0, 5).map(dept => 
        dept.totalComplaints > 0 ? Math.round((dept.resolvedComplaints / dept.totalComplaints) * 100) : 0
      ) || [],
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      borderColor: '#8B5CF6',
      borderWidth: 2
    }]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FaCalendar className="text-gray-500" />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="input-field">
              <option value="week">{t('dateRange.week')}</option>
              <option value="month">{t('dateRange.month')}</option>
              <option value="quarter">{t('dateRange.quarter')}</option>
              <option value="year">{t('dateRange.year')}</option>
              <option value="all">{t('dateRange.all')}</option>
            </select>
          </div>
          <button onClick={handleExport} disabled={exporting} className="btn-primary flex items-center space-x-2">
            <FaDownload /><span>{exporting ? t('exporting') : t('export')}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('stats.totalUsers')}</p>
              <p className="text-3xl font-bold mt-2">{analytics.usersByRole.reduce((sum, role) => sum + role.count, 0)}</p>
              <p className="text-sm text-gray-500 mt-1">{t('allSystemUsers')}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg"><span className="text-2xl font-bold text-blue-600">👥</span></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('stats.activeDepts')}</p>
              <p className="text-3xl font-bold mt-2">{analytics.totalDepartments}</p>
              <p className="text-sm text-gray-500 mt-1">{t('managingComplaints')}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg"><span className="text-2xl font-bold text-green-600">🏢</span></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('stats.totalComplaints')}</p>
              <p className="text-3xl font-bold mt-2">{analytics.totalComplaints}</p>
              <p className="text-sm text-gray-500 mt-1">{t('allTimeComplaints')}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg"><span className="text-2xl font-bold text-purple-600">📋</span></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('stats.avgResolution')}</p>
              <p className="text-3xl font-bold mt-2">{analytics.resolutionStats.avgTime ? Math.round(analytics.resolutionStats.avgTime) : 0}{t('hours')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('fromSubmission')}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg"><span className="text-2xl font-bold text-yellow-600">⏱️</span></div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">{t('charts.userDistribution')}</h3>
          <div className="h-80">
            <Doughnut 
              data={usersByRoleData}
              options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }}
            />
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">{t('charts.topDepts')}</h3>
          <div className="h-80">
            <Bar 
              data={departmentPerformanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, max: 100, title: { display: true, text: t('charts.resolutionRate') + ' (%)' } }
                }
              }}
            />
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">{t('charts.trends')}</h3>
          <div className="h-96">
            <Line 
              data={monthlyTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: {
                  y: { beginAtZero: true, title: { display: true, text: t('charts.trendsLabel') } }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">{t('resolutionStats')}</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">{t('avg')}</span>
              <span className="font-semibold">{analytics.resolutionStats.avgTime ? Math.round(analytics.resolutionStats.avgTime) : 0} {t('hours')}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">{t('fastest')}</span>
              <span className="font-semibold text-green-600">{analytics.resolutionStats.minTime ? Math.round(analytics.resolutionStats.minTime) : 0} {t('hours')}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">{t('slowest')}</span>
              <span className="font-semibold text-red-600">{analytics.resolutionStats.maxTime ? Math.round(analytics.resolutionStats.maxTime) : 0} {t('hours')}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">{t('userStats')}</h3>
          <div className="space-y-4">
            {analytics.usersByRole.map((role) => (
              <div key={role._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    role._id === 'citizen' ? 'bg-blue-500' : role._id === 'department' ? 'bg-green-500' : 'bg-purple-500'
                  }`} />
                  <span className="capitalize">{t(`role.${role._id}`)}</span>
                </div>
                <span className="font-semibold">{role.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">{t('recentActivity')}</h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium">{t('systemUsage')}</p>
              <p className="text-sm text-gray-600">{analytics.recentResolved} {t('resolvedLast30')}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-medium">{t('deptPerformance')}</p>
              <p className="text-sm text-gray-600">{t('topDeptResolved', { count: analytics.topDepartments[0]?.resolvedComplaints || 0 })}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-medium">{t('userEngagement')}</p>
              <p className="text-sm text-gray-600">
                {t('avgPerCitizen', { 
                  avg: Math.round(analytics.totalComplaints / (analytics.usersByRole.find(r => r._id === 'citizen')?.count || 1))
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;